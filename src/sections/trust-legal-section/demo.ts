// Waimia · Co-location DS (Wave #38, T5) · module `trust-legal-section` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'trust-legal-section',
    kicker_fr: '§ Trust Center',
    kicker_en: '§ Trust Center',
    h1_fr: 'Confiance, <i>gouvernance</i> et preuves.',
    h1_en: 'Trust, <i>governance</i>, and proof.',
    lede_fr: 'Un document lisible par les équipes métier, sécurité et direction avant de brancher des agents IA en production.',
    lede_en: 'A document business, security, and leadership teams can review before wiring AI agents into production.',
    revised_at: '2026-05-28',
    version: 'v2.4.1',
    sections: [
      { id: 'scope', title_fr: 'Périmètre', title_en: 'Scope' },
      { id: 'data', title_fr: 'Données traitées', title_en: 'Processed data' },
      { id: 'controls', title_fr: 'Contrôles humains', title_en: 'Human controls' },
      { id: 'audit', title_fr: 'Audit et traçabilité', title_en: 'Audit and traceability' },
    ],
  };
