// Waimia · Co-location DS (Wave #38, T5) · module `problems-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('problems-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  problems: z
    .array(
      z.object({
        num: z.string().optional(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        // Line-art DS optionnel (Registre A) : chemin `/images/line-art/*.svg`. Inliné
        // par FeatureGrid (currentColor + var(--accent)). alt porteur de sens → role=img.
        illustration_src: z.string().optional(),
        illustration_alt_fr: z.string().optional(),
        illustration_alt_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
});
