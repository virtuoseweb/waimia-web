// Waimia · module `engagement-ledger` · schema
// Grille tarifaire « registre » : un parcours d'engagement lu ligne à ligne (étape, ce qui est
// livré, durée, prix), sans cartes ni onglets. Tout le parcours est visible d'un seul regard.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

const ctaSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
});

const rowSchema = z.object({
  // Repère de séquence (« Étape 1 », « En parallèle ») : à n'utiliser que si le contenu EST une séquence.
  step_fr: z.string().optional(),
  step_en: z.string().optional(),
  name_fr: z.string(),
  name_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  includes_fr: z.array(z.string()).min(2).max(6),
  includes_en: z.array(z.string()).min(2).max(6),
  duration_fr: z.string().optional(),
  duration_en: z.string().optional(),
  price_fr: z.string(),
  price_en: z.string(),
  price_note_fr: z.string().optional(),
  price_note_en: z.string().optional(),
  cta: ctaSchema.optional(),
  // Ligne d'entrée (ex. audit gratuit) : prix en accent et CTA en bouton plein.
  entry: z.boolean().optional(),
});

export const schema = z.object({
  type: z.literal('engagement-ledger'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string().optional(),
  h1_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  rows: z.array(rowSchema).min(2).max(8),
  // Lignes secondaires (prestations annexes) : rendues en retrait, sans CTA plein.
  aside: z
    .object({
      title_fr: z.string(),
      title_en: z.string(),
      body_fr: z.string().optional(),
      body_en: z.string().optional(),
      items: z
        .array(
          z.object({
            label_fr: z.string(),
            label_en: z.string(),
            price_fr: z.string(),
            price_en: z.string(),
            href: z.string().optional(),
          }),
        )
        .min(1)
        .max(6),
    })
    .optional(),
  footnote_fr: z.string().optional(),
  footnote_en: z.string().optional(),
});
