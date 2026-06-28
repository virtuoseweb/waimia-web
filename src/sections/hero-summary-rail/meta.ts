// Waimia · Co-location DS (Wave #38, T5) · module `hero-summary-rail` · meta (extrait)
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
    elements: ['line-art', 'buttons', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'summary', 'magazine', 'asymmetric'],
    status: 'stable',
    description_fr: "Héro plein écran asymétrique (~70/30) façon revue : colonne principale (kicker, titre serif accent, lede, 2 CTA, sous-CTA), rail droit avec un sommaire typographique de 3 entrées (label mono accent + titre serif court + sous-ligne). Zéro média. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric magazine-style hero (~70/30): main column (kicker, accented serif title, lede, 2 CTAs, sub-CTA), right rail with a typographic table of contents of 3 entries (mono accent label + short serif title + subline). No visual. Paper and ink variants, responsive.',
  
};
