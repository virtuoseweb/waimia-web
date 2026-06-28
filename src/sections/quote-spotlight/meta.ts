// Waimia · Co-location DS (Wave #38, T5) · module `quote-spotlight` · meta (extrait)
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
    elements: ['image', 'quote', 'avatar', 'slider'],
    layoutFacets: ['centered'],
    tags: ['testimonial', 'quote', 'spotlight', 'editorial'],
    status: 'stable',
    description_fr: "Grande citation pleine lumiere sur fond paper-2 : guillemet decoratif, texte display italique, auteur avec avatar rond.",
    description_en: 'Full-spotlight quote on paper-2 background: decorative quotemark, italic display text, author with rounded avatar.',
  
};
