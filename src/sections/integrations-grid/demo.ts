// Waimia · Co-location DS (Wave #38, T5) · module `integrations-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'integrations-grid',
    background: 'paper',
    kicker_fr: 'Intégrations',
    kicker_en: 'Integrations',
    h2_fr: 'Se connecte à <i>vos outils</i>',
    h2_en: 'Connects to <i>your tools</i>',
    lede_fr: 'Nos agents s’appuient sur votre stack existante. Pas de migration forcée, pas de silo de plus.',
    lede_en: 'Our agents build on your existing stack. No forced migration, no extra silo.',
    groups: [
      {
        group_fr: 'CRM et ventes', group_en: 'CRM and sales',
        items: [
          { name: 'Salesforce', logo_src: '/logos/integration-salesforce.svg' },
          { name: 'HubSpot', logo_src: '/logos/integration-hubspot.svg' },
          { name: 'Pipedrive', logo_src: '/logos/integration-pipedrive.svg' },
        ],
      },
      {
        group_fr: 'Communication', group_en: 'Communication',
        items: [
          { name: 'Slack', logo_src: '/logos/integration-slack.svg' },
          { name: 'Microsoft Teams', logo_src: '/logos/integration-teams.svg' },
          { name: 'Gmail', logo_src: '/logos/integration-gmail.svg' },
        ],
      },
      {
        group_fr: 'Données et stockage', group_en: 'Data and storage',
        items: [
          { name: 'Snowflake', logo_src: '/logos/integration-snowflake.svg' },
          { name: 'PostgreSQL', logo_src: '/logos/integration-postgres.svg' },
          { name: 'Notion', logo_src: '/logos/integration-notion.svg' },
          { name: 'Google Drive', logo_src: '/logos/integration-gdrive.svg' },
        ],
      },
    ],
  };
