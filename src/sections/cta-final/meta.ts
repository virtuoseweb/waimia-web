// Waimia · Co-location DS (Wave #38, T5) · module `cta-final` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    family: 'band',
    intent: ['drive-action'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['buttons', 'icons'],
    layoutFacets: ['centered'],
    tags: ['cta', 'final', 'conversion'],
    status: 'stable',
    description_fr: "CTA final pour conclure une page et orienter vers l'action de conversion principale.",
    description_en: 'Final CTA section for closing a page and directing users to the main conversion action.',
  
};
