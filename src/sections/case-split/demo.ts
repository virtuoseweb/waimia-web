// Waimia · Co-location DS (Wave #38, T5) · module `case-split` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'case-split',
    kicker_fr: 'Cas client',
    kicker_en: 'Client case',
    title_fr: 'Une <i>ETI industrielle</i> a fermé ses comptes en 3 jours.',
    title_en: 'A <i>mid-market manufacturer</i> closed its books in 3 days.',
    body_fr: 'Réconciliation bancaire continue et mémo financier généré : la direction financière a repris la main sur le calendrier de clôture.',
    body_en: 'Continuous bank reconciliation and a generated financial memo: the finance leadership took back control of the closing calendar.',
    cta_label_fr: 'Voir le cas complet →',
    cta_label_en: 'See full case →',
    cta_href: '/cas-clients',
    results: [
      { value: '3 j', label_fr: 'Clôture mensuelle\n(contre 10)', label_en: 'Monthly close\n(down from 10)' },
      { value: '−80 %', label_fr: 'Temps de\nréconciliation', label_en: 'Reconciliation\ntime' },
      { value: '×4', label_fr: 'Vitesse des\nmémos COMEX', label_en: 'Board memo\nspeed' },
    ],
  };
