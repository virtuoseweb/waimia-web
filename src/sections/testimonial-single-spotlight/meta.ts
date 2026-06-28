// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-single-spotlight` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['multiple-images', 'quote', 'avatar'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['testimonial', 'spotlight', 'quote', 'portrait', 'single'],
    status: 'stable',
    description_fr: 'Un seul témoignage en plein écran : grande citation, portrait, logo client et attribution nom/rôle. Donne tout le poids à une voix client, sombre par défaut.',
    description_en: 'A single full-screen testimonial: a large quote, portrait, client logo and name/role attribution. Gives full weight to one client voice, dark by default.',
  
};
