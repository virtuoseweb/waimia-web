// Waimia · Co-location DS (Wave #38, T5) · module `process-steps` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'process-steps',
    kicker_fr: '[méthode] · comment ça marche',
    kicker_en: '[method] · how it works',
    h2_fr: 'Quatre étapes, <i class="acc">zéro</i> mystère.',
    h2_en: 'Four steps, <i class="acc">zero</i> mystery.',
    intro_fr: 'Du diagnostic au système industrialisé. Chaque étape prépare la suivante, rien n’est sauté.',
    intro_en: 'From diagnosis to an industrialized system. Each step prepares the next, nothing is skipped.',
    background: 'paper',
    steps: [
      { title_fr: 'Cartographier', title_en: 'Map', body_fr: 'On audite vos flux acquisition, CRM et contenu pour repérer les goulots réels.', body_en: 'We audit your acquisition, CRM and content flows to spot the real bottlenecks.', meta_fr: 'Semaine 1', meta_en: 'Week 1' },
      { title_fr: 'Câbler', title_en: 'Wire', body_fr: 'On branche les agents et les règles dans votre pipeline existant, sans tout casser.', body_en: 'We wire agents and rules into your existing pipeline, without breaking everything.', meta_fr: 'Semaines 2-3', meta_en: 'Weeks 2-3' },
      { title_fr: 'Orchestrer', title_en: 'Orchestrate', body_fr: 'On séquence les workflows, on pose les handoffs humains et l’audit trail signé.', body_en: 'We sequence workflows, set human handoffs and the signed audit trail.', meta_fr: 'Semaine 4', meta_en: 'Week 4' },
      { title_fr: 'Industrialiser', title_en: 'Industrialize', body_fr: 'On mesure, on réalloue, on documente. Le système tourne, vous gardez la main.', body_en: 'We measure, reallocate, document. The system runs, you keep control.', meta_fr: 'En continu', meta_en: 'Ongoing' },
    ],
  };
