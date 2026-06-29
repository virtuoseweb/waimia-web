// Waimia · Co-location DS (Wave #38, T5) · module `editorial-write-feed` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-write-feed',
    kicker_fr: '[writing] · notes & changelog',
    kicker_en: '[writing] · field notes & changelog',
    meta_label_fr: '/feed.xml',
    meta_label_en: '/feed.xml',
    meta_href: '/blog',
    title_fr: 'Notes de <i>terrain</i>, lentement.',
    title_en: 'Field <i>notes</i>, slowly.',
    tone: 'paper',
    items: [
      { date: '2026-04-18', tag_fr: 'Note terrain', tag_en: 'Field note', text_fr: 'Le pipeline a livré 18 % de plus avant le café.', text_en: 'The pipeline shipped 18% more before coffee.', href: '/blog' },
      { date: '2026-04-02', tag_fr: 'Changelog', tag_en: 'Changelog', text_fr: 'VirtuoseOS 2.4 : audit trail signé sur chaque action agent.', text_en: 'VirtuoseOS 2.4: signed audit trail on every agent action.', href: '/blog' },
      { date: '2026-03-21', tag_fr: 'Note terrain', tag_en: 'Field note', text_fr: 'Un scoring honnête vaut mieux que trois dashboards flatteurs.', text_en: 'One honest scoring beats three flattering dashboards.', href: '/blog' },
      { date: '2026-03-04', tag_fr: 'Essai', tag_en: 'Essay', text_fr: 'Pourquoi le goulot n\'est jamais le modèle : rails, règles, relecture.', text_en: 'Why the bottleneck is never the model: rails, rules, review.', href: '/blog' },
    ],
  };
