/**
 * Schema.org JSON-LD builder centralise pour toutes les collections.
 *
 * Usage dans un loader :
 *   import { buildSchemaForPage } from '../../../lib/seo/schema-builder';
 *   const jsonLd = buildSchemaForPage(entry, 'blog', { lang, url, authorEntry });
 *   // puis pass a <Base jsonLd={jsonLd}>
 */

import { SITE } from '../../site.config';
import founderData from '../../content/authors/simon-beros.json';
import { ENGAGEMENT_OFFERS, TRAINING_PRICE_NOTE, type EngagementPricing } from '../../data/pricing';

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
  /** Page hub : catalogue des services enfants (pages réelles). */
  catalog?: { name: string; services: Array<{ name: string; url: string }> };
}

interface BuildOfferInput {
  name: string;
  price?: string | number;
  priceCurrency?: string;
  priceSpecification?: JsonLdObject;
  availability?: string;
  url?: string;
  /** Offre imbriquée dans un autre nœud (Service.offers) : pas de `@context` propre. */
  nested?: boolean;
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

/** URL absolue canonique d'un chemin du site (sans slash final, sauf la racine). */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const clean = pathOrUrl.split('#')[0].split('?')[0].replace(/\/+$/, '');
  return clean === '' ? `${SITE_URL}/` : `${SITE_URL}${clean.startsWith('/') ? '' : '/'}${clean}`;
}

/**
 * JSON-LD `BreadcrumbList`. SOURCE UNIQUE du fil d'Ariane structuré : les composants
 * `<Breadcrumb>` et `<MastheadRow>` passent par ici.
 *
 * Chaque `ListItem` porte `position`, `name` ET `item` (URL absolue), dernier niveau
 * compris : Google tolère l'absence d'`item` sur le dernier élément, mais Search Console
 * la remonte en avertissement « Champ "item" manquant ». `currentUrl` = URL canonique de la
 * page, attribuée au dernier niveau quand il n'a pas d'URL propre. Un niveau intermédiaire
 * sans URL est complété après le build (seo-postbuild.mjs : URL de la page parente réelle).
 */
function buildBreadcrumbList(items: Array<{ name: string; url?: string }>, currentUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => {
      const url = item.url ?? (idx === items.length - 1 ? currentUrl : undefined);
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        ...(url ? { item: absoluteUrl(url) } : {}),
      };
    }),
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
  { '@type': 'City', name: 'Toulouse' },
  { '@type': 'City', name: 'Paris' },
  { '@type': 'Country', name: 'France' },
];

const LOGO_URL = `${SITE_URL}/favicon-256.png`;

/**
 * Fondateur : une seule entité sur tout le site (même `@id` partout). Nom et profil LinkedIn
 * viennent de la fiche auteur (src/content/authors/simon-beros.json), pas d'une copie.
 */
export const FOUNDER = {
  id: SCHEMA_IDS.founder,
  name: founderData.title_fr,
  url: `${SITE_URL}/equipe/simon-beros`,
  sameAs: [founderData.social?.linkedin].filter((u): u is string => Boolean(u)),
} as const;

/** Nœud `Person` court du fondateur (auteur d'article, fondateur de l'organisation). */
export function founderPerson(): JsonLdObject {
  return {
    '@type': 'Person',
    '@id': FOUNDER.id,
    name: FOUNDER.name,
    url: FOUNDER.url,
    ...(FOUNDER.sameAs.length > 0 ? { sameAs: [...FOUNDER.sameAs] } : {}),
  };
}

/** Référence à l'Organization du site : un seul nœud complet par page, relié par `@id`. */
export const ORGANIZATION_REF = { '@id': SCHEMA_IDS.organization } as const;

/** Adresse d'activité (src/site.config.ts). Ne change pas avec la zone desservie. */
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
    founder: founderPerson(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SITE.email,
      telephone: SITE.telE164,
      availableLanguage: ['fr'],
      areaServed: { '@type': 'Country', name: 'France' },
    },
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
 * ProfessionalService : l'entité « prestataire local ». Adresse = adresse d'activité,
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
    image: LOGO_URL,
    logo: LOGO_URL,
    telephone: SITE.telE164,
    email: SITE.email,
    address: postalAddress(),
    areaServed: AREA_SERVED,
    parentOrganization: { '@id': SCHEMA_IDS.organization },
    sameAs: [...SITE.sameAs],
  };
}

export interface BuildPersonInput {
  /** Slug de la fiche auteur (`/equipe/<slug>`). */
  slug: string;
  name: string;
  jobTitle?: string;
  description?: string;
  /** Chemin ou URL de la photo. */
  image?: string;
  sameAs?: Array<string | undefined>;
  /** Domaines d'expertise affichés sur la fiche. */
  knowsAbout?: string[];
}

/** JSON-LD `Person` complet (fiche auteur). N'y mettre que des faits affichés sur la fiche. */
function buildPerson(input: BuildPersonInput): JsonLdObject {
  // `sameAs` = profils de la personne ailleurs sur le web ; le site lui-même n'en est pas un.
  const sameAs = (input.sameAs ?? []).filter((u): u is string => Boolean(u) && u !== SITE_URL && u !== `${SITE_URL}/`);
  return withContext({
    '@type': 'Person',
    '@id': `${SITE_URL}/equipe/${input.slug}#person`,
    name: input.name,
    url: `${SITE_URL}/equipe/${input.slug}`,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    worksFor: ORGANIZATION_REF,
  });
}

/** JSON-LD `ProfilePage` d'une fiche auteur : référence la `Person` émise à côté. */
function buildProfilePage(input: { slug: string; name: string }): JsonLdObject {
  const url = `${SITE_URL}/equipe/${input.slug}`;
  return withContext({
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: input.name,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': SCHEMA_IDS.website },
    mainEntity: { '@id': `${url}#person` },
  });
}

function buildPersonFromAuthor(authorEntry: any, lang: Lang): JsonLdObject | undefined {
  if (!authorEntry) return undefined;
  const a = authorEntry.data;
  return buildPerson({
    slug: authorEntry.id,
    name: a.title_fr,
    jobTitle: lang === 'fr' ? a.role_fr : a.role_en,
    description: lang === 'fr' ? a.description_fr : a.description_en,
    image: a.photo,
    sameAs: [a.social?.linkedin, a.social?.github, a.social?.website],
    knowsAbout: a.expertise,
  });
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

// ─── Prix (source unique des nœuds Offer) ────────────────────────────────────
// Tous les prix du site sont hors taxes : `valueAddedTaxIncluded: false` partout.
// Aucun montant n'est écrit ici : ils viennent de src/data/pricing.ts ou du contenu de la
// page (champ `seo.priceMin` du service, affiché par sa section de prix).

/** Spécification de prix d'une offre, selon sa nature (ferme, « dès », mensuel, horaire). */
function priceFields(pricing: EngagementPricing): JsonLdObject {
  const base = { priceCurrency: 'EUR', valueAddedTaxIncluded: false };
  switch (pricing.kind) {
    case 'fixed':
      return {
        price: pricing.price,
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', price: pricing.price, ...base },
      };
    case 'from':
      return {
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: pricing.price, ...base },
      };
    case 'monthly':
      return {
        price: pricing.price,
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: pricing.price, unitCode: 'MON', ...base },
      };
    case 'hourly':
      return {
        price: pricing.price,
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: pricing.price, unitCode: 'HUR', ...base },
      };
  }
}

/**
 * Offre d'une page service à partir de ses prix affichés (`seo.priceMin` / `seo.priceMax`,
 * `seo.priceRange` pour l'unité). « Dès X € » → `minPrice` seul : jamais de plafond inventé.
 * Une fourchette mensuelle (« €/mois ») sort en `UnitPriceSpecification` (unitCode MON).
 */
function buildServiceOffer(input: {
  name: string;
  url?: string;
  priceMin?: number;
  priceMax?: number;
  priceRange?: string;
}): JsonLdObject | undefined {
  if (input.priceMin == null && input.priceMax == null) return undefined;
  const monthly = /\/\s*mois/i.test(input.priceRange ?? '');
  return {
    '@type': 'Offer',
    name: input.name,
    ...(input.url ? { url: input.url } : {}),
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': monthly ? 'UnitPriceSpecification' : 'PriceSpecification',
      priceCurrency: 'EUR',
      ...(input.priceMin != null ? { minPrice: input.priceMin } : {}),
      ...(input.priceMax != null ? { maxPrice: input.priceMax } : {}),
      ...(monthly ? { unitCode: 'MON' } : {}),
      valueAddedTaxIncluded: false,
    },
  };
}

export interface CatalogService {
  name: string;
  /** Chemin ou URL de la page du service. */
  url: string;
}

/**
 * `OfferCatalog` listant des services (pages réelles du site). Sans prix : le prix d'un
 * service est balisé sur SA page, là où il est affiché.
 */
function buildServiceCatalog(name: string, services: CatalogService[], id?: string): JsonLdObject {
  return {
    '@type': 'OfferCatalog',
    ...(id ? { '@id': id } : {}),
    name,
    numberOfItems: services.length,
    itemListElement: services.map((svc) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: svc.name, url: absoluteUrl(svc.url) },
    })),
  };
}

/**
 * Catalogue complet de /services : un `OfferCatalog` par domaine, chacun listant ses pages.
 * Relié à l'Organization par `hasOfferCatalog` (page-schema.ts).
 */
function buildServicesHubCatalog(
  name: string,
  url: string,
  domains: Array<{ name: string; services: CatalogService[] }>,
): JsonLdObject {
  return withContext({
    '@type': 'OfferCatalog',
    '@id': `${url}#catalogue`,
    name,
    url,
    numberOfItems: domains.length,
    itemListElement: domains.map((d) => buildServiceCatalog(d.name, d.services)),
  });
}

/**
 * Catalogue des offres de /tarifs, ligne pour ligne, depuis src/data/pricing.ts
 * (ENGAGEMENT_OFFERS). Chaque montant balisé est affiché sur la page (gate check-jsonld).
 */
function buildPricingCatalog(name: string, url: string): JsonLdObject {
  return withContext({
    '@type': 'OfferCatalog',
    '@id': `${url}#catalogue`,
    name,
    url,
    numberOfItems: ENGAGEMENT_OFFERS.length,
    itemListElement: ENGAGEMENT_OFFERS.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      ...(offer.description ? { description: offer.description } : {}),
      url,
      ...priceFields(offer.pricing),
      seller: ORGANIZATION_REF,
    })),
  });
}

function buildService(input: BuildServiceInput): JsonLdObject;
function buildService(name: string, description: string, provider?: JsonLdObject, areaServed?: Array<string | JsonLdObject>): JsonLdObject;
function buildService(
  inputOrName: BuildServiceInput | string,
  description?: string,
  provider?: JsonLdObject,
  areaServed?: Array<string | JsonLdObject>,
): JsonLdObject {
  const input: BuildServiceInput =
    typeof inputOrName === 'string'
      ? { name: inputOrName, description: description ?? '', provider, areaServed }
      : inputOrName;

  // `priceRange` n'est PAS une propriété de Service dans schema.org (elle appartient à
  // LocalBusiness) : elle n'est pas émise, elle sert seulement à lire l'unité (« /mois »).
  // Le prix passe par `offers`, et seulement si la page fournit un prix (donc l'affiche).
  const offers =
    input.offers ??
    buildServiceOffer({
      name: input.name,
      url: input.url,
      priceMin: input.priceMin,
      priceMax: input.priceMax,
      priceRange: input.priceRange,
    });

  return withContext({
    '@type': 'Service',
    name: input.name,
    description: input.description,
    provider: input.provider ?? ORGANIZATION_REF,
    areaServed: input.areaServed ?? AREA_SERVED,
    serviceType: input.serviceType || input.name,
    ...(input.url ? { url: input.url } : {}),
    ...(offers ? { offers } : {}),
    ...(input.catalog && input.catalog.services.length > 0
      ? { hasOfferCatalog: buildServiceCatalog(input.catalog.name, input.catalog.services) }
      : {}),
  });
}

/**
 * Présence dans une ville SANS bureau (Bordeaux, Lyon…) : `ProfessionalService` rattaché à
 * l'Organization, `areaServed` = la ville, AUCUNE adresse postale. L'adresse n'existe que
 * sur l'entité du siège (buildLocalBusiness).
 */
function buildCityService(input: { city: string; url: string; description?: string }): JsonLdObject {
  return withContext({
    '@type': 'ProfessionalService',
    '@id': `${input.url}#service-local`,
    name: SITE.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    image: LOGO_URL,
    email: SITE.email,
    areaServed: { '@type': 'City', name: input.city },
    parentOrganization: ORGANIZATION_REF,
  });
}

/** JSON-LD `ContactPage` : l'entité contactée est l'Organization du site (référence). */
function buildContactPage(input: { name: string; url: string }): JsonLdObject {
  return withContext({
    '@type': 'ContactPage',
    '@id': `${input.url}#contactpage`,
    name: input.name,
    url: input.url,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': SCHEMA_IDS.website },
    mainEntity: ORGANIZATION_REF,
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
  /** Modalités réellement proposées (affichées sur la page). */
  modes?: ReadonlyArray<'online' | 'onsite' | 'blended'>;
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
  /**
   * Formats proposés et affichés sur la page (durée en heures, prix en euros HT), depuis
   * src/data/pricing.ts → TRAINING_FORMATS. Un format = une `CourseInstance` (courseWorkload)
   * et une `Offer`. Remplace `durationHours` / `priceEur` quand il y a plusieurs formats.
   */
  formats?: ReadonlyArray<{ hours: number; price: number }>;
  /** Organisme qui dispense la formation, si ce n'est pas Waimia en direct. */
  deliveredBy?: { name: string; description?: string; url?: string };
}

const COURSE_MODE: Record<'online' | 'onsite' | 'blended', string> = {
  online: 'Online',
  onsite: 'Onsite',
  blended: 'Blended',
};

/**
 * JSON-LD `Course` pour une page /formations/*. Champs requis par Google : name,
 * description, provider. `hasCourseInstance` porte la modalité et la durée (une instance
 * par format), `offers` le prix de chaque format.
 *
 *   buildCourse({ name, description, url, modes: ['online', 'onsite'],
 *                 deliveredBy: { name: 'Akigora', description: 'Organisme certifié Qualiopi' } })
 */
function buildCourse(input: BuildCourseInput): JsonLdObject {
  // `hasCourseInstance` seulement s'il existe une modalité ou une durée RÉELLE.
  const modes = (input.modes ?? []).map((m) => COURSE_MODE[m]);
  const courseInstance = (hours?: number): JsonLdObject => ({
    '@type': 'CourseInstance',
    ...(modes.length > 0 ? { courseMode: modes.length === 1 ? modes[0] : modes } : {}),
    ...(hours ? { courseWorkload: `PT${hours}H` } : {}),
    instructor: { '@id': SCHEMA_IDS.founder },
  });
  const formats = input.formats ?? [];
  const instance =
    formats.length > 0
      ? formats.map((f) => ({ ...courseInstance(f.hours), name: `${input.name}, format ${f.hours} heures` }))
      : modes.length > 0 || input.durationHours
        ? courseInstance(input.durationHours)
        : undefined;
  const courseOffer = (price: number, name?: string): JsonLdObject => ({
    '@type': 'Offer',
    ...(name ? { name } : {}),
    // Le prix d'une formation s'entend par session, pas par participant (source : pricing.ts).
    description: `${TRAINING_PRICE_NOTE.fr}.`,
    price,
    priceCurrency: 'EUR',
    priceSpecification: { '@type': 'PriceSpecification', price, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
    category: 'Paid',
    url: input.url,
  });
  const offers =
    formats.length > 0
      ? formats.map((f) => courseOffer(f.price, `Format ${f.hours} heures`))
      : input.priceEur != null
        ? courseOffer(input.priceEur)
        : undefined;

  return withContext({
    '@type': 'Course',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: 'fr-FR',
    // Waimia apporte le formateur et le contenu ; l'organisme qui dispense la formation
    // (Akigora) est déclaré à côté, avec la mention exacte affichée sur la page.
    provider: input.deliveredBy
      ? [
          ORGANIZATION_REF,
          {
            '@type': 'Organization',
            name: input.deliveredBy.name,
            ...(input.deliveredBy.description ? { description: input.deliveredBy.description } : {}),
            ...(input.deliveredBy.url ? { url: input.deliveredBy.url } : {}),
          },
        ]
      : ORGANIZATION_REF,
    ...(input.level ? { educationalLevel: input.level } : {}),
    ...(input.prerequisites?.length ? { coursePrerequisites: input.prerequisites } : {}),
    ...(input.teaches?.length ? { teaches: input.teaches } : {}),
    ...(input.audience ? { audience: { '@type': 'Audience', audienceType: input.audience } } : {}),
    ...(input.durationHours ? { timeRequired: `PT${input.durationHours}H` } : {}),
    ...(instance ? { hasCourseInstance: instance } : {}),
    ...(offers ? { offers } : {}),
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

  const offer: JsonLdObject = {
    '@type': 'Offer',
    name: input.name,
    ...(input.price !== undefined ? { price: input.price } : {}),
    priceCurrency: input.priceCurrency ?? 'EUR',
    ...(input.priceSpecification ? { priceSpecification: input.priceSpecification } : {}),
    availability: input.availability ?? 'https://schema.org/InStock',
    ...(input.url ? { url: input.url } : {}),
  };
  return 'nested' in input && input.nested ? offer : withContext(offer);
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
  // Sans auteur fourni (ou auteur = le fondateur), l'article est signé du fondateur, relié
  // à sa fiche et à son profil LinkedIn.
  const authorSchema =
    !input.author || input.author === FOUNDER.name
      ? founderPerson()
      : typeof input.author === 'string'
        ? { '@type': 'Person', name: input.author }
        : input.author;

  return withContext({
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    ...(input.image ? { image: Array.isArray(input.image) ? input.image : [input.image] } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: authorSchema,
    publisher: input.publisher ?? ORGANIZATION_REF,
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
            name: 'Services',
            url: `${SITE_URL}/services`,
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
  buildPerson,
  buildPersonFromAuthor,
  buildProfilePage,
  buildProductSchema,
  buildServiceOffer,
  buildServiceCatalog,
  buildServicesHubCatalog,
  buildPricingCatalog,
  buildCityService,
  buildContactPage,
  buildFAQPage,
  buildService,
};
