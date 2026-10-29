/**
 * Construit le résumé hebdomadaire (docs/seo/data/latest.json) à partir des sorties de chaque
 * étape. Fonction pure : une étape absente ou en erreur donne une section `null`, et la raison
 * est dans `steps`.
 */
import { truncate } from './xml.mjs';
import { compareKpi, selectStrikingDistance, selectLowCtr, trackKeywords, movers } from './analysis.mjs';

const pathOf = (url) => {
  try {
    return new URL(url).pathname.replace(/\/$/, '') || '/';
  } catch {
    return url;
  }
};

export function summarizePerformance(perf, keywords) {
  if (!perf) return null;
  const p = perf.periods;
  const withPath = (rows) => rows.map((r) => ({ ...r, path: pathOf(r.page) }));
  return {
    periods: Object.fromEntries(Object.entries(p).map(([k, v]) => [k, { startDate: v.startDate, endDate: v.endDate }])),
    kpi: {
      last7: compareKpi(p.last7.totals, p.previous7.totals),
      last28: compareKpi(p.last28.totals, p.previous28.totals),
    },
    strikingDistance: selectStrikingDistance(p.last28.byPageQuery).map((r) => ({ query: r.query, path: pathOf(r.page), position: r.position, impressions: r.impressions, clicks: r.clicks, ctr: r.ctr })),
    lowCtrPages: withPath(selectLowCtr(p.last28.byPage)).map(({ page, ...rest }) => rest),
    topPages: withPath([...p.last28.byPage].sort((a, b) => b.impressions - a.impressions).slice(0, 15)).map(({ page, ...rest }) => rest),
    topQueries: [...p.last28.byQuery].sort((a, b) => b.impressions - a.impressions).slice(0, 25),
    pageMovers: movers(withPath(p.last28.byPage), withPath(p.previous28.byPage), 'path'),
    queryMovers: movers(p.last28.byQuery, p.previous28.byQuery, 'query'),
    keywords: trackKeywords(keywords, p.last28.byPageQuery, p.previous28.byPageQuery),
  };
}

export function summarizeKeywordsWithoutGsc(keywords) {
  return keywords.map((k) => ({ query: k.query, cluster: k.cluster, priority: k.priority, volume: k.volume, difficulty: k.difficulty, target: k.target, visible: null, position: null, rankedPage: null }));
}

export function buildSummary({ week, generatedAt, steps, perf, index, news, sitemap, indexnow, indexingApi, brave, feeds, competitors, keywords = [], sitemapPaths = null }) {
  const gsc = summarizePerformance(perf, keywords);
  const targets = [...new Set(keywords.map((k) => k.target).filter(Boolean))];
  return {
    week,
    generatedAt,
    dataDir: `docs/seo/data/${week}/`,
    steps,
    gscConfigured: !Object.values(steps).some((s) => s.status === 'non configuré'),
    performance: !gsc ? null : { periods: gsc.periods, kpi: gsc.kpi, strikingDistance: gsc.strikingDistance, lowCtrPages: gsc.lowCtrPages, topPages: gsc.topPages, topQueries: gsc.topQueries, pageMovers: gsc.pageMovers, queryMovers: gsc.queryMovers },
    keywords: {
      tracked: keywords.length,
      withoutTarget: keywords.filter((k) => !k.target).map((k) => k.query),
      targetsMissingFromSitemap: sitemapPaths ? targets.filter((t) => !sitemapPaths.includes(t)) : null,
      visible: gsc ? gsc.keywords.filter((k) => k.visible).length : null,
      rows: gsc ? gsc.keywords : summarizeKeywordsWithoutGsc(keywords),
    },
    indexation: !index ? null : {
      sitemapUrlCount: index.sitemapUrlCount,
      inspected: index.inspected,
      indexed: index.indexed,
      notIndexedCount: index.notIndexedCount,
      truncated: index.truncated,
      byCoverageState: index.byCoverageState,
      changes: index.changes,
      canonicalMismatches: index.canonicalMismatches,
      notIndexed: index.notIndexed.map((n) => ({ path: pathOf(n.url), coverageState: n.coverageState, lastCrawlTime: n.lastCrawlTime, notIndexedSince: n.notIndexedSince, weeksNotIndexed: n.weeksNotIndexed })),
      inspectionErrors: index.errors.length,
    },
    // Discover / Google Actualités / onglet Actualités (gsc-news.mjs) : 28 jours contre 28 jours.
    news: !news ? null : { comparison: news.comparison, limits: news.limits },
    sitemap: !sitemap ? null : { submitted: sitemap.submitted, submitError: sitemap.submitError, ...sitemap.status },
    indexnow: !indexnow ? null : { status: indexnow.status, sent: indexnow.sent, added: indexnow.added.length, modified: indexnow.modified.length, lastSubmission: indexnow.lastSubmission, note: indexnow.note ?? null },
    indexingApi: !indexingApi ? null : {
      status: indexingApi.status,
      mode: indexingApi.mode,
      submitted: indexingApi.submitted.length,
      wouldSubmit: indexingApi.wouldSubmit?.length ?? null,
      added: indexingApi.added.length,
      modified: indexingApi.modified.length,
      unchanged: indexingApi.unchanged,
      prioritizedNotIndexed: indexingApi.prioritized.length,
      deferred: indexingApi.deferred.length,
      errors: indexingApi.errors.length,
      firstError: indexingApi.errors[0]?.error ?? null,
      quota: indexingApi.quota,
      lastSubmission: indexingApi.lastSubmission,
      submittedPaths: indexingApi.submitted.map(pathOf),
      note: indexingApi.note ?? null,
    },
    // File à soumettre à la main sur search.brave.com/submit-url (aucune API) : voir brave-queue.mjs.
    brave: !brave ? null : { toSubmit: brave.toSubmit, count: brave.toSubmit.length, note: brave.note ?? null },
    feeds: !feeds ? null : {
      entryCount: feeds.entryCount,
      byTheme: feeds.byTheme,
      feedsInError: feeds.feedsInError,
      // Résumés raccourcis ici ; le texte complet est dans <semaine>/feeds.json.
      entries: feeds.entries.map(({ title, link, date, source, theme, summary }) => ({ title, link, date: date.slice(0, 10), source, theme, summary: truncate(summary ?? '', 160) })),
    },
    competitors: !competitors ? null : {
      totalNew: competitors.totalNew,
      competitorsInError: competitors.competitorsInError,
      rows: competitors.competitors.filter((c) => c.ok).map((c) => ({ domain: c.domain, role: c.role, urlCount: c.urlCount, baseline: c.baseline, newCount: c.newCount, removedCount: c.removedCount, newUrls: c.newUrls.slice(0, 20) })),
    },
  };
}
