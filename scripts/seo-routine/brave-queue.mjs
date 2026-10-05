/**
 * Brave Search : file hebdomadaire des URL à soumettre au formulaire de réexploration
 * (https://search.brave.com/submit-url). Brave n'a ni API d'indexation, ni outil webmaster, ni
 * IndexNow : ce script NE SOUMET RIEN. Il calcule la file (URL du sitemap de production nouvelles
 * ou dont le `lastmod` a changé depuis la dernière file) ; la soumission se fait par le navigateur
 * de Simon, dans la tâche planifiée « Soumission Brave hebdomadaire Waimia » (docs/seo/ROUTINE.md).
 *
 * État : docs/seo/data/state/brave.json. La file de la semaine est considérée comme transmise :
 * une URL sortie une semaine ne ressort pas tant que son `lastmod` ne change pas. Si la collecte
 * tourne plusieurs fois dans la même semaine ISO, la file de la semaine est conservée et
 * complétée, pour qu'une relance ne l'efface pas de latest.json.
 *
 * Amorçage : les URL du sitemap ont été soumises à la main le 4 octobre 2026. Sans état, la
 * première exécution enregistre donc le sitemap courant comme déjà soumis et sort une file vide,
 * sauf avec `--all`.
 *
 * Usage direct : `node scripts/seo-routine/brave-queue.mjs [--all] [--dry-run]`
 *   --all : met tout le sitemap dans la file (nouvelle passe complète, après une refonte).
 *   --dry-run : affiche la file sans écrire l'état.
 *
 * Mode autonome, pour la tâche Brave (ni secret, ni état, rien n'est écrit) :
 *   `node scripts/seo-routine/brave-queue.mjs --from-sitemap [--days=8] [--cap=40] [--offset=0] [--sitemap=<URL ou fichier>] [--json]`
 * La file est alors : les URL du sitemap de production dont le `lastmod` date de moins de
 * `--days` jours, réunies avec `brave.toSubmit` de docs/seo/data/latest.json s'il existe. Elle ne
 * dépend donc plus de la collecte. Resoumettre une URL déjà soumise est sans conséquence, d'où
 * l'absence d'état. Ordre : la file de la collecte, puis les URL que la dernière inspection
 * d'indexation ne connaissait pas (pages nouvelles), puis les autres, les plus récentes d'abord.
 * `--cap` plafonne une exécution (40 : une vérification anti-robot est apparue vers 47
 * soumissions d'affilée le 4 octobre 2026) ; le reste sort en « à reprendre » et se relance avec
 * `--offset`. Limite : `lastmod` est la date du contenu (`updatedAt`) ou du dernier commit qui a
 * touché le fichier de la page (src/lib/seo/lastmod.mjs), au jour près. Une page modifiée sans
 * que cette date change ne sort pas ; un commit qui touche beaucoup de fichiers les fait toutes
 * sortir ; une PR fusionnée mais pas encore déployée n'est pas dans le sitemap.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DATA_DIR, SITE_ORIGIN, SITEMAP_URL, STATE_DIR } from './config.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { parseSitemap } from './lib/xml.mjs';
import { isoWeek, readJson, writeJson, isMain, normalizeUrl } from './lib/util.mjs';

export const BRAVE_STATE_FILE = join(STATE_DIR, 'brave.json');
export const BRAVE_SUBMIT_URL = 'https://search.brave.com/submit-url';
/** Mode autonome : fenêtre de récence (jours) et plafond de soumissions par exécution. */
export const BRAVE_RECENT_DAYS = 8;
export const BRAVE_BATCH_CAP = 40;

/**
 * Calcule la file et l'état suivant. Fonction pure.
 * @param {Array<{loc:string, lastmod:string|null}>} urls URL du sitemap de production
 * @param {{week?:string, queue?:string[], urls?:Record<string,string|null>}|null} state état précédent, `null` s'il n'existe pas
 * @param {{all?:boolean, week:string, now?:string}} options
 */
export function selectBraveQueue(urls, state, { all = false, week, now = null } = {}) {
  const inSitemap = new Set(urls.map((u) => u.loc));
  const seeded = !state && !all;
  const known = state?.urls ?? {};
  const added = [];
  const modified = [];
  if (!seeded) {
    for (const u of urls) {
      if (!(u.loc in known)) added.push(u.loc);
      else if (u.lastmod && u.lastmod !== (known[u.loc] ?? null)) modified.push(u.loc);
    }
  }
  // Relance dans la même semaine : on garde la file déjà sortie (URL encore au sitemap).
  const carried = state?.week === week ? (state.queue ?? []).filter((loc) => inSitemap.has(loc)) : [];
  const toSubmit = all ? urls.map((u) => u.loc) : [...new Set([...carried, ...added, ...modified])];
  const nextState = {
    week,
    updatedAt: now,
    seededAt: state?.seededAt ?? (seeded ? now : null),
    queue: toSubmit,
    urls: Object.fromEntries(urls.map((u) => [u.loc, u.lastmod ?? null])),
  };
  return { seeded, all, added, modified, carried, toSubmit, nextState };
}

export function braveNote({ seeded, all, toSubmit, sitemapUrlCount }) {
  if (seeded) return `Amorçage : les ${sitemapUrlCount} URL du sitemap sont enregistrées comme déjà soumises à Brave (soumission manuelle du 4 octobre 2026). File vide.`;
  if (toSubmit.length === 0) return 'Aucune URL nouvelle ou modifiée : rien à soumettre à Brave cette semaine.';
  const scope = all ? 'tout le sitemap, option --all' : 'URL nouvelles ou modifiées';
  return `${toSubmit.length} URL à soumettre une par une sur ${BRAVE_SUBMIT_URL} (${scope}), par la tâche planifiée « Soumission Brave hebdomadaire Waimia ». Ce script ne soumet rien.`;
}

export async function runBraveQueue({ all = false, persist = true, today = new Date(), urls = null, stateFile = BRAVE_STATE_FILE } = {}) {
  const sitemapUrls = urls ?? (await fetchSitemapUrls(SITEMAP_URL)).urls;
  const state = await readJson(stateFile, null);
  const now = today.toISOString();
  const sel = selectBraveQueue(sitemapUrls, state, { all, week: isoWeek(today), now });
  if (persist) await writeJson(stateFile, sel.nextState);
  return {
    generatedAt: now,
    submitUrl: BRAVE_SUBMIT_URL,
    sitemapUrlCount: sitemapUrls.length,
    mode: all ? 'passe complète' : sel.seeded ? 'amorçage' : 'nouvelles ou modifiées',
    added: sel.added,
    modified: sel.modified,
    carried: sel.carried,
    toSubmit: sel.toSubmit,
    count: sel.toSubmit.length,
    note: braveNote({ ...sel, sitemapUrlCount: sitemapUrls.length }),
  };
}

const onSite = (loc) => loc === SITE_ORIGIN || String(loc).startsWith(`${SITE_ORIGIN}/`);

/**
 * File autonome, sans état. Fonction pure.
 * @param {Array<{loc:string, lastmod:string|null}>} urls URL du sitemap de production
 * @param {{now?:Date, days?:number, cap?:number, offset?:number, extra?:string[], knownUrls?:string[]|null}} options
 *   extra : `brave.toSubmit` de latest.json ; knownUrls : URL déjà vues par la dernière inspection
 *   d'indexation (`null` = inconnu, aucune priorité aux pages nouvelles).
 */
export function selectFromSitemap(urls, { now = new Date(), days = BRAVE_RECENT_DAYS, cap = BRAVE_BATCH_CAP, offset = 0, extra = [], knownUrls = null } = {}) {
  const limitMs = days * 86400000;
  const site = urls.filter((u) => onSite(u.loc));
  const undated = site.filter((u) => !u.lastmod || Number.isNaN(new Date(u.lastmod).getTime())).map((u) => u.loc);
  const recent = site
    .filter((u) => u.lastmod && !Number.isNaN(new Date(u.lastmod).getTime()))
    .filter((u) => {
      const age = now.getTime() - new Date(u.lastmod).getTime();
      return age < limitMs;
    })
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod) || a.loc.localeCompare(b.loc));
  const known = knownUrls ? new Set(knownUrls.map(normalizeUrl)) : null;
  const fromCollect = [...new Set(extra.filter(onSite))];
  const fresh = known ? recent.filter((u) => !known.has(normalizeUrl(u.loc))).map((u) => u.loc) : [];
  const candidates = [...new Set([...fromCollect, ...fresh, ...recent.map((u) => u.loc)])];
  const start = Math.max(0, offset);
  const toSubmit = candidates.slice(start, start + cap);
  return {
    days,
    since: new Date(now.getTime() - limitMs).toISOString(),
    cap,
    offset: start,
    sitemapUrlCount: site.length,
    recentCount: recent.length,
    fromCollectCount: fromCollect.length,
    newSinceLastInspection: known ? fresh : null,
    undated,
    total: candidates.length,
    toSubmit,
    count: toSubmit.length,
    remaining: candidates.slice(start + cap),
    nextOffset: start + cap < candidates.length ? start + cap : null,
  };
}

/** Lit un sitemap depuis une URL (index suivi) ou un fichier local enregistré. */
async function readSitemap(source) {
  if (/^https?:\/\//i.test(source)) return (await fetchSitemapUrls(source)).urls;
  return parseSitemap(await readFile(source, 'utf8')).urls;
}

export async function runFromSitemap({ sitemap = SITEMAP_URL, days = BRAVE_RECENT_DAYS, cap = BRAVE_BATCH_CAP, offset = 0, now = new Date(), dataDir = DATA_DIR } = {}) {
  const urls = await readSitemap(sitemap);
  const latest = await readJson(join(dataDir, 'latest.json'), null);
  const indexState = await readJson(join(dataDir, 'state', 'gsc-index.json'), null);
  const sel = selectFromSitemap(urls, {
    now,
    days,
    cap,
    offset,
    extra: latest?.brave?.toSubmit ?? [],
    knownUrls: indexState?.urls ? Object.keys(indexState.urls) : null,
  });
  return { generatedAt: now.toISOString(), submitUrl: BRAVE_SUBMIT_URL, sitemap, latestGeneratedAt: latest?.generatedAt ?? null, ...sel };
}

export function formatFromSitemap(out) {
  const lines = [
    `File Brave autonome · calculée le ${out.generatedAt}`,
    `Sitemap : ${out.sitemap} · ${out.sitemapUrlCount} URL, dont ${out.recentCount} au lastmod de moins de ${out.days} jours (depuis ${out.since.slice(0, 10)}).`,
    `File de la collecte (latest.json > brave.toSubmit) : ${out.fromCollectCount} URL${out.latestGeneratedAt ? `, collecte du ${out.latestGeneratedAt}` : ' (pas de latest.json, ou pas de clé brave)'}.`,
  ];
  if (out.newSinceLastInspection) lines.push(`Pages inconnues de la dernière inspection d'indexation, placées en tête : ${out.newSinceLastInspection.length}.`);
  if (out.undated.length) lines.push(`URL sans lastmod, non datables, laissées de côté : ${out.undated.length}.`);
  lines.push(`Total : ${out.total} URL. Plafond par exécution : ${out.cap}. Départ : ${out.offset}.`, '');
  if (out.count === 0) lines.push('RIEN À SOUMETTRE.');
  else lines.push(`À SOUMETTRE MAINTENANT (${out.count}), une par une sur ${out.submitUrl} :`, ...out.toSubmit);
  if (out.remaining.length) lines.push('', `À REPRENDRE (${out.remaining.length}), dans une autre exécution, avec --offset=${out.nextOffset} :`, ...out.remaining);
  return lines.join('\n');
}

const numArg = (name, fallback) => {
  const raw = process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) throw new Error(`--${name} attend un entier positif ou nul (reçu : ${raw})`);
  return n;
};

if (isMain(import.meta.url)) {
  try {
    if (process.argv.includes('--from-sitemap')) {
      const sitemap = process.argv.find((a) => a.startsWith('--sitemap='))?.slice('--sitemap='.length) || SITEMAP_URL;
      const days = numArg('days', BRAVE_RECENT_DAYS);
      const cap = numArg('cap', BRAVE_BATCH_CAP);
      if (days < 1 || cap < 1) throw new Error('--days et --cap attendent au moins 1');
      const out = await runFromSitemap({ sitemap, days, cap, offset: numArg('offset', 0) });
      console.log(process.argv.includes('--json') ? JSON.stringify(out, null, 2) : formatFromSitemap(out));
      process.exit(0);
    }
    const dryRun = process.argv.includes('--dry-run');
    console.log(JSON.stringify(await runBraveQueue({ all: process.argv.includes('--all'), persist: !dryRun }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
