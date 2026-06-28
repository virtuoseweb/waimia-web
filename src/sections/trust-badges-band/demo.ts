// Waimia · Co-location DS (Wave #38, T5) · module `trust-badges-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'trust-badges-band',
    background: 'ink',
    variant: 'strip',
    kicker_fr: 'Confiance',
    kicker_en: 'Trust',
    // Données de DÉMONSTRATION du catalogue (placeholders neutres).
    // P0.2-D : certifications/conformités réglementaires retirées (claims non détenus).
    badges: [
      { label_fr: 'Activateur France Num', label_en: 'France Num activator' },
      { label_fr: 'Badge démo · A', label_en: 'Demo badge · A' },
      { label_fr: 'Badge démo · B', label_en: 'Demo badge · B' },
      { label_fr: 'Badge démo · C', label_en: 'Demo badge · C' },
    ],
  };
