#!/usr/bin/env node
// Waimia · Serveur MCP capstone (#41).
//
// Expose le catalogue Design System Waimia a un agent IA via 8 tools.
// 4 tools en lecture seule :
//   - catalogue_search       : cherche / filtre l'index compact tier-1 (forme ManifestIndex).
//   - catalogue_get_section  : recupere le detail tier-2 d'un type (forme SectionDetail, contrat de slots).
//   - catalogue_get_preset   : liste ou resout les presets (declinaisons nommees) d'un type. GAP COMBLE
//                              (mcp-manifest.ts:300) : l'artefact dist expose desormais { id, label,
//                              family, era, props } par preset -- family/era optionnels (miroir du type
//                              `Preset`), props toujours present (peut etre {}).
//   - ds_tokens              : liste les variables CSS du Design System (packages/ds-tokens/tokens.css).
// 2 tools de composition / rendu :
//   - page_compose           : assemble + valide une liste de sections en un PageDocument type.
//   - preview_render         : rend un PageDocument en HTML chrome-less en relayant vers
//                              l'endpoint SSR du site /library/builder/render (source de verite
//                              unique du rendu = SectionsRenderer ; 0 duplication de logique).
// 2 tools de brouillons builder (#41 B3) :
//   - builder_save_draft     : persiste un PageDocument brouillon dans src/data/page-variants/<slug>.json
//                              (MEME format/emplacement que POST /api/ds/compose, dev-only).
//   - builder_list_drafts    : liste les brouillons persistes (src/data/page-variants/*.json a plat).
//
// Source de vérité (lecture + compose) = les artefacts prerendered de dist/ (builder unique
// src/lib/mcp-manifest.ts) :
//   - dist/client/library/manifest.json        (tier-1 index compact)
//   - dist/client/library/section/<type>.json  (tier-2 detail par type)
// Les brouillons builder (write) vivent hors dist/, dans src/data/page-variants/ (meme dossier que
// le middleware dev ds-save-dev.mjs).
// Ce serveur n'importe PAS astro:content : il lit le JSON deja genere, donc runnable en Node pur.
//
// Convention stdio MCP : stdout = canal protocole, on ne logge JAMAIS dessus. Logs via console.error.
//
// 0 nouveau token DS, 0 valeur en dur metier.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ─── Resolution de la racine repo ───
// Ce script vit dans mcp/ ; la racine du repo est le dossier parent.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');

// Astro + adaptateur @astrojs/vercel emet le client prerendere sous dist/client/.
const MANIFEST_PATH = path.join(REPO_ROOT, 'dist', 'client', 'library', 'manifest.json');
const SECTION_DIR = path.join(REPO_ROOT, 'dist', 'client', 'library', 'section');
const TOKENS_PATH = path.join(REPO_ROOT, 'packages', 'ds-tokens', 'tokens.css');
// Brouillons du builder (#41 B3) : MEME dossier que POST /api/ds/compose (dev-only,
// src/integrations/ds-save-dev.mjs PAGE_VARIANTS_DIR) -- 1 fichier a plat <slug>.json par
// brouillon. NE PAS confondre avec les sous-dossiers existants (home/a.json, b.json, c.json...) :
// ceux-la relevent d'un mecanisme distinct de variantes A/B, non lie au builder ; builder_list_drafts
// les ignore explicitement (isFile() only).
const PAGE_VARIANTS_DIR = path.join(REPO_ROOT, 'src', 'data', 'page-variants');

const MAX_SEARCH_LIMIT = 199;
const DEFAULT_SEARCH_LIMIT = 30;
const DRAFT_SLUG_MAX_LENGTH = 64;
const DRAFT_SLUG_PATTERN = /^[a-z0-9-]+$/;

// Miroir de l'enum PAGE_COLLECTIONS de src/schemas/page-document.ts (source de verite cote app).
// On NE peut PAS importer ce schema ici car page-document.ts tire astro:content (serveur-only,
// non runnable en Node pur) ; cette liste est donc un miroir documente d'un enum, pas une valeur DS.
const PAGE_COLLECTIONS = [
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

// ─── Helpers de chargement (memoise les artefacts qui ne changent pas a runtime) ───

/** Erreur typee : artefact dist absent (le site n'a pas ete builde). */
class ArtifactMissingError extends Error {}

let cachedIndex = null;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

/**
 * Charge le tier-1 (index compact). Memoise apres le premier succes.
 * Jette ArtifactMissingError si dist/library/manifest.json est absent (pas de fallback silencieux).
 */
function loadIndex() {
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
function loadSectionDetail(type) {
  // On s'assure d'abord que le build existe (sinon message clair "build d'abord").
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
 * Ne retient que les declarations sous des selecteurs :root (base + redefinitions responsive/state) ;
 * exclut le bloc @theme (aliases Tailwind v4, derives des tokens de base).
 * Dedupe par nom (premiere occurrence = valeur de base canonique).
 */
function loadTokens() {
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

function textResult(payload) {
  return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] };
}

function errorResult(message) {
  return { content: [{ type: 'text', text: message }], isError: true };
}

const lc = (value) => String(value).toLowerCase();

/** Match une valeur scalaire ou un tableau contre une valeur cible (insensible casse). */
function entryMatches(field, wanted) {
  if (field === undefined || field === null) return false;
  const target = lc(wanted);
  if (Array.isArray(field)) return field.some((v) => lc(v) === target);
  return lc(field) === target;
}

// ─── Serveur ───

const server = new McpServer({ name: 'waimia-catalogue', version: '0.1.0' });

server.registerTool(
  'catalogue_search',
  {
    title: 'Chercher dans le catalogue de sections',
    description:
      'Cherche et filtre l\'index compact (tier-1) du catalogue Design System Waimia. ' +
      'Tous les parametres sont optionnels. Retourne total, returned, les facettes agregees et les entrees compactes correspondantes.',
    inputSchema: {
      query: z.string().optional().describe('Texte libre, matche sur type, label et tags (insensible casse).'),
      intent: z.string().optional().describe('Filtre par tag intent (ex. convert, reassure, explain).'),
      pageRole: z.string().optional().describe('Filtre par tag pageRole (ex. hero, body, closer).'),
      contentMode: z.string().optional().describe('Filtre par contentMode (valeur scalaire).'),
      category: z.string().optional().describe('Filtre par categorySlug OU par domain (macro categorie).'),
      family: z.string().optional().describe('Filtre par famille de section.'),
      status: z.string().optional().describe('Filtre par statut (stable, wip, deprecated).'),
      usage: z.string().optional().describe('Filtre par usage (site, library).'),
      limit: z.number().int().positive().optional().describe(`Nombre max de resultats (defaut ${DEFAULT_SEARCH_LIMIT}, cap ${MAX_SEARCH_LIMIT}).`),
    },
  },
  async (args) => {
    let index;
    try {
      index = loadIndex();
    } catch (err) {
      if (err instanceof ArtifactMissingError) return errorResult(err.message);
      throw err;
    }

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

    return textResult({
      total: results.length,
      returned: sliced.length,
      facets: index.facets,
      results: sliced,
    });
  },
);

server.registerTool(
  'catalogue_get_section',
  {
    title: 'Detail d\'un type de section',
    description:
      'Recupere le detail complet (tier-2, forme SectionDetail) d\'un type de section : ' +
      'contrat de slots, presets, facettes, descriptions et sections liees. Indispensable pour composer une section.',
    inputSchema: {
      type: z.string().describe('Identifiant exact du type de section (ex. hero-social-proof).'),
    },
  },
  async ({ type }) => {
    let detail;
    try {
      detail = loadSectionDetail(type);
    } catch (err) {
      if (err instanceof ArtifactMissingError) return errorResult(err.message);
      throw err;
    }
    if (detail) return textResult(detail);

    // Type inconnu : suggere les types proches (prefixe / inclusion) pour aider l'agent.
    let suggestions = [];
    try {
      const index = loadIndex();
      const needle = lc(type);
      suggestions = index.sections
        .map((e) => e.type)
        .filter((t) => lc(t).includes(needle) || needle.includes(lc(t)) || lc(t).startsWith(needle.slice(0, 4)))
        .slice(0, 5);
    } catch {
      // si l'index n'est pas chargeable on renvoie juste l'erreur de type.
    }
    const hint = suggestions.length ? ` Types proches : ${suggestions.join(', ')}.` : '';
    return errorResult(`type inconnu : ${type}.${hint}`);
  },
);

server.registerTool(
  'catalogue_get_preset',
  {
    title: 'Presets (declinaisons) d\'un type de section',
    description:
      'Liste ou resout les presets (declinaisons nommees, sous-ensemble du tier-2) d\'un type de section. ' +
      'Sans presetId : retourne tous les presets { id, label, family, era, props } du type. ' +
      'Avec presetId : resout le preset cible (erreur propre + liste des ids connus si absent). ' +
      '`family`/`era` sont optionnels (tous les presets n\'en portent pas) ; `props` contient les ' +
      'surcharges reelles de presentation (background/layout/variant/illustration/...) appliquees ' +
      'par-dessus la demo par defaut du type -- source = packages/ds-kernel/src/lib/section-presets.ts, ' +
      'serialisee dans l\'artefact dist par src/lib/mcp-manifest.ts.',
    inputSchema: {
      type: z.string().describe('Identifiant exact du type de section (ex. hero-split).'),
      presetId: z
        .string()
        .optional()
        .describe('Id exact du preset a resoudre (ex. hero-split--showcase-3-1-paper). Omis = liste tous les presets du type.'),
    },
  },
  async ({ type, presetId }) => {
    let detail;
    try {
      detail = loadSectionDetail(type);
    } catch (err) {
      if (err instanceof ArtifactMissingError) return errorResult(err.message);
      throw err;
    }

    if (detail === null) {
      // Type inconnu : meme logique de suggestion que catalogue_get_section.
      let suggestions = [];
      try {
        const index = loadIndex();
        const needle = lc(type);
        suggestions = index.sections
          .map((e) => e.type)
          .filter((t) => lc(t).includes(needle) || needle.includes(lc(t)) || lc(t).startsWith(needle.slice(0, 4)))
          .slice(0, 5);
      } catch {
        // si l'index n'est pas chargeable on renvoie juste l'erreur de type.
      }
      const hint = suggestions.length ? ` Types proches : ${suggestions.join(', ')}.` : '';
      return errorResult(`type inconnu : ${type}.${hint}`);
    }

    const presets = detail.presets || [];

    if (presetId === undefined) {
      return textResult({ type, presetCount: presets.length, presets });
    }

    const preset = presets.find((p) => p.id === presetId);
    if (!preset) {
      const known = presets.map((p) => p.id);
      return errorResult(
        `presetId inconnu pour ${type} : ${presetId}. Presets disponibles : ${known.length ? known.join(', ') : '(aucun preset pour ce type)'}.`,
      );
    }
    return textResult({ type, preset });
  },
);

server.registerTool(
  'ds_tokens',
  {
    title: 'Tokens du Design System',
    description:
      'Liste les variables CSS du Design System Waimia (packages/ds-tokens/tokens.css). ' +
      'Filtrable par prefixe de nom (ex. --space, --paper, --text). Retourne count et la liste { name, value }.',
    inputSchema: {
      prefix: z.string().optional().describe('Prefixe de nom de token a filtrer (ex. --space).'),
      group: z.string().optional().describe('Alias de prefix (meme effet de filtrage).'),
    },
  },
  async ({ prefix, group }) => {
    const filter = prefix ?? group;
    let tokens;
    try {
      tokens = loadTokens();
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        return errorResult(`tokens.css introuvable (${TOKENS_PATH}).`);
      }
      throw err;
    }
    const filtered = filter ? tokens.filter((t) => t.name.startsWith(filter)) : tokens;
    return textResult({ count: filtered.length, tokens: filtered });
  },
);

// Vrai si une valeur de slot est consideree comme remplie.
// string -> non vide apres trim ; array -> au moins un element ; autre -> defini et non null.
function isFilled(v) {
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return v !== undefined && v !== null;
}

/**
 * Assainit + valide un slug de brouillon (kebab-case strict, anti path-traversal, longueur bornee).
 * Plus strict que meta.slug du PageDocument (qui autorise les slashes, cf pageMetaSchema) : un
 * brouillon builder est un NOM DE FICHIER a plat, jamais un chemin.
 * @param {unknown} rawSlug
 * @returns {{ok:true,slug:string}|{ok:false,error:string}}
 */
function validateDraftSlug(rawSlug) {
  const slug = typeof rawSlug === 'string' ? rawSlug.trim() : '';
  if (!slug) return { ok: false, error: 'slug manquant' };
  // Verifie AVANT le pattern kebab-case pour un message plus parlant sur les tentatives de
  // traversal explicites (le pattern les rejetterait de toute facon, ceinture + bretelles).
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
 * Validation STRUCTURELLE stricte d'un PageDocument pour builder_save_draft.
 * MEME logique que la validation inline de page_compose (meta.collection connue, meta.slug
 * kebab-case, slots de contenu requis par type via le contrat tier-2 catalogue_get_section) --
 * dupliquee ICI plutot que factorisee avec page_compose pour ne prendre AUCUN risque de regression
 * sur les 5 tools existants (perimetre de la mission = additif). GAP CONNU (identique a page_compose,
 * cf commentaire du tool) : on NE PEUT PAS importer validatePageDoc (@waimia/ds-kernel/lib/page-document)
 * ici, sa chaine tirant astro:content (serveur-only, non runnable en Node pur) -- seule la PRESENCE
 * des slots de contenu requis est verifiee, pas leur type de valeur exact (string vs number, enums de
 * presentation, formes d'items array). Un doc qui passe cette validation reste sujet a un refus par le
 * vrai schema Zod cote site (POST /api/ds/compose, dev-only).
 * Peut jeter ArtifactMissingError (via loadSectionDetail) si les artefacts dist/ sont absents -- a
 * catcher par l'appelant, comme pour les autres tools.
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

    // Peut jeter ArtifactMissingError : propage volontairement (pas de catch ici), l'appelant
    // (builder_save_draft) le traite comme les autres tools (message "build d'abord").
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

/** Formate une liste d'erreurs PageDocError en un message lisible pour errorResult (MEME format que le compose handler dev). */
function formatDraftErrors(errors) {
  return errors
    .map((e) => {
      const where = e.index >= 0 ? `section #${e.index}${e.type ? ` (${e.type})` : ''}` : 'document';
      const field = e.field ? ` · champ « ${e.field} »` : '';
      return `${where}${field} : ${e.message}`;
    })
    .join(' | ');
}

server.registerTool(
  'page_compose',
  {
    title: 'Composer un PageDocument typé à partir de sections',
    description:
      'Assemble une liste de sections (type + données de slots) en un PageDocument sérialisable ' +
      '(forme waimia.page-document/v1) ET valide chaque section contre son contrat de slots tier-2 ' +
      '(la source de vérité exposée par catalogue_get_section). ' +
      'IMPORTANT : on NE peut PAS importer validatePageDoc (src/lib/page-document.ts) car il tire ' +
      'astro:content (serveur-only, non runnable en Node pur) ; le contrat de slots tier-2 EST donc la ' +
      'source de vérité utilisée pour valider. Construit toujours le pageDocument (même invalide) pour ' +
      "permettre à l'agent d'itérer, et retourne errors + warnings.",
    inputSchema: {
      sections: z
        .array(
          z.object({
            type: z.string(),
            data: z.record(z.unknown()).optional(),
          }),
        )
        .min(1)
        .describe('Liste ordonnée des sections à composer (type + données de slots).'),
      meta: z
        .object({
          collection: z.string().optional(),
          slug: z.string().optional(),
          lang: z.enum(['fr', 'en']).optional(),
          title_fr: z.string().optional(),
          title_en: z.string().optional(),
          description_fr: z.string().optional(),
          description_en: z.string().optional(),
        })
        .optional()
        .describe('Métadonnées de page (collection, slug, langue, titres et descriptions bilingues).'),
    },
  },
  async ({ sections, meta }) => {
    // 1. Toujours construire le pageDocument (meme invalide) pour que l'agent puisse iterer.
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

    const pageDocument = {
      $schema: 'waimia.page-document/v1',
      meta: pageMeta,
      sections: sections.map((s) => ({ type: s.type, ...(s.data ?? {}) })),
    };

    const errors = [];
    const warnings = [];

    // 2a. Validation des metadonnees (index -1 = scope page, pas une section).
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

    // 2b. Validation par section contre son contrat de slots tier-2.
    for (let index = 0; index < sections.length; index += 1) {
      const { type, data } = sections[index];
      let detail;
      try {
        detail = loadSectionDetail(type);
      } catch (err) {
        // Artefacts dist absents : message clair "build d'abord", comme les autres tools.
        if (err instanceof ArtifactMissingError) return errorResult(err.message);
        throw err;
      }

      if (detail === null) {
        errors.push({ index, type, field: 'type', message: 'type inconnu' });
        continue;
      }

      const slots = detail.slots || [];
      const sectionData = data ?? {};

      // Slots de contenu requis : chaque slot kind==='content' && required doit etre rempli.
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

      // Warnings (non bloquant) : cle de data qui ne correspond a aucun slot du type.
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

    // 3. Verdict.
    const valid = errors.length === 0;

    // 4. Retour.
    return textResult({
      pageDocument,
      validation: { valid, errors, warnings },
      sectionCount: sections.length,
    });
  },
);

server.registerTool(
  'preview_render',
  {
    title: 'Rendre un PageDocument en HTML chrome-less',
    description:
      'Rend un PageDocument (ex. la sortie de page_compose) en HTML chrome-less en relayant ' +
      "vers l'endpoint SSR du site /library/builder/render. Source de verite unique du rendu = " +
      'SectionsRenderer cote site (ce tool ne duplique aucune logique de rendu). Un doc valide ' +
      'retourne status 200 + le markup des sections ; un doc invalide retourne 200 + une page ' +
      "d'erreur lisible. Necessite que le site soit joignable (pnpm dev, ou baseUrl/WAIMIA_BASE_URL en prod).",
    inputSchema: {
      pageDocument: z
        .record(z.unknown())
        .describe("L'objet PageDocument a rendre (ex. la sortie de page_compose)."),
      baseUrl: z
        .string()
        .optional()
        .describe("Override de l'URL de base du site (ex. https://waimia.com). Defaut: WAIMIA_BASE_URL ou http://localhost:4321."),
      htmlMaxChars: z
        .number()
        .int()
        .positive()
        .optional()
        .describe('Tronque le HTML retourne pour economiser les tokens. Defaut: pas de troncature.'),
    },
  },
  async ({ pageDocument, baseUrl, htmlMaxChars }) => {
    // Defaut dev Astro : http://localhost:4321. En prod, passer baseUrl ou definir
    // WAIMIA_BASE_URL (ex. https://waimia.com).
    const base = baseUrl ?? process.env.WAIMIA_BASE_URL ?? 'http://localhost:4321';
    const endpoint = base.replace(/\/$/, '') + '/library/builder/render';

    let res;
    try {
      // fetch global (Node 25, pas d'import). Le serveur relaie simplement le PageDocument.
      res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(pageDocument),
      });
    } catch (err) {
      return errorResult(
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

    return textResult({
      ok: res.ok,
      status: res.status,
      baseUrl: base,
      endpoint,
      contentType: res.headers.get('content-type'),
      byteLength,
      truncated,
      html,
    });
  },
);

server.registerTool(
  'builder_save_draft',
  {
    title: 'Enregistrer un brouillon de page composee',
    description:
      'Persiste un brouillon de PageDocument (typiquement la sortie de page_compose) sur disque : ' +
      'src/data/page-variants/<slug>.json -- MEME format/emplacement que POST /api/ds/compose ' +
      '(dev-only, src/integrations/ds-save-dev.mjs). Valide le slug (kebab-case strict, anti ' +
      'path-traversal, max 64 caracteres -- un slug est un NOM DE FICHIER a plat, pas un chemin) ' +
      'PUIS la structure du doc ($schema="waimia.page-document/v1", meta.collection connue, ' +
      'meta.slug kebab-case, sections non vide + slots de contenu requis par type via le contrat ' +
      'tier-2, MEME logique que page_compose). GAP CONNU (cf page_compose) : validation Zod complete ' +
      'indisponible ici (chaine astro:content non importable en Node pur) -- seule la presence des ' +
      'slots requis est verifiee, pas leur type de valeur exact. Overwrite autorise : un slug deja ' +
      'existant est ecrase (semantique brouillon). En cas de doc invalide : AUCUNE ecriture, erreur ' +
      'detaillee retournee (isError).',
    inputSchema: {
      slug: z
        .string()
        .describe('Identifiant du brouillon, kebab-case strict (ex. hero-test-1). Devient le nom de fichier <slug>.json.'),
      doc: z
        .record(z.unknown())
        .describe('Le PageDocument a persister (forme waimia.page-document/v1, typiquement la sortie de page_compose).'),
    },
  },
  async ({ slug: rawSlug, doc }) => {
    const slugCheck = validateDraftSlug(rawSlug);
    if (!slugCheck.ok) return errorResult(slugCheck.error);

    let validation;
    try {
      validation = validateDraftDocument(doc);
    } catch (err) {
      if (err instanceof ArtifactMissingError) return errorResult(err.message);
      throw err;
    }
    if (validation.errors.length > 0) {
      return errorResult(`PageDocument invalide : ${formatDraftErrors(validation.errors)}`);
    }

    // Ceinture + bretelles (meme garde que le compose handler dev) : le chemin resolu doit rester
    // DANS page-variants, meme si validateDraftSlug rend deja tout traversal impossible en amont.
    const filePath = path.resolve(PAGE_VARIANTS_DIR, `${slugCheck.slug}.json`);
    if (path.dirname(filePath) !== PAGE_VARIANTS_DIR) {
      return errorResult('slug invalide (chemin hors page-variants)');
    }

    try {
      mkdirSync(PAGE_VARIANTS_DIR, { recursive: true });
      // Round-trip exact (comme le compose handler dev) : on ecrit le doc TEL QUEL, indente 2 + newline finale.
      writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
    } catch (err) {
      return errorResult(`ecriture impossible : ${err.message}`);
    }

    return textResult({
      ok: true,
      path: `src/data/page-variants/${slugCheck.slug}.json`,
      slug: slugCheck.slug,
      warnings: validation.warnings,
    });
  },
);

server.registerTool(
  'builder_list_drafts',
  {
    title: 'Lister les brouillons de pages composees',
    description:
      'Liste les brouillons persistes par builder_save_draft : fichiers a plat src/data/page-variants/*.json ' +
      '(ignore les sous-dossiers, ex. home/a.json, b.json, c.json -- mecanisme distinct de variantes A/B, ' +
      'non lie au builder). Retourne { slug, sectionsCount, types, mtime } par brouillon (mtime ISO), ' +
      'trie par mtime decroissant (le plus recent en premier). Un brouillon au JSON illisible/corrompu ' +
      'est quand meme liste (sectionsCount/types a null) plutot que de faire echouer tout le tool.',
    inputSchema: {},
  },
  async () => {
    let entries;
    try {
      entries = readdirSync(PAGE_VARIANTS_DIR, { withFileTypes: true });
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        return textResult({ count: 0, drafts: [] });
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
        continue; // fichier disparu entre le readdir et le stat : on l'omet silencieusement.
      }

      let sectionsCount = null;
      let types = null;
      try {
        const parsed = readJson(filePath);
        const sections = Array.isArray(parsed && parsed.sections) ? parsed.sections : [];
        sectionsCount = sections.length;
        types = sections.map((s) => (s && typeof s.type === 'string' ? s.type : null)).filter(Boolean);
      } catch {
        // JSON illisible/corrompu : liste quand meme l'entree (mtime connu), detail sections a null.
      }

      drafts.push({ slug, sectionsCount, types, mtime });
    }

    drafts.sort((a, b) => (a.mtime < b.mtime ? 1 : a.mtime > b.mtime ? -1 : 0));

    return textResult({ count: drafts.length, drafts });
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[waimia-catalogue] MCP server ready on stdio');
}

main().catch((err) => {
  console.error('[waimia-catalogue] fatal:', err);
  process.exit(1);
});
