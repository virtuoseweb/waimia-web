// Waimia · Co-location DS (Wave #38, T5) · module `hero-thin-media` · meta (extrait)
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
    elements: ['image', 'line-art', 'buttons', 'list', 'badge'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'media', 'thin', 'asymmetric'],
    status: 'stable',
    description_fr: "Héro plein écran très asymétrique (~72/28) : colonne dominante (kicker, titre serif accent, lede, badges pills mono, 2 CTA), rail droit avec une bande média line-art verticale mince (currentColor, lisible paper et ink). Variante paper et ink, responsive.",
    description_en: 'Full-viewport very asymmetric hero (~72/28): dominant column (kicker, accented serif title, lede, mono badge pills, 2 CTAs), right rail with a thin vertical line-art media strip (currentColor, readable on paper and ink). Paper and ink variants, responsive.',
  
};
