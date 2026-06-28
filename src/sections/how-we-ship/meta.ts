// Waimia · Co-location DS (Wave #38, T5) · module `how-we-ship` · meta (extrait)
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
    effects: ['sticky-stack'],
    interactions: ['scroll'],
    elements: ['line-art'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['process', 'timeline', 'sticky', 'scrub', 'pin', 'steps'],
    status: 'stable',
    description_fr: 'Section "comment on livre", sticky pin scrub : N étapes avec numline et stage cards animées au scroll (graceful degradation mobile).',
    description_en: 'How-we-ship section, sticky pin scrub: N steps with numline and scroll-driven stage cards (graceful mobile degradation).',
  
};
