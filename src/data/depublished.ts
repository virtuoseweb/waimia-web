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
