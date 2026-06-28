// Waimia · Co-location DS (Wave #38, T5) · module `hero-form-inline` · meta (extrait)
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
    interactions: ['scroll'],
    elements: ['list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'form', 'lead', 'capture', 'newsletter', 'above-fold'],
    status: 'stable',
    description_fr: 'Hero de capture lead above-the-fold : promesse à gauche, formulaire email/CTA à droite postant sur /api/newsletter, points de réassurance optionnels.',
    description_en: 'Above-the-fold lead-capture hero: promise on the left, email/CTA form on the right posting to /api/newsletter, optional reassurance points.',
  
};
