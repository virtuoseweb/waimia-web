// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-metrics` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'testimonial-metrics',
    background: 'ink',
    variant: 'quote-left',
    kicker_fr: 'Preuve client',
    kicker_en: 'Client proof',
    quote_fr: 'En deux semaines, un agent commercial utilisé quotidiennement a redessiné notre pipeline. La conformité a validé sans réserve.',
    quote_en: 'In two weeks, a daily-used sales agent reshaped our pipeline. Compliance signed off without reservation.',
    author: 'Responsable revenue',
    role_fr: 'Direction commerciale',
    role_en: 'Revenue lead',
    company: 'Scale-up B2B',
    metrics: [
      { k: '5 j', label_fr: 'pour câbler le premier agent', label_en: 'to wire the first agent' },
      { k: '4 sem.', label_fr: 'jusqu’au système complet', label_en: 'to the full system' },
      { k: '1', label_fr: 'interlocuteur dédié', label_en: 'dedicated contact' },
      { k: 'Mesuré', label_fr: 'ROI suivi, jamais estimé', label_en: 'ROI tracked, never estimated' },
    ],
  };
