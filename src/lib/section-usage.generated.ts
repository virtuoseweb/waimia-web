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
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "author-byline": {
    "count": 5,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus"
    ]
  },
  "bento-grid": {
    "count": 5,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus"
    ]
  },
  "bordered-pullquote": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "branded-callout": {
    "count": 2,
    "pages": [
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/site-web-intelligent"
    ]
  },
  "case-card-grid": {
    "count": 40,
    "pages": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/webflow",
      "/services/wordpress",
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
      "src/pages/secteurs/index.astro"
    ]
  },
  "comparison-duo": {
    "count": 41,
    "pages": [
      "/audit-ia-pme",
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
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress"
    ]
  },
  "comparison-pricing-callout": {
    "count": 1,
    "pages": [
      "/audit-ia-pme"
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
    "count": 4,
    "pages": [
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent"
    ]
  },
  "decision-list": {
    "count": 14,
    "pages": [
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme"
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
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/webflow",
      "/services/wordpress"
    ]
  },
  "deliverables-grid": {
    "count": 32,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress"
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
    "count": 5,
    "pages": [
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/services/template-service-ref"
    ]
  },
  "direct-answer": {
    "count": 14,
    "pages": [
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme"
    ]
  },
  "editorial-case-grid": {
    "count": 1,
    "pages": [
      "src/pages/manifesto.astro"
    ]
  },
  "editorial-preview": {
    "count": 4,
    "pages": [
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "editorial-prose": {
    "count": 1,
    "pages": [
      "secteurs/[...slug]"
    ]
  },
  "editorial-split-grid": {
    "count": 2,
    "pages": [
      "src/pages/en/ressources/index.astro",
      "src/pages/ressources/index.astro"
    ]
  },
  "eeat-panel": {
    "count": 29,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/webflow",
      "/services/wordpress"
    ]
  },
  "faq-accordion": {
    "count": 57,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-grid": {
    "count": 36,
    "pages": [
      "/lp/hub",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/webflow",
      "/services/wordpress",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-split-media": {
    "count": 4,
    "pages": [
      "/audit-ia-pme",
      "/lp/site-web-intelligent",
      "/lp/visibilite-google-ia",
      "/services/template-service-ref"
    ]
  },
  "feature-zigzag": {
    "count": 33,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/guides/claude-pme",
      "/services/agent-support-client",
      "/services/automatisation-n8n",
      "/services/cold-email-b2b",
      "/services/crm-scoring-routing",
      "/services/integration-crm",
      "/services/prospection-automatisee",
      "/services/relance-devis",
      "/services/sequences-de-suivi",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "footer-cta-band": {
    "count": 56,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress"
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
      "src/pages/agence/index.astro",
      "src/pages/expertise-claude.astro"
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
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/webflow",
      "/services/wordpress"
    ]
  },
  "hero-split-media": {
    "count": 21,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme"
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
    "count": 22,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/relance-devis",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/webflow",
      "/services/wordpress"
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
  "logo-marquee": {
    "count": 2,
    "pages": [
      "/services/agent-support-client",
      "/services/automatisation-n8n"
    ]
  },
  "manifesto-statement": {
    "count": 1,
    "pages": [
      "/ressources/diagnostics/maturite-ia"
    ]
  },
  "maturity-pyramid": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "method-diagram-list": {
    "count": 1,
    "pages": [
      "src/components/templates/AuthorPageTemplate.astro"
    ]
  },
  "method-stepline": {
    "count": 29,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/webflow",
      "/services/wordpress"
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
    "count": 31,
    "pages": [
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/webflow",
      "/services/wordpress"
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
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress"
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
    "count": 12,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme"
    ]
  },
  "proof-bar": {
    "count": 37,
    "pages": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/cold-email-b2b",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/mvp-saas",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/sur-mesure-headless",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "/services/webflow",
      "/services/wordpress",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
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
    "count": 21,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
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
      "src/pages/secteurs/index.astro"
    ]
  },
  "services-grid": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
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
  "social-proof": {
    "count": 1,
    "pages": [
      "src/pages/index.astro"
    ]
  },
  "statement-orbit": {
    "count": 5,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/donnees-reporting"
    ]
  },
  "stats-bento": {
    "count": 1,
    "pages": [
      "/services/template-service-ref"
    ]
  },
  "steps-horizontal": {
    "count": 3,
    "pages": [
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus"
    ]
  },
  "sticky-scroll-storytelling": {
    "count": 5,
    "pages": [
      "/services/agent-support-client",
      "/services/agents-ia",
      "/services/automatisation-n8n",
      "/services/automatisations",
      "/services/donnees-reporting"
    ]
  },
  "system-flow": {
    "count": 20,
    "pages": [
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia",
      "/services/agent-support-client",
      "/services/automatisation-n8n",
      "/services/cold-email-b2b",
      "/services/crm-scoring-routing",
      "/services/integration-crm",
      "/services/landing-page-google-ads",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/publicite-en-ligne",
      "/services/referencement-ia",
      "/services/relance-devis",
      "/services/seo-geo-contenu",
      "/services/seo-local",
      "/services/sequences-de-suivi",
      "/services/systeme-acquisition",
      "/services/systeme-commercial"
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
      "src/pages/expertise-claude.astro"
    ]
  },
  "tech-integration-flow": {
    "count": 1,
    "pages": [
      "src/pages/expertise-claude.astro"
    ]
  },
  "tech-models-table": {
    "count": 1,
    "pages": [
      "src/pages/expertise-claude.astro"
    ]
  },
  "tech-positioning-split": {
    "count": 1,
    "pages": [
      "src/pages/expertise-claude.astro"
    ]
  },
  "testimonial-wall": {
    "count": 1,
    "pages": [
      "/services/seo-local"
    ]
  },
  "use-case-index": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "versus-competitors": {
    "count": 2,
    "pages": [
      "/audit-ia-pme",
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
