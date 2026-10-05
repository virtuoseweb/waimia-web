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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 7,
      "label": "Un cas en cours, et le projet interne qui pose les garde-fous",
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 7,
      "label": "Deux projets où la saisie manuelle a disparu",
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
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 7,
      "label": "Deux projets où la saisie manuelle a disparu",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 7,
      "label": "Trois réalisations autour de Claude et de MCP",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 7,
      "label": "Cinq projets de ce volet",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 9,
      "label": "Résultats sur le terrain",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 12,
      "label": "Résultats sur le terrain",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 9,
      "label": "Résultats sur le terrain",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
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
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 4,
      "label": "Exemple type : le SAV d'un distributeur B2B",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 4,
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 4,
      "label": "Exemple type : un bureau d'études de 40 personnes",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 4,
      "label": "Exemple type : un éditeur de logiciel B2B sans équipe de prospection",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 4,
      "label": "Exemple type : les devis d'une entreprise du bâtiment",
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
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 3,
      "label": "Externaliser à une agence de SDR, ou installer un système",
      "background": "paper-2"
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 4,
      "label": "Pourquoi un MVP change le lancement",
      "background": "paper-2"
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 5,
      "label": "Pourquoi un cold email outillé change l'équation",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 4,
      "label": "Pourquoi un contenu citable change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 4,
      "label": "Pourquoi un maillage local change l'équation",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 4,
      "label": "Quand passer du clé-en-main au sur-mesure",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 4,
      "label": "De Webflow seul au Webflow qui qualifie",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 4,
      "label": "Le même WordPress, deux trajectoires",
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
      "label": "Claude Code face à Cursor, capacité par capacité",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 2,
      "label": "Claude vs ChatGPT : ce qui est vérifiable",
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
      "index": 6,
      "label": "Dans quels cas chacune convient",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 4,
      "label": "Choisir selon votre situation",
      "background": "paper"
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 6,
      "label": "Si vous déployez un système à haut risque : ce que l'article 26 demandera au 2 décembre 2027",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 7,
      "label": "Six questions pour partir du bon pied",
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
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 6,
      "label": "Un chatbot de support n'est pas utile si",
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
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 6,
      "label": "n8n n'est pas le bon choix si",
      "background": "paper"
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 6,
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 6,
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 6,
      "label": "La prospection automatisée ne convient pas si",
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
      "label": "Niveau 3 : à l'issue, vous savez construire un système IA avec OpenAI",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 3,
      "label": "Niveau 1 : à l'issue, vous savez utiliser Claude",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 5,
      "label": "Niveau 2 : à l'issue, vous savez étendre Claude",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 7,
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
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
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 2,
      "label": "Définition · format extractible",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
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
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 5,
      "label": "Ce qui est livré",
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 5,
      "label": "Ce qui vous reste à la fin",
      "background": "paper-3"
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 5,
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 5,
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 5,
      "label": "Ce qui vous reste si vous arrêtez",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 5,
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
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 4,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
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
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 2,
      "label": "#2",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 1,
      "label": "#1",
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
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 2,
      "label": "#2",
      "background": "paper-2"
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
      "index": 6,
      "label": "#6",
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
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
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
      "index": 6,
      "label": "#6",
      "variant": "note",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 6,
      "label": "#6",
      "variant": "note",
      "background": "paper"
    }
  ],
  "editorial-prose": [
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
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
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
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
      "index": 7,
      "label": "#7",
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
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 8,
      "label": "#8",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 2,
      "label": "#2",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 6,
      "label": "#6",
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
      "index": 9,
      "label": "#9",
      "background": "paper-2"
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
      "index": 5,
      "label": "#5",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 7,
      "label": "#7",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 9,
      "label": "#9",
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
      "index": 9,
      "label": "#9",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 10,
      "label": "#10",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
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
      "index": 7,
      "label": "#7",
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 3,
      "label": "#3",
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 3,
      "label": "#3",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 3,
      "label": "#3",
      "background": "paper-2"
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
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 4,
      "label": "#4",
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
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 9,
      "label": "#9",
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
      "index": 4,
      "label": "#4",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 4,
      "label": "#4",
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
      "file": "comparatifs/n8n-vs-make.json",
      "slug": "n8n-vs-make",
      "route": "/ressources/comparatifs/n8n-vs-make",
      "index": 2,
      "label": "n8n vs Make, critère par critère",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 4,
      "label": "Le calendrier de l'AI Act au 5 octobre 2026",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 3,
      "label": "Où Cowork est disponible, selon Anthropic",
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
      "index": 8,
      "label": "MCP dans les plateformes de Claude et d'OpenAI",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 4,
      "label": "Le coût complet : six postes, dont trois qu'on oublie",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 6,
      "label": "Exemple illustratif : la saisie de factures fournisseurs",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 8,
      "label": "Le tableau de calcul, ligne par ligne",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 4,
      "label": "Les cinq critères, et comment les mesurer",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 6,
      "label": "Selon le profil de la tâche, quoi faire",
      "variant": "editorial",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 7,
      "label": "Par fonction : le bon premier candidat",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/automatisation.json",
      "slug": "automatisation",
      "route": "src/content/formations/automatisation.json",
      "index": 5,
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
      "index": 10,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 5,
      "label": "Prérequis, format, durée et tarif",
      "variant": "editorial",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 5,
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
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 6,
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
      "label": "Programme du niveau 2 : devenir expert de l'application",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 8,
      "label": "Programme du niveau 3 : deux parcours, un tronc commun",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 4,
      "label": "Programme du niveau 1 : utiliser l'application Claude",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 6,
      "label": "Programme du niveau 2 : devenir expert de l'application",
      "background": "paper-3"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 8,
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
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
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 8,
      "label": "#8",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 8,
      "label": "#8",
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 9,
      "label": "#9",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 8,
      "label": "#8",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 8,
      "label": "#8",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 14,
      "label": "#14",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 12,
      "label": "#12",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 11,
      "label": "#11",
      "variant": "media"
    }
  ],
  "faq-accordion": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 0,
      "label": "Questions avant de réserver",
      "background": "paper-2"
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 5,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
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
      "index": 9,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 6,
      "label": "Claude vs ChatGPT : vos questions",
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 12,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 8,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 9,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 11,
      "label": "Questions fréquentes",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 11,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 12,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 10,
      "label": "Chatbot et agent de service client : vos questions",
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
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 9,
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 10,
      "label": "Automatisation des processus : vos questions",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 9,
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
      "label": "Tableau de bord et reporting automatisé : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 10,
      "label": "Claude en entreprise : vos questions",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 9,
      "label": "Prospection automatisée : vos questions",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 10,
      "label": "SEO et GEO : vos questions",
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
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 10,
      "label": "Création de site internet : vos questions",
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
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 12,
      "label": "Ce que vous nous demandez",
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
      "index": 8,
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
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 13,
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
      "index": 8,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 8,
      "label": "Questions fréquentes",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 15,
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 13,
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 12,
      "label": "Webflow, ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 12,
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
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 3,
      "label": "Trois outils, branchés au reste",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 7,
      "label": "Les briques d'un MVP SaaS qui se vend",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 3,
      "label": "Cold email B2B et RGPD : est-ce légal en France ?",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 8,
      "label": "Les briques d'un cold email qui arrive en boîte",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 7,
      "label": "Les briques d'un référencement IA qui cite",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 7,
      "label": "Les briques d'un référencement local qui capte",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 7,
      "label": "Les briques du sur-mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 7,
      "label": "Ce qu'on branche sur Webflow",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 7,
      "label": "Ce qu'on branche sur WordPress",
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
      "label": "Quatre lignes de fracture",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 3,
      "label": "Les cinq usages par lesquels commencer",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 6,
      "label": "Les 6 prérequis à poser avant le premier compte",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 11,
      "label": "Les campagnes continuent de s'affiner après le lancement",
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
      "index": 1,
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 6,
      "label": "Commençons par 45 minutes en visio.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 6,
      "label": "Deux processus à automatiser, identifiés en 45 minutes.",
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
      "index": 10,
      "label": "La bonne plateforme se choisit sur vos données et vos contraintes.",
      "background": "ink"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 7,
      "label": "L'outil compte moins que le cadre.",
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 13,
      "label": "Savoir lesquels de vos usages d'IA demandent une attention, et lesquels n'en demandent aucune.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 9,
      "label": "Savoir quelles tâches confier à Claude, et avec quelles règles.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 10,
      "label": "Vous savez par où commencer. Cadrons votre premier agent.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 12,
      "label": "Brancher vos outils sur un assistant, avec des droits que vous avez décidés.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 12,
      "label": "Un seuil de rentabilité calculé sur vos chiffres, pas sur une moyenne de marché.",
      "background": "ink"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 13,
      "label": "Votre liste de tâches, classée et tranchée en 45 minutes.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 11,
      "label": "Combien de demandes identiques recevez-vous chaque semaine ?",
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
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 10,
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 11,
      "label": "Quel process vous coûte le plus d'heures chaque semaine ?",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 10,
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 11,
      "label": "Claude est déjà utilisé chez vous. Reste à l'encadrer.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 10,
      "label": "Le problème vient-il de la page, ou de ce qui suit ?",
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
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 11,
      "label": "Vos pages répondent-elles aux questions de vos clients ?",
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
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 11,
      "label": "Que devient une demande après le formulaire ?",
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
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 13,
      "label": "Câbler votre pipeline.",
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
      "index": 9,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/chatgpt.json",
      "slug": "chatgpt",
      "route": "src/content/formations/chatgpt.json",
      "index": 14,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 14,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
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
      "index": 9,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
      "background": "ink"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 9,
      "label": "On construit le programme sur vos tâches, pas sur un catalogue.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 13,
      "label": "Sortez un MVP vendable, pas une démo.",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 16,
      "label": "Faites arriver vos cold emails en boîte.",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 13,
      "label": "Cité par ChatGPT, Claude et Perplexity.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 14,
      "label": "Trouvé par vos clients de proximité.",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 13,
      "label": "Un site qui se modifie brique par brique.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 13,
      "label": "Donnez de l'intelligence à votre Webflow.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 13,
      "label": "Mettez votre WordPress au travail.",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 0,
      "label": "Chatbot et agent IA pour votre service client",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 0,
      "label": "Consultant IA indépendant pour PME",
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
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 0,
      "label": "Un tableau de bord à jour, sans reporting refait à la main.",
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
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 0,
      "label": "Des landing pages qui convertissent, un tunnel qui trie vos leads.",
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
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 0,
      "label": "Visible sur Google, cité par les IA : le référencement double couche.",
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
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 0,
      "label": "Un site internet qui vend, pas une vitrine qui dort.",
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
      "label": "Un développement commercial B2B qui ne s'arrête jamais.",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 0,
      "label": "Développement de MVP SaaS.",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 0,
      "label": "Cold email B2B pour PME.",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 0,
      "label": "Référencement IA et agence GEO pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 0,
      "label": "Référencement local pour PME et artisans.",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 0,
      "label": "Site sur mesure & CMS headless.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 0,
      "label": "Votre site Webflow, rendu intelligent.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 0,
      "label": "Création et refonte de site WordPress.",
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
      "label": "Automatiser les tâches administratives",
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
      "label": "Déployer l'IA en conformité : AI Act et RGPD pour les PME",
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 0,
      "label": "Agence IA et automatisation à Lyon",
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
      "file": "implantations/paris.json",
      "slug": "paris",
      "route": "/implantations/paris",
      "index": 0,
      "label": "Agence IA à Paris, sans bureau à Paris",
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 0,
      "label": "AI Act pour les PME : le calendrier à jour et ce qui vous concerne vraiment",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 0,
      "label": "Claude Cowork : ce que c'est, ce qui change, comment l'utiliser en PME",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 0,
      "label": "Déployer Claude dans votre PME.",
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
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 0,
      "label": "Agence Make pour PME",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/base-de-connaissance-ia.json",
      "slug": "base-de-connaissance-ia",
      "route": "/services/base-de-connaissance-ia",
      "index": 0,
      "label": "Base de connaissance IA : le second cerveau de votre entreprise",
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
      "label": "Formations IA et automatisation pour vos équipes",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 8,
      "label": "Le MVP SaaS est une brique du système",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 9,
      "label": "Le cold email s'assemble au reste du système commercial",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 8,
      "label": "Sur mesure, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 8,
      "label": "Webflow, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 8,
      "label": "WordPress, ou une autre base",
      "background": "paper-3"
    }
  ],
  "key-metric-grid": [
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 2,
      "label": "Un plan, pas une promesse",
      "variant": "accent",
      "background": "paper"
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 5,
      "label": "Les 6 niveaux d'un produit SaaS",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 6,
      "label": "Les 6 niveaux d'un cold email",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 5,
      "label": "Les 6 niveaux de citabilité IA",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 5,
      "label": "Les 6 niveaux de visibilité locale",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 5,
      "label": "Les 6 niveaux d'un site qui reste le vôtre",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 5,
      "label": "Les 6 niveaux d'un Webflow",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 5,
      "label": "Les 6 états d'un WordPress",
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
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 3,
      "label": "Le lancement qu'un MVP corrige.",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 4,
      "label": "Pourquoi vos mails finissent en spam",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 3,
      "label": "Pourquoi les IA ne vous citent pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 3,
      "label": "Pourquoi vos clients de proximité ne vous trouvent pas",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 3,
      "label": "Quand le clé-en-main ne suffit plus.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 3,
      "label": "Là où Webflow seul plafonne.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 3,
      "label": "Le WordPress qu'on refond.",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 8,
      "label": "Prix d'un chatbot de service client",
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
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 7,
      "label": "Prix d'une prestation n8n",
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
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 7,
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
      "label": "Prix d'un tableau de bord automatisé",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 8,
      "label": "Combien coûte Claude en entreprise",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 7,
      "label": "Trois formules, un abonnement mensuel sans engagement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 8,
      "label": "Prix d'une prestation SEO et GEO",
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
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 8,
      "label": "Combien coûte un site internet qui vend",
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
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 11,
      "label": "Deux façons d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
      "index": 10,
      "label": "Combien coûte un MVP SaaS",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 13,
      "label": "Trois formules, un abonnement mensuel sans engagement",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 10,
      "label": "Deux façons de rendre votre marque citable",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 11,
      "label": "Deux façons de gagner en visibilité locale",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 10,
      "label": "Quatre façons de construire sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 10,
      "label": "Quatre façons de rendre votre Webflow intelligent",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
      "index": 10,
      "label": "Quatre façons de poser votre WordPress",
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 9,
      "label": "Quoi faire, échéance par échéance",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 5,
      "label": "Démarrer en PME en quatre étapes",
      "background": "paper-3"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 5,
      "label": "Trois phases pour démarrer juste",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 5,
      "label": "La cartographie en cinq étapes, sur deux semaines",
      "background": "paper-3"
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
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
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
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
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
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
      "file": "services/template-service-ref.json",
      "slug": "template-service-ref",
      "route": "/services/template-service-ref",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "src/content/services/applications-internes/mvp-saas.json",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
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
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "src/content/services/site-web-ia/sur-mesure.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "src/content/services/site-web-ia/webflow.json",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "src/content/services/site-web-ia/wordpress.json",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 4,
      "label": "#4",
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 4,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
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
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "comparatifs",
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 5,
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
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 11,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 7,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/mcp-claude.json",
      "slug": "mcp-claude",
      "route": "/ressources/guides/mcp-claude",
      "index": 10,
      "label": "Pour aller plus loin",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/roi-automatisation.json",
      "slug": "roi-automatisation",
      "route": "/ressources/guides/roi-automatisation",
      "index": 10,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "guides",
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 11,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisation-make.json",
      "slug": "automatisation-make",
      "route": "/services/automatisation-make",
      "index": 8,
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
      "index": 7,
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
      "file": "formations/claude.json",
      "slug": "claude",
      "route": "src/content/formations/claude.json",
      "index": 12,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/make.json",
      "slug": "make",
      "route": "src/content/formations/make.json",
      "index": 7,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
    {
      "collection": "formations",
      "file": "formations/n8n.json",
      "slug": "n8n",
      "route": "src/content/formations/n8n.json",
      "index": 7,
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
      "label": "Un outil, un niveau : votre formation",
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
      "label": "Cinq formations, construites sur vos tâches",
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
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "index": 10,
      "label": "Comment un cold email arrive en boîte et répond",
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
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "src/content/services/seo-geo-contenu/referencement-ia.json",
      "index": 8,
      "label": "Comment une marque se met à être citée",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
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
      "file": "implantations/lyon.json",
      "slug": "lyon",
      "route": "/implantations/lyon",
      "index": 2,
      "label": "Ce qui se fait à distance, ce qui se fait à Lyon",
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
      "collection": "guides",
      "file": "guides/ai-act-pme-calendrier.json",
      "slug": "ai-act-pme-calendrier",
      "route": "/ressources/guides/ai-act-pme-calendrier",
      "index": 7,
      "label": "Ce qui vous concerne, ce qui ne vous concerne pas",
      "background": "paper"
    },
    {
      "collection": "guides",
      "file": "guides/claude-cowork.json",
      "slug": "claude-cowork",
      "route": "/ressources/guides/claude-cowork",
      "index": 4,
      "label": "Quand l'utiliser en PME, et quand s'abstenir",
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
      "file": "guides/taches-a-automatiser-pme.json",
      "slug": "taches-a-automatiser-pme",
      "route": "/ressources/guides/taches-a-automatiser-pme",
      "index": 8,
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
    }
  ],
  "testimonial-wall": [
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "src/content/services/seo-geo-contenu/seo-local.json",
      "index": 10,
      "label": "Ce que disent les équipes enfin visibles localement",
      "background": "paper-2"
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
