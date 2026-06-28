// Waimia · Co-location DS (Wave #38, T3) · module `media-bento` · donnée démo bilingue.
// DÉPLACÉE depuis src/lib/section-demos.ts (rule 60 : déplacer, pas dupliquer).
// `DemoData` = Record<string, any> (cf section-demos.ts). On exporte la donnée brute du type.

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'media-bento',
  kicker_fr: 'Projets · panorama',
  kicker_en: 'Projects · overview',
  h2_fr: 'Le travail, <i>en images</i>',
  h2_en: 'The work, <i>in pictures</i>',
  lede_fr: "Un aperçu des systèmes conçus pour des PME exigeantes.",
  lede_en: 'A glimpse of systems built for demanding SMBs.',
  layout: 'feature-2',
  tiles: [
    { title_fr: 'Plateau', title_en: 'Plateau', tag_fr: 'Acquisition', tag_en: 'Acquisition', media_src: '/images/cas/cas-plateau.webp', media_alt_fr: 'Projet Plateau', media_alt_en: 'Plateau project', span: '2', link_href: '/cas-clients' },
    { title_fr: 'Halcyon', title_en: 'Halcyon', tag_fr: 'Productivité', tag_en: 'Productivity', media_src: '/images/cas/cas-halcyon.webp', media_alt_fr: 'Projet Halcyon', media_alt_en: 'Halcyon project', span: '1', link_href: '/cas-clients' },
    { title_fr: 'Northbound', title_en: 'Northbound', tag_fr: 'Pilotage', tag_en: 'Steering', media_src: '/images/cas/cas-northbound.webp', media_alt_fr: 'Projet Northbound', media_alt_en: 'Northbound project', span: '1', link_href: '/cas-clients' },
    { title_fr: 'Méridien', title_en: 'Meridian', tag_fr: 'Conversion', tag_en: 'Conversion', media_src: '/images/themes/theme-acquisition.webp', media_alt_fr: 'Projet Méridien', media_alt_en: 'Meridian project', span: '1', link_href: '/cas-clients' },
    { title_fr: 'Boréal', title_en: 'Boreal', tag_fr: 'Automatisation', tag_en: 'Automation', media_src: '/images/themes/theme-productivite.webp', media_alt_fr: 'Projet Boréal', media_alt_en: 'Boreal project', span: '1', link_href: '/cas-clients' },
    { title_fr: 'Sillage', title_en: 'Wake', tag_fr: 'Contenu', tag_en: 'Content', media_src: '/images/themes/theme-contenu-seo.webp', media_alt_fr: 'Projet Sillage', media_alt_en: 'Wake project', span: '1', link_href: '/cas-clients' },
  ],
};
