// Waimia · Co-location DS (Wave #38, T5) · module `tech-when-dual` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'tech-when-dual',
    kicker_fr: 'Aide décision',
    kicker_en: 'Decision aid',
    title_fr: '<i>Quand</i><br/>l\'utiliser ?',
    title_en: 'When<br/>to <i>use</i> it?',
    aside_fr: 'Deux colonnes pour trancher, sans dogme.',
    aside_en: 'Two columns to decide, without dogma.',
    use_title_fr: 'Utiliser quand',
    use_title_en: 'Use when',
    use_items_fr: [
      'Vous avez besoin d un instruction following strict',
      'La sécurité et la gouvernance des données sont critiques',
      'Vous analysez des documents longs (plus de 50 pages)',
    ],
    use_items_en: [
      'You need strict instruction following',
      'Data security and governance are critical',
      'You analyze long documents (over 50 pages)',
    ],
    avoid_title_fr: 'Considérer autre chose quand',
    avoid_title_en: 'Consider otherwise when',
    avoid_items_fr: [
      'Le besoin est purement temps réel ultra-basse latence',
      'Le budget exclut tout modèle frontier',
    ],
    avoid_items_en: [
      'The need is purely real-time ultra-low latency',
      'The budget excludes any frontier model',
    ],
  };
