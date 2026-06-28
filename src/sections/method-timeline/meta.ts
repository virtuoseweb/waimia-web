// Waimia · Co-location DS (Wave #38, T5) · module `method-timeline` · meta (extrait)
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
    elements: ['timeline', 'list'],
    layoutFacets: ['multi-col'],
    tags: ['method', 'timeline', 'steps'],
    status: 'stable',
    description_fr: "Timeline méthodologique pour expliquer les étapes d'un accompagnement ou d'un processus.",
    description_en: 'Method timeline for explaining the steps of a service process or engagement.',
  
};
