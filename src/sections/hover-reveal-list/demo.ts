// Waimia · Co-location DS (Wave #38, T5) · module `hover-reveal-list` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hover-reveal-list',
    kicker_fr: 'Réalisations · sélection',
    kicker_en: 'Work · selection',
    h2_fr: 'Des systèmes qui <i>tournent</i> en production',
    h2_en: 'Systems that <i>run</i> in production',
    lede_fr: "Survolez pour voir le projet. Chaque ligne est un système livré, mesuré et transféré.",
    lede_en: 'Hover to preview the project. Each line is a system delivered, measured and handed over.',
    reveal_mode: 'cursor',
    items: [
      { label_fr: 'Plateau', label_en: 'Plateau', meta_fr: 'Restauration · acquisition', meta_en: 'Hospitality · acquisition', media_src: '/images/cas/cas-plateau.webp', media_alt_fr: 'Projet Plateau', media_alt_en: 'Plateau project', link_href: '/cas-clients' },
      { label_fr: 'Halcyon', label_en: 'Halcyon', meta_fr: 'Services · productivité', meta_en: 'Services · productivity', media_src: '/images/cas/cas-halcyon.webp', media_alt_fr: 'Projet Halcyon', media_alt_en: 'Halcyon project', link_href: '/cas-clients' },
      { label_fr: 'Northbound', label_en: 'Northbound', meta_fr: 'Industrie · pilotage', meta_en: 'Industry · steering', media_src: '/images/cas/cas-northbound.webp', media_alt_fr: 'Projet Northbound', media_alt_en: 'Northbound project', link_href: '/cas-clients' },
      { label_fr: 'Caserne', label_en: 'Caserne', meta_fr: 'Public · support', meta_en: 'Public · support', media_src: '/images/cas/cas-caserne.webp', media_alt_fr: 'Projet Caserne', media_alt_en: 'Caserne project', link_href: '/cas-clients' },
    ],
  };
