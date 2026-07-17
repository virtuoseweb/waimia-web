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
  "/en/blog",
  "/en/ressources/cas",
  "/en/ressources/cookbooks",
  // Stubs /technologies/* retirés (SEO état final §0ter) : route tree supprimé du
  // catch-all, expertise migrée vers /expertise-claude (indexable). Entrées no-op retirées.
  // Refonte v7 2026-06-29 · hub /offres supprimé + arbo 3-piliers (/offres/agents-metiers,
  // /offres/audit-process-intelligence, /offres/mcp-connectors + miroirs /en) : ces stubs
  // sont désormais des 301 (astro.config.mjs redirects), plus servis par le catch-all → no-op retirés.
  // Page de référence interne (P0.3-b, ADR-003) : démontre la séquence canonique d'une
  // page de service (servie sous /services). noindex (frontmatter seo.noindex) → hors
  // sitemap pour cohérence crawl.
  "/services/template-service-ref",
  // Hub /lp (routeur des 4 LP, CdC strategy/16, 2026-07-17) : trailingSlash 'never' →
  // l'URL « /lp » sans slash échappe au filtre préfixe '/lp/' d'astro.config ;
  // noindex (meta) → hors sitemap pour cohérence noindex↔crawl.
  "/lp",
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
  // Dashboard SEO (POC git-based, 2026-07-17) : outil interne (lecture + analyse PageSpeed
  // live), noindex (prop Base) + disallow robots.txt → hors sitemap pour cohérence noindex↔crawl.
  "/dashboard-seo",
  // (P1.3 2026-06-29) `/services/site-web-ia` RETIRÉ de l'exclusion : le contenu réel
  // est posé (seo.noindex:false, 0 placeholder vérifié) → money page #2 indexable + dans le
  // sitemap. Le commentaire « DÉMO placeholders / fiche 0004 » était stale.
  // (2026-07-14) `/agence-web-montpellier` retiré : page supprimée + 301 → /implantations/montpellier.
  // Page locale Bordeaux : seo.noindex tant que le NAP/GBP réel n'est pas posé (audit pré-lancement
  // 2026-07-14) → hors sitemap pour cohérence noindex↔crawl. Retirer cette entrée ET le noindex
  // de bordeaux.json quand les vraies coordonnées Bordeaux seront fournies.
  "/implantations/bordeaux",
  // Secteurs noindex (seo.noindex:true frontmatter) → hors sitemap pour cohérence noindex↔crawl.
  // (2026-07-14 vague 1) complétés par les 6 autres secteurs noindex (politique index ⟺ caseRef
  // réel, cf strategy/14 §4) détectés par le gate check-seo noindex-not-in-sitemap.
  // 2026-07-16 (post-audit #50) : batiment (caseRef desangles-peinture) et therapeutes (caseRef
  // isabelle-diaz-naturopathe) repassés index ⟹ retirés de cette liste pour entrer au sitemap.
  "/secteurs/services-b2b",
  "/secteurs/agence",
  "/secteurs/comptabilite",
  "/secteurs/conseil",
  "/secteurs/esn",
  "/secteurs/formation",
  "/secteurs/industrie",
  // F1 hygiène d'index 2026-07-17 (post-audit c-preuve §1a) : startup-logiciel repassé
  // noindex (seo.noindex:true frontmatter) → caseRef amploi hors-ICP SaaS. Réindexable
  // dès qu'un vrai cas éditeur/SaaS remplace le caseRef.
  "/secteurs/startup-logiciel",
  // Hubs noindex (politique hub < 3-5 enfants réels) encore listés dans le sitemap (gate 2026-07-14).
  "/implantations",
  "/ressources/comparatifs",
  "/ressources/guides",
  // Hub diagnostics (V7-FOLD Phase C) : noindex tant que < 3-5 enfants réels (2 pour l'instant :
  // maturite-ia, site-web-intelligent) → hors sitemap pour cohérence. Retirer quand le hub
  // listera ≥ 3-5 diagnostics complets (politique index-on-quality, strategy/10 §3).
  "/ressources/diagnostics",
  // Vague 1 carte kw (strategy/14, 2026-07-14) · cohérence noindex↔sitemap :
  // maquettes /lab/* + hub démos étaient noindex dans le HTML MAIS listés dans le sitemap.
  "/lab/home-d",
  "/lab/home-e",
  "/lab/home-e-method",
  "/demonstrations",
  // Nouveaux noindex vague 1 (dupes/nav pures, cf strategy/14 §4) :
  // about (quasi-dupe /agence) · partenaires (dupe /technologies) · plan du site (nav) ·
  // démo SWI (concurrence frontale avec la money page /services/site-web-ia).
  "/agence/about",
  "/partenaires",
  "/plan-du-site",
  "/demonstrations/site-web-intelligent",
  // F1 hygiène d'index 2026-07-17 (post-audit d-transverse §5) : hub /ressources/outils
  // passé noindex (prop noindex sur UtilityTemplate → Base) car thin (122 mots, listing 2
  // outils). Les 2 pages filles (calculateur-roi-ia, score-maturite-ia) RESTENT indexées.
  "/ressources/outils",
]);
