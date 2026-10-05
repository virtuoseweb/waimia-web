// Waimia · Template « case-study » (cas client) en DÉFINITION LOGICIELLE.
//
// Doctrine « template-as-data » (décision nuit 0018) : ce fichier n'est PAS un
// composant .astro monolithique — c'est la DÉFINITION du template de la collection
// `cases` : une liste ORDONNÉE de sections cataloguées + les mappings frontmatter→
// données. Il ÉLÈVE 1:1 tout ce que `src/components/templates/CaseStudyTemplate.astro`
// construisait (12 data-builders + blocs composés) en builders déclaratifs. La route
// `src/pages/cas-clients/[...slug].astro` fait `resolveTemplate(caseStudyTemplate, ctx)`
// puis rend la liste via le registry de sections (parité pixel avec l'ancien template).
//
// Fidélité : mêmes données, mêmes valeurs, mêmes conditions (`when`) que l'ancien
// template. Deux sections ont besoin de props d'INSTANCE que les wrappers de module
// (data+lang pass-through) n'acheminent pas → la route les rend en direct via ces
// props (`hero-case-study` : topPad/h1Gap/VT ids ; `tech-stack-band` : reveal + style).

import { AUDIT_BOOKING_HREF, AUDIT_BOOKING_LABEL, AUDIT_PAGE_HREF, AUDIT_PAGE_LABEL } from '../../data/conversion';
import type { CollectionEntry } from 'astro:content';
import { defineTemplate, type TemplateContext } from '@waimia/ds-kernel/templates';
import type { SectionByType } from '@waimia/ds-kernel';
import { localizeHref } from '../i18n';
import { meshForCase } from '../internal-mesh';

/** Frontmatter typé d'un cas (source de vérité = schéma `cases` de content.config.ts). */
export type CaseData = CollectionEntry<'cases'>['data'];

/** Carte « cas connexe » dérivée au niveau route (cross-entry) et injectée au contexte. */
export interface RelatedCardInput {
  kicker: string;
  title_fr: string;
  title_en: string;
  lead_fr: string;
  lead_en: string;
  href: string;
}

/**
 * Contexte de résolution du template `case-study`. Étend `{ data, lang }` avec les
 * valeurs dérivées au niveau route (numéro éditorial, id de View Transition, slug pour
 * le maillage, auteur, cartes connexes). Le MOTEUR reste générique : ces extras sont
 * un contrat app, pas kernel.
 */
export type CaseStudyContext = TemplateContext<CaseData> & {
  /** Numéro éditorial « Cas 0N » / « Projet 0N » (position triée par card.order, par nature). */
  caseNum: string;
  /** Id de continuité View Transition (dérivé du pathname). */
  transitionId: string;
  /** Id du cas (entry.id) pour le maillage interne. */
  slug: string;
  /** Slug auteur résolu (bandes byline/card). */
  authorSlug?: string;
  /** 3 cas connexes (bande related-cards). */
  relatedCards: RelatedCardInput[];
};

export const caseStudyTemplate = defineTemplate<CaseStudyContext>({
  id: 'case-study',
  sections: [
    // ── MASTHEAD + fil d'Ariane (chrome, section cataloguée `masthead-bar`) ──────────
    // Dernier crumb = titre nu, aligné sur la branche composable (wart legacy
    // « · Waimia » retiré, fiche 0020 §D).
    {
      id: 'masthead',
      build: ({ data }) => ({
        type: 'masthead-bar',
        breadcrumb: [
          { label_fr: 'Accueil', label_en: 'Home', href: '/' },
          data.kind === 'interne'
            ? { label_fr: 'Projets internes', label_en: 'Internal projects', href: '/cas-clients#projets-internes' }
            : { label_fr: 'Cas clients', label_en: 'Case studies', href: '/cas-clients' },
          { label_fr: data.title_fr, label_en: data.title_en },
        ],
      } satisfies SectionByType<'masthead-bar'>),
    },

    // ── HERO masthead + spec bar → hero-case-study (props d'instance topPad/h1Gap/VT) ─
    {
      id: 'hero',
      build: ({ data, caseNum, transitionId }) => ({
        section: {
          type: 'hero-case-study',
          case_num: caseNum,
          // Legacy hardcodait '§ Cas client' même en EN (parité 0-régression).
          eyebrow_fr: data.kind === 'interne' ? '§ Projet interne' : '§ Cas client',
          eyebrow_en: data.kind === 'interne' ? '§ Internal project' : '§ Cas client',
          ...(data.kind === 'interne' ? { num_label_fr: 'Projet', num_label_en: 'Project' } : {}),
          h1_fr: data.title_fr,
          h1_en: data.title_en,
          ...(data.illustration
            ? { illustration: { ...data.illustration, side: data.illustration.side ?? 'right' } }
            : {}),
          specs: [
            data.kind === 'interne'
              ? { label_fr: 'Projet', label_en: 'Project', value: data.client }
              : { label_fr: 'Client', label_en: 'Client', value: data.ndaProtected ? 'Confidentiel' : data.client },
            { label_fr: 'Secteur', label_en: 'Sector', value: data.sector_fr },
            data.kind === 'interne'
              ? { label_fr: 'État', label_en: 'Status', value: data.duration }
              : { label_fr: 'Durée', label_en: 'Duration', value: data.duration },
            { label_fr: 'Stack', label_en: 'Stack', value: data.stack.slice(0, 3).join(' · ') },
          ],
        } satisfies SectionByType<'hero-case-study'>,
        props: {
          topPad: 'clamp(80px, 10vw, 120px)',
          h1Gap: '48px',
          transitionId,
          cardTransitionId: transitionId,
        },
      }),
    },

    // ── DOUBLE-LABEL provenance → provenance-chip (solid first-party / outline second) ─
    {
      id: 'provenance',
      build: ({ data, lang }) => {
        const isFirstParty = data.provenance !== 'second-party';
        const isInternal = data.kind === 'interne';
        return {
          type: 'provenance-chip',
          variant: isFirstParty ? 'solid' : 'outline',
          label_fr: isInternal ? 'Projet interne · Waimia' : isFirstParty ? 'Projet réalisé · Waimia' : 'Étude · sources tierces',
          label_en: isInternal ? 'Internal project · Waimia' : isFirstParty ? 'Completed project · Waimia' : 'Study · third-party sources',
          href: localizeHref('/sources-methodologie', lang),
        } satisfies SectionByType<'provenance-chip'>;
      },
    },

    // ── BANDE AUTEUR (byline) — emplacement app (molécule AuthorByline hors-catalogue) ─
    {
      id: 'author-byline',
      when: ({ authorSlug }) => Boolean(authorSlug),
      build: ({ authorSlug, data }) => ({
        slot: 'author-byline',
        props: { authorSlug, date: data.publishedAt },
      }),
    },

    // ── CONTEXTE : problem-statement (frontmatter migré) SINON corps de page (prose) →
    //    editorial-prose. Reproduit EXACTEMENT le gate legacy `problemStatement ? … :
    //    <Content/>`. Avec contextStatement → problem-statement ; la prose `body_sections`
    //    est alors rendue plus bas (étape `body-prose`, après les livrables). ───────────
    {
      id: 'context',
      build: ({ data }) => {
        const hasContextStatement = Boolean(data.contextStatement_fr || data.contextStatement_en);
        if (hasContextStatement) {
          return {
            type: 'problem-statement',
            kicker_fr: '§ Le contexte',
            kicker_en: '§ Context',
            statement_fr: data.contextStatement_fr ?? data.contextStatement_en ?? '',
            statement_en: data.contextStatement_en ?? data.contextStatement_fr ?? '',
            ...(data.contextStats && data.contextStats.length > 0 ? { stats: data.contextStats } : {}),
          } satisfies SectionByType<'problem-statement'>;
        }
        // Corps de page (prose) → sections editorial-prose (la place actuelle du
        // <Content/> legacy). NB : le composant editorial-prose rend sa prose via un
        // <slot/> (pas de champ texte kernel) → le texte `html_*` du contenu reste
        // donnée (Tina-ready) non rendue tant que le composant n'a pas de champ texte.
        return (data.body_sections ?? []).map(
          (p) =>
            ({
              type: 'editorial-prose',
              ...(p.background ? { background: p.background } : {}),
              ...(p.maxWidth ? { maxWidth: p.maxWidth } : {}),
              ...(p.figures ? { figures: p.figures } : {}),
            }) satisfies SectionByType<'editorial-prose'>,
        );
      },
    },

    // ── GOULOTS → problems-grid (migré uniquement, ≥ 2) ──────────────────────────────
    {
      id: 'problems-grid',
      when: ({ data }) => Boolean(data.bottlenecks && data.bottlenecks.length >= 2),
      build: ({ data }) => ({
        type: 'problems-grid',
        h2_fr: data.bottlenecksHeading_fr ?? 'Trois goulots structurels.',
        h2_en: data.bottlenecksHeading_en ?? 'Three structural bottlenecks.',
        problems: data.bottlenecks!,
      } satisfies SectionByType<'problems-grid'>),
    },

    // ── APPROCHE → method-timeline (phases migrées, ≥ 2) ─────────────────────────────
    {
      id: 'method-timeline',
      when: ({ data }) => Boolean(data.phases && data.phases.length >= 2),
      build: ({ data }) => ({
        type: 'method-timeline',
        kicker_fr: "§ 02 · L'approche",
        kicker_en: '§ 02 · The approach',
        h2_fr: data.approachHeading_fr ?? "Ce qu'on a câblé.",
        h2_en: data.approachHeading_en ?? 'What we built.',
        steps: data.phases!,
      } satisfies SectionByType<'method-timeline'>),
    },

    // ── LIVRABLES → deliverables-grid (migré uniquement, ≥ 2) ────────────────────────
    {
      id: 'deliverables-grid',
      when: ({ data }) => Boolean(data.deliverableCards && data.deliverableCards.length >= 2),
      build: ({ data }) => ({
        type: 'deliverables-grid',
        kicker_fr: data.deliverablesKicker_fr ?? '§ Livré',
        kicker_en: data.deliverablesKicker_en ?? '§ Shipped',
        title_fr: data.deliverablesHeading_fr ?? "Ce qu'on a livré.",
        title_en: data.deliverablesHeading_en ?? 'What we shipped.',
        items: data.deliverableCards!,
      } satisfies SectionByType<'deliverables-grid'>),
    },

    // ── CORPS ÉDITORIAL → editorial-prose (html_fr porté par la donnée). C'est ici que la
    //    fiche sépare ses volets (site et marketing / IA), dit le rôle de l'IA et celui de
    //    l'humain, les garde-fous, et ce qui est mesuré ou non. Rendu seulement quand le
    //    contexte est déjà porté par `contextStatement` (sinon l'étape `context` l'émet). ──
    {
      id: 'body-prose',
      when: ({ data }) =>
        Boolean(data.contextStatement_fr || data.contextStatement_en) &&
        Boolean(data.body_sections && data.body_sections.length > 0),
      build: ({ data }) =>
        data.body_sections!.map(
          (p) =>
            ({
              type: 'editorial-prose',
              background: p.background ?? 'paper-2',
              ...(p.maxWidth ? { maxWidth: p.maxWidth } : {}),
              html_fr: p.html_fr,
              ...(p.html_en ? { html_en: p.html_en } : {}),
            }) satisfies SectionByType<'editorial-prose'>,
        ),
    },

    // ── SITE LIVRÉ → site-showcase (migré uniquement, screens > 0) ───────────────────
    {
      id: 'site-showcase',
      when: ({ data }) => Boolean(data.showcase && data.showcase.screens.length > 0),
      build: ({ data }) => ({ type: 'site-showcase', ...data.showcase! } satisfies SectionByType<'site-showcase'>),
    },

    // ── AVANT → APRÈS → metric-shift (migré uniquement, ≥ 2 ; fond ink HAB-6) ─────────
    {
      id: 'metric-shift',
      when: ({ data }) => Boolean(data.shifts && data.shifts.length >= 2),
      build: ({ data }) => ({
        type: 'metric-shift',
        kicker_fr: '§ Avant → après',
        kicker_en: '§ Before → after',
        shifts: data.shifts!,
        background: 'ink',
      } satisfies SectionByType<'metric-shift'>),
    },

    // ── KEY METRICS → stat-block (migré uniquement, metrics > 0) ──────────────────────
    {
      id: 'stat-block',
      when: ({ data }) => Boolean(data.metrics && data.metrics.length > 0),
      build: ({ data }) => ({
        type: 'stat-block',
        h2_fr: data.resultsHeading_fr ?? 'Résultats mesurés.',
        h2_en: data.resultsHeading_en ?? 'Measured results.',
        metrics: data.metrics!.map((m) => ({
          value: m.value,
          label_fr: m.label_fr,
          label_en: m.label_en,
          emphasis: false,
        })),
        layout: 'grid-3' as const,
      } satisfies SectionByType<'stat-block'>),
    },

    // ── PROOF · une vraie citation du client (`pullQuote_fr`) → pull-quote-block attribué.
    //    Sans citation réelle (amploi, isabelle), le résultat (`impact_fr`) est rendu comme un
    //    CONSTAT du studio (problem-statement, kicker « Le résultat »), jamais entre guillemets
    //    ni attribué au client : on ne fabrique pas un témoignage. ──
    {
      id: 'proof',
      build: ({ data }) => {
        if (!data.pullQuote_fr) {
          return {
            type: 'problem-statement',
            kicker_fr: data.impactKicker_fr ?? '§ Le résultat',
            kicker_en: data.impactKicker_en ?? '§ The result',
            statement_fr: data.impact_fr,
            statement_en: data.impact_en ?? data.impact_fr,
          } satisfies SectionByType<'problem-statement'>;
        }
        const cite_fr = data.pullQuoteCite_fr ?? (data.ndaProtected ? 'Confidentiel' : data.client);
        const cite_en = data.pullQuoteCite_en ?? (data.ndaProtected ? 'Confidential' : data.client);
        return {
          type: 'pull-quote-block',
          quote_fr: data.pullQuote_fr,
          quote_en: data.pullQuote_en ?? data.pullQuote_fr,
          cite_fr,
          cite_en,
          variant: 'centered' as const,
        } satisfies SectionByType<'pull-quote-block'>;
      },
    },

    // ── STACK → tech-stack-band (props d'instance : reveal + hooks CSS-vars de parité) ─
    {
      id: 'tech-stack-band',
      build: ({ data }) => {
        const toolNames = data.stack;
        const leadFr =
          data.stackLead_fr ??
          (toolNames.length > 0
            ? `Les briques mobilisées sur ce projet : ${toolNames.join(', ')}. Chaque choix sert un besoin précis du terrain, pas une mode technique.`
            : '');
        const leadEn =
          data.stackLead_en ??
          (toolNames.length > 0
            ? `The building blocks used on this project: ${toolNames.join(', ')}. Each choice serves a precise field need, not a technical fashion.`
            : '');
        return {
          section: {
            type: 'tech-stack-band',
            kicker_fr: '§ 04 · La stack',
            kicker_en: '§ 04 · The stack',
            lead_fr: leadFr,
            lead_en: leadEn,
            pills: data.stack.map((s) => ({ label_fr: s, label_en: s, kind: 'primary' as const })),
          } satisfies SectionByType<'tech-stack-band'>,
          props: {
            reveal: true,
            style:
              '--tech-stack-band-pad: var(--space-10); --tech-stack-band-lead-size: var(--text-h3); --tech-stack-band-lead-leading: 1.3; --tech-stack-band-lead-margin: var(--space-8);',
          },
        };
      },
    },

    // ── BANDE AUTEUR (card) — emplacement app (molécule AuthorCard hors-catalogue) ────
    {
      id: 'author-card',
      when: ({ authorSlug }) => Boolean(authorSlug),
      build: ({ authorSlug }) => ({ slot: 'author-card', props: { authorSlug } }),
    },

    // ── AUTRES CAS → related-cards-band (cross-entry, ≥ 2) ────────────────────────────
    {
      id: 'related-cards-band',
      when: ({ relatedCards }) => relatedCards.length >= 2,
      build: ({ relatedCards }) => ({
        type: 'related-cards-band',
        kicker_fr: '§ Autres réalisations',
        kicker_en: '§ Other work',
        cards: relatedCards.slice(0, 3).map((c) => ({
          kicker_fr: c.kicker,
          kicker_en: c.kicker,
          title_fr: c.title_fr,
          title_en: c.title_en,
          lead_fr: c.lead_fr,
          lead_en: c.lead_en,
          href: c.href,
        })),
      } satisfies SectionByType<'related-cards-band'>),
    },

    // ── CTA FINAL → footer-cta-band (ink, climax avant footer global) ────────────────
    {
      id: 'footer-cta',
      build: ({ data, lang }) => {
        const caseLabel = data.title_fr;
        return {
          type: 'footer-cta-band',
          background: 'ink',
          kicker_fr: '§ Travaillons ensemble',
          kicker_en: '§ Work with us',
          h2_fr: data.ctaHeading_fr ?? 'Votre prochain chantier doit produire des <i>résultats</i>.',
          h2_en: data.ctaHeading_en ?? 'Your next project should produce <i>results</i>.',
          subtitle_fr:
            data.ctaSubtitle_fr ??
            `Si ${caseLabel} ressemble à votre contexte, l'audit gratuit de 45 minutes part de vos processus et dit ce qui vaut la peine d'être automatisé.`,
          subtitle_en:
            data.ctaSubtitle_en ??
            `If ${caseLabel} looks like your context, we frame yours in 45 minutes and tell you quickly whether the field is operationally viable.`,
          buttons: [
            {
              label_fr: AUDIT_BOOKING_LABEL.fr,
              label_en: AUDIT_BOOKING_LABEL.en,
              href: AUDIT_BOOKING_HREF,
              variant: 'primary',
            },
            {
              label_fr: AUDIT_PAGE_LABEL.fr,
              label_en: AUDIT_PAGE_LABEL.en,
              href: localizeHref(AUDIT_PAGE_HREF, lang),
              variant: 'ghost',
            },
          ],
        } satisfies SectionByType<'footer-cta-band'>;
      },
    },

    // ── MAILLAGE INTERNE → related-links (helper meshForCase, dernière section) ───────
    {
      id: 'related-links',
      build: ({ data, lang, slug }) =>
        ({
          ...meshForCase({ slug, sector_fr: data.sector_fr }, lang),
          background: 'paper-3',
        }) as unknown as SectionByType<'related-links'>,
    },
  ],
});
