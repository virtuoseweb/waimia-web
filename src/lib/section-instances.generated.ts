// @generated par scripts/gen-section-instances.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:section-instances
//
// Index d'INSTANCES des sections du catalogue (Bricks U1) : par type, chaque pose sur le
// site avec sa localisation (collection, fichier, route, position dans sections[]), ses
// métadonnées de variante (preset/variant/background si présents) et un label reconnaissable.
//   - SECTION_INSTANCES : instances issues des pages composables `src/content/**/*.json`.
//   - INLINE_CONSUMERS  : consommateurs hand-authored non scannables (pages .astro / templates
//     / .mdx), affichés en « inline » (non éditables par la vue instances).

export interface SectionInstance {
  /** Collection Astro (1er segment sous src/content/). */
  collection: string;
  /** Chemin du fichier source relatif à src/content/. */
  file: string;
  /** Slug de la page (frontmatter `slug` prioritaire, sinon chemin sans extension). */
  slug: string;
  /** Route publique quand connue (commence par '/'), sinon chemin source. */
  route: string;
  /** Position (0-based) de la section dans le tableau `sections[]` de la page. */
  index: number;
  /** Preset nommé si l'instance en porte un. */
  preset?: string;
  /** Variante si l'instance en porte une. */
  variant?: string;
  /** Fond (paper/paper-2/ink/...) si l'instance le précise. */
  background?: string;
  /** Libellé reconnaissable : 1er champ de titre non vide, fallback `#<index>`. */
  label: string;
}

export const SECTION_INSTANCES: Record<string, SectionInstance[]> = {
  "author-byline": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 3,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 8,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 3,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 5,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 5,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 9,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 3,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 8,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 1,
      "label": "Simon Beros",
      "background": "paper"
    }
  ],
  "bento-grid": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 3,
      "label": "Les briques qui vous rendent vos jours",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 3,
      "label": "Les briques qui vous rendent le temps",
      "background": "ink"
    }
  ],
  "branded-callout": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 6,
      "label": "Pas encore de réalisation Waimia sur cette fonction",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 7,
      "label": "Pas encore de réalisation Waimia sur cette fonction",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 6,
      "label": "Un projet en cours, pas encore de résultat publié",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 5,
      "label": "Un seul axe faible fait échouer le déploiement.",
      "background": "ink"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 4,
      "label": "Trois non, et c'est une vitrine.",
      "background": "ink"
    }
  ],
  "case-card-grid": [
    {
      "collection": "lp",
      "file": "lp/hub.json",
      "slug": "hub",
      "route": "/lp/hub",
      "index": 3,
      "label": "Trois PME, trois résultats concrets",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 5,
      "label": "Trois PME, trois résultats concrets.",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 7,
      "label": "Trois PME, trois résultats concrets",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 8,
      "label": "Trois PME, le répétitif passé en système.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 8,
      "label": "Trois PME, trois résultats concrets.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 7,
      "label": "Deux projets voisins : le routage des demandes, et l'agent sous validation",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 8,
      "label": "Un cas en cours, et le projet interne qui pose les garde-fous",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 7,
      "label": "Pas de cas de facturation publié : deux projets où l'agent lit, extrait puis passe la main",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 7,
      "label": "Trois réalisations avec des agents",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 9,
      "label": "Deux projets où la technique a compté",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 8,
      "label": "Deux chantiers où du contenu est produit et publié avec l'IA",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 7,
      "label": "Deux projets où la saisie manuelle a disparu",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 8,
      "label": "Des outils internes déjà construits, pour le studio",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 8,
      "label": "Deux réalisations avec une base de connaissance",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 9,
      "label": "Un connecteur en production : du formulaire au CRM, sans ressaisie",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 7,
      "label": "Deux projets : demandes routées sans ressaisie, abonnements gérés automatiquement",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 12,
      "label": "Trois réalisations autour de Claude et de MCP",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 9,
      "label": "Un abonnement payant, des prototypes, un produit en construction",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 9,
      "label": "Un espace membre déjà livré",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 8,
      "label": "Deux projets où le contenu est au cœur du travail",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 9,
      "label": "Deux projets avec une couche GEO",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 7,
      "label": "Trois projets de ce volet",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 9,
      "label": "Deux projets où la proximité a compté",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 9,
      "label": "Aucune boutique Shopify publiée : une migration e-commerce mesurée, sous WooCommerce",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 7,
      "label": "Trois projets de ce volet",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 8,
      "label": "Un site Astro livré, et un retour du headless vers WordPress",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 4,
      "label": "Des missions réelles, documentées",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 7,
      "label": "Des missions réelles, documentées",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 5,
      "label": "Des missions réelles, documentées",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 8,
      "label": "Aucune fiche Webflow publiée : un site Astro et une migration WordPress, sur d'autres plateformes",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 9,
      "label": "Deux projets WordPress publiés",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 9,
      "label": "Trafic mieux converti sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 9,
      "label": "Tenus sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 9,
      "label": "Du trafic mieux transformé sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    }
  ],
  "code-showcase": [
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 5,
      "label": "Exemple de SKILL.md : un en-tête de deux champs, puis une procédure en texte",
      "background": "paper-2"
    }
  ],
  "comparison-duo": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 5,
      "label": "Le score automatique contre l'échange",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 2,
      "label": "Exemple type : le comité de direction mensuel d'une PME",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 2,
      "label": "Exemple type : une PME de services aux entreprises",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 4,
      "label": "Du copier-coller au reporting prêt",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 4,
      "label": "Du chantier WordPress à l'édition autonome",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 2,
      "label": "Exemple type : l'ouverture d'un dossier client dans un cabinet",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 2,
      "label": "Une vitrine regarde vos prospects partir. Un système les retient.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 3,
      "label": "Pourquoi un système instrumenté change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 3,
      "label": "Un chatbot de plus récite. Un système exécute et rend compte.",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 3,
      "label": "Invisible aux moteurs. Ou trouvable et cité.",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 4,
      "label": "La même PME, deux trajectoires",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 6,
      "label": "La même demande de SAV, traitée par une automatisation puis par un agent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 11,
      "label": "Claude Code ou un IDE assisté comme Cursor : pas le même métier",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 12,
      "label": "Quand acheter et configurer Claude seul, quand se faire accompagner",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 11,
      "label": "Ce qui passe par Claude, ce qui reste dehors",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 14,
      "label": "Quand le faire vous-même, quand le faire faire",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 11,
      "label": "Quand vous n'avez pas besoin de Waimia",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 6,
      "label": "Exemple type : une entreprise de services qui envoie trente devis par mois",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 9,
      "label": "n8n Cloud ou auto-hébergé : ce que vous payez en argent, ce que vous payez en temps",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 6,
      "label": "Balzeo : une boutique migrée sans perdre ses URL",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 4,
      "label": "Exemple type : les demandes du site d'une PME de services",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 5,
      "label": "Exemple type : le SAV d'un distributeur B2B",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 4,
      "label": "Exemple type : les factures fournisseurs d'une PME de services",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 4,
      "label": "Exemple type : la boîte contact@ d'une PME de services",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 4,
      "label": "Exemple type : le suivi d'interventions d'une entreprise de maintenance",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 7,
      "label": "Un audit se juge à ce qu'on en corrige",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 5,
      "label": "Exemple type : l'ouverture d'un dossier après la signature d'un devis",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 4,
      "label": "Exemple type : les factures fournisseurs reçues par email",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 4,
      "label": "Exemple type : la demande de devis reçue par formulaire",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 6,
      "label": "Exemple type : une PME avec cinq outils",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 3,
      "label": "Exemple type : une charte qui sert, ou qui dort",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 8,
      "label": "Exemple type : une PME de négoce de 60 personnes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 4,
      "label": "Exemple type : les demandes entrantes d'une PME industrielle",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 4,
      "label": "Exemple type : le reporting mensuel d'une PME de services",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 4,
      "label": "Exemple type : un cabinet de trois personnes",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 6,
      "label": "Exemple type : une équipe commerciale qui utilise ChatGPT chacune de son côté",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 8,
      "label": "Exemple type : un bureau d'études de 40 personnes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 6,
      "label": "Exemple type : un cabinet qui traite des dossiers confidentiels",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 4,
      "label": "Exemple type : la page d'offre d'un organisme de formation",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 4,
      "label": "Exemple type : nommer une nouvelle offre",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 4,
      "label": "Ce que change un portail pour vos clients",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 4,
      "label": "Exemple type : un éditeur de logiciel B2B sans équipe de prospection",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 6,
      "label": "Un robot d'envoi ou une file de tâches validée",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 5,
      "label": "Un texte pour la requête, ou un texte pour remplir",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 5,
      "label": "Pourquoi un passage citable change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 4,
      "label": "Exemple type : une PME de services de douze ans",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 6,
      "label": "Exemple type : le rapport mensuel d'un prestataire à son client",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 4,
      "label": "Exemple type : la page service d'une PME de maintenance",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 5,
      "label": "Pourquoi un maillage local change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 4,
      "label": "Exemple type : les devis d'une entreprise du bâtiment",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 5,
      "label": "Exemple type : une boutique de produits d'entretien",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 4,
      "label": "Exemple type : le site d'un cabinet de conseil",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 6,
      "label": "Exemple type : un éditeur de logiciel B2B de petite taille",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 5,
      "label": "Exemple type : le site d'une société de conseil industriel",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 3,
      "label": "Externaliser à une agence de SDR, ou installer un système",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 6,
      "label": "Un tableau qui informe, ou un tableau qui décore",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 10,
      "label": "Le pipeline avant et avec le système",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 5,
      "label": "Exemple type : le site d'un cabinet d'architectes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 5,
      "label": "Exemple type : le site d'un cabinet comptable",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 4,
      "label": "Pourquoi un CRM branché change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 4,
      "label": "Pourquoi une landing dédiée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 4,
      "label": "Pourquoi un site entretenu et poussé change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 4,
      "label": "Pourquoi une régie instrumentée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 4,
      "label": "Pourquoi une relance instrumentée change l'équation",
      "background": "paper-2"
    }
  ],
  "comparison-table": [
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 2,
      "label": "Claude Code face à Cursor, capacité par capacité (6 octobre 2026)",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 2,
      "label": "Claude vs ChatGPT : prix, données, outils",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 2,
      "label": "GEO et SEO, ligne à ligne",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 2,
      "label": "Le face-à-face, critère par critère",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 4,
      "label": "Ce que contient chaque offre",
      "background": "paper"
    }
  ],
  "cta-final": [
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 5,
      "label": "Classez vos tâches avant de choisir le premier cas",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 8,
      "label": "Classez vos tâches avant de choisir le premier cas",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 5,
      "label": "Où en est votre entreprise avec l'IA ?",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 6,
      "label": "Chiffrez le gain avant de vous engager",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 4,
      "label": "Chiffrez le gain avant de vous engager",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 4,
      "label": "Classez vos tâches avant de choisir le premier cas",
      "background": "paper-2"
    }
  ],
  "cta-form-inline": [
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 9,
      "label": "Abonnement, API, Bedrock ou Vertex : recevez le guide d'achat Claude (PDF, 14 pages)",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 6,
      "label": "Vous penchez pour Claude ? Recevez le guide d'achat pour PME (PDF, 14 pages)",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 10,
      "label": "Fixez vos règles d'usage de l'IA avant qu'un prestataire touche vos données",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 10,
      "label": "Recevez le guide d'achat Claude pour PME",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 7,
      "label": "Recevez le kit conformité et administration de Claude (PDF, 11 pages)",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 7,
      "label": "Recevez le guide d'achat Claude pour PME (PDF, 14 pages)",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 13,
      "label": "Recevez la checklist des 90 jours pour déployer Claude (PDF, 5 pages)",
      "background": "paper-2"
    }
  ],
  "data-table": [
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 3,
      "label": "Les cinq niveaux de préparation, ligne par ligne",
      "background": "paper-3"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 3,
      "label": "Cinq signaux qu'un référent devient nécessaire",
      "background": "paper-3"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 3,
      "label": "Vitrine subie ou site qui qualifie",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 5,
      "label": "Quelle offre pour quelle situation",
      "background": "paper-2"
    }
  ],
  "decision-list": [
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 4,
      "label": "Six signaux qui trahissent un site figé",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 4,
      "label": "Six questions pour le savoir",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 3,
      "label": "Trois situations, trois premiers pas",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 4,
      "label": "Le bon outil selon votre situation",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 8,
      "label": "Dans quels cas chacune convient",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 7,
      "label": "Choisir selon votre situation",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 5,
      "label": "Notre verdict, situation par situation",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 4,
      "label": "Six repères pour doser GEO et SEO",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 4,
      "label": "Notre verdict, situation par situation",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 5,
      "label": "Notre verdict, situation par situation",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 5,
      "label": "Le bon outil dépend de votre ambition",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 6,
      "label": "Six questions pour jauger votre préparation",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 6,
      "label": "Six questions pour trancher",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 5,
      "label": "Six questions pour situer votre site",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 8,
      "label": "Cinq questions pour savoir si on vous vend un agent, un chatbot ou une automatisation",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 7,
      "label": "Si vous déployez un système à haut risque : ce que l'article 26 demandera au 2 décembre 2027",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 13,
      "label": "Les cas où Waimia n'est pas le bon choix",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 11,
      "label": "La règle de choix, cas par cas",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 20,
      "label": "Six cas où vous n'avez pas besoin de Waimia",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 15,
      "label": "Les cas où vous n'avez pas besoin de nous",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 3,
      "label": "Les quatre éléments à écrire avant d'ouvrir un outil",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 6,
      "label": "Huit questions à poser avant de brancher un serveur MCP",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 3,
      "label": "Ce qu'il faut réunir avant de lancer une refonte",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 6,
      "label": "Un agent de qualification n'est pas utile si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 7,
      "label": "Un chatbot de support n'est pas utile si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 6,
      "label": "Un agent de traitement de documents n'est pas utile si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 6,
      "label": "Un agent IA n'est pas la bonne réponse si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 6,
      "label": "Ne faites pas développer d'application si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 8,
      "label": "Ce n'est pas le bon investissement si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 8,
      "label": "Make n'est pas le bon choix si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 6,
      "label": "n8n n'est pas le bon choix si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 7,
      "label": "Ce qu'on refuse, et quand ne pas le faire",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 6,
      "label": "N'automatisez pas si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 7,
      "label": "Prenez un outil du marché si",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 8,
      "label": "Ne nous confiez pas votre marque si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 8,
      "label": "Ne centralisez pas si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 7,
      "label": "Ne commandez pas de charte si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 8,
      "label": "Le cold email ne convient pas si",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 10,
      "label": "Vous n'avez pas besoin d'un consultant IA si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 6,
      "label": "N'automatisez pas votre CRM si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 6,
      "label": "Ne lancez pas ce chantier si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 8,
      "label": "Cette offre n'est pas la bonne si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 11,
      "label": "Ne déployez pas Claude si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 6,
      "label": "Une landing page ne changera rien si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 8,
      "label": "Ne faites pas développer de MVP SaaS si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 8,
      "label": "Ne changez pas de nom si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 8,
      "label": "Ne faites pas développer de portail si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 6,
      "label": "La prospection automatisée ne convient pas si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 8,
      "label": "La prospection LinkedIn préparée ne convient pas si",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 7,
      "label": "Ce n'est pas le bon investissement si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 8,
      "label": "Ce n'est pas le bon investissement si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 8,
      "label": "Une refonte n'est pas utile si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 8,
      "label": "Ne l'automatisez pas si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 6,
      "label": "Ce n'est pas le bon investissement si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 8,
      "label": "Ce n'est pas le bon investissement si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 6,
      "label": "N'automatisez pas vos devis si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 6,
      "label": "Ne nous confiez pas votre site si",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 8,
      "label": "Le social selling assisté par IA ne convient pas si",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 8,
      "label": "Ne commandez pas ce tableau si",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 4,
      "label": "Six questions pour repérer le bon candidat",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 2,
      "label": "À l'issue, vos équipes savent",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 3,
      "label": "Niveau 1 : à l'issue, vous savez utiliser ChatGPT",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 5,
      "label": "Niveau 2 : à l'issue, vous savez étendre ChatGPT",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 7,
      "label": "Niveau 3 : vous construisez un système IA sur la plateforme d'OpenAI ou avec Codex",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 3,
      "label": "Objectifs visés : développer avec l'IA et la piloter",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 4,
      "label": "Niveau 1 : à l'issue, vous savez utiliser Claude",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 6,
      "label": "Niveau 2 : à l'issue, vous savez étendre Claude",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 8,
      "label": "Niveau 3 : à l'issue, vous savez construire un système IA avec Claude",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 2,
      "label": "À l'issue, vos équipes savent",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 2,
      "label": "À l'issue, vos équipes savent",
      "background": "paper"
    }
  ],
  "definition-extract": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 3,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    }
  ],
  "deliverables-grid": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 1,
      "label": "Un plan priorisé, pas un rapport qui dort",
      "background": "paper-2"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 4,
      "label": "Ce que Waimia fait concrètement",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 7,
      "label": "Ce que vous récupérez concrètement.",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 7,
      "label": "Ce que vous récupérez concrètement.",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 7,
      "label": "Ce que vous récupérez concrètement.",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 6,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 6,
      "label": "Ce que vous recevez",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 6,
      "label": "Développement Make : ce qui est livré",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 6,
      "label": "Ce qui vous reste si vous arrêtez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 6,
      "label": "Ce que vous récupérez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 5,
      "label": "L'architecture en mots simples",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 7,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 5,
      "label": "Les livrables",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 7,
      "label": "Ce qui vous reste si vous arrêtez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 9,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 6,
      "label": "Les livrables",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 7,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 9,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 7,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 6,
      "label": "Ce que vous récupérez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 6,
      "label": "Les livrables",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 6,
      "label": "Ce que vous récupérez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 5,
      "label": "Ce qui vous reste si vous arrêtez",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 7,
      "label": "Ce qui vous reste si vous arrêtez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 6,
      "label": "Ce que vous gardez",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 6,
      "label": "Les livrables",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 7,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 6,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 7,
      "label": "Ce qui vous reste si vous arrêtez",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 6,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 4,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 7,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 8,
      "label": "Ce qu'ondépose chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 6,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 6,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 6,
      "label": "Ce qu'on branche chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 6,
      "label": "Ce qu'on dépose chaque mois",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 6,
      "label": "Ce qu'on branche chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    }
  ],
  "diagnostic-stages": [
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 2,
      "label": "Prêts, presque, ou pas encore ?",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 1,
      "label": "Les cinq niveaux de la grille",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 2,
      "label": "Quand un référent devient nécessaire",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 2,
      "label": "Où en est votre site ?",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 4,
      "label": "Cinq stades de maturité pipeline",
      "background": "paper"
    }
  ],
  "direct-answer": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 0,
      "label": "#0",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    }
  ],
  "editorial-callout": [
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 5,
      "label": "#5",
      "variant": "warn",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 9,
      "label": "#9",
      "variant": "note",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 11,
      "label": "#11",
      "variant": "note",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 8,
      "label": "#8",
      "variant": "note",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 8,
      "label": "#8",
      "variant": "note",
      "background": "paper"
    }
  ],
  "editorial-prose": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 0,
      "label": "#0",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 5,
      "label": "#5",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 6,
      "label": "#6",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 5,
      "label": "#5",
      "background": "paper-2"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 6,
      "label": "#6",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 5,
      "label": "#5",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 14,
      "label": "#14",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 5,
      "label": "#5",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 9,
      "label": "#9",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 6,
      "label": "#6",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 9,
      "label": "#9",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 5,
      "label": "#5",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 13,
      "label": "#13",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 9,
      "label": "#9",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 9,
      "label": "#9",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 9,
      "label": "#9",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 12,
      "label": "#12",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 12,
      "label": "#12",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 15,
      "label": "#15",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 16,
      "label": "#16",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 18,
      "label": "#18",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 12,
      "label": "#12",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 8,
      "label": "#8",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 13,
      "label": "#13",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 6,
      "label": "#6",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 9,
      "label": "#9",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 8,
      "label": "#8",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 11,
      "label": "#11",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 8,
      "label": "#8",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 14,
      "label": "#14",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 8,
      "label": "#8",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 8,
      "label": "#8",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 3,
      "label": "#3",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 6,
      "label": "#6",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 5,
      "label": "#5",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 4,
      "label": "#4",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 7,
      "label": "#7",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 11,
      "label": "#11",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 11,
      "label": "#11",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 6,
      "label": "#6",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 11,
      "label": "#11",
      "background": "paper"
    }
  ],
  "editorial-table-block": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 2,
      "label": "Les tâches comptables, classées par rentabilité probable et par risque",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 3,
      "label": "Les tâches RH, classées par rentabilité probable et par risque",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 2,
      "label": "Les tâches du support, classées par rentabilité probable et par risque",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 4,
      "label": "Claude Platform et OpenAI Platform, critère par critère",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 4,
      "label": "Ce qui a bougé chez Claude et ChatGPT, et ce que ça change",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 3,
      "label": "CRM du marché, troisième voie, CRM sur mesure : critère par critère",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 2,
      "label": "n8n vs Make, critère par critère",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 2,
      "label": "n8n, Make et Zapier, critère par critère",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 3,
      "label": "Assistant, automatisation, agent IA : le tableau pour les distinguer",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 9,
      "label": "Ce que coûte l'usage : la même tâche en automatisation et en agent",
      "variant": "editorial",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 10,
      "label": "Cinq pannes d'agent, comment on les voit, et le garde-fou",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 5,
      "label": "Le calendrier de l'AI Act au 6 octobre 2026",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 4,
      "label": "Agence IA, freelance, éditeur, équipe interne : le comparatif honnête",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 7,
      "label": "La grille de décision : huit critères, trois éliminatoires",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 12,
      "label": "Huit points à écrire dans le devis ou le contrat",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 4,
      "label": "Dix fonctions de Claude Code, et à quoi elles servent en entreprise",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 8,
      "label": "Où Claude Code est inclus, et à quel prix",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 12,
      "label": "Trois façons de démarrer avec Claude Code, et quand chacune est la bonne",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 3,
      "label": "Claude Cowork avant et après la fusion",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 7,
      "label": "Claude Cowork prix : inclus dans les offres payantes",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 3,
      "label": "Idées reçues sur Claude Design, corrigées au 5 octobre 2026",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 7,
      "label": "Claude Design prix : inclus dans les offres payantes de Claude",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 9,
      "label": "Quatre usages concrets en PME, et ce qui reste à faire",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 4,
      "label": "Les offres Claude, ligne par ligne",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 8,
      "label": "Fonctionnalités, administration et données : la matrice par offre",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 5,
      "label": "Les 12 commandes du plugin et ce qu'elles valent en France",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 8,
      "label": "Pennylane, Qonto, Sage, PayFit : qui se branche à Claude",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 5,
      "label": "Les cinq briques d'un plugin et où chacune fonctionne",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 7,
      "label": "Six usages concrets en PME, plugin par plugin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 10,
      "label": "Cinq usages qui se mesurent vite",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 19,
      "label": "Ce que chaque option demande, et ce qu'elle coûte",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 5,
      "label": "Entraînement, rétention, contrat : offre par offre",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 7,
      "label": "Registre, analyse d'impact, politique d'usage, DPA : ce que chacun fait",
      "variant": "editorial",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 7,
      "label": "Quatre surfaces, quatre façons d'installer et de partager",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 10,
      "label": "Six exemples concrets, avec ce qu'il faut leur donner",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 4,
      "label": "Ce qui compose le prix d'un agent IA",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 7,
      "label": "Trois budgets mensuels de fonctionnement, hypothèses écrites",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 5,
      "label": "La grille des offres Claude, en dollars",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 8,
      "label": "Les heures par poste : des exemples, pas un devis",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 11,
      "label": "Les trois exemples côte à côte, sans les additionner",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 5,
      "label": "Quatre façons d'automatiser un devis, et le cas qui correspond à chacune",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 6,
      "label": "Chaque fait, sa source, sa date",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 4,
      "label": "Intégration classique ou serveur MCP",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 10,
      "label": "MCP dans les plateformes de Claude et d'OpenAI",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 4,
      "label": "Les offres n8n, ligne par ligne",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 7,
      "label": "Les cinq postes de coût d'une automatisation n8n",
      "variant": "editorial",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 10,
      "label": "Trois budgets mensuels de fonctionnement, hypothèses écrites",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 7,
      "label": "Corriger, refondre ou migrer : ce que chaque option touche",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 5,
      "label": "Le coût complet : six postes, dont trois qu'on oublie",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 7,
      "label": "Exemple illustratif : la saisie de factures fournisseurs",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 9,
      "label": "Le tableau de calcul, ligne par ligne",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 5,
      "label": "Les cinq critères, et comment les mesurer",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 7,
      "label": "Selon le profil de la tâche, quoi faire",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 8,
      "label": "Par fonction : le bon premier candidat",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 6,
      "label": "Six questions à poser à un consultant IA avant de signer",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 4,
      "label": "De l'application d'équipe à l'agent sur mesure",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 4,
      "label": "Quelle offre Claude pour votre équipe",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 4,
      "label": "Les critères qui décident, un par un",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 4,
      "label": "Format court ou format long : ce qui change",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 8,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 2,
      "label": "Les trois niveaux de la formation ChatGPT",
      "variant": "default",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 10,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 2,
      "label": "Faire faire par l'IA, ou développer avec l'IA",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 4,
      "label": "Les outils et plateformes couverts, relus le 12 octobre 2026",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 7,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 2,
      "label": "Les trois niveaux de la formation Claude",
      "variant": "default",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 12,
      "label": "Formation Waimia, ressources gratuites ou cursus long : comment choisir",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 14,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 4,
      "label": "Format court ou format long : ce qui change",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 7,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 4,
      "label": "Format court ou format long : ce que chacun couvre",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 7,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    }
  ],
  "editorial-timeline": [
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 2,
      "label": "Le calendrier de l'AI Act",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 6,
      "label": "Claude Cowork en six étapes, de janvier à septembre 2026",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 7,
      "label": "Comment se passe une mission Make",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 7,
      "label": "De la première question au déploiement",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 3,
      "label": "Le programme, module par module",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 4,
      "label": "Programme du niveau 1 : utiliser l'application ChatGPT",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 6,
      "label": "Programme du niveau 2 : étendre ChatGPT avec des GPT et des applications",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 8,
      "label": "Programme du niveau 3 : parcours plateforme, parcours Codex, socle partagé",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 5,
      "label": "Six modules, ajustés à votre projet au cadrage",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 5,
      "label": "Programme du niveau 1 : utiliser l'application Claude",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 7,
      "label": "Programme du niveau 2 : brancher Claude à vos outils et diffuser vos consignes",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 9,
      "label": "Programme du niveau 3 : deux parcours, un tronc commun",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 3,
      "label": "Le programme, module par module",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 3,
      "label": "Le programme, module par module",
      "background": "paper-3"
    }
  ],
  "eeat-panel": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 13,
      "label": "#13",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 15,
      "label": "#15",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 8,
      "label": "#8",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 6,
      "label": "#6",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 9,
      "label": "#9",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 7,
      "label": "#7",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 10,
      "label": "#10",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 13,
      "label": "#13",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 13,
      "label": "#13",
      "variant": "media"
    }
  ],
  "faq-accordion": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 1,
      "label": "Questions avant de réserver",
      "background": "paper"
    },
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 7,
      "label": "Vos questions sur l'audit de site",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 5,
      "label": "Centraliser ses données : vos questions",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 10,
      "label": "IA et comptabilité : vos questions",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 5,
      "label": "Automatiser le suivi commercial : vos questions",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 7,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 7,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 11,
      "label": "IA et ressources humaines : vos questions",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 5,
      "label": "Automatiser l'administratif : vos questions",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 10,
      "label": "Automatisation du service client : vos questions",
      "background": "paper"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 8,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 6,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 6,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 6,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 10,
      "label": "Ce que vous nous demandez avant de signer.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 11,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 11,
      "label": "Ce que vous nous demandez avant de signer.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 10,
      "label": "Ce que vous nous demandez avant de signer.",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 6,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 12,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 10,
      "label": "Claude vs ChatGPT : vos questions",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 10,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 6,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 7,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 9,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 7,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 9,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 3,
      "label": "Sur le diagnostic et son barème",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 9,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 8,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 16,
      "label": "Agent IA : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 17,
      "label": "Choisir une agence IA : vos questions",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 16,
      "label": "Claude Code en entreprise : les questions des acheteurs",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 15,
      "label": "Questions fréquentes sur Claude Cowork",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 15,
      "label": "Questions fréquentes sur Claude Design",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 16,
      "label": "Prix et offres de Claude : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 16,
      "label": "Questions fréquentes sur Claude for Small Business",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 16,
      "label": "Questions fréquentes sur les plugins Claude",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 24,
      "label": "Déployer Claude en PME : les questions des acheteurs",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 17,
      "label": "Claude et RGPD : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 19,
      "label": "Skills Claude : les questions des dirigeants",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 14,
      "label": "Prix d'un agent IA : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 16,
      "label": "Coût d'une intégration Claude : vos questions",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 13,
      "label": "Devis automatisé : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 16,
      "label": "Prix de n8n : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 12,
      "label": "Refonte de site internet : questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 12,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 10,
      "label": "Agent de qualification de leads : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 11,
      "label": "Chatbot et agent de service client : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 10,
      "label": "Agent de traitement de documents : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 10,
      "label": "Agents IA : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 9,
      "label": "Application métier sur mesure : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 12,
      "label": "Audit SEO technique : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 9,
      "label": "Agence n8n : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 10,
      "label": "Automatisation des processus : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 11,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 10,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 11,
      "label": "Agence de branding : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 12,
      "label": "Centralisation des données : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 10,
      "label": "Charte graphique et brand book : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 14,
      "label": "Consultant IA : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 10,
      "label": "Automatisation CRM : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 9,
      "label": "Données et pilotage : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 11,
      "label": "Création d'identité de marque : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 11,
      "label": "Intégration de ChatGPT et d'OpenAI : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 16,
      "label": "Claude en entreprise : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 11,
      "label": "Intégration de Mistral AI : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 9,
      "label": "Landing pages et tunnels : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 11,
      "label": "Naming et positionnement : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 9,
      "label": "Prospection automatisée : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 11,
      "label": "Rédaction SEO : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 12,
      "label": "Agence GEO : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 11,
      "label": "Refonte de marque : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 11,
      "label": "Reporting automatisé : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 10,
      "label": "Agence SEO et référencement naturel : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 12,
      "label": "SEO local : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 9,
      "label": "Devis automatisé et relances : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 12,
      "label": "Shopify : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 10,
      "label": "Création de site internet : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 11,
      "label": "Site sur mesure : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 7,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 10,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 8,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 11,
      "label": "Tableau de bord de direction : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 11,
      "label": "Webflow : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 12,
      "label": "WordPress : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 6,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 11,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 13,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 9,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 16,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 10,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 10,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 14,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 14,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    }
  ],
  "feature-grid": [
    {
      "collection": "lp",
      "file": "lp/hub.json",
      "slug": "hub",
      "route": "/lp/hub",
      "index": 1,
      "label": "Repérez votre situation, on vous mène à la bonne page",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 4,
      "label": "Les briques, de l'acquisition au commercial",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 4,
      "label": "Ce qu'un système exécute chez vous.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 4,
      "label": "Six briques, de l'idée à la mesure",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 4,
      "label": "Cold email B2B et RGPD : ce qu'on applique",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 5,
      "label": "Conditions de LinkedIn et RGPD : ce qu'on applique",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 4,
      "label": "Les signaux qu'on suit",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 3,
      "label": "Trois outils, branchés au reste",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 7,
      "label": "Les briques d'un CRM branché et propre, sur HubSpot ou Pipedrive",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 7,
      "label": "Les briques d'une landing qui convertit le clic payé",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 7,
      "label": "Les briques d'un forfait qui fait vivre le site",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 7,
      "label": "Les leviers d'une publicité qui rapporte",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 7,
      "label": "Les briques d'une relance de devis qui signe",
      "background": "paper"
    }
  ],
  "feature-split-media": [
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 3,
      "label": "Le site est le socle. Le reste se branche dessus.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 5,
      "label": "llms.txt n'est pas votre stratégie de visibilité.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 7,
      "label": "Un pilotage lisible en un coup d'œil",
      "background": "paper-2"
    }
  ],
  "feature-zigzag": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 2,
      "label": "Les quatre angles qu'on passe en revue",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 1,
      "label": "Là où le reporting coûte",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 1,
      "label": "Là où le temps part",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 2,
      "label": "Là où l'écart se creuse",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 2,
      "label": "Quatre choses qu'un site classique ne fait pas",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 3,
      "label": "Cinq lignes de fracture",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 3,
      "label": "Trois bascules entre trouver et citer",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 3,
      "label": "Là où le Site Web Intelligent creuse l'écart",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 4,
      "label": "Ce qui détermine votre préparation",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 2,
      "label": "Ce que mesurent les dix questions",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 4,
      "label": "Ce que fait concrètement un référent",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 5,
      "label": "Trois fonctions qui font d'un outil individuel un outil d'équipe",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 5,
      "label": "Ce que Claude Design produit, et ce que vous devez apporter",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 6,
      "label": "Trois fonctionnalités qui changent le travail d'une PME",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 6,
      "label": "Qui décide, qui voit quoi, et comment combler les trous",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 6,
      "label": "Marketplaces officielles, dépôt ouvert, Claude Marketplace",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 7,
      "label": "Par où commencer selon votre profil",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 11,
      "label": "Écrire, sécuriser, diffuser",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 4,
      "label": "Ce que la mission tranche pour vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 5,
      "label": "Trois chantiers, dans cet ordre",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 4,
      "label": "Comment les modules se nourrissent",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 2,
      "label": "Le même process, deux mondes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 3,
      "label": "Ce que l'équipe sait faire en sortant",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 10,
      "label": "Le CRM reste propre après le branchement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 10,
      "label": "La relance continue de s'affiner après le lancement",
      "background": "paper-2"
    }
  ],
  "footer-cta-band": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 2,
      "label": "Quarante-cinq minutes, et une liste de tâches classées par priorité.",
      "background": "ink"
    },
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 8,
      "label": "Quarante-cinq minutes pour voir où votre site perd des leads.",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 6,
      "label": "Combien de versions du même chiffre circulent chez vous ?",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 11,
      "label": "Qui ressaisit encore, et combien de pièces par mois ?",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 6,
      "label": "Où vos demandes attendent-elles ?",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 8,
      "label": "Passez du copier-coller à la décision.",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 8,
      "label": "Reprenez la main sur votre contenu, sans dépendre de personne.",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 12,
      "label": "Que se passe-t-il entre la signature et le premier jour ?",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 6,
      "label": "Quelle procédure ne tient que sur une personne ?",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 11,
      "label": "Quelles demandes reviennent chaque semaine ?",
      "background": "ink"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 9,
      "label": "Faire l'inventaire de vos usages d'IA avant qu'on vous le demande.",
      "background": "ink"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 7,
      "label": "Vous avez vu la différence. Mesurons-la chez vous.",
      "background": "ink"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 7,
      "label": "Votre site mérite mieux qu'une plaquette. Passons à l'acte.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 6,
      "label": "Parlons de vos processus, à Bordeaux ou en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 7,
      "label": "Un ou deux chantiers classés en 45 minutes.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 6,
      "label": "Un premier échange en visio, depuis Paris.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/hub.json",
      "slug": "hub",
      "route": "/lp/hub",
      "index": 4,
      "label": "Vous hésitez entre plusieurs systèmes ? On vous oriente en 45 minutes.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 11,
      "label": "Un site qui fait avancer la vente. Un audit pour voir si on peut le construire ensemble.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 12,
      "label": "Voyons où votre acquisition perd des opportunités.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 12,
      "label": "Identifions les tâches qui méritent un système, et celles qui doivent rester humaines.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 11,
      "label": "Ne préparez pas votre visibilité après la bascule. Mesurez ce qui manque maintenant.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 7,
      "label": "Le bon outil dépend de votre travail. Cadrons-le ensemble.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 13,
      "label": "La bonne plateforme se choisit sur vos données et vos contraintes.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 11,
      "label": "L'outil compte moins que le cadre.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 11,
      "label": "Le bon CRM se choisit sur votre processus, pas sur une démo.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 7,
      "label": "Vu sur Google, repris par les IA. Faisons les deux.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 8,
      "label": "Le bon outil se choisit sur vos tâches, pas sur un tableau.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 10,
      "label": "Le bon outil se choisit sur vos tâches, pas sur un tableau.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 8,
      "label": "Un site qui travaille, pas une dette à porter.",
      "background": "ink"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 10,
      "label": "Vous savez si vous êtes prêts. Cadrons le déploiement.",
      "background": "ink"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 4,
      "label": "Vous connaissez votre niveau. L'audit dit par quelle tâche commencer.",
      "background": "ink"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 10,
      "label": "Vous savez s'il vous faut un référent. Passons au prochain pas.",
      "background": "ink"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 9,
      "label": "Vous savez où vous en êtes. Regardons votre site réel.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 17,
      "label": "Savoir si votre tâche demande un agent, ou seulement un workflow.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 14,
      "label": "Savoir lesquels de vos usages d'IA demandent une attention, et lesquels n'en demandent aucune.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 18,
      "label": "Un prestataire qui vous dit où il n'est pas utile. Ça se vérifie en 45 minutes.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 17,
      "label": "Claude Code chez vous : on vérifie d'abord que c'est le bon outil.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 17,
      "label": "Savoir quelles tâches confier à Claude, et avec quels réglages.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 17,
      "label": "Savoir ce que Claude Design peut produire chez vous, et ce qu'il faut confier à un pro.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 17,
      "label": "Savoir quelle offre Claude prendre, et pour combien de sièges, avant la première facture.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 17,
      "label": "Le plugin est américain. Votre compta ne l'est pas.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 17,
      "label": "Un plugin qui porte votre méthode, diffusé à ceux qui en ont besoin.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 25,
      "label": "Vous savez par où commencer. Cadrons votre premier cas.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 18,
      "label": "Savoir quelles données passent par Claude, avant que ce soit trop tard.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 20,
      "label": "Vos procédures en skills qui tournent, pour toute l'équipe",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 15,
      "label": "Savoir si un agent vaut son coût chez vous, avant la première heure facturée.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 17,
      "label": "Savoir ce que vos licences Claude vous coûteront, avant d'acheter la première. L'audit est gratuit.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 14,
      "label": "Savoir si vos devis valent d'être automatisés, et par où commencer.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 14,
      "label": "On vérifie la prise en charge avant de vous engager.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 14,
      "label": "Brancher vos outils sur un assistant, avec des droits que vous avez décidés.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 17,
      "label": "n8n Cloud ou auto-hébergé : décidez avant le premier workflow.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 13,
      "label": "Savoir s'il faut corriger votre site ou le refaire.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 13,
      "label": "Un seuil de rentabilité calculé sur vos chiffres, pas sur une moyenne de marché.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 14,
      "label": "Votre liste de tâches, classée et tranchée en 45 minutes.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 11,
      "label": "Combien de demandes lisez-vous avant de trouver la bonne ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 12,
      "label": "Combien de demandes identiques recevez-vous chaque semaine ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 11,
      "label": "Combien de pièces ressaisissez-vous chaque semaine ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 11,
      "label": "Quelle tâche confieriez-vous à un agent ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 10,
      "label": "Quel tableur fait office de logiciel chez vous ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 13,
      "label": "Combien de vos pages Google a-t-il réellement indexées ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 14,
      "label": "Commencez par la tâche qui vous coûte le plus d'heures.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 10,
      "label": "Un premier workflow n8n en production, sur votre serveur.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 13,
      "label": "Combien de temps passez-vous à republier le même contenu ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 11,
      "label": "Quel process vous coûte le plus d'heures chaque semaine ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 12,
      "label": "Quelle ressaisie vous coûte le plus de temps ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 11,
      "label": "Vérifions d'abord si vous en avez besoin.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 12,
      "label": "Où votre marque est-elle appliquée aujourd'hui ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 13,
      "label": "Combien de fois par mois exportez-vous le même fichier ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 11,
      "label": "Votre marque est-elle appliquée pareil partout ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 13,
      "label": "Vos e-mails froids arrivent-ils jusqu'à la boîte de réception ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 16,
      "label": "Par quoi commencer, et que laisser de côté ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 11,
      "label": "Combien de demandes se perdent avant d'atteindre un commercial ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 10,
      "label": "Combien de jours par mois passez-vous à compiler des chiffres ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 12,
      "label": "Que dit votre marque de vous aujourd'hui ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 12,
      "label": "Vos équipes utilisent déjà ChatGPT : qui encadre, et avec quelles règles ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 18,
      "label": "Claude est déjà utilisé chez vous. Reste à l'encadrer.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 12,
      "label": "Quelle exigence de données pèse sur votre choix de modèle ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 10,
      "label": "Votre landing page attire-t-elle les bonnes demandes ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 13,
      "label": "Quel est le premier client que votre produit doit convaincre ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 12,
      "label": "Votre nom dit-il ce que vous faites ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 13,
      "label": "Que vous demandent vos clients par e-mail, chaque semaine ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 10,
      "label": "Votre prospection s'arrête-t-elle quand vous êtes occupés ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 13,
      "label": "Votre cible répond-elle sur LinkedIn ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 12,
      "label": "Quels articles vos clients attendent-ils de vous ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 13,
      "label": "Que répondent les assistants IA quand on les interroge sur votre marché ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 12,
      "label": "Votre marque mérite-t-elle une refonte, ou un ajustement ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 12,
      "label": "Quel rapport refaites-vous à chaque période sans l'avoir choisi ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 11,
      "label": "Vos pages répondent-elles aux questions de vos clients ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 13,
      "label": "Vos clients proches vous trouvent-ils quand ils cherchent ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 10,
      "label": "Combien de devis attendent une relance chez vous ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 13,
      "label": "Votre boutique actuelle est-elle à corriger, à migrer ou à refaire ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 11,
      "label": "Que devient une demande après le formulaire ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 13,
      "label": "Quels signaux vos prospects émettent-ils déjà ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 12,
      "label": "Votre besoin justifie-t-il vraiment du sur mesure ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 8,
      "label": "La visibilité n'a de valeur que si la demande est traitée.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 11,
      "label": "Un système qui alimente, qualifie et relance votre pipeline.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 9,
      "label": "Quarante-cinq minutes pour savoir quoi automatiser.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 12,
      "label": "Quelle décision attend un chiffre que vous n'avez pas ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 13,
      "label": "Câbler votre pipeline.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 12,
      "label": "Votre site actuel est-il le bon outil pour la suite ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 13,
      "label": "Votre WordPress est-il à entretenir, à relier ou à refaire ?",
      "background": "ink"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 7,
      "label": "Vous avez vu le résultat. Trouvons votre premier chantier.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 12,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 14,
      "label": "Vos usages ChatGPT d'aujourd'hui servent de matière première.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 11,
      "label": "Le programme se monte sur votre projet.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 17,
      "label": "Le programme se monte sur vos tâches.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 6,
      "label": "Former sur vos tâches, pas sur des démonstrations.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 12,
      "label": "Vos scénarios Make servent de support de cours.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 12,
      "label": "Vos workflows n8n sont le programme.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 15,
      "label": "Faites remonter votre donnée toute seule.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 13,
      "label": "Convertissez le trafic que vous payez.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 13,
      "label": "Donnez à votre site une seconde vie, chaque mois.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 13,
      "label": "Transformez votre budget pub en leads mesurés.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 15,
      "label": "Faites signer les devis que vous oubliez.",
      "background": "ink"
    }
  ],
  "guarantee-block": [
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 10,
      "label": "#10",
      "background": "paper-2"
    }
  ],
  "hero-centered": [
    {
      "collection": "lp",
      "file": "lp/hub.json",
      "slug": "hub",
      "route": "/lp/hub",
      "index": 0,
      "label": "Quel système freine votre croissance ?",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 0,
      "label": "Votre site ne devrait pas seulement présenter l'entreprise. Il devrait faire avancer la vente.",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 0,
      "label": "Votre acquisition ne manque pas d'outils. Elle manque de système.",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 0,
      "label": "Votre équipe n'a pas besoin d'un chatbot de plus. Elle a besoin d'un système qui exécute le travail répétitif.",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 0,
      "label": "Être bien classé ne suffit plus. Il faut devenir la source de la réponse.",
      "background": "paper-3"
    }
  ],
  "hero-conversion-funnel": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 0,
      "label": "Growth System IA",
      "background": "ink"
    }
  ],
  "hero-masthead-card": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 0,
      "label": "Agent IA de qualification de leads",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 0,
      "label": "Chatbot et agent IA pour votre service client",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 0,
      "label": "Agent IA de traitement de documents : factures, devis, contrats",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 0,
      "label": "Audit SEO technique : ce qui freine vos pages, classé par priorité.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 0,
      "label": "Agence n8n pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 0,
      "label": "Automatisation de vos processus métier",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 0,
      "label": "Back-office sur mesure et outil interne pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 0,
      "label": "Agence de branding : une marque qu'on applique.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 0,
      "label": "La centralisation des données de votre PME, sans usine à gaz",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 0,
      "label": "Charte graphique et brand book pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 0,
      "label": "Automatisation de votre CRM",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 0,
      "label": "Création d'identité de marque pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 0,
      "label": "Développement de MVP SaaS pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 0,
      "label": "Naming et positionnement de marque pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 0,
      "label": "Portail client sur mesure pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 0,
      "label": "Rédaction SEO : des articles qui répondent à une requête, relus et signés.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 0,
      "label": "Agence GEO : être cité par ChatGPT, Perplexity et Gemini.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 0,
      "label": "Refonte de marque pour PME : garder ce qui fonctionne.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 0,
      "label": "Reporting automatisé : le rapport est prêt, vous le relisez, il part",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 0,
      "label": "Agence SEO et référencement naturel pour PME, suivi jusqu'à la demande.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 0,
      "label": "SEO local : être trouvé par les clients de votre zone.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 0,
      "label": "Agence Shopify : votre boutique en ligne, créée, refondue ou migrée.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 0,
      "label": "Agence site web : un site qui vend, pas une vitrine qui dort.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 0,
      "label": "Développement web sur mesure : un code qui vous appartient.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 0,
      "label": "Des outils de visibilité au service de votre système.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 0,
      "label": "Un développement commercial B2B sur une seule base.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 0,
      "label": "Agence d'automatisation IA pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 0,
      "label": "Un tableau de bord de direction qui tient sur un écran",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 0,
      "label": "Agence Webflow : un site que votre équipe fait vivre.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 0,
      "label": "Agence WordPress : un site tenu à jour, que vous maîtrisez.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 0,
      "label": "Intégration CRM pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 0,
      "label": "Une landing page Google Ads qui transforme le clic payé en lead.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 0,
      "label": "La maintenance qui fait vivre votre site web.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 0,
      "label": "Votre budget publicitaire, dépensé sur les intentions qui rapportent.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 0,
      "label": "Relance de devis automatique.",
      "background": "paper"
    }
  ],
  "hero-split-media": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 0,
      "label": "Audit gratuit de votre site web.",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 0,
      "label": "Centraliser ses données et automatiser le reporting",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 0,
      "label": "IA et automatisation de la comptabilité",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 0,
      "label": "Automatiser le suivi commercial",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 0,
      "label": "Réduire le temps de reporting.",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 0,
      "label": "Réduire le temps passé sur le CMS.",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 0,
      "label": "IA et automatisation des ressources humaines",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 0,
      "label": "Standardiser et automatiser les tâches administratives",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 0,
      "label": "Automatisation du service client et du SAV",
      "background": "paper"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 0,
      "label": "Conformité IA : AI Act et RGPD pour les PME",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 0,
      "label": "Site d'agence classique vs Site Web Intelligent.",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 0,
      "label": "Un site qui se fait trouver.",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 0,
      "label": "Agence IA et automatisation à Bordeaux",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 0,
      "label": "Agence IA et automatisation à Dijon",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 0,
      "label": "Agence IA et automatisation à Lille",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 0,
      "label": "Agence IA et automatisation à Lyon",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 0,
      "label": "Agence IA et automatisation à Marseille",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 0,
      "label": "Agence IA et automatisation à Montpellier",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 0,
      "label": "Agence IA et automatisation à Nantes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 0,
      "label": "Agence IA à Paris, sans bureau à Paris",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 0,
      "label": "Agence IA et automatisation à Strasbourg",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 0,
      "label": "Agence IA et automatisation à Toulouse",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 0,
      "label": "Claude Code vs Cursor.",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 0,
      "label": "Claude Platform ou OpenAI Platform : lequel choisir pour une PME",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 0,
      "label": "Claude vs ChatGPT pour une PME",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 0,
      "label": "CRM sur mesure ou CRM du marché : comment choisir pour une PME",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 0,
      "label": "GEO vs SEO.",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 0,
      "label": "n8n vs Make : lequel choisir pour votre PME",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 0,
      "label": "n8n vs Make vs Zapier : lequel choisir pour votre PME",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 0,
      "label": "Site Web Intelligent vs WordPress.",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 0,
      "label": "Votre PME est-elle prête à déployer Claude ?",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 0,
      "label": "Diagnostic référent IA.",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 0,
      "label": "Diagnostic du site intelligent.",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 0,
      "label": "Agent IA : c'est quoi ? Définition, coût d'usage et limites",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 0,
      "label": "AI Act pour les PME : le calendrier à jour et ce qui vous concerne vraiment",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 0,
      "label": "Choisir une agence IA quand on dirige une PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 0,
      "label": "Claude Code en entreprise : fonctionnalités, coût et déploiement",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 0,
      "label": "Claude Cowork est désormais Claude : ce qui change",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 0,
      "label": "Claude Design : usages en PME, limites et alternatives",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 0,
      "label": "Claude Pro, Max, Team : offres et prix en PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 0,
      "label": "Claude for Small Business : ce que le plugin fait pour une PME française",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 0,
      "label": "Plugins et connecteurs Claude pour l'entreprise : le guide",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 0,
      "label": "Déployer Claude dans votre PME : le guide complet",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 0,
      "label": "Claude et RGPD : utiliser Claude en conformité dans une PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 0,
      "label": "Skills Claude : créer, partager et déployer vos procédures en entreprise",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 0,
      "label": "Combien coûte un agent IA pour une PME ?",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 0,
      "label": "Combien coûte une intégration Claude en PME ?",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 0,
      "label": "Devis automatisé : la méthode pas à pas, quel que soit l'outil",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 0,
      "label": "Financement d'une formation IA en entreprise : OPCO, devis, convention",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 0,
      "label": "MCP (Model Context Protocol) expliqué à un dirigeant de PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 0,
      "label": "n8n prix : tarifs 2026 et coût complet pour une PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 0,
      "label": "Refonte de site internet : étapes, coût et SEO à garder",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 0,
      "label": "Mesurer le ROI d'une automatisation ou d'un projet IA : la méthode complète",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 0,
      "label": "Automatisation en PME : quelles tâches automatiser en premier",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 0,
      "label": "Agents IA pour votre entreprise",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 0,
      "label": "Application métier et logiciel sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 0,
      "label": "Agence d'automatisation Make pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 0,
      "label": "Automatisation des réseaux sociaux pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 0,
      "label": "Base de connaissance IA : vos documents, chaque réponse avec sa source",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 0,
      "label": "Cold email B2B pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 0,
      "label": "Consultant IA indépendant pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 0,
      "label": "Le pilotage par la donnée, sans tableur refait à la main.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 0,
      "label": "Intégrer ChatGPT et OpenAI à vos outils métier",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 0,
      "label": "Intégrer Claude dans votre entreprise",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 0,
      "label": "Intégrer Mistral AI à vos outils métier",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 0,
      "label": "Une landing page de site web qui convertit et qui trie vos leads.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 0,
      "label": "Prospection automatisée par l'IA",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 0,
      "label": "Prospection LinkedIn B2B automatisée",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 0,
      "label": "Devis automatisés et relances sans oubli",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 0,
      "label": "Social selling avec l'IA pour PME B2B",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 0,
      "label": "Une intégration Claude, avant/après.",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 0,
      "label": "Formation automatisation et IA",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 0,
      "label": "Formation ChatGPT en entreprise",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 0,
      "label": "Développer son projet avec Claude Code",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 0,
      "label": "Formation Claude et agents IA",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 0,
      "label": "Formation IA et automatisation pour vos équipes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 0,
      "label": "Formation Make",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 0,
      "label": "Formation n8n",
      "background": "paper"
    }
  ],
  "hover-reveal-list": [
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 9,
      "label": "Vos publications nourrissent les autres canaux",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 6,
      "label": "Une page par offre, avec ses livrables",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 9,
      "label": "Le cold email s'assemble aux autres canaux",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 9,
      "label": "LinkedIn s'assemble aux autres canaux",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 8,
      "label": "Shopify, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 9,
      "label": "Le social selling nourrit les autres canaux",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 7,
      "label": "Sur mesure, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 5,
      "label": "Trois leviers, une même base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 3,
      "label": "Six modules, une même base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 7,
      "label": "Webflow, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 8,
      "label": "WordPress, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 8,
      "label": "L'intégration s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 8,
      "label": "La maintenance est une brique du dispositif",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 8,
      "label": "La relance de devis s'assemble au reste du système commercial",
      "background": "paper-3"
    }
  ],
  "key-metric-grid": [
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 2,
      "label": "Les chiffres à connaître avant d'équiper une équipe",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 2,
      "label": "Quatre repères avant de changer quoi que ce soit",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 2,
      "label": "Quatre faits à connaître avant d'ouvrir l'outil",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 3,
      "label": "Offres entreprise, prix par siège et par mois, hors TVA",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 3,
      "label": "Le plugin en quatre chiffres, au 6 octobre 2026",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 3,
      "label": "Ce qu'il faut retenir en quatre chiffres",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 5,
      "label": "Un plan, pas une promesse",
      "variant": "accent"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 3,
      "label": "Ce qu'Anthropic établit, au 5 octobre 2026",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 3,
      "label": "Ce qu'Anthropic fixe, au 5 octobre 2026",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 3,
      "label": "Ce qui est sourcé, et ce qui ne l'est pas",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 3,
      "label": "Trois chiffres d'Anthropic, un prix Waimia",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 3,
      "label": "Ce que disent les sources officielles, pour la France entière",
      "variant": "accent",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 3,
      "label": "Prix mensuels, facturation annuelle, hors taxes",
      "variant": "accent",
      "background": "paper"
    }
  ],
  "lead-capture-band": [
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 4,
      "label": "#4",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 10,
      "label": "Avant d'ouvrir Claude Code à une équipe : la checklist 90 jours",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 11,
      "label": "Les réglages d'administration de Cowork, vérifiés un par un",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 10,
      "label": "Quelle offre Claude donne accès à Design, et à quel coût réel ?",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 10,
      "label": "Le guide d'achat Claude pour PME : plan, coût, configuration",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 11,
      "label": "Recevez le guide d'achat Claude pour PME (PDF, 14 pages)",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 10,
      "label": "Recevez le kit conformité et administration de Claude en entreprise",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 4,
      "label": "Le guide d'achat Claude pour PME : plan, coût, configuration",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 11,
      "label": "Recevez le pack de 8 skills Claude pour PME",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 14,
      "label": "Le plan des 90 jours, case par case",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 17,
      "label": "Recevez le kit conformité et administration de Claude",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 9,
      "label": "Recevez le kit de conformité Claude en entreprise",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 12,
      "label": "Recevez le pack de 8 skills Claude pour PME",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 12,
      "label": "Recevez le guide d'achat Claude pour PME, avec les budgets calculés",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 9,
      "label": "Avant de brancher un connecteur : recevez le kit conformité Claude (PDF, 11 pages)",
      "background": "ink"
    }
  ],
  "market-cases": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 7,
      "label": "Études de cas du marché : comptabilité et finance",
      "variant": "full",
      "background": "paper-3"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 8,
      "label": "Études de cas du marché : ressources humaines",
      "variant": "full",
      "background": "paper-3"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 7,
      "label": "Études de cas du marché : service client",
      "variant": "full",
      "background": "paper-3"
    }
  ],
  "method-stepline": [
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 6,
      "label": "De l'audit gratuit aux premiers résultats.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 8,
      "label": "De l'audit gratuit aux premiers résultats",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 5,
      "label": "Ce qui sépare un système fiable d'un gadget.",
      "background": "paper-3"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 4,
      "label": "Les 6 couches d'une visibilité qui tient.",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 5,
      "label": "Un audit en six étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 5,
      "label": "Du contenu source aux publications, en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 5,
      "label": "Un process à la fois",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 5,
      "label": "De l'inventaire au socle, en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 4,
      "label": "Quatre étapes, du constat aux fichiers",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 6,
      "label": "Six étapes, dans cet ordre",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 5,
      "label": "Cinq étapes, dans cet ordre",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 5,
      "label": "De l'idée au produit qui encaisse",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 5,
      "label": "Cinq étapes, de la génération au dossier",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 5,
      "label": "Comment on le construit",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 4,
      "label": "De la liste au rendez-vous, en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 4,
      "label": "Du sujet à la mise à jour",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 6,
      "label": "Un chantier GEO en six étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 5,
      "label": "Six étapes, du constat au contrôle",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 5,
      "label": "De la collecte à l'archive, en six étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 6,
      "label": "Un chantier de SEO local en six étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 5,
      "label": "De la décision à l'écran, en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 5,
      "label": "Les 6 niveaux d'une intégration CRM",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 5,
      "label": "Les 6 niveaux d'une landing Google Ads",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 5,
      "label": "Les 6 niveaux d'un site entretenu",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 5,
      "label": "Les 6 niveaux d'une publicité en ligne",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 5,
      "label": "Les 6 niveaux d'une relance de devis",
      "background": "paper-3"
    }
  ],
  "method-timeline": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 5,
      "label": "Méthode Waimia",
      "background": "paper-2"
    }
  ],
  "newsletter-signup-section": [
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 16,
      "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 14,
      "label": "Les changements de Claude, triés pour une PME",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 16,
      "label": "La fusion n'est pas finie. Soyez prévenu quand elle touche votre offre.",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 16,
      "label": "Claude change chaque mois. Recevez seulement ce qui compte pour une PME.",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 15,
      "label": "Les offres Claude changent vite. Soyez prévenu quand ça vous concerne.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 15,
      "label": "Les nouveaux connecteurs français à Claude, quand ils sortent",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 15,
      "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 23,
      "label": "Claude change chaque mois. Recevez seulement ce qui touche une PME.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 16,
      "label": "Les changements de Claude qui touchent vos données, une fois par mois",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 18,
      "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 15,
      "label": "Quand les prix de Claude bougent, vous le savez avant votre prochain devis",
      "background": "ink"
    }
  ],
  "pain-severity-list": [
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 2,
      "label": "Pourquoi vos prospects vous échappent",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 2,
      "label": "Pourquoi votre équipe passe sa semaine à déplacer de l'information.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 2,
      "label": "Pourquoi vous n'êtes ni classé, ni cité.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 4,
      "label": "Pourquoi un site soigné ne se trouve pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 4,
      "label": "Quatre habitudes qu'un back-office retire",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 7,
      "label": "Ce qui rend une marque inutilisable.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 3,
      "label": "Ce que la dispersion coûte.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 5,
      "label": "Quatre causes fréquentes de mails en spam",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 3,
      "label": "Ce que coûte une marque faite en une soirée.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 4,
      "label": "Ce qu'un MVP évite",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 3,
      "label": "Les noms qui coûtent cher plus tard.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 4,
      "label": "Pourquoi les IA ne vous citent pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 3,
      "label": "Là où une refonte tourne mal.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 3,
      "label": "Ce que coûte un reporting refait à chaque période.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 4,
      "label": "Pourquoi vos clients de proximité ne vous trouvent pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 3,
      "label": "Comment un tableau de direction échoue.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 3,
      "label": "Pourquoi votre CRM non branché reste un cimetière",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 3,
      "label": "Pourquoi votre trafic payant ne convertit pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 3,
      "label": "Là où un site meurt après la livraison.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 3,
      "label": "Pourquoi votre budget pub ne devient pas du business",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 3,
      "label": "Pourquoi vos devis restent sans réponse",
      "background": "ink"
    }
  ],
  "pricing-cards": [
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 8,
      "label": "Quatre façons de construire votre site intelligent.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 9,
      "label": "Quatre socles pour lancer votre acquisition",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 9,
      "label": "Une offre, deux manières d'avancer.",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 9,
      "label": "Deux façons de reprendre votre visibilité.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 8,
      "label": "Prix d'un agent de qualification de leads",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 9,
      "label": "Prix d'un chatbot de service client",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 8,
      "label": "Prix d'un agent de traitement de documents",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 8,
      "label": "Combien coûte un agent IA",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 7,
      "label": "Combien coûte une application sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 10,
      "label": "Prix d'un audit SEO technique",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 9,
      "label": "Prix d'une prestation Make",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 7,
      "label": "Prix d'une prestation n8n",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 10,
      "label": "Prix de l'automatisation des réseaux sociaux",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 8,
      "label": "Combien coûte l'automatisation d'un processus",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 9,
      "label": "Combien coûte un back-office sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 9,
      "label": "Combien coûte un branding pour une PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 10,
      "label": "Prix d'une centralisation de données",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 8,
      "label": "Prix d'une charte graphique et d'un brand book",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 10,
      "label": "Un essai gratuit, puis un abonnement sans engagement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 12,
      "label": "Combien coûte un accompagnement IA",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 8,
      "label": "Prix d'une automatisation CRM",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 7,
      "label": "Prix : un sprint de cadrage, puis sur devis",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 9,
      "label": "Prix d'une création d'identité de marque",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 9,
      "label": "Prix d'une intégration de ChatGPT ou d'OpenAI",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 13,
      "label": "Combien coûte une intégration de Claude",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 9,
      "label": "Prix d'une intégration de Mistral AI",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 7,
      "label": "Prix d'une landing page et d'un tunnel",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 10,
      "label": "Combien coûte un MVP SaaS",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 9,
      "label": "Prix d'un naming et d'un positionnement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 10,
      "label": "Combien coûte un portail client sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 7,
      "label": "Un essai gratuit, puis deux formules en abonnement mensuel sans engagement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 10,
      "label": "Prix de la prospection LinkedIn préparée",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 9,
      "label": "Prix d'une rédaction SEO",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 10,
      "label": "Deux façons de rendre vos pages citables",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 9,
      "label": "Prix d'une refonte de marque",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 9,
      "label": "Prix d'un reporting automatisé",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 8,
      "label": "Prix d'une prestation SEO",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 10,
      "label": "Deux façons de gagner en visibilité locale",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 7,
      "label": "Prix d'un dispositif de devis et de relances",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 10,
      "label": "Combien coûte une boutique Shopify",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 8,
      "label": "Combien coûte un site internet qui vend",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 10,
      "label": "Prix du social selling assisté par IA",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 9,
      "label": "Combien coûte un site sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 5,
      "label": "Quatre socles pour un site",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 8,
      "label": "Un essai gratuit, puis deux formules pour alimenter votre pipeline",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 6,
      "label": "Quatre socles pour câbler votre système",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 9,
      "label": "Prix d'un tableau de bord de direction",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 11,
      "label": "Deux façons d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 9,
      "label": "Combien coûte un site Webflow",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 10,
      "label": "Combien coûte un site WordPress",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 12,
      "label": "Deux façons de brancher votre CRM",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 10,
      "label": "Deux façons de faire convertir vos clics Ads",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 10,
      "label": "Combien coûte la maintenance de votre site",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 10,
      "label": "Deux façons de mettre votre budget pub au travail",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 12,
      "label": "Deux façons de relancer vos devis",
      "background": "paper"
    }
  ],
  "problem-statement": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 2,
      "label": "Définition",
      "background": "paper"
    }
  ],
  "problems-grid": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 3,
      "label": "Là où le pipeline fuit",
      "background": "paper-2"
    }
  ],
  "process-steps": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 4,
      "label": "Vos 45 minutes, côté site et conversion",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 3,
      "label": "Comment se déroule un pilote en comptabilité",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 4,
      "label": "Comment se déroule un pilote RH",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 3,
      "label": "Comment se déroule un pilote de support",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 3,
      "label": "Du site figé au site qui travaille",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 3,
      "label": "De la page blanche au site qui travaille",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 3,
      "label": "Comment on démarre",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 8,
      "label": "Comment trancher en deux semaines, sur vos documents",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 7,
      "label": "Ce qu'on pose selon votre préparation",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 7,
      "label": "Comment on forme votre référent",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 6,
      "label": "Ce qu'on fait selon votre palier",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 13,
      "label": "Mettre un premier agent en production, en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 10,
      "label": "Quoi faire, échéance par échéance",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 14,
      "label": "Si vous nous choisissez : comment Waimia travaille",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 13,
      "label": "On cadre d'abord, on code ensuite",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 12,
      "label": "Démarrer, ou passer la fusion, en quatre étapes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 13,
      "label": "Comment Waimia s'y prend",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 13,
      "label": "Comment Waimia déploie Claude dans une PME",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 13,
      "label": "Comment Waimia adapte le plugin à une PME française",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 13,
      "label": "Comment Waimia construit et déploie un plugin privé",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 13,
      "label": "Trois phases de 30 jours, du test à l'usage d'équipe",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 21,
      "label": "Du premier rendez-vous à l'équipe autonome",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 14,
      "label": "Comment Waimia s'y prend",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 16,
      "label": "De la procédure orale au plugin qui tourne",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 12,
      "label": "Comment Waimia chiffre un agent",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 4,
      "label": "Automatiser un devis en six étapes",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 7,
      "label": "Six étapes, de l'identification de l'OPCO au suivi",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 13,
      "label": "Chiffrer votre cas en cinq étapes",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 4,
      "label": "Les étapes d'une refonte de site internet",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 6,
      "label": "La cartographie en cinq étapes, sur deux semaines",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 11,
      "label": "Comment se déroule une mission de conseil IA",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 8,
      "label": "De l'usage éparpillé à l'outil branché",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 14,
      "label": "Le déroulé d'un déploiement",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 8,
      "label": "Du choix du modèle à l'outil branché",
      "background": "paper"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 3,
      "label": "Ce que fait l'agent, dans l'ordre",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 4,
      "label": "Comment se passe une formation",
      "background": "paper"
    }
  ],
  "proof-bar": [
    {
      "collection": "lp",
      "file": "lp/hub.json",
      "slug": "hub",
      "route": "/lp/hub",
      "index": 2,
      "label": "En bref",
      "background": "paper-2"
    },
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-qualification-leads.json",
      "slug": "agent-qualification-leads",
      "route": "/services/agent-qualification-leads",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-traitement-documents.json",
      "slug": "agent-traitement-documents",
      "route": "/services/agent-traitement-documents",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/audit-seo-technique.json",
      "slug": "audit-seo-technique",
      "route": "/services/audit-seo-technique",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
      "slug": "automatisation-reseaux-sociaux",
      "route": "/services/automatisation-reseaux-sociaux",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/back-office-sur-mesure.json",
      "slug": "back-office-sur-mesure",
      "route": "/services/back-office-sur-mesure",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding.json",
      "slug": "branding",
      "route": "/services/branding",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/centralisation-donnees.json",
      "slug": "centralisation-donnees",
      "route": "/services/centralisation-donnees",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/charte-graphique-brand-book.json",
      "slug": "charte-graphique-brand-book",
      "route": "/services/charte-graphique-brand-book",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/identite-de-marque.json",
      "slug": "identite-de-marque",
      "route": "/services/identite-de-marque",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/naming-et-positionnement.json",
      "slug": "naming-et-positionnement",
      "route": "/services/naming-et-positionnement",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/portail-client.json",
      "slug": "portail-client",
      "route": "/services/portail-client",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/prospection-linkedin.json",
      "slug": "prospection-linkedin",
      "route": "/services/prospection-linkedin",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
      "slug": "redaction-seo-contenu",
      "route": "/services/redaction-seo-contenu",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/branding/refonte-de-marque.json",
      "slug": "refonte-de-marque",
      "route": "/services/refonte-de-marque",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/reporting-automatise.json",
      "slug": "reporting-automatise",
      "route": "/services/reporting-automatise",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting/tableau-de-bord-direction.json",
      "slug": "tableau-de-bord-direction",
      "route": "/services/tableau-de-bord-direction",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "src/content/services/maintenance-growth.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    }
  ],
  "pull-quote-block": [
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 5,
      "label": "#5",
      "variant": "centered",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 11,
      "label": "#11",
      "variant": "centered",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 10,
      "label": "#10",
      "variant": "centered",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 11,
      "label": "#11",
      "variant": "centered",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 11,
      "label": "#11",
      "variant": "centered",
      "background": "ink"
    }
  ],
  "related-cards-band": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 6,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 9,
      "label": "Pour chiffrer avant de décider",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 6,
      "label": "À explorer",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 6,
      "label": "À explorer",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 10,
      "label": "Pour chiffrer avant de décider",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 9,
      "label": "Pour chiffrer avant de décider",
      "background": "paper-2"
    },
    {
      "collection": "audits",
      "file": "audits/conformite-ia.json",
      "slug": "conformite-ia",
      "route": "/conformite-ia",
      "index": 7,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/avant-apres.json",
      "slug": "avant-apres",
      "route": "/demonstrations/avant-apres",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/demonstrations/site-web-intelligent",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-code-vs-cursor.json",
      "slug": "claude-code-vs-cursor",
      "route": "/ressources/comparatifs/claude-code-vs-cursor",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 11,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 9,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
      "slug": "crm-sur-mesure-vs-crm-du-marche",
      "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "index": 9,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/geo-vs-seo.json",
      "slug": "geo-vs-seo",
      "route": "/ressources/comparatifs/geo-vs-seo",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 6,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/n8n-vs-make-vs-zapier.json",
      "slug": "n8n-vs-make-vs-zapier",
      "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
      "slug": "site-web-intelligent-vs-wordpress",
      "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "index": 6,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/diagnostics/claude-pme",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/referent-ia.json",
      "slug": "referent-ia",
      "route": "/ressources/diagnostics/referent-ia",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "diagnostics",
      "file": "diagnostics/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/ressources/diagnostics/site-web-intelligent",
      "index": 7,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/choisir-agence-ia-pme.json",
      "slug": "choisir-agence-ia-pme",
      "route": "/ressources/guides/choisir-agence-ia-pme",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-code-entreprise.json",
      "slug": "claude-code-entreprise",
      "route": "/ressources/guides/claude-code-entreprise",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-fonctionnalites-pme.json",
      "slug": "claude-fonctionnalites-pme",
      "route": "/ressources/guides/claude-fonctionnalites-pme",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 22,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-skills.json",
      "slug": "claude-skills",
      "route": "/ressources/guides/claude-skills",
      "index": 17,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/combien-coute-un-agent-ia-pme.json",
      "slug": "combien-coute-un-agent-ia-pme",
      "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
      "index": 13,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 14,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 11,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 11,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 9,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 17,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "demonstrations",
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "src/content/demonstrations/integration-claude.json",
      "index": 5,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 10,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude-code.json",
      "slug": "claude-code",
      "route": "src/content/formations/claude-code.json",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 15,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 9,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 9,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    }
  ],
  "related-links": [
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 1,
      "label": "Choisir sa formation selon l'outil et le niveau",
      "background": "paper-2"
    }
  ],
  "resource-card-grid": [
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 3,
      "label": "Sept guides détaillés, une question d'acheteur chacun",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 9,
      "label": "Quatre outils pour poser les prérequis",
      "background": "paper-2"
    }
  ],
  "service-catalog-list": [
    {
      "collection": "formations",
      "file": "formations/index.json",
      "slug": "formations",
      "route": "src/content/formations/index.json",
      "index": 2,
      "label": "Formation intelligence artificielle : six formations construites sur vos tâches",
      "background": "paper"
    }
  ],
  "stats-bento": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 9,
      "label": "Ce que le système change",
      "background": "ink"
    }
  ],
  "steps-horizontal": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-reporting.json",
      "slug": "reduire-reporting",
      "route": "/cas-usages/reduire-reporting",
      "index": 2,
      "label": "De trois jours à quelques minutes de relecture",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/reduire-temps-cms.json",
      "slug": "reduire-temps-cms",
      "route": "/cas-usages/reduire-temps-cms",
      "index": 2,
      "label": "Du chantier permanent à l'édition en minutes",
      "background": "paper"
    }
  ],
  "system-flow": [
    {
      "collection": "lp",
      "file": "lp/site-web-intelligent.json",
      "slug": "site-web-intelligent",
      "route": "/lp/site-web-intelligent",
      "index": 4,
      "label": "Comment tout fonctionne ensemble.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/lp/systeme-acquisition",
      "index": 5,
      "label": "Comment tout s'articule.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/systeme-ia-marketing.json",
      "slug": "systeme-ia-marketing",
      "route": "/lp/systeme-ia-marketing",
      "index": 6,
      "label": "Où la machine agit, où vous gardez la main.",
      "background": "ink"
    },
    {
      "collection": "lp",
      "file": "lp/visibilite-google-ia.json",
      "slug": "visibilite-google-ia",
      "route": "/lp/visibilite-google-ia",
      "index": 6,
      "label": "Comment une marque se met à être citée.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/social-selling-ia.json",
      "slug": "social-selling-ia",
      "route": "/services/social-selling-ia",
      "index": 5,
      "label": "Du signal au premier message",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 6,
      "label": "Comment un lead devient client",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "src/content/services/crm-scoring-routing/integration-crm.json",
      "index": 9,
      "label": "Comment un contact remonte propre dans le CRM",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "index": 8,
      "label": "Comment un clic payé devient un lead",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "src/content/services/publicite-en-ligne.json",
      "index": 8,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "src/content/services/sequences-de-suivi/relance-devis.json",
      "index": 9,
      "label": "Comment un devis en attente revient signé",
      "background": "ink"
    }
  ],
  "tech-when-dual": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/finance-comptabilite.json",
      "slug": "finance-comptabilite",
      "route": "/cas-usages/finance-comptabilite",
      "index": 4,
      "label": "Ce qu'on automatise, et ce qu'il ne faut pas automatiser",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/rh.json",
      "slug": "rh",
      "route": "/cas-usages/rh",
      "index": 5,
      "label": "Ce que Waimia automatise en RH, et ce que nous ne faisons pas sans cadre renforcé",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/support-sav.json",
      "slug": "support-sav",
      "route": "/cas-usages/support-sav",
      "index": 4,
      "label": "Ce qu'on automatise, et ce qu'il ne faut pas automatiser",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/dijon.json",
      "slug": "dijon",
      "route": "/implantations/dijon",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Dijon",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lille.json",
      "slug": "lille",
      "route": "/implantations/lille",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Lille",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Lyon",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/marseille.json",
      "slug": "marseille",
      "route": "/implantations/marseille",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Marseille",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/nantes.json",
      "slug": "nantes",
      "route": "/implantations/nantes",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Nantes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 2,
      "label": "Ce qui se décide au devis pour une mission à Paris",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/strasbourg.json",
      "slug": "strasbourg",
      "route": "/implantations/strasbourg",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Strasbourg",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/toulouse.json",
      "slug": "toulouse",
      "route": "/implantations/toulouse",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Toulouse",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-platform-vs-openai-platform.json",
      "slug": "claude-platform-vs-openai-platform",
      "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "index": 7,
      "label": "Quand l'abonnement suffit, quand passer par la plateforme",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/agent-ia-definition.json",
      "slug": "agent-ia-definition",
      "route": "/ressources/guides/agent-ia-definition",
      "index": 12,
      "label": "Avez-vous besoin d'un agent, ou d'une automatisation ?",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 8,
      "label": "Ce qui vous concerne, ce qui ne vous concerne pas",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 9,
      "label": "Quelles tâches confier à Claude en PME, et lesquelles garder",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-design.json",
      "slug": "claude-design",
      "route": "/ressources/guides/claude-design",
      "index": 12,
      "label": "Claude Design suffit, ou il faut un professionnel ?",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-for-small-business.json",
      "slug": "claude-for-small-business",
      "route": "/ressources/guides/claude-for-small-business",
      "index": 12,
      "label": "Quand le plugin suffit, quand faire développer des connecteurs",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-plugins-entreprise.json",
      "slug": "claude-plugins-entreprise",
      "route": "/ressources/guides/claude-plugins-entreprise",
      "index": 11,
      "label": "Quand prendre un plugin officiel, quand en faire construire un",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-rgpd-pme.json",
      "slug": "claude-rgpd-pme",
      "route": "/ressources/guides/claude-rgpd-pme",
      "index": 13,
      "label": "Quand avancer seul, quand faire intervenir un DPO ou Waimia",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/cout-integration-claude-pme.json",
      "slug": "cout-integration-claude-pme",
      "route": "/ressources/guides/cout-integration-claude-pme",
      "index": 13,
      "label": "Quand le faire soi-même, quand payer un accompagnement",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/devis-automatise.json",
      "slug": "devis-automatise",
      "route": "/ressources/guides/devis-automatise",
      "index": 9,
      "label": "Quand automatiser vos devis, et quand s'abstenir",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/financement-formation-ia-opco.json",
      "slug": "financement-formation-ia-opco",
      "route": "/ressources/guides/financement-formation-ia-opco",
      "index": 9,
      "label": "Quand compter sur un financement, quand ne pas le faire",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 7,
      "label": "Quand faire développer un serveur MCP, et quand s'en passer",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/n8n-prix.json",
      "slug": "n8n-prix",
      "route": "/ressources/guides/n8n-prix",
      "index": 12,
      "label": "Quand n8n vaut son prix, et quand il ne le vaut pas",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/refonte-site-internet.json",
      "slug": "refonte-site-internet",
      "route": "/ressources/guides/refonte-site-internet",
      "index": 9,
      "label": "Refondre votre site, ou s'en abstenir",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 9,
      "label": "Ce qu'on automatise d'abord, ce qu'on n'automatise pas",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 3,
      "label": "Quand Make est le bon choix, et quand il ne l'est pas",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 3,
      "label": "Quand ça vaut le coût, et quand non",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-chatgpt-openai.json",
      "slug": "integration-chatgpt-openai",
      "route": "/services/integration-chatgpt-openai",
      "index": 5,
      "label": "Quand passer par ChatGPT et OpenAI, quand préférer Claude",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 10,
      "label": "Quand déployer Claude vous-même, et quand nous appeler",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude/integration-mistral-ai.json",
      "slug": "integration-mistral-ai",
      "route": "/services/integration-mistral-ai",
      "index": 5,
      "label": "Quand choisir Mistral AI, quand rester sur Claude",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/shopify.json",
      "slug": "shopify",
      "route": "/services/shopify",
      "index": 4,
      "label": "Shopify, ou une autre plateforme",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 4,
      "label": "Sur mesure, ou une autre plateforme",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 4,
      "label": "Webflow, ou une autre plateforme",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 4,
      "label": "WordPress, ou une autre plateforme",
      "background": "paper"
    }
  ],
  "versus-competitors": [
    {
      "collection": "audits",
      "file": "audits/audit-site-web-intelligent.json",
      "slug": "audit-site-web-intelligent",
      "route": "/audit-site-web-intelligent",
      "index": 3,
      "label": "Cet audit de site est fait pour vous si",
      "background": "paper-2"
    }
  ],
  "workflow-table": [
    {
      "collection": "services",
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 6,
      "label": "Ce qu'on automatise",
      "background": "paper"
    }
  ]
};

export const INLINE_CONSUMERS: Record<string, string[]> = {
  "architecture-diagram": [
    "src/pages/en/index.astro"
  ],
  "bordered-pullquote": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "case-card-grid": [
    "src/pages/atlas.astro",
    "src/pages/en/atlas.astro",
    "src/pages/en/index.astro",
    "src/pages/en/solutions/index.astro",
    "src/pages/index.astro",
    "src/pages/solutions/index.astro"
  ],
  "case-split": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "closing-cta-band": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "coming-soon-pills": [
    "src/pages/secteurs/_index.astro"
  ],
  "cta-band": [
    "src/components/templates/EssayTemplate.astro",
    "src/components/templates/TrustLegalTemplate.astro",
    "src/components/templates/UtilityTemplate.astro"
  ],
  "cta-final": [
    "src/components/templates/ConversionFunnelTemplate.astro",
    "src/components/templates/UtilityTemplate.astro",
    "src/pages/atlas.astro",
    "src/pages/en/atlas.astro"
  ],
  "curriculum-timeline": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "department-cta": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "department-stack": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "diagnostic-stages": [
    "src/pages/index.astro"
  ],
  "editorial-case-grid": [
    "src/pages/manifesto.astro"
  ],
  "editorial-preview": [
    "src/pages/atlas.astro",
    "src/pages/en/atlas.astro",
    "src/pages/en/index.astro"
  ],
  "editorial-prose": [
    "secteurs/[...slug]"
  ],
  "editorial-split-grid": [
    "src/pages/en/ressources/index.astro",
    "src/pages/ressources/index.astro"
  ],
  "eeat-panel": [
    "src/pages/index.astro"
  ],
  "engagement-ledger": [
    "src/pages/tarifs.astro"
  ],
  "faq-accordion": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "feature-grid": [
    "src/pages/en/index.astro"
  ],
  "hero-atlas": [
    "src/pages/atlas.astro",
    "src/pages/en/atlas.astro"
  ],
  "hero-author": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "hero-case-study": [
    "src/pages/cas-clients/[...slug].astro"
  ],
  "hero-conversion-funnel": [
    "src/components/templates/ConversionFunnelTemplate.astro"
  ],
  "hero-course": [
    "src/components/templates/CourseDetailTemplate.astro"
  ],
  "hero-essay": [
    "src/components/templates/EssayTemplate.astro"
  ],
  "hero-hub-listing": [
    "src/components/templates/UtilityTemplate.astro"
  ],
  "hero-hub-stats": [
    "src/pages/_expertise-claude.astro",
    "src/pages/agence/index.astro"
  ],
  "hero-lead-magnet": [
    "src/components/templates/LeadMagnetTemplate.astro"
  ],
  "hero-manifesto": [
    "src/pages/manifesto.astro"
  ],
  "hero-tech-layer": [
    "src/components/templates/TechnologiesDetailTemplate.astro"
  ],
  "hero-utility-masthead": [
    "src/components/templates/UtilityTemplate.astro"
  ],
  "keyword-strip": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "lead-capture-band": [
    "src/components/templates/LeadMagnetLanding.astro",
    "src/components/ui/organisms/conversion/MaturityDiagnostic.astro",
    "src/pages/ressources/outils/[...slug].astro",
    "src/pages/ressources/outils/charte-ia-entreprise.astro",
    "src/pages/ressources/outils/checklist-90-jours-claude.astro",
    "src/pages/ressources/outils/grille-taches-a-automatiser.astro"
  ],
  "market-cases": [
    "src/pages/cas-usages/index.astro"
  ],
  "maturity-pyramid": [
    "src/pages/en/index.astro"
  ],
  "method-diagram-list": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "method-timeline": [
    "src/pages/cas-clients/[...slug].astro"
  ],
  "numbered-layer-list": [
    "src/pages/technologies.astro"
  ],
  "offer-rail": [
    "src/pages/index.astro"
  ],
  "offer-tier-grid": [
    "src/pages/services/index.astro"
  ],
  "pain-points": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "persona-attributes-grid": [
    "src/pages/ressources/personas/[slug].astro"
  ],
  "proof-bar": [
    "src/pages/en/index.astro"
  ],
  "prose-aside": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "publications-panel": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "roi-band": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "sector-card-grid": [
    "src/pages/secteurs/_index.astro"
  ],
  "services-grid": [
    "src/pages/en/index.astro"
  ],
  "signed-writing-list": [
    "src/components/templates/AuthorPageTemplate.astro"
  ],
  "site-showcase": [
    "src/pages/cas-clients/[...slug].astro"
  ],
  "sticky-scroll-storytelling": [
    "src/pages/index.astro"
  ],
  "team-card-grid": [
    "src/pages/equipe/index.astro"
  ],
  "tech-capabilities-specs": [
    "src/pages/_expertise-claude.astro"
  ],
  "tech-integration-flow": [
    "src/pages/_expertise-claude.astro"
  ],
  "tech-models-table": [
    "src/pages/_expertise-claude.astro"
  ],
  "tech-positioning-split": [
    "src/pages/_expertise-claude.astro"
  ],
  "use-case-index": [
    "src/pages/en/index.astro"
  ],
  "workflow-table": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ]
};

/** Instances réelles d'un type ([] si jamais posé en page composable). */
export function getInstances(type: string): SectionInstance[] {
  return SECTION_INSTANCES[type] ?? [];
}

/** Consommateurs inline hand-authored d'un type ([] si aucun). */
export function getInlineConsumers(type: string): string[] {
  return INLINE_CONSUMERS[type] ?? [];
}
