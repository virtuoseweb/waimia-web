// Waimia · Co-location DS (Wave #38, T3) · module `hero-social-proof` · donnée démo bilingue.
// DÉPLACÉE depuis src/lib/section-demos.ts (rule 60 : déplacer, pas dupliquer).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'hero-social-proof',
  kicker_fr: 'Approuvé par les équipes revenue',
  kicker_en: 'Trusted by revenue teams',
  h1_fr: "L'IA qui <i>livre</i>, pas qui promet.",
  h1_en: 'The AI that <i>ships</i>, not just promises.',
  lede_fr: "Des systèmes d'activation déployés en production, mesurés sur le pipeline réel. Pas de démo, des résultats signés.",
  lede_en: 'Activation systems deployed in production, measured on real pipeline. No demos, signed results.',
  cta_primary: { label_fr: 'Réserver un audit →', label_en: 'Book an audit →', href: '/contact', variant: 'primary' },
  cta_secondary: { label_fr: 'Voir les cas', label_en: 'See the cases', href: '/cas-clients', variant: 'ghost' },
  rating_fr: 'Méthode mesurée, jamais estimée',
  rating_en: 'Method measured, never estimated',
  stats: [
    { k: '5 jours', label_fr: 'pour cibler le levier', label_en: 'to pinpoint the lever' },
    { k: '4 sem.', label_fr: 'au premier workflow en production', label_en: 'to first workflow in production' },
    { k: '1', label_fr: 'interlocuteur unique', label_en: 'single point of contact' },
    { k: 'Mesuré', label_fr: 'ROI, jamais estimé', label_en: 'ROI, never estimated' },
  ],
};
