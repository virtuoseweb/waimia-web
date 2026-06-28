// Waimia · Co-location DS (Wave #38, T5) · module `feature-comparison-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-comparison-grid',
    kicker_fr: 'La différence',
    kicker_en: 'The difference',
    h2_fr: 'Une activation <i>opérée</i>, pas un PowerPoint.',
    h2_en: 'An <i>operated</i> activation, not a slide deck.',
    lede_fr: "Ce qui distingue un système câblé en production d'un cabinet de conseil classique.",
    lede_en: 'What sets a production-wired system apart from a classic consulting firm.',
    columns: [
      {
        label_fr: 'Avec Waimia',
        label_en: 'With Waimia',
        highlighted: true,
        rows: [
          { text_fr: 'Première activation en production sous 5 jours', text_en: 'First production activation within 5 days', included: true },
          { text_fr: 'Mesuré sur le pipeline réel, pas sur des slides', text_en: 'Measured on real pipeline, not slides', included: true },
          { text_fr: 'Transfert de compétence à vos équipes', text_en: 'Skill transfer to your teams', included: true },
          { text_fr: 'Code et workflows livrés, vous les possédez', text_en: 'Code and workflows delivered, you own them', included: true },
        ],
      },
      {
        label_fr: 'Conseil classique',
        label_en: 'Classic consulting',
        highlighted: false,
        rows: [
          { text_fr: 'Cadrage de plusieurs semaines avant tout livrable', text_en: 'Weeks of framing before any deliverable', included: false },
          { text_fr: 'Recommandations sur slides, exécution à votre charge', text_en: 'Slide recommendations, execution on you', included: false },
          { text_fr: 'Dépendance au cabinet pour chaque itération', text_en: 'Vendor dependency on every iteration', included: false },
          { text_fr: 'Veille et benchmarks génériques', text_en: 'Generic watch and benchmarks', included: false },
        ],
      },
    ],
  };
