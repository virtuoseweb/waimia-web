// Waimia · Co-location DS (Wave #38, T5) · module `method-timeline` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'method-timeline',
    kicker_fr: 'Méthode · 4 étapes',
    kicker_en: 'Method · 4 steps',
    h2_fr: 'Le <i>processus</i> en quatre temps',
    h2_en: 'The <i>process</i> in four steps',
    lede_fr: "De l'audit initial au déploiement, chaque étape produit un livrable mesurable.",
    lede_en: 'From initial audit to deployment, each step ships a measurable artifact.',
    steps: [
      { num: '01', label_fr: 'Audit', label_en: 'Audit', body_fr: 'Cartographie stack, données, équipe, frictions.', body_en: 'Map stack, data, team, frictions.', meta_fr: 'Semaine 1', meta_en: 'Week 1' },
      { num: '02', label_fr: 'Diagnostic', label_en: 'Diagnostic', body_fr: 'Priorisation des chantiers par ROI mesurable.', body_en: 'Prioritization by measurable ROI.', meta_fr: 'Semaine 2', meta_en: 'Week 2' },
      { num: '03', label_fr: 'Pilote', label_en: 'Pilot', body_fr: 'Premier workflow en production sous 5 jours.', body_en: 'First workflow in production in 5 days.', meta_fr: 'Semaines 3-4', meta_en: 'Weeks 3-4' },
      { num: '04', label_fr: 'Industrialisation', label_en: 'Industrialization', body_fr: 'Extension à 6-10 semaines après mesure.', body_en: 'Extension over 6-10 weeks after measurement.', meta_fr: 'Semaines 5-8', meta_en: 'Weeks 5-8' },
      { num: '05', label_fr: 'Formation', label_en: 'Training', body_fr: 'Montée en autonomie des équipes sur les agents livrés.', body_en: 'Teams reach autonomy on the delivered agents.', meta_fr: 'Semaine 9', meta_en: 'Week 9' },
      { num: '06', label_fr: 'Mesure & itération', label_en: 'Measure & iterate', body_fr: 'Boucle de mesure continue, ajustements pilotés par la donnée.', body_en: 'Continuous measurement loop, data-driven adjustments.', meta_fr: 'En continu', meta_en: 'Ongoing' },
    ],
  };
