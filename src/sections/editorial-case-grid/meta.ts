// Waimia · Co-location DS · module `editorial-case-grid` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Testimonial Sections',
  categorySlug: 'testimonial-sections',
  family: 'card-grid',
  intent: ['establish-credibility', 'tell-story'],
  pageRole: ['proof'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['cards'],
  layoutFacets: ['2-col'],
  tags: ['case-study', 'editorial', 'cards', 'stagger', 'proof', 'manifesto'],
  status: 'stable',
  description_fr: 'Grille editoriale de cas clients : en-tete numerote + titre + intro, puis cartes EditorialCaseCard en 2 colonnes avec decalage vertical alterne (signature /manifesto Acte IV).',
  description_en: 'Editorial case-study grid: numbered header + title + intro, then EditorialCaseCard cards in 2 columns with alternating vertical offset (the /manifesto Act IV signature).',
};
