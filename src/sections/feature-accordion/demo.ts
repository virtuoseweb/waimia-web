// Waimia · Co-location DS (Wave #38, T5) · module `feature-accordion` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-accordion',
    kicker_fr: 'Le système',
    kicker_en: 'The system',
    h2_fr: 'Quatre briques, <i>une</i> activation continue.',
    h2_en: 'Four building blocks, <i>one</i> continuous activation.',
    lede_fr: 'Chaque brique se déploie seule mais prend toute sa valeur assemblée. Ouvrez pour le détail.',
    lede_en: 'Each block ships on its own but compounds once assembled. Open for the detail.',
    open_first: true,
    items: [
      {
        title_fr: 'Cartographie du revenue',
        title_en: 'Revenue mapping',
        body_fr: "On trace le parcours réel du lead au deal, on repère les ruptures et les gisements de pipeline dormant avant d'automatiser quoi que ce soit.",
        body_en: 'We map the real lead-to-deal journey, spotting breaks and dormant pipeline before automating anything.',
        meta_fr: 'Livré en semaine 1',
        meta_en: 'Delivered in week 1',
      },
      {
        title_fr: 'Agents câblés en production',
        title_en: 'Production-wired agents',
        body_fr: 'Des agents IA branchés sur votre stack (CRM, données, outils), routés vers le bon modèle selon la tâche, supervisés et mesurés en continu.',
        body_en: 'AI agents wired into your stack (CRM, data, tools), routed to the right model per task, supervised and measured continuously.',
        meta_fr: 'Mesuré sur le pipeline réel',
        meta_en: 'Measured on real pipeline',
      },
      {
        title_fr: 'Transfert de compétence',
        title_en: 'Skill transfer',
        body_fr: "Vos équipes apprennent à opérer et faire évoluer le système. Vous possédez le code et les workflows, sans dépendance à un prestataire.",
        body_en: 'Your teams learn to operate and evolve the system. You own the code and workflows, with no vendor lock-in.',
        meta_fr: 'Documentation et runbooks inclus',
        meta_en: 'Documentation and runbooks included',
      },
      {
        title_fr: 'Boucle de mesure',
        title_en: 'Measurement loop',
        body_fr: 'Chaque itération se valide sur des chiffres : conversion, vélocité, pipeline ouvert. On garde ce qui performe, on coupe le reste.',
        body_en: 'Every iteration is validated on numbers: conversion, velocity, open pipeline. We keep what performs, cut the rest.',
      },
    ],
  };
