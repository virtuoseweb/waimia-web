// Waimia · Co-location DS (Wave #38, T5) · module `scroll-gallery` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('scroll-gallery'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  // Côté du cadre média sticky en desktop (défaut right). 'left' inverse les colonnes.
  media_side: z.enum(['left', 'right']).optional(),
  items: z
    .array(
      z.object({
        index_fr: z.string().optional(),
        index_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        media_src: z.string(),
        media_alt_fr: z.string().optional(),
        media_alt_en: z.string().optional(),
        link_label_fr: z.string().optional(),
        link_label_en: z.string().optional(),
        link_href: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
});
