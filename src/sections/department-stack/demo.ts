// Waimia · Co-location DS (Wave #38, T5) · module `department-stack` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'department-stack',
    eyebrow_fr: '§ Stack outils',
    eyebrow_en: '§ Tool stack',
    h2_fr: '<i>Outils</i><br/>déployés',
    h2_en: 'Tools<br/><i>deployed</i>',
    aside_fr: 'Le triptyque Anthropic primary + intégrations métier secondary + open source pour l\'orchestration.',
    aside_en: 'The triptych: Anthropic primary + business integrations secondary + open source for orchestration.',
    caption_fr: 'Stack typique · Finance & Comptabilité',
    caption_en: 'Typical stack · Finance & Accounting',
    columns_fr: ['Catégorie', 'Outil', 'Rôle'],
    columns_en: ['Category', 'Tool', 'Role'],
    rows: [
      { category_fr: 'Modèle raisonnement', category_en: 'Reasoning model', tool: 'Claude Sonnet 4.6', role_fr: 'Mémos, analyses et synthèses financières', role_en: 'Memos, analyses and financial synthesis' },
      { category_fr: 'Modèle volume', category_en: 'Volume model', tool: 'Claude Haiku 4.5', role_fr: 'Réconciliation, extraction et déduplication', role_en: 'Reconciliation, extraction and deduplication' },
      { category_fr: 'ERP', category_en: 'ERP', tool: 'SAP / Sage / NetSuite', role_fr: 'Source des écritures et du grand livre', role_en: 'Source of entries and the general ledger' },
      { category_fr: 'Orchestration', category_en: 'Orchestration', tool: 'LangGraph open-source', role_fr: 'Workflows durables et transférables', role_en: 'Durable and transferable workflows' },
    ],
  };
