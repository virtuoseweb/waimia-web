// Waimia · Co-location DS (Wave #38, T5) · module `stats-bento` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    family: 'bento',
    intent: ['social-proof', 'establish-credibility'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['kpi-numbers', 'cards'],
    layoutFacets: ['bento'],
    tags: ['stats', 'bento', 'kpi', 'metrics'],
    status: 'stable',
    description_fr: 'Quatre KPI en grille bento de tailles inegales : une grande cellule avec chiffre geant et trois cellules secondaires, plus un bandeau bas pleine largeur.',
    description_en: 'Four KPIs in an uneven bento grid: one large hero cell with a giant number and three smaller cells, plus a full-width bottom banner.',
  
};
