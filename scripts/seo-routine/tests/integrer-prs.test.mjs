import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fusionner, resoudreJournal, resoudreMotsCles, resoudreMaillage } from '../integrer-prs.mjs';

const e = (id, over = {}) => ({ id, statut: 'idée', pr: null, angle: 'a', ...over });

test('calendrier : les entrées ajoutées des deux côtés sont toutes gardées, dans l\'ordre', () => {
  const base = { entries: [e('a')] };
  const ours = { entries: [e('a'), e('b')] };
  const theirs = { entries: [e('a'), e('c')] };
  assert.deepEqual(fusionner(base, ours, theirs).entries.map((x) => x.id), ['a', 'b', 'c']);
});

test('calendrier : chaque côté modifie une entrée différente, les deux modifications restent', () => {
  const base = { entries: [e('a'), e('b')] };
  const ours = { entries: [e('a', { statut: 'publié', pr: 157 }), e('b')] };
  const theirs = { entries: [e('a'), e('b', { statut: 'publié', pr: 158 })] };
  const res = fusionner(base, ours, theirs).entries;
  assert.equal(res[0].pr, 157);
  assert.equal(res[1].pr, 158);
});

test('calendrier : une entrée ne recule jamais de statut', () => {
  const base = { entries: [e('a')] };
  const ours = { entries: [e('a', { statut: 'publié', pr: 160, angle: 'livré' })] };
  const theirs = { entries: [e('a', { statut: 'planifié', angle: 'replanifié' })] };
  const res = fusionner(base, ours, theirs).entries[0];
  assert.equal(res.statut, 'publié');
  assert.equal(res.angle, 'livré');
});

test('calendrier : une entrée supprimée d\'un côté et inchangée de l\'autre disparaît', () => {
  const base = { entries: [e('a'), e('b')] };
  assert.deepEqual(fusionner(base, { entries: [e('a')] }, base).entries.map((x) => x.id), ['a']);
});

test('calendrier : même champ modifié des deux côtés au même statut, la PR gagne et c\'est signalé', () => {
  const conflits = [];
  const base = { entries: [e('a')] };
  const res = fusionner(base, { entries: [e('a', { angle: 'x' })] }, { entries: [e('a', { angle: 'y' })] }, '', conflits);
  assert.equal(res.entries[0].angle, 'y');
  assert.deepEqual(conflits, ['.entries[a].angle']);
});

const conflit = (ours, theirs) => `debut\n<<<<<<< HEAD\n${ours}=======\n${theirs}>>>>>>> origin/feat/seo-x\nfin\n`;

test('journal : l\'entrée de la PR (plus récente) passe au-dessus', () => {
  const res = resoudreJournal(conflit('### 2026-11-02\n\n', '### 2026-11-03\n\n'));
  assert.ok(res.indexOf('2026-11-03') < res.indexOf('2026-11-02'));
  assert.ok(!res.includes('<<<<<<<'));
});

test('mots-clés : les deux séries de lignes restent, JSON valide', () => {
  const t = `{ "keywords": [\n    { "query": "a" },\n${conflit('    { "query": "b" }\n', '    { "query": "c" }\n').replace(/^debut\n|fin\n$/g, '')}  ]\n}\n`;
  const res = JSON.parse(resoudreMotsCles(t));
  assert.deepEqual(res.keywords.map((k) => k.query), ['a', 'b', 'c']);
});

test('mots-clés : une requête en double est refusée', () => {
  const t = `{ "keywords": [\n${conflit('    { "query": "b" }\n', '    { "query": "b" }\n').replace(/^debut\n|fin\n$/g, '')}  ]\n}\n`;
  assert.throws(() => resoudreMotsCles(t), /en double/);
});

test('maillage : les pages ajoutées des deux côtés restent, un doublon est refusé', () => {
  const l = (p) => `  '${p}': { label_fr: 'x', kind: 'article', topics: [] },\n`;
  const res = resoudreMaillage(conflit(l('/blog/a'), l('/blog/b')));
  assert.ok(res.includes("'/blog/a'") && res.includes("'/blog/b'") && !res.includes('======='));
  assert.throws(() => resoudreMaillage(conflit(l('/blog/a'), l('/blog/a'))), /en double/);
});
