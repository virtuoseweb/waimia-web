// Waimia · Co-location DS (Wave #38, T5) · module `hero-conversion-funnel` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

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
    tags: ['hero', 'conversion', 'funnel', 'flagship', 'stats', 'benefits'],
    status: 'stable',
    description_fr: 'Hero magnétique flagship : kicker num + h1 monumental, lede, meta pills, benefits checklist, ligne preuve mono, double CTA et grille stats 4-col.',
    description_en: 'Flagship magnetic hero: num kicker + monumental h1, lede, meta pills, benefits checklist, mono proof line, dual CTA and 4-col stats grid.',
  
};
