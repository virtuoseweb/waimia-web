// Waimia · Co-location DS (Wave #38, T5) · module `editorial-split-grid` · meta (extrait)
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
    elements: ['cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['editorial', 'resources', 'blog', 'whitepapers'],
    status: 'stable',
    description_fr: 'Split éditorial deux colonnes pour lister blog et livres blancs, chacun avec cartes connexes et CTA.',
    description_en: 'Two-column editorial split for blog and white papers, each with related cards and CTA.',
  
};
