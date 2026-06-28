// Waimia · Co-location DS (Wave #38, T5) · module `maturity-pyramid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    family: 'pyramid',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['line-art', 'list', 'timeline', 'cards'],
    layoutFacets: ['4-col'],
    tags: ['maturity', 'pyramid', 'timeline', 'tiers'],
    status: 'stable',
    description_fr: "Pyramide de maturité à quatre paliers avec timeline d'étapes, SVG progressif et grille de cartes asymétriques.",
    description_en: 'Four-tier maturity pyramid with a steps timeline, a progressive SVG, and an asymmetric card grid.',
  
};
