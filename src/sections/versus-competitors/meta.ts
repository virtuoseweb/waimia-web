// Waimia · Co-location DS (Wave #38, T5) · module `versus-competitors` · meta (extrait)
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
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['table'],
    layoutFacets: ['multi-col'],
    tags: ['comparison', 'competitors', 'versus', 'table', 'highlight'],
    status: 'stable',
    description_fr: 'Comparatif « nous vs alternatives » avec colonne « nous » mise en avant, lignes de critères groupées et cellules check / cross / partiel. Distinct de la matrice tarifaire interne.',
    description_en: 'A “us vs alternatives” comparison with the “us” column highlighted, grouped criteria rows and check / cross / partial cells. Distinct from the internal pricing matrix.',
  
};
