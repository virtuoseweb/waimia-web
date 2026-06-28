// Waimia · Co-location DS (Wave #38, T5) · module `editorial-table-block` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-table-block',
    kicker_fr: 'Comparateur services',
    kicker_en: 'Service comparator',
    heading_fr: '<i>Quel service</i><br/>pour quelle décision ?',
    heading_en: '<i>Which service</i><br/>for which decision?',
    caption_fr: 'Lecture rapide du catalogue conseil',
    caption_en: 'A quick read of the advisory catalogue',
    columns_fr: ['Besoin', 'Service', 'Livrable de décision'],
    columns_en: ['Need', 'Service', 'Decision deliverable'],
    rows_fr: [
      ['Décider avant budget', 'Audit de maturité IA', 'Grille de score, risques, priorités, feu vert ou arrêt en 10 jours'],
      ['Obtenir un accord direction', 'Cadrage & feuille de route IA', 'Backlog chiffré, séquencé, lisible par DSI et COMEX'],
      ['Fiabiliser les chiffres', 'Gouvernance & qualité des données', 'Sources de vérité, ownership, contrôles et anomalies'],
    ],
    rows_en: [
      ['Decide before budget', 'AI Readiness Assessment', 'Scorecard, risks, priorities, green light or stop in 10 days'],
      ['Secure board approval', 'Strategic Scoping & AI Roadmap', 'Costed, sequenced backlog, readable by IT leadership and the board'],
      ['Make the numbers trustworthy', 'Data Governance & Quality', 'Sources of truth, ownership, controls and anomalies'],
    ],
    variant: 'editorial',
  };
