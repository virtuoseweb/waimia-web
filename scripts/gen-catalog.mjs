#!/usr/bin/env node
// scripts/gen-catalog.mjs — export librairie « Relume-like » (waimia-web)
//
// Dérive `catalog.generated.json` (racine repo) depuis registry + manifest + demos,
// par PARSING STATIQUE (texte + regex), SANS rien réécrire des sources.
//
// Pour chaque type du registry, un objet :
//   { id, category, categorySlug, component, status, tags,
//     description_fr, description_en, subcategory,
//     rendering: 'live'|'catalogue-only'|'unknown', consumers: string[],
//     hasDemo: { fr: boolean, en: boolean } }
//
// Champs introuvables → null (jamais de crash). Logge total + nombre `unknown` en fin.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'catalog.generated.json');

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ FATAL : fichier introuvable → ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

const srcRegistry = read('src/lib/section-registry.ts');
const srcDemos = read('src/lib/section-demos.ts');
const srcManifest = read('src/lib/library-manifest.ts');

// ── Utilitaire : isole le bloc `{ ... }` d'une clé d'objet par équilibrage d'accolades ──
// Renvoie le contenu interne (entre la 1ʳᵉ `{` après la clé et son `}` apparié), ou null.
function extractBlock(src, key) {
  const keyRe = new RegExp(`^\\s*['"]${key.replace(/[-]/g, '\\$&')}['"]\\s*:\\s*\\{`, 'm');
  const m = keyRe.exec(src);
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
      if (depth === 0) return src.slice(start + 1, i);
    }
  }
  return null;
}

// ── Extracteurs de champs sur un bloc registry ───────────────────────────────
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
const componentField = (block) => {
  const mm = /component\s*:\s*([A-Za-z0-9_]+)/.exec(block);
  return mm ? mm[1] : null;
};

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

// ── Demos : clés présentes + heuristique fr/en sur le sous-bloc ──────────────
// Compromis documenté : `hasDemo.fr/en` = true si la clé existe dans SECTION_DEMOS
// ET que son bloc contient au moins un champ suffixé `_fr` / `_en` (ou un sous-objet
// `label_fr`/`label_en`). C'est une heuristique texte sur le sous-bloc isolé par
// équilibrage d'accolades. Si le bloc ne peut être isolé proprement, on retombe sur
// « clé présente » pour les deux langues (présence binaire) — cas non rencontré ici.
const demoKeys = new Set(
  [...srcDemos.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
);
function demoLangs(id) {
  if (!demoKeys.has(id)) return { fr: false, en: false };
  const block = extractBlock(srcDemos, id);
  if (block == null) return { fr: true, en: true }; // compromis : clé présente, isolation impossible
  return { fr: /_fr\b/.test(block), en: /_en\b/.test(block) };
}

// ── Référence = clés du registry ─────────────────────────────────────────────
const registryKeys = [
  ...new Set(
    [...srcRegistry.matchAll(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm)].map((m) => m[1]),
  ),
];
if (registryKeys.length === 0) {
  console.error('✗ FATAL : 0 clé registry parsée — regex/fichier suspect.');
  process.exit(2);
}

// ── Construction du catalogue ────────────────────────────────────────────────
const catalog = registryKeys
  .map((id) => {
    const block = extractBlock(srcRegistry, id) ?? '';
    const u = usage[id];
    return {
      id,
      category: strField(block, 'category'),
      categorySlug: strField(block, 'categorySlug'),
      subcategory: strField(block, 'subcategory'),
      component: componentField(block),
      status: strField(block, 'status'),
      tags: tagsField(block),
      description_fr: strField(block, 'description_fr'),
      description_en: strField(block, 'description_en'),
      rendering: u ? u.rendering : 'unknown',
      consumers: u ? u.consumers : [],
      hasDemo: demoLangs(id),
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

const unknown = catalog.filter((x) => x.rendering === 'unknown').length;
console.log(`✓ catalog.generated.json écrit — ${catalog.length} entrées (unknown: ${unknown}).`);
