// Waimia · Co-location DS (Wave #38, T5) · module `pricing-cards` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    family: 'card-grid',
    intent: ['present-pricing'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['cards', 'badge', 'list', 'buttons'],
    layoutFacets: ['3-col'],
    tags: ['pricing', 'cards', 'tiers', 'recommended', 'plans'],
    status: 'stable',
    description_fr: 'Grille de 2 à 4 cartes de prix côte à côte avec une carte « Recommandé » mise en avant, prix, période, features et CTA par carte. Ancrage par contraste.',
    description_en: 'Grid of 2 to 4 pricing cards side by side with a highlighted "Recommended" card, price, period, features and CTA per card. Anchoring by contrast.',
  
};
