// Waimia · Co-location DS (Wave #38, T5) · module `stat-counter` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'stat-counter',
    background: 'ink',
    kicker_fr: 'Impact mesuré',
    kicker_en: 'Measured impact',
    h2_fr: 'Ce que produisent <i>nos agents</i>',
    h2_en: 'What <i>our agents</i> deliver',
    animate: true,
    stats: [
      { value: '99.9', suffix: '%', label_fr: 'disponibilité moyenne', label_en: 'average uptime' },
      { value: '120', prefix: '+', label_fr: 'workflows automatisés', label_en: 'automated workflows' },
      { value: '40', suffix: '%', label_fr: 'coûts opérationnels en moins', label_en: 'lower operating cost' },
      { value: '4.8', suffix: '/5', label_fr: 'satisfaction client', label_en: 'client satisfaction' },
    ],
  };
