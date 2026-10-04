// Waimia · seo.ts · façade historique des builders JSON-LD.
//
// Refonte C 2026-10 · il existait DEUX constructeurs d'Organization/WebSite/Service/Article
// (ici et dans `seo/schema-builder.ts`), avec deux descriptions différentes de l'entreprise.
// La source unique est désormais `src/lib/seo/schema-builder.ts`. Ce fichier ne contient
// plus aucune donnée : il conserve les noms d'export historiques (`organization`,
// `website`, `service`, `article`, `faqPage`, `breadcrumbs`) pour ne casser aucun import.

import type { Lang } from './i18n';
import {
  buildArticle,
  buildBreadcrumbList,
  buildFAQPage,
  buildOrganization,
  buildService,
  buildWebSite,
  SCHEMA_IDS,
} from './seo/schema-builder';

/** JSON-LD `Organization` (identité unique du site). */
export function organization() {
  return buildOrganization();
}

/** JSON-LD `WebSite`. */
export function website(lang: Lang) {
  return buildWebSite(lang);
}

/** JSON-LD `Service` pour une page de prestation. */
export function service(opts: { name: string; description: string; url: string; serviceType: string; lang: Lang }) {
  return buildService({
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
  });
}

/** JSON-LD `Article` pour blog / cas. */
export function article(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  lang: Lang;
}) {
  return buildArticle({
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      '@type': 'Person',
      '@id': SCHEMA_IDS.founder,
      name: opts.authorName ?? 'Simon Beros',
    },
    mainEntityOfPage: opts.url,
  });
}

/**
 * JSON-LD `FAQPage`. À n'émettre que depuis le composant qui AFFICHE la FAQ (les sections
 * `faq-*` du catalogue) : une FAQ balisée mais invisible est une donnée structurée
 * trompeuse (gate : scripts/check-jsonld.mjs, règle faq-visible).
 */
export function faqPage(items: Array<{ q: string; a: string }>) {
  return buildFAQPage(items) ?? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] };
}

/** JSON-LD `BreadcrumbList`. */
export function breadcrumbs(items: Array<{ label: string; url: string }>) {
  return buildBreadcrumbList(items.map((it) => ({ name: it.label, url: it.url })));
}
