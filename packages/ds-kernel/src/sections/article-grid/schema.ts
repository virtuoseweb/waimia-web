// Waimia · Co-location DS (Wave #38, T5) · module `article-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('article-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  articles: z
    .array(
      z.object({
        image: z.string().optional(),
        // Teinte de carte en degrés pour `filter: hue-rotate(Ndeg)` sur l'illustration
        // (habillage par taxonomie, HAB-7). OPTIONNEL → rétrocompatible (0 régression
        // sur les usages existants d'article-grid). Valeur structurelle de filtre, pas
        // une couleur DS.
        tint: z.number().optional(),
        tag_fr: z.string().optional(),
        tag_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        excerpt_fr: z.string().optional(),
        excerpt_en: z.string().optional(),
        date: z.string().optional(),
        read_time_fr: z.string().optional(),
        read_time_en: z.string().optional(),
        author: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(12),
});
