// Waimia · Section schemas V2 (2026-05-15)
// Composable architecture — discriminated union de tous les types de section data-driven.
// Cf docs/15-STRATEGIC-AUDIT.md Tier 2 + docs/16-EXECUTION-TRACKER.md T2.1
//
// Pattern : chaque page = `sections: Section[]`. Le renderer mappe `type` → composant Astro.
// Ajouter une nouvelle section = (1) ajouter schema ici, (2) créer composant, (3) inscrire dans registry.

import { z } from 'astro:content';

/* ─── Sous-schémas réutilisables ─── */

const bilingualString = z.object({
  fr: z.string(),
  en: z.string(),
});

const ctaSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'accent', 'ghost', 'ghost-dark', 'terminal']).default('primary'),
  mag: z.number().min(0).max(1).optional(),
});

const metricSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  emphasis: z.boolean().default(false),
});

const featureItemSchema = z.object({
  icon: z.string().optional(), // SVG name dans components/svg
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

const stepSchema = z.object({
  num: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  duration_fr: z.string().optional(),
});

const faqItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});

const pricingTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

const testimonialSchema = z.object({
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

const comparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  values: z.array(z.union([z.string(), z.boolean()])),
});

const timelineEventSchema = z.object({
  date: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

/* ─── Section schemas (20 types) ─── */

// HERO variants
export const heroSplitSchema = z.object({
  type: z.literal('hero-split'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  right_block: z
    .object({
      kind: z.enum(['mini-map', 'workflow-svg', 'stats', 'image', 'mockup-terminal']),
      data: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});

export const heroCenteredSchema = z.object({
  type: z.literal('hero-centered'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});

export const heroFullBleedSchema = z.object({
  type: z.literal('hero-full-bleed'),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  background_kind: z.enum(['liquid-canvas', 'gradient-mesh', 'signature-grid', 'ink-paper']),
  cta_primary: ctaSchema.optional(),
});

// Hero · listing de hub (masthead éditorial, h1 monumental, 0 CTA)
export const heroHubListingSchema = z.object({
  type: z.literal('hero-hub-listing'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  decoration: z.boolean().default(false),
});

// Hero · détail d'un service (kicker § Service N.M, lede + proof-bar optionnelle)
export const heroServiceDetailSchema = z.object({
  type: z.literal('hero-service-detail'),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  metrics: z.array(metricSchema).min(2).max(4).optional(),
});

// Hero · page pilier / hub (h1 le plus monumental, stats-grid 4-col optionnelle)
export const heroPillarHubSchema = z.object({
  type: z.literal('hero-pillar-hub'),
  meta_kicker_fr: z.string(),
  meta_kicker_en: z.string(),
  hub_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats: z.array(metricSchema).min(2).max(4).optional(),
});

// Hero · étude de cas (kicker § Case N, h1 + SVG déco géométrique top-right)
export const heroCaseStudySchema = z.object({
  type: z.literal('hero-case-study'),
  case_num: z.string(),
  eyebrow_fr: z.string().default('§ Cas client'),
  eyebrow_en: z.string().default('§ Case study'),
  h1_fr: z.string(),
  h1_en: z.string(),
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

// Hero · home Waimia (réservé `/` et `/en/`) · mini-map 6 territoires + 3 preuves verticales
export const heroHomeSchema = z.object({
  type: z.literal('hero-home'),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  minimap: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        items_fr: z.string(),
        items_en: z.string(),
      }),
    )
    .length(6),
  proofs: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
  cta_primary_fr: z.string(),
  cta_primary_en: z.string(),
  cta_secondary_fr: z.string(),
  cta_secondary_en: z.string(),
  cta_sub_fr: z.string(),
  cta_sub_en: z.string(),
  cta_href: z.string().optional(),
  offer_href: z.string().optional(),
});

// Hero · landing magnétique (offres/site-web-ia-landing) · eyebrow + h1 italic + 2 CTA + dispo
export const heroLandingSchema = z.object({
  type: z.literal('hero-landing'),
  eyebrow_fr: z.string(),
  eyebrow_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  availability_fr: z.string().optional(),
  availability_en: z.string().optional(),
});

// Hero · solutions par problème (solutions/index) · masthead SVG rect rotated 12° + h1 monumental
export const heroProblemIndexSchema = z.object({
  type: z.literal('hero-problem-index'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  canonical_fr: z.string().optional(),
  canonical_en: z.string().optional(),
});

// Hero · cas client par secteur (SolutionsDetailTemplate) · dept + h1 + lead italique + CTA + tags
export const heroSectorSchema = z.object({
  type: z.literal('hero-sector'),
  dept_fr: z.string(),
  dept_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  tags: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
});

// Hero · masthead générique utilitaire (about / méthode / academy) · kicker + h1 + lede + align
export const heroUtilityMastheadSchema = z.object({
  type: z.literal('hero-utility-masthead'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  align: z.enum(['left', 'centered']).default('left'),
});

// Hero · hub académie (EcoleHubTemplate) · kicker mono + h1 + lede + bande stats
export const heroAcademyHubSchema = z.object({
  type: z.literal('hero-academy-hub'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats_label_fr: z.string().optional(),
  stats_label_en: z.string().optional(),
});

// Hero · masthead mutualisé pour pages d'index hub (offres/cas/secteurs/technologies)
// variant 'hub' (défaut) = style hub masthead original
// variant 'listing' = style hero-hub-listing (deco SVG optionnelle)
// variant 'detail' = style hero-utility (kicker optionnel, align gauche|centré)
export const heroHubMastheadSchema = z.object({
  type: z.literal('hero-hub-masthead'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  variant: z.enum(['hub', 'listing', 'detail']).default('hub'),
  decoration: z.boolean().default(false),
  align: z.enum(['left', 'centered']).default('left'),
  scale: z.enum(['monumental', 'standard']).optional(),
  transition_id: z.string().optional(),
  role_fr: z.string().optional(),
  role_en: z.string().optional(),
});

// Trust/legal pages : masthead documentaire + TOC sticky gauche.
export const trustLegalSectionSchema = z.object({
  type: z.literal('trust-legal-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  revised_at: z.string(),
  version: z.string().optional(),
  legal_footer_fr: z.string().optional(),
  legal_footer_en: z.string().optional(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// Welcome confirmation : checkmark, confirmation copy, next steps and back link.
export const welcomeSectionSchema = z.object({
  type: z.literal('welcome-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  next_steps: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      }),
    )
    .min(1)
    .max(3),
  back_label_fr: z.string().optional(),
  back_label_en: z.string().optional(),
  back_href: z.string().optional(),
});

// Listing/index pages : masthead + optional filters + list body + optional footer.
export const listIndexSectionSchema = z.object({
  type: z.literal('list-index-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  filters_html_fr: z.string().optional(),
  filters_html_en: z.string().optional(),
  list_html_fr: z.string().optional(),
  list_html_en: z.string().optional(),
  footer_html_fr: z.string().optional(),
  footer_html_en: z.string().optional(),
});

// Hero · détail d'une offre (OffresDetailTemplate) · cercles concentriques + tier + h1 + lead + CTA
export const heroOfferDetailSchema = z.object({
  type: z.literal('hero-offer-detail'),
  breadcrumb_label_fr: z.string().optional(),
  breadcrumb_label_en: z.string().optional(),
  breadcrumb_href: z.string().optional(),
  tier_fr: z.string(),
  tier_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
});

// Hero · couche technologique (TechnologiesDetailTemplate) · triangles SVG + layer badge + h1 + lead + CTA
export const heroTechLayerSchema = z.object({
  type: z.literal('hero-tech-layer'),
  layer_type: z.enum(['claude', 'os', 'orch']).default('claude'),
  layer_label_fr: z.string(),
  layer_label_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
});

// Hero · entonnoir conversion flagship (ConversionFunnelTemplate) · meta pills + benefits + proof + 2 CTA + stats
export const heroConversionFunnelSchema = z.object({
  type: z.literal('hero-conversion-funnel'),
  funnel_num: z.string(),
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

// Hero · hub avec stats (HubTemplate) · meta_kicker + num + h1 maximal + lede + KeyMetric grid 4-col
export const heroHubStatsSchema = z.object({
  type: z.literal('hero-hub-stats'),
  meta_kicker_fr: z.string(),
  meta_kicker_en: z.string(),
  hub_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        emphasis: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(4)
    .optional(),
});

// Hero · masthead service (ServiceDetailTemplate) · kicker § Service N + h1 + lede sobre
export const heroServiceMastheadSchema = z.object({
  type: z.literal('hero-service-masthead'),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · menu détail (DetailMenuTemplate) · parent kicker + num accent + h1 + lede sobre
export const heroDetailMenuSchema = z.object({
  type: z.literal('hero-detail-menu'),
  parent_kicker_fr: z.string(),
  parent_kicker_en: z.string(),
  detail_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · page auteur (AuthorPageTemplate) · breadcrumb équipe + role eyebrow + h1 split lead+accent + lede + portrait
export const heroAuthorSchema = z.object({
  type: z.literal('hero-author'),
  team_label_fr: z.string().optional(),
  team_label_en: z.string().optional(),
  team_href: z.string().optional(),
  name: z.string(),
  name_lead: z.string(),
  name_accent: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · lead magnet (LeadMagnetTemplate) · 2-col texte/cover + meta + download card
export const heroLeadMagnetSchema = z.object({
  type: z.literal('hero-lead-magnet'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  format_fr: z.string(),
  format_en: z.string(),
  published_at: z.string(),
  cover_url: z.string().optional(),
  download_label_fr: z.string().default('PDF gratuit · sur inscription'),
  download_label_en: z.string().default('Free PDF · on signup'),
  cta_label_fr: z.string(),
  cta_label_en: z.string(),
  cta_href: z.string().optional(),
});

// Hero · cours/formation (CourseDetailTemplate) · kicker + title + lede + meta-pills + cta-group
export const heroCourseSchema = z.object({
  type: z.literal('hero-course'),
  type_label_fr: z.string(),
  type_label_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        variant: z.enum(['default', 'accent', 'price']).default('default'),
      }),
    )
    .min(1)
    .max(8),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});

// Hero · étape tunnel (TunnelStepTemplate) · kicker + progress bar [NN] + h1 (hero ou section) + lede
export const heroTunnelStepSchema = z.object({
  type: z.literal('hero-tunnel-step'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1).max(12),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Bandeau marquee mono uppercase infini scroll (avec respect prefers-reduced-motion)
export const marqueeBandSchema = z.object({
  type: z.literal('marquee-band'),
  items_fr: z.array(z.string()).min(2).max(12),
  items_en: z.array(z.string()).min(2).max(12).optional(),
  separator: z.string().default('·'),
  repeat: z.number().int().min(1).max(4).default(2),
});

// Grille de 3 problèmes/frictions : num + kicker + h3 + body, grid auto-fit minmax 280px
export const problemsGridSchema = z.object({
  type: z.literal('problems-grid'),
  h2_fr: z.string(),
  h2_en: z.string(),
  problems: z
    .array(
      z.object({
        num: z.string().optional(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// Section "Why X stalls" — sticky chapter label + N FIG rows row-lines
export const whyStallsSchema = z.object({
  type: z.literal('why-stalls'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_lead_fr: z.string(),
  aside_lead_en: z.string(),
  rows: z
    .array(
      z.object({
        fig: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// Section "How we ship" — sticky pin scrub avec 4 étapes (numline + stage cards animées)
export const howWeShipSchema = z.object({
  type: z.literal('how-we-ship'),
  roman: z.string(),
  section_label_fr: z.string(),
  section_label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string(),
  aside_en: z.string(),
  steps: z
    .array(
      z.object({
        n: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(3)
    .max(6),
});

// Section operating layer — dark + console mockup + 4 attribute strip
export const operatingLayerSchema = z.object({
  type: z.literal('operating-layer'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  spec_label: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  terminal_label: z.string(),
  console_lines: z
    .array(
      z.object({
        k: z.string(),
        v: z.string(),
      }),
    )
    .min(2)
    .max(8),
  console_cmd: z.string(),
  attrs: z
    .array(
      z.object({
        k: z.string(),
        v_fr: z.string(),
        v_en: z.string(),
      }),
    )
    .length(4),
});

// Manifesto block — grand bloc display italique, kicker mono
export const manifestoBlockSchema = z.object({
  type: z.literal('manifesto-block'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  text_fr: z.string(),
  text_en: z.string(),
});

// Hero · essai éditorial (kicker + h1 + lede italique + meta auteur/date/temps)
export const heroEssaySchema = z.object({
  type: z.literal('hero-essay'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  author: z.string(),
  date: z.string(),
  reading_time_fr: z.string().optional(),
  reading_time_en: z.string().optional(),
  hero_image: z.string().optional(),
  hero_image_alt_fr: z.string().optional(),
  hero_image_alt_en: z.string().optional(),
});

// Hero · manifeste liquide (fond canvas React LiquidHero + headline display + lede + CTAs)
export const heroLiquidSchema = z.object({
  type: z.literal('hero-liquid'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  cta_primary_label_fr: z.string().optional(),
  cta_primary_label_en: z.string().optional(),
  cta_primary_href: z.string().optional(),
  cta_secondary_label_fr: z.string().optional(),
  cta_secondary_label_en: z.string().optional(),
  cta_secondary_href: z.string().optional(),
});

// PROOF / STATS
export const proofBarSchema = z.object({
  type: z.literal('proof-bar'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  metrics: z.array(metricSchema).min(2).max(6),
  layout: z.enum(['horizontal', 'vertical-stack']).default('horizontal'),
});

export const statBlockSchema = z.object({
  type: z.literal('stat-block'),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  metrics: z.array(metricSchema).min(1).max(8),
  layout: z.enum(['grid-3', 'grid-4', 'rows-hairlines']).default('grid-3'),
});

// Band before→après : valeur initiale → valeur finale magnifiée + delta (résultats, ROI)
export const metricShiftSchema = z.object({
  type: z.literal('metric-shift'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  shifts: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        before: z.string(),
        after: z.string(),
        delta_fr: z.string().optional(),
        delta_en: z.string().optional(),
        trend: z.enum(['up', 'down', 'flat']).optional(),
      }),
    )
    .min(2)
    .max(6),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
});

export const socialProofSchema = z.object({
  type: z.literal('social-proof'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  logos: z.array(z.object({ name: z.string(), src: z.string().optional() })),
  marquee: z.boolean().default(true),
});

// CONTENT
export const methodTimelineSchema = z.object({
  type: z.literal('method-timeline'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(stepSchema).min(2).max(6),
});

export const featureGridSchema = z.object({
  type: z.literal('feature-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  features: z.array(featureItemSchema).min(3).max(8),
  columns: z.enum(['2', '3', '4']).default('3'),
});

export const comparisonTableSchema = z.object({
  type: z.literal('comparison-table'),
  h2_fr: z.string(),
  h2_en: z.string(),
  column_headers_fr: z.array(z.string()).min(2),
  column_headers_en: z.array(z.string()).min(2),
  rows: z.array(comparisonRowSchema).min(2),
});

export const timelineBlockSchema = z.object({
  type: z.literal('timeline-block'),
  h2_fr: z.string(),
  h2_en: z.string(),
  events: z.array(timelineEventSchema).min(2),
});

export const mediaBlockSchema = z.object({
  type: z.literal('media-block'),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  media_kind: z.enum(['image', 'svg', 'video', 'embed']),
  src: z.string(),
  alt_fr: z.string().optional(),
  alt_en: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// PRICING
export const pricingTableSchema = z.object({
  type: z.literal('pricing-table'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  tiers: z.array(pricingTierSchema).min(1).max(5),
});

// FAQ / OBJECTIONS
export const faqAccordionSchema = z.object({
  type: z.literal('faq-accordion'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
});

export const objectionHandlerSchema = z.object({
  type: z.literal('objection-handler'),
  h2_fr: z.string(),
  h2_en: z.string(),
  objections: z
    .array(
      z.object({
        objection_fr: z.string(),
        objection_en: z.string(),
        response_fr: z.string(),
        response_en: z.string(),
      }),
    )
    .min(2),
});

// CTA
export const ctaFinalSchema = z.object({
  type: z.literal('cta-final'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  chapter_num: z.string().optional(),
  chapter_title_fr: z.string().optional(),
  chapter_title_en: z.string().optional(),
  availability_fr: z.string().optional(),
  availability_en: z.string().optional(),
  reassurance_fr: z.string().optional(),
  reassurance_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink', 'accent']).default('ink'),
});

export const ctaBandSchema = z.object({
  type: z.literal('cta-band'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper-2', 'ink', 'accent']).default('paper-2'),
});

export const ctaInlineSchema = z.object({
  type: z.literal('cta-inline'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
});

// SOCIAL / TRUST
export const testimonialBlockSchema = z.object({
  type: z.literal('testimonial-block'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  testimonials: z.array(testimonialSchema).min(1).max(6),
  layout: z.enum(['carousel', 'grid-2', 'rows']).default('grid-2'),
});

export const guaranteeBlockSchema = z.object({
  type: z.literal('guarantee-block'),
  guarantees: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1)
    .max(4),
});

// Diagramme d'architecture · N canaux entrée → système central → M sorties (signature visuelle)
export const architectureDiagramSchema = z.object({
  type: z.literal('architecture-diagram'),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  inputs_fr: z.array(z.string()).min(2).max(8),
  inputs_en: z.array(z.string()).min(2).max(8),
  outputs_fr: z.array(z.string()).min(2).max(6),
  outputs_en: z.array(z.string()).min(2).max(6),
  system_label: z.string(),
  system_kicker: z.string(),
  system_subtitle: z.string(),
  show_loop: z.boolean().default(true),
  loop_label_fr: z.string(),
  loop_label_en: z.string(),
  caption_fr: z.string(),
  caption_en: z.string(),
});

// Grille de services 3×2 avec métrique, body et ligne de connecteurs
export const servicesGridSchema = z.object({
  type: z.literal('services-grid'),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  connectors_label_fr: z.string().default('Connecteurs'),
  connectors_label_en: z.string().default('Connectors'),
  services: z
    .array(
      z.object({
        fig: z.string(),
        metric_fr: z.string(),
        metric_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        connectors_fr: z.string(),
        connectors_en: z.string(),
      }),
    )
    .min(3)
    .max(6),
});

// Pyramide de maturité · timeline 4 étapes + SVG paliers + grille 4 cards
export const maturityPyramidSchema = z.object({
  type: z.literal('maturity-pyramid'),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  timeline_label_fr: z.string().default('Progression de maturité IA'),
  timeline_label_en: z.string().default('AI maturity path'),
  tier_cta_fr: z.string().default('Voir le palier →'),
  tier_cta_en: z.string().default('Open tier →'),
  steps: z
    .array(
      z.object({
        roman: z.string(),
        verb_fr: z.string(),
        verb_en: z.string(),
        stage_fr: z.string(),
        stage_en: z.string(),
      }),
    )
    .length(4),
  tiers: z
    .array(
      z.object({
        n: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        items_fr: z.array(z.string()),
        items_en: z.array(z.string()),
        action_fr: z.string(),
        action_en: z.string(),
        href: z.string(),
      }),
    )
    .length(4),
});

// Index éditorial de cas d'usage horizontaux (rows numérotées vers /solutions/*)
export const useCaseIndexSchema = z.object({
  type: z.literal('use-case-index'),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  num_prefix_fr: z.string().default('USE CASE'),
  num_prefix_en: z.string().default('USE CASE'),
  items: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  footer_label_fr: z.string().optional(),
  footer_label_en: z.string().optional(),
  footer_href: z.string().optional(),
});

// Grille de cas clients · table éditoriale 6 colonnes (idx · client · secteur · stack · impact)
export const caseCardGridSchema = z.object({
  type: z.literal('case-card-grid'),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  case_label_fr: z.string().default('CASE'),
  case_label_en: z.string().default('CASE'),
  sector_label_fr: z.string().default('Secteur'),
  sector_label_en: z.string().default('Sector'),
  impact_label_fr: z.string().default('Impact'),
  impact_label_en: z.string().default('Impact'),
  cases: z
    .array(
      z.object({
        client: z.string(),
        sector_fr: z.string(),
        sector_en: z.string(),
        duration: z.string(),
        stack: z.string(),
        impact_fr: z.string(),
        impact_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(6),
  all_label_fr: z.string().optional(),
  all_label_en: z.string().optional(),
  all_href: z.string().optional(),
});

// Pyramide SVG isocèle de l'offre · 3 tiers labellisés
export const tierPyramidSvgSchema = z.object({
  type: z.literal('tier-pyramid-svg'),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  tiers: z
    .array(
      z.object({
        roman: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
});

// Grille de palier d'offres · standard / featured hero dark / transparent
export const offerTierGridSchema = z.object({
  type: z.literal('offer-tier-grid'),
  variant: z.enum(['standard', 'featured', 'transparent']).default('standard'),
  wrap: z.boolean().default(true),
  eyebrow_fr: z.string(),
  eyebrow_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  lede_max_width: z.string().optional(),
  featured_card: z
    .object({
      eyebrow_fr: z.string(),
      eyebrow_en: z.string(),
      title_fr: z.string(),
      title_en: z.string(),
      sub_fr: z.string(),
      sub_en: z.string(),
      lead_fr: z.string(),
      lead_en: z.string(),
      cta_fr: z.string(),
      cta_en: z.string(),
      href: z.string(),
    })
    .optional(),
  offers: z
    .array(
      z.object({
        price_fr: z.string(),
        price_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        cta_fr: z.string(),
        cta_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

// Grille auteurs · cartes photo / rôle / description / compteur / CTA
export const teamCardGridSchema = z.object({
  type: z.literal('team-card-grid'),
  cta_label_fr: z.string().default('Voir le profil →'),
  cta_label_en: z.string().default('View profile →'),
  count_singular_fr: z.string().default('publication'),
  count_singular_en: z.string().default('publication'),
  count_plural_fr: z.string().default('publications'),
  count_plural_en: z.string().default('publications'),
  members: z
    .array(
      z.object({
        name: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        href: z.string(),
        photo: z.string().optional(),
        photo_alt_fr: z.string().default('Portrait auteur Waimia'),
        photo_alt_en: z.string().default('Waimia author portrait'),
        count: z.number().int().min(0).default(0),
        transition_id: z.string().optional(),
      }),
    )
    .min(1)
    .max(6),
});

// Hero Atlas · 2 colonnes avec mini-map des piliers
export const heroAtlasSchema = z.object({
  type: z.literal('hero-atlas'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  subhead_fr: z.string(),
  subhead_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  map_aria_label_fr: z.string(),
  map_aria_label_en: z.string(),
  map_kicker_fr: z.string(),
  map_kicker_en: z.string(),
  pillars: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        deliverable_fr: z.string(),
        deliverable_en: z.string(),
      }),
    )
    .length(4),
});

// Persona detail · grille 2×2 + footer méta sombre
export const personaAttributesGridSchema = z.object({
  type: z.literal('persona-attributes-grid'),
  blocks: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        items_fr: z.array(z.string()).min(1),
        items_en: z.array(z.string()).min(1),
      }),
    )
    .length(4),
  meta: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        value_fr: z.string(),
        value_en: z.string(),
      }),
    )
    .length(3),
});

const relatedCardSchema = z.object({
  kicker: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  href: z.string(),
});

// Split éditorial ressources · blog / livres blancs
export const editorialSplitGridSchema = z.object({
  type: z.literal('editorial-split-grid'),
  left: z.object({
    slot: z.literal('left').default('left'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
  right: z.object({
    slot: z.literal('right').default('right'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
});

// Bande secteurs à venir · kicker + H2 + pills
export const comingSoonPillsSchema = z.object({
  type: z.literal('coming-soon-pills'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  pills_fr: z.array(z.string()).min(1).max(16),
  pills_en: z.array(z.string()).min(1).max(16),
});

// Grille de 3 engagements / garanties (hairline border, titre display + body sans)
export const commitmentsGridSchema = z.object({
  type: z.literal('commitments-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  commitments: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// Callout de marque fond paper-2 : kicker §, h2 display italic, body + CTA optionnel
export const brandedCalloutSchema = z.object({
  type: z.literal('branded-callout'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body1_fr: z.string(),
  body1_en: z.string(),
  body2_fr: z.string().optional(),
  body2_en: z.string().optional(),
  cta: ctaSchema.optional(),
});

// Index éditorial de publications (lignes numérotées : date · tag · titre · flèche)
export const editorialPreviewSchema = z.object({
  type: z.literal('editorial-preview'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  roman: z.string().optional(),
  act_label_fr: z.string().optional(),
  act_label_en: z.string().optional(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z
    .array(
      z.object({
        num: z.string(),
        date_fr: z.string(),
        date_en: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  all_label_fr: z.string().optional(),
  all_label_en: z.string().optional(),
  all_href: z.string().optional(),
});

// Bande newsletter fond sombre : titre éditorial + formulaire capture email
export const newsletterBandSchema = z.object({
  type: z.literal('newsletter-band'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  placeholder_fr: z.string().default('votre@email.com'),
  placeholder_en: z.string().default('your@email.com'),
  cta_label_fr: z.string().default("S'abonner →"),
  cta_label_en: z.string().default('Subscribe →'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  form_action: z.string().optional(),
});

// Barre de spécifications projet : N colonnes (label + valeur), CSS var --spec-cols
export const specBarSchema = z.object({
  type: z.literal('spec-bar'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  specs: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// Grille de livrables tangibles : cards numérotées + tag format/durée
export const deliverablesGridSchema = z.object({
  type: z.literal('deliverables-grid'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        format_fr: z.string().optional(),
        format_en: z.string().optional(),
        duration_fr: z.string().optional(),
        duration_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});

// Bande stack technologique : kicker + lead + rangée de pills
export const techStackBandSchema = z.object({
  type: z.literal('tech-stack-band'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        kind: z.enum(['primary', 'open', 'neutral']).optional(),
      }),
    )
    .min(2)
    .max(16),
});

// Bande de cards connexes : header optionnel + molécule RelatedCards
export const relatedCardsBandSchema = z.object({
  type: z.literal('related-cards-band'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  cards: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(3),
});

// Citation éditoriale isolée : wrapper catalogue autour de PullQuote
export const pullQuoteBlockSchema = z.object({
  type: z.literal('pull-quote-block'),
  quote_fr: z.string(),
  quote_en: z.string(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  variant: z.enum(['breakout', 'inline', 'centered']).default('centered'),
});

// Liste d'inclusions inline séparée par point médian
export const inclusionsListSchema = z.object({
  type: z.literal('inclusions-list'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  items_fr: z.array(z.string()).min(2).max(16),
  items_en: z.array(z.string()).min(2).max(16),
});

// Énoncé macro-typo du problème avec stats optionnelles
export const problemStatementSchema = z.object({
  type: z.literal('problem-statement'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  statement_fr: z.string(),
  statement_en: z.string(),
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

/* ─── Union discriminée pour validation ─── */

export const sectionSchema = z.discriminatedUnion('type', [
  heroSplitSchema,
  heroCenteredSchema,
  heroFullBleedSchema,
  heroHubListingSchema,
  heroServiceDetailSchema,
  heroPillarHubSchema,
  heroCaseStudySchema,
  heroHomeSchema,
  heroLandingSchema,
  heroProblemIndexSchema,
  heroSectorSchema,
  heroUtilityMastheadSchema,
  heroAcademyHubSchema,
  heroHubMastheadSchema,
  trustLegalSectionSchema,
  welcomeSectionSchema,
  listIndexSectionSchema,
  heroOfferDetailSchema,
  heroTechLayerSchema,
  heroConversionFunnelSchema,
  heroHubStatsSchema,
  heroServiceMastheadSchema,
  heroDetailMenuSchema,
  heroAuthorSchema,
  heroLeadMagnetSchema,
  heroCourseSchema,
  heroTunnelStepSchema,
  marqueeBandSchema,
  problemsGridSchema,
  whyStallsSchema,
  howWeShipSchema,
  operatingLayerSchema,
  manifestoBlockSchema,
  heroEssaySchema,
  heroLiquidSchema,
  proofBarSchema,
  statBlockSchema,
  metricShiftSchema,
  socialProofSchema,
  methodTimelineSchema,
  featureGridSchema,
  comparisonTableSchema,
  timelineBlockSchema,
  mediaBlockSchema,
  pricingTableSchema,
  faqAccordionSchema,
  objectionHandlerSchema,
  ctaFinalSchema,
  ctaBandSchema,
  ctaInlineSchema,
  testimonialBlockSchema,
  guaranteeBlockSchema,
  architectureDiagramSchema,
  servicesGridSchema,
  maturityPyramidSchema,
  useCaseIndexSchema,
  caseCardGridSchema,
  tierPyramidSvgSchema,
  offerTierGridSchema,
  teamCardGridSchema,
  heroAtlasSchema,
  personaAttributesGridSchema,
  editorialSplitGridSchema,
  comingSoonPillsSchema,
  commitmentsGridSchema,
  brandedCalloutSchema,
  editorialPreviewSchema,
  newsletterBandSchema,
  specBarSchema,
  deliverablesGridSchema,
  techStackBandSchema,
  relatedCardsBandSchema,
  pullQuoteBlockSchema,
  inclusionsListSchema,
  problemStatementSchema,
]);

export type SectionData = (typeof sectionSchema)['_output'];

/**
 * Schema usable directement dans content collections :
 * ```ts
 * import { sectionsArraySchema } from '../schemas/sections';
 * schema: z.object({
 *   ...baseFields,
 *   sections: sectionsArraySchema,
 * })
 * ```
 */
export const sectionsArraySchema = z.array(sectionSchema).default([]);

/* ─── Type helpers ─── */

export type SectionType = SectionData['type'];

export type SectionByType<T extends SectionType> = Extract<SectionData, { type: T }>;
