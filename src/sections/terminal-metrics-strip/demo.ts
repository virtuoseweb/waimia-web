// Waimia · Co-location DS (Wave #38, T5) · module `terminal-metrics-strip` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'terminal-metrics-strip',
    kicker_fr: '◉ virtuoseos · v2.4.1 · télémétrie',
    kicker_en: '◉ virtuoseos · v2.4.1 · telemetry',
    background: 'paper',
    metrics: [
      { value: '99.98%', label_fr: 'uptime', label_en: 'uptime' },
      { value: '4 active', label_fr: 'workspaces', label_en: 'workspaces' },
      { value: '14 live', label_fr: 'agents', label_en: 'agents' },
      { value: 'fr-FR / en-US', label_fr: 'locale', label_en: 'locale' },
      { value: '2.4.1 · 04.2026', label_fr: 'release', label_en: 'release' },
    ],
  };
