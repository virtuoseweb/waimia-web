// Waimia · Catalogue tools (logique metier PARTAGEE, in-process).
//
// SOURCE DE VERITE UNIQUE (rule 59) de la LOGIQUE des tools du catalogue Design System Waimia.
// Deux consommateurs importent ces MEMES fonctions, jamais un second process :
//   1. mcp/waimia-catalogue-server.mjs  -> les enveloppe dans registerTool (contrat MCP stdio).
//   2. packages/apps-atelier/src/lib/chat/tools.ts -> les dispatch depuis la boucle agentique du
//      chat-IA in-app (Φ3 builder). L'IA decide quels tools appeler ; le dispatch execute CES
//      fonctions directement (pas un sous-process MCP), cf docs/audits/09-chat-mcp-cadrage.md.
//
// Contrat des fonctions `run*` :
//   - succes -> retourne le PAYLOAD brut (l'objet que le serveur MCP serialisait en textResult).
//   - echec metier (type inconnu, doc invalide, tokens.css absent, site injoignable) -> `throw new
//     ToolError(message)` (le serveur MCP le mappe en errorResult ; le chat le mappe en resultat de
//     tool lisible pour l'IA). AUCUN 500 silencieux : chaque cause produit un message explicite.
//   - artefacts dist absents -> `throw new ArtifactMissingError(message)` (message « build d'abord »).
//
// Source de donnees (identique au serveur) = artefacts prerendered de dist/ + tokens.css. Ce module
// n'importe PAS astro:content : il lit le JSON deja genere, donc runnable en Node pur ET bundlable
// dans une Vercel Function SSR. 0 nouveau token DS, 0 valeur en dur metier.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Resolution de la racine repo ───
// Ce module vit dans mcp/ ; la racine du repo est le dossier parent. Un override explicite
// (WAIMIA_REPO_ROOT) permet aux consommateurs bundles (Vercel Function) de pointer la racine reelle
// si import.meta.url ne resout plus vers mcp/ apres bundling.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = process.env.WAIMIA_REPO_ROOT
  ? path.resolve(process.env.WAIMIA_REPO_ROOT)
  : path.resolve(SCRIPT_DIR, '..');

// Astro + adaptateur @astrojs/vercel emet le client prerendere sous dist/client/.
const MANIFEST_PATH = path.join(REPO_ROOT, 'dist', 'client', 'library', 'manifest.json');
const SECTION_DIR = path.join(REPO_ROOT, 'dist', 'client', 'library', 'section');
const TOKENS_PATH = path.join(REPO_ROOT, 'packages', 'ds-tokens', 'tokens.css');
// Brouillons du builder : MEME dossier que POST /api/ds/compose (dev-only, ds-save-dev.mjs
// PAGE_VARIANTS_DIR) -- 1 fichier a plat <slug>.json par brouillon.
const PAGE_VARIANTS_DIR = path.join(REPO_ROOT, 'src', 'data', 'page-variants');

const MAX_SEARCH_LIMIT = 199;
const DEFAULT_SEARCH_LIMIT = 30;
const DRAFT_SLUG_MAX_LENGTH = 64;
const DRAFT_SLUG_PATTERN = /^[a-z0-9-]+$/;

// Miroir de l'enum PAGE_COLLECTIONS de src/schemas/page-document.ts (source de verite cote app).
// On NE peut PAS importer ce schema ici car page-document.ts tire astro:content (serveur-only,
// non runnable en Node pur) ; cette liste est donc un miroir documente d'un enum, pas une valeur DS.
export const PAGE_COLLECTIONS = [
  'cases',
  'offres',
  'blog',
  'secteurs',
  'outils',
  'authors',
  'courses',
  'services',
  'lp',
  'cas-usages',
  'demonstrations',
  'implantations',
  'guides',
  'diagnostics',
  'comparatifs',
  'audits',
  'pages-locales',
];

// ─── Erreurs typees ───

/** Erreur typee : artefact dist absent (le site n'a pas ete builde). */
export class ArtifactMissingError extends Error {}

/** Erreur metier attendue (type inconnu, doc invalide, tokens absent, site injoignable). */
export class ToolError extends Error {}

// ─── Helpers de chargement (memoise les artefacts qui ne changent pas a runtime) ───

let cachedIndex = null;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

/**
 * Charge le tier-1 (index compact). Memoise apres le premier succes.
 * Jette ArtifactMissingError si dist/library/manifest.json est absent (pas de fallback silencieux).
 */
export function loadIndex() {
  if (cachedIndex) return cachedIndex;
  try {
    cachedIndex = readJson(MANIFEST_PATH);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new ArtifactMissingError(
        `manifest introuvable (${MANIFEST_PATH}) : lance "pnpm build" d'abord pour generer dist/library/.`,
      );
    }
    throw err;
  }
  return cachedIndex;
}

/**
 * Charge le tier-2 (detail d'un type). Jette ArtifactMissingError si le manifest global est absent,
 * renvoie null si le type est inconnu (fichier section/<type>.json absent).
 */
export function loadSectionDetail(type) {
  loadIndex();
  const filePath = path.join(SECTION_DIR, `${type}.json`);
  try {
    return readJson(filePath);
  } catch (err) {
    if (err && err.code === 'ENOENT') return null;
    throw err;
  }
}

/**
 * Parse les variables CSS du Design System depuis packages/ds-tokens/tokens.css.
 * Ne retient que les declarations sous des selecteurs :root ; exclut le bloc @theme.
 * Dedupe par nom (premiere occurrence = valeur de base canonique).
 */
export function loadTokens() {
  const css = readFileSync(TOKENS_PATH, 'utf8');
  const tokens = [];
  const seen = new Set();
  let inTheme = false;
  let themeDepth = 0;

  for (const line of css.split('\n')) {
    if (!inTheme && /^\s*@theme\b/.test(line)) {
      inTheme = true;
      themeDepth = 0;
    }
    if (inTheme) {
      themeDepth += (line.match(/\{/g) || []).length;
      themeDepth -= (line.match(/\}/g) || []).length;
      if (themeDepth <= 0 && line.includes('}')) inTheme = false;
      continue;
    }
    const match = line.match(/^\s*(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/);
    if (match) {
      const name = match[1];
      if (!seen.has(name)) {
        seen.add(name);
        tokens.push({ name, value: match[2].trim() });
      }
    }
  }
  return tokens;
}

// ─── Utilitaires ───

const lc = (value) => String(value).toLowerCase();

/** Match une valeur scalaire ou un tableau contre une valeur cible (insensible casse). */
function entryMatches(field, wanted) {
  if (field === undefined || field === null) return false;
  const target = lc(wanted);
  if (Array.isArray(field)) return field.some((v) => lc(v) === target);
  return lc(field) === target;
}

// Vrai si une valeur de slot est consideree comme remplie.
function isFilled(v) {
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return v !== undefined && v !== null;
}

/** Suggestions de types proches (prefixe / inclusion) pour aider l'agent quand un type est inconnu. */
function suggestTypes(type) {
  try {
    const index = loadIndex();
    const needle = lc(type);
    return index.sections
      .map((e) => e.type)
      .filter((t) => lc(t).includes(needle) || needle.includes(lc(t)) || lc(t).startsWith(needle.slice(0, 4)))
      .slice(0, 5);
  } catch {
    return [];
  }
}

/**
 * Assainit + valide un slug de brouillon (kebab-case strict, anti path-traversal, longueur bornee).
 * @param {unknown} rawSlug
 * @returns {{ok:true,slug:string}|{ok:false,error:string}}
 */
function validateDraftSlug(rawSlug) {
  const slug = typeof rawSlug === 'string' ? rawSlug.trim() : '';
  if (!slug) return { ok: false, error: 'slug manquant' };
  if (/[\\/]|\.\.|\0/.test(slug)) {
    return { ok: false, error: 'slug invalide (path traversal refuse)' };
  }
  if (slug.length > DRAFT_SLUG_MAX_LENGTH) {
    return { ok: false, error: `slug trop long (max ${DRAFT_SLUG_MAX_LENGTH} caracteres)` };
  }
  if (!DRAFT_SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      error: 'slug invalide (kebab-case attendu : minuscules, chiffres, tirets simples, ex. hero-test-1)',
    };
  }
  return { ok: true, slug };
}

/**
 * Validation STRUCTURELLE stricte d'un PageDocument (meta.collection connue, meta.slug kebab-case,
 * slots de contenu requis par type via le contrat tier-2). GAP CONNU : on NE PEUT PAS importer
 * validatePageDoc (sa chaine tire astro:content, serveur-only) -- seule la PRESENCE des slots requis
 * est verifiee, pas leur type de valeur exact.
 * @param {unknown} doc
 * @returns {{errors:Array<{index:number,type:string,field:string,message:string}>,warnings:Array<{index:number,type:string,field:string,message:string}>}}
 */
function validateDraftDocument(doc) {
  const errors = [];
  const warnings = [];

  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
    errors.push({ index: -1, type: '', field: '', message: 'doc doit etre un objet' });
    return { errors, warnings };
  }

  if (doc.$schema !== 'waimia.page-document/v1') {
    errors.push({ index: -1, type: '', field: '$schema', message: 'schema invalide (attendu "waimia.page-document/v1")' });
  }

  const meta = doc.meta && typeof doc.meta === 'object' && !Array.isArray(doc.meta) ? doc.meta : {};
  if (meta.collection === undefined) {
    errors.push({ index: -1, type: '', field: 'meta.collection', message: 'collection requise' });
  } else if (!PAGE_COLLECTIONS.includes(meta.collection)) {
    errors.push({ index: -1, type: '', field: 'meta.collection', message: `collection inconnue: ${meta.collection}` });
  }
  if (meta.slug === undefined) {
    errors.push({ index: -1, type: '', field: 'meta.slug', message: 'slug requis' });
  } else if (!/^[a-z0-9/-]+$/.test(meta.slug)) {
    errors.push({ index: -1, type: '', field: 'meta.slug', message: 'slug invalide (kebab-case)' });
  }

  const sections = Array.isArray(doc.sections) ? doc.sections : null;
  if (sections === null) {
    errors.push({ index: -1, type: '', field: 'sections', message: 'sections doit etre un tableau' });
    return { errors, warnings };
  }
  if (sections.length === 0) {
    errors.push({ index: -1, type: '', field: 'sections', message: 'sections ne doit pas etre vide' });
  }

  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    if (!section || typeof section !== 'object' || Array.isArray(section)) {
      errors.push({ index, type: '', field: '', message: 'section doit etre un objet' });
      continue;
    }
    const type = section.type;
    if (typeof type !== 'string' || !type) {
      errors.push({ index, type: '', field: 'type', message: 'type manquant' });
      continue;
    }

    const detail = loadSectionDetail(type);
    if (detail === null) {
      errors.push({ index, type, field: 'type', message: 'type inconnu' });
      continue;
    }

    const slots = detail.slots || [];
    for (const slot of slots) {
      if (slot.kind !== 'content' || !slot.required) continue;
      if (slot.bilingual) {
        const ok = isFilled(section[`${slot.field}_fr`]) && isFilled(section[`${slot.field}_en`]);
        if (!ok) {
          errors.push({ index, type, field: `${slot.field}_fr`, message: 'slot de contenu requis manquant ou vide' });
        }
      } else if (!isFilled(section[slot.field])) {
        errors.push({ index, type, field: slot.field, message: 'slot de contenu requis manquant ou vide' });
      }
    }

    const known = new Set(['type']);
    for (const slot of slots) {
      known.add(slot.field);
      known.add(`${slot.field}_fr`);
      known.add(`${slot.field}_en`);
    }
    for (const key of Object.keys(section)) {
      if (!known.has(key)) warnings.push({ index, type, field: key, message: 'champ inconnu pour ce type' });
    }
  }

  return { errors, warnings };
}

/** Formate une liste d'erreurs PageDocError en un message lisible. */
function formatDraftErrors(errors) {
  return errors
    .map((e) => {
      const where = e.index >= 0 ? `section #${e.index}${e.type ? ` (${e.type})` : ''}` : 'document';
      const field = e.field ? ` · champ « ${e.field} »` : '';
      return `${where}${field} : ${e.message}`;
    })
    .join(' | ');
}

// ─── Fonctions run* (logique metier de chaque tool) ───

/** catalogue_search : filtre l'index compact tier-1. */
export function runCatalogueSearch(args = {}) {
  const index = loadIndex();
  const { query, intent, pageRole, contentMode, category, family, status, usage } = args;
  const q = query ? lc(query) : null;

  const results = index.sections.filter((entry) => {
    if (q) {
      const haystack = [entry.type, entry.label, ...(entry.tags || [])].map(lc);
      if (!haystack.some((h) => h.includes(q))) return false;
    }
    if (intent !== undefined && !entryMatches(entry.intent, intent)) return false;
    if (pageRole !== undefined && !entryMatches(entry.pageRole, pageRole)) return false;
    if (contentMode !== undefined && !entryMatches(entry.contentMode, contentMode)) return false;
    if (category !== undefined && !entryMatches(entry.categorySlug, category) && !entryMatches(entry.domain, category)) return false;
    if (family !== undefined && !entryMatches(entry.family, family)) return false;
    if (status !== undefined && !entryMatches(entry.status, status)) return false;
    if (usage !== undefined && !entryMatches(entry.usage, usage)) return false;
    return true;
  });

  const limit = Math.min(args.limit ?? DEFAULT_SEARCH_LIMIT, MAX_SEARCH_LIMIT);
  const sliced = results.slice(0, limit);

  return {
    total: results.length,
    returned: sliced.length,
    facets: index.facets,
    results: sliced,
  };
}

/** catalogue_get_section : detail tier-2 (contrat de slots). */
export function runCatalogueGetSection({ type } = {}) {
  const detail = loadSectionDetail(type);
  if (detail) return detail;
  const suggestions = suggestTypes(type);
  const hint = suggestions.length ? ` Types proches : ${suggestions.join(', ')}.` : '';
  throw new ToolError(`type inconnu : ${type}.${hint}`);
}

/** catalogue_get_preset : liste ou resout les presets (declinaisons) d'un type. */
export function runCatalogueGetPreset({ type, presetId } = {}) {
  const detail = loadSectionDetail(type);
  if (detail === null) {
    const suggestions = suggestTypes(type);
    const hint = suggestions.length ? ` Types proches : ${suggestions.join(', ')}.` : '';
    throw new ToolError(`type inconnu : ${type}.${hint}`);
  }

  const presets = detail.presets || [];

  if (presetId === undefined) {
    return { type, presetCount: presets.length, presets };
  }

  const preset = presets.find((p) => p.id === presetId);
  if (!preset) {
    const known = presets.map((p) => p.id);
    throw new ToolError(
      `presetId inconnu pour ${type} : ${presetId}. Presets disponibles : ${known.length ? known.join(', ') : '(aucun preset pour ce type)'}.`,
    );
  }
  return { type, preset };
}

/** ds_tokens : liste les variables CSS du Design System, filtrables par prefixe. */
export function runDsTokens({ prefix, group } = {}) {
  const filter = prefix ?? group;
  let tokens;
  try {
    tokens = loadTokens();
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new ToolError(`tokens.css introuvable (${TOKENS_PATH}).`);
    }
    throw err;
  }
  const filtered = filter ? tokens.filter((t) => t.name.startsWith(filter)) : tokens;
  return { count: filtered.length, tokens: filtered };
}

/** page_compose : assemble + valide une liste de sections en un PageDocument type. */
export function runPageCompose({ sections, meta } = {}) {
  const pageMeta = {
    collection: meta?.collection ?? null,
    slug: meta?.slug ?? null,
    lang: meta?.lang ?? 'fr',
    collectionExtra: {},
  };
  if (meta?.title_fr !== undefined) pageMeta.title_fr = meta.title_fr;
  if (meta?.title_en !== undefined) pageMeta.title_en = meta.title_en;
  if (meta?.description_fr !== undefined) pageMeta.description_fr = meta.description_fr;
  if (meta?.description_en !== undefined) pageMeta.description_en = meta.description_en;

  const list = Array.isArray(sections) ? sections : [];
  const pageDocument = {
    $schema: 'waimia.page-document/v1',
    meta: pageMeta,
    sections: list.map((s) => ({ type: s.type, ...(s.data ?? {}) })),
  };

  const errors = [];
  const warnings = [];

  if (meta?.collection === undefined) {
    errors.push({ index: -1, type: '', field: 'meta.collection', message: 'collection requise' });
  } else if (!PAGE_COLLECTIONS.includes(meta.collection)) {
    errors.push({ index: -1, type: '', field: 'meta.collection', message: `collection inconnue: ${meta.collection}` });
  }
  if (meta?.slug === undefined) {
    errors.push({ index: -1, type: '', field: 'meta.slug', message: 'slug requis' });
  } else if (!/^[a-z0-9/-]+$/.test(meta.slug)) {
    errors.push({ index: -1, type: '', field: 'meta.slug', message: 'slug invalide (kebab-case)' });
  }

  for (let index = 0; index < list.length; index += 1) {
    const { type, data } = list[index];
    const detail = loadSectionDetail(type);

    if (detail === null) {
      errors.push({ index, type, field: 'type', message: 'type inconnu' });
      continue;
    }

    const slots = detail.slots || [];
    const sectionData = data ?? {};

    for (const slot of slots) {
      if (slot.kind !== 'content' || !slot.required) continue;
      if (slot.bilingual) {
        const ok = isFilled(sectionData[`${slot.field}_fr`]) && isFilled(sectionData[`${slot.field}_en`]);
        if (!ok) {
          errors.push({ index, type, field: `${slot.field}_fr`, message: 'slot de contenu requis manquant ou vide' });
        }
      } else if (!isFilled(sectionData[slot.field])) {
        errors.push({ index, type, field: slot.field, message: 'slot de contenu requis manquant ou vide' });
      }
    }

    const known = new Set();
    for (const slot of slots) {
      known.add(slot.field);
      known.add(`${slot.field}_fr`);
      known.add(`${slot.field}_en`);
    }
    for (const key of Object.keys(sectionData)) {
      if (!known.has(key)) {
        warnings.push({ index, type, field: key, message: 'champ inconnu pour ce type' });
      }
    }
  }

  const valid = errors.length === 0;

  return {
    pageDocument,
    validation: { valid, errors, warnings },
    sectionCount: list.length,
  };
}

/** preview_render : rend un PageDocument en HTML chrome-less via l'endpoint SSR du site. */
export async function runPreviewRender({ pageDocument, baseUrl, htmlMaxChars } = {}) {
  const base = baseUrl ?? process.env.WAIMIA_BASE_URL ?? 'http://localhost:4321';
  const endpoint = base.replace(/\/$/, '') + '/library/builder/render';

  let res;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(pageDocument),
    });
  } catch (err) {
    throw new ToolError(
      `site non joignable a ${endpoint}. Lance "pnpm dev" ou definis WAIMIA_BASE_URL (ex. https://waimia.com). Detail: ${err.message}`,
    );
  }

  let html = await res.text();
  const byteLength = Buffer.byteLength(html, 'utf8');
  let truncated = false;
  if (htmlMaxChars !== undefined && html.length > htmlMaxChars) {
    truncated = true;
    html = html.slice(0, htmlMaxChars);
  }

  return {
    ok: res.ok,
    status: res.status,
    baseUrl: base,
    endpoint,
    contentType: res.headers.get('content-type'),
    byteLength,
    truncated,
    html,
  };
}

/** builder_save_draft : persiste un PageDocument brouillon sur disque (dev-only, hors dist/). */
export function runBuilderSaveDraft({ slug: rawSlug, doc } = {}) {
  const slugCheck = validateDraftSlug(rawSlug);
  if (!slugCheck.ok) throw new ToolError(slugCheck.error);

  const validation = validateDraftDocument(doc);
  if (validation.errors.length > 0) {
    throw new ToolError(`PageDocument invalide : ${formatDraftErrors(validation.errors)}`);
  }

  const filePath = path.resolve(PAGE_VARIANTS_DIR, `${slugCheck.slug}.json`);
  if (path.dirname(filePath) !== PAGE_VARIANTS_DIR) {
    throw new ToolError('slug invalide (chemin hors page-variants)');
  }

  try {
    mkdirSync(PAGE_VARIANTS_DIR, { recursive: true });
    writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
  } catch (err) {
    throw new ToolError(`ecriture impossible : ${err.message}`);
  }

  return {
    ok: true,
    path: `src/data/page-variants/${slugCheck.slug}.json`,
    slug: slugCheck.slug,
    warnings: validation.warnings,
  };
}

/** builder_list_drafts : liste les brouillons persistes (fichiers a plat page-variants/*.json). */
export function runBuilderListDrafts() {
  let entries;
  try {
    entries = readdirSync(PAGE_VARIANTS_DIR, { withFileTypes: true });
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      return { count: 0, drafts: [] };
    }
    throw err;
  }

  const drafts = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const filePath = path.join(PAGE_VARIANTS_DIR, entry.name);
    const slug = entry.name.slice(0, -'.json'.length);

    let mtime;
    try {
      mtime = statSync(filePath).mtime.toISOString();
    } catch {
      continue;
    }

    let sectionsCount = null;
    let types = null;
    try {
      const parsed = readJson(filePath);
      const sections = Array.isArray(parsed && parsed.sections) ? parsed.sections : [];
      sectionsCount = sections.length;
      types = sections.map((s) => (s && typeof s.type === 'string' ? s.type : null)).filter(Boolean);
    } catch {
      // JSON illisible/corrompu : liste quand meme l'entree.
    }

    drafts.push({ slug, sectionsCount, types, mtime });
  }

  drafts.sort((a, b) => (a.mtime < b.mtime ? 1 : a.mtime > b.mtime ? -1 : 0));

  return { count: drafts.length, drafts };
}

// ─── Metadonnees des tools pour un client LLM (name/description/JSON-schema des parametres) ───
// Source UNIQUE des definitions de tools exposees a l'IA du chat (Φ3). Le serveur MCP garde sa
// propre declaration zod (contrat MCP) ; ces defs decrivent les MEMES parametres au format JSON
// Schema (contrat tool-calling OpenAI/Anthropic). `run` pointe la fonction executee in-process.
export const CATALOGUE_TOOL_DEFS = [
  {
    name: 'catalogue_search',
    description:
      'Cherche et filtre le catalogue de sections composables du Design System Waimia. Tous les parametres sont optionnels. Retourne total, returned, les facettes agregees et les entrees compactes correspondantes (type, label, tags, famille, categorie). Point de depart pour trouver des types de sections a composer.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Texte libre, matche sur type, label et tags (insensible casse).' },
        intent: { type: 'string', description: 'Filtre par tag intent (ex. convert, reassure, explain).' },
        pageRole: { type: 'string', description: 'Filtre par tag pageRole (ex. hero, body, closer).' },
        contentMode: { type: 'string', description: 'Filtre par contentMode.' },
        category: { type: 'string', description: 'Filtre par categorySlug OU par domain (macro categorie).' },
        family: { type: 'string', description: 'Filtre par famille de section.' },
        status: { type: 'string', description: 'Filtre par statut (stable, wip, deprecated).' },
        usage: { type: 'string', description: 'Filtre par usage (site, library).' },
        limit: { type: 'number', description: `Nombre max de resultats (defaut ${DEFAULT_SEARCH_LIMIT}, cap ${MAX_SEARCH_LIMIT}).` },
      },
    },
    run: (args) => runCatalogueSearch(args),
  },
  {
    name: 'catalogue_get_section',
    description:
      'Recupere le detail complet (contrat de slots, presets, facettes, descriptions) d\'un type de section. Indispensable AVANT de composer une section : donne les slots de contenu requis (kind=content, required) a remplir.',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Identifiant exact du type (ex. hero-social-proof).' },
      },
      required: ['type'],
    },
    run: (args) => runCatalogueGetSection(args),
  },
  {
    name: 'catalogue_get_preset',
    description:
      'Liste ou resout les presets (declinaisons nommees) d\'un type de section. Sans presetId : liste tous les presets { id, label, family, era, props } (props = surcharges reelles de presentation). Avec presetId : resout le preset cible.',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Identifiant exact du type (ex. hero-split).' },
        presetId: { type: 'string', description: 'Id exact du preset a resoudre. Omis = liste tous les presets du type.' },
      },
      required: ['type'],
    },
    run: (args) => runCatalogueGetPreset(args),
  },
  {
    name: 'ds_tokens',
    description:
      'Liste les variables CSS (tokens) du Design System Waimia. Filtrable par prefixe (ex. --space, --paper). Utile pour connaitre les valeurs autorisees d\'un axe (couleur/espacement/rayon). NE JAMAIS inventer de token hors de cette liste.',
    parameters: {
      type: 'object',
      properties: {
        prefix: { type: 'string', description: 'Prefixe de nom de token a filtrer (ex. --space).' },
      },
    },
    run: (args) => runDsTokens(args),
  },
  {
    name: 'page_compose',
    description:
      'Assemble une liste ordonnee de sections (type + data de slots) en un PageDocument type ET valide chaque section contre son contrat de slots. Retourne { pageDocument, validation: { valid, errors, warnings } }. C\'est le tool FINAL a appeler pour produire la page : le PageDocument retourne est applique au canvas du builder. Corrige les erreurs de validation en re-appelant si valid=false.',
    parameters: {
      type: 'object',
      properties: {
        sections: {
          type: 'array',
          description: 'Liste ordonnee des sections a composer.',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Type de section (cle du catalogue).' },
              data: { type: 'object', description: 'Donnees de slots (paires champ->valeur, bilingue via _fr/_en).' },
            },
            required: ['type'],
          },
        },
        meta: {
          type: 'object',
          description: 'Metadonnees de page (collection, slug kebab-case, langue, titres bilingues).',
          properties: {
            collection: { type: 'string' },
            slug: { type: 'string' },
            lang: { type: 'string', enum: ['fr', 'en'] },
            title_fr: { type: 'string' },
            title_en: { type: 'string' },
            description_fr: { type: 'string' },
            description_en: { type: 'string' },
          },
        },
      },
      required: ['sections'],
    },
    run: (args) => runPageCompose(args),
  },
  {
    name: 'preview_render',
    description:
      'Rend un PageDocument (ex. la sortie de page_compose) en HTML chrome-less via l\'endpoint SSR du site. Permet de verifier empiriquement que la page se rend (GF-1). Retourne { ok, status, byteLength, html }.',
    parameters: {
      type: 'object',
      properties: {
        pageDocument: { type: 'object', description: 'Le PageDocument a rendre (sortie de page_compose).' },
        htmlMaxChars: { type: 'number', description: 'Tronque le HTML retourne pour economiser les tokens.' },
      },
      required: ['pageDocument'],
    },
    run: (args) => runPreviewRender(args),
  },
];

/** Map name -> def, pour un dispatch O(1) cote consommateur. */
export const CATALOGUE_TOOLS_BY_NAME = Object.fromEntries(CATALOGUE_TOOL_DEFS.map((t) => [t.name, t]));
