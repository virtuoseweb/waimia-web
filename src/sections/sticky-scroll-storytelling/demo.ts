// Waimia · Co-location DS (#80) · module `sticky-scroll-storytelling` · démo bilingue.
// Données réelles B2B IA + assets duotone réels (illustrations/ds/*-paper.webp, fond paper).
// `DemoData` = Record<string, any> (cf section-demos-types.ts).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'sticky-scroll-storytelling',
  background: 'paper',
  textSide: 'left',
  proportion: 'media-led',
  mediaRatio: '4-5',
  density: 'base',
  numbering: 'serif',
  kicker_fr: 'Méthode · de bout en bout',
  kicker_en: 'Method · end to end',
  h2_fr: 'Comment un projet <i>prend forme</i>',
  h2_en: 'How a project <i>takes shape</i>',
  lede_fr: "Quatre temps, du diagnostic à la mesure. Chaque étape s'ancre dans la précédente.",
  lede_en: 'Four moments, from diagnosis to measurement. Each step builds on the last.',
  steps: [
    {
      index_fr: '01',
      index_en: '01',
      eyebrow_fr: 'Diagnostic',
      eyebrow_en: 'Diagnosis',
      title_fr: 'On cartographie le terrain',
      title_en: 'We map the terrain',
      body_fr:
        "On part de vos processus réels, pas d'un idéal théorique. Entretiens, observation des flux, repérage des frictions qui coûtent du temps chaque semaine.",
      body_en:
        'We start from your real processes, not a theoretical ideal. Interviews, flow observation, spotting the frictions that cost time every week.',
      media_src: '/images/illustrations/ds/chess-paper.webp',
      media_alt_fr: 'Diagnostic stratégique des processus',
      media_alt_en: 'Strategic process diagnosis',
    },
    {
      index_fr: '02',
      index_en: '02',
      eyebrow_fr: 'Conception',
      eyebrow_en: 'Design',
      title_fr: 'On dessine le dispositif',
      title_en: 'We design the system',
      body_fr:
        "On choisit les bons agents, les bons modèles, les bonnes intégrations. Une architecture sobre, qui tient la charge et que votre équipe peut comprendre.",
      body_en:
        'We pick the right agents, the right models, the right integrations. A sober architecture that holds up and that your team can understand.',
      media_src: '/images/illustrations/ds/men-on-hand-paper.webp',
      media_alt_fr: 'Conception du dispositif sur mesure',
      media_alt_en: 'Tailored system design',
    },
    {
      index_fr: '03',
      index_en: '03',
      eyebrow_fr: 'Déploiement',
      eyebrow_en: 'Deployment',
      title_fr: 'On met en route, sans casse',
      title_en: 'We roll out, without breakage',
      body_fr:
        "Mise en production progressive, garde-fous en place, formation de vos équipes. On avance par paliers vérifiés plutôt que par un grand saut risqué.",
      body_en:
        'Progressive go-live, guardrails in place, training for your teams. We move in verified steps rather than one risky leap.',
      media_src: '/images/illustrations/ds/car-on-the-road-paper.webp',
      media_alt_fr: 'Déploiement progressif en production',
      media_alt_en: 'Progressive production rollout',
    },
    {
      index_fr: '04',
      index_en: '04',
      eyebrow_fr: 'Mesure',
      eyebrow_en: 'Measurement',
      title_fr: 'On prouve la valeur créée',
      title_en: 'We prove the value created',
      body_fr:
        "Temps gagné, qualité, coût par tâche. Des indicateurs partagés, revus ensemble, pour décider de la suite sur des faits plutôt que des impressions.",
      body_en:
        'Time saved, quality, cost per task. Shared indicators, reviewed together, to decide what comes next on facts rather than impressions.',
      media_src: '/images/illustrations/ds/money-money-paper.webp',
      media_alt_fr: 'Mesure de la valeur et du retour sur investissement',
      media_alt_en: 'Value and return on investment measurement',
      link_label_fr: 'Voir un cas concret',
      link_label_en: 'See a real case',
      link_href: '/cas-clients',
    },
  ],
};
