// Waimia · Co-location DS (Wave #38, T5) · module `pain-severity-list` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'prose',
    intent: ['explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['list', 'badge'],
    layoutFacets: ['1-col'],
    tags: ['pain-points', 'severity', 'problems', 'ink', 'editorial'],
    status: 'stable',
    description_fr: 'Liste éditoriale de pain-points sur fond ink, classés par sévérité : chaque item porte un label severity vertical (mono) et un glyphe (◆▲●○), un titre serif, une description, et une ligne mono « → correctif ». Séparateurs hairline, reveal-stagger.',
    description_en: 'Editorial list of pain-points on an ink background, ordered by severity: each item carries a vertical severity label (mono) and a glyph (◆▲●○), a serif title, a description, and a mono « → fix » line. Hairline separators, reveal-stagger.',
  
};
