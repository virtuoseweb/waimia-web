import { z } from 'zod';

const ctaSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'ghost', 'accent']).optional(),
});

const offerCardSchema = z.object({
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  image: z.string().optional(),
  image_alt_fr: z.string().optional(),
  image_alt_en: z.string().optional(),
  price: z.string().optional(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  features_fr: z.array(z.string()).min(3).max(9),
  features_en: z.array(z.string()).min(3).max(9),
  cta: ctaSchema,
  featured: z.boolean().optional(),
});

export const schema = z.object({
  type: z.literal('pricing-tabs-showcase'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string().optional(),
  h1_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  tabs: z.array(z.object({
    label_fr: z.string(),
    label_en: z.string(),
    cards: z.array(offerCardSchema).min(3).max(5),
    note: z.object({
      kicker_fr: z.string().optional(),
      kicker_en: z.string().optional(),
      title_fr: z.string(),
      title_en: z.string(),
      body_fr: z.string(),
      body_en: z.string(),
      price: z.string().optional(),
      period_fr: z.string().optional(),
      period_en: z.string().optional(),
      cta: ctaSchema.optional(),
    }).optional(),
  })).min(2).max(4),
  highlight: z.object({
    kicker_fr: z.string().optional(),
    kicker_en: z.string().optional(),
    h2_fr: z.string(),
    h2_en: z.string(),
    body_fr: z.string().optional(),
    body_en: z.string().optional(),
    cta: ctaSchema,
  }).optional(),
});
