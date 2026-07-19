// ─────────────────────────────────────────────────────────────────────────────
// Hub Ressources · /ressources · sections statiques en donnée (JSONification, vague V3)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des SEULS littéraux de section 100 % STATIQUES du frontmatter de
// `src/pages/ressources/index.astro` (fiche 0027 D6 · vague V3 hubs) : le masthead et le
// CTA final, sans aucune dérivation runtime.
//
// Ce qui NE migre PAS (dette assumée, conforme à la doctrine V1/D6) :
//   • Les sections DÉRIVÉES des collections à l'exécution (resource-card-grid + compteurs
//     réels, feature-split-media article vedette, article-grid, metric-callout-band chiffré,
//     editorial-split-grid) restent construites dans la page — comme la home V1 garde ses
//     merges dérivés côté page (donnée = fonction du contenu réel, pas un littéral figé).
//   • Les 2 sections BESPOKE (`.hub-cases-detail`, bande newsletter `.hub-nl` + son <script>)
//     n'ont pas d'équivalent catalogué → markup conservé dans la page (D6 : ne pas décomposer).
//
// 0 valeur réécrite : transcription CARACTÈRE POUR CARACTÈRE de l'ancien frontmatter.
import type { SectionByType } from '@waimia/ds-kernel';

// ── MASTHEAD · hero-hub-masthead (paper, statique) ──
export const mastheadData = {
  type: 'hero-hub-masthead' as const,
  variant: 'hub' as const,
  decoration: false,
  align: 'left' as const,
  kicker_fr: '§ Hub · Ressources',
  kicker_en: '§ Hub · Resources',
  h1_fr: 'Tout ce qu\'on <i>publie</i>.',
  h1_en: 'Everything we <i>publish</i>.',
  lede_fr: 'Cas mesurables, articles de fond, guides pratiques, comparatifs, diagnostics et calculateurs gratuits. Pas de pensum SEO. Tout est relu, signé, et confidentiel quand le client le demande.',
  lede_en: 'Measurable cases, in-depth articles, practical guides, comparisons, diagnostics and free calculators. No SEO padding. Everything is reviewed, signed, and kept confidential when the client asks.',
} satisfies SectionByType<'hero-hub-masthead'>;

// ── CTA final · cta-final (paper, statique) ──
export const ctaData = {
  type: 'cta-final' as const,
  h2_fr: 'Prêt à livrer un <em>agent</em>,<br />pas un slide deck ?',
  h2_en: 'Ready to ship an <em>agent</em>,<br />not a slide deck?',
  body_fr: 'Audit IA en 5 jours. Premier agent en production en 4 semaines. ROI mesuré, jamais estimé.',
  body_en: 'AI audit in 5 days. First agent in production in 4 weeks. Measured ROI, never estimated.',
  cta_primary: { label_fr: 'Réserver un audit →', label_en: 'Book an audit →', href: '/contact', variant: 'primary' as const },
  cta_secondary: { label_fr: 'Voir les offres →', label_en: 'See services →', href: '/services', variant: 'ghost' as const },
  background: 'paper' as const,
} satisfies SectionByType<'cta-final'>;
