// Ressource verrouillée : Grille d'audit de site internet (corriger ou refaire).
// Livrée uniquement par e-mail : private/telechargements/grille-audit-site-internet.pdf (PDF A4, 10 pages).
// Source : private/lead-magnets-src/grille-audit-site-internet/index.html ; génération :
// node scripts/gen-lead-pdf.mjs grille-audit-site-internet --footer "Grille d'audit de site internet · waimia.com"
// Faits : documentation Google, web.dev, OpenAI, Service-Public et CNIL, lues le 16 octobre 2026 ;
// prix Waimia relevés le 14 octobre 2026 (src/data/pricing.ts), cités dans le PDF uniquement.
import type { LeadMagnetPage } from './types';

export const data: LeadMagnetPage = {
  slug: 'grille-audit-site-internet',
  title_fr: "Grille d'audit de site internet : corriger ou refaire",
  title_en: 'Website audit grid: fix it or rebuild it',
  kicker_fr: 'PDF · Dirigeants et responsables de PME',
  kicker_en: 'PDF · SMB owners and managers',
  promise_fr:
    "Auditez votre site en 45 minutes avec la grille que Waimia passe en rendez-vous. Huit axes à cocher, le geste ou l'outil gratuit pour vérifier chaque point, le signal d'alerte à repérer, puis une décision : corriger le site actuel ou le refaire.",
  promise_en:
    "Audit your site in 45 minutes with the grid Waimia uses in meetings. Eight axes to tick, the gesture or free tool to check each point, the warning sign to look for, then a decision: fix the current site or rebuild it.",
  format_fr: 'PDF A4 · 10 pages',
  format_en: 'A4 PDF · 10 pages',
  forWho_fr: [
    "Le dirigeant de PME dont le site date et qui se demande s'il faut le corriger ou le refaire avant de demander des devis.",
    "Le responsable marketing ou commercial qui veut savoir pourquoi le site produit peu de demandes.",
    "Le référent web qui doit préparer un cahier des charges et justifier une refonte, ou l'écarter.",
  ],
  forWho_en: [
    'The SMB owner whose site is ageing and who wonders whether to fix it or rebuild it before asking for quotes.',
    'The marketing or sales manager who wants to know why the site produces few requests.',
    'The web lead who must prepare a specification and justify a rebuild, or rule it out.',
  ],
  inside_fr: [
    { title: 'Comment utiliser la grille', desc: "Le déroulé en 45 minutes, la règle « corriger d'abord, remesurer ensuite » et ce que la grille ne couvre pas." },
    { title: 'Huit axes à cocher', desc: "Conversion, vitesse et Core Web Vitals, mobile, indexation et Search Console, contenus, citabilité par les IA, technique et sécurité, mesure. Pour chaque point : comment le vérifier, signal d'alerte." },
    { title: 'Ce qui se corrige, ce qui pèse vers la refonte', desc: 'Pour chaque axe, les défauts qui se règlent sans refonte et ceux qui viennent de la plateforme.' },
    { title: 'Une notation simple', desc: 'Une lettre par axe, une règle de décision et les trois critères de refonte, avec les conseils de Google pour une migration.' },
    { title: 'Choisir la solution technique', desc: 'Site statique, rendu serveur, hybride, puis WordPress, Webflow, CMS headless, Lovable ou site sur mesure : quand choisir quoi, quelle limite connaître.' },
    { title: 'La méthode Waimia', desc: "Premier rendez-vous, audit gratuit de 45 minutes, style, pièces à réunir, maquette validée avant développement, et les deux packs d'heures." },
  ],
  inside_en: [
    { title: 'How to use the grid', desc: 'The 45-minute routine, the "fix first, remeasure after" rule and what the grid does not cover.' },
    { title: 'Eight axes to tick', desc: 'Conversion, speed and Core Web Vitals, mobile, indexing and Search Console, content, AI citability, technical and security, measurement. For each point: how to check it, warning sign.' },
    { title: 'What can be fixed, what points to a rebuild', desc: 'For each axis, the defects that are fixed without a rebuild and those that come from the platform.' },
    { title: 'A simple scoring', desc: 'One letter per axis, a decision rule and the three rebuild criteria, with Google\'s advice for a migration.' },
    { title: 'Choosing the technical solution', desc: 'Static site, server rendering, hybrid, then WordPress, Webflow, headless CMS, Lovable or custom site: when to choose what, which limit to know.' },
    { title: 'The Waimia method', desc: 'First meeting, free 45-minute audit, style, materials to gather, mockup approved before development, and the two hour packs.' },
  ],
  extract_fr:
    "<p><strong>Extrait de l'axe 2 : vitesse.</strong> Trois seuils à relever sur mobile, d'après web.dev (page lue le 16 octobre 2026) :</p>" +
    '<ul>' +
    '<li><strong>Chargement du plus grand élément (LCP)</strong> : 2,5 secondes au plus.</li>' +
    '<li><strong>Réactivité (INP)</strong> : 200 millisecondes au plus.</li>' +
    '<li><strong>Décalage visuel (CLS)</strong> : 0,1 au plus.</li>' +
    '</ul>' +
    '<p>Le seuil se mesure au 75e centile des chargements, séparément sur mobile et sur ordinateur. Respecter ces seuils ne garantit aucune position.</p>',
  extract_en:
    '<p><strong>Extract from axis 2: speed.</strong> Three thresholds to read on mobile, according to web.dev (page read on 16 October 2026):</p>' +
    '<ul>' +
    '<li><strong>Largest element load (LCP)</strong>: 2.5 seconds at most.</li>' +
    '<li><strong>Responsiveness (INP)</strong>: 200 milliseconds at most.</li>' +
    '<li><strong>Layout shift (CLS)</strong>: 0.1 at most.</li>' +
    '</ul>' +
    '<p>The threshold is measured at the 75th percentile of page loads, separately on mobile and desktop. Meeting these thresholds guarantees no ranking.</p>',
  illustration: {
    src: '/images/illustrations/ds/cahier-des-charges-site-internet-gabarit-paper.webp',
    alt_fr: "Un grand gabarit de papier découpé en forme de maison, à côté d'une charpente montée à la même forme",
    alt_en: 'A large paper template cut out in the shape of a house, next to a timber frame built to the same shape',
  },
  faq_fr: [
    {
      q: "La grille remplace-t-elle un audit SEO technique ?",
      a: "Non. La grille est une revue à vue, que vous faites seul ou avec nous en 45 minutes, pour décider de la suite. L'audit SEO technique explore le site page par page et livre un rapport écrit avec des actions classées. La grille peut conclure qu'il faut le second.",
    },
    {
      q: 'Faut-il des outils payants pour remplir la grille ?',
      a: "Non. Chaque point se vérifie par un geste (ouvrir le site sur un téléphone, envoyer un formulaire de test, lire le fichier robots.txt) ou avec un outil gratuit, comme la Search Console de Google.",
    },
    {
      q: 'La grille dit-elle combien coûte une refonte ?',
      a: "Non. Elle sert à décider s'il faut refaire. Le dernier chapitre rappelle les deux packs d'heures de Waimia, avec les prix relevés à la date indiquée dans le PDF. Aucun prix de marché n'y figure.",
    },
    {
      q: 'Que devient mon adresse e-mail ?',
      a: "Elle sert à vous envoyer le PDF. Vous ne recevez la lettre Waimia que si vous cochez la case prévue à cet effet. Désinscription en un clic.",
    },
  ],
  faq_en: [
    {
      q: 'Does the grid replace a technical SEO audit?',
      a: 'No. The grid is an at-a-glance review, which you do alone or with us in 45 minutes, to decide what comes next. The technical SEO audit explores the site page by page and delivers a written report with ranked actions. The grid may conclude that you need the latter.',
    },
    {
      q: 'Do I need paid tools to fill in the grid?',
      a: 'No. Each point is checked with a gesture (open the site on a phone, send a test form, read the robots.txt file) or with a free tool such as Google Search Console.',
    },
    {
      q: 'Does the grid say how much a rebuild costs?',
      a: "No. It helps decide whether to rebuild. The last chapter recalls Waimia's two hour packs, with the prices read on the date stated in the PDF. No market price is given.",
    },
    {
      q: 'What happens to my email address?',
      a: 'It is used to send you the PDF. You only receive the Waimia letter if you tick the box for it. Unsubscribe in one click.',
    },
  ],
  relatedPages: [
    '/blog/audit-site-internet-pme',
    '/ressources/guides/cahier-des-charges-site-internet',
    '/services/site-web-ia',
    '/services/audit-seo-technique',
  ],
  seoTitle_fr: "Grille d'audit de site internet : corriger ou refaire",
  seoTitle_en: 'Website audit grid: fix it or rebuild it (free PDF)',
  seoDescription_fr:
    "Grille d'audit de site internet en PDF : huit axes à cocher, comment vérifier chaque point et critères pour choisir entre corriger et refaire. Gratuit.",
  seoDescription_en:
    'Website audit grid as a free PDF: eight axes to tick, how to check each point and criteria to choose between fixing and rebuilding your site.',
  publishedAt: '2026-10-16',
  updatedAt: '2026-10-16',
};
