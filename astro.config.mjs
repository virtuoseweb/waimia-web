// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import robotsTxt from 'astro-robots-txt';
import llmsTxt from '@4hse/astro-llms-txt';
import tina from '@tinacms/astro/integration';
import llmsMdPages from './src/integrations/llms-md-pages';
import dsSaveDev from './src/integrations/ds-save-dev.mjs';
import { NOINDEX_SITEMAP_PATHS } from './src/data/sitemap-noindex-exclude';

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
  site: 'https://waimia.com',
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
    // R6 2026-06-10 · stub /careers dépublié (placeholder catch-all sans lien
    // entrant, en doublon d'intention avec la vraie page /agence/careers) →
    // redirect canonique pour préserver l'URL indexée.
    '/careers': '/agence/careers',
    '/en/careers': '/en/agence/careers',
    // V-F1 2026-06-11 · docs/40 §2 (plan 301, item 3) : /archive (index legacy) supprimé.
    '/archive': '/',
    // /agence/hero-lab restauré 2026-06-11 (lab de comparaison des heros du catalogue) :
    // le 301 vers /agence/design-system est levé, la page répond 200 (noindex, outil interne).
    // A4 cleanup 2026-05-10 · /ressources/cas/* → /cas/* (canonical) — doublon SEO supprimé
    '/ressources/cas': '/cas',
    '/ressources/cas/plateau': '/cas/plateau',
    '/ressources/cas/halcyon': '/cas/halcyon',
    '/ressources/cas/northbound': '/cas/northbound',
    '/ressources/cas/caserne': '/cas/caserne',
    // V-F1 2026-06-11 · pointait vers /archive (supprimé) : re-ciblé directement
    // vers la destination finale pour éviter une chaîne de 301.
    '/ressources/cas/virtuoseos': { status: 301, destination: '/' },
    // W4 2026-05-15 · Tunnel site-web-ia : anciennes URLs → nouvelle architecture collection
    '/offres/site-web-ia-tunnel': '/offres/site-web-ia/tunnel/1',
    '/offres/site-web-ia-tunnel/mecanique': '/offres/site-web-ia/tunnel/2',
    '/offres/site-web-ia-tunnel/preuves': '/offres/site-web-ia/tunnel/3',
    '/offres/site-web-ia-tunnel/conversion': '/offres/site-web-ia/tunnel/4',
    // SEO cleanup 2026-06-07 · vestiges de migration blog (migrated-*) dé-indexés
    // (seo.noindex) → redirigés vers l'URL canonique pour résorber le duplicate content.
    '/ressources/blog/migrated-veille-gpt-4o-vision-update': '/ressources/veille-ia/gpt-4o-vision-update',
    '/ressources/blog/migrated-fieldnote-composable-adoption': '/ressources/field-notes/composable-adoption',
  },
  integrations: [
    react(),
    mdx(),
    tina(),
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
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
          !page.includes('/commerce/')
        );
      },
    }),
    robotsTxt({
      policy: [
        { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/agence/ds-studio', '/agence/hero-lab', '/preview/', '/components/', '/categories/'] },
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
      sitemap: 'https://waimia.com/sitemap-index.xml',
      host: 'waimia.com',
    }),
    llmsTxt({
      title: 'Waimia',
      description:
        "Waimia est une agence qui aide les PME B2B (20 à 500 personnes) à adopter l'IA de façon concrète : automatisation des workflows, acquisition, productivité opérationnelle et gouvernance.",
      details: [
        "Waimia accompagne les dirigeants (DG, DAF, COO) de PME B2B dans l'intégration de l'intelligence artificielle au cœur de leurs opérations.",
        "Approche IA-first : chaque solution combine stratégie, mise en œuvre et montée en compétence des équipes.",
        "Domaines : automatisation (CRM, relances, process), acquisition (SEO/GEO, contenu), productivité opérationnelle, pilotage et gouvernance IA.",
        "Ressources : guides, cookbooks actionnables, études de cas, glossaire IA, comparatifs et école (formations).",
        '',
        "Chaque page est aussi disponible en version markdown : ajoutez .md à l'URL.",
      ].join('\n\n'),
      notes:
        '- Site officiel : https://waimia.com\n- Pages markdown individuelles : ajoutez .md à toute URL.',
      docSet: [
        {
          title: 'Contenu complet',
          description: 'Toutes les pages Waimia avec contenu intégral',
          url: '/llms-full.txt',
          include: ['!{preview/**,404}'],
          promote: ['solutions/**', 'offres/**', 'agence/**', 'contact/**'],
        },
        {
          title: 'Structure du site',
          description: 'Arborescence et titres des pages Waimia',
          url: '/llms-small.txt',
          include: ['!{preview/**,404}'],
          onlyStructure: true,
          promote: ['solutions/**', 'offres/**', 'agence/**'],
        },
      ],
    }),
    llmsMdPages({
      siteUrl: 'https://waimia.com',
      exclude: ['404', 'api/**', 'bienvenue/**', 'agence/design-system'],
    }),
    // DEV-ONLY : persistance git-based du DS Studio (bouton "Enregistrer").
    // Le hook astro:server:setup n'est actif que sous `astro dev` -> 0 impact
    // sur le static build (aucune fonction serverless en prod). Cf le fichier.
    dsSaveDev(),
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
    ssr: {
      noExternal: ['resend', '@react-email/components', '@react-email/render', '@tinacms/astro', '@tinacms/bridge'],
    },
  },
});
