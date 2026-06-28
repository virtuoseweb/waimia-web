// Waimia · Co-location DS (Wave #38, T5) · module `media-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('media-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // 'inset' = média centré sur --wrap-prose (illustrations carrées) · défaut = full (inchangé)
  display: z.enum(['full', 'inset']).optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  media_kind: z.enum(['image', 'svg', 'video', 'embed']),
  src: z.string(),
  alt_fr: z.string().optional(),
  alt_en: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
