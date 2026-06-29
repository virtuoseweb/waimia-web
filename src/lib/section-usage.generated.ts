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
    "count": 4,
    "pages": [
      "/services/integrateur-claude",
      "/services/systeme-complet",
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
    "count": 10,
    "pages": [
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth"
    ]
  },
  "case-card-grid": {
    "count": 12,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
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
    "count": 17,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
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
    "count": 6,
    "pages": [
      "/audit-maturite-ia",
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
    "count": 10,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress"
    ]
  },
  "deliverables-grid": {
    "count": 11,
    "pages": [
      "/audit-ia-pme",
      "/audit-maturite-ia",
      "/audit-site-web-intelligent",
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
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
    "count": 6,
    "pages": [
      "/services/content-marketing-intelligent",
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
      "/services/content-marketing-intelligent",
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
    "count": 8,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/systeme-complet"
    ]
  },
  "faq-accordion": {
    "count": 47,
    "pages": [
      "/audit-ia-pme",
      "/audit-maturite-ia",
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
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet",
      "/services/template-service-ref",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-grid": {
    "count": 3,
    "pages": [
      "/services/site-web-intelligent",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "feature-split-media": {
    "count": 5,
    "pages": [
      "/audit-maturite-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/landing-page-scoring",
      "/services/template-service-ref"
    ]
  },
  "feature-tabs": {
    "count": 1,
    "pages": [
      "/services/landing-page-scoring"
    ]
  },
  "feature-zigzag": {
    "count": 35,
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
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet"
    ]
  },
  "footer-cta-band": {
    "count": 44,
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
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet",
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
    "count": 12,
    "pages": [
      "/audit-maturite-ia",
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
    "count": 3,
    "pages": [
      "src/pages/agence-web-montpellier.astro",
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
    "count": 12,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet"
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
  "integrations-grid": {
    "count": 1,
    "pages": [
      "/services/landing-page-scoring"
    ]
  },
  "journey-steps": {
    "count": 1,
    "pages": [
      "/services/landing-page-scoring"
    ]
  },
  "logo-marquee": {
    "count": 6,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent"
    ]
  },
  "maturity-pyramid": {
    "count": 2,
    "pages": [
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "media-block": {
    "count": 2,
    "pages": [
      "/services/agents-ia"
    ]
  },
  "method-stepline": {
    "count": 2,
    "pages": [
      "/services/integrateur-claude",
      "/services/site-web-intelligent"
    ]
  },
  "method-timeline": {
    "count": 3,
    "pages": [
      "/audit-maturite-ia",
      "/services/template-service-ref",
      "src/components/templates/CaseStudyTemplate.astro"
    ]
  },
  "offer-tier-grid": {
    "count": 2,
    "pages": [
      "/services/systeme-complet",
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
    "count": 10,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress"
    ]
  },
  "persona-attributes-grid": {
    "count": 1,
    "pages": [
      "src/pages/ressources/personas/[slug].astro"
    ]
  },
  "pricing-cards": {
    "count": 17,
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
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/template-service-ref"
    ]
  },
  "problem-statement": {
    "count": 12,
    "pages": [
      "/audit-maturite-ia",
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
    "count": 23,
    "pages": [
      "/audit-maturite-ia",
      "/lp/audit-ia-pme",
      "/lp/audit-site-web-intelligent",
      "/lp/content-marketing-intelligent",
      "/lp/diagnostic-maturite-ia",
      "/lp/diagnostic-site-web-intelligent",
      "/lp/exemple-industrialisation",
      "/lp/integrateur-claude",
      "/lp/site-web-intelligent",
      "/lp/tunnel-conversion-intelligent",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet",
      "/services/template-service-ref",
      "src/pages/en/index.astro",
      "src/pages/index.astro"
    ]
  },
  "related-cards-band": {
    "count": 23,
    "pages": [
      "/audit-ia-pme",
      "/audit-maturite-ia",
      "/audit-site-web-intelligent",
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
      "/services/machine-outbound",
      "/services/site-web-intelligent/sur-mesure",
      "/services/site-web-intelligent/webflow",
      "/services/site-web-intelligent/wordpress",
      "/services/systeme-complet"
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
    "count": 9,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent",
      "/services/systeme-complet"
    ]
  },
  "stats-bento": {
    "count": 10,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/machine-outbound",
      "/services/maintenance-growth",
      "/services/site-web-intelligent/sur-mesure",
      "/services/systeme-complet",
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
    "count": 7,
    "pages": [
      "/services/agents-ia",
      "/services/consultant-ia-claude",
      "/services/content-marketing-intelligent",
      "/services/integrateur-claude",
      "/services/landing-page-scoring",
      "/services/maintenance-growth",
      "/services/site-web-intelligent"
    ]
  },
  "system-flow": {
    "count": 4,
    "pages": [
      "/services/integrateur-claude",
      "/services/machine-outbound",
      "/services/site-web-intelligent",
      "/services/systeme-complet"
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
    "count": 2,
    "pages": [
      "/services/integrateur-claude",
      "/services/site-web-intelligent"
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
    "count": 4,
    "pages": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/services/agents-ia",
      "/services/consultant-ia-claude"
    ]
  },
  "workflow-table": {
    "count": 7,
    "pages": [
      "/services/content-marketing-intelligent",
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
