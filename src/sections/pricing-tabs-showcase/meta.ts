import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Pricing Sections',
  categorySlug: 'pricing-sections',
  family: 'tabs',
  intent: ['present-pricing', 'compare-options'],
  pageRole: ['conversion'],
  contentMode: 'instance',
  effects: ['reveal'],
  interactions: ['tabs', 'hover'],
  elements: ['tabs', 'cards', 'media', 'list', 'buttons'],
  layoutFacets: ['3-col', 'centered-header'],
  tags: ['pricing', 'tabs', 'plans', 'offers', 'conversion'],
  status: 'stable',
  description_fr: 'Showcase de formules avec onglets, cartes illustrées, listes de livrables et bande sur mesure.',
  description_en: 'Plan showcase with tabs, illustrated cards, deliverable lists and custom-plan callout.',
};
