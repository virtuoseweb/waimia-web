// Waimia · Co-location DS (Wave #38) · module `testimonial-wall` · meta.
// SectionMeta = descriptor SANS component/usage. Valeurs d'enum reprises de section-facets.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Testimonial Sections',
  categorySlug: 'testimonial-sections',
  family: 'card-grid',
  intent: ['social-proof', 'establish-credibility'],
  pageRole: ['proof'],
  contentMode: 'instance',
  effects: ['scroll-reveal', 'hover-zoom'],
  interactions: ['hover'],
  elements: ['quote', 'avatar', 'cards', 'kpi-numbers'],
  layoutFacets: ['bento', 'multi-col'],
  tags: ['testimonials', 'wall', 'social-proof', 'masonry'],
  status: 'stable',
  description_fr: "Mur d'avis masonry : citations clients surlignées, note moyenne et profils LinkedIn pour une preuve sociale dense.",
  description_en: 'Masonry wall of reviews: highlighted client quotes, average rating and LinkedIn profiles for dense social proof.',
};
