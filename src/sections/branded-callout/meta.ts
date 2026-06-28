// Waimia · Co-location DS (Wave #38, T5) · module `branded-callout` · meta (extrait)
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
    interactions: ['scroll'],
    elements: ['buttons'],
    layoutFacets: ['1-col'],
    tags: ['callout', 'brand', 'os', 'paper-2'],
    status: 'stable',
    description_fr: 'Callout de marque fond paper-2 avec kicker §, titre display italique et corps de deux paragraphes, CTA optionnel.',
    description_en: 'Brand callout on paper-2 background with § kicker, italic display headline, two-paragraph body, and optional CTA.',
  
};
