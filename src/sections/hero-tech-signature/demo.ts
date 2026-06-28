// Waimia · Co-location DS (Wave #38, T5) · module `hero-tech-signature` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-tech-signature',
    kicker_fr: '§ 01 · Service',
    kicker_en: '§ 01 · Service',
    h1_fr: `L'IA <i class="acc">intégrée</i> à vos<br />opérations, <i>sans friction</i>.`,
    h1_en: `AI <i class="acc">woven into</i> your<br />operations, <i>frictionless</i>.`,
    lede_fr: `On installe Claude Code dans vos outils, vos données et vos flux. Vos équipes gardent la main, <i>l'IA fait le reste</i>.`,
    lede_en: `We embed Claude Code into your tools, your data and your flows. Your teams stay in control, <i>AI handles the rest</i>.`,
    cta_sub_fr: `Réponse sous 48 h. <i>Sans engagement.</i>`,
    cta_sub_en: `Reply within 48 h. <i>No commitment.</i>`,
    cta_primary: { label_fr: 'Démarrer un diagnostic', label_en: 'Start a diagnostic', href: '/contact', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#methode', variant: 'ghost' },
    kpis: [
      { num: '+12 h', cap_fr: 'gagnées par semaine et par équipe', cap_en: 'saved per week and per team' },
      { num: '5 j', cap_fr: 'pour le premier flux en production', cap_en: 'to the first flow in production' },
    ],
  };
