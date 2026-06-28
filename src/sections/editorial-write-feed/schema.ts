// Waimia · Co-location DS (Wave #38, T5) · module `editorial-write-feed` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('editorial-write-feed'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_label_fr: z.string().optional(),
  meta_label_en: z.string().optional(),
  meta_href: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  tone: z.enum(['paper', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        date: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(10),
});
