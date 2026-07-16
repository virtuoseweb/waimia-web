// Waimia · Co-location DS (Wave #38, T5) · module `editorial-prose` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('editorial-prose'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  maxWidth: z.enum(['prose', 'wide']).optional(),
  // Illustrations duotone flottantes (marque). Rendues AVANT le slot, en float sur desktop
  // large (le texte MDX coule autour), en pleine largeur dans le flux sur mobile. 0 figure
  // = rendu prose typographique seul. `side` force le cote ; defaut = alternance par index.
  figures: z
    .array(
      z.object({
        src: z.string(),
        alt_fr: z.string(),
        alt_en: z.string(),
        side: z.enum(['left', 'right']).optional(),
      }),
    )
    .max(3)
    .optional(),
});
