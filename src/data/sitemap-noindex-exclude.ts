// Waimia · sitemap-noindex-exclude.ts — AUTO-GÉNÉRÉ (data-driven, rule 18)
//
// Liste des stubs NOINDEX servis par le catch-all `src/pages/[...slug].astro`
// (routes de nav sans contenu propre). Ils sont `noindex,follow` mais étaient
// listés dans le sitemap → incohérence noindex↔sitemap (gaspillage budget crawl).
// On les retire du sitemap pour cohérence (cf astro.config.mjs filter).
//
// ⚠️ Liste figée vérifiée empiriquement (build → grep noindex ∩ sitemap).
// Régénérer si la liste `routes` du catch-all change OU si un stub gagne une vraie
// page : `npm run build` puis croiser HTML noindex × sitemap-0.xml (cf docs/16).
// R6 2026-06-10 · liste réduite aux SEULS stubs encore générés par le catch-all
// (purge des 65 stubs orphelins : leurs entrées étaient devenues des no-ops).
export const NOINDEX_SITEMAP_PATHS: ReadonlySet<string> = new Set([
  "/en/offres/agents-metiers",
  "/en/offres/audit-process-intelligence",
  "/en/offres/mcp-connectors",
  "/en/ressources/blog",
  "/en/ressources/cas",
  "/en/ressources/cookbooks",
  // Stubs /technologies/* retirés (SEO état final §0ter) : route tree supprimé du
  // catch-all, expertise migrée vers /expertise-claude (indexable). Entrées no-op retirées.
  "/offres/agents-metiers",
  "/offres/audit-process-intelligence",
  "/offres/mcp-connectors",
  // Page de référence interne (P0.3-b, ADR-003) : démontre la séquence canonique d'une
  // page de service (servie sous /services). noindex (frontmatter seo.noindex) → hors
  // sitemap pour cohérence crawl.
  "/services/template-service-ref",
  // Outils internes /agence (DS Studio + Hero Lab) : noindex,follow ET disallow robots.txt
  // → hors sitemap pour cohérence noindex↔crawl (2026-06-14).
  "/agence/ds-studio",
  "/agence/hero-lab",
  // Atelier DS sous /library/* (hub + Studio + Hero Lab + catalogue) : public mais non
  // référencé (noindex + footer only ET disallow robots.txt, décision docs/design-system/03
  // §11.2, sign-off Simon 2026-06-15) → hors sitemap pour cohérence noindex↔crawl. Les
  // sous-routes /library/[category] et /library/[type] sont déjà filtrées par le préfixe
  // `/library/` dans astro.config.mjs ; cette entrée couvre le hub exact (2026-06-16).
  "/library",
  "/library/studio",
  "/library/hero-lab",
  // Cartographie d'audit interne (toutes les pages réelles + statut SEO, outil de
  // décision garder/supprimer) : noindex (prop Base) → hors sitemap pour cohérence.
  "/agence/cartographie",
  // (P1.3 2026-06-29) `/services/site-web-intelligent` RETIRÉ de l'exclusion : le contenu réel
  // est posé (seo.noindex:false, 0 placeholder vérifié) → money page #2 indexable + dans le
  // sitemap. Le commentaire « DÉMO placeholders / fiche 0004 » était stale.
  // Page locale Montpellier : seo.noindex tant que le NAP/GBP/avis réels ne sont pas posés
  // (placeholder balisé) → hors sitemap pour cohérence noindex↔crawl. Retirer cette entrée
  // ET le noindex de la page quand les vraies coordonnées Montpellier seront fournies (2026-06-14).
  "/agence-web-montpellier",
  // Secteurs noindex (seo.noindex:true frontmatter) → hors sitemap pour cohérence noindex↔crawl.
  "/secteurs/batiment",
  "/secteurs/services-b2b",
  "/secteurs/therapeutes",
  // Hub diagnostics (V7-FOLD Phase C) : noindex tant que < 3-5 enfants réels (2 pour l'instant :
  // maturite-ia, site-web-intelligent) → hors sitemap pour cohérence. Retirer quand le hub
  // listera ≥ 3-5 diagnostics complets (politique index-on-quality, strategy/10 §3).
  "/ressources/diagnostics",
  // Piliers Acquérir/Piloter/Opérer (archi 3-piliers abandonnée, strat 10 §3.5) : neutralisés
  // noindex (prop Base) + retirés du menu/footer/home → hors sitemap pour cohérence noindex↔crawl.
  // Contenu conservé (réversible), pas supprimé.
  "/acquerir",
  "/piloter",
  "/operer",
]);
