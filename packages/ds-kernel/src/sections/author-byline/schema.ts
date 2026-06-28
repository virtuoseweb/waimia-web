// Waimia · Co-location DS (Wave #38, T5) · module `author-byline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('author-byline'),
  authorId: z.string().optional(),
  name: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  photo: z.string().optional(),
  photoAlt_fr: z.string().optional(),
  photoAlt_en: z.string().optional(),
  profileHref: z.string().optional(),
  publishedDate: z.string().optional(),
  updatedDate: z.string().optional(),
  ...sectionBaseSchema.shape,
});
