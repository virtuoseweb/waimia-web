// Waimia · sélection des cas clients d'une page secteur.
// Logique 3-cas (mandat secteurs-cas) : cas du secteur d'abord (match sector_fr -> slug via
// sectorSlugFromLabel, tri card.order), complétés par les cas les plus proches jusqu'à 3.
// Le secteur RÉEL de chaque cas reste affiché (honnêteté : on ne maquille pas un cas).
// Réutilise la section cataloguée `case-card-grid` (pas de markup neuf).
import { getCollection } from 'astro:content';
import { localizeHref } from './i18n';
import { sectorSlugFromLabel } from './internal-mesh';
import type { SectionByType } from '@waimia/ds-kernel';

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
  caseRefs: string[] = [],
): Promise<CaseGridData> {
  const all = (await getCollection('cases'))
    .filter((e) => e.data.card && e.data.kind === 'client')
    .sort((a, b) => a.data.card!.order - b.data.card!.order);

  // Le secteur d'un cas derive de son libelle libre `sector_fr` via la SOURCE UNIQUE
  // `sectorSlugFromLabel` (internal-mesh.ts) : la collection cases n'a pas de champ `facets`.
  const inSector = all.filter((e) => sectorSlugFromLabel(e.data.sector_fr) === sectorSlug);
  const others = all.filter((e) => sectorSlugFromLabel(e.data.sector_fr) !== sectorSlug);
  // Cas déclarés par la page secteur (`caseRefs`) d'abord, dans l'ordre déclaré, puis le reste.
  const declared = caseRefs
    .map((id) => all.find((e) => (e.data.slug ?? e.id) === id || e.id === id))
    .filter((e): e is (typeof all)[number] => Boolean(e));
  // Une page qui déclare ses cas n'affiche qu'eux : compléter avec un cas d'un autre secteur
  // contredirait sa prose (« deux projets livrés » sous trois cartes).
  const rest = [...inSector, ...others].filter((e) => !declared.includes(e));
  const picked = (declared.length > 0 ? declared : rest).slice(0, 3);
  const n = picked.length;

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
      href: localizeHref(`/cas-clients/${slug}`, lang),
    };
  });

  return {
    type: 'case-card-grid',
    fig_num: 'FIG · CAS',
    fig_title_fr: 'Cas clients',
    fig_title_en: 'Case studies',
    spec_fr: n > 1 ? `${n} CAS CLIENTS` : '1 CAS CLIENT',
    spec_en: n > 1 ? `${n} CASE STUDIES` : '1 CASE STUDY',
    h2_fr: n > 1 ? 'Des <i>cas</i> concrets.' : 'Un <i>cas</i> concret.',
    h2_en: n > 1 ? 'Real <i>cases</i>.' : 'A real <i>case</i>.',
    case_label_fr: 'CASE',
    case_label_en: 'CASE',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'Impact',
    impact_label_en: 'Impact',
    cases,
    all_label_fr: 'Tous les cas clients →',
    all_label_en: 'All case studies →',
    all_href: localizeHref('/cas-clients', lang),
  };
}
