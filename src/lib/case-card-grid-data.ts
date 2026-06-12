// Waimia · données case-card-grid (Acte IV — Domaines d'intervention, 4 chantiers types)
// Honnêteté (vague 2) : studio solo, 0 cas livré. On expose les DOMAINES où on câble des
// systèmes (secteur · durée · stack · ce qu'on vise), pas des preuves de livraisons clientes.
// DRY : data identique par langue, dérivée de CASE_FEED. Évite la duplication sur les 6 pages.
import { CASE_FEED } from '../data/sitemap';
import { localizeHref } from './i18n';
import type { SectionByType } from '../schemas/sections';

export function caseCardGridData(lang: 'fr' | 'en'): SectionByType<'case-card-grid'> {
  return {
    type: 'case-card-grid',
    fig_num: 'FIG IV · 4.0',
    fig_title_fr: "Acte IV · Domaines d'intervention",
    fig_title_en: 'Act IV · Where we intervene',
    spec_fr: '4 DOMAINES · BLOCS DE DONNÉES',
    spec_en: '4 DOMAINS · DATA BLOCKS',
    h2_fr: 'Quatre domaines. <i>Secteur</i> · durée · stack · ce qu’on câble.',
    h2_en: 'Four domains. <i>Sector</i> · duration · stack · what we wire.',
    case_label_fr: 'DOMAINE',
    case_label_en: 'DOMAIN',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'On câble',
    impact_label_en: 'We wire',
    cases: CASE_FEED.slice(0, 4).map((c) => ({
      client: c.client,
      sector_fr: c.sector.fr,
      sector_en: c.sector.en,
      duration: c.duration,
      stack: c.stack,
      impact_fr: c.impact.fr,
      impact_en: c.impact.en,
      href: localizeHref(c.slug ? `/cas/${c.slug}` : '/cas', lang),
    })),
    all_label_fr: 'Parler de votre projet →',
    all_label_en: 'Discuss your project →',
    // Canonique /cas (l'ancien /ressources/cas n'est plus qu'un 301, cf astro.config.mjs:66)
    all_href: localizeHref('/cas', lang),
  };
}
