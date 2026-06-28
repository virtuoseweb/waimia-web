#!/usr/bin/env node
/**
 * scaffold-section.mjs — PILIER 3 du systeme de production de sections.
 * Generateur : blueprint -> artefacts complets des 5 touchpoints.
 *
 * Doctrine : tasks/section-production-system.md (Pilier 3). « Produire une section =
 * generer TOUTES les familles/variantes/declinaisons/positions/layouts d'un coup depuis
 * un schema attendu, propager au contrat ; ZERO dette ». Le generateur emet les artefacts
 * complets d'un nouveau type a partir d'UN blueprint declaratif.
 *
 * APPROCHE ROBUSTE v1 (decision Pilier 3) : on EMET des fichiers/snippets prets a inserer
 * + un composant squelette complet, plutot qu'un patch AST in-place fragile des gros
 * fichiers partages (schemas.ts 5k l, registry 3.4k l, presets 700 l). L'orchestrateur
 * (humain ou agent) colle les 4 snippets aux ancres documentees, puis le composant est
 * deja ecrit. Idempotent : re-run ecrase proprement les fichiers de sortie.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FORMAT BLUEPRINT (JSON, passe en argv[2] ; sinon EXAMPLE_BLUEPRINT inline) :
 * {
 *   "type": "pricing-tiers",            // SectionType kebab-case (NOUVEAU, unique)
 *   "archetype": "collection",          // 1 des 10 archetypes (collection|bento|split|
 *                                        //   process|editorial|table|band|hero|logos|gallery)
 *   "family": "pricing-sections",       // FamilyTag du registry (regroupement intra-categorie)
 *   "category": "marketing",            // SectionCategory (marketing|ecommerce|app-ui)
 *   "subcategory": "Pricing Sections",  // libelle humain de sous-categorie
 *   "categorySlug": "pricing-sections", // slug de categorie (CategorySlug)
 *   "title_fr": "...", "title_en": "...",
 *   "description_fr": "...", "description_en": "...",
 *   "tags": ["pricing","tiers"],        // tags marketplace
 *   "facets": {                          // facettes orthogonales (optionnel ; defauts sains)
 *     "effects": ["scroll-reveal"], "interactions": ["hover"],
 *     "elements": ["cards","list"], "layoutFacets": ["3-col"]
 *   },
 *   "capabilities": {                    // OPTIONNEL : override des defauts d'archetype
 *     "layouts": ["grid-uniform","grid-auto","list"]  // (merge shallow par cle)
 *   },
 *   "itemShape": [                       // forme d'un item de la collection (repeatable)
 *     { "field":"title",  "type":"text", "bilingual":true,  "required":true },
 *     { "field":"price",  "type":"text", "bilingual":false, "required":true },
 *     { "field":"feature","type":"text", "bilingual":true,  "required":false, "list":true }
 *   ],
 *   "demoItemCount": 6                   // nb d'items demo (defaut 6, assez pour les recettes)
 * }
 *
 * Champs itemShape supportes : type 'text' (string), 'bool' (boolean), 'num' (string num).
 *   bilingual:true -> emet field_fr + field_en ; list:true -> z.array(...).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SORTIES (dans tasks/scaffold-out/, + le composant dans src/components/sections/) :
 *   1. tasks/scaffold-out/<type>.schema.snippet.ts    -> bloc Zod (base + mixin + itemShape)
 *   2. tasks/scaffold-out/<type>.demo.snippet.ts       -> entree SECTION_DEMOS bilingue
 *   3. tasks/scaffold-out/<type>.presets.snippet.ts    -> matrice curee layouts x bg x density
 *   4. tasks/scaffold-out/<type>.registry.snippet.ts   -> entree SECTIONS (capabilities/facets)
 *   5. src/components/sections/<Pascal>.astro          -> composant SQUELETTE moteur (0 CSS layout)
 *   + tasks/scaffold-out/<type>.INSERT.md              -> instructions d'insertion (ancres)
 *
 * WORKFLOW D'INSERTION (documente dans le .INSERT.md genere) :
 *   a) coller (1) dans src/schemas/sections.ts AVANT la discriminatedUnion + ajouter le nom
 *      d'export a `z.discriminatedUnion('type', [ ... ])` ;
 *   b) coller (2) dans src/lib/section-demos.ts (objet SECTION_DEMOS) ;
 *   c) coller (3) dans src/lib/section-presets.ts (objet SECTION_PRESETS) ;
 *   d) coller (4) dans src/lib/section-registry.ts (import + entree SECTIONS) ;
 *   e) le composant (5) est deja ecrit ; affiner le contenu / le markup au besoin ;
 *   f) lancer `npm run check:completeness` -> le type doit passer les 5 couches.
 *
 * Contraintes : 0 dependance npm, deterministe, 0 U+2014 (rule 58), 0 token DS nouveau,
 * 0 CSS de layout inline dans le composant (il CONSOMME section-layouts.css).
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'tasks/scaffold-out');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');

/* Defauts de capacites par archetype (miroir leger de section-archetypes.ts → familyClass +
   layouts/regions/axes). On ne re-declare PAS le vocabulaire : on lit la source de verite. */
const ARCHETYPE_FAMILY_CLASS = {
  collection: 'sec-collection',
  bento: 'sec-bento',
  split: 'sec-split',
  process: 'sec-process',
  editorial: 'sec-editorial',
  table: 'sec-table',
  band: 'sec-band',
  hero: 'sec-hero',
  logos: 'sec-logos',
  gallery: 'sec-gallery',
};

/* ─── EXEMPLE inline (utilise si aucun blueprint passe en argv) ─── */
const EXAMPLE_BLUEPRINT = {
  type: 'pricing-tiers',
  archetype: 'collection',
  family: 'card-grid',
  category: 'marketing',
  subcategory: 'Pricing Sections',
  categorySlug: 'pricing-sections',
  title_fr: 'Nos formules',
  title_en: 'Our plans',
  description_fr: 'Grille de formules tarifaires en cartes : nom, prix, liste de bénéfices et CTA par formule.',
  description_en: 'Pricing tiers as a card grid: name, price, benefit list and CTA per plan.',
  tags: ['pricing', 'tiers', 'plans', 'grid'],
  facets: {
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['cards', 'list', 'buttons'],
    layoutFacets: ['3-col'],
  },
  itemShape: [
    { field: 'name', type: 'text', bilingual: true, required: true },
    { field: 'price', type: 'text', bilingual: false, required: true },
    { field: 'feature', type: 'text', bilingual: true, required: false, list: true },
    { field: 'featured', type: 'bool', bilingual: false, required: false },
  ],
  demoItemCount: 6,
};

/* ─── helpers casse ─── */
function toPascal(kebab) {
  return kebab.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
}
function toCamel(kebab) {
  const p = toPascal(kebab);
  return p[0].toLowerCase() + p.slice(1);
}
const NO_EMDASH = (s) => s.replace(/—/g, ' - ');

/* ─── (1) schema snippet ─── */
function buildSchema(bp) {
  const camel = toCamel(bp.type);
  const itemSchemaName = `${camel}ItemSchema`;
  const fields = [];
  for (const f of bp.itemShape ?? []) {
    const base =
      f.type === 'bool' ? 'z.boolean()' : f.type === 'num' ? 'z.string()' : 'z.string()';
    const wrap = (inner) => {
      let chain = inner;
      if (f.list) chain = `z.array(${chain})`;
      if (!f.required) chain += '.optional()';
      else if (f.type === 'bool') chain += '.default(false)';
      return chain;
    };
    if (f.bilingual) {
      fields.push(`    ${f.field}_fr: ${wrap(base)},`);
      fields.push(`    ${f.field}_en: ${wrap(base)},`);
    } else {
      fields.push(`    ${f.field}: ${wrap(base)},`);
    }
  }

  return `// >>> [scaffold:${bp.type}] schema : coller dans src/schemas/sections.ts
// Item repeatable de la collection.
const ${itemSchemaName} = z.object({
${fields.join('\n')}
});

export const ${camel}Schema = z.object({
  type: z.literal('${bp.type}'),
  // Mixin de variation UNIQUE (les 6 couches, toutes optionnelles → 0 régression).
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  items: z.array(${itemSchemaName}).min(1),
});
// Ajouter \`${camel}Schema\` à z.discriminatedUnion('type', [ ... ]) (sectionSchema).
// <<< [scaffold:${bp.type}] schema
`;
}

/* ─── (2) demo snippet ─── */
function buildDemo(bp) {
  const n = bp.demoItemCount ?? 6;
  const items = [];
  for (let i = 1; i <= n; i++) {
    const lines = [];
    for (const f of bp.itemShape ?? []) {
      if (f.type === 'bool') {
        lines.push(`        ${f.field}: ${i === 1 ? 'true' : 'false'},`);
      } else if (f.list) {
        const arr = (suffix) =>
          `['${cap(bp.type)} ${i} ${f.field} A${suffix}', '${cap(bp.type)} ${i} ${f.field} B${suffix}']`;
        if (f.bilingual) {
          lines.push(`        ${f.field}_fr: ${arr(' (fr)')},`);
          lines.push(`        ${f.field}_en: ${arr(' (en)')},`);
        } else {
          lines.push(`        ${f.field}: ${arr('')},`);
        }
      } else if (f.bilingual) {
        lines.push(`        ${f.field}_fr: 'Élément ${i} ${f.field} (fr)',`);
        lines.push(`        ${f.field}_en: 'Item ${i} ${f.field} (en)',`);
      } else {
        lines.push(`        ${f.field}: '${f.type === 'num' ? i * 10 : `v${i}`}',`);
      }
    }
    items.push(`      {\n${lines.join('\n')}\n      },`);
  }

  return `// >>> [scaffold:${bp.type}] demo : coller dans l'objet SECTION_DEMOS (src/lib/section-demos.ts)
  '${bp.type}': {
    type: '${bp.type}',
    kicker_fr: '${NO_EMDASH(bp.title_fr)}',
    kicker_en: '${NO_EMDASH(bp.title_en)}',
    title_fr: '${NO_EMDASH(bp.title_fr)}',
    title_en: '${NO_EMDASH(bp.title_en)}',
    lede_fr: '${NO_EMDASH(bp.description_fr)}',
    lede_en: '${NO_EMDASH(bp.description_en)}',
    items: [
${items.join('\n')}
    ],
  },
// <<< [scaffold:${bp.type}] demo
`;
}
function cap(s) {
  return toPascal(s);
}

/* ─── (3) presets snippet — matrice curee layouts x bg x density + placements cles ─── */
function buildPresets(bp) {
  const layouts =
    bp.capabilities?.layouts ?? defaultLayoutsFor(bp.archetype);
  const backgrounds = ['paper', 'paper-2', 'ink'];
  const densities = ['compact', 'ample'];
  const fam = bp.family ?? bp.archetype;

  const presets = [];
  const push = (idSuffix, label, props) => {
    presets.push(
      `    { id: '${bp.type}--${idSuffix}', type: '${bp.type}', label: '${NO_EMDASH(label)}', family: '${fam}', era: '2026', props: ${JSON.stringify(props).replace(/"/g, "'")} },`,
    );
  };

  // palette de base sur le layout par defaut (1er layout)
  const defaultLayout = layouts[0];
  for (const bg of backgrounds) {
    push(`${bg}`, `${bp.title_fr} · ${bg}`, { background: bg });
  }
  // 1 preset par layout NON-defaut (couvre capabilities.layouts → gate vert)
  for (const l of layouts.slice(1)) {
    push(`${l}`, `${bp.title_fr} · ${l}`, { layout: l, background: 'paper' });
    // 1 declinaison palette + 1 densite par layout pour vitriner les recettes
    push(`${l}-ink`, `${bp.title_fr} · ${l} · encre`, { layout: l, background: 'ink' });
  }
  // declinaisons densite sur le defaut
  for (const d of densities) {
    push(`${d}`, `${bp.title_fr} · ${d}`, { density: d });
  }
  // placement cle : en-tete centre (atomique)
  push('atomic-header-center', `${bp.title_fr} · en-tête centré (placement)`, {
    layout: defaultLayout,
    placement: { header: { align: 'center' } },
  });

  return `// >>> [scaffold:${bp.type}] presets : coller dans l'objet SECTION_PRESETS (src/lib/section-presets.ts)
  '${bp.type}': [
${presets.join('\n')}
  ],
// <<< [scaffold:${bp.type}] presets
`;
}

function defaultLayoutsFor(archetype) {
  // Sous-ensemble par defaut, miroir de ARCHETYPE_CAPABILITIES (1er = defaut).
  switch (archetype) {
    case 'collection':
      return ['grid-auto', 'grid-uniform', 'list', 'rows-divided'];
    case 'bento':
      return ['bento', 'grid-uniform', 'mosaic'];
    case 'split':
      return ['split', 'media-left', 'media-right'];
    case 'process':
      return ['vertical-stack', 'numbered-rows', 'horizontal', 'grid-steps'];
    case 'editorial':
      return ['prose', 'two-col', 'lead-aside'];
    case 'table':
      return ['rows-divided', 'list'];
    case 'band':
      return ['centered', 'split'];
    case 'hero':
      return ['centered', 'split', 'media-right'];
    case 'logos':
      return ['grid-auto', 'grid-uniform'];
    case 'gallery':
      return ['bento', 'grid-uniform', 'mosaic'];
    default:
      return ['grid-auto'];
  }
}

/* ─── (4) registry snippet ─── */
function buildRegistry(bp) {
  const pascal = toPascal(bp.type);
  const f = bp.facets ?? {};
  const arr = (a, fallback) =>
    JSON.stringify(a && a.length ? a : fallback).replace(/"/g, "'");
  const capOverride = bp.capabilities
    ? `\n    capabilities: ${JSON.stringify(bp.capabilities).replace(/"/g, "'")},`
    : '';

  return `// >>> [scaffold:${bp.type}] registry : coller dans src/lib/section-registry.ts
// 1) en haut du fichier, avec les autres imports :
import ${pascal} from '../components/sections/${pascal}.astro';
// 2) dans l'objet SECTIONS :
  '${bp.type}': {
    component: ${pascal},
    category: '${bp.category ?? 'marketing'}',
    subcategory: '${bp.subcategory ?? ''}',
    categorySlug: '${bp.categorySlug ?? ''}',
    family: '${bp.family ?? bp.archetype}',
    effects: ${arr(f.effects, ['scroll-reveal'])},
    interactions: ${arr(f.interactions, ['hover'])},
    elements: ${arr(f.elements, ['cards', 'list'])},
    layoutFacets: ${arr(f.layoutFacets, ['3-col'])},
    tags: ${arr(bp.tags, [bp.archetype])},
    status: 'stable',
    description_fr: '${NO_EMDASH(bp.description_fr)}',
    description_en: '${NO_EMDASH(bp.description_en)}',${capOverride}
  },
// Capacités EFFECTIVES = bundle de l'archétype '${bp.archetype}' (+ override ci-dessus si présent).
// <<< [scaffold:${bp.type}] registry
`;
}

/* ─── (5) composant squelette (consomme le moteur, 0 CSS layout inline) ─── */
function buildComponent(bp) {
  const pascal = toPascal(bp.type);
  const familyClass = ARCHETYPE_FAMILY_CLASS[bp.archetype] ?? 'sec-collection';
  // champs item pour le rendu
  const renderItem = (bp.itemShape ?? [])
    .filter((f) => f.type !== 'bool')
    .map((f) => {
      if (f.list) {
        const key = f.bilingual ? `(isFr ? item.${f.field}_fr : item.${f.field}_en)` : `item.${f.field}`;
        return `          <ul class="${bp.type}__list">{${key}?.map((v) => <li>{v}</li>)}</ul>`;
      }
      const key = f.bilingual ? `(isFr ? item.${f.field}_fr : item.${f.field}_en)` : `item.${f.field}`;
      return `          <p class="${bp.type}__${f.field}">{${key}}</p>`;
    })
    .join('\n');

  return `---
// ${pascal} : SQUELETTE généré (scaffold-section.mjs). ARCHÉTYPE : ${bp.archetype}.
// CONSOMME le moteur src/styles/section-layouts.css : classe de famille '${familyClass}'
// + .sec-grid / .sec-region / .sec-item + data-attrs depuis les props. 0 CSS de layout
// inline (le moteur porte la grille). Affiner contenu/markup au besoin. 0 token DS nouveau.
import type { SectionByType } from '../../schemas/sections';

interface Props {
  data: SectionByType<'${bp.type}'>;
  lang: 'fr' | 'en';
}
const { data, lang } = Astro.props;
const isFr = lang === 'fr';

// Résolution raccourci ↔ placement : UN data-attr par région (placement surcharge contentAlign).
const headerAlign = data.placement?.header?.align ?? data.contentAlign;
const actionsJustify = data.placement?.actions?.justify ?? data.actionsAlign;
---

<section
  class="${bp.type} ${familyClass}"
  data-bg={data.background}
  data-layout={data.layout}
  data-density={data.density}
  data-columns={data.columns}
  data-col-ratio={data.colRatio}
  data-item-height={data.itemHeight}
  data-surface={data.surface}
  data-divider={data.divider}
  data-radius={data.radius}
  data-accent-edge={data.accentEdge}
>
  <div class="wrap-wide">
    <header class="${bp.type}__hd sec-region" data-region="header" data-align={headerAlign}>
      {(isFr ? data.kicker_fr : data.kicker_en) && (
        <span class="${bp.type}__kicker">{isFr ? data.kicker_fr : data.kicker_en}</span>
      )}
      <h2 class="${bp.type}__title" set:html={isFr ? data.title_fr : data.title_en} />
      {(isFr ? data.lede_fr : data.lede_en) && (
        <p class="${bp.type}__lede" set:html={isFr ? data.lede_fr : data.lede_en} />
      )}
    </header>

    <div class="${bp.type}__grid sec-grid" data-region="body">
      {data.items.map((item) => (
        <article class="${bp.type}__item sec-item">
${renderItem || '          <!-- affiner le rendu de l\'item ici -->'}
        </article>
      ))}
    </div>

    <footer class="${bp.type}__actions sec-region" data-region="actions" data-justify={actionsJustify}>
      <!-- CTA optionnel(s) ici -->
    </footer>
  </div>
</section>

<style>
  /* SKIN UNIQUEMENT (couleurs/typo locales). AUCUNE recette de layout : grid-template-columns,
     gaps de grille, spans → portés par section-layouts.css via les data-attrs ci-dessus.
     0 token DS nouveau ; n'utiliser que des var(--token) existants. */
  .${bp.type}__kicker {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-small);
    letter-spacing: var(--tracking-mono);
    text-transform: uppercase;
    color: var(--accent-text);
    margin-bottom: var(--space-3);
  }
  .${bp.type}__title {
    font-family: var(--font-sans);
    font-size: var(--text-h2);
    line-height: var(--leading-h3);
    letter-spacing: var(--tracking-display);
    font-weight: var(--fw-medium);
    color: var(--ink);
    margin: 0;
  }
  .${bp.type}__lede {
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: var(--leading-body);
    color: var(--muted);
    margin: var(--space-5) 0 0;
    max-width: 680px;
  }
  .${bp.type}__item {
    padding: var(--space-7);
  }
  .${bp.type}[data-bg='paper-2'] { background: var(--paper-2); }
  .${bp.type}[data-bg='paper-3'] { background: var(--paper-3); }
  .${bp.type}[data-bg='ink'] { background: var(--ink); }
  .${bp.type}[data-bg='ink'] :is(.${bp.type}__title, h3) { color: var(--paper); }
  .${bp.type}[data-bg='ink'] :is(.${bp.type}__lede, p) { color: rgba(var(--paper-rgb), 0.72); }
</style>
`;
}

/* ─── INSERT.md (instructions d'insertion) ─── */
function buildInsertGuide(bp) {
  const pascal = toPascal(bp.type);
  return `# Insertion du type \`${bp.type}\` (scaffold-section.mjs)

Archétype : **${bp.archetype}** · famille : **${bp.family ?? bp.archetype}** · catégorie : **${bp.categorySlug ?? ''}**

Artefacts générés (idempotents) :
- \`${bp.type}.schema.snippet.ts\`
- \`${bp.type}.demo.snippet.ts\`
- \`${bp.type}.presets.snippet.ts\`
- \`${bp.type}.registry.snippet.ts\`
- \`../../src/components/sections/${pascal}.astro\` (déjà écrit)

Étapes (5 touchpoints, TOUS synchronisés sinon build cassé) :

1. **Schéma** : coller \`${bp.type}.schema.snippet.ts\` dans \`src/schemas/sections.ts\`
   (avant \`z.discriminatedUnion\`) puis ajouter \`${toCamel(bp.type)}Schema\` à la liste de
   la \`discriminatedUnion('type', [ ... ])\`.
2. **Demo** : coller \`${bp.type}.demo.snippet.ts\` dans l'objet \`SECTION_DEMOS\`
   (\`src/lib/section-demos.ts\`).
3. **Presets** : coller \`${bp.type}.presets.snippet.ts\` dans \`SECTION_PRESETS\`
   (\`src/lib/section-presets.ts\`).
4. **Registry** : dans \`src/lib/section-registry.ts\` : coller l'import en tête, puis
   l'entrée \`SECTIONS\` depuis \`${bp.type}.registry.snippet.ts\`.
5. **Composant** : \`${pascal}.astro\` est déjà écrit (squelette moteur). Affiner le markup
   du contenu si besoin (il consomme \`${ARCHETYPE_FAMILY_CLASS[bp.archetype] ?? 'sec-collection'}\`
   + \`.sec-grid\`/\`.sec-region\`/\`.sec-item\`, 0 CSS de layout inline).

Vérification : \`node scripts/check-section-completeness.mjs --all\` → \`${bp.type}\` doit
passer les 5 couches (composant · schéma · presets · facets · régions).
`;
}

/* ─── Main ─── */
function main() {
  const argPath = process.argv[2];
  let bp;
  if (argPath) {
    const p = resolve(process.cwd(), argPath);
    if (!existsSync(p)) {
      console.error(`ERREUR : blueprint introuvable -> ${p}`);
      process.exit(2);
    }
    bp = JSON.parse(readFileSync(p, 'utf8'));
  } else {
    bp = EXAMPLE_BLUEPRINT;
    console.log("Aucun blueprint passé en argv : utilisation de l'exemple inline (pricing-tiers).");
  }

  if (!bp.type || !bp.archetype) {
    console.error('ERREUR : le blueprint doit définir au minimum `type` et `archetype`.');
    process.exit(2);
  }
  if (!ARCHETYPE_FAMILY_CLASS[bp.archetype]) {
    console.error(`ERREUR : archétype inconnu '${bp.archetype}'. Valeurs : ${Object.keys(ARCHETYPE_FAMILY_CLASS).join(', ')}.`);
    process.exit(2);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const pascal = toPascal(bp.type);

  const artefacts = [
    [join(OUT_DIR, `${bp.type}.schema.snippet.ts`), buildSchema(bp)],
    [join(OUT_DIR, `${bp.type}.demo.snippet.ts`), buildDemo(bp)],
    [join(OUT_DIR, `${bp.type}.presets.snippet.ts`), buildPresets(bp)],
    [join(OUT_DIR, `${bp.type}.registry.snippet.ts`), buildRegistry(bp)],
    [join(OUT_DIR, `${bp.type}.INSERT.md`), buildInsertGuide(bp)],
    [join(SECTIONS_DIR, `${pascal}.astro`), buildComponent(bp)],
  ];

  // Verification anti-emdash (rule 58) avant ecriture
  for (const [, content] of artefacts) {
    if (content.includes('—')) {
      console.error('ERREUR : U+2014 détecté dans un artefact généré (rule 58). Abandon.');
      process.exit(3);
    }
  }

  // Ne pas ecraser un composant existant en silence (anti-collision) : on previent.
  const compPath = join(SECTIONS_DIR, `${pascal}.astro`);
  const compExisted = existsSync(compPath);

  for (const [path, content] of artefacts) {
    writeFileSync(path, content, 'utf8');
  }

  console.log(`\nscaffold-section — type '${bp.type}' (archétype ${bp.archetype})`);
  console.log('Artefacts générés (idempotent) :');
  for (const [path] of artefacts) {
    console.log('  ' + path.replace(ROOT + '/', ''));
  }
  if (compExisted) {
    console.log(`\n  ATTENTION : ${pascal}.astro existait déjà et a été RÉÉCRIT (squelette). Vérifier avant commit.`);
  }
  console.log(`\nWorkflow d'insertion : voir tasks/scaffold-out/${bp.type}.INSERT.md`);
  console.log("Puis : node scripts/check-section-completeness.mjs --all");
}

main();
