// ─────────────────────────────────────────────────────────────────────────────
// Manifeste · /manifesto · données des sections en donnée (JSONification, vague V2)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des littéraux de section qui vivaient inline dans le frontmatter de
// `src/pages/manifesto.astro` (fiche 0027 D6 · vague V2 manifeste). Même mécanisme
// que la vague V1 home (`src/data/home-sections.ts`) : module de données `src/data/*.ts`,
// le plus cohérent avec l'existant et le plus SÛR pour la parité stricte (0 schéma à
// valider, pur déplacement d'objets typés).
//
// La factory `manifestoSections(lang)` reçoit la langue pour reproduire À L'IDENTIQUE
// les appels `flh(..., lang)` qui vivaient dans la page (code déplacé, pas réécrit).
// L'Acte IV (cartes cas clients) reste DÉRIVÉ dans la page depuis la collection `cases`
// (source unique runtime) : le module n'expose que sa base statique `acteIVBase`, la
// page merge `items` (pattern override home V1).
//
// Refonte positionnement 2026-10 : le manifeste parle d'un studio de développement IA et
// d'un cabinet d'automatisation (plus de « marketing, sales, contenu, web, marque »). Les
// promesses chiffrées non vérifiables de l'Acte I (5 j / 4 sem.) sont retirées.
import type { SectionByType } from '@waimia/ds-kernel';
import type { HeroManifestoData } from '@waimia/ds-kernel/sections/hero-manifesto/schema';
import type { EditorialCaseGridData } from '@waimia/ds-kernel/sections/editorial-case-grid/schema';
import { localizeHref as flh, type Lang } from '../lib/i18n';
import { AUDIT_BOOKING_HREF, CLIENT_LOGOS, SIX_SERVICES, FIELD_NOTES } from './sitemap';
import { SITE } from '../site.config';

// Ancres descriptives : chaque note de terrain pointe vers l'article reel le plus proche
// (fallback /blog si aucun billet dedie). Cle = texte EN de la note (stable) → route /blog/<slug>.
export const FIELD_NOTE_LINKS: Record<string, string> = {
  'Consulting firms: where the 8-week proposal-automation lever sits.': '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
  'HubSpot + Claude: the unglamorous pattern that actually ships.': '/blog/cabler-son-crm-en-10-jours',
  'Against the brain-circuit aesthetic.': '/blog/brain-circuit',
  'RevOps rebuild: reconnect site, CRM, follow-ups into one pipeline.': '/blog/cabler-son-crm-en-10-jours',
};

export function manifestoSections(lang: Lang) {
  // ── 1. HERO · editorial plein viewport (nouveau type catalogue `hero-manifesto`)
  const heroData = {
    type: 'hero-manifesto',
    meta: [
      { html_fr: 'Waimia · Manifeste 02', html_en: 'Waimia · Manifeste 02' },
      { html_fr: 'Bordeaux · 2026', html_en: 'Bordeaux · 2026' },
      {
        html_fr: '<span style="color:var(--accent-text)">◉</span> Studio solo',
        html_en: '<span style="color:var(--accent-text)">◉</span> Solo studio',
      },
    ],
    eyebrow_fr: 'Un studio de développement IA · <span style="color:var(--accent-text)">automatisation, agents IA, applications métier</span>',
    eyebrow_en: 'An AI development studio · <span style="color:var(--accent-text)">automation, AI agents, business applications</span>',
    h1_fr: 'L’IA <i class="accent">en production</i>,<br />pas en démonstration.',
    h1_en: 'AI <i class="accent">in production</i>,<br />not in a demo.',
    subhead_fr: 'Un manifeste en cinq actes. Ce que le studio fait, ce qu’il refuse, et pourquoi il <i>remet le code</i> à la fin.',
    subhead_en: 'A manifesto in five acts. What the studio does, what it refuses, and why it <i>hands over the code</i> at the end.',
    intro_fr: "Waimia automatise les processus des PME et ETI, y branche des agents IA et développe les applications métier qui manquent. Sur vos outils, sans vous imposer de migration.",
    intro_en: 'Waimia automates the processes of SMEs, connects AI agents to them and builds the business applications that are missing. On your tools, with no forced migration.',
    cta_primary_label_fr: 'Réserver un audit →',
    cta_primary_label_en: 'Book an audit →',
    cta_primary_href: AUDIT_BOOKING_HREF,
    cta_secondary_label_fr: 'Voir la méthode',
    cta_secondary_label_en: 'See the method',
    cta_secondary_href: flh('/agence/methode', lang),
    foot: [
      { text_fr: 'FAIRE DÉFILER ↓', text_en: 'SCROLL TO BEGIN ↓' },
      { text_fr: 'CINQ ACTES · UN DOCUMENT', text_en: 'FIVE ACTS · ONE DOCUMENT' },
    ],
  } satisfies HeroManifestoData;

  // ── 2. MARQUEE · stack / ecosysteme d'outils (Claude, HubSpot...), PAS des logos clients
  const marqueeData = {
    type: 'marquee-band',
    background: 'ink',
    items_fr: [...CLIENT_LOGOS],
    items_en: [...CLIENT_LOGOS],
    separator: '◦',
    repeat: 2,
    scale: 'display',
  } satisfies SectionByType<'marquee-band'>;

  // ── 3. ACTE I · Le constat + stats (V7 : coherent doctrine Waimia)
  const acteIData = {
    type: 'manifesto-act',
    num_fr: 'I.',
    num_en: 'I.',
    label_fr: 'Le constat',
    label_en: 'The reckoning',
    sub_fr: 'Acte I',
    sub_en: 'Act I',
    text_fr: "L'IA est <i class=\"acc\">partout</i> et nulle part. Les abonnements s'empilent, les prototypes impressionnent en réunion, et les équipes continuent de ressaisir les mêmes données d'un outil à l'autre. Le goulot n'est presque jamais le modèle. Ce sont les données, les règles, et l'humain qui sait quand débrancher.",
    text_en: "AI is <i class=\"acc\">everywhere</i> and nowhere. Subscriptions pile up, prototypes impress in meetings, and teams keep re-keying the same data from one tool to the next. The bottleneck is almost never the model. It's the data, the rules, and the human who knows when to unplug.",
    tone: 'ink',
    stats: [
      { k: '45 min', label_fr: 'd’audit gratuit pour repérer trois automatisations rentables.', label_en: 'of free audit to spot three profitable automations.' },
      { k: '1', label_fr: 'interlocuteur · celui qui audite est celui qui construit.', label_en: 'contact · the person who audits is the person who builds.' },
      { k: '0', label_fr: 'dépendance · le code et les workflows vous sont remis.', label_en: 'lock-in · the code and workflows are handed over to you.' },
    ],
  } satisfies SectionByType<'manifesto-act'>;

  // ── 4. ACTE II · 6 services in-house (rangees alternees)
  const acteIIData = {
    type: 'asymmetric-services',
    num_fr: 'II.',
    num_en: 'II.',
    kicker_fr: 'La méthode',
    kicker_en: 'The method',
    meta_fr: '6 prestations · un seul ingénieur',
    meta_en: '6 services · one engineer',
    h2_fr: 'On fait la couche <i class="acc">sans prestige</i>. Exprès.',
    h2_en: 'We do the <i class="acc">unglamorous</i> layer. On purpose.',
    intro_fr: "Relier les outils, supprimer la ressaisie, journaliser ce que fait un agent : rien de spectaculaire, et c'est là que le temps se gagne. Un studio solo qui construit lui-même, sans agence relais ni sous-traitance. <i>Du code, des workflows, un gain mesuré.</i>",
    intro_en: 'Connecting tools, removing re-keying, logging what an agent does: nothing spectacular, and that is where time is won. A solo studio that builds itself, with no relay agency or subcontracting. <i>Code, workflows, a measured gain.</i>',
    background: 'paper',
    items: SIX_SERVICES.map((s) => ({
      num: s.k,
      label_fr: s.label.fr,
      label_en: s.label.en,
      body_fr: s.body.fr,
      body_en: s.body.en,
    })),
  } satisfies SectionByType<'asymmetric-services'>;

  // ── 5. MANIFESTE ACCENT · terracotta full-bleed « On refuse... »
  const accentData = {
    type: 'manifesto-statement',
    kicker_fr: '§ Ce qu’on refuse',
    kicker_en: '§ What we refuse',
    text_fr: "On refuse le prototype qui ne passe jamais en production. On refuse l'agent qui agit sans trace ni validation. On refuse la dépendance au prestataire. On garde le métier, les mesures, et le code <i>chez vous</i>.",
    text_en: 'We refuse the prototype that never reaches production. We refuse the agent that acts with no trace or validation. We refuse dependence on the provider. We keep the craft, the measurements, and the code <i>on your side</i>.',
    tone: 'accent',
    show_grid: true,
    pinned: false,
  } satisfies SectionByType<'manifesto-statement'>;

  // ── 6. ACTE III · VirtuoseOS · plateforme (CTA final ink, centre)
  const acteIIIData = {
    type: 'footer-cta-band',
    background: 'ink',
    layout: 'stacked',
    contentAlign: 'center',
    actionsAlign: 'center',
    kicker_fr: 'III. Sous le capot',
    kicker_en: 'III. Under the hood',
    kicker_html_fr: '<span style="color:var(--accent-text)">III.</span> Sous le capot',
    kicker_html_en: '<span style="color:var(--accent-text)">III.</span> Under the hood',
    texture: 'signature-grid',
    h2_fr: 'Virtuose<i class="accent">OS</i>.<br />Le cadre de travail du studio.',
    h2_en: 'Virtuose<i class="accent">OS</i>.<br />The studio’s working framework.',
    subtitle_fr: 'Le noyau d’orchestration interne du studio : il coordonne les agents, journalise leurs actions et garde la trace. Il sert de base de travail aux missions. Ce qui est construit pour vous reste chez vous.',
    subtitle_en: 'The studio’s internal orchestration kernel: it coordinates agents, logs their actions and keeps the trace. It serves as the working base for engagements. What is built for you stays with you.',
    subtitle_html_fr: 'Le noyau d’orchestration interne du studio : il coordonne les agents, journalise leurs actions et garde la trace. Il sert de base de travail aux missions. Ce qui est construit pour vous <i>reste chez vous</i>.',
    subtitle_html_en: 'The studio’s internal orchestration kernel: it coordinates agents, logs their actions and keeps the trace. It serves as the working base for engagements. What is built for you <i>stays with you</i>.',
    buttons: [
      {
        label_fr: 'Voir la méthode →',
        label_en: 'See the method →',
        href: flh('/agence/methode', lang),
        variant: 'accent',
      },
    ],
  } satisfies SectionByType<'footer-cta-band'>;

  // ── 7. ACTE IV · cas clients, cartes editoriales decalees (`editorial-case-grid`)
  // Base statique ; la page merge `items` dérivés de la collection `cases` (source unique).
  const acteIVBase = {
    type: 'editorial-case-grid',
    num_fr: 'IV.',
    num_en: 'IV.',
    kicker_fr: 'Les preuves',
    kicker_en: 'The proof',
    h2_fr: 'Des missions <i class="accent">réelles</i>, documentées.',
    h2_en: '<i class="accent">Real</i> engagements, documented.',
    intro_fr: "Pas de logos pour faire joli. Chaque ligne donne le secteur, la durée, les outils et ce qui a été livré. Les chiffres cités viennent des études de cas. Plusieurs de ces missions ont commencé par un site : c'est de là que vient le studio.",
    intro_en: 'No vanity logos. Each row gives the sector, the duration, the tools and what was delivered. The figures quoted come from the case studies. Several of these engagements started with a website: that is where the studio comes from.',
    background: 'paper',
    stagger: 60,
  } as const;

  // ── 8. WRITING · notes de terrain (dark)
  const writingData = {
    type: 'editorial-write-feed',
    kicker_fr: 'Écrits',
    kicker_en: 'Writing',
    title_fr: 'Notes de <i>terrain</i>, lentement.',
    title_en: 'Field <i>notes</i>, slowly.',
    tone: 'ink',
    items: FIELD_NOTES.map((s) => ({
      date: s.date,
      tag_fr: s.tag.fr,
      tag_en: s.tag.en,
      text_fr: s.text.fr,
      text_en: s.text.en,
      href: flh(FIELD_NOTE_LINKS[s.text.en] ?? '/blog', lang),
    })),
  } satisfies SectionByType<'editorial-write-feed'>;

  // ── 9. ACTE V · cloture canonique = composant `cta-final`. Fond paper (coherent Acte V).
  const acteVCta = {
    type: 'cta-final',
    chapter_num: 'V',
    chapter_title_fr: "Passer à l'action",
    chapter_title_en: 'Act',
    h2_fr: 'Quarante-cinq minutes<br />pour savoir quoi <i class="accent">automatiser</i>.',
    h2_en: 'Forty-five minutes<br />to know what to <i class="accent">automate</i>.',
    cta_primary: {
      label_fr: 'Réserver un audit →', label_en: 'Book an audit →',
      href: AUDIT_BOOKING_HREF, variant: 'accent', mag: 0.22,
    },
    cta_secondary: {
      label_fr: SITE.email,
      label_en: SITE.email,
      href: `mailto:${SITE.email}`,
      variant: 'ghost',
    },
    availability_fr: '◉ Audit gratuit · 45 minutes · sans engagement',
    availability_en: '◉ Free audit · 45 minutes · no commitment',
    background: 'paper',
  } satisfies SectionByType<'cta-final'>;

  return { heroData, marqueeData, acteIData, acteIIData, accentData, acteIIIData, acteIVBase, writingData, acteVCta };
}

export type EditorialCaseGridDataExport = EditorialCaseGridData;
