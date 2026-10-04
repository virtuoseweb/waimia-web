// Waimia · page-schema.ts · assemblage FINAL du JSON-LD d'une page (appelé par Base.astro).
//
// Les pages et templates fournissent leurs blocs métier (Service, Article, Course…) via
// la prop `jsonLd` de Base. Cette fonction les complète et les met en cohérence pour que
// chaque type de page sorte un graphe valide SANS que chaque template ait à s'en soucier :
//   · Organization + WebSite sur toutes les pages (un seul constructeur) ;
//   · ProfessionalService du siège sur l'accueil, le contact et la page de sa ville ;
//   · Service : provider relié à l'Organization, areaServed, serviceType, url ;
//   · Article / BlogPosting : auteur Person relié à sa page, éditeur, date de mise à jour
//     réelle, titre sans le suffixe de marque, mainEntityOfPage ;
//   · Course / WebApplication : provider relié ;
//   · aucun doublon d'entité (même @id ou bloc identique).
// Les blocs émis dans le corps par des composants (fil d'Ariane, FAQ) passent par la même
// normalisation après le build (src/integrations/seo-postbuild.mjs). Contrôle :
// scripts/check-jsonld.mjs.

import { SITE } from '../../site.config';
import { buildLocalBusiness, buildOrganization, buildWebSite, AREA_SERVED, FOUNDER, SCHEMA_IDS } from './schema-builder';
import { normalizeNode, typesOf, type SiteIdentity } from './schema-normalize.mjs';

type Json = Record<string, any>;
type Lang = 'fr' | 'en';

/** Identité du site transmise au normaliseur (module JS pur, sans import). */
export const SITE_IDENTITY: SiteIdentity = {
  url: SITE.url,
  name: SITE.name,
  organizationId: SCHEMA_IDS.organization,
  founderId: SCHEMA_IDS.founder,
  founderName: FOUNDER.name,
  founderUrl: FOUNDER.url,
  founderSameAs: [...FOUNDER.sameAs],
  logoUrl: `${SITE.url}/favicon-256.png`,
  areaServed: AREA_SERVED,
};

export interface FinalizeContext {
  /** Chemin de la page, sans slash final (`/` pour l'accueil). */
  pathname: string;
  canonicalUrl: string;
  lang: Lang;
  ogImage: string;
  /** Date réelle de dernière modification (YYYY-MM-DD) ou null. */
  lastmod: string | null;
}

/**
 * Pages où l'entité « prestataire local » du SIÈGE (avec adresse postale) est pertinente :
 * accueil, contact et la page de la ville du siège. Les autres pages de ville n'ont pas de
 * bureau : elles émettent `buildCityService` (zone desservie = la ville, sans adresse).
 */
function wantsLocalBusiness(pathname: string): boolean {
  return pathname === '/' || pathname === '/contact' || pathname === `/implantations/${HQ_CITY_SLUG}`;
}

/** Slug de la page implantation du siège légal (ville de SITE.city). */
export const HQ_CITY_SLUG = SITE.city
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-');

/**
 * Retourne la liste finale des blocs JSON-LD à émettre dans le <head>.
 * `pageBlocks` = blocs fournis par la page (props `jsonLd` + `additionalJsonLd` de Base).
 */
export function finalizePageSchema(pageBlocks: Json[], ctx: FinalizeContext): Json[] {
  const normalized = pageBlocks
    .filter((b) => b && typeof b === 'object')
    .map((b) => normalizeNode(b, ctx, SITE_IDENTITY));

  // Les pages n'ont pas à ré-émettre Organization / WebSite : on écarte leurs copies.
  const pageOwn = normalized.filter((b) => {
    const types = typesOf(b);
    return !(types.length === 1 && (types[0] === 'Organization' || types[0] === 'WebSite'));
  });

  // Un catalogue d'offres émis par la page (/services, /tarifs) est rattaché à l'Organization.
  const organization: Json = buildOrganization();
  const catalog = pageOwn.find((b) => typesOf(b).includes('OfferCatalog') && typeof b['@id'] === 'string');
  if (catalog) organization.hasOfferCatalog = { '@id': catalog['@id'] };

  const base: Json[] = [organization, buildWebSite(ctx.lang)];
  if (wantsLocalBusiness(ctx.pathname)) base.push(buildLocalBusiness());

  // Dédoublonnage : même @id, ou contenu strictement identique. Le bloc du site gagne.
  const seen = new Set<string>();
  const blocks: Json[] = [];
  for (const b of [...base, ...pageOwn]) {
    const key = typeof b['@id'] === 'string' ? `id:${b['@id']}` : `json:${JSON.stringify(b)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    blocks.push(b);
  }
  return blocks;
}
