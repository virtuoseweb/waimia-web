// Waimia · Co-location DS (Wave #38, T5) · module `stats-bento` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'stats-bento',
    kicker_fr: 'Resultats · clients Waimia',
    kicker_en: 'Results · Waimia clients',
    h2_fr: 'Des <i>chiffres</i> qui parlent',
    h2_en: 'Numbers that <i>speak</i>',
    stats: [
      {
        value: '3.4x',
        label_fr: 'Croissance moyenne du pipeline commercial en 90 jours',
        label_en: 'Average pipeline growth in 90 days',
        delta: '+240%',
      },
      {
        value: '18h',
        label_fr: 'Économisées par semaine grâce aux workflows IA',
        label_en: 'Saved per week with AI workflows',
        delta: '-72%',
      },
      {
        value: '94%',
        label_fr: 'Taux de satisfaction client après déploiement',
        label_en: 'Client satisfaction rate after deployment',
      },
      {
        value: '5 jours',
        label_fr: 'Durée moyenne d\'une mission Activation de A à Z',
        label_en: 'Average duration of an Activation mission end to end',
        delta: 'vs 6 sem. marche',
      },
      {
        value: '12',
        label_fr: 'Workflows agentiques déployés en moyenne par client Growth',
        label_en: 'Agentic workflows deployed on average per Growth client',
        delta: '+8 vs pilote',
      },
      {
        value: '60 j',
        label_fr: 'Délai médian entre le pilote et le premier résultat mesuré',
        label_en: 'Median delay between pilot and first measured result',
        delta: '-50%',
      },
    ],
  };
