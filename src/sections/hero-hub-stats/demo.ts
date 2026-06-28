// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-stats` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-hub-stats',
    meta_kicker_fr: 'Hub · Pilier Entreprise',
    meta_kicker_en: 'Hub · Enterprise pillar',
    hub_num: '02',
    h1_fr: 'Refondre le <i>delivery</i>.<br/>Pas l\'organigramme.',
    h1_en: 'Rebuild <i>delivery</i>.<br/>Not the org chart.',
    lede_fr: 'Câbler l\'IA dans vos workflows existants, sans déplacer un poste, sans changer un outil.',
    lede_en: 'Wire AI into your existing workflows, no role moved, no tool replaced.',
    stats: [
      { value: '5 j', label_fr: 'pour cibler le levier', label_en: 'to pinpoint the lever', emphasis: false },
      { value: '4 sem.', label_fr: 'au premier workflow', label_en: 'to first workflow', emphasis: true },
      { value: '0', label_fr: 'ateliers vendus', label_en: 'workshops sold', emphasis: false },
      { value: '1', label_fr: 'interlocuteur unique', label_en: 'single point of contact', emphasis: false },
    ],
  };
