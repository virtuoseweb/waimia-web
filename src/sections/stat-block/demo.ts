// Waimia · Co-location DS (Wave #38, T5) · module `stat-block` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'stat-block',
    background: 'ink',
    h2_fr: 'Signal <i>terrain</i>',
    h2_en: 'Field <i>signal</i>',
    quote_fr: "En cinq jours, nous avions un workflow déployé et un plan d'action validé par le comité.",
    quote_en: 'Within five days, we had a deployed workflow and an action plan approved by the committee.',
    cite_fr: 'Direction des opérations · Cabinet conseil B2B',
    cite_en: 'Operations lead · B2B consulting firm',
    metrics: [
      { value: '5 j', label_fr: 'pour cibler le levier', label_en: 'to pinpoint the lever', emphasis: true },
      { value: '4 sem.', label_fr: 'au premier workflow', label_en: 'to first workflow', emphasis: false },
      { value: '1', label_fr: 'interlocuteur unique', label_en: 'single point of contact', emphasis: false },
      { value: 'Mesuré', label_fr: 'ROI, jamais estimé', label_en: 'ROI, never estimated', emphasis: false },
    ],
    layout: 'split-quote',
  };
