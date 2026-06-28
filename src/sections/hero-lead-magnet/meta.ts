// Waimia · Co-location DS (Wave #38, T5) · module `hero-lead-magnet` · meta (extrait)
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
    layoutFacets: ['multi-col', 'split'],
    tags: ['hero', 'lead-magnet', 'whitepaper', 'cover', 'download'],
    status: 'stable',
    description_fr: 'Hero lead magnet (livre blanc) : 2-col texte/cover PDF, kicker + h1 + lede italique, meta format/date, carte download CTA.',
    description_en: 'Lead magnet hero (whitepaper): 2-col text/PDF cover, kicker + h1 + italic lede, format/date meta, download card CTA.',
  
};
