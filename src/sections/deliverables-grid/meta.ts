// Waimia · Co-location DS (Wave #38, T5) · module `deliverables-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['line-art', 'cards', 'list'],
    layoutFacets: ['multi-col'],
    tags: ['deliverables', 'grid', 'cards', 'offer'],
    status: 'stable',
    description_fr: 'Grille de livrables tangibles avec cards numérotées et tag format/durée, extraite des pages offre et détail.',
    description_en: 'Tangible deliverables grid with numbered cards and format/duration tag, sourced from offer and detail pages.',
  
};
