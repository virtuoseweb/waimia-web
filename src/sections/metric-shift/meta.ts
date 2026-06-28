// Waimia · Co-location DS (Wave #38, T5) · module `metric-shift` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    family: 'stat-grid',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art'],
    layoutFacets: ['multi-col'],
    tags: ['proof', 'metrics', 'before-after', 'results'],
    status: 'stable',
    description_fr: 'Comparaison avant → après : valeur initiale et finale magnifiées, delta.',
    description_en: 'Before → after comparison: initial and final value magnified, delta.',
  
};
