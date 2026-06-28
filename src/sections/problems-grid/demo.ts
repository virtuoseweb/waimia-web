// Waimia · Co-location DS (Wave #38, T5) · module `problems-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'problems-grid',
    h2_fr: 'Trois frictions qui tuent votre conversion',
    h2_en: 'Three conversion killers',
    problems: [
      {
        num: '01',
        kicker_fr: 'Site trop lent',
        kicker_en: 'Site too slow',
        title_fr: 'FCP 4,2 s. Lighthouse 34.<br/>−7 % de conversion par seconde.',
        title_en: 'FCP 4.2s. Lighthouse 34.<br/>−7% conversion per second.',
        body_fr: "WordPress avec 40 plugins : chaque visiteur attend. Chaque seconde perdue coûte 7 % de conversions. Sans IA, impossible d'automatiser les corrections.",
        body_en: 'WordPress with 40 plugins: each visitor waits. Every second lost costs 7% in conversions. Without AI, automating fixes is impossible.',
        illustration_src: '/images/line-art/probleme-poc-qui-dort.svg',
        illustration_alt_fr: 'Un prototype en sommeil à l\'écran',
        illustration_alt_en: 'A prototype asleep on screen',
      },
      {
        num: '02',
        kicker_fr: 'Contenu stale',
        kicker_en: 'Stale content',
        title_fr: '1 article en 6 semaines.<br/>Vos concurrents en publient 8/sem avec IA.',
        title_en: '1 article in 6 weeks.<br/>Your AI competitors ship 8/wk.',
        body_fr: "Le brief, les relectures, le SEO, la mise en ligne : 6 semaines par article. Vos concurrents IA publient 8 articles/semaine optimisés Google et GEO.",
        body_en: 'Brief, revisions, SEO, publishing: 6 weeks per article. Your AI competitors publish 8 articles/week, optimised for Google and GEO.',
      },
      {
        num: '03',
        kicker_fr: 'Leads sans relance',
        kicker_en: 'Uncontacted leads',
        title_fr: "3 200 leads collectés.<br/>Jamais relancés dans l'heure.",
        title_en: '3,200 leads collected.<br/>Never followed up within the hour.',
        body_fr: "Les prospects remplissent les formulaires. Ils attendent. La conversion est 7× plus probable dans l'heure, mais personne ne rappelle. Le pipeline dort.",
        body_en: 'Prospects fill in forms. They wait. Conversion is 7× more likely within the hour, but nobody calls back. The pipeline sleeps.',
      },
    ],
  };
