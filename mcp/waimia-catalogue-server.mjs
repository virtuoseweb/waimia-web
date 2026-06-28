#!/usr/bin/env node
// Waimia · Serveur MCP capstone (#41) · SLICE 1 lecture seule.
//
// Expose le catalogue Design System Waimia a un agent IA via 3 tools en lecture seule :
//   - catalogue_search       : cherche / filtre l'index compact tier-1 (forme ManifestIndex).
//   - catalogue_get_section  : recupere le detail tier-2 d'un type (forme SectionDetail, contrat de slots).
//   - ds_tokens              : liste les variables CSS du Design System (src/styles/tokens.css).
//
// Source de vérité = les artefacts prerendered de dist/ (builder unique src/lib/mcp-manifest.ts) :
//   - dist/client/library/manifest.json        (tier-1 index compact)
//   - dist/client/library/section/<type>.json  (tier-2 detail par type)
// Ce serveur n'importe PAS astro:content : il lit le JSON deja genere, donc runnable en Node pur.
//
// Les tools d'ecriture / render (page.compose, preview.render) viendront dans une slice ulterieure.
// Convention stdio MCP : stdout = canal protocole, on ne logge JAMAIS dessus. Logs via console.error.
//
// 0 nouveau token DS, 0 valeur en dur metier.

import { readFileSync } from 'node:fs';
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
const TOKENS_PATH = path.join(REPO_ROOT, 'src', 'styles', 'tokens.css');

const MAX_SEARCH_LIMIT = 199;
const DEFAULT_SEARCH_LIMIT = 30;

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
 * Parse les variables CSS du Design System depuis src/styles/tokens.css.
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
  'ds_tokens',
  {
    title: 'Tokens du Design System',
    description:
      'Liste les variables CSS du Design System Waimia (src/styles/tokens.css). ' +
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[waimia-catalogue] MCP server ready on stdio');
}

main().catch((err) => {
  console.error('[waimia-catalogue] fatal:', err);
  process.exit(1);
});
