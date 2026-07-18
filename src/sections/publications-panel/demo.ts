// Waimia · Co-location DS · module `publications-panel` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'publications-panel',
  kicker_fr: '§ Publications',
  kicker_en: '§ Publications',
  title_fr: 'Articles, notes, manifestes',
  title_en: 'Articles, notes, manifestos',
  manifesto_html_fr:
    'Pas une stack. Un système. Pas un agent isolé. Une équipe d’agents.<br />Pas une démo. Une mise en production.',
  manifesto_html_en:
    'Not a stack. A system. Not a lone agent. A team of agents.<br />Not a demo. A production release.',
  publications: [
    { title: 'Wiring AI into legacy CRMs', url: 'https://example.com/talk', venue: 'AI Ops Summit', year: '2025' },
  ],
  resources: [
    {
      date_iso: '2026-05-12T00:00:00.000Z',
      title_fr: 'Câbler l’IA aux outils métier',
      title_en: 'Wiring AI to business tools',
      href: '/blog/cabler-ia-outils-metier',
      tag_fr: 'Notes',
      tag_en: 'Notes',
    },
  ],
  all_href: '/ressources',
  all_label_fr: 'Voir toutes les ressources',
  all_label_en: 'See all resources',
};
