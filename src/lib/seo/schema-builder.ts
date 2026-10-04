/**
 * Schema.org JSON-LD builder centralise pour toutes les collections.
 *
 * Usage dans un loader :
 *   import { buildSchemaForPage } from '../../../lib/seo/schema-builder';
 *   const jsonLd = buildSchemaForPage(entry, 'blog', { lang, url, authorEntry });
 *   // puis pass a <Base jsonLd={jsonLd}>
 */

import { SITE } from '../../site.config';

const SITE_URL = SITE.url;

type Lang = 'fr' | 'en';
type JsonLdObject = Record<string, unknown>;

interface BuildServiceInput {
  name: string;
  description: string;
  provider?: JsonLdObject;
  areaServed?: Array<string | JsonLdObject>;
  serviceType?: string;
  /** URL absolue de la page service. */
  url?: string;
  offers?: JsonLdObject | JsonLdObject[];
  /**
   * Fourchette de prix lisible (ex. "2000-10000€"). schema.org rattache `priceRange`
   * à LocalBusiness, pas à Service ; on l'expose en texte (toléré par les moteurs)
   * ET, si min/max sont déduits, via un Offer.priceSpecification valide sur Service.
   */
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
}

interface BuildOfferInput {
  name: string;
  price?: string | number;
  priceCurrency?: string;
  priceSpecification?: JsonLdObject;
  availability?: string;
  url?: string;
}

interface BuildArticleInput {
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author?: string | JsonLdObject;
  mainEntityOfPage?: string | JsonLdObject;
  publisher?: JsonLdObject;
  articleSection?: string;
  keywords?: string[];
  citation?: string[];
}

interface BuildHowToInput {
  name: string;
  steps: Array<string | { name?: string; text: string; url?: string }>;
  description?: string;
}

interface BuildContext {
  lang: Lang;
  url?: string;
  authorEntry?: any;
}

function buildBreadcrumbList(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// ─── Identité (source unique) ────────────────────────────────────────────────
// Un SEUL constructeur par entité. `src/lib/seo.ts` ré-exporte ceux-ci : il n'existe plus
// deux descriptions concurrentes de l'organisation dans le site.

/** Identifiants stables des entités, pour les relier entre blocs via `{ '@id': ... }`. */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  localBusiness: `${SITE_URL}/#localbusiness`,
  founder: `${SITE_URL}/equipe/simon-beros#person`,
} as const;

/** Description courte de l'entreprise (positionnement du brief, pas une identité « Claude »). */
export const ORGANIZATION_DESCRIPTION =
  "Studio de développement IA et cabinet de transformation IA et d'automatisation des processus pour PME et ETI : conseil, intégration, développement d'applications métier et formation.";

/** Zone desservie : missions à distance ou sur site dans ces villes, et partout en France. */
export const AREA_SERVED: JsonLdObject[] = [
  { '@type': 'City', name: 'Bordeaux' },
  { '@type': 'City', name: 'Montpellier' },
  { '@type': 'City', name: 'Lyon' },
  { '@type': 'City', name: 'Paris' },
  { '@type': 'Country', name: 'France' },
];

const LOGO_URL = `${SITE_URL}/favicon-256.png`;

/** Adresse légale (siège). Ne change pas avec la zone desservie. */
function postalAddress(): JsonLdObject {
  return {
    '@type': 'PostalAddress',
    streetAddress: SITE.streetAddress,
    postalCode: SITE.postalCode,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  };
}

function buildOrganization(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 256, height: 256 },
    description: ORGANIZATION_DESCRIPTION,
    email: SITE.email,
    telephone: SITE.tel,
    foundingDate: SITE.foundingDate,
    vatID: SITE.vatID,
    address: postalAddress(),
    areaServed: AREA_SERVED,
    founder: { '@type': 'Person', '@id': SCHEMA_IDS.founder, name: 'Simon Beros', url: `${SITE_URL}/equipe/simon-beros` },
    sameAs: [...SITE.sameAs],
    knowsAbout: [
      'Automatisation des processus',
      'Agents IA',
      'Intégration IA',
      'n8n',
      'Make',
      'Claude',
      'OpenAI',
      'Applications métier sur mesure',
      'Bases de connaissance (RAG)',
      'Formation IA et automatisation',
      'RGPD',
      'AI Act',
    ],
  };
}

function buildWebSite(lang: Lang = 'fr'): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: SITE.name,
    description: ORGANIZATION_DESCRIPTION,
    inLanguage: lang === 'en' ? 'en-US' : 'fr-FR',
    publisher: { '@id': SCHEMA_IDS.organization },
  };
}

/**
 * ProfessionalService : l'entité « prestataire local ». Adresse = siège légal (inchangé),
 * `areaServed` = villes réellement desservies. Émis sur l'accueil et les pages implantation.
 */
function buildLocalBusiness(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SCHEMA_IDS.localBusiness,
    name: SITE.name,
    alternateName: SITE.legalName,
    description: ORGANIZATION_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/og/default.png`,
    logo: LOGO_URL,
    telephone: SITE.telE164,
    email: SITE.email,
    address: postalAddress(),
    areaServed: AREA_SERVED,
    parentOrganization: { '@id': SCHEMA_IDS.organization },
    sameAs: [...SITE.sameAs],
  };
}

function buildPersonFromAuthor(authorEntry: any, lang: Lang): JsonLdObject | undefined {
  if (!authorEntry) return undefined;
  const a = authorEntry.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/equipe/${authorEntry.id}#person`,
    name: a.title_fr,
    jobTitle: lang === 'fr' ? a.role_fr : a.role_en,
    description: lang === 'fr' ? a.description_fr : a.description_en,
    image: a.photo ? `${SITE_URL}${a.photo}` : undefined,
    url: `${SITE_URL}/equipe/${authorEntry.id}`,
    sameAs: [a.social?.linkedin, a.social?.x, a.social?.github, a.social?.website].filter(Boolean),
    worksFor: { '@id': SCHEMA_IDS.organization },
  };
}

function buildCitations(sources: any[]) {
  if (!sources || sources.length === 0) return [];

  return sources.map((s) => ({
    '@context': 'https://schema.org',
    '@type': s.type === 'university' ? 'ScholarlyArticle' : s.type === 'journal' ? 'NewsArticle' : 'Article',
    name: s.name,
    url: s.url,
    datePublished: s.publishedAt ? new Date(s.publishedAt).toISOString().split('T')[0] : undefined,
    author: s.author ? { '@type': 'Organization', name: s.author } : undefined,
  }));
}

function buildFAQPage(faqItems: any[] | undefined) {
  if (!faqItems || faqItems.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

function withContext(schema: JsonLdObject): JsonLdObject {
  return { '@context': 'https://schema.org', ...schema };
}

function buildService(input: BuildServiceInput): JsonLdObject;
function buildService(name: string, description: string, provider?: JsonLdObject, areaServed?: Array<string | JsonLdObject>): JsonLdObject;
function buildService(
  inputOrName: BuildServiceInput | string,
  description?: string,
  provider?: JsonLdObject,
  areaServed?: Array<string | JsonLdObject>,
): JsonLdObject {
  const input =
    typeof inputOrName === 'string'
      ? { name: inputOrName, description: description ?? '', provider, areaServed }
      : inputOrName;

  const derivedOffers =
    !input.offers && (input.priceMin != null || input.priceMax != null)
      ? {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            ...(input.priceMin != null ? { minPrice: input.priceMin } : {}),
            ...(input.priceMax != null ? { maxPrice: input.priceMax } : {}),
          },
        }
      : undefined;

  // `priceRange` n'est PAS une propriété de Service dans schema.org (elle appartient à
  // LocalBusiness) : elle n'est plus émise. Le prix passe par `offers.priceSpecification`,
  // et seulement si la page fournit un prix (donc l'affiche).
  return withContext({
    '@type': 'Service',
    name: input.name,
    description: input.description,
    provider: input.provider ?? { '@id': SCHEMA_IDS.organization },
    areaServed: input.areaServed ?? AREA_SERVED,
    serviceType: input.serviceType || input.name,
    ...(input.url ? { url: input.url } : {}),
    ...(input.offers ? { offers: input.offers } : derivedOffers ? { offers: derivedOffers } : {}),
  });
}

// ─── Formations (/formations/*) ──────────────────────────────────────────────

export interface BuildCourseInput {
  /** Intitulé de la formation (= H1 de la page). */
  name: string;
  description: string;
  /** URL absolue de la page formation. */
  url: string;
  /** Durée totale en heures (ex. 14 pour 2 jours). */
  durationHours?: number;
  /** Modalité : distanciel, présentiel ou mixte. */
  mode?: 'online' | 'onsite' | 'blended';
  /** Niveau visé, en clair (ex. « Débutant »). */
  level?: string;
  /** Prérequis, en clair. */
  prerequisites?: string[];
  /** Ce que le stagiaire sait faire à la fin. */
  teaches?: string[];
  /** Public visé (ex. « Équipes opérations et commerciales de PME »). */
  audience?: string;
  /**
   * Prix affiché sur la page, en euros. Ne renseigner QUE si la page l'affiche.
   * Sans prix affiché, aucune offre n'est émise (« sur devis après audit gratuit »).
   */
  priceEur?: number;
  /** Organisme qui dispense la formation, si ce n'est pas Waimia en direct. */
  deliveredBy?: { name: string; url?: string };
}

const COURSE_MODE: Record<NonNullable<BuildCourseInput['mode']>, string> = {
  online: 'Online',
  onsite: 'Onsite',
  blended: 'Blended',
};

/**
 * JSON-LD `Course` pour une page /formations/*. Champs requis par Google : name,
 * description, provider. `hasCourseInstance` porte la modalité et la durée.
 *
 *   buildCourse({ name, description, url, durationHours: 14, mode: 'online',
 *                 deliveredBy: { name: 'Akigora', url: 'https://akigora.com' } })
 */
function buildCourse(input: BuildCourseInput): JsonLdObject {
  const instance =
    input.mode || input.durationHours
      ? {
          '@type': 'CourseInstance',
          ...(input.mode ? { courseMode: COURSE_MODE[input.mode] } : {}),
          ...(input.durationHours ? { courseWorkload: `PT${input.durationHours}H` } : {}),
          instructor: { '@id': SCHEMA_IDS.founder },
        }
      : undefined;

  return withContext({
    '@type': 'Course',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: 'fr-FR',
    provider: { '@id': SCHEMA_IDS.organization },
    ...(input.deliveredBy
      ? {
          sourceOrganization: {
            '@type': 'Organization',
            name: input.deliveredBy.name,
            ...(input.deliveredBy.url ? { url: input.deliveredBy.url } : {}),
          },
        }
      : {}),
    ...(input.level ? { educationalLevel: input.level } : {}),
    ...(input.prerequisites?.length ? { coursePrerequisites: input.prerequisites } : {}),
    ...(input.teaches?.length ? { teaches: input.teaches } : {}),
    ...(input.audience ? { audience: { '@type': 'Audience', audienceType: input.audience } } : {}),
    ...(input.durationHours ? { timeRequired: `PT${input.durationHours}H` } : {}),
    ...(instance ? { hasCourseInstance: instance } : {}),
    ...(input.priceEur != null
      ? {
          offers: {
            '@type': 'Offer',
            price: input.priceEur,
            priceCurrency: 'EUR',
            category: 'Paid',
            url: input.url,
          },
        }
      : {}),
  });
}

// ─── Outil interactif (calculateur, diagnostic) ──────────────────────────────

export interface BuildWebApplicationInput {
  name: string;
  description: string;
  url: string;
  /** Catégorie schema.org (défaut : application métier). */
  applicationCategory?: string;
}

/** JSON-LD `WebApplication` pour un outil gratuit utilisable dans le navigateur. */
function buildWebApplication(input: BuildWebApplicationInput): JsonLdObject {
  return withContext({
    '@type': 'WebApplication',
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory ?? 'BusinessApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    provider: { '@id': SCHEMA_IDS.organization },
  });
}

/** JSON-LD `ItemList` (liste ordonnée de pages : hub, comparatif, sélection). */
function buildItemList(name: string, items: Array<{ name: string; url: string }>): JsonLdObject {
  return withContext({
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  });
}

function buildOffer(input: BuildOfferInput): JsonLdObject;
function buildOffer(price: string | number, priceCurrency: string, name: string): JsonLdObject;
function buildOffer(
  inputOrPrice: BuildOfferInput | string | number,
  priceCurrency?: string,
  name?: string,
): JsonLdObject {
  const input =
    typeof inputOrPrice === 'object'
      ? inputOrPrice
      : { price: inputOrPrice, priceCurrency: priceCurrency ?? 'EUR', name: name ?? 'Waimia service' };

  return withContext({
    '@type': 'Offer',
    name: input.name,
    ...(input.price !== undefined ? { price: input.price } : {}),
    priceCurrency: input.priceCurrency ?? 'EUR',
    ...(input.priceSpecification ? { priceSpecification: input.priceSpecification } : {}),
    availability: input.availability ?? 'https://schema.org/InStock',
    ...(input.url ? { url: input.url } : {}),
  });
}

function buildArticle(input: BuildArticleInput): JsonLdObject;
function buildArticle(
  headline: string,
  description: string,
  image: string | string[] | undefined,
  datePublished: string,
  author: string | JsonLdObject,
): JsonLdObject;
function buildArticle(
  inputOrHeadline: BuildArticleInput | string,
  description?: string,
  image?: string | string[],
  datePublished?: string,
  author?: string | JsonLdObject,
): JsonLdObject {
  const input =
    typeof inputOrHeadline === 'string'
      ? {
          headline: inputOrHeadline,
          description: description ?? '',
          image,
          datePublished: datePublished ?? new Date().toISOString().split('T')[0],
          author,
        }
      : inputOrHeadline;
  const authorSchema =
    typeof input.author === 'string'
      ? { '@type': 'Person', name: input.author }
      : input.author;

  return withContext({
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    ...(input.image ? { image: Array.isArray(input.image) ? input.image : [input.image] } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    ...(authorSchema ? { author: authorSchema } : {}),
    publisher:
      input.publisher ??
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE.name,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon-256.png` },
      },
    ...(input.mainEntityOfPage
      ? {
          mainEntityOfPage:
            typeof input.mainEntityOfPage === 'string'
              ? { '@type': 'WebPage', '@id': input.mainEntityOfPage }
              : input.mainEntityOfPage,
        }
      : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords } : {}),
    ...(input.citation && input.citation.length > 0 ? { citation: input.citation } : {}),
  });
}

function buildHowTo(input: BuildHowToInput): JsonLdObject;
function buildHowTo(name: string, steps: BuildHowToInput['steps']): JsonLdObject;
function buildHowTo(inputOrName: BuildHowToInput | string, steps?: BuildHowToInput['steps']): JsonLdObject {
  const input = typeof inputOrName === 'string' ? { name: inputOrName, steps: steps ?? [] } : inputOrName;

  return withContext({
    '@type': 'HowTo',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    step: input.steps.map((step, index) => {
      if (typeof step === 'string') {
        return { '@type': 'HowToStep', position: index + 1, text: step };
      }
      return {
        '@type': 'HowToStep',
        position: index + 1,
        ...(step.name ? { name: step.name } : {}),
        text: step.text,
        ...(step.url ? { url: step.url } : {}),
      };
    }),
  });
}

function buildCollectionPage(name: string, description: string, items: Array<string | JsonLdObject> = []): JsonLdObject {
  return withContext({
    '@type': 'CollectionPage',
    name,
    description,
    ...(items.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            // Une chaîne qui n'est pas une URL est un libellé : elle va dans `name`
            // (`item` attend une URL ou une entité, pas un texte).
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              ...(typeof item === 'string' && !/^https?:\/\//.test(item) ? { name: item } : { item }),
            })),
          },
        }
      : {}),
  });
}

function buildArticleSchema(entry: any, lang: Lang, url: string, authorEntry?: any) {
  const d = entry.data;

  return buildArticle({
    headline: lang === 'fr' ? d.title_fr : d.title_en,
    description: lang === 'fr' ? d.description_fr : d.description_en,
    datePublished: new Date(d.publishedAt).toISOString().split('T')[0],
    dateModified: d.updatedAt ? new Date(d.updatedAt).toISOString().split('T')[0] : undefined,
    author: authorEntry ? buildPersonFromAuthor(authorEntry, lang) ?? undefined : undefined,
    mainEntityOfPage: url,
    image: d.heroImage ? `${SITE_URL}${d.heroImage}` : undefined,
    articleSection: lang === 'fr' ? d.category_fr ?? d.category : d.category_en ?? d.category,
    keywords: d.tags,
    ...(d.sources && d.sources.length > 0
      ? {
          citation: d.sources.map((s: any) => s.url),
        }
      : {}),
  });
}

function buildHowToSchema(entry: any, lang: Lang) {
  const d = entry.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'fr' ? d.title_fr : d.title_en,
    description: lang === 'fr' ? d.description_fr : d.description_en,
    totalTime: d.duration_fr,
    estimatedCost: d.priceFrom ? { '@type': 'MonetaryAmount', currency: 'EUR', value: d.priceFrom } : undefined,
    ...(d.prerequisites_fr && d.prerequisites_fr.length > 0
      ? {
          supply: d.prerequisites_fr.map((p: string) => ({
            '@type': 'HowToSupply',
            name: p,
          })),
        }
      : {}),
  };
}

function buildBookSchema(entry: any, lang: Lang) {
  const d = entry.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: lang === 'fr' ? d.title_fr : d.title_en,
    description: lang === 'fr' ? d.description_fr : d.description_en,
    numberOfPages: d.pages,
    datePublished: new Date(d.publishedAt).toISOString().split('T')[0],
    publisher: { '@type': 'Organization', name: SITE.name },
  };
}

function buildOfferSchema(entry: any, lang: Lang) {
  const d = entry.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: lang === 'fr' ? d.title_fr : d.title_en,
    category: 'InformationalContent',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: d.requireEmail ? `${SITE_URL}/api/lead-magnet?slug=${d.apiSlug}` : undefined,
  };
}

function buildNewsArticleSchema(entry: any, lang: Lang, url: string, authorEntry?: any) {
  const article = buildArticleSchema(entry, lang, url, authorEntry);

  return { ...article, '@type': 'NewsArticle' };
}

function buildServiceSchema(entry: any, lang: Lang) {
  const d = entry.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: lang === 'fr' ? d.title_fr : d.title_en,
    description: lang === 'fr' ? d.description_fr : d.description_en,
    provider: { '@id': SCHEMA_IDS.organization },
    areaServed: AREA_SERVED,
    serviceType: d.category_fr ?? (lang === 'fr' ? d.title_fr : d.title_en),
    ...(d.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: d.priceFrom,
              priceCurrency: 'EUR',
            },
          },
        }
      : {}),
  };
}

function buildProfilePageSchema(personSchema: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: personSchema,
  };
}

function buildCollectionPageSchema(name: string, description: string) {
  return buildCollectionPage(name, description);
}

function buildCourseSchema(entry: any, lang: Lang): JsonLdObject {
  const d = entry.data;
  const title = lang === 'fr' ? d.title_fr : d.title_en;
  const description = lang === 'fr' ? d.description_fr : d.description_en;

  const provider = { '@type': 'Organization', name: SITE.name, url: SITE_URL };

  if (d.course_type === 'atelier') {
    const ad = d;
    return withContext({
      '@type': 'Event',
      name: title,
      description,
      organizer: provider,
      location: ad.format === 'live-online'
        ? { '@type': 'VirtualLocation' }
        : { '@type': 'Place', name: `Live ${ad.format.replace('live-', '')}` },
      ...(ad.scheduled_at ? { startDate: new Date(ad.scheduled_at).toISOString() } : {}),
      eventAttendanceMode: ad.format === 'live-online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      ...(ad.pricing_eur != null ? {
        offers: { '@type': 'Offer', price: ad.pricing_eur, priceCurrency: 'EUR' },
      } : {}),
      ...(ad.seats_remaining != null ? { remainingAttendeeCapacity: ad.seats_remaining } : {}),
    });
  }

  const levelField = d.course_type === 'certification' ? d.certification_level : d.level;
  const durationHours = d.duration_hours;
  const pricing = d.course_type === 'formation'
    ? (d.pricing?.one_time_eur ?? d.pricing?.subscription_eur)
    : d.pricing_eur;

  return withContext({
    '@type': 'Course',
    name: title,
    description,
    provider,
    ...(levelField ? { educationalLevel: levelField } : {}),
    ...(durationHours ? { timeRequired: `PT${durationHours}H` } : {}),
    ...(pricing != null ? {
      offers: { '@type': 'Offer', price: pricing, priceCurrency: 'EUR' },
    } : {}),
  });
}

function buildProductSchema(entry: any, lang: Lang): JsonLdObject {
  const d = entry.data;
  const name = lang === 'fr' ? d.title_fr : d.title_en;
  const description = lang === 'fr' ? d.description_fr : d.description_en;

  if (d.commerce_type === 'product') {
    return withContext({
      '@type': 'Product',
      name,
      description,
      sku: d.sku,
      offers: {
        '@type': 'Offer',
        price: d.price_eur,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/commerce/product/${entry.id}`,
      },
    });
  }

  const priceSpecs: JsonLdObject[] = [
    {
      '@type': 'UnitPriceSpecification',
      price: d.price_eur_monthly,
      priceCurrency: 'EUR',
      billingIncrement: 1,
      unitCode: 'MON',
    },
  ];
  if (d.price_eur_yearly) {
    priceSpecs.push({
      '@type': 'UnitPriceSpecification',
      price: d.price_eur_yearly,
      priceCurrency: 'EUR',
      billingIncrement: 1,
      unitCode: 'ANN',
    });
  }

  return withContext({
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
    offers: {
      '@type': 'Offer',
      price: d.price_eur_monthly,
      priceCurrency: 'EUR',
      priceSpecification: priceSpecs,
    },
  });
}

export function buildSchemaForPage(
  entry: any,
  collection: string,
  ctx: BuildContext,
): Array<Record<string, unknown>> {
  const { lang, url, authorEntry } = ctx;
  const fullUrl = url ?? `${SITE_URL}/`;
  const schemas: Array<Record<string, unknown>> = [];
  const d = entry.data;

  switch (collection) {
    case 'authors': {
      const person = buildPersonFromAuthor(entry, lang);
      if (person) {
        schemas.push(person);
        schemas.push(buildProfilePageSchema(person));
      }
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? "L'equipe" : 'The team',
            url: `${SITE_URL}/equipe`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'blog': {
      schemas.push(buildArticleSchema(entry, lang, fullUrl, authorEntry));
      const citations = buildCitations(d.sources ?? []);
      if (citations.length > 0) schemas.push(...citations);
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Ressources' : 'Resources',
            url: `${SITE_URL}/ressources`,
          },
          {
            name: 'Blog',
            url: `${SITE_URL}/blog`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'cookbooks': {
      schemas.push(buildHowToSchema(entry, lang));
      schemas.push(buildArticleSchema(entry, lang, fullUrl, authorEntry));
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Ressources' : 'Resources',
            url: `${SITE_URL}/ressources`,
          },
          { name: 'Cookbooks', url: `${SITE_URL}/ressources/cookbooks` },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'livresBlancs': {
      schemas.push(buildBookSchema(entry, lang));
      schemas.push(buildArticleSchema(entry, lang, fullUrl, authorEntry));
      schemas.push(buildOfferSchema(entry, lang));
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Ressources' : 'Resources',
            url: `${SITE_URL}/ressources`,
          },
          {
            name: lang === 'fr' ? 'Livres blancs' : 'White papers',
            url: `${SITE_URL}/ressources/livres-blancs`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'veilleIA': {
      schemas.push(buildNewsArticleSchema(entry, lang, fullUrl, authorEntry));
      const citations = buildCitations(d.sources ?? []);
      if (citations.length > 0) schemas.push(...citations);
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Ressources' : 'Resources',
            url: `${SITE_URL}/ressources`,
          },
          { name: 'Veille IA', url: `${SITE_URL}/ressources/veille-ia` },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'cases':
    case 'cas': {
      schemas.push(buildArticleSchema(entry, lang, fullUrl, authorEntry));
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Cas clients' : 'Case studies',
            url: `${SITE_URL}/cas-clients`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'secteurs': {
      schemas.push(buildServiceSchema(entry, lang));
      const faq = buildFAQPage(lang === 'fr' ? d.faq_fr : d.faq_en);
      if (faq) schemas.push(faq);
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Secteurs' : 'Sectors',
            url: `${SITE_URL}/secteurs`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'solutions': {
      schemas.push(buildServiceSchema(entry, lang));
      const faq = buildFAQPage(lang === 'fr' ? d.faq_fr : d.faq_en);
      if (faq) schemas.push(faq);
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'offres': {
      schemas.push(buildServiceSchema(entry, lang));
      const faq = buildFAQPage(lang === 'fr' ? d.faq_fr : d.faq_en);
      if (faq) schemas.push(faq);
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          {
            name: lang === 'fr' ? 'Offres' : 'Services',
            url: `${SITE_URL}/services`,
          },
          { name: d.title_fr },
        ]),
      );
      break;
    }

    case 'courses': {
      schemas.push(buildCourseSchema(entry, lang));
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          { name: lang === 'fr' ? 'École' : 'Academy', url: `${SITE_URL}/ecole` },
          { name: d.course_type },
          { name: lang === 'fr' ? d.title_fr : d.title_en },
        ]),
      );
      break;
    }

    case 'commerce': {
      schemas.push(buildProductSchema(entry, lang));
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          { name: 'Commerce', url: `${SITE_URL}/commerce` },
          { name: d.commerce_type, url: `${SITE_URL}/commerce/${d.commerce_type}` },
          { name: lang === 'fr' ? d.title_fr : d.title_en },
        ]),
      );
      break;
    }

    default:
      schemas.push(
        buildBreadcrumbList([
          { name: lang === 'fr' ? 'Accueil' : 'Home', url: SITE_URL },
          { name: d.title_fr ?? 'Page' },
        ]),
      );
  }

  return schemas;
}

export {
  buildBreadcrumbList,
  buildArticle,
  buildCollectionPage,
  buildCollectionPageSchema,
  buildCourse,
  buildCourseSchema,
  buildHowTo,
  buildItemList,
  buildOrganization,
  buildWebSite,
  buildWebApplication,
  buildLocalBusiness,
  buildOffer,
  buildPersonFromAuthor,
  buildProductSchema,
  buildFAQPage,
  buildService,
};
