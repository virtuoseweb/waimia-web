// Waimia · Co-location DS (#80) · module `hover-reveal-words` · démo bilingue.
// Prose éditoriale B2B IA + mots déclencheurs mappés à des assets duotone réels (fond paper).
// Chaque `word_*` apparaît TEL QUEL dans `prose_*` (le composant l'enveloppe au runtime).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'hover-reveal-words',
  background: 'paper',
  contentAlign: 'start',
  measure: 'read',
  thumbRatio: '4-3',
  proseScale: 'lede',
  kicker_fr: 'Notre conviction',
  kicker_en: 'What we believe',
  prose_fr:
    "L'intelligence artificielle ne remplace pas votre métier, elle le prolonge. Bien posée, elle transforme la stratégie en exécution, fait gagner du temps là où il compte, et rend chaque décision plus nette. Mal posée, elle ajoute du bruit. Notre travail est de construire le dispositif qui sert vraiment votre équipe.",
  prose_en:
    'Artificial intelligence does not replace your craft, it extends it. Set up well, it turns strategy into execution, saves time where it matters, and makes every decision sharper. Set up badly, it just adds noise. Our job is to build the system that genuinely serves your team.',
  triggers: [
    {
      word_fr: 'stratégie',
      word_en: 'strategy',
      media_src: '/images/illustrations/ds/chess-paper.webp',
      media_alt_fr: 'Stratégie posée comme un jeu d\'échecs',
      media_alt_en: 'Strategy framed like a chess game',
    },
    {
      word_fr: 'temps',
      word_en: 'time',
      media_src: '/images/illustrations/ds/car-on-the-road-paper.webp',
      media_alt_fr: 'Gagner du temps sur la route',
      media_alt_en: 'Saving time on the road',
    },
    {
      word_fr: 'décision',
      word_en: 'decision',
      media_src: '/images/illustrations/ds/no-no-yes-paper.webp',
      media_alt_fr: 'Une décision nette, oui plutôt que non',
      media_alt_en: 'A sharp decision, yes over no',
    },
    {
      word_fr: 'équipe',
      word_en: 'team',
      media_src: '/images/illustrations/ds/men-on-hand-paper.webp',
      media_alt_fr: 'Une équipe qui avance ensemble',
      media_alt_en: 'A team moving forward together',
    },
  ],
};
