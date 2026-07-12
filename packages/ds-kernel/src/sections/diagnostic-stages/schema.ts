// Waimia · Co-location DS (Wave #38, T5) · module `diagnostic-stages` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';
import { diagnosticStageSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('diagnostic-stages'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  stages: z.array(diagnosticStageSchema).min(4).max(6),
  // Vague C · Batch 5 (process/stages). Recettes layout : grid-steps (défaut = piste de stades
  //  en grille count-adaptive actuelle), vertical-stack (stades empilés pleine largeur),
  //  numbered-rows (lignes hairline numérotées). La séquence 1..N et le relevé « current » sont
  //  préservés dans toutes les recettes.
  layout: z.enum(['grid-steps', 'vertical-stack', 'numbered-rows']).optional(),
  // grid-steps : nombre de colonnes imposé (auto = nb de stades, rendu actuel). Ignoré ailleurs.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  // density (data-density) : padding-block section + padding des cards via --space-*.
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // contentAlign (data-content-align) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Déclinaison cataloguée « bande CTA quiz » : bloc optionnel rendu SOUS la piste de stades
  // (carte ink contenue = illustration + accroche serif accent + bouton), pour pousser au quiz
  //  d’auto-positionnement (« dans quel stade êtes-vous ? »). ABSENT = rendu actuel inchangé
  //  (rétro-compat stricte). Bilingue comme le reste du module ; libellé + href CTA requis.
  quizCta: z
    .object({
      eyebrow_fr: z.string().optional(),
      eyebrow_en: z.string().optional(),
      title_fr: z.string().optional(),
      title_en: z.string().optional(),
      body_fr: z.string().optional(),
      body_en: z.string().optional(),
      cta_label_fr: z.string(),
      cta_label_en: z.string(),
      cta_href: z.string(),
      // Illustration line-art DS (webp, couleurs cuites). Défaut = variante `-ink` (carte ink).
      media_src: z.string().optional(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      // Note discrète sous le bouton (mono) : durée du quiz, gratuité, etc.
      note_fr: z.string().optional(),
      note_en: z.string().optional(),
    })
    .optional(),
  // Couche atomique : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
});
