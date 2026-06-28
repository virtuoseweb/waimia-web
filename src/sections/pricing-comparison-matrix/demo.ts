// Waimia · Co-location DS (Wave #38, T5) · module `pricing-comparison-matrix` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pricing-comparison-matrix',
    kicker_fr: 'Tarifs · comparatif complet',
    kicker_en: 'Pricing · full comparison',
    h2_fr: 'Choisissez la <i>formule</i> adaptée',
    h2_en: 'Choose the <i>plan</i> that fits',
    body_fr: 'Toutes les formules incluent un audit initial et un accès à notre équipe. Pas de surprise en cours de route.',
    body_en: 'All plans include an initial audit and access to our team. No surprises along the way.',
    plans: [
      {
        name_fr: 'Activation',
        name_en: 'Activation',
        price: '2 000 €',
        price_note_fr: 'paiement unique',
        price_note_en: 'one-time payment',
        cta: { label_fr: 'Démarrer', label_en: 'Get started', href: '#', variant: 'ghost' },
        featured: false,
      },
      {
        name_fr: 'Growth System',
        name_en: 'Growth System',
        price: '10 000 €',
        price_note_fr: 'ou 3x 1 800 €',
        price_note_en: 'or 3x 1 800 EUR',
        cta: { label_fr: 'Choisir', label_en: 'Choose plan', href: '#', variant: 'primary' },
        featured: true,
      },
      {
        name_fr: 'Sur-mesure',
        name_en: 'Custom',
        price: 'Devis',
        price_note_fr: 'selon périmètre',
        price_note_en: 'scope-based',
        cta: { label_fr: 'Discuter', label_en: 'Talk to us', href: '#', variant: 'ghost' },
        featured: false,
      },
    ],
    rows: [
      { feature_fr: 'Audit stratégie IA', feature_en: 'AI strategy audit', group_fr: 'Diagnostic', group_en: 'Diagnostic', values: [true, true, true] },
      { feature_fr: 'Cartographie workflows', feature_en: 'Workflow mapping', group_fr: 'Diagnostic', group_en: 'Diagnostic', values: [false, true, true] },
      { feature_fr: 'Workflows déployés', feature_en: 'Deployed workflows', group_fr: 'Execution', group_en: 'Execution', values: ['1', '5 à 8', 'Illimité'] },
      { feature_fr: 'Intégrations tierces', feature_en: 'Third-party integrations', group_fr: 'Execution', group_en: 'Execution', values: [false, true, true] },
      { feature_fr: 'Formation équipe', feature_en: 'Team training', group_fr: 'Accompagnement', group_en: 'Support', values: [false, true, true] },
      { feature_fr: 'Support inclus', feature_en: 'Included support', group_fr: 'Accompagnement', group_en: 'Support', values: ['5 jours', '90 jours', '12 mois'] },
      { feature_fr: 'Responsable dédié', feature_en: 'Dedicated lead', group_fr: 'Accompagnement', group_en: 'Support', values: [false, false, true] },
      { feature_fr: 'Livrable mesurable', feature_en: 'Measurable deliverable', group_fr: 'Resultats', group_en: 'Results', values: [true, true, true] },
      { feature_fr: 'Reporting ROI', feature_en: 'ROI reporting', group_fr: 'Resultats', group_en: 'Results', values: [false, true, true] },
    ],
  };
