// Waimia · Co-location DS (Wave #38, T5) · module `hero-editorial-masthead` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-editorial-masthead',
    breadcrumb: [
      { label_fr: 'Accueil', label_en: 'Home', href: '#' },
      { label_fr: 'Services', label_en: 'Services', href: '#' },
      { label_fr: 'Site web intelligent', label_en: 'Intelligent website' },
    ],
    meta: [
      { label_fr: 'Montpellier · FR', label_en: 'Montpellier · FR' },
      { label_fr: 'Édition française', label_en: 'French edition' },
      { label_fr: '◉ Disponible · T3 2026', label_en: '◉ Available · Q3 2026' },
    ],
    h1_fr: 'Un site web <i class="acc">intelligent</i>.',
    h1_en: 'An intelligent <i class="acc">website</i>.',
    lede_fr: "Pas une vitrine. Une web app pilotée par l'IA, branchée à vos données, qui transforme chaque visite en client.",
    lede_en: 'Not a brochure. An AI-driven web app, wired to your data, that turns every visit into a customer.',
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    kpis: [
      { num: '2–10 k€', cap_fr: 'budget HT indicatif', cap_en: 'indicative budget (excl. tax)' },
      { num: '4–8 sem.', cap_fr: 'site exploitable livré', cap_en: 'usable site delivered' },
      { num: 'Temps réel', cap_fr: 'KPI lus, SEO, alertes', cap_en: 'KPIs read, SEO, alerts' },
      { num: '100/100', cap_fr: 'PageSpeed SSG, base GEO', cap_en: 'PageSpeed SSG, GEO base' },
    ],
  };
