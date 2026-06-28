// Waimia · Co-location DS (Wave #38, T5) · module `hero-service-masthead` · meta (extrait)
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
    tags: ['hero', 'service', 'masthead', 'simple'],
    status: 'stable',
    description_fr: 'Masthead service sobre : kicker § Service N + h1 display + lede display muted, sans décor SVG.',
    description_en: 'Plain service masthead: § Service N kicker + display h1 + muted display lede, no SVG decoration.',
  
};
