// Waimia · Co-location DS (Wave #38, T5) · module `hero-centered` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'line-art', 'buttons', 'badge', 'avatar', 'cards'],
    layoutFacets: ['3-col', 'centered'],
    tags: ['hero', 'centered', 'cta'],
    status: 'stable',
    description_fr: 'Hero centré pour poser une proposition de valeur claire et guider vers une action principale.',
    description_en: 'Centered hero section for stating a clear value proposition and guiding users to a primary action.',
  
};
