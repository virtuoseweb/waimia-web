// Waimia · Co-location DS (Wave #38, T5) · module `hero-split-media` · meta (extrait)
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
    interactions: ['hover'],
    elements: ['image', 'line-art', 'buttons', 'list', 'kpi-numbers', 'icons', 'badge'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'split', 'media', 'cta'],
    status: 'stable',
    description_fr: 'Héro plein écran en deux colonnes : texte (kicker, titre serif, lede, badges pills, 2 CTA) à gauche, carte média line-art à droite. Variante paper et ink, responsive (1 colonne sur mobile).',
    description_en: 'Full-viewport two-column hero: text (kicker, serif title, lede, badge pills, 2 CTAs) on the left, line-art media card on the right. Paper and ink variants, responsive (single column on mobile).',
  
};
