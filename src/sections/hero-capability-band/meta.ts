// Waimia · Co-location DS (Wave #38, T5) · module `hero-capability-band` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['buttons', 'list', 'kpi-numbers'],
    layoutFacets: ['multi-col'],
    tags: ['hero', 'capabilities', 'band', 'kpi'],
    status: 'stable',
    description_fr: "Héro plein écran : titre serif accent et lede alignés à gauche (~70 % de large), puis une bande de capacités asymétrique pleine largeur de 5 cellules dont la 3e (large, accent) porte un KPI serif, les 4 autres des capacités mono. Variante paper et ink, responsive.",
    description_en: 'Full-viewport hero: left-aligned accented serif title and lede (~70% wide), then a full-width asymmetric capability band of 5 cells whose 3rd (wide, accent) carries a serif KPI and the other 4 mono capabilities. Paper and ink variants, responsive.',
  
};
