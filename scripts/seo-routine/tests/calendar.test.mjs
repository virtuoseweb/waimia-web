import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CALENDAR_FILE, FIELDS, validateCalendar, weeksAhead } from '../check-calendar.mjs';
import { addWeeks, isoWeek, isoWeekMonday } from '../lib/util.mjs';
import { targetExists } from '../lib/targets.mjs';

// Lundi 5 octobre 2026 : semaine 2026-W41.
const NOW = new Date('2026-10-05T08:00:00.000Z');

const entry = (over = {}) => ({
  id: 'w42-n8n-prix',
  type: 'guide',
  titreProvisoire: 'Prix de n8n',
  requeteCible: 'n8n prix',
  intention: 'Connaître le coût de n8n.',
  urlCible: '/ressources/guides/n8n-prix',
  angle: 'Coût complet pour une PME.',
  sourcesALire: ['Page de prix officielle'],
  semainePrevue: '2026-W42',
  statut: 'planifié',
  pr: null,
  mesureAttendue: 'Page indexée.',
  resultat: null,
  origine: 'keywords.json : requête sans page cible.',
  ...over,
});
/** Six semaines de créations planifiées après W41, pour ne pas déclencher l'avertissement d'avance. */
const sixWeeks = () => [42, 43, 44, 45, 46, 47].map((w) => entry({ id: `creation-w${w}`, urlCible: `/ressources/guides/sujet-${w}`, semainePrevue: `2026-W${w}` }));
const run = (entries, opts = {}) => validateCalendar({ entries }, { now: NOW, targetExists: () => false, ...opts });

test('semaines ISO : lundi d\'une semaine, décalage, semaine inexistante', () => {
  assert.equal(isoWeekMonday('2026-W41').toISOString(), '2026-10-05T00:00:00.000Z');
  assert.equal(isoWeek(isoWeekMonday('2026-W53')), '2026-W53');
  assert.equal(addWeeks('2026-W53', 1), '2027-W01');
  assert.equal(addWeeks('2026-W41', -1), '2026-W40');
  assert.equal(isoWeekMonday('2025-W53'), null);
  assert.equal(isoWeekMonday('2026-41'), null);
});

test('calendrier : une entrée conforme passe sans erreur', () => {
  const res = run(sixWeeks());
  assert.deepEqual(res.errors, []);
  assert.deepEqual(res.warnings, []);
  assert.equal(res.stats.weeksAhead, 6);
  assert.equal(res.stats.byStatut['planifié'], 6);
});

test('calendrier : champ manquant, champ inconnu, liste vide', () => {
  for (const field of FIELDS) {
    const e = entry();
    delete e[field];
    assert.ok(run([e]).errors.some((m) => m.includes(`champ manquant « ${field} »`)), `champ ${field}`);
  }
  assert.ok(run([entry({ volume: 170 })]).errors.some((m) => m.includes('champ inconnu « volume »')));
  assert.ok(run([entry({ sourcesALire: [] })]).errors.some((m) => m.includes('sourcesALire')));
  assert.ok(run([entry({ angle: '  ' })]).errors.some((m) => m.includes('« angle »')));
  assert.equal(validateCalendar({ entries: [] }).errors.length, 1);
  assert.equal(validateCalendar(null).errors.length, 1);
});

test('calendrier : type et statut hors liste, identifiant en double', () => {
  assert.ok(run([entry({ type: 'livre blanc' })]).errors.some((m) => m.includes('type inconnu')));
  assert.ok(run([entry({ statut: 'fait' })]).errors.some((m) => m.includes('statut inconnu')));
  assert.ok(run([entry(), entry({ urlCible: '/ressources/guides/autre' })]).errors.some((m) => m.includes('`id` en double')));
  assert.ok(run([entry({ id: 'N8N Prix' })]).errors.some((m) => m.includes('`id` attendu')));
});

test('calendrier : semaine au mauvais format, inexistante, ou absente hors idée', () => {
  for (const semainePrevue of ['2026-42', 'W42', '2026-W54', '2025-W53', '2026-W00']) {
    assert.ok(run([entry({ semainePrevue })]).errors.some((m) => m.includes('semainePrevue')), semainePrevue);
  }
  assert.ok(run([entry({ semainePrevue: null })]).errors.some((m) => m.includes('obligatoire')));
  assert.deepEqual(run([...sixWeeks(), entry({ id: 'idee', urlCible: '/blog/idee', statut: 'idée', semainePrevue: null })]).errors, []);
});

test('calendrier : urlCible unique parmi les entrées actives, libre une fois publiée ou abandonnée', () => {
  const twice = run([entry(), entry({ id: 'doublon', statut: 'idée', semainePrevue: null })]);
  assert.ok(twice.errors.some((m) => m.includes('déjà prise par l\'entrée active')));
  // Une page publiée peut recevoir une nouvelle entrée (une révision, plus tard).
  const published = entry({ id: 'publiee', statut: 'publié', pr: 70, semainePrevue: '2026-W40' });
  const revision = entry({ id: 'revision', type: 'révision' });
  assert.deepEqual(run([published, revision], { targetExists: () => true }).errors, []);
  const dropped = entry({ id: 'abandon', statut: 'abandonné', resultat: 'Hors positionnement.' });
  assert.deepEqual(run([dropped, entry()]).errors, []);
  assert.ok(run([entry({ urlCible: 'https://waimia.com/x' })]).errors.some((m) => m.includes('urlCible')));
  assert.ok(run([entry({ urlCible: '/x/' })]).errors.some((m) => m.includes('urlCible')));
});

test('calendrier : une révision vise une page qui existe, une création prévue sur une page existante avertit', () => {
  const revision = entry({ type: 'révision', urlCible: '/services/inconnue' });
  assert.ok(run([revision]).errors.some((m) => m.includes('page introuvable')));
  assert.deepEqual(run([revision], { targetExists: () => true }).errors, []);
  const creation = run([entry()], { targetExists: () => true });
  assert.deepEqual(creation.errors, []);
  assert.ok(creation.warnings.some((m) => m.includes('semble déjà exister')));
});

test('calendrier : publié exige la PR et la page, mesuré et abandonné exigent le résultat', () => {
  const opts = { targetExists: () => true };
  assert.ok(run([entry({ statut: 'publié' })], opts).errors.some((m) => m.includes('sans `pr`')));
  assert.ok(run([entry({ statut: 'publié', pr: 70 })]).errors.some((m) => m.includes('page est introuvable')));
  assert.deepEqual(run([entry({ statut: 'publié', pr: 70 })], opts).errors, []);
  assert.deepEqual(run([entry({ statut: 'publié', pr: 'https://github.com/virtuoseweb/waimia-web/pull/70' })], opts).errors, []);
  assert.ok(run([entry({ pr: 'PR 70' })], opts).errors.some((m) => m.includes('`pr` attendu')));
  assert.ok(run([entry({ statut: 'mesuré', pr: 70 })], opts).errors.some((m) => m.includes('sans `resultat`')));
  assert.deepEqual(run([entry({ statut: 'mesuré', pr: 70, resultat: 'gagné : position 9,1 contre 13,4.' })], opts).errors, []);
  assert.ok(run([entry({ statut: 'abandonné' })]).errors.some((m) => m.includes('sans `resultat`')));
});

test('calendrier : moins de six semaines d\'avance avertit sans faire échouer', () => {
  const res = run(sixWeeks().slice(0, 4));
  assert.deepEqual(res.errors, []);
  assert.equal(res.stats.weeksAhead, 4);
  assert.ok(res.warnings.some((m) => m.includes('4 semaine(s) d\'avance')));
  // Un trou dans la suite arrête le compte : W42, W43, puis W45.
  const gap = sixWeeks().filter((e) => e.semainePrevue !== '2026-W44');
  assert.equal(weeksAhead(gap, '2026-W41'), 2);
  // Les révisions ne comptent pas : il faut une création par semaine.
  const revisionsOnly = sixWeeks().map((e) => ({ ...e, type: 'révision' }));
  assert.equal(weeksAhead(revisionsOnly, '2026-W41'), 0);
});

test('calendrier : entrée planifiée en retard et semaine au-delà du plafond avertissent', () => {
  const late = run([...sixWeeks(), entry({ id: 'retard', urlCible: '/blog/retard', semainePrevue: '2026-W40' })]);
  assert.deepEqual(late.errors, []);
  assert.ok(late.warnings.some((m) => m.includes('semaine passée')));
  const crowded = run([...sixWeeks(), entry({ id: 'c2', urlCible: '/blog/c2' }), entry({ id: 'c3', urlCible: '/blog/c3' })]);
  assert.ok(crowded.warnings.some((m) => m.includes('2026-W42 : 3 créations planifiées, plafond 2')));
});

test('calendrier : le fichier du repo est valide et ne vise que des pages réelles pour ses révisions', async () => {
  const calendar = JSON.parse(await readFile(CALENDAR_FILE, 'utf8'));
  // Date fixe : ce test vérifie le schéma et les pages, pas l'avance, qui dépend du jour.
  const res = validateCalendar(calendar, { now: NOW, targetExists });
  assert.deepEqual(res.errors, []);
  assert.ok(calendar.entries.every((e) => e.origine.length > 20), 'chaque entrée dit quelle donnée la justifie');
});
