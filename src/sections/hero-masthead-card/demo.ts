// Waimia · Co-location DS (Wave #38, T5) · module `hero-masthead-card` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-masthead-card',
    kicker_fr: '§ 01 · Service',
    kicker_en: '§ 01 · Service',
    h1_fr: `L'IA <i class="acc">intégrée</i> à vos<br />opérations, <i>sans friction</i>.`,
    h1_en: `AI <i class="acc">woven into</i> your<br />operations, <i>frictionless</i>.`,
    lede_fr: `On installe Claude Code dans vos outils, vos données et vos flux. Vos équipes gardent la main, <i>l'IA fait le reste</i>.`,
    lede_en: `We embed Claude Code into your tools, your data and your flows. Your teams stay in control, <i>AI handles the rest</i>.`,
    badges: [
      { label_fr: 'Claude Code', label_en: 'Claude Code' },
      { label_fr: 'MCP', label_en: 'MCP' },
      { label_fr: 'RAG', label_en: 'RAG' },
      { label_fr: 'Automations', label_en: 'Automations' },
    ],
    cta_sub_fr: `Réponse sous 48 h. <i>Sans engagement.</i>`,
    cta_sub_en: `Reply within 48 h. <i>No commitment.</i>`,
    cta_primary: { label_fr: 'Démarrer un diagnostic', label_en: 'Start a diagnostic', href: '/contact', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#methode', variant: 'ghost' },
    media_src: '/images/line-art/dispositif-flow.svg',
    media_alt_fr: "Schéma du dispositif d'intégration",
    media_alt_en: 'Diagram of the integration setup',
    kpis: [
      { num: '5 j', cap_fr: 'premier flux en prod', cap_en: 'first flow in production' },
      { num: '100 %', cap_fr: 'données chez vous', cap_en: 'data stays with you' },
    ],
  };
