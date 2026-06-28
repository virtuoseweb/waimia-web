// Waimia · Co-location DS (Wave #38, T5) · module `stack-cards` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'stack-cards',
    kicker_fr: 'Méthode · 4 temps',
    kicker_en: 'Method · 4 steps',
    h2_fr: "De la stratégie à la <i>croissance</i>",
    h2_en: 'From strategy to <i>growth</i>',
    lede_fr: "Une méthode en quatre temps, chacun adossé à un livrable concret. Pas de boîte noire.",
    lede_en: 'A four step method, each backed by a concrete deliverable. No black box.',
    cards: [
      {
        index_fr: '01',
        index_en: '01',
        tone: 'paper',
        title_fr: 'Stratégie',
        title_en: 'Strategy',
        body_fr: "On cartographie vos flux, vos outils et vos angles morts pour cibler les gains les plus rapides.",
        body_en: 'We map your flows, tools and blind spots to target the fastest wins.',
        points: [
          { label_fr: 'Cartographie des flux', label_en: 'Flow mapping' },
          { label_fr: "Plan d'action priorisé", label_en: 'Prioritised action plan' },
        ],
        media_src: '/images/illustrations/ds/chess-paper.webp',
        media_alt_fr: 'Illustration : stratégie',
        media_alt_en: 'Illustration: strategy',
      },
      {
        index_fr: '02',
        index_en: '02',
        tone: 'ink',
        title_fr: 'Conception',
        title_en: 'Design',
        body_fr: "On conçoit l'architecture, les workflows et l'expérience, alignés sur vos objectifs business.",
        body_en: 'We design the architecture, workflows and experience, aligned with your business goals.',
        points: [
          { label_fr: 'Architecture et workflows', label_en: 'Architecture and workflows' },
          { label_fr: 'Maquettes validées', label_en: 'Validated mockups' },
        ],
        media_src: '/images/illustrations/ds/style-12-ink.webp',
        media_alt_fr: 'Illustration : conception',
        media_alt_en: 'Illustration: design',
      },
      {
        index_fr: '03',
        index_en: '03',
        tone: 'paper',
        title_fr: 'Déploiement',
        title_en: 'Deployment',
        body_fr: "On déploie, on documente et on transfère. Tout reste lisible, modifiable et extensible par votre équipe.",
        body_en: 'We deploy, document and hand over. Everything stays readable, editable and extensible by your team.',
        points: [
          { label_fr: 'Mise en production', label_en: 'Go live' },
          { label_fr: 'Documentation transférée', label_en: 'Documentation handed over' },
        ],
        media_src: '/images/illustrations/ds/men-on-hand-paper.webp',
        media_alt_fr: 'Illustration : déploiement',
        media_alt_en: 'Illustration: deployment',
      },
      {
        index_fr: '04',
        index_en: '04',
        tone: 'ink',
        title_fr: 'Croissance',
        title_en: 'Growth',
        body_fr: "On mesure, on itère et on fait monter votre équipe en autonomie à chaque cycle.",
        body_en: 'We measure, iterate and grow your team autonomy with every cycle.',
        points: [
          { label_fr: 'Mesure et itération', label_en: 'Measure and iterate' },
          { label_fr: 'Montée en autonomie', label_en: 'Growing autonomy' },
        ],
        media_src: '/images/illustrations/ds/money-money-ink.webp',
        media_alt_fr: 'Illustration : croissance',
        media_alt_en: 'Illustration: growth',
      },
    ],
  };
