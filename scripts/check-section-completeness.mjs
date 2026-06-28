#!/usr/bin/env node
/**
 * check-section-completeness.mjs : PILIER 4 du systeme de production de sections.
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
 * EXTENSION v2 (couches du moteur de layout v2, cf tasks/wave-c-axes-standard.md) :
 *   (f) COUCHES    : invariant anti-mensonge « une couche DECLAREE dans capabilities.layers
 *       => reellement CABLEE dans le composant ». Pour chaque LayerTag NOUVEAU (v2 :
 *       grid-align/cell-align/states/motion/color/orientation/typography/sizing/a11y),
 *       on cherche dans le .astro AU MOINS UN marqueur de sa signature (binding data-attr
 *       dynamique ou rendu conditionnel). Resultats :
 *         - couche DECLAREE mais NON cablee  -> MENSONGE (capability ment) = ECHEC.
 *         - couche CABLEE mais NON declaree  -> AVERTISSEMENT (pas bloquant).
 *       Tolerance : un type qui ne declare PAS les nouvelles couches n'a RIEN promis =>
 *       jamais en echec sur cette couche (les types non migres ne cassent pas le gate).
 *       L'invariant exact : l'echec ne survient QUE si une couche est DECLAREE sans cablage.
 *
 * Sortie : tableau lisible (type | archetype | couches v1 OK | manques) + section couches v2
 * (mensonges/avertissements par type) + recap (N complets / M incomplets parmi les ACTIFS,
 * puis tous ; total mensonges / avertissements). Exit 1 si un type ACTIF est incomplet (v1)
 * OU si un type ACTIF porte au moins un MENSONGE de couche (v2), 0 sinon.
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
// section-registry.ts (re-export god-file depuis #38 T5). NB : parseRegistry n'y trouve pas
// le bloc SECTIONS inline (il vit dans section-registry.generated.ts) → comportement baseline
// inchange. Repointer ici depasse le scope #40 T3 etape 2 (surface des composants, pas le kernel).
const REGISTRY_FILE = 'src/lib/section-registry.ts';
// #40 T3 etape 2 : archetypes/schema/presets vivent dans le package @waimia/ds-kernel.
const ARCHETYPES_FILE = 'packages/ds-kernel/src/lib/section-archetypes.ts';
const SCHEMA_FILE = 'packages/ds-kernel/src/schemas/sections.ts';
const PRESETS_FILE = 'packages/ds-kernel/src/lib/section-presets.ts';
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

  // Resoudre TOUTES les constantes de couches spreadables (`const NAME ... = [ ... ]`),
  // pas seulement COMMON_LAYERS : le bundle d'archetype spread NOW_COMMON_LAYERS et
  // GRID_LAYERS aussi (`layers: [..., ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS]`).
  // Sans resolution generique, les couches v2 (states/motion/color/... + grid-align/...)
  // n'apparaitraient JAMAIS dans caps.layers => l'invariant ne lirait pas la vraie donnee.
  const layerConsts = {};
  for (const cm of src.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*:[^=]*=\s*\[([^\]]*)\]/g)) {
    layerConsts[cm[1]] = parseStringArray(cm[2]);
  }

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
    // resoudre les spreads `...NAME` (n'importe quelle constante de couches) + litteraux
    const expandedLayers = [];
    for (const seg of inner.match(/layers\s*:\s*\[([\s\S]*?)\]/)?.[1].split(',') ?? []) {
      const t = seg.trim();
      const spread = /\.\.\.([A-Z][A-Z0-9_]*)/.exec(t);
      if (spread) {
        if (layerConsts[spread[1]]) expandedLayers.push(...layerConsts[spread[1]]);
      } else {
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

// #40 T3 etape 2 : depuis la co-location (#38) + l'extraction kernel, chaque type a son
// schema dans packages/ds-kernel/src/sections/<typeId>/schema.ts sous la forme
// `export const schema = z.object({ ... })` (et non plus `<camel>Schema` dans un god-file).
// On lit le module du type et on cherche le mixin sectionBaseSchema dans cet objet.
function schemaHasMixin(_unusedSchemaSrc, typeId) {
  const modPath = join(ROOT, `packages/ds-kernel/src/sections/${typeId}/schema.ts`);
  if (!existsSync(modPath)) return { found: false, hasMixin: false };
  const objSrc = readFileSync(modPath, 'utf8');
  const decl = /export\s+const\s+schema\s*=\s*z\.object\s*\(\s*\{/.exec(objSrc);
  if (!decl) return { found: false, hasMixin: false };
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(objSrc, open);
  const objBody = objSrc.slice(open + 1, end);
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

/* ───────────────────────── 5bis. SIGNATURE DE CABLAGE PAR COUCHE v2 ─────────────────────────
 * Source de verite = les data-attrs canoniques du moteur (src/styles/section-layouts.css)
 * et le composant temoin FeatureGrid.astro. Pour chaque LayerTag NOUVEAU (introduit par le
 * contrat v2), on liste les data-attrs dont la PRESENCE d'un binding dans le .astro prouve
 * le cablage reel de la couche. On n'invente AUCUN LayerTag : ces clefs == les LayerTag du
 * type LayerTag de section-archetypes.ts (sous-ensemble v2). Les 6 couches « historiques »
 * (layout/placement/axes/skin/responsive/interaction) ne sont PAS verifiees ici (couvertes
 * par les checks v1 a-e) : seules les NOUVELLES couches sont soumises a l'invariant.
 *
 * METHODE DE DETECTION (robuste, anti-faux-positif) :
 *   1. On neutralise les commentaires SANS casser le code (stripper regex naif = piege :
 *      une string `'.../line-art/*.svg'` contient `/*` et avalerait tout jusqu'au prochain
 *      `*\/`, cf incident FeatureGrid). On retire donc UNIQUEMENT : (a) les commentaires HTML
 *      `<!-- -->`, (b) les commentaires CSS `/* *\/` situes DANS les blocs <style> (sans
 *      ambiguite la-bas). Le frontmatter/markup JS n'est PAS strippe : c'est le binding-regex
 *      (`= {` / `='` / `="`, etape 2) qui ecarte les data-attrs mentionnes en PROSE de
 *      commentaire (un commentaire ecrit « data-cell-bg, c'est… », jamais `data-cell-bg={`).
 *   2. On exige un BINDING : soit dynamique `data-attr={...}` (expression Astro/JSX), soit
 *      statique pertinent `data-attr='valeur'` / `data-attr="valeur"`. Un `data-attr` nu
 *      sans `=` (improbable mais possible) ne compte pas (pas de valeur => pas de levier).
 *   3. Pour `grid-align`, on exige EN PLUS la presence d'un conteneur de grille du moteur
 *      (`.sec-grid` ou `.sec-item`) : un data-justify-content hors grille moteur ne prouve
 *      pas l'alignement parent/enfant de la grille.
 *   4. `motion` accepte le systeme `data-reveal` (reveal/IntersectionObserver) OU `data-loop`.
 *   5. `a11y` est specifique : il n'a pas de data-attr unique. Cablage prouve par un rendu
 *      conditionnel de niveau de titre (idiome FeatureGrid `headingLevel ?? 'strong') as
 *      'h2' | 'h3'`), OU un `data-heading-level`, OU un `aria-label={...}` dynamique. */

// Construit un regex de binding pour un data-attr : `data-x={` OU `data-x='..'` OU `data-x=".."`.
// Le `\s*=\s*` suivi de `{`, `'` ou `"` garantit qu'une VALEUR (dynamique ou litterale) est posee.
function dataAttrBindingRe(attr) {
  return new RegExp(`\\b${attr}\\s*=\\s*[{'"]`);
}

// data-attrs canoniques par couche v2 (== signature de cablage). Cf section-layouts.css.
const LAYER_SIGNATURE = {
  // grille parent + enfant : alignement/distribution/span (exige aussi .sec-grid/.sec-item).
  'grid-align': [
    'data-justify-content', 'data-align-items', 'data-justify-items', 'data-align-content',
    'data-justify-self', 'data-align-self', 'data-order', 'data-col-span', 'data-row-span',
  ],
  // alignement intra-cellule + cadre media.
  'cell-align': [
    'data-cell-x', 'data-cell-y', 'data-cell-pad', 'data-media-fit', 'data-media-ratio',
  ],
  // etats d'interaction.
  states: ['data-hover', 'data-press', 'data-focus-ring', 'data-transition'],
  // motion : data-loop OU systeme data-reveal (gere a part, cf detectLayerWiring).
  motion: ['data-loop'],
  // couleur de role multi-scope.
  color: ['data-cell-bg', 'data-cell-tone', 'data-tone', 'data-border-tone'],
  // orientation / overflow / scroll-snap.
  orientation: ['data-text-flow', 'data-object-position', 'data-overflow', 'data-scroll-snap'],
  // typographie fine.
  typography: ['data-measure', 'data-balance', 'data-clamp', 'data-title-scale'],
  // dimensions / sizing.
  sizing: ['data-width', 'data-min-height', 'data-item-height'],
  // a11y : gere a part (rendu conditionnel headingLevel / data-heading-level / aria-label dyn).
  a11y: [],
};

// L'ensemble des LayerTag v2 verifies par l'invariant (== clefs de LAYER_SIGNATURE).
const V2_LAYERS = Object.keys(LAYER_SIGNATURE);

// Neutralise les commentaires SANS casser le code (anti-faux-positif data-attr en commentaire),
// en evitant le piege du `/*` present dans une string (ex. glob '.../line-art/*.svg').
// Strategie sure : retirer les commentaires HTML partout ; retirer les commentaires CSS `/* */`
// UNIQUEMENT a l'interieur des blocs <style> (ou ils sont non ambigus). Le JS du frontmatter
// n'est pas touche (le binding-regex `= {`/`='`/`="` ecarte deja la prose de commentaire).
function stripComments(src) {
  let out = src.replace(/<!--[\s\S]*?-->/g, ' '); // commentaires HTML / markup Astro
  // commentaires CSS uniquement dans les blocs <style> ... </style>
  out = out.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (block) =>
    block.replace(/\/\*[\s\S]*?\*\//g, ' '),
  );
  return out;
}

// Pour un source DEJA decommente, retourne l'ensemble des couches v2 reellement cablees.
function detectLayerWiring(cleanSrc) {
  const hasGridContainer = /\bsec-grid\b/.test(cleanSrc) || /\bsec-item\b/.test(cleanSrc);
  const wired = new Set();
  for (const layer of V2_LAYERS) {
    if (layer === 'a11y') {
      // headingLevel conditionnel (idiome FeatureGrid) OU data-heading-level OU aria-label dynamique.
      const headingConditional =
        /headingLevel\b/.test(cleanSrc) &&
        /(['"]h2['"]\s*\|\s*['"]h3['"]|as\s+['"]h2['"]|<\s*\w*Tag\b)/.test(cleanSrc);
      const dataHeadingLevel = dataAttrBindingRe('data-heading-level').test(cleanSrc);
      const ariaLabelDynamic = /\baria-label\s*=\s*\{/.test(cleanSrc);
      if (headingConditional || dataHeadingLevel || ariaLabelDynamic) wired.add(layer);
      continue;
    }
    if (layer === 'motion') {
      // data-loop (binding) OU systeme data-reveal (classe reveal* OU data-reveal binding/usage).
      const loop = dataAttrBindingRe('data-loop').test(cleanSrc);
      const reveal =
        /\breveal-(?:stagger|blur-clip|zoom-in|cta)\b/.test(cleanSrc) ||
        /\bclass=["'][^"']*\breveal\b/.test(cleanSrc) ||
        dataAttrBindingRe('data-reveal').test(cleanSrc);
      if (loop || reveal) wired.add(layer);
      continue;
    }
    if (layer === 'grid-align') {
      // exige la grille moteur ET au moins un binding d'alignement parent/enfant.
      if (hasGridContainer && LAYER_SIGNATURE[layer].some((a) => dataAttrBindingRe(a).test(cleanSrc))) {
        wired.add(layer);
      }
      continue;
    }
    // couches « plates » : au moins un data-attr de la signature avec binding.
    if (LAYER_SIGNATURE[layer].some((a) => dataAttrBindingRe(a).test(cleanSrc))) {
      wired.add(layer);
    }
  }
  return wired;
}

/* ───────────────────────── 5. COMPOSANT (.astro heuristiques) ───────────────────────── */
function analyzeComponent(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return { exists: false };
  const src = readFileSync(abs, 'utf8');
  // Source decommente pour la detection de couches v2 (anti-faux-positif data-attr en commentaire).
  const clean = stripComments(src);
  const layersWired = detectLayerWiring(clean);

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
    layersWired,
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
    layers: override?.layers ?? base.layers, // couches EFFECTIVES (= capabilitiesFor)
    familyClass: override?.familyClass ?? base.familyClass,
    // Distinction necessaire a l'invariant anti-mensonge (cf main) :
    // - baseLayers   = defauts HERITES du bundle d'archetype (reserve de contrat, couches que
    //   le moteur SUPPORTE pour cette famille ; non cable = avertissement de migration).
    // - overrideLayers = declaration DELIBEREE per-type au registry (`capabilities.layers`) :
    //   engagement ferme « ce type EXPOSE X » ; non cable = MENSONGE (echec).
    baseLayers: base.layers,
    overrideLayers: override?.layers ?? null,
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

    // (f) COUCHES v2 : invariant « capability DELIBEREMENT declaree => cablage reel ».
    //
    // Deux niveaux de « declaration » (cf wave-c §331 « reserve au contrat != annonce dispo ») :
    //  - OVERRIDE registry (`capabilities.layers` du descripteur) = engagement FERME per-type :
    //    « ce type EXPOSE X ». Declaree-non-cablee = MENSONGE = ECHEC (l'invariant exact).
    //  - BUNDLE d'archetype (defauts herites) = reserve de contrat (couches que le moteur
    //    SUPPORTE pour la famille). Non-cablee = AVERTISSEMENT de migration (non bloquant) :
    //    sinon le gate punirait TOUS les types non migres (le bundle declare 8 couches v2 par
    //    defaut) et meme le seul type migre (feature-grid n'en cable pas 8/8). C'est exactement
    //    la tolerance exigee : un type qui n'a pas OVERRIDE n'a rien promis fermement => 0 echec.
    //
    // Le « lie » (MENSONGE) ne porte donc QUE sur les couches de l'override registry.
    const wiredV2 = comp.exists ? comp.layersWired : new Set();
    const overrideV2 = (caps.overrideLayers ?? []).filter((l) => V2_LAYERS.includes(l));
    const bundleV2 = caps.baseLayers.filter((l) => V2_LAYERS.includes(l));
    // couches « declarees » = ce que le type promet (override s'il existe, sinon le bundle).
    const declaredV2 = [...new Set([...overrideV2, ...bundleV2])];
    // MENSONGE = override declare mais pas cable (engagement ferme viole).
    const lies = overrideV2.filter((l) => !wiredV2.has(l)).sort();
    // AVERTISSEMENT-A = bundle herite non cable (couche supportee a migrer ; informatif).
    const bundleUnwired = bundleV2.filter((l) => !wiredV2.has(l) && !overrideV2.includes(l)).sort();
    // AVERTISSEMENT-B = cablee mais ni override ni bundle ne la declarent (cas rare).
    const undeclared = [...wiredV2].filter((l) => !declaredV2.includes(l)).sort();

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
      declaredV2,
      overrideV2,
      bundleV2,
      wiredV2: [...wiredV2].sort(),
      lies,
      bundleUnwired,
      undeclared,
    });
  }

  rows.sort((a, b) => a.typeId.localeCompare(b.typeId));

  // ── Affichage ──
  const shown = rows.filter((r) => (SHOW_ALL ? true : r.isActive));

  const checkmark = (b) => (b ? 'OK' : '..');
  console.log('check-section-completeness : PILIER 4 (gate de complétude)');
  console.log(`Types ${SHOW_ALL ? 'TOUS' : 'ACTIFS (presets curés)'} : ${shown.length}\n`);
  console.log(
    'type'.padEnd(28) +
      'archétype'.padEnd(13) +
      'comp schéma presets facets régions'.padEnd(36) +
      'couches v2'.padEnd(13) +
      'état',
  );
  console.log('-'.repeat(104));
  for (const r of shown) {
    const cols =
      `${checkmark(r.layersOk.compOk)}   ` +
      `${checkmark(r.layersOk.schemaOk)}     ` +
      `${checkmark(r.layersOk.presetsOk)}      ` +
      `${checkmark(r.layersOk.facetsOk)}     ` +
      `${checkmark(r.layersOk.regionsOk)}`;
    // Colonne couches v2 : « câblées/déclarées » (déclarées = override+bundle). Flag MENSONGE
    // SEULEMENT si une couche de l'OVERRIDE registry n'est pas câblée (engagement ferme violé).
    const wiredCount = r.declaredV2.filter((l) => r.wiredV2.includes(l)).length;
    const layersCol = r.declaredV2.length === 0
      ? (r.undeclared.length ? `0 décl (${r.undeclared.length} +)` : '0 décl.')
      : `${wiredCount}/${r.declaredV2.length}${r.lies.length ? ' MENSONGE' : ''}`;
    const tag = r.isActive ? '' : ' (inactif)';
    console.log(
      r.typeId.padEnd(28) +
        r.archetype.padEnd(13) +
        cols.padEnd(36) +
        layersCol.padEnd(13) +
        (r.complete ? 'complet' : `incomplet (${r.okCount}/5)`) +
        tag,
    );
    if (REPORT && r.missing.length) {
      for (const m of r.missing) console.log('    - ' + m);
    }
    if (REPORT && (r.lies.length || r.bundleUnwired.length || r.undeclared.length)) {
      if (r.lies.length) console.log('    - couches MENSONGE (override déclaré non câblé) -> ' + r.lies.join(', '));
      if (r.bundleUnwired.length) console.log('    - couches bundle non câblées (avert. migration) -> ' + r.bundleUnwired.join(', '));
      if (r.undeclared.length) console.log('    - couches câblées non déclarées (avert.) -> ' + r.undeclared.join(', '));
    }
  }

  // ── Manques detailles (actifs incomplets) meme sans --report ──
  const activeIncomplete = rows.filter((r) => r.isActive && !r.complete);
  if (activeIncomplete.length && !REPORT) {
    console.log('\nManques par type ACTIF incomplet (couches v1) :');
    for (const r of activeIncomplete) {
      console.log(`  ${r.typeId} [${r.archetype}] :`);
      for (const m of r.missing) console.log('    - ' + m);
    }
  }

  // ── Section COUCHES v2 (invariant capabilities => cablage) sur les ACTIFS ──
  const active = rows.filter((r) => r.isActive);
  const activeLies = active.filter((r) => r.lies.length);          // override declare non cable = ECHEC
  const activeBundleWarn = active.filter((r) => r.bundleUnwired.length); // bundle non cable = avert migration
  const activeUndecl = active.filter((r) => r.undeclared.length);  // cable non declare = avert
  console.log('\n' + '-'.repeat(60));
  console.log('COUCHES v2 : invariant « couche DÉLIBÉRÉMENT déclarée (override) => câblée »');
  if (activeLies.length === 0) {
    console.log('  MENSONGES : aucun (aucune couche d\'override registry n\'est laissée non câblée).');
  } else {
    console.log(`  MENSONGES (override déclaré NON câblé = ÉCHEC), ${activeLies.length} type(s) actif(s) :`);
    for (const r of activeLies) {
      console.log(`    ${r.typeId} [${r.archetype}] -> ${r.lies.join(', ')}`);
    }
  }
  if (activeBundleWarn.length) {
    console.log(`  AVERT. migration (couche bundle supportée NON câblée, non bloquant), ${activeBundleWarn.length} type(s) :`);
    for (const r of activeBundleWarn) {
      console.log(`    ${r.typeId} [${r.archetype}] -> ${r.bundleUnwired.join(', ')}`);
    }
  }
  if (activeUndecl.length) {
    console.log(`  AVERT. câblé-non-déclaré (couche câblée hors contrat, non bloquant), ${activeUndecl.length} type(s) :`);
    for (const r of activeUndecl) {
      console.log(`    ${r.typeId} [${r.archetype}] -> ${r.undeclared.join(', ')}`);
    }
  }
  const activeWithOverride = active.filter((r) => r.overrideV2.length).length;
  const activeFullyWired = active.filter((r) => {
    const cable = (l) => r.wiredV2.includes(l);
    return r.declaredV2.length && r.declaredV2.every(cable);
  }).length;
  console.log(
    `  Récap couches : ${activeWithOverride}/${active.length} types actifs DÉCLARENT des couches v2 en override ` +
      `(engagement ferme) ; ${activeFullyWired} câblent toutes leurs couches déclarées (override+bundle) ; ` +
      `${activeLies.length} en MENSONGE ; ${activeBundleWarn.length} avec avert. migration.`,
  );

  // ── Recap global ──
  const activeComplete = active.filter((r) => r.complete).length;
  const allComplete = rows.filter((r) => r.complete).length;
  console.log('\n' + '='.repeat(60));
  console.log(`ACTIFS  : ${activeComplete}/${active.length} complets (v1), ${active.length - activeComplete} incomplets`);
  console.log(`TOUS    : ${allComplete}/${rows.length} complets (v1), ${rows.length - allComplete} incomplets`);

  // ── Verdict : echec si incomplet v1 OU mensonge de couche v2 sur un type actif ──
  const failingV1 = active.length - activeComplete;
  const failingLies = activeLies.length;
  if (failingV1 > 0 || failingLies > 0) {
    const parts = [];
    if (failingV1 > 0) parts.push(`${failingV1} type(s) ACTIF(s) incomplet(s) (couches v1)`);
    if (failingLies > 0) parts.push(`${failingLies} type(s) ACTIF(s) avec MENSONGE de couche v2`);
    console.log(`\nFAIL : ${parts.join(' + ')}. Compléter le câblage ou corriger les capabilities.`);
    process.exit(1);
  }
  console.log('\nPASS : tous les types actifs sont complets (v1) et sans mensonge de couche (v2).');
  process.exit(0);
}

main();
