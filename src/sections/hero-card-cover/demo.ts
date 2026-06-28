// Waimia · Co-location DS (Wave #38, T5) · module `hero-card-cover` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-card-cover',
    kicker_fr: '§ Site web intelligent',
    kicker_en: '§ Intelligent website',
    h1_fr: 'Un site web <i class="acc">intelligent</i>.',
    h1_en: 'An intelligent <i class="acc">website</i>.',
    lede_fr: "Pas une vitrine. Une web app pilotée par l'IA, branchée à vos données, qui transforme chaque visite en client.",
    lede_en: 'Not a brochure. An AI-driven web app, wired to your data, that turns every visit into a customer.',
    badges: [
      { label_fr: "Connectée à l'IA (Claude, GPT)", label_en: 'Connected to AI (Claude, GPT)' },
      { label_fr: 'Branchée à vos données', label_en: 'Wired to your data' },
      { label_fr: 'Alertes temps réel', label_en: 'Real-time alerts' },
      { label_fr: 'Quiz qui route vers ce qui convertit', label_en: 'A quiz that routes to what converts' },
    ],
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    media_src: '/images/line-art/dispositif-flow.svg',
    media_alt_fr: "Schéma line-art du dispositif Waimia : données, IA et conversion reliées.",
    media_alt_en: 'Line-art diagram of the Waimia setup: data, AI and conversion linked.',
    kpis: [
      { num: '4–8 sem.', cap_fr: 'site exploitable livré', cap_en: 'usable site delivered' },
      { num: '100/100', cap_fr: 'PageSpeed SSG, base GEO', cap_en: 'SSG PageSpeed, GEO baseline' },
    ],
  };
