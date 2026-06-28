// Waimia · Co-location DS (Wave #38, T5) · module `tech-when-dual` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'duo',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['technologies', 'decision', 'when', 'dual', 'pros-cons'],
    status: 'stable',
    description_fr: 'Aide décision en deux colonnes (utiliser quand / considérer autre chose quand) avec puces mono plus et moins.',
    description_en: 'Two-column decision aid (use when / consider otherwise when) with plus and minus mono bullets.',
  
};
