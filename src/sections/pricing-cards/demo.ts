// Waimia · Co-location DS (Wave #38, T5) · module `pricing-cards` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pricing-cards',
    background: 'paper',
    kicker_fr: 'Tarifs · formules',
    kicker_en: 'Pricing · plans',
    h2_fr: 'Trois <i>formules</i>, un seul cap',
    h2_en: 'Three <i>plans</i>, one direction',
    lede_fr: "Du pilote à la plateforme agentique complète. Sans engagement caché, facturation au forfait.",
    lede_en: 'From pilot to a full agentic platform. No hidden commitment, flat-rate billing.',
    tiers: [
      {
        name_fr: 'Activation', name_en: 'Activation', price: '2 000 €', period_fr: 'HT · forfait', period_en: 'excl. VAT · flat',
        features_fr: ['1 workflow agentique', 'Audit cartographie 5 jours', 'Formation équipe 1 jour', 'Support 30 jours'],
        features_en: ['1 agentic workflow', '5-day mapping audit', '1-day team training', '30-day support'],
        cta: { label_fr: 'Démarrer', label_en: 'Start', href: '/contact?offer=activation', variant: 'ghost' }, featured: false,
      },
      {
        name_fr: 'Growth', name_en: 'Growth', price: '10 000 €', period_fr: 'HT · forfait', period_en: 'excl. VAT · flat',
        features_fr: ['5 à 8 workflows agentiques', 'Système complet 6 à 10 semaines', 'Agent éditeur GEO/AIO', 'Support 90 jours'],
        features_en: ['5 to 8 agentic workflows', 'Full system in 6 to 10 weeks', 'GEO/AIO editor agent', '90-day support'],
        cta: { label_fr: 'Choisir Growth', label_en: 'Choose Growth', href: '/contact?offer=growth', variant: 'primary' }, featured: true,
      },
      {
        name_fr: 'Sur-mesure', name_en: 'Custom', price: 'Sur devis', period_fr: 'selon périmètre', period_en: 'scope-based',
        features_fr: ['Workflows illimités', 'Architecture dédiée multi-agents', 'SSO, SLA et conformité', 'Support 12 mois'],
        features_en: ['Unlimited workflows', 'Dedicated multi-agent architecture', 'SSO, SLA and compliance', '12-month support'],
        cta: { label_fr: 'Nous parler', label_en: 'Talk to us', href: '/contact?offer=custom', variant: 'ghost' }, featured: false,
      },
      {
        name_fr: 'Enterprise', name_en: 'Enterprise', price: '40 000 €', period_fr: 'HT · annuel', period_en: 'excl. VAT · annual',
        features_fr: ['Plateforme agentique multi-équipes', 'Gouvernance et audit dédiés', 'Intégrations sur-mesure (ERP, CRM)', 'CSM dédié + SLA 99,9%'],
        features_en: ['Multi-team agentic platform', 'Dedicated governance and audit', 'Custom integrations (ERP, CRM)', 'Dedicated CSM + 99.9% SLA'],
        cta: { label_fr: 'Demander une démo', label_en: 'Request a demo', href: '/contact?offer=enterprise', variant: 'ghost' }, featured: false,
      },
    ],
    footnote_fr: 'Tarifs HT. Migration des données et hébergement première année inclus.',
    footnote_en: 'Prices excl. VAT. Data migration and first-year hosting included.',
  };
