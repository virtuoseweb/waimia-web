#!/usr/bin/env node
/**
 * gen-section-usage.mjs
 * Waimia · Library app · usage RÉEL des sections du catalogue (FOSSÉ 1).
 *
 * Problème résolu : `SECTION_USAGE` (src/lib/library-manifest.ts) est hand-authored
 * (`consumers: string[]`) → l'usage affiché n'est pas le VRAI usage des pages, et il
 * n'expose aucun compteur d'instances. Ce script dérive l'usage réel en scannant
 * toutes les sources composables réelles du repo.
 *
 * Sources scannées (vérité « combien de fois une section est posée, et sur quelles pages ») :
 *   1. Fichiers de contenu composables `src/content/<collection>/**.json` portant un
 *      tableau `sections: [{ type, ... }]` (services, lp, cas-usages, audits, comparatifs,
 *      implantations, guides, diagnostics, demonstrations). Chaque entrée `sections[].type`
 *      = UNE instance ; le fichier → une page lisible (slug → route).
 *   2. Consommateurs hand-authored du manifest (`SECTION_USAGE[].consumers`) : couvre les
 *      pages `.astro` / templates qui composent leurs sections inline (objets TS non
 *      parsables statiquement de façon fiable). On les agrège pour ne PAS perdre ces
 *      références live (ex. home `src/pages/index.astro`, expertise-claude, templates).
 *
 * Sortie : src/lib/section-usage.generated.ts
 *   export const REAL_SECTION_USAGE: Record<string, { count: number; pages: string[] }>
 *   - count = nombre d'instances (occurrences JSON) + nombre de consommateurs hand-authored
 *             non déjà comptés par une page JSON (1 par page distincte).
 *   - pages = liste dédupliquée de chemins/slugs lisibles (routes publiques quand connues,
 *             sinon chemin de fichier source).
 *
 * Contraintes :
 *   - 0 dépendance npm (Node.js built-ins uniquement).
 *   - Déterministe, idempotent, alpha-trié, 0 timestamp.
 *   - 0 tiret cadratin U+2014 dans le contenu généré (rule 58).
 *   - ADDITIF : ne touche à aucune autre source ; la source de vérité reste CE SCRIPT
 *     (le fichier .generated.ts ne doit jamais être édité à la main).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content');
const MANIFEST_FILE = join(ROOT, 'src/lib/library-manifest.ts');
const OUTPUT_FILE = join(ROOT, 'src/lib/section-usage.generated.ts');

const collator = new Intl.Collator('fr');
const alpha = (a, b) => collator.compare(a, b);

// ─── Mapping collection → route publique ──────────────────────────────────────
// Une page composable de la collection <c> avec id <slug> est servie sur la route
// retournée par ROUTE_OF[c](slug). null = pas de route publique stable connue → on
// retombe sur le chemin de fichier source (toujours lisible).
const ROUTE_OF = {
  services: (slug) => `/services/${slug}`,
  lp: (slug) => `/lp/${slug}`,
  'cas-usages': (slug) => `/cas-usages/${slug}`,
  comparatifs: (slug) => `/ressources/comparatifs/${slug}`,
  guides: (slug) => `/ressources/guides/${slug}`,
  diagnostics: (slug) => `/ressources/diagnostics/${slug}`,
  implantations: (slug) => `/implantations/${slug}`,
  demonstrations: (slug) => `/demonstrations/${slug}`,
  // audits : route top-level dédiée par slug (src/pages/audit-*.astro), pas un dossier.
  audits: (slug) => `/${slug}`,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Liste récursive des fichiers d'un dossier (chemins absolus). */
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

/** Slug d'une entrée de collection = chemin relatif à la racine de la collection,
 *  sans extension (mirroir d'`entry.id` du loader glob Astro : `a/b.json` → `a/b`). */
function entrySlug(collectionRoot, filePath) {
  return relative(collectionRoot, filePath).replace(/\.(json|mdx)$/i, '');
}

/** Page lisible pour une entrée de collection (route publique sinon chemin source). */
// Entrées DÉPUBLIÉES (pivot IA 2026-10, miroir de src/data/depublished.ts) : contenu conservé
// mais plus de route publique (301) → chemin source, jamais un lien vers une URL redirigée.
const DEPUBLISHED = {
  services: new Set([
    'mvp-saas', 'cold-email-b2b', 'integration-crm', 'relance-devis', 'wordpress', 'webflow',
    'sur-mesure-headless', 'maintenance-growth', 'referencement-ia', 'seo-local',
    'landing-page-google-ads', 'publicite-en-ligne',
  ]),
  demonstrations: new Set(['integration-claude']),
};

function pageLabel(collection, slug, filePath) {
  const router = ROUTE_OF[collection];
  if (router && !DEPUBLISHED[collection]?.has(slug)) return router(slug);
  return relative(ROOT, filePath);
}

/** Extrait les `type` d'un tableau `sections` JSON (récursif sur sous-objets éventuels). */
function collectTypesFromSections(sections) {
  const types = [];
  if (!Array.isArray(sections)) return types;
  for (const s of sections) {
    if (s && typeof s === 'object' && typeof s.type === 'string') types.push(s.type);
  }
  return types;
}

// ─── 1. Scan des fichiers de contenu composables (JSON) ───────────────────────
// Accumulateur : type → Map<pageLabel, instanceCountSurCettePage>.
const usageByType = new Map();

function bump(type, page, n = 1) {
  let pages = usageByType.get(type);
  if (!pages) {
    pages = new Map();
    usageByType.set(type, pages);
  }
  pages.set(page, (pages.get(page) ?? 0) + n);
}

const jsonFiles = walk(CONTENT_DIR).filter((p) => p.endsWith('.json'));
for (const file of jsonFiles) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    continue; // fichier JSON non parsable → ignoré (pas une page composable valide)
  }
  if (!data || typeof data !== 'object' || !Array.isArray(data.sections)) continue;

  // collection = 1er segment du chemin relatif à src/content.
  const relFromContent = relative(CONTENT_DIR, file);
  const collection = relFromContent.split(/[\\/]/)[0];
  const collectionRoot = join(CONTENT_DIR, collection);
  // Un champ `slug` frontmatter PRIME sur le chemin fichier (comportement du glob
  // loader Astro : les enfants nested services/<parent>/<x>.json servent une route FLAT
  // /services/<x> — sans ça, 8 liens morts nested sur les fiches library, vu prod 19/07).
  const slug =
    typeof data.slug === 'string' && data.slug ? data.slug : entrySlug(collectionRoot, file);
  const page = pageLabel(collection, slug, file);

  for (const type of collectTypesFromSections(data.sections)) {
    bump(type, page, 1);
  }
}

// ─── 2. Consommateurs hand-authored du manifest (pages .astro / templates) ─────
// On parse statiquement le tableau `SECTION_USAGE` de library-manifest.ts : chaque
// entrée `{ id: '<type>', consumers: [...] }`. On ne capture QUE les littéraux de
// chaînes des consumers (les références à des constantes type SOLUTIONS_CONSUMERS
// sont résolues séparément si présentes). But : ne pas perdre les pages live qui
// composent leurs sections inline (non scannables en JSON).
function parseConstArray(source, name) {
  // const NAME = [ ... ];  → renvoie la liste de string-literals.
  const re = new RegExp(`const\\s+${name}\\s*(?::[^=]+)?=\\s*\\[`);
  const m = re.exec(source);
  if (!m) return [];
  const start = m.index + m[0].length - 1; // sur le '['
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

let manifestConsumersByType = new Map();
if (existsSync(MANIFEST_FILE)) {
  const src = readFileSync(MANIFEST_FILE, 'utf8');

  // Constantes de consumers partagées (ex. SOLUTIONS_CONSUMERS) → résolues par nom.
  const sharedConstNames = [...src.matchAll(/const\s+([A-Z][A-Z0-9_]+)\s*(?::[^=]+)?=\s*\[/g)].map(
    (x) => x[1],
  );
  const sharedConsts = new Map();
  for (const cname of sharedConstNames) sharedConsts.set(cname, parseConstArray(src, cname));

  // Isole le tableau SECTION_USAGE = [ ... ] et parse ses entrées { id: '...', consumers: ... }.
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
    // Chaque entrée : { id: '<type>', consumers: [...] | CONST }
    const entryRe = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*consumers:\s*([\s\S]*?)\}\s*,/g;
    for (const m of body.matchAll(entryRe)) {
      const id = m[1];
      const consumersRaw = m[2].trim();
      let consumers = [];
      if (consumersRaw.startsWith('[')) {
        consumers = [...consumersRaw.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
      } else {
        // Référence à une constante partagée (ex. SOLUTIONS_CONSUMERS).
        const refName = consumersRaw.replace(/[^A-Za-z0-9_].*$/s, '');
        consumers = sharedConsts.get(refName) ?? [];
      }
      if (consumers.length > 0) manifestConsumersByType.set(id, consumers);
    }
  }
}

// Fusionne les consommateurs hand-authored : 1 instance par page distincte non déjà
// comptée par une page JSON (évite le double comptage si un consumer est aussi une
// page JSON scannée ci-dessus). On normalise les chemins de fichier en label lisible.
for (const [type, consumers] of manifestConsumersByType) {
  for (const c of consumers) {
    // Un consumer peut être un slug de route (ex. 'secteurs/[...slug]') ou un chemin
    // de fichier (ex. 'src/pages/index.astro' / 'src/content/services/x.json').
    let page = c;
    if (c.startsWith('src/content/') && c.endsWith('.json')) {
      // Mappe le chemin JSON vers sa route publique (cohérent avec le scan JSON).
      const relFromContent = relative('src/content', c).replace(/^[\\/]/, '');
      const collection = relFromContent.split(/[\\/]/)[0];
      const slug = relFromContent.slice(collection.length + 1).replace(/\.json$/i, '');
      page = ROUTE_OF[collection] ? ROUTE_OF[collection](slug) : c;
    }
    // N'ajoute que si cette page n'a pas déjà été comptée pour ce type via le scan JSON.
    const existing = usageByType.get(type);
    if (!existing || !existing.has(page)) bump(type, page, 1);
  }
}

// ─── 3. Sérialise REAL_SECTION_USAGE ──────────────────────────────────────────
const result = {};
for (const [type, pagesMap] of [...usageByType.entries()].sort((a, b) => alpha(a[0], b[0]))) {
  let count = 0;
  for (const n of pagesMap.values()) count += n;
  const pages = [...pagesMap.keys()].sort(alpha);
  result[type] = { count, pages };
}

const HEADER = `// @generated par scripts/gen-section-usage.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:section-usage
//
// Usage RÉEL des sections du catalogue, dérivé des sources composables réelles :
//   - fichiers de contenu \`src/content/**/*.json\` portant \`sections: [{ type }]\`
//     (1 entrée = 1 instance) ;
//   - consommateurs hand-authored du manifest (pages .astro / templates inline).
// Par type : { count = nombre d'instances, pages = routes/chemins lisibles distincts }.
`;

const body = `export interface SectionUsageStat {
  /** Nombre total d'instances posées (occurrences dans les pages composables). */
  count: number;
  /** Pages distinctes (routes publiques quand connues, sinon chemin source) qui l'utilisent. */
  pages: string[];
}

export const REAL_SECTION_USAGE: Record<string, SectionUsageStat> = ${JSON.stringify(
  result,
  null,
  2,
)};

/** Stat d'usage réel d'un type ({ count: 0, pages: [] } si jamais posé). */
export function getRealUsage(type: string): SectionUsageStat {
  return REAL_SECTION_USAGE[type] ?? { count: 0, pages: [] };
}
`;

const out = `${HEADER}\n${body}`;

// Garde-fou rule 58 : aucun tiret cadratin U+2014 dans le contenu généré.
if (out.includes('—')) {
  console.error('FATAL : tiret cadratin U+2014 détecté dans la sortie générée (rule 58).');
  process.exit(2);
}

writeFileSync(OUTPUT_FILE, out, 'utf8');

const typeCount = Object.keys(result).length;
const totalInstances = Object.values(result).reduce((acc, s) => acc + s.count, 0);
console.log(
  `gen-section-usage : ${typeCount} types avec usage, ${totalInstances} instances → ${relative(
    ROOT,
    OUTPUT_FILE,
  )}`,
);
