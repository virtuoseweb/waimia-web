// Waimia · Co-location DS (Wave #38, T5) · module `feature-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'feature-grid',
    kicker_fr: 'Démo · grille features',
    kicker_en: 'Demo · features grid',
    h2_fr: 'Trois <i>piliers</i> du DS Waimia',
    h2_en: 'Three <i>pillars</i> of Waimia DS',
    // Contenu d'en-tête riche (rendu seulement si headerKind=*-lede*/-cta) + ligne d'intro
    // (rendu seulement si introRow=desc-media-split) : présents dans la demo pour que les
    // variantes de couverture aient de quoi vitriner ces axes. Défaut headerKind=eyebrow-title
    // ne rend NI lede NI cta → rendu actuel inchangé.
    lede_fr: 'Un système de design figé, exhaustif et propagé partout en une édition.',
    lede_en: 'A frozen, exhaustive design system propagated everywhere in one edit.',
    header_cta_label_fr: 'Ouvrir le DS Studio',
    header_cta_label_en: 'Open DS Studio',
    header_cta_href: '/agence/ds-studio',
    intro_desc_fr: 'Chaque section compose les mêmes tokens : couleur, espacement, typo, ombre. Changer une valeur la propage à tout le catalogue, sans dette.',
    intro_desc_en: 'Every section composes the same tokens: color, spacing, type, shadow. Change one value and it propagates across the whole catalogue, debt-free.',
    intro_media: '/images/editorial/image-style-10.webp',
    // 4 cartes : chacune porte icon + desc + meta + media (image placeholder) pour que TOUS
    // les axes cardContent/cardMedia aient de quoi rendre. Sans les axes posés, seules
    // icon+titre+desc s'affichent (cardContent défaut = icon-title-desc) = rendu actuel.
    features: [
      { icon: 'tokens', title_fr: 'Tokens canoniques', title_en: 'Canonical tokens', body_fr: "115 tokens CSS exposés à :root. Pioche, n'invente pas.", body_en: '115 CSS tokens at :root. Pick, never invent.', meta_fr: '115 tokens', meta_en: '115 tokens', media: '/images/editorial/image-style-4.webp', cta_label_fr: 'Voir les tokens', cta_label_en: 'View tokens', cta_href: '/agence/design-system' },
      { icon: 'grid', title_fr: 'Composants atomiques', title_en: 'Atomic components', body_fr: '114 composants en 7 couches Tier 1.', body_en: '114 components across 7 Tier 1 layers.', meta_fr: '114 composants', meta_en: '114 components', media: '/images/editorial/image-style-6.webp', cta_label_fr: 'Explorer', cta_label_en: 'Explore', cta_href: '/agence/design-system' },
      { icon: 'shield', title_fr: 'Anti-hallucination', title_en: 'Anti-hallucination', body_fr: '5 anti-patterns documentés avec commandes de détection.', body_en: '5 anti-patterns documented with detection commands.', meta_fr: '5 garde-fous', meta_en: '5 guardrails', media: '/images/editorial/image-style-7.webp', cta_label_fr: 'Lire la doc', cta_label_en: 'Read docs', cta_href: '/agence/design-system' },
      { icon: 'layers', title_fr: 'Moteur de layout', title_en: 'Layout engine', body_fr: 'Un CSS unique porte toutes les recettes ; les composants se branchent.', body_en: 'One CSS file holds every recipe; components plug in.', meta_fr: '10 familles', meta_en: '10 families', media: '/images/editorial/image-style-8.webp', cta_label_fr: 'Voir le moteur', cta_label_en: 'View engine', cta_href: '/agence/design-system' },
    ],
    columns: '3',
  };
