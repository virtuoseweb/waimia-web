// Waimia · Co-location DS (Wave #38, T5) · module `decision-list` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'decision-list',
    kicker_fr: 'Arbre de décision',
    kicker_en: 'Decision tree',
    heading_fr: '<i>Quel service</i><br/>pour vous ?',
    heading_en: '<i>Which service</i><br/>for you?',
    items: [
      { label_fr: 'Vous ne savez pas par où commencer : Audit de maturité IA.', label_en: 'You do not know where to start: AI Readiness Assessment.' },
      { label_fr: 'Vous devez faire valider un budget : Cadrage & feuille de route IA.', label_en: 'You need to get a budget approved: Strategic Scoping & AI Roadmap.' },
      { label_fr: 'Vos données ou votre CRM ne sont pas fiables : Gouvernance & qualité des données.', label_en: 'Your data or your CRM is not reliable: Data Governance & Quality.' },
    ],
  };
