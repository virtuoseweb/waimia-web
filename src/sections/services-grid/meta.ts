// Waimia · Co-location DS (Wave #38, T5) · module `services-grid` · meta (extrait)
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
    elements: ['cards'],
    layoutFacets: ['1-col'],
    tags: ['services', 'grid', 'metrics', 'connectors'],
    status: 'stable',
    description_fr: 'Grille éditoriale de services 3×2 avec figure, métrique, body et ligne de connecteurs en pied de cellule.',
    description_en: 'Editorial 3×2 services grid with figure index, metric, body, and a connectors line at the foot of each cell.',
  
};
