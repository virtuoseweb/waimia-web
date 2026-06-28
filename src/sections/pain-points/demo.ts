// Waimia · Co-location DS (Wave #38, T5) · module `pain-points` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pain-points',
    eyebrow_fr: '§ Friction',
    eyebrow_en: '§ Friction',
    h2_fr: '<i>Points</i><br/>de friction',
    h2_en: '<i>Points</i><br/>of friction',
    aside_fr: 'Avant d\'automatiser, comprendre où le temps se perd. Trois frictions récurrentes que nous voyons sur le terrain.',
    aside_en: 'Before automating, understand where time is lost. Three recurring frictions we see in the field.',
    items: [
      { title_fr: 'La clôture mensuelle prend dix jours', title_en: 'Monthly close takes ten days', body_fr: 'Réconciliation manuelle entre banque, ERP et tableurs. L\'équipe finance reconstruit les mêmes chiffres chaque mois.', body_en: 'Manual reconciliation between bank, ERP and spreadsheets. The finance team rebuilds the same figures every month.' },
      { title_fr: 'Les mémos partent sans relecture', title_en: 'Memos ship without review', body_fr: 'Faute de temps, les notes financières arrivent au COMEX avec des écarts non expliqués et des sources éparpillées.', body_en: 'For lack of time, financial notes reach the board with unexplained gaps and scattered sources.' },
      { title_fr: 'Le reporting reste un copier-coller', title_en: 'Reporting stays copy-paste', body_fr: 'Chaque tableau de bord est reconstruit à la main, sans source de vérité, donc impossible à auditer rapidement.', body_en: 'Every dashboard is rebuilt by hand, without a source of truth, so it cannot be audited quickly.' },
    ],
  };
