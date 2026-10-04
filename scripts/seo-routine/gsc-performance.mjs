/**
 * Search Console · Search Analytics (searchAnalytics/query).
 * Périodes : 7 et 28 derniers jours (jusqu'à J-3, données finalisées) et les périodes
 * précédentes de même durée. Regroupements : total, par requête, par page, par page+requête.
 *
 * Usage direct : `node scripts/seo-routine/gsc-performance.mjs` (JSON sur la sortie standard).
 */
import { GSC_DATA_LAG_DAYS } from './config.mjs';
import { gscFetch, siteParam, NotConfiguredError, isConfigured } from './gsc-auth.mjs';
import { addDays, ymd, isMain } from './lib/util.mjs';
import { toRow } from './lib/analysis.mjs';

const ROW_LIMIT = 25000;
const MAX_ROWS = 50000;

/** Bornes des quatre périodes à partir de la date du jour. */
export function buildPeriods(today = new Date(), lagDays = GSC_DATA_LAG_DAYS) {
  const end = addDays(today, -lagDays);
  const range = (startOffset, endOffset) => ({ startDate: ymd(addDays(end, startOffset)), endDate: ymd(addDays(end, endOffset)) });
  return {
    last7: range(-6, 0),
    previous7: range(-13, -7),
    last28: range(-27, 0),
    previous28: range(-55, -28),
  };
}

async function query(period, dimensions) {
  const rows = [];
  for (let startRow = 0; startRow < MAX_ROWS; startRow += ROW_LIMIT) {
    const res = await gscFetch(`https://www.googleapis.com/webmasters/v3/sites/${siteParam()}/searchAnalytics/query`, {
      method: 'POST',
      body: { ...period, dimensions, type: 'web', dataState: 'final', rowLimit: ROW_LIMIT, startRow },
    });
    const batch = res.rows ?? [];
    rows.push(...batch.map((r) => toRow(r, dimensions)));
    if (batch.length < ROW_LIMIT) break;
  }
  return rows;
}

export async function collectPerformance({ today = new Date() } = {}) {
  if (!isConfigured()) throw new NotConfiguredError();
  const periods = buildPeriods(today);
  const out = { generatedAt: new Date().toISOString(), dataState: 'final', searchType: 'web', periods: {} };
  for (const [name, period] of Object.entries(periods)) {
    const [totals, byQuery, byPage, byPageQuery] = await Promise.all([
      query(period, []),
      query(period, ['query']),
      query(period, ['page']),
      query(period, ['page', 'query']),
    ]);
    out.periods[name] = {
      ...period,
      totals: totals[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      byQuery,
      byPage,
      byPageQuery,
    };
  }
  return out;
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await collectPerformance(), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
