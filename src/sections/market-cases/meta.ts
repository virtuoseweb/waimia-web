// Waimia · module `market-cases` · meta.
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Content Sections',
  categorySlug: 'content-sections',
  family: 'list',
  intent: ['explain-concept'],
  pageRole: ['body'],
  contentMode: 'global-ref',
  contentSource: 'src/data/market-cases.ts',
  effects: ['static'],
  interactions: ['none'],
  elements: ['list', 'quote', 'badge'],
  layoutFacets: ['2-col'],
  tags: ['market', 'third-party', 'sources', 'case-study', 'eeat', 'citation'],
  status: 'stable',
  description_fr: 'Rubrique « Études de cas du marché » : cas réels documentés et réalisés par des tiers. Chaque fiche porte le libellé « Cas documenté, non réalisé par Waimia », la citation exacte du résultat, ses limites, le lien vers la source et la date de lecture. Registre froid (filet complémentaire, pointillés) distinct des preuves Waimia. Contenu global lu dans src/data/market-cases.ts.',
  description_en: 'Market case studies: real, documented cases delivered by third parties. Each entry carries the label "Documented case, not delivered by Waimia", the exact quoted result, its limits, the source link and the date it was read. Cold register (complementary rule, dashed lines) distinct from Waimia proof. Global content read from src/data/market-cases.ts.',
};
