// Waimia · Co-location DS (Wave #38, T5) · module `pricing-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    family: 'table',
    intent: ['present-pricing'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['buttons', 'list'],
    layoutFacets: ['3-col'],
    tags: ['pricing', 'tiers', 'plans'],
    status: 'stable',
    description_fr: 'Table de prix pour présenter clairement les formules, paliers et options commerciales.',
    description_en: 'Pricing table for clearly presenting plans, tiers, and commercial options.',
  
};
