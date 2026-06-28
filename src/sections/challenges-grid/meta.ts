// Waimia · Co-location DS (Wave #38, T5) · module `challenges-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['line-art', 'icons', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['challenges', 'problems', 'painpoint', 'grid', 'frictions', 'numbered'],
    status: 'stable',
    description_fr: 'Grille 2x2 de défis ou pain-points : numéro en coin, icône, titre et texte par carte, border-left accent et élévation au survol. Pose le problème avant la solution sur une landing.',
    description_en: 'A 2x2 grid of challenges or pain-points: corner number, icon, title and copy per card, accent border-left and hover elevation. Frames the problem before the solution on a landing page.',
  
};
