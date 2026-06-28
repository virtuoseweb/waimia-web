// Waimia · Co-location DS (Wave #38, T5) · module `hero-offer-detail` · meta (extrait)
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
    elements: ['line-art', 'buttons', 'badge', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'offer', 'detail', 'concentric-svg', 'tier'],
    status: 'stable',
    description_fr: 'Hero de page offre détail : SVG cercles concentriques signature, breadcrumb, tier kicker, h1 + lead italique, CTA et meta.',
    description_en: 'Offer detail hero: signature concentric circles SVG, breadcrumb, tier kicker, h1 + italic lead, CTA and meta.',
  
};
