// Waimia · Co-location DS (Wave #38, T5) · module `spec-bar` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    family: 'band',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: [],
    layoutFacets: ['3-col'],
    tags: ['specs', 'meta', 'case-study', 'grid', 'mono'],
    status: 'stable',
    description_fr: 'Barre de spécifications projet N colonnes (label mono + valeur) avec grille CSS var, extrait de CaseStudyTemplate.',
    description_en: 'N-column project spec bar (mono label + value) with CSS var grid, sourced from CaseStudyTemplate.',
  
};
