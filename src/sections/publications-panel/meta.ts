// Waimia · Co-location DS · module `publications-panel` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Editorial Sections',
  categorySlug: 'content-listing-sections',
  family: 'list',
  intent: ['establish-credibility'],
  pageRole: ['proof'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['list', 'quote'],
  layoutFacets: ['1-col'],
  tags: ['publications', 'resources', 'index', 'manifesto', 'author', 'eeat', 'byline'],
  status: 'stable',
  description_fr:
    'Panneau publications d’un profil : entete + callout manifeste + liste de publications + index de ressources recentes + lien « tout voir ».',
  description_en:
    'Profile publications panel: heading + manifesto callout + publications list + recent resources index + « see all » link.',
};
