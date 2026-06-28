// Waimia · Co-location DS (Wave #38, T5) · module `tech-capabilities-specs` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'tech-capabilities-specs',
    kicker_fr: 'Capacités',
    kicker_en: 'Capabilities',
    title_fr: '<i>Inventaire</i><br/>technique',
    title_en: 'Technical<br/><i>inventory</i>',
    aside_fr: 'Les capacités exploitées en production, pas la liste marketing.',
    aside_en: 'The capabilities used in production, not the marketing list.',
    capabilities: [
      { name_fr: 'Raisonnement long et complexe', name_en: 'Long and complex reasoning', description_fr: 'Chaînes de pensée structurées sur problèmes multi-étapes.', description_en: 'Structured reasoning chains on multi-step problems.', status: 'active' },
      { name_fr: 'Suivi d\'instructions précis', name_en: 'Precise instruction following', description_fr: 'Respect strict des contraintes formelles et règles métier.', description_en: 'Strict compliance with formal constraints and business rules.', status: 'active' },
      { name_fr: 'Constitutional AI natif', name_en: 'Native Constitutional AI', description_fr: 'Alignement par principes intégrés au training, traçabilité.', description_en: 'Principle-based alignment built into training, traceability.', status: 'active' },
    ],
  };
