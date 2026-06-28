// Waimia · Co-location DS (Wave #38, T5) · module `workflow-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'workflow-table',
    eyebrow_fr: '§ Workflows',
    eyebrow_en: '§ Workflows',
    h2_fr: '<i>Ce qu\'on</i><br/>automatise',
    h2_en: 'What we<br/><i>automate</i>',
    aside_fr: 'Chaque workflow est nommé, mesuré, attribué à un modèle précis. Pas de boîte noire.',
    aside_en: 'Each workflow is named, measured, assigned to a specific model. No black box.',
    workflows: [
      { num: '01', kicker_fr: 'Réconciliation', kicker_en: 'Reconciliation', title_fr: 'Rapprochement bancaire continu', title_en: 'Continuous bank reconciliation', model_fr: 'Claude Haiku 4.5', model_en: 'Claude Haiku 4.5', gain: '−80 %', how_fr: 'Matching automatique des écritures, exceptions remontées à l\'humain.', how_en: 'Automatic entry matching, exceptions escalated to a human.' },
      { num: '02', kicker_fr: 'Synthèse', kicker_en: 'Synthesis', title_fr: 'Mémo financier mensuel', title_en: 'Monthly financial memo', model_fr: 'Claude Sonnet 4.6', model_en: 'Claude Sonnet 4.6', gain: '×4', how_fr: 'Génération de la note à partir des chiffres validés, sources citées.', how_en: 'Memo generated from validated figures, sources cited.' },
      { num: '03', kicker_fr: 'Reporting', kicker_en: 'Reporting', title_fr: 'Tableau de bord auditable', title_en: 'Auditable dashboard', model_fr: 'Claude Sonnet 4.6', model_en: 'Claude Sonnet 4.6', gain: '−6 j', how_fr: 'Une source de vérité, contrôles d\'anomalies, export prêt COMEX.', how_en: 'One source of truth, anomaly checks, board-ready export.' },
    ],
  };
