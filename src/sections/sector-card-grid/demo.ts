// Waimia · Co-location DS (Wave #38, T5) · module `sector-card-grid` · demo bilingue (extrait).
// Grille de hubs sectoriels : kicker (ICP), titre court de secteur, douleur en 1 phrase, CTA.

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'sector-card-grid',
  cta_label_fr: 'Voir le secteur →',
  cta_label_en: 'See the industry →',
  sectors: [
    {
      kicker_fr: 'Boutiques en ligne et PME e-commerce',
      kicker_en: 'Online stores and e-commerce SMBs',
      title_fr: 'E-commerce',
      title_en: 'E-commerce',
      pain_fr: '70 % des paniers finissent abandonnés.',
      pain_en: '70% of carts end up abandoned.',
      href: '/secteurs/e-commerce',
    },
    {
      kicker_fr: 'TPE du bâtiment et artisans',
      kicker_en: 'Construction micro-firms and craftspeople',
      title_fr: 'Bâtiment et artisans',
      title_en: 'Construction and trades',
      pain_fr: 'Des appels qui ne se transforment pas en devis.',
      pain_en: 'Calls that never turn into quotes.',
      href: '/secteurs/batiment',
    },
    {
      kicker_fr: 'Startups, SaaS et éditeurs de logiciel',
      kicker_en: 'Startups, SaaS and software vendors',
      title_fr: 'Startup et éditeur logiciel',
      title_en: 'Startup and software vendor',
      pain_fr: '97 % des visiteurs partent sans laisser de formulaire.',
      pain_en: '97% of visitors leave without filling a form.',
      href: '/secteurs/startup-saas',
    },
    {
      kicker_fr: 'Cabinets d’expertise comptable et sociaux',
      kicker_en: 'Accounting and payroll firms',
      title_fr: 'Cabinets comptables',
      title_en: 'Accounting firms',
      pain_fr: 'La tenue se banalise, les honoraires se tassent.',
      pain_en: 'Bookkeeping is commoditized, fees flatten.',
      href: '/secteurs/expertise-comptable',
    },
    {
      kicker_fr: 'PME industrielles, sous-traitance et fabricants',
      kicker_en: 'Industrial SMBs, subcontractors and makers',
      title_fr: 'PME industrielles',
      title_en: 'Industrial SMBs',
      pain_fr: 'Un savoir-faire réel, mais invisible en ligne.',
      pain_en: 'Real expertise, invisible online.',
      href: '/secteurs/pme-industrielle',
    },
    {
      kicker_fr: 'Thérapeutes et praticiens du bien-être',
      kicker_en: 'Therapists and wellness practitioners',
      title_fr: 'Thérapeutes et praticiens bien-être',
      title_en: 'Therapists and wellness practitioners',
      pain_fr: 'Une visibilité entièrement louée aux plateformes.',
      pain_en: 'Visibility entirely rented from platforms.',
      href: '/secteurs/therapeutes',
    },
  ],
};
