// Waimia · Co-location DS · module `numbered-layer-list` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Editorial Sections',
  categorySlug: 'content-sections',
  family: 'list',
  intent: ['show-features', 'explain-concept'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['scroll'],
  elements: ['list', 'badge'],
  layoutFacets: ['1-col'],
  tags: ['layers', 'numbered', 'stack', 'list', 'ranked', 'editorial', 'deliverables'],
  status: 'stable',
  description_fr:
    'Liste de couches numerotees : rang serif accent + titre + intro + sous-puces « → ». Ideale pour presenter une stack, des livrables ou des rangs par couche.',
  description_en:
    'Numbered layer list: serif accent rank + title + intro + « → » sub-bullets. Ideal to present a stack, deliverables or ranked layers.',
};
