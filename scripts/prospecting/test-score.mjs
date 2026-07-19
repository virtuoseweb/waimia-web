#!/usr/bin/env node
// test-score.mjs : GF-1 fonctionnel du scorer ICP+BANT.
// Assertions : chaque fixture atterrit dans son panier attendu (colonne expected_tier),
// + cas limites (CSV vide, colonne manquante, valeur aberrante) → pas de crash.
//
// Usage : node scripts/prospecting/test-score.mjs   (exit 0 = tous verts, 1 = échec)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  loadRecords, parseCSV, scoreRecord, scoreAll, toCSV, toJSONL, SCORING_CONFIG,
} from './score-icp-bant.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
let pass = 0;
let fail = 0;
const fails = [];

function assert(cond, label, detail = '') {
  if (cond) { pass++; }
  else { fail++; fails.push(`  ✗ ${label}${detail ? ' : ' + detail : ''}`); }
}

// ── Test 1 : la fixture principale colle aux paniers attendus ───────────────
const fixturePath = join(HERE, 'fixtures', 'sample-prospects.csv');
const records = loadRecords(fixturePath);
assert(records.length === 13, 'fixture: 13 prospects chargés', `got ${records.length}`);

const { rows, dist } = scoreAll(records);
// index par company pour retrouver l'attendu
const byCompany = new Map(rows.map((r) => [r.company, r]));

for (const rec of records) {
  const company = rec.company || rec.Company;
  const expected = (rec.expected_tier || '').trim();
  const scored = byCompany.get(company);
  assert(scored != null, `scoré: ${company}`);
  if (scored) {
    assert(
      scored.tier === expected,
      `panier ${company}`,
      `attendu ${expected}, obtenu ${scored.tier} (axes_met=${scored.axes_met}, score=${scored.score_total}, flags=${scored.blocking_flags || '-'})`,
    );
  }
}

// ── Test 2 : distribution attendue A=3 / B=3 / C=7 ──────────────────────────
assert(dist.A === 3, 'distribution A', `got ${dist.A}`);
assert(dist.B === 3, 'distribution B', `got ${dist.B}`);
assert(dist.C === 7, 'distribution C', `got ${dist.C}`);

// ── Test 3 : tri A>B>C respecté ─────────────────────────────────────────────
const order = rows.map((r) => r.tier).join('');
assert(/^A*B*C*$/.test(order), 'tri A>B>C', order);

// ── Test 4 : chaque disqualifiant dur présent au moins une fois ─────────────
const allFlags = rows.flatMap((r) => (r.blocking_flags ? r.blocking_flags.split(';') : []));
for (const flag of ['optout', 'agence_ia_installee', 'secteur_reglemente', 'aucune_intention_digitale_ni_contact', 'micro_budget']) {
  assert(allFlags.includes(flag), `disqualifiant présent: ${flag}`, `flags vus: ${[...new Set(allFlags)].join(',')}`);
}

// ── Test 5 : un tier A doit avoir >=3 axes satisfaits et 0 blocker ──────────
for (const r of rows.filter((x) => x.tier === 'A')) {
  assert(r.axes_met >= 3 && !r.blocking_flags, `A cohérent: ${r.company}`, `axes_met=${r.axes_met}`);
}

// ── Cas limite A : CSV vide (en-tête seul) → 0 record, pas de crash ─────────
try {
  const emptyRecs = loadRecords(join(HERE, 'fixtures', 'edge-empty.csv'));
  assert(Array.isArray(emptyRecs) && emptyRecs.length === 0, 'edge: CSV vide → 0 record');
  const r = scoreAll(emptyRecs);
  assert(r.total === 0 && toCSV(r.rows).includes('company'), 'edge: scoreAll([]) → CSV en-tête seul, pas de crash');
} catch (e) {
  assert(false, 'edge: CSV vide sans crash', e.message);
}

// ── Cas limite B : colonnes manquantes (record quasi vide) → pas de crash ───
try {
  const sparse = scoreRecord({ company: 'Vide SARL' });
  assert(sparse.tier === 'C', 'edge: record sans données → C', `got ${sparse.tier}`);
  assert(sparse.tier_reason.includes('donn') || sparse.axes_met === 0, 'edge: raison « données insuffisantes »', sparse.tier_reason);
} catch (e) {
  assert(false, 'edge: colonnes manquantes sans crash', e.message);
}

// ── Cas limite C : valeurs aberrantes (types cassés, chaînes absurdes) ──────
try {
  const junk = scoreRecord({
    company: 'Aberrant Corp',
    employees: 'beaucoup',
    revenue: 'N/A',
    ads_active: 'peut-être',
    website: 'not-a-url',
    contact_email: 'pasunemail',
    city: '???',
    optout: 'bof',
  });
  assert(['A', 'B', 'C'].includes(junk.tier), 'edge: valeurs aberrantes → tier valide', `got ${junk.tier}`);
  assert(typeof junk.score_total === 'number' && !Number.isNaN(junk.score_total), 'edge: score numérique malgré valeurs aberrantes', `${junk.score_total}`);
} catch (e) {
  assert(false, 'edge: valeurs aberrantes sans crash', e.message);
}

// ── Cas limite D : JSON en entrée équivaut au CSV ───────────────────────────
try {
  const asJson = JSON.stringify(records);
  const jsonRecs = loadRecords('inline.json', asJson);
  const jr = scoreAll(jsonRecs);
  assert(jr.dist.A === dist.A && jr.dist.B === dist.B && jr.dist.C === dist.C, 'edge: JSON ≡ CSV (même distribution)');
} catch (e) {
  assert(false, 'edge: entrée JSON sans crash', e.message);
}

// ── Cas limite E : parseCSV gère guillemets + virgules internes ─────────────
try {
  const csv = 'company,events\n"Ma, Boîte","funding, new ceo"\n';
  const recs = parseCSV(csv);
  assert(recs.length === 1 && recs[0].company === 'Ma, Boîte' && recs[0].events === 'funding, new ceo', 'edge: CSV guillemets/virgules internes', JSON.stringify(recs[0]));
} catch (e) {
  assert(false, 'edge: parseCSV guillemets sans crash', e.message);
}

// ── Rapport ─────────────────────────────────────────────────────────────────
process.stdout.write(`\nscorer_version: ${SCORING_CONFIG.scorer_version}\n`);
process.stdout.write(`Distribution fixture : A=${dist.A} B=${dist.B} C=${dist.C}\n`);
process.stdout.write(`\n${pass} assertions OK, ${fail} échec(s).\n`);
if (fail > 0) {
  process.stdout.write(fails.join('\n') + '\n');
  process.exit(1);
}
process.stdout.write('GF-1 fonctionnel : PASS\n');
process.exit(0);
