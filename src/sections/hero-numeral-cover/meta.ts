// Waimia · Co-location DS (Wave #38, T5) · module `hero-numeral-cover` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['buttons', 'kpi-numbers'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'numeral', 'cover', 'asymmetric'],
    status: 'stable',
    description_fr: "Héro plein écran asymétrique (~60/40) : colonne principale (kicker, titre serif accent, lede, 2 CTA, sous-CTA), rail droit avec un grand numéral serif éditorial (caption + sous-stat mono) encadré de hairlines. Stat de couverture, pas un média. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric hero (~60/40): main column (kicker, accented serif title, lede, 2 CTAs, sub-CTA), right rail with a large editorial serif numeral (caption + mono sub-stat) framed by hairlines. A cover stat, not a visual. Paper and ink variants, responsive.',
  
};
