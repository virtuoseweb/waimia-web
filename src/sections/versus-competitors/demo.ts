// Waimia · Co-location DS (Wave #38, T5) · module `versus-competitors` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'versus-competitors',
    background: 'paper',
    kicker_fr: 'Pourquoi Waimia',
    kicker_en: 'Why Waimia',
    h2_fr: 'Waimia face aux <i>alternatives</i>',
    h2_en: 'Waimia versus the <i>alternatives</i>',
    columns: [
      { name_fr: 'Waimia', name_en: 'Waimia', featured: true },
      { name_fr: 'Agence classique', name_en: 'Traditional agency', featured: false },
      { name_fr: 'Outil no-code', name_en: 'No-code tool', featured: false },
    ],
    rows: [
      { group_fr: 'Mise en œuvre', group_en: 'Delivery', feature_fr: 'Délai jusqu’à la production', feature_en: 'Time to production', values: ['2 semaines', '2 trimestres', '1 mois'] },
      { feature_fr: 'Agents IA sur mesure', feature_en: 'Custom AI agents', values: [true, false, false] },
      { feature_fr: 'Traçabilité des décisions', feature_en: 'Decision traceability', values: [true, 'partielle', false] },
      { group_fr: 'Exploitation', group_en: 'Operations', feature_fr: 'Hébergement souverain UE', feature_en: 'EU sovereign hosting', values: [true, 'au choix', false] },
      { feature_fr: 'Évolution sans dette', feature_en: 'Debt-free evolution', values: [true, false, 'limitée'] },
    ],
  };
