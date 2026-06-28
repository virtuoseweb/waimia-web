// Waimia · Co-location DS (Wave #38, T5) · module `feature-tabs` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'tabs',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['hover', 'click-toggle', 'drag-scroll'],
    elements: ['buttons', 'icons', 'badge', 'tabs'],
    layoutFacets: ['2-col', 'media-right', 'centered', 'split'],
    tags: ['feature', 'tabs', 'interactive', 'tabbed'],
    status: 'stable',
    description_fr: 'Section fonctionnalites en onglets cliquables : barre de tabs aria-compliant + panneau texte/visuel. Interactif vanilla JS, 0 dependance.',
    description_en: 'Feature section with clickable tabs: aria-compliant tab bar + text/visual panel. Interactive vanilla JS, zero dependencies.',
  
};
