// Waimia · content collections · Zod schemas
// Cf docs/03-content-models.md pour le rationale de chaque champ.
// V2 (2026-05-15) : extension pour CMS headless complet · cf docs/13-CONTENT-ARCHITECTURE.md + 14-MASTER-PLAN

import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { sectionsArraySchema } from '@waimia/ds-kernel';

// ─── Mixin commun (SEO/GEO/AIO) ───
const seoBlock = z
  .object({
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    serviceType: z.string().optional(),
    priceRange: z.string().optional(),
    priceMin: z.number().optional(),
    priceMax: z.number().optional(),
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
    provenance: z.enum(['first-party', 'second-party']).default('first-party'),
    heroImage: z.string().optional(),
    // Habillage editorial du hero (magazine) : illustration demi-colonne + titre
    // en overlap. Optionnel → hero inchange sans ce champ.
    illustration: z
      .object({
        src: z.string(),
        alt_fr: z.string(),
        alt_en: z.string(),
        side: z.enum(['left', 'right']).default('right'),
      })
      .optional(),
    // Vitrine du site livre (section cataloguee site-showcase) : captures reelles + lien
    // nofollow. Optionnel → la section ne rend pas sans ce champ. Miroir du schema kernel
    // packages/ds-kernel/src/sections/site-showcase/schema.ts (garde les 2 alignes).
    showcase: z
      .object({
        kicker_fr: z.string().optional(),
        kicker_en: z.string().optional(),
        h2_fr: z.string().optional(),
        h2_en: z.string().optional(),
        lede_fr: z.string().optional(),
        lede_en: z.string().optional(),
        url: z.string().optional(),
        url_label_fr: z.string().optional(),
        url_label_en: z.string().optional(),
        screens: z
          .array(
            z.object({
              src: z.string(),
              alt_fr: z.string(),
              alt_en: z.string(),
              kind: z.enum(['frame', 'tall']).default('frame'),
              caption_fr: z.string().optional(),
              caption_en: z.string().optional(),
            }),
          )
          .min(1)
          .max(4),
      })
      .optional(),
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
    // ── Dé-templatisation (audit SEO final · c-preuve §3) : en-têtes de section
    //    et copie CTA pilotables par cas. TOUS optionnels → le template garde ses
    //    libellés par défaut si absents (0 régression). But : baisser le
    //    recouvrement d'ossature templatée entre pages cas sœurs (Jaccard 0.599).
    bottlenecksHeading_fr: z.string().optional(),
    bottlenecksHeading_en: z.string().optional(),
    approachHeading_fr: z.string().optional(),
    approachHeading_en: z.string().optional(),
    deliverablesHeading_fr: z.string().optional(),
    deliverablesHeading_en: z.string().optional(),
    resultsHeading_fr: z.string().optional(),
    resultsHeading_en: z.string().optional(),
    stackLead_fr: z.string().optional(),
    stackLead_en: z.string().optional(),
    ctaHeading_fr: z.string().optional(),
    ctaHeading_en: z.string().optional(),
    ctaSubtitle_fr: z.string().optional(),
    ctaSubtitle_en: z.string().optional(),
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
    // Card de listing pour le hub /cas-clients (copy spécifique au listing, ≠ title détail)
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

// ─── Offres : collection RETIRÉE (refonte v7, 2026-06-29) ───
// L'ancien hub /offres (3-piliers / pyramide) est supprimé : l'architecture v7
// repose sur 2 offres sous /services. Le seul contenu indexé survivant
// (audit-maturite-ia) a migré vers la collection `audits` (/audit-maturite-ia) ;
// growth-system-ia est supprimé (301 → /services). Toutes les anciennes URLs
// /offres/* sont redirigées (301) via astro.config.mjs `redirects:`.

// ─── Solutions : collection supprimée (SEO état final, §0ter / §2-C) :
// aucune page /solutions/* séparée · contenu fusionné en sections ancrées des
// piliers /acquerir, /piloter, /operer · régénérable à l'extension réelle d'un silo.

// ─── Schéma partagé des pages composables (services + lp) ───
// Mêmes champs SEO/GEO/AIO + taxonomies + sections. Extrait (rule 60) pour être
// RÉUTILISÉ par `services` ET `lp` (landing conversion) au lieu de dupliquer la forme Zod.
const composablePageSchema = z.object({
  ...baseFields,
  ...taxonomyFields,
  sections: sectionsArraySchema.optional(),
});

// ─── Services (ADR-003) · pages de service composables ───
const services = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/services' }),
  schema: composablePageSchema,
});

// ─── LP · landing conversion (2026-07-16) : déclinaison courte, orientée conversion
//     (outbound / cold email), noindex assumé (robots disallow /lp/ + hors sitemap,
//     cf astro.config.mjs). Réutilise le schéma composable des services. Route dédiée
//     src/pages/lp/[...slug].astro (sans masthead, noindex). ───
const lp = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/lp' }),
  schema: composablePageSchema,
});

// ─── Collections v7 (refonte SEO/GEO) ───
const casUsages = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/cas-usages' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const demonstrations = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/demonstrations' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const implantations = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/implantations' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/guides' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const diagnostics = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/diagnostics' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const comparatifs = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/comparatifs' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const audits = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,json}', base: './src/content/audits' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

const pagesLocales = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages-locales' }),
  schema: z.object({
    ...baseFields,
    ...taxonomyFields,
    sections: sectionsArraySchema.optional(),
  }),
});

// ─── Technologies : collection RETIRÉE (SEO état final §0ter) ───
// Le contenu claude-models a migré vers la page d'autorité composable
// src/pages/expertise-claude.astro. Plus aucun MDX, plus aucun consommateur.

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
    // Habillage editorial : override optionnel du hero illustre (sinon mapping par
    // categorie via src/lib/hero-illustrations.ts). `side` defaut droite.
    heroIllustration: z
      .object({ src: z.string(), alt_fr: z.string(), alt_en: z.string(), side: z.enum(['left', 'right']).optional() })
      .optional(),
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
    // Étapes de méthode (alignées sur la section catalogue `method-timeline`,
    // shape `stepSchema`). Optionnel → 0 régression sur un MDX qui ne le renseigne pas
    // (la route dérive alors une méthode par défaut partagée).
    methodSteps: z
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
    // Override/extension composable (rendu data-driven, modèle services/offres).
    sections: sectionsArraySchema.optional(),
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
    // Habillage editorial : override optionnel du hero illustre (sinon mapping par
    // slug via src/lib/hero-illustrations.ts). `side` defaut droite.
    heroIllustration: z
      .object({ src: z.string(), alt_fr: z.string(), alt_en: z.string(), side: z.enum(['left', 'right']).optional() })
      .optional(),
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
// Tier 4 · prompts : collection supprimée (SEO état final, fuite interne) :
// page /agence/prompts retirée · MDX supprimés.
// ═════════════════════════════════════════════════════════════════

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
// ─── Dashboard SEO (POC git-based, 2026-07-17) ───
// « L'OS » waimia, 1er module : logiciel SANS serveur/BDD. La mémoire vit dans
// des fichiers .md (1 fichier = 1 page suivie). CRUD = le markdown se met à jour
// (commit) et l'app au build. Frontmatter = métadonnées de la page suivie ; le
// CORPS markdown (entry.body) = mémoire/notes/recommandations, la « BDD ».
// Cadrage : docs/strategy/15-waimia-seo-app.md §7bis. Route : src/pages/dashboard-seo.astro.
// ═════════════════════════════════════════════════════════════════
const dashboardSeo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dashboard-seo' }),
  schema: z.object({
    // Chemin relatif de la page suivie sur waimia.com (ex. '/', '/services/site-web-ia').
    url: z.string().regex(/^\//, 'chemin relatif, doit commencer par /'),
    label: z.string().min(1),
    priority: z.enum(['haute', 'normale']).default('normale'),
    addedAt: z.coerce.date(),
  }),
});

// ═════════════════════════════════════════════════════════════════

export const collections = {
  // V1 existantes
  cases,
  blog,
  secteurs,
  outils,
  authors,
  // V2 nouvelles (2026-05-15)
  courses,
  // ADR-003 (2026-06-13) : services (silo /lp supprimé, audit #60 A1)
  services,
  // LP · landing conversion (2026-07-16, réintroduction ciblée) : modèle court noindex
  lp,
  // V7 (refonte SEO/GEO)
  'cas-usages': casUsages,
  demonstrations,
  implantations,
  guides,
  diagnostics,
  comparatifs,
  audits,
  'pages-locales': pagesLocales,
  // POC git-based (2026-07-17) : dashboard SEO, mémoire en .md
  'dashboard-seo': dashboardSeo,
};
