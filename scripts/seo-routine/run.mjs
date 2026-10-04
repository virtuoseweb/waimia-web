/**
 * Routine SEO/GEO hebdomadaire · collecte. Enchaîne toutes les sources et écrit :
 *   docs/seo/data/AAAA-Www/<source>.json   une sortie brute par source
 *   docs/seo/data/AAAA-Www/summary.json    le résumé de la semaine (archive)
 *   docs/seo/data/latest.json              le même résumé, lu par la session Claude hebdomadaire
 *   docs/seo/data/state/*.json             état persistant (indexation, IndexNow, Indexing API, concurrents)
 *
 * Chaque étape échoue isolément : son erreur est écrite dans `steps` du résumé et les autres
 * étapes tournent. Sans GSC_SERVICE_ACCOUNT_JSON, les étapes Search Console et Indexing API sont
 * marquées « non configuré » et le reste tourne.
 *
 * Usage : node scripts/seo-routine/run.mjs [--dry-run] [--indexing-all] [--only=feeds,competitors]
 *   --dry-run : aucune écriture externe (ni IndexNow, ni Indexing API, ni resoumission du sitemap).
 *   --indexing-all : l'Indexing API reprend tout le sitemap (première passe complète, refonte),
 *     au lieu des seules URL nouvelles ou modifiées.
 *   SEO_DATA_DIR=<dossier> : écrit ailleurs que docs/seo/data (essai local).
 */
import { join } from 'node:path';
import { DATA_DIR, SEO_DIR, SITEMAP_URL } from './config.mjs';
import { isoWeek, readJson, writeJson } from './lib/util.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { buildSummary } from './lib/summary.mjs';
import { collectPerformance } from './gsc-performance.mjs';
import { collectIndex } from './gsc-index.mjs';
import { submitSitemap } from './gsc-sitemap.mjs';
import { runIndexNow } from './indexnow.mjs';
import { runIndexingApi } from './indexing-api.mjs';
import { collectFeeds } from './feeds.mjs';
import { collectCompetitors } from './competitors.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const indexingAll = args.includes('--indexing-all');
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',') ?? null;

const now = new Date();
const week = isoWeek(now);
const weekDir = join(DATA_DIR, week);

const STEPS = [
  { name: 'gsc-performance', run: () => collectPerformance({ today: now }) },
  { name: 'gsc-index', run: () => collectIndex({ today: now }) },
  { name: 'gsc-sitemap', run: () => submitSitemap({ dryRun }) },
  { name: 'indexnow', run: () => runIndexNow({ dryRun, persist: !dryRun }) },
  // Après gsc-index : les URL relevées non indexées pendant ce run passent en premier.
  { name: 'indexing-api', run: () => runIndexingApi({ dryRun, all: indexingAll, persist: !dryRun, today: now, indexOutput: outputs['gsc-index'] ?? null }) },
  { name: 'feeds', run: () => collectFeeds({ now }) },
  { name: 'competitors', run: () => collectCompetitors({ today: now }) },
];

const steps = {};
const outputs = {};

for (const step of STEPS) {
  if (only && !only.includes(step.name)) {
    steps[step.name] = { status: 'ignoré' };
    continue;
  }
  const started = Date.now();
  try {
    const out = await step.run();
    outputs[step.name] = out;
    await writeJson(join(weekDir, `${step.name}.json`), out);
    steps[step.name] = { status: 'ok', durationMs: Date.now() - started };
    console.log(`ok            ${step.name} (${Date.now() - started} ms)`);
  } catch (err) {
    if (err.notConfigured) {
      steps[step.name] = { status: 'non configuré', error: err.message };
      console.log(`non configuré ${step.name}`);
    } else {
      steps[step.name] = { status: 'erreur', error: err.message, durationMs: Date.now() - started };
      console.log(`ERREUR        ${step.name} : ${err.message}`);
    }
  }
}

const keywordsFile = await readJson(join(SEO_DIR, 'keywords.json'), { keywords: [] });
let sitemapPaths = null;
try {
  const { urls } = await fetchSitemapUrls(SITEMAP_URL);
  sitemapPaths = urls.map((u) => new URL(u.loc).pathname.replace(/\/$/, '') || '/');
} catch (err) {
  steps['sitemap-production'] = { status: 'erreur', error: err.message };
}

const summary = buildSummary({
  week,
  generatedAt: now.toISOString(),
  steps,
  perf: outputs['gsc-performance'],
  index: outputs['gsc-index'],
  sitemap: outputs['gsc-sitemap'],
  indexnow: outputs.indexnow,
  indexingApi: outputs['indexing-api'],
  feeds: outputs.feeds,
  competitors: outputs.competitors,
  keywords: keywordsFile.keywords ?? [],
  sitemapPaths,
});

await writeJson(join(weekDir, 'summary.json'), summary);
await writeJson(join(DATA_DIR, 'latest.json'), summary);

const failed = Object.entries(steps).filter(([, s]) => s.status === 'erreur');
console.log(`\nSemaine ${week} : ${Object.values(steps).filter((s) => s.status === 'ok').length} étape(s) ok, ${failed.length} en erreur, ${Object.values(steps).filter((s) => s.status === 'non configuré').length} non configurée(s).`);
console.log(`Résumé : ${join(DATA_DIR, 'latest.json')}`);
// Une étape en erreur n'est pas un échec du script : le résumé partiel reste utile et doit être
// commité. Seul un résumé vide (aucune étape ok) sort en erreur.
if (!Object.values(steps).some((s) => s.status === 'ok')) process.exit(1);
