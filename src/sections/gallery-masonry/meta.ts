// Waimia · Co-location DS (Wave #38, T5) · module `gallery-masonry` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Gallery Sections',
    categorySlug: 'gallery-sections',
    family: 'gallery',
    intent: ['showcase-work'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['hover-zoom', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['image'],
    layoutFacets: ['1-col'],
    tags: ['gallery', 'masonry', 'images', 'editorial'],
    status: 'stable',
    description_fr: 'Galerie editoriale en colonnes CSS (masonry naturel) avec legende au hover par overlay. Hauteurs variees, responsive 3 colonnes -> 2 -> 1.',
    description_en: 'Editorial gallery in CSS columns (natural masonry) with hover overlay caption. Varied heights, responsive 3 cols -> 2 -> 1.',
  
};
