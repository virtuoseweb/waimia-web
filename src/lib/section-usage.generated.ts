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
      "/ressources/guides/claude-pme",
      "src/content/demonstrations/integration-claude.json"
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
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
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
      "/ressources/guides/claude-pme",
      "src/content/demonstrations/integration-claude.json"
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
      "/services/crm-scoring-routing",
      "/services/prospection-automatisee",
      "/services/sequences-de-suivi",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "src/content/demonstrations/integration-claude.json",
      "src/content/services/crm-scoring-routing/integration-crm.json",
      "src/content/services/prospection-automatisee/cold-email-b2b.json",
      "src/content/services/sequences-de-suivi/relance-devis.json"
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
      "/ressources/guides/claude-pme",
      "src/content/demonstrations/integration-claude.json"
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
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/prospection-automatisee",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
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
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
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
    "count": 12,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/demonstrations/avant-apres",
      "/demonstrations/site-web-intelligent",
      "/implantations/bordeaux",
      "/implantations/montpellier",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/claude-pme",
      "src/content/demonstrations/integration-claude.json"
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
      "/ressources/guides/claude-pme",
      "src/content/demonstrations/integration-claude.json"
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
      "/services/crm-scoring-routing",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/systeme-acquisition",
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
  "testimonial-wall": {
    "count": 1,
    "pages": [
      "src/content/services/seo-geo-contenu/seo-local.json"
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
