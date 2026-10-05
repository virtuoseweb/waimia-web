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
    "count": 13,
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
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/mcp-claude",
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
  "coming-soon-pills": {
    "count": 1,
    "pages": [
      "src/pages/secteurs/_index.astro"
    ]
  },
  "comparison-duo": {
    "count": 39,
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
    "count": 4,
    "pages": [
      "src/components/templates/ConversionFunnelTemplate.astro",
      "src/components/templates/UtilityTemplate.astro",
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro"
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
    "count": 39,
    "pages": [
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-pme",
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
    "count": 34,
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
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/mcp-claude",
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
    "count": 60,
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
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/mcp-claude",
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
    "count": 22,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "src/content/formations/automatisation.json",
      "src/content/formations/chatgpt.json",
      "src/content/formations/claude.json",
      "src/content/formations/make.json",
      "src/content/formations/n8n.json"
    ]
  },
  "editorial-timeline": {
    "count": 12,
    "pages": [
      "/conformite-ia",
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
    "count": 78,
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
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/mcp-claude",
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
    "count": 18,
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
      "/ressources/guides/claude-pme",
      "/services/systemes-operationnels-ia",
      "src/content/demonstrations/integration-claude.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/sequences-de-suivi/relance-devis.json"
    ]
  },
  "footer-cta-band": {
    "count": 77,
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
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/mcp-claude",
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
  "hero-split-media": {
    "count": 40,
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
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia",
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
    "count": 1,
    "pages": [
      "/ressources/guides/claude-pme"
    ]
  },
  "keyword-strip": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
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
    "count": 16,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/taches-a-automatiser-pme",
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
    "count": 2,
    "pages": [
      "/ressources/diagnostics/referent-ia",
      "/ressources/guides/claude-pme"
    ]
  },
  "related-cards-band": {
    "count": 39,
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
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/guides/mcp-claude",
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
  "related-links": {
    "count": 1,
    "pages": [
      "src/content/formations/index.json"
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
    "count": 11,
    "pages": [
      "/cas-usages/finance-comptabilite",
      "/cas-usages/rh",
      "/cas-usages/support-sav",
      "/implantations/lyon",
      "/implantations/paris",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/taches-a-automatiser-pme",
      "/services/automatisation-make",
      "/services/base-de-connaissance-ia"
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
