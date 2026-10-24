/**
 * Search Console · surfaces « actualités » (searchAnalytics/query, paramètre `type`) :
 *   - `discover`   : Google Discover (rapport Discover) ;
 *   - `googleNews` : Google Actualités (application et news.google.com) ;
 *   - `news`       : onglet « Actualités » de la recherche Google.
 * Périodes : 28 derniers jours (jusqu'à J-3, données finalisées) et les 28 précédents.
 * Regroupements : total et par page (Discover n'expose pas les requêtes).
 *
 * LIMITE à lire avant de s'y fier : l'apparence « À la une » (Top stories) du résultat de
 * recherche n'a PAS de valeur dans l'API (ni `type`, ni `searchAppearance`) : elle ne se suit
 * que dans l'interface Search Console (Performances, onglet Recherche, filtre « Apparence
 * dans les résultats de recherche » quand il existe pour la propriété). Les deux autres
 * rapports restent vides tant que Google ne montre aucune page du site : « aucune donnée »
 * est alors un résultat normal, pas une erreur. Usage direct : `node scripts/seo-routine/gsc-news.mjs`.
 */
import { gscFetch, siteParam, NotConfiguredError, isConfigured } from './gsc-auth.mjs';
import { buildPeriods } from './gsc-performance.mjs';
import { isMain } from './lib/util.mjs';
import { toRow } from './lib/analysis.mjs';

export const NEWS_SEARCH_TYPES = ['discover', 'googleNews', 'news'];
const ROW_LIMIT = 1000;

async function query(period, type, dimensions) {
  const res = await gscFetch(`https://www.googleapis.com/webmasters/v3/sites/${siteParam()}/searchAnalytics/query`, {
    method: 'POST',
    body: { ...period, dimensions, type, dataState: 'final', rowLimit: ROW_LIMIT },
  });
  return (res.rows ?? []).map((r) => toRow(r, dimensions));
}

/** Total d'une période : la ligne agrégée, ou des zéros quand Google ne renvoie rien. */
export function totalsOf(rows) {
  return rows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

/** Variation courante contre précédente pour un type donné. Fonction pure. */
export function compareTypes(byType) {
  const out = {};
  for (const [type, data] of Object.entries(byType)) {
    const cur = data.last28.totals;
    const prev = data.previous28.totals;
    out[type] = {
      clicks: { current: cur.clicks, previous: prev.clicks, delta: cur.clicks - prev.clicks },
      impressions: { current: cur.impressions, previous: prev.impressions, delta: cur.impressions - prev.impressions },
      topPages: [...data.last28.byPage].sort((a, b) => b.impressions - a.impressions).slice(0, 10),
      hasData: cur.impressions > 0 || prev.impressions > 0,
    };
  }
  return out;
}

export async function collectNews({ today = new Date() } = {}) {
  if (!isConfigured()) throw new NotConfiguredError();
  const { last28, previous28 } = buildPeriods(today);
  const byType = {};
  for (const type of NEWS_SEARCH_TYPES) {
    byType[type] = {};
    for (const [name, period] of Object.entries({ last28, previous28 })) {
      const [totals, byPage] = await Promise.all([query(period, type, []), query(period, type, ['page'])]);
      byType[type][name] = { ...period, totals: totalsOf(totals), byPage };
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    dataState: 'final',
    limits: "L'apparence « À la une » n'est pas exposée par l'API : à suivre dans l'interface Search Console.",
    byType,
    comparison: compareTypes(byType),
  };
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await collectNews(), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
