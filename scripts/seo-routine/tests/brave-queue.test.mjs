import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { selectBraveQueue, runBraveQueue, braveNote } from '../brave-queue.mjs';
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
