// Waimia · données editorial-preview (Acte VI — Notes de terrain, 5 notes)
// DRY : data identique par langue, dérivée de FIELD_NOTES. Évite la duplication sur home + atlas.
import { FIELD_NOTES } from '../data/sitemap';
import { localizeHref } from './i18n';
import type { SectionByType } from '../schemas/sections';

export function editorialPreviewData(lang: 'fr' | 'en'): SectionByType<'editorial-preview'> {
  return {
    type: 'editorial-preview',
    roman: 'VI',
    act_label_fr: 'Acte VI — Notes de terrain',
    act_label_en: 'Act VI — Field notes',
    h2_fr: "Le <i>blog</i> qu'on aurait voulu lire avant de commencer.",
    h2_en: "The <i>blog</i> we wish we'd read before starting.",
    aside_fr: 'Pas de pensum SEO. Notes courtes, cas concrets, recettes pratiques. Une newsletter mensuelle, jamais de promotion.',
    aside_en: 'No SEO bloat. Short notes, real cases, practical recipes. One monthly newsletter, never a promotion.',
    items: FIELD_NOTES.map((n, i) => ({
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
