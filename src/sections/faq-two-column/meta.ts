// Waimia · Co-location DS (Wave #38, T5) · module `faq-two-column` · meta (extrait)
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
    layoutFacets: ['2-col'],
    tags: ['faq', 'two-column', 'static', 'questions', 'scan'],
    status: 'stable',
    description_fr: 'FAQ en deux colonnes statiques (question en gras, réponse en dessous), sans accordéon. Pensée pour le scan rapide quand toutes les réponses doivent être visibles d’emblée.',
    description_en: 'FAQ in two static columns (bold question, answer beneath), with no accordion. Built for fast scanning when every answer should be visible upfront.',
  
};
