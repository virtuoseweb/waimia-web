// Waimia · Co-location DS (Wave #38, T5) · module `hero-centered-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-centered-band',
    kicker_fr: '§ Site web intelligent',
    kicker_en: '§ Intelligent website',
    h1_fr: 'Un site web <i class="acc">intelligent</i>.',
    h1_en: 'An intelligent <i class="acc">website</i>.',
    lede_fr: "Pas une vitrine. Une web app pilotée par l'IA, branchée à vos données, qui transforme chaque visite en client.",
    lede_en: 'Not a brochure. An AI-driven web app, wired to your data, that turns every visit into a customer.',
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    caps: [
      { label_fr: 'IA branchée', label_en: 'AI wired in', desc_fr: 'Web app pilotée par Claude et GPT via skills', desc_en: 'Web app driven by Claude and GPT through skills' },
      { label_fr: 'Vos données', label_en: 'Your data', desc_fr: 'Search Console + Analytics lus en continu', desc_en: 'Search Console + Analytics read continuously' },
      { label_fr: 'Temps réel', label_en: 'Real time', desc_fr: "Alertes et qualification jusqu'au CRM", desc_en: 'Alerts and qualification all the way to the CRM' },
      { label_fr: 'Quiz routeur', label_en: 'Routing quiz', desc_fr: 'Vers la page qui convertit le mieux', desc_en: 'Toward the page that converts best' },
    ],
  };
