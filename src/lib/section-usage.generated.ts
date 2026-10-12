// @generated par scripts/gen-section-usage.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:section-usage
//
// Usage RÉEL des sections du catalogue, dérivé des sources composables réelles :
//   - fichiers de contenu `src/content/**/*.json` portant `sections: [{ type }]`
//     (1 entrée = 1 instance) ;
//   - consommateurs hand-authored du manifest (pages .astro / templates inline).
// Par type : { count = nombre d'instances, pages = routes/chemins lisibles distincts }.

export interface SectionUsageStat {
  /** Nombre total d'instances posées (occurrences dans les pages composables). */
  count: number;
  /** Pages distinctes (routes publiques quand connues, sinon chemin source) qui l'utilisent. */
  pages: string[];
}

export const REAL_SECTION_USAGE: Record<string, SectionUsageStat> = {
  "architecture-diagram": {
    "count": 1,
    "pages": [
      "src/pages/en/index.astro"
    ]
  },
  "author-byline": {
    "count": 26,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme"
    ]
  },
  "bento-grid": {
    "count": 2,
    "pages": [
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms"
    ]
  },
  "bordered-pullquote": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "branded-callout": {
    "count": 5,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/site-web-intelligent"
    ]
  },
  "case-card-grid": {
    "count": 34,
    "pages": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/crm-scoring-routing",
      "/services/integration-claude",
      "/services/seo-geo-contenu",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json",
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro",
      "src/pages/en/index.astro",
      "src/pages/en/solutions/index.astro",
      "src/pages/index.astro",
      "src/pages/solutions/index.astro"
    ]
  },
  "case-split": {
    "count": 5,
    "pages": [
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  },
  "closing-cta-band": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "code-showcase": {
    "count": 1,
    "pages": [
      "/ressources/guides/claude-skills"
    ]
  },
  "coming-soon-pills": {
    "count": 1,
    "pages": [
      "src/pages/secteurs/_index.astro"
    ]
  },
  "comparison-duo": {
    "count": 47,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/n8n-prix",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-commercial",
      "/services/template-service-ref",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "comparison-table": {
    "count": 4,
    "pages": [
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress"
    ]
  },
  "cta-band": {
    "count": 3,
    "pages": [
      "src/components/templates/EssayTemplate.astro",
      "src/components/templates/TrustLegalTemplate.astro",
      "src/components/templates/UtilityTemplate.astro"
    ]
  },
  "cta-final": {
    "count": 10,
    "pages": [
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "src/components/templates/ConversionFunnelTemplate.astro",
      "src/components/templates/UtilityTemplate.astro",
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro"
    ]
  },
  "cta-form-inline": {
    "count": 7,
    "pages": [
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/services/consultant-ia-claude",
      "/services/integration-claude",
      "src/content/formations/claude.json"
    ]
  },
  "curriculum-timeline": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "data-table": {
    "count": 3,
    "pages": [
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent"
    ]
  },
  "decision-list": {
    "count": 46,
    "pages": [
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/mcp-claude",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "definition-extract": {
    "count": 29,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "deliverables-grid": {
    "count": 36,
    "pages": [
      "/audit-site-web-intelligent",
      "/conformite-ia",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-commercial",
      "/services/template-service-ref",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "department-cta": {
    "count": 5,
    "pages": [
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  },
  "department-stack": {
    "count": 5,
    "pages": [
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  },
  "diagnostic-stages": {
    "count": 6,
    "pages": [
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/services/template-service-ref",
      "src/pages/index.astro"
    ]
  },
  "direct-answer": {
    "count": 50,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "editorial-callout": {
    "count": 6,
    "pages": [
      "/conformite-ia",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "editorial-case-grid": {
    "count": 1,
    "pages": [
      "src/pages/manifesto.astro"
    ]
  },
  "editorial-preview": {
    "count": 3,
    "pages": [
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro",
      "src/pages/en/index.astro"
    ]
  },
  "editorial-prose": {
    "count": 136,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "secteurs/[...slug]",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/index.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "editorial-split-grid": {
    "count": 2,
    "pages": [
      "src/pages/en/ressources/index.astro",
      "src/pages/ressources/index.astro"
    ]
  },
  "editorial-table-block": {
    "count": 63,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/consultant-ia-claude",
      "/services/integration-claude",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "editorial-timeline": {
    "count": 13,
    "pages": [
      "/conformite-ia",
      "/ressources/guides/claude-cowork",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "eeat-panel": {
    "count": 30,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json",
      "src/pages/index.astro"
    ]
  },
  "engagement-ledger": {
    "count": 1,
    "pages": [
      "src/pages/tarifs.astro"
    ]
  },
  "faq-accordion": {
    "count": 94,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/index.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-grid": {
    "count": 18,
    "pages": [
      "/lp/hub",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/services/systeme-acquisition",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json",
      "src/pages/en/index.astro"
    ]
  },
  "feature-split-media": {
    "count": 3,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/visibilite-google-ia",
      "/services/template-service-ref"
    ]
  },
  "feature-zigzag": {
    "count": 26,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-skills",
      "/services/consultant-ia-claude",
      "/services/integration-claude",
      "/services/systemes-operationnels-ia",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/claude.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/sequences-de-suivi/relance-devis.json"
    ]
  },
  "footer-cta-band": {
    "count": 93,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/index.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "guarantee-block": {
    "count": 3,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing"
    ]
  },
  "hero-atlas": {
    "count": 2,
    "pages": [
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro"
    ]
  },
  "hero-author": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "hero-case-study": {
    "count": 1,
    "pages": [
      "src/pages/cas-clients/[...slug].astro"
    ]
  },
  "hero-centered": {
    "count": 5,
    "pages": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia"
    ]
  },
  "hero-conversion-funnel": {
    "count": 2,
    "pages": [
      "/services/template-service-ref",
      "src/components/templates/ConversionFunnelTemplate.astro"
    ]
  },
  "hero-course": {
    "count": 1,
    "pages": [
      "src/components/templates/CourseDetailTemplate.astro"
    ]
  },
  "hero-essay": {
    "count": 1,
    "pages": [
      "src/components/templates/EssayTemplate.astro"
    ]
  },
  "hero-hub-listing": {
    "count": 1,
    "pages": [
      "src/components/templates/UtilityTemplate.astro"
    ]
  },
  "hero-hub-stats": {
    "count": 2,
    "pages": [
      "src/pages/_expertise-claude.astro",
      "src/pages/agence/index.astro"
    ]
  },
  "hero-lead-magnet": {
    "count": 1,
    "pages": [
      "src/components/templates/LeadMagnetTemplate.astro"
    ]
  },
  "hero-manifesto": {
    "count": 1,
    "pages": [
      "src/pages/manifesto.astro"
    ]
  },
  "hero-masthead-card": {
    "count": 21,
    "pages": [
      "/services/agent-support-client",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/crm-scoring-routing",
      "/services/seo-geo-contenu",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "hero-split-media": {
    "count": 64,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/sequences-de-suivi",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/index.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "hero-tech-layer": {
    "count": 1,
    "pages": [
      "src/components/templates/TechnologiesDetailTemplate.astro"
    ]
  },
  "hero-utility-masthead": {
    "count": 1,
    "pages": [
      "src/components/templates/UtilityTemplate.astro"
    ]
  },
  "hover-reveal-list": {
    "count": 10,
    "pages": [
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "key-metric-grid": {
    "count": 13,
    "pages": [
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/n8n-prix"
    ]
  },
  "keyword-strip": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "lead-capture-band": {
    "count": 21,
    "pages": [
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/mcp-claude",
      "src/components/templates/LeadMagnetLanding.astro",
      "src/components/ui/organisms/conversion/MaturityDiagnostic.astro",
      "src/pages/ressources/outils/[...slug].astro",
      "src/pages/ressources/outils/charte-ia-entreprise.astro",
      "src/pages/ressources/outils/checklist-90-jours-claude.astro",
      "src/pages/ressources/outils/grille-taches-a-automatiser.astro"
    ]
  },
  "market-cases": {
    "count": 4,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "src/pages/cas-usages/index.astro"
    ]
  },
  "maturity-pyramid": {
    "count": 1,
    "pages": [
      "src/pages/en/index.astro"
    ]
  },
  "method-diagram-list": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "method-stepline": {
    "count": 16,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "method-timeline": {
    "count": 2,
    "pages": [
      "/services/template-service-ref",
      "src/pages/cas-clients/[...slug].astro"
    ]
  },
  "newsletter-signup-section": {
    "count": 12,
    "pages": [
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme"
    ]
  },
  "numbered-layer-list": {
    "count": 1,
    "pages": [
      "src/pages/technologies.astro"
    ]
  },
  "offer-rail": {
    "count": 1,
    "pages": [
      "src/pages/index.astro"
    ]
  },
  "offer-tier-grid": {
    "count": 2,
    "pages": [
      "/services/systeme-acquisition",
      "src/pages/services/index.astro"
    ]
  },
  "pain-points": {
    "count": 5,
    "pages": [
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  },
  "pain-severity-list": {
    "count": 15,
    "pages": [
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "persona-attributes-grid": {
    "count": 1,
    "pages": [
      "src/pages/ressources/personas/[slug].astro"
    ]
  },
  "pricing-cards": {
    "count": 34,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json"
    ]
  },
  "problem-statement": {
    "count": 1,
    "pages": [
      "/services/template-service-ref"
    ]
  },
  "problems-grid": {
    "count": 1,
    "pages": [
      "/services/template-service-ref"
    ]
  },
  "process-steps": {
    "count": 33,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/consultant-ia-claude",
      "/services/integration-claude",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/index.json"
    ]
  },
  "proof-bar": {
    "count": 38,
    "pages": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/content/services/applications-internes/mvp-saas.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/maintenance-growth.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json",
      "src/content/services/site-web-ia/sur-mesure.json",
      "src/content/services/site-web-ia/webflow.json",
      "src/content/services/site-web-ia/wordpress.json",
      "src/pages/en/index.astro"
    ]
  },
  "prose-aside": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "publications-panel": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "pull-quote-block": {
    "count": 5,
    "pages": [
      "/ressources/diagnostics/referent-ia",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/n8n-prix"
    ]
  },
  "related-cards-band": {
    "count": 57,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav",
      "/conformite-ia",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/integration-claude",
      "src/content/demonstrations/integration-claude.json",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "related-links": {
    "count": 1,
    "pages": [
      "src/content/formations/index.json"
    ]
  },
  "resource-card-grid": {
    "count": 2,
    "pages": [
      "/ressources/guides/claude-pme"
    ]
  },
  "roi-band": {
    "count": 5,
    "pages": [
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  },
  "sector-card-grid": {
    "count": 1,
    "pages": [
      "src/pages/secteurs/_index.astro"
    ]
  },
  "service-catalog-list": {
    "count": 1,
    "pages": [
      "src/content/formations/index.json"
    ]
  },
  "services-grid": {
    "count": 1,
    "pages": [
      "src/pages/en/index.astro"
    ]
  },
  "signed-writing-list": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "site-showcase": {
    "count": 1,
    "pages": [
      "src/pages/cas-clients/[...slug].astro"
    ]
  },
  "stats-bento": {
    "count": 1,
    "pages": [
      "/services/template-service-ref"
    ]
  },
  "steps-horizontal": {
    "count": 2,
    "pages": [
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms"
    ]
  },
  "sticky-scroll-storytelling": {
    "count": 1,
    "pages": [
      "src/pages/index.astro"
    ]
  },
  "system-flow": {
    "count": 12,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/systeme-commercial",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/landing-pages-tunnels/landing-page-google-ads.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/publicite-en-ligne.json",
      "src/content/services/seo-geo-contenu/referencement-ia.json",
      "src/content/services/seo-geo-contenu/seo-local.json",
      "src/content/services/sequences-de-suivi/relance-devis.json"
    ]
  },
  "team-card-grid": {
    "count": 1,
    "pages": [
      "src/pages/equipe/index.astro"
    ]
  },
  "tech-capabilities-specs": {
    "count": 1,
    "pages": [
      "src/pages/_expertise-claude.astro"
    ]
  },
  "tech-integration-flow": {
    "count": 1,
    "pages": [
      "src/pages/_expertise-claude.astro"
    ]
  },
  "tech-models-table": {
    "count": 1,
    "pages": [
      "src/pages/_expertise-claude.astro"
    ]
  },
  "tech-positioning-split": {
    "count": 1,
    "pages": [
      "src/pages/_expertise-claude.astro"
    ]
  },
  "tech-when-dual": {
    "count": 22,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/implantations/lyon",
      "/implantations/paris",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
      "/services/integration-claude"
    ]
  },
  "testimonial-wall": {
    "count": 1,
    "pages": [
      "src/content/services/seo-geo-contenu/seo-local.json"
    ]
  },
  "use-case-index": {
    "count": 1,
    "pages": [
      "src/pages/en/index.astro"
    ]
  },
  "versus-competitors": {
    "count": 1,
    "pages": [
      "/audit-site-web-intelligent"
    ]
  },
  "workflow-table": {
    "count": 6,
    "pages": [
      "/services/template-service-ref",
      "src/content/solutions/agent-marketing-commercial.mdx",
      "src/content/solutions/content-marketing-ia.mdx",
      "src/content/solutions/contenu-seo-geo-ia.mdx",
      "src/content/solutions/publicite-en-ligne.mdx",
      "src/content/solutions/tunnel-de-vente.mdx"
    ]
  }
};

/** Stat d'usage réel d'un type ({ count: 0, pages: [] } si jamais posé). */
export function getRealUsage(type: string): SectionUsageStat {
  return REAL_SECTION_USAGE[type] ?? { count: 0, pages: [] };
}
