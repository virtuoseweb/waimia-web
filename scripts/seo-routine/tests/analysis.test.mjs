import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { variation, compareKpi, selectStrikingDistance, selectLowCtr, trackKeywords, movers, toRow, expectedCtr } from '../lib/analysis.mjs';
import { buildPeriods } from '../gsc-performance.mjs';
import { diffIndexState, prioritize } from '../gsc-index.mjs';
import { selectChanged } from '../indexnow.mjs';
import { diffCompetitor, extractPageSignals } from '../competitors.mjs';
import { buildSummary } from '../lib/summary.mjs';
import { isoWeek } from '../lib/util.mjs';
import { buildAssertion, readServiceAccount, isConfigured } from '../gsc-auth.mjs';
import { generateKeyPairSync, createVerify } from 'node:crypto';

const data = JSON.parse(readFileSync(new URL('./fixtures/gsc-page-query.json', import.meta.url), 'utf8'));

test('variation : delta, pourcentage, précédent nul ou absent', () => {
  assert.deepEqual(variation(150, 100), { current: 150, previous: 100, delta: 50, pct: 50 });
  assert.deepEqual(variation(80, 100), { current: 80, previous: 100, delta: -20, pct: -20 });
  assert.deepEqual(variation(12, 0), { current: 12, previous: 0, delta: 12, pct: null });
  assert.deepEqual(variation(0, 0), { current: 0, previous: 0, delta: 0, pct: null });
  assert.deepEqual(variation(5, null), { current: 5, previous: null, delta: null, pct: null });
  assert.equal(variation(1, 3).pct, -66.7);
});

test('compareKpi : clics, impressions, CTR, position (delta négatif = gain)', () => {
  const kpi = compareKpi({ clicks: 30, impressions: 1200, ctr: 0.025, position: 14.26 }, { clicks: 20, impressions: 1000, ctr: 0.02, position: 18.91 });
  assert.equal(kpi.clicks.pct, 50);
  assert.equal(kpi.impressions.delta, 200);
  assert.equal(kpi.ctr.delta, 0.005);
  assert.deepEqual(kpi.position, { current: 14.3, previous: 18.9, delta: -4.6, pct: -24.3 });
  const empty = compareKpi(undefined, undefined);
  assert.equal(empty.clicks.current, 0);
  assert.equal(empty.position.current, null);
});

test('sélection « position 8 à 20 » : bornes incluses, minimum d\'impressions, tri par impressions', () => {
  const picked = selectStrikingDistance(data.current);
  assert.deepEqual(
    picked.map((r) => [r.query, r.position]),
    [
      ['agence n8n', 11.4],
      ['Formation N8N', 8.0],
      ['formation make', 20.0],
    ],
  );
  const queries = picked.map((r) => r.query);
  assert.ok(!queries.includes('audit ia'), 'position 4,2 : déjà dans le haut de page');
  assert.ok(!queries.includes('agent ia'), 'position 20,1 : au-delà de la borne');
  assert.ok(!queries.includes('agence ia lyon'), 'position 7,9 : en deçà de la borne');
  assert.ok(!queries.includes('n8n prix'), '3 impressions : sous le minimum');
  assert.equal(selectStrikingDistance(data.current, { minImpressions: 1 }).length, 4);
  assert.equal(selectStrikingDistance(data.current, { limit: 1 }).length, 1);
  assert.deepEqual(selectStrikingDistance([]), []);
});

test('pages à fortes impressions et CTR faible', () => {
  const rows = [
    { page: '/a', impressions: 500, ctr: 0.01, position: 3 },
    { page: '/b', impressions: 500, ctr: 0.09, position: 3 },
    { page: '/c', impressions: 10, ctr: 0, position: 2 },
    { page: '/d', impressions: 900, ctr: 0.004, position: 9 },
  ];
  assert.deepEqual(selectLowCtr(rows).map((r) => r.page), ['/d', '/a']);
  assert.equal(expectedCtr(1), 0.28);
  assert.equal(expectedCtr(15), 0.01);
});

test('suivi des mots-clés : correspondance sans casse ni accents, page classée, écart, cannibalisation', () => {
  const keywords = [
    { query: 'agence n8n', target: '/services/automatisation-n8n', cluster: 'n8n', priority: 1, volume: 320, difficulty: 8 },
    { query: 'formation n8n', target: '/formations/n8n', cluster: 'formation', priority: 1, volume: 1000, difficulty: 23 },
    { query: 'n8n prix', target: null, cluster: 'n8n', priority: 2, volume: 170, difficulty: 17 },
    { query: 'claude cowork', target: '/ressources/guides/claude-cowork', cluster: 'claude', priority: 1, volume: 14800, difficulty: 18 },
  ];
  const [n8n, formation, prix, cowork] = trackKeywords(keywords, data.current, data.previous);
  assert.equal(n8n.position, 11.4);
  assert.equal(n8n.previousPosition, 16.9);
  assert.equal(n8n.positionDelta, -5.5);
  assert.equal(n8n.impressions, 135);
  assert.equal(n8n.rankedPage, '/services/automatisation-n8n');
  assert.equal(n8n.onTarget, true);
  assert.deepEqual(n8n.cannibalisation, ['/services/automatisation-n8n', '/blog/avis-n8n-vs-zapier-2026']);
  assert.equal(formation.visible, true, '« Formation N8N » correspond à « formation n8n »');
  assert.equal(formation.previousPosition, null);
  assert.equal(prix.rankedPage, '/tarifs');
  assert.equal(prix.onTarget, false);
  assert.equal(cowork.visible, false);
  assert.equal(cowork.position, null);
});

test('movers : hausses, baisses et pages disparues', () => {
  const m = movers(
    [{ path: '/a', impressions: 100, position: 9, clicks: 1 }, { path: '/b', impressions: 10, position: 30, clicks: 0 }],
    [{ path: '/a', impressions: 40, position: 15 }, { path: '/b', impressions: 50, position: 12 }, { path: '/c', impressions: 20, position: 18 }],
    'path',
  );
  assert.deepEqual(m.up.map((r) => [r.path, r.delta]), [['/a', 60]]);
  assert.deepEqual(m.down.map((r) => [r.path, r.delta]), [['/b', -40], ['/c', -20]]);
});

test('toRow : ligne Search Analytics vers objet nommé', () => {
  assert.deepEqual(toRow({ keys: ['https://waimia.com/x', 'requête'], clicks: 2, impressions: 40, ctr: 0.05, position: 9.4567 }, ['page', 'query']), { page: 'https://waimia.com/x', query: 'requête', clicks: 2, impressions: 40, ctr: 0.05, position: 9.5 });
});

test('périodes : 7 et 28 jours jusqu\'à J-3 et périodes précédentes contiguës', () => {
  assert.deepEqual(buildPeriods(new Date('2026-10-05T04:30:00Z')), {
    last7: { startDate: '2026-09-26', endDate: '2026-10-02' },
    previous7: { startDate: '2026-09-19', endDate: '2026-09-25' },
    last28: { startDate: '2026-09-05', endDate: '2026-10-02' },
    previous28: { startDate: '2026-08-08', endDate: '2026-09-04' },
  });
});

test('semaine ISO', () => {
  assert.equal(isoWeek(new Date('2026-10-05T04:30:00Z')), '2026-W41');
  assert.equal(isoWeek(new Date('2026-10-04T23:00:00Z')), '2026-W40');
  assert.equal(isoWeek(new Date('2027-01-01T00:00:00Z')), '2026-W53');
  assert.equal(isoWeek(new Date('2024-12-30T00:00:00Z')), '2025-W01');
});

test('indexation : changements par rapport à la semaine précédente et ancienneté de non-indexation', () => {
  const previous = {
    updatedAt: '2026-09-28',
    urls: {
      'https://waimia.com/a': { indexed: false, coverageState: 'Détectée, actuellement non indexée', notIndexedSince: '2026-09-07', lastInspected: '2026-09-28' },
      'https://waimia.com/b': { indexed: true, notIndexedSince: null, lastInspected: '2026-09-28' },
      'https://waimia.com/c': { indexed: false, notIndexedSince: '2026-09-21', lastInspected: '2026-09-28' },
      'https://waimia.com/e': { indexed: true, notIndexedSince: null, lastInspected: '2026-09-28' },
    },
  };
  const results = [
    { url: 'https://waimia.com/a', verdict: 'NEUTRAL', coverageState: 'Détectée, actuellement non indexée' },
    { url: 'https://waimia.com/b', verdict: 'NEUTRAL', coverageState: 'Explorée, actuellement non indexée' },
    { url: 'https://waimia.com/c', verdict: 'PASS', coverageState: 'Envoyée et indexée' },
    { url: 'https://waimia.com/d', verdict: 'NEUTRAL', coverageState: 'URL inconnue de Google' },
    { url: 'https://waimia.com/e', error: 'API Google 500' },
  ];
  const { state, changes, notIndexed } = diffIndexState(results, previous, '2026-10-05');
  assert.deepEqual(changes.newlyIndexed, ['https://waimia.com/c']);
  assert.deepEqual(changes.newlyNotIndexed, [{ url: 'https://waimia.com/b', coverageState: 'Explorée, actuellement non indexée' }]);
  assert.deepEqual(changes.firstSeen, ['https://waimia.com/d']);
  assert.equal(changes.hasPrevious, true);
  assert.deepEqual(notIndexed.map((n) => [n.url.slice(-1), n.notIndexedSince, n.weeksNotIndexed]), [['a', '2026-09-07', 4], ['b', '2026-10-05', 0], ['d', '2026-10-05', 0]]);
  assert.equal(state.urls['https://waimia.com/c'].notIndexedSince, null);
  assert.equal(state.urls['https://waimia.com/e'].lastInspected, '2026-09-28', 'inspection en échec : état précédent conservé');

  const first = diffIndexState(results.slice(0, 1), null, '2026-10-05');
  assert.equal(first.changes.hasPrevious, false);
  assert.equal(first.notIndexed[0].weeksNotIndexed, 0);

  const order = prioritize([{ loc: 'https://waimia.com/b' }, { loc: 'https://waimia.com/a' }, { loc: 'https://waimia.com/z' }], previous, 2);
  assert.deepEqual(order.map((u) => u.loc.slice(-1)), ['z', 'a'], 'plafond de quota : inconnues puis non indexées');
});

test('IndexNow : URL nouvelles ou dont le lastmod a changé', () => {
  const urls = [
    { loc: 'https://waimia.com/a', lastmod: '2026-10-01' },
    { loc: 'https://waimia.com/b', lastmod: '2026-10-04' },
    { loc: 'https://waimia.com/c', lastmod: null },
    { loc: 'https://waimia.com/d', lastmod: '2026-10-04' },
  ];
  const state = { urls: { 'https://waimia.com/a': '2026-10-01', 'https://waimia.com/b': '2026-09-01', 'https://waimia.com/c': null } };
  assert.deepEqual(selectChanged(urls, state), { added: ['https://waimia.com/d'], modified: ['https://waimia.com/b'], toSend: ['https://waimia.com/d', 'https://waimia.com/b'] });
  assert.equal(selectChanged(urls, null).added.length, 4, 'premier envoi : tout le sitemap');
  assert.equal(selectChanged(urls.slice(0, 1), state).toSend.length, 0);
});

test('concurrents : base au premier passage, nouveautés et retraits ensuite', () => {
  const first = diffCompetitor([{ loc: 'https://c.test/a', lastmod: null }], null, '2026-09-28');
  assert.equal(first.baseline, true);
  assert.deepEqual(first.added, []);
  const second = diffCompetitor([{ loc: 'https://c.test/a', lastmod: null }, { loc: 'https://c.test/agence-n8n', lastmod: '2026-10-02' }], first.state, '2026-10-05');
  assert.deepEqual(second.added, [{ url: 'https://c.test/agence-n8n', lastmod: '2026-10-02' }]);
  assert.equal(second.state.urls['https://c.test/a'], '2026-09-28', 'date de première observation conservée');
  const third = diffCompetitor([{ loc: 'https://c.test/agence-n8n', lastmod: null }], second.state, '2026-10-12');
  assert.deepEqual(third.removed, ['https://c.test/a']);
  assert.deepEqual(extractPageSignals('<html><head><title>Agence n8n | C</title><meta name="description" content="Experts n8n."></head><body><h1 class="x">Agence <span>n8n</span></h1></body></html>'), { title: 'Agence n8n | C', h1: 'Agence n8n', description: 'Experts n8n.' });
});

test('résumé : Search Console non configuré, le reste présent', () => {
  const summary = buildSummary({
    week: '2026-W41',
    generatedAt: '2026-10-05T04:30:00.000Z',
    steps: { 'gsc-performance': { status: 'non configuré' }, feeds: { status: 'ok' } },
    feeds: { entryCount: 1, byTheme: { editeurs: 1 }, feedsInError: [], entries: [{ title: 'T', link: 'https://x.test', date: '2026-10-02T06:00:00.000Z', source: 'S', theme: 'editeurs', summary: '' }] },
    keywords: [{ query: 'agence n8n', target: '/services/automatisation-n8n', cluster: 'n8n', priority: 1, volume: 320, difficulty: 8 }, { query: 'n8n prix', target: null, cluster: 'n8n', priority: 2, volume: 170, difficulty: 17 }],
    sitemapPaths: ['/', '/contact'],
  });
  assert.equal(summary.gscConfigured, false);
  assert.equal(summary.performance, null);
  assert.equal(summary.indexation, null);
  assert.equal(summary.competitors, null);
  assert.equal(summary.feeds.entries[0].date, '2026-10-02');
  assert.deepEqual(summary.keywords.withoutTarget, ['n8n prix']);
  assert.deepEqual(summary.keywords.targetsMissingFromSitemap, ['/services/automatisation-n8n']);
  assert.equal(summary.keywords.rows[0].position, null);
});

test('résumé : KPI, position 8 à 20 et mots-clés à partir des données Search Console', () => {
  const period = (rows, totals) => ({ startDate: '2026-09-05', endDate: '2026-10-02', totals, byQuery: [], byPage: [], byPageQuery: rows });
  const perf = { periods: { last7: period([], { clicks: 5, impressions: 200, ctr: 0.025, position: 12 }), previous7: period([], { clicks: 4, impressions: 100, ctr: 0.04, position: 15 }), last28: period(data.current, { clicks: 13, impressions: 763, ctr: 0.017, position: 13.1 }), previous28: period(data.previous, { clicks: 10, impressions: 260, ctr: 0.038, position: 8 }) } };
  const summary = buildSummary({ week: '2026-W41', generatedAt: 'x', steps: { 'gsc-performance': { status: 'ok' } }, perf, keywords: [{ query: 'agence n8n', target: '/services/automatisation-n8n', cluster: 'n8n', priority: 1, volume: 320, difficulty: 8 }] });
  assert.equal(summary.gscConfigured, true);
  assert.equal(summary.performance.kpi.last7.impressions.pct, 100);
  assert.equal(summary.performance.kpi.last28.clicks.delta, 3);
  assert.deepEqual(summary.performance.strikingDistance.map((r) => r.path), ['/services/automatisation-n8n', '/formations/n8n', '/formations/make']);
  assert.equal(summary.keywords.visible, 1);
  assert.equal(summary.keywords.rows[0].positionDelta, -5.5);
});

test('compte de service : absence, JSON invalide, base64, assertion JWT vérifiable', () => {
  assert.equal(isConfigured({}), false);
  assert.throws(() => readServiceAccount({}), (e) => e.notConfigured === true);
  assert.throws(() => readServiceAccount({ GSC_SERVICE_ACCOUNT_JSON: '{"client_email":"x"}' }), /incomplet/);
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const sa = { client_email: 'routine@projet.iam.gserviceaccount.com', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }), private_key_id: 'k1', token_uri: 'https://oauth2.googleapis.com/token' };
  assert.equal(readServiceAccount({ GSC_SERVICE_ACCOUNT_JSON: Buffer.from(JSON.stringify(sa)).toString('base64') }).client_email, sa.client_email);
  const jwt = buildAssertion(sa, { now: 1791000000 });
  const [h, c, s] = jwt.split('.');
  const claims = JSON.parse(Buffer.from(c, 'base64url').toString());
  assert.deepEqual(claims, { iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters', aud: 'https://oauth2.googleapis.com/token', iat: 1791000000, exp: 1791003600 });
  assert.deepEqual(JSON.parse(Buffer.from(h, 'base64url').toString()), { alg: 'RS256', typ: 'JWT', kid: 'k1' });
  assert.ok(createVerify('RSA-SHA256').update(`${h}.${c}`).verify(publicKey, Buffer.from(s, 'base64url')));
});
