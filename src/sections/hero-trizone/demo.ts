// Waimia · Co-location DS (Wave #38, T5) · module `hero-trizone` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-trizone',
    kicker_fr: '§ 01 · Service',
    kicker_en: '§ 01 · Service',
    h1_fr: `L'IA <i class="acc">intégrée</i> à vos opérations, <i>sans friction</i>.`,
    h1_en: `AI <i class="acc">woven into</i> your operations, <i>frictionless</i>.`,
    lede_fr: `On installe Claude Code dans vos outils, vos données et vos flux. Vos équipes gardent la main, <i>l'IA fait le reste</i>.`,
    lede_en: `We embed Claude Code into your tools, your data and your flows. Your teams stay in control, <i>AI handles the rest</i>.`,
    cta_sub_fr: `Réponse sous 48 h. <i>Sans engagement.</i>`,
    cta_sub_en: `Reply within 48 h. <i>No commitment.</i>`,
    cta_primary: { label_fr: 'Démarrer un diagnostic', label_en: 'Start a diagnostic', href: '/contact', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#methode', variant: 'ghost' },
    minimap: [
      { label_fr: 'Acquisition', label_en: 'Acquisition', items_fr: 'SEA · SEO · Ads', items_en: 'SEA · SEO · Ads' },
      { label_fr: 'Contenu', label_en: 'Content', items_fr: 'Brief · Rédaction · SEO', items_en: 'Brief · Copy · SEO' },
      { label_fr: 'Web', label_en: 'Web', items_fr: 'Sites · Apps · CMS', items_en: 'Sites · Apps · CMS' },
      { label_fr: 'Sales', label_en: 'Sales', items_fr: 'CRM · Séquences · Scoring', items_en: 'CRM · Sequences · Scoring' },
      { label_fr: 'Data', label_en: 'Data', items_fr: 'Tracking · Dashboards', items_en: 'Tracking · Dashboards' },
      { label_fr: 'Marque', label_en: 'Brand', items_fr: 'DA · Charte · Design system', items_en: 'Art direction · Guidelines · Design system' },
    ],
    kpis: [
      { num: '+12 h', cap_fr: 'gagnées par semaine et par équipe', cap_en: 'saved per week and per team' },
      { num: '100 %', cap_fr: 'de vos données restent chez vous', cap_en: 'of your data stays with you' },
    ],
  };
