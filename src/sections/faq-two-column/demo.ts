// Waimia · Co-location DS (Wave #38, T5) · module `faq-two-column` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'faq-two-column',
    background: 'paper-2',
    kicker_fr: 'Questions fréquentes',
    kicker_en: 'Frequently asked',
    h2_fr: 'Tout ce qu’on nous <i>demande</i>',
    h2_en: 'Everything you <i>ask us</i>',
    items: [
      { q_fr: 'Combien de temps pour un premier résultat ?', q_en: 'How long to a first result?', a_fr: 'Un pilote cadré est livré en deux à quatre semaines, avec un workflow agentique réellement en production.', a_en: 'A scoped pilot ships in two to four weeks, with one agentic workflow genuinely in production.' },
      { q_fr: 'Faut-il remplacer nos outils ?', q_en: 'Do we need to replace our tools?', a_fr: 'Non. Nos agents s’intègrent à votre stack existante (CRM, messagerie, bases de données) sans migration forcée.', a_en: 'No. Our agents integrate with your existing stack (CRM, messaging, databases) without a forced migration.' },
      { q_fr: 'Les décisions des agents sont-elles traçables ?', q_en: 'Are agent decisions traceable?', a_fr: 'Chaque décision est journalisée, exportable et auditable. C’est ce qui rassure les équipes conformité.', a_en: 'Every decision is logged, exportable and auditable. That is what reassures compliance teams.' },
      { q_fr: 'Où sont hébergées nos données ?', q_en: 'Where is our data hosted?', a_fr: 'En Union européenne, sur une infrastructure souveraine. Vous gardez la réversibilité à tout moment.', a_en: 'In the European Union, on sovereign infrastructure. You keep full reversibility at any time.' },
      { q_fr: 'Gardons-nous le contrôle ?', q_en: 'Do we keep control?', a_fr: 'Oui. La supervision reste humaine : reprise en main en un clic et règles métier éditables sans code.', a_en: 'Yes. Supervision stays human: one-click takeover and business rules editable without code.' },
      { q_fr: 'Quel niveau d’engagement ?', q_en: 'What level of commitment?', a_fr: 'Le pilote est sans engagement long. Vous décidez de passer à l’échelle une fois les résultats mesurés.', a_en: 'The pilot carries no long commitment. You decide to scale once results are measured.' },
    ],
  };
