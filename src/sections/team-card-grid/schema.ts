// Waimia · Co-location DS (Wave #38, T5) · module `team-card-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('team-card-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  cta_label_fr: z.string().default('Voir le profil →'),
  cta_label_en: z.string().default('View profile →'),
  count_singular_fr: z.string().default('publication'),
  count_singular_en: z.string().default('publication'),
  count_plural_fr: z.string().default('publications'),
  count_plural_en: z.string().default('publications'),
  members: z
    .array(
      z.object({
        name: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        href: z.string(),
        photo: z.string().optional(),
        photo_alt_fr: z.string().default('Portrait auteur Waimia'),
        photo_alt_en: z.string().default('Waimia author portrait'),
        count: z.number().int().min(0).default(0),
        transition_id: z.string().optional(),
      }),
    )
    .min(1)
    .max(6),
});
