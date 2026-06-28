// Waimia · Co-location DS (Wave #38, T5) · module `commitments-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['hover-zoom', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'line-art', 'list', 'icons'],
    layoutFacets: ['multi-col', 'centered', 'split'],
    tags: ['commitments', 'guarantees', 'grid', 'trust'],
    status: 'stable',
    description_fr: 'Grille hairline de 2 à 6 engagements ou garanties, titre display et corps sans, extrait de la page Méthode.',
    description_en: 'Hairline grid of 2–6 commitments or guarantees, display title and sans body, sourced from the Méthode page.',
  
};
