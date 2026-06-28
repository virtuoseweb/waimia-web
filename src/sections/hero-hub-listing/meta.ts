// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-listing` · meta (extrait)
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
    tags: ['hero', 'hub', 'listing', 'editorial'],
    status: 'deprecated',
    description_fr: "(déprécié → hero-hub-masthead variant=listing) Hero éditorial de hub avec titre monumental et lede courte, sans appel à l'action, pour pages de listing.",
    description_en: '(deprecated → hero-hub-masthead variant=listing) Editorial hub hero with a monumental headline and short lede, without a call to action, for listing pages.',
  
};
