// Waimia · Co-location DS (Wave #38, T5) · module `editorial-prose` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-prose',
    background: 'paper',
    maxWidth: 'prose',
    // Le contenu vient d'un <slot/> (corps MDX `<Content />`) : la demo catalogue
    // n'a pas de champ texte. Le preview rend un wrapper vide tokenisé.
  };
