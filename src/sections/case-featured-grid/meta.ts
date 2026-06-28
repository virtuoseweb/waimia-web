// Waimia · Co-location DS (Wave #38, T5) · module `case-featured-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'card-grid',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'buttons', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['case-study', 'featured', 'grid', 'listing', 'proof'],
    status: 'stable',
    description_fr: "Grille de cas clients « featured » : un cas mis en avant (colonne large, cover optionnelle) plus des cas secondaires en lignes numérotées, avec chip de provenance.",
    description_en: 'Featured case-study grid: one highlighted case (wide column, optional cover) plus secondary cases as numbered rows, with provenance chip.',
  
};
