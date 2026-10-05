// Waimia · Co-location DS (Wave #38, T5) · module `hero-case-study` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('hero-case-study'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  case_num: z.string(),
  eyebrow_fr: z.string().default('§ Cas client'),
  eyebrow_en: z.string().default('§ Case study'),
  // Libellé du numéro éditorial (« Cas 01 » par défaut). Surchargé pour une réalisation qui
  // n'est pas un cas client (« Projet 01 » pour un projet interne).
  num_label_fr: z.string().optional(),
  num_label_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  // Habillage editorial (magazine) : illustration duotone occupant ~la moitie
  // de la colonne, le h1 passe PAR-DESSUS en overlap (une partie des lettres sur
  // l'image, le reste sur le fond paper). Optionnel → rendu strictement identique
  // sans ce champ (retrocompat totale, HeroCentered importe aussi directement).
  illustration: z
    .object({
      src: z.string(),
      alt_fr: z.string(),
      alt_en: z.string(),
      side: z.enum(['left', 'right']).default('right'),
    })
    .optional(),
  specs: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
      }),
    )
    .min(2)
    .max(6)
    .optional(),
});
