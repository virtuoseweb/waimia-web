// Waimia · Library manifest — catalogue catégorisé dérivé du registry
// Lit SECTIONS pour category/component (anti-drift). Ne modifie pas section-registry.ts.

import { SECTIONS } from './section-registry';
import type { SectionType } from '../schemas/sections';

// ── Types ────────────────────────────────────────────────────────────────────

export type SectionRendering = 'live' | 'catalogue-only';

export interface LibrarySectionEntry {
  id: string;
  /** categorySlug dérivé de SECTIONS */
  category: string;
  /** Nom du composant Astro dérivé de SECTIONS */
  component: string;
  rendering: SectionRendering;
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

const SECTION_USAGE: Array<{ id: SectionType; consumers: string[] }> = [
  // ── Live (34) ───────────────────────────────────────────────────────────────
  { id: 'hero-offer-detail',     consumers: ['src/components/templates/OffresDetailTemplate.astro'] },
  { id: 'hero-tech-layer',       consumers: ['src/components/templates/TechnologiesDetailTemplate.astro'] },
  { id: 'hero-service-detail',   consumers: ['src/components/templates/ServiceDetailTemplate.astro'] },
  { id: 'hero-case-study',       consumers: ['src/components/templates/CaseStudyTemplate.astro'] },
  { id: 'hero-utility-masthead', consumers: ['src/components/templates/UtilityTemplate.astro'] },
  { id: 'hero-academy-hub',      consumers: ['src/components/templates/EcoleHubTemplate.astro'] },
  { id: 'hero-conversion-funnel',consumers: ['src/components/templates/ConversionFunnelTemplate.astro'] },
  { id: 'hero-hub-stats',        consumers: ['src/components/templates/HubTemplate.astro'] },
  { id: 'hero-detail-menu',      consumers: ['src/components/templates/DetailMenuTemplate.astro'] },
  { id: 'hero-author',           consumers: ['src/components/templates/AuthorPageTemplate.astro'] },
  { id: 'hero-lead-magnet',      consumers: ['src/components/templates/LeadMagnetTemplate.astro'] },
  { id: 'hero-course',           consumers: ['src/components/templates/CourseDetailTemplate.astro'] },
  { id: 'hero-essay',            consumers: ['src/components/templates/EssayTemplate.astro'] },
  { id: 'hero-split',            consumers: ['src/content/offres/composable-pilot.mdx'] },
  { id: 'proof-bar',             consumers: ['src/components/templates/ServiceDetailTemplate.astro', 'src/components/templates/DetailMenuTemplate.astro', 'src/pages/index.astro', 'src/pages/en/index.astro', 'src/content/offres/composable-pilot.mdx'] },
  { id: 'method-timeline',       consumers: ['src/components/templates/ServiceDetailTemplate.astro', 'src/components/templates/CaseStudyTemplate.astro', 'src/components/templates/DetailMenuTemplate.astro', 'src/content/offres/composable-pilot.mdx'] },
  { id: 'feature-grid',          consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'social-proof',          consumers: ['src/pages/index.astro', 'src/pages/technologies/index.astro'] },
  { id: 'faq-accordion',         consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'cta-final',             consumers: ['src/components/templates/ConversionFunnelTemplate.astro', 'src/components/templates/ServiceDetailTemplate.astro', 'src/components/templates/CaseStudyTemplate.astro', 'src/components/templates/DetailMenuTemplate.astro', 'src/components/templates/HubTemplate.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro', 'src/content/offres/composable-pilot.mdx'] }, // home = organism BookSession (twin merge) → cta-final après migration
  { id: 'cta-band',              consumers: ['src/components/templates/TrustLegalTemplate.astro', 'src/components/templates/ListIndexTemplate.astro', 'src/components/templates/EssayTemplate.astro'] },
  // backfill 2026-06-08 — 7 ids présents au registry, consommés par des pages live (vérifié grep src/pages)
  { id: 'tier-pyramid-svg',      consumers: ['src/pages/offres/index.astro', 'src/pages/en/offres/index.astro'] },
  { id: 'offer-tier-grid',       consumers: ['src/pages/offres/index.astro', 'src/pages/en/offres/index.astro'] },
  { id: 'team-card-grid',        consumers: ['src/pages/equipe/index.astro'] },
  { id: 'hero-atlas',            consumers: ['src/pages/atlas.astro', 'src/pages/en/atlas.astro'] },
  { id: 'persona-attributes-grid', consumers: ['src/pages/ressources/personas/[slug].astro'] },
  { id: 'editorial-split-grid',  consumers: ['src/pages/ressources/index.astro', 'src/pages/en/ressources/index.astro'] },
  { id: 'coming-soon-pills',     consumers: ['src/pages/secteurs/index.astro'] },

  // ── Catalogue-only (40) ─────────────────────────────────────────────────────
  // NB: architecture-diagram/services-grid/maturity-pyramid/use-case-index/case-card-grid/editorial-preview sont LIVE (home) bien que listés ici.
  { id: 'hero-centered',         consumers: [] },
  { id: 'hero-full-bleed',       consumers: [] },
  { id: 'hero-hub-listing',      consumers: [] },
  { id: 'hero-pillar-hub',       consumers: [] },
  { id: 'hero-home',             consumers: [] },
  { id: 'hero-landing',          consumers: [] },
  { id: 'hero-problem-index',    consumers: [] },
  { id: 'hero-sector',           consumers: [] },
  { id: 'hero-hub-masthead',     consumers: [] },
  { id: 'hero-service-masthead', consumers: [] },
  { id: 'hero-tunnel-step',      consumers: [] },
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
  { id: 'service-catalog-list',      consumers: ['src/content/offres/conseil.mdx'] },
  { id: 'fit-columns',               consumers: ['src/content/offres/conseil.mdx'] },
  { id: 'editorial-table-block',     consumers: ['src/content/offres/conseil.mdx'] },
  { id: 'decision-list',             consumers: ['src/content/offres/conseil.mdx'] },
  { id: 'tech-positioning-split',    consumers: ['src/content/technologies/claude-models.mdx', 'src/content/technologies/virtuoseos.mdx'] },
  { id: 'tech-capabilities-specs',   consumers: ['src/content/technologies/claude-models.mdx', 'src/content/technologies/virtuoseos.mdx'] },
  { id: 'tech-models-table',         consumers: ['src/content/technologies/claude-models.mdx'] },
  { id: 'tech-when-dual',            consumers: ['src/content/technologies/claude-models.mdx', 'src/content/technologies/virtuoseos.mdx'] },
  { id: 'tech-integration-flow',     consumers: ['src/content/technologies/claude-models.mdx', 'src/content/technologies/virtuoseos.mdx'] },
];

// ── LIBRARY_SECTIONS (category/component dérivés de SECTIONS) ─────────────────

export const LIBRARY_SECTIONS: LibrarySectionEntry[] = SECTION_USAGE.map(
  ({ id, consumers }) => ({
    id,
    category: SECTIONS[id].categorySlug,
    component: (SECTIONS[id].component as unknown as { name: string }).name,
    rendering: consumers.length > 0 ? 'live' : 'catalogue-only',
    consumers,
  }),
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
