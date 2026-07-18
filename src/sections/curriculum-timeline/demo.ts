// Waimia · Co-location DS · module `curriculum-timeline` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'curriculum-timeline',
  kicker_fr: '§ Curriculum',
  kicker_en: '§ Curriculum',
  title_fr: 'Curriculum',
  title_en: 'Curriculum',
  emphasis: true,
  events: [
    {
      num: '2024',
      title_fr: 'Fondateur',
      title_en: 'Founder',
      meta_fr: 'Waimia',
      meta_en: 'Waimia',
      body_fr: 'Studio d’IA appliquée : câbler les systèmes d’acquisition et opérationnels des entreprises.',
      body_en: 'Applied AI studio: wiring the acquisition and operational systems of companies.',
    },
    {
      num: '2021',
      title_fr: 'Lead ingénierie',
      title_en: 'Engineering lead',
      meta_fr: 'Scale-up SaaS',
      meta_en: 'SaaS scale-up',
      body_fr: 'Industrialisation des workflows data et automatisation interne.',
      body_en: 'Industrialising data workflows and internal automation.',
    },
  ],
};
