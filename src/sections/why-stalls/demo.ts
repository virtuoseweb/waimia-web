// Waimia · Co-location DS (Wave #38, T5) · module `why-stalls` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'why-stalls',
    chapter_num: 'FIG I · 1.0',
    chapter_title_fr: 'Acte I · Le constat',
    chapter_title_en: 'Act I · The reckoning',
    h2_fr: "<span>Pourquoi l'IA</span><br /><i>cale</i>.",
    h2_en: '<span>Why AI</span><br /><i>stalls</i>.',
    aside_lead_fr: "Pas faute de modèles. Faute de la couche sans relief qui se trouve dessous.",
    aside_lead_en: 'Not for lack of models. For lack of the unglamorous layer underneath.',
    rows: [
      { fig: 'FIG 1.1', text_fr: "Une PME en croissance manque rarement d'outils. Elle manque de continuité entre CRM, boîtes mail, tableurs et site.", text_en: 'A growing SMB rarely lacks tools. It lacks continuity between the CRM, inboxes, spreadsheets, and the site.' },
      { fig: 'FIG 1.2', text_fr: "L'IA sans données métier structurées transforme chaque réponse en pari coûteux.", text_en: 'AI without structured business data turns every answer into an expensive guess.' },
      { fig: 'FIG 1.3', text_fr: "Les projets livrés en moins de 8 semaines gardent l'élan. Après, le vrai risque devient l'adoption.", text_en: 'Projects that reach production in less than 8 weeks keep momentum. After that, adoption usually becomes the real risk.' },
      { fig: 'FIG 1.4', text_fr: "Le réflexe de tout refaire trompe souvent. L'argent fuit dans les passations : lead vers CRM, CRM vers vente, vente vers livraison.", text_en: "The rebuild reflex is usually wrong. The money leaks in handoffs: lead to CRM, CRM to sales, sales to delivery." },
    ],
  };
