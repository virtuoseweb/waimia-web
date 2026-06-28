// Waimia · données editorial-preview (Acte IV · Notes de terrain)
// DRY : data identique par langue, dérivée de FIELD_NOTES. Évite la duplication sur home + atlas.
// V-F2 : numérotation réparée (l'« Acte VI » arrivait avant l'Acte V BookSession) + sélection
// `picks` optionnelle (home = 3 entrées, 1 seul CAS max : les dossiers vivent dans CaseCardGrid).
import { FIELD_NOTES } from '../data/sitemap';
import { localizeHref } from './i18n';
import type { SectionByType } from '@waimia/ds-kernel';

export function editorialPreviewData(
  lang: 'fr' | 'en',
  picks?: number[],
): SectionByType<'editorial-preview'> {
  const notes = picks ? picks.map((i) => FIELD_NOTES[i]).filter(Boolean) : FIELD_NOTES;
  return {
    type: 'editorial-preview',
    roman: 'IV',
    act_label_fr: 'Acte IV · Notes de terrain',
    act_label_en: 'Act IV · Field notes',
    h2_fr: "Le <i>blog</i> qu'on aurait voulu lire avant de commencer.",
    h2_en: "The <i>blog</i> we wish we'd read before starting.",
    aside_fr: 'Pas de pensum SEO. Notes courtes, cas concrets, recettes pratiques. Une newsletter mensuelle, jamais de promotion.',
    aside_en: 'No SEO bloat. Short notes, real cases, practical recipes. One monthly newsletter, never a promotion.',
    items: notes.map((n, i) => ({
      num: `0${i + 1}`,
      date_fr: n.date,
      date_en: n.date,
      tag_fr: n.tag.fr,
      tag_en: n.tag.en,
      label_fr: n.text.fr,
      label_en: n.text.en,
      href: localizeHref('/ressources/blog', lang),
    })),
    all_label_fr: 'Tout le blog →',
    all_label_en: 'See the full blog →',
    all_href: localizeHref('/ressources/blog', lang),
  };
}
