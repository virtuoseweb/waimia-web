// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-block` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'quote',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['drag-scroll'],
    elements: ['line-art', 'list', 'quote', 'avatar', 'slider'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['testimonial', 'social-proof', 'quote'],
    status: 'stable',
    description_fr: 'Bloc témoignage pour mettre en avant une citation client et renforcer la confiance.',
    description_en: 'Testimonial block for highlighting a customer quote and strengthening trust.',
  
};
