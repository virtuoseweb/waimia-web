// Waimia · Co-location DS (Wave #38, T5) · module `masthead-bar` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Breadcrumb Sections',
    categorySlug: 'breadcrumb-sections',
    family: 'breadcrumb',
    intent: ['orient-navigate'],
    pageRole: ['utility'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: [],
    layoutFacets: ['1-col'],
    tags: ['masthead', 'breadcrumb', 'chrome', 'editorial'],
    status: 'stable',
    description_fr: "Bande de chrome haut : fil d'Ariane intégré au masthead éditorial (méta lieu, édition, statut), posée sous le header fixe et au-dessus du hero. Composant autonome, universel (home incluse). Variante paper et ink.",
    description_en: 'Top chrome band: breadcrumb integrated into the editorial masthead (location, edition, status meta), sitting under the fixed header and above the hero. Standalone, universal component (home included). Paper and ink variants.',
  
};
