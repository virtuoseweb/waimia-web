/**
 * Veille concurrente : lit le sitemap de chaque concurrent listé dans docs/seo/competitors.json
 * et détecte les URL nouvelles depuis la dernière exécution (état dans docs/seo/data/state/).
 * Pour les nouvelles URL, relève title, h1 et meta description (dans la limite fixée), ce qui
 * montre quelle requête la page vise. Un concurrent en erreur n'arrête pas le script.
 *
 * Usage direct : `node scripts/seo-routine/competitors.mjs [--dry-run]`.
 */
import { join } from 'node:path';
import { SEO_DIR, STATE_DIR, THRESHOLDS } from './config.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { fetchText, readJson, writeJson, mapLimit, ymd, isMain } from './lib/util.mjs';
import { cleanText, truncate } from './lib/xml.mjs';

export const COMPETITORS_FILE = join(SEO_DIR, 'competitors.json');
export const COMPETITORS_STATE_FILE = join(STATE_DIR, 'competitors.json');

/**
 * Compare les URL du sitemap à l'état connu d'un concurrent. Fonction pure.
 * Première exécution : tout est enregistré comme base, aucune « nouveauté » n'est signalée.
 */
export function diffCompetitor(urls, previous, today) {
  const known = previous?.urls ?? {};
  const baseline = !previous;
  const nextUrls = {};
  const added = [];
  for (const u of urls) {
    nextUrls[u.loc] = known[u.loc] ?? today;
    if (!baseline && !(u.loc in known)) added.push({ url: u.loc, lastmod: u.lastmod });
  }
  const current = new Set(urls.map((u) => u.loc));
  const removed = baseline ? [] : Object.keys(known).filter((loc) => !current.has(loc));
  return { baseline, added, removed, state: { updatedAt: today, urls: nextUrls } };
}

/** Extrait title, h1 et meta description d'un document HTML. Fonction pure. */
export function extractPageSignals(html) {
  const pick = (re) => {
    const m = html.match(re);
    return m ? truncate(cleanText(m[1]), 200) : null;
  };
  return {
    title: pick(/<title[^>]*>([\s\S]*?)<\/title>/i),
    h1: pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i),
    description: pick(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ?? pick(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i),
  };
}

export async function collectCompetitors({ today = new Date(), persist = true } = {}) {
  const config = await readJson(COMPETITORS_FILE);
  if (!config?.competitors?.length) throw new Error(`aucun concurrent dans ${COMPETITORS_FILE}`);
  const state = (await readJson(COMPETITORS_STATE_FILE, null)) ?? { competitors: {} };
  const day = ymd(today);
  const results = await mapLimit(config.competitors, 3, async (c) => {
    const base = { domain: c.domain, role: c.role ?? null, sitemap: c.sitemap ?? null };
    if (!c.sitemap) return { ...base, ok: false, error: 'aucun sitemap connu pour ce concurrent' };
    try {
      const { urls } = await fetchSitemapUrls(c.sitemap);
      const diff = diffCompetitor(urls, state.competitors[c.domain] ?? null, day);
      const toFetch = diff.added.slice(0, THRESHOLDS.competitorMaxPageFetch);
      const enriched = await mapLimit(toFetch, 2, async (a) => {
        try {
          return { ...a, ...extractPageSignals(await fetchText(a.url, { retries: 0, timeoutMs: 15000, headers: { accept: 'text/html' } })) };
        } catch (err) {
          return { ...a, fetchError: err.message };
        }
      });
      state.competitors[c.domain] = diff.state;
      return {
        ...base,
        ok: true,
        urlCount: urls.length,
        baseline: diff.baseline,
        newCount: diff.added.length,
        newUrls: [...enriched, ...diff.added.slice(toFetch.length)],
        removedCount: diff.removed.length,
        removedUrls: diff.removed.slice(0, 30),
      };
    } catch (err) {
      return { ...base, ok: false, error: err.message };
    }
  });
  if (persist) await writeJson(COMPETITORS_STATE_FILE, state);
  return {
    generatedAt: new Date().toISOString(),
    competitorsInError: results.filter((r) => !r.ok).map((r) => ({ domain: r.domain, error: r.error })),
    totalNew: results.reduce((s, r) => s + (r.newCount ?? 0), 0),
    competitors: results,
  };
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await collectCompetitors({ persist: !process.argv.includes('--dry-run') }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
