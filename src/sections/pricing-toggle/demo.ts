// Waimia · Co-location DS (Wave #38, T5) · module `pricing-toggle` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pricing-toggle',
    background: 'paper',
    kicker_fr: 'Tarifs · mensuel ou annuel',
    kicker_en: 'Pricing · monthly or annual',
    h2_fr: 'Choisissez votre <i>rythme</i>',
    h2_en: 'Pick your <i>cadence</i>',
    label_monthly_fr: 'Mensuel', label_monthly_en: 'Monthly',
    label_annual_fr: 'Annuel', label_annual_en: 'Annual',
    save_badge_fr: 'Économisez 20%', save_badge_en: 'Save 20%',
    tiers: [
      {
        name_fr: 'Solo', name_en: 'Solo', price_monthly: '49 €', price_annual: '39 €',
        suffix_monthly_fr: '/mois · HT', suffix_monthly_en: '/month · excl. VAT',
        suffix_annual_fr: '/mois · facturé annuellement', suffix_annual_en: '/month · billed annually',
        features_fr: ['1 agent éditeur', '3 workflows actifs', '5 000 actions/mois', 'Support e-mail'],
        features_en: ['1 editor agent', '3 active workflows', '5,000 actions/month', 'Email support'],
        cta: { label_fr: 'Démarrer', label_en: 'Start', href: '/contact?plan=solo', variant: 'ghost' }, featured: false,
      },
      {
        name_fr: 'Équipe', name_en: 'Team', price_monthly: '149 €', price_annual: '119 €',
        suffix_monthly_fr: '/mois · HT', suffix_monthly_en: '/month · excl. VAT',
        suffix_annual_fr: '/mois · facturé annuellement', suffix_annual_en: '/month · billed annually',
        features_fr: ['5 agents éditeurs', 'Workflows illimités', '50 000 actions/mois', 'Support prioritaire'],
        features_en: ['5 editor agents', 'Unlimited workflows', '50,000 actions/month', 'Priority support'],
        cta: { label_fr: 'Choisir Équipe', label_en: 'Choose Team', href: '/contact?plan=team', variant: 'primary' }, featured: true,
      },
      {
        name_fr: 'Scale', name_en: 'Scale', price_monthly: '399 €', price_annual: '319 €',
        suffix_monthly_fr: '/mois · HT', suffix_monthly_en: '/month · excl. VAT',
        suffix_annual_fr: '/mois · facturé annuellement', suffix_annual_en: '/month · billed annually',
        features_fr: ['Agents illimités', 'Orchestration multi-équipes', 'Actions illimitées', 'CSM dédié + SLA'],
        features_en: ['Unlimited agents', 'Multi-team orchestration', 'Unlimited actions', 'Dedicated CSM + SLA'],
        cta: { label_fr: 'Nous parler', label_en: 'Talk to us', href: '/contact?plan=scale', variant: 'ghost' }, featured: false,
      },
    ],
  };
