// Waimia · Co-location DS (Wave #38, T5) · module `related-links` · demo bilingue.
// Donnees realistes : routes internes canoniques verifiees (services, cas-usages, ressources).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'related-links',
  kicker_fr: 'Explorer aussi',
  kicker_en: 'Explore more',
  h2_fr: 'Continuez votre <i class="acc">parcours</i>.',
  h2_en: 'Continue your <i class="acc">journey</i>.',
  background: 'paper',
  groups: [
    {
      label_fr: 'Nos offres',
      label_en: 'Our offers',
      links: [
        {
          label_fr: 'Site Web Intelligent',
          label_en: 'Intelligent Website',
          href: '/services/site-web-ia',
          desc_fr: 'Un site qui convertit, mesuré et outillé IA.',
          desc_en: 'A site that converts, measured and AI-tooled.',
        },
        {
          label_fr: 'Intégrateur Claude',
          label_en: 'Claude Integrator',
          href: '/services/integration-claude',
          desc_fr: 'Vos processus câblés à Claude, de bout en bout.',
          desc_en: 'Your processes wired to Claude, end to end.',
        },
        {
          label_fr: 'Agents IA',
          label_en: 'AI Agents',
          href: '/services/agents-ia',
        },
      ],
    },
    {
      label_fr: "Cas d'usage",
      label_en: 'Use cases',
      links: [
        {
          label_fr: 'Générer plus de leads',
          label_en: 'Generate more leads',
          href: '/cas-usages/generer-plus-de-leads',
        },
        {
          label_fr: 'Standardiser les processus',
          label_en: 'Standardize processes',
          href: '/cas-usages/standardiser-processus',
        },
        {
          label_fr: 'Centraliser les données',
          label_en: 'Centralize data',
          href: '/cas-usages/centraliser-donnees',
        },
      ],
    },
    {
      label_fr: 'À lire',
      label_en: 'Worth reading',
      links: [
        {
          label_fr: "L'IA pilier pour les PME en 2026",
          label_en: 'AI as a pillar for SMBs in 2026',
          href: '/blog/essai-pillar-ia-pme-2026',
        },
        {
          label_fr: 'Agent IA contre automatisation classique',
          label_en: 'AI agent versus classic automation',
          href: '/blog/agent-ia-vs-automatisation-classique-2026',
        },
        {
          label_fr: 'Calculateur de ROI IA',
          label_en: 'AI ROI calculator',
          href: '/ressources/outils/calculateur-roi-ia',
        },
      ],
    },
  ],
};
