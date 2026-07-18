// Waimia · Co-location DS · module `signed-writing-list` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Editorial Sections',
  categorySlug: 'content-listing-sections',
  family: 'list',
  intent: ['establish-credibility'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['list'],
  layoutFacets: ['1-col'],
  tags: ['articles', 'essays', 'list', 'long-form', 'index', 'author', 'byline'],
  status: 'stable',
  description_fr:
    'Index chronologique d’ecrits long-form signes : date + titre (lien) + extrait. Date formatee par langue.',
  description_en:
    'Chronological index of signed long-form writing: date + title (link) + excerpt. Date formatted per language.',
};
