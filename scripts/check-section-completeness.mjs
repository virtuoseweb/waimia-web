#!/usr/bin/env node
/**
 * check-section-completeness.mjs — PILIER 4 du systeme de production de sections.
 * Gate de completude : « rien oublier ».
 *
 * Doctrine : tasks/section-production-system.md (Pilier 4). Pour chaque type, on
 * resout ses `capabilities` EFFECTIVES (bundle d'archetype + override registry, =
 * la logique de capabilitiesFor / getCapabilities, repliquee ici en JS pur car node
 * ne peut pas importer les .ts) puis on verifie les 5 couches du contrat :
 *   (a) COMPOSANT  : porte la classe de famille `sec-<famille>` ET consomme le moteur
 *       (presence de `.sec-grid` / `.sec-region` / `data-layout`), ET pas de
 *       `grid-template-columns` inline DUPLIQUE hors exceptions tolerees (le moteur
 *       porte la grille ; un composant cataloge ne doit pas re-implementer la recette).
 *   (b) SCHEMA     : herite du mixin de variation unique (`...sectionBaseSchema.shape`).
 *   (c) PRESETS    : chaque layout declare dans capabilities.layouts a >= 1 preset.
 *   (d) FACETS     : facettes peuplees (effects/interactions/elements/layoutFacets non vides
 *       et != placeholders ['none']/['static'] seuls quand l'archetype attend du layout).
 *   (e) REGIONS    : les regions de capabilities.regions sont cablees dans le composant
 *       (presence d'un `data-region='<region>'` ou region heuristique pour header/body).
 *
 * Sortie : tableau lisible (type | archetype | couches OK | manques) + recap
 * (N complets / M incomplets parmi les ACTIFS, puis tous). Exit 1 si un type ACTIF est
 * incomplet (CI), 0 sinon.
 *
 * ACTIF = type ayant des presets cures dans SECTION_PRESETS (les ~34 reellement produits).
 *
 * Contraintes : 0 dependance npm (node built-ins), deterministe, 0 U+2014 (rule 58).
 * Parsing = lecture des sources TS comme texte (regex + scan d'accolades), comme
 * gen-section-manifest.mjs et check-section-rhythm.mjs (aucun loader TS requis).
 *
 * Flag --all     : afficher TOUS les types (defaut = actifs uniquement dans le tableau).
 * Flag --report  : verbeux (liste chaque manque en detail).
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_FILE = 'src/lib/section-registry.ts';
const ARCHETYPES_FILE = 'src/lib/section-archetypes.ts';
const SCHEMA_FILE = 'src/schemas/sections.ts';
const PRESETS_FILE = 'src/lib/section-presets.ts';
const SECTIONS_DIR = 'src/components/sections';

const SHOW_ALL = process.argv.includes('--all');
const REPORT = process.argv.includes('--report');

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

/* ─── Util : scan d'un bloc { ... } equilibre depuis une position d'ouverture ─── */
function matchBrace(src, openIdx, open = '{', close = '}') {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === open) depth++;
    else if (src[i] === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/* ───────────────────────── 1. ARCHETYPES (replique capabilitiesFor) ───────────────────────── */
// On parse section-archetypes.ts pour reconstruire : ARCHETYPE_CAPABILITIES,
// FAMILY_ARCHETYPE, TYPE_ARCHETYPE. capabilitiesFor(type, override, family) =
//   base = ARCHETYPE_CAPABILITIES[ archetypeFor(type, family) ]
//   archetypeFor = TYPE_ARCHETYPE[type] ?? FAMILY_ARCHETYPE[family] ?? 'collection'
//   merge shallow par cle avec l'override registry (capabilities).

function parseStringArray(body) {
  return [...body.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

/** Parse `const NAME: Record<...> = { key: { layouts:[...], regions:[...], ... }, ... }` */
function parseArchetypeCapabilities(src) {
  const decl = /export const ARCHETYPE_CAPABILITIES[^=]*=\s*\{/.exec(src);
  if (!decl) throw new Error('ARCHETYPE_CAPABILITIES not found');
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(src, open);
  const body = src.slice(open + 1, end);

  // COMMON_LAYERS : resoudre la spread `...COMMON_LAYERS`
  let common = [];
  const cm = /const\s+COMMON_LAYERS[^=]*=\s*\[([^\]]*)\]/.exec(src);
  if (cm) common = parseStringArray(cm[1]);

  const out = {};
  // Chaque entree d'archetype : `name: { ... },`
  for (const m of body.matchAll(/([a-zA-Z]+)\s*:\s*\{/g)) {
    const name = m[1];
    const o = m.index + m[0].length - 1;
    const e = matchBrace(body, o);
    const inner = body.slice(o + 1, e);
    const grab = (key) => {
      const km = new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`).exec(inner);
      return km ? parseStringArray(km[1]) : [];
    };
    const layers = grab('layers');
    // resoudre `...COMMON_LAYERS`
    const expandedLayers = [];
    for (const seg of inner.match(/layers\s*:\s*\[([\s\S]*?)\]/)?.[1].split(',') ?? []) {
      const t = seg.trim();
      if (/\.\.\.COMMON_LAYERS/.test(t)) expandedLayers.push(...common);
      else {
        const q = /'([^']+)'/.exec(t);
        if (q) expandedLayers.push(q[1]);
      }
    }
    const familyClassM = /familyClass\s*:\s*'([^']+)'/.exec(inner);
    out[name] = {
      layouts: grab('layouts'),
      regions: grab('regions'),
      axes: grab('axes'),
      layers: expandedLayers.length ? expandedLayers : layers,
      familyClass: familyClassM ? familyClassM[1] : `sec-${name}`,
    };
  }
  return out;
}

/** Parse a `Record<string, Archetype>`-style map: key (quoted or bare) -> 'value'. */
function parseStringMap(src, declRe) {
  const decl = declRe.exec(src);
  if (!decl) return {};
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(src, open);
  const body = src.slice(open + 1, end);
  const out = {};
  for (const m of body.matchAll(/(?:'([^']+)'|([A-Za-z][\w-]*))\s*:\s*'([^']+)'/g)) {
    const key = m[1] ?? m[2];
    out[key] = m[3];
  }
  return out;
}

/* ───────────────────────── 2. REGISTRY (types, family, facets, capabilities override) ───────────────────────── */

function parseRegistry(src) {
  const start = src.indexOf('export const SECTIONS');
  const open = src.indexOf('{', start);
  const end = matchBrace(src, open);
  const body = src.slice(open + 1, end);

  const importMap = new Map();
  for (const m of src.matchAll(/^import\s+(\w+)\s+from\s+'[^']*\/sections\/([^']+\.astro)'/gm)) {
    importMap.set(m[1], m[2]);
  }

  const entries = new Map();
  for (const keyMatch of body.matchAll(/'([a-z][a-z0-9-]*)'\s*:\s*\{/g)) {
    const typeId = keyMatch[1];
    const blockOpen = keyMatch.index + keyMatch[0].length - 1;
    const blockEnd = matchBrace(body, blockOpen);
    if (blockEnd === -1) continue;
    const block = body.slice(blockOpen + 1, blockEnd);

    const component = /component\s*:\s*(\w+)/.exec(block)?.[1] ?? '';
    const family = /family\s*:\s*'([^']+)'/.exec(block)?.[1] ?? '';
    const status = /status\s*:\s*'([^']+)'/.exec(block)?.[1] ?? 'stable';
    const grabFacet = (key) => {
      const fm = new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)\\]`).exec(block);
      return fm ? parseStringArray(fm[1]) : [];
    };
    // override de capabilities (optionnel) : `capabilities: { layouts:[...], ... }`
    let capOverride = null;
    const capM = /capabilities\s*:\s*\{/.exec(block);
    if (capM) {
      const co = capM.index + capM[0].length - 1;
      const ce = matchBrace(block, co);
      const ci = block.slice(co + 1, ce);
      const g = (key) => {
        const km = new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`).exec(ci);
        return km ? parseStringArray(km[1]) : undefined;
      };
      capOverride = {
        layouts: g('layouts'),
        regions: g('regions'),
        axes: g('axes'),
        layers: g('layers'),
        familyClass: /familyClass\s*:\s*'([^']+)'/.exec(ci)?.[1],
      };
    }

    entries.set(typeId, {
      component,
      componentFile: importMap.get(component) ?? component + '.astro',
      family,
      status,
      effects: grabFacet('effects'),
      interactions: grabFacet('interactions'),
      elements: grabFacet('elements'),
      layoutFacets: grabFacet('layoutFacets'),
      capabilities: capOverride,
    });
  }
  return entries;
}

/* ───────────────────────── 3. SCHEMA (mixin inclus ?) ───────────────────────── */
// Le mixin de variation s'applique via `...sectionBaseSchema.shape` dans le z.object du type.
// On localise `export const <camelName>Schema = z.object({ ... })` et on teste la spread.
function typeIdToSchemaName(typeId) {
  return (
    typeId
      .split('-')
      .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
      .join('') + 'Schema'
  );
}

function schemaHasMixin(schemaSrc, typeId) {
  const name = typeIdToSchemaName(typeId);
  const decl = new RegExp(`export\\s+const\\s+${name}\\s*=\\s*z\\.object\\s*\\(\\s*\\{`).exec(schemaSrc);
  if (!decl) return { found: false, hasMixin: false };
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(schemaSrc, open);
  const objBody = schemaSrc.slice(open + 1, end);
  // Accepte les deux idiomes possibles : spread du .shape, ou .extend / merge.
  const hasMixin =
    /\.\.\.sectionBaseSchema\.shape/.test(objBody) ||
    /\.\.\.\s*sectionBaseSchema\b/.test(objBody);
  return { found: true, hasMixin };
}

/* ───────────────────────── 4. PRESETS (layouts couverts par type) ───────────────────────── */
// Parse SECTION_PRESETS : pour chaque type, l'ensemble des `layout: '...'` declares
// + un drapeau « a au moins 1 preset ». Un type sans layout explicite dans aucun preset
// = couvre seulement le layout par defaut (background-only presets).
function parsePresets(src) {
  const decl = /export const SECTION_PRESETS[^=]*=\s*\{/.exec(src);
  if (!decl) throw new Error('SECTION_PRESETS not found');
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(src, open);
  const body = src.slice(open + 1, end);

  const byType = new Map();
  // Chaque cle de type : `'type-id': [ ... ],`
  for (const keyMatch of body.matchAll(/'([a-z][a-z0-9-]*)'\s*:\s*\[/g)) {
    const typeId = keyMatch[1];
    const arrOpen = keyMatch.index + keyMatch[0].length - 1;
    const arrEnd = matchBrace(body, arrOpen, '[', ']');
    if (arrEnd === -1) continue;
    const arr = body.slice(arrOpen + 1, arrEnd);
    const presetCount = [...arr.matchAll(/\bid\s*:\s*'/g)].length;
    const layouts = new Set();
    for (const lm of arr.matchAll(/\blayout\s*:\s*'([^']+)'/g)) layouts.add(lm[1]);
    byType.set(typeId, { presetCount, layouts });
  }
  return byType;
}

/* ───────────────────────── 5. COMPOSANT (.astro heuristiques) ───────────────────────── */
function analyzeComponent(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return { exists: false };
  const src = readFileSync(abs, 'utf8');

  // Classes de famille presentes (sec-collection ... sec-gallery)
  const familyClasses = new Set();
  for (const m of src.matchAll(/\bsec-(collection|bento|split|process|editorial|table|band|hero|logos|gallery)\b/g)) {
    familyClasses.add('sec-' + m[1]);
  }
  const hasSecGrid = /\bsec-grid\b/.test(src);
  const hasSecRegion = /\bsec-region\b/.test(src);
  const hasDataLayout = /data-layout\b/.test(src);
  const consumesEngine = hasSecGrid || hasSecRegion || hasDataLayout;

  // regions cablees (data-region='x' ou data-region={...} avec x heuristique)
  const regionsWired = new Set();
  for (const m of src.matchAll(/data-region\s*=\s*["'{]?\s*['"]?(header|media|body|actions|aside)/g)) {
    regionsWired.add(m[1]);
  }

  // grid-template-columns inline DUPLIQUE : on ne compte que les declarations dans
  // un <style> scope du composant, hors @media (responsive structurel tolere) et hors
  // exceptions (un composant non encore migre garde sa recette). Heuristique : >0
  // occurrence en dehors d'un repeat() trivial = signal de duplication de recette.
  const styleBlocks = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const gtcCount = (styleBlocks.match(/grid-template-columns\s*:/g) || []).length;

  return {
    exists: true,
    familyClasses,
    consumesEngine,
    hasSecGrid,
    hasSecRegion,
    hasDataLayout,
    regionsWired,
    gridTemplateColumnsInline: gtcCount,
  };
}

/* ───────────────────────── Resolution capabilities effectives ───────────────────────── */
function capabilitiesFor(typeId, archetypeCaps, typeArch, familyArch, family, override) {
  const arch = typeArch[typeId] ?? (family && familyArch[family]) ?? 'collection';
  const base = archetypeCaps[arch] ?? archetypeCaps.collection;
  const eff = {
    archetype: arch,
    layouts: override?.layouts ?? base.layouts,
    regions: override?.regions ?? base.regions,
    axes: override?.axes ?? base.axes,
    layers: override?.layers ?? base.layers,
    familyClass: override?.familyClass ?? base.familyClass,
  };
  return eff;
}

/* ───────────────────────── Main ───────────────────────── */
function main() {
  const registrySrc = read(REGISTRY_FILE);
  const archetypeSrc = read(ARCHETYPES_FILE);
  const schemaSrc = read(SCHEMA_FILE);
  const presetsSrc = read(PRESETS_FILE);

  const archetypeCaps = parseArchetypeCapabilities(archetypeSrc);
  const familyArch = parseStringMap(archetypeSrc, /const\s+FAMILY_ARCHETYPE[^=]*=\s*\{/);
  const typeArch = parseStringMap(archetypeSrc, /export const TYPE_ARCHETYPE[^=]*=\s*\{/);
  const registry = parseRegistry(registrySrc);
  const presets = parsePresets(presetsSrc);

  const rows = [];
  for (const [typeId, meta] of registry.entries()) {
    const isActive = (presets.get(typeId)?.presetCount ?? 0) > 0;
    const caps = capabilitiesFor(
      typeId,
      archetypeCaps,
      typeArch,
      familyArch,
      meta.family,
      meta.capabilities,
    );
    const comp = analyzeComponent(`${SECTIONS_DIR}/${meta.componentFile}`);
    const schema = schemaHasMixin(schemaSrc, typeId);
    const pr = presets.get(typeId) ?? { presetCount: 0, layouts: new Set() };

    const missing = [];

    // (a) COMPOSANT : classe de famille + consomme le moteur + pas de grid inline duplique
    let compOk = true;
    if (!comp.exists) {
      compOk = false;
      missing.push('composant: fichier .astro introuvable');
    } else {
      if (!comp.familyClasses.has(caps.familyClass)) {
        compOk = false;
        missing.push(`composant: classe de famille '${caps.familyClass}' absente`);
      }
      if (!comp.consumesEngine) {
        compOk = false;
        missing.push('composant: ne consomme pas le moteur (sec-grid/sec-region/data-layout absents)');
      }
      // grid inline duplique : signal seulement si le composant pretend consommer le moteur
      // ET re-pose une recette de colonnes en CSS scope. Tolere 0. >0 = recette dupliquee.
      if (comp.consumesEngine && comp.gridTemplateColumnsInline > 0) {
        compOk = false;
        missing.push(
          `composant: ${comp.gridTemplateColumnsInline} grid-template-columns inline dupliqué(s) (le moteur porte la grille)`,
        );
      }
    }

    // (b) SCHEMA : mixin de variation
    let schemaOk = true;
    if (!schema.found) {
      schemaOk = false;
      missing.push(`schema: ${typeIdToSchemaName(typeId)} introuvable`);
    } else if (!schema.hasMixin) {
      schemaOk = false;
      missing.push('schema: mixin de variation absent (...sectionBaseSchema.shape)');
    }

    // (c) PRESETS : chaque layout declare a >= 1 preset
    let presetsOk = true;
    const declaredLayouts = caps.layouts;
    const coveredLayouts = pr.layouts;
    // Le layout par defaut (1-col / centered / le 1er de l'archetype) est couvert
    // implicitement par les presets background-only. On exige un preset par layout
    // NON-defaut declare. Defaut = premier element de capabilities.layouts.
    const defaultLayout = declaredLayouts[0];
    const uncovered = declaredLayouts.filter(
      (l) => l !== defaultLayout && !coveredLayouts.has(l),
    );
    if (pr.presetCount === 0) {
      presetsOk = false;
      missing.push('presets: aucun preset declare');
    } else if (uncovered.length > 0) {
      presetsOk = false;
      missing.push(`presets: layouts sans preset -> ${uncovered.join(', ')}`);
    }

    // (d) FACETS : facettes peuplees (au moins effects + elements significatifs)
    let facetsOk = true;
    const placeholderEffects =
      meta.effects.length === 0 ||
      (meta.effects.length === 1 && (meta.effects[0] === 'static' || meta.effects[0] === 'none'));
    const placeholderElements =
      meta.elements.length === 0 ||
      (meta.elements.length === 1 && meta.elements[0] === 'none');
    if (meta.effects.length === 0 || meta.interactions.length === 0 || meta.layoutFacets.length === 0) {
      facetsOk = false;
      missing.push('facets: effects/interactions/layoutFacets non tous peuplés');
    } else if (placeholderEffects && placeholderElements) {
      facetsOk = false;
      missing.push('facets: effects ET elements au placeholder (static/none) seuls');
    }

    // (e) REGIONS : regions de capabilities.regions cablees dans le composant.
    // header/body sont quasi universels (presents sans data-region explicite) ;
    // on exige le data-region explicite pour media/actions/aside (les structurelles).
    let regionsOk = true;
    if (comp.exists) {
      const structural = caps.regions.filter((r) => r === 'media' || r === 'actions' || r === 'aside');
      const missingRegions = structural.filter((r) => !comp.regionsWired.has(r));
      // On ne FAIL pas tant que le composant ne consomme pas encore le moteur de regions
      // (migration en cours) ; on le signale comme manque region uniquement s'il consomme
      // deja sec-region (donc s'engage sur la convention) mais oublie une region declaree.
      if (comp.hasSecRegion && missingRegions.length > 0) {
        regionsOk = false;
        missing.push(`regions: déclarées mais non câblées (data-region) -> ${missingRegions.join(', ')}`);
      }
    }

    const layersOk = { compOk, schemaOk, presetsOk, facetsOk, regionsOk };
    const okCount = Object.values(layersOk).filter(Boolean).length;
    const complete = okCount === 5;

    rows.push({
      typeId,
      archetype: caps.archetype,
      isActive,
      complete,
      okCount,
      layersOk,
      missing,
    });
  }

  rows.sort((a, b) => a.typeId.localeCompare(b.typeId));

  // ── Affichage ──
  const shown = rows.filter((r) => (SHOW_ALL ? true : r.isActive));

  const checkmark = (b) => (b ? 'OK' : '..');
  console.log('check-section-completeness — PILIER 4 (gate de complétude)');
  console.log(`Types ${SHOW_ALL ? 'TOUS' : 'ACTIFS (presets curés)'} : ${shown.length}\n`);
  console.log(
    'type'.padEnd(28) +
      'archétype'.padEnd(13) +
      'comp schéma presets facets régions'.padEnd(36) +
      'état',
  );
  console.log('-'.repeat(92));
  for (const r of shown) {
    const cols =
      `${checkmark(r.layersOk.compOk)}   ` +
      `${checkmark(r.layersOk.schemaOk)}     ` +
      `${checkmark(r.layersOk.presetsOk)}      ` +
      `${checkmark(r.layersOk.facetsOk)}     ` +
      `${checkmark(r.layersOk.regionsOk)}`;
    const tag = r.isActive ? '' : ' (inactif)';
    console.log(
      r.typeId.padEnd(28) +
        r.archetype.padEnd(13) +
        cols.padEnd(36) +
        (r.complete ? 'complet' : `incomplet (${r.okCount}/5)`) +
        tag,
    );
    if (REPORT && r.missing.length) {
      for (const m of r.missing) console.log('    - ' + m);
    }
  }

  // ── Manques detailles (actifs incomplets) meme sans --report ──
  const activeIncomplete = rows.filter((r) => r.isActive && !r.complete);
  if (activeIncomplete.length && !REPORT) {
    console.log('\nManques par type ACTIF incomplet :');
    for (const r of activeIncomplete) {
      console.log(`  ${r.typeId} [${r.archetype}] :`);
      for (const m of r.missing) console.log('    - ' + m);
    }
  }

  // ── Recap ──
  const active = rows.filter((r) => r.isActive);
  const activeComplete = active.filter((r) => r.complete).length;
  const allComplete = rows.filter((r) => r.complete).length;
  console.log('\n' + '='.repeat(60));
  console.log(`ACTIFS  : ${activeComplete}/${active.length} complets, ${active.length - activeComplete} incomplets`);
  console.log(`TOUS    : ${allComplete}/${rows.length} complets, ${rows.length - allComplete} incomplets`);

  const failing = active.length - activeComplete;
  if (failing > 0) {
    console.log(`\nFAIL — ${failing} type(s) ACTIF(s) incomplet(s). Compléter les couches manquantes.`);
    process.exit(1);
  }
  console.log('\nPASS — tous les types actifs sont complets.');
  process.exit(0);
}

main();
