// Waimia · Co-location DS (Wave #38, T5) · module `feature-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['hover-zoom', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'line-art', 'list', 'icons'],
    layoutFacets: ['multi-col', 'centered', 'split'],
    tags: ['features', 'grid'],
    status: 'stable',
    description_fr: "Grille de fonctionnalités pour structurer les bénéfices ou capacités principales d'une offre.",
    description_en: 'Feature grid for structuring the core benefits or capabilities of an offer.',
  
};
