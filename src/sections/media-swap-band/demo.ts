// Waimia · Co-location DS (Wave #38, T5) · module `media-swap-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'media-swap-band',
    kicker_fr: 'Présence · ancrage',
    kicker_en: 'Presence · footprint',
    h2_fr: 'Au plus près de vos <i>équipes</i>',
    h2_en: 'Close to your <i>teams</i>',
    lede_fr: "On travaille à distance comme sur site, avec la même exigence de proximité.",
    lede_en: 'We work remote or on site, with the same demand for closeness.',
    swap_mode: 'auto',
    columns: [
      { label_fr: 'Sur site', label_en: 'On site', sublabel_fr: 'Ateliers et cadrage', sublabel_en: 'Workshops and scoping', media: [ { media_src: '/images/editorial/menonhand.webp', media_alt_fr: 'Atelier', media_alt_en: 'Workshop' }, { media_src: '/images/editorial/gentlemanhandcraftergoworknow.webp', media_alt_fr: 'Cadrage', media_alt_en: 'Scoping' } ] },
      { label_fr: 'À distance', label_en: 'Remote', sublabel_fr: 'Build et itérations', sublabel_en: 'Build and iterations', media: [ { media_src: '/images/editorial/womancomputer17.webp', media_alt_fr: 'Build', media_alt_en: 'Build' }, { media_src: '/images/themes/theme-productivite.webp', media_alt_fr: 'Itérations', media_alt_en: 'Iterations' } ] },
    ],
    cta_label_fr: 'Prendre rendez-vous',
    cta_label_en: 'Book a call',
    cta_href: 'https://cal.com/simonberos/audit',
  };
