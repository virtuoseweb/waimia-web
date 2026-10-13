// Waimia · Co-location DS (Wave #38, T5) · module `editorial-split-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'editorial-split-grid',
    left: {
      slot: 'left',
      kicker_fr: '§ Blog · notes longues',
      kicker_en: '§ Blog · long notes',
      h2_fr: 'Une <i>note</i> à la fois.',
      h2_en: 'One <i>note</i> at a time.',
      lede_fr: 'Pas de calendrier éditorial. On publie quand on a vraiment quelque chose à dire.',
      lede_en: 'No editorial calendar. We publish when there is something worth saying.',
      cards: [
        { kicker: 'NOTE 01', title_fr: 'Pourquoi les agents IA échouent en PME', title_en: 'Why AI agents fail in SMBs', lead_fr: 'La dette de process précède la dette technique.', lead_en: 'Process debt comes before technical debt.', href: '/blog/ia-pme-guide-complet-2026' },
        { kicker: 'NOTE 02', title_fr: 'Le CRM comme mémoire opérationnelle', title_en: 'CRM as operational memory', lead_fr: 'Une stack utile commence par une mémoire propre.', lead_en: 'A useful stack starts with clean memory.', href: '/blog/cabler-son-crm-en-10-jours' },
        { kicker: 'NOTE 03', title_fr: 'Agent IA ou automatisation classique', title_en: 'AI agent vs classic automation', lead_fr: 'Choisir le bon outil avant d’écrire la moindre règle.', lead_en: 'Pick the right tool before writing a single rule.', href: '/blog/agent-ia-vs-automatisation-classique-2026' },
      ],
      cta: { label_fr: 'Tous les articles →', label_en: 'All articles →', href: '/blog', variant: 'ghost' },
    },
    right: {
      slot: 'right',
      kicker_fr: '§ Livres blancs · documents PDF',
      kicker_en: '§ White papers · PDF documents',
      h2_fr: 'Un <i>document</i> par sujet.',
      h2_en: 'One <i>document</i> per topic.',
      lede_fr: 'Téléchargeable sans formulaire. Cité par nos clients en comité de direction.',
      lede_en: 'Downloadable without a form. Used by clients in leadership committees.',
      cards: [
        { kicker: 'PDF 01', title_fr: 'Audit IA marketing', title_en: 'Marketing AI audit', lead_fr: 'La grille terrain pour prioriser sans théâtre.', lead_en: 'The field grid for prioritizing without theatrics.', href: '/blog' },
        { kicker: 'PDF 02', title_fr: 'Agents IA et gouvernance', title_en: 'AI agents and governance', lead_fr: 'Droits, données, supervision, reprise humaine.', lead_en: 'Rights, data, supervision, human handoff.', href: '/blog' },
        { kicker: 'PDF 03', title_fr: 'Stack revenue IA', title_en: 'AI revenue stack', lead_fr: 'Relier site, CRM, contenu et pilotage.', lead_en: 'Connect website, CRM, content, and dashboards.', href: '/blog' },
      ],
      cta: { label_fr: 'Tous les livres blancs →', label_en: 'All white papers →', href: '/blog', variant: 'ghost' },
    },
  };
