// Waimia · Co-location DS (Wave #38, T5) · module `trust-legal-section` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'trust-legal-section',
    kicker_fr: '§ Trust Center',
    kicker_en: '§ Trust Center',
    h1_fr: 'Confiance, <i>gouvernance</i> et preuves.',
    h1_en: 'Trust, <i>governance</i>, and proof.',
    lede_fr: 'Un document lisible par les équipes métier, sécurité et direction avant de brancher des agents IA en production.',
    lede_en: 'A document business, security, and leadership teams can review before wiring AI agents into production.',
    revised_at: '2026-05-28',
    version: 'v2.4.1',
    sections: [
      { id: 'scope', title_fr: 'Périmètre', title_en: 'Scope' },
      { id: 'data', title_fr: 'Données traitées', title_en: 'Processed data' },
      { id: 'controls', title_fr: 'Contrôles humains', title_en: 'Human controls' },
      { id: 'audit', title_fr: 'Audit et traçabilité', title_en: 'Audit and traceability' },
    ],
    body_html_fr:
      '<section id="scope"><h2>Périmètre</h2><p>Ce document couvre les systèmes qui branchent des agents IA sur vos données et vos outils métier. Il précise ce qui est automatisé, ce qui reste sous décision humaine et les limites posées avant toute mise en production.</p></section><section id="data"><h2>Données traitées</h2><p>On liste les sources connectées, la nature des données lues ou écrites et leur durée de conservation. Aucune donnée sensible n\'est utilisée pour entraîner un modèle tiers.</p></section><section id="controls"><h2>Contrôles humains</h2><p>Chaque action à effet réel passe par une validation traçable. Les seuils, les cas limites et les procédures d\'arrêt sont définis avec vos équipes avant le déploiement.</p></section><section id="audit"><h2>Audit et traçabilité</h2><p>Les appels, les réponses et les états persistés sont journalisés. Vous gardez de quoi rejouer une décision, arbitrer un litige et prouver la conformité.</p></section>',
    body_html_en:
      '<section id="scope"><h2>Scope</h2><p>This document covers the systems that wire AI agents into your data and business tools. It states what is automated, what stays under human decision, and the limits set before any production rollout.</p></section><section id="data"><h2>Processed data</h2><p>We list the connected sources, the nature of the data read or written, and how long it is retained. No sensitive data is used to train a third-party model.</p></section><section id="controls"><h2>Human controls</h2><p>Every real-effect action goes through a traceable approval. Thresholds, edge cases, and stop procedures are defined with your teams before deployment.</p></section><section id="audit"><h2>Audit and traceability</h2><p>Calls, responses, and persisted states are logged. You keep enough to replay a decision, arbitrate a dispute, and prove compliance.</p></section>',
  };
