// Waimia · module `engagement-ledger` · meta.
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Pricing Sections',
  categorySlug: 'pricing-sections',
  family: 'table',
  intent: ['present-pricing', 'explain-process'],
  pageRole: ['conversion'],
  contentMode: 'instance',
  effects: ['static'],
  interactions: ['none'],
  elements: ['table', 'list', 'buttons'],
  layoutFacets: ['multi-col'],
  tags: ['pricing', 'ledger', 'engagement', 'steps', 'rate-card'],
  status: 'stable',
  description_fr: 'Registre tarifaire : un parcours d’engagement lu ligne à ligne (repère d’étape, prestation, contenu, durée, prix aligné à droite, action). Ni cartes ni onglets : tout le parcours visible d’un regard, avec un bloc de lignes secondaires en retrait.',
  description_en: 'Pricing ledger: an engagement path read row by row (step marker, service, contents, duration, right-aligned price, action). No cards, no tabs: the whole path visible at a glance, with a block of secondary lines set back.',
};
