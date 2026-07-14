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
    "count": 7,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/services/consultant-ia-claude",
      "/services/maintenance-growth"
    ]
  },
  "case-card-grid": {
    "count": 22,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
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
  "coming-soon-pills": {
    "count": 1,
    "pages": [
      "src/pages/secteurs/index.astro"
    ]
  },
  "comparison-duo": {
    "count": 26,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref"
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
    "count": 5,
    "pages": [
      "src/components/templates/CaseStudyTemplate.astro",
      "src/components/templates/ConversionFunnelTemplate.astro",
      "src/components/templates/UtilityTemplate.astro",
      "src/pages/atlas.astro",
      "src/pages/en/atlas.astro"
    ]
  },
  "data-table": {
    "count": 1,
    "pages": [
      "/ressources/diagnostics/site-web-intelligent"
    ]
  },
  "decision-list": {
    "count": 15,
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
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme"
    ]
  },
  "definition-extract": {
    "count": 19,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "deliverables-grid": {
    "count": 19,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref"
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
    "count": 15,
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
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme"
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
    "count": 16,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "faq-accordion": {
    "count": 53,
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
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-grid": {
    "count": 16,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
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
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-split-media": {
    "count": 3,
    "pages": [
      "/audit-ia-pme",
      "/services/consultant-ia-claude",
      "/services/template-service-ref"
    ]
  },
  "feature-zigzag": {
    "count": 39,
    "pages": [
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
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
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "footer-cta-band": {
    "count": 51,
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
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref"
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
      "src/components/templates/CaseStudyTemplate.astro"
    ]
  },
  "hero-conversion-funnel": {
    "count": 11,
    "pages": [
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
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
  "hero-masthead-card": {
    "count": 19,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "hero-split-media": {
    "count": 22,
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
      "/ressources/guides/checklist-deploiement-claude",
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
    "count": 14,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
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
      "/services/systemes-operationnels-ia"
    ]
  },
  "logo-marquee": {
    "count": 16,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "maturity-pyramid": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "method-stepline": {
    "count": 14,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
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
      "/services/systemes-operationnels-ia"
    ]
  },
  "method-timeline": {
    "count": 2,
    "pages": [
      "/services/template-service-ref",
      "src/components/templates/CaseStudyTemplate.astro"
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
    "count": 18,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "persona-attributes-grid": {
    "count": 1,
    "pages": [
      "src/pages/ressources/personas/[slug].astro"
    ]
  },
  "pricing-cards": {
    "count": 26,
    "pages": [
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref"
    ]
  },
  "problem-statement": {
    "count": 10,
    "pages": [
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/services/template-service-ref"
    ]
  },
  "problems-grid": {
    "count": 15,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/services/template-service-ref"
    ]
  },
  "process-steps": {
    "count": 13,
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
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme"
    ]
  },
  "proof-bar": {
    "count": 30,
    "pages": [
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia",
      "/services/template-service-ref",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "related-cards-band": {
    "count": 23,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
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
      "/ressources/guides/checklist-deploiement-claude",
      "/ressources/guides/claude-pme",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress"
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
  "services-grid": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "social-proof": {
    "count": 1,
    "pages": [
      "src/pages/index.astro"
    ]
  },
  "statement-orbit": {
    "count": 16,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "stats-bento": {
    "count": 4,
    "pages": [
      "/services/consultant-ia-claude",
      "/services/maintenance-growth",
      "/services/site-web-ia/sur-mesure",
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
    "count": 16,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/maintenance-growth",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  "system-flow": {
    "count": 14,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
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
      "/services/systemes-operationnels-ia"
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
    "count": 14,
    "pages": [
      "/services/agents-ia",
      "/services/applications-internes",
      "/services/automatisations",
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
      "/services/systemes-operationnels-ia"
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
    "count": 3,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/services/consultant-ia-claude"
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
