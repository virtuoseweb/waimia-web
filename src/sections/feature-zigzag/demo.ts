// Waimia · Co-location DS (Wave #38, T5) · module `feature-zigzag` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-zigzag',
    kicker_fr: 'Fonctionnalités · aperçu',
    kicker_en: 'Features · overview',
    h2_fr: 'Trois <i>dimensions</i> du système Waimia',
    h2_en: 'Three <i>dimensions</i> of the Waimia system',
    lede_fr: "Chaque couche du système est conçue pour fonctionner seule ou en composition avec les autres.",
    lede_en: 'Each layer of the system is designed to work alone or in composition with the others.',
    // Damier opt-in : 1 bloc sur 2 (le 2e ici) rend en contraste ink. Son media
    // pointe donc une variante -ink.webp (manifeste §5.5 « 1 registre par bloc »).
    alternate_blocks: true,
    rows: [
      {
        kicker_fr: 'Diagnostic',
        kicker_en: 'Diagnostic',
        h3_fr: 'Audit complet en 5 jours',
        h3_en: 'Full audit in 5 days',
        body_fr: "On cartographie vos flux, vos outils et vos angles morts. Le résultat : un plan d'action priorisé avec des gains rapides et des chantiers structurants.",
        body_en: 'We map your flows, tools, and blind spots. The result: a prioritised action plan with quick wins and structural projects.',
        link_label_fr: 'Voir le processus',
        link_label_en: 'See the process',
        link_href: '/offres',
        points: [
          { label_fr: 'Cartographie des flux et des outils', label_en: 'Flow and tooling mapping' },
          { label_fr: 'Identification des angles morts', label_en: 'Blind-spot identification' },
          { label_fr: "Plan d'action priorisé", label_en: 'Prioritised action plan' },
        ],
        // Media line-art inline (.svg) : trait currentColor + accent DS.
        media_src: '/images/line-art/livrable-tableau-mesure.svg',
        media_alt_fr: 'Schema line-art : tableau de mesure',
        media_alt_en: 'Line-art diagram: measurement dashboard',
      },
      {
        kicker_fr: 'Execution',
        kicker_en: 'Execution',
        h3_fr: 'Workflows IA câblés et transférés',
        h3_en: 'AI workflows built and handed over',
        body_fr: "On conçoit, déploie et documente chaque workflow avec votre équipe. Pas de boîte noire : tout reste lisible, modifiable, extensible.",
        body_en: 'We design, deploy, and document every workflow with your team. No black box: everything stays readable, editable, extensible.',
        link_label_fr: 'Explorer les cas clients',
        link_label_en: 'Explore client cases',
        link_href: '/cas-clients',
        points: [
          { label_fr: 'Conception et déploiement', label_en: 'Design and deployment' },
          { label_fr: 'Documentation lisible et modifiable', label_en: 'Readable, editable documentation' },
        ],
        // Bloc even (rendu ink par le damier) : variante -ink.webp.
        media_src: '/images/illustrations/ds/chess-ink.webp',
        media_alt_fr: 'Illustration : pièces d\'échecs',
        media_alt_en: 'Illustration: chess pieces',
      },
      {
        kicker_fr: 'Transfert',
        kicker_en: 'Transfer',
        h3_fr: 'Montée en compétences de votre équipe',
        h3_en: 'Building your team capabilities',
        body_fr: "Formations courtes, guides opérationnels, revues hebdomadaires. Votre équipe gagne en autonomie à chaque itération.",
        body_en: 'Short training sessions, operational guides, weekly reviews. Your team gains autonomy with every iteration.',
        link_label_fr: 'Decouvrir la formation',
        link_label_en: 'Discover the training',
        link_href: '/formations',
        // Bloc odd (paper) : variante -paper.webp.
        media_src: '/images/illustrations/ds/men-on-hand-paper.webp',
        media_alt_fr: 'Illustration : transmission de savoir',
        media_alt_en: 'Illustration: knowledge handover',
      },
      {
        kicker_fr: 'Mesure',
        kicker_en: 'Measure',
        h3_fr: 'Pilotage en temps réel, sans relance',
        h3_en: 'Real-time steering, without chasing',
        body_fr: "Tableaux de bord vivants et alertes automatiques. Vous voyez ce qui marche, ce qui décroche et où agir, sans attendre la réunion mensuelle.",
        body_en: 'Live dashboards and automatic alerts. You see what works, what slips, and where to act, without waiting for the monthly meeting.',
        link_label_fr: 'Voir un tableau de bord',
        link_label_en: 'See a dashboard',
        link_href: '/offres',
        points: [
          { label_fr: 'Tableaux de bord temps réel', label_en: 'Real-time dashboards' },
          { label_fr: 'Alertes automatiques sur dérive', label_en: 'Automatic drift alerts' },
        ],
        // 4e rangée (paire en départ left → rendu ink par le damier) : variante -ink.webp.
        media_src: '/images/line-art/dispositif-flow.svg',
        media_alt_fr: 'Schema line-art : flux de pilotage',
        media_alt_en: 'Line-art diagram: steering flow',
      },
    ],
  };
