import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { selectBraveQueue, runBraveQueue, braveNote, selectFromSitemap, runFromSitemap, formatFromSitemap } from '../brave-queue.mjs';
import { buildSummary } from '../lib/summary.mjs';

const loc = (path) => `https://waimia.com${path}`;
const U = (path, lastmod = null) => ({ loc: loc(path), lastmod });

const SITEMAP = [U('/', '2026-10-01'), U('/services/a', '2026-10-02'), U('/services/b', '2026-09-20'), U('/blog/c', '2026-10-03'), U('/contact')];
const STATE = {
  week: '2026-W40',
  queue: [],
  urls: { [loc('/')]: '2026-10-01', [loc('/services/a')]: '2026-09-15', [loc('/services/b')]: '2026-09-20', [loc('/contact')]: null },
};

test('file : une URL nouvelle entre dans la file', () => {
  const sel = selectBraveQueue(SITEMAP, STATE, { week: '2026-W41' });
  assert.deepEqual(sel.added, [loc('/blog/c')]);
  assert.ok(sel.toSubmit.includes(loc('/blog/c')));
});

test('file : une URL dont le lastmod a changé entre dans la file', () => {
  const sel = selectBraveQueue(SITEMAP, STATE, { week: '2026-W41' });
  assert.deepEqual(sel.modified, [loc('/services/a')]);
  assert.deepEqual(sel.toSubmit, [loc('/blog/c'), loc('/services/a')]);
});

test('file : une URL inchangée ne ressort pas, et la file sortie est considérée transmise', () => {
  const first = selectBraveQueue(SITEMAP, STATE, { week: '2026-W41' });
  for (const path of ['/', '/services/b', '/contact']) assert.ok(!first.toSubmit.includes(loc(path)));
  // Semaine suivante, sitemap identique : plus rien à soumettre.
  const next = selectBraveQueue(SITEMAP, first.nextState, { week: '2026-W42' });
  assert.deepEqual(next.toSubmit, []);
  assert.match(braveNote({ ...next, sitemapUrlCount: SITEMAP.length }), /rien à soumettre/);
  // Le lastmod change de nouveau : l'URL ressort.
  const later = selectBraveQueue([...SITEMAP.slice(0, 4), U('/contact', '2026-10-20')], next.nextState, { week: '2026-W43' });
  assert.deepEqual(later.toSubmit, [loc('/contact')]);
});

test('file : une relance dans la même semaine conserve la file déjà sortie', () => {
  const first = selectBraveQueue(SITEMAP, STATE, { week: '2026-W41' });
  const rerun = selectBraveQueue([...SITEMAP, U('/blog/d', '2026-10-07')], first.nextState, { week: '2026-W41' });
  assert.deepEqual(rerun.toSubmit, [loc('/blog/c'), loc('/services/a'), loc('/blog/d')]);
  // Une URL retirée du sitemap sort de la file reportée.
  const removed = selectBraveQueue(SITEMAP.filter((u) => u.loc !== loc('/blog/c')), first.nextState, { week: '2026-W41' });
  assert.deepEqual(removed.toSubmit, [loc('/services/a')]);
});

test('amorçage : sans état, le sitemap courant est enregistré comme déjà soumis et la file est vide', () => {
  const sel = selectBraveQueue(SITEMAP, null, { week: '2026-W40', now: '2026-10-04T21:00:00.000Z' });
  assert.equal(sel.seeded, true);
  assert.deepEqual(sel.toSubmit, []);
  assert.equal(Object.keys(sel.nextState.urls).length, SITEMAP.length);
  assert.equal(sel.nextState.seededAt, '2026-10-04T21:00:00.000Z');
  assert.match(braveNote({ ...sel, sitemapUrlCount: SITEMAP.length }), /Amorçage : les 5 URL/);
  // Après l'amorçage, seule une vraie nouveauté sort.
  const next = selectBraveQueue([...SITEMAP, U('/blog/d', '2026-10-07')], sel.nextState, { week: '2026-W41' });
  assert.deepEqual(next.toSubmit, [loc('/blog/d')]);
});

test('--all : tout le sitemap part dans la file, avec ou sans état', () => {
  const withoutState = selectBraveQueue(SITEMAP, null, { all: true, week: '2026-W40' });
  assert.equal(withoutState.seeded, false);
  assert.deepEqual(withoutState.toSubmit, SITEMAP.map((u) => u.loc));
  const withState = selectBraveQueue(SITEMAP, STATE, { all: true, week: '2026-W41' });
  assert.deepEqual(withState.toSubmit, SITEMAP.map((u) => u.loc));
  assert.match(braveNote({ ...withState, sitemapUrlCount: SITEMAP.length }), /5 URL à soumettre.*--all/);
});

test('exécution : écrit l\'état, sauf en simulation, et alimente la clé `brave` du résumé', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'brave-queue-'));
  const stateFile = join(dir, 'state', 'brave.json');
  const today = new Date('2026-10-05T04:31:00.000Z');
  try {
    const dry = await runBraveQueue({ urls: SITEMAP, stateFile, persist: false, today });
    assert.equal(dry.mode, 'amorçage');
    await assert.rejects(readFile(stateFile), { code: 'ENOENT' });

    const seed = await runBraveQueue({ urls: SITEMAP, stateFile, today });
    assert.equal(seed.count, 0);
    const state = JSON.parse(await readFile(stateFile, 'utf8'));
    assert.equal(state.week, '2026-W41');
    assert.equal(Object.keys(state.urls).length, SITEMAP.length);

    const out = await runBraveQueue({ urls: [...SITEMAP, U('/blog/d', '2026-10-07')], stateFile, today: new Date('2026-10-12T04:31:00.000Z') });
    assert.deepEqual(out.toSubmit, [loc('/blog/d')]);
    const summary = buildSummary({ week: '2026-W42', generatedAt: out.generatedAt, steps: { 'brave-queue': { status: 'ok' } }, brave: out });
    assert.deepEqual(Object.keys(summary.brave), ['toSubmit', 'count', 'note']);
    assert.deepEqual(summary.brave.toSubmit, [loc('/blog/d')]);
    assert.equal(summary.brave.count, 1);
    assert.equal(buildSummary({ week: '2026-W42', generatedAt: out.generatedAt, steps: {} }).brave, null);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

// ── Mode autonome (--from-sitemap) : sans état, sans secret ─────────────────────────────────

// Lundi 12 octobre 2026, 06:21 UTC (8 h 21 à Paris) : heure de la tâche Brave.
const BRAVE_RUN = new Date('2026-10-12T06:21:00.000Z');
const D = (day) => `2026-${day}T00:00:00.000Z`;
const RECENT_SITEMAP = [
  U('/', D('10-01')),
  U('/services/a', D('10-05')), // lundi précédent : 7 jours et 6 heures, encore dans la fenêtre
  U('/services/b', D('10-04')), // dimanche d'avant : 8 jours et 6 heures, hors fenêtre
  U('/blog/c', D('10-10')),
  U('/blog/d', D('10-12')),
  U('/contact'),
  { loc: 'https://autre-site.test/page', lastmod: D('10-12') },
];

test('autonome : garde les URL du site dont le lastmod date de moins de 8 jours, les plus récentes d\'abord', () => {
  const sel = selectFromSitemap(RECENT_SITEMAP, { now: BRAVE_RUN });
  assert.deepEqual(sel.toSubmit, [loc('/blog/d'), loc('/blog/c'), loc('/services/a')]);
  assert.equal(sel.recentCount, 3);
  assert.equal(sel.sitemapUrlCount, 6);
  assert.deepEqual(sel.undated, [loc('/contact')]);
  assert.deepEqual(sel.remaining, []);
  assert.equal(sel.nextOffset, null);
  assert.equal(sel.newSinceLastInspection, null);
});

test('autonome : la fenêtre se règle avec `days`', () => {
  assert.deepEqual(selectFromSitemap(RECENT_SITEMAP, { now: BRAVE_RUN, days: 1 }).toSubmit, [loc('/blog/d')]);
  assert.equal(selectFromSitemap(RECENT_SITEMAP, { now: BRAVE_RUN, days: 30 }).count, 5);
});

test('autonome : réunit la file de la collecte (latest.json) sans doublon, en tête, même hors fenêtre', () => {
  const sel = selectFromSitemap(RECENT_SITEMAP, { now: BRAVE_RUN, extra: [loc('/services/b'), loc('/blog/c'), 'https://autre-site.test/x'] });
  assert.deepEqual(sel.toSubmit, [loc('/services/b'), loc('/blog/c'), loc('/blog/d'), loc('/services/a')]);
  assert.equal(sel.fromCollectCount, 2);
  assert.equal(sel.total, 4);
});

test('autonome : les pages inconnues de la dernière inspection d\'indexation passent avant les autres', () => {
  const sel = selectFromSitemap(RECENT_SITEMAP, { now: BRAVE_RUN, knownUrls: [loc('/'), loc('/blog/d'), loc('/blog/c')] });
  assert.deepEqual(sel.newSinceLastInspection, [loc('/services/a')]);
  assert.deepEqual(sel.toSubmit, [loc('/services/a'), loc('/blog/d'), loc('/blog/c')]);
});

test('autonome : plafond par exécution, le reste est « à reprendre » avec un départ', () => {
  const many = Array.from({ length: 47 }, (_, i) => U(`/p/${String(i).padStart(2, '0')}`, D('10-11')));
  const first = selectFromSitemap(many, { now: BRAVE_RUN });
  assert.equal(first.cap, 40);
  assert.equal(first.count, 40);
  assert.equal(first.remaining.length, 7);
  assert.equal(first.nextOffset, 40);
  const second = selectFromSitemap(many, { now: BRAVE_RUN, offset: first.nextOffset });
  assert.deepEqual(second.toSubmit, first.remaining);
  assert.equal(second.nextOffset, null);
  // Les deux lots couvrent tout, sans recouvrement.
  assert.equal(new Set([...first.toSubmit, ...second.toSubmit]).size, 47);
  const text = formatFromSitemap({ generatedAt: BRAVE_RUN.toISOString(), submitUrl: 'https://search.brave.com/submit-url', sitemap: 'x', latestGeneratedAt: null, ...first });
  assert.match(text, /À SOUMETTRE MAINTENANT \(40\)/);
  assert.match(text, /À REPRENDRE \(7\).*--offset=40/);
});

test('autonome : lit un sitemap enregistré, sans réseau, sans rien écrire', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'brave-autonome-'));
  try {
    const out = await runFromSitemap({ sitemap: new URL('./fixtures/sitemap-0.xml', import.meta.url).pathname, now: new Date('2026-10-05T06:21:00.000Z'), dataDir: dir });
    // Fixture : trois URL de site.test. Aucune n'est sur waimia.com, donc aucune ne part.
    assert.deepEqual(out.toSubmit, []);
    assert.equal(out.sitemapUrlCount, 0);
    assert.equal(out.latestGeneratedAt, null);
    assert.equal(out.fromCollectCount, 0);
    await assert.rejects(readFile(join(dir, 'state', 'brave.json')), { code: 'ENOENT' });
    assert.match(formatFromSitemap(out), /RIEN À SOUMETTRE/);

    // Sitemap de waimia.com enregistré, avec une collecte et une inspection d'indexation à côté.
    const file = join(dir, 'sitemap-0.xml');
    const url = (path, lastmod) => `<url><loc>https://waimia.com${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    await writeFile(file, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url('', D('10-04'))}${url('/blog/neuf', D('10-05'))}${url('/cgv', D('07-19'))}${url('/tarifs', D('10-04'))}</urlset>`);
    await mkdir(join(dir, 'state'));
    await writeFile(join(dir, 'latest.json'), JSON.stringify({ generatedAt: '2026-10-04T21:20:22.455Z', brave: { toSubmit: ['https://waimia.com/cgv'] } }));
    await writeFile(join(dir, 'state', 'gsc-index.json'), JSON.stringify({ urls: { 'https://waimia.com': {}, 'https://waimia.com/tarifs': {}, 'https://waimia.com/cgv': {} } }));
    const real = await runFromSitemap({ sitemap: file, now: new Date('2026-10-05T06:21:00.000Z'), dataDir: dir });
    assert.deepEqual(real.toSubmit, ['https://waimia.com/cgv', 'https://waimia.com/blog/neuf', 'https://waimia.com', 'https://waimia.com/tarifs']);
    assert.deepEqual(real.newSinceLastInspection, ['https://waimia.com/blog/neuf']);
    assert.equal(real.latestGeneratedAt, '2026-10-04T21:20:22.455Z');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
