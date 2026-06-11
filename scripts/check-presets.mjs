#!/usr/bin/env node
// scripts/check-presets.mjs — gate du touchpoint PRESET (Phase B, docs/46).
//
// Valide src/lib/section-presets.ts par parsing STATIQUE (les .astro importés interdisent
// un import() Node) :
//   1. chaque Preset.type existe dans le registry SECTIONS (= SectionType réel)
//   2. chaque Preset.layout ∈ ids connus de src/styles/layouts.css ([data-layout='…'])
//   3. chaque Preset.density ∈ {compact, base, ample}
//   4. les ids de preset sont uniques
//
// Exit : 0 si tout valide · 1 si ≥1 violation · 2 si parse à 0 résultat (regex/fichier suspect).

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const FILES = {
  presets: 'src/lib/section-presets.ts',
  registry: 'src/lib/section-registry.ts',
  layouts: 'src/styles/layouts.css',
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

const srcPresets = read(FILES.presets);
const srcRegistry = read(FILES.registry);
const srcLayouts = read(FILES.layouts);

// SectionType réel = clés de SECTIONS dans le registry (ensemble de référence).
const registryKeys = new Set(
  [...srcRegistry.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);

// Ids de layout connus = sélecteurs [data-layout='…'] dans layouts.css.
const knownLayouts = new Set(
  [...srcLayouts.matchAll(/\[data-layout='([a-z0-9-]+)'\]/g)].map((m) => m[1]),
);

const KNOWN_DENSITIES = new Set(['compact', 'base', 'ample']);

// Isole le bloc SECTION_PRESETS pour ne parser que les vrais presets (pas les helpers).
const blockStart = srcPresets.indexOf('export const SECTION_PRESETS');
if (blockStart === -1) {
  console.error('✗ FATAL : SECTION_PRESETS introuvable dans section-presets.ts');
  process.exit(2);
}
const block = srcPresets.slice(blockStart);

// Parse chaque objet preset : { id: '…', type: '…', …, props: { … } }.
// On capture id + type ; layout/density sont lus dans le sous-objet props de chaque entrée.
const presetMatches = [
  ...block.matchAll(
    /\bid:\s*['"]([a-z0-9-]+)['"]\s*,\s*\n\s*type:\s*['"]([a-z0-9-]+)['"][\s\S]*?props:\s*\{([^}]*)\}/g,
  ),
];

if (presetMatches.length === 0) {
  console.error('✗ FATAL : parse presets a rendu 0 résultat — regex/fichier suspect.');
  process.exit(2);
}

const errors = [];
const ids = [];

for (const m of presetMatches) {
  const id = m[1];
  const type = m[2];
  const propsBody = m[3];
  ids.push(id);

  if (!registryKeys.has(type)) {
    errors.push(`preset "${id}" : type "${type}" absent du registry SECTIONS.`);
  }

  const layoutMatch = propsBody.match(/layout:\s*['"]([a-z0-9-]+)['"]/);
  if (layoutMatch && !knownLayouts.has(layoutMatch[1])) {
    errors.push(`preset "${id}" : layout "${layoutMatch[1]}" absent de layouts.css.`);
  }

  const densityMatch = propsBody.match(/density:\s*['"]([a-z0-9-]+)['"]/);
  if (densityMatch && !KNOWN_DENSITIES.has(densityMatch[1])) {
    errors.push(`preset "${id}" : density "${densityMatch[1]}" inconnue (compact|base|ample).`);
  }
}

// Ids uniques.
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  errors.push(`ids de preset dupliqués : ${uniq(dupes).join(', ')}`);
}

console.log('━━━ check-presets — touchpoint PRESET (système de variation) ━━━');
console.log(`Presets parsés : ${presetMatches.length}`);
console.log(`Layouts connus (layouts.css) : ${[...knownLayouts].sort().join(', ')}`);
console.log(`Types registry : ${registryKeys.size}\n`);

if (errors.length) {
  console.log(`✗ ${errors.length} violation(s) :`);
  for (const e of errors) console.log(`    ${e}`);
  process.exit(1);
}

console.log(`✓ ${presetMatches.length} presets valides — types existants, layouts/density connus, ids uniques.`);
process.exit(0);
