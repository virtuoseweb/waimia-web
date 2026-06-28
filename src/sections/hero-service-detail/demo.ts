// Waimia · Co-location DS (Wave #38, T5) · module `hero-service-detail` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-service-detail',
    service_num: '03.1',
    h1_fr: "Un <i>funnel</i> réconcilié. Une vérité. Pas d'atelier.",
    h1_en: 'A reconciled <i>funnel</i>. One truth. No workshop.',
    lede_fr:
      'Un chantier de 8 à 12 semaines. CRM, entrepôt, finance alignés sur une seule source de vérité. Des agents Claude qui trient, qualifient et routent, de façon auditable, sans boîte noire, sans chatbot.',
    lede_en:
      'An 8 to 12-week engagement. CRM, warehouse, and finance aligned on a single source of truth. Claude agents that sort, qualify, and route, auditable, no black box, no chatbot.',
    metrics: [
      { value: '94 j', label_fr: 'cycle deal initial', label_en: 'initial deal cycle', emphasis: true },
      { value: '18 %', label_fr: 'taux SQL→Deal', label_en: 'SQL→Deal rate', emphasis: false },
      { value: '8-12 sem.', label_fr: 'time-to-prod', label_en: 'time-to-production', emphasis: false },
    ],
  };
