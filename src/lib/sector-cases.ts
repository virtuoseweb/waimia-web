// Waimia · sélection des cas clients d'une page secteur.
// Logique 3-cas (mandat secteurs-cas) : cas du secteur d'abord (match facets.sector,
// tri card.order), complétés par les cas les plus proches d'autres secteurs jusqu'à 3.
// Le secteur RÉEL de chaque cas reste affiché (honnêteté : on ne maquille pas un cas).
// Réutilise la section cataloguée `case-card-grid` (pas de markup neuf).
import { getCollection } from 'astro:content';
import { localizeHref } from './i18n';
import type { SectionByType } from '../schemas/sections';

type CaseGridData = SectionByType<'case-card-grid'>;
type CaseRow = CaseGridData['cases'][number];

/**
 * Construit les données `case-card-grid` pour une page secteur : 3 cas,
 * priorité aux cas du secteur courant, complétés par les plus proches.
 * @param sectorSlug slug facets.sector du secteur (ex: 'finance-compta')
 */
export async function sectorCaseGridData(
  sectorSlug: string,
  lang: 'fr' | 'en',
): Promise<CaseGridData> {
  const all = (await getCollection('cases'))
    .filter((e) => e.data.card)
    .sort((a, b) => a.data.card!.order - b.data.card!.order);

  const inSector = all.filter((e) => e.data.facets?.sector === sectorSlug);
  const others = all.filter((e) => e.data.facets?.sector !== sectorSlug);
  const picked = [...inSector, ...others].slice(0, 3);

  const cases: CaseRow[] = picked.map((e) => {
    const d = e.data;
    const slug = d.slug ?? e.id;
    return {
      client: d.client,
      sector_fr: d.sector_fr,
      sector_en: d.sector_en,
      duration: d.duration,
      stack: Array.isArray(d.stack) ? d.stack.join(' · ') : String(d.stack ?? ''),
      impact_fr: d.impact_fr,
      impact_en: d.impact_en,
      href: localizeHref(`/realisations/${slug}`, lang),
    };
  });

  return {
    type: 'case-card-grid',
    fig_num: 'FIG · CAS',
    fig_title_fr: 'Cas clients',
    fig_title_en: 'Case studies',
    spec_fr: '3 DOSSIERS · ROI MESURÉS',
    spec_en: '3 CASE FILES · MEASURED ROI',
    h2_fr: 'Un <i>cas</i> concret.',
    h2_en: 'A real <i>case</i>.',
    case_label_fr: 'CASE',
    case_label_en: 'CASE',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'Impact',
    impact_label_en: 'Impact',
    cases,
    all_label_fr: 'Tous les cas clients →',
    all_label_en: 'All case studies →',
    all_href: localizeHref('/realisations', lang),
  };
}
