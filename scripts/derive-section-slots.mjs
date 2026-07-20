// Waimia · Vague C2-A · Dérivation du contrat de slots (G1)
//
// Produit `src/lib/section-slots.generated.json` : pour chaque type de section, le
// contrat de contenu DÉRIVÉ DU ZOD (`src/schemas/sections.ts`). C'est une donnée de
// build commitée, consommée par `src/lib/section-slots.ts` (getSlots).
//
// Méthode (robuste) : on importe le module Zod compilé en mémoire et on introspecte
// chaque option de la discriminatedUnion (`sectionSchema._def.options`). Zod v4.
//
// Le schéma importe `z` depuis `astro:content` (module virtuel Astro non résoluble
// hors build). On en fait une copie temporaire (hors repo) où cet import pointe vers
// le zod réel du repo, puis on l'importe dynamiquement. tsx transpile le .ts à la volée.
//
// Lancement : `npx tsx scripts/derive-section-slots.mjs` (depuis la racine du repo).
//
// Règles de classification (cf tasks/wave-c2-a-spec.md) :
//  - kind 'presentation' = axes de RENDU (allow-list ci-dessous) ; tout le reste = 'content'.
//  - bilingual:true si le champ existe en paire `_fr`/`_en` (1 seul slot logique sans suffixe).
//  - type : text | richtext | image | url | enum | array | bool | number | object.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const repoRoot = process.cwd();
// #40 T3 etape 2 : le contrat (sections.ts + schema.ts co-localises + _shared) vit dans
// @waimia/ds-kernel. Le contrat de slots derive (section-slots.generated.json) y vit aussi
// (consomme par packages/ds-kernel/src/lib/section-slots.ts).
const KERNEL_SRC = path.join(repoRoot, 'packages/ds-kernel/src');
const SCHEMA_PATH = path.join(KERNEL_SRC, 'schemas/sections.ts');
const OUT_PATH = path.join(KERNEL_SRC, 'lib/section-slots.generated.json');

// Axes de présentation (rendu), classés 'presentation'. Le reste = 'content'.
// On y met (1) les axes nommés par la spec C2-A et (2) l'INTÉGRALITÉ du mixin de
// rendu `sectionBaseSchema` (Pilier 2 / couches NOW) : ce sont des knobs de rendu,
// pas du contenu éditorial, donc toujours 'presentation' quand ils apparaissent.
const PRESENTATION_FIELDS = new Set([
  // Axes nommés par la spec (couvrent aussi des schémas hors mixin de base).
  'variant',
  'media_side',
  'swap_mode',
  'swapMode',
  'reveal_mode',
  'revealMode',
  'speed',
  'rounded',
  'reversed',
  'alternate_blocks',
  'alternateBlocks',
  'media_sticky',
  'mediaSticky',
  // Mixin de rendu `sectionBaseSchema` (exhaustif) : axes de variation Pilier 2.
  'background',
  'layout',
  'density',
  'contentAlign',
  'actionsAlign',
  'placement',
  'columns',
  'colRatio',
  'itemHeight',
  'proportion',
  'mediaSide',
  'surface',
  'divider',
  'radius',
  'accentEdge',
  'colsMobile',
  'colsTablet',
  'layoutMobile',
  'titleScale',
  'eyebrow',
  'justifyContent',
  'alignItems',
  'justifyItems',
  'alignContent',
  'cellAlignX',
  'cellAlignY',
  'cellPad',
  'mediaFit',
  'mediaRatio',
  'reveal',
  'hover',
  'pressFeedback',
  'focusRing',
  'transitionSpeed',
  'transitionEase',
  'selectedState',
  'openState',
  'revealStagger',
  'revealDelay',
  'loop',
  'scrollMotion',
  'textMotion',
  'motionSpeed',
  'motionEase',
  'pageTransition',
  'cellBg',
  'cellTone',
  'tone',
  'borderTone',
  'textFlow',
  'textTransform',
  'rotate',
  'objectPosition',
  'overflow',
  'scrollSnap',
  'measure',
  'balance',
  'clamp',
  'minHeight',
  'width',
  'headingLevel',
  'ariaLabel',
  'headerAlign',
  'headerKind',
  'introRow',
  'dividers',
  'cardContent',
  'cardMedia',
  'cardAlign',
  'colorDistribution',
  'bgSource',
  'bgImage',
]);

function classifyKind(fieldName) {
  return PRESENTATION_FIELDS.has(fieldName) ? 'presentation' : 'content';
}

// Déballe optional / default / nullable pour atteindre le schéma noyau.
function unwrap(schema) {
  let s = schema;
  let required = true;
  for (let guard = 0; guard < 12; guard++) {
    const t = s?._def?.type;
    if (t === 'optional' || t === 'nullable' || t === 'default' || t === 'catch') {
      if (t === 'optional' || t === 'default') required = false;
      s = s._def.innerType;
      continue;
    }
    break;
  }
  return { core: s, required };
}

function enumValues(core) {
  // zod v4 enum : .options (array) ou _def.entries (record).
  if (Array.isArray(core?.options)) return core.options.slice();
  const entries = core?._def?.entries;
  if (entries && typeof entries === 'object') return Object.values(entries);
  return undefined;
}

function arrayBounds(core) {
  const out = {};
  const checks = core?._def?.checks || [];
  for (const c of checks) {
    const def = c?._zod?.def || c?.def || {};
    if (def.check === 'min_length' && typeof def.minimum === 'number') out.min = def.minimum;
    if (def.check === 'max_length' && typeof def.maximum === 'number') out.max = def.maximum;
  }
  return out;
}

// Détermine le `type` logique d'un champ scalaire à partir de son nom + schéma noyau.
function scalarType(fieldName, core) {
  const t = core?._def?.type;
  if (t === 'enum') return 'enum';
  if (t === 'boolean') return 'bool';
  if (t === 'number' || t === 'int' || t === 'bigint') return 'number';
  if (t === 'literal') return 'enum';
  if (t === 'object') return 'object';
  if (t === 'array') return 'array';
  // strings : affiner par nom de champ
  const n = fieldName.toLowerCase();
  if (/(^|_)(media_src|src|image|img|logo|avatar|icon)($|_)/.test(n) || n.endsWith('_src') || n === 'media_src') return 'image';
  if (n.includes('href') || n.endsWith('link') || n === 'url' || n.endsWith('_url') || n.endsWith('_link')) return 'url';
  if (n.endsWith('_html') || n === 'html' || n === 'body_html') return 'richtext';
  // Corps Markdown riche (#39) : body_md / *_md / body → slot logique richtext.
  if (n.endsWith('_md') || n === 'md' || n === 'body_md' || n === 'body') return 'richtext';
  return 'text';
}

// Regroupe les champs `x_fr`/`x_en` en un slot logique `x` bilingue.
// Retourne une liste de { field, members, bilingual }.
function groupBilingual(fieldNames) {
  const seen = new Set();
  const groups = [];
  for (const name of fieldNames) {
    if (seen.has(name)) continue;
    const mFr = name.match(/^(.*)_fr$/);
    if (mFr) {
      const base = mFr[1];
      const en = `${base}_en`;
      if (fieldNames.includes(en)) {
        seen.add(name);
        seen.add(en);
        groups.push({ field: base, members: [name, en], bilingual: true });
        continue;
      }
    }
    const mEn = name.match(/^(.*)_en$/);
    if (mEn) {
      const base = mEn[1];
      const fr = `${base}_fr`;
      if (fieldNames.includes(fr)) {
        // déjà traité par la branche _fr ; sécurité
        seen.add(name);
        seen.add(fr);
        groups.push({ field: base, members: [fr, name], bilingual: true });
        continue;
      }
    }
    seen.add(name);
    groups.push({ field: name, members: [name], bilingual: false });
  }
  return groups;
}

// Construit la forme d'item d'un object (pour les arrays d'objets).
function objectItemShape(objCore) {
  const shape = objCore?.shape;
  if (!shape) return undefined;
  const names = Object.keys(shape);
  const groups = groupBilingual(names);
  const out = [];
  for (const g of groups) {
    // pour un slot bilingue, on prend le membre _fr comme représentant
    const repName = g.members[0];
    const repSchema = shape[repName];
    const { core, required } = unwrap(repSchema);
    const type = scalarType(g.field, core);
    const slot = { field: g.field, type, required };
    if (g.bilingual) slot.bilingual = true;
    const ev = enumValues(core);
    if (type === 'enum' && ev) slot.enumValues = ev;
    if (type === 'array') {
      const b = arrayBounds(core);
      if (b.min != null) slot.min = b.min;
      if (b.max != null) slot.max = b.max;
      Object.assign(slot, elementShape(core?._def?.element));
    }
    if (type === 'object') {
      const nested = objectItemShape(core);
      if (nested) slot.itemShape = nested;
    }
    out.push(slot);
  }
  return out;
}

// Détecte la forme du pointeur `{ref}` (P4.4-e) sur un schéma Zod COMPILÉ : objet à une
// seule clé `ref` de type string (= refSchema de _shared/refs.ts). Robuste aux wrappers.
function isRefShape(schema) {
  const { core } = unwrap(schema);
  if (core?._def?.type !== 'object') return false;
  const shape = core?.shape;
  if (!shape) return false;
  const keys = Object.keys(shape);
  if (keys.length !== 1 || keys[0] !== 'ref') return false;
  const refCore = unwrap(shape.ref).core;
  return refCore?._def?.type === 'string';
}

// Dérive les propriétés d'itemShape d'un ÉLÉMENT de tableau (`el = core._def.element`).
// Factorise le traitement dupliqué entre deriveSlots() et objectItemShape(), et ajoute la
// détection ADDITIVE union → `{ref}` :
//  - élément objet         → { itemShape }  (comportement historique inchangé) ;
//  - élément union `{ref}`  → { refable:true, itemShape? }  (itemShape dérivé de la branche
//                             INLINE, i.e. l'AUTRE membre de l'union) ;
//  - tout le reste (dont une union NON-ref, ex. z.union([string, boolean])) → {}  (fallthrough
//    EXACT au comportement actuel : ni itemShape, ni refable, aucun crash).
function elementShape(el) {
  const out = {};
  const t = el?._def?.type;
  if (t === 'object') {
    const nested = objectItemShape(el);
    if (nested) out.itemShape = nested;
    return out;
  }
  if (t === 'union') {
    const options = el?._def?.options;
    if (Array.isArray(options)) {
      const refBranch = options.find((o) => isRefShape(o));
      const inlineBranch = options.find((o) => !isRefShape(o));
      if (refBranch && inlineBranch) {
        out.refable = true;
        const inlineCore = unwrap(inlineBranch).core;
        if (inlineCore?._def?.type === 'object') {
          const nested = objectItemShape(inlineCore);
          if (nested) out.itemShape = nested;
        }
      }
    }
  }
  return out;
}

function deriveSlots(optionSchema, typeName, refTargets) {
  const shape = optionSchema?.shape;
  if (!shape) return [];
  const names = Object.keys(shape).filter((n) => n !== 'type'); // 'type' = discriminant, pas un slot
  const groups = groupBilingual(names);
  const slots = [];
  for (const g of groups) {
    const repName = g.members[0];
    const repSchema = shape[repName];
    const { core, required } = unwrap(repSchema);
    const type = scalarType(g.field, core);
    const kind = classifyKind(g.field);
    const slot = { field: g.field, kind, type, required };
    if (g.bilingual) slot.bilingual = true;
    const ev = enumValues(core);
    if (type === 'enum' && ev) slot.enumValues = ev;
    if (type === 'array') {
      const b = arrayBounds(core);
      if (b.min != null) slot.min = b.min;
      if (b.max != null) slot.max = b.max;
      Object.assign(slot, elementShape(core?._def?.element));
    }
    if (type === 'object') {
      const nested = objectItemShape(core);
      if (nested) slot.itemShape = nested;
    }
    // Stampe la source de référence depuis la table de vérité UNIQUE (refs.ts REF_TARGETS) :
    // évite toute table dupliquée côté builder. VIDE en Phase 0 → refSource jamais stampé.
    const refKey = `${typeName}.${g.field}`;
    if (refTargets && Object.prototype.hasOwnProperty.call(refTargets, refKey)) {
      slot.refSource = refTargets[refKey];
    }
    slots.push(slot);
  }
  return slots;
}

async function loadSchemaModule() {
  const reqFromRepo = createRequire(path.join(repoRoot, 'package.json'));
  const zodPath = reqFromRepo.resolve('zod');

  // #40 T3 etape 2 : `sections.ts` (kernel) importe des feuilles RELATIVES internes au kernel
  // (`../sections/_shared/base`, `../sections/<type>/schema`, `./sections.generated`) qui
  // importent `zod` (depuis efbb673b ; avant : astro:content). On copie TOUT le kernel dans un
  // tmp en preservant la structure (les imports relatifs internes resolvent) et on rebinde
  // `zod` + `@waimia/ds-kernel` (sous-chemins) + `astro:content` (par securite, idempotent)
  // vers des chemins absolus/locaux. Puis on importe <tmp>/ds-kernel/schemas/sections.ts.
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'c2a-sections-'));
  const rebind = (code) =>
    code
      .replace(/from ['"]astro:content['"]/g, `from ${JSON.stringify(zodPath)}`)
      .replace(/from ['"]zod['"]/g, `from ${JSON.stringify(zodPath)}`)
      .replace(/from ['"]@waimia\/ds-kernel\/([^'"]+)['"]/g, (_m, sub) =>
        `from ${JSON.stringify(path.join(tmpRoot, 'ds-kernel', sub + '.ts'))}`)
      .replace(/from ['"]@waimia\/ds-kernel['"]/g, `from ${JSON.stringify(path.join(tmpRoot, 'ds-kernel', 'index.ts'))}`);

  try {
    // Copier TOUT le kernel (schemas + lib + sections/<type>/schema.ts + _shared) ->
    // <tmp>/ds-kernel/** en preservant la structure (+ .json comme section-slots.generated.json
    // et les schemas/generated/*.json eventuels, copies tels quels).
    const copyTree = (srcDir, destDir) => {
      fs.mkdirSync(destDir, { recursive: true });
      for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
        const from = path.join(srcDir, entry.name);
        const to = path.join(destDir, entry.name);
        if (entry.isDirectory()) copyTree(from, to);
        else if (entry.isFile() && entry.name.endsWith('.ts'))
          fs.writeFileSync(to, rebind(fs.readFileSync(from, 'utf8')));
        else if (entry.isFile() && entry.name.endsWith('.json'))
          fs.copyFileSync(from, to);
      }
    };
    copyTree(KERNEL_SRC, path.join(tmpRoot, 'ds-kernel'));

    return await import(path.join(tmpRoot, 'ds-kernel', 'schemas', 'sections.ts'));
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

async function main() {
  const S = await loadSchemaModule();
  const union = S.sectionSchema;
  const options = union?._def?.options;
  if (!Array.isArray(options)) {
    throw new Error('sectionSchema._def.options introuvable (zod v4 attendu).');
  }
  // Table de vérité UNIQUE des champs référençables (refs.ts). Feuille pure (n'importe que
  // zod) → import direct (pas de rebind astro:content nécessaire). VIDE en Phase 0.
  const refsMod = await import(
    pathToFileURL(path.join(KERNEL_SRC, 'sections/_shared/refs.ts')).href
  );
  const refTargets = refsMod.REF_TARGETS ?? {};
  const result = {};
  for (const opt of options) {
    const litSchema = opt?.shape?.type;
    const typeName = litSchema?._def?.values?.[0];
    if (!typeName) {
      throw new Error('Option sans discriminant `type` littéral.');
    }
    result[typeName] = { slots: deriveSlots(opt, typeName, refTargets) };
  }
  const sorted = {};
  for (const k of Object.keys(result).sort()) sorted[k] = result[k];
  fs.writeFileSync(OUT_PATH, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`derive-section-slots: ${Object.keys(sorted).length} types écrits dans ${path.relative(repoRoot, OUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
