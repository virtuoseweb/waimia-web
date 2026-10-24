// Waimia · schema-normalize.mjs · mise en cohérence d'UN bloc JSON-LD.
//
// Même logique appliquée à deux endroits :
//   · Base.astro (via page-schema.ts) sur les blocs passés en props par les pages ;
//   · la passe post-build (integrations/seo-postbuild.mjs) sur les blocs émis dans le corps
//     par les composants (<Breadcrumb>, sections FAQ, templates), que Base ne voit pas.
// JS pur, sans import : l'appelant fournit l'identité du site dans `site`.

const ARTICLE_TYPES = new Set(['Article', 'BlogPosting', 'NewsArticle', 'TechArticle']);

/** Date ISO 8601 qui porte une heure (« 2026-10-24T15:42:00+02:00 »), pas seulement un jour. */
const hasTime = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v);
const DEAD_IMAGE = /\/og\/default\.png$/;

export function typesOf(node) {
  const t = node && node['@type'];
  return Array.isArray(t) ? t : t ? [t] : [];
}

/**
 * @typedef {{ url: string, name: string, organizationId: string, founderId: string,
 *             founderName: string, founderUrl: string, founderSameAs?: string[], logoUrl: string,
 *             areaServed: object[] }} SiteIdentity
 * @typedef {{ canonicalUrl: string, ogImage?: string, lastmod?: string | null, lang?: string }} PageContext
 */

function isOrganizationStub(value, site) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return typesOf(value).includes('Organization') && (value.name === site.name || value['@id'] === site.organizationId);
}

function founderAuthor(site) {
  return {
    '@type': 'Person',
    '@id': site.founderId,
    name: site.founderName,
    url: site.founderUrl,
    ...(site.founderSameAs?.length ? { sameAs: [...site.founderSameAs] } : {}),
  };
}

function normalizeAuthor(author, site) {
  if (!author || typeof author !== 'object' || Array.isArray(author)) return founderAuthor(site);
  // Un article signé par l'organisation n'a pas d'auteur identifiable : on relie le fondateur.
  // (y compris quand la marque a été saisie comme nom de personne).
  if (!typesOf(author).includes('Person') || !author.name || author.name === site.name) return founderAuthor(site);
  // Le fondateur est une seule entité : même @id, même URL de fiche, même profil LinkedIn.
  if (author.name === site.founderName) return { ...author, ...founderAuthor(site) };
  return author;
}

/**
 * Retourne une copie normalisée du bloc.
 * @param {Record<string, any>} node
 * @param {PageContext} ctx
 * @param {SiteIdentity} site
 */
export function normalizeNode(node, ctx, site) {
  const types = typesOf(node);
  const out = { ...node };
  const brandSuffix = new RegExp(`\\s*[·|–-]\\s*(Blog\\s+)?${site.name}\\b.*$`, 'i');
  const orgRef = { '@id': site.organizationId };

  if (types.includes('Service')) {
    // Le nom d'une prestation ne porte pas le suffixe de marque du <title>.
    if (typeof out.name === 'string') out.name = out.name.replace(brandSuffix, '').trim();
    // Idem pour le nom de son offre (reprend le nom de la prestation).
    if (out.offers && !Array.isArray(out.offers) && typeof out.offers.name === 'string') {
      out.offers = { ...out.offers, name: out.offers.name.replace(brandSuffix, '').trim() };
    }
    if (!out.provider || isOrganizationStub(out.provider, site)) out.provider = orgRef;
    // Anciens codes pays ('FR', 'CH'…) → zone réellement desservie.
    if (!out.areaServed || (Array.isArray(out.areaServed) && out.areaServed.every((x) => typeof x === 'string'))) {
      out.areaServed = site.areaServed;
    }
    if (!out.serviceType) out.serviceType = out.name;
    if (!out.url) out.url = ctx.canonicalUrl;
    delete out.priceRange; // propriété de LocalBusiness, invalide sur Service
  }

  if (types.some((t) => ARTICLE_TYPES.has(t))) {
    if (!out.headline && typeof out.name === 'string') out.headline = out.name;
    if (typeof out.headline === 'string') out.headline = out.headline.replace(brandSuffix, '').trim();
    out.author = normalizeAuthor(out.author, site);
    // Un seul nœud Organization complet par page : l'éditeur le référence par @id.
    out.publisher = orgRef;
    if (!out.mainEntityOfPage) out.mainEntityOfPage = { '@type': 'WebPage', '@id': ctx.canonicalUrl };
    // /og/default.png n'existe pas (404 vérifié en production) : une image d'article morte
    // invalide le résultat enrichi. On retombe sur l'image Open Graph de la page.
    const images = [].concat(out.image || []).filter((u) => typeof u === 'string' && !DEAD_IMAGE.test(u));
    if (images.length > 0) out.image = images;
    else if (ctx.ogImage) out.image = [ctx.ogImage];
    else delete out.image;
    if (!out.inLanguage) out.inLanguage = ctx.lang === 'en' ? 'en-US' : 'fr-FR';
    // dateModified : la plus récente entre la donnée de la page et la date réelle du contenu.
    const day = (v) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : undefined);
    if (types.includes('NewsArticle') && hasTime(out.datePublished)) {
      // Actualité : les dates portent l'heure et le fuseau, on ne les tronque pas au jour.
      // dateModified = le plus récent des deux instants (jamais antérieur à la publication).
      const t = (v) => (hasTime(v) ? new Date(v).getTime() : NaN);
      if (!hasTime(out.dateModified) || t(out.dateModified) < t(out.datePublished)) out.dateModified = out.datePublished;
    } else {
      const best = [day(out.dateModified), day(ctx.lastmod), day(out.datePublished)].filter(Boolean).sort().pop();
      if (best) out.dateModified = best;
      if (!out.datePublished && best) out.datePublished = best;
    }
  }

  if (types.includes('Course') || types.includes('WebApplication') || types.includes('SoftwareApplication')) {
    if (!out.provider || isOrganizationStub(out.provider, site)) out.provider = orgRef;
    if (!out.url) out.url = ctx.canonicalUrl;
  }

  if (types.includes('Person')) {
    if (isOrganizationStub(out.worksFor, site)) out.worksFor = orgRef;
    // Le fondateur est une seule entité sur tout le site : même @id partout.
    if (out.name === site.founderName) {
      out['@id'] = site.founderId;
      if (!out.url) out.url = site.founderUrl;
    }
  }

  if (types.includes('ProfilePage') && out.mainEntity && typeof out.mainEntity === 'object') {
    // La Person est émise en bloc autonome : on la référence au lieu de la dupliquer.
    const id = out.mainEntity['@id'] || (out.mainEntity.name === site.founderName ? site.founderId : null);
    if (id) out.mainEntity = { '@id': id };
  }

  return out;
}

/**
 * Répare un BreadcrumbList : CHAQUE niveau doit porter une URL, dernier niveau compris.
 * Un niveau intermédiaire sans URL reçoit celle de la page parente si elle existe
 * (`resolveUrl`), sinon il est retiré. Le dernier niveau reçoit l'URL canonique de la page
 * (`currentUrl`) s'il n'en a pas. Retourne null si le fil d'Ariane n'a plus au moins 2 niveaux.
 * @param {Record<string, any>} block
 * @param {(name: string, index: number) => string | null} resolveUrl
 * @param {string} [currentUrl] URL canonique de la page courante
 */
export function repairBreadcrumb(block, resolveUrl, currentUrl) {
  const items = [].concat(block.itemListElement || []);
  const kept = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (!it || !it.name) return;
    if (it.item) {
      kept.push({ ...it });
      return;
    }
    const url = last ? currentUrl : resolveUrl(it.name, i);
    if (url) kept.push({ ...it, item: url });
    else if (last) kept.push({ ...it }); // sans URL connue : laissé tel quel, le gate le signale
  });
  if (kept.length < 2) return null;
  return { ...block, itemListElement: kept.map((it, i) => ({ ...it, position: i + 1 })) };
}
