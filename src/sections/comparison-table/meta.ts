// Waimia · Co-location DS (Wave #38, T5) · module `comparison-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'table',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['hover', 'drag-scroll'],
    elements: ['buttons', 'table'],
    layoutFacets: ['centered'],
    tags: ['comparison', 'table'],
    status: 'stable',
    description_fr: 'Tableau comparatif pour clarifier les différences entre offres, options ou approches.',
    description_en: 'Comparison table for clarifying differences between offers, options, or approaches.',
  
};
