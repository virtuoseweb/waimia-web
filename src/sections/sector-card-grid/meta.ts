// Waimia · Co-location DS (Wave #38, T5) · module `sector-card-grid` · meta (extrait).
// SectionMeta = descriptor SANS component/usage. Modele : resource-card-grid (grille de nav).

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Content Listing Sections',
  categorySlug: 'content-listing-sections',
  family: 'card-grid',
  intent: ['orient-navigate'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['buttons', 'cards'],
  layoutFacets: ['3-col'],
  tags: ['sectors', 'industries', 'hub', 'navigation', 'cards', 'grid'],
  status: 'stable',
  description_fr: 'Grille de hubs sectoriels en cartes cliquables : ICP en kicker, secteur, douleur en une phrase et CTA, en 3 colonnes sur fond hairline.',
  description_en: 'Grid of sector hubs as clickable cards: ICP kicker, sector, one-line pain point and CTA, in a 3-column hairline layout.',
};
