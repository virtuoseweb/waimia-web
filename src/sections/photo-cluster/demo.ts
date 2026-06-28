// Waimia · Co-location DS (Wave #38, T5) · module `photo-cluster` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'photo-cluster',
    kicker_fr: 'Agence · coulisses',
    kicker_en: 'Studio · behind the scenes',
    h2_fr: 'Un studio qui aime rester <i>simple</i>',
    h2_en: 'A studio that likes to stay <i>simple</i>',
    lede_fr: "Pas de grands discours. On conçoit, on livre, on transfère. Le reste est du bruit.",
    lede_en: 'No grand speeches. We design, deliver, hand over. The rest is noise.',
    note_fr: 'Nous aimons rester simples.',
    note_en: 'We like to stay simple.',
    layout: 'lead-cluster',
    lead: { media_src: '/images/editorial/gentlemanhandcraftergoworknow.webp', media_alt_fr: "Atelier au travail", media_alt_en: 'Studio at work' },
    photos: [
      { media_src: '/images/editorial/menonhand.webp', media_alt_fr: "Collaboration", media_alt_en: 'Collaboration', caption_fr: 'Au travail', caption_en: 'At work' },
      { media_src: '/images/editorial/chess-style-16.webp', media_alt_fr: "Stratégie", media_alt_en: 'Strategy', caption_fr: 'Stratégie', caption_en: 'Strategy' },
      { media_src: '/images/editorial/womancomputer17.webp', media_alt_fr: "Production", media_alt_en: 'Production', caption_fr: 'Production', caption_en: 'Production' },
    ],
  };
