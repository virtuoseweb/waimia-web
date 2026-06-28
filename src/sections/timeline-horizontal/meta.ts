// Waimia · Co-location DS (Wave #38, T5) · module `timeline-horizontal` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    family: 'timeline',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['drag-scroll'],
    elements: ['line-art', 'list', 'icons', 'timeline'],
    layoutFacets: ['1-col'],
    tags: ['timeline', 'horizontal', 'roadmap', 'dated', 'scroll', 'milestones'],
    status: 'stable',
    description_fr: 'Frise chronologique horizontale datée (roadmap) : événements à statut (done/active/upcoming), date, label et body, scroll-snap horizontal, empilement vertical sur mobile.',
    description_en: 'Dated horizontal timeline (roadmap): status events (done/active/upcoming), date, label and body, horizontal scroll-snap, vertical stacking on mobile.',
  
};
