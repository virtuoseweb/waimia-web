// Waimia · Co-location DS (Wave #38, T5) · module `code-showcase` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'code-showcase',
    kicker_fr: '[devtools] · API VirtuoseOS',
    kicker_en: '[devtools] · VirtuoseOS API',
    h2_fr: 'Câblez un agent en <i class="acc">douze</i> lignes.',
    h2_en: 'Wire an agent in <i class="acc">twelve</i> lines.',
    intro_fr: 'Le SDK expose un client typé. Vous décrivez le workflow, la plateforme gère les rails et la relecture.',
    intro_en: 'The SDK exposes a typed client. You describe the workflow, the platform handles rails and review.',
    background: 'paper',
    tone: 'ink',
    label: 'agent.ts',
    lang_label: 'typescript',
    show_line_numbers: true,
    lines: [
      { text: "import { Virtuose } from '@virtuose/sdk';" },
      { text: '' },
      { text: 'const v = new Virtuose({ locale: \"fr-FR\" });', comment_fr: 'locale pilote le ton des relances', comment_en: 'locale drives follow-up tone' },
      { text: '' },
      { text: 'const agent = v.agent({' },
      { text: "  source: 'hubspot',", comment_fr: 'CRM connecté', comment_en: 'connected CRM' },
      { text: "  rule: 'score > 70 → relance',", comment_fr: 'règle métier', comment_en: 'business rule' },
      { text: '  review: true,', comment_fr: 'relecture humaine obligatoire', comment_en: 'human review required' },
      { text: '});' },
      { text: '' },
      { text: 'await agent.ship();', comment_fr: 'audit trail signé à la sortie', comment_en: 'signed audit trail on exit' },
    ],
  };
