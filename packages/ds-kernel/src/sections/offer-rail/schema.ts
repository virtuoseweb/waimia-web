// Waimia · Co-location DS · module `offer-rail` · schema.
// MONEY SLOT catalogue (ex-bloc bespoke he-offres de la home). z.object SANS discriminatedUnion
// (assemble par gen-section-aggregate). z vient de 'zod'. Bilingue fr/en, 0 U+2014 (rule 58).

import { z } from 'zod';

// Une offre : etiquette + titre (peut porter <i>) + corps + puces optionnelles + lien.
// accent='complement' teinte l'offre avec le token DS --complementary (branche distincte).
const offerRailOfferSchema = z.object({
  tag_fr: z.string(),
  tag_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  accent: z.enum(['complement']).optional(),
  points_fr: z.array(z.string()).optional(),
  points_en: z.array(z.string()).optional(),
  link_label_fr: z.string(),
  link_label_en: z.string(),
  link_href: z.string(),
});

// Un service de la rangee compacte reliee par la dorsale (metric mono + label + connecteurs).
const offerRailServiceSchema = z.object({
  metric_fr: z.string(),
  metric_en: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  sub_fr: z.string(),
  sub_en: z.string(),
  href: z.string(),
});

// Une FAMILLE = un onglet (aria tab/panel). id = slug kebab (he-tab-<id> / he-panel-<id>).
// layout : 'diptych' (2 col, defaut) | 'trio' (3 col). rail : dorsale SVG dessinee au scroll.
// services / panel_cta : optionnels par famille (ex. la famille 1 a la rangee de services +
// dorsale ; la famille 2 un CTA de panneau).
const offerRailFamilySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'id doit etre un slug kebab-case (a-z, 0-9, tirets)'),
  tab_label_fr: z.string(),
  tab_label_en: z.string(),
  intro_eyebrow_fr: z.string(),
  intro_eyebrow_en: z.string(),
  intro_lede_fr: z.string(),
  intro_lede_en: z.string(),
  layout: z.enum(['diptych', 'trio']).optional(),
  offers: z.array(offerRailOfferSchema).min(1).max(4),
  rail: z.boolean().optional(),
  services_intro_fr: z.string().optional(),
  services_intro_en: z.string().optional(),
  services: z.array(offerRailServiceSchema).optional(),
  panel_cta_label_fr: z.string().optional(),
  panel_cta_label_en: z.string().optional(),
  panel_cta_href: z.string().optional(),
});

export const schema = z.object({
  type: z.literal('offer-rail'),
  background: z.enum(['paper', 'paper-2', 'paper-3']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  tablist_label_fr: z.string(),
  tablist_label_en: z.string(),
  families: z.array(offerRailFamilySchema).min(1).max(6),
});
