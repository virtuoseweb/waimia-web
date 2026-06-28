// Waimia · Co-location DS (Wave #38, T5) · module `editorial-callout` · meta (extrait)
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
    elements: ['quote'],
    layoutFacets: ['1-col'],
    tags: ['editorial', 'callout', 'quote', 'note', 'aside', 'content'],
    status: 'stable',
    description_fr: 'Encadré éditorial composant l\'atome Callout (info, citation, note, avertissement, manifeste) : hairline accent, citation source optionnelle, tailles et alignements. Pour ponctuer une prose.',
    description_en: 'Editorial aside composing the Callout atom (info, quote, note, warning, manifesto): accent hairline, optional cited source, sizes and alignments. To punctuate prose.',
  
};
