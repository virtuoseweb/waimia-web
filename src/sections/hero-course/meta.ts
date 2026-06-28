// Waimia · Co-location DS (Wave #38, T5) · module `hero-course` · meta (extrait)
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
    tags: ['hero', 'course', 'training', 'pills', 'meta'],
    status: 'stable',
    description_fr: 'Hero de page cours/formation : kicker accent + title + lede + meta-pills (niveau/durée/format/prix) + cta-group primary/ghost.',
    description_en: 'Course/training hero: accent kicker + title + lede + meta-pills (level/duration/format/price) + primary/ghost cta-group.',
  
};
