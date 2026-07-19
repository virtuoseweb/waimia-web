// Waimia · Co-location DS · module `offer-rail` · meta. SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Feature Sections',
  categorySlug: 'feature-sections',
  family: 'tabs',
  intent: ['show-features', 'state-value-prop'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover', 'click-toggle', 'scroll'],
  elements: ['tabs', 'cards', 'buttons', 'list'],
  layoutFacets: ['2-col', 'multi-col'],
  tags: ['offers', 'tabs', 'pricing-adjacent', 'rail', 'services', 'interactive'],
  status: 'stable',
  description_fr: 'Offres en onglets (familles) : diptyque ou trio de cartes relie a une rangee de services par une dorsale line-art dessinee au scroll. Une branche peut etre teintee (token --complementary). Vanilla JS aria, 0 dependance.',
  description_en: 'Tabbed offers (families): a diptych or trio of cards linked to a services row by a scroll-drawn line-art spine. One branch can be tinted (--complementary token). Vanilla JS aria, zero dependencies.',
};
