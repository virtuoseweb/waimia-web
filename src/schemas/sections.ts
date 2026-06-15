// Waimia · Section schemas V2 (2026-05-15)
// Composable architecture — discriminated union de tous les types de section data-driven.
// Cf docs/15-STRATEGIC-AUDIT.md Tier 2 + docs/16-EXECUTION-TRACKER.md T2.1
//
// Pattern : chaque page = `sections: Section[]`. Le renderer mappe `type` → composant Astro.
// Ajouter une nouvelle section = (1) ajouter schema ici, (2) créer composant, (3) inscrire dans registry.

import { z } from 'astro:content';

/* ─── Sous-schémas réutilisables ─── */

/**
 * Mixin de présentation transverse (Phase B · système de variation, cf docs/46).
 * Axes orthogonaux partagés par les composants-familles paramétrables. On l'applique
 * via `.extend(presentationSchema.shape)` (les champs ajoutés sont tous optionnels →
 * 0 régression : un schema sans valeur garde son rendu par défaut).
 *  - background : déclinaison palette (idiome `data-bg`, déjà consolidé A1).
 *  - layout     : id d'un preset de grille (cf src/styles/layouts.css → var --sec-grid).
 *  - density    : cran de rythme vertical (mappe sur la famille --section-*).
 * `effects` viendra dans une phase ultérieure (NE PAS introduire avant que layout+density
 * soient prouvés sur la famille hero).
 */
const presentationSchema = z.object({
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  layout: z.string().optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
});

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
  // background/layout/density mutualisés via le mixin presentationSchema (Phase B, docs/46).
  ...presentationSchema.shape,
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
  // background/layout/density mutualisés via le mixin presentationSchema (Phase B, docs/46).
  ...presentationSchema.shape,
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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

// Hero · landing magnétique · eyebrow + h1 italic + 2 CTA + dispo
export const heroLandingSchema = z.object({
  type: z.literal('hero-landing'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  canonical_fr: z.string().optional(),
  canonical_en: z.string().optional(),
  transition_id: z.string().optional(),
});

// Hero · cas client par secteur (SolutionsDetailTemplate) · dept + h1 + lead italique + CTA + tags
export const heroSectorSchema = z.object({
  type: z.literal('hero-sector'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  hero_variant: z.enum(['equilibre', 'showcase', 'encadre']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats_label_fr: z.string().optional(),
  stats_label_en: z.string().optional(),
});

// Hero · masthead mutualisé pour pages d'index hub (offres/realisations/secteurs/technologies)
// variant 'hub' (défaut) = style hub masthead original
// variant 'listing' = style hero-hub-listing (deco SVG optionnelle)
// variant 'detail' = style hero-utility (kicker optionnel, align gauche|centré)
export const heroHubMastheadSchema = z.object({
  type: z.literal('hero-hub-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  hero_variant: z.enum(['equilibre', 'showcase', 'encadre']).optional(),
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

// Hero · couche technologique (TechnologiesDetailTemplate) · triangles SVG + layer badge + h1 + lead + CTA
export const heroTechLayerSchema = z.object({
  type: z.literal('hero-tech-layer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · menu détail (DetailMenuTemplate) · parent kicker + num accent + h1 + lede sobre
export const heroDetailMenuSchema = z.object({
  type: z.literal('hero-detail-menu'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1).max(12),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · étape tunnel V2 — kicker calculé depuis offre_label+step+progress_total (TunnelStepTemplate)
export const tunnelStepHeroSchema = z.object({
  type: z.literal('tunnel-step-hero'),
  offre_label: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Nav · étape tunnel — prev + cta + meta (TunnelStepTemplate footer)
export const tunnelStepNavSchema = z.object({
  type: z.literal('tunnel-step-nav'),
  prev_href: z.string().optional(),
  prev_label_fr: z.string().default('← Étape précédente'),
  prev_label_en: z.string().default('← Previous step'),
  cta: z.object({
    label_fr: z.string(),
    label_en: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'accent', 'ghost']).default('primary'),
  }),
  reading_fr: z.string().default('Temps de lecture : 2 min'),
  reading_en: z.string().default('2 min read'),
  back_href: z.string(),
  back_label: z.string(),
});

// Bandeau marquee mono uppercase infini scroll (avec respect prefers-reduced-motion)
export const marqueeBandSchema = z.object({
  type: z.literal('marquee-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  items_fr: z.array(z.string()).min(2).max(12),
  items_en: z.array(z.string()).min(2).max(12).optional(),
  separator: z.string().default('·'),
  repeat: z.number().int().min(1).max(4).default(2),
});

// Grille de 3 problèmes/frictions : num + kicker + h3 + body, grid auto-fit minmax 280px
export const problemsGridSchema = z.object({
  type: z.literal('problems-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  text_fr: z.string(),
  text_en: z.string(),
});

// Hero · essai éditorial (kicker + h1 + lede italique + meta auteur/date/temps)
export const heroEssaySchema = z.object({
  type: z.literal('hero-essay'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  metrics: z.array(metricSchema).min(2).max(6),
  layout: z.enum(['horizontal', 'vertical-stack']).default('horizontal'),
  /** Lien d'attribution optionnel sous les métriques (« Voir les 4 dossiers → ») : source les chiffres. */
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  link_href: z.string().optional(),
});

export const statBlockSchema = z.object({
  type: z.literal('stat-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  metrics: z.array(metricSchema).min(1).max(8),
  layout: z.enum(['grid-3', 'grid-4', 'rows-hairlines', 'split-quote']).default('grid-3'),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
});

export const socialProofSchema = z.object({
  type: z.literal('social-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  logos: z.array(z.object({ name: z.string(), src: z.string().optional() })),
  marquee: z.boolean().default(true),
});

// ecosystem-partners · logos partenaires unifiés (masque alpha + currentColor).
// docs/48 · grille groupée par catégorie / mur / marquee. Variante dark `ink`.
export const ecosystemPartnersSchema = z.object({
  type: z.literal('ecosystem-partners'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  layout: z.enum(['wall', 'grid', 'marquee']).default('grid'),
  partners: z
    .array(
      z.object({
        name: z.string(),
        asset: z.string(),
        href: z.string().optional(),
        external: z.boolean().optional(),
        category: z.string().optional(),
        // Calibrage poids optique (docs/48) : rétrécit la boîte des marques
        // compactes pour égaliser le poids d'encre. Surcharge --logo-w/--logo-h.
        box: z
          .object({ h: z.string().optional(), w: z.string().optional() })
          .optional(),
      }),
    )
    .min(1),
});

// CONTENT
export const methodTimelineSchema = z.object({
  type: z.literal('method-timeline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  features: z.array(featureItemSchema).min(3).max(8),
  columns: z.enum(['2', '3', '4']).default('3'),
});

export const comparisonTableSchema = z.object({
  type: z.literal('comparison-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  column_headers_fr: z.array(z.string()).min(2),
  column_headers_en: z.array(z.string()).min(2),
  rows: z.array(comparisonRowSchema).min(2),
});

export const timelineBlockSchema = z.object({
  type: z.literal('timeline-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  events: z.array(timelineEventSchema).min(2),
});

export const mediaBlockSchema = z.object({
  type: z.literal('media-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // 'inset' = média centré sur --wrap-prose (illustrations carrées) · défaut = full (inchangé)
  display: z.enum(['full', 'inset']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  tiers: z.array(pricingTierSchema).min(1).max(5),
});

// FAQ / OBJECTIONS
export const faqAccordionSchema = z.object({
  type: z.literal('faq-accordion'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  /** Ouvre le premier item par défaut (ancrage prix visible sans clic). */
  open_first: z.boolean().optional(),
});

export const objectionHandlerSchema = z.object({
  type: z.literal('objection-handler'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('ink'),
});

export const ctaBandSchema = z.object({
  type: z.literal('cta-band'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
});

export const ctaInlineSchema = z.object({
  type: z.literal('cta-inline'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).optional(),
});

// SOCIAL / TRUST
export const testimonialBlockSchema = z.object({
  type: z.literal('testimonial-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  testimonials: z.array(testimonialSchema).min(1).max(6),
  layout: z.enum(['carousel', 'grid-2', 'rows']).default('grid-2'),
});

export const guaranteeBlockSchema = z.object({
  type: z.literal('guarantee-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  inputs_fr: z.array(z.string()).min(2).max(8),
  inputs_en: z.array(z.string()).min(2).max(8),
  /** Exemples concrets par canal d'entrée (tooltip <title> sur le nœud, même index que inputs). */
  input_examples_fr: z.array(z.string()).optional(),
  input_examples_en: z.array(z.string()).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
        /** Lien optionnel vers le cas d'usage /solutions/* du service (fusion UseCaseIndex). */
        usecase_label_fr: z.string().optional(),
        usecase_label_en: z.string().optional(),
        usecase_href: z.string().optional(),
      }),
    )
    .min(3)
    .max(6),
  /** Liens de pied de grille optionnels (« Six cas d'usage métier → », « Adapté à votre secteur → »). */
  foot_links: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .max(3)
    .optional(),
});

// Pyramide de maturité · variant 'full' = timeline 4 étapes + SVG paliers + grille 4 cards ·
// variant 'cards-only' = les 4 cards seules (1 info = 1 représentation), enrichies stage + prix + jauge
export const maturityPyramidSchema = z.object({
  type: z.literal('maturity-pyramid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['full', 'cards-only']).default('full'),
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
    .length(4)
    .optional(),
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
        /** Stage de maturité en sur-titre de card (AUDIT / WORKFLOW / SYSTÈME / INFRASTRUCTURE). */
        stage_fr: z.string().optional(),
        stage_en: z.string().optional(),
        /** Prix d'entrée du palier (« dès 1 500 € HT · 1 semaine ») : source FAQ/offres, jamais inventé. */
        price_fr: z.string().optional(),
        price_en: z.string().optional(),
      }),
    )
    .length(4),
});

// Index éditorial de cas d'usage horizontaux (rows numérotées vers /solutions/*)
export const useCaseIndexSchema = z.object({
  type: z.literal('use-case-index'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  variant: z.enum(['breakout', 'inline', 'centered']).default('centered'),
});

// Liste d'inclusions inline séparée par point médian
export const inclusionsListSchema = z.object({
  type: z.literal('inclusions-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
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
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  statement_fr: z.string(),
  statement_en: z.string(),
  dropcap: z.boolean().optional(),
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

/* ─── Sections catalogue · variations (12 nouveaux types) ─── */

// Mosaïque bento asymétrique de 5 cellules (1 grande 2x2 + 4 petites)
export const bentoGridSchema = z.object({
  type: z.literal('bento-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  cells: z.array(z.object({
    glyph: z.string().optional(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
  })).min(5).max(5),
});

// Lignes alternées visuel/texte (gauche-droite, droite-gauche)
export const featureZigzagSchema = z.object({
  type: z.literal('feature-zigzag'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  rows: z.array(
    z.object({
      kicker_fr: z.string().optional(),
      kicker_en: z.string().optional(),
      h3_fr: z.string(),
      h3_en: z.string(),
      body_fr: z.string(),
      body_en: z.string(),
      link_label_fr: z.string().optional(),
      link_label_en: z.string().optional(),
      link_href: z.string().optional(),
    })
  ).min(2).max(6),
});

// Grille statique de logos partenaires (grayscale → couleur au hover)
const logoWallItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const logoWallSchema = z.object({
  type: z.literal('logo-wall'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  logos: z.array(logoWallItemSchema).min(3).max(20),
});

// Matrice comparative tarifaire (3 plans, colonne recommandée)
const pricingComparisonPlanSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  price_note_fr: z.string().optional(),
  price_note_en: z.string().optional(),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

const pricingComparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});

export const pricingComparisonMatrixSchema = z.object({
  type: z.literal('pricing-comparison-matrix'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  plans: z.array(pricingComparisonPlanSchema).min(2).max(4),
  rows: z.array(pricingComparisonRowSchema).min(2),
});

// Galerie éditoriale en colonnes CSS (masonry naturel)
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

export const galleryMasonrySchema = z.object({
  type: z.literal('gallery-masonry'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  items: z.array(galleryMasonryItemSchema).min(3).max(12),
});

// Section fonctionnalités en onglets cliquables (aria-compliant)
export const featureTabsSchema = z.object({
  type: z.literal('feature-tabs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  tabs: z.array(z.object({
    icon: z.string().optional(),
    label_fr: z.string(),
    label_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
    visual_label_fr: z.string().optional(),
    visual_label_en: z.string().optional(),
  })).min(2).max(6),
});

// Trois colonnes iconographiques séparées par hairlines verticaux
const iconTrioItemSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const iconTrioSchema = z.object({
  type: z.literal('icon-trio'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  items: z.array(iconTrioItemSchema).length(3),
});

// Grande citation pleine lumière sur fond paper-2
export const quoteSpotlightSchema = z.object({
  type: z.literal('quote-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  avatar: z.string().optional(),
});

// Étapes numérotées en ligne avec pastilles et connecteurs hairline
const stepsHorizontalStepSchema = z.object({
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const stepsHorizontalSchema = z.object({
  type: z.literal('steps-horizontal'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  steps: z.array(stepsHorizontalStepSchema).min(2).max(6),
});

// Bandeau CTA asymétrique 2 colonnes (texte gauche, visuel SVG droite)
export const ctaSplitVisualSchema = z.object({
  type: z.literal('cta-split-visual'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
});

// Quatre KPI en grille bento de tailles inégales
export const statsBentoItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  delta: z.string().optional(),
});

export const statsBentoSchema = z.object({
  type: z.literal('stats-bento'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  stats: z.array(statsBentoItemSchema).min(4).max(4),
});

// Deux cartes côte à côte (Sans / Avec) — contraste avant/après
const comparisonDuoItemSchema = z.object({
  text_fr: z.string(),
  text_en: z.string(),
});

export const comparisonDuoSchema = z.object({
  type: z.literal('comparison-duo'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  without_label_fr: z.string(),
  without_label_en: z.string(),
  without_title_fr: z.string(),
  without_title_en: z.string(),
  without_items: z.array(comparisonDuoItemSchema).min(2).max(6),
  with_label_fr: z.string(),
  with_label_en: z.string(),
  with_title_fr: z.string(),
  with_title_en: z.string(),
  with_items: z.array(comparisonDuoItemSchema).min(2).max(6),
});

// Liste-catalogue éditoriale de services (rows § num · titre · desc · meta · flèche) - remontée HubTemplate « SERVICE CATALOG »
export const serviceCatalogListSchema = z.object({
  type: z.literal('service-catalog-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  services: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        meta: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  footer_label_fr: z.string().optional(),
  footer_label_en: z.string().optional(),
  footer_href: z.string().optional(),
});

// Section qualification fit/no-fit sur fond ink - remontée HubTemplate « FIT / NO FIT » + molécule FitColumns
export const fitColumnsSchema = z.object({
  type: z.literal('fit-columns'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  heading_fr: z.string(),
  heading_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  yes_title_fr: z.string(),
  yes_title_en: z.string(),
  yes_items_fr: z.array(z.string()).min(1).max(8),
  yes_items_en: z.array(z.string()).min(1).max(8),
  no_title_fr: z.string(),
  no_title_en: z.string(),
  no_items_fr: z.array(z.string()).min(1).max(8),
  no_items_en: z.array(z.string()).min(1).max(8),
});

// Comparateur éditorial : header (kicker + heading display) + tableau bilingue - remontée page conseil « Comparateur services » + composant EditorialTable
export const editorialTableBlockSchema = z.object({
  type: z.literal('editorial-table-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(6),
  columns_en: z.array(z.string()).min(2).max(6),
  rows_fr: z.array(z.array(z.string()).min(2).max(6)).min(1),
  rows_en: z.array(z.array(z.string()).min(2).max(6)).min(1),
  variant: z.enum(['default', 'compact', 'editorial']).default('editorial'),
});

// Arbre de décision : header (kicker + heading display) + <ol> numéroté - remontée page conseil « Arbre de décision »
export const decisionListSchema = z.object({
  type: z.literal('decision-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  items: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// ─── Technologies (TechnologiesDetailTemplate → composable) ───

// §2 Positioning Split · prise de position éditoriale (statement manifesto + facts mono kv)
export const techPositioningSplitSchema = z.object({
  type: z.literal('tech-positioning-split'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  statement_fr: z.string(),
  statement_en: z.string(),
  facts: z
    .array(
      z.object({
        k: z.string(),
        v_fr: z.string(),
        v_en: z.string(),
      }),
    )
    .max(6)
    .optional(),
});

// §3 Capabilities Specs · inventaire technique en table (capacité · description · statut)
export const techCapabilitiesSpecsSchema = z.object({
  type: z.literal('tech-capabilities-specs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  capabilities: z
    .array(
      z.object({
        name_fr: z.string(),
        name_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        status: z.enum(['active', 'beta', 'planned']).default('active'),
      }),
    )
    .min(1),
});

// §4 Models Table · comparaison modèles (5 colonnes Modèle / Profil / Coût / Contexte / Usages)
export const techModelsTableSchema = z.object({
  type: z.literal('tech-models-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  models: z
    .array(
      z.object({
        name: z.string(),
        version: z.string(),
        cost: z.string().optional(),
        context: z.string().optional(),
        use_case_fr: z.string(),
        use_case_en: z.string(),
      }),
    )
    .min(1),
});

// §5 When To Use Dual · aide décision (puces +/− mono)
export const techWhenDualSchema = z.object({
  type: z.literal('tech-when-dual'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  use_title_fr: z.string(),
  use_title_en: z.string(),
  use_items_fr: z.array(z.string()).min(1).max(10),
  use_items_en: z.array(z.string()).min(1).max(10),
  avoid_title_fr: z.string(),
  avoid_title_en: z.string(),
  avoid_items_fr: z.array(z.string()).min(1).max(10),
  avoid_items_en: z.array(z.string()).min(1).max(10),
});

// §6 Integration Flow · position dans la stack en frise verticale numérotée
export const techIntegrationFlowSchema = z.object({
  type: z.literal('tech-integration-flow'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  steps: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1),
});

// §Solutions · Pain Points · 3 cards numérotées (empathie métier "pourquoi ça bloque")
export const painPointsSchema = z.object({
  type: z.literal('pain-points'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Friction'),
  eyebrow_en: z.string().default('§ Friction'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  items: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// §Solutions · Workflows Table · brique signature 5 colonnes (№ / workflow / modèle / gain / comment)
export const workflowTableSchema = z.object({
  type: z.literal('workflow-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Workflows'),
  eyebrow_en: z.string().default('§ Workflows'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  workflows: z
    .array(
      z.object({
        num: z.string(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        model_fr: z.string(),
        model_en: z.string(),
        gain: z.string(),
        how_fr: z.string(),
        how_en: z.string(),
      }),
    )
    .min(1)
    .max(8),
});

// §Solutions · ROI Band · brique signature 4 chiffres énormes sur fond ink
export const roiBandSchema = z.object({
  type: z.literal('roi-band'),
  eyebrow_fr: z.string().default('§ Preuve macro'),
  eyebrow_en: z.string().default('§ Macro proof'),
  h2_fr: z.string(),
  h2_en: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// §Solutions · Case Split · split dark/light 50/50 (case dark + résultats light)
export const caseSplitSchema = z.object({
  type: z.literal('case-split'),
  kicker_fr: z.string().default('Cas client'),
  kicker_en: z.string().default('Client case'),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  cta_label_fr: z.string().default('Voir le cas complet →'),
  cta_label_en: z.string().default('See full case →'),
  cta_href: z.string().default('/realisations'),
  results: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

// §Solutions · Department Stack · table éditoriale outils (catégorie / outil / rôle)
export const departmentStackSchema = z.object({
  type: z.literal('department-stack'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Stack outils'),
  eyebrow_en: z.string().default('§ Tool stack'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(4),
  columns_en: z.array(z.string()).min(2).max(4),
  rows: z
    .array(
      z.object({
        category_fr: z.string(),
        category_en: z.string(),
        tool: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// §École · Catalogue de cours/formations · tableau (#/Titre/Niveau/Durée/Prix) · EcoleHubTemplate
export const courseCatalogTableSchema = z.object({
  type: z.literal('course-catalog-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  rows: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        level: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
        duration_hours: z.number().positive(),
        price_eur: z.number().int().nonnegative().optional(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(20),
});

// §École · Liste de parcours/learning paths · titre + description · EcoleHubTemplate
export const learningPathListSchema = z.object({
  type: z.literal('learning-path-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// §Solutions · Department CTA · clôture dark "Votre équipe, augmentée."
export const departmentCtaSchema = z.object({
  type: z.literal('department-cta'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  primary_label_fr: z.string().default('Prendre rendez-vous →'),
  primary_label_en: z.string().default('Book a call →'),
  primary_href: z.string().default('/contact'),
  secondary_label_fr: z.string().default('Toutes les solutions'),
  secondary_label_en: z.string().default('All solutions'),
  secondary_href: z.string().default('/solutions'),
});

/* ─── Mission catalogue-gap 2026-06-11 · patterns /console + /manifesto ─── */

// §Table Sections · Table terminal (frame TerminalTable) : cols/headers/rows configurables,
// rôle typographique par cellule. Source : /console Acte II (services) + Acte IV (cases).
export const terminalTableSectionSchema = z.object({
  type: z.literal('terminal-table'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  /** grid-template-columns de la table · ex: "60px 180px 1fr 120px" */
  cols: z.string(),
  headers: z.array(bilingualString).min(2).max(8),
  rows: z
    .array(
      z.object({
        href: z.string().optional(),
        cells: z
          .array(
            z.object({
              fr: z.string(),
              en: z.string(),
              role: z.enum(['id', 'title', 'body', 'mono', 'status', 'accent', 'arrow']).default('body'),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(12),
});

// §Table Sections · Feed éditorial cliquable (lignes EditorialWriteRow [date|tag|texte|flèche]).
// Source : /console Writing (paper) + /manifesto Writing dark (ink).
export const editorialWriteFeedSchema = z.object({
  type: z.literal('editorial-write-feed'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_label_fr: z.string().optional(),
  meta_label_en: z.string().optional(),
  meta_href: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  tone: z.enum(['paper', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        date: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(10),
});

// §Manifesto Sections · Déclaration plein écran fond contrasté.
// tone ink = bloc [manifesto] de /console · tone accent = pattern ManifestoAccent (terracotta + grille).
// §Terminal Sections · product-reel : reel produit scroll-driven (ProductReel.tsx).
// Composant auto-porteur (DEFAULT_SCREENS/DEFAULT_COPY intégrés) → schéma minimal type-only.
export const productReelSchema = z.object({
  type: z.literal('product-reel'),
});

// §Terminal Sections · agentic-terminal : IDE mockup (fenêtre macOS + explorateur +
// prompt + bloc de code tapé LIVE caractère par caractère + succès + footer + badges).
// Source virtuoseOS retokenisée DS waimia. Animation gérée par AgenticTerminal.tsx.
const agenticLineSchema = z.object({
  kind: z.enum(['cmd', 'out', 'ok', 'comment']),
  text: z.string(),
});
export const agenticTerminalSchema = z.object({
  type: z.literal('agentic-terminal'),
  badge_fr: z.string(),
  badge_en: z.string(),
  title_part1_fr: z.string(),
  title_part1_en: z.string(),
  title_highlight_fr: z.string(),
  title_highlight_en: z.string(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  filename: z.string(),
  folders: z.array(z.string()).max(8).default([]),
  files: z
    .array(z.object({ name: z.string(), type: z.string() }))
    .max(12)
    .default([]),
  prompt_label_fr: z.string(),
  prompt_label_en: z.string(),
  prompt_text_fr: z.string(),
  prompt_text_en: z.string(),
  lines_fr: z.array(agenticLineSchema).min(1).max(20),
  lines_en: z.array(agenticLineSchema).min(1).max(20),
  success_msg_fr: z.string(),
  success_msg_en: z.string(),
  footer_status_fr: z.string(),
  footer_status_en: z.string(),
  footer_framework: z.string(),
  footer_memory: z.string(),
  badges_fr: z.array(z.string()).max(6).default([]),
  badges_en: z.array(z.string()).max(6).default([]),
});

// §Feature Sections · challenges-grid : grille 2x2 de pain-points (numéro en coin,
// icône, titre, body, border-left accent, hover élévation). Layout récolté de
// virtuoseOS PersonaChallenges, retokenisé DS waimia.
const challengeItemSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});
export const challengesGridSchema = z.object({
  type: z.literal('challenges-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(challengeItemSchema).min(2).max(4),
});

// §Process Sections · journey-steps : parcours en 3 temps (icône cercle + badge numéro,
// titre, description, pill highlight, connecteur entre étapes). Horizontal desktop,
// vertical mobile. Layout récolté de virtuoseOS PersonaJourney, retokenisé DS waimia.
const journeyStepSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  highlight_fr: z.string().optional(),
  highlight_en: z.string().optional(),
});
export const journeyStepsSchema = z.object({
  type: z.literal('journey-steps'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  steps: z.array(journeyStepSchema).min(2).max(4),
});

export const manifestoStatementSchema = z.object({
  type: z.literal('manifesto-statement'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  /** HTML · <i> = relevé italique serif, <span class="acc"> = accent, <strong> = gras */
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'accent']).default('ink'),
  show_grid: z.boolean().default(false),
  /** Narration scroll-pinnée : la section reste sticky plein viewport pendant ~250vh
   *  de scroll et la lecture guidée (--ms-lit) se déroule sur toute cette plage.
   *  Desktop + motion only (mobile ≤768px et reduced-motion retombent en lecture guidée
   *  simple, sans zone de scroll réservée). Opt-in — réservé à /agence. */
  pinned: z.boolean().default(false),
});

// §Manifesto Sections · Acte numéroté : label sticky (numéro romain + sous-titre) +
// statement XL + stats massives optionnelles. Source : /manifesto Acte I.
export const manifestoActSchema = z.object({
  type: z.literal('manifesto-act'),
  num_fr: z.string(),
  num_en: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  sub_fr: z.string().optional(),
  sub_en: z.string().optional(),
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'paper']).default('ink'),
  stats: z
    .array(
      z.object({
        k: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .default([]),
});

// §Manifesto Sections · Services asymétriques (rangées AsymmetricServiceRow alternées).
// Source : /manifesto Acte II.
export const asymmetricServicesSchema = z.object({
  type: z.literal('asymmetric-services'),
  num_fr: z.string(),
  num_en: z.string(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// §Terminal Sections · Console mockup à lignes configurables (frame TerminalMockup).
// Source : /console hero terminal split + Acte V (carte session).
export const terminalMockupSectionSchema = z.object({
  type: z.literal('terminal-mockup'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  layout: z.enum(['split', 'full']).default('split'),
  label: z.string().default(''),
  status: z.string().default(''),
  tone: z.enum(['ink', 'paper']).default('ink'),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  lines: z
    .array(
      z.object({
        kind: z.enum(['cmd', 'out', 'ok', 'comment']).default('out'),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(1)
    .max(14),
  show_cursor: z.boolean().default(true),
});

// §Terminal Sections · Strip KPI mono bordé (télémétrie console, tout mono).
// Source : /console hero, strip 5 metrics.
export const terminalMetricsStripSchema = z.object({
  type: z.literal('terminal-metrics-strip'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// >>> [gen-pricing] start
// PRICING · 3 nouveaux types (catégorie pricing-sections).

// pricing-cards · 3 tiers côte à côte, carte « Recommandé » mise en avant.
const pricingCardTierSchema = z.object({
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
export const pricingCardsSchema = z.object({
  type: z.literal('pricing-cards'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  tiers: z.array(pricingCardTierSchema).min(2).max(4),
  footnote_fr: z.string().optional(),
  footnote_en: z.string().optional(),
});

// pricing-toggle · grille + bascule mensuel/annuel (prix doubles par tier).
const pricingToggleTierSchema = z.object({
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
export const pricingToggleSchema = z.object({
  type: z.literal('pricing-toggle'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  label_monthly_fr: z.string(),
  label_monthly_en: z.string(),
  label_annual_fr: z.string(),
  label_annual_en: z.string(),
  save_badge_fr: z.string().optional(),
  save_badge_en: z.string().optional(),
  tiers: z.array(pricingToggleTierSchema).min(2).max(4),
});

// pricing-single-highlight · offre mono-produit en grand format.
export const pricingSingleHighlightSchema = z.object({
  type: z.literal('pricing-single-highlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  desc_fr: z.string().optional(),
  desc_en: z.string().optional(),
  anchor_price: z.string().optional(),
  anchor_label_fr: z.string().optional(),
  anchor_label_en: z.string().optional(),
  price: z.string(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  benefits_fr: z.array(z.string()).min(2),
  benefits_en: z.array(z.string()).min(2),
  cta: ctaSchema,
  guarantee_fr: z.string().optional(),
  guarantee_en: z.string().optional(),
  secondary_note_fr: z.string().optional(),
  secondary_note_en: z.string().optional(),
});
// <<< [gen-pricing] end

/* ─── Union discriminée pour validation ─── */

// >>> [gen-hero-feature] start
// hero-form-inline · hero de capture lead above-the-fold (copy + form email/CTA).
export const heroFormInlineSchema = z.object({
  type: z.literal('hero-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  form_title_fr: z.string(),
  form_title_en: z.string(),
  proof: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(4)
    .optional(),
});

// hero-social-proof · hero centré + bande de preuve sociale (stats + rating) above-fold.
export const heroSocialProofSchema = z.object({
  type: z.literal('hero-social-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  rating_fr: z.string().optional(),
  rating_en: z.string().optional(),
  stats: z
    .array(z.object({ k: z.string(), label_fr: z.string(), label_en: z.string() }))
    .min(2)
    .max(4),
});

// feature-comparison-grid · différenciation légère « nous vs eux » en grille (check/cross).
export const featureComparisonGridSchema = z.object({
  type: z.literal('feature-comparison-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        highlighted: z.boolean().default(false),
        rows: z
          .array(z.object({ text_fr: z.string(), text_en: z.string(), included: z.boolean() }))
          .min(1)
          .max(10),
      }),
    )
    .min(2)
    .max(3),
});

// feature-accordion · features en progressive disclosure (accordéon titre → détail).
export const featureAccordionSchema = z.object({
  type: z.literal('feature-accordion'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  open_first: z.boolean().default(false),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});
// <<< [gen-hero-feature] end

// >>> [gen-conversion] start
// FAQ + Conversion + Contact + Newsletter (audit famille CONVERSION)

// FAQ accordéon (gauche) + panneau réassurance/CTA sticky (droite) — transforme une FAQ passive en capture lead.
export const faqCtaAsideSchema = z.object({
  type: z.literal('faq-cta-aside'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  open_first: z.boolean().optional(),
  aside_title_fr: z.string(),
  aside_title_en: z.string(),
  aside_body_fr: z.string().optional(),
  aside_body_en: z.string().optional(),
  aside_cta: ctaSchema,
  aside_note_fr: z.string().optional(),
  aside_note_en: z.string().optional(),
});

// Bande CTA avec mini-formulaire inline (email + bouton) — variante newsletter/lead, capture à l'instant d'intention.
export const ctaFormInlineSchema = z.object({
  type: z.literal('cta-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  placeholder_fr: z.string().default('votre@email.com'),
  placeholder_en: z.string().default('your@email.com'),
  submit_label_fr: z.string().default("S'inscrire →"),
  submit_label_en: z.string().default('Sign up →'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  form_action: z.string().optional(),
});

// Section contact avec formulaire (nom/email/message) + colonne coordonnées, action vers /api/contact.
export const contactFormSchema = z.object({
  type: z.literal('contact-form'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  name_label_fr: z.string().default('Nom'),
  name_label_en: z.string().default('Name'),
  email_label_fr: z.string().default('Email'),
  email_label_en: z.string().default('Email'),
  message_label_fr: z.string().default('Message'),
  message_label_en: z.string().default('Message'),
  submit_label_fr: z.string().default('Envoyer →'),
  submit_label_en: z.string().default('Send →'),
  form_action: z.string().default('/api/contact'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  details: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
});

// Section prise de RDV : embed CalEmbed + copy de réassurance.
export const bookingEmbedSchema = z.object({
  type: z.literal('booking-embed'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  reassurance: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(4)
    .optional(),
  cal_username: z.string().optional(),
  cal_event_type: z.string().optional(),
  cal_namespace: z.string().optional(),
});

// Section d'inscription newsletter pleine largeur (réutilise NewsletterSignup), fonds enum (ink = climax).
export const newsletterSignupSectionSchema = z.object({
  type: z.literal('newsletter-signup-section'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
});
// <<< [gen-conversion] end

// >>> [gen-structure] start
// §Table Sections · Table de données neutre générique (en-tête + lignes + cellules typées).
// Distincte de terminal-table (habillée console) et editorial-write-feed (feed) : data brute.
export const dataTableSchema = z.object({
  type: z.literal('data-table'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  striped: z.boolean().default(false),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        align: z.enum(['start', 'center', 'end']).default('start'),
      }),
    )
    .min(2)
    .max(8),
  rows: z
    .array(
      z.object({
        cells: z
          .array(
            z.object({
              text_fr: z.string(),
              text_en: z.string(),
              emphasis: z.boolean().default(false),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(20),
});

// §Content Listing Sections · Grille de cartes d'articles/blog (image, tag, titre, date, extrait).
export const articleGridSchema = z.object({
  type: z.literal('article-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  articles: z
    .array(
      z.object({
        image: z.string().optional(),
        tag_fr: z.string().optional(),
        tag_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        excerpt_fr: z.string().optional(),
        excerpt_en: z.string().optional(),
        date: z.string().optional(),
        read_time_fr: z.string().optional(),
        read_time_en: z.string().optional(),
        author: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(12),
});

// §Content Listing Sections · Grille de ressources téléchargeables (icône/type + titre + CTA).
export const resourceCardGridSchema = z.object({
  type: z.literal('resource-card-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  resources: z
    .array(
      z.object({
        kind_fr: z.string(),
        kind_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string().optional(),
        desc_en: z.string().optional(),
        format: z.string().optional(),
        href: z.string(),
        cta_label_fr: z.string().optional(),
        cta_label_en: z.string().optional(),
        gated: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(9),
});

// §Process Sections · « Comment ça marche » en étapes numérotées verticales (1..N, connecteurs).
export const processStepsSchema = z.object({
  type: z.literal('process-steps'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  steps: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});

// §Timelines · Frise chronologique horizontale datée (roadmap), scroll-snap. Stack vertical mobile.
export const timelineHorizontalSchema = z.object({
  type: z.literal('timeline-horizontal'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  events: z
    .array(
      z.object({
        date_fr: z.string().optional(),
        date_en: z.string().optional(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string().optional(),
        body_en: z.string().optional(),
        status: z.enum(['done', 'active', 'upcoming']).default('upcoming'),
      }),
    )
    .min(2)
    .max(10),
});

// §Terminal Sections · Vitrine de code annoté (bloc code + copy explicatif), cible devtools/SaaS.
export const codeShowcaseSchema = z.object({
  type: z.literal('code-showcase'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  tone: z.enum(['ink', 'paper']).default('ink'),
  label: z.string().default(''),
  lang_label: z.string().default(''),
  show_line_numbers: z.boolean().default(true),
  lines: z
    .array(
      z.object({
        text: z.string(),
        comment_fr: z.string().optional(),
        comment_en: z.string().optional(),
      }),
    )
    .min(1)
    .max(24),
});

// §Banner Sections · Bandeau d'annonce/promo fin (texte + lien, dismissible, variante accent/ink).
export const announcementBannerSchema = z.object({
  type: z.literal('announcement-banner'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  text_fr: z.string(),
  text_en: z.string(),
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  href: z.string().optional(),
  badge_fr: z.string().optional(),
  badge_en: z.string().optional(),
  tone: z.enum(['accent', 'ink', 'paper-2']).default('accent'),
  dismissible: z.boolean().default(false),
});
// <<< [gen-structure] end

// >>> [gen-trust-proof] start
// Famille PREUVE / CRÉDIBILITÉ — 5 types (trust · testimonial · stats · comparison · logo)

// trust-badges-band (trust-sections) : bandeau badges réassurance (sécurité, hébergement, conformité, garanties)
// en cellules hairline mono, juste avant le CTA. Lève l'objection risque.
const trustBadgeSchema = z.object({
  glyph: z.string().optional(), // pictogramme texte court (◉, ✓, ⚿…) — pas d'icône externe
  label_fr: z.string(),
  label_en: z.string(),
  value_fr: z.string().optional(),
  value_en: z.string().optional(),
});
export const trustBadgesBandSchema = z.object({
  type: z.literal('trust-badges-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  // 'cells' = grille hairline (glyph + label + valeur) ; 'strip' = items mono uppercase
  // inline séparés par une puce accent (modèle bandeau certifications, ref-offre-deploiement).
  variant: z.enum(['cells', 'strip']).default('cells'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  badges: z.array(trustBadgeSchema).min(3).max(8),
});

// testimonial-logo-metric (testimonial-sections) : carte B2B = logo client + citation + métrique d'impact chiffrée.
// Réutilise le pattern testimonial (quote/author/role) + métrique inline (KeyMetric).
const testimonialLogoMetricCardSchema = z.object({
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
export const testimonialLogoMetricSchema = z.object({
  type: z.literal('testimonial-logo-metric'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  cards: z.array(testimonialLogoMetricCardSchema).min(2).max(6),
});

// stat-counter (stats-sections) : compteur animé count-up au scroll (île React client:visible,
// respecte prefers-reduced-motion). Grille de 2-4 stats. La valeur finale est rendue côté serveur
// (visible sans JS) ; l'île n'enrobe que l'animation count-up.
const statCounterItemSchema = z.object({
  value: z.string(), // valeur finale affichée (ex. '99.9%', '120', '4.8') — la partie numérique est animée
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const statCounterSchema = z.object({
  type: z.literal('stat-counter'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  stats: z.array(statCounterItemSchema).min(2).max(4),
  animate: z.boolean().default(true),
});

// versus-competitors (comparison-sections) : comparatif « nous vs alternatives »,
// colonne « nous » highlightée, lignes de critères avec check/cross/partiel.
const versusColumnSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  featured: z.boolean().default(false), // la colonne « nous »
});
const versusRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});
export const versusCompetitorsSchema = z.object({
  type: z.literal('versus-competitors'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(versusColumnSchema).min(2).max(5),
  rows: z.array(versusRowSchema).min(3),
});

// logo-marquee (logo-sections) : bandeau de logos IMAGE défilant (« ils nous font confiance »),
// marquee CSS, respecte reduced-motion. Distinct de marquee-band (texte mono).
const logoMarqueeItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
});
export const logoMarqueeSchema = z.object({
  type: z.literal('logo-marquee'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  logos: z.array(logoMarqueeItemSchema).min(4).max(24),
  speed: z.enum(['slow', 'base']).default('base'),
  grayscale: z.boolean().default(true),
});
// <<< [gen-trust-proof] end

// >>> [new-standard] start
// Lot new-standard 2026-06-11 — 10 nouveaux types standard B2B-SaaS, dark natif dès création.
// background: z.enum(['paper','paper-2','paper-3','ink']) sur chaque type (champ obligatoire dark).

// 1. team-bio-grid (team-sections) : grille équipe photo + nom + rôle + bio courte (2-4 colonnes).
const teamBioMemberSchema = z.object({
  photo_src: z.string().optional(),
  name: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  bio_fr: z.string(),
  bio_en: z.string(),
  link_href: z.string().optional(),
});
export const teamBioGridSchema = z.object({
  type: z.literal('team-bio-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z.enum(['2', '3', '4']).default('3'),
  members: z.array(teamBioMemberSchema).min(2).max(12),
});

// 2. about-story-split (about-sections) : récit fondateur, 2 colonnes (texte narratif + timeline/chiffres).
const aboutStoryMilestoneSchema = z.object({
  year: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const aboutStorySplitSchema = z.object({
  type: z.literal('about-story-split'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  paragraphs_fr: z.array(z.string()).min(1).max(5),
  paragraphs_en: z.array(z.string()).min(1).max(5),
  aside_title_fr: z.string().optional(),
  aside_title_en: z.string().optional(),
  milestones: z.array(aboutStoryMilestoneSchema).min(2).max(8),
});

// 3. footer-cta-band (cta-sections) : bande CTA finale pleine largeur, climax avant footer.
const footerCtaButtonSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'ghost', 'accent']).default('primary'),
});
export const footerCtaBandSchema = z.object({
  type: z.literal('footer-cta-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  rounded: z.boolean().optional(),
  buttons: z.array(footerCtaButtonSchema).min(1).max(2),
});

// 4. integrations-grid (logo-sections) : grille de logos d'intégrations groupés par catégorie.
const integrationItemSchema = z.object({
  logo_src: z.string().optional(),
  name: z.string(),
  href: z.string().optional(),
});
const integrationGroupSchema = z.object({
  group_fr: z.string(),
  group_en: z.string(),
  items: z.array(integrationItemSchema).min(2).max(12),
});
export const integrationsGridSchema = z.object({
  type: z.literal('integrations-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  groups: z.array(integrationGroupSchema).min(1).max(6),
});

// 5. feature-split-media (feature-sections) : feature majeure texte + mockup, champ reversed.
const featureSplitPointSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
});
export const featureSplitMediaSchema = z.object({
  type: z.literal('feature-split-media'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  reversed: z.boolean().default(false),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  points: z.array(featureSplitPointSchema).max(6).default([]),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  media_caption_fr: z.string().optional(),
  media_caption_en: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});

// 6. metric-callout-band (stats-sections) : bande 1-3 métriques héro surdimensionnées + contexte.
const metricCalloutItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const metricCalloutBandSchema = z.object({
  type: z.literal('metric-callout-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  context_fr: z.string(),
  context_en: z.string(),
  metrics: z.array(metricCalloutItemSchema).min(1).max(3),
});

// 7. testimonial-single-spotlight (testimonial-sections) : un témoignage plein écran.
export const testimonialSingleSpotlightSchema = z.object({
  type: z.literal('testimonial-single-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  portrait_src: z.string().optional(),
  logo_src: z.string().optional(),
});

// 8. faq-two-column (faq-sections) : FAQ 2 colonnes statiques, scan rapide sans accordéon.
const faqTwoColItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});
export const faqTwoColumnSchema = z.object({
  type: z.literal('faq-two-column'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqTwoColItemSchema).min(2).max(12),
});

// 9. cta-newsletter-footer (newsletter-sections) : capture email compacte pré-footer + RGPD.
export const ctaNewsletterFooterSchema = z.object({
  type: z.literal('cta-newsletter-footer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  placeholder_fr: z.string().default('vous@entreprise.com'),
  placeholder_en: z.string().default('you@company.com'),
  button_label_fr: z.string().default('S’abonner'),
  button_label_en: z.string().default('Subscribe'),
  consent_fr: z.string().optional(),
  consent_en: z.string().optional(),
  action: z.string().optional(),
});

// 10. comparison-pricing-callout (comparison-sections) : bloc « pourquoi nous » 3 colonnes, bridge feature→pricing.
const comparisonValuePropSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});
export const comparisonPricingCalloutSchema = z.object({
  type: z.literal('comparison-pricing-callout'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(comparisonValuePropSchema).min(2).max(4),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
  cta_note_fr: z.string().optional(),
  cta_note_en: z.string().optional(),
});
// <<< [new-standard] end

// >>> [sections-gap] start
// Lot sections-gap 2026-06-11 — types manquants conversion / réassurance / GEO
// dérivés des 2 maquettes de référence (docs/44). Dark natif via background .optional().

// diagnostic-stages (conversion-sections) : auto-diagnostic « Où en êtes-vous ? »,
// 4-6 stades horizontaux cliquables, stade `current` relevé accent (« vous êtes ici »).
const diagnosticStageSchema = z.object({
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
export const diagnosticStagesSchema = z.object({
  type: z.literal('diagnostic-stages'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  stages: z.array(diagnosticStageSchema).min(4).max(6),
});

// case-spotlight (case-sections) : carte INK image + métriques latérales massives +
// citation à barre accent + tags méta + CTA. Vitrine de cas concret (conversion).
const caseSpotlightMetricSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
const caseSpotlightTagSchema = z.object({ fr: z.string(), en: z.string() });
export const caseSpotlightSchema = z.object({
  type: z.literal('case-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['media-left', 'media-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  media_src: z.string().optional(),
  media_alt: z.string().optional(),
  media_caption: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  attribution_fr: z.string().optional(),
  attribution_en: z.string().optional(),
  metrics: z.array(caseSpotlightMetricSchema).max(3).optional(),
  tags: z.array(caseSpotlightTagSchema).max(4).optional(),
  cta_href: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
});

// testimonial-metrics (testimonial-sections) : grande citation serif + grille 3-4 métriques.
const testimonialMetricsItemSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const testimonialMetricsSchema = z.object({
  type: z.literal('testimonial-metrics'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['quote-left', 'quote-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  metrics: z.array(testimonialMetricsItemSchema).min(3).max(4),
});
// <<< [sections-gap] end

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
  tunnelStepHeroSchema,
  tunnelStepNavSchema,
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
  ecosystemPartnersSchema,
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
  bentoGridSchema,
  featureZigzagSchema,
  logoWallSchema,
  pricingComparisonMatrixSchema,
  galleryMasonrySchema,
  featureTabsSchema,
  iconTrioSchema,
  quoteSpotlightSchema,
  stepsHorizontalSchema,
  ctaSplitVisualSchema,
  statsBentoSchema,
  comparisonDuoSchema,
  serviceCatalogListSchema,
  fitColumnsSchema,
  editorialTableBlockSchema,
  decisionListSchema,
  techPositioningSplitSchema,
  techCapabilitiesSpecsSchema,
  techModelsTableSchema,
  techWhenDualSchema,
  techIntegrationFlowSchema,
  painPointsSchema,
  workflowTableSchema,
  roiBandSchema,
  caseSplitSchema,
  departmentStackSchema,
  courseCatalogTableSchema,
  learningPathListSchema,
  departmentCtaSchema,
  terminalTableSectionSchema,
  editorialWriteFeedSchema,
  productReelSchema,
  agenticTerminalSchema,
  challengesGridSchema,
  journeyStepsSchema,
  manifestoStatementSchema,
  manifestoActSchema,
  asymmetricServicesSchema,
  terminalMockupSectionSchema,
  terminalMetricsStripSchema,
  // >>> [gen-pricing] start
  pricingCardsSchema,
  pricingToggleSchema,
  pricingSingleHighlightSchema,
  // <<< [gen-pricing] end
  // >>> [gen-hero-feature] start
  heroFormInlineSchema,
  heroSocialProofSchema,
  featureComparisonGridSchema,
  featureAccordionSchema,
  // <<< [gen-hero-feature] end
  // >>> [gen-conversion] start
  faqCtaAsideSchema,
  ctaFormInlineSchema,
  contactFormSchema,
  bookingEmbedSchema,
  newsletterSignupSectionSchema,
  // <<< [gen-conversion] end
  // >>> [gen-structure] start
  dataTableSchema,
  articleGridSchema,
  resourceCardGridSchema,
  processStepsSchema,
  timelineHorizontalSchema,
  codeShowcaseSchema,
  announcementBannerSchema,
  // <<< [gen-structure] end
  // >>> [gen-trust-proof] start
  trustBadgesBandSchema,
  testimonialLogoMetricSchema,
  statCounterSchema,
  versusCompetitorsSchema,
  logoMarqueeSchema,
  // <<< [gen-trust-proof] end
  // >>> [new-standard] start
  teamBioGridSchema,
  aboutStorySplitSchema,
  footerCtaBandSchema,
  integrationsGridSchema,
  featureSplitMediaSchema,
  metricCalloutBandSchema,
  testimonialSingleSpotlightSchema,
  faqTwoColumnSchema,
  ctaNewsletterFooterSchema,
  comparisonPricingCalloutSchema,
  // <<< [new-standard] end
  // >>> [sections-gap] start
  diagnosticStagesSchema,
  caseSpotlightSchema,
  testimonialMetricsSchema,
  // <<< [sections-gap] end
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
/**
 * Ancre optionnelle par section : chaque element du tableau peut porter, EN PLUS de
 * sa variante discriminee par `type`, un champ `anchor` (slug kebab-case) qui produit
 * un point d'ancrage scrollable `id` au rendu (cf SectionsRenderer.astro).
 *
 * On utilise `z.intersection(sectionSchema, ...)` plutot que d'ajouter `anchor` aux 151
 * variantes : l'intersection PRESERVE la discrimination par `type` ET conserve `anchor`
 * en sortie (Zod strip les cles inconnues par defaut, donc un simple `anchor:` serait
 * silencieusement supprime sans ce wrapper). Verifie empiriquement (anchor survit, type
 * preserve, slug invalide rejete).
 */
const sectionWithAnchorSchema = z.intersection(
  sectionSchema,
  z.object({
    anchor: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'anchor doit etre un slug kebab-case (a-z, 0-9, tirets)')
      .optional(),
  }),
);

export const sectionsArraySchema = z.array(sectionWithAnchorSchema).default([]);

/* ─── Type helpers ─── */

export type SectionType = SectionData['type'];

export type SectionByType<T extends SectionType> = Extract<SectionData, { type: T }>;
