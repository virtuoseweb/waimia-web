// Waimia · Co-location DS (Wave #38, T5) · module `architecture-diagram` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'architecture-diagram',
    fig_num: 'FIG II · 2.5',
    fig_title_fr: "L'architecture du système",
    fig_title_en: 'System architecture',
    spec_fr: 'CANAUX · SYSTÈME · ACTIONS',
    spec_en: 'CHANNELS · SYSTEM · ACTIONS',
    h2_fr: 'Une seule <i>architecture</i>.<br/>Six entrées, quatre sorties, mille décisions.',
    h2_en: 'One <i>architecture</i>.<br/>Six inputs, four outputs, a thousand decisions.',
    inputs_fr: ['Ads', 'Contenu', 'Site', 'CRM', 'Analytics', 'Marque'],
    inputs_en: ['Ads', 'Content', 'Site', 'CRM', 'Analytics', 'Brand'],
    outputs_fr: ['Actions', 'Supports', 'Reporting', 'Pipeline'],
    outputs_en: ['Actions', 'Assets', 'Reports', 'Pipeline'],
    system_label: 'Waimia',
    system_kicker: 'AI SYSTEM',
    system_subtitle: 'multi-agent',
    show_loop: true,
    loop_label_fr: "BOUCLE D'AMÉLIORATION CONTINUE",
    loop_label_en: 'CONTINUOUS IMPROVEMENT LOOP',
    caption_fr: "Six canaux entrent. Quatre familles d'<i>actions</i> sortent. Au milieu, un système multi-agents qui mesure, apprend et réinjecte, sans relance manuelle.",
    caption_en: 'Six channels in. Four families of <i>actions</i> out. In between, a multi-agent system that measures, learns and reinjects, without manual chasing.',
  };
