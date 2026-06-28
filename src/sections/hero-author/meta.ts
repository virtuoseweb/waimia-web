// Waimia · Co-location DS (Wave #38, T5) · module `hero-author` · meta (extrait)
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
    tags: ['hero', 'author', 'portrait', 'profile'],
    status: 'stable',
    description_fr: 'Hero de page auteur : 2-col copy/portrait, breadcrumb équipe, role eyebrow, h1 split prénom+nom italic accent, lede display.',
    description_en: 'Author page hero: 2-col copy/portrait, team breadcrumb, role eyebrow, h1 split first-name + italic accent surname, display lede.',
  
};
