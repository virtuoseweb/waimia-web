// Waimia · Co-location DS (Wave #38, T5) · module `media-block` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['multiple-images', 'video'],
    layoutFacets: ['1-col'],
    tags: ['media', 'image', 'video', 'embed'],
    status: 'stable',
    description_fr: 'Bloc média pour intégrer une image, une vidéo ou un contenu embarqué dans une page marketing.',
    description_en: 'Media block for embedding an image, video, or external content in a marketing page.',
  
};
