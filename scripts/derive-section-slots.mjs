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

const repoRoot = process.cwd();
const SCHEMA_PATH = path.join(repoRoot, 'src/schemas/sections.ts');
const OUT_PATH = path.join(repoRoot, 'src/lib/section-slots.generated.json');

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
      const el = core?._def?.element;
      if (el?._def?.type === 'object') {
        const nested = objectItemShape(el);
        if (nested) slot.itemShape = nested;
      }
    }
    if (type === 'object') {
      const nested = objectItemShape(core);
      if (nested) slot.itemShape = nested;
    }
    out.push(slot);
  }
  return out;
}

function deriveSlots(optionSchema) {
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
      const el = core?._def?.element;
      if (el?._def?.type === 'object') {
        const nested = objectItemShape(el);
        if (nested) slot.itemShape = nested;
      }
    }
    if (type === 'object') {
      const nested = objectItemShape(core);
      if (nested) slot.itemShape = nested;
    }
    slots.push(slot);
  }
  return slots;
}

async function loadSchemaModule() {
  const reqFromRepo = createRequire(path.join(repoRoot, 'package.json'));
  const zodPath = reqFromRepo.resolve('zod');

  // Depuis la co-location (#38), `sections.ts` importe des feuilles RELATIVES
  // (`../sections/_shared/base`, `../sections/_shared/subschemas`, et des modules
  // co-localisés `../sections/<type>/schema`). Ces feuilles importent elles-mêmes
  // `z` depuis `astro:content` (transitif). On reconstruit donc l'arborescence RELATIVE
  // dans UN répertoire temp (mkdtemp) en préservant la structure attendue :
  //   <tmp>/schemas/sections.ts          (le god-file)
  //   <tmp>/sections/**.ts               (les feuilles _shared + modules co-localisés)
  // et on rebinde `astro:content` -> zod réel dans CHAQUE fichier copié. Ainsi les
  // imports relatifs résolvent dans le temp et le `astro:content` transitif est neutralisé.
  const rebindAstro = (code) =>
    code.replace(/from ['"]astro:content['"]/g, `from ${JSON.stringify(zodPath)}`);

  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'c2a-sections-'));
  try {
    // 1) Copier TOUT src/schemas/*.ts vers <tmp>/schemas/ (god-file `sections.ts` + ses
    //    siblings GENERES `sections.generated.ts` que le god-file ré-exporte depuis #38 T5,
    //    + page-document.ts). Sans le sibling généré, l'import `./sections.generated` du
    //    god-file échoue (MODULE_NOT_FOUND). Les sous-dossiers (schemas/generated/) ne sont
    //    pas importés par sections.ts : inutile de les copier.
    const tmpSchemasDir = path.join(tmpRoot, 'schemas');
    fs.mkdirSync(tmpSchemasDir, { recursive: true });
    const repoSchemasDir = path.dirname(SCHEMA_PATH);
    for (const entry of fs.readdirSync(repoSchemasDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.ts')) {
        fs.writeFileSync(
          path.join(tmpSchemasDir, entry.name),
          rebindAstro(fs.readFileSync(path.join(repoSchemasDir, entry.name), 'utf8')),
        );
      }
    }

    // 2) Copier toute l'arborescence src/sections/**.ts vers <tmp>/sections/**.ts en
    //    préservant la structure relative (couvre _shared + modules co-localisés). Les
    //    feuilles non importées par sections.ts (demo.ts / types.ts) sont copiées sans
    //    risque : elles ne seront jamais chargées par l'import dynamique.
    const sectionsDir = path.join(repoRoot, 'src/sections');
    if (fs.existsSync(sectionsDir)) {
      const tmpSectionsDir = path.join(tmpRoot, 'sections');
      const copyTsTree = (srcDir, destDir) => {
        fs.mkdirSync(destDir, { recursive: true });
        for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
          const from = path.join(srcDir, entry.name);
          const to = path.join(destDir, entry.name);
          if (entry.isDirectory()) {
            copyTsTree(from, to);
          } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            fs.writeFileSync(to, rebindAstro(fs.readFileSync(from, 'utf8')));
          }
        }
      };
      copyTsTree(sectionsDir, tmpSectionsDir);
    }

    return await import(path.join(tmpSchemasDir, 'sections.ts'));
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
  const result = {};
  for (const opt of options) {
    const litSchema = opt?.shape?.type;
    const typeName = litSchema?._def?.values?.[0];
    if (!typeName) {
      throw new Error('Option sans discriminant `type` littéral.');
    }
    result[typeName] = { slots: deriveSlots(opt) };
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
