// Waimia · schema-normalize.mjs · mise en cohérence d'UN bloc JSON-LD.
//
// Même logique appliquée à deux endroits :
//   · Base.astro (via page-schema.ts) sur les blocs passés en props par les pages ;
//   · la passe post-build (integrations/seo-postbuild.mjs) sur les blocs émis dans le corps
//     par les composants (<Breadcrumb>, sections FAQ, templates), que Base ne voit pas.
// JS pur, sans import : l'appelant fournit l'identité du site dans `site`.

const ARTICLE_TYPES = new Set(['Article', 'BlogPosting', 'NewsArticle', 'TechArticle']);
const DEAD_IMAGE = /\/og\/default\.png$/;

export function typesOf(node) {
  const t = node && node['@type'];
  return Array.isArray(t) ? t : t ? [t] : [];
}

/**
 * @typedef {{ url: string, name: string, organizationId: string, founderId: string,
 *             founderName: string, founderUrl: string, logoUrl: string, areaServed: object[] }} SiteIdentity
 * @typedef {{ canonicalUrl: string, ogImage?: string, lastmod?: string | null, lang?: string }} PageContext
 */

function isOrganizationStub(value, site) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return typesOf(value).includes('Organization') && (value.name === site.name || value['@id'] === site.organizationId);
}

function founderAuthor(site) {
  return { '@type': 'Person', '@id': site.founderId, name: site.founderName, url: site.founderUrl };
}

function normalizeAuthor(author, site) {
  if (!author || typeof author !== 'object' || Array.isArray(author)) return founderAuthor(site);
  // Un article signé par l'organisation n'a pas d'auteur identifiable : on relie le fondateur.
  // (y compris quand la marque a été saisie comme nom de personne).
  if (!typesOf(author).includes('Person') || !author.name || author.name === site.name) return founderAuthor(site);
  if (author.name === site.founderName) return { ...author, '@id': site.founderId, url: author.url ?? site.founderUrl };
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
    out.publisher = {
      '@type': 'Organization',
      '@id': site.organizationId,
      name: site.name,
      logo: { '@type': 'ImageObject', url: site.logoUrl },
    };
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
    const best = [day(out.dateModified), day(ctx.lastmod), day(out.datePublished)].filter(Boolean).sort().pop();
    if (best) out.dateModified = best;
    if (!out.datePublished && best) out.datePublished = best;
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
 * Répare un BreadcrumbList : chaque niveau intermédiaire doit porter une URL.
 * Un niveau sans URL reçoit celle de la page parente si elle existe (`resolveUrl`), sinon
 * il est retiré. Retourne null si le fil d'Ariane n'a plus au moins 2 niveaux.
 * @param {Record<string, any>} block
 * @param {(name: string, index: number) => string | null} resolveUrl
 */
export function repairBreadcrumb(block, resolveUrl) {
  const items = [].concat(block.itemListElement || []);
  const kept = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (!it || !it.name) return;
    if (last || it.item) {
      kept.push({ ...it });
      return;
    }
    const url = resolveUrl(it.name, i);
    if (url) kept.push({ ...it, item: url });
  });
  if (kept.length < 2) return null;
  return { ...block, itemListElement: kept.map((it, i) => ({ ...it, position: i + 1 })) };
}
