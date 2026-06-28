// Waimia · Co-location DS (Wave #38, T5) · module `hero-asymmetric-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-asymmetric-grid',
    h1_fr: 'Un site web <i class="acc">intelligent</i>.',
    h1_en: 'An intelligent <i class="acc">website</i>.',
    label_left_fr: '§ 01 · Le service',
    label_left_en: '§ 01 · The service',
    label_right_fr: '§ 02 · Ce que ça fait',
    label_right_en: '§ 02 · What it does',
    lede_fr: "Pas une vitrine. Une web app pilotée par l'IA, branchée à vos données, qui transforme chaque visite en client.",
    lede_en: 'Not a brochure. An AI-driven web app, wired to your data, that turns every visit into a customer.',
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    bullets: [
      { text_fr: 'Web app connectée à un LLM via skills et routines précises', text_en: 'Web app wired to an LLM through precise skills and routines' },
      { text_fr: 'Search Console + Analytics : KPI lus, SEO optimisé en continu', text_en: 'Search Console + Analytics: KPIs read, SEO optimized continuously' },
      { text_fr: "Alertes temps réel, qualification de chaque visiteur jusqu'au CRM", text_en: 'Real-time alerts, every visitor qualified all the way to the CRM' },
      { text_fr: 'Lead magnet et quiz qui routent vers la page qui convertit le mieux', text_en: 'Lead magnet and quiz that route to the page that converts best' },
    ],
    kpis: [
      { num: '2–10 k€', cap_fr: 'budget HT indicatif', cap_en: 'indicative budget (excl. tax)' },
      { num: '4–8 sem.', cap_fr: 'site exploitable livré', cap_en: 'usable site delivered' },
      { num: 'Temps réel', cap_fr: 'KPI lus, SEO, alertes', cap_en: 'KPIs read, SEO, alerts' },
      { num: '100/100', cap_fr: 'PageSpeed SSG, base GEO', cap_en: 'PageSpeed SSG, GEO base' },
    ],
  };
