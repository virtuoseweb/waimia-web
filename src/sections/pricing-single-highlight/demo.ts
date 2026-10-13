// Waimia · Co-location DS (Wave #38, T5) · module `pricing-single-highlight` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pricing-single-highlight',
    background: 'paper',
    kicker_fr: 'Offre · pilote agentique',
    kicker_en: 'Offer · agentic pilot',
    h2_fr: 'Un seul produit, <i>tout</i> compris',
    h2_en: 'One product, <i>everything</i> included',
    name_fr: 'Pilote IA Activation', name_en: 'AI Activation Pilot',
    desc_fr: 'Le forfait unique pour passer un premier workflow agentique en production en une semaine.',
    desc_en: 'The single package to ship a first agentic workflow to production in one week.',
    anchor_price: '2 400 €', anchor_label_fr: 'valeur catalogue', anchor_label_en: 'list value',
    price: '2 000 €', period_fr: 'HT · paiement unique', period_en: 'excl. VAT · one-time',
    benefits_fr: [
      'Cartographie complète de vos process en 5 jours',
      'Un workflow agentique livré et déployé',
      'Formation de votre équipe sur 1 journée',
      'Tableau de bord de suivi des actions',
      'Garantie résultat ou remboursé sous 30 jours',
    ],
    benefits_en: [
      'Full mapping of your processes in 5 days',
      'One agentic workflow delivered and deployed',
      'One-day training for your team',
      'Action tracking dashboard',
      'Results guaranteed or refunded within 30 days',
    ],
    cta: { label_fr: 'Réserver mon pilote →', label_en: 'Book my pilot →', href: '/contact#offer=pilot', variant: 'accent' },
    guarantee_fr: 'Satisfait ou remboursé sous 30 jours, sans condition.',
    guarantee_en: 'Satisfied or refunded within 30 days, no strings attached.',
    secondary_note_fr: 'Places limitées à 4 pilotes par mois pour garantir la qualité du suivi.',
    secondary_note_en: 'Limited to 4 pilots per month to guarantee follow-up quality.',
  };
