// Waimia · Co-location DS (Wave #38, T5) · module `logo-marquee` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { logoMarqueeItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('logo-marquee'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  // logoIds : résolution GLOBAL via le store src/data/logos.ts (anti-duplication
  // des src/name inline répétés dans les MDX). Optionnel → si présent, le composant
  // résout chaque id via LOGOS[id] ; sinon il retombe sur `logos` inline (rétrocompat).
  logoIds: z.array(z.string()).optional(),
  logos: z.array(logoMarqueeItemSchema).min(4).max(24).optional(),
  speed: z.enum(['slow', 'base']).default('base'),
  grayscale: z.boolean().default(true),
});
