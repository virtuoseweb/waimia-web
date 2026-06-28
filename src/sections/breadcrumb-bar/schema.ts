// Waimia · Co-location DS (Wave #38, T5) · module `breadcrumb-bar` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('breadcrumb-bar'),
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .min(1)
    .max(5),
});
