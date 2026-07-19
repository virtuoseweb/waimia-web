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
// 0 valeur réécrite : chaque littéral est transcrit CARACTÈRE POUR CARACTÈRE depuis
// l'ancien frontmatter (apostrophes typographiques ’, points médians ·, flèches →,
// entités &nbsp;, balises <i class="accent">/<i class="acc"> incluses).
import type { SectionByType } from '@waimia/ds-kernel';
import type { HeroManifestoData } from '@waimia/ds-kernel/sections/hero-manifesto/schema';
import type { EditorialCaseGridData } from '@waimia/ds-kernel/sections/editorial-case-grid/schema';
import { localizeHref as flh, type Lang } from '../lib/i18n';
import { CLIENT_LOGOS, SIX_SERVICES, FIELD_NOTES } from './sitemap';
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
      { html_fr: 'Montpellier · 2026', html_en: 'Montpellier · 2026' },
      {
        html_fr: '<span style="color:var(--accent-text)">◉</span> Booking T3',
        html_en: '<span style="color:var(--accent-text)">◉</span> Booking T3',
      },
    ],
    eyebrow_fr: 'Un studio IA solo · <span style="color:var(--accent-text)">marketing, sales, contenu, web, CRM et marque alignés</span>',
    eyebrow_en: 'A solo AI studio · <span style="color:var(--accent-text)">marketing, sales, content, web, CRM and brand aligned</span>',
    h1_fr: 'Construire du <i class="accent">revenu</i>,<br />pas des démos.',
    h1_en: 'Build <i class="accent">revenue</i>,<br />not demos.',
    subhead_fr: 'Un manifeste en cinq actes. Lu d’une traite, il prend dix&nbsp;minutes. Appliqué chez vous, il s’écrit en <i>quatre semaines</i>.',
    subhead_en: 'A manifesto in five acts. Read in one sitting, it takes ten minutes. Applied at your company, it writes itself in <i>four weeks</i>.',
    intro_fr: "On câble l'IA dans vos outils marketing, sales et web : acquisition, contenu, CRM, site, analytics, marque. Sans changer vos process.",
    intro_en: 'We wire AI into your marketing, sales and web stack: acquisition, content, CRM, site, analytics, brand. Without changing your process.',
    cta_primary_label_fr: 'Prendre RDV →',
    cta_primary_label_en: 'Book a session →',
    cta_primary_href: flh('/contact', lang),
    cta_secondary_label_fr: 'Notre expertise Claude',
    cta_secondary_label_en: 'Our Claude expertise',
    cta_secondary_href: flh('/expertise-claude', lang),
    foot: [
      { text_fr: 'SCROLL TO BEGIN ↓', text_en: 'SCROLL TO BEGIN ↓' },
      { text_fr: 'FIVE ACTS · ONE DOCUMENT', text_en: 'FIVE ACTS · ONE DOCUMENT' },
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
    text_fr: "L'IA est <i class=\"acc\">partout</i> et nulle part. Les stacks grossissent : marketing, sales, contenu, CRM, analytics, marque. Les pipelines s'aplatissent. Le goulot n'est jamais le modèle. Ce sont les rails, les règles, et l'humain qui sait quand débrancher.",
    text_en: "AI is <i class=\"acc\">everywhere</i> and nowhere. Stacks grow : marketing, sales, content, CRM, analytics, brand. Pipelines flatten. The bottleneck is never the model. It's the rails, the rules, and the human who knows when to unplug.",
    tone: 'ink',
    stats: [
      { k: '5 j', label_fr: 'du brief à la première mesure sur acquisition, CRM, contenu et reporting.', label_en: 'from brief to first measurement across acquisition, CRM, content and reporting.' },
      { k: '4 sem', label_fr: 'pour livrer le premier agent en production, pas une démo.', label_en: 'to ship the first agent in production, not a demo.' },
      { k: '1', label_fr: 'interlocuteur direct · celui qui câble est celui qui livre.', label_en: 'direct contact · the person who wires it is the person who ships it.' },
    ],
  } satisfies SectionByType<'manifesto-act'>;

  // ── 4. ACTE II · 6 services in-house (rangees alternees)
  const acteIIData = {
    type: 'asymmetric-services',
    num_fr: 'II.',
    num_en: 'II.',
    kicker_fr: 'La méthode',
    kicker_en: 'The method',
    meta_fr: '6 services · in-house',
    meta_en: '6 services · in-house',
    h2_fr: 'On fait la couche <i class="acc">sans prestige</i>. Exprès.',
    h2_en: 'We do the <i class="acc">unglamorous</i> layer. On purpose.',
    intro_fr: "Acquisition, contenu, CRM, web, analytics, marque. Six métiers. Six exécutions. Un studio solo qui livre. Pas d’agence relai, pas de plateforme tierce, pas de slide de comité. <i>Du code, du process, du résultat mesuré.</i>",
    intro_en: 'Acquisition, content, CRM, web, analytics, brand. Six crafts. Six executions. A solo studio that ships. No relay agency, no third-party platform, no committee slide. <i>Code, process, measured result.</i>',
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
    kicker_fr: '§ Manifeste · Viewport 02',
    kicker_en: '§ Manifesto · Viewport 02',
    text_fr: "On refuse l'uniforme <i>purple-glass</i>. On refuse le cerveau-circuits. On refuse la voix AI-startup. On garde le métier, les reçus, et les règles typographiques françaises.",
    text_en: 'We refuse the <i>purple-glass</i> uniform. We refuse the brain-on-circuits. We refuse the AI-startup voice. We keep the craft, the receipts, and the French typographic rules.',
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
    kicker_fr: 'III. La plateforme',
    kicker_en: 'III. The platform',
    kicker_html_fr: '<span style="color:var(--accent-text)">III.</span> La plateforme',
    kicker_html_en: '<span style="color:var(--accent-text)">III.</span> The platform',
    texture: 'signature-grid',
    h2_fr: 'Virtuose<i class="accent">OS</i>.<br />Le noyau sous chaque système câblé.',
    h2_en: 'Virtuose<i class="accent">OS</i>.<br />The kernel under every wired system.',
    subtitle_fr: 'La plateforme interne qui orchestre marketing, sales, contenu, web, CRM, analytics et marque. Multi-workspace · multi-agents · documentée · transmissible. Construite pour livrer chez vous, déployée chez nous, propriétaire à vie dans votre stack.',
    subtitle_en: 'The internal platform orchestrating marketing, sales, content, web, CRM, analytics and brand. Multi-workspace · multi-agent · documented · transferable. Built to ship with you, deployed by us, owned for life in your stack.',
    subtitle_html_fr: 'La plateforme interne qui orchestre marketing, sales, contenu, web, CRM, analytics et marque. Multi-workspace · multi-agents · documentée · transmissible. Construite pour livrer chez vous, déployée chez nous, <i>propriétaire à vie</i> dans votre stack.',
    subtitle_html_en: 'The internal platform orchestrating marketing, sales, content, web, CRM, analytics and brand. Multi-workspace · multi-agent · documented · transferable. Built to ship with you, deployed by us, <i>owned for life</i> in your stack.',
    buttons: [
      {
        label_fr: '▸ Voir notre expertise Claude',
        label_en: '▸ See our Claude expertise',
        href: flh('/expertise-claude', lang),
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
    h2_fr: 'Pas des démos. Des <i class="accent">résultats</i>.',
    h2_en: 'Not demos. <i class="accent">Results</i>.',
    intro_fr: "Des cas, chiffres en clair. Pas de logos pour faire joli. Chaque ligne contient le secteur, la durée, la stack et l’impact mesuré, celui qu’on défend en comité de direction.",
    intro_en: 'Cases, numbers in the clear. No vanity logos. Each row holds the sector, duration, stack and measured impact, the one we defend in steering committees.',
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
    h2_fr: 'Arrêtez de <i class="accent">répéter</i>.<br />Livrez.',
    h2_en: 'Stop <i class="accent">rehearsing</i>.<br />Ship.',
    cta_primary: {
      label_fr: 'Prendre 45 min →', label_en: 'Book 45 min →',
      href: flh('/contact', lang), variant: 'accent', mag: 0.22,
    },
    cta_secondary: {
      label_fr: SITE.email,
      label_en: SITE.email,
      href: `mailto:${SITE.email}`,
      variant: 'ghost',
    },
    availability_fr: '◉ 45 minutes · diagnostic en clair · aucune relance pénible',
    availability_en: '◉ 45 minutes · clear diagnosis · no annoying follow-up',
    background: 'paper',
  } satisfies SectionByType<'cta-final'>;

  return { heroData, marqueeData, acteIData, acteIIData, accentData, acteIIIData, acteIVBase, writingData, acteVCta };
}

export type EditorialCaseGridDataExport = EditorialCaseGridData;
