// Waimia · Co-location DS (Wave #38, T5) · module `feature-comparison-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['list', 'cards'],
    layoutFacets: ['3-col'],
    tags: ['feature', 'comparison', 'us-vs-them', 'grid', 'differentiation'],
    status: 'stable',
    description_fr: 'Différenciation légère « nous vs eux » en grille de cartes : 2 ou 3 colonnes, lignes cochées ou barrées, colonne mise en avant. Plus léger que la table comparative.',
    description_en: 'Lightweight "us vs them" differentiation as a card grid: 2 or 3 columns, check or cross rows, one highlighted column. Lighter than the comparison table.',
  
};
