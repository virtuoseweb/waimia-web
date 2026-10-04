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
 *                      une offre seulement s'il est affiché.
 *
 * Usage : node scripts/check-jsonld.mjs [--report] [--json]
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { scanDist, isIndexable, textOf, SITE_ORIGIN, DIST } from './lib/dist-scan.mjs';

const VERBOSE = process.argv.includes('--report');
const AS_JSON = process.argv.includes('--json');

// Types acceptés (ceux que le site émet). Un type absent de cette liste est une faute de
// frappe ou un nouveau type à déclarer ici avec ses propriétés requises.
const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  ProfessionalService: ['name', 'address', 'url', 'areaServed'],
  LocalBusiness: ['name', 'address'],
  Service: ['name', 'description', 'provider', 'areaServed', 'serviceType'],
  Offer: ['priceCurrency'],
  Article: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  BlogPosting: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  NewsArticle: ['headline', 'author', 'datePublished', 'dateModified', 'publisher', 'image'],
  TechArticle: ['headline', 'author', 'datePublished', 'publisher'],
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
  Product: ['name', 'offers'],
};
const ARTICLE_TYPES = ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'];
const SINGLETONS = ['Organization', 'WebSite', 'BreadcrumbList', 'FAQPage', 'ProfessionalService'];

/** Blocs attendus par type de page : [test(pathname), [types dont au moins un par groupe], libellé]. */
const COVERAGE = [
  [(p) => true, [['Organization'], ['WebSite']], 'toute page'],
  [(p) => p !== '/', [['BreadcrumbList']], 'toute page sauf accueil'],
  [(p) => p === '/', [['ProfessionalService']], 'accueil'],
  [(p) => /^\/services\/.+/.test(p), [['Service']], 'page service'],
  [(p) => /^\/formations\/.+/.test(p), [['Course']], 'page formation'],
  [(p) => /^\/blog\/.+/.test(p), [ARTICLE_TYPES], 'article de blog'],
  [(p) => /^\/ressources\/(guides|comparatifs|diagnostics)\/.+/.test(p), [ARTICLE_TYPES], 'ressource éditoriale'],
  [(p) => /^\/ressources\/outils\/.+/.test(p), [['WebApplication', 'SoftwareApplication']], 'outil interactif'],
  [(p) => /^\/cas-clients\/.+/.test(p), [ARTICLE_TYPES], 'cas client'],
  [(p) => /^\/equipe\/.+/.test(p), [['Person'], ['ProfilePage']], 'page auteur'],
  [(p) => /^\/implantations\/.+/.test(p), [['ProfessionalService']], 'page implantation'],
  [(p) => /^\/audit-/.test(p), [['Service']], "page d'audit"],
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
        if (!(t in REQUIRED) && !KNOWN_NESTED.has(t)) err('vocabulaire', `${where} : type inconnu « ${t} » (à déclarer dans check-jsonld.mjs)`);
        for (const prop of REQUIRED[t] || []) {
          // Les entités imbriquées légères (publisher, worksFor…) ne sont pas tenues au complet.
          if (path && !['Offer'].includes(t)) continue;
          if (node[prop] === undefined) err('requis', `${where} (${t}) : propriété « ${prop} » manquante`);
        }
      }

      if (nt.includes('Offer')) {
        const hasPrice = node.price !== undefined || node.priceSpecification !== undefined;
        if (!hasPrice) err('requis', `${where} (Offer) : ni price ni priceSpecification`);
        // Un prix balisé doit être AFFICHÉ sur la page (0 = gratuit, toléré si « gratuit » est écrit).
        const amounts = [node.price, node.priceSpecification?.price, node.priceSpecification?.minPrice, node.priceSpecification?.maxPrice]
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
        if (i < items.length - 1 && !it.item) err('requis', `BreadcrumbList : élément ${i + 1} sans item (URL)`);
      });
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
      if (!authors.some((x) => typesOf(x).includes('Person') && x.name && (x.url || x['@id']))) {
        err('requis', `${bt.join('+')} : auteur Person relié (name + url ou @id) manquant`);
      }
      if (typeof block.headline === 'string' && block.headline.length > 110) err('requis', `${bt.join('+')} : headline > 110 caractères`);
      if (block.dateModified && block.datePublished && String(block.dateModified) < String(block.datePublished).slice(0, 10)) {
        err('requis', `${bt.join('+')} : dateModified antérieure à datePublished`);
      }
    }

    if (bt.includes('HowTo') && [].concat(block.step || []).some((s) => !s.text && !s.name)) err('requis', 'HowTo : étape sans texte');
  }

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
