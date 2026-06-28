// Waimia · Co-location DS (Wave #38, T5) · module `feature-zigzag` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'split-media',
    intent: ['show-features', 'explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'image', 'list'],
    layoutFacets: ['2-col', 'media-left', 'media-right', 'split'],
    tags: ['feature', 'zigzag', 'alternating', 'rows'],
    status: 'stable',
    description_fr: "Lignes alternées visuel/texte (gauche-droite, droite-gauche) pour presenter les fonctionnalites cles d'une offre avec un rythme editorial fort.",
    description_en: 'Alternating visual/text rows (left-right, right-left) to present key features with strong editorial rhythm.',
  
};
