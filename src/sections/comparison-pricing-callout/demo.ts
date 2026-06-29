// Waimia · Co-location DS (Wave #38, T5) · module `comparison-pricing-callout` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'comparison-pricing-callout',
    background: 'paper',
    kicker_fr: 'Pourquoi Waimia',
    kicker_en: 'Why Waimia',
    h2_fr: 'Trois raisons de <i>nous</i> choisir',
    h2_en: 'Three reasons to <i>choose</i> us',
    columns: [
      { glyph: '◷', title_fr: 'Des résultats en semaines', title_en: 'Results in weeks', body_fr: 'Un pilote en production en deux à quatre semaines, pas un projet qui s’étire sur deux trimestres.', body_en: 'A pilot in production in two to four weeks, not a project that drags across two quarters.' },
      { glyph: '◎', title_fr: 'Le contrôle, toujours', title_en: 'Control, always', body_fr: 'Décisions traçables, reprise humaine, hébergement souverain UE. La conformité valide sans réserve.', body_en: 'Traceable decisions, human takeover, EU sovereign hosting. Compliance signs off without reservation.' },
      { glyph: '↗', title_fr: 'Zéro dette technique', title_en: 'Zero technical debt', body_fr: 'Des agents qui évoluent avec vous, sur votre stack, sans vous enfermer dans un outil de plus.', body_en: 'Agents that evolve with you, on your stack, without locking you into one more tool.' },
    ],
    cta_label_fr: 'Voir nos offres',
    cta_label_en: 'See our pricing',
    cta_href: '/services',
    cta_note_fr: 'À partir d’un pilote forfaitaire, satisfait ou remboursé sous 30 jours.',
    cta_note_en: 'Starting from a flat-rate pilot, satisfied or refunded within 30 days.',
  };
