// Waimia · Co-location DS (Wave #38, T5) · module `off-proof` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'off-proof',
    eyebrow_fr: '§ Avant / Après',
    eyebrow_en: '§ Before / After',
    h2_fr: 'Signal<br/><i>terrain</i>',
    h2_en: 'Field<br/><i>signal</i>',
    quote_fr: 'Le pipeline tourne maintenant tout seul. On a récupéré nos fins de mois.',
    quote_en: 'The pipeline now runs on its own. We got our month-ends back.',
    attribution: 'DAF · ETI industrielle 600 personnes',
    metrics: [
      { value: '−80 %', label_fr: 'Temps de réconciliation', label_en: 'Reconciliation time' },
      { value: '×4', label_fr: 'Vitesse de production des mémos', label_en: 'Memo production speed' },
      { value: '−6 j', label_fr: 'Délai de clôture mensuelle', label_en: 'Monthly close lead time' },
      { value: '99,4 %', label_fr: 'Écritures rapprochées sans intervention', label_en: 'Entries matched without intervention' },
      { value: '3 mois', label_fr: 'Retour sur investissement', label_en: 'Return on investment' },
    ],
  };
