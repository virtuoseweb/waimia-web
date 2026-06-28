// Waimia · Co-location DS (Wave #38, T5) · module `metric-shift` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'metric-shift',
    kicker_fr: '§ Résultats mesurés',
    kicker_en: '§ Measured results',
    h2_fr: 'Avant → <i>après</i>.',
    h2_en: 'Before → <i>after</i>.',
    lede_fr: 'Trois indicateurs RevOps, mesurés avant et après câblage.',
    lede_en: 'Three RevOps indicators, measured before and after wiring.',
    shifts: [
      {
        label_fr: 'Taux de récupération dunning',
        label_en: 'Dunning recovery rate',
        before: '34 %',
        after: '61 %',
        delta_fr: '+27 pts',
        delta_en: '+27 pts',
        trend: 'up',
      },
      {
        label_fr: 'Délai 1er contact',
        label_en: 'First-contact delay',
        before: '48 h',
        after: '< 2 min',
        delta_fr: '−99 %',
        delta_en: '−99 %',
        trend: 'down',
      },
      {
        label_fr: 'Erreur réconciliation',
        label_en: 'Reconciliation error',
        before: '4 %',
        after: '0,3 %',
        delta_fr: '−93 %',
        delta_en: '−93 %',
        trend: 'down',
      },
    ],
    background: 'paper',
  };
