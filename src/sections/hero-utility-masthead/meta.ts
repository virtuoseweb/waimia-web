// Waimia · Co-location DS (Wave #38, T5) · module `hero-utility-masthead` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'masthead',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'line-art', 'buttons', 'badge', 'avatar', 'cards'],
    layoutFacets: ['3-col', 'centered'],
    tags: ['hero', 'utility', 'masthead', 'editorial'],
    status: 'deprecated',
    description_fr: '(déprécié → hero-hub-masthead variant=detail) Masthead utilitaire générique (about, méthode, academy intro) : kicker, h1 monumental, lede display italique, alignement gauche ou centré.',
    description_en: '(deprecated → hero-hub-masthead variant=detail) Generic utility masthead (about, method, academy intro): kicker, monumental h1, italic display lede, left or centered alignment.',
  
};
