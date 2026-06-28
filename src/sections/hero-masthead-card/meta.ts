// Waimia · Co-location DS (Wave #38, T5) · module `hero-masthead-card` · meta (extrait)
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
    elements: ['line-art', 'image', 'buttons', 'badge', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'masthead', 'media', 'kpi'],
    status: 'stable',
    description_fr: "Héro plein écran asymétrique (~64/36) : colonne principale (kicker, titre serif accent, lede, badges pills mono, 2 CTA, sous-CTA), rail droit avec une carte média line-art ink réduite + 2 micro-KPI mono. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric hero (~64/36): main column (kicker, accented serif title, lede, mono badge pills, 2 CTAs, sub-CTA), right rail with a reduced ink line-art media card + 2 mono micro-KPIs. Paper and ink variants, responsive.',
  
};
