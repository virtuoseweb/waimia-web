// Waimia · Co-location DS (Wave #38, T5) · module `scroll-gallery` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'scroll-interactive',
    intent: ['showcase-work', 'show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['sticky-media', 'crossfade', 'scroll-reveal'],
    interactions: ['scroll'],
    elements: ['multiple-images', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['scroll', 'sticky', 'gallery', 'interactive', 'feature'],
    status: 'stable',
    description_fr: "Liste sticky a gauche, cadre media a droite dont l'image change en fondu au scroll. Ideal pour presenter des domaines d'expertise avec un visuel par item.",
    description_en: 'Sticky list on the left, media frame on the right whose image crossfades on scroll. Ideal to present expertise areas with one visual per item.',
  
};
