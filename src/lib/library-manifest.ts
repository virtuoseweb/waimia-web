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
  // ── Live (21) ───────────────────────────────────────────────────────────────
  { id: 'hero-offer-detail',     consumers: ['src/components/templates/OffresDetail.astro'] },
  { id: 'hero-tech-layer',       consumers: ['src/components/templates/TechnologiesDetail.astro'] },
  { id: 'hero-service-detail',   consumers: ['src/components/templates/ServiceDetail.astro'] },
  { id: 'hero-case-study',       consumers: ['src/components/templates/CaseStudy.astro'] },
  { id: 'hero-utility-masthead', consumers: ['src/components/templates/Utility.astro'] },
  { id: 'hero-academy-hub',      consumers: ['src/components/templates/EcoleHub.astro'] },
  { id: 'hero-conversion-funnel',consumers: ['src/components/templates/ConversionFunnel.astro'] },
  { id: 'hero-hub-stats',        consumers: ['src/components/templates/Hub.astro'] },
  { id: 'hero-detail-menu',      consumers: ['src/components/templates/DetailMenu.astro'] },
  { id: 'hero-author',           consumers: ['src/components/templates/AuthorPage.astro'] },
  { id: 'hero-lead-magnet',      consumers: ['src/components/templates/LeadMagnet.astro'] },
  { id: 'hero-course',           consumers: ['src/components/templates/CourseDetail.astro'] },
  { id: 'hero-essay',            consumers: ['src/components/templates/Essay.astro'] },
  { id: 'hero-split',            consumers: ['src/content/mdx/composable-pilot'] },
  { id: 'proof-bar',             consumers: ['src/components/templates/ServiceDetail.astro', 'src/components/templates/DetailMenu.astro', 'src/pages/index.astro', 'src/pages/en/index.astro', 'src/content/mdx'] },
  { id: 'method-timeline',       consumers: ['src/components/templates/ServiceDetail.astro', 'src/components/templates/CaseStudy.astro', 'src/components/templates/DetailMenu.astro', 'src/content/mdx'] },
  { id: 'feature-grid',          consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'social-proof',          consumers: ['src/pages/index.astro', 'src/pages/technologies/index.astro'] },
  { id: 'faq-accordion',         consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'cta-final',             consumers: ['src/components/templates/ConversionFunnel.astro', 'src/components/templates/ServiceDetail.astro', 'src/components/templates/CaseStudy.astro', 'src/components/templates/DetailMenu.astro', 'src/components/templates/Hub.astro', 'src/pages/index.astro', 'src/pages/en/index.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro', 'pages/hub-listing (~15)', 'src/content/mdx'] },
  { id: 'cta-band',              consumers: ['src/components/templates/TrustLegal.astro', 'src/components/templates/ListIndex.astro', 'src/components/templates/Essay.astro'] },

  // ── Catalogue-only (46) ─────────────────────────────────────────────────────
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
  { id: 'stat-block',            consumers: [] },
  { id: 'comparison-table',      consumers: [] },
  { id: 'timeline-block',        consumers: [] },
  { id: 'media-block',           consumers: [] },
  { id: 'pricing-table',         consumers: [] },
  { id: 'objection-handler',     consumers: [] },
  { id: 'cta-inline',            consumers: [] },
  { id: 'testimonial-block',     consumers: [] },
  { id: 'guarantee-block',       consumers: [] },
  { id: 'architecture-diagram',  consumers: [] },
  { id: 'services-grid',         consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'maturity-pyramid',      consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'use-case-index',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'case-card-grid',        consumers: [] },
  { id: 'commitments-grid',      consumers: [] },
  { id: 'branded-callout',       consumers: [] },
  { id: 'editorial-preview',     consumers: [] },
  { id: 'newsletter-band',       consumers: [] },
  { id: 'spec-bar',              consumers: [] },
  { id: 'deliverables-grid',     consumers: [] },
  { id: 'tech-stack-band',       consumers: [] },
  { id: 'related-cards-band',    consumers: [] },
  { id: 'pull-quote-block',      consumers: [] },
  { id: 'inclusions-list',       consumers: [] },
  { id: 'problem-statement',     consumers: [] },
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
  // MERGE→ (6) — jumeau catalogué existe, cible conversion vers le registry
  //              (SixServices→services-grid + Pyramid→maturity-pyramid + Departments→use-case-index : organisms supprimés, home FR+EN data-driven)
  { id: 'Hero',               file: 'src/components/ui/organisms/Hero.astro',               twin: 'hero-home',            status: 'merge',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'SystemArchitecture', file: 'src/components/ui/organisms/SystemArchitecture.astro', twin: 'architecture-diagram', status: 'merge',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'Cases',              file: 'src/components/ui/organisms/Cases.astro',              twin: 'case-card-grid',       status: 'merge',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro', 'src/pages/atlas.astro', 'src/pages/en/atlas.astro', 'src/pages/solutions/index.astro'] },
  { id: 'FieldNotes',         file: 'src/components/ui/organisms/FieldNotes.astro',         twin: 'editorial-preview',    status: 'merge',        consumers: ['src/pages/atlas.astro', 'src/pages/en/atlas.astro'] },
  { id: 'BookSession',        file: 'src/components/ui/organisms/BookSession.astro',        twin: 'cta-final',            status: 'merge',        consumers: ['src/pages/index.astro', 'src/pages/en/index.astro'] },
  { id: 'FooterMarquee',      file: 'src/components/ui/organisms/FooterMarquee.astro',      twin: 'marquee-band',         status: 'merge',        consumers: ['src/layouts/Base.astro'] },

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
