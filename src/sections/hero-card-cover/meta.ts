// Waimia · Co-location DS (Wave #38, T5) · module `hero-card-cover` · meta (extrait)
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
    elements: ['image', 'line-art', 'buttons', 'list', 'kpi-numbers', 'badge', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'card', 'cover', 'media', 'kpi', 'ink'],
    status: 'stable',
    description_fr: 'Héro plein écran en deux colonnes : discours éditorial (kicker, titre serif, lede, badges pills, 2 CTA) à gauche, carte ink sombre (média line-art + mini-KPI) à droite. La carte reste sombre en mode paper. Variante paper et ink, responsive (1 colonne sur mobile).',
    description_en: 'Full-viewport two-column hero: editorial discourse (kicker, serif title, lede, badge pills, 2 CTAs) on the left, dark ink card (line-art media + mini KPIs) on the right. The card stays dark in paper mode. Paper and ink variants, responsive (single column on mobile).',
  
};
