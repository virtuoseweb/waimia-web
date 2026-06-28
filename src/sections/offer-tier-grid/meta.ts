// Waimia · Co-location DS (Wave #38, T5) · module `offer-tier-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['buttons', 'badge', 'cards'],
    layoutFacets: ['1-col'],
    tags: ['offers', 'tiers', 'pricing', 'cards'],
    status: 'stable',
    description_fr: 'Section de palier d’offres avec eyebrow, H2, lede, grille de cartes et variante hero sombre optionnelle.',
    description_en: 'Offer-tier section with eyebrow, headline, lede, card grid, and optional dark featured hero variant.',
  
};
