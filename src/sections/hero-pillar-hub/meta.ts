// Waimia · Co-location DS (Wave #38, T5) · module `hero-pillar-hub` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['multiple-images', 'line-art', 'buttons', 'list', 'kpi-numbers', 'badge'],
    layoutFacets: ['4-col', 'centered', 'split'],
    tags: ['hero', 'pillar', 'hub', 'stats'],
    status: 'stable',
    description_fr: 'Hero de page pilier avec titre maximal et grille de statistiques quatre colonnes optionnelle.',
    description_en: 'Pillar page hero with a maximal headline and an optional four-column statistics grid.',
  
};
