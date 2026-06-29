// Waimia · Co-location DS (Wave #38, T5) · module `related-links` · meta.
// SectionMeta = descriptor SANS component/usage. Rule 60 : taxonomie, pas de rendu.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Index Sections',
  categorySlug: 'index-sections',
  family: 'list',
  intent: ['orient-navigate'],
  pageRole: ['body', 'closer'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['list'],
  layoutFacets: ['multi-col'],
  tags: ['maillage', 'liens internes', 'navigation', 'seo', 'explorer', 'compact'],
  status: 'stable',
  description_fr:
    'Bloc compact de maillage interne : groupes de liens internes contextuels en colonnes, avec petit label de groupe et description optionnelle. Renforce le SEO et oriente la navigation en fin de page.',
  description_en:
    'Compact internal-linking block: contextual internal links grouped in columns, with a small group label and an optional description. Strengthens SEO and guides navigation at the end of a page.',
};
