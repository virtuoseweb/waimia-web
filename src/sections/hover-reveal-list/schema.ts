// Waimia · Co-location DS (Wave #38, T5) · module `hover-reveal-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hover-reveal-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  reveal_mode: z.enum(['cursor', 'fixed']).optional(),
  items: z.array(
    z.object({
      label_fr: z.string(),
      label_en: z.string(),
      meta_fr: z.string().optional(),
      meta_en: z.string().optional(),
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      link_href: z.string().optional(),
    }),
  ).min(2).max(10),
});
