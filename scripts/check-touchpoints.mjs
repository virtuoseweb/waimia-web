#!/usr/bin/env node
// scripts/check-touchpoints.mjs — drift-guard CI (waimia-web · bibliothèque de sections)
//
// Cross-valide les 5 touchpoints par section-id :
//   1. schema    : literals `type: z.literal('<id>')` dans src/schemas/sections.ts
//   2. demos     : clés top-level de SECTION_DEMOS dans src/lib/section-demos.ts
//   3. registry  : clés de SECTIONS dans src/lib/section-registry.ts  (ENSEMBLE DE RÉFÉRENCE)
//   4. composant : pour chaque entrée registry, le `.astro` importé existe sur disque
//   5. manifest  : ids de SECTION_USAGE dans src/lib/library-manifest.ts
//
// Ces 4 fichiers importent des `.astro` → non chargeables par `import` Node.
// On fait donc du parsing STATIQUE (lecture texte + regex), jamais d'`import()`.
//
// Sortie :
//   - rapport texte par touchpoint (OK / liste des écarts)
//   - exit 0 si tout aligné, exit 1 si AU MOINS un écart (drift réel)
//   - exit 2 si un fichier est introuvable ou un parse rend 0 résultat (jamais de faux-positif silencieux)

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Exception tolérée : whitelister un id ici l'exclut du calcul de drift (registry ↔ autres).
// Vide pour l'instant — sert à pouvoir tolérer un écart connu sans casser la CI.
const KNOWN_OK = new Set([]);

// Wave #38 T5 (full replace) : les 5 touchpoints vivent désormais dans les MODULES co-localisés
// (`src/sections/<type>/`) + les agrégats GENERES (sections.generated / *-registry.generated /
// *-demos.generated). Le drift-guard scanne donc ces sources, plus le manifest hand-authored.
const SECTIONS_DIR = 'src/sections';
const IGNORED_DIRS = new Set(['_shared']);
const FILES = {
  schemaGen: 'src/schemas/sections.generated.ts',
  demosGen: 'src/lib/section-demos.generated.ts',
  registryGen: 'src/lib/section-registry.generated.ts',
  manifest: 'src/lib/library-manifest.ts',
};

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ FATAL : fichier introuvable → ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

const uniq = (arr) => [...new Set(arr)];

// ── Parsing des 5 touchpoints ────────────────────────────────────────────────
const srcRegistryGen = read(FILES.registryGen);
const srcDemosGen = read(FILES.demosGen);
const srcManifest = read(FILES.manifest);

// 0. Modules co-localisés (source physique des type-ids). Un module = un sous-dossier avec index.ts.
const moduleDirs = readdirSync(join(ROOT, SECTIONS_DIR), { withFileTypes: true })
  .filter((e) => e.isDirectory() && !IGNORED_DIRS.has(e.name))
  .map((e) => e.name)
  .filter((name) => existsSync(join(ROOT, SECTIONS_DIR, name, 'index.ts')))
  .sort();

// 3. registry : clés de SECTIONS dans section-registry.generated.ts (ENSEMBLE DE RÉFÉRENCE)
const registryKeys = uniq(
  [...srcRegistryGen.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);

// 1. schema : literal `type: z.literal('id')` lu dans chaque module schema.ts (doit == nom du dossier).
const schemaKeys = [];
const schemaLiteralMismatch = [];
for (const id of moduleDirs) {
  const p = join(ROOT, SECTIONS_DIR, id, 'schema.ts');
  if (!existsSync(p)) {
    schemaLiteralMismatch.push(`${id} (schema.ts absent)`);
    continue;
  }
  const m = /type:\s*z\.literal\(\s*['"]([a-z0-9-]+)['"]\s*\)/.exec(readFileSync(p, 'utf8'));
  if (!m) {
    schemaLiteralMismatch.push(`${id} (pas de type literal)`);
    continue;
  }
  if (m[1] !== id) schemaLiteralMismatch.push(`${id} (literal '${m[1]}' != dossier)`);
  schemaKeys.push(m[1]);
}

// 2. demos : clés de SECTION_DEMOS dans section-demos.generated.ts
const demoKeys = uniq(
  [...srcDemosGen.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:/gm)].map((m) => m[1]),
);

// 5. manifest : ids de SECTION_USAGE (hand-authored, inchangé)
const manifestKeys = uniq(
  [...srcManifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]),
);

// 4. composant : chaque module a un Component.astro ; s'il WRAPPE un composant partagé/déplacé,
// la cible doit exister sur disque. Sinon le module porte le composant lui-même (déjà vérifié présent).
const componentImports = moduleDirs.map((id) => ({ id, rel: join(SECTIONS_DIR, id, 'Component.astro') }));

// Garde anti faux-positif : un parse à 0 résultat = bug de regex / fichier vide → exit 2.
const parseGuards = [
  ['modules co-localisés', moduleDirs.length],
  ['registry SECTIONS keys', registryKeys.length],
  ['schema literals', schemaKeys.length],
  ['demos keys', demoKeys.length],
  ['manifest ids', manifestKeys.length],
  ['module components', componentImports.length],
];
for (const [label, n] of parseGuards) {
  if (n === 0) {
    console.error(`✗ FATAL : parse "${label}" a rendu 0 résultat — regex/fichier suspect.`);
    process.exit(2);
  }
}
if (schemaLiteralMismatch.length) {
  console.error('✗ FATAL : incohérence module ↔ literal de schema :');
  for (const x of schemaLiteralMismatch) console.error('    - ' + x);
  process.exit(2);
}

// ── Comparaisons ─────────────────────────────────────────────────────────────
const refSet = new Set(registryKeys.filter((k) => !KNOWN_OK.has(k)));

/** missing = dans registry, absent du touchpoint ; extra = dans touchpoint, absent du registry */
function diff(touchpointKeys) {
  const set = new Set(touchpointKeys);
  const missing = [...refSet].filter((k) => !set.has(k)).sort();
  const extra = touchpointKeys
    .filter((k) => !refSet.has(k) && !KNOWN_OK.has(k))
    .sort();
  return { missing, extra };
}

const results = {
  schema: diff(schemaKeys),
  demos: diff(demoKeys),
  manifest: diff(manifestKeys),
};

// Touchpoint composant : chaque module a un Component.astro ; si wrapper, la cible existe.
const missingComponents = [];
for (const { id, rel } of componentImports) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) {
    missingComponents.push(`${id} ← ${rel} (absent)`);
    continue;
  }
  // Si le Component.astro WRAPPE un composant partagé (import .../components/sections/X.astro),
  // vérifier que la cible existe sur disque.
  const wrap = /from\s+['"](\.\.\/\.\.\/components\/sections\/[A-Za-z0-9_]+\.astro)['"]/.exec(readFileSync(abs, 'utf8'));
  if (wrap && !existsSync(join(ROOT, SECTIONS_DIR, id, wrap[1]))) {
    missingComponents.push(`${id} ← cible wrapper ${wrap[1]} introuvable`);
  }
}

// ── Rapport ──────────────────────────────────────────────────────────────────
console.log('━━━ check-touchpoints — drift-guard bibliothèque sections ━━━');
console.log(`Référence (registry SECTIONS) : ${registryKeys.length} types${KNOWN_OK.size ? ` (KNOWN_OK ignorés: ${KNOWN_OK.size})` : ''}\n`);

let hasDrift = false;

function reportSetDiff(label, count, { missing, extra }) {
  if (missing.length === 0 && extra.length === 0) {
    console.log(`✓ ${label.padEnd(10)} ${count} ids — aligné`);
  } else {
    hasDrift = true;
    console.log(`✗ ${label.padEnd(10)} ${count} ids — DRIFT`);
    if (missing.length) console.log(`    manquants (registry, absent ${label}) : ${missing.join(', ')}`);
    if (extra.length) console.log(`    en trop   (${label}, absent registry) : ${extra.join(', ')}`);
  }
}

reportSetDiff('schema', schemaKeys.length, results.schema);
reportSetDiff('demos', demoKeys.length, results.demos);
reportSetDiff('manifest', manifestKeys.length, results.manifest);

if (missingComponents.length === 0) {
  console.log(`✓ ${'component'.padEnd(10)} ${componentImports.length} imports — tous les .astro existent`);
} else {
  hasDrift = true;
  console.log(`✗ ${'component'.padEnd(10)} ${componentImports.length} imports — fichiers manquants`);
  for (const m of missingComponents) console.log(`    ${m}`);
}

console.log('');
if (hasDrift) {
  console.log('✗ DRIFT détecté — synchronise les touchpoints (cf CLAUDE.md « 4 touchpoints »).');
  process.exit(1);
}
console.log('✓ Tous les touchpoints sont alignés.');
process.exit(0);
