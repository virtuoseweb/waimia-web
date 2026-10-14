#!/usr/bin/env node
/**
 * check-jsonld.mjs · Gate CI : validité des données structurées (JSON-LD) du build.
 *
 * Sur chaque page publique indexable de dist/client :
 *   1. syntaxe       : chaque <script type="application/ld+json"> est du JSON valide ;
 *   2. vocabulaire   : @context schema.org, @type connu, aucune valeur vide/null ;
 *   3. requis        : propriétés requises par type (schema.org + exigences Google) ;
 *   4. références    : tout { "@id": … } pointe une entité émise sur la page ;
 *   5. unicité       : une seule Organization, WebSite, BreadcrumbList, FAQPage par page ;
 *   6. couverture    : chaque type de page porte les blocs attendus (Service sur une
 *                      page service, Article + auteur Person sur un article, fil d'Ariane
 *                      partout sauf l'accueil…) ;
 *   7. honnêteté     : FAQPage seulement si la FAQ est visible dans la page ; un prix dans
 *                      une offre seulement s'il est affiché ; expertises d'une fiche auteur
 *                      seulement si elles sont affichées ;
 *   8. fil d'Ariane  : CHAQUE ListItem porte position, name et item (URL absolue du site),
 *                      dernier niveau compris, et le dernier pointe la page elle-même ;
 *   9. identité      : un seul nœud Organization complet par page, référencé par @id
 *                      (provider, publisher, worksFor…) : aucune copie imbriquée ;
 *  10. offres        : toute offre chiffrée porte priceCurrency ; une offre sans prix n'est
 *                      admise que dans un catalogue (itemOffered) ;
 *  11. articles      : auteur Person relié (url + profil), dates, image, éditeur par @id ;
 *  12. interdits     : aucun Review, AggregateRating, Product, NewsArticle ni VideoObject
 *                      (pas d'avis vérifiable, pas de produit, pas d'actualité, pas de vidéo),
 *                      aucun SearchAction (pas de recherche interne).
 *
 * Usage : node scripts/check-jsonld.mjs [--report] [--json]
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { scanDist, isIndexable, textOf, normalizePath, SITE_ORIGIN, DIST } from './lib/dist-scan.mjs';

const SITE_NAME = 'Waimia';
const FOUNDER_NAME = 'Simon Beros';
/** Pages hub de services (miroir de src/lib/seo/service-catalog.ts → SERVICE_HUB_PATHS). */
const HUB_PATHS = new Set([
  '/services/systemes-operationnels-ia',
  '/services/systeme-commercial',
  '/services/systeme-acquisition',
]);

const VERBOSE = process.argv.includes('--report');
const AS_JSON = process.argv.includes('--json');

// Types acceptés (ceux que le site émet). Un type absent de cette liste est une faute de
// frappe ou un nouveau type à déclarer ici avec ses propriétés requises.
const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  // `address` : exigée seulement sur l'entité du siège (cf plus bas) ; une ville desservie
  // sans bureau n'a pas d'adresse postale.
  ProfessionalService: ['name', 'url', 'areaServed'],
  LocalBusiness: ['name', 'address'],
  Service: ['name', 'description', 'provider', 'areaServed', 'serviceType'],
  OfferCatalog: ['name', 'itemListElement'],
  Offer: [],
  Article: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  BlogPosting: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  TechArticle: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  ScholarlyArticle: ['name'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
  Person: ['name'],
  ProfilePage: ['mainEntity'],
  Course: ['name', 'description', 'provider'],
  HowTo: ['name', 'step'],
  ItemList: ['itemListElement'],
  WebApplication: ['name', 'applicationCategory', 'operatingSystem', 'offers'],
  SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem', 'offers'],
  CollectionPage: ['name'],
  WebPage: ['name'],
  ContactPage: ['name'],
  AboutPage: ['name'],
  Book: ['name'],
  Event: ['name', 'startDate', 'location'],
};
const ARTICLE_TYPES = ['Article', 'BlogPosting', 'TechArticle'];
// Types et propriétés interdits : le site n'a ni avis vérifiable, ni produit, ni actualité à
// chaud, ni vidéo, ni recherche interne. Les baliser serait une donnée structurée trompeuse.
const FORBIDDEN_TYPES = new Set(['Review', 'AggregateRating', 'Rating', 'Product', 'NewsArticle', 'VideoObject', 'SearchAction']);
const FORBIDDEN_PROPS = new Set(['review', 'aggregateRating', 'reviewRating', 'video', 'potentialAction']);
const ORG_ID = `${SITE_ORIGIN}/#organization`;
const HQ_ID = `${SITE_ORIGIN}/#localbusiness`;
/** Propriétés qui doivent RÉFÉRENCER l'Organization du site (jamais en recopier une). */
const ORG_REF_PROPS = ['provider', 'publisher', 'worksFor', 'parentOrganization', 'seller'];
const SINGLETONS = ['Organization', 'WebSite', 'BreadcrumbList', 'FAQPage', 'ProfessionalService', 'OfferCatalog'];

/** Slugs des ressources verrouillées : un fichier `src/data/lead-magnets/<slug>.ts` par ressource (hors types.ts). */
const GATED_RESOURCES = new Set(
  readdirSync(new URL('../src/data/lead-magnets/', import.meta.url))
    .filter((f) => f.endsWith('.ts') && f !== 'types.ts')
    .map((f) => f.replace(/\.ts$/, '')),
);

/** Blocs attendus par type de page : [test(pathname), [types dont au moins un par groupe], libellé]. */
const COVERAGE = [
  [(p) => true, [['Organization'], ['WebSite']], 'toute page'],
  [(p) => p !== '/', [['BreadcrumbList']], 'toute page sauf accueil'],
  [(p) => p === '/', [['ProfessionalService']], 'accueil'],
  [(p) => /^\/services\/.+/.test(p), [['Service']], 'page service'],
  [(p) => /^\/formations\/.+/.test(p), [['Course']], 'page formation'],
  [(p) => /^\/blog\/.+/.test(p), [ARTICLE_TYPES], 'article de blog'],
  [(p) => /^\/ressources\/(guides|comparatifs|diagnostics)\/.+/.test(p), [ARTICLE_TYPES], 'ressource éditoriale'],
  // Ressources verrouillées (fichier livré par e-mail, aucune application en ligne) : Article, pas WebApplication.
  [(p) => /^\/ressources\/outils\/.+/.test(p) && GATED_RESOURCES.has(p.split('/').pop()), [ARTICLE_TYPES], 'ressource à télécharger'],
  [(p) => /^\/ressources\/outils\/.+/.test(p) && !GATED_RESOURCES.has(p.split('/').pop()), [['WebApplication', 'SoftwareApplication']], 'outil interactif'],
  [(p) => /^\/cas-clients\/.+/.test(p), [ARTICLE_TYPES], 'cas client'],
  [(p) => /^\/equipe\/.+/.test(p), [['Person'], ['ProfilePage']], 'page auteur'],
  // Siège (Bordeaux) : ProfessionalService avec adresse. Autres villes, sans bureau : Service (areaServed).
  // Couplage : « bordeaux » doit rester le slug de SITE.city (src/site.config.ts, HQ_CITY_SLUG dans
  // src/lib/seo/page-schema.ts) ; ce script .mjs ne peut pas importer ces modules TypeScript.
  [(p) => /^\/implantations\/bordeaux\/?$/.test(p), [['ProfessionalService']], 'page implantation du siège'],
  [(p) => /^\/implantations\/.+/.test(p) && !/^\/implantations\/bordeaux\/?$/.test(p), [['Service']], 'page implantation (ville desservie)'],
  [(p) => /^\/audit-/.test(p), [['Service']], "page d'audit"],
  [(p) => p === '/tarifs', [['OfferCatalog']], 'tarifs'],
  [(p) => p === '/services', [['OfferCatalog']], 'catalogue des services'],
  [(p) => p === '/contact', [['ContactPage']], 'contact'],
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/;
const URL_PROPS = new Set(['url', 'item', 'sameAs', 'logo', 'image', '@id', 'mainEntityOfPage']);

const typesOf = (n) => (Array.isArray(n['@type']) ? n['@type'] : n['@type'] ? [n['@type']] : []);

/** Aplatis les blocs de premier niveau (objet, tableau, @graph). */
function topLevel(data) {
  if (Array.isArray(data)) return data.flatMap(topLevel);
  if (data && typeof data === 'object' && Array.isArray(data['@graph'])) return data['@graph'];
  return data && typeof data === 'object' ? [data] : [];
}

/** Parcourt tous les nœuds typés (imbriqués compris). */
function* walkNodes(node, path = '') {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walkNodes(node[i], `${path}[${i}]`);
    return;
  }
  if (!node || typeof node !== 'object') return;
  yield { node, path };
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') yield* walkNodes(v, path ? `${path}.${k}` : k);
  }
}

function visibleText(html) {
  const main = /<main\b[\s\S]*<\/main>/i.exec(html);
  const src = (main ? main[0] : html).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  return textOf(src);
}

const squash = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '');

function checkPage(page) {
  const errors = [];
  const err = (rule, msg) => errors.push({ rule, msg });

  const blocks = [];
  for (const b of page.jsonLd) {
    if (!b.ok) {
      err('syntaxe', `JSON invalide (${b.error}) : ${b.raw}`);
      continue;
    }
    blocks.push(...topLevel(b.data));
  }

  const ids = new Set();
  for (const b of blocks) for (const { node } of walkNodes(b)) if (node['@id'] && Object.keys(node).length > 1) ids.add(node['@id']);

  const text = visibleText(page.html);
  const textSquashed = squash(text);
  const topTypes = [];

  for (const block of blocks) {
    const bt = typesOf(block);
    topTypes.push(...bt);
    if (block['@context'] !== 'https://schema.org') err('vocabulaire', `${bt.join('+') || '?'} : @context absent ou différent de https://schema.org`);
    if (bt.length === 0) err('vocabulaire', 'bloc de premier niveau sans @type');

    for (const { node, path } of walkNodes(block)) {
      const where = `${bt.join('+')}${path ? '.' + path : ''}`;
      const nt = typesOf(node);

      // Référence pure { "@id": … } : doit pointer une entité de la page.
      const keys = Object.keys(node);
      if (keys.length === 1 && keys[0] === '@id') {
        if (!ids.has(node['@id'])) err('références', `${where} référence ${node['@id']}, entité absente de la page`);
        continue;
      }

      for (const [k, v] of Object.entries(node)) {
        if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
          err('vocabulaire', `${where}.${k} est vide`);
        }
        if (typeof v === 'string' && /undefined|\[object Object\]|NaN/.test(v)) err('vocabulaire', `${where}.${k} contient « ${v.slice(0, 40)} »`);
        if (URL_PROPS.has(k)) {
          for (const u of [].concat(v)) {
            if (typeof u === 'string' && !/^https?:\/\//.test(u)) err('vocabulaire', `${where}.${k} n'est pas une URL absolue : ${u}`);
          }
        }
        if (k === 'image' || k === 'logo') {
          for (const u of [].concat(v)) {
            const url = typeof u === 'string' ? u : u && typeof u === 'object' ? u.url : null;
            if (typeof url !== 'string' || !url.startsWith(SITE_ORIGIN + '/') || url.startsWith(SITE_ORIGIN + '/api/')) continue;
            const file = join(DIST, url.slice(SITE_ORIGIN.length + 1).split('?')[0]);
            if (!existsSync(file)) err('requis', `${where}.${k} pointe un fichier absent du build : ${url}`);
          }
        }
        if (/^date|Date$/.test(k) && typeof v === 'string' && !ISO_DATE.test(v)) err('vocabulaire', `${where}.${k} n'est pas une date ISO : ${v}`);
      }

      for (const t of nt) {
        if (FORBIDDEN_TYPES.has(t)) {
          err('interdits', `${where} : type « ${t} » interdit sur ce site`);
          continue;
        }
        if (!(t in REQUIRED) && !KNOWN_NESTED.has(t)) err('vocabulaire', `${where} : type inconnu « ${t} » (à déclarer dans check-jsonld.mjs)`);
        for (const prop of REQUIRED[t] || []) {
          // Les entités imbriquées légères (publisher, worksFor…) ne sont pas tenues au complet.
          if (path) continue;
          if (node[prop] === undefined) err('requis', `${where} (${t}) : propriété « ${prop} » manquante`);
        }
      }

      for (const k of keys) if (FORBIDDEN_PROPS.has(k)) err('interdits', `${where}.${k} : propriété interdite sur ce site`);

      // Identité : l'Organization du site n'existe qu'en UN nœud complet ; partout ailleurs
      // elle est référencée par @id (jamais recopiée avec un nom, une URL, un logo).
      for (const prop of ORG_REF_PROPS) {
        for (const v of [].concat(node[prop] ?? [])) {
          if (!v || typeof v !== 'object') continue;
          const isSite = v['@id'] === ORG_ID || v.name === SITE_NAME || v.url === SITE_ORIGIN;
          if (isSite && !(Object.keys(v).length === 1 && v['@id'] === ORG_ID)) {
            err('identité', `${where}.${prop} recopie l'Organization du site au lieu de la référencer par @id`);
          }
        }
      }
      if (nt.includes('Organization') && path && (node.name === SITE_NAME || node['@id'] === ORG_ID)) {
        err('identité', `${where} : deuxième nœud Organization « ${SITE_NAME} » sur la page`);
      }
      if (nt.includes('Service') && !path && node.provider?.['@id'] !== ORG_ID) {
        err('identité', `${where} (Service) : provider doit référencer ${ORG_ID}`);
      }
      if (nt.includes('ProfessionalService')) {
        if (node['@id'] === HQ_ID && !node.address) err('requis', `${where} : entité du siège sans adresse`);
        if (node['@id'] !== HQ_ID && node.address) err('honnêteté', `${where} : adresse postale sur une ville sans bureau`);
      }
      if (nt.includes('WebSite') && !path && (!node.publisher || !node.inLanguage)) err('requis', `${where} (WebSite) : publisher ou inLanguage manquant`);

      if (nt.includes('Offer') || nt.includes('AggregateOffer')) {
        const hasPrice = node.price !== undefined || node.priceSpecification !== undefined || node.lowPrice !== undefined;
        // Une offre sans prix n'est admise que comme entrée de catalogue (elle désigne un service).
        if (!hasPrice && !node.itemOffered) err('offres', `${where} (Offer) : ni prix ni itemOffered`);
        if (hasPrice && !node.priceCurrency) err('offres', `${where} (Offer) : prix sans priceCurrency`);
        for (const spec of [].concat(node.priceSpecification ?? [])) {
          if (spec && typeof spec === 'object' && !spec.priceCurrency) err('offres', `${where}.priceSpecification : priceCurrency manquant`);
        }
        if (node.highPrice !== undefined || node.priceSpecification?.maxPrice !== undefined) {
          // Un plafond n'est balisé que s'il est affiché (contrôle « prix affiché » ci-dessous).
        }
        // Un prix balisé doit être AFFICHÉ sur la page (0 = gratuit, toléré si « gratuit » est écrit).
        const amounts = [node.price, node.lowPrice, node.highPrice, node.priceSpecification?.price, node.priceSpecification?.minPrice, node.priceSpecification?.maxPrice]
          .filter((x) => x !== undefined && x !== null)
          .map((x) => Number(x));
        for (const amount of amounts) {
          if (Number.isNaN(amount)) continue;
          const shown = amount === 0 ? /gratuit|offert|0\s?€/i.test(text) : textSquashed.includes(String(amount));
          if (!shown) err('honnêteté', `${where} : prix ${amount} balisé mais non affiché dans la page`);
        }
      }
    }

    if (bt.includes('BreadcrumbList')) {
      const items = [].concat(block.itemListElement || []);
      if (items.length < 2) err('requis', 'BreadcrumbList : moins de 2 éléments');
      items.forEach((it, i) => {
        if (it.position !== i + 1) err('requis', `BreadcrumbList : position ${it.position} à l'index ${i}`);
        if (!it.name) err('requis', `BreadcrumbList : élément ${i + 1} sans name`);
        // Chaque niveau porte `item`, dernier compris (Search Console : « Champ "item" manquant »).
        if (typeof it.item !== 'string' || !it.item) err("fil d'Ariane", `ListItem ${i + 1} (« ${it.name} ») sans item (URL)`);
      });
      const last = items[items.length - 1];
      if (last && typeof last.item === 'string' && normalizePath(last.item.slice(SITE_ORIGIN.length)) !== page.pathname) {
        err("fil d'Ariane", `dernier ListItem pointe ${last.item}, pas la page ${page.pathname}`);
      }
    }

    if (bt.includes('FAQPage')) {
      const qs = [].concat(block.mainEntity || []);
      if (qs.length === 0) err('requis', 'FAQPage : aucune question');
      for (const q of qs) {
        if (!q.name || !q.acceptedAnswer?.text) err('requis', `FAQPage : question incomplète « ${String(q.name).slice(0, 50)} »`);
        else if (!textSquashed.includes(squash(q.name))) err('honnêteté', `FAQPage : question non visible dans la page « ${q.name.slice(0, 60)} »`);
      }
    }

    if (bt.some((t) => ARTICLE_TYPES.includes(t))) {
      const a = block.author;
      const authors = [].concat(a || []);
      if (!authors.some((x) => typesOf(x).includes('Person') && x.name && x.url && x['@id'])) {
        err('articles', `${bt.join('+')} : auteur Person relié (name + url + @id) manquant`);
      }
      for (const x of authors) {
        if (x?.name === FOUNDER_NAME && !(Array.isArray(x.sameAs) && x.sameAs.some((u) => /linkedin\.com\/in\//.test(u)))) {
          err('articles', `${bt.join('+')} : auteur ${FOUNDER_NAME} sans sameAs vers son profil LinkedIn`);
        }
      }
      if (!block.mainEntityOfPage) err('articles', `${bt.join('+')} : mainEntityOfPage manquant`);
      if (!block.description) err('articles', `${bt.join('+')} : description manquante`);
      if ([].concat(block.image || []).length === 0) err('articles', `${bt.join('+')} : image manquante`);
      if (typeof block.headline === 'string' && block.headline.length > 110) err('requis', `${bt.join('+')} : headline > 110 caractères`);
      if (block.dateModified && block.datePublished && String(block.dateModified) < String(block.datePublished).slice(0, 10)) {
        err('requis', `${bt.join('+')} : dateModified antérieure à datePublished`);
      }
    }

    // Fiche auteur : seules les expertises affichées sur la page sont balisées.
    if (bt.includes('Person') && /^\/equipe\//.test(page.pathname)) {
      for (const k of [].concat(block.knowsAbout || [])) {
        if (!textSquashed.includes(squash(k))) err('honnêteté', `Person.knowsAbout « ${k} » non affiché sur la fiche`);
      }
      if (!block.jobTitle || !block.worksFor) err('requis', 'Person (fiche auteur) : jobTitle ou worksFor manquant');
    }

    // Page hub de services : catalogue de ses services enfants.
    if (bt.includes('Service') && HUB_PATHS.has(page.pathname) && !block.hasOfferCatalog?.itemListElement?.length) {
      err('couverture', 'page hub : Service sans hasOfferCatalog');
    }

    if (bt.includes('HowTo') && [].concat(block.step || []).some((s) => !s.text && !s.name)) err('requis', 'HowTo : étape sans texte');
  }

  // Identité : exactement un nœud Organization complet, avec son @id.
  const orgNodes = blocks.filter((b) => typesOf(b).includes('Organization'));
  if (orgNodes.length === 1 && orgNodes[0]['@id'] !== ORG_ID) err('identité', `Organization sans @id ${ORG_ID}`);

  for (const t of SINGLETONS) {
    const n = topTypes.filter((x) => x === t).length;
    if (n > 1) err('unicité', `${n} blocs ${t} sur la page (1 attendu)`);
  }

  for (const [test, groups, label] of COVERAGE) {
    if (!test(page.pathname)) continue;
    for (const group of groups) {
      if (!group.some((t) => topTypes.includes(t))) err('couverture', `${label} : bloc ${group.join(' / ')} manquant`);
    }
  }

  // Le fil d'Ariane structuré ne doit lister que des URL du site.
  for (const b of blocks.filter((x) => typesOf(x).includes('BreadcrumbList'))) {
    for (const it of [].concat(b.itemListElement || [])) {
      if (typeof it.item === 'string' && !it.item.startsWith(SITE_ORIGIN)) err('requis', `BreadcrumbList : URL hors site ${it.item}`);
    }
  }

  return { errors, types: topTypes };
}

// Types légitimes uniquement en position imbriquée (pas de propriétés requises ici).
const KNOWN_NESTED = new Set([
  'PostalAddress', 'ImageObject', 'ListItem', 'Question', 'Answer', 'City', 'Country', 'AdministrativeArea', 'Place',
  'HowToStep', 'HowToSupply', 'PriceSpecification', 'UnitPriceSpecification', 'MonetaryAmount', 'CourseInstance',
  'Audience', 'ContactPoint', 'VirtualLocation', 'GeoCoordinates', 'OpeningHoursSpecification', 'EntryPoint',
  'SearchAction', 'Thing', 'DefinedTerm', 'OfferCatalog', 'AggregateOffer', 'Brand', 'Language',
]);

const { pages } = scanDist();
const indexable = pages.filter(isIndexable);
const results = indexable.map((p) => ({ pathname: p.pathname, ...checkPage(p) }));
const failing = results.filter((r) => r.errors.length > 0);
const total = failing.reduce((n, r) => n + r.errors.length, 0);

if (AS_JSON) {
  console.log(JSON.stringify({ pages: indexable.length, errors: total, failing }, null, 2));
  process.exit(total > 0 ? 1 : 0);
}

const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log('  check:jsonld : données structurées sur dist/client');
console.log(`  Pages indexables : ${indexable.length} · blocs JSON-LD : ${results.reduce((n, r) => n + r.types.length, 0)}`);
console.log(LINE);

const byRule = {};
for (const r of failing) for (const e of r.errors) (byRule[e.rule] ||= []).push({ pathname: r.pathname, msg: e.msg });
for (const [rule, list] of Object.entries(byRule)) {
  console.log(`\n[${list.length}] ${rule}`);
  for (const v of VERBOSE ? list : list.slice(0, 6)) console.log(`  ✗ ${v.pathname} : ${v.msg}`);
  if (!VERBOSE && list.length > 6) console.log(`  … et ${list.length - 6} autre(s). Ajoute --report pour tout voir.`);
}

console.log(`\n${LINE}`);
if (total > 0) {
  console.log(`✗  ${total} erreur(s) JSON-LD sur ${failing.length} page(s) : exit 1`);
  console.log(LINE);
  process.exit(1);
}
console.log(`✓  JSON-LD valide sur ${indexable.length} pages : exit 0`);
console.log(LINE);
