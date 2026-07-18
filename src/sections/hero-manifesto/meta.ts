// Waimia · Co-location DS · module `hero-manifesto` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Hero Header Sections',
  categorySlug: 'hero-header-sections',
  family: 'hero',
  intent: ['state-value-prop', 'tell-story'],
  pageRole: ['hero', 'opener'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['scroll'],
  elements: ['buttons', 'badge'],
  layoutFacets: ['3-col'],
  tags: ['hero', 'manifesto', 'editorial', 'canvas', 'react-island', 'dark', 'full-viewport'],
  status: 'stable',
  description_fr: 'Hero editorial de page de marque : fond canvas liquide + 3 zones (meta band, titre display italique + sous-titre, intro + CTA + rangee de pied), plein viewport sombre.',
  description_en: 'Editorial brand hero: liquid-canvas background + 3 zones (meta band, italic display headline + subhead, intro + CTA + foot row), full-viewport dark.',
};
