// Waimia · Co-location DS (Wave #38, T5) · module `feature-tabs` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-tabs',
    kicker_fr: 'Fonctionnalités clés',
    kicker_en: 'Key features',
    h2_fr: 'Trois <i>capacités</i> qui changent tout',
    h2_en: 'Three <i>capabilities</i> that change everything',
    intro_fr: 'Chaque module est conçu pour s\'intégrer en quelques jours, sans dette technique.',
    intro_en: 'Each module is designed to integrate within days, with no technical debt.',
    tabs: [
      {
        icon: '⚡',
        label_fr: 'Automatisation',
        label_en: 'Automation',
        title_fr: '<i>Workflows</i> IA opérationnels en 5 jours',
        title_en: 'AI <i>workflows</i> live in 5 days',
        body_fr: 'Audit, conception et déploiement d\'un premier workflow opérationnel en une semaine. Aucune infrastructure préalable requise.',
        body_en: 'Audit, design and deployment of a first operational workflow in one week. No prior infrastructure required.',
        visual_label_fr: 'Diagramme workflow',
        visual_label_en: 'Workflow diagram',
      },
      {
        icon: '◎',
        label_fr: 'Observabilite',
        label_en: 'Observability',
        title_fr: 'Mesures <i>temps réel</i> sur chaque action',
        title_en: '<i>Real-time</i> metrics on every action',
        body_fr: 'Chaque execution est loguee, tracee et analysable. Vous savez ce qui fonctionne, ce qui bloque, et pourquoi.',
        body_en: 'Every execution is logged, traced and analyzable. You know what works, what blocks, and why.',
        visual_label_fr: 'Dashboard metriques',
        visual_label_en: 'Metrics dashboard',
      },
      {
        icon: '↗',
        label_fr: 'Scalabilite',
        label_en: 'Scalability',
        title_fr: 'De 1 a 20 <i>workflows</i> sans refonte',
        title_en: 'From 1 to 20 <i>workflows</i> without rework',
        body_fr: 'L\'architecture modulaire permet d\'étendre le système progressivement, au rythme de votre équipe.',
        body_en: 'The modular architecture allows extending the system progressively, at your team\'s pace.',
        visual_label_fr: 'Schema d\'echelle',
        visual_label_en: 'Scale diagram',
      },
    ],
  };
