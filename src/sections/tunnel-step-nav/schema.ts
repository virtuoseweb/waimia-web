// Waimia · Co-location DS (Wave #38, T5) · module `tunnel-step-nav` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('tunnel-step-nav'),
  prev_href: z.string().optional(),
  prev_label_fr: z.string().default('← Étape précédente'),
  prev_label_en: z.string().default('← Previous step'),
  cta: z.object({
    label_fr: z.string(),
    label_en: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'accent', 'ghost']).default('primary'),
  }),
  reading_fr: z.string().default('Temps de lecture : 2 min'),
  reading_en: z.string().default('2 min read'),
  back_href: z.string(),
  back_label: z.string(),
});
