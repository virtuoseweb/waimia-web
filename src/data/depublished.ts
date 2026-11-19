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

// ─── Recentrage IA (décision de Simon du 19 novembre 2026) ───
//
// Waimia ne vend plus que l'IA métier (agents, automatisation, Claude, conformité, formation).
// Les OFFRES site web, SEO/GEO, acquisition et branding passent chez VirtuoseWeb, le studio
// frère : chaque page d'offre est redirigée en 301 vers la page équivalente de virtuoseweb.fr
// (lue dans son sitemap le 19 novembre 2026 ; branding sans équivalent → hub des services).
// Les pages ÉDITORIALES (articles, guides, comparatifs, grille) restent sur waimia.com et
// renvoient vers VirtuoseWeb (VIRTUOSE_SILO_SERVICE ci-dessous, et liens du contenu).
// Fichiers de contenu conservés. Pour défaire : retirer l'entrée de cette table.
export const VIRTUOSE_HOME = 'https://virtuoseweb.fr/';
export const VIRTUOSE_TARIFS = 'https://virtuoseweb.fr/tarifs/';

/** Page de VirtuoseWeb vers laquelle renvoie un silo qui n'a plus d'offre chez Waimia. */
export const VIRTUOSE_SILO_SERVICE: Readonly<Record<string, string>> = {
  web: 'https://virtuoseweb.fr/services/creation-site-internet-pme/',
  acquisition: 'https://virtuoseweb.fr/services/referencement-seo/',
};

export const MOVED_TO_VIRTUOSE: Readonly<Record<string, string>> = {
  '/services/site-web-ia': 'https://virtuoseweb.fr/services/creation-site-internet-pme/',
  '/services/webflow': 'https://virtuoseweb.fr/services/site-webflow/',
  '/services/wordpress': 'https://virtuoseweb.fr/services/site-wordpress/',
  '/services/shopify': 'https://virtuoseweb.fr/services/site-shopify/',
  '/services/lovable': 'https://virtuoseweb.fr/services/lovable/',
  '/services/sur-mesure-headless': 'https://virtuoseweb.fr/services/site-sur-mesure/',
  '/services/landing-pages-tunnels': 'https://virtuoseweb.fr/services/landing-page/',
  '/services/systeme-acquisition': 'https://virtuoseweb.fr/services/marketing-digital/',
  '/services/seo-geo-contenu': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/services/audit-seo-technique': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/services/redaction-seo-contenu': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/services/referencement-ia': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/services/seo-local': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/services/branding': 'https://virtuoseweb.fr/services/',
  '/services/identite-de-marque': 'https://virtuoseweb.fr/services/',
  '/services/refonte-de-marque': 'https://virtuoseweb.fr/services/',
  '/services/naming-et-positionnement': 'https://virtuoseweb.fr/services/',
  '/services/charte-graphique-brand-book': 'https://virtuoseweb.fr/services/',
  '/lp/site-web-intelligent': 'https://virtuoseweb.fr/services/creation-site-internet-pme/',
  '/lp/systeme-acquisition': 'https://virtuoseweb.fr/services/marketing-digital/',
  '/lp/visibilite-google-ia': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/demonstrations/site-web-intelligent': 'https://virtuoseweb.fr/realisations/',
  // Contenus qui vendaient l'offre web ou SEO de Waimia (méthode, paliers de prix) : 301 aussi.
  '/ressources/outils/grille-audit-site-internet': 'https://virtuoseweb.fr/services/refonte-site-web/',
  '/blog/audit-site-internet-pme': 'https://virtuoseweb.fr/services/refonte-site-web/',
  '/ressources/guides/cahier-des-charges-site-internet': 'https://virtuoseweb.fr/services/creation-site-internet/',
  '/ressources/guides/refonte-site-internet': 'https://virtuoseweb.fr/services/refonte-site-web/',
  '/ressources/guides/audit-geo-pme': 'https://virtuoseweb.fr/services/referencement-seo/',
  '/ressources/comparatifs/geo-vs-seo': 'https://virtuoseweb.fr/services/referencement-seo/',
};

/** Ids d'entrées `services` retirées par le recentrage (filtrées par la route et les listings). */
export const MOVED_SERVICE_IDS: ReadonlySet<string> = new Set(
  Object.keys(MOVED_TO_VIRTUOSE).filter((p) => p.startsWith('/services/')).map((p) => p.slice('/services/'.length)),
);

/** Services dépubliés : id d'entrée (= `slug`) → slug du service cible de la 301. */
export const DEPUBLISHED_SERVICES: Readonly<Record<string, string>> = {
  'integration-crm': 'crm-scoring-routing',
  'relance-devis': 'sequences-de-suivi',
  'maintenance-growth': 'site-web-ia',
  'landing-page-google-ads': 'landing-pages-tunnels',
  'publicite-en-ligne': 'landing-pages-tunnels',
};

export const DEPUBLISHED_SERVICE_IDS: ReadonlySet<string> = new Set([...Object.keys(DEPUBLISHED_SERVICES), ...MOVED_SERVICE_IDS]);

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
  '/demonstrations/avant-apres': 'https://virtuoseweb.fr/realisations/',
  '/ressources/comparatifs/site-web-intelligent-vs-wordpress': 'https://virtuoseweb.fr/services/site-wordpress/',
  '/cas-usages/reduire-temps-cms': 'https://virtuoseweb.fr/services/creation-site-internet-pme/',
  // Cas d'usage reporting fusionné dans la centralisation des données.
  '/cas-usages/reduire-reporting': '/cas-usages/centraliser-donnees',
  // Studio solo : la page équipe est la page du fondateur.
  '/equipe': '/equipe/simon-beros',
  // Article pilier renommé (slug sans jargon interne) : 301 vers la nouvelle URL.
  '/blog/essai-pillar-ia-pme-2026': '/blog/ia-pme-guide-complet-2026',
  // Articles hors positionnement (agence web / marketing).
  '/blog/landing-page-qui-convertit-methode-2026': 'https://virtuoseweb.fr/services/landing-page/',
  '/blog/webflow-vs-wordpress-vs-site-code-ia-2026': 'https://virtuoseweb.fr/comparatifs/wordpress-vs-webflow/',
  // Article publicitaire retiré sans redirection (9 impressions GSC, était en production) :
  // même cible que les pages publicitaires dépubliées (landing-page-google-ads).
  '/blog/google-ads-vs-meta-ads-pme-2026': 'https://virtuoseweb.fr/services/google-ads/',
  // Secteurs hors cible, sans cas client propre.
  '/secteurs/comptabilite': '/services',
  '/secteurs/formation': '/services',
  '/secteurs/services-b2b': '/services',
  '/secteurs/therapeutes': '/services',
  '/secteurs/liberal-independant': '/services',
  // Hubs retirés (décision Simon 2026-10) : les trois pages secteur et la démonstration
  // restantes restent publiées sans page d'index (batiment et e-commerce indexables depuis
  // le 2026-10-05, startup-logiciel en noindex faute de cas éditeur réel). Pages statiques renommées
  // `_index.astro` (src/pages/secteurs, src/pages/demonstrations) pour sortir du routing.
  '/secteurs': '/services',
  '/demonstrations': '/services',
  // Recentrage IA du 19 novembre 2026 : secteurs positionnés « site web et IA » (0 impression sur
  // 28 jours au 18/11/2026) redirigés vers le billet « IA par métier » du même secteur.
  '/secteurs/agence': '/blog/ia-agence-communication',
  '/secteurs/conseil': '/blog/ia-cabinet-conseil',
  '/secteurs/esn': '/blog/ia-esn',
  '/secteurs/industrie': '/blog/ia-pme-industrielle',
  // Hub de campagne /lp (noindex) : trois de ses quatre systèmes partis chez VirtuoseWeb.
  '/lp': '/services',
  // Recentrage IA du 19 novembre 2026 : pages parties chez Virtuose Web.
  ...MOVED_TO_VIRTUOSE,
};

/** Vrai si `pathname` est une page redirigée (donc ni générée, ni listée, ni liée). */
export function isRedirectedPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return Object.prototype.hasOwnProperty.call(REDIRECTED_PATHS, p);
}
