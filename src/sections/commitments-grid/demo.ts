// Waimia · Co-location DS (Wave #38, T5) · module `commitments-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'commitments-grid',
    kicker_fr: 'Nos engagements',
    kicker_en: 'Our commitments',
    h2_fr: 'Trois garanties. Aucune <i>exception</i>.',
    h2_en: 'Three guarantees. No <i>exception</i>.',
    commitments: [
      {
        title_fr: 'Auditabilité totale',
        title_en: 'Full auditability',
        body_fr: "Chaque décision du système est tracée, horodatée et exportable. Vous pouvez vérifier n'importe quel output à tout moment.",
        body_en: 'Every system decision is logged, timestamped and exportable. You can audit any output at any time.',
      },
      {
        title_fr: 'Zéro dépendance propriétaire',
        title_en: 'Zero proprietary lock-in',
        body_fr: "Les workflows sont construits sur des standards ouverts. Vous partez quand vous voulez, avec l'intégralité de vos données.",
        body_en: 'Workflows are built on open standards. Leave whenever you want with all your data intact.',
      },
      {
        title_fr: "Humain d'astreinte nommé",
        title_en: 'Named on-call human',
        body_fr: 'Un interlocuteur identifié, joignable sous 4h en jours ouvrés, pour toute question critique ou dérive constatée.',
        body_en: 'One named point of contact, reachable within 4h on business days, for any critical issue or drift.',
      },
    ],
  };
