// Waimia · Co-location DS (Wave #38) · module `site-showcase` · donnee demo bilingue.
// Rendue par /library/site-showcase. Reutilise des captures reelles de public/images/cases/.

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'site-showcase',
  kicker_fr: 'Le résultat, en ligne',
  kicker_en: 'The result, live',
  h2_fr: 'Le site <i>livré</i>',
  h2_en: 'The <i>delivered</i> site',
  lede_fr: 'Captures réelles du site en production, pas une maquette.',
  lede_en: 'Real screenshots of the site in production, not a mockup.',
  url: 'https://lescarnetsdemontpellier.fr',
  url_label_fr: 'Visiter le site',
  url_label_en: 'Visit the site',
  screens: [
    {
      src: '/images/cases/les-carnets-de-montpellier/home.webp',
      alt_fr: "Page d'accueil des Carnets de Montpellier.",
      alt_en: 'Home page of Les Carnets de Montpellier.',
      kind: 'frame',
      caption_fr: "Une entrée en matière claire : sujet, ton et abonnement dès le premier écran.",
      caption_en: 'A clear opening: topic, tone and subscription from the very first screen.',
    },
    {
      src: '/images/cases/les-carnets-de-montpellier/menu.webp',
      alt_fr: 'Menu plein écran, navigation par thèmes.',
      alt_en: 'Full-screen menu, navigation by themes.',
      kind: 'frame',
      caption_fr: 'Navigation par thèmes : le lecteur trouve son sujet sans se perdre.',
      caption_en: 'Theme-based navigation: readers find their topic without getting lost.',
    },
    {
      src: '/images/cases/les-carnets-de-montpellier/slider-dark.webp',
      alt_fr: 'Liste des articles en mode sombre.',
      alt_en: 'Article list in dark mode.',
      kind: 'frame',
      caption_fr: 'Mode sombre pour les longues lectures, confort du soir compris.',
      caption_en: 'Dark mode for long reads, evening comfort included.',
    },
  ],
};
