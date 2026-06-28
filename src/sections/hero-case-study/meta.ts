// Waimia · Co-location DS (Wave #38, T5) · module `hero-case-study` · meta (extrait)
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
    tags: ['hero', 'case-study', 'specs', 'decoration'],
    status: 'stable',
    description_fr: "Hero d'étude de cas avec décor géométrique, titre et barre de spécifications (client, secteur, durée).",
    description_en: 'Case study hero with geometric decoration, headline, and a specification bar (client, sector, duration).',
  
};
