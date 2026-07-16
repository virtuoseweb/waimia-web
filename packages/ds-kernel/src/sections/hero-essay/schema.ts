// Waimia · Co-location DS (Wave #38, T5) · module `hero-essay` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { heroIllustrationSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-essay'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  author: z.string(),
  date: z.string(),
  reading_time_fr: z.string().optional(),
  reading_time_en: z.string().optional(),
  hero_image: z.string().optional(),
  hero_image_alt_fr: z.string().optional(),
  hero_image_alt_en: z.string().optional(),
  // Habillage editorial : illustration duotone en overlap, le h1 passe par-dessus.
  // Optionnel → rendu inchange sans ce champ (les articles texte-seul restent identiques).
  illustration: heroIllustrationSchema.optional(),
});
