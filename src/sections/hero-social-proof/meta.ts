// Waimia · Co-location DS (Wave #38, T3) · module `hero-social-proof` · métadonnées descriptives.
// DÉPLACÉES depuis src/lib/section-registry.ts (rule 60 : déplacer, pas dupliquer).
// `SectionMeta` = `SectionDescriptor` SANS `component` (porté par Component.astro) ni `usage`.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Hero Header Sections',
  categorySlug: 'hero-header-sections',
  family: 'hero',
  intent: ['state-value-prop'],
  pageRole: ['hero'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['scroll'],
  elements: ['buttons', 'kpi-numbers'],
  layoutFacets: ['centered'],
  tags: ['hero', 'social-proof', 'stats', 'rating', 'trust', 'above-fold'],
  status: 'stable',
  description_fr: 'Hero centré avec preuve sociale above-the-fold : titre, CTA, note clients optionnelle et bande de chiffres clés (StatRow) sous le pli haut.',
  description_en: 'Centered hero with above-the-fold social proof: heading, CTA, optional customer rating and a key-figures band (StatRow) under the fold.',
};
