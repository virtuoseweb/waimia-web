// Waimia · Co-location DS · module `editorial-case-grid` · schema (local, co-localise).
// Grille editoriale de cas clients : en-tete (numero d'acte + kicker + titre + intro) puis
// cartes EditorialCaseCard en 2 colonnes avec decalage vertical alterne (stagger).
// EXTRAIT FIDELE du bloc inline Acte IV de src/pages/manifesto.astro (rule 60 : deplacer le
// markup vers un composant catalogue, la molecule EditorialCaseCard restant source des cartes).
// z.object SANS discriminatedUnion (pattern codegen). 0 token DS cree, 0 hardcode de theme.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('editorial-case-grid'),
  num_fr: z.string(),
  num_en: z.string(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  /** Titre. HTML : <i class="accent"> = releve accent. */
  h2_fr: z.string(),
  h2_en: z.string(),
  /** Intro sous le titre. HTML autorise. */
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  /** Decalage vertical (px) des cartes de rang pair (effet stagger). */
  stagger: z.number().int().min(0).max(120).default(60),
  items: z
    .array(
      z.object({
        client: z.string(),
        sector_fr: z.string(),
        sector_en: z.string(),
        stack: z.string(),
        impact_fr: z.string(),
        impact_en: z.string(),
        duration: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(8),
});

export type EditorialCaseGridData = z.infer<typeof schema>;
