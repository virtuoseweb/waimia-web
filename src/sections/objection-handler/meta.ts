// Waimia · Co-location DS (Wave #38, T5) · module `objection-handler` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    family: 'accordion',
    intent: ['answer-objections'],
    pageRole: ['closer'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['objections', 'faq', 'reassurance'],
    status: 'stable',
    description_fr: 'Bloc de traitement des objections pour lever les freins et rassurer avant conversion.',
    description_en: 'Objection-handling block for reducing friction and reassuring users before conversion.',
  
};
