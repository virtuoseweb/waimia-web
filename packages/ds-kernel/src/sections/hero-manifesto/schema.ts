// Waimia · Co-location DS · module `hero-manifesto` · schema (local, co-localise).
// Hero editorial de page de marque : fond canvas liquide (LiquidHero) + mise en page
// 3 zones (meta band en haut · titre+sous-titre au centre · intro+CTA+foot en bas),
// plein viewport. EXTRAIT FIDELE du bloc inline `.manifesto-hero` de src/pages/manifesto.astro
// (rule 60 : deplacer le markup vers un composant catalogue, pas dupliquer). Plus riche que
// `hero-liquid` (meta band, sous-titre, intro, rangee de pied) → nouveau type reutilisable.
// z.object SANS discriminatedUnion (pattern codegen). 0 token DS cree, 0 hardcode de theme.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('hero-manifesto'),
  /** Rangee de meta en haut (kickers). HTML autorise (ex. pastille accent ◉). */
  meta: z
    .array(z.object({ html_fr: z.string(), html_en: z.string() }))
    .max(4)
    .default([]),
  /** Eyebrow / tag au-dessus du titre. HTML autorise (<span> accent). */
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  /** Titre principal. HTML : <i class="accent"> = releve accent, <br> = saut. */
  h1_fr: z.string(),
  h1_en: z.string(),
  /** Sous-titre sous le H1. HTML autorise (<i> = releve serif). */
  subhead_fr: z.string().optional(),
  subhead_en: z.string().optional(),
  /** Paragraphe d'introduction en bas (colonne gauche). HTML autorise. */
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  cta_primary_label_fr: z.string().optional(),
  cta_primary_label_en: z.string().optional(),
  cta_primary_href: z.string().optional(),
  cta_secondary_label_fr: z.string().optional(),
  cta_secondary_label_en: z.string().optional(),
  cta_secondary_href: z.string().optional(),
  /** Rangee de pied (kickers, alignee a droite). */
  foot: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(4)
    .default([]),
});

export type HeroManifestoData = z.infer<typeof schema>;
