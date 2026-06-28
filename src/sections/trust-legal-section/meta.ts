// Waimia · Co-location DS (Wave #38, T5) · module `trust-legal-section` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Trust Sections',
    categorySlug: 'trust-sections',
    family: 'prose',
    intent: ['establish-credibility'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['line-art', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['trust', 'legal', 'toc', 'governance'],
    status: 'stable',
    description_fr: 'Masthead documentaire avec meta de révision et sommaire sticky pour pages confiance, gouvernance et légales.',
    description_en: 'Documentary masthead with revision metadata and sticky contents for trust, governance, and legal pages.',
  
};
