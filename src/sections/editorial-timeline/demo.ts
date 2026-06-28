// Waimia · Co-location DS (Wave #38, T5) · module `editorial-timeline` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-timeline',
    background: 'paper',
    eyebrow_fr: 'Notre méthode',
    eyebrow_en: 'Our method',
    title_fr: 'Quatre phases, du diagnostic au pilotage',
    title_en: 'Four phases, from diagnosis to steering',
    orientation: 'vertical',
    numbered: true,
    events: [
      { num: '01', title_fr: 'Cartographie', title_en: 'Mapping', meta_fr: '5 jours', meta_en: '5 days', body_fr: 'On lit le CRM existant, les sources de leads et les points de friction.', body_en: 'We read the existing CRM, the lead sources and the friction points.' },
      { num: '02', title_fr: 'Priorisation', title_en: 'Prioritization', meta_fr: '2 semaines', meta_en: '2 weeks', body_fr: 'On classe les segments par ROI et on choisit les premiers flux à automatiser.', body_en: 'We rank segments by ROI and pick the first flows to automate.' },
      { num: '03', title_fr: 'Mise en route', title_en: 'Rollout', meta_fr: '4 semaines', meta_en: '4 weeks', body_fr: 'On câble les agents, on connecte les outils et on valide chaque séquence.', body_en: 'We wire the agents, connect the tools and validate every sequence.', variant: 'highlight' },
      { num: '04', title_fr: 'Pilotage', title_en: 'Steering', meta_fr: 'En continu', meta_en: 'Ongoing', body_fr: 'Le pipeline tourne, on suit le ROI réel et on ajuste mois après mois.', body_en: 'The pipeline runs, we track real ROI and adjust month after month.' },
    ],
  };
