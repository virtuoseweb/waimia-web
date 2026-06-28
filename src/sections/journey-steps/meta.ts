// Waimia · Co-location DS (Wave #38, T5) · module `journey-steps` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Process Sections',
    categorySlug: 'process-sections',
    family: 'process-steps',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'list', 'icons', 'badge', 'cards'],
    layoutFacets: ['centered'],
    tags: ['journey', 'steps', 'process', 'funnel', 'parcours', 'onboarding'],
    status: 'stable',
    description_fr: 'Parcours en 3 temps : icône cercle avec badge numéro, titre, description et pill highlight par étape, connecteur accent entre étapes. Horizontal desktop, vertical mobile. Idéal funnel ou onboarding.',
    description_en: 'A three-step journey: circle icon with number badge, title, description and a highlight pill per step, accent connector between steps. Horizontal on desktop, vertical on mobile. Ideal for a funnel or onboarding.',
  
};
