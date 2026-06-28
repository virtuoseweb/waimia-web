// Waimia · Co-location DS (Wave #38, T5) · module `logo-wall` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    family: 'marquee',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['marquee', 'hover-zoom', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['multiple-images', 'logos', 'list'],
    layoutFacets: ['4-col'],
    tags: ['logos', 'grid', 'social-proof', 'static'],
    status: 'stable',
    description_fr: 'Grille statique de logos partenaires ou clients, avec effet grayscale vers couleur au hover. Distinct du bandeau animé marquee-band.',
    description_en: 'Static grid of partner or client logos with grayscale to colour hover effect. Distinct from the animated marquee-band.',
  
};
