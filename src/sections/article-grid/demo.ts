// Waimia · Co-location DS (Wave #38, T5) · module `article-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'article-grid',
    kicker_fr: '[journal] · notes & analyses',
    kicker_en: '[journal] · notes & analysis',
    h2_fr: 'Ce qu&rsquo;on apprend, on l&rsquo;<i class="acc">écrit</i>.',
    h2_en: 'What we learn, we <i class="acc">write</i> down.',
    intro_fr: 'Retours de terrain sur l’IA appliquée au revenue : acquisition, contenu, CRM. Sans hype, avec les chiffres.',
    intro_en: 'Field reports on AI applied to revenue: acquisition, content, CRM. No hype, with the numbers.',
    background: 'paper',
    columns: '3',
    articles: [
      { tag_fr: 'Acquisition', tag_en: 'Acquisition', title_fr: 'Réallouer un budget média chaque semaine sans casser le pipeline', title_en: 'Reallocating media budget weekly without breaking the pipeline', excerpt_fr: 'Le scoring CRM décide, pas le sentiment. Comment on câble la boucle.', excerpt_en: 'CRM scoring decides, not gut feeling. How we wire the loop.', date: '2026-04-18', read_time_fr: '6 min', read_time_en: '6 min', author: 'Léa Marchand', href: '/blog' },
      { tag_fr: 'Contenu', tag_en: 'Content', title_fr: 'Un humain relit chaque ligne : pourquoi la relecture reste le goulot', title_en: 'A human reviews every line: why review stays the bottleneck', excerpt_fr: 'La production outillée IA ne supprime pas le jugement éditorial.', excerpt_en: 'AI-assisted production does not remove editorial judgement.', date: '2026-04-02', read_time_fr: '8 min', read_time_en: '8 min', author: 'Tomás Riveiro', href: '/blog' },
      { tag_fr: 'CRM', tag_en: 'CRM', title_fr: 'Scoring honnête contre dashboards flatteurs : le test du vendredi', title_en: 'Honest scoring versus flattering dashboards: the Friday test', excerpt_fr: 'Trois métriques qui survivent à un comité, et celles qui mentent.', excerpt_en: 'Three metrics that survive a board, and the ones that lie.', date: '2026-03-21', read_time_fr: '5 min', read_time_en: '5 min', author: 'Léa Marchand', href: '/blog' },
    ],
  };
