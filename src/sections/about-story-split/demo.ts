// Waimia · Co-location DS (Wave #38, T5) · module `about-story-split` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'about-story-split',
    background: 'paper-2',
    kicker_fr: 'Notre histoire',
    kicker_en: 'Our story',
    h2_fr: 'Née d’une <i>conviction</i> simple',
    h2_en: 'Born from one <i>simple</i> conviction',
    paragraphs_fr: [
      'Waimia est née d’un constat partagé chez nos clients : l’IA générait beaucoup de démonstrations et très peu de résultats en production.',
      'Nous avons décidé de prendre le problème par l’autre bout. Pas un outil de plus, mais des agents conçus pour s’intégrer à vos process existants et tourner en continu.',
      'Aujourd’hui, nos agents traitent des milliers de décisions par jour pour des équipes qui ont arrêté de choisir entre vitesse et contrôle.',
    ],
    paragraphs_en: [
      'Waimia was born from a pattern we saw across our clients: AI produced plenty of demos and very few results in production.',
      'We decided to tackle the problem from the other end. Not one more tool, but agents designed to fit your existing processes and run continuously.',
      'Today our agents handle thousands of decisions a day for teams that stopped choosing between speed and control.',
    ],
    aside_title_fr: 'Quelques jalons',
    aside_title_en: 'A few milestones',
    milestones: [
      { year: '2022', label_fr: 'Premier agent mis en production chez un client industriel', label_en: 'First agent shipped to production for an industrial client' },
      { year: '2023', label_fr: 'Lancement de la plateforme d’orchestration d’agents', label_en: 'Launch of the agent orchestration platform' },
      { year: '2024', label_fr: '50 workflows agentiques déployés, hébergement souverain UE', label_en: '50 agentic workflows deployed, EU sovereign hosting' },
      { year: '2025', label_fr: 'Plus de 120 agents en exploitation continue', label_en: 'Over 120 agents in continuous operation' },
    ],
  };
