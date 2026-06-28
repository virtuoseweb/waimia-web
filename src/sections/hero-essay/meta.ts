// Waimia · Co-location DS (Wave #38, T5) · module `hero-essay` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

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
    tags: ['hero', 'essay', 'editorial', 'meta'],
    status: 'stable',
    description_fr: "Hero d'article éditorial avec accroche italique et métadonnées auteur, date et temps de lecture.",
    description_en: 'Editorial article hero with an italic lede and author, date, and reading-time metadata.',
  
};
