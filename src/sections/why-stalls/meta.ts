// Waimia · Co-location DS (Wave #38, T5) · module `why-stalls` · meta (extrait)
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
    effects: ['static'],
    interactions: ['scroll'],
    elements: ['line-art'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['why', 'stalls', 'sticky', 'figures', 'editorial'],
    status: 'stable',
    description_fr: 'Section éditoriale "pourquoi X cale" : chapter label sticky à gauche + N FIG rows à droite avec row-lines.',
    description_en: 'Editorial "why X stalls" section: sticky chapter label left + N FIG rows right with row-lines.',
  
};
