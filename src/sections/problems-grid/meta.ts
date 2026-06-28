// Waimia · Co-location DS (Wave #38, T5) · module `problems-grid` · meta (extrait)
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
    effects: ['hover-zoom', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image', 'line-art', 'list', 'icons'],
    layoutFacets: ['multi-col', 'centered', 'split'],
    tags: ['problems', 'frictions', 'cards', 'grid', 'numbered'],
    status: 'stable',
    description_fr: 'Grille de problèmes/frictions auto-fit (3 cards min) : num + kicker + h3 + body, séparateurs hairline 1px.',
    description_en: 'Auto-fit problems/frictions grid (3+ cards): num + kicker + h3 + body, 1px hairline separators.',
  
};
