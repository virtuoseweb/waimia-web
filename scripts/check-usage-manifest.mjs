#!/usr/bin/env node
/**
 * check-usage-manifest.mjs · Gate « étiquetage catalogue » (docs/40 §3, V-F6).
 *
 * Pourquoi : chaque type de section porte une étiquette `usage` ('site' | 'library')
 * dérivée de ses `consumers` (anti-drift). Le manifeste machine
 * `src/data/ds-section-manifest.json` doit rester COHÉRENT avec la source de vérité
 * `src/lib/library-manifest.ts` (SECTION_USAGE + USAGE_OVERRIDES). Si le manifeste est
 * périmé (régen oubliée) ou si un type est orphelin, ce gate échoue.
 *
 * Source de vérité : src/lib/library-manifest.ts (parsée, comme gen-section-manifest.mjs).
 * Cible vérifiée   : src/data/ds-section-manifest.json (généré).
 * Référence croisée : src/lib/section-registry.ts (le set des types valides).
 *
 * Assertions (toutes bloquantes) :
 *   1. Tout id du registry a une entrée SECTION_USAGE (et inversement), pas d'orphelin.
 *   2. Le manifeste JSON couvre exactement les ids du registry.
 *   3. Pour chaque type : usage(JSON) == derive(consumers, override) et consumers(JSON)
 *      == consumers(library-manifest) (set égal, ordre indifférent).
 *   4. usage === 'site' <=> consumers.length > 0 (sauf override explicite).
 *   5. Les counts agrégés (site/library) du JSON == ceux dérivés de la source.
 *
 * Exit : 0 si tout cohérent · 1 si ≥1 incohérence · 2 si un fichier source est introuvable.
 * Déterministe, 0 dépendance npm (built-ins Node uniquement).
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LIBRARY_MANIFEST_FILE = 'src/lib/library-manifest.ts';
const REGISTRY_FILE = 'src/lib/section-registry.ts';
const MANIFEST_JSON_FILE = 'src/data/ds-section-manifest.json';

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`check-usage-manifest: FICHIER INTROUVABLE ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

// ─── Parse registry type ids ─────────────────────────────────────────────────
function parseRegistryIds(source) {
  const start = source.indexOf('export const SECTIONS');
  if (start === -1) throw new Error('SECTIONS not found in registry');
  const objStart = source.indexOf('{', start);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) { objEnd = i; break; }
    }
  }
  const body = source.slice(objStart + 1, objEnd);
  const ids = new Set();
  for (const m of body.matchAll(/'([a-z][a-z0-9-]*)'\s*:\s*\{/g)) ids.add(m[1]);
  return ids;
}

// ─── Parse library-manifest usage + consumers (mirror of generator) ──────────
function parseLibraryManifest(source) {
  const namedArrays = new Map();
  for (const m of source.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*=\s*\[([\s\S]*?)\];/g)) {
    namedArrays.set(m[1], [...m[2].matchAll(/'([^']+)'/g)].map((v) => v[1]));
  }
  const overrides = new Map();
  const ovMatch = /USAGE_OVERRIDES[^=]*=\s*\{([\s\S]*?)\};/.exec(source);
  if (ovMatch) {
    for (const m of ovMatch[1].matchAll(/'?([a-z][a-z0-9-]*)'?\s*:\s*'(site|library)'/g)) {
      overrides.set(m[1], m[2]);
    }
  }
  const startMatch = /const\s+SECTION_USAGE[^=]*=\s*\[/.exec(source);
  if (!startMatch) throw new Error('SECTION_USAGE not found');
  const arrStart = startMatch.index + startMatch[0].length - 1;
  let depth = 0;
  let arrEnd = -1;
  for (let i = arrStart; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  const body = source.slice(arrStart + 1, arrEnd);
  const result = new Map();
  // Balanced-bracket scan : un chemin consommateur peut contenir ']' (route
  // dynamique 'personas/[slug].astro') : parser par profondeur, pas en regex.
  for (const m of body.matchAll(/id:\s*'([a-z][a-z0-9-]*)'\s*,\s*consumers:\s*/g)) {
    const id = m[1];
    let p = m.index + m[0].length;
    while (p < body.length && /\s/.test(body[p])) p++;
    let consumers;
    if (body[p] === '[') {
      let bd = 0;
      let end = -1;
      for (let i = p; i < body.length; i++) {
        if (body[i] === '[') bd++;
        else if (body[i] === ']') { bd--; if (bd === 0) { end = i; break; } }
      }
      consumers = [...body.slice(p + 1, end).matchAll(/'([^']+)'/g)].map((v) => v[1]);
    } else {
      const nm = /^[A-Z][A-Z0-9_]*/.exec(body.slice(p));
      consumers = nm ? namedArrays.get(nm[0]) ?? [] : [];
    }
    const override = overrides.get(id);
    const usage = override ?? (consumers.length > 0 ? 'site' : 'library');
    result.set(id, { usage, consumers, override: override ?? null });
  }
  return result;
}

function sameSet(a, b) {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  return b.every((x) => sa.has(x));
}

function main() {
  const errors = [];

  const registryIds = parseRegistryIds(read(REGISTRY_FILE));
  const usageMap = parseLibraryManifest(read(LIBRARY_MANIFEST_FILE));
  const json = JSON.parse(read(MANIFEST_JSON_FILE));
  const jsonById = new Map(json.map((e) => [e.id, e]));

  // 1. registry <-> SECTION_USAGE parity (no orphan)
  for (const id of registryIds) {
    if (!usageMap.has(id)) errors.push(`type '${id}' present au registry mais ABSENT de SECTION_USAGE`);
  }
  for (const id of usageMap.keys()) {
    if (!registryIds.has(id)) errors.push(`type '${id}' present dans SECTION_USAGE mais ABSENT du registry`);
  }

  // 2. JSON covers exactly registry ids
  for (const id of registryIds) {
    if (!jsonById.has(id)) errors.push(`type '${id}' absent du manifeste JSON (regen ds-section-manifest oubliee ?)`);
  }
  for (const e of json) {
    if (!registryIds.has(e.id)) errors.push(`type '${e.id}' present au manifeste JSON mais ABSENT du registry`);
  }

  // 3 + 4. per-type usage + consumers coherence
  for (const [id, src] of usageMap) {
    const j = jsonById.get(id);
    if (!j) continue;
    if (!('usage' in j)) { errors.push(`'${id}' : champ 'usage' manquant dans le JSON`); continue; }
    if (!Array.isArray(j.consumers)) { errors.push(`'${id}' : champ 'consumers' manquant/invalide dans le JSON`); continue; }
    if (j.usage !== src.usage) {
      errors.push(`'${id}' : usage JSON='${j.usage}' != derive='${src.usage}' (regen requise)`);
    }
    if (!sameSet(j.consumers, src.consumers)) {
      errors.push(`'${id}' : consumers JSON (${j.consumers.length}) != library-manifest (${src.consumers.length}), regen requise`);
    }
    // 4. derivation invariant (override mis a part)
    const expected = src.override ?? (src.consumers.length > 0 ? 'site' : 'library');
    if (j.usage !== expected) {
      errors.push(`'${id}' : usage='${j.usage}' viole la derivation (consumers=${src.consumers.length}, override=${src.override ?? 'aucun'})`);
    }
  }

  // 5. aggregate counts
  const srcSite = [...usageMap.values()].filter((v) => v.usage === 'site').length;
  const srcLib = [...usageMap.values()].filter((v) => v.usage === 'library').length;
  const jsonSite = json.filter((e) => e.usage === 'site').length;
  const jsonLib = json.filter((e) => e.usage === 'library').length;
  if (srcSite !== jsonSite) errors.push(`count 'site' : JSON=${jsonSite} != source=${srcSite}`);
  if (srcLib !== jsonLib) errors.push(`count 'library' : JSON=${jsonLib} != source=${srcLib}`);

  if (errors.length > 0) {
    console.error(`check-usage-manifest: ${errors.length} incoherence(s) :`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log(
    `check-usage-manifest: OK · ${usageMap.size} types (${srcSite} site, ${srcLib} library), manifeste JSON coherent.`,
  );
}

main();
