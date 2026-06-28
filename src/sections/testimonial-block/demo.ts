// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-block` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'testimonial-block',
    kicker_fr: 'Témoignages · démo',
    kicker_en: 'Testimonials · demo',
    h2_fr: 'Ce que disent les <i>clients</i>',
    h2_en: 'What <i>clients</i> say',
    testimonials: [
      { quote_fr: "En 5 jours, on a câblé l'IA dans nos workflows. Premier ROI à 6 semaines.", quote_en: 'In 5 days we wired AI into our workflows. First ROI at 6 weeks.', author: 'Marie L.', role_fr: 'COO', role_en: 'COO', company: 'PME B2B Services' },
      { quote_fr: "Méthodologie carrée. Mesure avant/après. On a su exactement ce qui marchait.", quote_en: 'Solid methodology. Before/after measurement. We knew exactly what worked.', author: 'Thomas R.', role_fr: 'CFO', role_en: 'CFO', company: 'ETI Industrie' },
    ],
    layout: 'grid-2',
  };
