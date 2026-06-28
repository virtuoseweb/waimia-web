// Waimia · Co-location DS (Wave #38, T5) · module `editorial-preview` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('editorial-preview'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  roman: z.string().optional(),
  act_label_fr: z.string().optional(),
  act_label_en: z.string().optional(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z
    .array(
      z.object({
        num: z.string(),
        date_fr: z.string(),
        date_en: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  all_label_fr: z.string().optional(),
  all_label_en: z.string().optional(),
  all_href: z.string().optional(),
});
