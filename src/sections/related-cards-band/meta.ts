// Waimia · Co-location DS (Wave #38, T5) · module `related-cards-band` · meta (extrait)
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
    layoutFacets: ['1-col'],
    tags: ['related', 'cards', 'navigation', 'editorial'],
    status: 'stable',
    description_fr: 'Bande de trois cards connexes pour relier cas, offres ou ressources en fin de page.',
    description_en: 'Three-card related band for linking cases, offers, or resources near the end of a page.',
  
};
