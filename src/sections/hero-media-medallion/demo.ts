// Waimia · Co-location DS (Wave #38, T5) · module `hero-media-medallion` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-media-medallion',
    kicker_fr: '§ Site web intelligent',
    kicker_en: '§ Intelligent website',
    h1_fr: 'Un site web <i class="acc">intelligent</i>.',
    h1_en: 'An intelligent <i class="acc">website</i>.',
    lede_fr: "Pas une vitrine. Une web app pilotée par l'IA, branchée à vos données, qui transforme chaque visite en client.",
    lede_en: 'Not a brochure. An AI-driven web app, wired to your data, that turns every visit into a customer.',
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    media_src: '/images/line-art/dispositif-flow.svg',
    media_alt_fr: "Schéma du dispositif : outils dispersés reliés par un nœud d'orchestration IA vers un résultat mesuré.",
    media_alt_en: 'Diagram of the setup: scattered tools linked by an AI orchestration node toward a measured outcome.',
    kpis: [
      { num: '2–10 k€', cap_fr: 'budget HT indicatif', cap_en: 'indicative budget excl. tax' },
      { num: '4–8 sem.', cap_fr: 'site exploitable livré', cap_en: 'usable site delivered' },
      { num: '100/100', cap_fr: 'PageSpeed SSG, base GEO', cap_en: 'PageSpeed SSG, GEO baseline' },
    ],
  };
