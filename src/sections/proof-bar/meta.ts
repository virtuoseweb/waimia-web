// Waimia · Co-location DS (Wave #38, T5) · module `proof-bar` · meta (extrait)
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
    elements: ['kpi-numbers', 'quote'],
    layoutFacets: ['multi-col'],
    tags: ['proof', 'metrics', 'bar'],
    status: 'stable',
    description_fr: 'Barre de preuve compacte pour afficher des métriques clés et renforcer la crédibilité.',
    description_en: 'Compact proof bar for displaying key metrics and reinforcing credibility.',
  
};
