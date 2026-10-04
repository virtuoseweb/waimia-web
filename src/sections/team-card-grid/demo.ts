// Waimia · Co-location DS (Wave #38, T5) · module `team-card-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'team-card-grid',
    cta_label_fr: 'Voir le profil →',
    cta_label_en: 'View profile →',
    count_singular_fr: 'publication',
    count_singular_en: 'publication',
    count_plural_fr: 'publications',
    count_plural_en: 'publications',
    members: [
      {
        name: 'Simon Beros',
        role_fr: 'Fondateur · Architecte IA',
        role_en: 'Founder · AI Architect',
        description_fr: 'Construit les systèmes, écrit les notes longues et signe les arbitrages techniques.',
        description_en: 'Builds the systems, writes long-form notes, and signs off technical decisions.',
        href: '/equipe/simon-beros',
        count: 14,
      },
      {
        name: 'Claire Martin',
        role_fr: 'Ops · Documentation',
        role_en: 'Ops · Documentation',
        description_fr: 'Transforme les missions clients en SOP, checklists et livrables transmissibles.',
        description_en: 'Turns client work into SOPs, checklists, and transferable deliverables.',
        href: '/agence',
        count: 6,
      },
      {
        name: 'Nadia Leroy',
        role_fr: 'Growth · Contenu',
        role_en: 'Growth · Content',
        description_fr: 'Relie acquisition, CRM et contenus pour rendre les systèmes mesurables.',
        description_en: 'Connects acquisition, CRM, and content so systems can be measured.',
        href: '/agence',
        count: 3,
      },
    ],
  };
