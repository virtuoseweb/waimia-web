// Waimia · Co-location DS (Wave #38, T5) · module `comparison-duo` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'comparison-duo',
    kicker_fr: 'Avant / Après',
    kicker_en: 'Before / After',
    h2_fr: 'Ce que change Waimia <i>concrètement</i>',
    h2_en: 'What Waimia changes <i>in practice</i>',
    without_label_fr: 'Sans Waimia',
    without_label_en: 'Without Waimia',
    without_title_fr: 'Outils dispersés, équipe épuisée',
    without_title_en: 'Scattered tools, exhausted team',
    without_items: [
      { text_fr: 'Chaque workflow est réinventé de zéro à chaque projet', text_en: 'Every workflow is reinvented from scratch on each project' },
      { text_fr: 'Les décisions prennent 3x plus de temps par manque de visibilité', text_en: 'Decisions take 3x longer due to lack of visibility' },
      { text_fr: 'Les compétences IA restent dans 2 profils, jamais transférées', text_en: 'AI skills stay with 2 people, never transferred' },
      { text_fr: 'Chaque outil génère sa propre dette de maintenance', text_en: 'Each tool generates its own maintenance debt' },
    ],
    with_label_fr: 'Avec Waimia',
    with_label_en: 'With Waimia',
    with_title_fr: 'Un système qui produit, pas juste un projet',
    with_title_en: 'A system that produces, not just a project',
    with_items: [
      { text_fr: 'Workflows documentés, reproductibles et transmissibles à toute l\'équipe', text_en: 'Documented, repeatable workflows transferable to the whole team' },
      { text_fr: 'Visibilité en temps réel sur l\'avancement et les résultats mesurés', text_en: 'Real-time visibility on progress and measured outcomes' },
      { text_fr: 'Montée en compétence collective, pas seulement individuelle', text_en: 'Collective upskilling, not just individual' },
      { text_fr: 'Architecture pensée pour scaler sans ajouter de charge opérationnelle', text_en: 'Architecture designed to scale without adding operational load' },
    ],
  };
