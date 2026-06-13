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
  "/en/technologies/claude-code",
  "/en/technologies/claude-models",
  "/en/technologies/claude-surfaces",
  "/en/technologies/frameworks",
  "/offres/agents-metiers",
  "/offres/audit-process-intelligence",
  "/offres/mcp-connectors",
  // Page de référence interne (P0.3-b) : démontre la séquence canonique d'une page
  // de service. noindex (frontmatter seo.noindex) → hors sitemap pour cohérence crawl.
  "/offres/template-service-ref",
  "/technologies/claude-code",
  "/technologies/claude-surfaces",
  "/technologies/frameworks",
]);
