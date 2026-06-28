// Waimia · Co-location DS (Wave #38, T5) · module `hero-editorial-masthead` · meta (extrait)
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
    interactions: ['hover'],
    elements: ['line-art', 'buttons', 'list', 'kpi-numbers'],
    layoutFacets: ['4-col'],
    tags: ['hero', 'masthead', 'editorial', 'kpi', 'breadcrumb'],
    status: 'stable',
    description_fr: "Héro plein écran éditorial : bande masthead mono 4 colonnes (fil d'Ariane + méta) sous le titre serif, puis rangée 2 colonnes (lede + 2 CTA à gauche, 4 KPI en micro-grille 2×2 à droite). Pas de média. Variante paper et ink, responsive.",
    description_en: 'Full-viewport editorial hero: a 4-column monospace masthead band (breadcrumb + meta) under the serif title, then a 2-column row (lede + 2 CTAs on the left, 4 KPIs in a 2×2 micro-grid on the right). No media. Paper and ink variants, responsive.',
  
};
