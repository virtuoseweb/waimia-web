// Waimia · Co-location DS (Wave #38, T5) · module `objection-handler` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'objection-handler',
    h2_fr: '<i>Objections</i> fréquentes',
    h2_en: 'Frequent <i>objections</i>',
    objections: [
      { objection_fr: "On n'a pas le temps maintenant.", objection_en: "We don't have time now.", response_fr: "L'Activation prend 5 jours, dont 3 sans implication équipe.", response_en: 'Activation takes 5 days, 3 without team involvement.' },
      { objection_fr: 'On a déjà essayé sans succès.', objection_en: 'We already tried unsuccessfully.', response_fr: 'On commence par cartographier ce qui a échoué pour éviter de répéter.', response_en: 'We start by mapping past failures to avoid repeating.' },
    ],
  };
