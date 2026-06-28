// Waimia · Co-location DS (Wave #38, T5) · module `diagnostic-stages` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'diagnostic-stages',
    background: 'paper-2',
    kicker_fr: 'Auto-diagnostic',
    kicker_en: 'Self-assessment',
    h2_fr: 'Où en <i>êtes-vous</i> ?',
    h2_en: 'Where do <i>you</i> stand?',
    lede_fr: 'Situez votre organisation sur la trajectoire d’adoption des agents IA, puis choisissez la prochaine étape concrète.',
    lede_en: 'Place your organisation on the AI-agent adoption path, then pick the next concrete step.',
    stages: [
      { glyph: '○', title_fr: 'Curiosité', title_en: 'Curiosity', body_fr: 'Vous explorez l’IA générative en ordre dispersé, sans cas d’usage prioritaire.', body_en: 'You explore generative AI in a scattered way, without a priority use case.', phase_fr: 'Phase 0', phase_en: 'Phase 0' },
      { glyph: '◔', title_fr: 'Premiers tests', title_en: 'First trials', body_fr: 'Quelques prompts manuels en production, mais rien d’industrialisé ni de mesuré.', body_en: 'A few manual prompts in production, but nothing industrialised or measured.', phase_fr: 'Phase 1', phase_en: 'Phase 1' },
      { glyph: '◑', title_fr: 'Premier agent', title_en: 'First agent', body_fr: 'Un agent tourne sur un workflow ciblé, avec des résultats que vous suivez déjà.', body_en: 'One agent runs on a targeted workflow, with results you already track.', phase_fr: 'Phase 2', phase_en: 'Phase 2', current: true },
      { glyph: '◕', title_fr: 'Mise à l’échelle', title_en: 'Scaling', body_fr: 'Plusieurs agents en production, une gouvernance et une trace de chaque décision.', body_en: 'Several agents in production, governance and a trace for every decision.', phase_fr: 'Phase 3', phase_en: 'Phase 3' },
      { glyph: '●', title_fr: 'Organisation augmentée', title_en: 'Augmented org', body_fr: 'Vos équipes composent leurs propres agents, l’IA est un réflexe de chaque métier.', body_en: 'Your teams compose their own agents, AI is a reflex across every function.', phase_fr: 'Phase 4', phase_en: 'Phase 4', href: '/agence' },
    ],
  };
