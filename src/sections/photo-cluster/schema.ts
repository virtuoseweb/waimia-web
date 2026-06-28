// Waimia · Co-location DS (Wave #38, T5) · module `photo-cluster` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('photo-cluster'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  note_fr: z.string().optional(),
  note_en: z.string().optional(),
  layout: z.enum(['lead-cluster', 'scatter', 'duo']).optional(),
  lead: z.object({
    media_src: z.string(),
    media_alt_fr: z.string().optional(),
    media_alt_en: z.string().optional(),
  }),
  photos: z.array(
    z.object({
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      caption_fr: z.string().optional(),
      caption_en: z.string().optional(),
    }),
  ).min(1).max(5),
});
