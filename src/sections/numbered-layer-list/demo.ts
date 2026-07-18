// Waimia · Co-location DS · module `numbered-layer-list` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'numbered-layer-list',
  srHeading_fr: 'Les couches du systeme',
  srHeading_en: 'The system layers',
  layers: [
    {
      n: '01',
      label_fr: 'Socle & donnees',
      label_en: 'Foundation & data',
      intro_fr: 'La base sur laquelle tout repose. On la pose proprement avant d’empiler.',
      intro_en: 'The base everything rests on. Laid cleanly before anything is stacked.',
      items: [
        { text_fr: 'Sources de donnees cadrees et documentees.', text_en: 'Data sources scoped and documented.' },
        { text_fr: 'Acces et permissions definis par role.', text_en: 'Access and permissions defined per role.' },
        { text_fr: 'Standards ouverts, zero captivite.', text_en: 'Open standards, zero lock-in.' },
      ],
    },
    {
      n: '02',
      label_fr: 'Orchestration',
      label_en: 'Orchestration',
      intro_fr: 'La couche qui relie les outils existants aux agents specialises.',
      intro_en: 'The layer wiring existing tools to specialised agents.',
      items: [
        { text_fr: 'Un agent par tache, pas un fourre-tout.', text_en: 'One agent per task, not a catch-all.' },
        { text_fr: 'Regles et garde-fous explicites.', text_en: 'Explicit rules and guardrails.' },
      ],
    },
    {
      n: '03',
      label_fr: 'Mesure',
      label_en: 'Measurement',
      intro_fr: 'On mesure avant et apres. Si ca ne mesure rien, ca n’existe pas.',
      intro_en: 'We measure before and after. If it measures nothing, it does not exist.',
      items: [
        { text_fr: 'Chaque action cle est tracee et attribuee.', text_en: 'Every key action is tracked and attributed.' },
        { text_fr: 'Reporting branche quand la mesure le justifie.', text_en: 'Reporting wired in when measurement justifies it.' },
      ],
    },
  ],
};
