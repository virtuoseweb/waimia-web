// Waimia · Co-location DS (Wave #38, T5) · module `logo-marquee` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { logoMarqueeItemSchema } from '../_shared/locals';
import { refOrInline } from '../_shared/refs';

export const schema = z.object({
  type: z.literal('logo-marquee'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  // logos : chaque item porte SOIT sa forme inline, SOIT un pointeur `{ ref: 'logos/id' }`
  // résolu au rendu via le store GLOBAL src/data/logos.ts (P4.4-e). Résolution centralisée
  // par resolveSectionRefs (REF_TARGETS['logo-marquee.logos'] = 'logos') : le composant reçoit
  // un tableau d'items déjà résolus. Bornes min/max = nombre d'items (indépendant de leur forme).
  logos: z.array(refOrInline(logoMarqueeItemSchema)).min(4).max(24).optional(),
  speed: z.enum(['slow', 'base']).default('base'),
  grayscale: z.boolean().default(true),
});
