// Waimia · Co-location DS (Wave #38, T5) · module `journey-steps` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'journey-steps',
    background: 'paper',
    kicker_fr: 'Le parcours',
    kicker_en: 'The journey',
    h2_fr: 'Du brief à la <i class="acc">publication</i>',
    h2_en: 'From brief to <i class="acc">publish</i>',
    steps: [
      { icon: '🔍', title_fr: 'Audit', title_en: 'Audit', body_fr: 'On cartographie vos pages, vos mots-clés et vos signaux IA pour viser juste.', body_en: 'We map your pages, keywords and AI signals to aim precisely.', highlight_fr: 'Étape 1', highlight_en: 'Step 1' },
      { icon: '✍️', title_fr: 'Production assistée', title_en: 'Assisted production', body_fr: 'Les agents rédigent les premières versions, vous gardez la ligne éditoriale.', body_en: 'Agents draft first versions, you keep the editorial line.', highlight_fr: 'Étape 2', highlight_en: 'Step 2' },
      { icon: '🚀', title_fr: 'Relecture et publication', title_en: 'Review and publish', body_fr: 'Un humain valide, le contenu part en ligne et la mesure démarre aussitôt.', body_en: 'A human validates, content goes live and measurement starts at once.', highlight_fr: 'Étape 3', highlight_en: 'Step 3' },
    ],
  };
