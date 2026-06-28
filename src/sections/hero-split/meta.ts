// Waimia · Co-location DS (Wave #38, T5) · module `hero-split` · meta (extrait)
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
    layoutFacets: ['multi-col', 'split'],
    tags: ['hero', 'split', 'cta'],
    status: 'stable',
    description_fr: "Hero en deux colonnes pour présenter une offre avec visuel et appel à l'action principal.",
    description_en: 'Two-column hero section for presenting an offer with a visual and primary call to action.',
  
};
