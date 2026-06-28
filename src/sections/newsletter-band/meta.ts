// Waimia · Co-location DS (Wave #38, T5) · module `newsletter-band` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    family: 'band',
    intent: ['drive-action'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['form'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['newsletter', 'email', 'capture', 'dark', 'band'],
    status: 'stable',
    description_fr: 'Bande newsletter fond sombre : titre éditorial large à gauche, formulaire capture email à droite.',
    description_en: 'Dark newsletter band: large editorial headline on the left, email capture form on the right.',
  
};
