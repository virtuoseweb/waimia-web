// Waimia · Co-location DS (Wave #38, T5) · module `logo-marquee` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'logo-marquee',
    background: 'paper',
    kicker_fr: 'Ils nous font confiance',
    kicker_en: 'Trusted by',
    speed: 'base',
    grayscale: true,
    logos: [
      { src: '/logos/client-lumen.svg', name_fr: 'Lumen Retail', name_en: 'Lumen Retail', href: '#' },
      { src: '/logos/client-atlas.svg', name_fr: 'Atlas Finance', name_en: 'Atlas Finance' },
      { src: '/logos/client-orio.svg', name_fr: 'Orio Santé', name_en: 'Orio Health' },
      { src: '/logos/client-nordis.svg', name_fr: 'Nordis Industrie', name_en: 'Nordis Industries' },
      { src: '/logos/client-vela.svg', name_fr: 'Vela Logistique', name_en: 'Vela Logistics' },
      { src: '/logos/client-kairo.svg', name_fr: 'Kairo Énergie', name_en: 'Kairo Energy' },
    ],
  };
