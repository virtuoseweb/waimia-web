// Waimia · Co-location DS (Wave #38, T5) · module `icon-trio` · meta (extrait)
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
    tags: ['feature', 'icons', 'trio', 'columns'],
    status: 'stable',
    description_fr: 'Trois colonnes iconographiques avec titre et description, séparées par des hairlines verticaux. Idéal pour présenter 3 piliers ou bénéfices distincts.',
    description_en: 'Three icon columns with title and description, separated by vertical hairlines. Ideal for presenting 3 pillars or distinct benefits.',
  
};
