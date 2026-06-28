// Waimia · Co-location DS (Wave #38, T5) · module `proof-bar` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'proof-bar',
    kicker_fr: 'Preuves · démo design system',
    kicker_en: 'Proof · design system demo',
    metrics: [
      { value: '118', label_fr: 'tokens canoniques', label_en: 'canonical tokens', emphasis: true },
      { value: '19', label_fr: 'sections W6', label_en: 'W6 sections', emphasis: false },
      { value: '114', label_fr: 'composants atomic', label_en: 'atomic components', emphasis: false },
      { value: '0', label_fr: 'hallucinations', label_en: 'hallucinations', emphasis: false },
    ],
    layout: 'horizontal',
  };
