// Waimia · Co-location DS (Wave #38, T5) · module `terminal-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'terminal-table',
    kicker_fr: '[act.02] · la méthode',
    kicker_en: '[act.02] · the method',
    meta_fr: '4 services · in-house',
    meta_en: '4 services · in-house',
    h2_fr: 'Quatre services. Une <i class="acc">seule</i> couche.',
    h2_en: 'Four services. One <i class="acc">continuous</i> layer.',
    intro_fr: 'Pas de revendeur, pas de sous-traitance. Le contenu, les agents, le tracking : tout sort de la même main. Une équipe, un calendrier, une signature.',
    intro_en: 'No reseller, no subcontracting. Content, agents, tracking: all from the same hand. One team, one timeline, one signature.',
    background: 'paper',
    cols: '60px 200px 1fr 120px',
    headers: [
      { fr: 'id', en: 'id' },
      { fr: 'service', en: 'service' },
      { fr: 'description', en: 'description' },
      { fr: 'status', en: 'status' },
    ],
    rows: [
      {
        href: '/contact',
        cells: [
          { fr: '01', en: '01', role: 'id' },
          { fr: 'Acquisition', en: 'Acquisition', role: 'title' },
          { fr: 'Campagnes pilotées par les signaux CRM, budget réalloué chaque semaine.', en: 'Campaigns driven by CRM signals, budget reallocated weekly.', role: 'body' },
          { fr: '◉ active', en: '◉ active', role: 'status' },
        ],
      },
      {
        href: '/contact',
        cells: [
          { fr: '02', en: '02', role: 'id' },
          { fr: 'Contenu', en: 'Content', role: 'title' },
          { fr: 'Production éditoriale outillée IA, relue par un humain avant mise en ligne.', en: 'AI-assisted editorial production, human-reviewed before publishing.', role: 'body' },
          { fr: '◉ active', en: '◉ active', role: 'status' },
        ],
      },
      {
        href: '/contact',
        cells: [
          { fr: '03', en: '03', role: 'id' },
          { fr: 'CRM & sales ops', en: 'CRM & sales ops', role: 'title' },
          { fr: 'Scoring, relances et handoffs câblés directement dans votre pipeline.', en: 'Scoring, follow-ups and handoffs wired straight into your pipeline.', role: 'body' },
          { fr: '◉ active', en: '◉ active', role: 'status' },
        ],
      },
      {
        href: '/contact',
        cells: [
          { fr: '04', en: '04', role: 'id' },
          { fr: 'Analytics', en: 'Analytics', role: 'title' },
          { fr: 'Mesure unifiée : chaque action reliée au pipeline généré.', en: 'Unified measurement: every action tied to generated pipeline.', role: 'body' },
          { fr: '◉ active', en: '◉ active', role: 'status' },
        ],
      },
    ],
  };
