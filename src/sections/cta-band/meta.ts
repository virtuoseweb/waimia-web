// Waimia · Co-location DS (Wave #38, T5) · module `cta-band` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['buttons'],
    layoutFacets: ['full-bleed'],
    tags: ['cta', 'band', 'inline'],
    status: 'stable',
    description_fr: 'Bandeau CTA horizontal pour relancer une action au milieu ou en fin de parcours.',
    description_en: 'Horizontal CTA band for prompting action mid-page or near the end of the journey.',
  
};
