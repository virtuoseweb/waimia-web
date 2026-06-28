// Waimia · Co-location DS (Wave #38, T5) · module `tech-capabilities-specs` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'table',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll', 'scroll-reveal'],
    interactions: ['hover', 'scroll', 'drag-scroll'],
    elements: ['table'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['technologies', 'capabilities', 'specs', 'table', 'editorial'],
    status: 'stable',
    description_fr: 'Inventaire technique en table spec (capacité, description, statut) avec en-tête kicker et aside.',
    description_en: 'Technical inventory as a spec table (capability, description, status) with a kicker header and aside.',
  
};
