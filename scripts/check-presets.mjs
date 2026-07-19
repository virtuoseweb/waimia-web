#!/usr/bin/env node
// scripts/check-presets.mjs — gate du touchpoint PRESET (Phase B, docs/46).
//
// Valide packages/ds-kernel/src/lib/section-presets.ts par IMPORT DYNAMIQUE du module
// (via tsx — cf gen-section-manifest.mjs / check-page-schemas.mjs qui importent du TS de la
// même façon). On énumère les presets RÉELS via allPresets() (= Object.values(SECTION_PRESETS)
// .flat()), donc 100 % des entrées sont couvertes — mono-ligne ET multi-lignes — sans dépendre
// d'une regex fragile qui n'attrapait que les objets écrits sur plusieurs lignes (18/319).
//
// Contrôles par preset :
//   1. chaque Preset.type existe dans le registry SECTIONS (= SectionType réel)
//   2. chaque Preset.props.layout ∈ layouts connus (layouts.css ∪ [data-layout] internes .astro
//      ∪ COMPONENT_INTERNAL_LAYOUTS = layouts pilotés par prop/switch interne, sans sélecteur CSS)
//   3. chaque Preset.props.density ∈ KNOWN_DENSITIES (source = le module lui-même)
//   4. les ids de preset sont uniques
//
// ⚠️ On importe UNIQUEMENT section-presets.ts (aucun .astro dans sa chaîne d'imports → tsx OK).
// Le registry, layouts.css et les composants .astro sont lus en TEXTE (pas importés) car le
// registry importe tous les composants .astro (que tsx ne sait pas charger).
//
// Exit : 0 si tout valide · 1 si ≥1 violation · 2 si allPresets() rend 0 (module/chaîne suspect).

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Racines des composants de section : un layout PEUT être générique (layouts.css, idiome
// [data-layout]{--sec-grid}) OU interne à un composant (ex. mosaic/grid-uniform/list définis
// dans le .astro avec leur propre grid-template-columns scopé). Les deux sont des layouts VALIDES.
const COMPONENT_ROOTS = ['src/components/sections', 'src/sections'];

const FILES = {
  // #40 T3 etape 2 : section-presets vit dans le package @waimia/ds-kernel.
  presets: 'packages/ds-kernel/src/lib/section-presets.ts',
  // Wave #38 T5 : SECTIONS reconstruit dans le fichier GENERE (le god-file est un re-export).
  registry: 'src/lib/section-registry.generated.ts',
  layouts: 'src/styles/layouts.css',
};

// Layouts VALIDES pilotés par un mécanisme INTERNE au composant (prop + switch JS dans le
// frontmatter, OU alias nommé du rendu par défaut), donc SANS sélecteur [data-layout='…'] à
// moissonner. Whitelist documentée (preuve fichier:ligne) — GF-4 : la vérité = « consommé
// quelque part ». Chaque entrée doit rester adossée à un consommateur réel.
//   - alternate / inline-left / inline-right → src/components/sections/FeatureZigzag.astro:40,52,53
//       (const fzLayout = data.layout ?? 'alternate' ; if (fzLayout === 'inline-left') …)
//   - inline → src/components/sections/ComparisonDuo.astro:18 (const cdLayout = data.layout ?? 'inline')
//   - diagram → src/components/sections/SystemFlow.astro:37,48,279 (data-layout={sfLayout} ;
//       « diagram : recette explicite = rendu par défaut (alias nommé pour le builder) », pas de
//       sélecteur [data-layout='diagram'] car il ÉGALE le style de base .sf)
//   - wall / marquee → src/components/sections/EcosystemPartners.astro:19,62,72 (const layout =
//       data.layout ?? 'grid' ; le template branche layout==='marquee' ? … : (wall), rendu et
//       stylé par classes .eco-partners__wall / .eco-partners__marquee sans sélecteur [data-layout])
const COMPONENT_INTERNAL_LAYOUTS = new Set([
  'alternate',
  'inline',
  'inline-left',
  'inline-right',
  'diagram',
  'wall',
  'marquee',
]);

/** Collecte récursive des fichiers .astro sous un dossier (absent → []). */
function astroFiles(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return [];
  const out = [];
  for (const ent of readdirSync(abs, { withFileTypes: true })) {
    const child = join(rel, ent.name);
    if (ent.isDirectory()) out.push(...astroFiles(child));
    else if (ent.name.endsWith('.astro')) out.push(child);
  }
  return out;
}

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ FATAL : fichier introuvable → ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

const uniq = (arr) => [...new Set(arr)];

// SectionType réel = clés de SECTIONS dans le registry (ensemble de référence).
// Lu en TEXTE : le registry importe tous les .astro → non importable par tsx.
const srcRegistry = read(FILES.registry);
const registryKeys = new Set(
  [...srcRegistry.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);

// Ids de layout connus = sélecteurs [data-layout='…'] GÉNÉRIQUES (layouts.css) UNION les
// sélecteurs [data-layout='…'] INTERNES aux composants de section (.astro) UNION la whitelist
// des layouts pilotés par prop/switch interne. Sans cette union, un preset qui cible un layout
// scopé composant faisait faussement rougir le gate alors que le layout existe et rend.
const LAYOUT_SELECTOR = /\[data-layout=["']([a-z0-9-]+)["']\]/g;
const knownLayouts = new Set([
  ...[...read(FILES.layouts).matchAll(LAYOUT_SELECTOR)].map((m) => m[1]),
  ...COMPONENT_INTERNAL_LAYOUTS,
]);
for (const rel of COMPONENT_ROOTS.flatMap(astroFiles)) {
  for (const m of read(rel).matchAll(LAYOUT_SELECTOR)) knownLayouts.add(m[1]);
}

// Import dynamique du module presets (tsx) → énumération EXHAUSTIVE des presets réels.
const presetsUrl = pathToFileURL(join(ROOT, FILES.presets)).href;
const mod = await import(presetsUrl);
const presets = mod.allPresets();
const KNOWN_DENSITIES = new Set(mod.KNOWN_DENSITIES);

if (!Array.isArray(presets) || presets.length === 0) {
  console.error('✗ FATAL : allPresets() a rendu 0 preset — module/chaîne d\'imports suspect.');
  process.exit(2);
}

const errors = [];
const ids = [];

for (const p of presets) {
  const id = p.id;
  ids.push(id);

  if (!registryKeys.has(p.type)) {
    errors.push(`preset "${id}" : type "${p.type}" absent du registry SECTIONS.`);
  }

  const layout = p.props?.layout;
  if (layout && !knownLayouts.has(layout)) {
    errors.push(`preset "${id}" : layout "${layout}" absent de layouts.css / composants / whitelist interne.`);
  }

  const density = p.props?.density;
  if (density && !KNOWN_DENSITIES.has(density)) {
    errors.push(
      `preset "${id}" : density "${density}" inconnue (${[...KNOWN_DENSITIES].join('|')}).`,
    );
  }
}

// Ids uniques.
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  errors.push(`ids de preset dupliqués : ${uniq(dupes).join(', ')}`);
}

console.log('━━━ check-presets — touchpoint PRESET (système de variation) ━━━');
console.log(`Presets énumérés (allPresets) : ${presets.length}`);
console.log(`Layouts connus : ${[...knownLayouts].sort().join(', ')}`);
console.log(`Densités connues : ${[...KNOWN_DENSITIES].sort().join(', ')}`);
console.log(`Types registry : ${registryKeys.size}\n`);

if (errors.length) {
  console.log(`✗ ${errors.length} violation(s) :`);
  for (const e of errors) console.log(`    ${e}`);
  process.exit(1);
}

console.log(`✓ ${presets.length} presets valides — types existants, layouts/density connus, ids uniques.`);
process.exit(0);
