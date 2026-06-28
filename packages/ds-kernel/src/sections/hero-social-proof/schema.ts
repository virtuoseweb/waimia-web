// Waimia · Co-location DS (Wave #38, T3) · module `hero-social-proof` (cas hero)
//
// Schéma DÉPLACÉ depuis src/schemas/sections.ts (rule 60 : déplacer, pas dupliquer).
// `z.object` SANS le wrapper discriminatedUnion. `z` vient de `astro:content` (cohérence
// build Astro + pattern codegen). `ctaSchema` réimporté depuis la feuille pure `_shared`.

import { z } from 'zod';
import { ctaSchema } from '../_shared/subschemas';

// hero-social-proof · hero centré + bande de preuve sociale (stats + rating) above-fold.
export const schema = z.object({
  type: z.literal('hero-social-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  rating_fr: z.string().optional(),
  rating_en: z.string().optional(),
  stats: z
    .array(z.object({ k: z.string(), label_fr: z.string(), label_en: z.string() }))
    .min(2)
    .max(4),
});
