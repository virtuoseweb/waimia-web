// Waimia · Co-location DS (Wave #38, T5) · module `problem-statement` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'problem-statement',
    kicker_fr: '§ 02 · Le problème',
    kicker_en: '§ 02 · The problem',
    statement_fr: "Votre équipe ne manque pas d'outils. Elle manque d'une <i>couche de continuité</i> entre site, CRM, contenu et décisions commerciales.",
    statement_en: 'Your team does not lack tools. It lacks a <i>continuity layer</i> between the site, CRM, content, and commercial decisions.',
    dropcap: true,
    stats: [
      { value: '42%', label_fr: 'leads sans relance sous 24h', label_en: 'leads not followed up within 24h' },
      { value: '6', label_fr: 'outils avant une décision', label_en: 'tools before one decision' },
      { value: '0', label_fr: 'trace claire des arbitrages IA', label_en: 'clear trace of AI decisions' },
    ],
  };
