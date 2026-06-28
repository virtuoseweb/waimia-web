// Waimia · Co-location DS (Wave #38, T5) · module `hero-scope-minimap` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'buttons', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'minimap', 'scope', 'asymmetric'],
    status: 'stable',
    description_fr: "Héro plein écran asymétrique (~60/40) : colonne dominante (kicker, titre serif accent, lede, 2 CTA, sous-CTA), rail droit avec une mini-map de 6 capacités en 2 colonnes (label mono accent + items), hairlines. Montre le périmètre, pas un média. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric hero (~60/40): dominant column (kicker, accented serif title, lede, 2 CTAs, sub-CTA), right rail with a 6-capability mini-map in 2 columns (mono accent label + items), hairlines. Shows scope, not a visual. Paper and ink variants, responsive.',
  
};
