// Waimia · Co-location DS (Wave #38, T5) · module `feature-split-media` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-split-media',
    background: 'paper',
    reversed: false,
    layout: 'split-2-1',
    kicker_fr: 'Orchestration',
    kicker_en: 'Orchestration',
    h2_fr: 'Une console pour <i>piloter</i> vos agents',
    h2_en: 'One console to <i>steer</i> your agents',
    body_fr: 'Suivez chaque décision, reprenez la main quand il le faut, ajustez les règles sans toucher au code. La supervision reste humaine, l’exécution devient continue.',
    body_en: 'Track every decision, take back control when needed, adjust the rules without touching code. Supervision stays human, execution becomes continuous.',
    points: [
      { label_fr: 'Journal de décisions traçable et exportable', label_en: 'Traceable, exportable decision log' },
      { label_fr: 'Reprise humaine en un clic sur tout workflow', label_en: 'One-click human takeover on any workflow' },
      { label_fr: 'Règles métier éditables sans déploiement', label_en: 'Business rules editable without a deploy' },
    ],
    media_src: '/media/feature-console.svg',
    media_alt_fr: 'Capture de la console d’orchestration des agents Waimia',
    media_alt_en: 'Screenshot of the Waimia agent orchestration console',
    media_caption_fr: 'Console d’orchestration · vue supervision',
    media_caption_en: 'Orchestration console · supervision view',
    cta_label_fr: 'Voir une démo',
    cta_label_en: 'See a demo',
    cta_href: '/contact?demo=console',
  };
