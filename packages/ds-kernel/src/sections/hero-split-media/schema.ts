// Waimia · Co-location DS (Wave #38, T5) · module `hero-split-media` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema, heroIllustrationSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-split-media'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  // Tagline optionnelle sous le titre (registre intermédiaire h1/lede).
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  // Kicker secondaire optionnel (mono uppercase) annonçant la définition,
  // placé sous le subtitle et au-dessus du lede (= paragraphe de définition).
  definition_kicker_fr: z.string().optional(),
  definition_kicker_en: z.string().optional(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  // Habillage editorial (magazine) : quand renseigne, le hero bascule sur la mise en page
  // overlap (illustration duotone occupant ~la moitie de la ligne, titre par-dessus) au lieu
  // de la grille split media/texte. Preserve tout le contenu (kicker/titre/lede/badges/CTA).
  // Optionnel → rendu split-media inchange sans ce champ.
  illustration: heroIllustrationSchema.optional(),
});
