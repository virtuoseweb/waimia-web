// Waimia · Co-location DS (Wave #38, T5) · module `pricing-comparison-matrix` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    family: 'table',
    intent: ['present-pricing'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['hover', 'drag-scroll'],
    elements: ['buttons', 'table'],
    layoutFacets: ['centered'],
    tags: ['pricing', 'table', 'comparison', 'matrix'],
    status: 'stable',
    description_fr: 'Matrice comparative tarifaire pour mettre en regard les fonctionnalites de 3 plans avec mise en avant de la colonne recommandee.',
    description_en: 'Pricing comparison matrix to compare features across 3 plans with a highlighted recommended column.',
  
};
