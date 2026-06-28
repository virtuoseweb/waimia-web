// Waimia · Co-location DS (Wave #38, T5) · module `hero-academy-hub` · meta (extrait)
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
    tags: ['hero', 'academy', 'school', 'stats'],
    status: 'stable',
    description_fr: 'Hero hub académie : kicker mono, h1 display, lede et bande de stats mono (cours, parcours, alumni).',
    description_en: 'Academy hub hero: mono kicker, display h1, lede, and mono stats strip (courses, paths, alumni).',
  
};
