// Waimia · Co-location DS (Wave #38, T5) · module `system-flow` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'system-flow',
    background: 'ink',
    fig_num: 'Fig. 3.0',
    fig_title_fr: 'Architecture du système',
    fig_title_en: 'System architecture',
    meta_fr: 'PowerLoop · v1',
    meta_en: 'PowerLoop · v1',
    h2_fr: `Site → lead → scoring → CRM → <i class="acc">apprentissage</i>.`,
    h2_en: `Site → lead → scoring → CRM → <i class="acc">learning</i>.`,
    lede_fr: "Chaque maillon transforme une visite anonyme en signal exploitable, puis renvoie la donnée vers le site pour l'améliorer.",
    lede_en: 'Each link turns an anonymous visit into a usable signal, then feeds the data back to the site to improve it.',
    steps: [
      {
        title_fr: 'Site',
        title_en: 'Site',
        desc_fr: 'Pages rapides, contenu structuré, points de conversion clairs.',
        desc_en: 'Fast pages, structured content, clear conversion points.',
      },
      {
        title_fr: 'Lead magnet',
        title_en: 'Lead magnet',
        desc_fr: 'Ressource à valeur en échange d\'un contact qualifié.',
        desc_en: 'A valuable resource in exchange for a qualified contact.',
      },
      {
        title_fr: 'Scoring',
        title_en: 'Scoring',
        desc_fr: 'Intention lue, contact noté selon son comportement.',
        desc_en: 'Intent read, contact scored on behaviour.',
      },
      {
        title_fr: 'CRM',
        title_en: 'CRM',
        desc_fr: 'Contact enrichi, routé, alerte commerciale déclenchée.',
        desc_en: 'Contact enriched, routed, sales alert triggered.',
      },
      {
        title_fr: 'Amélioration',
        title_en: 'Improvement',
        desc_fr: 'Mesure → hypothèses → itérations. La boucle se referme.',
        desc_en: 'Measure → hypotheses → iterations. The loop closes.',
      },
    ],
    loop_label_fr: "boucle d'amélioration continue",
    loop_label_en: 'continuous improvement loop',
  };
