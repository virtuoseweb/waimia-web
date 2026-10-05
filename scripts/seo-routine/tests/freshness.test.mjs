import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assessFreshness } from '../freshness.mjs';

const OK = { status: 'ok' };
const summary = (generatedAt, steps = { 'gsc-performance': OK, feeds: OK }) => ({ week: '2026-W41', generatedAt, steps });
// Lundi 12 octobre 2026, 03:17 UTC : créneau de rattrapage.
const MONDAY_CATCHUP = new Date('2026-10-12T03:17:00.000Z');

test('fraîcheur : la collecte du dimanche soir est fraîche le lundi, pour le rattrapage (36 h) et pour la session (48 h)', () => {
  const sunday = summary('2026-10-11T19:21:00.000Z');
  const catchup = assessFreshness(sunday, { now: MONDAY_CATCHUP, maxHours: 36 });
  assert.equal(catchup.fresh, true);
  assert.equal(catchup.ageHours, 7.9);
  // La session du lundi, 05:42 UTC : la semaine du résumé (W41) n'est pas celle du jour (W42), et c'est normal.
  const session = assessFreshness(sunday, { now: new Date('2026-10-12T05:42:00.000Z'), maxHours: 48 });
  assert.equal(session.fresh, true);
  assert.equal(session.week, '2026-W41');
});

test('fraîcheur : une collecte de la semaine précédente n\'est pas fraîche', () => {
  const res = assessFreshness(summary('2026-10-04T21:20:22.455Z'), { now: MONDAY_CATCHUP, maxHours: 36 });
  assert.equal(res.fresh, false);
  assert.equal(res.complete, true);
  assert.match(res.reason, /vieille de .* h \(limite : 36 h\)/);
});

test('fraîcheur : la limite est stricte (36 h pile n\'est plus frais)', () => {
  const at = new Date(MONDAY_CATCHUP.getTime() - 36 * 3600000).toISOString();
  assert.equal(assessFreshness(summary(at), { now: MONDAY_CATCHUP, maxHours: 36 }).fresh, false);
  const justUnder = new Date(MONDAY_CATCHUP.getTime() - 36 * 3600000 + 60000).toISOString();
  assert.equal(assessFreshness(summary(justUnder), { now: MONDAY_CATCHUP, maxHours: 36 }).fresh, true);
});

test('fraîcheur : une collecte récente mais incomplète (étape en erreur ou ignorée) appelle le rattrapage', () => {
  const withError = summary('2026-10-11T19:21:00.000Z', { 'gsc-performance': { status: 'erreur', error: 'API Google 500' }, feeds: OK });
  const res = assessFreshness(withError, { now: MONDAY_CATCHUP, maxHours: 36 });
  assert.equal(res.fresh, false);
  assert.deepEqual(res.incompleteSteps, ['gsc-performance (erreur)']);
  const partial = summary('2026-10-11T19:21:00.000Z', { 'gsc-performance': { status: 'ignoré' }, feeds: OK });
  assert.equal(assessFreshness(partial, { now: MONDAY_CATCHUP, maxHours: 36 }).fresh, false);
});

test('fraîcheur : une étape « non configuré » ne rend pas la collecte incomplète', () => {
  const noSecret = summary('2026-10-11T19:21:00.000Z', { 'gsc-performance': { status: 'non configuré' }, feeds: OK });
  assert.equal(assessFreshness(noSecret, { now: MONDAY_CATCHUP, maxHours: 36 }).fresh, true);
});

test('fraîcheur : fichier absent, date illisible ou date future ne sont jamais frais', () => {
  assert.equal(assessFreshness(null, { now: MONDAY_CATCHUP }).fresh, false);
  assert.equal(assessFreshness(null, { now: MONDAY_CATCHUP }).exists, false);
  assert.equal(assessFreshness(summary('pas une date'), { now: MONDAY_CATCHUP }).fresh, false);
  assert.equal(assessFreshness({ week: '2026-W41', steps: { feeds: OK } }, { now: MONDAY_CATCHUP }).fresh, false);
  assert.equal(assessFreshness(summary('2026-10-13T00:00:00.000Z'), { now: MONDAY_CATCHUP }).fresh, false);
  assert.equal(assessFreshness(summary('2026-10-11T19:21:00.000Z', {}), { now: MONDAY_CATCHUP }).fresh, false);
});

test('workflow : deux créneaux, et la garde de rattrapage vise bien le second', async () => {
  const yml = await readFile(new URL('../../../.github/workflows/seo-routine.yml', import.meta.url), 'utf8');
  const crons = [...yml.matchAll(/^\s*- cron: '([^']+)'/gm)].map((m) => m[1]);
  assert.deepEqual(crons, ['17 19 * * 0', '17 3 * * 1']);
  // GitHub compare la chaîne du cron telle qu'elle est écrite : une retouche d'un seul côté désarmerait la garde.
  const guard = /github\.event\.schedule == '([^']+)'/.exec(yml)?.[1];
  assert.equal(guard, crons[1]);
  assert.match(yml, /freshness\.mjs --max-hours=36/);
  // Les trois étapes qui envoient ou commitent sont sautées quand la collecte du dimanche est fraîche.
  assert.equal(yml.match(/steps\.fresh\.outputs\.fresh != 'true'/g).length, 3);
});
