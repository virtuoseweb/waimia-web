// Waimia · seo.ts · builders JSON-LD pour GEO/AIO
// Cf docs/02-geo-aio-strategy.md

import type { Lang } from './i18n';

const SITE_URL = 'https://waimia.com';
const ORG_NAME = 'Waimia';

/** JSON-LD `Organization` réutilisable sur toutes les pages */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    legalName: 'VirtuoseWeb',
    email: 'bonjour@waimia.com',
    telephone: '+33 6 20 61 56 93',
    foundingDate: '2020-10-15',
    vatID: 'FR07890426307',
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-256.png`,
    description: "Studio IA expert de l'écosystème Claude. Architecte de systèmes agentiques pour PME.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montpellier',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.linkedin.com/company/waimia',
      'https://share.google/nmlHLC5wQak9TWRPl',
    ],
    knowsAbout: [
      'Claude AI', 'Anthropic', 'agentic systems', 'MCP connectors',
      'Claude Skills', 'AI Act compliance', 'multi-agent orchestration',
      'self-hosted LLM', 'Process Intelligence',
    ],
  };
}

/** JSON-LD `WebSite` (utile pour search box future) */
export function website(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: ORG_NAME,
    inLanguage: lang === 'en' ? 'en-US' : 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** JSON-LD `Service` pour les pages Offres / Solutions */
export function service(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  lang: Lang;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    inLanguage: opts.lang === 'en' ? 'en-US' : 'fr-FR',
    provider: { '@type': 'Organization', name: ORG_NAME, url: SITE_URL },
    areaServed: ['FR', 'CH', 'BE', 'LU', 'EU'],
  };
}

/** JSON-LD `Article` pour blog / cas */
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: opts.lang === 'en' ? 'en-US' : 'fr-FR',
    image: opts.image,
    author: opts.authorName
      ? { '@type': 'Person', name: opts.authorName }
      : { '@type': 'Organization', name: ORG_NAME },
    publisher: { '@type': 'Organization', name: ORG_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon-256.png` } },
  };
}

/** JSON-LD `FAQPage` — bloc à dupliquer sur les pages-hub */
export function faqPage(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** JSON-LD `BreadcrumbList` */
export function breadcrumbs(items: Array<{ label: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: it.url,
    })),
  };
}
