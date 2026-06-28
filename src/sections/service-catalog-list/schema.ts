// Waimia · Co-location DS (Wave #38, T5) · module `service-catalog-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('service-catalog-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  services: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        meta: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  footer_label_fr: z.string().optional(),
  footer_label_en: z.string().optional(),
  footer_href: z.string().optional(),
});
