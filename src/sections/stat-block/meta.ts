// Waimia · Co-location DS (Wave #38, T5) · module `stat-block` · meta (extrait)
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
    interactions: ['hover', 'scroll'],
    elements: ['line-art', 'list', 'quote'],
    layoutFacets: ['4-col', 'split'],
    tags: ['stats', 'metrics', 'grid'],
    status: 'stable',
    description_fr: "Bloc de statistiques en grille pour mettre en avant des chiffres de performance ou d'impact.",
    description_en: 'Grid-based stats block for highlighting performance or impact figures.',
  
};
