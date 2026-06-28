// Waimia · Co-location DS (Wave #38, T5) · module `hero-course` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-course',
    type_label_fr: 'Formation praticien',
    type_label_en: 'Practitioner course',
    title_fr: 'Câbler son CRM avec Claude · 2 jours',
    title_en: 'Wiring your CRM with Claude · 2 days',
    lede_fr: 'Deux jours pour livrer un workflow CRM Claude en production : audit pipeline, scoring, séquences automatisées.',
    lede_en: 'Two days to ship a Claude-powered CRM workflow to production: pipeline audit, scoring, automated sequences.',
    pills: [
      { label_fr: 'Intermédiaire', label_en: 'Intermediate', variant: 'default' },
      { label_fr: '14h', label_en: '14h', variant: 'default' },
      { label_fr: 'Présentiel', label_en: 'In-person', variant: 'default' },
      { label_fr: 'Certifiant', label_en: 'Certificate', variant: 'accent' },
      { label_fr: '2 400 €', label_en: '€2,400', variant: 'price' },
    ],
    cta_primary: { label_fr: "S'inscrire →", label_en: 'Enroll →', href: '#enroll', variant: 'primary' },
    cta_secondary: { label_fr: 'Une question ? →', label_en: 'Have a question? →', href: '/contact', variant: 'ghost' },
  };
