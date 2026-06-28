// Waimia · Co-location DS (Wave #38, T5) · module `hero-asymmetric-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

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
    layoutFacets: ['4-col'],
    tags: ['hero', 'asymmetric', 'grid', 'editorial', 'kpi'],
    status: 'stable',
    description_fr: "Héro plein écran en grille multi-lignes asymétrique : titre serif pleine largeur, rangée 2 colonnes (label + lede + 2 CTA à gauche, label + puces fléchées à droite), puis bande de 4 KPI dont la dernière cellule est inversée en ink. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric multi-row hero: full-width serif title, a 2-column row (label + lede + 2 CTAs on the left, label + arrow bullets on the right), then a 4-KPI band whose last cell is inverted in ink. Paper and ink variants, responsive.',
  
};
