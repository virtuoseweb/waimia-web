// Waimia · Co-location DS (Wave #38, T5) · module `case-featured-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('case-featured-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Libellés surchargeables (défauts honnêtes côté composant).
  read_label_fr: z.string().optional(),
  read_label_en: z.string().optional(),
  first_party_label_fr: z.string().optional(),
  first_party_label_en: z.string().optional(),
  second_party_label_fr: z.string().optional(),
  second_party_label_en: z.string().optional(),
  cases: z
    .array(
      z.object({
        slug: z.string(),
        href: z.string().optional(),
        case_num: z.string().optional(),
        sector_fr: z.string(),
        sector_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        headline_fr: z.string(),
        headline_en: z.string(),
        duration_fr: z.string().optional(),
        duration_en: z.string().optional(),
        cover: z.string().optional(),
        cover_alt_fr: z.string().optional(),
        cover_alt_en: z.string().optional(),
        provenance: z.enum(['first-party', 'second-party']).optional(),
      }),
    )
    .min(1),
});
