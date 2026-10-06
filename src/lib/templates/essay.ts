// Waimia · Template « essay » (article de blog /blog/<slug>) en DÉFINITION LOGICIELLE.
//
// Doctrine « template-as-data » (décision nuit 0018) : ce fichier n'est PAS un composant
// monolithique : c'est la DÉFINITION du template de la collection `blog`. Il ÉLÈVE 1:1 la
// séquence que `src/pages/blog/[...slug].astro` + `EssayTemplate.astro` construisaient
// (hero-essay · corps de prose · ressource liée · cluster connexe · footer 3-col · faq · cta) en une liste
// ORDONNÉE de blocs + les mappings frontmatter→données.
//
// ⚠️ Spécificité vs `sector`/`case-study` (rapport §Arbitrage A) : l'article de blog n'est
// PAS une liste plate de sections cataloguées rendue par `SectionsRenderer`. C'est un
// template BESPOKE (`EssayTemplate.astro`, PARTAGÉ avec /ressources/outils) : article 3
// colonnes (sommaire + prose `.essay-prose` à drop-cap + aside sources), byline intra-prose,
// share, tags, footer 3-col. Sa prose a un traitement propre (≠ composant catalogué
// `editorial-prose`). Le convertir en sections `editorial-prose` plates casserait la parité
// STRICTE (drop-cap/§/sommaire/sources perdus) ET forcerait à inliner ~250 lignes de markup
// orphelin dans la route (anti-orphelin). Donc :
//   • le CONTENU est découplé en données (JSON `body_sections[0].html_fr` pré-rendu, +
//     `headings` pour le sommaire), le gros gain template-as-data (Tina-ready) ;
//   • `essayTemplate` (defineTemplate) encode la séquence + les conditions `when` (artefact
//     déclaratif, jumeau de sector/case, prêt pour un futur rendu plat / métadonnées MCP) ;
//   • `buildEssayProps(ctx)` est l'ADAPTATEUR de rendu : il mappe frontmatter + contexte
//     cross-entry → les props d'`EssayTemplate` (inchangé). La route ne fait plus que charger
//     le JSON, dériver le cross-entry, appeler ce mapper, et rendre `<EssayTemplate>`.
// Fidélité : mêmes données, mêmes valeurs, mêmes conditions que l'ancienne route/ template.

import {
  AUDIT_BOOKING_HREF,
  AUDIT_BOOKING_LABEL,
  LEAD_MAGNETS,
  TOOL_ENTRY_COPY,
  type LeadMagnetEntry,
  type LeadMagnetSlug,
  type ToolEntryCopy,
} from '../../data/conversion';
import type { CollectionEntry } from 'astro:content';
import { defineTemplate, type TemplateContext } from '@waimia/ds-kernel/templates';
import type { SectionByType } from '@waimia/ds-kernel';
import { localizeHref } from '../i18n';

/** Frontmatter typé d'un article (source de vérité = schéma `blog` de content.config.ts). */
export type EssayData = CollectionEntry<'blog'>['data'];

/** Carte « article connexe » (related-cards) dérivée cross-entry au niveau route. */
export interface EssayRelatedCard {
  kicker: string;
  title_fr: string;
  title_en: string;
  lead_fr: string;
  lead_en: string;
  href: string;
}

/** Lien connexe cross-collection (cas clients / offres) dérivé au niveau route. */
export interface EssayCrossLink {
  id: string;
  title: string;
  href: string;
}

/** Illustration duotone du hero (habillage editorial). */
export interface EssayIllustration {
  src: string;
  alt_fr: string;
  alt_en: string;
  side?: 'left' | 'right';
}

/**
 * Contexte de résolution du template `essay`. Étend `{ data, lang }` avec les valeurs
 * dérivées au niveau route (cross-entry / pathname / corps pré-rendu). Le MOTEUR reste
 * générique : ces extras sont un contrat app, pas kernel.
 */
export type EssayContext = TemplateContext<EssayData> & {
  /** Id de l'article (entry.id) : exclusion RelatedByCluster + articleId. */
  articleId: string;
  /** Slug auteur résolu (byline + AuthorCard). */
  authorSlug?: string;
  /** Libellé auteur d'affichage. */
  authorLabel: string;
  /** Date publiée localisée (fr-FR long). */
  dateStr: string;
  /** Minutes de lecture (frontmatter `readingTime`, sinon calcul route). */
  readingTimeMin: number;
  /** Corps FR pré-rendu (body_sections[0].html_fr), injecté au slot `body`. */
  bodyHtml: string;
  /** Sommaire (headings du corps FR) pour la table des matières. */
  headings: Array<{ depth: number; slug: string; text: string }>;
  /** Illustration hero (override frontmatter sinon mapping catégorie). */
  heroIllustration?: EssayIllustration;
  /** 3 articles connexes (related-cards). */
  relatedCards: EssayRelatedCard[];
  /** Cas clients liés (cross-collection). */
  relatedCasesData: EssayCrossLink[];
  /** Offres liées (cross-collection, vide depuis refonte v7). */
  relatedOffresData: EssayCrossLink[];
};

/** Section du bloc `lead` : capture e-mail (PDF verrouillé) ou appel vers un outil interactif. */
export type EssayLeadSection = SectionByType<'lead-capture-band'> | SectionByType<'cta-final'>;

/**
 * Résout `lead_magnet` (clé de LEAD_MAGNETS) en section catalogue :
 *   • OUTIL interactif (clé de TOOL_ENTRY_COPY) → `cta-final` vers la page de l'outil, sans
 *     formulaire (le résultat n'existe que sur cette page) ;
 *   • ressource VERROUILLÉE (pièces jointes) → `lead-capture-band` en carte, e-mail obligatoire.
 * Toute autre valeur LÈVE une erreur : le build échoue en nommant l'article et la clé.
 */
export function resolveEssayLead(slug: string, articleId: string): EssayLeadSection {
  const where = `blog « ${articleId} » : lead_magnet « ${slug} »`;
  if (!Object.prototype.hasOwnProperty.call(LEAD_MAGNETS, slug)) {
    throw new Error(`${where} absent de LEAD_MAGNETS (src/data/conversion.ts). Clés possibles : ${Object.keys(LEAD_MAGNETS).join(', ')}.`);
  }
  if (Object.prototype.hasOwnProperty.call(TOOL_ENTRY_COPY, slug)) {
    const t: ToolEntryCopy = TOOL_ENTRY_COPY[slug as keyof typeof TOOL_ENTRY_COPY];
    return {
      type: 'cta-final',
      background: 'paper-2',
      h2_fr: t.h2,
      h2_en: t.h2,
      body_fr: t.body,
      body_en: t.body,
      cta_primary: { label_fr: t.label, label_en: t.label, href: t.href, variant: 'primary' },
    } satisfies SectionByType<'cta-final'>;
  }
  const entry: LeadMagnetEntry = LEAD_MAGNETS[slug as LeadMagnetSlug];
  if (!entry.attachments || entry.attachments.length === 0) {
    throw new Error(`${where} : outil sans entrée dans TOOL_ENTRY_COPY ni pièce jointe (src/data/conversion.ts).`);
  }
  return {
    type: 'lead-capture-band',
    variant: 'card',
    background: 'paper-2',
    lead_magnet: slug,
  } satisfies SectionByType<'lead-capture-band'>;
}

/** Kicker éditorial « § Blog · <catégorie> » (parité route legacy). */
function essayKicker(data: EssayData): string {
  return `§ Blog · ${data.category}`;
}

/**
 * DÉFINITION déclarative du template `essay` : la séquence ORDONNÉE de blocs + leurs
 * conditions `when`, verbatim de l'ancien `EssayTemplate.astro`. Jumeau de `sectorTemplate`
 * / `caseStudyTemplate`. Le rendu concret passe par `EssayTemplate` (bespoke, partagé) via
 * `buildEssayProps`. Cet artefact reste la source unique de l'ORDRE et des conditions
 * (prêt pour un futur rendu plat / métadonnées MCP). Cf en-tête §Arbitrage A.
 */
export const essayTemplate = defineTemplate<EssayContext>({
  id: 'essay',
  sections: [
    // 1 · HERO editorial (hero-essay, props d'instance topPad/VT dans EssayTemplate).
    {
      id: 'hero',
      build: ({ data, authorLabel, dateStr, readingTimeMin, heroIllustration }) =>
        ({
          type: 'hero-essay',
          kicker_fr: essayKicker(data),
          kicker_en: essayKicker(data),
          h1_fr: data.h1_fr ?? data.title_fr,
          h1_en: data.h1_fr ?? data.title_fr,
          lede_fr: data.description_fr,
          lede_en: data.description_fr,
          author: authorLabel,
          date: dateStr,
          reading_time_fr: `${readingTimeMin} min de lecture`,
          reading_time_en: `${readingTimeMin} min de lecture`,
          ...(heroIllustration ? { illustration: { side: 'right' as const, ...heroIllustration } } : {}),
        }) satisfies SectionByType<'hero-essay'>,
    },
    // 2 · CORPS de page (prose) → slot bespoke `.essay-body` (sommaire + prose + sources).
    //     Le corps vit dans les DONNÉES (body_sections[0].html_fr), rendu par EssayTemplate.
    {
      id: 'body',
      build: ({ bodyHtml, headings, data }) => ({
        slot: 'essay-body',
        props: { html: bodyHtml, headings, sources: data.sources },
      }),
    },
    // 3 · RESSOURCE liée (lead_magnet) · conditionnel. Après le corps, avant le cluster :
    //     PDF verrouillé → lead-capture-band (carte, fin de la colonne de prose) ;
    //     outil interactif → cta-final vers la page de l'outil. Clé inconnue = build en échec.
    {
      id: 'lead',
      when: ({ data }) => Boolean(data.lead_magnet),
      build: ({ data, articleId }) => resolveEssayLead(data.lead_magnet!, articleId),
    },
    // 4 · Cluster connexe (RelatedByCluster) → slot, conditionnel (cluster présent).
    {
      id: 'related-cluster',
      when: ({ data }) => Boolean(data.cluster),
      build: ({ data, articleId }) => ({ slot: 'essay-cluster', props: { cluster: data.cluster, articleId } }),
    },
    // 5 · FOOTER 3-col (related + auteur + contact) → slot bespoke.
    {
      id: 'footer',
      build: ({ relatedCards, relatedCasesData, relatedOffresData, authorSlug }) => ({
        slot: 'essay-footer',
        props: { relatedCards, relatedCasesData, relatedOffresData, authorSlug },
      }),
    },
    // 6 · FAQ (faq-accordion catalogué) · conditionnel (>= 1 item, gate legacy `length > 0`).
    {
      id: 'faq',
      when: ({ data }) => Array.isArray(data.faq_fr) && data.faq_fr.length > 0,
      build: ({ data }) => ({
        type: 'faq-accordion',
        background: 'paper-2',
        // EssayTemplate rend FaqAccordion avec ce heading (parité) ; ici il documente le h2.
        h2_fr: 'Questions fréquentes',
        h2_en: 'Frequently asked questions',
        items: (data.faq_fr ?? []).map((f) => ({ q_fr: f.q, q_en: f.q, a_fr: f.a, a_en: f.a })),
      } satisfies SectionByType<'faq-accordion'>),
    },
    // 7 · CTA final (cta-band catalogué, fond paper-2).
    {
      id: 'cta',
      build: ({ data, lang }) => {
        const section = data.category ?? essayKicker(data).replace(/^§\s*/, '').split('·')[0]?.trim();
        return {
          type: 'cta-band',
          text_fr: `Si ${section} touche votre équipe, on le traduit en plan d'action opérable plutôt qu'en débat abstrait.`,
          text_en: `If ${section} matters to your team, we turn it into an operational plan instead of an abstract debate.`,
          cta: {
            label_fr: `${AUDIT_BOOKING_LABEL.fr} →`,
            label_en: `${AUDIT_BOOKING_LABEL.en} →`,
            href: AUDIT_BOOKING_HREF,
            variant: 'primary',
          },
          background: 'paper-2',
        } satisfies SectionByType<'cta-band'>;
      },
    },
  ],
});

/**
 * ADAPTATEUR de rendu : mappe le contexte `essay` → les props d'`EssayTemplate` (inchangé).
 * Centralise toute la logique de mapping frontmatter→template qui vivait dans la route
 * (kicker, dates, breadcrumb, reading time, section CTA). La route reste « charger JSON +
 * dériver cross-entry + rendre ». Les slots `headline`/`lede`/`body` sont fournis par la
 * route (headline = title_fr, lede = description_fr, body = set:html html_fr).
 */
export function buildEssayProps(ctx: EssayContext) {
  const { data, lang, articleId, authorSlug, authorLabel, dateStr, readingTimeMin, headings, heroIllustration, relatedCards, relatedCasesData, relatedOffresData } = ctx;
  const publishedISO = new Date(data.publishedAt).toISOString().slice(0, 10);
  const modifiedISO = data.updatedAt ? new Date(data.updatedAt).toISOString().slice(0, 10) : publishedISO;
  return {
    title: `${data.title_fr} · Waimia`,
    description: data.description_fr,
    kicker: essayKicker(data),
    date: dateStr,
    datePublished: publishedISO,
    dateModified: modifiedISO,
    author: authorLabel,
    readingTime: `${readingTimeMin} min de lecture`,
    relatedCards,
    authorSlug,
    sources: data.sources,
    lang,
    breadcrumbItems: [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: data.title_fr },
    ],
    relatedCasesData,
    relatedOffresData,
    headings,
    cluster: data.cluster,
    articleId,
    bylineAuthorSlug: authorSlug,
    publishedAt: data.publishedAt,
    illustration: heroIllustration,
    faqItems: data.faq_fr,
    leadSection: data.lead_magnet ? resolveEssayLead(data.lead_magnet, articleId) : undefined,
  };
}
