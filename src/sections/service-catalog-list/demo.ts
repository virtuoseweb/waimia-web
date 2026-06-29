// Waimia · Co-location DS (Wave #38, T5) · module `service-catalog-list` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'service-catalog-list',
    roman: 'II',
    label_fr: '§ 02 - Catalogue conseil',
    label_en: '§ 02 - Advisory catalogue',
    heading_fr: 'Quatre <i>chantiers</i>. Un seul standard.',
    heading_en: 'Four <i>engagements</i>. One standard.',
    aside_fr: 'Du diagnostic à la dette technique : chaque chantier produit une couche que vos équipes reprennent et exploitent.',
    aside_en: 'From diagnosis to technical debt: each engagement produces a layer your teams own and operate.',
    services: [
      { num: '02.1', title_fr: 'Audit de maturité IA', title_en: 'AI Maturity Audit', desc_fr: 'Cartographie des cas d\'usage, des données et des risques avant tout chantier.', desc_en: 'Mapping of use cases, data, and risks before any engagement.', meta: '10 j · 10 days', href: '/audit-maturite-ia' },
      { num: '02.2', title_fr: 'Roadmap & cadrage', title_en: 'Roadmap & Scoping', desc_fr: 'Priorisation des chantiers, séquencement et budget cadré sur 3-5 jalons.', desc_en: 'Engagement prioritisation, sequencing, and budget framed across 3-5 milestones.', meta: '8 j · 8 days', href: '/services' },
      { num: '02.3', title_fr: 'Gouvernance des données', title_en: 'Data Governance', desc_fr: 'Mise en place des règles d\'accès, de qualité et de traçabilité réutilisables.', desc_en: 'Reusable access, quality, and traceability rules put in place.', meta: '12 j · 12 days', href: '/services' },
      { num: '02.4', title_fr: 'Dette technique', title_en: 'Technical Debt', desc_fr: 'Diagnostic et plan de remédiation de la dette qui freine la mise en production.', desc_en: 'Diagnosis and remediation plan for the debt slowing production.', meta: '15 j · 15 days', href: '/services' },
    ],
    footer_label_fr: 'Voir toutes les offres →',
    footer_label_en: 'See all services →',
    footer_href: '/services',
  };
