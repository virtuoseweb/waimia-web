// Waimia · Co-location DS (Wave #38, T5) · module `hero-conversion-funnel` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-conversion-funnel'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  funnel_num: z.string(),
  // Traitement visuel du hero. Absent = rendu catalogue d'origine (1 colonne),
  // inchangé : protège hero-hub-stats/hero-pillar-hub et tout usage existant.
  //  · split   = 2 colonnes asym (texte | illustration line-art, via media_src)
  //  · sumie    = fond ink pleine largeur, motif line-art dessiné au scroll, h1 split-letter
  //  · minimal  = h1 centré, stats en ligne, visuel discret, hauteur réduite
  variant: z.enum(['split', 'sumie', 'minimal']).optional(),
  // Illustration latérale (variant split) : line-art DS sous /images/line-art/.
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  // Registre du média (variant split) — axe Variante orthogonal au squelette 2-col :
  //  · lineart   = grammaire DS (diagramme/trait posé dans un cadre paper-2, currentColor)
  //  · editorial = illustration recolorée ink/paper qui couvre la coque
  // Absent → `lineart` (défaut comportemental), rétrocompat des usages existants.
  media_register: z.enum(['lineart', 'editorial']).optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  meta_pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(6)
    .optional(),
  benefits: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
  proof_fr: z.string().optional(),
  proof_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .optional(),
});
