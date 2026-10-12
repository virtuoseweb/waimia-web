// @ts-check
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import robots from './src/integrations/robots.mjs';
import llmsMdPages from './src/integrations/llms-md-pages';
import dsSaveDev from './src/integrations/ds-save-dev.mjs';
import sitemapHygiene from './src/integrations/sitemap-hygiene.mjs';
import seoPostbuild from './src/integrations/seo-postbuild.mjs';
import { NOINDEX_SITEMAP_PATHS } from './src/data/sitemap-noindex-exclude';
import { REDIRECTED_PATHS } from './src/data/depublished.ts';
import { SITE } from './src/site.config.ts';
import {
  internalToolsEnabled,
  isInternalPath,
  INTERNAL_PATH_PREFIXES,
  INTERNAL_API_PREFIXES,
} from './src/lib/seo/internal-tools.mjs';
import { lastmodFor } from './src/lib/seo/lastmod.mjs';
import { SITE_IDENTITY } from './src/lib/seo/page-schema.ts';
import { LLMS_SUMMARY, llmsDetails } from './src/lib/seo/llms-summary.ts';
// Apps-as-plugins (fiche 0027 D3) : registre des apps internes extraites en packages.
// Chaque app enabled+extraite expose une AstroIntegration qui injecte sa route.
import { enabledAppIntegrations, APPS } from './src/apps.config.ts';

// Refonte C 2026-10 · surfaces INTERNES (catalogue DS /preview, atelier /library, dashboard
// SEO, cartographie) : générées partout SAUF dans le build de production Vercel. Elles
// représentaient ~4 300 des ~4 400 pages HTML du build et exposaient en prod des outils
// de travail (dont l'endpoint serverless /api/ds/chat). Cf src/lib/seo/internal-tools.mjs.
const INTERNAL_TOOLS = internalToolsEnabled();

// Ressources VERROUILLÉES (lead magnets) : PDF/ZIP hors `public/` (donc jamais servis),
// lus par la fonction serverless /api/lead-magnet et envoyés en pièce jointe Resend.
// `includeFiles` de @astrojs/vercel n'accepte PAS de glob (chaque entrée devient
// `new URL(file, root)`) : on liste donc les fichiers présents au chargement de la config (cwd = racine du projet, comme pour toute commande astro).
// Un fichier ajouté dans private/telechargements/ est repris au build suivant.
const PRIVATE_DOWNLOADS_DIR = 'private/telechargements';
const PRIVATE_DOWNLOAD_FILES = (() => {
  try {
    return readdirSync(join(process.cwd(), PRIVATE_DOWNLOADS_DIR))
      .filter((f) => !f.startsWith('.'))
      .sort()
      .map((f) => `./${PRIVATE_DOWNLOADS_DIR}/${f}`);
  } catch {
    return [];
  }
})();

// Interdictions d'exploration communes à TOUS les robots. Chaque préfixe interne est
// interdit en « segment entier » : `/library$` (la page hub) et `/library/` (son
// sous-arbre), pour ne pas mordre sur une future URL publique qui commencerait pareil.
const ROBOTS_DISALLOW = [
  '/admin/',
  '/api/',
  ...[...INTERNAL_PATH_PREFIXES, ...INTERNAL_API_PREFIXES].flatMap((p) => [`${p}$`, `${p}/`]),
].filter((rule, i, all) => !rule.startsWith('/api/ds') && all.indexOf(rule) === i);

// /api/ est interdit SAUF l'image Open Graph dynamique : Twitterbot, LinkedInBot et
// Googlebot-Image respectent robots.txt, sans cette exception aucune carte de partage
// n'avait d'image (og:image pointe /api/og.png). La règle la plus longue l'emporte.
const ROBOTS_ALLOW = ['/', '/api/og.png'];

// Robots des moteurs génératifs explicitement nommés dans robots.txt (exploration,
// recherche et requêtes utilisateur). Ils partagent le groupe de `*` : mêmes règles.
const AI_USER_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'MistralAI-User',
  'CCBot',
  'cohere-ai',
  'Bytespider',
];

// Apps-as-plugins (E1) · redirections dont la DESTINATION est une route /library/*
// (servie par l'app extraite « atelier »). Astro leve InvalidRedirectDestination si la
// cible n'existe pas → ces 301 ne sont valides QUE lorsque l'atelier est monte. On les
// conditionne donc au flag APPS.atelier.enabled : atelier off → les routes /library/*
// ET ces redirections disparaissent ensemble (le reste du site public reste intact).
/** @type {Record<string, string>} */
const atelierRedirects = APPS.atelier?.enabled && INTERNAL_TOOLS
  ? {
      // Cutover atelier DS → /library/* (decision docs/design-system/03 §11.2).
      '/agence/design-system': '/library',
      '/agence/ds-studio': '/library/studio',
      '/agence/hero-lab': '/library/hero-lab',
      // Fiche detail catalogue → page canonique /library/[type] (vague #60).
      '/components/[type]': '/library/[type]',
      '/categories/[category]': '/library/[category]',
      // Wave #34 · nettoyage taxonomie degeneree du catalogue DS.
      '/library/call-to-action-sections': '/library/cta-sections',
      '/library/trust-proof': '/library/trust-sections',
      '/library/family/eeat': '/library/family/prose',
      '/library/family/manifesto': '/library/family/prose',
      '/library/family/pain': '/library/family/prose',
      '/library/family/flow': '/library/family/process-steps',
    }
  : {};

// Waimia · Astro 6 config · Static-first + API routes SSR via Vercel Functions
// - output: 'static' : 100 % SSG par défaut, fichiers CDN immuables (T1.1 activé 2026-05-17)
// - adapter: vercel() · Vercel Functions on-demand pour /api/* (prerender=false)
// - i18n: site monolingue FR (pas de miroir /en)
// - Tailwind v4 CSS-first
// - Sitemap : URL indexables uniquement, lastmod réel par URL
//
// Note · Astro 6 dev server a un bug avec les `<script>` de composants servis
// via virtual paths Vite (`?astro&type=script&index=0&lang.ts` → 500). Notre
// Header.astro contourne via `<script is:inline>` (cf commentaire Header).
// En build/prod, ce comportement est identique : `is:inline` produit du JS
// embed dans le HTML statique (~3KB), pas de bundle supplémentaire mais pas de hop
// HTTP non plus. Trade-off net neutre pour ce cas.
export default defineConfig({
  site: SITE.url,
  // T1.1 activé 2026-05-17 — output static (95 % contenu evergreen → fichiers CDN immuables)
  // SSR opt-in via `export const prerender = false` sur les routes dynamiques.
  // Exceptions SSR justifiées (prerender=false) :
  //   · /api/healthcheck — healthcheck Vercel, données live (timestamp + sha)
  //   · /api/og.png     — génération OG image dynamique par titre/kicker (query params)
  // Toutes les autres pages déclarent explicitement `prerender = true` → SSG garanti.
  output: 'static',
  // ISR Vercel — conservé pour les futures routes SSR (prerender=false) non exclues.
  // En mode static, les pages SSG (prerender=true) sont déjà des fichiers CDN ; l'ISR
  // ne s'applique qu'aux routes prerender=false absentes de la liste exclude.
  // API routes actuelles : toutes dans exclude → toujours fresh, jamais cachées ISR.
  // cf /tmp/codex-missions/tier12-isr-perf/DONE.md pour le guide ISR complet (Tier 12).
  adapter: vercel({
    includeFiles: PRIVATE_DOWNLOAD_FILES,
    isr: {
      expiration: 3600, // TTL par défaut 1h pour les futures routes SSR cachables
      bypassToken: process.env.ISR_BYPASS_TOKEN, // secret Vercel env var (preview bypass)
      // API routes exclues de l'ISR : données live, webhooks, forms — toujours fresh
      exclude: ['/api/contact', '/api/newsletter', '/api/academy', '/api/devis', '/api/lead-magnet', '/api/healthcheck'],
    },
  }),
  // Refonte C 2026-10 · préchargement au survol/toucher, plus à l'entrée dans le viewport :
  // avec le mega menu et le footer, `viewport` déclenchait le téléchargement de dizaines de
  // pages HTML à chaque affichage (réseau mobile gaspillé, sans gain mesurable sur la page vue).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Une seule forme d'URL : sans slash final. L'adapter Vercel émet la 308 `/x/` → `/x`
  // (1re règle de .vercel/output/config.json), vérifiée par scripts/check-redirects.mjs.
  trailingSlash: 'never',
  // Site monolingue FR (le miroir /en n'existe pas : /en répond 404). Une seule locale
  // déclarée → aucune route, aucun alternate ni aucun lien /en n'est émis.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  // Pattern redirections · single source of truth pour les renames d'URL.
  // Cf docs/11-url-redirects.md pour le workflow complet et les cas d'usage.
  // Ajoute ici toute redirection AVANT de renommer une URL en prod, sinon
  // Google perd le ranking de l'ancienne. Astro émet 308 par défaut (=301 SEO).
  redirects: {
    // Exemples (à dé-commenter si rename) :
    // '/ancienne-url': '/nouvelle-url',
    // '/old-blog-slug': { status: 301, destination: '/ressources/blog/new-slug' },
    // F1 hygiène d'index 2026-07-17 · règle '/careers' → '/agence/careers' SUPPRIMÉE :
    // la destination /agence/careers n'existe pas (301-vers-404, vérifié dist). Slug legacy
    // noindex, 0 lien entrant, aucune page careers réelle nulle part → suppression = 404 propre
    // (sortie clean de la couverture GSC). Le catch-all [...slug] ne génère plus /careers.
    // V-F1 2026-06-11 · docs/40 §2 (plan 301, item 3) : /archive (index legacy) supprimé.
    '/archive': '/',
    // Audit #60 A2 2026-07-16 · /agence/about (noindex, quasi-dupe de /agence) replié
    // dans /agence : les blocs uniques (« Faits clés » spec-bar + « 4 livrables »
    // deliverables-grid) sont migrés en sections cataloguées sur /agence.
    '/agence/about': '/agence',
    // Audit #60 A3 2026-07-16 · /partenaires (noindex, dupe de /technologies) replié
    // dans /technologies (stack couche par couche + Google Business Profile).
    '/partenaires': '/technologies',
    // Audit #60 A1 2026-07-16 · effondrement du silo /lp/ (9 landing noindex, squelette
    // identique, chacune avec une jumelle canonique indexée). Les 9 sources
    // src/content/lp/*.json + la route /lp/[...slug].astro + la collection `lp` sont
    // supprimées → ces 301 re-pointent vers la page canonique de chaque intention.
    // Le disallow robots.txt + le filtre sitemap `/lp/` restent (couvrent ces 301).
    '/lp/audit-ia-pme': '/audit-ia-pme',
    '/lp/audit-site-web-intelligent': '/audit-ia-pme',
    '/lp/content-marketing-intelligent': '/services/seo-geo-contenu',
    '/lp/diagnostic-maturite-ia': '/ressources/diagnostics/maturite-ia',
    '/lp/diagnostic-site-web-intelligent': '/ressources/diagnostics/maturite-ia',
    '/lp/exemple-industrialisation': '/cas-clients',
    '/lp/integrateur-claude': '/services/integration-claude',
    // 2026-07-17 · 301 /lp/site-web-intelligent levé : la LP1 du CdC strategy/16 vit désormais à cette URL.
    '/lp/tunnel-conversion-intelligent': '/services/landing-pages-tunnels',
    // /agence/hero-lab restauré 2026-06-11 (lab de comparaison des heros du catalogue) :
    // le 301 vers /agence/design-system est levé, la page répond 200 (noindex, outil interne).
    // 2026-06-29 · cibles /realisations corrigées → /cas-clients (hub réel). La route
    // /realisations N'EXISTE PAS (301-vers-404) ; le hub cas clients vit en /cas-clients
    // (strat 10 §3.5/§5). Re-ciblage des doublons SEO et des anciens slugs fictifs.
    '/ressources/cas': '/cas-clients',
    // plateau/halcyon/northbound/caserne = slugs de cas FICTIFS supprimés lors de la
    // recréation des vrais cas (#18 : amploi, balzeo, les-carnets-de-montpellier) →
    // re-ciblés sur l'index vivant /cas-clients (évite un 301-vers-404).
    '/ressources/cas/plateau': '/cas-clients',
    '/ressources/cas/halcyon': '/cas-clients',
    '/ressources/cas/northbound': '/cas-clients',
    '/ressources/cas/caserne': '/cas-clients',
    // /cas → /cas-clients (route hub cas clients)
    '/cas': '/cas-clients',
    // V-F1 2026-06-11 · pointait vers /archive (supprimé) : re-ciblé directement
    // vers la destination finale pour éviter une chaîne de 301.
    '/ressources/cas/virtuoseos': { status: 301, destination: '/' },
    // F1 hygiène d'index 2026-07-17 · les 2 slugs migrated-* pointaient vers
    // /ressources/veille-ia/* et /ressources/field-notes/* qui N'EXISTENT PAS (301-vers-404,
    // vérifié dist). On NE peut PAS simplement supprimer ces règles : le catch-all
    // '/ressources/blog/[...slug]' → '/blog/[...slug]' ci-dessous les capterait et 301-erait
    // vers /blog/migrated-* (également 404). Re-ciblage vers le hub vivant /blog (page réelle,
    // alternative sanctionnée par l'audit) → 0 301-vers-404. Slugs legacy noindex, 0 lien entrant.
    '/ressources/blog/migrated-veille-gpt-4o-vision-update': '/blog',
    '/ressources/blog/migrated-fieldnote-composable-adoption': '/blog',
    // 2026-06-29 · Migration URL : blog plat /ressources/blog/* → /blog/* (continuité SEO).
    // Le hub et tous les articles passent en URL plate ; 301 pour préserver le ranking
    // des anciennes URLs indexées. L'entrée [...slug] couvre tous les articles ; Astro
    // substitue le param du source dans la destination (doc redirects). Placées APRÈS les
    // 2 redirects migrated-* spécifiques ci-dessus (re-ciblés /blog, cf note F1).
    '/ressources/blog': '/blog',
    '/ressources/blog/[...slug]': '/blog/[...slug]',
    // 2026-06-16 · Cutover atelier DS → /library/* (décision docs/design-system/03 §11.2,
    // sign-off Simon 2026-06-15). Le catalogue/Studio/Hero Lab vivent désormais sous
    // /library/* (public mais non référencé : footer + noindex + redirects). Les pages
    // /agence/{design-system,ds-studio,hero-lab}.astro sont supprimées → ces 301 préservent
    // les URLs internes/indexées. Cibles existantes (pas de 301-vers-404). Avec l'adapter
    // static Vercel, Astro émet une 301 (GET) dans .vercel/output/config.json (doc Astro
    // « redirects » : status 301 par défaut, supporté en static adapter).
    // Apps-as-plugins (E1) · les 301 vers /library/* (cutover atelier + fiche detail
    // /components|/categories + taxonomie #34) sont conditionnees au flag atelier :
    // voir `atelierRedirects` en tete de fichier. Spread ici pour garder leur position.
    ...atelierRedirects,
    // V7-FOLD 2026-06-22 · refonte Phase 1 : la page service /tunnel-conversion-intelligent
    // (prod-live, indexée) est renommée /landing-page-scoring et absorbe le scoring.
    // 301 obligatoire pour préserver le ranking de l'ancienne URL.
    // MAJ V8 2026-07-13 · destination re-ciblée directement sur le slug final
    // /services/landing-pages-tunnels (évite une chaîne de 301, cf renames ci-dessous).
    '/services/tunnel-conversion-intelligent': '/services/landing-pages-tunnels',
    // Refonte V8 2026-07-13 · réorganisation des slugs services (vague « systèmes →
    // modules », carte décidée Simon). Les anciennes URLs prod-live indexées sont 301
    // vers les nouveaux slugs orientés requête réelle. Astro émet 308 (=301 SEO) en
    // adapter static. Placées AVANT le rename des fichiers de contenu (workflow doc/05).
    '/services/systeme-complet': '/services/systeme-acquisition',
    '/services/content-marketing-intelligent': '/services/seo-geo-contenu',
    '/services/landing-page-scoring': '/services/landing-pages-tunnels',
    '/services/machine-outbound': '/services/prospection-automatisee',
    // Audit #60 A5 2026-07-16 · gabarit interne `template-service-ref` sorti du routing
    // (visible:false → getStaticPaths). Le fichier de contenu reste la référence interne.
    '/services/template-service-ref': '/services',
    // (/secteurs/services-b2b : 301 désormais portée par REDIRECTED_PATHS, cible /services.)
    // Refonte V8 2026-07-12 · retitrage + renommage de slugs des 2 offres phares
    // (docs/strategy/10 §0bis.3, décisions Simon). Les anciennes URLs prod-live indexées
    // sont 301 vers les nouveaux slugs orientés requête réelle. Les URLs nues
    // /site-web-intelligent et /integrateur-claude (404 en prod) captent les liens entrants.
    '/services/site-web-intelligent': '/services/site-web-ia',
    '/services/integrateur-claude': '/services/integration-claude',
    '/site-web-intelligent': '/services/site-web-ia',
    '/integrateur-claude': '/services/integration-claude',
    // Pages enfants (déclinaisons) du hub : le dossier de contenu passe de
    // site-web-intelligent/ à site-web-ia/ → 301 des anciennes routes enfants.
    // MAJ pivot IA 2026-10 · les 3 déclinaisons sont fusionnées dans /services/site-web-ia :
    // destinations re-ciblées directement (évite une chaîne de 301).
    '/services/site-web-intelligent/wordpress': '/services/wordpress',
    '/services/site-web-intelligent/webflow': '/services/webflow',
    '/services/site-web-intelligent/sur-mesure': '/services/site-web-ia',
    // Wave #34 2026-06-28 · nettoyage taxonomie dégénérée du catalogue DS.
    // Catégories dé-dupliquées (slug singleton fusionné dans son équivalent) et
    // familles singleton repliées sur leur cible même-archétype. 301 pour préserver
    // les URLs /library/* internes/indexées (noindex). Cibles existantes (pas de 301-vers-404).
    // (E1) Ces 301 taxonomie /library/* → voir `atelierRedirects` (conditionnees au flag atelier).
    // Refonte v7 2026-06-29 · suppression du hub /offres (3-piliers / pyramide).
    // L'architecture v7 = 2 offres sous /services. audit-maturite-ia migré en page
    // top-level /audit-maturite-ia ; growth-system-ia supprimé (301 → /services).
    // Anciennes URLs /offres/* (et vestiges de l'arbo 3-piliers) redirigées 301.
    '/offres': '/services',
    // MAJ 2026-07-14 · /audit-maturite-ia dépublié (dilution audits) → ciblé
    // directement sur /audit-ia-pme pour éviter une chaîne de 301.
    '/offres/audit-maturite-ia': '/audit-ia-pme',
    '/offres/growth-system-ia': '/services',
    '/offres/site-web-ia': '/services/site-web-ia',
    '/offres/site-web-ia-landing': '/services/site-web-ia',
    '/offres/growth-intelligence': '/services',
    '/offres/revops': '/services',
    '/offres/conseil': '/services',
    '/offres/mcp-connectors': '/services',
    '/offres/agents-metiers': '/services',
    '/offres/audit-process-intelligence': '/services',
    // Refonte v7 2026-06-29 · suppression des 3 pages piliers (acquerir/operer/piloter).
    // L'architecture Solutions pointe désormais /services → 301 permanents.
    '/acquerir': '/services',
    '/operer': '/services',
    '/piloter': '/services',
    // Nettoyage dilution 2026-07-14 (validé Simon) · pages audits/diagnostics et
    // doorway local en doublon, dépubliées et 301 vers la surface canonique.
    // /audit-maturite-ia (diagnostic 47 critères) fusionné dans /audit-ia-pme
    // (section « diagnostic approfondi » migrée + grille scorecard réutilisée).
    '/audit-maturite-ia': '/audit-ia-pme',
    // 3 pages « résultats » mono-cas (agrégation d'un seul cas réel) repliées sur
    // les cas d'usage correspondants ; le cas réel (Amploi) y est intégré.
    '/cas-clients/resultats/qualification-commerciale': '/cas-usages/generer-plus-de-leads',
    '/cas-clients/resultats/automatisation-processus': '/cas-usages/standardiser-processus',
    '/cas-clients/resultats/centralisation-donnees': '/cas-usages/centraliser-donnees',
    // Doublon local doorway (placeholder NAP noindex) → page implantation canonique.
    '/agence-web-montpellier': '/implantations/montpellier',
    // Vague 1 carte kw (strategy/14, 2026-07-14) · le sous-arbre « résultats »
    // survivant cannibalisait /cas-usages (hub à moitié vide après les 3 301 ci-dessus).
    '/cas-clients/resultats': '/cas-usages',
    '/cas-clients/resultats/plus-de-leads': '/cas-usages/generer-plus-de-leads',
    '/cas-clients/resultats/reduction-temps-marketing': '/cas-usages/centraliser-donnees',
    // Cluster « déployer Claude » dédupliqué : la checklist est absorbée par le guide pilier.
    '/ressources/guides/checklist-deploiement-claude': '/ressources/guides/claude-pme',
    // Pivot IA 2026-10 · fusions (validées Simon). 16 pages dépubliées, fichiers de contenu
    // conservés ; même mécanisme que template-service-ref / services-b2b (exclusion du
    // routing + 301 ici). Source des ids exclus : src/data/depublished.ts.
    // Déclinaisons de service repliées dans leur page parente.
    '/services/integration-crm': '/services/crm-scoring-routing',
    '/services/relance-devis': '/services/sequences-de-suivi',
    '/services/maintenance-growth': '/services/site-web-ia',
    '/services/landing-page-google-ads': '/services/landing-pages-tunnels',
    '/services/publicite-en-ligne': '/services/landing-pages-tunnels',
    // Pages Claude en doublon de la page service (pages statiques renommées `_…astro`
    // pour sortir du routing, sources conservées) + démonstration dépubliée par id.
    '/expertise-claude': '/services/integration-claude',
    '/demonstrations/integration-claude': '/services/integration-claude',
    // Outil score (seo.noindex → route non générée) et page academy (renommée `_academy.astro`)
    // repliés sur le diagnostic de maturité.
    '/ressources/outils/score-maturite-ia': '/ressources/diagnostics/maturite-ia',
    '/ressources/academy': '/ressources/diagnostics/maturite-ia',
    // Refonte C 2026-10 · l'ancien index « structure » pour moteurs génératifs n'est plus
    // produit (llms.txt le remplace, structuré par silo) : l'URL connue garde une cible.
    '/llms-small.txt': '/llms.txt',
    // Intégration refonte IA 2026-10 · pages retirées à l'intégration (audit site web, anciens
    // diagnostics, pages « site web », page équipe, articles et secteurs hors positionnement).
    // Source unique : src/data/depublished.ts (les routes et les listings filtrent dessus).
    // Les cibles sont finales : les anciennes 301 qui pointaient une de ces pages ont été
    // re-ciblées ci-dessus (un seul saut, gate check-redirects).
    ...REDIRECTED_PATHS,
    // Ressources verrouillées (2026-10) : les PDF ne sont plus servis (déplacés hors public/,
    // livrés par e-mail). Les anciennes URL publiques redirigent vers la page de la ressource.
    '/telechargements/checklist-90-jours-claude-pme-waimia.pdf': { status: 301, destination: '/ressources/outils/checklist-90-jours-claude' },
    '/telechargements/charte-ia-pme-modele-waimia.pdf': { status: 301, destination: '/ressources/outils/charte-ia-entreprise' },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      // Sitemap = uniquement des URL publiques, canoniques, indexables, qui répondent 200.
      // Deux étages :
      //  1. ce filtre écarte ce qu'on SAIT ne pas vouloir (surfaces internes, pages de
      //     remerciement, landing pages de campagne, stubs noindex listés à la main) ;
      //  2. l'intégration sitemapHygiene (juste après) relit le HTML bâti et retire toute
      //     URL noindex, redirigée ou au canonical différent. C'est elle la garantie : une
      //     page qui passe en noindex sort du sitemap sans liste à tenir à jour.
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        if (NOINDEX_SITEMAP_PATHS.has(path)) return false;
        if (isInternalPath(path)) return false;
        return !path.startsWith('/bienvenue/') && path !== '/lp' && !path.startsWith('/lp/');
      },
      // lastmod RÉEL par URL (date de modification du contenu, jamais la date de build).
      // Une route sans date connue n'émet pas de lastmod plutôt qu'une date inventée.
      serialize: (item) => {
        const lastmod = lastmodFor(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
      // Espaces de noms inutilisés retirés de l'en-tête XML (pas d'actualités, de vidéos ni
      // d'alternates de langue sur un site monolingue).
      namespaces: { news: false, xhtml: false, image: false, video: false },
    }),
    sitemapHygiene(),
    // JSON-LD : normalisation des blocs émis par les composants + fil d'Ariane réparé ou
    // ajouté sur chaque page publique (cf src/integrations/seo-postbuild.mjs).
    seoPostbuild({ siteUrl: SITE.url, site: SITE_IDENTITY }),
    // robots.txt : un seul groupe pour tous les robots (cf src/integrations/robots.mjs).
    robots({
      userAgents: AI_USER_AGENTS,
      allow: ROBOTS_ALLOW,
      disallow: ROBOTS_DISALLOW,
      sitemap: `${SITE.url}/sitemap-index.xml`,
      llms: `${SITE.url}/llms.txt`,
    }),
    // GEO · sorties pour moteurs génératifs, limitées aux pages publiques indexables :
    // un .md par page, /llms.txt structuré par silo, /llms-full.txt. Remplace le couple
    // (@4hse/astro-llms-txt + ancien llms-md-pages) qui produisait ~4 100 .md et un
    // llms-full.txt de 5,7 Mo, catalogue interne compris.
    // L'en-tête (positionnement, offre, parcours et prix, formations, garde-fous, contact) est
    // dérivé des sources uniques : src/lib/seo/llms-summary.ts.
    llmsMdPages({
      siteUrl: SITE.url,
      summary: LLMS_SUMMARY,
      details: llmsDetails(),
    }),
    // DEV-ONLY : persistance git-based du DS Studio (bouton "Enregistrer").
    // Le hook astro:server:setup n'est actif que sous `astro dev` -> 0 impact
    // sur le static build (aucune fonction serverless en prod). Cf le fichier.
    dsSaveDev(),
    // Apps-as-plugins : les integrations des apps internes activees (registre
    // src/apps.config.ts) injectent leur route (ex. /dashboard-seo). Basculer
    // `enabled: false` sur une app la retire d'ici → route 404.
    // Refonte C 2026-10 · jamais montées dans le build de production (INTERNAL_TOOLS) :
    // /dashboard-seo, /library/* et l'endpoint /api/ds/chat n'existent plus sur waimia.com.
    ...(INTERNAL_TOOLS ? enabledAppIntegrations : []),
  ],
  // Cast `as any` parce que tailwindcss/vite et Astro embarquent leur propre
  // version de Vite — TS détecte un mismatch nominal mais runtime OK.
  //
  // ssr.noExternal : force le bundling SSR pour les routes prerender=false (/api/*).
  // Resend + @react-email ont des exports ESM/CJS incompatibles sans bundling explicite ;
  // ce flag s'applique uniquement aux Vercel Functions générées (prerender=false),
  // pas aux pages SSG. Conservé pour les futures API routes qui consommeront Resend.
  // (validé empiriquement le 2026-04-27 via /api/healthcheck OK post-bascule monorepo)
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    // DEV-ONLY · git worktrees n'ont pas leur propre node_modules (résolu vers le
    // repo parent, HORS racine worktree) → Vite `@fs` renvoie 403 sur le client
    // React et les îles n'hydratent pas sous `astro dev`. On autorise la remontée
    // jusqu'au parent. Sans effet sur le build statique (le bundling résout déjà tout).
    // DEV-ONLY · les brouillons ecrits par l'integration ds-save-dev (builder #39) ne doivent
    // PAS declencher de HMR/full-reload : sinon l'ile du builder se remonte et le canvas en cours
    // est perdu a chaque « Enregistrer » / « Enregistrer comme version » (exigence B8 : sauver
    // « sans reload complet »). On exclut donc ces fichiers de donnees du watcher Vite. Aucun impact
    // build (le watch ne concerne que le dev) ; ces fichiers ne sont lus qu'a la demande par l'API dev.
    server: {
      fs: { allow: ['.', '..', '../..'] },
      watch: { ignored: ['**/src/data/saved-sections.json', '**/src/data/page-variants/**'] },
    },
    ssr: {
      noExternal: ['resend', '@react-email/components', '@react-email/render'],
    },
  },
});
