// Waimia · content collections · Zod schemas
// Cf docs/03-content-models.md pour le rationale de chaque champ.
// V2 (2026-05-15) : extension pour CMS headless complet · cf docs/13-CONTENT-ARCHITECTURE.md + 14-MASTER-PLAN

import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { sectionsArraySchema } from './schemas/sections';

// ─── Mixin commun (SEO/GEO/AIO) ───
const seoBlock = z
  .object({
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
  })
  .optional();

const faqArray = z
  .array(z.object({ q: z.string(), a: z.string() }))
  .optional();

const baseFields = {
  title_fr: z.string().min(1),
  title_en: z.string().min(1),
  description_fr: z.string().min(40).max(180),
  description_en: z.string().min(40).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'kebab-case lowercase'),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  canonical: z.string().url().optional(),
  seo: seoBlock,
  faq_fr: faqArray,
  faq_en: faqArray,
};

// ─── Mixin taxonomies ───
const taxonomyFields = {
  category: z
    .enum([
      'acquisition',
      'crm',
      'contenu-seo-geo',
      'productivite',
      'support',
      'pilotage',
      'data',
      'gouvernance',
    ])
    .optional(),
  cluster: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'kebab-case')
    .optional(),
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/, 'kebab-case')).default([]),
  sources: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.enum(['state', 'university', 'journal', 'enterprise', 'research']),
        publishedAt: z.coerce.date().optional(),
        author: z.string().optional(),
      }),
    )
    .default([]),
  relatedSolutions: z.array(z.string()).default([]),
  relatedOffres: z.array(z.string()).default([]),
  relatedCases: z.array(z.string()).default([]),
  relatedSecteurs: z.array(z.string()).default([]),
};

// ─── Sous-schémas réutilisables ───
const bilingualMetric = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});

const methodStep = z.object({
  num: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  duration_fr: z.string().optional(),
  duration_en: z.string().optional(),
});

const deliverableItem = z.object({
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  tag: z.string(),
});

const proofBlock = z.object({
  quote_fr: z.string(),
  quote_en: z.string(),
  attribution: z.string(),
  metrics: z.array(bilingualMetric).default([]),
});

// ─── Cases ───
const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    client: z.string(),
    sector_fr: z.string(),
    sector_en: z.string(),
    duration: z.string(),
    stack: z.array(z.string()),
    impact_fr: z.string(),
    impact_en: z.string(),
    metrics: z.array(bilingualMetric).optional(),
    ndaProtected: z.boolean().default(false),
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
    author: reference('authors').optional(),
    contributors: z.array(reference('authors')).default([]),
    // ── Refonte éditoriale W2 (docs/25) : sections cataloguées pilotées par
    //    frontmatter. TOUS optionnels → dégradation gracieuse (cas non migrés
    //    gardent le rendu <Content/> actuel). Voir CaseStudyTemplate (rendu conditionnel).
    contextStatement_fr: z.string().optional(),
    contextStatement_en: z.string().optional(),
    contextStats: z
      .array(z.object({ value: z.string(), label_fr: z.string(), label_en: z.string() }))
      .max(4)
      .optional(),
    bottlenecks: z
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
      .optional(),
    phases: z
      .array(
        z.object({
          num: z.string(),
          label_fr: z.string(),
          label_en: z.string(),
          body_fr: z.string(),
          body_en: z.string(),
          meta_fr: z.string().optional(),
          meta_en: z.string().optional(),
        }),
      )
      .optional(),
    deliverableCards: z
      .array(
        z.object({
          title_fr: z.string(),
          title_en: z.string(),
          body_fr: z.string(),
          body_en: z.string(),
          format_fr: z.string().optional(),
          format_en: z.string().optional(),
        }),
      )
      .optional(),
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
      .optional(),
    pullQuote_fr: z.string().optional(),
    pullQuote_en: z.string().optional(),
    pullQuoteCite_fr: z.string().optional(),
    pullQuoteCite_en: z.string().optional(),
    // ── Refonte R7a (docs/37 §2.1) : facettes d'exploration du cas (secteur, problème,
    //    solution, résultat) reliées aux référentiels src/data/pain-points.ts et
    //    src/data/proof-points.ts. Optionnel → 0 contenu cassé ; ids/slugs validés
    //    par scripts/check-content-refs.mjs (aucun rendu dans cette vague).
    facets: z
      .object({
        sector: z.string().optional(),
        painPoints: z.array(z.string()).default([]),
        solutions: z.array(z.string()).default([]),
        results: z.array(z.string()).default([]),
      })
      .optional(),
    // Composable V2 (D.7 extension) : sections optionnelles
    sections: sectionsArraySchema.optional(),
    // Card de listing pour le hub /cas (copy spécifique au listing, ≠ title détail)
    card: z
      .object({
        order: z.number(),
        sector_fr: z.string(),
        sector_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        headline_fr: z.string(),
        headline_en: z.string(),
        duration_fr: z.string(),
        duration_en: z.string(),
      })
      .optional(),
  }),
});

// ─── Offres (étendu V2) ───
const offres = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/offres' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    // Legacy v1 (rétrocompat)
    tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
    category_fr: z.string().optional(),
    category_en: z.string().optional(),
    priceFrom: z.string().optional(),
    duration: z.string().optional(),
    deliverables_fr: z.array(z.string()).optional(),
    deliverables_en: z.array(z.string()).optional(),
    relatedTechnologies: z.array(z.string()).default([]),
    caseStudies: z.array(z.string()).default([]),
    // V2 (extension pour migration hardcoded → MDX)
    tier_fr: z.string().optional(),
    tier_en: z.string().optional(),
    tier_label_fr: z.string().optional(),
    tier_label_en: z.string().optional(),
    hero_title_html_fr: z.string().optional(),
    hero_title_html_en: z.string().optional(),
    meta_fr: z.string().optional(),
    meta_en: z.string().optional(),
    price_from_eur: z.number().int().nonnegative().optional(),
    price_to_eur: z.number().int().nonnegative().optional(),
    duration_min_weeks: z.number().int().positive().optional(),
    duration_max_weeks: z.number().int().positive().optional(),
    cta_label_fr: z.string().optional(),
    cta_label_en: z.string().optional(),
    cta_href: z.string().optional(),
    lead_fr: z.string().optional(),
    lead_en: z.string().optional(),
    problem_statement_fr: z.string().optional(),
    problem_statement_en: z.string().optional(),
    problem_annotations: z
      .array(
        z.object({
          value: z.string(),
          label_fr: z.string(),
          label_en: z.string(),
        }),
      )
      .default([]),
    method_aside_fr: z.string().optional(),
    method_aside_en: z.string().optional(),
    method_steps: z.array(methodStep).default([]),
    deliverables_aside_fr: z.string().optional(),
    deliverables_aside_en: z.string().optional(),
    deliverable_items: z.array(deliverableItem).default([]),
    proof: proofBlock.optional(),
    cta_title_fr: z.string().optional(),
    cta_title_en: z.string().optional(),
    cta_body_fr: z.string().optional(),
    cta_body_en: z.string().optional(),
    inclusions_fr: z.array(z.string()).default([]),
    inclusions_en: z.array(z.string()).default([]),
    pricing_table: z
      .array(
        z.object({
          formula_fr: z.string(),
          formula_en: z.string(),
          included_fr: z.string(),
          included_en: z.string(),
          delay_fr: z.string(),
          delay_en: z.string(),
          price: z.string(),
        }),
      )
      .default([]),
    has_tunnel: z.boolean().default(false),
    // Composable V2 (D.7) : sections data-driven optionnelles · cf docs/19-DESIGN-SYSTEM-CLOSED.md §B.7
    // Si présent → /offres/[slug].astro utilise SectionsRenderer au lieu de OffresDetailTemplate
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Solutions (étendu V2) ───
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/solutions' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    kind: z.enum(['department', 'industry']),
    // ── Refonte R7a (docs/37 §2.1) : couche BESOIN du hub Solutions.
    //    Optionnel → 0 contenu cassé ; validé par scripts/check-content-refs.mjs.
    need: z.enum(['acquerir', 'piloter', 'operer']).optional(),
    icon: z.string().optional(),
    metricsHero: z.array(bilingualMetric).default([]),
    useCases_fr: z.array(z.string()),
    useCases_en: z.array(z.string()),
    constraints_fr: z.array(z.string()).optional(),
    constraints_en: z.array(z.string()).optional(),
    caseStudies: z.array(z.string()).default([]),
    // V2
    lead_fr: z.string().optional(),
    lead_en: z.string().optional(),
    pains: z
      .array(
        z.object({
          title_fr: z.string(),
          title_en: z.string(),
          body_fr: z.string(),
          body_en: z.string(),
        }),
      )
      .default([]),
    workflows: z.array(methodStep).default([]),
    roi_metrics: z.array(bilingualMetric).default([]),
    stack: z
      .array(
        z.object({
          name: z.string(),
          role_fr: z.string(),
          role_en: z.string(),
          category: z.string().optional(),
        }),
      )
      .default([]),
    livrables_fr: z.array(z.string()).default([]),
    livrables_en: z.array(z.string()).default([]),
    // ─── SolutionsDetailTemplate fields (V2+) ───
    dept_badge: z.string().optional(),
    dept_label: z.string().optional(),
    dept_label_en: z.string().optional(),
    hero_title_html_fr: z.string().optional(),
    hero_title_html_en: z.string().optional(),
    meta_hero: z.string().optional(),
    tags_fr: z.array(z.string()).default([]),
    tags_en: z.array(z.string()).default([]),
    case_kicker: z.string().optional(),
    case_body_fr: z.string().optional(),
    case_body_en: z.string().optional(),
    case_cta_label_fr: z.string().optional(),
    case_cta_label_en: z.string().optional(),
    case_results: z
      .array(z.object({ value: z.string(), label_fr: z.string(), label_en: z.string() }))
      .default([]),
    cta_title_fr: z.string().optional(),
    cta_title_en: z.string().optional(),
    cta_body_fr: z.string().optional(),
    cta_body_en: z.string().optional(),
    cta_href: z.string().optional(),
    cta_label_fr: z.string().optional(),
    cta_label_en: z.string().optional(),
    // Composable V2 (D.7 extension) : sections optionnelles · cf docs/19-DESIGN-SYSTEM-CLOSED.md
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Services (ADR-003) · pages de service composables ───
const services = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Landing pages (ADR-003) · /lp/<slug> · noindex par défaut ───
const lp = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lp' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Technologies (étendu V2) ───
const technologies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/technologies' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    family: z.enum(['Claude', 'OpenSource', 'Frameworks', 'Office']),
    vendor: z.string().optional(),
    modelVersion: z.string().optional(),
    contextWindow: z.string().optional(),
    strengths_fr: z.array(z.string()),
    strengths_en: z.array(z.string()),
    limits_fr: z.array(z.string()).optional(),
    limits_en: z.array(z.string()).optional(),
    useWhen_fr: z.string(),
    useWhen_en: z.string(),
    // V2
    positioning_fr: z.string().optional(),
    positioning_en: z.string().optional(),
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
      .default([]),
    models: z
      .array(
        z.object({
          name: z.string(),
          version: z.string(),
          use_case_fr: z.string(),
          use_case_en: z.string(),
        }),
      )
      .default([]),
    ecosystem: z
      .array(
        z.object({
          name: z.string(),
          role_fr: z.string(),
          role_en: z.string(),
        }),
      )
      .default([]),
    benchmarks: z.array(bilingualMetric).default([]),
    integration_flow: z.array(methodStep).default([]),
    // Adoption composable (registry) — fallback legacy conservé si absent.
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Blog (étendu V2 avec sous-types) ───
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    // V1 legacy (rétrocompat)
    editorialType: z
      .enum(['Field Note', 'Case', 'Essay', 'Cookbook', 'Tutorial', 'Note', 'Review'])
      .optional(),
    // V2 type discriminator (décision Simon 2026-05-15) — optionnel pour rétrocompat V1
    type: z.enum(['formation', 'essai', 'notes', 'avis', 'post', 'field-note', 'veille-ia']).optional(),
    author: reference('authors'),
    contributors: z.array(reference('authors')).default([]),
    readingTime: z.number().optional(),
    heroImage: z.string().optional(),
    excerpt_fr: z.string().optional(),
    excerpt_en: z.string().optional(),
    relatedPosts: z.array(z.string()).default([]),
    // Spécifique formation
    duration_minutes: z.number().int().positive().optional(),
    prerequisites_fr: z.array(z.string()).optional(),
    prerequisites_en: z.array(z.string()).optional(),
    // Spécifique essai
    pull_quotes: z
      .array(
        z.object({
          text: z.string(),
          context: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// ─── Secteurs ───
const secteurs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/secteurs' }),
  schema: z.object({
    ...baseFields,
    icp_fr: z.string(),
    icp_en: z.string(),
    icpSize: z.object({
      min: z.number().int().positive(),
      max: z.number().int().positive(),
    }),
    pains_fr: z.array(z.object({ title: z.string(), body: z.string() })).min(3).max(6),
    pains_en: z.array(z.object({ title: z.string(), body: z.string() })).min(3).max(6),
    workflowsCible: z.array(z.string()).default([]),
    kpis_fr: z.array(z.string()).default([]),
    kpis_en: z.array(z.string()).default([]),
    metricsHero: z.array(bilingualMetric).default([]),
    caseRef: z.string().optional(),
    visible: z.boolean().default(true),
    ctaPrimary_fr: z.string(),
    ctaPrimary_en: z.string(),
  }),
});

// ─── Outils ───
const outils = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/outils' }),
  schema: z.object({
    ...baseFields,
    type: z.enum(['calculator', 'checklist', 'template', 'audit']),
    inputs: z
      .array(
        z.object({
          key: z.string().regex(/^[a-z][a-zA-Z0-9]*$/),
          label_fr: z.string(),
          label_en: z.string(),
          type: z.enum(['number', 'text', 'select', 'currency']),
          unit: z.string().optional(),
          defaultValue: z.union([z.number(), z.string()]).optional(),
          min: z.number().optional(),
          max: z.number().optional(),
          options: z
            .array(
              z.object({
                value: z.string(),
                label_fr: z.string(),
                label_en: z.string(),
              }),
            )
            .optional(),
        }),
      )
      .default([]),
    outputs: z
      .array(
        z.object({
          key: z.string(),
          formula: z.string(),
          label_fr: z.string(),
          label_en: z.string(),
          unit: z.string().optional(),
          format: z.enum(['integer', 'decimal2', 'currency-eur', 'percent']).optional(),
        }),
      )
      .default([]),
    captureEmail: z.boolean().default(false),
    apiSlug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    relatedPages: z.array(z.string()).default([]),
    category_fr: z.string().optional(),
    category_en: z.string().optional(),
  }),
});

// ─── Pages standalone ─── (collection `pages` archivée V-F1, docs/40 §1 :
// 0 page générée, MDX dans docs/archive/content/pages/)

// ─── Authors ───
const authors = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/authors' }),
  schema: z.object({
    ...baseFields,
    role_fr: z.string(),
    role_en: z.string(),
    bio_fr: z.string().min(120),
    bio_en: z.string().min(120),
    photo: z.string().optional(),
    photoAlt_fr: z.string().optional(),
    photoAlt_en: z.string().optional(),
    education: z
      .array(
        z.object({
          year: z.string(),
          institution: z.string(),
          degree_fr: z.string(),
          degree_en: z.string(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
    experience: z
      .array(
        z.object({
          year: z.string(),
          role_fr: z.string(),
          role_en: z.string(),
          company: z.string(),
          companyUrl: z.string().url().optional(),
          summary_fr: z.string().optional(),
          summary_en: z.string().optional(),
        }),
      )
      .default([]),
    publications: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          venue: z.string(),
          year: z.string(),
          type: z.enum(['paper', 'talk', 'book', 'podcast', 'press']).optional(),
        }),
      )
      .default([]),
    awards: z
      .array(
        z.object({
          year: z.string(),
          label_fr: z.string(),
          label_en: z.string(),
        }),
      )
      .default([]),
    expertise: z.array(z.string()).default([]),
    social: z
      .object({
        x: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        github: z.string().url().optional(),
        website: z.string().url().optional(),
        email: z.string().email().optional(),
        bluesky: z.string().url().optional(),
        mastodon: z.string().url().optional(),
      })
      .default({}),
    status: z.enum(['active', 'alumni', 'guest']).default('active'),
    featured: z.boolean().default(false),
  }),
});

// ═════════════════════════════════════════════════════════════════
// ─── NOUVELLES COLLECTIONS V2 (2026-05-15) ───
// ═════════════════════════════════════════════════════════════════

// ─── Tunnels conversion (multi-étapes par offre) ───
// ─── École : Courses · discriminated union (T3.1a + T3.1f — remplace formations/parcours/ateliers) ───
const courses = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ecole/courses' }),
  schema: z.discriminatedUnion('course_type', [
    // ── formation ──────────────────────────────────────────────────
    z.object({
      course_type: z.literal('formation'),
      ...baseFields,
      ...taxonomyFields,
      format: z.enum(['video', 'texte', 'live', 'mixte', 'sprint']),
      duration_hours: z.number().positive(),
      level: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
      prerequisites_fr: z.array(z.string()).default([]),
      prerequisites_en: z.array(z.string()).default([]),
      learning_objectives_fr: z.array(z.string()).min(3).max(8),
      learning_objectives_en: z.array(z.string()).min(3).max(8),
      modules: z
        .array(
          z.object({
            num: z.string(),
            title_fr: z.string(),
            title_en: z.string(),
            duration_minutes: z.number().int().positive(),
            type: z.enum(['lecture', 'exercice', 'projet', 'evaluation']),
          }),
        )
        .min(3),
      instructor: reference('authors'),
      pricing: z
        .object({
          currency: z.literal('EUR'),
          one_time_eur: z.number().int().nonnegative().optional(),
          subscription_eur: z.number().int().nonnegative().optional(),
          stripe_payment_link: z.string().url().optional(),
        })
        .optional(),
      next_session_at: z.coerce.date().optional(),
      seats_total: z.number().int().positive().optional(),
      seats_remaining: z.number().int().nonnegative().optional(),
      certification: z.boolean().default(false),
      related_offres: z.array(z.string()).default([]),
    }),
    // ── parcours ───────────────────────────────────────────────────
    z.object({
      course_type: z.literal('parcours'),
      ...baseFields,
      ...taxonomyFields,
      duration_weeks: z.number().int().positive(),
      total_hours: z.number().positive(),
      level: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
      target_audience: z.array(
        z.enum([
          'ceo', 'cto', 'cmo', 'cso', 'cfo',
          'marketing-manager', 'sales-manager', 'product-manager',
          'developer', 'designer', 'consultant',
        ]),
      ),
      courses: z.array(z.string()).min(2),
      outcomes_fr: z.array(z.string()).min(3),
      outcomes_en: z.array(z.string()).min(3),
      pricing_eur: z.number().int().positive(),
      stripe_payment_link: z.string().url().optional(),
      certification: z.boolean().default(true),
    }),
    // ── atelier ────────────────────────────────────────────────────
    z.object({
      course_type: z.literal('atelier'),
      ...baseFields,
      ...taxonomyFields,
      scheduled_at: z.coerce.date(),
      duration_hours: z.number().positive(),
      format: z.enum(['live-online', 'live-paris', 'live-geneve', 'replay-only']),
      seats_total: z.number().int().positive(),
      seats_remaining: z.number().int().nonnegative(),
      instructor: reference('authors'),
      pricing_eur: z.number().int().nonnegative().default(0),
      stripe_payment_link: z.string().url().optional(),
      replay_available: z.boolean().default(true),
      recording_url: z.string().url().optional(),
    }),
    // ── certification (NOUVEAU type) ───────────────────────────────
    z.object({
      course_type: z.literal('certification'),
      ...baseFields,
      ...taxonomyFields,
      certification_level: z.enum(['debutant', 'intermediaire', 'avance']),
      validation_method: z.string(),
      duration_hours: z.number().positive(),
      exam_format: z.enum(['qcm', 'projet', 'oral', 'mixte']),
      prerequisites_fr: z.array(z.string()).default([]),
      prerequisites_en: z.array(z.string()).default([]),
      passing_score: z.number().min(0).max(100).optional(),
      validity_years: z.number().int().positive().optional(),
      instructor: reference('authors').optional(),
      pricing_eur: z.number().int().nonnegative().default(0),
      stripe_payment_link: z.string().url().optional(),
      related_formations: z.array(z.string()).default([]),
    }),
  ]),
});

// ─── Brand Voice ─── (collection `brandVoice` archivée V-F1, docs/40 §1 :
// gouvernance de marque, pas du contenu de site → docs/archive/content/brand-voice/)

// ═════════════════════════════════════════════════════════════════
// Tier 4 · prompts (bibliothèque AI internal/public) — T4.3
// ═════════════════════════════════════════════════════════════════

const prompts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/prompts' }),
  schema: z.object({
    name_fr: z.string().min(1),
    name_en: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    purpose_fr: z.string().min(40).max(280),
    purpose_en: z.string().min(40).max(280),
    system_prompt_fr: z.string().min(20),
    system_prompt_en: z.string().min(20),
    variables: z
      .array(
        z.object({
          name: z.string(),
          label_fr: z.string(),
          label_en: z.string(),
          required: z.boolean().default(true),
        }),
      )
      .default([]),
    sample_output_fr: z.string().optional(),
    sample_output_en: z.string().optional(),
    category: z.enum([
      'audit',
      'copywriting',
      'persona',
      'brand',
      'schema',
      'diagnostic',
      'autre',
    ]),
    visibility: z.enum(['internal', 'public']).default('internal'),
    publishedAt: z.coerce.date(),
    seo: z.object({
      meta_description_fr: z.string().max(160),
      meta_description_en: z.string().max(160),
    }).optional(),
  }),
});

// ═════════════════════════════════════════════════════════════════
// Tier 4 · pain-points : collection migrée en référentiel TS (R7a/V-F1, docs/40 §1) :
// source unique = src/data/pain-points.ts · MDX archivés docs/archive/content/pain-points/
// ═════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════
// Tier 4 · knowledge-base : collection archivée V-F1 (docs/40 §1) : 0 consommateur ;
// doctrine recyclable (méthode, prix, design) → docs/archive/content/knowledge-base/
// ═════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════
// Tier 6 · proof-points : collection migrée en référentiel TS (R7a/V-F1, docs/40 §1) :
// source unique = src/data/proof-points.ts · MDX archivés docs/archive/content/proof-points/
// ═════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════
// Tier 6 · guarantees : collection migrée en référentiel TS (V-F1, docs/40 §1) :
// source unique = src/data/guarantees.ts · MDX archivés docs/archive/content/guarantees/
// ═════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════

export const collections = {
  // V1 existantes
  cases,
  offres,
  solutions,
  technologies,
  blog,
  secteurs,
  outils,
  authors,
  // V2 nouvelles (2026-05-15)
  courses,
  // Tier 4 AI-first (2026-05-16)
  prompts,
  // ADR-003 (2026-06-13) : services + landings
  services,
  lp,
};
