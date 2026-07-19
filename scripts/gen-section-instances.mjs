#!/usr/bin/env node
/**
 * gen-section-instances.mjs
 * Waimia · Library app · INDEX D'INSTANCES des sections du catalogue (Bricks U1).
 *
 * Complément de `gen-section-usage.mjs` (FOSSÉ 1) : ce dernier donne, par type, un
 * compteur d'instances + la liste des pages. Ici on descend d'un cran : on émet, PAR
 * INSTANCE, sa localisation exacte (collection, fichier, route, position dans sections[]),
 * sa variante/preset/background si présents, et un LABEL reconnaissable (1er champ de titre).
 * But produit : depuis la library, retrouver « le composant global ET chacune de ses poses
 * sur le site » pour les localiser et bientôt les éditer.
 *
 * Sources scannées (mêmes que gen-section-usage, mais on garde le DÉTAIL par instance) :
 *   1. Fichiers de contenu composables `src/content/<collection>/**.json` portant un tableau
 *      `sections: [{ type, ... }]`. Chaque entrée = UNE instance ; on retient sa position.
 *   2. Consommateurs hand-authored du manifest (`SECTION_USAGE[].consumers`) NON scannables
 *      en JSON (pages `.astro`, templates, `.mdx`, patterns de route) : agrégés dans
 *      INLINE_CONSUMERS (affichés avec un badge « inline », non éditables par cette vue).
 *
 * Sortie : src/lib/section-instances.generated.ts
 *   export const SECTION_INSTANCES: Record<string, SectionInstance[]>
 *   export const INLINE_CONSUMERS: Record<string, string[]>
 *   export function getInstances(type): SectionInstance[]
 *   export function getInlineConsumers(type): string[]
 *
 * Contraintes (identiques à gen-section-usage) :
 *   - 0 dépendance npm (Node.js built-ins uniquement).
 *   - Déterministe, idempotent, alpha-trié, 0 timestamp.
 *   - 0 tiret cadratin U+2014 dans le contenu généré (rule 58).
 *   - ADDITIF : ne modifie NI gen-section-usage.mjs NI section-usage.generated.ts.
 *     La source de vérité reste CE SCRIPT (le .generated.ts ne s'édite jamais à la main).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content');
const MANIFEST_FILE = join(ROOT, 'src/lib/library-manifest.ts');
const OUTPUT_FILE = join(ROOT, 'src/lib/section-instances.generated.ts');

const collator = new Intl.Collator('fr');
const alpha = (a, b) => collator.compare(a, b);

// Mapping collection -> route publique (aligné sur gen-section-usage.mjs : ROUTE_OF).
// null implicite (collection absente) => on retombe sur le chemin de fichier source.
const ROUTE_OF = {
  services: (slug) => `/services/${slug}`,
  lp: (slug) => `/lp/${slug}`,
  'cas-usages': (slug) => `/cas-usages/${slug}`,
  comparatifs: (slug) => `/ressources/comparatifs/${slug}`,
  guides: (slug) => `/ressources/guides/${slug}`,
  diagnostics: (slug) => `/ressources/diagnostics/${slug}`,
  implantations: (slug) => `/implantations/${slug}`,
  demonstrations: (slug) => `/demonstrations/${slug}`,
  audits: (slug) => `/${slug}`,
};

// Champs de titre candidats pour un label reconnaissable (ordre de préférence).
// Superset de la liste minimale demandée (title_fr|heading_fr|h2_fr|kicker_fr|title|label) :
// on ajoute h1_fr/headline_fr en tête car les héros portent leur intitulé dans h1_fr.
const LABEL_FIELDS = [
  'title_fr',
  'h1_fr',
  'h2_fr',
  'heading_fr',
  'headline_fr',
  'kicker_fr',
  'title',
  'label',
  'name',
];

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

/** Slug d'entrée = chemin relatif à la racine de collection, sans extension (mirroir entry.id). */
function entrySlug(collectionRoot, filePath) {
  return relative(collectionRoot, filePath).replace(/\.(json|mdx)$/i, '');
}

/** Route publique d'une entrée (sinon chemin source relatif au repo, toujours lisible). */
function routeFor(collection, slug, filePath) {
  const router = ROUTE_OF[collection];
  if (router) return router(slug);
  return relative(ROOT, filePath);
}

/** Nettoie un label : retire les balises HTML inline (ex. <i class="acc">), le préfixe
 *  « § » décoratif des kickers et normalise les espaces. Le label reste du texte pur. */
function cleanLabel(raw) {
  return String(raw)
    .replace(/<[^>]*>/g, '')
    .replace(/^\s*§\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Premier champ de titre non vide d'une section, fallback `#<index>`. */
function labelFor(section, index) {
  for (const f of LABEL_FIELDS) {
    const v = section[f];
    if (typeof v === 'string' && v.trim()) return cleanLabel(v);
  }
  return `#${index}`;
}

// ─── 1. Scan des fichiers de contenu composables (JSON) → instances détaillées ──
// type -> tableau d'instances (ordre : route triée, puis position dans le fichier).
const instancesByType = new Map();

function pushInstance(type, instance) {
  let list = instancesByType.get(type);
  if (!list) {
    list = [];
    instancesByType.set(type, list);
  }
  list.push(instance);
}

const jsonFiles = walk(CONTENT_DIR).filter((p) => p.endsWith('.json'));
for (const file of jsonFiles) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    continue;
  }
  if (!data || typeof data !== 'object' || !Array.isArray(data.sections)) continue;

  const relFromContent = relative(CONTENT_DIR, file);
  const collection = relFromContent.split(/[\\/]/)[0];
  const collectionRoot = join(CONTENT_DIR, collection);
  const slug =
    typeof data.slug === 'string' && data.slug ? data.slug : entrySlug(collectionRoot, file);
  const route = routeFor(collection, slug, file);
  const relFile = relative(CONTENT_DIR, file); // chemin relatif à src/content/

  data.sections.forEach((section, index) => {
    if (!section || typeof section !== 'object' || typeof section.type !== 'string') return;
    const inst = {
      collection,
      file: relFile,
      slug,
      route,
      index,
      label: labelFor(section, index),
    };
    // Métadonnées de variante si présentes (chaînes uniquement).
    for (const k of ['preset', 'variant', 'background']) {
      if (typeof section[k] === 'string' && section[k]) inst[k] = section[k];
    }
    pushInstance(section.type, inst);
  });
}

// ─── 2. Consommateurs hand-authored NON scannables (pages .astro / templates / mdx) ──
// On parse SECTION_USAGE de library-manifest.ts (même logique que gen-section-usage) et on
// ne retient QUE les consumers non-JSON : ce sont les poses inline non éditables par la vue.
function parseConstArray(source, name) {
  const re = new RegExp(`const\\s+${name}\\s*(?::[^=]+)?=\\s*\\[`);
  const m = re.exec(source);
  if (!m) return [];
  const start = m.index + m[0].length - 1;
  let depth = 0;
  let end = -1;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) return [];
  const body = source.slice(start + 1, end);
  return [...body.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

const inlineByType = new Map();
if (existsSync(MANIFEST_FILE)) {
  const src = readFileSync(MANIFEST_FILE, 'utf8');

  const sharedConstNames = [...src.matchAll(/const\s+([A-Z][A-Z0-9_]+)\s*(?::[^=]+)?=\s*\[/g)].map(
    (x) => x[1],
  );
  const sharedConsts = new Map();
  for (const cname of sharedConstNames) sharedConsts.set(cname, parseConstArray(src, cname));

  const suMatch = /const\s+SECTION_USAGE\s*(?::[^=]+)?=\s*\[/.exec(src);
  if (suMatch) {
    const start = suMatch.index + suMatch[0].length - 1;
    let depth = 0;
    let end = -1;
    for (let i = start; i < src.length; i++) {
      const ch = src[i];
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const body = end > 0 ? src.slice(start + 1, end) : '';
    const entryRe = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*consumers:\s*([\s\S]*?)\}\s*,/g;
    for (const m of body.matchAll(entryRe)) {
      const id = m[1];
      const consumersRaw = m[2].trim();
      let consumers = [];
      if (consumersRaw.startsWith('[')) {
        consumers = [...consumersRaw.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
      } else {
        const refName = consumersRaw.replace(/[^A-Za-z0-9_].*$/s, '');
        consumers = sharedConsts.get(refName) ?? [];
      }
      // On ne garde que les consommateurs NON scannables en JSON (les .json de collection
      // sont déjà couverts, avec leur détail par instance, par le scan ci-dessus).
      const inline = consumers.filter((c) => !c.endsWith('.json'));
      if (inline.length > 0) {
        const set = inlineByType.get(id) ?? new Set();
        for (const c of inline) set.add(c);
        inlineByType.set(id, set);
      }
    }
  }
}

// ─── 3. Sérialisation déterministe ─────────────────────────────────────────────
// Instances triées par route puis position (lecture naturelle « page, section N »).
const sectionInstances = {};
for (const [type, list] of [...instancesByType.entries()].sort((a, b) => alpha(a[0], b[0]))) {
  list.sort((a, b) => alpha(a.route, b.route) || a.index - b.index);
  sectionInstances[type] = list;
}

const inlineConsumers = {};
for (const [type, set] of [...inlineByType.entries()].sort((a, b) => alpha(a[0], b[0]))) {
  inlineConsumers[type] = [...set].sort(alpha);
}

const HEADER = `// @generated par scripts/gen-section-instances.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:section-instances
//
// Index d'INSTANCES des sections du catalogue (Bricks U1) : par type, chaque pose sur le
// site avec sa localisation (collection, fichier, route, position dans sections[]), ses
// métadonnées de variante (preset/variant/background si présents) et un label reconnaissable.
//   - SECTION_INSTANCES : instances issues des pages composables \`src/content/**/*.json\`.
//   - INLINE_CONSUMERS  : consommateurs hand-authored non scannables (pages .astro / templates
//     / .mdx), affichés en « inline » (non éditables par la vue instances).
`;

const body = `export interface SectionInstance {
  /** Collection Astro (1er segment sous src/content/). */
  collection: string;
  /** Chemin du fichier source relatif à src/content/. */
  file: string;
  /** Slug de la page (frontmatter \`slug\` prioritaire, sinon chemin sans extension). */
  slug: string;
  /** Route publique quand connue (commence par '/'), sinon chemin source. */
  route: string;
  /** Position (0-based) de la section dans le tableau \`sections[]\` de la page. */
  index: number;
  /** Preset nommé si l'instance en porte un. */
  preset?: string;
  /** Variante si l'instance en porte une. */
  variant?: string;
  /** Fond (paper/paper-2/ink/...) si l'instance le précise. */
  background?: string;
  /** Libellé reconnaissable : 1er champ de titre non vide, fallback \`#<index>\`. */
  label: string;
}

export const SECTION_INSTANCES: Record<string, SectionInstance[]> = ${JSON.stringify(
  sectionInstances,
  null,
  2,
)};

export const INLINE_CONSUMERS: Record<string, string[]> = ${JSON.stringify(
  inlineConsumers,
  null,
  2,
)};

/** Instances réelles d'un type ([] si jamais posé en page composable). */
export function getInstances(type: string): SectionInstance[] {
  return SECTION_INSTANCES[type] ?? [];
}

/** Consommateurs inline hand-authored d'un type ([] si aucun). */
export function getInlineConsumers(type: string): string[] {
  return INLINE_CONSUMERS[type] ?? [];
}
`;

const out = `${HEADER}\n${body}`;

if (out.includes('—')) {
  console.error('FATAL : tiret cadratin U+2014 détecté dans la sortie générée (rule 58).');
  process.exit(2);
}

writeFileSync(OUTPUT_FILE, out, 'utf8');

const typeCount = Object.keys(sectionInstances).length;
const totalInstances = Object.values(sectionInstances).reduce((acc, l) => acc + l.length, 0);
const inlineCount = Object.keys(inlineConsumers).length;
console.log(
  `gen-section-instances : ${typeCount} types instanciés, ${totalInstances} instances, ` +
    `${inlineCount} types avec consommateurs inline → ${relative(ROOT, OUTPUT_FILE)}`,
);
