// Waimia · Co-location DS (Wave #38, T5) · module `persona-attributes-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'persona-attributes-grid',
    blocks: [
      {
        kicker_fr: '§ Pain points',
        kicker_en: '§ Pain points',
        items_fr: ['Trop de données dispersées pour décider vite.', 'CRM rempli mais peu exploité.', 'Priorités IA floues côté direction.'],
        items_en: ['Too much scattered data to decide quickly.', 'CRM is filled but underused.', 'AI priorities remain unclear at leadership level.'],
      },
      {
        kicker_fr: '§ Critères de décision',
        kicker_en: '§ Decision criteria',
        items_fr: ['ROI visible en moins de 90 jours.', 'Gouvernance claire des accès et données.', 'Adoption terrain sans formation lourde.'],
        items_en: ['Visible ROI in under 90 days.', 'Clear governance for access and data.', 'Field adoption without heavy training.'],
      },
      {
        kicker_fr: '§ Objections',
        kicker_en: '§ Objections',
        items_fr: ['Nous avons déjà testé ChatGPT.', 'Notre stack est trop spécifique.', 'Les équipes n’ont pas le temps.'],
        items_en: ['We already tried ChatGPT.', 'Our stack is too specific.', 'Teams do not have time.'],
      },
      {
        kicker_fr: '§ Proof points',
        kicker_en: '§ Proof points',
        items_fr: ['Audit en 5 jours.', 'Runbook transmis.', 'Mesure avant/après intégrée au projet.'],
        items_en: ['Audit in 5 days.', 'Runbook transferred.', 'Before/after measurement built into the project.'],
      },
    ],
    meta: [
      { kicker_fr: '§ Budget', kicker_en: '§ Budget', value_fr: '5 à 35 K€', value_en: '€5K to €35K' },
      { kicker_fr: '§ Timeline', kicker_en: '§ Timeline', value_fr: '5 jours à 8 semaines', value_en: '5 days to 8 weeks' },
      { kicker_fr: '§ Taille entreprise', kicker_en: '§ Company size', value_fr: 'PME · ETI marketing', value_en: 'SMB · mid-market marketing' },
    ],
  };
