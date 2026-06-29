#!/usr/bin/env node
// scripts/gen-catalog.mjs — export librairie « Relume-like » (waimia-web)
//
// Dérive `catalog.generated.json` (racine repo) depuis les modules co-localisés
// + le manifest + le registry généré, par PARSING STATIQUE (texte + regex),
// SANS rien réécrire des sources.
//
// Sources :
//   - src/sections/<type>/meta.ts          : descripteur (category, categorySlug,
//                                             subcategory, status, tags,
//                                             description_fr/en) + liste des types
//                                             (référence = présence d'index.ts)
//   - src/sections/<type>/demo.ts          : hasDemo { fr, en } (présence + heuristique)
//   - src/lib/section-registry.generated.ts : id → identifiant component importé
//   - src/lib/library-manifest.ts          : rendering + consumers
//
// Pour chaque type, un objet :
//   { id, category, categorySlug, component, status, tags,
//     description_fr, description_en, subcategory,
//     rendering: 'live'|'catalogue-only'|'unknown', consumers: string[],
//     hasDemo: { fr: boolean, en: boolean } }
//
// Champs introuvables → null (jamais de crash). Logge total + nombre `unknown` en fin.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'catalog.generated.json');
const SECTIONS_DIR = 'src/sections';

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ FATAL : fichier introuvable → ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

const srcRegistryGen = read('src/lib/section-registry.generated.ts');
const srcManifest = read('src/lib/library-manifest.ts');

// ── Extracteurs de champs sur le corps d'un littéral meta ─────────────────────
const strField = (block, name) => {
  // valeur string entre quotes (simple/double), tolère apostrophes échappées internes via [^] minimal
  const re = new RegExp(`${name}\\s*:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`, 's');
  const mm = re.exec(block);
  return mm ? mm[2].replace(/\\(['"])/g, '$1') : null;
};
const tagsField = (block) => {
  const mm = /tags\s*:\s*\[([^\]]*)\]/s.exec(block);
  if (!mm) return null;
  const inner = mm[1].trim();
  if (!inner) return [];
  return [...inner.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
};
// ── meta.ts : isole le corps de `export const meta = { ... }` (braces incluses) ──
// Le littéral peut porter une annotation de type (`export const meta: SectionMeta = {`),
// d'où le scan jusqu'au 1ᵉʳ `{` après la déclaration puis équilibrage d'accolades.
function extractMetaLiteral(src) {
  const m = /export\s+const\s+meta\b[^=]*=\s*\{/.exec(src);
  if (!m) return null;
  let i = src.indexOf('{', m.index);
  if (i < 0) return null;
  let depth = 0;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return src.slice(start + 1, i); // corps interne (sans les braces englobantes)
    }
  }
  return null;
}

// ── Registry généré : id → identifiant `component` importé ────────────────────
// Chaque entrée de SECTIONS est `'<id>': { component: <ident>, ...<ident>Meta }`.
// On mappe l'id vers le nom d'identifiant (ex. `heroSplitMediaComponent`). Introuvable → null.
function buildComponentMap(src) {
  const map = new Map();
  for (const m of src.matchAll(
    /['"]([a-z0-9-]+)['"]\s*:\s*\{\s*component\s*:\s*([A-Za-z0-9_$]+)/g,
  )) {
    map.set(m[1], m[2]);
  }
  return map;
}
const componentMap = buildComponentMap(srcRegistryGen);

// ── Manifest : id → { rendering, consumers } ─────────────────────────────────
// SECTION_USAGE = lignes `{ id: '<id>', consumers: [ ... ] }`.
// NB : certains chemins consommateurs contiennent des crochets internes (ex.
// `ressources/personas/[slug].astro`). On isole donc le tableau `consumers` par
// ÉQUILIBRAGE de crochets, pas par `[^\]]*` (qui s'arrêterait au 1ᵉʳ `]` interne).
const usage = {};
function extractArray(src, fromIdx) {
  let i = src.indexOf('[', fromIdx);
  if (i < 0) return null;
  let depth = 0;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return src.slice(start + 1, i);
    }
  }
  return null;
}
for (const m of srcManifest.matchAll(
  /\{\s*id:\s*['"]([a-z0-9-]+)['"]\s*,\s*consumers:\s*\[/g,
)) {
  const id = m[1];
  const inner = extractArray(srcManifest, m.index) ?? '';
  const consumers = [...inner.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
  usage[id] = { consumers, rendering: consumers.length > 0 ? 'live' : 'catalogue-only' };
}

// ── Demos co-localisés : présence du fichier + heuristique fr/en sur le contenu ─
// `hasDemo.fr/en` = true si src/sections/<id>/demo.ts existe ET que son contenu
// contient au moins un champ suffixé `_fr` / `_en` (heuristique texte sur le fichier
// entier, identique à l'ancienne sur le sous-bloc). Fichier absent → { false, false }.
// Certains demos sont volontairement non bilingues (sections à slot) → fr/en = false.
function demoLangs(id) {
  const demoPath = join(ROOT, SECTIONS_DIR, id, 'demo.ts');
  if (!existsSync(demoPath)) return { fr: false, en: false };
  const src = readFileSync(demoPath, 'utf8');
  return { fr: /_fr\b/.test(src), en: /_en\b/.test(src) };
}

// ── Référence = modules co-localisés (dossiers src/sections/<id>/ avec index.ts) ─
const sectionsRoot = join(ROOT, SECTIONS_DIR);
if (!existsSync(sectionsRoot)) {
  console.error(`✗ FATAL : répertoire introuvable → ${SECTIONS_DIR}`);
  process.exit(2);
}
const moduleIds = readdirSync(sectionsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((id) => existsSync(join(sectionsRoot, id, 'index.ts')));
if (moduleIds.length === 0) {
  console.error('✗ FATAL : 0 module co-localisé parsé — répertoire/structure suspect.');
  process.exit(2);
}

// ── Construction du catalogue ────────────────────────────────────────────────
const catalog = moduleIds
  .map((id) => {
    const metaPath = join(sectionsRoot, id, 'meta.ts');
    const metaBody = existsSync(metaPath)
      ? extractMetaLiteral(readFileSync(metaPath, 'utf8')) ?? ''
      : '';
    const u = usage[id];
    return {
      id,
      category: strField(metaBody, 'category'),
      categorySlug: strField(metaBody, 'categorySlug'),
      subcategory: strField(metaBody, 'subcategory'),
      component: componentMap.get(id) ?? null,
      status: strField(metaBody, 'status'),
      tags: tagsField(metaBody),
      description_fr: strField(metaBody, 'description_fr'),
      description_en: strField(metaBody, 'description_en'),
      rendering: u ? u.rendering : 'unknown',
      consumers: u ? u.consumers : [],
      hasDemo: demoLangs(id),
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

const unknown = catalog.filter((x) => x.rendering === 'unknown').length;
console.log(`✓ catalog.generated.json écrit — ${catalog.length} entrées (unknown: ${unknown}).`);
