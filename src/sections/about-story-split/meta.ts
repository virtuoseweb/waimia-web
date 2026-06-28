// Waimia · Co-location DS (Wave #38, T5) · module `about-story-split` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'About Sections',
    categorySlug: 'about-sections',
    family: 'split-media',
    intent: ['establish-credibility', 'tell-story'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'list', 'timeline'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['about', 'story', 'mission', 'timeline', 'split'],
    status: 'stable',
    description_fr: 'Récit fondateur en deux colonnes : texte narratif de mission à gauche, timeline de jalons datés à droite. Raconte l’histoire de la marque sans verbiage.',
    description_en: 'Founder narrative in two columns: a mission story on the left, a dated milestone timeline on the right. Tells the brand story without filler.',
  
};
