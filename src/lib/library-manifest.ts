// Waimia · Library manifest — catalogue catégorisé dérivé du registry
// Lit SECTIONS pour category/component (anti-drift). Ne modifie pas section-registry.ts.

import { SECTIONS } from './section-registry';
import type { SectionType } from '@waimia/ds-kernel';

// ── Types ────────────────────────────────────────────────────────────────────

export type SectionRendering = 'live' | 'catalogue-only';

/**
 * Étiquetage catalogue (docs/40 §3, V-F6) :
 *   - 'site'    = utilisé sur waimia.com (au moins un consommateur live)
 *   - 'library' = bibliothèque pure (0 usage live), réutilisable pour d'autres DA
 * Dérivé de `consumers.length`, sauf override manuel (USAGE_OVERRIDES).
 */
export type SectionUsage = 'site' | 'library';

export interface LibrarySectionEntry {
  id: string;
  /** categorySlug dérivé de SECTIONS */
  category: string;
  /** Nom du composant Astro dérivé de SECTIONS */
  component: string;
  rendering: SectionRendering;
  /** étiquette catalogue dérivée de consumers + overrides */
  usage: SectionUsage;
  /** templates/pages/mdx consommateurs (live) ou [] (catalogue-only) */
  consumers: string[];
}

export type OrganismStatus = 'merge' | 'keep-bespoke' | 'orphan';

export interface LibraryOrganismEntry {
  id: string;
  file: string;
  twin: string | null;
  status: OrganismStatus;
  consumers: string[];
}

// ── Usage par type-id (hand-authored — 67 entrées, consumers=[] si catalogue-only) ──

// SEO état final — les pages /solutions secondaires sont supprimées ; restent les 5 enfants Acquérir.
const SOLUTIONS_CONSUMERS = [
  'src/content/solutions/contenu-seo-geo-ia.mdx',
  'src/content/solutions/content-marketing-ia.mdx',
  'src/content/solutions/publicite-en-ligne.mdx',
  'src/content/solutions/tunnel-de-vente.mdx',
  'src/content/solutions/agent-marketing-commercial.mdx',
];

const SECTION_USAGE: Array<{ id: SectionType; consumers: string[] }> = [
  // >>> [gen-hero-feature] start
  // Génération bibliothèque 2026-06-11 — 4 nouveaux types hero/feature (catalogue-only).
  { id: 'hero-form-inline',          consumers: [] },
  { id: 'hero-social-proof',         consumers: [] },
  { id: 'feature-comparison-grid',   consumers: [] },
  { id: 'feature-accordion',         consumers: [] },
  // <<< [gen-hero-feature] end
  // >>> [gen-conversion] start
  // Famille CONVERSION (audit-conversion) · catalogue-only (0 consommateur live)
  { id: 'faq-cta-aside',             consumers: [] },
  { id: 'cta-form-inline',           consumers: [] },
  { id: 'contact-form',              consumers: [] },
  { id: 'booking-embed',             consumers: [] },
  { id: 'newsletter-signup-section', consumers: [] },
  // <<< [gen-conversion] end
  // >>> [gen-structure] start
  // Mission gen-structure 2026-06-11 — 7 types blueprint (data/content-listing/process/timeline/terminal/banner)
  // usage library (0 consommateur live : catalogue-only)
  { id: 'data-table',                consumers: [] },
  { id: 'article-grid',              consumers: [] },
  { id: 'resource-card-grid',        consumers: [] },
  { id: 'process-steps',             consumers: [] },
  { id: 'timeline-horizontal',       consumers: [] },
  { id: 'code-showcase',             consumers: [] },
  { id: 'announcement-banner',       consumers: [] },
  // <<< [gen-structure] end
  // >>> [gen-trust-proof] start
  { id: 'trust-badges-band',         consumers: [] },
  { id: 'testimonial-logo-metric',   consumers: [] },
  { id: 'stat-counter',              consumers: [] },
  { id: 'versus-competitors',        consumers: [] },
  { id: 'logo-marquee',              consumers: [] },
  // <<< [gen-trust-proof] end
  // >>> [new-standard] start
  // Lot new-standard 2026-06-11 — 10 types standard B2B-SaaS, dark natif (catalogue-only)
  { id: 'team-bio-grid',                consumers: [] },
  { id: 'about-story-split',            consumers: [] },
  { id: 'footer-cta-band',              consumers: [] },
  { id: 'integrations-grid',            consumers: [] },
  { id: 'feature-split-media',          consumers: [] },
  { id: 'metric-callout-band',          consumers: [] },
  { id: 'testimonial-single-spotlight', consumers: [] },
  { id: 'faq-two-column',               consumers: [] },
  { id: 'cta-newsletter-footer',        consumers: [] },
  { id: 'comparison-pricing-callout',   consumers: [] },
  // <<< [new-standard] end
  // >>> [sections-gap] start
  { id: 'editorial-prose',              consumers: ['secteurs/[...slug]'] },
  // Mission U2 (W3) — KeyMetric + atomes éditoriaux catalogués (catalogue-only).
  { id: 'key-metric-grid',              consumers: [] },
  { id: 'editorial-callout',            consumers: [] },
  { id: 'editorial-dropcap-prose',      consumers: [] },
  { id: 'editorial-dingbat-rule',       consumers: [] },
  { id: 'editorial-timeline',           consumers: [] },
  // Mission DS primitives v7 — sections GEO/E-E-A-T (catalogue-only).
  { id: 'direct-answer',                consumers: [] },
  { id: 'author-byline',                consumers: [] },
  { id: 'diagnostic-stages',            consumers: [] },
  { id: 'case-spotlight',               consumers: [] },
  { id: 'testimonial-metrics',          consumers: [] },
  // <<< [sections-gap] end
  // ── Live (34) ───────────────────────────────────────────────────────────────
  { id: 'hero-offer-detail',     consumers: [] }, // P0.3-h : OffresDetailTemplate (legacy mort) supprimé → catalogue-only (section live via 7 MDX offres composables)
  { id: 'hero-tech-layer',       consumers: ['src/components/templates/TechnologiesDetailTemplate.astro'] },
  { id: 'hero-service-detail',   consumers: [] }, // R6 purge : ServiceDetailTemplate supprimé en R0 (revops full-composable) → catalogue-only
  { id: 'hero-case-study',       consumers: ['src/components/templates/CaseStudyTemplate.astro'] },
  { id: 'hero-utility-masthead', consumers: ['src/components/templates/UtilityTemplate.astro'] },
  { id: 'hero-academy-hub',      consumers: [] }, // P0.2-F : page hub /ecole supprimée (cours stub non vendables) → catalogue-only
  { id: 'hero-conversion-funnel',consumers: ['src/components/templates/ConversionFunnelTemplate.astro'] },
  { id: 'hero-hub-stats',        consumers: ['src/pages/agence-web-montpellier.astro', 'src/pages/expertise-claude.astro', 'src/pages/agence/index.astro'] }, // v7 : conseil.mdx supprimé ; rendu réel = 3 pages .astro composables (sections inline)
  { id: 'hero-detail-menu',      consumers: [] }, // ex-DetailMenu template supprimé 2026-06-29 (mort, 0 page) → catalogue-only
  { id: 'hero-author',           consumers: ['src/components/templates/AuthorPageTemplate.astro'] },
  { id: 'hero-lead-magnet',      consumers: ['src/components/templates/LeadMagnetTemplate.astro'] },
  { id: 'hero-course',           consumers: ['src/components/templates/CourseDetailTemplate.astro'] },
  { id: 'hero-essay',            consumers: ['src/components/templates/EssayTemplate.astro'] },
  { id: 'hero-split',            consumers: [] },
  { id: 'hero-split-media',      consumers: [] },
  { id: 'masthead-bar',          consumers: [] },
  { id: 'breadcrumb-bar',        consumers: [] },
  { id: 'hero-editorial-kpi',    consumers: [] },
  { id: 'hero-scope-minimap',    consumers: [] },
  { id: 'hero-thin-media',       consumers: [] },
  { id: 'hero-tech-signature',   consumers: [] },
  { id: 'hero-trizone',          consumers: [] },
  { id: 'hero-numeral-cover',    consumers: [] },
  { id: 'hero-masthead-card',    consumers: [] },
  { id: 'hero-capability-band',  consumers: [] },
  { id: 'hero-summary-rail',     consumers: [] },
  { id: 'hero-editorial-masthead', consumers: [] },
  { id: 'hero-asymmetric-grid',  consumers: [] },
  { id: 'hero-centered-band',    consumers: [] },
  { id: 'hero-media-medallion',  consumers: [] },
  { id: 'hero-baseline-stats',   consumers: [] },
  { id: 'hero-grid-12',          consumers: [] },
  { id: 'hero-card-cover',       consumers: [] },
  { id: 'hero-stack-rhythm',     consumers: [] },
  { id: 'hero-magazine-cover',   consumers: [] },
  { id: 'proof-bar',             consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'method-timeline',       consumers: ['src/components/templates/CaseStudyTemplate.astro'] },
  { id: 'feature-grid',          consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'social-proof',          consumers: ['src/pages/index.astro'] },
  { id: 'ecosystem-partners',    consumers: [] },
  { id: 'faq-accordion',         consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'cta-final',             consumers: ['src/components/templates/ConversionFunnelTemplate.astro', 'src/components/templates/CaseStudyTemplate.astro', 'src/components/templates/UtilityTemplate.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro'] }, // home = organism BookSession (twin merge) → cta-final après migration · R6 : ServiceDetail/Hub purgés (R0), UtilityTemplate ajouté (consommateur réel)
  { id: 'cta-band',              consumers: ['src/components/templates/TrustLegalTemplate.astro', 'src/components/templates/UtilityTemplate.astro', 'src/components/templates/EssayTemplate.astro'] }, // R6 : ListIndexTemplate fusionné dans UtilityTemplate (variant list)
  // backfill 2026-06-08 — 7 ids présents au registry, consommés par des pages live (vérifié grep src/pages)
  { id: 'tier-pyramid-svg',      consumers: [] }, // R6 : /offres supprimé ; aucun consumer live (catalogue-only)
  { id: 'offer-tier-grid',       consumers: ['src/content/services/systeme-complet.json', 'src/pages/services/index.astro'] }, // R6 : /offres→ apex systeme-complet + hub /services
  { id: 'team-card-grid',        consumers: ['src/pages/equipe/index.astro'] },
  { id: 'hero-atlas',            consumers: ['src/pages/atlas.astro', 'src/pages/en/atlas.astro'] },
  { id: 'persona-attributes-grid', consumers: ['src/pages/ressources/personas/[slug].astro'] },
  { id: 'editorial-split-grid',  consumers: ['src/pages/ressources/index.astro', 'src/pages/en/ressources/index.astro'] },
  { id: 'coming-soon-pills',     consumers: ['src/pages/secteurs/index.astro'] },

  // ── Catalogue-only (40) ─────────────────────────────────────────────────────
  // NB: architecture-diagram/services-grid/maturity-pyramid/use-case-index/case-card-grid/editorial-preview sont LIVE (home) bien que listés ici.
  { id: 'hero-centered',         consumers: [] },
  { id: 'hero-full-bleed',       consumers: [] },
  { id: 'hero-hub-listing',      consumers: ['src/components/templates/UtilityTemplate.astro'] }, // R6 : live via la branche list du shell fusionné (ex-ListIndexTemplate)
  { id: 'hero-pillar-hub',       consumers: [] },
  { id: 'hero-home',             consumers: [] },
  { id: 'hero-landing',          consumers: [] },
  { id: 'hero-problem-index',    consumers: [] },
  { id: 'hero-sector',           consumers: [] },
  { id: 'hero-hub-masthead',     consumers: [] },
  { id: 'hero-service-masthead', consumers: [] },
  { id: 'hero-tunnel-step',      consumers: [] },
  { id: 'tunnel-step-hero',      consumers: [] },
  { id: 'tunnel-step-nav',       consumers: [] },
  { id: 'hero-liquid',           consumers: [] },
  { id: 'trust-legal-section',   consumers: [] },
  { id: 'welcome-section',       consumers: [] },
  { id: 'list-index-section',    consumers: [] },
  { id: 'marquee-band',          consumers: [] },
  { id: 'problems-grid',         consumers: [] },
  { id: 'why-stalls',            consumers: [] },
  { id: 'how-we-ship',           consumers: [] },
  { id: 'operating-layer',       consumers: [] },
  { id: 'manifesto-block',       consumers: [] },
  { id: 'metric-shift',          consumers: [] },
  { id: 'stat-block',            consumers: [] },
  { id: 'comparison-table',      consumers: [] },
  { id: 'timeline-block',        consumers: [] },
  { id: 'media-block',           consumers: [] },
  { id: 'pricing-table',         consumers: [] },
  { id: 'objection-handler',     consumers: [] },
  { id: 'cta-inline',            consumers: [] },
  { id: 'testimonial-block',     consumers: [] },
  { id: 'guarantee-block',       consumers: [] },
  { id: 'architecture-diagram',  consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'services-grid',         consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'maturity-pyramid',      consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'use-case-index',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'case-card-grid',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro', 'src/pages/solutions/index.astro', 'src/pages/en/solutions/index.astro'] },
  { id: 'case-featured-grid',    consumers: [] }, // U3 : extraction du layout featured-grid orphelin du hub /cas-clients → catalogue-only (câblage page = phase 2)
  { id: 'commitments-grid',      consumers: [] },
  { id: 'branded-callout',       consumers: [] },
  { id: 'editorial-preview',     consumers: ['src/pages/index.astro', 'src/pages/en/index.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro'] }, // MERGE← FieldNotes (organism supprimé, pages data-driven verbatim)
  { id: 'newsletter-band',       consumers: [] },
  { id: 'spec-bar',              consumers: [] },
  { id: 'deliverables-grid',     consumers: [] },
  { id: 'tech-stack-band',       consumers: [] },
  { id: 'related-cards-band',    consumers: [] },
  { id: 'pull-quote-block',      consumers: [] },
  { id: 'inclusions-list',       consumers: [] },
  { id: 'problem-statement',     consumers: [] },

  // ── Catalogue-only · variations 2026-06-09 (12) ──────────────────────────────
  { id: 'bento-grid',                consumers: [] },
  { id: 'feature-zigzag',            consumers: [] },
  { id: 'logo-wall',                 consumers: [] },
  { id: 'pricing-comparison-matrix', consumers: [] },
  { id: 'gallery-masonry',           consumers: [] },
  { id: 'feature-tabs',              consumers: [] },
  { id: 'icon-trio',                 consumers: [] },
  { id: 'quote-spotlight',           consumers: [] },
  { id: 'steps-horizontal',          consumers: [] },
  { id: 'cta-split-visual',          consumers: [] },
  { id: 'stats-bento',               consumers: [] },
  { id: 'comparison-duo',            consumers: [] },
  { id: 'service-catalog-list',      consumers: [] }, // R6 : /offres/conseil.mdx supprimé ; catalogue-only
  { id: 'fit-columns',               consumers: [] }, // R6 : /offres/conseil.mdx supprimé ; catalogue-only
  { id: 'editorial-table-block',     consumers: [] }, // R6 : /offres/conseil.mdx supprimé ; catalogue-only
  { id: 'decision-list',             consumers: [] },
  { id: 'tech-positioning-split',    consumers: ['src/pages/expertise-claude.astro'] },
  { id: 'tech-capabilities-specs',   consumers: ['src/pages/expertise-claude.astro'] },
  { id: 'tech-models-table',         consumers: ['src/pages/expertise-claude.astro'] },
  { id: 'tech-when-dual',            consumers: [] },
  { id: 'tech-integration-flow',     consumers: ['src/pages/expertise-claude.astro'] },
  // Wave 1.4 — 6 types signatures Solutions, consommés par les 8 pages de la collection solutions
  { id: 'pain-points',               consumers: SOLUTIONS_CONSUMERS },
  { id: 'workflow-table',            consumers: SOLUTIONS_CONSUMERS },
  { id: 'roi-band',                  consumers: SOLUTIONS_CONSUMERS },
  // Recréée 2026-06-16 (perte au retrait OffresDetailTemplate, commit e953287) : catalogue-only
  // jusqu'à recomposition en MDX offres composable (frontmatter sections[]).
  { id: 'off-proof',                 consumers: [] },
  { id: 'case-split',                consumers: SOLUTIONS_CONSUMERS },
  { id: 'department-stack',          consumers: SOLUTIONS_CONSUMERS },
  { id: 'department-cta',            consumers: SOLUTIONS_CONSUMERS },
  // Wave 1.5 — École hub : 2 blocs bespoke EcoleHubTemplate catalogués, consommés par la page hub École (rendu direct)
  { id: 'course-catalog-table',      consumers: [] }, // P0.2-F : page hub /ecole supprimée → catalogue-only
  { id: 'learning-path-list',        consumers: [] }, // P0.2-F : page hub /ecole supprimée → catalogue-only
  // Mission catalogue-gap 2026-06-11 — 7 types extraits des patterns /console + /manifesto,
  // usage library (0 consommateur : les pages live console.astro/manifesto.astro restent bespoke)
  { id: 'terminal-table',            consumers: [] },
  { id: 'editorial-write-feed',      consumers: [] },
  { id: 'product-reel',              consumers: [] }, // catalogue-only : ProductReel.tsx scroll-driven préservé
  { id: 'agentic-terminal',          consumers: [] }, // catalogue-only : AgenticTerminal.tsx IDE live-typing
  { id: 'challenges-grid',           consumers: [] }, // catalogue-only : récolte virtuoseOS PersonaChallenges
  { id: 'journey-steps',             consumers: [] }, // catalogue-only : récolte virtuoseOS PersonaJourney
  { id: 'manifesto-statement',       consumers: [] },
  { id: 'manifesto-act',             consumers: [] },
  { id: 'asymmetric-services',       consumers: [] },
  { id: 'terminal-mockup',           consumers: [] },
  { id: 'terminal-metrics-strip',    consumers: [] },
  // >>> [gen-pricing] start
  // Mission gen-pricing 2026-06-11 — 3 types pricing-sections (catalogue, 0 consommateur live)
  { id: 'pricing-cards',             consumers: [] },
  { id: 'pricing-toggle',            consumers: [] },
  { id: 'pricing-single-highlight',  consumers: [] },
  // <<< [gen-pricing] end
  // >>> [t5-touchpoint-sync] start
  // Wave #38 T5 (2026-06-28) : 13 types présents au registry mais absents de SECTION_USAGE
  // (gap pré-existant, antérieur à T5). Ajoutés ici pour aligner le 5e touchpoint (manifest).
  // Tous catalogue-only (0 consommateur live connu) ; corriger consumers si usage live avéré.
  { id: 'definition-extract',        consumers: [] },
  { id: 'eeat-panel',                consumers: [] },
  { id: 'horizontal-showcase',       consumers: [] },
  { id: 'hover-reveal-list',         consumers: [] },
  { id: 'media-bento',               consumers: [] },
  { id: 'media-swap-band',           consumers: [] },
  { id: 'method-stepline',           consumers: [] },
  { id: 'pain-severity-list',        consumers: [] },
  { id: 'photo-cluster',             consumers: [] },
  { id: 'scroll-gallery',            consumers: [] },
  { id: 'stack-cards',               consumers: [] },
  { id: 'statement-orbit',           consumers: [] },
  { id: 'system-flow',               consumers: [] },
  // #39 : section de corps riche (Markdown -> prose). Catalogue-only a sa creation.
  { id: 'rich-text',                 consumers: [] },
  // #80 : 2 familles narratives awwwards (catalogue-only a leur creation).
  { id: 'sticky-scroll-storytelling', consumers: [] },
  { id: 'hover-reveal-words',         consumers: [] },
  // <<< [t5-touchpoint-sync] end
];

// ── Overrides d'étiquetage manuels (docs/40 §3) ──────────────────────────────
// Force l'étiquette `usage` d'un type, en dérogation de la dérivation auto
// (consumers.length > 0 ? 'site' : 'library'). Vide par défaut.
// Exemples d'usage légitime :
//   - garder un type en 'library' malgré des consumers (ex. consommateur de test/dev),
//   - exposer un type en 'site' avant son câblage réel (réservé à un client).
// Renseigner avec parcimonie : l'étiquette dérive des consumers réels par défaut.
const USAGE_OVERRIDES: Partial<Record<SectionType, SectionUsage>> = {
  // (vide) · aucun override en vigueur.
};

/** Dérive l'étiquette catalogue : override manuel sinon dérivation par consumers. */
export function deriveUsage(id: SectionType, consumers: string[]): SectionUsage {
  return USAGE_OVERRIDES[id] ?? (consumers.length > 0 ? 'site' : 'library');
}

// ── LIBRARY_SECTIONS (category/component dérivés de SECTIONS) ─────────────────

export const LIBRARY_SECTIONS: LibrarySectionEntry[] = SECTION_USAGE.map(
  ({ id, consumers }) => ({
    id,
    category: SECTIONS[id].categorySlug,
    component: (SECTIONS[id].component as unknown as { name: string }).name,
    rendering: consumers.length > 0 ? 'live' : 'catalogue-only',
    usage: deriveUsage(id, consumers),
    consumers,
  }),
);

/** Index id → entrée, pour lookup O(1) par les pages catalogue. */
const SECTION_BY_ID = new Map<string, LibrarySectionEntry>(
  LIBRARY_SECTIONS.map((s) => [s.id, s]),
);

// ── LIBRARY_ORGANISMS (hand-authored — §3 matrice 2026-06-04) ────────────────

export const LIBRARY_ORGANISMS: LibraryOrganismEntry[] = [
  // MERGE→ (3) — décision Simon 2026-06-04 : jumeau catalogue retenu comme canonique (Hero→hero-home, BookSession→cta-final CENTRÉ, FooterMarquee→marquee-band). Organisms encore live sur la home ; migration dans les templates/pages DIFFÉRÉE jusqu'à l'audit complet catalogue. View Transitions Hero + border-radius BookSession abandonnés (non visibles / sans impact).
  { id: 'Hero',               file: 'src/components/ui/organisms/Hero.astro',               twin: 'hero-home',            status: 'merge', consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'BookSession',        file: 'src/components/ui/organisms/BookSession.astro',        twin: 'cta-final',            status: 'merge', consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'FooterMarquee',      file: 'src/components/ui/organisms/FooterMarquee.astro',      twin: 'marquee-band',         status: 'merge', consumers: ['src/layouts/Base.astro'] },

  // KEEP-bespoke (5) — chrome/infra, hors catalogue
  { id: 'AtlasGrid',          file: 'src/components/ui/organisms/AtlasGrid.astro',          twin: null,                   status: 'keep-bespoke', consumers: ['src/pages/atlas.astro', 'src/pages/en/atlas.astro'] },
  { id: 'CookiesBanner',      file: 'src/components/ui/organisms/CookiesBanner.astro',      twin: null,                   status: 'keep-bespoke', consumers: ['src/layouts/Base.astro'] },
  { id: 'PersonaSwitcher',    file: 'src/components/ui/organisms/PersonaSwitcher.astro',    twin: null,                   status: 'keep-bespoke', consumers: ['src/pages/atlas.astro', 'src/pages/en/atlas.astro'] },
  { id: 'Stub',               file: 'src/components/ui/organisms/Stub.astro',               twin: null,                   status: 'keep-bespoke', consumers: [] },
  { id: 'ManifestoAccent',    file: 'src/components/ui/organisms/ManifestoAccent.astro',    twin: null,                   status: 'keep-bespoke', consumers: ['src/pages/manifesto.astro', 'src/pages/en/manifesto.astro'] },

  // ORPHAN supprimés (7, dette-zéro 2026-06-04, 0 consommateur) : HowWeShip, Manifesto,
  // OperatingLayer, WhyAIStalls, WritingNotes (jumeaux catalogués existants) + Offices, SigBand
  // (sans jumeau). Historique complet : docs/cartography/13-COVERAGE-MATRIX.md §3.
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function sectionsByCategory(cat: string): LibrarySectionEntry[] {
  return LIBRARY_SECTIONS.filter((s) => s.category === cat);
}

export function liveSections(): LibrarySectionEntry[] {
  return LIBRARY_SECTIONS.filter((s) => s.rendering === 'live');
}

export function catalogueOnlySections(): LibrarySectionEntry[] {
  return LIBRARY_SECTIONS.filter((s) => s.rendering === 'catalogue-only');
}

// ── Étiquetage catalogue (docs/40 §3, V-F6) ──────────────────────────────────

/** Étiquette catalogue d'un type ('library' par défaut si type inconnu). */
export function getUsage(id: string): SectionUsage {
  return SECTION_BY_ID.get(id)?.usage ?? 'library';
}

/** Liste des consommateurs live d'un type ([] si type inconnu). */
export function getConsumers(id: string): string[] {
  return SECTION_BY_ID.get(id)?.consumers ?? [];
}

/** Entrée manifest complète pour un type (undefined si type inconnu). */
export function getSectionUsageEntry(id: string): LibrarySectionEntry | undefined {
  return SECTION_BY_ID.get(id);
}
