#!/usr/bin/env node
/**
 * gen-section-aggregate.mjs
 * Waimia · Co-location DS (Wave #38, T5) · agrégateur de modules de section
 *
 * MODE « REPLACE » (post-pilote, T5). Les 199 types vivent désormais en modules co-localisés
 * `src/sections/<type>/` (5 fichiers chacun, forme des pilotes). Ce générateur SCANNE ces
 * modules et (re)génère 3 fichiers COMMITÉS, source de vérité reconstruite, importés par les
 * god-files (qui ne sont plus que de minces ré-exports préservant l'API publique exacte) :
 *
 *   - src/schemas/sections.generated.ts
 *       réexporte chaque `<camel>Schema` depuis son module + le discriminatedUnion('type', [...])
 *       en ordre ALPHA déterministe + les types dérivés (SectionData/SectionType/SectionByType)
 *       + l'anchor wrapper + sectionsArraySchema (API publique de sections.ts préservée).
 *   - src/lib/section-registry.generated.ts
 *       reconstruit `SECTIONS: Record<SectionType, SectionDescriptor>` drop-in (component
 *       réattaché depuis le module + spread du `meta`), exports nommés IDENTIQUES
 *       (SECTIONS, SECTION_REGISTRY, getSectionComponent, getSectionMeta, getCapabilities,
 *       listSections, listCategories, ... - voir API_PUBLIC). 0 import `../components/sections`.
 *   - src/lib/section-demos.generated.ts
 *       reconstruit `SECTION_DEMOS: Record<SectionType, DemoData>` (demo réattachée par module)
 *       + getSectionDemo.
 *
 * Méthode : génération PUREMENT TEXTUELLE par scan du système de fichiers (0 import() runtime :
 * les modules importent astro:content + .astro). Déterministe, idempotent, tri alphabétique,
 * 0 timestamp, 0 U+2014 (rule 58). Le gate `check:section-aggregate` régénère en mémoire et
 * compare au commité (clone de check-token-lock).
 *
 * Lancement : `node scripts/gen-section-aggregate.mjs` (ou `npm run gen:section-aggregate`).
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
// #40 T3 etape 2 : le CONTRAT (schemas/sections.generated.ts + schema.ts co-localises +
// _shared) vit dans le package @waimia/ds-kernel ; les facettes APP (registry/demos, qui
// importent Component/meta/demo) restent cote app. Ce generateur DUAL-WRITE en consequence.
const KERNEL_DIR = path.join(repoRoot, 'packages/ds-kernel/src');
// Les MODULES co-localises (index.ts + Component.astro + meta.ts + demo.ts) restent cote app ;
// seul leur schema.ts a ete deplace dans le kernel (packages/ds-kernel/src/sections/<id>/schema.ts).
const MODULES_DIR = path.join(repoRoot, 'src/sections');
const KERNEL_SECTIONS_DIR = path.join(KERNEL_DIR, 'sections');
const ORDER_FILE = path.join(repoRoot, 'scripts/section-order.json');
const IGNORED_DIRS = new Set(['_shared']);

const camel = (kebab) => kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

// Ordre CANONIQUE des sections (registry/demos/manifest) = ordre historique d'insertion,
// fige one-shot dans scripts/section-order.json (T5). PRESERVE la parite du manifest
// (l'array `sections` suit Object.keys(SECTIONS)). L'union de schema reste alpha (set, ordre
// non observable). Tout module hors de cet ordre (ajout/suppression futur) fait echouer le gate
// avec un message clair → on met a jour section-order.json sciemment.
function canonicalOrder(discovered) {
  const order = JSON.parse(fs.readFileSync(ORDER_FILE, 'utf8'));
  const orderSet = new Set(order);
  const discSet = new Set(discovered);
  const missingFromOrder = discovered.filter((id) => !orderSet.has(id));
  const missingFromDisc = order.filter((id) => !discSet.has(id));
  if (missingFromOrder.length || missingFromDisc.length) {
    let msg = 'gen-section-aggregate : desync entre les modules et scripts/section-order.json.\n';
    if (missingFromOrder.length) msg += `  modules SANS entree dans section-order.json : ${missingFromOrder.join(', ')}\n`;
    if (missingFromDisc.length) msg += `  entrees section-order.json SANS module : ${missingFromDisc.join(', ')}\n`;
    msg += '  → ajoute/retire l\'id dans scripts/section-order.json (a la position voulue), puis regenere.';
    throw new Error(msg);
  }
  return order; // ordre figé, tous les modules présents
}

// ─── Découverte des modules co-localisés (alpha-déterministe) ───
function discoverModules() {
  if (!fs.existsSync(MODULES_DIR)) return [];
  const out = [];
  for (const entry of fs.readdirSync(MODULES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || IGNORED_DIRS.has(entry.name)) continue;
    if (!fs.existsSync(path.join(MODULES_DIR, entry.name, 'index.ts'))) continue;
    out.push(entry.name);
  }
  out.sort((a, b) => a.localeCompare(b, 'en'));
  return out;
}

// Bandeau d'avertissement « fichier généré » (identique sur les 3 sorties).
function banner(rel) {
  return (
    `// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.\n` +
    `// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).\n` +
    `// Régénérer : \`npm run gen:section-aggregate\`. Gate : \`npm run check:section-aggregate\`.\n` +
    `// (${rel})\n\n`
  );
}

// ─── 1. sections.generated.ts ───
function genSchemas(ids) {
  let out = banner('packages/ds-kernel/src/schemas/sections.generated.ts');
  out += `import { z } from 'zod';\n\n`;
  // Réexport des schemas de chaque module sous le nom historique `<camel>Schema`.
  for (const id of ids) {
    out += `import { schema as ${camel(id)}Schema } from '../sections/${id}/schema';\n`;
  }
  out += `\nexport {\n`;
  for (const id of ids) out += `  ${camel(id)}Schema,\n`;
  out += `};\n\n`;
  // discriminatedUnion (ordre alpha déterministe).
  out += `export const sectionSchema = z.discriminatedUnion('type', [\n`;
  for (const id of ids) out += `  ${camel(id)}Schema,\n`;
  out += `]);\n\n`;
  out += `export type SectionData = (typeof sectionSchema)['_output'];\n\n`;
  // anchor wrapper + sectionsArraySchema (préserve l'API publique de sections.ts).
  out += `const sectionWithAnchorSchema = z.intersection(\n`;
  out += `  sectionSchema,\n`;
  out += `  z.object({\n`;
  out += `    anchor: z\n`;
  out += `      .string()\n`;
  out += `      .regex(/^[a-z0-9-]+$/, 'anchor doit etre un slug kebab-case (a-z, 0-9, tirets)')\n`;
  out += `      .optional(),\n`;
  out += `    expand: z.boolean().optional(),\n`;
  out += `  }),\n`;
  out += `);\n\n`;
  out += `export const sectionsArraySchema = z.array(sectionWithAnchorSchema).default([]);\n\n`;
  out += `export type SectionType = SectionData['type'];\n`;
  out += `export type SectionByType<T extends SectionType> = Extract<SectionData, { type: T }>;\n`;
  return out;
}

// ─── 1bis. section-family.generated.ts (KERNEL) ───
// Map pure `Record<SectionType, family>` extraite des meta.ts co-localises (cote app), emise
// DANS le kernel pour casser la seule dependance kernel->app : section-variants.ts lisait
// `SECTIONS[type].family` (registry app). La famille est une donnee de TAXONOMIE (contrat),
// pas de rendu → elle a sa place dans le kernel. Scan textuel du champ `family:` de chaque meta.
function familyOfModule(id) {
  const metaPath = path.join(MODULES_DIR, id, 'meta.ts');
  const src = fs.readFileSync(metaPath, 'utf8');
  const m = src.match(/family:\s*'([^']+)'/);
  if (!m) throw new Error(`gen-section-aggregate : meta.ts de '${id}' sans champ family.`);
  return m[1];
}

function genFamily(ids) {
  let out = banner('packages/ds-kernel/src/lib/section-family.generated.ts');
  out += `import type { SectionType } from '../schemas/sections';\n\n`;
  out += `export const SECTION_FAMILY: Record<SectionType, string> = {\n`;
  for (const id of ids) out += `  '${id}': '${familyOfModule(id)}',\n`;
  out += `};\n`;
  return out;
}

// ─── 2. section-registry.generated.ts ───
function genRegistry(ids) {
  let out = banner('src/lib/section-registry.generated.ts');
  out += `import type { SectionType } from '@waimia/ds-kernel';\n`;
  out += `import type { SectionDescriptor, AstroComponent } from './section-registry-types';\n`;
  // Import component + meta de chaque module.
  for (const id of ids) {
    const C = camel(id);
    out += `import { Component as ${C}Component, meta as ${C}Meta } from '../sections/${id}';\n`;
  }
  out += `\nexport const SECTIONS: Record<SectionType, SectionDescriptor> = {\n`;
  for (const id of ids) {
    const C = camel(id);
    out += `  '${id}': {\n    component: ${C}Component,\n    ...${C}Meta,\n  },\n`;
  }
  out += `};\n`;
  return out;
}

// ─── 3. section-demos.generated.ts ───
function genDemos(ids) {
  let out = banner('src/lib/section-demos.generated.ts');
  out += `import type { SectionType } from '@waimia/ds-kernel';\n`;
  out += `import type { DemoData } from './section-demos-types';\n`;
  for (const id of ids) {
    out += `import { demo as ${camel(id)}Demo } from '../sections/${id}/demo';\n`;
  }
  out += `\nexport const SECTION_DEMOS: Record<SectionType, DemoData> = {\n`;
  for (const id of ids) out += `  '${id}': ${camel(id)}Demo,\n`;
  out += `};\n`;
  return out;
}

export function buildGenerated() {
  const alphaIds = discoverModules(); // ordre alpha déterministe (union de schema)
  if (alphaIds.length === 0) throw new Error('gen-section-aggregate (REPLACE) : 0 module trouvé dans src/sections/<type>/.');
  const orderedIds = canonicalOrder(alphaIds); // ordre historique (registry + demos → parité manifest)
  // DUAL-WRITE (#40 T3 etape 2) : le contrat (sections.generated + family-map) -> KERNEL ;
  // les facettes app (registry/demos qui importent Component/demo) -> APP.
  return {
    'packages/ds-kernel/src/schemas/sections.generated.ts': genSchemas(alphaIds),
    'packages/ds-kernel/src/lib/section-family.generated.ts': genFamily(alphaIds),
    'src/lib/section-registry.generated.ts': genRegistry(orderedIds),
    'src/lib/section-demos.generated.ts': genDemos(orderedIds),
    ids: alphaIds,
  };
}

function main() {
  const built = buildGenerated();
  const { ids, ...files } = built;
  for (const [rel, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(repoRoot, rel), content);
  }
  console.log(`gen-section-aggregate (REPLACE) : ${ids.length} modules agrégés.`);
  for (const rel of Object.keys(files)) console.log('  écrit ' + rel);
}

// Exécuté en CLI (pas seulement importé par le gate).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
