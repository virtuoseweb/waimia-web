// Waimia · Co-location DS (Wave #38, T5) · module `metric-callout-band` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'metric-callout-band',
    background: 'ink',
    kicker_fr: 'Impact',
    kicker_en: 'Impact',
    context_fr: 'Sur la première année, nos clients réorientent leurs équipes vers le travail à forte valeur pendant que les agents absorbent le répétitif.',
    context_en: 'In the first year, our clients redirect their teams toward high-value work while agents absorb the repetitive load.',
    metrics: [
      { value: '-72%', label_fr: 'de temps de traitement', label_en: 'processing time' },
      { value: '14j', label_fr: 'jusqu’à la mise en production', label_en: 'to production' },
      { value: '+120', label_fr: 'workflows automatisés', label_en: 'automated workflows' },
    ],
  };
