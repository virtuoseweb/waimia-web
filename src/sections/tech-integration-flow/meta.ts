// Waimia · Co-location DS (Wave #38, T5) · module `tech-integration-flow` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    family: 'timeline',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['timeline'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['technologies', 'integration', 'flow', 'timeline', 'stack'],
    status: 'stable',
    description_fr: 'Position dans la stack en frise verticale numérotée (Timeline + Dingbat), un nœud par étape d intégration.',
    description_en: 'Position in the stack as a numbered vertical timeline (Timeline + Dingbat), one node per integration step.',
  
};
