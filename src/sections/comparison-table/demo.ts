// Waimia · Co-location DS (Wave #38, T5) · module `comparison-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'comparison-table',
    h2_fr: 'Comparatif <i>tiers</i>',
    h2_en: 'Tiers <i>comparison</i>',
    column_headers_fr: ['Capacité', 'Activation 1 sem.', 'Growth System', 'Sur-mesure'],
    column_headers_en: ['Capability', 'Activation 1wk', 'Growth System', 'Custom'],
    rows: [
      { feature_fr: 'Audit complet', feature_en: 'Full audit', values: [true, true, true] },
      { feature_fr: 'Workflows IA', feature_en: 'AI workflows', values: ['1', '5-8', 'illimité'] },
      { feature_fr: 'Formation équipe', feature_en: 'Team training', values: [false, true, true] },
      { feature_fr: 'Support 90j', feature_en: '90d support', values: [false, true, true] },
    ],
  };
