// Waimia · Co-location DS (Wave #38, T5) · module `pain-points` · meta (extrait)
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
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'kpi-numbers', 'timeline', 'badge', 'cards'],
    layoutFacets: ['1-col'],
    tags: ['solutions', 'pain-points', 'friction', 'timeline', 'editorial'],
    status: 'stable',
    description_fr: 'Points de friction métier : en-tête eyebrow et titre display, aside Callout, frise Timeline numérotée des frictions.',
    description_en: 'Business pain points: an eyebrow and display heading header, a Callout aside, and a numbered Timeline of frictions.',
  
};
