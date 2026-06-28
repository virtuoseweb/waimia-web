// Waimia · Co-location DS (Wave #38, T5) · module `pricing-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pricing-table',
    kicker_fr: 'Tarifs · démo',
    kicker_en: 'Pricing · demo',
    h2_fr: 'Trois <i>paliers</i>',
    h2_en: 'Three <i>tiers</i>',
    tiers: [
      { name_fr: 'Activation', name_en: 'Activation', price: '1 500 €', features_fr: ['1 workflow', 'Audit 5 jours', 'Formation 1 jour'], features_en: ['1 workflow', '5-day audit', '1-day training'], cta: { label_fr: 'Démarrer', label_en: 'Start', href: '#', variant: 'ghost' }, featured: false },
      { name_fr: 'Growth', name_en: 'Growth', price: '5 000 €', features_fr: ['5-8 workflows', 'Système complet 6-10 sem.', 'Support 90j'], features_en: ['5-8 workflows', 'Full system 6-10wk', '90d support'], cta: { label_fr: 'Choisir', label_en: 'Choose', href: '#', variant: 'primary' }, featured: true },
      { name_fr: 'Sur-mesure', name_en: 'Custom', price: 'Devis', features_fr: ['Workflows illimités', 'Architecture dédiée', 'Support 12 mois'], features_en: ['Unlimited workflows', 'Custom architecture', '12mo support'], cta: { label_fr: 'Discuter', label_en: 'Talk', href: '#', variant: 'ghost' }, featured: false },
    ],
  };
