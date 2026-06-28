// Waimia · Co-location DS (Wave #38, T5) · module `tech-integration-flow` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'tech-integration-flow',
    kicker_fr: 'Position dans la stack',
    kicker_en: 'Position in the stack',
    title_fr: '<i>Intégration</i>',
    title_en: '<i>Integration</i>',
    aside_fr: 'De la donnée à l\'observation, la place du modèle dans la chaîne.',
    aside_en: 'From data to observation, the model place in the chain.',
    steps: [
      { num: '01', label_fr: 'Données', label_en: 'Data', body_fr: 'Sources métier branchées via Model Context Protocol, accès gouverné.', body_en: 'Business sources connected via Model Context Protocol, governed access.' },
      { num: '02', label_fr: 'Modèles', label_en: 'Models', body_fr: 'Claude Haiku · Sonnet · Opus · Code, sélection à la tâche.', body_en: 'Claude Haiku · Sonnet · Opus · Code, task-level selection.' },
      { num: '03', label_fr: 'Orchestration', label_en: 'Orchestration', body_fr: 'Graphes d\'agents, état durable, human-in-the-loop natifs.', body_en: 'Agent graphs, durable state, native human-in-the-loop.' },
    ],
  };
