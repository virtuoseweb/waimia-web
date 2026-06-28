// Waimia · Co-location DS (Wave #38, T5) · module `timeline-block` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    family: 'timeline',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['list', 'timeline'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['timeline', 'events', 'history'],
    status: 'stable',
    description_fr: "Bloc chronologique pour raconter une progression, un historique ou une séquence d'événements.",
    description_en: 'Timeline block for telling a progression, history, or sequence of events.',
  
};
