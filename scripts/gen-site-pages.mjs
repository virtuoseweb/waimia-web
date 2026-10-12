#!/usr/bin/env node
/**
 * gen-site-pages.mjs
 * Waimia · Builder · PIVOT PAR PAGE du site (socle de la vue « sitemap » du builder).
 *
 * Complément de `gen-section-instances.mjs` (pivot par TYPE : « pour un type, toutes ses
 * poses sur le site »). Ici on tourne le tableau de 90 degrés : « pour une PAGE réelle du
 * site, la liste ordonnée de ses sections ». C'est le socle d'un builder qui s'ouvre sur le
 * SITEMAP RÉEL (toutes les vraies pages, groupées et ordonnées, chaque page listant ses
 * sections dans l'ordre) plutôt que sur un catalogue de types abstraits.
 *
 * Sources scannées (mêmes fichiers que gen-section-instances, plus le routing statique) :
 *   1. Pages composables JSON : `src/content/<collection>/**.json` portant un tableau
 *      `sections: [{ type, ... }]`. Chaque fichier = UNE page ; ses sections sont éditables.
 *      → editable: true, sections complètes (type + label + preset/variant/background).
 *   2. Entrées de collection rendues par TEMPLATE (blog, cases, secteurs, outils, authors) :
 *      pas de `sections[]` de premier niveau (corps piloté par `body_sections`/gabarit).
 *      → editable: false, sections: [] (vue non section-composable), listées comme pages.
 *   3. Pages statiques bespoke `src/pages/**.astro` (accueil, hubs, agence, légal, conversion) :
 *      markup composé à la main / données TS (`src/data/*-sections.ts`) non introspectables
 *      proprement ici. → editable: false, sections: [], collection: 'bespoke'.
 *
 * IMPORTANT · route = `entry.id` (chemin relatif SANS extension), PAS `data.slug`. Les routes
 *   Astro `[...slug]` mappent `params.slug = entry.id` (services imbriqués + 1 cas où
 *   `data.slug` diverge du nom de fichier : services/site-web-ia/sur-mesure.json a
 *   slug=sur-mesure-headless mais est servi à /services/site-web-ia/sur-mesure). Utiliser
 *   `data.slug` (comme le fait le pivot par TYPE pour un label de localisation) produirait
 *   ici de FAUSSES routes. Ce générateur suit donc le routing réel.
 *
 * Sortie : src/lib/site-pages.generated.ts
 *   export const SITE_PAGES: SitePage[]
 *   export const SITE_GROUPS: Array<{ id; label_fr; routes: string[] }>  (ordre d'affichage)
 *   export function getPage(route): SitePage | undefined
 *
 * Contraintes (identiques au pivot par TYPE) :
 *   - 0 dépendance npm (Node.js built-ins uniquement).
 *   - Déterministe, idempotent, trié, 0 timestamp.
 *   - 0 tiret cadratin U+2014 dans le contenu généré (rule 58).
 *   - ADDITIF : ne modifie NI gen-section-instances.mjs NI aucun .generated.ts existant.
 *   - Helpers dupliqués localement (walk, cleanLabel, labelFor, LABEL_FIELDS) : le script
 *     gen-section-instances.mjs n'exporte rien (c'est un script d'exécution). Duplication
 *     minimale et documentée plutôt que de le refactoriser (hors scope, source de vérité figée).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content');
const PAGES_DIR = join(ROOT, 'src/pages');
const OUTPUT_FILE = join(ROOT, 'src/lib/site-pages.generated.ts');

const collator = new Intl.Collator('fr');
const alpha = (a, b) => collator.compare(a, b);

// ─── Groupes de sitemap · ordre d'affichage imposé (backbone) ───────────────────
// Toute collection/page sans slot imposé retombe dans 'autres' (documenté, honnête).
const GROUP_ORDER = [
  { id: 'accueil', label_fr: 'Accueil' },
  { id: 'offres', label_fr: 'Offres et services' },
  { id: 'landing', label_fr: 'Landing (/lp)' },
  { id: 'secteurs', label_fr: 'Secteurs' },
  { id: 'cas-clients', label_fr: 'Cas clients' },
  { id: 'cas-usages', label_fr: "Cas d'usage" },
  { id: 'ressources', label_fr: 'Ressources' },
  { id: 'blog', label_fr: 'Blog' },
  { id: 'confiance', label_fr: 'Confiance et agence' },
  { id: 'conversion', label_fr: 'Contact et conversion' },
  { id: 'autres', label_fr: 'Autres' },
];
const GROUP_INDEX = new Map(GROUP_ORDER.map((g, i) => [g.id, i]));

// ─── Collections → groupe + route + éditabilité de principe ──────────────────────
// route(id) : id = chemin relatif SANS extension (= entry.id Astro = params.slug).
// editable : true = page section-composable (`sections[]`) ; false = gabarit/prose
//   (blog/cases/secteurs/outils/authors : corps piloté par body_sections/template, la vue
//   sections n'édite pas ces pages). L'éditabilité EFFECTIVE = editable && a des `sections[]`.
const COLLECTIONS = {
  services: { group: 'offres', route: (id) => `/services/${id}`, editable: true },
  lp: { group: 'landing', route: (id) => `/lp/${id}`, editable: true },
  'cas-usages': { group: 'cas-usages', route: (id) => `/cas-usages/${id}`, editable: true },
  comparatifs: { group: 'ressources', route: (id) => `/ressources/comparatifs/${id}`, editable: true },
  guides: { group: 'ressources', route: (id) => `/ressources/guides/${id}`, editable: true },
  diagnostics: { group: 'ressources', route: (id) => `/ressources/diagnostics/${id}`, editable: true },
  demonstrations: { group: 'ressources', route: (id) => `/demonstrations/${id}`, editable: true },
  implantations: { group: 'autres', route: (id) => `/implantations/${id}`, editable: true },
  audits: { group: 'conversion', route: (id) => `/${id}`, editable: true },
  // Rendues par template/prose (pas de sections[] de 1er niveau) mais pages réelles.
  cases: { group: 'cas-clients', route: (id) => `/cas-clients/${id}`, editable: false },
  blog: { group: 'blog', route: (id) => `/blog/${id}`, editable: false },
  secteurs: { group: 'secteurs', route: (id) => `/secteurs/${id}`, editable: false },
  outils: { group: 'ressources', route: (id) => `/ressources/outils/${id}`, editable: false },
  authors: { group: 'confiance', route: (id) => `/equipe/${id}`, editable: false },
};

// Entrées non-livrables (gabarits internes exclus du routing réel, cf getStaticPaths).
// services/template-service-ref : filtré par src/pages/services/[...slug].astro (301 → /services).
// Pivot IA 2026-10 : entrées dépubliées par fusion (301 dans astro.config.mjs, miroir de
// src/data/depublished.ts ; ids = chemins relatifs des fichiers, cf note « route = entry.id »).
const EXCLUDED_ENTRY_IDS = new Set([
  'template-service-ref',
  'crm-scoring-routing/integration-crm',
  'sequences-de-suivi/relance-devis',
  'maintenance-growth',
  'landing-pages-tunnels/landing-page-google-ads',
  'publicite-en-ligne',
  'score-maturite-ia',
]);

// Collections SANS route publique de détail (backing de pages statiques ou POC) → ignorées
// ici ; leurs pages réelles sont les .astro statiques (legal → cgv/mentions/... ) ou aucune.
const IGNORED_COLLECTIONS = new Set([
  'legal', // back les pages statiques cgv/mentions-legales/politique/sources/bienvenue
  'dashboard-seo', // POC git-based, pas de route générée
  'ecole', // vide
  'pages-locales', // vide
]);

// Champs de titre candidats (superset, ordre de préférence) — repris du pivot par TYPE +
// title (legal), card.title_fr (listing cas), role_fr n'est pas un titre de page.
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

/** Nettoie un label : retire les balises HTML inline, le préfixe « § » décoratif, normalise. */
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

/** Titre lisible d'une page : 1er champ de titre non vide (frontmatter), sinon humanisé. */
function pageTitle(data, id) {
  for (const f of LABEL_FIELDS) {
    const v = data[f];
    if (typeof v === 'string' && v.trim()) return cleanLabel(v);
  }
  if (data && data.card && typeof data.card.title_fr === 'string' && data.card.title_fr.trim()) {
    return cleanLabel(data.card.title_fr);
  }
  return humanize(id.split('/').pop() || id);
}

/** Humanise un slug : « site-web-ia » → « Site web ia ». Déterministe, 0 dictionnaire hardcodé. */
function humanize(slug) {
  const s = String(slug).replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** entry.id Astro = chemin relatif à la racine de collection, sans extension. */
function entryId(collectionRoot, filePath) {
  return relative(collectionRoot, filePath).replace(/\.(json|mdx|md)$/i, '');
}

/** Sections ordonnées d'une page composable (type + label + variante). */
function extractSections(data) {
  if (!Array.isArray(data.sections)) return [];
  const out = [];
  data.sections.forEach((section, index) => {
    if (!section || typeof section !== 'object' || typeof section.type !== 'string') return;
    const s = { type: section.type, label: labelFor(section, index) };
    for (const k of ['preset', 'variant', 'background']) {
      if (typeof section[k] === 'string' && section[k]) s[k] = section[k];
    }
    out.push(s);
  });
  return out;
}

// ─── 1+2. Scan des collections de contenu (JSON + MDX) → pages ───────────────────
const pagesByRoute = new Map();

function addPage(page) {
  if (!pagesByRoute.has(page.route)) pagesByRoute.set(page.route, page);
}

for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
  const collectionRoot = join(CONTENT_DIR, collection);
  if (!existsSync(collectionRoot)) continue;
  const files = walk(collectionRoot).filter((p) => /\.(json|mdx|md)$/i.test(p));
  for (const file of files) {
    const id = entryId(collectionRoot, file);
    if (EXCLUDED_ENTRY_IDS.has(id)) continue;
    let data;
    try {
      data = JSON.parse(readFileSync(file, 'utf8'));
    } catch {
      // MDX/md ou JSON illisible : on garde la page (route/titre humanisé) sans sections.
      data = {};
    }
    const sections = extractSections(data);
    const hasSections = sections.length > 0;
    addPage({
      route: cfg.route(id),
      title: pageTitle(data, id),
      group: cfg.group,
      collection,
      file: relative(CONTENT_DIR, file),
      editable: Boolean(cfg.editable && hasSections),
      sections,
    });
  }
}

// ─── 3. Pages statiques bespoke `src/pages/**.astro` ─────────────────────────────
// Route dérivée du chemin de fichier. On EXCLUT : dynamiques ([param]/[...slug]), api/,
// preview*/library/ (surfaces techniques), 404, et les endpoints non-.astro (.ts/.xml).
const STATIC_EXCLUDE_PREFIX = ['api/', 'preview/', 'preview-swi/', 'preview-v/', 'library/'];

function staticRouteFor(relPath) {
  // relPath ex. 'agence/index.astro' | 'manifesto.astro' | 'index.astro'
  let p = relPath.replace(/\.astro$/, '');
  p = p.replace(/\/index$/, ''); // agence/index → agence
  if (p === 'index') return '/';
  return `/${p}`;
}

function groupForStaticRoute(route) {
  if (route === '/') return 'accueil';
  if (route === '/services' || route.startsWith('/services/')) return 'offres';
  if (route === '/lp' || route.startsWith('/lp/')) return 'landing';
  if (route === '/secteurs' || route.startsWith('/secteurs/')) return 'secteurs';
  if (route === '/cas-clients' || route.startsWith('/cas-clients/')) return 'cas-clients';
  if (route === '/cas-usages' || route.startsWith('/cas-usages/')) return 'cas-usages';
  if (route === '/blog' || route.startsWith('/blog/')) return 'blog';
  if (route === '/ressources' || route.startsWith('/ressources/')) return 'ressources';
  if (
    route === '/equipe' ||
    route.startsWith('/agence') ||
    route === '/manifesto' ||
    route === '/technologies' ||
    route === '/expertise-claude'
  ) {
    return 'confiance';
  }
  if (route === '/contact' || route === '/tarifs' || route.startsWith('/bienvenue')) return 'conversion';
  return 'autres';
}

const astroFiles = walk(PAGES_DIR).filter((p) => p.endsWith('.astro'));
for (const file of astroFiles) {
  const rel = relative(PAGES_DIR, file);
  if (STATIC_EXCLUDE_PREFIX.some((pre) => rel.startsWith(pre))) continue;
  if (rel.includes('[')) continue; // routes dynamiques : couvertes par le scan collections
  if (basename(rel) === '404.astro') continue;
  const route = staticRouteFor(rel);
  // Dédup : une route déjà produite par une collection (ex. /audit-ia-pme via `audits`)
  // garde sa version composable (editable + sections). On ne l'écrase pas par le bespoke.
  if (pagesByRoute.has(route)) continue;
  addPage({
    route,
    title: humanize(route === '/' ? 'accueil' : route.split('/').pop()),
    group: groupForStaticRoute(route),
    collection: 'bespoke',
    file: undefined,
    editable: false,
    sections: [],
  });
}

// ─── 4. Sérialisation déterministe ───────────────────────────────────────────────
// Tri global : par groupe (ordre imposé) puis par route (collator). Diff stable.
const allPages = [...pagesByRoute.values()].sort(
  (a, b) => (GROUP_INDEX.get(a.group) ?? 999) - (GROUP_INDEX.get(b.group) ?? 999) || alpha(a.route, b.route),
);

// SITE_GROUPS : uniquement les groupes non vides, dans l'ordre imposé, routes triées.
const routesByGroup = new Map();
for (const p of allPages) {
  if (!routesByGroup.has(p.group)) routesByGroup.set(p.group, []);
  routesByGroup.get(p.group).push(p.route);
}
const siteGroups = GROUP_ORDER.filter((g) => routesByGroup.has(g.id)).map((g) => ({
  id: g.id,
  label_fr: g.label_fr,
  routes: routesByGroup.get(g.id).slice().sort(alpha),
}));

// Objets de page : ordre de clés stable, `file` omis si absent (pages bespoke).
function serializePage(p) {
  const o = { route: p.route, title: p.title, group: p.group, collection: p.collection };
  if (p.file) o.file = p.file;
  o.editable = p.editable;
  o.sections = p.sections;
  return o;
}

const HEADER = `// @generated par scripts/gen-site-pages.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:site-pages
//
// PIVOT PAR PAGE du site (socle de la vue « sitemap » du builder) : toutes les vraies
// pages, groupées (SITE_GROUPS, ordre d'affichage) et ordonnées, chaque page listant ses
// sections dans l'ordre.
//   - editable: true  → page section-composable (\`sections[]\` JSON, éditable par le builder).
//   - editable: false → page rendue par template/prose (blog, cas, secteurs, outils, auteurs)
//                        ou page statique bespoke (accueil, hubs, agence, légal, conversion).
`;

const body = `export interface SitePageSection {
  /** Type de section (clé du catalogue / registry). */
  type: string;
  /** Libellé reconnaissable : 1er champ de titre non vide, fallback \`#<index>\`. */
  label: string;
  /** Preset nommé si la section en porte un. */
  preset?: string;
  /** Variante si la section en porte une. */
  variant?: string;
  /** Fond (paper/paper-2/ink/...) si la section le précise. */
  background?: string;
}

export interface SitePage {
  /** Route publique réelle (commence par '/'). */
  route: string;
  /** Titre lisible (frontmatter title | humanisé du slug pour les pages bespoke). */
  title: string;
  /** Groupe de sitemap (id d'un SITE_GROUPS). */
  group: string;
  /** Collection Astro d'origine, ou 'bespoke' pour une page statique .astro. */
  collection: string;
  /** Chemin du fichier source relatif à src/content/ (pages issues d'une collection). */
  file?: string;
  /** true = sections[] JSON éditables ; false = page template/prose/bespoke. */
  editable: boolean;
  /** Sections dans l'ordre (vides pour les pages non section-composables). */
  sections: SitePageSection[];
}

export const SITE_PAGES: SitePage[] = ${JSON.stringify(allPages.map(serializePage), null, 2)};

export const SITE_GROUPS: Array<{ id: string; label_fr: string; routes: string[] }> = ${JSON.stringify(
  siteGroups,
  null,
  2,
)};

/** Page réelle par route (undefined si inconnue). */
export function getPage(route: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.route === route);
}
`;

const out = `${HEADER}\n${body}`;

if (out.includes('—')) {
  console.error('FATAL : tiret cadratin U+2014 détecté dans la sortie générée (rule 58).');
  process.exit(2);
}

writeFileSync(OUTPUT_FILE, out, 'utf8');

// ─── Mesures (stdout) ────────────────────────────────────────────────────────────
const total = allPages.length;
const editable = allPages.filter((p) => p.editable).length;
const bespokeOrTemplate = total - editable;
const byGroup = siteGroups.map((g) => `${g.id}=${g.routes.length}`).join(' · ');
console.log(
  `gen-site-pages : ${total} pages (${editable} éditables composables / ${bespokeOrTemplate} template+bespoke) ` +
    `→ ${relative(ROOT, OUTPUT_FILE)}\n  groupes : ${byGroup}`,
);
