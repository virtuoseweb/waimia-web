// Waimia · Co-location DS · module `method-diagram-list` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'method-diagram-list',
  kicker_fr: '§ Méthode',
  kicker_en: '§ Method',
  title_fr: 'Comment je travaille',
  title_en: 'How I work',
  steps: [
    {
      title_fr: 'Cartographie',
      title_en: 'Mapping',
      body_fr: 'On regarde le métier réel, les frictions, les outils et les décisions déjà prises hors système.',
      body_en: 'We inspect the real work, friction, tools and decisions already made outside the system.',
    },
    {
      title_fr: 'Priorisation',
      title_en: 'Prioritisation',
      body_fr: 'On classe les workflows par ROI, risque opérationnel et capacité interne à les maintenir.',
      body_en: 'We rank workflows by ROI, operational risk and internal ability to maintain them.',
    },
    {
      title_fr: 'Mesure',
      title_en: 'Measurement',
      body_fr: 'Chaque workflow a sa métrique avant/après : temps gagné, coûts évités, qualité produite.',
      body_en: 'Every workflow gets a before/after metric: time saved, costs avoided, quality produced.',
    },
  ],
};
