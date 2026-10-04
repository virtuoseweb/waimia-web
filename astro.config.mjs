// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import robotsTxt from 'astro-robots-txt';
import llmsTxt from '@4hse/astro-llms-txt';
import llmsMdPages from './src/integrations/llms-md-pages';
import dsSaveDev from './src/integrations/ds-save-dev.mjs';
import { NOINDEX_SITEMAP_PATHS } from './src/data/sitemap-noindex-exclude';
import { SITE } from './src/site.config.ts';
// Apps-as-plugins (fiche 0027 D3) : registre des apps internes extraites en packages.
// Chaque app enabled+extraite expose une AstroIntegration qui injecte sa route.
import { enabledAppIntegrations, APPS } from './src/apps.config.ts';

// Marque centralisée (fondation forkabilité, fiche 0027 D4) : source unique = SITE.
// Host nu (sans protocole) dérivé pour robots.txt `host`.
const SITE_HOST = new URL(SITE.url).host;

// Apps-as-plugins (E1) · redirections dont la DESTINATION est une route /library/*
// (servie par l'app extraite « atelier »). Astro leve InvalidRedirectDestination si la
// cible n'existe pas → ces 301 ne sont valides QUE lorsque l'atelier est monte. On les
// conditionne donc au flag APPS.atelier.enabled : atelier off → les routes /library/*
// ET ces redirections disparaissent ensemble (le reste du site public reste intact).
/** @type {Record<string, string>} */
const atelierRedirects = APPS.atelier?.enabled
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
// - i18n: FR default at /, EN at /en/* — content-routed for proper SEO/GEO
// - Tailwind v4 CSS-first
// - Sitemap auto-generated with hreflang
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
    isr: {
      expiration: 3600, // TTL par défaut 1h pour les futures routes SSR cachables
      bypassToken: process.env.ISR_BYPASS_TOKEN, // secret Vercel env var (preview bypass)
      // API routes exclues de l'ISR : données live, webhooks, forms — toujours fresh
      exclude: ['/api/contact', '/api/newsletter', '/api/academy', '/api/devis', '/api/lead-magnet', '/api/healthcheck'],
    },
  }),
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
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
    '/lp/audit-site-web-intelligent': '/audit-site-web-intelligent',
    '/lp/content-marketing-intelligent': '/services/seo-geo-contenu',
    '/lp/diagnostic-maturite-ia': '/ressources/diagnostics/maturite-ia',
    '/lp/diagnostic-site-web-intelligent': '/ressources/diagnostics/site-web-intelligent',
    '/lp/exemple-industrialisation': '/demonstrations',
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
    // Audit #60 A4 2026-07-16 · /secteurs/services-b2b (noindex, umbrella générique sans
    // angle propre : tous les verticaux SONT des services B2B) dépublié (visible:false).
    // 301 vers le hub /secteurs (qui joue déjà le rôle d'ombrelle). L'angle « l'acheteur
    // B2B s'auto-évalue » est reporté dans le hub.
    '/secteurs/services-b2b': '/secteurs',
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
    '/services/site-web-intelligent/wordpress': '/services/wordpress',
    '/services/site-web-intelligent/webflow': '/services/webflow',
    '/services/site-web-intelligent/sur-mesure': '/services/sur-mesure-headless',
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
    '/cas-clients/resultats/reduction-temps-marketing': '/cas-usages/reduire-reporting',
    // Cluster « déployer Claude » dédupliqué : la checklist est absorbée par le guide pilier.
    '/ressources/guides/checklist-deploiement-claude': '/ressources/guides/claude-pme',
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      // P0.2-I · lancement FR monolingue : sitemap FR only (plus de miroir /en).
      // Réactiver `en: 'en-US'` ici quand le miroir EN sera regénéré.
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
      // Filtre sitemap.xml :
      //  · /bienvenue/* : thank-you pages post-conversion (déjà noindex sur la page,
      //    pas de raison qu'elles soient crawlables/indexées)
      //  · /agence/design-system : showcase interne (déjà noindex)
      //  · /preview/* + /components/* : pages catalogue DS internes (déjà noindex,follow
      //    sur chaque page) — les lister dans le sitemap crée une incohérence
      //    noindex↔sitemap qui gaspille le budget crawl (148 URLs). Cf docs SEO.
      //  · /ecole/formation/* : route générique [type]/[slug] qui duplique la forme
      //    canonique /ecole/cours/{slug} (les formations sont rendues 2× — cf
      //    CourseDetailTemplate qui force le canonical vers /ecole/cours/). On retire
      //    la forme dupliquée du sitemap pour ne garder que la forme canonique.
      filter: (page) => {
        // Stubs noindex du catch-all [...slug].astro (routes de nav sans contenu
        // propre) : listés ici pour résorber l'incohérence noindex↔sitemap.
        // Liste figée data-driven (cf src/data/sitemap-noindex-exclude.ts).
        const path = new URL(page).pathname.replace(/\/$/, '');
        if (NOINDEX_SITEMAP_PATHS.has(path)) return false;
        return (
          !page.includes('/bienvenue/') &&
          !page.includes('/agence/design-system') &&
          !page.includes('/preview/') &&
          !page.includes('/components/') &&
          !page.includes('/ecole/formation/') &&
          // Catalogue DS interne + page de comparaison : noindex,follow → hors sitemap
          // (même famille que /preview/ et /components/, cohérence budget crawl).
          !page.includes('/categories/') &&
          !page.includes('/compare/') &&
          // Commerce détail (/commerce/product|subscription/*) : CTA Stripe placeholder
          // (liens test_/portail fictif) → pages noindex défensif tant que le checkout
          // réel n'est pas branché. Hors sitemap pour cohérence noindex↔crawl.
          !page.includes('/commerce/') &&
          // Landing pages (/lp/*) : noindex par défaut (ADR-003) → hors sitemap.
          !page.includes('/lp/') &&
          // Variantes A/B internes (/preview-v/*, /preview-swi/*) : noindex,follow →
          // hors sitemap pour cohérence noindex↔crawl (audit maillage 2026-07-14).
          !page.includes('/preview-v/') &&
          !page.includes('/preview-swi/') &&
          // Atelier DS interne (/library/* : hub + Studio + Hero Lab + catalogue) : public
          // mais non référencé (noindex + footer only, décision docs/design-system/03 §11.2)
          // → hors sitemap pour cohérence noindex↔crawl, comme /preview/ et /components/.
          !page.includes('/library/') &&
          !page.endsWith('/library')
        );
      },
    }),
    robotsTxt({
      policy: [
        { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/agence/cartographie', '/agence/ds-studio', '/agence/hero-lab', '/dashboard-seo', '/library/', '/preview/', '/preview-v/', '/preview-swi/', '/components/', '/categories/'] },
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'anthropic-ai', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Perplexity-User', allow: '/' },
        { userAgent: 'Google-Extended', allow: '/' },
        { userAgent: 'CCBot', allow: '/' },
        { userAgent: 'cohere-ai', allow: '/' },
        { userAgent: 'Bytespider', allow: '/' },
      ],
      sitemap: `${SITE.url}/sitemap-index.xml`,
      host: SITE_HOST,
    }),
    llmsTxt({
      title: SITE.name,
      description:
        "Waimia est un studio de conseil, d'intégration et de développement IA pour PME et ETI : automatisation métier, agents IA, applications métier.",
      details: [
        "Waimia accompagne les dirigeants (DG, DAF, COO) de PME et ETI de 10 à 250 collaborateurs dans l'intégration de l'intelligence artificielle au cœur de leurs opérations.",
        "Approche IA-first : chaque solution combine stratégie, mise en œuvre et montée en compétence des équipes.",
        "Domaines : automatisation (CRM, relances, process), acquisition (SEO/GEO, contenu), productivité opérationnelle, pilotage et gouvernance IA.",
        "Ressources : guides, études de cas, comparatifs, diagnostics et outils.",
        '',
        "Chaque page est aussi disponible en version markdown : ajoutez .md à l'URL.",
      ].join('\n\n'),
      notes:
        `- Site officiel : ${SITE.url}\n- Pages markdown individuelles : ajoutez .md à toute URL.`,
      docSet: [
        {
          title: 'Contenu complet',
          description: 'Toutes les pages Waimia avec contenu intégral',
          url: '/llms-full.txt',
          include: ['!{preview/**,404}'],
          promote: [
            'services/**',
            'secteurs/**',
            'agence/**',
            'contact/**',
          ],
        },
        {
          title: 'Structure du site',
          description: 'Arborescence et titres des pages Waimia',
          url: '/llms-small.txt',
          include: ['!{preview/**,404}'],
          onlyStructure: true,
          promote: [
            'services/**',
            'secteurs/**',
            'agence/**',
          ],
        },
      ],
    }),
    llmsMdPages({
      siteUrl: SITE.url,
      exclude: ['404', 'api/**', 'bienvenue/**', 'agence/design-system', 'library/**'],
    }),
    // DEV-ONLY : persistance git-based du DS Studio (bouton "Enregistrer").
    // Le hook astro:server:setup n'est actif que sous `astro dev` -> 0 impact
    // sur le static build (aucune fonction serverless en prod). Cf le fichier.
    dsSaveDev(),
    // Apps-as-plugins : les integrations des apps internes activees (registre
    // src/apps.config.ts) injectent leur route (ex. /dashboard-seo). Basculer
    // `enabled: false` sur une app la retire d'ici → route 404.
    ...enabledAppIntegrations,
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
