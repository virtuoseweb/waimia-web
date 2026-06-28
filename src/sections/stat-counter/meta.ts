// Waimia · Co-location DS (Wave #38, T5) · module `stat-counter` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    family: 'stat-grid',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['count-up', 'scroll-reveal'],
    interactions: ['scroll'],
    elements: ['list'],
    layoutFacets: ['3-col'],
    tags: ['stats', 'counter', 'count-up', 'animated', 'kpi'],
    status: 'stable',
    description_fr: 'Compteur animé count-up déclenché à l’entrée dans le viewport (île React client:visible), grille de 2 à 4 stats. Respecte prefers-reduced-motion et reste lisible sans JS.',
    description_en: 'Animated count-up counter triggered on viewport entry (React island client:visible), grid of 2 to 4 stats. Respects prefers-reduced-motion and stays readable without JS.',
  
};
