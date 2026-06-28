// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-masthead` · meta (extrait)
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
    tags: ['hero', 'hub', 'masthead', 'index', 'unified', 'variant'],
    status: 'stable',
    description_fr: "Masthead unifié paramétrable (variant hub|listing|detail) : absorbe hero-hub-listing et hero-utility-masthead. hub = kicker mono + h1 italique display + lede court ; listing = deco SVG optionnelle + h1 monumental + lede révélée ; detail = kicker optionnel + h1 + lede display italique, alignement gauche ou centré.",
    description_en: 'Unified configurable masthead (variant hub|listing|detail): absorbs hero-hub-listing and hero-utility-masthead. hub = mono kicker + italic display h1 + short lede; listing = optional SVG deco + monumental h1 + revealed lede; detail = optional kicker + h1 + italic display lede, left or centered alignment.',
  
};
