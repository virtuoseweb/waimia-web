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
      "index": 5,
      "label": "Simon Beros",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 5,
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
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 5,
      "label": "Simon Beros",
      "background": "paper"
    }
  ],
  "bento-grid": [
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 3,
      "label": "Les briques qui relient vos outils",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 3,
      "label": "Les briques qui captent vos leads",
      "background": "ink"
    },
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
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 3,
      "label": "Les briques qui ancrent vos standards",
      "background": "ink"
    }
  ],
  "branded-callout": [
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
      "index": 14,
      "label": "Des agents tenus sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 9,
      "label": "Des agents tenus sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 14,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 12,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 9,
      "label": "Décisions tenues sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 10,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 9,
      "label": "Trafic mieux converti sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 9,
      "label": "Leads mieux captés sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 9,
      "label": "Tenus sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 12,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 9,
      "label": "Du trafic mieux transformé sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 10,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 11,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 5,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 9,
      "label": "Résultats sur le terrain",
      "background": "ink"
    }
  ],
  "comparison-duo": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 4,
      "label": "Ce que l'audit gratuit fait et ne fait pas",
      "background": "ink"
    },
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
      "index": 4,
      "label": "Du vide entre les outils à la donnée fluide",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 4,
      "label": "Du trafic perdu au lead qualifié",
      "background": "paper-2"
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
      "index": 4,
      "label": "De la dépendance à un système qui tient",
      "background": "paper-2"
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
      "index": 5,
      "label": "Pourquoi un agent change le support",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 5,
      "label": "Pourquoi un agent change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 4,
      "label": "Pourquoi un outil sur mesure change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 5,
      "label": "Deux façons d'automatiser, deux coûts d'ownership",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 5,
      "label": "Pourquoi un process automatisé change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 5,
      "label": "Pourquoi un cold email outillé change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 4,
      "label": "Pourquoi un cadrage tranché change la décision",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 4,
      "label": "Racheter un CRM de plus, ou activer celui que vous avez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 5,
      "label": "Pourquoi une donnée centralisée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 4,
      "label": "Du POC qui dort à l'agent en production",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 4,
      "label": "Pourquoi un CRM branché change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 4,
      "label": "Pourquoi une landing dédiée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 4,
      "label": "Pourquoi un tunnel instrumenté change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 4,
      "label": "Pourquoi un site entretenu et poussé change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 4,
      "label": "Pourquoi un MVP change le lancement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 5,
      "label": "Pourquoi une prospection instrumentée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 4,
      "label": "Pourquoi une régie instrumentée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 4,
      "label": "Pourquoi un contenu citable change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 4,
      "label": "Pourquoi une relance instrumentée change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 4,
      "label": "Pourquoi un contenu structuré change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 4,
      "label": "Pourquoi un maillage local change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 4,
      "label": "Une newsletter de plus, ou un nurturing déclenché par le comportement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 4,
      "label": "Ce qu'un builder IA ne fait pas",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 4,
      "label": "Quand passer du clé-en-main au sur-mesure",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 4,
      "label": "Pourquoi un système instrumenté change l'équation",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 4,
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
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 4,
      "label": "De Webflow seul au Webflow qui qualifie",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 4,
      "label": "Le même WordPress, deux trajectoires",
      "background": "paper-2"
    }
  ],
  "comparison-pricing-callout": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 5,
      "label": "Un regard d'ingénieur, pas un argumentaire commercial",
      "background": "paper"
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
      "label": "Claude vs ChatGPT, point par point",
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
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 3,
      "label": "Les cinq niveaux de maturité IA, en clair",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
      "index": 4,
      "label": "Six questions pour repérer le bon candidat",
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
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 4,
      "label": "Waimia est pour vous si vous vous reconnaissez",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 4,
      "label": "Six signes qu'un studio IA local vous aiderait",
      "background": "paper"
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
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 4,
      "label": "Choisir selon votre besoin",
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
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 6,
      "label": "Six questions pour situer votre maturité",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 7,
      "label": "Six questions pour partir du bon pied",
      "background": "paper"
    }
  ],
  "definition-extract": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 3,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 3,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 3,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 3,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 3,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 2,
      "label": "Définition · format extractible",
      "background": "paper"
    }
  ],
  "deliverables-grid": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 1,
      "label": "Trois livrables activables, pas un diaporama",
      "background": "paper-2"
    },
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
      "index": 7,
      "label": "Ce qu'on met en production",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 6,
      "label": "Ce qu'on dépose chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 6,
      "label": "Ce qu'on dépose chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 6,
      "label": "Ce qu'on branche chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 6,
      "label": "Ce qu'on branche chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 6,
      "label": "Ce qu'on dépose chaque mois",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 7,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 6,
      "label": "Ce qu'on branche chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 6,
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
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 6,
      "label": "Ce que vous récupérez concrètement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "index": 2,
      "label": "Où en est votre entreprise ?",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
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
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
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
      "index": 1,
      "label": "#1",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 1,
      "label": "#1",
      "background": "paper-2"
    }
  ],
  "eeat-panel": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 17,
      "label": "#17",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 17,
      "label": "#17",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 15,
      "label": "#15",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 14,
      "label": "#14",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 14,
      "label": "#14",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 11,
      "label": "#11",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 15,
      "label": "#15",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 14,
      "label": "#14",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 14,
      "label": "#14",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 12,
      "label": "#12",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 11,
      "label": "#11",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 13,
      "label": "#13",
      "variant": "media"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 14,
      "label": "#14",
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
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 11,
      "label": "#11",
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
    }
  ],
  "faq-accordion": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 8,
      "label": "Ce que vous nous demandez",
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
      "index": 7,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 7,
      "label": "Ce que vous nous demandez",
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
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 7,
      "label": "Ce que vous nous demandez",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
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
      "index": 6,
      "label": "Ce que les PME bordelaises nous demandent",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 6,
      "label": "Ce que les entreprises de Montpellier nous demandent",
      "background": "paper"
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
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 6,
      "label": "Ce que vous nous demandez",
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
      "index": 9,
      "label": "Ce que vous nous demandez",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 9,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 18,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 18,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 16,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 15,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 15,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 12,
      "label": "Ce que vous nous demandez",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 16,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 15,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 15,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 13,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 12,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 14,
      "label": "Ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 15,
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
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 12,
      "label": "Webflow, ce que vous nous demandez",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 9,
      "label": "Ce qu'un agent de support exécute chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 6,
      "label": "Ce qu'un agent exécute chez vous",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 7,
      "label": "Les briques d'un outil interne solide",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 9,
      "label": "Les briques d'un workflow n8n qui tient",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 6,
      "label": "Les briques d'une automatisation qui tient",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 3,
      "label": "Cold email B2B et RGPD : est-ce légal en France ?",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 8,
      "label": "Les briques d'un cold email qui arrive en boîte",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 7,
      "label": "Quatre décisions avant la moindre ligne de code",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 7,
      "label": "Les briques d'un CRM qui note et route",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 6,
      "label": "Les briques d'un reporting automatisé qui tient",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 7,
      "label": "Déployer Claude dans votre entreprise",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 8,
      "label": "Claude ou ChatGPT pour votre entreprise",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 7,
      "label": "Les briques d'un CRM branché et propre, sur HubSpot ou Pipedrive",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 7,
      "label": "Les briques d'une landing qui convertit le clic payé",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 7,
      "label": "Les briques d'un tunnel qui convertit",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 7,
      "label": "Les briques d'un forfait qui fait vivre le site",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 7,
      "label": "Les briques d'un MVP SaaS qui se vend",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 3,
      "label": "Prospection B2B et RGPD : ce que la loi autorise vraiment",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 8,
      "label": "Les briques de la prospection automatisée",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 7,
      "label": "Les leviers d'une publicité qui rapporte",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 7,
      "label": "Les briques d'un référencement IA qui cite",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 7,
      "label": "Les briques d'une relance de devis qui signe",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 7,
      "label": "Les briques d'une machine éditoriale",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 7,
      "label": "Les briques d'un référencement local qui capte",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 7,
      "label": "Les briques d'un suivi qui relance et réveille",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 7,
      "label": "Les briques d'un site web intelligent",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 7,
      "label": "Les briques du sur-mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 7,
      "label": "Les briques, de l'acquisition au commercial",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 7,
      "label": "Les modules qui alimentent votre pipeline commercial",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 7,
      "label": "Ce qu'on branche sur Webflow",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 7,
      "label": "Ce qu'on branche sur WordPress",
      "background": "paper"
    }
  ],
  "feature-split-media": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 6,
      "label": "Besoin d'y voir plus loin ? La grille des 47 critères",
      "background": "paper-2"
    },
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
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 1,
      "label": "Là où la donnée se perd",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/centraliser-donnees.json",
      "slug": "centraliser-donnees",
      "route": "/cas-usages/centraliser-donnees",
      "index": 2,
      "label": "Connecter, pas tout remplacer",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 1,
      "label": "Là où les leads fuient",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 2,
      "label": "Une chaîne de conversion sans fuite",
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
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 1,
      "label": "Là où le savoir-faire se fragilise",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
      "index": 2,
      "label": "Le même process, deux mondes",
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
      "collection": "implantations",
      "file": "implantations/bordeaux.json",
      "slug": "bordeaux",
      "route": "/implantations/bordeaux",
      "index": 2,
      "label": "Deux leviers, un seul partenaire",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 2,
      "label": "Ce que change un partenaire à Montpellier",
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
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 3,
      "label": "Ce que chacun fait vraiment bien",
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
      "index": 5,
      "label": "Ce qui détermine votre niveau réel",
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
      "label": "Là où Claude paie le plus vite",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 13,
      "label": "L'agent de support continue de rendre du temps après son déploiement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 13,
      "label": "n8n par défaut, Zapier quand il suffit",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 11,
      "label": "Les campagnes continuent de s'affiner après le lancement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 10,
      "label": "Le CRM continue de s'affiner après le branchement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 10,
      "label": "Le CRM reste propre après le branchement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 11,
      "label": "La séquence continue de s'affiner après le lancement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 10,
      "label": "La relance continue de s'affiner après le lancement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 10,
      "label": "Les séquences continuent de s'affiner après le lancement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 9,
      "label": "Comment l'acquisition alimente le système commercial",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 10,
      "label": "Le système commercial continue d'apprendre après le lancement",
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
    }
  ],
  "footer-cta-band": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 9,
      "label": "Quarante-cinq minutes pour savoir où l'IA change la donne chez vous.",
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
      "index": 8,
      "label": "Faites circuler vos données au lieu de les recopier.",
      "background": "ink"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 8,
      "label": "Arrêtez de perdre le trafic que vous payez déjà.",
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
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 8,
      "label": "Transformez un savoir-faire fragile en système qui tient.",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
      "index": 7,
      "label": "Vous avez vu le résultat. Trouvons votre premier chantier.",
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
      "index": 7,
      "label": "Bordeaux, Gironde. Commençons par un audit gratuit.",
      "background": "ink"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 7,
      "label": "Un studio IA près de chez vous, dans l'Hérault.",
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
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 7,
      "label": "Le bon outil dépend de votre cas, pas d'un classement.",
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
      "index": 10,
      "label": "Vous savez à quel niveau vous êtes. Posons la marche suivante.",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 10,
      "label": "Vous savez par où commencer. Cadrons votre premier agent.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 19,
      "label": "Confiez le support récurrent à un agent qui répond.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 13,
      "label": "Confiez vos tâches répétitives à un agent qui exécute.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 13,
      "label": "Donnez à votre métier l'outil qu'il mérite.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 19,
      "label": "Faites de n8n votre socle d'automatisation.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 13,
      "label": "Rendez à vos équipes les heures que la saisie leur prend.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 17,
      "label": "Faites arriver vos cold emails en boîte.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 13,
      "label": "Sortez de l'hésitation, tracez votre trajectoire IA.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 16,
      "label": "Transformez votre CRM en machine à prioriser.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 13,
      "label": "Décidez sur des chiffres à jour, pas au doigt mouillé.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 14,
      "label": "Mettez votre premier agent en production ce trimestre",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 16,
      "label": "Faites remonter votre donnée toute seule.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 14,
      "label": "Convertissez le trafic que vous payez.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 14,
      "label": "Transformez le trafic en leads qualifiés et priorisés.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 13,
      "label": "Donnez à votre site une seconde vie, chaque mois.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 13,
      "label": "Sortez un MVP vendable, pas une démo.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 17,
      "label": "Transformez votre prospection en machine à rendez-vous.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 14,
      "label": "Transformez votre budget pub en leads mesurés.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 14,
      "label": "Cité par ChatGPT, Claude et Perplexity.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 16,
      "label": "Faites signer les devis que vous oubliez.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 14,
      "label": "Visible sur Google, durablement.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 14,
      "label": "Trouvé par vos clients de proximité.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 16,
      "label": "Transformez votre suivi en machine à réchauffer.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 14,
      "label": "Transformez votre site en machine à qualifier.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 13,
      "label": "Un site qui se modifie brique par brique.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 15,
      "label": "Une infrastructure qui attire, capte et qualifie, puis passe le relais au commercial.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 16,
      "label": "Un système qui alimente, qualifie et relance votre pipeline.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systemes-operationnels-ia.json",
      "slug": "systemes-operationnels-ia",
      "route": "/services/systemes-operationnels-ia",
      "index": 9,
      "label": "Faites tourner vos opérations sur un système, plus sur des personnes.",
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
      "index": 13,
      "label": "Donnez de l'intelligence à votre Webflow.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "label": "Un agent de support client.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 0,
      "label": "Des agents IA qui exécutent vos tâches. Sous votre contrôle.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 0,
      "label": "Une application métier sur mesure.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 0,
      "label": "Automatisation n8n pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 0,
      "label": "Automatisez vos processus métier. Fini la ressaisie entre six outils.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 0,
      "label": "Cold email B2B pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 0,
      "label": "Consultant IA pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 0,
      "label": "Un CRM avec lead scoring qui ne perd plus un lead.",
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
      "label": "Intégration Claude en entreprise.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 0,
      "label": "Intégration CRM pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 0,
      "label": "Une landing page Google Ads qui transforme le clic payé en lead.",
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
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 0,
      "label": "La maintenance qui fait vivre votre site web.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 0,
      "label": "Développement de MVP SaaS.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 0,
      "label": "Prospection automatisée pour PME B2B.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 0,
      "label": "Votre budget publicitaire, dépensé sur les intentions qui rapportent.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 0,
      "label": "Référencement IA et agence GEO pour PME.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 0,
      "label": "Relance de devis automatique.",
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
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 0,
      "label": "Référencement local pour PME et artisans.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 0,
      "label": "Le lead nurturing qui réveille vos prospects dormants.",
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
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 0,
      "label": "Site sur mesure & CMS headless.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 0,
      "label": "Générer des leads B2B qualifiés, sans racheter un flux chaque mois.",
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
      "label": "Automatisez votre entreprise avec l'IA, sans perdre le contrôle.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 0,
      "label": "Votre site Webflow, rendu intelligent.",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
      "index": 0,
      "label": "Création et refonte de site WordPress.",
      "background": "paper"
    }
  ],
  "hero-split-media": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 0,
      "label": "Audit IA gratuit pour PME.",
      "background": "paper"
    },
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
      "label": "Centraliser ses données.",
      "background": "paper"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 0,
      "label": "Générer plus de leads.",
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
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 0,
      "label": "Standardiser ses processus.",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
      "index": 0,
      "label": "Une intégration Claude, avant/après.",
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
      "label": "Agence IA à Bordeaux.",
      "background": "paper"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 0,
      "label": "Votre studio IA à Montpellier.",
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
      "file": "comparatifs/claude-vs-chatgpt-pme.json",
      "slug": "claude-vs-chatgpt-pme",
      "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "index": 0,
      "label": "Claude vs ChatGPT pour une PME.",
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
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 0,
      "label": "Diagnostic de maturité IA.",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 0,
      "label": "Déployer Claude dans votre PME.",
      "background": "paper"
    }
  ],
  "hover-reveal-list": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 10,
      "label": "L'agent de support ouvre sur le système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 7,
      "label": "Autour de l'agent, le reste du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 8,
      "label": "L'outil interne est une brique du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 10,
      "label": "n8n est une brique du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 7,
      "label": "L'automatisation est une brique du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 9,
      "label": "Le cold email s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 8,
      "label": "Une fois tranché, le chantier bascule à l'exécution",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 8,
      "label": "Le CRM s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 7,
      "label": "Le reporting est une brique du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 9,
      "label": "Cinq portes vers le même système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 8,
      "label": "L'intégration s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 8,
      "label": "La maintenance est une brique du dispositif",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 8,
      "label": "Le MVP SaaS est une brique du système",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 9,
      "label": "La prospection s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 8,
      "label": "La relance de devis s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 8,
      "label": "Le suivi s'assemble au reste du système commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 8,
      "label": "Quatre déclinaisons, une même base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 8,
      "label": "Sur mesure, ou une autre base",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 8,
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
      "index": 8,
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
  "logo-marquee": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 8,
      "label": "Les outils qu'on branche à votre agent de support",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 8,
      "label": "Les outils qu'on orchestre dans n8n",
      "background": "ink"
    }
  ],
  "manifesto-statement": [
    {
      "collection": "diagnostics",
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 4,
      "label": "Le vrai critère"
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 6,
      "label": "Les 6 niveaux d'un support assisté",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 5,
      "label": "Les 6 niveaux d'un outil métier interne",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 6,
      "label": "Les 6 niveaux d'automatisation avec n8n",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 6,
      "label": "Les 6 niveaux d'un cold email",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 5,
      "label": "Les 6 niveaux d'une décision IA",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 5,
      "label": "Les 6 niveaux d'un CRM",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 5,
      "label": "Les 6 niveaux de maturité IA",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 5,
      "label": "Les 6 niveaux d'une intégration CRM",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 5,
      "label": "Les 6 niveaux d'une landing Google Ads",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 5,
      "label": "Les 6 niveaux d'un tunnel de conversion",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 5,
      "label": "Les 6 niveaux d'un site entretenu",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 5,
      "label": "Les 6 niveaux d'un produit SaaS",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 6,
      "label": "Les 6 niveaux d'une prospection",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 5,
      "label": "Les 6 niveaux d'une publicité en ligne",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 5,
      "label": "Les 6 niveaux de citabilité IA",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 5,
      "label": "Les 6 niveaux d'une relance de devis",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 5,
      "label": "Les 6 niveaux de visibilité SEO et GEO",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 5,
      "label": "Les 6 niveaux de visibilité locale",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 5,
      "label": "Les 6 niveaux d'un suivi",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 5,
      "label": "Les 6 niveaux d'un site web intelligent",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 5,
      "label": "Les 6 niveaux d'un site qui reste le vôtre",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 5,
      "label": "Les 6 niveaux d'acquisition",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 5,
      "label": "Les 6 niveaux d'un développement commercial",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 5,
      "label": "Les 6 niveaux d'un Webflow",
      "background": "paper-3"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 4,
      "label": "Le support qu'un agent soulage.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 4,
      "label": "Pourquoi le répétitif vous coûte cher",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 3,
      "label": "Pourquoi vos outils maison vous freinent",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 4,
      "label": "Le moment où on passe à n8n.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 4,
      "label": "Pourquoi vos équipes perdent leurs journées",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 4,
      "label": "Pourquoi vos mails finissent en spam",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 3,
      "label": "Là où une décision IA se grippe.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 3,
      "label": "Pourquoi votre CRM sans scoring laisse filer des ventes",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 4,
      "label": "Pourquoi vous décidez sans y voir clair",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 3,
      "label": "Pourquoi votre IA ne produit rien",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 3,
      "label": "Pourquoi votre CRM non branché reste un cimetière",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 3,
      "label": "Pourquoi votre trafic payant ne convertit pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 3,
      "label": "Pourquoi votre trafic ne devient pas du business",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 3,
      "label": "Là où un site meurt après la livraison.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/applications-internes/mvp-saas.json",
      "slug": "mvp-saas",
      "route": "/services/mvp-saas",
      "index": 3,
      "label": "Le lancement qu'un MVP corrige.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 4,
      "label": "Pourquoi votre prospection outbound ne remplit pas le pipeline",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 3,
      "label": "Pourquoi votre budget pub ne devient pas du business",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 3,
      "label": "Pourquoi les IA ne vous citent pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 3,
      "label": "Pourquoi vos devis restent sans réponse",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 3,
      "label": "Pourquoi votre contenu ne rapporte rien",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 3,
      "label": "Pourquoi vos clients de proximité ne vous trouvent pas",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 3,
      "label": "Pourquoi vos leads chauds refroidissent faute de nurturing",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 3,
      "label": "Votre site est joli, et il ne vend rien ?",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 3,
      "label": "Quand le clé-en-main ne suffit plus.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 3,
      "label": "Pourquoi vos prospects vous échappent",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 3,
      "label": "Vos mois creux en rendez-vous ont une cause",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 3,
      "label": "Là où Webflow seul plafonne.",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "index": 16,
      "label": "Une offre, deux manières d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 10,
      "label": "Une offre, deux manières d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/applications-internes.json",
      "slug": "applications-internes",
      "route": "/services/applications-internes",
      "index": 10,
      "label": "Combien coûte une application sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 16,
      "label": "Une offre, deux manières d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 10,
      "label": "Une offre, deux manières d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 14,
      "label": "Trois formules, un abonnement mensuel sans engagement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/consultant-ia-claude.json",
      "slug": "consultant-ia-claude",
      "route": "/services/consultant-ia-claude",
      "index": 10,
      "label": "Combien coûte un accompagnement IA",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 13,
      "label": "Deux façons de remettre votre CRM au travail",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 10,
      "label": "Une offre, deux manières d'avancer",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 11,
      "label": "Combien coûte Claude en entreprise",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 13,
      "label": "Deux façons de brancher votre CRM",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 11,
      "label": "Deux façons de faire convertir vos clics Ads",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 11,
      "label": "Deux façons de faire convertir votre trafic",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
      "index": 10,
      "label": "Combien coûte la maintenance de votre site",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 14,
      "label": "Trois formules, un abonnement mensuel sans engagement",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 11,
      "label": "Deux façons de mettre votre budget pub au travail",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 11,
      "label": "Deux façons de rendre votre marque citable",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 13,
      "label": "Deux façons de relancer vos devis",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 11,
      "label": "Deux façons de lancer votre machine éditoriale",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 11,
      "label": "Deux façons de gagner en visibilité locale",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 13,
      "label": "Deux façons de remettre votre suivi au travail",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 11,
      "label": "Combien coûte un site internet qui vend",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/sur-mesure.json",
      "slug": "sur-mesure-headless",
      "route": "/services/sur-mesure-headless",
      "index": 10,
      "label": "Quatre façons de construire sur mesure",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 12,
      "label": "Quatre socles pour lancer votre acquisition",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 13,
      "label": "Trois formules pour alimenter votre pipeline",
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
      "file": "services/site-web-ia/webflow.json",
      "slug": "webflow",
      "route": "/services/webflow",
      "index": 10,
      "label": "Quatre façons de rendre votre Webflow intelligent",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia/wordpress.json",
      "slug": "wordpress",
      "route": "/services/wordpress",
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
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 3,
      "label": "Le déroulé des 45 minutes",
      "background": "paper-2"
    },
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
      "index": 3,
      "label": "Ce que fait l'agent, dans l'ordre",
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
      "label": "De l'audit au résultat mesuré",
      "background": "paper-2"
    },
    {
      "collection": "implantations",
      "file": "implantations/montpellier.json",
      "slug": "montpellier",
      "route": "/implantations/montpellier",
      "index": 3,
      "label": "De l'audit local au site en production",
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
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
      "index": 7,
      "label": "Ce qu'on fait selon votre niveau",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 5,
      "label": "Trois phases pour démarrer juste",
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
      "file": "services/integration-claude.json",
      "slug": "integration-claude",
      "route": "/services/integration-claude",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
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
      "file": "services/maintenance-growth.json",
      "slug": "maintenance-growth",
      "route": "/services/maintenance-growth",
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
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 1,
      "label": "En bref",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
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
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
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
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
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
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 7,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    },
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
      "index": 6,
      "label": "Un cas réel",
      "background": "paper-2"
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/generer-plus-de-leads.json",
      "slug": "generer-plus-de-leads",
      "route": "/cas-usages/generer-plus-de-leads",
      "index": 6,
      "label": "Un cas réel",
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
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 6,
      "label": "Un cas réel",
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
      "file": "demonstrations/integration-claude.json",
      "slug": "integration-claude",
      "route": "/demonstrations/integration-claude",
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
      "index": 5,
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
      "file": "diagnostics/maturite-ia.json",
      "slug": "maturite-ia",
      "route": "/ressources/diagnostics/maturite-ia",
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
      "file": "guides/claude-pme.json",
      "slug": "claude-pme",
      "route": "/ressources/guides/claude-pme",
      "index": 8,
      "label": "Pour aller plus loin",
      "background": "paper-2"
    }
  ],
  "statement-orbit": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 2,
      "label": "Un chatbot vitrine parle. Un agent de support répond, agit dans vos outils, et vous passe la main quand il faut."
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 2,
      "label": "Un chatbot vitrine parle. Un agent exécute, dans vos outils, et rend compte."
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 2,
      "label": "Avec Zapier on construit vite. Avec n8n on construit large, et le workflow devient un actif métier, pas une recette jetable."
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 2,
      "label": "Un process manuel tient sur une personne. Une automatisation tient toute seule, tourne la nuit et ne se trompe pas de copier-coller."
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 2,
      "label": "Un tableur de reporting fige la photo d'hier. Un socle de données rassemble tout, fixe une définition et se met à jour tout seul."
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
    },
    {
      "collection": "cas-usages",
      "file": "cas-usages/standardiser-processus.json",
      "slug": "standardiser-processus",
      "route": "/cas-usages/standardiser-processus",
      "index": 2,
      "label": "Comprendre, simplifier, formaliser, outiller",
      "background": "paper"
    }
  ],
  "sticky-scroll-storytelling": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 12,
      "label": "Du cadrage à l'agent de support en production",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/agents-ia.json",
      "slug": "agents-ia",
      "route": "/services/agents-ia",
      "index": 8,
      "label": "Du cadrage à l'agent en production",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 12,
      "label": "Comment on travaille votre n8n",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/automatisations.json",
      "slug": "automatisations",
      "route": "/services/automatisations",
      "index": 8,
      "label": "Comment on travaille ensemble",
      "background": "paper"
    },
    {
      "collection": "services",
      "file": "services/donnees-reporting.json",
      "slug": "donnees-reporting",
      "route": "/services/donnees-reporting",
      "index": 8,
      "label": "Comment on travaille ensemble",
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
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 11,
      "label": "Comment un agent de support répond vraiment",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 11,
      "label": "Comment un workflow n8n s'exécute",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 10,
      "label": "Comment un cold email arrive en boîte et répond",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 9,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 9,
      "label": "Comment un contact remonte propre dans le CRM",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 8,
      "label": "Comment un clic payé devient un lead",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 8,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 10,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 8,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 8,
      "label": "Comment une marque se met à être citée",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 9,
      "label": "Comment un devis en attente revient signé",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 8,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 8,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 9,
      "label": "Comment tout fonctionne ensemble",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 8,
      "label": "Comment tout s'articule",
      "background": "ink"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 9,
      "label": "Comment un lead devient client",
      "background": "ink"
    }
  ],
  "testimonial-wall": [
    {
      "collection": "services",
      "file": "services/agents-ia/agent-support-client.json",
      "slug": "agent-support-client",
      "route": "/services/agent-support-client",
      "index": 15,
      "label": "Ce que disent les équipes qui ont délégué le récurrent",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/automatisations/automatisation-n8n.json",
      "slug": "automatisation-n8n",
      "route": "/services/automatisation-n8n",
      "index": 15,
      "label": "Ce que disent les équipes passées à n8n",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee/cold-email-b2b.json",
      "slug": "cold-email-b2b",
      "route": "/services/cold-email-b2b",
      "index": 13,
      "label": "Ce que disent les équipes dont les mails arrivent enfin en boîte",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing.json",
      "slug": "crm-scoring-routing",
      "route": "/services/crm-scoring-routing",
      "index": 12,
      "label": "Ce que disent les équipes dont le CRM trie enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/crm-scoring-routing/integration-crm.json",
      "slug": "integration-crm",
      "route": "/services/integration-crm",
      "index": 12,
      "label": "Ce que disent les équipes dont la donnée remonte enfin seule",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels/landing-page-google-ads.json",
      "slug": "landing-page-google-ads",
      "route": "/services/landing-page-google-ads",
      "index": 10,
      "label": "Ce que disent les équipes dont la landing convertit enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/landing-pages-tunnels.json",
      "slug": "landing-pages-tunnels",
      "route": "/services/landing-pages-tunnels",
      "index": 10,
      "label": "Ce que disent les équipes dont le tunnel trie enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/prospection-automatisee.json",
      "slug": "prospection-automatisee",
      "route": "/services/prospection-automatisee",
      "index": 13,
      "label": "Ce que disent les équipes dont le pipeline se remplit enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/publicite-en-ligne.json",
      "slug": "publicite-en-ligne",
      "route": "/services/publicite-en-ligne",
      "index": 10,
      "label": "Ce que disent les équipes dont la pub est enfin mesurée",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/referencement-ia.json",
      "slug": "referencement-ia",
      "route": "/services/referencement-ia",
      "index": 10,
      "label": "Ce que disent les équipes enfin citées par les IA",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi/relance-devis.json",
      "slug": "relance-devis",
      "route": "/services/relance-devis",
      "index": 12,
      "label": "Ce que disent les équipes dont les devis ne dorment plus",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu.json",
      "slug": "seo-geo-contenu",
      "route": "/services/seo-geo-contenu",
      "index": 10,
      "label": "Ce que disent les équipes dont le contenu travaille enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/seo-geo-contenu/seo-local.json",
      "slug": "seo-local",
      "route": "/services/seo-local",
      "index": 10,
      "label": "Ce que disent les équipes enfin visibles localement",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/sequences-de-suivi.json",
      "slug": "sequences-de-suivi",
      "route": "/services/sequences-de-suivi",
      "index": 12,
      "label": "Ce que disent les équipes dont les leads ne refroidissent plus",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/site-web-ia.json",
      "slug": "site-web-ia",
      "route": "/services/site-web-ia",
      "index": 10,
      "label": "Ce que disent les équipes qui ont mis leur site au travail",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-acquisition.json",
      "slug": "systeme-acquisition",
      "route": "/services/systeme-acquisition",
      "index": 11,
      "label": "Ce que disent les équipes dont l'acquisition tourne enfin",
      "background": "paper-2"
    },
    {
      "collection": "services",
      "file": "services/systeme-commercial.json",
      "slug": "systeme-commercial",
      "route": "/services/systeme-commercial",
      "index": 12,
      "label": "Ce que disent les équipes dont le pipeline convertit enfin",
      "background": "paper-2"
    }
  ],
  "versus-competitors": [
    {
      "collection": "audits",
      "file": "audits/audit-ia-pme.json",
      "slug": "audit-ia-pme",
      "route": "/audit-ia-pme",
      "index": 2,
      "label": "L'audit est utile pour vous si",
      "background": "paper"
    },
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
    "src/pages/en/index.astro",
    "src/pages/index.astro"
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
  "coming-soon-pills": [
    "src/pages/secteurs/index.astro"
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
  "editorial-preview": [
    "src/pages/atlas.astro",
    "src/pages/en/atlas.astro",
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "editorial-prose": [
    "secteurs/[...slug]"
  ],
  "editorial-split-grid": [
    "src/pages/en/ressources/index.astro",
    "src/pages/ressources/index.astro"
  ],
  "faq-accordion": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "feature-grid": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
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
    "src/pages/agence/index.astro",
    "src/pages/expertise-claude.astro"
  ],
  "hero-lead-magnet": [
    "src/components/templates/LeadMagnetTemplate.astro"
  ],
  "hero-tech-layer": [
    "src/components/templates/TechnologiesDetailTemplate.astro"
  ],
  "hero-utility-masthead": [
    "src/components/templates/UtilityTemplate.astro"
  ],
  "maturity-pyramid": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "method-timeline": [
    "src/pages/cas-clients/[...slug].astro"
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
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "roi-band": [
    "src/content/solutions/agent-marketing-commercial.mdx",
    "src/content/solutions/content-marketing-ia.mdx",
    "src/content/solutions/contenu-seo-geo-ia.mdx",
    "src/content/solutions/publicite-en-ligne.mdx",
    "src/content/solutions/tunnel-de-vente.mdx"
  ],
  "services-grid": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
  ],
  "social-proof": [
    "src/pages/index.astro"
  ],
  "team-card-grid": [
    "src/pages/equipe/index.astro"
  ],
  "tech-capabilities-specs": [
    "src/pages/expertise-claude.astro"
  ],
  "tech-integration-flow": [
    "src/pages/expertise-claude.astro"
  ],
  "tech-models-table": [
    "src/pages/expertise-claude.astro"
  ],
  "tech-positioning-split": [
    "src/pages/expertise-claude.astro"
  ],
  "use-case-index": [
    "src/pages/en/index.astro",
    "src/pages/index.astro"
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
