// Waimia · Co-location DS (Wave #38, T5) · module `editorial-prose` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-prose',
    background: 'paper',
    maxWidth: 'prose',
    // Le contenu textuel vient d'un <slot/> (corps MDX `<Content />`) : la demo catalogue
    // n'a pas de champ texte. Le preview rend le wrapper tokenise + les figures duotone
    // flottantes (le seul aspect visible hors slot sur la fiche /library/editorial-prose).
    figures: [
      {
        src: '/images/illustrations/ds/woman-and-people-paper.webp',
        alt_fr: 'Illustration : une intervenante face a un groupe',
        alt_en: 'Illustration: a speaker facing a group',
        side: 'right',
      },
    ],
  };
