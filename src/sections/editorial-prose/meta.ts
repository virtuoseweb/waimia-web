// Waimia · Co-location DS (Wave #38, T5) · module `editorial-prose` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Content Sections',
    categorySlug: 'content-sections',
    family: 'prose',
    intent: ['explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: [],
    layoutFacets: ['1-col'],
    tags: ['prose', 'editorial', 'content', 'mdx', 'long-form', 'geo'],
    status: 'stable',
    description_fr: 'Wrapper de prose éditoriale tokenisé : colonne de lecture (largeur prose ou wide), fond alterné, héberge un contenu long via slot (corps MDX). Préserve la typographie du DS sans réécrire le texte.',
    description_en: 'Tokenized editorial prose wrapper: a reading column (prose or wide width), alternating background, hosting long-form content via slot (MDX body). Preserves the DS typography without rewriting the text.',
  
};
