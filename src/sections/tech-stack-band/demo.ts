// Waimia · Co-location DS (Wave #38, T5) · module `tech-stack-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'tech-stack-band',
    kicker_fr: '§ 04 · La stack',
    kicker_en: '§ 04 · The stack',
    lead_fr: 'Une stack courte, auditable, branchée sur vos outils existants. Pas de refonte si un connecteur suffit.',
    lead_en: 'A short, auditable stack wired to your existing tools. No rebuild when a connector is enough.',
    pills: [
      { label_fr: 'Claude Opus', label_en: 'Claude Opus', kind: 'primary' },
      { label_fr: 'Claude Sonnet', label_en: 'Claude Sonnet', kind: 'primary' },
      { label_fr: 'HubSpot', label_en: 'HubSpot', kind: 'neutral' },
      { label_fr: 'PostgreSQL', label_en: 'PostgreSQL', kind: 'open' },
      { label_fr: 'Vercel', label_en: 'Vercel', kind: 'neutral' },
      { label_fr: 'Audit trail', label_en: 'Audit trail', kind: 'open' },
    ],
  };
