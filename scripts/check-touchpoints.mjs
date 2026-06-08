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

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Exception tolérée : whitelister un id ici l'exclut du calcul de drift (registry ↔ autres).
// Vide pour l'instant — sert à pouvoir tolérer un écart connu sans casser la CI.
const KNOWN_OK = new Set([]);

const FILES = {
  schema: 'src/schemas/sections.ts',
  demos: 'src/lib/section-demos.ts',
  registry: 'src/lib/section-registry.ts',
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
const srcRegistry = read(FILES.registry);
const srcDemos = read(FILES.demos);
const srcSchema = read(FILES.schema);
const srcManifest = read(FILES.manifest);

// 3. registry — clés de SECTIONS (ENSEMBLE DE RÉFÉRENCE)
const registryKeys = uniq(
  [...srcRegistry.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);

// 1. schema — literals (fallback sur z.literal nu si le pattern `type:` ne matche rien)
let schemaKeys = uniq(
  [...srcSchema.matchAll(/type:\s*z\.literal\(\s*['"]([a-z0-9-]+)['"]\s*\)/g)].map((m) => m[1]),
);
if (schemaKeys.length === 0) {
  schemaKeys = uniq(
    [...srcSchema.matchAll(/z\.literal\(\s*['"]([a-z0-9-]+)['"]\s*\)/g)].map((m) => m[1]),
  );
}

// 2. demos — clés top-level de SECTION_DEMOS
const demoKeys = uniq(
  [...srcDemos.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);

// 5. manifest — ids de SECTION_USAGE
const manifestKeys = uniq(
  [...srcManifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]),
);

// 4. composant — pour chaque import de section dans le registry, vérifier le fichier sur disque
const componentImports = [
  ...srcRegistry.matchAll(
    /import\s+([A-Za-z0-9_]+)\s+from\s+['"](\.\.\/components\/sections\/[A-Za-z0-9_]+\.astro)['"]/g,
  ),
].map((m) => ({ name: m[1], rel: m[2] }));

// Garde anti faux-positif : un parse à 0 résultat = bug de regex / fichier vide → exit 2.
const parseGuards = [
  ['registry SECTIONS keys', registryKeys.length],
  ['schema literals', schemaKeys.length],
  ['demos keys', demoKeys.length],
  ['manifest ids', manifestKeys.length],
  ['registry component imports', componentImports.length],
];
for (const [label, n] of parseGuards) {
  if (n === 0) {
    console.error(`✗ FATAL : parse "${label}" a rendu 0 résultat — regex/fichier suspect.`);
    process.exit(2);
  }
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

// Touchpoint composant : chaque .astro importé doit exister sur disque
const missingComponents = componentImports
  .filter(({ rel }) => !existsSync(join(ROOT, 'src', rel.replace(/^\.\.\//, ''))))
  .map(({ name, rel }) => `${name} ← ${rel}`);

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
