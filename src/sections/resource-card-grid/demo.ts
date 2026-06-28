// Waimia · Co-location DS (Wave #38, T5) · module `resource-card-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'resource-card-grid',
    kicker_fr: '[ressources] · à télécharger',
    kicker_en: '[resources] · downloads',
    h2_fr: 'Des outils, pas des <i class="acc">brochures</i>.',
    h2_en: 'Tools, not <i class="acc">brochures</i>.',
    intro_fr: 'Modèles, cookbooks et audits prêts à l’emploi pour câbler vos premiers workflows IA.',
    intro_en: 'Templates, cookbooks and audits ready to wire your first AI workflows.',
    background: 'paper-2',
    columns: '3',
    resources: [
      { kind_fr: 'Livre blanc', kind_en: 'White paper', title_fr: 'IA-first revenue : le guide de câblage', title_en: 'AI-first revenue: the wiring guide', desc_fr: 'Le cadre complet pour relier acquisition, CRM et contenu.', desc_en: 'The full framework to connect acquisition, CRM and content.', format: 'PDF · 32 p', href: '/ressources', cta_label_fr: 'Télécharger', cta_label_en: 'Download', gated: true },
      { kind_fr: 'Cookbook', kind_en: 'Cookbook', title_fr: '12 workflows agents prêts à coller', title_en: '12 agent workflows ready to paste', desc_fr: 'Recettes éprouvées pour relances, triage et reporting.', desc_en: 'Battle-tested recipes for follow-ups, triage and reporting.', format: 'Notion', href: '/ressources', cta_label_fr: 'Ouvrir', cta_label_en: 'Open', gated: false },
      { kind_fr: 'Outil', kind_en: 'Tool', title_fr: 'Calculateur de ROI pipeline', title_en: 'Pipeline ROI calculator', desc_fr: 'Estimez le pipeline généré selon votre stack et maturité.', desc_en: 'Estimate generated pipeline from your stack and maturity.', format: 'Web', href: '/ressources', cta_label_fr: 'Lancer', cta_label_en: 'Launch', gated: false },
    ],
  };
