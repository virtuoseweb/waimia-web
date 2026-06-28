// Waimia · Co-location DS (Wave #38, T5) · module `hero-sector` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-sector',
    dept_fr: '§ Secteur · Services B2B',
    dept_en: '§ Sector · B2B Services',
    h1_fr: "Cabinets B2B : <i class=\"acc\">câbler</i> l'<i class=\"acc\">IA</i> dans votre delivery.",
    h1_en: 'B2B firms: <i class="acc">wire</i> <i class="acc">AI</i> into your delivery.',
    lead_fr: 'Audit en 5 jours, premier workflow en production, mesure dès le premier mois. <span>ROI prouvé secteur.</span>',
    lead_en: '5-day audit, first workflow in production, measured from month one. <span>Proven sector ROI.</span>',
    cta: { label_fr: 'Réserver un audit secteur →', label_en: 'Book a sector audit →', href: '/contact?sector=b2b', variant: 'primary' },
    meta_fr: 'Disponibilité · T3 2026',
    meta_en: 'Availability · Q3 2026',
    tags: [
      { label_fr: 'Conseil', label_en: 'Consulting' },
      { label_fr: 'Cabinet juridique', label_en: 'Law firm' },
      { label_fr: 'Agence', label_en: 'Agency' },
      { label_fr: 'Cabinet compta', label_en: 'Accounting firm' },
    ],
  };
