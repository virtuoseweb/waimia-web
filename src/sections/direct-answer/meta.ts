// Waimia · Co-location DS (Wave #38, T5) · module `direct-answer` · meta (extrait)
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
    elements: ['badge'],
    layoutFacets: ['1-col'],
    tags: ['geo', 'definition', 'direct-answer', 'answer', 'content'],
    status: 'stable',
    description_fr: 'Bloc GEO « réponse directe » en tête de page : reformule une question implicite, définit éventuellement une entité, puis délivre une réponse directe de 2 à 4 phrases en colonne de lecture. Sobre, éditorial, fond alterné.',
    description_en: 'GEO direct-answer block at the top of a page: restates an implicit question, optionally defines an entity, then delivers a 2 to 4 sentence direct answer in a reading column. Sober, editorial, alternating background.',
  
};
