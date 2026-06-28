// Waimia · Co-location DS (Wave #38, T5) · module `editorial-table-block` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'table',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll', 'scroll-reveal'],
    interactions: ['hover', 'scroll', 'drag-scroll'],
    elements: ['badge'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['comparison', 'table', 'editorial', 'comparator', 'rows'],
    status: 'stable',
    description_fr: 'Comparateur éditorial : en-tête kicker mono et titre display, puis tableau EditorialTable bilingue (colonnes, lignes, caption).',
    description_en: 'Editorial comparator: a mono kicker plus display heading header, then a bilingual EditorialTable (columns, rows, caption).',
  
};
