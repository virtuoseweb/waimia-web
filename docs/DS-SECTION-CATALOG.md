# DS Section Catalog

> Machine-readable catalog of all registry section types.
> Source : `gen-section-manifest.mjs` (deterministic, do not edit by hand).
> Sections : 151

---

## About Sections

### `about-story-split`

> Récit fondateur en deux colonnes : texte narratif de mission à gauche, timeline de jalons datés à droite. Raconte l’histoire de la marque sans verbiage.
> AboutStorySplit · src/components/sections/AboutStorySplit.astro · marketing/about-sections
> status : stable · tags : about, mission, split, story, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_title_en` | string | non |  |  |
| `aside_title_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `milestones` | array | oui |  | min:2 max:8 |
| `paragraphs_en` | array | oui |  | min:1 max:5 |
| `paragraphs_fr` | array | oui |  | min:1 max:5 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-body` `--leading-prose` `--muted` `--paper` `--paper-2` `--paper-3` `--space-12` `--space-4` `--space-5` `--space-6` `--space-8` `--text-body` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .about-story .about-story__aside .about-story__aside-title .about-story__body .about-story__grid .about-story__label .about-story__milestone .about-story__narrative .about-story__timeline .about-story__year

**Dette hardcode** : 4 valeur(s) — 1px, 860px, clamp(var(--space-5), clamp(var(--space-8)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-12 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (1px, 860px, clamp(var(--space-5)).

---

## Banner Sections

### `announcement-banner`

> Bandeau d’annonce/promo fin : badge optionnel, texte court et lien, bouton de fermeture optionnel (dismissible), variantes accent, encre ou paper-2.
> AnnouncementBanner · src/components/sections/AnnouncementBanner.astro · marketing/banner-sections
> status : stable · tags : alert, announcement, banner, dismissible, promo, strip

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `badge_en` | string | non |  |  |
| `badge_fr` | string | non |  |  |
| `dismissible` | boolean | non | false |  |
| `href` | string | non |  |  |
| `link_label_en` | string | non |  |  |
| `link_label_fr` | string | non |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |
| `tone` | enum | non | accent | accent | ink | paper-2 |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-7` `--text-body` `--text-small` `--tracking-mono`

**Classes scoped** : .announce .announce__badge .announce__close .announce__inner .announce__link .announce__text

**Dette hardcode** : 4 valeur(s) — 1px, 2px, 3px, 640px

**Agent** : Layout : `background`, `tone` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (1px, 2px, 3px).

---

## Call-to-Action Sections

### `tunnel-step-nav`

> Pied de navigation d'étape tunnel : lien prev optionnel + cta (primary/accent/ghost) + barre méta (lecture + retour offre).
> TunnelStepNav · src/components/sections/TunnelStepNav.astro · marketing/call-to-action-sections
> status : stable · tags : cta, footer, meta, nav, prev, step, tunnel

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `back_href` | string | oui |  |  |
| `back_label` | string | oui |  |  |
| `cta` | enum | oui |  | primary | accent | ghost |
| `prev_href` | string | non |  |  |
| `prev_label_en` | string | non | ← Previous step |  |
| `prev_label_fr` | string | non | ← Étape précédente |  |
| `reading_en` | string | non | 2 min read |  |
| `reading_fr` | string | non | Temps de lecture : 2 min |  |

**Tokens** : `--accent` `--dur-fast` `--font-mono` `--font-sans` `--fw-semibold` `--gut` `--hairline` `--ink` `--muted` `--paper` `--radius-xs` `--section-base` `--space-3` `--space-5` `--space-6` `--text-body` `--text-small`

**Classes scoped** : .tunnel-step-nav .tunnel-step-nav__btn-cta .tunnel-step-nav__btn-cta--accent .tunnel-step-nav__btn-cta--ghost .tunnel-step-nav__btn-cta--primary .tunnel-step-nav__btn-ghost .tunnel-step-nav__meta .tunnel-step-nav__meta-back .tunnel-step-nav__meta-reading .wrap-wide

**Dette hardcode** : 7 valeur(s) — .06em, 100%, 1200px, 14px, 1px, 28px, 700px

**Agent** : Layout : `cta` (schema, 0 CSS). Espacement : --space-3 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-mono --font-sans. Dette : 7 litteral(s) hardcode(s) (.06em, 100%, 1200px).

---

## Comparison Sections

### `comparison-duo`

> Deux cartes cote a cote (Sans / Avec) pour mettre en evidence le contraste avant/apres ou nous-vs-eux, avec items a puces et glyphes differencies.
> ComparisonDuo · src/components/sections/ComparisonDuo.astro · marketing/comparison-sections
> status : stable · tags : before-after, comparison, duo, versus

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `with_items` | array | oui |  | min:2 max:6 |
| `with_label_en` | string | oui |  |  |
| `with_label_fr` | string | oui |  |  |
| `with_title_en` | string | oui |  |  |
| `with_title_fr` | string | oui |  |  |
| `without_items` | array | oui |  | min:2 max:6 |
| `without_label_en` | string | oui |  |  |
| `without_label_fr` | string | oui |  |  |
| `without_title_en` | string | oui |  |  |
| `without_title_fr` | string | oui |  |  |

**Tokens** : `--accent-rgb` `--accent-text` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-sm` `--shadow-paper-lift` `--space-1` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .comparison-duo .comparison-duo__badge .comparison-duo__badge--with .comparison-duo__badge--without .comparison-duo__card .comparison-duo__card--with .comparison-duo__card-header .comparison-duo__card-title .comparison-duo__card-title--with .comparison-duo__glyph .comparison-duo__grid .comparison-duo__header .comparison-duo__item .comparison-duo__item--with .comparison-duo__item--without .comparison-duo__list

**Dette hardcode** : 5 valeur(s) — 0.14em, 10px, 1px, 2px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-3 --space-4. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-mono --font-sans. Dette : 5 litteral(s) hardcode(s) (0.14em, 10px, 1px).

---

### `comparison-pricing-callout`

> Bloc « pourquoi nous » en trois colonnes de propositions de valeur, terminé par un CTA et une mention. Sert de pont entre les features et la page tarifaire.
> ComparisonPricingCallout · src/components/sections/ComparisonPricingCallout.astro · marketing/comparison-sections
> status : stable · tags : bridge, callout, comparison, pricing, value-prop

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `columns` | array | oui |  | min:2 max:4 |
| `cta_href` | string | non |  |  |
| `cta_label_en` | string | non |  |  |
| `cta_label_fr` | string | non |  |  |
| `cta_note_en` | string | non |  |  |
| `cta_note_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--font-mono` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-body` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-3` `--space-4` `--space-5` `--space-6` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .cmp-callout .cmp-callout__bridge .cmp-callout__col .cmp-callout__col-body .cmp-callout__col-title .cmp-callout__cols .cmp-callout__glyph .cmp-callout__header .cmp-callout__note

**Dette hardcode** : 2 valeur(s) — 1px, 860px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 860px).

---

### `comparison-table`

> Tableau comparatif pour clarifier les différences entre offres, options ou approches.
> ComparisonTable · src/components/sections/ComparisonTable.astro · marketing/comparison-sections
> status : stable · tags : comparison, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `column_headers_en` | array | oui |  | min:2 |
| `column_headers_fr` | array | oui |  | min:2 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `rows` | array | oui |  | min:2 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--dur-fast` `--ease-out` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .comparison-table .comparison-table__bool .comparison-table__bool--no .comparison-table__bool--yes .comparison-table__cell .comparison-table__feature .comparison-table__wrap .pcm .pcm__body .pcm__btn .pcm__cell .pcm__cell--featured .pcm__col-feature .pcm__col-plan .pcm__col-plan--featured .pcm__feature .pcm__feature-label .pcm__glyph .pcm__glyph--no .pcm__glyph--yes .pcm__group .pcm__header .pcm__plan-cta .pcm__plan-name .pcm__plan-note .pcm__plan-price .pcm__row .pcm__scroll .pcm__table .pcm__value .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 12 valeur(s) — -1px, .14em, 100%, 14px, 180px, 1px, 200px, 2px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-1px, .14em, 100%).

---

### `department-stack`

> Stack outils en table éditoriale : en-tête eyebrow et titre display, aside Callout, EditorialTable catégorie/outil/rôle.
> EditorialTableBlock · src/components/sections/EditorialTableBlock.astro · marketing/comparison-sections
> status : stable · tags : editorial, solutions, stack, table, tools

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `columns_en` | array | oui |  | min:2 max:4 |
| `columns_fr` | array | oui |  | min:2 max:4 |
| `eyebrow_en` | string | non | § Tool stack |  |
| `eyebrow_fr` | string | non | § Stack outils |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `rows` | array | oui |  | min:1 max:12 |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` `--space-9` `--text-h1` `--text-small`

**Classes scoped** : .astro .callout .ed-table .ed-table-block .ed-table-block-h2 .ed-table-block-kicker .ed-table-caption .ed-table-editorial .ed-table-figure .ed-table-td .ed-table-th .ed-table-tr .eyebrow .section-eyebrow .sol-aside .sol-sec .sol-sec-hd .sol-sec-paper .sol-stack-grid .sol-tools .tech-aside .tech-models-table-wrap .tech-sec .tech-sec-hd .tech-sec-paper .wrap

**Tailwind** : col-12 col-aside col-prose

**Dette hardcode** : 8 valeur(s) — -0.018em, 1240px, 1px, 28px, 480px, 600px, 760px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.018em, 1240px, 1px).

---

### `editorial-table-block`

> Comparateur éditorial : en-tête kicker mono et titre display, puis tableau EditorialTable bilingue (colonnes, lignes, caption).
> EditorialTableBlock · src/components/sections/EditorialTableBlock.astro · marketing/comparison-sections
> status : stable · tags : comparator, comparison, editorial, rows, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `columns_en` | array | oui |  | min:2 max:6 |
| `columns_fr` | array | oui |  | min:2 max:6 |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `rows_en` | array | oui |  | min:2 max:6 |
| `rows_fr` | array | oui |  | min:2 max:6 |
| `variant` | enum | non | editorial | default | compact | editorial |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` `--space-9` `--text-h1` `--text-small`

**Classes scoped** : .astro .callout .ed-table .ed-table-block .ed-table-block-h2 .ed-table-block-kicker .ed-table-caption .ed-table-editorial .ed-table-figure .ed-table-td .ed-table-th .ed-table-tr .eyebrow .section-eyebrow .sol-aside .sol-sec .sol-sec-hd .sol-sec-paper .sol-stack-grid .sol-tools .tech-aside .tech-models-table-wrap .tech-sec .tech-sec-hd .tech-sec-paper .wrap

**Tailwind** : col-12 col-aside col-prose

**Dette hardcode** : 8 valeur(s) — -0.018em, 1240px, 1px, 28px, 480px, 600px, 760px, 800px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.018em, 1240px, 1px).

---

### `fit-columns`

> Section de qualification fit/no-fit sur fond ink : kicker, titre display, intro callout et deux colonnes Oui/Non d items.
> FitColumnsSection · src/components/sections/FitColumnsSection.astro · marketing/comparison-sections
> status : stable · tags : fit, ink, qualification, two-columns, yes-no

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `no_items_en` | array | oui |  | min:1 max:8 |
| `no_items_fr` | array | oui |  | min:1 max:8 |
| `no_title_en` | string | oui |  |  |
| `no_title_fr` | string | oui |  |  |
| `yes_items_en` | array | oui |  | min:1 max:8 |
| `yes_items_fr` | array | oui |  | min:1 max:8 |
| `yes_title_en` | string | oui |  |  |
| `yes_title_fr` | string | oui |  |  |

**Tokens** : `--dur-hover` `--dur-trim` `--ease` `--font-sans` `--fw-medium` `--hairline` `--ink` `--ink-rgb` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-6` `--space-9` `--text-h1`

**Classes scoped** : .astro .callout .callout-body .fit-col .fit-col-no .fit-k-muted .fit-sec .fit-sec-callout .fit-sec-cols .fit-sec-h2 .fit-sec-kicker .hub-fit

**Dette hardcode** : 5 valeur(s) — -0.028em, -2px, 1px, 60px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-6 --space-9. Couleur : --ink --ink-rgb --muted. Typographie : --font-sans --fw-medium. Dette : 5 litteral(s) hardcode(s) (-0.028em, -2px, 1px).

---

### `tech-models-table`

> Table de comparaison des modèles en cinq colonnes (Modèle, Profil, Coût, Contexte, Usages) basée sur EditorialTable.
> EditorialTableBlock · src/components/sections/EditorialTableBlock.astro · marketing/comparison-sections
> status : stable · tags : comparison, editorial, models, table, technologies

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `models` | array | oui |  | min:1 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` `--space-9` `--text-h1` `--text-small`

**Classes scoped** : .astro .callout .ed-table .ed-table-block .ed-table-block-h2 .ed-table-block-kicker .ed-table-caption .ed-table-editorial .ed-table-figure .ed-table-td .ed-table-th .ed-table-tr .eyebrow .section-eyebrow .sol-aside .sol-sec .sol-sec-hd .sol-sec-paper .sol-stack-grid .sol-tools .tech-aside .tech-models-table-wrap .tech-sec .tech-sec-hd .tech-sec-paper .wrap

**Tailwind** : col-12 col-aside col-prose

**Dette hardcode** : 8 valeur(s) — -0.018em, 1240px, 1px, 28px, 480px, 600px, 760px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.018em, 1240px, 1px).

---

### `tech-when-dual`

> Aide décision en deux colonnes (utiliser quand / considérer autre chose quand) avec puces mono plus et moins.
> TechWhenDual · src/components/sections/TechWhenDual.astro · marketing/comparison-sections
> status : stable · tags : decision, dual, pros-cons, technologies, when

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `avoid_items_en` | array | oui |  | min:1 max:10 |
| `avoid_items_fr` | array | oui |  | min:1 max:10 |
| `avoid_title_en` | string | oui |  |  |
| `avoid_title_fr` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |
| `use_items_en` | array | oui |  | min:1 max:10 |
| `use_items_fr` | array | oui |  | min:1 max:10 |
| `use_title_en` | string | oui |  |  |
| `use_title_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--gut` `--hairline` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-2` `--space-9` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .astro .tech-aside .tech-sec .tech-sec-hd .tech-when-col--avoid .tech-when-col--use .tech-when-dual .tech-when-kicker .tech-when-list .tech-when-list--avoid .tech-when-list--use .wrap

**Dette hardcode** : 8 valeur(s) — -0.018em, 1240px, 18px, 1px, 20px, 28px, 480px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-9. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-0.018em, 1240px, 18px).

---

### `versus-competitors`

> Comparatif « nous vs alternatives » avec colonne « nous » mise en avant, lignes de critères groupées et cellules check / cross / partiel. Distinct de la matrice tarifaire interne.
> VersusCompetitors · src/components/sections/VersusCompetitors.astro · marketing/comparison-sections
> status : stable · tags : comparison, competitors, highlight, table, versus

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `columns` | array | oui |  | min:2 max:5 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `rows` | array | oui |  | min:3 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline` `--ink` `--ink-rgb` `--leading-h2` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-card` `--section-base` `--space-3` `--space-4` `--space-5` `--space-8` `--text-body` `--text-h1` `--text-small` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .versus .versus__cell .versus__colhead .versus__corner .versus__feature .versus__group .versus__h2 .versus__head .versus__icon .versus__icon--no .versus__icon--yes .versus__kicker .versus__row .versus__scroll .versus__table .versus__text

**Dette hardcode** : 5 valeur(s) — -0.02em, 100%, 1px, 34%, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-mono --font-sans. Dette : 5 litteral(s) hardcode(s) (-0.02em, 100%, 1px).

---

### `workflow-table`

> Table workflows signature en 5 colonnes (numéro, workflow, modèle, gain, comment), un workflow IA par ligne.
> WorkflowTable · src/components/sections/WorkflowTable.astro · marketing/comparison-sections
> status : stable · tags : comparison, editorial, solutions, table, workflows

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `eyebrow_en` | string | non | § Workflows |  |
| `eyebrow_fr` | string | non | § Workflows |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `workflows` | array | oui |  | min:1 max:8 |

**Tokens** : `--accent-rgb` `--accent-text` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-8` `--text-h1` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .callout .eyebrow .section-eyebrow .sol-aside .sol-sec .sol-sec-hd .sol-sec-paper .sol-workflow-body .sol-workflow-head .sol-workflow-table .sol-workflows .wf-gain .wf-how .wf-k .wf-model .wf-n .wf-name .wf-row

**Tailwind** : col-12 col-aside col-prose

**Dette hardcode** : 12 valeur(s) — -0.018em, 1000px, 16px, 1px, 20px, 24px, 32px, 480px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-0.018em, 1000px, 16px).

---

## Contact Sections

### `booking-embed`

> Section de prise de rendez-vous intégrant le widget Cal.com (CalEmbed) avec une copy de réassurance, pour réserver un audit ou un appel.
> BookingEmbed · src/components/sections/BookingEmbed.astro · marketing/contact-sections
> status : stable · tags : booking, cal, contact, conversion, embed, meeting, rdv

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `cal_event_type` | string | non |  |  |
| `cal_namespace` | string | non |  |  |
| `cal_username` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `reassurance` | array | non |  | min:1 max:4 |

**Tokens** : `--accent-text` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-base` `--space-10` `--space-3` `--space-4` `--space-8` `--text-body` `--text-small`

**Classes scoped** : .booking-embed .booking-embed__body .booking-embed__check .booking-embed__grid .booking-embed__intro .booking-embed__reassurance .booking-embed__widget

**Dette hardcode** : 2 valeur(s) — 1px, 900px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 900px).

---

### `contact-form`

> Section contact avec formulaire (nom, email, message) et colonne coordonnées, action vers /api/contact, bilingue.
> ContactForm · src/components/sections/ContactForm.astro · marketing/contact-sections
> status : stable · tags : contact, email, form, lead, message, name

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `details` | array | non |  |  |
| `email_label_en` | string | non | Email |  |
| `email_label_fr` | string | non | Email |  |
| `form_action` | string | non | /api/contact |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `hint_en` | string | non |  |  |
| `hint_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `message_label_en` | string | non | Message |  |
| `message_label_fr` | string | non | Message |  |
| `name_label_en` | string | non | Name |  |
| `name_label_fr` | string | non | Nom |  |
| `submit_label_en` | string | non | Send → |  |
| `submit_label_fr` | string | non | Envoyer → |  |

**Tokens** : `--accent-text` `--dur-fast` `--dur-trim` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-base` `--radius-sm` `--space-10` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body` `--text-small` `--tracking-mono-tight`

**Classes scoped** : .contact-form .contact-form__body .contact-form__btn .contact-form__confirm .contact-form__detail .contact-form__details .contact-form__error .contact-form__field .contact-form__form .contact-form__grid .contact-form__hint .contact-form__input .contact-form__input--error .contact-form__intro .contact-form__textarea .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 10 valeur(s) — -1px, 0.06em, 0.1em, 100%, 110px, 1px, 2px, 3px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 10 litteral(s) hardcode(s) (-1px, 0.06em, 0.1em).

---

## Content Listing Sections

### `article-grid`

> Grille de cartes d’articles/blog : image optionnelle, tag, titre, date, temps de lecture, extrait, auteur et lien, en 2 ou 3 colonnes. Le classique éditorial B2B.
> ArticleGrid · src/components/sections/ArticleGrid.astro · marketing/content-listing-sections
> status : stable · tags : articles, blog, cards, editorial, grid, listing

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `articles` | array | oui |  | min:2 max:12 |
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `columns` | enum | non | 3 | 2 | 3 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--dur-hover` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline` `--ink` `--ink-2` `--ink-3` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-card` `--section-base` `--shadow-lift` `--space-1` `--space-3` `--space-6` `--space-9` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .acc .article-card .article-card__author .article-card__body .article-card__excerpt .article-card__media .article-card__meta .article-card__tag .article-card__title .article-grid .article-grid__h2 .article-grid__hd .article-grid__intro .article-grid__list

**Dette hardcode** : 9 valeur(s) — -0.01em, -0.02em, -4px, 100%, 1px, 2px, 640px, 760px

**Agent** : Layout : `background`, `columns` (schema, 0 CSS). Espacement : --space-1 --space-3 --space-6. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-0.01em, -0.02em, -4px).

---

### `resource-card-grid`

> Grille de ressources téléchargeables : type (livre blanc, cookbook, outil), titre, description, format, badge gated et CTA, en 2 ou 3 colonnes.
> ResourceCardGrid · src/components/sections/ResourceCardGrid.astro · marketing/content-listing-sections
> status : stable · tags : cards, cta, downloads, grid, lead-magnet, resources

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `columns` | enum | non | 3 | 2 | 3 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `resources` | array | oui |  | min:2 max:9 |

**Tokens** : `--accent` `--accent-text` `--dur-hover` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline` `--ink` `--ink-2` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-card` `--radius-pill` `--section-base` `--shadow-lift` `--space-3` `--space-4` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .acc .resource-card .resource-card__cta .resource-card__desc .resource-card__foot .resource-card__format .resource-card__gated .resource-card__title .resource-card__top .resource-grid .resource-grid__h2 .resource-grid__hd .resource-grid__intro .resource-grid__list

**Dette hardcode** : 8 valeur(s) — -0.01em, -0.02em, -4px, 1px, 2px, 640px, 760px, 980px

**Agent** : Layout : `background`, `columns` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-6. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-0.01em, -0.02em, -4px).

---

## CTA Sections

### `branded-callout`

> Callout de marque fond paper-2 avec kicker §, titre display italique et corps de deux paragraphes, CTA optionnel.
> BrandedCallout · src/components/sections/BrandedCallout.astro · marketing/cta-sections
> status : stable · tags : brand, callout, os, paper-2

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body1_en` | string | oui |  |  |
| `body1_fr` | string | oui |  |  |
| `body2_en` | string | non |  |  |
| `body2_fr` | string | non |  |  |
| `cta` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-3` `--space-5` `--space-9` `--text-body` `--text-h2`

**Classes scoped** : .branded-callout .branded-callout__body1 .branded-callout__body2 .branded-callout__box .branded-callout__cta .branded-callout__h2 .branded-callout__kicker

**Dette hardcode** : 6 valeur(s) — -0.022em, 18px, 1px, 20px, 640px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-5 --space-9. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 6 litteral(s) hardcode(s) (-0.022em, 18px, 1px).

---

### `cta-band`

> Bandeau CTA horizontal pour relancer une action au milieu ou en fin de parcours.
> CtaBandSection · src/components/sections/CtaBandSection.astro · marketing/cta-sections
> status : stable · tags : band, cta, inline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper-2 | paper-2 | paper-3 | ink | accent |
| `cta` | object | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-sans` `--hairline` `--ink` `--leading-body` `--paper` `--paper-2` `--paper-3` `--space-4` `--space-5` `--text-body` `--text-small`

**Classes scoped** : .astro .cta-band .cta-band__inner .cta-band__text .cta-inline .cta-inline__text

**Dette hardcode** : 3 valeur(s) — 1px, 200px, 20px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5. Couleur : --accent --ink --paper. Typographie : --font-sans --leading-body. Dette : 3 litteral(s) hardcode(s) (1px, 200px, 20px).

---

### `cta-final`

> CTA final pour conclure une page et orienter vers l'action de conversion principale.
> CtaFinal · src/components/sections/CtaFinal.astro · marketing/cta-sections
> status : stable · tags : conversion, cta, final

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `availability_en` | string | non |  |  |
| `availability_fr` | string | non |  |  |
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink | accent |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `chapter_num` | string | non |  |  |
| `chapter_title_en` | string | non |  |  |
| `chapter_title_fr` | string | non |  |  |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `reassurance_en` | string | non |  |  |
| `reassurance_fr` | string | non |  |  |

**Tokens** : `--accent` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--gut` `--hairline` `--ink` `--leading-body` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--section-base` `--section-tight` `--space-10` `--space-3` `--space-4` `--space-6` `--space-9` `--spacing-block` `--text-h1` `--text-h3` `--text-small` `--tracking-body` `--tracking-mono`

**Classes scoped** : .astro .btn-accent .btn-light .cta-final .cta-final__avail .cta-final__chapter .cta-final__ctas .cta-final__inner .cta-final__sub .sol-cta .sol-cta-body .sol-cta-btns .sol-cta-final .sol-sec .sol-sec-dark .wrap .wrap-tight

**Dette hardcode** : 8 valeur(s) — -2px, 1240px, 14px, 1px, 28px, 540px, 560px, 880px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-2px, 1240px, 14px).

---

### `cta-form-inline`

> Bande CTA avec mini-formulaire inline (email et bouton), pour capter un lead ou une inscription newsletter à l'instant d'intention.
> CtaFormInline · src/components/sections/CtaFormInline.astro · marketing/cta-sections
> status : stable · tags : capture, cta, email, form, inline, lead, newsletter

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper-2 | paper | paper-2 | paper-3 | ink | accent |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `form_action` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `hint_en` | string | non |  |  |
| `hint_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `placeholder_en` | string | non | your@email.com |  |
| `placeholder_fr` | string | non | votre@email.com |  |
| `submit_label_en` | string | non | Sign up → |  |
| `submit_label_fr` | string | non | S'inscrire → |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--dur-trim` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-sm` `--section-base` `--space-10` `--space-3` `--space-4` `--space-5` `--space-7` `--text-body` `--text-small`

**Classes scoped** : .cta-form .cta-form__body .cta-form__btn .cta-form__confirm .cta-form__error .cta-form__form .cta-form__hint .cta-form__inner .cta-form__input .cta-form__input--error .cta-form__row .cta-form__text .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 8 valeur(s) — -1px, 0.01em, 0.06em, 10px, 1px, 200px, 2px, 860px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --accent --accent-text --ink. Typographie : --font-mono --font-sans. Dette : 8 litteral(s) hardcode(s) (-1px, 0.01em, 0.06em).

---

### `cta-inline`

> CTA inline discret pour insérer une action contextuelle dans un contenu existant.
> CtaBandSection · src/components/sections/CtaBandSection.astro · marketing/cta-sections
> status : stable · tags : cta, inline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink | accent |
| `cta` | object | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-sans` `--hairline` `--ink` `--leading-body` `--paper` `--paper-2` `--paper-3` `--space-4` `--space-5` `--text-body` `--text-small`

**Classes scoped** : .astro .cta-band .cta-band__inner .cta-band__text .cta-inline .cta-inline__text

**Dette hardcode** : 3 valeur(s) — 1px, 200px, 20px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5. Couleur : --accent --ink --paper. Typographie : --font-sans --leading-body. Dette : 3 litteral(s) hardcode(s) (1px, 200px, 20px).

---

### `cta-split-visual`

> Bandeau CTA asymetrique 2 colonnes : texte kicker/titre/body/boutons a gauche, visuel SVG decoratif a droite. Distinct des CTA centres.
> CtaSplitVisual · src/components/sections/CtaSplitVisual.astro · marketing/cta-sections
> status : stable · tags : banner, cta, split, visual

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper-2 | paper | paper-2 | paper-3 | ink | accent |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-sans` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--section-base` `--space-1` `--space-10` `--space-3` `--space-5` `--space-8` `--text-body`

**Classes scoped** : .cta-split .cta-split__body .cta-split__ctas .cta-split__inner .cta-split__kicker .cta-split__svg .cta-split__text .cta-split__visual

**Dette hardcode** : 5 valeur(s) — 100%, 1px, 240px, 320px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-3. Couleur : --accent --ink --muted. Typographie : --font-sans --leading-body. Dette : 5 litteral(s) hardcode(s) (100%, 1px, 240px).

---

### `department-cta`

> Clôture CTA sur fond ink : Dingbat, titre display italique, body et deux boutons (rendez-vous + lien secondaire).
> CtaFinal · src/components/sections/CtaFinal.astro · marketing/cta-sections
> status : stable · tags : closing, conversion, cta, dark, solutions

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `body_en` | string | oui |  |  |
| `body_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `primary_href` | string | non | /contact |  |
| `primary_label_en` | string | non | Book a call → |  |
| `primary_label_fr` | string | non | Prendre rendez-vous → |  |
| `secondary_href` | string | non | /solutions |  |
| `secondary_label_en` | string | non | All solutions |  |
| `secondary_label_fr` | string | non | Toutes les solutions |  |

**Tokens** : `--accent` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--gut` `--hairline` `--ink` `--leading-body` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--section-base` `--section-tight` `--space-10` `--space-3` `--space-4` `--space-6` `--space-9` `--spacing-block` `--text-h1` `--text-h3` `--text-small` `--tracking-body` `--tracking-mono`

**Classes scoped** : .astro .btn-accent .btn-light .cta-final .cta-final__avail .cta-final__chapter .cta-final__ctas .cta-final__inner .cta-final__sub .sol-cta .sol-cta-body .sol-cta-btns .sol-cta-final .sol-sec .sol-sec-dark .wrap .wrap-tight

**Dette hardcode** : 8 valeur(s) — -2px, 1240px, 14px, 1px, 28px, 540px, 560px, 880px

**Agent** : Espacement : --space-10 --space-3 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-2px, 1240px, 14px).

---

### `footer-cta-band`

> Bande CTA finale pleine largeur (titre, sous-titre, un à deux boutons), pensée comme le climax juste avant le footer. Sombre par défaut pour trancher avec la page.
> FooterCtaBand · src/components/sections/FooterCtaBand.astro · marketing/cta-sections
> status : stable · tags : band, conversion, cta, full-bleed, pre-footer

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink |
| `buttons` | array | oui |  | min:1 max:2 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `rounded` | boolean | non |  |  |
| `subtitle_en` | string | non |  |  |
| `subtitle_fr` | string | non |  |  |

**Tokens** : `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-h2` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-band` `--section-grand` `--space-10` `--space-3` `--space-4` `--space-6` `--space-7` `--text-body` `--text-h1`

**Classes scoped** : .footer-cta .footer-cta__actions .footer-cta__copy .footer-cta__inner .footer-cta__subtitle .footer-cta--rounded

**Dette hardcode** : 3 valeur(s) — 1px, 860px, clamp(var(--space-6)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --ink --muted --paper. Typographie : --font-sans --fw-medium. Dette : 3 litteral(s) hardcode(s) (1px, 860px, clamp(var(--space-6)).

---

### `newsletter-band`

> Bande newsletter fond sombre : titre éditorial large à gauche, formulaire capture email à droite.
> NewsletterBand · src/components/sections/NewsletterBand.astro · marketing/cta-sections
> status : stable · tags : band, capture, dark, email, newsletter

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_label_en` | string | non | Subscribe → |  |
| `cta_label_fr` | string | non | S'abonner → |  |
| `form_action` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `hint_en` | string | non |  |  |
| `hint_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lead_en` | string | non |  |  |
| `lead_fr` | string | non |  |  |
| `placeholder_en` | string | non | your@email.com |  |
| `placeholder_fr` | string | non | votre@email.com |  |

**Tokens** : `--accent` `--accent-text` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline-strong` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-4` `--text-body` `--text-h1` `--text-small` `--tracking-mono-tight`

**Classes scoped** : .newsletter-band .newsletter-band__btn .newsletter-band__field .newsletter-band__h2 .newsletter-band__hint .newsletter-band__inner .newsletter-band__input .newsletter-band__kicker .newsletter-band__lead

**Tailwind** : sr-only

**Dette hardcode** : 10 valeur(s) — -0.024em, 0.06em, 10px, 14px, 18px, 1px, 22px, 400px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-4. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 10 litteral(s) hardcode(s) (-0.024em, 0.06em, 10px).

---

## FAQ Sections

### `faq-accordion`

> FAQ en accordéon pour répondre aux questions fréquentes sans surcharger la page.
> FaqAccordion · src/components/sections/FaqAccordion.astro · marketing/faq-sections
> status : stable · tags : accordion, faq

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `open_first` | boolean | non |  |  |

**Tokens** : `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-4` `--space-5` `--spacing-block` `--text-body` `--text-h3` `--text-small`

**Classes scoped** : .faq-accordion .faq-accordion__a .faq-accordion__arrow .faq-accordion__header .faq-accordion__intro .faq-accordion__item .faq-accordion__q .faq-accordion__q-label

**Dette hardcode** : 4 valeur(s) — 1px, 20px, 2px, 56px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5 --spacing-block. Couleur : --ink --muted --paper. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (1px, 20px, 2px).

---

### `faq-cta-aside`

> FAQ en accordéon à gauche et panneau de réassurance avec CTA collant à droite, pour transformer une FAQ passive en capture de lead.
> FaqCtaAside · src/components/sections/FaqCtaAside.astro · marketing/faq-sections
> status : stable · tags : accordion, aside, conversion, cta, faq, lead, sticky

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_body_en` | string | non |  |  |
| `aside_body_fr` | string | non |  |  |
| `aside_cta` | object | oui |  |  |
| `aside_note_en` | string | non |  |  |
| `aside_note_fr` | string | non |  |  |
| `aside_title_en` | string | oui |  |  |
| `aside_title_fr` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `open_first` | boolean | non |  |  |

**Tokens** : `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-base` `--space-10` `--space-4` `--space-5` `--space-7` `--space-8` `--text-body` `--text-h3` `--text-small`

**Classes scoped** : .faq-cta .faq-cta__a .faq-cta__arrow .faq-cta__aside .faq-cta__card .faq-cta__card-body .faq-cta__card-note .faq-cta__card-title .faq-cta__grid .faq-cta__header .faq-cta__item .faq-cta__q .faq-cta__q-label

**Dette hardcode** : 5 valeur(s) — 0.06em, 1px, 2px, 56px, 900px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-4 --space-5. Couleur : --ink --muted --paper. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (0.06em, 1px, 2px).

---

### `faq-two-column`

> FAQ en deux colonnes statiques (question en gras, réponse en dessous), sans accordéon. Pensée pour le scan rapide quand toutes les réponses doivent être visibles d’emblée.
> FaqTwoColumn · src/components/sections/FaqTwoColumn.astro · marketing/faq-sections
> status : stable · tags : faq, questions, scan, static, two-column

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:12 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-12` `--space-2` `--space-4` `--space-5` `--space-6` `--space-8` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .faq-two-col .faq-two-col__a .faq-two-col__grid .faq-two-col__header .faq-two-col__item .faq-two-col__q

**Dette hardcode** : 3 valeur(s) — 1px, 760px, clamp(var(--space-8)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-12 --space-2 --space-4. Couleur : --ink --muted --paper. Typographie : --font-sans --fw-semibold. Dette : 3 litteral(s) hardcode(s) (1px, 760px, clamp(var(--space-8)).

---

### `objection-handler`

> Bloc de traitement des objections pour lever les freins et rassurer avant conversion.
> ObjectionHandler · src/components/sections/ObjectionHandler.astro · marketing/faq-sections
> status : stable · tags : faq, objections, reassurance

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `objections` | array | oui |  | min:2 |

**Tokens** : `--font-display` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-3` `--space-5` `--space-6` `--spacing-block` `--text-body` `--text-h2` `--text-h3`

**Classes scoped** : .objection-handler .objection-handler__list .objection-handler__objection .objection-handler__response .objection-handler__row .objection-handler__table-head

**Dette hardcode** : 2 valeur(s) — 1px, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-5 --space-6. Couleur : --ink --muted --paper. Typographie : --font-display --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 640px).

---

## Feature Sections

### `architecture-diagram`

> Diagramme d'architecture signature : N canaux d'entrée vers un système central et M sorties, avec boucle d'amélioration continue.
> ArchitectureDiagram · src/components/sections/ArchitectureDiagram.astro · marketing/feature-sections
> status : stable · tags : architecture, diagram, svg, system

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | oui |  |  |
| `caption_fr` | string | oui |  |  |
| `fig_num` | string | oui |  |  |
| `fig_title_en` | string | oui |  |  |
| `fig_title_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `input_examples_en` | array | non |  |  |
| `input_examples_fr` | array | non |  |  |
| `inputs_en` | array | oui |  | min:2 max:8 |
| `inputs_fr` | array | oui |  | min:2 max:8 |
| `loop_label_en` | string | oui |  |  |
| `loop_label_fr` | string | oui |  |  |
| `outputs_en` | array | oui |  | min:2 max:6 |
| `outputs_fr` | array | oui |  | min:2 max:6 |
| `show_loop` | boolean | non | true |  |
| `spec_en` | string | oui |  |  |
| `spec_fr` | string | oui |  |  |
| `system_kicker` | string | oui |  |  |
| `system_label` | string | oui |  |  |
| `system_subtitle` | string | oui |  |  |

**Tokens** : `--accent` `--accent-rgb` `--dur-fast` `--dur-reveal` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--ink-2` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-6` `--space-7` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--wrap-prose`

**Classes scoped** : .css .in .is-visible .reveal-fade .sysarch .sysarch-cap .sysarch-fig .sysarch-flow .sysarch-h2 .sysarch-hd .sysarch-loop .sysarch-node .sysarch-spec .sysarch-svg

**Dette hardcode** : 10 valeur(s) — 0.1em, 100%, 10px, 14px, 1px, 240px, 320px, 700px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-6 --space-7. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 10 litteral(s) hardcode(s) (0.1em, 100%, 10px).

---

### `bento-grid`

> Mosaique bento asymetrique de 5 cellules (1 grande 2x2 + 4 petites) pour valoriser les capacites cles avec une mise en page moderne.
> BentoGrid · src/components/sections/BentoGrid.astro · marketing/feature-sections
> status : stable · tags : asymmetric, bento, feature, grid

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cells` | array | oui |  | min:5 max:5 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--dur-hover` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-xs` `--shadow-card-hover` `--space-1` `--space-3` `--space-4` `--space-5` `--space-7` `--space-9` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .bento-grid .bento-grid__body .bento-grid__cell .bento-grid__cell--1 .bento-grid__cell--2 .bento-grid__cell--3 .bento-grid__cell--4 .bento-grid__cell--5 .bento-grid__glyph .bento-grid__header .bento-grid__mosaic .bento-grid__title

**Dette hardcode** : 5 valeur(s) — -2px, 1023px, 1px, 760px, 761px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 5 litteral(s) hardcode(s) (-2px, 1023px, 1px).

---

### `coming-soon-pills`

> Bande teaser fond paper-2 avec kicker, H2 et liste de pills pour éléments à venir.
> ComingSoonPills · src/components/sections/ComingSoonPills.astro · marketing/feature-sections
> status : stable · tags : coming-soon, pills, sectors, teaser

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aria_label_en` | string | oui |  |  |
| `aria_label_fr` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `pills_en` | array | oui |  | min:1 max:16 |
| `pills_fr` | array | oui |  | min:1 max:16 |

**Tokens** : `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--section-loose` `--space-2` `--space-6` `--space-9` `--text-h2` `--text-small`

**Classes scoped** : .coming-h2 .coming-list .coming-pill .hub-coming

**Dette hardcode** : 6 valeur(s) — -0.022em, 0.1em, 10px, 18px, 1px, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-6 --space-9. Couleur : --ink --muted --paper. Typographie : --font-mono --font-sans. Dette : 6 litteral(s) hardcode(s) (-0.022em, 0.1em, 10px).

---

### `commitments-grid`

> Grille hairline de 2 à 6 engagements ou garanties, titre display et corps sans, extrait de la page Méthode.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : commitments, grid, guarantees, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `commitments` | array | oui |  | min:2 max:6 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--font-serif` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--problems-grid-cols` `--radius-xs` `--section-base` `--section-loose` `--space-1` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 18 valeur(s) — -.01em, -0.018em, -1px, -2px, .06em, .08em, 10px, 1200px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-2. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-.01em, -0.018em, -1px).

---

### `decision-list`

> Arbre de décision : en-tête kicker et titre display à gauche, liste ordonnée numérotée d items à droite, hairlines fines.
> DecisionList · src/components/sections/DecisionList.astro · marketing/feature-sections
> status : stable · tags : decision, editorial, guide, list, numbered

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `items` | array | oui |  | min:1 max:12 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-4` `--space-6` `--space-9` `--text-body` `--text-h2` `--text-small` `--tracking-mono`

**Classes scoped** : .astro .decision-list .decision-list-grid .decision-list-h2 .decision-list-item .decision-list-kicker .decision-list-num .decision-list-ol

**Dette hardcode** : 4 valeur(s) — 18px, 1px, 280px, 48px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-6 --space-9. Couleur : --accent-text --ink --paper. Typographie : --font-mono --font-sans. Dette : 4 litteral(s) hardcode(s) (18px, 1px, 280px).

---

### `deliverables-grid`

> Grille de livrables tangibles avec cards numérotées et tag format/durée, extraite des pages offre et détail.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : cards, deliverables, grid, offer

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `items` | array | oui |  | min:2 max:8 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lead_en` | string | non |  |  |
| `lead_fr` | string | non |  |  |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--font-serif` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--problems-grid-cols` `--radius-xs` `--section-base` `--section-loose` `--space-1` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 18 valeur(s) — -.01em, -0.018em, -1px, -2px, .06em, .08em, 10px, 1200px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-2. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-.01em, -0.018em, -1px).

---

### `editorial-preview`

> Index éditorial de publications en lignes numérotées (num · date · tag · titre italique · flèche), extrait de FieldNotes.
> EditorialPreview · src/components/sections/EditorialPreview.astro · marketing/feature-sections
> status : stable · tags : blog, editorial, numbered, preview, rows

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `act_label_en` | string | non |  |  |
| `act_label_fr` | string | non |  |  |
| `all_href` | string | non |  |  |
| `all_label_en` | string | non |  |  |
| `all_label_fr` | string | non |  |  |
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:8 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `roman` | string | non |  |  |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--dur-fast` `--dur-hover` `--dur-trim` `--ease` `--font-display` `--font-mono` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-5` `--space-6` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .aside .css .notes-foot .notes-foot-link .notes-index .notes-row .notes-row-arr .notes-row-date .notes-row-num .notes-row-tag .notes-row-text .sec .sec-hd

**Dette hardcode** : 14 valeur(s) — -0.015em, 0.14em, 0.1em, 110px, 12px, 1px, 2px, 32px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-5 --space-6. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 14 litteral(s) hardcode(s) (-0.015em, 0.14em, 0.1em).

---

### `editorial-split-grid`

> Split éditorial deux colonnes pour lister blog et livres blancs, chacun avec cartes connexes et CTA.
> EditorialSplitGrid · src/components/sections/EditorialSplitGrid.astro · marketing/feature-sections
> status : stable · tags : blog, editorial, resources, whitepapers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `left` | literal | oui |  | min:1 max:3 |
| `right` | literal | oui |  | min:1 max:3 |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-6` `--text-h2` `--text-small`

**Classes scoped** : .hub-blog-cta .hub-blog-h2 .hub-blog-k .hub-blog-lb .hub-blog-lb-grid .hub-blog-lead .hub-lb-cta .hub-lb-h2 .hub-lb-k .hub-lb-lead .related-card .related-go .related-k .related-lead

**Dette hardcode** : 6 valeur(s) — -0.022em, 14px, 18px, 1px, 28px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-6. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 6 litteral(s) hardcode(s) (-0.022em, 14px, 18px).

---

### `feature-accordion`

> Features en progressive disclosure : accordéon natif <details>, chaque item ouvre un détail explicatif et une métadonnée optionnelle. Premier item ouvrable par défaut.
> FeatureAccordion · src/components/sections/FeatureAccordion.astro · marketing/feature-sections
> status : stable · tags : accordion, details, feature, progressive-disclosure, saas

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:8 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `open_first` | boolean | non | false |  |

**Tokens** : `--accent-text` `--dur-fast` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-3` `--space-4` `--space-5` `--space-9` `--spacing-block` `--text-body` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .fa .fa__a .fa__arrow .fa__body .fa__header .fa__item .fa__lede .fa__meta .fa__q .fa__q-label .fa__q-title

**Dette hardcode** : 2 valeur(s) — 1px, 700px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 700px).

---

### `feature-comparison-grid`

> Différenciation légère « nous vs eux » en grille de cartes : 2 ou 3 colonnes, lignes cochées ou barrées, colonne mise en avant. Plus léger que la table comparative.
> FeatureComparisonGrid · src/components/sections/FeatureComparisonGrid.astro · marketing/feature-sections
> status : stable · tags : comparison, differentiation, feature, grid, us-vs-them

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `columns` | array | oui |  | min:1 max:10 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--c` `--font-display` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--shadow-card-rest` `--space-3` `--space-4` `--space-5` `--space-7` `--spacing-block` `--text-body` `--text-h3` `--text-small`

**Classes scoped** : .fcg .fcg__col .fcg__col-label .fcg__grid .fcg__header .fcg__lede .fcg__mark .fcg__row .fcg__rows .is-highlighted .is-in .is-out

**Dette hardcode** : 2 valeur(s) — 1px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 760px).

---

### `feature-grid`

> Grille de fonctionnalités pour structurer les bénéfices ou capacités principales d'une offre.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : features, grid

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `columns` | enum | non | 3 | 2 | 3 | 4 |
| `features` | array | oui |  | min:3 max:8 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--font-serif` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--problems-grid-cols` `--radius-xs` `--section-base` `--section-loose` `--space-1` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 18 valeur(s) — -.01em, -0.018em, -1px, -2px, .06em, .08em, 10px, 1200px

**Agent** : Layout : `background`, `columns` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-2. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-.01em, -0.018em, -1px).

---

### `feature-split-media`

> Une feature majeure exposée en deux colonnes : texte et points clés d’un côté, mockup ou capture de l’autre. Le champ reversed permet d’alterner les côtés au fil de la page.
> FeatureSplitMedia · src/components/sections/FeatureSplitMedia.astro · marketing/feature-sections
> status : stable · tags : feature, media, mockup, reversed, split

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body_en` | string | oui |  |  |
| `body_fr` | string | oui |  |  |
| `cta_href` | string | non |  |  |
| `cta_label_en` | string | non |  |  |
| `cta_label_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `media_alt_en` | string | non |  |  |
| `media_alt_fr` | string | non |  |  |
| `media_caption_en` | string | non |  |  |
| `media_caption_fr` | string | non |  |  |
| `media_src` | string | non |  |  |
| `points` | array | non |  | max:6 |
| `reversed` | boolean | non | false |  |

**Tokens** : `--accent` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--leading-h3` `--leading-prose` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--radius-sm` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-7` `--space-8` `--text-body` `--text-h2` `--text-small` `--tracking-mono`

**Classes scoped** : .feature-split .feature-split__body .feature-split__copy .feature-split__cta .feature-split__frame .feature-split__grid .feature-split__media .feature-split__placeholder .feature-split__points

**Dette hardcode** : 7 valeur(s) — 0.55em, 100%, 14px, 1px, 860px, 8px, clamp(var(--space-8)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-12 --space-2 --space-3. Couleur : --accent --ink --muted. Typographie : --font-mono --font-sans. Dette : 7 litteral(s) hardcode(s) (0.55em, 100%, 14px).

---

### `feature-tabs`

> Section fonctionnalites en onglets cliquables : barre de tabs aria-compliant + panneau texte/visuel. Interactif vanilla JS, 0 dependance.
> FeatureTabs · src/components/sections/FeatureTabs.astro · marketing/feature-sections
> status : stable · tags : feature, interactive, tabbed, tabs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `tabs` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-rgb` `--accent-text` `--dur-trim` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--ink-rgb` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .feature-tabs .feature-tabs__header .feature-tabs__intro .feature-tabs__panel .feature-tabs__panel-content .feature-tabs__panel-text .feature-tabs__panel-visual .feature-tabs__tab .feature-tabs__tab-icon .feature-tabs__tab-label .feature-tabs__tablist .feature-tabs__visual-box .feature-tabs__visual-label .is-active

**Dette hardcode** : 12 valeur(s) — -1px, 100%, 120%, 14px, 18%, 1px, 2px, 60%

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-mono --font-sans. Dette : 12 litteral(s) hardcode(s) (-1px, 100%, 120%).

---

### `feature-zigzag`

> Lignes alternées visuel/texte (gauche-droite, droite-gauche) pour presenter les fonctionnalites cles d'une offre avec un rythme editorial fort.
> FeatureZigzag · src/components/sections/FeatureZigzag.astro · marketing/feature-sections
> status : stable · tags : alternating, feature, rows, zigzag

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `rows` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-lg` `--radius-md` `--space-10` `--space-2` `--space-4` `--space-7` `--space-9` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .fz .fz__header .fz__lede .fz__link .fz__row .fz__rows .fz__svg .fz__text .fz__visual

**Dette hardcode** : 14 valeur(s) — 100%, 120%, 14px, 16%, 1px, 3px, 60%, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-4. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-sans --fw-medium. Dette : 14 litteral(s) hardcode(s) (100%, 120%, 14px).

---

### `guarantee-block`

> Bloc garantie pour expliciter les engagements, réduire le risque perçu et rassurer.
> GuaranteeBlock · src/components/sections/GuaranteeBlock.astro · marketing/feature-sections
> status : stable · tags : guarantee, reassurance, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `guarantees` | array | oui |  | min:1 max:4 |

**Tokens** : `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-1` `--space-2` `--space-5` `--text-body` `--text-h3`

**Classes scoped** : .guarantee-block .guarantee-block__content .guarantee-block__item .guarantee-block__list .guarantee-block__num .guarantee-block__title

**Dette hardcode** : 3 valeur(s) — 1px, 56px, 600px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-5. Couleur : --ink --muted --paper. Typographie : --font-sans --fw-medium. Dette : 3 litteral(s) hardcode(s) (1px, 56px, 600px).

---

### `icon-trio`

> Trois colonnes iconographiques avec titre et description, séparées par des hairlines verticaux. Idéal pour présenter 3 piliers ou bénéfices distincts.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : columns, feature, icons, trio

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `items` | array | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--font-serif` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--problems-grid-cols` `--radius-xs` `--section-base` `--section-loose` `--space-1` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 18 valeur(s) — -.01em, -0.018em, -1px, -2px, .06em, .08em, 10px, 1200px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-2. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-.01em, -0.018em, -1px).

---

### `inclusions-list`

> Liste d'inclusions inline séparée par point médian pour expliciter le périmètre d'un engagement.
> InclusionsList · src/components/sections/InclusionsList.astro · marketing/feature-sections
> status : stable · tags : inclusions, inline-list, offer, scope

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `items_en` | array | oui |  | min:2 max:16 |
| `items_fr` | array | oui |  | min:2 max:16 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `title_en` | string | non |  |  |
| `title_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--inclusions-list-pad` `--ink` `--leading-body` `--leading-h3` `--paper` `--paper-2` `--paper-3` `--section-loose` `--space-10` `--space-2` `--space-4` `--space-5` `--space-6` `--space-7` `--text-body` `--text-h2` `--text-small` `--tracking-display`

**Classes scoped** : .inclusions-list .inclusions-list__hd .inclusions-list__items .inclusions-list__kicker .inclusions-list__title

**Dette hardcode** : 4 valeur(s) — 1px, clamp(var(--space-5), clamp(var(--space-7), clamp(var(--text-small)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-4. Couleur : --accent-text --ink --paper. Typographie : --font-mono --font-sans. Dette : 4 litteral(s) hardcode(s) (1px, clamp(var(--space-5), clamp(var(--space-7)).

---

### `manifesto-block`

> Bloc manifeste intercalary : kicker mono § + grand bloc display italique sans box, span accent terracotta, respiration éditoriale forte.
> ManifestoBlock · src/components/sections/ManifestoBlock.astro · marketing/feature-sections
> status : stable · tags : editorial, italic, large-display, manifesto, statement

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--fw-regular` `--ink` `--paper` `--paper-2` `--paper-3` `--section-grand` `--space-5` `--text-h1`

**Classes scoped** : .acc .manifesto-block .manifesto-block__kicker .manifesto-block__text .wrap-wide

**Dette hardcode** : 3 valeur(s) — -0.02em, 1200px, 1300px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-5. Couleur : --accent-text --ink --paper. Typographie : --font-display --fw-regular. Dette : 3 litteral(s) hardcode(s) (-0.02em, 1200px, 1300px).

---

### `offer-tier-grid`

> Section de palier d’offres avec eyebrow, H2, lede, grille de cartes et variante hero sombre optionnelle.
> OfferTierGrid · src/components/sections/OfferTierGrid.astro · marketing/feature-sections
> status : stable · tags : cards, offers, pricing, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `eyebrow_en` | string | oui |  |  |
| `eyebrow_fr` | string | oui |  |  |
| `featured_card` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `lede_max_width` | string | non |  |  |
| `offers` | array | oui |  | min:1 max:6 |
| `variant` | enum | non | standard | standard | featured | transparent |
| `wrap` | boolean | non | true |  |

**Tokens** : `--accent` `--accent-sur-sombre` `--accent-text` `--dur-fast` `--dur-hover` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--leading-h1` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .card-cta .card-lead .card-price .card-title .hero-card .hero-card-cta .hero-card-eyebrow .hero-card-lead .hero-card-sub .hero-card-title .offer-card .offer-card--transparent .tier-eyebrow .tier-grid .tier-h2 .tier-ii .tier-ii-grid .tier-iii-grid .tier-lede .tier-section .wrap-wide

**Dette hardcode** : 15 valeur(s) — -0.024em, -0.02em, -0.03em, -2px, -3px, 0.14em, 0.1em, 14px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-6 --space-7 --space-9. Couleur : --accent --accent-sur-sombre --accent-text. Typographie : --font-display --font-mono. Dette : 15 litteral(s) hardcode(s) (-0.024em, -0.02em, -0.03em).

---

### `operating-layer`

> Section couche opérationnelle fond sombre : chapter label + h2 + lede + CTA, console terminal mockup à droite, strip 4 attributs en pied.
> OperatingLayer · src/components/sections/OperatingLayer.astro · marketing/feature-sections
> status : stable · tags : attributes, console, dark, mockup, platform, terminal

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `attrs` | array | oui |  |  |
| `chapter_num` | string | oui |  |  |
| `chapter_title_en` | string | oui |  |  |
| `chapter_title_fr` | string | oui |  |  |
| `console_cmd` | string | oui |  |  |
| `console_lines` | array | oui |  | min:2 max:8 |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `spec_label` | string | oui |  |  |
| `terminal_label` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--ink` `--paper` `--paper-rgb` `--radius-md` `--section-grand` `--space-10` `--space-11` `--space-2` `--space-3` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--text-display` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono`

**Classes scoped** : .operating-layer .operating-layer__attr-k .operating-layer__attr-v .operating-layer__attrs .operating-layer__console-body .operating-layer__console-cmd .operating-layer__console-k .operating-layer__console-row .operating-layer__console-v .operating-layer__ctas .operating-layer__grid .operating-layer__h2 .operating-layer__hd .operating-layer__lede .operating-layer__spec .wrap-wide

**Dette hardcode** : 11 valeur(s) — .1em, 10px, 1200px, 140px, 14px, 1px, 20px, 30px

**Agent** : Espacement : --space-10 --space-11 --space-2. Couleur : --accent-text --ink --paper. Typographie : --font-display --font-mono. Dette : 11 litteral(s) hardcode(s) (.1em, 10px, 1200px).

---

### `pain-points`

> Points de friction métier : en-tête eyebrow et titre display, aside Callout, frise Timeline numérotée des frictions.
> PainPoints · src/components/sections/PainPoints.astro · marketing/feature-sections
> status : stable · tags : editorial, friction, pain-points, solutions, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `eyebrow_en` | string | non | § Friction |  |
| `eyebrow_fr` | string | non | § Friction |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-2` `--space-3` `--space-4` `--space-6` `--spacing-block` `--text-body` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .callout .eyebrow .pain-card .pk .pn .section-eyebrow .sol-aside .sol-friction .sol-pain-grid .sol-sec .sol-sec-hd .timeline- .timeline-body .timeline-meta .timeline-num .timeline-title .timeline-vertical

**Tailwind** : col-12 col-aside col-prose

**Dette hardcode** : 5 valeur(s) — -0.018em, 0.1em, 1px, 480px, 96px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (-0.018em, 0.1em, 1px).

---

### `persona-attributes-grid`

> Grille persona 2×2 pain points / critères / objections / preuves avec footer méta sombre en trois colonnes.
> PersonaAttributesGrid · src/components/sections/PersonaAttributesGrid.astro · marketing/feature-sections
> status : stable · tags : attributes, grid, meta, persona

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `blocks` | array | oui |  | min:1 |
| `meta` | array | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--gut` `--hairline` `--ink` `--ink-2` `--leading-body` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--text-h3` `--text-small` `--wrap-wide`

**Classes scoped** : .persona-detail__block .persona-detail__grid .persona-detail__meta .persona-kicker .persona-kicker--dark

**Dette hardcode** : 3 valeur(s) — 1px, 6px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-sans. Dette : 3 litteral(s) hardcode(s) (1px, 6px, 768px).

---

### `problem-statement`

> Énoncé macro-typographique du problème avec stats optionnelles en grille hairline.
> ProblemStatement · src/components/sections/ProblemStatement.astro · marketing/feature-sections
> status : stable · tags : macro-typography, metrics, problem, statement

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `dropcap` | boolean | non |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `statement_en` | string | oui |  |  |
| `statement_fr` | string | oui |  |  |
| `stats` | array | non |  | max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h2` `--muted` `--paper` `--paper-2` `--paper-3` `--problem-statement-cols` `--problem-statement-pad` `--section-loose` `--space-12` `--space-2` `--space-5` `--space-6` `--space-8` `--text-h1` `--text-h2` `--text-small` `--tracking-display` `--tracking-mono`

**Classes scoped** : .drop-cap .problem-statement .problem-statement__kicker .problem-statement__label .problem-statement__stat .problem-statement__statement--dropcap .problem-statement__stats .problem-statement__text .problem-statement__value

**Dette hardcode** : 7 valeur(s) — -0.015em, 0.16em, 1100px, 1px, 800px, clamp(var(--space-8), clamp(var(--text-h2)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-12 --space-2 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (-0.015em, 0.16em, 1100px).

---

### `problems-grid`

> Grille de problèmes/frictions auto-fit (3 cards min) : num + kicker + h3 + body, séparateurs hairline 1px.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : cards, frictions, grid, numbered, problems

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `problems` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-text` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--font-serif` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-prose` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--problems-grid-cols` `--radius-xs` `--section-base` `--section-loose` `--space-1` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 18 valeur(s) — -.01em, -0.018em, -1px, -2px, .06em, .08em, 10px, 1200px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-2. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-.01em, -0.018em, -1px).

---

### `related-cards-band`

> Bande de trois cards connexes pour relier cas, offres ou ressources en fin de page.
> RelatedCardsBand · src/components/sections/RelatedCardsBand.astro · marketing/feature-sections
> status : stable · tags : cards, editorial, navigation, related

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cards` | array | oui |  | min:2 max:3 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--dur-hover` `--dur-trim` `--ease` `--hairline-strong` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--related-cards-band-inline` `--related-cards-band-pad` `--section-loose` `--space-6`

**Classes scoped** : .related-card .related-cards-band .related-cards-band__grid .related-cards-band__kicker .related-go .related-k .related-lead .related-title

**Dette hardcode** : 2 valeur(s) — -2px, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-6. Couleur : --accent-text --ink --muted. Dette : 2 litteral(s) hardcode(s) (-2px, 1px).

---

### `service-catalog-list`

> Liste-catalogue éditoriale de services en lignes (§ numéro, titre display, description, méta durée, flèche) avec footer CTA optionnel.
> ServiceCatalogList · src/components/sections/ServiceCatalogList.astro · marketing/feature-sections
> status : stable · tags : catalog, editorial, list, rows, services

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `footer_href` | string | non |  |  |
| `footer_label_en` | string | non |  |  |
| `footer_label_fr` | string | non |  |  |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `label_en` | string | oui |  |  |
| `label_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |
| `roman` | string | oui |  |  |
| `services` | array | oui |  | min:2 max:8 |

**Tokens** : `--accent-text` `--dur-hover` `--dur-trim` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-2` `--space-5` `--space-6` `--space-7` `--text-body` `--text-h2` `--text-small` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .aside .astro .dept-sector .sec .sec-hd .svc-arr .svc-cat-footer .svc-cat-list .svc-cat-sec .svc-desc .svc-meta .svc-num .svc-row .svc-title

**Dette hardcode** : 17 valeur(s) — -0.022em, -2px, .14em, 0.1em, 100%, 10px, 110px, 12px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-5 --space-6. Couleur : --accent-text --ink --ink-2. Typographie : --font-mono --font-sans. Dette : 17 litteral(s) hardcode(s) (-0.022em, -2px, .14em).

---

### `services-grid`

> Grille éditoriale de services 3×2 avec figure, métrique, body et ligne de connecteurs en pied de cellule.
> ServicesGrid · src/components/sections/ServicesGrid.astro · marketing/feature-sections
> status : stable · tags : connectors, grid, metrics, services

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `connectors_label_en` | string | non | Connectors |  |
| `connectors_label_fr` | string | non | Connecteurs |  |
| `fig_num` | string | oui |  |  |
| `fig_title_en` | string | oui |  |  |
| `fig_title_fr` | string | oui |  |  |
| `foot_links` | array | non |  | max:3 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `services` | array | oui |  | min:3 max:6 |
| `spec_en` | string | oui |  |  |
| `spec_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--dur-fast` `--dur-hover` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-base` `--space-1` `--space-2` `--space-3` `--space-4` `--space-6` `--space-7` `--space-8` `--spacing-block` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .services-grid .services-grid__cell .services-grid__cell-arr .services-grid__cell-body .services-grid__cell-fig .services-grid__cell-foot .services-grid__cell-foot-key .services-grid__cell-foot-val .services-grid__cell-head .services-grid__cell-metric .services-grid__cell-rule .services-grid__cell-title .services-grid__cell-uc .services-grid__chapter .services-grid__dot .services-grid__foot .services-grid__foot-link .services-grid__grid .services-grid__h2 .services-grid__hd .services-grid__num .services-grid__sep .services-grid__spec

**Dette hardcode** : 22 valeur(s) — -0.02em, -1px, -2px, 0.04em, 0.14em, 0.1em, 10px, 14px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-mono --font-sans. Dette : 22 litteral(s) hardcode(s) (-0.02em, -1px, -2px).

---

### `tech-capabilities-specs`

> Inventaire technique en table spec (capacité, description, statut) avec en-tête kicker et aside.
> TechCapabilitiesSpecs · src/components/sections/TechCapabilitiesSpecs.astro · marketing/feature-sections
> status : stable · tags : capabilities, editorial, specs, table, technologies

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `capabilities` | array | oui |  | min:1 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--dur-fast` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-rgb` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-2` `--space-5` `--space-9` `--text-h1` `--text-small` `--tracking-mono` `--tracking-mono-tight`

**Classes scoped** : .astro .tech-aside .tech-cap-table-wrap .tech-sec .tech-sec-hd .tt-spec-desc .tt-spec-name .tt-spec-status .tt-specs .wrap

**Dette hardcode** : 11 valeur(s) — -0.018em, 10%, 100%, 1240px, 14px, 1px, 20px, 22%

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-5. Couleur : --accent-text --ink --ink-rgb. Typographie : --font-display --font-mono. Dette : 11 litteral(s) hardcode(s) (-0.018em, 10%, 100%).

---

### `tech-positioning-split`

> Prise de position technologique en split 50/50 : kicker, titre display, aside, statement manifesto et facts mono clé/valeur.
> TechPositioningSplit · src/components/sections/TechPositioningSplit.astro · marketing/feature-sections
> status : stable · tags : editorial, manifesto, positioning, split, technologies

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `facts` | array | non |  | max:6 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `statement_en` | string | oui |  |  |
| `statement_fr` | string | oui |  |  |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--hairline-strong` `--ink` `--ink-rgb` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-1` `--space-10` `--space-2` `--space-4` `--space-5` `--space-8` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .astro .callout .fact .fact-k .fact-v .tech-aside .tech-pos-facts .tech-pos-right .tech-pos-split .tech-pos-statement .tech-pos-title .tech-positioning .tech-sec .tech-sec-paper .wrap

**Dette hardcode** : 12 valeur(s) — -0.012em, -0.02em, 0.1em, 100%, 1240px, 140px, 18px, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-2. Couleur : --accent-text --ink --ink-rgb. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-0.012em, -0.02em, 0.1em).

---

### `tech-stack-band`

> Bande stack technologique fond paper-2 avec kicker, lead et rangée de pills techniques.
> TechStackBand · src/components/sections/TechStackBand.astro · marketing/feature-sections
> status : stable · tags : pills, stack, technology, tools

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lead_en` | string | non |  |  |
| `lead_fr` | string | non |  |  |
| `pills` | array | oui |  | min:2 max:16 |

**Tokens** : `--accent-text` `--font-display` `--hairline` `--ink` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-4` `--space-6` `--space-8` `--tech-stack-band-inline` `--tech-stack-band-pad` `--text-h2` `--text-h3`

**Classes scoped** : .tech-pill .tech-stack-band .tech-stack-band__kicker .tech-stack-band__lead

**Dette hardcode** : 4 valeur(s) — 1px, 760px, clamp(var(--space-6), clamp(var(--text-h3)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-6 --space-8. Couleur : --accent-text --ink --muted. Typographie : --font-display --leading-h3. Dette : 4 litteral(s) hardcode(s) (1px, 760px, clamp(var(--space-6)).

---

### `use-case-index`

> Index éditorial de cas d'usage en lignes numérotées avec libellé italique, tag mono et lien d'ancrage solution.
> UseCaseIndex · src/components/sections/UseCaseIndex.astro · marketing/feature-sections
> status : stable · tags : editorial, index, rows, use-case

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `footer_href` | string | non |  |  |
| `footer_label_en` | string | non |  |  |
| `footer_label_fr` | string | non |  |  |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:8 |
| `label_en` | string | oui |  |  |
| `label_fr` | string | oui |  |  |
| `num_prefix_en` | string | non | USE CASE |  |
| `num_prefix_fr` | string | non | USE CASE |  |
| `roman` | string | oui |  |  |

**Tokens** : `--accent-rgb` `--accent-text` `--dur-fast` `--dur-hover` `--dur-trim` `--ease` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-4` `--space-5` `--space-6` `--space-7` `--text-body` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .aside .css .dept-index .dept-row .dept-row-arr .dept-row-label .dept-row-num .dept-row-num-prefix .dept-row-tag .dept-sector .sec .sec-hd

**Dette hardcode** : 15 valeur(s) — -0.018em, .14em, .16em, 100%, 12px, 1px, 28px, 32px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5 --space-6. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-mono --font-sans. Dette : 15 litteral(s) hardcode(s) (-0.018em, .14em, .16em).

---

### `why-stalls`

> Section éditoriale "pourquoi X cale" : chapter label sticky à gauche + N FIG rows à droite avec row-lines.
> WhyStalls · src/components/sections/WhyStalls.astro · marketing/feature-sections
> status : stable · tags : editorial, figures, stalls, sticky, why

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_lead_en` | string | oui |  |  |
| `aside_lead_fr` | string | oui |  |  |
| `chapter_num` | string | oui |  |  |
| `chapter_title_en` | string | oui |  |  |
| `chapter_title_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `rows` | array | oui |  | min:2 max:8 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--muted` `--section-grand` `--section-loose` `--space-10` `--space-12` `--space-2` `--space-5` `--space-7` `--space-8` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .acc .why-stalls .why-stalls__aside .why-stalls__fig .why-stalls__grid .why-stalls__h2 .why-stalls__lead .why-stalls__row .why-stalls__row-text .wrap-wide

**Tailwind** : row-lines

**Dette hardcode** : 11 valeur(s) — -0.01em, -0.02em, 1200px, 1px, 20px, 22px, 240px, 280px

**Agent** : Espacement : --space-10 --space-12 --space-2. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 11 litteral(s) hardcode(s) (-0.01em, -0.02em, 1200px).

---

## Gallery Sections

### `gallery-masonry`

> Galerie editoriale en colonnes CSS (masonry naturel) avec legende au hover par overlay. Hauteurs variees, responsive 3 colonnes -> 2 -> 1.
> GalleryMasonry · src/components/sections/GalleryMasonry.astro · marketing/gallery-sections
> status : stable · tags : editorial, gallery, images, masonry

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `items` | array | oui |  | min:3 max:12 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--dur-base` `--dur-reveal` `--ease` `--font-sans` `--fw-medium` `--hairline` `--ink` `--ink-rgb` `--leading-body` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-md` `--space-1` `--space-3` `--space-4` `--space-5` `--spacing-block` `--text-body` `--text-h3` `--text-small`

**Classes scoped** : .gallery-masonry .gallery-masonry__caption .gallery-masonry__caption-body .gallery-masonry__caption-title .gallery-masonry__grid .gallery-masonry__header .gallery-masonry__intro .gallery-masonry__item .gallery-masonry__media .gallery-masonry__placeholder .gallery-masonry__tag

**Dette hardcode** : 10 valeur(s) — 0%, 100%, 133%, 1px, 50%, 540px, 56%, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-3 --space-4. Couleur : --ink --ink-rgb --muted. Typographie : --font-sans --fw-medium. Dette : 10 litteral(s) hardcode(s) (0%, 100%, 133%).

---

### `media-block`

> Bloc média pour intégrer une image, une vidéo ou un contenu embarqué dans une page marketing.
> MediaBlock · src/components/sections/MediaBlock.astro · marketing/gallery-sections
> status : stable · tags : embed, image, media, video

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `alt_en` | string | non |  |  |
| `alt_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `display` | enum | non |  | full | inset |
| `height` | number | non |  |  |
| `media_kind` | enum | oui |  | image | svg | video | embed |
| `src` | string | oui |  |  |
| `width` | number | non |  |  |

**Tokens** : `--font-sans` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--section-base` `--space-4` `--text-small` `--wrap-prose`

**Classes scoped** : .media-block .media-block__caption .media-block__embed .media-block__img .media-block__svg-wrap .media-block__video

**Dette hardcode** : 2 valeur(s) — 100%, 1px

**Agent** : Layout : `background`, `display`, `media_kind` (schema, 0 CSS). Espacement : --space-4. Couleur : --ink --muted --paper. Typographie : --font-sans --leading-body. Dette : 2 litteral(s) hardcode(s) (100%, 1px).

---

## Hero Header Sections

### `hero-academy-hub`

> Hero hub académie : kicker mono, h1 display, lede et bande de stats mono (cours, parcours, alumni).
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : academy, hero, school, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `stats_label_en` | string | non |  |  |
| `stats_label_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-atlas`

> Hero Atlas en deux colonnes avec signature grid, copy éditoriale, CTAs et mini-map des quatre piliers.
> HeroAtlas · src/components/sections/HeroAtlas.astro · marketing/hero-header-sections
> status : stable · tags : atlas, hero, map, pillars

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lead_en` | string | oui |  |  |
| `lead_fr` | string | oui |  |  |
| `map_aria_label_en` | string | oui |  |  |
| `map_aria_label_fr` | string | oui |  |  |
| `map_kicker_en` | string | oui |  |  |
| `map_kicker_fr` | string | oui |  |  |
| `pillars` | array | oui |  |  |
| `subhead_en` | string | oui |  |  |
| `subhead_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--leading-h3` `--leading-lede` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-base` `--space-1` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-h1` `--text-h3` `--text-small` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose` `--wrap-read`

**Classes scoped** : .amm-content .amm-deliverable .amm-desc .amm-dot .amm-item .amm-kicker .amm-label .amm-list .amm-num .atlas-mini-map .hero-atlas .hero-atlas-ctas .hero-atlas-inner .hero-atlas-lead .hero-atlas-subhead .hero-atlas-title .kick .kick-dot .signature-grid

**Dette hardcode** : 18 valeur(s) — -0.01em, -0.03em, .16em, .18em, 10px, 1500px, 1px, 25%

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-2. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-0.01em, -0.03em, .16em).

---

### `hero-author`

> Hero de page auteur : 2-col copy/portrait, breadcrumb équipe, role eyebrow, h1 split prénom+nom italic accent, lede display.
> HeroSplit · src/components/sections/HeroSplit.astro · marketing/hero-header-sections
> status : stable · tags : author, hero, portrait, profile

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `name` | string | oui |  |  |
| `name_accent` | string | oui |  |  |
| `name_lead` | string | oui |  |  |
| `role_en` | string | oui |  |  |
| `role_fr` | string | oui |  |  |
| `team_href` | string | non |  |  |
| `team_label_en` | string | non |  |  |
| `team_label_fr` | string | non |  |  |

**Tokens** : `--accent-rgb` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--ink-rgb` `--leading-h2` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--radius-pill` `--radius-sm` `--sec-grid` `--sec-pad` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-display` `--text-h1` `--text-h3` `--text-lede` `--text-small` `--tracking-display` `--tracking-mono` `--wrap`

**Classes scoped** : .author-hero .author-portrait .css .g12 .g12--full .hero-author .hero-author__bc .hero-author__copy .hero-author__eyebrow .hero-author__h1 .hero-author__lede .hero-author__portrait .hero-author__portrait-frame .hero-lead-magnet .hero-lead-magnet__cover .hero-lead-magnet__download .hero-lead-magnet__download-label .hero-lead-magnet__grid .hero-lead-magnet__h1 .hero-lead-magnet__kicker .hero-lead-magnet__lede .hero-lead-magnet__meta .hero-lead-magnet__panel .hero-split .hero-split__ctas .hero-split__inner .hero-split__left .hero-split__meta .hero-split__right .hero-split__right-inner .start-9 .wrap-wide

**Dette hardcode** : 29 valeur(s) — -0.03em, -8px, 0.1em, 100%, 120%, 1200px, 12px, 140px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-display --font-mono. Dette : 29 litteral(s) hardcode(s) (-0.03em, -8px, 0.1em).

---

### `hero-case-study`

> Hero d'étude de cas avec décor géométrique, titre et barre de spécifications (client, secteur, durée).
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : case-study, decoration, hero, specs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `case_num` | string | oui |  |  |
| `eyebrow_en` | string | non | § Case study |  |
| `eyebrow_fr` | string | non | § Cas client |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `specs` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-centered`

> Hero centré pour poser une proposition de valeur claire et guider vers une action principale.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : centered, cta, hero

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-conversion-funnel`

> Hero magnétique flagship : kicker num + h1 monumental, lede, meta pills, benefits checklist, ligne preuve mono, double CTA et grille stats 4-col.
> HeroHubStats · src/components/sections/HeroHubStats.astro · marketing/hero-header-sections
> status : stable · tags : benefits, conversion, flagship, funnel, hero, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `benefits` | array | non |  | max:8 |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `funnel_num` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_pills` | array | non |  | max:6 |
| `proof_en` | string | non |  |  |
| `proof_fr` | string | non |  |  |
| `stats` | array | non |  | max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-mono-tight` `--viewport-h` `--wrap-wide`

**Classes scoped** : .astro .hero-conversion-funnel .hero-conversion-funnel__benefits .hero-conversion-funnel__cta .hero-conversion-funnel__h1 .hero-conversion-funnel__lede .hero-conversion-funnel__meta .hero-conversion-funnel__num .hero-conversion-funnel__proof .hero-conversion-funnel__stat--lead .hero-conversion-funnel__stat-label .hero-conversion-funnel__stat-value .hero-conversion-funnel__stats .hero-hub-stats .hero-hub-stats__cell .hero-hub-stats__cell--accent .hero-hub-stats__cell--lead .hero-hub-stats__grid .hero-hub-stats__h1 .hero-hub-stats__label .hero-hub-stats__lede .hero-hub-stats__meta .hero-hub-stats__num .hero-hub-stats__value .hero-pillar-hub .hero-pillar-hub__h1 .hero-pillar-hub__lede .hero-pillar-hub__meta .hero-pillar-hub__num .hero-pillar-hub__stats .key-metric .key-metric-accent .key-metric-value .wrap-wide

**Dette hardcode** : 23 valeur(s) — -0.035em, 0.1em, 0.7em, 100%, 10px, 11px, 1200px, 18px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 23 litteral(s) hardcode(s) (-0.035em, 0.1em, 0.7em).

---

### `hero-course`

> Hero de page cours/formation : kicker accent + title + lede + meta-pills (niveau/durée/format/prix) + cta-group primary/ghost.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : course, hero, meta, pills, training

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `pills` | array | oui |  | min:1 max:8 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |
| `type_label_en` | string | oui |  |  |
| `type_label_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-detail-menu`

> Hero d'entrée de menu détail : kicker parent + numéro § accent + h1 + lede sobre, idéal pour sous-pages catalogue.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : detail, hero, menu, nested

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `detail_num` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `parent_kicker_en` | string | oui |  |  |
| `parent_kicker_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-essay`

> Hero d'article éditorial avec accroche italique et métadonnées auteur, date et temps de lecture.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : editorial, essay, hero, meta

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `author` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `date` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hero_image` | string | non |  |  |
| `hero_image_alt_en` | string | non |  |  |
| `hero_image_alt_fr` | string | non |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `reading_time_en` | string | non |  |  |
| `reading_time_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-form-inline`

> Hero de capture lead above-the-fold : promesse à gauche, formulaire email/CTA à droite postant sur /api/newsletter, points de réassurance optionnels.
> HeroFormInline · src/components/sections/HeroFormInline.astro · marketing/hero-header-sections
> status : stable · tags : above-fold, capture, form, hero, lead, newsletter

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `form_title_en` | string | oui |  |  |
| `form_title_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `proof` | array | non |  | max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-regular` `--fw-semibold` `--hairline` `--header-height` `--ink` `--ink-rgb` `--leading-h2` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-base` `--section-base` `--space-10` `--space-3` `--space-5` `--spacing-block` `--text-body` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .hero-form-inline .hero-form-inline__copy .hero-form-inline__grid .hero-form-inline__h1 .hero-form-inline__lede .hero-form-inline__panel .hero-form-inline__panel-label .hero-form-inline__proof .hero-form-inline__proof-mark

**Dette hardcode** : 2 valeur(s) — 1px, 880px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-5. Couleur : --accent-text --ink --ink-rgb. Typographie : --font-display --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 880px).

---

### `hero-full-bleed`

> Hero immersif plein écran pour créer un impact visuel fort avec mouvement ou canvas.
> HeroFullBleed · src/components/sections/HeroFullBleed.astro · marketing/hero-header-sections
> status : stable · tags : canvas, full-bleed, hero, motion

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background_kind` | enum | oui |  | liquid-canvas | gradient-mesh | signature-grid | ink-paper |
| `cta_primary` | object | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |

**Tokens** : `--font-display` `--font-sans` `--hairline` `--header-height` `--ink` `--leading-h1` `--leading-relaxed` `--paper` `--paper-rgb` `--section-loose` `--spacing-block` `--text-display` `--text-h3`

**Classes scoped** : .hero-fb .hero-fb__inner

**Dette hardcode** : 1 valeur(s) — 1px

**Agent** : Layout : `background_kind` (schema, 0 CSS). Espacement : --spacing-block. Couleur : --ink --paper --paper-rgb. Typographie : --font-display --font-sans. Dette : 1 litteral(s) hardcode(s) (1px).

---

### `hero-home`

> Hero d'accueil Waimia : mini-map 3×2 de 6 territoires opérationnels, 3 preuves verticales, double CTA et signature géométrique V·9.
> HeroHome · src/components/sections/HeroHome.astro · marketing/hero-header-sections
> status : stable · tags : hero, home, minimap, proofs, signature

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta_href` | string | non |  |  |
| `cta_primary_en` | string | oui |  |  |
| `cta_primary_fr` | string | oui |  |  |
| `cta_secondary_en` | string | oui |  |  |
| `cta_secondary_fr` | string | oui |  |  |
| `cta_sub_en` | string | oui |  |  |
| `cta_sub_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `minimap` | array | oui |  |  |
| `offer_href` | string | non |  |  |
| `proofs` | array | oui |  |  |

**Tokens** : `--accent-text` `--dur-base` `--dur-fast` `--dur-hover` `--dur-panel` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-lede` `--section-base` `--section-loose` `--space-1` `--space-10` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-h1` `--text-lede` `--text-small` `--tracking-display` `--wrap-wide`

**Classes scoped** : .acc .hero-home .hero-home__cta-sub .hero-home__ctas .hero-home__fig .hero-home__headline .hero-home__lede .hero-home__minimap .hero-home__mm-item .hero-home__mm-items .hero-home__mm-label .hero-home__proof .hero-home__proof-label .hero-home__proof-num .hero-home__proofs .hero-home__sub .hero-sig-mark .signature-grid .wrap-wide

**Dette hardcode** : 17 valeur(s) — -0.025em, -0.02em, 0.005em, 0.14em, 100%, 110px, 1px, 440px

**Agent** : Espacement : --space-1 --space-10 --space-3. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 17 litteral(s) hardcode(s) (-0.025em, -0.02em, 0.005em).

---

### `hero-hub-listing`

> (déprécié → hero-hub-masthead variant=listing) Hero éditorial de hub avec titre monumental et lede courte, sans appel à l'action, pour pages de listing.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : deprecated · tags : editorial, hero, hub, listing

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `decoration` | boolean | non | false |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-hub-masthead`

> Masthead unifié paramétrable (variant hub|listing|detail) : absorbe hero-hub-listing et hero-utility-masthead. hub = kicker mono + h1 italique display + lede court ; listing = deco SVG optionnelle + h1 monumental + lede révélée ; detail = kicker optionnel + h1 + lede display italique, alignement gauche ou centré.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, index, masthead, unified, variant

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `align` | enum | non | left | left | centered |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `decoration` | boolean | non | false |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `role_en` | string | non |  |  |
| `role_fr` | string | non |  |  |
| `scale` | enum | non |  | monumental | standard |
| `transition_id` | string | non |  |  |
| `variant` | enum | non | hub | hub | listing | detail |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `align`, `background`, `scale`, `variant` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-hub-stats`

> Hero hub avec stats : meta kicker double + numéro § accent + h1 maximal, lede, grille KeyMetric 4-col en pied avec accent.
> HeroHubStats · src/components/sections/HeroHubStats.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, masthead, pillar, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hub_num` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_kicker_en` | string | oui |  |  |
| `meta_kicker_fr` | string | oui |  |  |
| `stats` | array | non |  | min:2 max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-mono-tight` `--viewport-h` `--wrap-wide`

**Classes scoped** : .astro .hero-conversion-funnel .hero-conversion-funnel__benefits .hero-conversion-funnel__cta .hero-conversion-funnel__h1 .hero-conversion-funnel__lede .hero-conversion-funnel__meta .hero-conversion-funnel__num .hero-conversion-funnel__proof .hero-conversion-funnel__stat--lead .hero-conversion-funnel__stat-label .hero-conversion-funnel__stat-value .hero-conversion-funnel__stats .hero-hub-stats .hero-hub-stats__cell .hero-hub-stats__cell--accent .hero-hub-stats__cell--lead .hero-hub-stats__grid .hero-hub-stats__h1 .hero-hub-stats__label .hero-hub-stats__lede .hero-hub-stats__meta .hero-hub-stats__num .hero-hub-stats__value .hero-pillar-hub .hero-pillar-hub__h1 .hero-pillar-hub__lede .hero-pillar-hub__meta .hero-pillar-hub__num .hero-pillar-hub__stats .key-metric .key-metric-accent .key-metric-value .wrap-wide

**Dette hardcode** : 23 valeur(s) — -0.035em, 0.1em, 0.7em, 100%, 10px, 11px, 1200px, 18px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 23 litteral(s) hardcode(s) (-0.035em, 0.1em, 0.7em).

---

### `hero-landing`

> Hero magnétique landing : eyebrow mono, h1 italique avec emphasis, lede, double CTA et bandeau de disponibilité.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : cta, hero, landing, magnetic

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `availability_en` | string | non |  |  |
| `availability_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `eyebrow_en` | string | oui |  |  |
| `eyebrow_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-lead-magnet`

> Hero lead magnet (livre blanc) : 2-col texte/cover PDF, kicker + h1 + lede italique, meta format/date, carte download CTA.
> HeroSplit · src/components/sections/HeroSplit.astro · marketing/hero-header-sections
> status : stable · tags : cover, download, hero, lead-magnet, whitepaper

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cover_url` | string | non |  |  |
| `cta_href` | string | non |  |  |
| `cta_label_en` | string | oui |  |  |
| `cta_label_fr` | string | oui |  |  |
| `download_label_en` | string | non | Free PDF · on signup |  |
| `download_label_fr` | string | non | PDF gratuit · sur inscription |  |
| `format_en` | string | oui |  |  |
| `format_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `published_at` | string | oui |  |  |

**Tokens** : `--accent-rgb` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--ink-rgb` `--leading-h2` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--radius-pill` `--radius-sm` `--sec-grid` `--sec-pad` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-display` `--text-h1` `--text-h3` `--text-lede` `--text-small` `--tracking-display` `--tracking-mono` `--wrap`

**Classes scoped** : .author-hero .author-portrait .css .g12 .g12--full .hero-author .hero-author__bc .hero-author__copy .hero-author__eyebrow .hero-author__h1 .hero-author__lede .hero-author__portrait .hero-author__portrait-frame .hero-lead-magnet .hero-lead-magnet__cover .hero-lead-magnet__download .hero-lead-magnet__download-label .hero-lead-magnet__grid .hero-lead-magnet__h1 .hero-lead-magnet__kicker .hero-lead-magnet__lede .hero-lead-magnet__meta .hero-lead-magnet__panel .hero-split .hero-split__ctas .hero-split__inner .hero-split__left .hero-split__meta .hero-split__right .hero-split__right-inner .start-9 .wrap-wide

**Dette hardcode** : 29 valeur(s) — -0.03em, -8px, 0.1em, 100%, 120%, 1200px, 12px, 140px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-display --font-mono. Dette : 29 litteral(s) hardcode(s) (-0.03em, -8px, 0.1em).

---

### `hero-liquid`

> Hero manifeste à fond canvas liquide (terracotta animé) : eyebrow, grand titre display italique, lede et CTAs sur fond sombre.
> HeroLiquid · src/components/sections/HeroLiquid.astro · marketing/hero-header-sections
> status : stable · tags : canvas, dark, hero, manifesto, react-island

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta_primary_href` | string | non |  |  |
| `cta_primary_label_en` | string | non |  |  |
| `cta_primary_label_fr` | string | non |  |  |
| `cta_secondary_href` | string | non |  |  |
| `cta_secondary_label_en` | string | non |  |  |
| `cta_secondary_label_fr` | string | non |  |  |
| `eyebrow_en` | string | non |  |  |
| `eyebrow_fr` | string | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--font-display` `--fw-regular` `--ink` `--paper` `--paper-rgb` `--space-11` `--space-7` `--space-8` `--text-h1` `--text-h3` `--wrap-prose` `--wrap-wide`

**Classes scoped** : .accent .hero-liquid .hero-liquid__cta .hero-liquid__h1 .hero-liquid__inner .hero-liquid__lede .liquid-hero

**Dette hardcode** : 5 valeur(s) — -0.035em, 100%, 10px, 1400px, clamp(440px, 62vh, 680px)

**Agent** : Espacement : --space-11 --space-7 --space-8. Couleur : --accent-text --ink --paper. Typographie : --font-display --fw-regular. Dette : 5 litteral(s) hardcode(s) (-0.035em, 100%, 10px).

---

### `hero-offer-detail`

> Hero de page offre détail : SVG cercles concentriques signature, breadcrumb, tier kicker, h1 + lead italique, CTA et meta.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : concentric-svg, detail, hero, offer, tier

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `breadcrumb_href` | string | non |  |  |
| `breadcrumb_label_en` | string | non |  |  |
| `breadcrumb_label_fr` | string | non |  |  |
| `cta` | object | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hero_variant` | enum | non |  | equilibre | showcase | encadre |
| `lead_en` | string | oui |  |  |
| `lead_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |
| `tags` | array | non |  | max:8 |
| `tier_en` | string | oui |  |  |
| `tier_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-lg` `--radius-pill` `--radius-xs` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-display` `--text-h1` `--text-h3` `--text-small` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 20 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `background`, `hero_variant` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 20 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-pillar-hub`

> Hero de page pilier avec titre maximal et grille de statistiques quatre colonnes optionnelle.
> HeroHubStats · src/components/sections/HeroHubStats.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, pillar, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hub_num` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_kicker_en` | string | oui |  |  |
| `meta_kicker_fr` | string | oui |  |  |
| `stats` | array | non |  | min:2 max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-mono-tight` `--viewport-h` `--wrap-wide`

**Classes scoped** : .astro .hero-conversion-funnel .hero-conversion-funnel__benefits .hero-conversion-funnel__cta .hero-conversion-funnel__h1 .hero-conversion-funnel__lede .hero-conversion-funnel__meta .hero-conversion-funnel__num .hero-conversion-funnel__proof .hero-conversion-funnel__stat--lead .hero-conversion-funnel__stat-label .hero-conversion-funnel__stat-value .hero-conversion-funnel__stats .hero-hub-stats .hero-hub-stats__cell .hero-hub-stats__cell--accent .hero-hub-stats__cell--lead .hero-hub-stats__grid .hero-hub-stats__h1 .hero-hub-stats__label .hero-hub-stats__lede .hero-hub-stats__meta .hero-hub-stats__num .hero-hub-stats__value .hero-pillar-hub .hero-pillar-hub__h1 .hero-pillar-hub__lede .hero-pillar-hub__meta .hero-pillar-hub__num .hero-pillar-hub__stats .key-metric .key-metric-accent .key-metric-value .wrap-wide

**Dette hardcode** : 23 valeur(s) — -0.035em, 0.1em, 0.7em, 100%, 10px, 11px, 1200px, 18px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 23 litteral(s) hardcode(s) (-0.035em, 0.1em, 0.7em).

---

### `hero-problem-index`

> Hero d'index par problème : décor SVG rectangle rotated 12°, h1 monumental, lede italique et phrase canonique.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : decoration, hero, hub, problem, svg

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `canonical_en` | string | non |  |  |
| `canonical_fr` | string | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `transition_id` | string | non |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-sector`

> Hero de page secteur ou département : SVG rotated 15° accent, dept kicker, h1 + lead italique, CTA et meta, tags secteurs.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : department, hero, sector, tags

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta` | object | oui |  |  |
| `dept_en` | string | oui |  |  |
| `dept_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hero_variant` | enum | non |  | equilibre | showcase | encadre |
| `lead_en` | string | oui |  |  |
| `lead_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |
| `tags` | array | non |  | max:8 |

**Tokens** : `--accent` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-lg` `--radius-pill` `--radius-xs` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-display` `--text-h1` `--text-h3` `--text-small` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 20 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `background`, `hero_variant` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 20 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-service-detail`

> Hero de page service avec numéro éditorial, titre, accroche et barre de preuves chiffrées optionnelle.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : detail, hero, metrics, service

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `metrics` | array | non |  | min:2 max:4 |
| `service_num` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-service-masthead`

> Masthead service sobre : kicker § Service N + h1 display + lede display muted, sans décor SVG.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : hero, masthead, service, simple

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `service_num` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `hero-social-proof`

> Hero centré avec preuve sociale above-the-fold : titre, CTA, note clients optionnelle et bande de chiffres clés (StatRow) sous le pli haut.
> HeroSocialProof · src/components/sections/HeroSocialProof.astro · marketing/hero-header-sections
> status : stable · tags : above-fold, hero, rating, social-proof, stats, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `rating_en` | string | non |  |  |
| `rating_fr` | string | non |  |  |
| `stats` | array | oui |  | min:2 max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--hairline` `--header-height` `--ink` `--ink-2` `--leading-h2` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-2` `--space-3` `--space-6` `--spacing-block` `--text-h1` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .hero-social-proof .hero-social-proof__band .hero-social-proof__ctas .hero-social-proof__h1 .hero-social-proof__head .hero-social-proof__lede .hero-social-proof__rating .hero-social-proof__stars

**Dette hardcode** : 3 valeur(s) — 0.1em, 1px, 700px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-6. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 3 litteral(s) hardcode(s) (0.1em, 1px, 700px).

---

### `hero-split`

> Hero en deux colonnes pour présenter une offre avec visuel et appel à l'action principal.
> HeroSplit · src/components/sections/HeroSplit.astro · marketing/hero-header-sections
> status : stable · tags : cta, hero, split

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |
| `right_block` | enum | non |  | mini-map | workflow-svg | stats | image | mockup-terminal |

**Tokens** : `--accent-rgb` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--hairline-strong` `--header-height` `--ink` `--ink-2` `--ink-rgb` `--leading-h2` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-md` `--radius-pill` `--radius-sm` `--sec-grid` `--sec-pad` `--section-base` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--text-body` `--text-display` `--text-h1` `--text-h3` `--text-lede` `--text-small` `--tracking-display` `--tracking-mono` `--wrap`

**Classes scoped** : .author-hero .author-portrait .css .g12 .g12--full .hero-author .hero-author__bc .hero-author__copy .hero-author__eyebrow .hero-author__h1 .hero-author__lede .hero-author__portrait .hero-author__portrait-frame .hero-lead-magnet .hero-lead-magnet__cover .hero-lead-magnet__download .hero-lead-magnet__download-label .hero-lead-magnet__grid .hero-lead-magnet__h1 .hero-lead-magnet__kicker .hero-lead-magnet__lede .hero-lead-magnet__meta .hero-lead-magnet__panel .hero-split .hero-split__ctas .hero-split__inner .hero-split__left .hero-split__meta .hero-split__right .hero-split__right-inner .start-9 .wrap-wide

**Dette hardcode** : 29 valeur(s) — -0.03em, -8px, 0.1em, 100%, 120%, 1200px, 12px, 140px

**Agent** : Layout : `right_block` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent-rgb --accent-text --ink. Typographie : --font-display --font-mono. Dette : 29 litteral(s) hardcode(s) (-0.03em, -8px, 0.1em).

---

### `hero-tech-layer`

> Hero de couche technologique : triangles SVG signature, layer badge (claude/os/orch), h1 + lead italique, CTA et meta.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : hero, layer, technology, triangles

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta` | object | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `layer_label_en` | string | oui |  |  |
| `layer_label_fr` | string | oui |  |  |
| `layer_type` | enum | non | claude | claude | os | orch |
| `lead_en` | string | oui |  |  |
| `lead_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-lg` `--radius-pill` `--radius-xs` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-display` `--text-h1` `--text-h3` `--text-small` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 20 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `background`, `layer_type` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 20 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-tunnel-step`

> Hero d'étape de tunnel : kicker accent + barre de progression [01][02]... + h1 (variante hero ou section) + lede.
> HeroTunnelStep · src/components/sections/HeroTunnelStep.astro · marketing/hero-header-sections
> status : stable · tags : funnel, hero, progress, step, tunnel

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `progress_total` | number | oui |  | int min:1 max:12 |
| `step` | number | oui |  | int min:1 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--gut` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-1` `--space-10` `--space-11` `--space-6` `--space-7` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .hero-tunnel-step .hero-tunnel-step__h1 .hero-tunnel-step__h1--hero .hero-tunnel-step__h1--section .hero-tunnel-step__kicker .hero-tunnel-step__lede .hero-tunnel-step__progress .hero-tunnel-step__progress-step .is-active .tunnel-step-hero .tunnel-step-hero__h1 .tunnel-step-hero__h1--hero .tunnel-step-hero__h1--section .tunnel-step-hero__kicker .tunnel-step-hero__lede .tunnel-step-hero__progress .tunnel-step-hero__progress-step .wrap-wide

**Dette hardcode** : 9 valeur(s) — -.02em, .06em, .1em, 100%, 10px, 11px, 1200px, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-.02em, .06em, .1em).

---

### `hero-utility-masthead`

> (déprécié → hero-hub-masthead variant=detail) Masthead utilitaire générique (about, méthode, academy intro) : kicker, h1 monumental, lede display italique, alignement gauche ou centré.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : deprecated · tags : editorial, hero, masthead, utility

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `align` | enum | non | left | left | centered |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--gut` `--hahub-top-pad` `--hairline` `--hairline-strong` `--hcs-h1-gap` `--hcs-top-pad` `--he-top-pad` `--header-height` `--hero-course-top-pad` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-h2` `--leading-lede` `--leading-prose` `--leading-relaxed` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--sec-grid` `--sec-pad` `--section-base` `--space-1` `--space-10` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--spacing-block` `--spec-cols` `--text-body` `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .css .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-case-study .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-essay .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 41 valeur(s) — -0.01em, -0.026em, -0.028em, -0.02em, -0.03em, .1em, 0.06em, 0.1em

**Agent** : Layout : `align`, `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-11. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 41 litteral(s) hardcode(s) (-0.01em, -0.026em, -0.028em).

---

### `tier-pyramid-svg`

> Pyramide SVG isocèle à trois niveaux pour visualiser la progression Découverte · Transformation · Partenariat.
> TierPyramidSvg · src/components/sections/TierPyramidSvg.astro · marketing/hero-header-sections
> status : stable · tags : offers, pyramid, svg, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aria_label_en` | string | oui |  |  |
| `aria_label_fr` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `tiers` | array | oui |  |  |

**Tokens** : `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-6` `--space-7`

**Classes scoped** : .pyramid-wrap

**Dette hardcode** : 2 valeur(s) — 100%, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-6 --space-7. Couleur : --ink --muted --paper. Dette : 2 litteral(s) hardcode(s) (100%, 800px).

---

### `tunnel-step-hero`

> Hero d'étape tunnel V2 : kicker calculé (offre_label + step/progress_total) + barre [NN] + h1 (hero ou section) + lede.
> HeroTunnelStep · src/components/sections/HeroTunnelStep.astro · marketing/hero-header-sections
> status : stable · tags : funnel, hero, kicker-computed, progress, step, tunnel

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `offre_label` | string | oui |  |  |
| `progress_total` | number | oui |  | int min:1 |
| `step` | number | oui |  | int min:1 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--gut` `--hairline` `--ink` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-1` `--space-10` `--space-11` `--space-6` `--space-7` `--text-h1` `--text-h3` `--text-small`

**Classes scoped** : .hero-tunnel-step .hero-tunnel-step__h1 .hero-tunnel-step__h1--hero .hero-tunnel-step__h1--section .hero-tunnel-step__kicker .hero-tunnel-step__lede .hero-tunnel-step__progress .hero-tunnel-step__progress-step .is-active .tunnel-step-hero .tunnel-step-hero__h1 .tunnel-step-hero__h1--hero .tunnel-step-hero__h1--section .tunnel-step-hero__kicker .tunnel-step-hero__lede .tunnel-step-hero__progress .tunnel-step-hero__progress-step .wrap-wide

**Dette hardcode** : 9 valeur(s) — -.02em, .06em, .1em, 100%, 10px, 11px, 1200px, 1px

**Agent** : Espacement : --space-1 --space-10 --space-11. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-.02em, .06em, .1em).

---

## Index Sections

### `course-catalog-table`

> Tableau du catalogue formations : titre de section et lignes (#, titre, niveau en pill, durée, prix, flèche), une formation par ligne.
> CourseCatalogTable · src/components/sections/CourseCatalogTable.astro · marketing/index-sections
> status : stable · tags : catalog, courses, school, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `rows` | array | oui |  | int min:1 max:20 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-rgb` `--accent-sur-clair` `--accent-text` `--dur-fast` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--gut` `--hairline` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--section-tight` `--space-2` `--space-3` `--space-4` `--space-5` `--space-8` `--text-body` `--text-small` `--tracking-mono-tight` `--wrap-wide`

**Classes scoped** : .arrow .catalogue .catalogue-table .col-duree .col-niveau .col-num .mono .pill .pill--avance .pill--debutant .pill--expert .pill--intermediaire .row-title .section-title .table-header .table-row

**Tailwind** : col-action col-duree col-niveau col-num col-prix col-titre row-title

**Dette hardcode** : 10 valeur(s) — 0.06em, 130px, 1px, 32px, 3px, 4%, 40px, 700px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-rgb --accent-sur-clair. Typographie : --font-mono --font-sans. Dette : 10 litteral(s) hardcode(s) (0.06em, 130px, 1px).

---

### `learning-path-list`

> Liste de parcours : titre de section et une ligne par parcours (titre en gras + description).
> LearningPathList · src/components/sections/LearningPathList.astro · marketing/index-sections
> status : stable · tags : list, paths, school

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `items` | array | oui |  | min:1 max:12 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--font-mono` `--font-sans` `--fw-regular` `--fw-semibold` `--gut` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--space-4` `--space-5` `--text-body` `--text-small` `--tracking-mono-tight` `--wrap-wide`

**Classes scoped** : .parcours-desc .parcours-item .parcours-list .parcours-section .parcours-title .section-title

**Dette hardcode** : 4 valeur(s) — 1px, 20px, 56px, 6px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5. Couleur : --ink --muted --paper. Typographie : --font-mono --font-sans. Dette : 4 litteral(s) hardcode(s) (1px, 20px, 56px).

---

### `list-index-section`

> Masthead de listing avec filtres optionnels, conteneur de liste ouvert et footer custom.
> ListIndexSection · src/components/sections/ListIndexSection.astro · marketing/index-sections
> status : stable · tags : filters, index, listing, resources

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `filters_html_en` | string | non |  |  |
| `filters_html_fr` | string | non |  |  |
| `footer_html_en` | string | non |  |  |
| `footer_html_fr` | string | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `list_html_en` | string | non |  |  |
| `list_html_fr` | string | non |  |  |

**Tokens** : `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink-2` `--leading-lede` `--section-loose` `--space-3` `--space-5` `--space-6` `--space-9` `--text-display` `--text-h3`

**Classes scoped** : .list-body .list-filters .list-footer .list-h1 .list-hd .list-kicker .list-lede

**Tailwind** : list-body list-filters list-footer list-h1 list-hd list-kicker list-lede

**Dette hardcode** : 4 valeur(s) — -0.03em, 140px, 1px, 760px

**Agent** : Espacement : --space-3 --space-5 --space-6. Couleur : --ink-2. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (-0.03em, 140px, 1px).

---

## Logo Sections

### `ecosystem-partners`

> Logos partenaires technologiques unifiés (masque alpha + currentColor), groupés par catégorie, grille / mur / marquee, variante dark.
> EcosystemPartners · src/components/sections/EcosystemPartners.astro · marketing/logo-sections
> status : stable · tags : ecosystem, grid, logos, marquee, partners

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `layout` | enum | non | grid | wall | grid | marquee |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `partners` | array | oui |  | min:1 |

**Tokens** : `--accent-text` `--font-display` `--fw-regular` `--ink` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--section-tight` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--text-h2` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .eco-partners .eco-partners__cell .eco-partners__cell--labeled .eco-partners__grid .eco-partners__group-title .eco-partners__groups .eco-partners__h2 .eco-partners__head .eco-partners__kicker .eco-partners__lede .eco-partners__marquee .eco-partners__marquee-wrap .eco-partners__wall .eco-partners__wall-label .partner-logo

**Dette hardcode** : 4 valeur(s) — -0.022em, -50%, 132px, 140px

**Agent** : Layout : `background`, `layout` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --fw-regular. Dette : 4 litteral(s) hardcode(s) (-0.022em, -50%, 132px).

---

### `integrations-grid`

> Grille de logos d’intégrations groupés par catégorie (CRM, communication, données). Répond à l’objection « est-ce que ça se branche à nos outils ? » d’un coup d’œil.
> IntegrationsGrid · src/components/sections/IntegrationsGrid.astro · marketing/logo-sections
> status : stable · tags : connectors, ecosystem, grid, integrations, logos

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `groups` | array | oui |  | min:1 max:6 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--dur-fast` `--ease` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--space-3` `--space-4` `--space-5` `--space-8` `--spacing-block` `--text-body` `--text-small` `--tracking-mono`

**Classes scoped** : .integrations .integrations__cell .integrations__group .integrations__group-title .integrations__groups .integrations__header .integrations__lede .integrations__list .integrations__name

**Dette hardcode** : 6 valeur(s) — -2px, 100%, 180px, 1px, 24px, 600px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 6 litteral(s) hardcode(s) (-2px, 100%, 180px).

---

### `logo-marquee`

> Bandeau de logos image à défilement infini (« ils nous font confiance »), marquee CSS, grayscale optionnel. Respecte prefers-reduced-motion. Distinct du marquee-band texte mono.
> LogoMarquee · src/components/sections/LogoMarquee.astro · marketing/logo-sections
> status : stable · tags : image, logos, marquee, scroll, trusted-by

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `grayscale` | boolean | non | true |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logos` | array | oui |  | min:4 max:24 |
| `speed` | enum | non | base | slow | base |

**Tokens** : `--dur-hover` `--ink` `--paper` `--paper-2` `--paper-3` `--section-tight` `--space-4` `--space-5` `--space-7`

**Classes scoped** : .logo-marquee .logo-marquee__item .logo-marquee__kicker .logo-marquee__track .logo-marquee__viewport

**Dette hardcode** : 6 valeur(s) — -50%, 100%, 32px, 40px, 8%, 92%

**Agent** : Layout : `background`, `speed` (schema, 0 CSS). Espacement : --space-4 --space-5 --space-7. Couleur : --ink --paper --paper-2. Dette : 6 litteral(s) hardcode(s) (-50%, 100%, 32px).

---

### `logo-wall`

> Grille statique de logos partenaires ou clients, avec effet grayscale vers couleur au hover. Distinct du bandeau animé marquee-band.
> LogoWall · src/components/sections/LogoWall.astro · marketing/logo-sections
> status : stable · tags : grid, logos, social-proof, static

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logos` | array | oui |  | min:3 max:20 |

**Tokens** : `--accent` `--dur-fast` `--ease` `--hairline` `--ink` `--paper` `--paper-2` `--paper-3` `--radius-xs` `--space-4` `--space-5` `--spacing-block`

**Classes scoped** : .logo-wall .logo-wall__cell .logo-wall__grid .logo-wall__header .logo-wall__img .logo-wall__link

**Dette hardcode** : 13 valeur(s) — -1px, 100%, 110px, 120px, 140px, 1px, 2px, 3px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-4 --space-5 --spacing-block. Couleur : --accent --ink --paper. Dette : 13 litteral(s) hardcode(s) (-1px, 100%, 110px).

---

### `marquee-band`

> Bandeau marquee mono uppercase à défilement horizontal infini · items + séparateurs · respecte prefers-reduced-motion.
> MarqueeBand · src/components/sections/MarqueeBand.astro · marketing/logo-sections
> status : stable · tags : band, infinite, marquee, mono, scroll

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `items_en` | array | non |  | min:2 max:12 |
| `items_fr` | array | oui |  | min:2 max:12 |
| `repeat` | number | non | 2 | int min:1 max:4 |
| `separator` | string | non | · |  |

**Tokens** : `--accent-text` `--font-mono` `--ink` `--ink-rgb` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--text-small`

**Classes scoped** : .marquee-band .marquee-band__item .marquee-band__sep .marquee-band__track

**Dette hardcode** : 5 valeur(s) — -50%, .1em, 18px, 1px, 28px

**Agent** : Layout : `background` (schema, 0 CSS). Couleur : --accent-text --ink --ink-rgb. Typographie : --font-mono --text-small. Dette : 5 litteral(s) hardcode(s) (-50%, .1em, 18px).

---

### `social-proof`

> Section de logos clients ou partenaires pour installer une preuve sociale immédiate.
> SocialProof · src/components/sections/SocialProof.astro · marketing/logo-sections
> status : stable · tags : logos, marquee, social-proof

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logos` | array | oui |  |  |
| `marquee` | boolean | non | true |  |

**Tokens** : `--font-display` `--hairline` `--ink` `--muted` `--paper` `--paper-2` `--paper-3` `--section-tight` `--space-5` `--space-6` `--text-small`

**Classes scoped** : .social-proof .social-proof__kicker .social-proof__logo .social-proof__marquee .social-proof__marquee-wrap .social-proof__static

**Dette hardcode** : 2 valeur(s) — -50%, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-5 --space-6. Couleur : --ink --muted --paper. Typographie : --font-display --text-small. Dette : 2 litteral(s) hardcode(s) (-50%, 1px).

---

## Manifesto Sections

### `asymmetric-services`

> Services en rangées asymétriques (AsymmetricServiceRow) qui alternent gauche/droite : numéro display, nom, body et flèche, signature de /manifesto Acte II.
> AsymmetricServices · src/components/sections/AsymmetricServices.astro · marketing/manifesto-sections
> status : stable · tags : alternating, asymmetric, editorial, manifesto, rows, services

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `items` | array | oui |  | min:2 max:8 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `meta_en` | string | non |  |  |
| `meta_fr` | string | non |  |  |
| `num_en` | string | oui |  |  |
| `num_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-3` `--space-9` `--text-h1` `--text-h3`

**Classes scoped** : .acc .asym-svc .asym-svc__accent .asym-svc__hd .asym-svc__intro .asym-svc__title

**Dette hardcode** : 4 valeur(s) — -0.02em, 1200px, 820px, clamp(-24px, -3vw, -40px)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-9. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (-0.02em, 1200px, 820px).

---

### `manifesto-act`

> Acte numéroté de manifeste : label sticky (numéro romain + sous-titre), statement XL et rangée de chiffres massifs optionnelle, tone encre ou paper.
> ManifestoAct · src/components/sections/ManifestoAct.astro · marketing/manifesto-sections
> status : stable · tags : act, ink, manifesto, numbered, stats, sticky

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `label_en` | string | oui |  |  |
| `label_fr` | string | oui |  |  |
| `num_en` | string | oui |  |  |
| `num_fr` | string | oui |  |  |
| `stats` | array | non |  | max:4 |
| `sub_en` | string | non |  |  |
| `sub_fr` | string | non |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |
| `tone` | enum | non | ink | ink | paper |

**Tokens** : `--accent-text` `--act-cols` `--dur-trim` `--ease-out` `--font-display` `--font-sans` `--fw-regular` `--fw-semibold` `--hairline` `--ink` `--leading-body` `--ms-lit` `--muted` `--paper` `--paper-rgb` `--section-loose` `--space-1` `--space-10` `--space-12` `--space-4` `--space-6` `--space-8` `--text-body` `--text-display` `--text-h2`

**Classes scoped** : .acc .manifesto-act .manifesto-act__grid .manifesto-act__label .manifesto-act__num .manifesto-act__roman .manifesto-act__stat-k .manifesto-act__stat-p .manifesto-act__stats .manifesto-act__sub .manifesto-act__text .ms-manifesto-progressive .ms-word .ts

**Dette hardcode** : 5 valeur(s) — -0.02em, -0.03em, 1px, 280px, 768px

**Agent** : Layout : `tone` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-12. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 5 litteral(s) hardcode(s) (-0.02em, -0.03em, 1px).

---

### `manifesto-statement`

> Déclaration manifeste plein écran : kicker mono et statement XL en sans, relevés italiques serif, tone encre (interlude console) ou terracotta avec grille translucide.
> ManifestoStatement · src/components/sections/ManifestoStatement.astro · marketing/manifesto-sections
> status : stable · tags : accent, editorial, fullscreen, ink, manifesto, statement

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `e` | boolean | non | false |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `show_grid` | boolean | non | false |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |
| `tone` | enum | non | ink | ink | accent |

**Tokens** : `--accent` `--accent-text` `--dur-trim` `--ease-out` `--font-display` `--font-sans` `--fw-regular` `--fw-semibold` `--ink` `--ms-lit` `--paper` `--paper-rgb` `--section-grand` `--spacing-block` `--text-h1`

**Classes scoped** : .acc .manifesto-stmt .manifesto-stmt__grid .manifesto-stmt__inner .manifesto-stmt__kicker .manifesto-stmt__text .manifesto-stmt--pinned .manifesto-stmt-pin .ms-manifesto-progressive .ms-word .ts

**Dette hardcode** : 9 valeur(s) — -0.02em, 0%, 1400px, 1px, 30%, 48px, 70%, 768px

**Agent** : Layout : `tone` (schema, 0 CSS). Espacement : --spacing-block. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-sans. Dette : 9 litteral(s) hardcode(s) (-0.02em, 0%, 1400px).

---

## Newsletter Sections

### `cta-newsletter-footer`

> Capture email compacte multi-colonne de type pré-footer : titre, champ, bouton et mention RGPD sur une ligne. Sombre par défaut pour clore la page sur l’abonnement.
> CtaNewsletterFooter · src/components/sections/CtaNewsletterFooter.astro · marketing/newsletter-sections
> status : stable · tags : capture, cta, email, newsletter, pre-footer

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `action` | string | non |  |  |
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink |
| `button_label_en` | string | non | Subscribe |  |
| `button_label_fr` | string | non | S’abonner |  |
| `consent_en` | string | non |  |  |
| `consent_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `placeholder_en` | string | non | you@company.com |  |
| `placeholder_fr` | string | non | vous@entreprise.com |  |
| `subtitle_en` | string | non |  |  |
| `subtitle_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-sm` `--section-base` `--space-10` `--space-3` `--space-4` `--space-6` `--text-body` `--text-h2` `--text-small`

**Classes scoped** : .cta-newsletter .cta-newsletter__consent .cta-newsletter__copy .cta-newsletter__form .cta-newsletter__form-col .cta-newsletter__grid .cta-newsletter__input .cta-newsletter__subtitle .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 5 valeur(s) — -1px, 1px, 240px, 760px, clamp(var(--space-6)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-sans --fw-medium. Dette : 5 litteral(s) hardcode(s) (-1px, 1px, 240px).

---

### `newsletter-signup-section`

> Section d'inscription newsletter pleine largeur (réutilise NewsletterSignup), fonds au choix dont ink pour un climax de page.
> NewsletterSignupSection · src/components/sections/NewsletterSignupSection.astro · marketing/newsletter-sections
> status : stable · tags : climax, email, full-width, newsletter, signup, subscribe

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `hint_en` | string | non |  |  |
| `hint_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-3` `--space-4` `--space-6` `--text-body` `--text-small`

**Classes scoped** : .nl-btn .nl-input .nl-section .nl-section__body .nl-section__form .nl-section__head .nl-section__hint .nl-section__inner

**Dette hardcode** : 4 valeur(s) — 0.06em, 100%, 1px, 480px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-6. Couleur : --ink --muted --paper. Typographie : --font-mono --font-sans. Dette : 4 litteral(s) hardcode(s) (0.06em, 100%, 1px).

---

## Pricing Sections

### `pricing-cards`

> Grille de 2 à 4 cartes de prix côte à côte avec une carte « Recommandé » mise en avant, prix, période, features et CTA par carte. Ancrage par contraste.
> PricingCards · src/components/sections/PricingCards.astro · marketing/pricing-sections
> status : stable · tags : cards, plans, pricing, recommended, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `footnote_en` | string | non |  |  |
| `footnote_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `tiers` | array | oui |  | min:2 max:4 |

**Tokens** : `--accent-rgb` `--accent-sur-clair` `--accent-text` `--col-count` `--dur-hover` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--spacing-block` `--text-h2` `--text-h3` `--text-small` `--tracking-display`

**Classes scoped** : .is-featured .pricing-cards .pricing-cards__badge .pricing-cards__btn .pricing-cards__card .pricing-cards__card-hd .pricing-cards__check .pricing-cards__features .pricing-cards__footnote .pricing-cards__grid .pricing-cards__header .pricing-cards__idx .pricing-cards__lede .pricing-cards__name .pricing-cards__period .pricing-cards__price .pricing-cards__price-k

**Dette hardcode** : 13 valeur(s) — -12px, -3px, 0.04em, 0.06em, 0.14em, 100%, 14px, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent-rgb --accent-sur-clair --accent-text. Typographie : --font-display --font-mono. Dette : 13 litteral(s) hardcode(s) (-12px, -3px, 0.04em).

---

### `pricing-comparison-matrix`

> Matrice comparative tarifaire pour mettre en regard les fonctionnalites de 3 plans avec mise en avant de la colonne recommandee.
> ComparisonTable · src/components/sections/ComparisonTable.astro · marketing/pricing-sections
> status : stable · tags : comparison, matrix, pricing, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `plans` | array | oui |  | min:2 max:4 |
| `rows` | array | oui |  | min:2 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--dur-fast` `--ease-out` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-3` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .comparison-table .comparison-table__bool .comparison-table__bool--no .comparison-table__bool--yes .comparison-table__cell .comparison-table__feature .comparison-table__wrap .pcm .pcm__body .pcm__btn .pcm__cell .pcm__cell--featured .pcm__col-feature .pcm__col-plan .pcm__col-plan--featured .pcm__feature .pcm__feature-label .pcm__glyph .pcm__glyph--no .pcm__glyph--yes .pcm__group .pcm__header .pcm__plan-cta .pcm__plan-name .pcm__plan-note .pcm__plan-price .pcm__row .pcm__scroll .pcm__table .pcm__value .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 12 valeur(s) — -1px, .14em, 100%, 14px, 180px, 1px, 200px, 2px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-1px, .14em, 100%).

---

### `pricing-single-highlight`

> Offre mono-produit en grand format : une carte large centrée avec prix d'ancrage, liste de bénéfices, garantie et CTA fort. Idéal landing mono-offre.
> PricingSingleHighlight · src/components/sections/PricingSingleHighlight.astro · marketing/pricing-sections
> status : stable · tags : anchor, guarantee, highlight, offer, pricing, single

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `anchor_label_en` | string | non |  |  |
| `anchor_label_fr` | string | non |  |  |
| `anchor_price` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `benefits_en` | array | oui |  | min:2 |
| `benefits_fr` | array | oui |  | min:2 |
| `cta` | object | oui |  |  |
| `desc_en` | string | non |  |  |
| `desc_fr` | string | non |  |  |
| `guarantee_en` | string | non |  |  |
| `guarantee_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `name_en` | string | oui |  |  |
| `name_fr` | string | oui |  |  |
| `period_en` | string | non |  |  |
| `period_fr` | string | non |  |  |
| `price` | string | oui |  |  |
| `secondary_note_en` | string | non |  |  |
| `secondary_note_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-7` `--space-8` `--spacing-block` `--text-h1` `--text-small` `--tracking-display` `--tracking-mono-tight`

**Classes scoped** : .pricing-single .pricing-single__anchor .pricing-single__anchor-label .pricing-single__benefits .pricing-single__benefits-label .pricing-single__btn .pricing-single__card .pricing-single__check .pricing-single__desc .pricing-single__guarantee .pricing-single__header .pricing-single__lead .pricing-single__list .pricing-single__name .pricing-single__note .pricing-single__period .pricing-single__price .pricing-single__price-k

**Dette hardcode** : 9 valeur(s) — 0.04em, 0.06em, 0.14em, 100%, 16px, 1px, 24px, 60px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (0.04em, 0.06em, 0.14em).

---

### `pricing-table`

> Table de prix pour présenter clairement les formules, paliers et options commerciales.
> PricingTable · src/components/sections/PricingTable.astro · marketing/pricing-sections
> status : stable · tags : plans, pricing, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `tiers` | array | oui |  | min:1 max:5 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--col-count` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-2` `--space-4` `--space-5` `--spacing-block` `--text-h2` `--text-small`

**Classes scoped** : .pricing-table .pricing-table__btn .pricing-table__check .pricing-table__cta .pricing-table__features .pricing-table__grid .pricing-table__header .pricing-table__price .pricing-table__tier .pricing-table__tier--featured .pricing-table__tier-header .pricing-table__tier-name

**Dette hardcode** : 7 valeur(s) — -1px, .14em, 100%, 10px, 1px, 2px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-5. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (-1px, .14em, 100%).

---

### `pricing-toggle`

> Grille de cartes de prix avec bascule mensuel/annuel (CSS-only, sans JS) qui change les prix affichés et signale l'économie annuelle.
> PricingToggle · src/components/sections/PricingToggle.astro · marketing/pricing-sections
> status : stable · tags : annual, monthly, plans, pricing, switch, toggle

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `label_annual_en` | string | oui |  |  |
| `label_annual_fr` | string | oui |  |  |
| `label_monthly_en` | string | oui |  |  |
| `label_monthly_fr` | string | oui |  |  |
| `save_badge_en` | string | non |  |  |
| `save_badge_fr` | string | non |  |  |
| `tiers` | array | oui |  | min:2 max:4 |

**Tokens** : `--accent` `--accent-rgb` `--accent-sur-clair` `--accent-text` `--col-count` `--dur-fast` `--dur-hover` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-pill` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--spacing-block` `--text-h1` `--text-small` `--tracking-display` `--tracking-mono-tight`

**Classes scoped** : .is-featured .pricing-toggle .pricing-toggle__badge .pricing-toggle__btn .pricing-toggle__card .pricing-toggle__card-hd .pricing-toggle__check .pricing-toggle__features .pricing-toggle__grid .pricing-toggle__header .pricing-toggle__idx .pricing-toggle__input .pricing-toggle__knob .pricing-toggle__name .pricing-toggle__price .pricing-toggle__price-k .pricing-toggle__save .pricing-toggle__suffix .pricing-toggle__switch .pricing-toggle__switch-label .pricing-toggle__switch-row

**Dette hardcode** : 16 valeur(s) — -12px, -3px, 0.06em, 0.14em, 0.1em, 100%, 14px, 1px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-sur-clair. Typographie : --font-display --font-mono. Dette : 16 litteral(s) hardcode(s) (-12px, -3px, 0.06em).

---

## Process Sections

### `diagnostic-stages`

> Auto-diagnostic « Où en êtes-vous ? » : 4 à 6 stades de maturité en cards horizontales cliquables, le stade courant relevé en accent (« vous êtes ici »). Situe le visiteur et l’oriente vers l’étape suivante (conversion + qualification).
> DiagnosticStages · src/components/sections/DiagnosticStages.astro · marketing/process-sections
> status : stable · tags : conversion, diagnostic, maturity, self-assessment, stages

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `stages` | array | oui |  | min:4 max:6 |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--diag-cols` `--dur-trim` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-full` `--section-base` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-9` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono` `--tracking-mono-tight` `--wrap-prose`

**Classes scoped** : .acc .diag .diag__body .diag__card .diag__glyph .diag__h2 .diag__head .diag__here .diag__kicker .diag__lede .diag__num .diag__phase .diag__stage .diag__title .diag__top .diag__track

**Dette hardcode** : 9 valeur(s) — -0.01em, -0.02em, -1px, 100%, 1000px, 18px, 1px, 2px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-0.01em, -0.02em, -1px).

---

### `process-steps`

> « Comment ça marche » en étapes numérotées verticales : numéro, titre, description et meta par étape, connecteurs visuels entre paliers, fonds paper à ink.
> ProcessSteps · src/components/sections/ProcessSteps.astro · marketing/process-sections
> status : stable · tags : how-it-works, method, numbered, onboarding, process, steps

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `steps` | array | oui |  | min:2 max:8 |

**Tokens** : `--accent` `--accent-ink` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline-strong` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-full` `--section-base` `--space-2` `--space-3` `--space-4` `--space-6` `--space-9` `--text-body` `--text-h2` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .acc .process-steps .process-steps__body .process-steps__connector .process-steps__content .process-steps__h2 .process-steps__hd .process-steps__intro .process-steps__list .process-steps__num .process-steps__row .process-steps__step .process-steps__title .process-steps__track

**Dette hardcode** : 6 valeur(s) — -0.02em, 1px, 40px, 48px, 640px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-ink --accent-text. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (-0.02em, 1px, 40px).

---

## Stats Sections

### `metric-callout-band`

> Bande d’une à trois métriques héro surdimensionnées accompagnées d’une phrase de contexte. Frappe fort sur un résultat chiffré, sombre par défaut pour la mise en avant.
> MetricCalloutBand · src/components/sections/MetricCalloutBand.astro · marketing/stats-sections
> status : stable · tags : band, callout, impact, metric, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink |
| `context_en` | string | oui |  |  |
| `context_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `metrics` | array | oui |  | min:1 max:3 |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--hairline` `--ink` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-2` `--space-4` `--space-5` `--space-6` `--spacing-block` `--text-body` `--text-h1` `--tracking-display`

**Classes scoped** : .metric-callout .metric-callout__context .metric-callout__head .metric-callout__item .metric-callout__label .metric-callout__list .metric-callout__value

**Dette hardcode** : 2 valeur(s) — 1px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-sans. Dette : 2 litteral(s) hardcode(s) (1px, 760px).

---

### `metric-shift`

> Comparaison avant → après : valeur initiale et finale magnifiées, delta.
> MetricShift · src/components/sections/MetricShift.astro · marketing/stats-sections
> status : stable · tags : before-after, metrics, proof, results

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `shifts` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono`

**Classes scoped** : .metric-shift .metric-shift__after .metric-shift__arrow .metric-shift__before .metric-shift__delta .metric-shift__delta--down .metric-shift__delta--flat .metric-shift__delta--up .metric-shift__hd .metric-shift__kicker .metric-shift__label .metric-shift__lede .metric-shift__row .metric-shift__rows .metric-shift__title .metric-shift__values .metric-shift--ink .metric-shift--paper-2 .metric-shift--paper-3

**Dette hardcode** : 6 valeur(s) — 120px, 180px, 1px, 680px, 900px, clamp(var(--space-8)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-12 --space-2 --space-3. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (120px, 180px, 1px).

---

### `proof-bar`

> Barre de preuve compacte pour afficher des métriques clés et renforcer la crédibilité.
> StatBlock · src/components/sections/StatBlock.astro · marketing/stats-sections
> status : stable · tags : bar, metrics, proof

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `layout` | enum | non | horizontal | horizontal | vertical-stack |
| `link_href` | string | non |  |  |
| `link_label_en` | string | non |  |  |
| `link_label_fr` | string | non |  |  |
| `metrics` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--ease` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-tight` `--space-10` `--space-2` `--space-4` `--space-5` `--space-6` `--spacing-block` `--text-body` `--text-h1` `--text-h2` `--text-small`

**Classes scoped** : .astro .proof-bar .proof-bar__item .proof-bar__kicker .proof-bar__label .proof-bar__link .proof-bar__list .proof-bar__value .pull-quote .pull-quote-attr .pull-quote-body .pull-quote-cite .pull-quote-mark .stat-block .stat-block__grid .stat-block__header .stat-block__item .stat-block__label .stat-block__split .stat-block__value

**Dette hardcode** : 9 valeur(s) — -1px, 0.1em, 140px, 1px, 2px, 480px, 6px, 768px

**Agent** : Layout : `background`, `layout` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-4. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-1px, 0.1em, 140px).

---

### `roi-band`

> Bande ROI sur fond ink : en-tête eyebrow et titre display, chiffres KeyMetric placés en asymétrie 6/5.
> RoiBand · src/components/sections/RoiBand.astro · marketing/stats-sections
> status : stable · tags : metrics, proof, roi, solutions, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `eyebrow_en` | string | non | § Macro proof |  |
| `eyebrow_fr` | string | non | § Preuve macro |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `metrics` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--ink` `--leading-h1` `--leading-lede` `--paper` `--paper-rgb` `--section-base` `--space-10` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` `--spacing-block` `--text-h1` `--text-small`

**Classes scoped** : .eyebrow .key-metric-accent .key-metric-label .key-metric-value .kicker .roi-cell .roi-l .roi-v .section-eyebrow .sol-proof .sol-roi-grid .sol-roi-hd .sol-sec .sol-sec-dark .start-10 .start-9

**Tailwind** : col-12

**Dette hardcode** : 4 valeur(s) — -0.018em, -0.02em, 0.1em, 1px

**Agent** : Espacement : --space-10 --space-2 --space-3. Couleur : --accent-text --ink --paper. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (-0.018em, -0.02em, 0.1em).

---

### `spec-bar`

> Barre de spécifications projet N colonnes (label mono + valeur) avec grille CSS var, extrait de CaseStudyTemplate.
> SpecBar · src/components/sections/SpecBar.astro · marketing/stats-sections
> status : stable · tags : case-study, grid, meta, mono, specs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `specs` | array | oui |  | min:2 max:8 |

**Tokens** : `--font-mono` `--hairline` `--ink` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-5` `--space-6` `--spec-cols` `--text-small`

**Classes scoped** : .spec-bar .spec-bar__grid .spec-bar__item .spec-bar__label .spec-bar__value

**Dette hardcode** : 6 valeur(s) — 0.04em, 0.14em, 1px, 480px, 6px, 800px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-5 --space-6. Couleur : --ink --muted --paper. Typographie : --font-mono --leading-lede. Dette : 6 litteral(s) hardcode(s) (0.04em, 0.14em, 1px).

---

### `stat-block`

> Bloc de statistiques en grille pour mettre en avant des chiffres de performance ou d'impact.
> StatBlock · src/components/sections/StatBlock.astro · marketing/stats-sections
> status : stable · tags : grid, metrics, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cite_en` | string | non |  |  |
| `cite_fr` | string | non |  |  |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `layout` | enum | non | grid-3 | grid-3 | grid-4 | rows-hairlines | split-quote |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `metrics` | array | oui |  | min:1 max:8 |
| `quote_en` | string | non |  |  |
| `quote_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--ease` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-tight` `--space-10` `--space-2` `--space-4` `--space-5` `--space-6` `--spacing-block` `--text-body` `--text-h1` `--text-h2` `--text-small`

**Classes scoped** : .astro .proof-bar .proof-bar__item .proof-bar__kicker .proof-bar__label .proof-bar__link .proof-bar__list .proof-bar__value .pull-quote .pull-quote-attr .pull-quote-body .pull-quote-cite .pull-quote-mark .stat-block .stat-block__grid .stat-block__header .stat-block__item .stat-block__label .stat-block__split .stat-block__value

**Dette hardcode** : 9 valeur(s) — -1px, 0.1em, 140px, 1px, 2px, 480px, 6px, 768px

**Agent** : Layout : `background`, `layout` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-4. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-1px, 0.1em, 140px).

---

### `stat-counter`

> Compteur animé count-up déclenché à l’entrée dans le viewport (île React client:visible), grille de 2 à 4 stats. Respecte prefers-reduced-motion et reste lisible sans JS.
> StatCounter · src/components/sections/StatCounter.astro · marketing/stats-sections
> status : stable · tags : animated, count-up, counter, kpi, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `animate` | boolean | non | true |  |
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `stats` | array | oui |  | min:2 max:4 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-semibold` `--ink` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--sc-cols` `--section-base` `--space-3` `--space-5` `--space-6` `--space-8` `--text-h1` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .stat-counter .stat-counter__cell .stat-counter__grid .stat-counter__h2 .stat-counter__head .stat-counter__kicker .stat-counter__label .stat-counter__num

**Dette hardcode** : 7 valeur(s) — -0.01em, -0.02em, .1em, 220px, 2px, 520px, 900px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-5 --space-6. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (-0.01em, -0.02em, .1em).

---

### `stats-bento`

> Quatre KPI en grille bento de tailles inegales : une grande cellule avec chiffre geant et trois cellules secondaires, plus un bandeau bas pleine largeur.
> StatsBento · src/components/sections/StatsBento.astro · marketing/stats-sections
> status : stable · tags : bento, kpi, metrics, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `stats` | array | oui |  | min:4 max:4 |

**Tokens** : `--accent-text` `--dur-hover` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-xs` `--shadow-card-hover` `--space-2` `--space-3` `--space-4` `--space-5` `--space-7` `--space-9` `--spacing-block` `--text-body` `--text-h1` `--text-h2` `--text-small` `--tracking-display` `--tracking-mono`

**Classes scoped** : .stats-bento .stats-bento__cell .stats-bento__cell--1 .stats-bento__cell--2 .stats-bento__cell--3 .stats-bento__cell--4 .stats-bento__delta .stats-bento__grid .stats-bento__header .stats-bento__label .stats-bento__number

**Dette hardcode** : 5 valeur(s) — -2px, 1023px, 1px, 639px, 640px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (-2px, 1023px, 1px).

---

## Table Sections

### `data-table`

> Table de données neutre générique : en-tête optionnel, colonnes avec alignements, lignes et cellules typées (emphase), zébrures et légende. Distincte des tables habillées terminal ou éditoriale.
> DataTable · src/components/sections/DataTable.astro · marketing/table-sections
> status : stable · tags : comparison, data, neutral, rows, striped, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `columns` | array | oui |  | min:2 max:8 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `rows` | array | oui |  | min:2 max:8 |
| `striped` | boolean | non | false |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-3` `--space-4` `--space-9` `--text-body` `--text-h2` `--text-small` `--tracking-caps`

**Classes scoped** : .acc .data-table .data-table__caption .data-table__h2 .data-table__hd .data-table__intro .data-table__scroll .data-table__table

**Dette hardcode** : 4 valeur(s) — -0.02em, 100%, 1px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-9. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (-0.02em, 100%, 1px). data-coupling : data-table data-table__caption data-table__h2.

---

### `editorial-write-feed`

> Feed éditorial en lignes cliquables (EditorialWriteRow) : date, tag, texte et flèche par ligne, tone paper ou ink, lien meta type /feed.xml.
> EditorialWriteFeed · src/components/sections/EditorialWriteFeed.astro · marketing/table-sections
> status : stable · tags : changelog, editorial, feed, rows, table, writing

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `items` | array | oui |  | min:1 max:10 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `meta_href` | string | non |  |  |
| `meta_label_en` | string | non |  |  |
| `meta_label_fr` | string | non |  |  |
| `title_en` | string | non |  |  |
| `title_fr` | string | non |  |  |
| `tone` | enum | non | paper | paper | ink |

**Tokens** : `--accent-text` `--font-display` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline` `--ink` `--leading-h3` `--paper` `--paper-rgb` `--section-base` `--space-2` `--space-4` `--space-7` `--text-h2`

**Classes scoped** : .write-feed .write-feed__hd .write-feed__meta-link .write-feed__title

**Dette hardcode** : 3 valeur(s) — -0.02em, 1000px, 1px

**Agent** : Layout : `tone` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-7. Couleur : --accent-text --ink --paper. Typographie : --font-display --font-sans. Dette : 3 litteral(s) hardcode(s) (-0.02em, 1000px, 1px).

---

### `terminal-table`

> Table terminal configurable (frame TerminalTable) : en-tête kicker/meta, titre, puis colonnes, headers et lignes cliquables avec rôle typographique par cellule.
> TerminalTableSection · src/components/sections/TerminalTableSection.astro · marketing/table-sections
> status : stable · tags : console, data, rows, services, table, terminal

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hairline` `--ink` `--ink-2` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-2` `--space-4` `--space-5` `--space-8` `--text-body` `--text-h2` `--text-h3` `--text-small`

**Classes scoped** : .acc .tbl-sec .tbl-sec__cell .tbl-sec__hd .tbl-sec__intro .tbl-sec__title .u-edit-tbl .u-edit-tbl-head .u-edit-tbl-row

**Dette hardcode** : 6 valeur(s) — -0.01em, -0.02em, .1em, 1100px, 1px, 900px

**Agent** : Espacement : --space-2 --space-4 --space-5. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (-0.01em, -0.02em, .1em).

---

## Team Sections

### `team-bio-grid`

> Grille d’équipe : photo, nom, rôle et bio courte par membre, en 2 à 4 colonnes alignées. Idéale pour une page À propos ou Équipe qui humanise la marque.
> TeamBioGrid · src/components/sections/TeamBioGrid.astro · marketing/team-sections
> status : stable · tags : about, bio, grid, people, team

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `columns` | enum | non | 3 | 2 | 3 | 4 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `members` | array | oui |  | min:2 max:12 |

**Tokens** : `--accent-text` `--dur-fast` `--ease` `--font-mono` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--space-2` `--space-4` `--space-6` `--spacing-block` `--text-body` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .team-bio-grid .team-bio-grid__avatar .team-bio-grid__bio .team-bio-grid__card .team-bio-grid__header .team-bio-grid__initials .team-bio-grid__lede .team-bio-grid__list .team-bio-grid__name .team-bio-grid__role

**Dette hardcode** : 5 valeur(s) — 100%, 1023px, 1px, 600px, 64px

**Agent** : Layout : `background`, `columns` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-6. Couleur : --accent-text --ink --muted. Typographie : --font-mono --font-sans. Dette : 5 litteral(s) hardcode(s) (100%, 1023px, 1px).

---

## Terminal Sections

### `code-showcase`

> Vitrine de code annoté pour devtools/SaaS technique : copy explicative, bloc code mono avec numéros de ligne et commentaires bilingues alignés, label fichier et langage, tone encre ou paper.
> CodeShowcase · src/components/sections/CodeShowcase.astro · marketing/terminal-sections
> status : stable · tags : code, devtools, mono, saas, showcase, syntax

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `label` | string | non |  |  |
| `lang_label` | string | non |  |  |
| `lines` | array | oui |  | min:1 max:24 |
| `show_line_numbers` | boolean | non | true |  |
| `tone` | enum | non | ink | ink | paper |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--ink` `--ink-rgb` `--leading-body` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-rgb` `--radius-card` `--radius-pill` `--section-base` `--space-3` `--space-4` `--space-5` `--space-7` `--space-9` `--text-body` `--text-h2` `--text-small` `--tracking-mono`

**Classes scoped** : .acc .code-showcase .code-showcase__bar .code-showcase__cmt .code-showcase__code .code-showcase__copy .code-showcase__dots .code-showcase__file .code-showcase__frame .code-showcase__grid .code-showcase__h2 .code-showcase__intro .code-showcase__lang .code-showcase__line .code-showcase__ln .code-showcase__text

**Dette hardcode** : 5 valeur(s) — -0.02em, 10px, 1px, 44px, 880px

**Agent** : Layout : `background`, `tone` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --ink-rgb. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (-0.02em, 10px, 1px).

---

### `terminal-metrics-strip`

> Strip KPI télémétrie tout mono : 2 à 6 cellules clé/valeur bordées de hairlines, esthétique console (uptime, agents, release), fonds paper, paper-2 ou ink.
> TerminalMetricsStrip · src/components/sections/TerminalMetricsStrip.astro · marketing/terminal-sections
> status : stable · tags : kpi, metrics, mono, strip, telemetry, terminal

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | ink |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `metrics` | array | oui |  | min:2 max:6 |

**Tokens** : `--font-mono` `--hairline` `--ink` `--muted` `--paper` `--paper-2` `--paper-rgb` `--section-tight` `--space-2` `--space-4` `--space-5` `--text-body` `--text-small` `--tm-cols`

**Classes scoped** : .term-metrics .term-metrics__cell .term-metrics__grid .term-metrics__k .term-metrics__kicker .term-metrics__v

**Dette hardcode** : 3 valeur(s) — .14em, 1px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-5. Couleur : --ink --muted --paper. Typographie : --font-mono --text-body. Dette : 3 litteral(s) hardcode(s) (.14em, 1px, 768px).

---

### `terminal-mockup`

> Console terminal configurable (frame TerminalMockup) : copy optionnelle à gauche, lignes cmd/out/ok/comment et curseur clignotant, layout split ou pleine largeur.
> TerminalMockupSection · src/components/sections/TerminalMockupSection.astro · marketing/terminal-sections
> status : stable · tags : cli, console, mockup, platform, split, terminal

**Tokens** : `--accent` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-rgb` `--section-base` `--space-1` `--space-5` `--space-9` `--text-body` `--text-h2` `--text-small`

**Classes scoped** : .acc .term-mock .term-mock__body .term-mock__cursor .term-mock__grid .term-mock__intro .term-mock__kicker .term-mock__line .term-mock__line-text .term-mock__ok .term-mock__prompt .term-mock__title

**Dette hardcode** : 6 valeur(s) — -0.02em, .55em, 1.05em, 120px, 50%, 900px

**Agent** : Espacement : --space-1 --space-5 --space-9. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (-0.02em, .55em, 1.05em).

---

## Testimonial Sections

### `case-card-grid`

> Table éditoriale de cas clients en six colonnes (index, client, secteur, stack, impact, flèche) façon compte rendu d'audit.
> CaseCardGrid · src/components/sections/CaseCardGrid.astro · marketing/testimonial-sections
> status : stable · tags : case-study, editorial, grid, proof

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `all_href` | string | non |  |  |
| `all_label_en` | string | non |  |  |
| `all_label_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `case_label_en` | string | non | CASE |  |
| `case_label_fr` | string | non | CASE |  |
| `cases` | array | oui |  | min:2 max:6 |
| `fig_num` | string | oui |  |  |
| `fig_title_en` | string | oui |  |  |
| `fig_title_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `impact_label_en` | string | non | Impact |  |
| `impact_label_fr` | string | non | Impact |  |
| `sector_label_en` | string | non | Sector |  |
| `sector_label_fr` | string | non | Secteur |  |
| `spec_en` | string | oui |  |  |
| `spec_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-fast` `--dur-hover` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-h2` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-1` `--space-5` `--space-6` `--space-7` `--space-9` `--text-body` `--text-h2` `--text-small` `--tracking-mono`

**Classes scoped** : .cases-arr .cases-client .cases-col .cases-col-k .cases-col-v .cases-foot .cases-h2 .cases-hd .cases-idx .cases-impact .cases-row .cases-spec .cases-tbl

**Tailwind** : row-lines

**Dette hardcode** : 18 valeur(s) — -0.015em, -2px, .14em, .16em, .1em, 1080px, 10px, 1100px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-5 --space-6. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-0.015em, -2px, .14em).

---

### `case-split`

> Cas client en split dark/light 50/50 : récit du cas à gauche (titre, body, CTA) et résultats chiffrés à droite.
> CaseSplit · src/components/sections/CaseSplit.astro · marketing/testimonial-sections
> status : stable · tags : case-study, results, solutions, split, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `body_en` | string | oui |  |  |
| `body_fr` | string | oui |  |  |
| `cta_href` | string | non | /realisations |  |
| `cta_label_en` | string | non | See full case → |  |
| `cta_label_fr` | string | non | Voir le cas complet → |  |
| `kicker_en` | string | non | Client case |  |
| `kicker_fr` | string | non | Cas client |  |
| `results` | array | oui |  | min:1 max:6 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-text` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--radius-xs` `--section-base` `--space-3` `--space-4` `--space-5` `--space-9` `--text-h2` `--text-small` `--tracking-body`

**Classes scoped** : .kicker .res-l .res-row .res-v .sol-case .sol-case-body .sol-case-cta .sol-case-dark .sol-case-grid .sol-case-light .sol-case-results .sol-case-title .wrap-inner

**Dette hardcode** : 12 valeur(s) — -0.016em, -0.01em, -2px, 0.1em, 100%, 1px, 20px, 22px

**Agent** : Espacement : --space-3 --space-4 --space-5. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-0.016em, -0.01em, -2px).

---

### `case-spotlight`

> Vitrine de cas concret insérable partout : carte INK avec visuel habillé + titre serti d’un relevé accent, citation à barre accent, métriques massives latérales, tags méta et CTA. Levier de conversion à fort impact.
> CaseSpotlight · src/components/sections/CaseSpotlight.astro · marketing/testimonial-sections
> status : stable · tags : case, conversion, dark, metrics, proof, spotlight

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `attribution_en` | string | non |  |  |
| `attribution_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cta_href` | string | non |  |  |
| `cta_label_en` | string | non |  |  |
| `cta_label_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `media_alt` | string | non |  |  |
| `media_caption` | string | non |  |  |
| `media_src` | string | non |  |  |
| `metrics` | array | non |  | max:3 |
| `quote_en` | string | non |  |  |
| `quote_fr` | string | non |  |  |
| `tags` | array | non |  | max:4 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |
| `variant` | enum | non |  | media-left | media-right |

**Tokens** : `--accent` `--accent-text` `--cs-mcols` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-card` `--radius-full` `--section-base` `--shadow-card-rest` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-9` `--text-h1` `--text-h2` `--text-h3` `--text-small`

**Classes scoped** : .acc .cspot .cspot__body .cspot__card .cspot__cite .cspot__cta .cspot__kicker .cspot__media .cspot__metric .cspot__metric-k .cspot__metric-l .cspot__metrics .cspot__quote .cspot__tags .cspot__title

**Dette hardcode** : 10 valeur(s) — -0.02em, -0.03em, .1em, 100%, 1px, 2px, 3px, 480px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-3. Couleur : --accent --accent-text --ink. Typographie : --font-display --font-mono. Dette : 10 litteral(s) hardcode(s) (-0.02em, -0.03em, .1em).

---

### `pull-quote-block`

> Citation éditoriale isolée centrée ou inline, wrapper catalogue autour de la molécule PullQuote.
> PullQuoteBlock · src/components/sections/PullQuoteBlock.astro · marketing/testimonial-sections
> status : stable · tags : closing, editorial, pullquote, quote

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cite_en` | string | non |  |  |
| `cite_fr` | string | non |  |  |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `variant` | enum | non | centered | breakout | inline | centered |

**Tokens** : `--hairline` `--ink` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--pull-quote-block-pad` `--section-loose` `--section-tight`

**Classes scoped** : .pull-quote .pull-quote-attr .pull-quote-block .pull-quote-body .pull-quote-cite .pull-quote-mark

**Dette hardcode** : 1 valeur(s) — 1px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Couleur : --ink --paper --paper-2. Dette : 1 litteral(s) hardcode(s) (1px).

---

### `quote-spotlight`

> Grande citation pleine lumiere sur fond paper-2 : guillemet decoratif, texte display italique, auteur avec avatar rond.
> QuoteSpotlight · src/components/sections/QuoteSpotlight.astro · marketing/testimonial-sections
> status : stable · tags : editorial, quote, spotlight, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `author` | string | oui |  |  |
| `avatar` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `role_en` | string | oui |  |  |
| `role_fr` | string | oui |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-full` `--section-base` `--space-1` `--space-4` `--space-5` `--space-7` `--text-display` `--text-h2` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .qs-author .qs-author-name .qs-author-role .qs-avatar .qs-avatar--placeholder .qs-caption .qs-figure .qs-mark .qs-quote .quote-spotlight .wrap-wide

**Dette hardcode** : 4 valeur(s) — 0.1em, 1px, 48px, 600px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (0.1em, 1px, 48px).

---

### `team-card-grid`

> Grille auto-fill de cartes auteurs avec photo, rôle, description, compteur de publications et CTA profil.
> TeamCardGrid · src/components/sections/TeamCardGrid.astro · marketing/testimonial-sections
> status : stable · tags : authors, cards, profiles, team

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `count_plural_en` | string | non | publications |  |
| `count_plural_fr` | string | non | publications |  |
| `count_singular_en` | string | non | publication |  |
| `count_singular_fr` | string | non | publication |  |
| `cta_label_en` | string | non | View profile → |  |
| `cta_label_fr` | string | non | Voir le profil → |  |
| `members` | array | oui |  | int min:0 max:6 |

**Tokens** : `--accent-text` `--dur-base` `--dur-trim` `--ease` `--ease-out` `--font-mono` `--font-sans` `--fw-medium` `--gut` `--hairline` `--ink` `--ink-rgb` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-xs` `--section-base` `--section-loose` `--space-2` `--space-4` `--space-6` `--space-8` `--text-body` `--text-h2` `--text-small` `--tracking-mono`

**Classes scoped** : .eq-card .eq-card-body .eq-card-count .eq-card-cta .eq-card-desc .eq-card-meta .eq-card-name .eq-card-photo .eq-card-role .eq-grid .eq-grid-sec .wrap

**Dette hardcode** : 10 valeur(s) — -2px, .1em, 100%, 1240px, 12px, 1px, 20px, 2px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-6. Couleur : --accent-text --ink --ink-rgb. Typographie : --font-mono --font-sans. Dette : 10 litteral(s) hardcode(s) (-2px, .1em, 100%).

---

### `testimonial-block`

> Bloc témoignage pour mettre en avant une citation client et renforcer la confiance.
> TestimonialBlock · src/components/sections/TestimonialBlock.astro · marketing/testimonial-sections
> status : stable · tags : quote, social-proof, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `layout` | enum | non | grid-2 | carousel | grid-2 | rows |
| `testimonials` | array | oui |  | min:1 max:6 |

**Tokens** : `--accent-text` `--font-display` `--hairline` `--ink` `--leading-lede` `--paper` `--paper-2` `--paper-3` `--space-1` `--space-4` `--space-7` `--spacing-block` `--text-h3`

**Classes scoped** : .testimonial-block .testimonial-block__author .testimonial-block__footer .testimonial-block__header .testimonial-block__item .testimonial-block__list .testimonial-block__quote

**Dette hardcode** : 5 valeur(s) — -1px, 1px, 20px, 2px, 640px

**Agent** : Layout : `background`, `layout` (schema, 0 CSS). Espacement : --space-1 --space-4 --space-7. Couleur : --accent-text --ink --paper. Typographie : --font-display --leading-lede. Dette : 5 litteral(s) hardcode(s) (-1px, 1px, 20px).

---

### `testimonial-logo-metric`

> Carte de preuve B2B la plus persuasive : logo client + citation attribuée + métrique d’impact chiffrée par carte. Combine preuve sociale, autorité de marque et résultat mesuré.
> TestimonialLogoMetric · src/components/sections/TestimonialLogoMetric.astro · marketing/testimonial-sections
> status : stable · tags : b2b, logo, metric, social-proof, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `cards` | array | oui |  | min:2 max:6 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-card` `--section-base` `--shadow-card-hover` `--shadow-card-rest` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body-md` `--text-h2` `--text-h3` `--text-small` `--tlm-cols` `--tracking-mono` `--wrap-prose`

**Classes scoped** : .tlm .tlm__author .tlm__author-name .tlm__author-role .tlm__card .tlm__grid .tlm__h2 .tlm__head .tlm__inner .tlm__kicker .tlm__logo .tlm__logo-text .tlm__metric .tlm__metric-label .tlm__metric-value .tlm__quote

**Dette hardcode** : 10 valeur(s) — -0.01em, -2px, .1em, 100%, 17px, 180px, 1px, 28px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --space-4 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 10 litteral(s) hardcode(s) (-0.01em, -2px, .1em).

---

### `testimonial-metrics`

> Témoignage chiffré : grande citation serif d’un côté + grille de 3 à 4 métriques massives de l’autre, reliées par une barre accent. Combine la voix client et le résultat mesuré en un seul bloc de réassurance.
> TestimonialMetrics · src/components/sections/TestimonialMetrics.astro · marketing/testimonial-sections
> status : stable · tags : b2b, metrics, proof, quote, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `author` | string | oui |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `company` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `metrics` | array | oui |  | min:3 max:4 |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `role_en` | string | oui |  |  |
| `role_fr` | string | oui |  |  |
| `variant` | enum | non |  | quote-left | quote-right |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-base` `--space-12` `--space-2` `--space-5` `--space-6` `--space-7` `--space-8` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--tm-cols` `--tracking-mono-tight`

**Classes scoped** : .tmet .tmet__attr .tmet__grid .tmet__kicker .tmet__metric .tmet__metric-k .tmet__metric-l .tmet__metrics-col .tmet__name .tmet__quote .tmet__quote-col .tmet__role

**Dette hardcode** : 8 valeur(s) — -0.01em, -0.03em, 1px, 2px, 480px, 860px, clamp(var(--space-5), clamp(var(--space-8)

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-12 --space-2 --space-5. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-0.01em, -0.03em, 1px).

---

### `testimonial-single-spotlight`

> Un seul témoignage en plein écran : grande citation, portrait, logo client et attribution nom/rôle. Donne tout le poids à une voix client, sombre par défaut.
> TestimonialSingleSpotlight · src/components/sections/TestimonialSingleSpotlight.astro · marketing/testimonial-sections
> status : stable · tags : portrait, quote, single, spotlight, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `author` | string | oui |  |  |
| `background` | enum | non | ink | paper | paper-2 | paper-3 | ink |
| `company` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logo_src` | string | non |  |  |
| `portrait_src` | string | non |  |  |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `role_en` | string | oui |  |  |
| `role_fr` | string | oui |  |  |

**Tokens** : `--font-display` `--font-mono` `--font-sans` `--fw-semibold` `--hairline` `--ink` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-grand` `--space-1` `--space-12` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .testimonial-spotlight .testimonial-spotlight__attr .testimonial-spotlight__author .testimonial-spotlight__grid .testimonial-spotlight__initials .testimonial-spotlight__logo .testimonial-spotlight__main .testimonial-spotlight__name .testimonial-spotlight__portrait .testimonial-spotlight__quote .testimonial-spotlight__role

**Dette hardcode** : 7 valeur(s) — 100%, 1px, 22px, 860px, 88px, clamp(var(--space-5), clamp(var(--space-8)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-12 --space-3. Couleur : --ink --muted --paper. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (100%, 1px, 22px).

---

## Timeline Sections

### `how-we-ship`

> Section "comment on livre", sticky pin scrub : N étapes avec numline et stage cards animées au scroll (graceful degradation mobile).
> HowWeShip · src/components/sections/HowWeShip.astro · marketing/timelines
> status : stable · tags : pin, process, scrub, steps, sticky, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | oui |  |  |
| `aside_fr` | string | oui |  |  |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `roman` | string | oui |  |  |
| `section_label_en` | string | oui |  |  |
| `section_label_fr` | string | oui |  |  |
| `steps` | array | oui |  | min:3 max:6 |

**Tokens** : `--accent-text` `--ease` `--font-display` `--font-sans` `--fw-medium` `--hairline` `--hairline-strong` `--muted` `--section-loose` `--space-12` `--space-8` `--space-9` `--text-display` `--text-h1` `--text-h2` `--text-h3`

**Classes scoped** : .how-we-ship .how-we-ship__body .how-we-ship__card .how-we-ship__numline .how-we-ship__pip .how-we-ship__roman .how-we-ship__stage .how-we-ship__sticky .how-we-ship__title .how-we-ship__tracks .how-we-ship__wrap .is-active .wrap-wide

**Dette hardcode** : 10 valeur(s) — -0.02em, -0.03em, 1200px, 120px, 18px, 1px, 20px, 640px

**Agent** : Espacement : --space-12 --space-8 --space-9. Couleur : --accent-text --muted. Typographie : --font-display --font-sans. Dette : 10 litteral(s) hardcode(s) (-0.02em, -0.03em, 1200px).

---

### `maturity-pyramid`

> Pyramide de maturité à quatre paliers avec timeline d'étapes, SVG progressif et grille de cartes asymétriques.
> MaturityPyramid · src/components/sections/MaturityPyramid.astro · marketing/timelines
> status : stable · tags : maturity, pyramid, tiers, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `label_en` | string | oui |  |  |
| `label_fr` | string | oui |  |  |
| `roman` | string | oui |  |  |
| `steps` | array | non |  |  |
| `tier_cta_en` | string | non | Open tier → |  |
| `tier_cta_fr` | string | non | Voir le palier → |  |
| `tiers` | array | oui |  |  |
| `timeline_label_en` | string | non | AI maturity path |  |
| `timeline_label_fr` | string | non | Progression de maturité IA |  |
| `variant` | enum | non | full | full | cards-only |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--dur-fast` `--dur-reveal` `--ease` `--font-display` `--font-mono` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-base` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--text-h2` `--text-h3` `--text-small` `--tracking-mono-tight`

**Classes scoped** : .e-action .e-body .e-gauge .e-gauge-fill .e-list .e-num .e-price .e-stage .e-tag .e-title .editorial-cell .in .is-visible .pyramid-asym .pyramid-cards-only .pyramid-step .pyramid-step-roman .pyramid-step-stage .pyramid-step-verb .pyramid-svg .pyramid-timeline .reveal-stagger .sec .sec-paper

**Dette hardcode** : 13 valeur(s) — -0.01em, -0.02em, -3px, 0.14em, 100%, 140px, 1px, 2px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 13 litteral(s) hardcode(s) (-0.01em, -0.02em, -3px).

---

### `method-timeline`

> Timeline méthodologique pour expliquer les étapes d'un accompagnement ou d'un processus.
> MethodTimeline · src/components/sections/MethodTimeline.astro · marketing/timelines
> status : stable · tags : method, steps, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `steps` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-lede` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--space-2` `--space-3` `--space-4` `--space-6` `--space-7` `--spacing-block` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-display` `--tracking-mono`

**Classes scoped** : .method-timeline .method-timeline__aside .method-timeline__content .method-timeline__header .method-timeline__label .method-timeline__list .method-timeline__meta .method-timeline__sn .method-timeline__step

**Dette hardcode** : 4 valeur(s) — 140px, 1px, 64px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-4. Couleur : --accent-text --ink --muted. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (140px, 1px, 64px).

---

### `steps-horizontal`

> Etapes numerotees en ligne avec pastilles et connecteurs hairline. Passage vertical sous 760px.
> StepsHorizontal · src/components/sections/StepsHorizontal.astro · marketing/timelines
> status : stable · tags : horizontal, process, steps, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `steps` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent` `--accent-ink` `--font-mono` `--font-sans` `--fw-medium` `--hairline-strong` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--radius-full` `--space-2` `--space-4` `--space-5` `--space-6` `--space-9` `--spacing-block` `--text-h3` `--text-small`

**Classes scoped** : .steps-horizontal .steps-horizontal__connector .steps-horizontal__content .steps-horizontal__header .steps-horizontal__list .steps-horizontal__pill .steps-horizontal__step .steps-horizontal__title .steps-horizontal__track

**Dette hardcode** : 3 valeur(s) — 1px, 40px, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-2 --space-4 --space-5. Couleur : --accent --accent-ink --ink. Typographie : --font-mono --font-sans. Dette : 3 litteral(s) hardcode(s) (1px, 40px, 760px).

---

### `tech-integration-flow`

> Position dans la stack en frise verticale numérotée (Timeline + Dingbat), un nœud par étape d intégration.
> TechIntegrationFlow · src/components/sections/TechIntegrationFlow.astro · marketing/timelines
> status : stable · tags : flow, integration, stack, technologies, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `aside_en` | string | non |  |  |
| `aside_fr` | string | non |  |  |
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `steps` | array | oui |  | min:1 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-rgb` `--font-display` `--font-sans` `--fw-medium` `--gut` `--ink` `--leading-body` `--leading-h1` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--section-loose` `--space-10` `--space-2` `--space-9` `--text-h1` `--text-small`

**Classes scoped** : .astro .dingbat .tech-aside .tech-int-flow .tech-integration .tech-sec .tech-sec-hd .tech-sec-paper .timeline-content .timeline-item-highlight .timeline-vertical .wrap

**Dette hardcode** : 8 valeur(s) — -0.018em, 1240px, 18px, 1px, 22px, 480px, 800px, 820px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-9. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.018em, 1240px, 18px).

---

### `timeline-block`

> Bloc chronologique pour raconter une progression, un historique ou une séquence d'événements.
> TimelineBlock · src/components/sections/TimelineBlock.astro · marketing/timelines
> status : stable · tags : events, history, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non |  | paper | paper-2 | paper-3 | ink |
| `events` | array | oui |  | min:2 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |

**Tokens** : `--font-sans` `--fw-medium` `--hairline` `--ink` `--leading-h3` `--leading-relaxed` `--muted` `--paper` `--paper-2` `--paper-3` `--space-1` `--space-2` `--space-5` `--space-6` `--spacing-block` `--text-body` `--text-h2` `--text-h3`

**Classes scoped** : .timeline-block .timeline-block__content .timeline-block__date .timeline-block__event .timeline-block__list .timeline-block__title

**Dette hardcode** : 3 valeur(s) — 120px, 1px, 600px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-5. Couleur : --ink --muted --paper. Typographie : --font-sans --fw-medium. Dette : 3 litteral(s) hardcode(s) (120px, 1px, 600px).

---

### `timeline-horizontal`

> Frise chronologique horizontale datée (roadmap) : événements à statut (done/active/upcoming), date, label et body, scroll-snap horizontal, empilement vertical sur mobile.
> TimelineHorizontal · src/components/sections/TimelineHorizontal.astro · marketing/timelines
> status : stable · tags : dated, horizontal, milestones, roadmap, scroll, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `events` | array | oui |  | min:2 max:10 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--accent-rgb` `--accent-text` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline-strong` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-base` `--space-1` `--space-11` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-9` `--text-body` `--text-h2` `--text-h3` `--text-small` `--tracking-mono`

**Classes scoped** : .acc .timeline-h .timeline-h__body .timeline-h__card .timeline-h__date .timeline-h__dot .timeline-h__event .timeline-h__h2 .timeline-h__hd .timeline-h__intro .timeline-h__label .timeline-h__rail .timeline-h__status .timeline-h__track

**Dette hardcode** : 8 valeur(s) — -0.02em, -50%, 14px, 240px, 2px, 3px, 50%, 760px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-11 --space-2. Couleur : --accent --accent-rgb --accent-text. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-0.02em, -50%, 14px).

---

## Trust Sections

### `trust-badges-band`

> Bandeau de badges de réassurance (sécurité, hébergement, conformité RGPD, garanties) en cellules hairline mono, placé juste avant le CTA pour lever l’objection risque.
> TrustBadgesBand · src/components/sections/TrustBadgesBand.astro · marketing/trust-sections
> status : stable · tags : badges, compliance, reassurance, security, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | paper-3 | ink |
| `badges` | array | oui |  | min:3 max:8 |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `variant` | enum | non | cells | cells | strip |

**Tokens** : `--accent` `--accent-text` `--font-mono` `--font-sans` `--fw-medium` `--fw-semibold` `--hairline` `--ink` `--leading-h3` `--muted` `--paper` `--paper-2` `--paper-3` `--paper-rgb` `--radius-full` `--section-tight` `--space-2` `--space-3` `--space-5` `--space-6` `--tb-cols` `--text-body` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .trust-badges .trust-badges__cell .trust-badges__glyph .trust-badges__grid .trust-badges__h2 .trust-badges__head .trust-badges__item .trust-badges__item-glyph .trust-badges__item-label .trust-badges__kicker .trust-badges__label .trust-badges__strip .trust-badges__value

**Dette hardcode** : 8 valeur(s) — -0.01em, .04em, .1em, 1px, 20px, 4px, 560px, 900px

**Agent** : Layout : `background`, `variant` (schema, 0 CSS). Espacement : --space-2 --space-3 --space-5. Couleur : --accent --accent-text --ink. Typographie : --font-mono --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.01em, .04em, .1em).

---

### `trust-legal-section`

> Masthead documentaire avec meta de révision et sommaire sticky pour pages confiance, gouvernance et légales.
> TrustLegalSection · src/components/sections/TrustLegalSection.astro · marketing/trust-sections
> status : stable · tags : governance, legal, toc, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `legal_footer_en` | string | non |  |  |
| `legal_footer_fr` | string | non |  |  |
| `revised_at` | string | oui |  |  |
| `sections` | array | oui |  | min:1 max:12 |
| `version` | string | non |  |  |

**Tokens** : `--accent-text` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--ink-2` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--section-loose` `--space-10` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body` `--text-display` `--text-h1` `--text-h3` `--text-small` `--tracking-mono-tight`

**Classes scoped** : .trust-body .trust-footer-version .trust-grid .trust-h1 .trust-hd .trust-kicker .trust-lede .trust-legal-footer .trust-meta .trust-sections .trust-toc .trust-toc-k .trust-toc-num

**Dette hardcode** : 18 valeur(s) — -0.028em, -0.02em, 0.1em, 0.5em, 1.2em, 1.4em, 1.5em, 100px

**Agent** : Espacement : --space-10 --space-2 --space-3. Couleur : --accent-text --ink --ink-2. Typographie : --font-display --font-mono. Dette : 18 litteral(s) hardcode(s) (-0.028em, -0.02em, 0.1em).

---

## Utility Sections

### `welcome-section`

> Écran de confirmation post-conversion avec checkmark, message central, trois prochaines étapes et lien retour.
> WelcomeSection · src/components/sections/WelcomeSection.astro · marketing/utility-sections
> status : stable · tags : confirmation, post-conversion, steps, welcome

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `back_href` | string | non |  |  |
| `back_label_en` | string | non |  |  |
| `back_label_fr` | string | non |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `next_steps` | array | oui |  | min:1 max:3 |

**Tokens** : `--accent` `--accent-sur-clair` `--accent-text` `--dur-fast` `--dur-trim` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink-2` `--leading-body` `--leading-h1` `--leading-h3` `--muted` `--paper-2` `--radius-lg` `--section-loose` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--text-h1` `--text-h2` `--text-h3` `--text-small` `--wrap-prose`

**Classes scoped** : .welcome .welcome-back .welcome-foot .welcome-h1 .welcome-kicker .welcome-lede .welcome-mark .welcome-step .welcome-step-cta .welcome-step-num .welcome-step-text .welcome-step-title .welcome-steps .welcome-wrap

**Dette hardcode** : 11 valeur(s) — -0.018em, -0.028em, 0.04em, 10px, 18px, 1px, 20px, 2px

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-sur-clair --accent-text. Typographie : --font-display --font-mono. Dette : 11 litteral(s) hardcode(s) (-0.018em, -0.028em, 0.04em).

---
