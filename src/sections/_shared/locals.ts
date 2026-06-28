// Waimia · Co-location DS (Wave #38, T5) · feuille partagee PURE · helpers locaux
//
// Sous-schemas helper EXTRAITS one-shot depuis src/schemas/sections.ts (rule 60 :
// deplaces, pas dupliques). Source unique reimportee par les modules qui les referencent.
// FEUILLE PURE : n'importe que z + les sous-schemas/enums partages. 0 import de type-block.
// Ordre TOPOLOGIQUE (deps avant dependents) pour eviter tout TDZ au build.

import { z } from 'astro:content';
import { ctaSchema } from './subschemas';

export const aboutStoryMilestoneSchema = z.object({
  year: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});

export const agenticLineSchema = z.object({
  kind: z.enum(['cmd', 'out', 'ok', 'comment']),
  text: z.string(),
});

export const caseSpotlightMetricSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});

export const caseSpotlightTagSchema = z.object({ fr: z.string(), en: z.string() });

export const challengeItemSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const comparisonDuoItemSchema = z.object({
  text_fr: z.string(),
  text_en: z.string(),
});

export const comparisonValuePropSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const diagnosticStageSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  phase_fr: z.string().optional(),
  phase_en: z.string().optional(),
  href: z.string().optional(),
  current: z.boolean().optional(),
});

export const faqTwoColItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});

export const featureSplitPointSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
});

export const footerCtaButtonSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'ghost', 'accent']).default('primary'),
});

export const galleryMasonryItemSchema = z.object({
  src: z.string().optional(),
  alt_fr: z.string().optional(),
  alt_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  tag_fr: z.string().optional(),
  tag_en: z.string().optional(),
  ratio: z.enum(['portrait', 'landscape', 'square', 'wide']).default('landscape'),
});

export const iconTrioItemSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const integrationItemSchema = z.object({
  logo_src: z.string().optional(),
  name: z.string(),
  href: z.string().optional(),
});

export const integrationGroupSchema = z.object({
  group_fr: z.string(),
  group_en: z.string(),
  items: z.array(integrationItemSchema).min(2).max(12),
});

export const journeyStepSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  highlight_fr: z.string().optional(),
  highlight_en: z.string().optional(),
});

export const logoMarqueeItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
});

export const logoWallItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const metricCalloutItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});

export const pricingCardTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

export const pricingComparisonPlanSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  price_note_fr: z.string().optional(),
  price_note_en: z.string().optional(),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

export const pricingComparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});

export const pricingToggleTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price_monthly: z.string(),
  price_annual: z.string(),
  suffix_monthly_fr: z.string().optional(),
  suffix_monthly_en: z.string().optional(),
  suffix_annual_fr: z.string().optional(),
  suffix_annual_en: z.string().optional(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

export const relatedCardSchema = z.object({
  kicker: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  href: z.string(),
});

export const statCounterItemSchema = z.object({
  value: z.string(), // valeur finale affichée (ex. '99.9%', '120', '4.8') - la partie numérique est animée
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label_fr: z.string(),
  label_en: z.string(),
});

export const statsBentoItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  delta: z.string().optional(),
});

export const stepsHorizontalStepSchema = z.object({
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const teamBioMemberSchema = z.object({
  photo_src: z.string().optional(),
  name: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  bio_fr: z.string(),
  bio_en: z.string(),
  link_href: z.string().optional(),
});

export const testimonialLogoMetricCardSchema = z.object({
  logo_src: z.string().optional(),
  company: z.string(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  metric_value: z.string(),
  metric_label_fr: z.string(),
  metric_label_en: z.string(),
  href: z.string().optional(),
});

export const testimonialMetricsItemSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});

export const trustBadgeSchema = z.object({
  glyph: z.string().optional(), // pictogramme texte court (◉, ✓, ⚿…) - pas d'icône externe
  label_fr: z.string(),
  label_en: z.string(),
  value_fr: z.string().optional(),
  value_en: z.string().optional(),
});

export const versusColumnSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  featured: z.boolean().default(false), // la colonne « nous »
});

export const versusRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});

