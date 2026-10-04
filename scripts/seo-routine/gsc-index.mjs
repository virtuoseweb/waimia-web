/**
 * Search Console · URL Inspection API (urlInspection/index:inspect).
 * Inspecte chaque URL du sitemap de production : verdict, coverageState, dernière exploration,
 * canonique retenue par Google. Compare à l'état de la semaine précédente.
 *
 * Quotas (par propriété) : 2 000 inspections par jour, 600 par minute. Le script plafonne à
 * INSPECTION_DAILY_CAP par exécution et lisse le débit sous INSPECTION_PER_MINUTE. Si le sitemap
 * dépasse le plafond, les URL non indexées ou jamais inspectées passent en premier.
 *
 * Rappel : cette API LIT l'état d'indexation. Elle ne demande pas l'indexation.
 *
 * Usage direct : `node scripts/seo-routine/gsc-index.mjs` (JSON sur la sortie standard).
 */
import { join } from 'node:path';
import { GSC_SITE_URL, SITEMAP_URL, STATE_DIR, INSPECTION_DAILY_CAP, INSPECTION_PER_MINUTE } from './config.mjs';
import { gscFetch, NotConfiguredError, isConfigured } from './gsc-auth.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { readJson, writeJson, mapLimit, sleep, ymd, isMain } from './lib/util.mjs';

export const INDEX_STATE_FILE = join(STATE_DIR, 'gsc-index.json');

/** Google considère la page comme indexée quand le verdict est PASS. */
export const isIndexed = (r) => r?.verdict === 'PASS';

function weeksBetween(fromYmd, toYmd) {
  if (!fromYmd) return 0;
  return Math.floor((Date.parse(toYmd) - Date.parse(fromYmd)) / (7 * 86400000));
}

/**
 * Compare les résultats du jour à l'état précédent et produit le nouvel état.
 * Fonction pure, testée. `notIndexedSince` conserve la première date d'observation.
 */
export function diffIndexState(results, previousState, today) {
  const prev = previousState?.urls ?? {};
  const nextUrls = {};
  const newlyIndexed = [];
  const newlyNotIndexed = [];
  const firstSeen = [];
  const notIndexed = [];
  for (const r of results) {
    const before = prev[r.url];
    if (r.error) {
      // Inspection en échec : on garde l'état connu, sans conclure.
      if (before) nextUrls[r.url] = before;
      continue;
    }
    const indexed = isIndexed(r);
    const since = indexed ? null : (before && before.indexed === false && before.notIndexedSince) || today;
    nextUrls[r.url] = { indexed, verdict: r.verdict, coverageState: r.coverageState, notIndexedSince: since, lastInspected: today };
    if (!before) firstSeen.push(r.url);
    else if (indexed && before.indexed === false) newlyIndexed.push(r.url);
    else if (!indexed && before.indexed === true) newlyNotIndexed.push({ url: r.url, coverageState: r.coverageState });
    if (!indexed) {
      notIndexed.push({
        url: r.url,
        verdict: r.verdict,
        coverageState: r.coverageState,
        indexingState: r.indexingState,
        pageFetchState: r.pageFetchState,
        robotsTxtState: r.robotsTxtState,
        lastCrawlTime: r.lastCrawlTime,
        googleCanonical: r.googleCanonical,
        notIndexedSince: since,
        weeksNotIndexed: weeksBetween(since, today),
      });
    }
  }
  // URL non inspectées cette fois (plafond de quota) : on conserve leur dernier état connu.
  const inspected = new Set(results.map((r) => r.url));
  for (const [url, state] of Object.entries(prev)) if (!inspected.has(url) && !nextUrls[url]) nextUrls[url] = state;
  notIndexed.sort((a, b) => b.weeksNotIndexed - a.weeksNotIndexed || a.url.localeCompare(b.url));
  return {
    state: { updatedAt: today, urls: nextUrls },
    changes: { hasPrevious: Boolean(previousState), previousRun: previousState?.updatedAt ?? null, newlyIndexed, newlyNotIndexed, firstSeen },
    notIndexed,
  };
}

/** Ordre d'inspection quand le plafond s'applique : non indexées et inconnues d'abord, puis les plus anciennes. */
export function prioritize(urls, previousState, cap) {
  const prev = previousState?.urls ?? {};
  const rank = (u) => {
    const s = prev[u.loc];
    if (!s) return 0;
    if (s.indexed === false) return 1;
    return 2;
  };
  return [...urls]
    .sort((a, b) => rank(a) - rank(b) || String(prev[a.loc]?.lastInspected ?? '').localeCompare(String(prev[b.loc]?.lastInspected ?? '')))
    .slice(0, cap);
}

async function inspect(url) {
  const res = await gscFetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    body: { inspectionUrl: url, siteUrl: GSC_SITE_URL, languageCode: 'fr' },
  });
  const s = res.inspectionResult?.indexStatusResult ?? {};
  return {
    url,
    verdict: s.verdict ?? null,
    coverageState: s.coverageState ?? null,
    robotsTxtState: s.robotsTxtState ?? null,
    indexingState: s.indexingState ?? null,
    pageFetchState: s.pageFetchState ?? null,
    lastCrawlTime: s.lastCrawlTime ?? null,
    crawledAs: s.crawledAs ?? null,
    googleCanonical: s.googleCanonical ?? null,
    userCanonical: s.userCanonical ?? null,
    canonicalMismatch: Boolean(s.googleCanonical && s.userCanonical && s.googleCanonical !== s.userCanonical),
    inSitemaps: s.sitemap ?? [],
    referringUrls: (s.referringUrls ?? []).slice(0, 5),
  };
}

export async function collectIndex({ today = new Date(), persist = true } = {}) {
  if (!isConfigured()) throw new NotConfiguredError();
  const day = ymd(today);
  const { urls } = await fetchSitemapUrls(SITEMAP_URL);
  const previousState = await readJson(INDEX_STATE_FILE, null);
  const targets = prioritize(urls, previousState, INSPECTION_DAILY_CAP);
  const concurrency = 4;
  const minGapMs = Math.ceil((60000 / INSPECTION_PER_MINUTE) * concurrency);
  const results = await mapLimit(targets, concurrency, async (u) => {
    const started = Date.now();
    let result;
    try {
      result = await inspect(u.loc);
    } catch (err) {
      result = { url: u.loc, error: err.message };
    }
    const wait = minGapMs - (Date.now() - started);
    if (wait > 0) await sleep(wait);
    return result;
  });
  const failures = results.filter((r) => r.error);
  if (failures.length === results.length && results.length) {
    throw new Error(`toutes les inspections ont échoué : ${failures[0].error}`);
  }
  const { state, changes, notIndexed } = diffIndexState(results, previousState, day);
  if (persist) await writeJson(INDEX_STATE_FILE, state);
  const ok = results.filter((r) => !r.error);
  const byCoverage = {};
  for (const r of ok) byCoverage[r.coverageState ?? 'inconnu'] = (byCoverage[r.coverageState ?? 'inconnu'] ?? 0) + 1;
  return {
    generatedAt: new Date().toISOString(),
    sitemap: SITEMAP_URL,
    sitemapUrlCount: urls.length,
    inspected: ok.length,
    truncated: urls.length > targets.length,
    errors: failures.map((f) => ({ url: f.url, error: f.error })),
    indexed: ok.filter(isIndexed).length,
    notIndexedCount: notIndexed.length,
    byCoverageState: byCoverage,
    canonicalMismatches: ok.filter((r) => r.canonicalMismatch).map((r) => ({ url: r.url, googleCanonical: r.googleCanonical, userCanonical: r.userCanonical })),
    notIndexed,
    changes,
    results: ok,
  };
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await collectIndex({ persist: false }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
