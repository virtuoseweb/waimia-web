// Waimia · Co-location DS (Wave #38, T5) · module `offer-tier-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'offer-tier-grid',
    variant: 'featured',
    wrap: false,
    eyebrow_fr: 'II · TRANSFORMATION',
    eyebrow_en: 'II · TRANSFORMATION',
    h2_fr: 'Construire les systèmes qui durent.',
    h2_en: 'Build systems that last.',
    lede_fr: 'Site, CRM, analytics, productivité, connectés et mesurés.',
    lede_en: 'Website, CRM, analytics, productivity, connected and measured.',
    featured_card: {
      eyebrow_fr: 'OFFRE PHARE · 5 À 20 K€',
      eyebrow_en: 'FLAGSHIP OFFER · €5K TO €20K',
      title_fr: 'Growth System IA',
      title_en: 'AI Growth System',
      sub_fr: 'Pas un site. Pas un CRM. Un système.',
      sub_en: 'Not a website. Not a CRM. A system.',
      lead_fr: 'Site, CRM, relances, pilotage, connectés et mesurés. Le mardi on câble. Le vendredi on mesure.',
      lead_en: 'Website, CRM, follow-ups, dashboards, connected and measured. Tuesday we wire. Friday we measure.',
      cta_fr: 'Activer →',
      cta_en: 'Activate →',
      href: '/services',
    },
    offers: [
      {
        price_fr: '8 À 35 K€',
        price_en: '€8K TO €35K',
        title_fr: 'Growth Intelligence',
        title_en: 'Growth Intelligence',
        lead_fr: 'KPI commerciaux et opérationnels en temps réel. Des chiffres lisibles avant la réunion.',
        lead_en: 'Sales and operational KPIs in real time. Clear numbers before the meeting.',
        cta_fr: "Voir l'offre →",
        cta_en: 'View offer →',
        href: '/services',
      },
      {
        price_fr: '6 À 25 K€',
        price_en: '€6K TO €25K',
        title_fr: 'Productivité Opérationnelle IA',
        title_en: 'AI Operational Productivity',
        lead_fr: 'Excel augmenté, Office connecté, workflows internes qui tournent sans relance humaine.',
        lead_en: 'Augmented Excel, connected Office, internal workflows that run without human reminders.',
        cta_fr: "Voir l'offre →",
        cta_en: 'View offer →',
        href: '/services',
      },
      {
        price_fr: 'SITE WEB',
        price_en: 'WEBSITE',
        title_fr: 'Site Web IA',
        title_en: 'AI Website',
        lead_fr: 'Un site conçu pour convertir, mesuré, relié à votre CRM. Pas une vitrine statique.',
        lead_en: 'A conversion-focused website, measured and linked to your CRM. Not a static brochure.',
        cta_fr: "Voir l'offre →",
        cta_en: 'View offer →',
        href: '/services/site-web-intelligent',
      },
    ],
  };
