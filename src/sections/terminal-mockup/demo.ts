// Waimia · Co-location DS (Wave #38, T5) · module `terminal-mockup` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'terminal-mockup',
    kicker_fr: '[platform] · VirtuoseOS · OS interne propriétaire',
    kicker_en: '[platform] · VirtuoseOS · proprietary internal OS',
    h2_fr: 'Faites défiler la <i class="acc">console</i>.',
    h2_en: 'Scroll the <i class="acc">console</i>.',
    intro_fr: 'Quatre étapes pour câbler un système : cartographier, câbler, orchestrer, industrialiser. La console les déroule à la cadence d&rsquo;un terminal.',
    intro_en: 'Four steps to wire a system: map, wire, orchestrate, industrialize. The console unfolds them at terminal pace.',
    layout: 'split',
    label: 'waimia@virtuose ~ / demo-saas',
    status: '◉ live',
    tone: 'ink',
    background: 'paper',
    lines: [
      { kind: 'cmd', text_fr: 'virtuose --version', text_en: 'virtuose --version' },
      { kind: 'out', text_fr: 'VirtuoseOS 2.4.1 · locale fr-FR · kernel ok', text_en: 'VirtuoseOS 2.4.1 · locale en-US · kernel ok' },
      { kind: 'cmd', text_fr: 'virtuose ship pipeline.agent', text_en: 'virtuose ship pipeline.agent' },
      { kind: 'out', text_fr: '→ hubspot.sync ok · 482 contacts', text_en: '→ hubspot.sync ok · 482 contacts' },
      { kind: 'out', text_fr: '→ claude.triage ok · 14 handoffs', text_en: '→ claude.triage ok · 14 handoffs' },
      { kind: 'ok', text_fr: 'pipeline shipped · +19 540 € pipeline', text_en: 'pipeline shipped · +€19,540 pipeline' },
      { kind: 'comment', text_fr: '// audit trail signé · validation humaine requise', text_en: '// signed audit trail · human validation required' },
    ],
    show_cursor: true,
  };
