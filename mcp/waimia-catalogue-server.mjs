#!/usr/bin/env node
// Waimia · Serveur MCP capstone (#41).
//
// Expose le catalogue Design System Waimia a un agent IA via 8 tools (stdio MCP).
// 4 tools en lecture seule :
//   - catalogue_search       : cherche / filtre l'index compact tier-1.
//   - catalogue_get_section  : recupere le detail tier-2 d'un type (contrat de slots).
//   - catalogue_get_preset   : liste ou resout les presets (declinaisons nommees) d'un type. GAP COMBLE
//                              (mcp-manifest.ts:300) : l'artefact dist expose desormais { id, label,
//                              family, era, props } par preset -- family/era optionnels (miroir du type
//                              `Preset`), props toujours present (peut etre {}).
//   - ds_tokens              : liste les variables CSS du Design System.
// 2 tools de composition / rendu :
//   - page_compose           : assemble + valide une liste de sections en un PageDocument type.
//   - preview_render         : rend un PageDocument en HTML chrome-less (endpoint SSR du site).
// 2 tools de brouillons builder (#41 B3) :
//   - builder_save_draft     : persiste un PageDocument brouillon dans src/data/page-variants/<slug>.json.
//   - builder_list_drafts    : liste les brouillons persistes.
//
// REFACTOR (audit 09, chat-IA in-app Φ3) : la LOGIQUE de ces tools vit desormais dans le module
// PARTAGE mcp/catalogue-tools.mjs (source de verite unique, rule 59), importe ICI et par la boucle
// agentique du chat-IA in-app (packages/apps-atelier/src/lib/chat). Ce fichier ne garde que le
// contrat MCP (declaration zod des parametres + enveloppe textResult/errorResult) : 0 duplication de
// logique, comportement des 8 tools INCHANGE. Les fonctions run* renvoient le payload brut ou jettent
// ToolError / ArtifactMissingError, mappes ici en errorResult.
//
// Convention stdio MCP : stdout = canal protocole, on ne logge JAMAIS dessus. Logs via console.error.
//
// 0 nouveau token DS, 0 valeur en dur metier.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import {
  ArtifactMissingError,
  ToolError,
  runCatalogueSearch,
  runCatalogueGetSection,
  runCatalogueGetPreset,
  runDsTokens,
  runPageCompose,
  runPreviewRender,
  runBuilderSaveDraft,
  runBuilderListDrafts,
} from './catalogue-tools.mjs';

const MAX_SEARCH_LIMIT = 199;
const DEFAULT_SEARCH_LIMIT = 30;

// ─── Enveloppes MCP ───

function textResult(payload) {
  return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] };
}

function errorResult(message) {
  return { content: [{ type: 'text', text: message }], isError: true };
}

/**
 * Enveloppe un run* partage : succes -> textResult(payload) ; ToolError / ArtifactMissingError ->
 * errorResult(message) ; toute autre erreur remonte (bug reel, pas un cas metier).
 */
function wrap(runFn) {
  return async (args) => {
    try {
      const payload = await runFn(args);
      return textResult(payload);
    } catch (err) {
      if (err instanceof ArtifactMissingError || err instanceof ToolError) {
        return errorResult(err.message);
      }
      throw err;
    }
  };
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
  wrap(runCatalogueSearch),
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
  wrap(runCatalogueGetSection),
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
  wrap(runCatalogueGetPreset),
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
  wrap(runDsTokens),
);

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
  wrap(runPageCompose),
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
  wrap(runPreviewRender),
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
  wrap(runBuilderSaveDraft),
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
  wrap(runBuilderListDrafts),
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
