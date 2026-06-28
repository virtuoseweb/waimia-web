// Waimia · données case-card-grid (Acte IV — Cas clients réels)
// P0-5 : source UNIQUE = collection Astro `cases` (getCollection('cases')), plus de feed
// générique « domaines ». La home, /cas-clients et les secteurs racontent le MÊME récit.
// Le consommateur passe les entrées de la collection ; ici on mappe vers la forme de section.
import { localizeHref } from './i18n';
import type { SectionByType } from '@waimia/ds-kernel';

// Forme minimale attendue d'une entrée `cases` (sous-ensemble du schéma collection).
// `id` = identifiant de route Astro (glob loader) ; `data.slug` = secours frontmatter.
export interface CaseEntry {
  id: string;
  data: {
    client: string;
    sector_fr: string;
    sector_en: string;
    duration: string;
    stack: string[];
    impact_fr: string;
    impact_en: string;
    featured?: boolean;
    slug?: string;
  };
}

export function caseCardGridData(
  lang: 'fr' | 'en',
  cases: CaseEntry[] = [],
): SectionByType<'case-card-grid'> {
  // Tri : cas featured d'abord, puis ordre de la collection. Limite 6 (contrat schéma).
  const ordered = [...cases]
    .sort((a, b) => Number(b.data.featured ?? false) - Number(a.data.featured ?? false))
    .slice(0, 6);

  return {
    type: 'case-card-grid',
    fig_num: 'FIG IV · 4.0',
    fig_title_fr: 'Acte IV · Cas clients',
    fig_title_en: 'Act IV · Case studies',
    spec_fr: 'CAS RÉELS · BLOCS DE DONNÉES',
    spec_en: 'REAL CASES · DATA BLOCKS',
    h2_fr: 'Des cas réels. <i>Secteur</i> · durée · stack · ce qu’on a livré.',
    h2_en: 'Real cases. <i>Sector</i> · duration · stack · what we shipped.',
    case_label_fr: 'CAS',
    case_label_en: 'CASE',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'Livré',
    impact_label_en: 'Shipped',
    cases: ordered.map((c) => ({
      client: c.data.client,
      sector_fr: c.data.sector_fr,
      sector_en: c.data.sector_en,
      duration: c.data.duration,
      stack: c.data.stack.join(' · '),
      impact_fr: c.data.impact_fr,
      impact_en: c.data.impact_en,
      href: localizeHref(`/cas-clients/${c.data.slug ?? c.id}`, lang),
    })),
    all_label_fr: 'Voir tous les cas →',
    all_label_en: 'See all cases →',
    // Canonique /cas-clients (l'ancien /ressources/cas n'est plus qu'un 301, cf astro.config.mjs:66)
    all_href: localizeHref('/cas-clients', lang),
    empty_kicker_fr: 'PREMIERS CAS',
    empty_kicker_en: 'FIRST CASES',
    empty_body_fr: 'Les premiers dossiers clients sont en cours de rédaction. Parlons de votre projet en attendant.',
    empty_body_en: 'The first client case studies are being written. Let’s talk about your project in the meantime.',
  };
}
