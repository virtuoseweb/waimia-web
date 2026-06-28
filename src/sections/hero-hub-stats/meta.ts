// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-stats` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['multiple-images', 'line-art', 'buttons', 'list', 'kpi-numbers', 'badge'],
    layoutFacets: ['4-col', 'centered', 'split'],
    tags: ['hero', 'hub', 'stats', 'pillar', 'masthead'],
    status: 'stable',
    description_fr: 'Hero hub avec stats : meta kicker double + numéro § accent + h1 maximal, lede, grille KeyMetric 4-col en pied avec accent.',
    description_en: 'Hub hero with stats: dual meta kicker + accent § number + maximal h1, lede, 4-col KeyMetric grid at the foot with accent.',
  
};
