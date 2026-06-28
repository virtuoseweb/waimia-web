// Waimia · Co-location DS (Wave #38, T5) · module `media-swap-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('media-swap-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  swap_mode: z.enum(['auto', 'hover']).optional(),
  columns: z.array(
    z.object({
      label_fr: z.string(),
      label_en: z.string(),
      sublabel_fr: z.string().optional(),
      sublabel_en: z.string().optional(),
      media: z.array(
        z.object({
          media_src: z.string(),
          media_alt_fr: z.string().optional(),
          media_alt_en: z.string().optional(),
        }),
      ).min(1).max(4),
    }),
  ).min(1).max(3),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});
