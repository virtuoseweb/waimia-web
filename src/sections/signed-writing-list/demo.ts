// Waimia · Co-location DS · module `signed-writing-list` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'signed-writing-list',
  kicker_fr: '§ Essays · Long form',
  kicker_en: '§ Essays · Long form',
  title_fr: 'Ce que je publie',
  title_en: 'What I publish',
  items: [
    {
      date_iso: '2026-05-12T00:00:00.000Z',
      title_fr: 'Câbler l’IA aux outils métier, sans théâtre',
      title_en: 'Wiring AI to business tools, without theatre',
      href: '/blog/cabler-ia-outils-metier',
      excerpt_fr: 'Pourquoi la plupart des projets IA échouent au moment du branchement, et comment l’éviter.',
      excerpt_en: 'Why most AI projects fail at the wiring stage, and how to avoid it.',
    },
    {
      date_iso: '2026-03-04T00:00:00.000Z',
      title_fr: 'Le système d’acquisition avant l’outil',
      title_en: 'The acquisition system before the tool',
      href: '/blog/systeme-acquisition-avant-outil',
    },
  ],
};
