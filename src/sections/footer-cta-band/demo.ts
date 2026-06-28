// Waimia · Co-location DS (Wave #38, T5) · module `footer-cta-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'footer-cta-band',
    background: 'ink',
    kicker_fr: 'Prêt à activer',
    kicker_en: 'Ready to activate',
    h2_fr: 'Mettez un premier agent <i>en production</i> ce trimestre',
    h2_en: 'Ship your first agent <i>to production</i> this quarter',
    subtitle_fr: 'Un pilote cadré, livré et mesuré en quelques semaines. Sans engagement long, sans dette technique.',
    subtitle_en: 'A scoped pilot, delivered and measured in a few weeks. No long commitment, no technical debt.',
    buttons: [
      { label_fr: 'Réserver un échange', label_en: 'Book a call', href: '/contact', variant: 'accent' },
      { label_fr: 'Voir les offres', label_en: 'See pricing', href: '/offres', variant: 'ghost' },
    ],
  };
