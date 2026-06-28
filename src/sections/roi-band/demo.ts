// Waimia · Co-location DS (Wave #38, T5) · module `roi-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'roi-band',
    eyebrow_fr: '§ Preuve macro',
    eyebrow_en: '§ Macro proof',
    h2_fr: '<i>Preuve</i> macro',
    h2_en: '<i>Macro</i> proof',
    metrics: [
      { value: '−80 %', label_fr: 'Temps de réconciliation', label_en: 'Reconciliation time' },
      { value: '×4', label_fr: 'Vitesse de production des mémos', label_en: 'Memo production speed' },
      { value: '−6 j', label_fr: 'Délai de clôture mensuelle', label_en: 'Monthly close lead time' },
      { value: '99,4 %', label_fr: 'Écritures rapprochées sans intervention', label_en: 'Entries matched without intervention' },
    ],
  };
