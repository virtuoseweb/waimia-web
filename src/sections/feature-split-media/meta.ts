// Waimia · Co-location DS (Wave #38, T5) · module `feature-split-media` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'split-media',
    intent: ['show-features', 'explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['image', 'buttons', 'list'],
    layoutFacets: ['2-col', 'media-left', 'media-right', 'split'],
    tags: ['feature', 'split', 'media', 'mockup', 'reversed'],
    status: 'stable',
    description_fr: 'Une feature majeure exposée en deux colonnes : texte et points clés d’un côté, mockup ou capture de l’autre. Le champ reversed permet d’alterner les côtés au fil de la page.',
    description_en: 'One major feature laid out in two columns: copy and key points on one side, mockup or screenshot on the other. The reversed field alternates sides down the page.',
  
};
