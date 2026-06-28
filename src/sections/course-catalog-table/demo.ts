// Waimia · Co-location DS (Wave #38, T5) · module `course-catalog-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'course-catalog-table',
    title_fr: 'Catalogue formations',
    title_en: 'Course catalog',
    rows: [
      { num: '01', title_fr: 'Intro à l\'IA pour PME B2B', title_en: 'Intro to AI for SMB B2B', level: 'debutant', duration_hours: 6, price_eur: 0, href: '#' },
      { num: '02', title_fr: 'Prompter Claude pour le travail', title_en: 'Prompting Claude for work', level: 'intermediaire', duration_hours: 4, price_eur: 290, href: '#' },
      { num: '03', title_fr: 'Automatiser ses workflows métier', title_en: 'Automating business workflows', level: 'avance', duration_hours: 8, price_eur: 590, href: '#' },
    ],
  };
