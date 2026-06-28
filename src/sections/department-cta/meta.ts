// Waimia · Co-location DS (Wave #38, T5) · module `department-cta` · meta (extrait)
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
    tags: ['solutions', 'cta', 'conversion', 'dark', 'closing'],
    status: 'stable',
    description_fr: 'Clôture CTA sur fond ink : Dingbat, titre display italique, body et deux boutons (rendez-vous + lien secondaire).',
    description_en: 'Closing CTA on an ink background: a Dingbat, an italic display heading, body copy, and two buttons (booking + secondary link).',
  
};
