// Waimia · Co-location DS (Wave #38, T5) · module `case-spotlight` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'case-spotlight',
    variant: 'media-left',
    kicker_fr: 'Un cas concret',
    kicker_en: 'A concrete case',
    title_fr: 'Un groupe de distribution divise sa <i>clôture</i> mensuelle par trois',
    title_en: 'A retail group <i>cuts</i> its monthly close by three',
    media_src: '/images/cases/finance-close.svg',
    media_alt: 'Tableau de bord de clôture comptable augmentée par agents Waimia',
    media_caption: 'Clôture J+3 · réconciliation automatisée',
    quote_fr: 'En deux semaines, un agent comptable utilisé quotidiennement a divisé notre clôture par trois.',
    quote_en: 'In two weeks, a daily-used accounting agent cut our monthly close by three.',
    attribution_fr: 'Directrice financière · Groupe distribution',
    attribution_en: 'CFO · Retail group',
    metrics: [
      { k: '−72%', label_fr: 'temps de clôture mensuelle', label_en: 'monthly close time' },
      { k: '92%', label_fr: 'précision des écritures auto', label_en: 'auto-entry accuracy' },
      { k: '2 sem.', label_fr: 'jusqu’à la mise en production', label_en: 'to production' },
    ],
    tags: [
      { fr: 'Finance', en: 'Finance' },
      { fr: 'Comptabilité', en: 'Accounting' },
      { fr: 'Agent souverain', en: 'Sovereign agent' },
    ],
    cta_href: '/cas-clients',
    cta_label_fr: 'Lire le cas complet',
    cta_label_en: 'Read the full case',
  };
