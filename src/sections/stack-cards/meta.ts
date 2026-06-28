// Waimia · Co-location DS (Wave #38, T5) · module `stack-cards` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'scroll-interactive',
    intent: ['explain-process', 'show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['sticky-stack', 'scroll-reveal'],
    interactions: ['scroll'],
    elements: ['multiple-images', 'line-art', 'cards', 'list'],
    layoutFacets: ['2-col', 'split'],
    tags: ['scroll', 'stack', 'sticky', 'cards', 'method', 'interactive'],
    status: 'stable',
    description_fr: 'Cartes numerotees qui se superposent en s\'empilant au scroll (effet stack sticky, CSS pur). Ideal pour une methode en plusieurs temps.',
    description_en: 'Numbered cards that stack and overlap as you scroll (sticky stack effect, pure CSS). Ideal for a multi-step method.',
  
};
