// Waimia · données case-card-grid (Acte IV — Les preuves, 4 dossiers)
// DRY : data identique par langue, dérivée de CASE_FEED. Évite la duplication sur les 6 pages.
import { CASE_FEED } from '../data/sitemap';
import { localizeHref } from './i18n';
import type { SectionByType } from '../schemas/sections';

export function caseCardGridData(lang: 'fr' | 'en'): SectionByType<'case-card-grid'> {
  return {
    type: 'case-card-grid',
    fig_num: 'FIG IV · 4.0',
    fig_title_fr: 'Acte IV — Les preuves',
    fig_title_en: 'Act IV — The proof',
    spec_fr: '4 DOSSIERS · BLOCS DE DONNÉES',
    spec_en: '4 CASE FILES · DATA BLOCKS',
    h2_fr: 'Quatre dossiers. <i>Secteur</i> · durée · stack · impact.',
    h2_en: 'Four files. <i>Sector</i> · duration · stack · impact.',
    case_label_fr: 'CASE',
    case_label_en: 'CASE',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'Impact',
    impact_label_en: 'Impact',
    cases: CASE_FEED.slice(0, 4).map((c) => ({
      client: c.client,
      sector_fr: c.sector.fr,
      sector_en: c.sector.en,
      duration: c.duration,
      stack: c.stack,
      impact_fr: c.impact.fr,
      impact_en: c.impact.en,
      href: localizeHref(`/cas/${c.slug}`, lang),
    })),
    all_label_fr: 'Tous les dossiers →',
    all_label_en: 'All case files →',
    // Canonique /cas (l'ancien /ressources/cas n'est plus qu'un 301, cf astro.config.mjs:66)
    all_href: localizeHref('/cas', lang),
  };
}
