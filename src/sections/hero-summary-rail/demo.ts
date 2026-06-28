// Waimia · Co-location DS (Wave #38, T5) · module `hero-summary-rail` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-summary-rail',
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
    summary: [
      { tag_fr: '§ A · Méthode', tag_en: '§ A · Method', title_fr: 'Diagnostic, intégration, run', title_en: 'Diagnostic, integration, run', sub_fr: 'Trois temps, un cadre clair.', sub_en: 'Three phases, one clear frame.' },
      { tag_fr: '§ B · Délai', tag_en: '§ B · Timeline', title_fr: 'Premier flux en 5 jours', title_en: 'First flow in 5 days', sub_fr: "De l'atelier à la production.", sub_en: 'From workshop to production.' },
      { tag_fr: '§ C · Garantie', tag_en: '§ C · Guarantee', title_fr: 'Souveraineté des données', title_en: 'Data sovereignty', sub_fr: '100 % chez vous, rien chez un tiers.', sub_en: '100% with you, nothing to a third party.' },
    ],
  };
