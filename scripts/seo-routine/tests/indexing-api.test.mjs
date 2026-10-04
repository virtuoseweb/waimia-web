import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { selectToSubmit, normalizeState, recordSubmission, quotaDay, explainError, parseArgs, runIndexingApi, submitOne, getStatus } from '../indexing-api.mjs';
import { buildAssertion, scopeString } from '../gsc-auth.mjs';
import { GSC_SCOPE, INDEXING_SCOPE } from '../config.mjs';
import { buildSummary } from '../lib/summary.mjs';

const U = (path, lastmod = null) => ({ loc: `https://waimia.com${path}`, lastmod });
const loc = (path) => `https://waimia.com${path}`;
const sentAt = '2026-10-05T04:31:00.000Z';

const SITEMAP = [U('/', '2026-10-01'), U('/services/a', '2026-10-02'), U('/services/b', '2026-09-20'), U('/blog/c', '2026-10-03'), U('/contact')];
const STATE = {
  lastSubmission: sentAt,
  quota: { date: '2026-10-04', count: 3 },
  urls: {
    [loc('/')]: { lastmod: '2026-10-01', submittedAt: sentAt },
    [loc('/services/a')]: { lastmod: '2026-09-15', submittedAt: sentAt },
    [loc('/services/b')]: { lastmod: '2026-09-20', submittedAt: sentAt },
    [loc('/contact')]: { lastmod: null, submittedAt: sentAt },
  },
};

test('sélection : nouvelle, lastmod changé, inchangée', () => {
  const sel = selectToSubmit(SITEMAP, STATE);
  assert.deepEqual(sel.added, [loc('/blog/c')]);
  assert.deepEqual(sel.modified, [loc('/services/a')]);
  assert.equal(sel.unchanged, 3);
  assert.deepEqual(sel.batch.map((u) => u.loc), [loc('/blog/c'), loc('/services/a')]);
  assert.deepEqual(sel.deferred, []);
});

test('sélection : une URL inchangée n\'est jamais resoumise, même non indexée', () => {
  const notIndexed = new Set([loc('/services/b'), loc('/contact')]);
  const sel = selectToSubmit(SITEMAP, STATE, { notIndexed });
  assert.ok(!sel.batch.some((u) => notIndexed.has(u.loc)));
  assert.deepEqual(sel.prioritized, []);
  // Tout est déjà soumis et rien n'a changé : rien ne part.
  const again = selectToSubmit([U('/', '2026-10-01'), U('/contact')], STATE, { notIndexed });
  assert.deepEqual(again.queue, []);
});

test('sélection : un lastmod retiré du sitemap ne compte pas comme une modification', () => {
  const sel = selectToSubmit([U('/services/b', null)], STATE);
  assert.deepEqual(sel.queue, []);
  assert.equal(sel.unchanged, 1);
});

test('sélection : les non indexées passent en premier, puis l\'ordre du sitemap', () => {
  const sitemap = [U('/n1', '2026-10-01'), U('/n2', '2026-10-01'), U('/n3', '2026-10-01'), U('/services/a', '2026-10-02')];
  const sel = selectToSubmit(sitemap, STATE, { notIndexed: new Set([loc('/n3'), loc('/services/a')]) });
  assert.deepEqual(sel.batch.map((u) => u.loc), [loc('/n3'), loc('/services/a'), loc('/n1'), loc('/n2')]);
  assert.deepEqual(sel.prioritized, [loc('/n3'), loc('/services/a')]);
});

test('sélection : --all reprend tout le sitemap, non indexées en tête', () => {
  const sel = selectToSubmit(SITEMAP, STATE, { all: true, notIndexed: new Set([loc('/contact')]) });
  assert.equal(sel.batch.length, SITEMAP.length);
  assert.equal(sel.batch[0].loc, loc('/contact'));
});

test('sélection : état vide, tout le sitemap est nouveau', () => {
  const sel = selectToSubmit(SITEMAP, null);
  assert.equal(sel.added.length, SITEMAP.length);
  assert.equal(sel.batch.length, SITEMAP.length);
});

test('plafond quotidien : le lot s\'arrête au quota restant, le reste est reporté', () => {
  const sitemap = Array.from({ length: 250 }, (_, i) => U(`/p/${i}`, '2026-10-01'));
  const full = selectToSubmit(sitemap, null, { remaining: 200 });
  assert.equal(full.batch.length, 200);
  assert.equal(full.deferred.length, 50);
  assert.equal(full.deferred[0], loc('/p/200'));
  const partial = selectToSubmit(sitemap, null, { remaining: 12 });
  assert.equal(partial.batch.length, 12);
  assert.equal(selectToSubmit(sitemap, null, { remaining: 0 }).batch.length, 0);
  assert.equal(selectToSubmit(sitemap, null, { remaining: -5 }).batch.length, 0);
  // Avec le plafond, les non indexées gardent la priorité.
  const prio = selectToSubmit(sitemap, null, { remaining: 2, notIndexed: new Set([loc('/p/249'), loc('/p/120')]) });
  assert.deepEqual(prio.batch.map((u) => u.loc), [loc('/p/120'), loc('/p/249')]);
});

test('état : le compteur repart à zéro un nouveau jour, l\'historique est conservé', () => {
  const same = normalizeState(STATE, '2026-10-04');
  assert.deepEqual(same.quota, { date: '2026-10-04', count: 3 });
  const next = normalizeState(STATE, '2026-10-05');
  assert.deepEqual(next.quota, { date: '2026-10-05', count: 0 });
  assert.deepEqual(next.urls, STATE.urls);
  assert.equal(next.lastSubmission, sentAt);
  assert.deepEqual(normalizeState(null, '2026-10-05'), { lastSubmission: null, quota: { date: '2026-10-05', count: 0 }, urls: {} });
});

test('état : une soumission enregistre le lastmod, la date et incrémente le compteur, sans muter', () => {
  const before = normalizeState(STATE, '2026-10-04');
  const after = recordSubmission(before, U('/blog/c', '2026-10-03'), '2026-10-04T10:00:00.000Z');
  assert.equal(after.quota.count, 4);
  assert.deepEqual(after.urls[loc('/blog/c')], { lastmod: '2026-10-03', submittedAt: '2026-10-04T10:00:00.000Z' });
  assert.equal(after.lastSubmission, '2026-10-04T10:00:00.000Z');
  assert.equal(before.quota.count, 3);
  assert.equal(before.urls[loc('/blog/c')], undefined);
  // Une fois enregistrée, l'URL n'est plus candidate.
  assert.deepEqual(selectToSubmit([U('/blog/c', '2026-10-03')], after).queue, []);
});

test('jour de quota : minuit, heure du Pacifique', () => {
  assert.equal(quotaDay(new Date('2026-10-05T04:30:00Z')), '2026-10-04');
  assert.equal(quotaDay(new Date('2026-10-05T12:00:00Z')), '2026-10-05');
});

test('erreurs : les 403 et 429 disent quoi faire', () => {
  const owner = explainError({ status: 403, googleMessage: 'Permission denied. Failed to verify the URL ownership.' }, 'sa@p.iam.gserviceaccount.com');
  assert.match(owner, /sa@p\.iam\.gserviceaccount\.com n'est pas propriétaire de sc-domain:waimia\.com/);
  assert.match(owner, /« Propriétaire »/);
  const disabled = explainError({ status: 403, googleMessage: 'Web Search Indexing API has not been used in project 123 before or it is disabled.' });
  assert.match(disabled, /activer « Web Search Indexing API »/);
  assert.doesNotMatch(disabled, /n'est pas propriétaire/);
  assert.match(explainError({ status: 429, googleMessage: "Insufficient tokens for quota 'indexing.googleapis.com/default_requests'" }), /quota épuisé/);
  assert.equal(explainError({ status: 500, message: 'API Google 500 : backend' }), 'API Google 500 : backend');
});

test('ligne de commande : --url, --status <url>, --status --url <url>, --dry-run, --all', () => {
  assert.deepEqual(parseArgs([]), { dryRun: false, all: false, status: false, url: null });
  assert.deepEqual(parseArgs(['--all', '--dry-run']), { dryRun: true, all: true, status: false, url: null });
  assert.equal(parseArgs(['--url', loc('/a')]).url, loc('/a'));
  assert.deepEqual(parseArgs(['--status', loc('/a')]), { dryRun: false, all: false, status: true, url: loc('/a') });
  assert.equal(parseArgs(['--status', '--url', loc('/a')]).url, loc('/a'));
  assert.equal(parseArgs(['--url', '--dry-run']).url, null);
});

test('sans secret : l\'étape est « non configuré », sans appel réseau', async () => {
  const deps = { fetchUrls: () => assert.fail('aucun accès réseau attendu sans secret') };
  for (const env of [{}, { GSC_SERVICE_ACCOUNT_JSON: '  ' }]) {
    await assert.rejects(runIndexingApi({ env, deps }), (err) => err.notConfigured === true && /Indexing API non configurée/.test(err.message));
    await assert.rejects(submitOne(loc('/a'), { env }), (err) => err.notConfigured === true);
    await assert.rejects(getStatus(loc('/a'), { env }), (err) => err.notConfigured === true);
  }
});

// Compte de service factice : la clé est générée pour le test, aucun appel à Google.
const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
const ENV = { GSC_SERVICE_ACCOUNT_JSON: JSON.stringify({ client_email: 'test@projet.iam.gserviceaccount.com', private_key: privateKey }) };
const TODAY = new Date('2026-10-05T12:00:00Z');

function fakeDeps({ urls = SITEMAP, state = null, notIndexed = [], publish = async () => ({}) } = {}) {
  const calls = { published: [], saved: [], waits: 0 };
  return {
    calls,
    deps: {
      fetchUrls: async () => urls,
      loadState: async () => state,
      saveState: async (s) => calls.saved.push(s),
      loadNotIndexed: async (indexOutput) => new Set(indexOutput?.notIndexed?.map((n) => n.url) ?? notIndexed),
      publish: async (url) => {
        calls.published.push(url);
        return publish(url, calls.published.length);
      },
      wait: async () => {
        calls.waits += 1;
      },
    },
  };
}

test('étape : soumet les nouvelles et modifiées, non indexées d\'abord, et enregistre l\'état', async () => {
  const { calls, deps } = fakeDeps({ state: STATE });
  const out = await runIndexingApi({ env: ENV, today: TODAY, deps, indexOutput: { notIndexed: [{ url: loc('/services/a') }] } });
  assert.equal(out.status, 'soumis');
  assert.deepEqual(calls.published, [loc('/services/a'), loc('/blog/c')]);
  assert.deepEqual(out.prioritized, [loc('/services/a')]);
  assert.equal(calls.waits, 1, 'un délai entre deux requêtes, aucun après la dernière');
  assert.equal(calls.saved.length, 1);
  assert.equal(calls.saved[0].urls[loc('/services/a')].lastmod, '2026-10-02');
  assert.deepEqual(out.quota, { date: '2026-10-05', used: 2, cap: 200 });
  // Deuxième passage avec l'état enregistré : rien ne repart.
  const second = fakeDeps({ state: calls.saved[0] });
  const again = await runIndexingApi({ env: ENV, today: TODAY, deps: second.deps });
  assert.equal(again.status, 'rien à soumettre');
  assert.deepEqual(second.calls.published, []);
});

test('étape : simulation, aucune requête ni écriture', async () => {
  const { calls, deps } = fakeDeps({ state: STATE });
  const out = await runIndexingApi({ env: ENV, today: TODAY, dryRun: true, deps });
  assert.equal(out.status, 'simulation');
  assert.deepEqual(out.wouldSubmit, [loc('/blog/c'), loc('/services/a')]);
  assert.deepEqual(calls.published, []);
  assert.deepEqual(calls.saved, []);
});

test('étape : plafond du jour atteint ou entamé', async () => {
  const urls = Array.from({ length: 30 }, (_, i) => U(`/p/${i}`, '2026-10-01'));
  const used = { quota: { date: '2026-10-05', count: 195 }, urls: {} };
  const a = fakeDeps({ urls, state: used });
  const out = await runIndexingApi({ env: ENV, today: TODAY, deps: a.deps });
  assert.equal(a.calls.published.length, 5);
  assert.equal(out.status, 'soumis en partie');
  assert.equal(out.deferred.length, 25);
  assert.equal(out.quota.used, 200);
  const b = fakeDeps({ urls, state: { quota: { date: '2026-10-05', count: 200 }, urls: {} } });
  const full = await runIndexingApi({ env: ENV, today: TODAY, deps: b.deps });
  assert.equal(full.status, 'quota atteint');
  assert.deepEqual(b.calls.published, []);
  // Le lendemain, le compteur est reparti : les 30 partent.
  const c = fakeDeps({ urls, state: used });
  const nextDay = await runIndexingApi({ env: ENV, today: new Date('2026-10-06T12:00:00Z'), deps: c.deps });
  assert.equal(nextDay.submitted.length, 30);
});

test('étape : un 403 arrête tout de suite et lève un message qui dit quoi faire', async () => {
  const refuse = async () => {
    throw Object.assign(new Error('API Google 403 : Permission denied. Failed to verify the URL ownership.'), { status: 403, googleMessage: 'Permission denied. Failed to verify the URL ownership.' });
  };
  const { calls, deps } = fakeDeps({ publish: refuse });
  await assert.rejects(runIndexingApi({ env: ENV, today: TODAY, deps }), /test@projet\.iam\.gserviceaccount\.com n'est pas propriétaire/);
  assert.equal(calls.published.length, 1, 'une seule requête, pas une par URL');
  assert.deepEqual(calls.saved, []);
});

test('étape : un 429 de Google arrête le lot, garde ce qui est passé et ne lève pas d\'erreur', async () => {
  const publish = async (_url, n) => {
    if (n === 3) throw Object.assign(new Error('API Google 429'), { status: 429, googleMessage: 'Insufficient tokens for quota' });
    return {};
  };
  const { calls, deps } = fakeDeps({ publish });
  const out = await runIndexingApi({ env: ENV, today: TODAY, deps });
  assert.equal(out.status, 'quota atteint');
  assert.equal(out.submitted.length, 2);
  assert.equal(out.deferred.length, 3);
  assert.equal(calls.published.length, 3);
  assert.equal(Object.keys(calls.saved[0].urls).length, 2);
});

test('étape : une erreur isolée n\'empêche pas les autres, l\'URL en échec repartira', async () => {
  const publish = async (url) => {
    if (url === loc('/services/a')) throw Object.assign(new Error('API Google 500 : backend'), { status: 500 });
    return {};
  };
  const { calls, deps } = fakeDeps({ publish });
  const out = await runIndexingApi({ env: ENV, today: TODAY, deps });
  assert.equal(out.status, 'soumis en partie');
  assert.equal(out.submitted.length, 4);
  assert.deepEqual(out.deferred, [loc('/services/a')]);
  assert.equal(calls.saved[0].urls[loc('/services/a')], undefined);
});

test('--url : refuse une URL hors du site', async () => {
  await assert.rejects(submitOne('https://virtuoseweb.fr/page', { env: ENV }), /hors de waimia\.com/);
  await assert.rejects(submitOne('pas-une-url', { env: ENV }), /URL invalide/);
  assert.deepEqual(await submitOne(loc('/a'), { env: ENV, dryRun: true }), { url: loc('/a'), status: 'simulation' });
});

test('authentification : liste de portées dans l\'assertion JWT', () => {
  assert.equal(scopeString([GSC_SCOPE, INDEXING_SCOPE]), `${GSC_SCOPE} ${INDEXING_SCOPE}`);
  assert.equal(scopeString(GSC_SCOPE), GSC_SCOPE);
  const sa = JSON.parse(ENV.GSC_SERVICE_ACCOUNT_JSON);
  const claims = (jwt) => JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString('utf8'));
  assert.equal(claims(buildAssertion(sa, { scope: [INDEXING_SCOPE] })).scope, 'https://www.googleapis.com/auth/indexing');
  assert.equal(claims(buildAssertion(sa)).scope, GSC_SCOPE);
});

test('résumé : section indexingApi de latest.json', () => {
  const indexingApi = { status: 'soumis en partie', mode: 'nouvelles et modifiées', submitted: [loc('/blog/c')], added: [loc('/blog/c')], modified: [loc('/services/a')], unchanged: 3, prioritized: [loc('/blog/c')], deferred: [loc('/services/a')], errors: [{ url: loc('/services/a'), status: 500, error: 'API Google 500 : backend' }], quota: { date: '2026-10-05', used: 1, cap: 200 }, lastSubmission: sentAt, note: 'n' };
  const s = buildSummary({ week: '2026-W41', generatedAt: sentAt, steps: { 'indexing-api': { status: 'ok' } }, indexingApi });
  assert.deepEqual(s.indexingApi, { status: 'soumis en partie', mode: 'nouvelles et modifiées', submitted: 1, wouldSubmit: null, added: 1, modified: 1, unchanged: 3, prioritizedNotIndexed: 1, deferred: 1, errors: 1, firstError: 'API Google 500 : backend', quota: { date: '2026-10-05', used: 1, cap: 200 }, lastSubmission: sentAt, submittedPaths: ['/blog/c'], note: 'n' });
  assert.equal(buildSummary({ week: '2026-W41', generatedAt: sentAt, steps: {} }).indexingApi, null);
});
