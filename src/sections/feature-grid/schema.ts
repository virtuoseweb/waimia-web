// Waimia · Co-location DS (Wave #38, T5) · module `feature-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';
import { featureItemSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('feature-grid'),
  // Mixin de variation unique : background/columns/layout/density + couches NOW v2
  // (hover/cellBg/cellTone/tone/cellAlignX|Y/justifyContent/alignItems/focusRing/
  // mediaFit/mediaRatio/measure/balance/clamp/headingLevel...). Tous optionnels →
  // défaut = rendu actuel. `columns` du mixin (auto|1..6) remplace l'ancien 2|3|4.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  // ─── COMPOSITION (SYS v2-E) — contenu d'en-tête riche + ligne d'intro. Tous optionnels,
  //     rendus seulement si headerKind/introRow les demandent (défaut = non rendu).
  lede_fr: z.string().optional(), // chapô (headerKind=*-lede* / introRow=lede-*)
  lede_en: z.string().optional(),
  header_cta_label_fr: z.string().optional(), // CTA d'en-tête (headerKind=*-cta)
  header_cta_label_en: z.string().optional(),
  header_cta_href: z.string().optional(),
  intro_desc_fr: z.string().optional(), // desc de la ligne d'intro (introRow=desc-media-split)
  intro_desc_en: z.string().optional(),
  intro_media: z.string().optional(), // image de la ligne d'intro (placeholder editorial, CMS)
  features: z.array(featureItemSchema).min(3).max(8),
});
