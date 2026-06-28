// Waimia · Co-location DS (Wave #38, T1) · feuille partagée PURE
//
// Sous-schemas réutilisables extraits UNE FOIS depuis `src/schemas/sections.ts`
// (rule 60 : déplacer, pas dupliquer). FEUILLE PURE : 0 import vers sections.ts /
// registry (anti-cycle). `z` vient de `astro:content` (cohérence build + codegen).

import { z } from 'astro:content';
// Enums de cellule réutilisés par `featureItemSchema` (overrides par item).
// Dépendance interne `_shared` → `_shared` (reste une feuille pure, 0 cycle vers sections.ts).
import { cellBgEnum, toneEnum, cellAlignYEnum } from './base';

export const bilingualString = z.object({
  fr: z.string(),
  en: z.string(),
});

export const ctaSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'accent', 'ghost', 'ghost-dark', 'terminal']).default('primary'),
  mag: z.number().min(0).max(1).optional(),
});

export const metricSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  emphasis: z.boolean().default(false),
});

export const featureItemSchema = z.object({
  icon: z.string().optional(), // SVG name dans components/svg
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  // ─── Overrides PAR ITEM (couches L10bis + L7-enfant), tous optionnels, défaut = hérite
  //     du réglage de section. Lus par le composant FeatureGrid → data-* sur la carte
  //     (.sec-item). Le moteur (section-layouts.css) fournit le contraste auto + le span.
  bg: cellBgEnum.optional(), // fond de cellule → data-cell-bg (contraste auto par le moteur)
  tone: toneEnum.optional(), // couleur de premier plan → data-tone
  cellAlignY: cellAlignYEnum.optional(), // distribution verticale → data-cell-y (between = CTA en bas)
  colSpan: z.enum(['1', '2', '3', '4']).optional(), // span de colonnes → data-col-span
  // ─── COMPOSITION par carte (SYS v2-E), optionnels, défaut = non rendu (rendu actuel) :
  //     meta = petite ligne (cardContent=title-desc-meta) ; media = chemin image placeholder
  //     editorial (cardMedia=image|image-bg), remplaçable CMS, JAMAIS d'URL en dur dans le CSS.
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  media: z.string().optional(),
  // CTA optionnel par carte (active les états reveal-cta / cellAlignY=between côté démo).
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});

export const stepSchema = z.object({
  num: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  duration_fr: z.string().optional(),
});

export const faqItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});

export const pricingTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

export const comparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  values: z.array(z.union([z.string(), z.boolean()])),
});

export const timelineEventSchema = z.object({
  date: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});
