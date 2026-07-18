// Waimia · Co-location DS · module `editorial-case-grid` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo = {
  type: 'editorial-case-grid',
  num_fr: 'IV.',
  num_en: 'IV.',
  kicker_fr: 'Les preuves',
  kicker_en: 'The proof',
  h2_fr: 'Pas des démos. Des <i class="accent">résultats</i>.',
  h2_en: 'Not demos. <i class="accent">Results</i>.',
  intro_fr: "Des cas, chiffres en clair. Pas de logos pour faire joli. Chaque ligne contient le secteur, la durée, la stack et l’impact mesuré, celui qu’on défend en comité de direction.",
  intro_en: 'Cases, numbers in the clear. No vanity logos. Each row holds the sector, duration, stack and measured impact, the one we defend in steering committees.',
  background: 'paper',
  stagger: 60,
  items: [
    {
      client: 'Cabinet Plateau',
      sector_fr: 'Conseil',
      sector_en: 'Consulting',
      stack: 'Claude · HubSpot · Make',
      impact_fr: '8 semaines gagnées sur les propositions',
      impact_en: '8 weeks saved on proposals',
      duration: '4 sem.',
      href: '/cas-clients/plateau',
    },
    {
      client: 'RevOps Studio',
      sector_fr: 'SaaS B2B',
      sector_en: 'B2B SaaS',
      stack: 'Claude · CRM · Analytics',
      impact_fr: 'Site, CRM et relances dans un pipeline',
      impact_en: 'Site, CRM and follow-ups in one pipeline',
      duration: '5 sem.',
      href: '/cas-clients',
    },
  ],
} satisfies DemoData;
