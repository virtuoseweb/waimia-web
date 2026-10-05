// Waimia · pages DÉPUBLIÉES par fusion (pivot IA 2026-10) · source unique.
//
// Même mécanisme que `template-service-ref` (audit #60 A5) : l'entrée est exclue du
// routing par son id dans getStaticPaths, le FICHIER DE CONTENU EST CONSERVÉ, et l'ancienne
// URL est redirigée en 301 dans le bloc `redirects` d'astro.config.mjs (cible ci-dessous).
// Tout consommateur qui LISTE une collection (hub, plan du site, cartographie) filtre sur
// ces ensembles pour ne jamais lier une URL redirigée.
//
// Autres dépublications du même lot, portées par un mécanisme déjà en place :
//  · /ressources/outils/score-maturite-ia : `seo.noindex: true` (la route outils et ses
//    listings filtrent déjà sur ce champ) → 301 /ressources/diagnostics/maturite-ia.
//  · /expertise-claude et /ressources/academy : pages statiques renommées avec un préfixe
//    `_` (src/pages/_expertise-claude.astro, src/pages/ressources/_academy.astro) pour
//    qu'Astro ne génère plus la route, sources conservées → 301.

/** Services dépubliés : id d'entrée (= `slug`) → slug du service cible de la 301. */
export const DEPUBLISHED_SERVICES: Readonly<Record<string, string>> = {
  'mvp-saas': 'applications-internes',
  'cold-email-b2b': 'prospection-automatisee',
  'integration-crm': 'crm-scoring-routing',
  'relance-devis': 'sequences-de-suivi',
  wordpress: 'site-web-ia',
  webflow: 'site-web-ia',
  'sur-mesure-headless': 'site-web-ia',
  'maintenance-growth': 'site-web-ia',
  'referencement-ia': 'seo-geo-contenu',
  'seo-local': 'seo-geo-contenu',
  'landing-page-google-ads': 'landing-pages-tunnels',
  'publicite-en-ligne': 'landing-pages-tunnels',
};

export const DEPUBLISHED_SERVICE_IDS: ReadonlySet<string> = new Set(Object.keys(DEPUBLISHED_SERVICES));

/** Démonstrations dépubliées (301 → /services/integration-claude). */
export const DEPUBLISHED_DEMONSTRATION_IDS: ReadonlySet<string> = new Set(['integration-claude']);

// ─── Intégration refonte IA (octobre 2026) · pages redirigées en 301, par chemin ───
//
// SOURCE UNIQUE des pages retirées à l'intégration : chemin source → cible finale (un seul
// saut, la cible est une page 200 indexable). Consommée par :
//  · astro.config.mjs (`redirects`) : la 301 elle-même ;
//  · chaque route (`getStaticPaths`) : la page source n'est plus générée ;
//  · les listings (hubs, plan du site, flux RSS, cartographie) et le maillage calculé
//    (src/lib/internal-mesh.ts) : aucun lien vers une URL redirigée.
// Les fichiers de contenu sont conservés. Les trois pages statiques concernées
// (/audit-site-web-intelligent, /equipe, /ressources/diagnostics) sont renommées avec un
// préfixe `_` pour sortir du routing (même mécanisme que `_expertise-claude.astro`).
export const REDIRECTED_PATHS: Readonly<Record<string, string>> = {
  // Audit « site web » replié sur l'audit IA (une seule porte d'entrée de conversion).
  '/audit-site-web-intelligent': '/audit-ia-pme',
  // Anciens diagnostics : un seul diagnostic public, celui de maturité IA.
  '/ressources/diagnostics/claude-pme': '/ressources/guides/claude-pme',
  '/ressources/diagnostics/referent-ia': '/ressources/diagnostics/maturite-ia',
  '/ressources/diagnostics/site-web-intelligent': '/ressources/diagnostics/maturite-ia',
  '/ressources/diagnostics': '/ressources/diagnostics/maturite-ia',
  // Pages « site web » hors positionnement, repliées sur la page service.
  '/demonstrations/avant-apres': '/services/site-web-ia',
  '/ressources/comparatifs/site-web-intelligent-vs-wordpress': '/services/site-web-ia',
  '/cas-usages/reduire-temps-cms': '/services/site-web-ia',
  // Cas d'usage reporting fusionné dans la centralisation des données.
  '/cas-usages/reduire-reporting': '/cas-usages/centraliser-donnees',
  // Studio solo : la page équipe est la page du fondateur.
  '/equipe': '/equipe/simon-beros',
  // Articles hors positionnement (agence web / marketing).
  '/blog/google-ads-vs-meta-ads-pme-2026': '/blog',
  '/blog/landing-page-qui-convertit-methode-2026': '/blog',
  '/blog/webflow-vs-wordpress-vs-site-code-ia-2026': '/blog',
  // Secteurs hors cible, sans cas client propre.
  '/secteurs/agence': '/services',
  '/secteurs/comptabilite': '/services',
  '/secteurs/conseil': '/services',
  '/secteurs/esn': '/services',
  '/secteurs/formation': '/services',
  '/secteurs/industrie': '/services',
  '/secteurs/services-b2b': '/services',
  '/secteurs/therapeutes': '/services',
  '/secteurs/liberal-independant': '/services',
  // Hubs retirés (décision Simon 2026-10) : les trois pages secteur et la démonstration
  // restantes restent publiées sans page d'index (batiment et e-commerce indexables depuis
  // le 2026-10-05, startup-logiciel en noindex faute de cas éditeur réel). Pages statiques renommées
  // `_index.astro` (src/pages/secteurs, src/pages/demonstrations) pour sortir du routing.
  '/secteurs': '/services',
  '/demonstrations': '/services',
};

/** Vrai si `pathname` est une page redirigée (donc ni générée, ni listée, ni liée). */
export function isRedirectedPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return Object.prototype.hasOwnProperty.call(REDIRECTED_PATHS, p);
}
