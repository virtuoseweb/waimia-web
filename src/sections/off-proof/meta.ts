// Waimia · Co-location DS (Wave #38, T5) · module `off-proof` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'quote',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'quote', 'badge'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['offres', 'proof', 'testimonial', 'metrics', 'quote'],
    status: 'stable',
    description_fr: 'Signal terrain : citation client (PullQuote) à gauche et grille de chiffres KeyMetric à droite, en asymétrie 5/7 avec séparateur Dingbat.',
    description_en: 'Field signal: a client quote (PullQuote) on the left and a grid of KeyMetric figures on the right, in a 5/7 asymmetry with a Dingbat divider.',
  
};
