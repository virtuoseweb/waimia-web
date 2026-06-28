// Waimia · Co-location DS (Wave #38, T5) · module `tech-models-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'tech-models-table',
    kicker_fr: 'Choisir le bon modèle',
    kicker_en: 'Choose the right model',
    title_fr: '<i>Modèles</i><br/>disponibles',
    title_en: 'Available<br/><i>models</i>',
    aside_fr: 'Un modèle par profil de tâche, sélection à la tâche, fallback configurable.',
    aside_en: 'One model per task profile, task-level selection, configurable fallback.',
    caption_fr: 'Modèles Claude · profil de tâche',
    caption_en: 'Claude models · task profile',
    models: [
      { name: 'Claude Haiku 4.5', version: '4.5', cost: '€', context: '200K tokens', use_case_fr: 'Triage, classification, scoring, tâches répétitives à fort volume', use_case_en: 'Triage, classification, scoring, high-volume repetitive tasks' },
      { name: 'Claude Sonnet 4.6', version: '4.6', cost: '€€', context: '1M tokens', use_case_fr: 'Rédaction, analyse, agents, la plupart des workflows enterprise', use_case_en: 'Writing, analysis, agents, most enterprise workflows' },
      { name: 'Claude Opus 4.8', version: '4.8', cost: '€€€', context: '1M tokens', use_case_fr: 'Raisonnement complexe, stratégie, audit critique, cas exigeants', use_case_en: 'Complex reasoning, strategy, critical audit, demanding cases' },
    ],
  };
