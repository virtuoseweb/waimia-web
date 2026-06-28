// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-logo-metric` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'testimonial-logo-metric',
    background: 'paper-2',
    kicker_fr: 'Preuve client',
    kicker_en: 'Client proof',
    h2_fr: 'Des équipes qui <i>livrent</i> plus vite',
    h2_en: 'Teams that <i>ship</i> faster',
    cards: [
      {
        company: 'Lumen Retail',
        quote_fr: "Waimia a remplacé un workflow manuel de trois jours par un agent qui tourne en continu. On a récupéré nos équipes pour le travail à valeur.",
        quote_en: 'Waimia replaced a three-day manual workflow with an agent that runs continuously. We freed our teams for high-value work.',
        author: 'Camille Rousseau',
        role_fr: 'Directrice des opérations',
        role_en: 'Head of Operations',
        metric_value: '-72%',
        metric_label_fr: 'temps de traitement',
        metric_label_en: 'processing time',
        href: '#',
      },
      {
        company: 'Atlas Finance',
        quote_fr: "Le déploiement a pris deux semaines, pas deux trimestres. Chaque décision de l'agent est traçable, ce qui a convaincu notre conformité.",
        quote_en: 'Roll-out took two weeks, not two quarters. Every agent decision is traceable, which won over our compliance team.',
        author: 'Marc Devauchelle',
        role_fr: 'Responsable transformation',
        role_en: 'Transformation Lead',
        metric_value: '14j',
        metric_label_fr: 'jusqu’à la mise en production',
        metric_label_en: 'to production',
        href: '#',
      },
    ],
  };
