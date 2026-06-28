// Waimia · Co-location DS (Wave #38, T5) · module `case-split` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'split-media',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['buttons'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['solutions', 'case-study', 'split', 'results', 'testimonial'],
    status: 'stable',
    description_fr: 'Cas client en split dark/light 50/50 : récit du cas à gauche (titre, body, CTA) et résultats chiffrés à droite.',
    description_en: 'Client case in a 50/50 dark/light split: the case narrative on the left (title, body, CTA) and quantified results on the right.',
  
};
