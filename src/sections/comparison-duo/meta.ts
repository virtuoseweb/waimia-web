// Waimia · Co-location DS (Wave #38, T5) · module `comparison-duo` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'duo',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['list', 'icons'],
    layoutFacets: ['2-col', 'split'],
    tags: ['comparison', 'duo', 'before-after', 'versus'],
    status: 'stable',
    description_fr: 'Deux cartes cote a cote (Sans / Avec) pour mettre en evidence le contraste avant/apres ou nous-vs-eux, avec items a puces et glyphes differencies.',
    description_en: 'Two side-by-side cards (Without / With) to highlight a before/after or us-vs-them contrast, with bulleted items and differentiated glyphs.',
  
};
