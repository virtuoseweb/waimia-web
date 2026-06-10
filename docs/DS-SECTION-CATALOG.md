# DS Section Catalog

> Machine-readable catalog of all registry section types.
> Source : `gen-section-manifest.mjs` (deterministic, do not edit by hand).
> Sections : 89

---

## Comparison Sections

### `comparison-duo`

> Deux cartes cote a cote (Sans / Avec) pour mettre en evidence le contraste avant/apres ou nous-vs-eux, avec items a puces et glyphes differencies.
> ComparisonDuo · src/components/sections/ComparisonDuo.astro · marketing/comparison-sections
> status : stable · tags : before-after, comparison, duo, versus

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--accent-rgb` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--paper-3` `--radius-xs` `--shadow-paper-lift` `--space-1` `--space-3` `--space-4` `--space-5` `--space-6` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-h2-section` `--text-mono-xs`

**Classes scoped** : .comparison-duo .comparison-duo__badge .comparison-duo__badge--with .comparison-duo__badge--without .comparison-duo__card .comparison-duo__card--with .comparison-duo__card-header .comparison-duo__card-title .comparison-duo__card-title--with .comparison-duo__glyph .comparison-duo__grid .comparison-duo__header .comparison-duo__item .comparison-duo__item--with .comparison-duo__item--without .comparison-duo__list

**Dette hardcode** : 7 valeur(s) — 0.14em, 10px, 1px, 2px, 768px, clamp(16px, 1.4vw, 22px), clamp(24px, 3vw, 40px)

**Agent** : Espacement : --space-1 --space-3 --space-4. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (0.14em, 10px, 1px).

---

### `comparison-table`

> Tableau comparatif pour clarifier les différences entre offres, options ou approches.
> ComparisonTable · src/components/sections/ComparisonTable.astro · marketing/comparison-sections
> status : stable · tags : comparison, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `column_headers_en` | array | oui |  | min:2 |
| `column_headers_fr` | array | oui |  | min:2 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `rows` | array | oui |  | min:2 |

**Tokens** : `--accent` `--accent-rgb` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--space-3` `--space-4` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section` `--text-mono-xs`

**Classes scoped** : .comparison-table .comparison-table__bool .comparison-table__bool--no .comparison-table__bool--yes .comparison-table__cell .comparison-table__feature .comparison-table__wrap

**Dette hardcode** : 5 valeur(s) — .14em, 100%, 14px, 1px, 200px

**Agent** : Espacement : --space-3 --space-4 --spacing-block. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (.14em, 100%, 14px).

---

### `fit-columns`

> Section de qualification fit/no-fit sur fond ink : kicker, titre display, intro callout et deux colonnes Oui/Non d items.
> FitColumnsSection · src/components/sections/FitColumnsSection.astro · marketing/comparison-sections
> status : stable · tags : fit, ink, qualification, two-columns, yes-no

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `no_items` | array | oui |  | min:1 max:8 |
| `no_title_en` | string | oui |  |  |
| `no_title_fr` | string | oui |  |  |
| `yes_items` | array | oui |  | min:1 max:8 |
| `yes_title_en` | string | oui |  |  |
| `yes_title_fr` | string | oui |  |  |

**Tokens** : `--ease` `--font-display` `--font-sans` `--fw-regular` `--ink` `--paper` `--paper-rgb` `--space-6`

**Classes scoped** : .astro .callout .callout-body .fit-col .fit-sec .fit-sec-callout .fit-sec-cols .fit-sec-h2 .fit-sec-kicker .hub-fit

**Dette hardcode** : 8 valeur(s) — -0.028em, -2px, 1px, 60px, 760px, clamp(36px, 5vw, 56px), clamp(48px, 7vw, 112px), clamp(80px, 10vw, 120px)

**Agent** : Espacement : --space-6. Couleur : --ink --paper --paper-rgb. Typographie : --font-display --font-sans. Dette : 8 litteral(s) hardcode(s) (-0.028em, -2px, 1px).

---

## CTA Sections

### `branded-callout`

> Callout de marque fond paper-2 avec kicker §, titre display italique et corps de deux paragraphes, CTA optionnel.
> BrandedCallout · src/components/sections/BrandedCallout.astro · marketing/cta-sections
> status : stable · tags : brand, callout, os, paper-2

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `body1_en` | string | oui |  |  |
| `body1_fr` | string | oui |  |  |
| `body2_en` | string | non |  |  |
| `body2_fr` | string | non |  |  |
| `cta` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--muted` `--paper-2` `--space-3` `--space-5` `--text-body-lead` `--text-eyebrow`

**Classes scoped** : .branded-callout .branded-callout__body1 .branded-callout__body2 .branded-callout__box .branded-callout__cta .branded-callout__h2 .branded-callout__kicker

**Dette hardcode** : 10 valeur(s) — -0.022em, 0.14em, 18px, 1px, 20px, 640px, 800px, clamp(24px, 2.8vw, 44px)

**Agent** : Espacement : --space-3 --space-5. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 10 litteral(s) hardcode(s) (-0.022em, 0.14em, 18px).

---

### `cta-band`

> Bandeau CTA horizontal pour relancer une action au milieu ou en fin de parcours.
> CtaBandSection · src/components/sections/CtaBandSection.astro · marketing/cta-sections
> status : stable · tags : band, cta, inline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper-2 | paper-2 | ink | accent |
| `cta` | object | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-sans` `--hairline` `--ink` `--leading-body` `--paper` `--paper-2` `--space-5` `--text-body-md`

**Classes scoped** : .cta-band .cta-band__inner .cta-band__text

**Dette hardcode** : 2 valeur(s) — 1px, 20px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-5. Couleur : --accent --ink --paper. Typographie : --font-sans --leading-body. Dette : 2 litteral(s) hardcode(s) (1px, 20px).

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
| `background` | enum | non | ink | paper | paper-2 | ink | accent |
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-body` `--muted` `--paper` `--paper-2` `--space-3` `--spacing-block` `--spacing-section` `--text-eyebrow` `--text-h2-grand` `--tracking-mono`

**Classes scoped** : .cta-final .cta-final__avail .cta-final__chapter .cta-final__ctas .cta-final__inner .cta-final__sub

**Dette hardcode** : 4 valeur(s) — 1px, 560px, clamp(13px, 1.05vw, 15px), clamp(16px, 1.4vw, 20px)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-3 --spacing-block --spacing-section. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 4 litteral(s) hardcode(s) (1px, 560px, clamp(13px, 1.05vw, 15px)).

---

### `cta-inline`

> CTA inline discret pour insérer une action contextuelle dans un contenu existant.
> CtaInline · src/components/sections/CtaInline.astro · marketing/cta-sections
> status : stable · tags : cta, inline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta` | object | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--font-sans` `--hairline` `--ink` `--leading-body` `--paper-2` `--space-4` `--text-body-sm`

**Classes scoped** : .cta-inline .cta-inline__text

**Dette hardcode** : 3 valeur(s) — 1px, 200px, 20px

**Agent** : Espacement : --space-4. Couleur : --ink --paper-2. Typographie : --font-sans --leading-body. Dette : 3 litteral(s) hardcode(s) (1px, 200px, 20px).

---

### `cta-split-visual`

> Bandeau CTA asymetrique 2 colonnes : texte kicker/titre/body/boutons a gauche, visuel SVG decoratif a droite. Distinct des CTA centres.
> CtaSplitVisual · src/components/sections/CtaSplitVisual.astro · marketing/cta-sections
> status : stable · tags : banner, cta, split, visual

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper-2 | paper | paper-2 | ink | accent |
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-display` `--font-sans` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--space-1` `--space-10` `--space-3` `--space-5` `--space-8` `--spacing-section` `--text-body-md` `--text-h2-section`

**Classes scoped** : .cta-split .cta-split__body .cta-split__ctas .cta-split__inner .cta-split__kicker .cta-split__svg .cta-split__text .cta-split__visual

**Dette hardcode** : 5 valeur(s) — 100%, 1px, 240px, 320px, 768px

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-1 --space-10 --space-3. Couleur : --accent --ink --muted. Typographie : --font-display --font-sans. Dette : 5 litteral(s) hardcode(s) (100%, 1px, 240px).

---

### `newsletter-band`

> Bande newsletter fond sombre : titre éditorial large à gauche, formulaire capture email à droite.
> NewsletterBand · src/components/sections/NewsletterBand.astro · marketing/cta-sections
> status : stable · tags : band, capture, dark, email, newsletter

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--ink` `--paper` `--paper-rgb` `--space-4` `--text-body-lead` `--text-caption` `--text-eyebrow`

**Classes scoped** : .newsletter-band .newsletter-band__btn .newsletter-band__field .newsletter-band__h2 .newsletter-band__hint .newsletter-band__inner .newsletter-band__input .newsletter-band__kicker .newsletter-band__lead

**Tailwind** : sr-only

**Dette hardcode** : 16 valeur(s) — -0.024em, 0.06em, 0.08em, 0.14em, 10px, 14px, 16px, 18px

**Agent** : Espacement : --space-4. Couleur : --accent --ink --paper. Typographie : --font-display --font-mono. Dette : 16 litteral(s) hardcode(s) (-0.024em, 0.06em, 0.08em).

---

## FAQ Sections

### `faq-accordion`

> FAQ en accordéon pour répondre aux questions fréquentes sans surcharger la page.
> FaqAccordion · src/components/sections/FaqAccordion.astro · marketing/faq-sections
> status : stable · tags : accordion, faq

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--leading-h3` `--muted` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section`

**Classes scoped** : .faq-accordion .faq-accordion__a .faq-accordion__arrow .faq-accordion__header .faq-accordion__intro .faq-accordion__item .faq-accordion__q .faq-accordion__q-label

**Dette hardcode** : 5 valeur(s) — 1px, 20px, 2px, 56px, clamp(16px, 1.6vw, 22px)

**Agent** : Espacement : --space-4 --space-5 --spacing-block. Couleur : --ink --muted. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (1px, 20px, 2px).

---

### `objection-handler`

> Bloc de traitement des objections pour lever les freins et rassurer avant conversion.
> ObjectionHandler · src/components/sections/ObjectionHandler.astro · marketing/faq-sections
> status : stable · tags : faq, objections, reassurance

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `objections` | array | oui |  | min:2 |

**Tokens** : `--font-display` `--font-sans` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--space-3` `--space-5` `--space-6` `--spacing-block` `--spacing-section` `--text-body-md` `--text-h2-section`

**Classes scoped** : .objection-handler .objection-handler__list .objection-handler__objection .objection-handler__response .objection-handler__row .objection-handler__table-head

**Dette hardcode** : 3 valeur(s) — 1px, 640px, clamp(15px, 1.4vw, 18px)

**Agent** : Espacement : --space-3 --space-5 --space-6. Couleur : --ink --muted. Typographie : --font-display --font-sans. Dette : 3 litteral(s) hardcode(s) (1px, 640px, clamp(15px, 1.4vw, 18px)).

---

## Feature Sections

### `architecture-diagram`

> Diagramme d'architecture signature : N canaux d'entrée vers un système central et M sorties, avec boucle d'amélioration continue.
> ArchitectureDiagram · src/components/sections/ArchitectureDiagram.astro · marketing/feature-sections
> status : stable · tags : architecture, diagram, svg, system

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `caption_en` | string | oui |  |  |
| `caption_fr` | string | oui |  |  |
| `fig_num` | string | oui |  |  |
| `fig_title_en` | string | oui |  |  |
| `fig_title_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
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

**Tokens** : `--accent` `--accent-rgb` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--ink` `--ink-2` `--leading-h2` `--muted` `--paper` `--text-eyebrow` `--text-h2-section` `--tracking-display` `--wrap-prose`

**Classes scoped** : .css .sysarch .sysarch-cap .sysarch-fig .sysarch-h2 .sysarch-hd .sysarch-spec .sysarch-svg

**Dette hardcode** : 16 valeur(s) — 0.1em, 100%, 10px, 14px, 1px, 240px, 320px, 700px

**Agent** : Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 16 litteral(s) hardcode(s) (0.1em, 100%, 10px).

---

### `bento-grid`

> Mosaique bento asymetrique de 5 cellules (1 grande 2x2 + 4 petites) pour valoriser les capacites cles avec une mise en page moderne.
> BentoGrid · src/components/sections/BentoGrid.astro · marketing/feature-sections
> status : stable · tags : asymmetric, bento, feature, grid

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cells` | array | non |  | min:5 max:5 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--paper` `--radius-sm` `--shadow-card-hover` `--space-1` `--space-3` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-eyebrow` `--text-h2-section`

**Classes scoped** : .bento-grid .bento-grid__body .bento-grid__cell .bento-grid__cell--1 .bento-grid__cell--2 .bento-grid__cell--3 .bento-grid__cell--4 .bento-grid__cell--5 .bento-grid__glyph .bento-grid__header .bento-grid__mosaic .bento-grid__title

**Dette hardcode** : 9 valeur(s) — -2px, 1023px, 1px, 760px, 761px, clamp(16px, 1.4vw, 22px), clamp(20px, 2vw, 30px), clamp(24px, 3vw, 40px)

**Agent** : Espacement : --space-1 --space-3 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-2px, 1023px, 1px).

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
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `pills_en` | array | oui |  | min:1 max:16 |
| `pills_fr` | array | oui |  | min:1 max:16 |

**Tokens** : `--font-display` `--font-mono` `--fw-regular` `--hairline` `--hairline-strong` `--muted` `--paper-2` `--radius-sm` `--space-2` `--space-6` `--text-caption`

**Classes scoped** : .coming-h2 .coming-list .coming-pill .hub-coming

**Dette hardcode** : 9 valeur(s) — -0.022em, 0.1em, 10px, 18px, 1px, 640px, clamp(32px, 4vw, 56px), clamp(32px, 4vw, 60px)

**Agent** : Espacement : --space-2 --space-6. Couleur : --muted --paper-2. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (-0.022em, 0.1em, 10px).

---

### `commitments-grid`

> Grille hairline de 2 à 6 engagements ou garanties, titre display et corps sans  ·  extrait de la page Méthode.
> CommitmentsGrid · src/components/sections/CommitmentsGrid.astro · marketing/feature-sections
> status : stable · tags : commitments, grid, guarantees, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `commitments` | array | oui |  | min:2 max:6 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h2` `--muted` `--space-3` `--text-body-sm` `--text-eyebrow` `--text-h2-section` `--tracking-display`

**Classes scoped** : .commitments-grid .commitments-grid__body .commitments-grid__cell .commitments-grid__cell-body .commitments-grid__cell-title .commitments-grid__grid .commitments-grid__h2 .commitments-grid__kicker

**Dette hardcode** : 12 valeur(s) — -0.018em, 0.14em, 14px, 16px, 1px, 640px, 760px, 800px

**Agent** : Espacement : --space-3. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-0.018em, 0.14em, 14px).

---

### `deliverables-grid`

> Grille de livrables tangibles avec cards numérotées et tag format/durée, extraite des pages offre et détail.
> DeliverablesGrid · src/components/sections/DeliverablesGrid.astro · marketing/feature-sections
> status : stable · tags : cards, deliverables, grid, offer

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `items` | array | non |  | min:2 max:8 |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lead_en` | string | non |  |  |
| `lead_fr` | string | non |  |  |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |

**Tokens** : `--accent` `--deliverables-grid-cols` `--deliverables-grid-inline` `--deliverables-grid-pad` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-h3` `--muted` `--paper-2` `--section-loose` `--space-11` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body-md` `--text-eyebrow` `--text-h2-section` `--text-h3-row` `--text-mono-xs` `--tracking-display` `--tracking-mono` `--wrap-read`

**Classes scoped** : .deliverables-grid .deliverables-grid__card .deliverables-grid__grid .deliverables-grid__hd .deliverables-grid__kicker .deliverables-grid__lead .deliverables-grid__tag .deliverables-grid__title

**Dette hardcode** : 6 valeur(s) — -2px, 1px, 640px, 680px, clamp(var(--space-11), clamp(var(--space-8)

**Agent** : Espacement : --space-11 --space-12 --space-2. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (-2px, 1px, 640px).

---

### `editorial-preview`

> Index éditorial de publications en lignes numérotées (num · date · tag · titre italique · flèche)  ·  extrait de FieldNotes.
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
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `items` | array | oui |  | min:2 max:8 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `roman` | string | non |  |  |

**Tokens** : `--accent` `--accent-rgb` `--dur-fast` `--ease` `--font-display` `--font-mono` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--muted` `--text-body-sm` `--text-eyebrow` `--text-h3-row` `--text-mono-xs` `--tracking-mono` `--wrap-read`

**Classes scoped** : .css .notes-foot .notes-foot-link .notes-index .notes-row .notes-row-arr .notes-row-date .notes-row-num .notes-row-tag .notes-row-text .sec

**Dette hardcode** : 19 valeur(s) — -0.015em, 0.14em, 0.1em, 110px, 14px, 1px, 2px, 32px

**Agent** : Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 19 litteral(s) hardcode(s) (-0.015em, 0.14em, 0.1em).

---

### `editorial-split-grid`

> Split éditorial deux colonnes pour lister blog et livres blancs, chacun avec cartes connexes et CTA.
> EditorialSplitGrid · src/components/sections/EditorialSplitGrid.astro · marketing/feature-sections
> status : stable · tags : blog, editorial, resources, whitepapers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `left` | literal | non | left | min:1 max:3 |
| `right` | literal | non | right | min:1 max:3 |

**Tokens** : `--accent` `--font-display` `--font-sans` `--fw-regular` `--hairline` `--muted` `--space-6`

**Classes scoped** : .hub-blog-cta .hub-blog-h2 .hub-blog-k .hub-blog-lb .hub-blog-lb-grid .hub-blog-lead .hub-lb-cta .hub-lb-h2 .hub-lb-k .hub-lb-lead

**Dette hardcode** : 11 valeur(s) — -0.022em, 14px, 18px, 1px, 28px, 800px, clamp(15px, 1.6vw, 18px), clamp(20px, 2.5vw, 32px)

**Agent** : Espacement : --space-6. Couleur : --accent --muted. Typographie : --font-display --font-sans. Dette : 11 litteral(s) hardcode(s) (-0.022em, 14px, 18px).

---

### `feature-grid`

> Grille de fonctionnalités pour structurer les bénéfices ou capacités principales d'une offre.
> FeatureGrid · src/components/sections/FeatureGrid.astro · marketing/feature-sections
> status : stable · tags : features, grid

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `columns` | enum | non | 3 | 2 | 3 | 4 |
| `features` | array | oui |  | min:3 max:8 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--space-1` `--space-4` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-h2-section`

**Classes scoped** : .feature-grid .feature-grid__header .feature-grid__icon .feature-grid__item .feature-grid__list .feature-grid__title

**Dette hardcode** : 6 valeur(s) — -1px, 10px, 1px, 768px, clamp(16px, 1.4vw, 20px), clamp(20px, 2.5vw, 40px)

**Agent** : Layout : `columns` (schema, 0 CSS). Espacement : --space-1 --space-4 --spacing-block. Couleur : --ink --muted. Typographie : --font-display --font-sans. Dette : 6 litteral(s) hardcode(s) (-1px, 10px, 1px).

---

### `feature-tabs`

> Section fonctionnalites en onglets cliquables : barre de tabs aria-compliant + panneau texte/visuel. Interactif vanilla JS, 0 dependance.
> FeatureTabs · src/components/sections/FeatureTabs.astro · marketing/feature-sections
> status : stable · tags : feature, interactive, tabbed, tabs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `tabs` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--paper` `--paper-2` `--radius-md` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-9` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section` `--text-h3-row`

**Classes scoped** : .feature-tabs .feature-tabs__header .feature-tabs__intro .feature-tabs__panel .feature-tabs__panel-content .feature-tabs__panel-text .feature-tabs__panel-visual .feature-tabs__tab .feature-tabs__tab-icon .feature-tabs__tab-label .feature-tabs__tablist .feature-tabs__visual-box .feature-tabs__visual-label .is-active

**Dette hardcode** : 6 valeur(s) — -1px, 100%, 1px, 2px, 768px, clamp(400px, 60vw, 760px)

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 6 litteral(s) hardcode(s) (-1px, 100%, 1px).

---

### `feature-zigzag`

> Lignes alternées visuel/texte (gauche-droite, droite-gauche) pour presenter les fonctionnalites cles d'une offre avec un rythme editorial fort.
> FeatureZigzag · src/components/sections/FeatureZigzag.astro · marketing/feature-sections
> status : stable · tags : alternating, feature, rows, zigzag

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `rows` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--font-display` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--muted-2` `--paper` `--paper-2` `--radius-lg` `--radius-md` `--space-2` `--space-4` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-h2-section`

**Classes scoped** : .fz .fz__header .fz__lede .fz__link .fz__row .fz__rows .fz__svg .fz__text .fz__visual

**Dette hardcode** : 10 valeur(s) — 100%, 1px, 3px, 640px, 759px, 760px, 8px, clamp(22px, 2.4vw, 32px)

**Agent** : Espacement : --space-2 --space-4 --spacing-block. Couleur : --accent --ink --muted. Typographie : --font-display --font-sans. Dette : 10 litteral(s) hardcode(s) (100%, 1px, 3px).

---

### `guarantee-block`

> Bloc garantie pour expliciter les engagements, réduire le risque perçu et rassurer.
> GuaranteeBlock · src/components/sections/GuaranteeBlock.astro · marketing/feature-sections
> status : stable · tags : guarantee, reassurance, trust

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `guarantees` | array | oui |  | min:1 max:4 |

**Tokens** : `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--muted` `--space-1` `--space-2` `--space-5` `--spacing-section` `--text-body-md`

**Classes scoped** : .guarantee-block .guarantee-block__content .guarantee-block__item .guarantee-block__list .guarantee-block__num .guarantee-block__title

**Dette hardcode** : 4 valeur(s) — 1px, 56px, 600px, clamp(18px, 1.8vw, 24px)

**Agent** : Espacement : --space-1 --space-2 --space-5. Couleur : --ink --muted. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (1px, 56px, 600px).

---

### `icon-trio`

> Trois colonnes iconographiques avec titre et description, séparées par des hairlines verticaux. Idéal pour présenter 3 piliers ou bénéfices distincts.
> IconTrio · src/components/sections/IconTrio.astro · marketing/feature-sections
> status : stable · tags : columns, feature, icons, trio

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `items` | array | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--space-4` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-h2-section`

**Classes scoped** : .icon-trio .icon-trio__body .icon-trio__col .icon-trio__cols .icon-trio__glyph .icon-trio__title .kicker .wrap-wide

**Dette hardcode** : 5 valeur(s) — 1px, 768px, clamp(16px, 1.4vw, 20px), clamp(20px, 2.5vw, 40px), clamp(28px, 3vw, 40px)

**Agent** : Espacement : --space-4 --spacing-block --spacing-section. Couleur : --accent --ink --muted. Typographie : --font-display --font-sans. Dette : 5 litteral(s) hardcode(s) (1px, 768px, clamp(16px, 1.4vw, 20px)).

---

### `inclusions-list`

> Liste d'inclusions inline séparée par point médian pour expliciter le périmètre d'un engagement.
> InclusionsList · src/components/sections/InclusionsList.astro · marketing/feature-sections
> status : stable · tags : inclusions, inline-list, offer, scope

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `items_en` | array | oui |  | min:2 max:16 |
| `items_fr` | array | oui |  | min:2 max:16 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `title_en` | string | non |  |  |
| `title_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--inclusions-list-pad` `--ink` `--leading-body` `--leading-h2` `--section-loose` `--space-10` `--space-2` `--space-4` `--space-5` `--space-6` `--space-7` `--text-body-md` `--text-body-sm` `--text-eyebrow` `--text-h2-section` `--tracking-display` `--tracking-mono`

**Classes scoped** : .inclusions-list .inclusions-list__hd .inclusions-list__items .inclusions-list__kicker .inclusions-list__title

**Dette hardcode** : 5 valeur(s) — 1px, clamp(var(--space-10), clamp(var(--space-5), clamp(var(--space-7), clamp(var(--text-body-sm)

**Agent** : Espacement : --space-10 --space-2 --space-4. Couleur : --accent --ink. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (1px, clamp(var(--space-10), clamp(var(--space-5)).

---

### `manifesto-block`

> Bloc manifeste intercalary : kicker mono § + grand bloc display italique sans box, span accent terracotta, respiration éditoriale forte.
> ManifestoBlock · src/components/sections/ManifestoBlock.astro · marketing/feature-sections
> status : stable · tags : editorial, italic, large-display, manifesto, statement

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `text_en` | string | oui |  |  |
| `text_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--fw-regular` `--paper` `--space-5`

**Classes scoped** : .acc .manifesto-block .manifesto-block__kicker .manifesto-block__text .wrap-wide

**Dette hardcode** : 6 valeur(s) — -0.02em, 1200px, 1300px, clamp(140px,18vw,260px), clamp(20px, 4vw, 48px), clamp(36px,6.2vw,96px)

**Agent** : Espacement : --space-5. Couleur : --accent --paper. Typographie : --font-display --fw-regular. Dette : 6 litteral(s) hardcode(s) (-0.02em, 1200px, 1300px).

---

### `offer-tier-grid`

> Section de palier d’offres avec eyebrow, H2, lede, grille de cartes et variante hero sombre optionnelle.
> OfferTierGrid · src/components/sections/OfferTierGrid.astro · marketing/feature-sections
> status : stable · tags : cards, offers, pricing, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--dur-fast` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h1` `--leading-prose` `--muted` `--muted-2` `--paper` `--paper-2` `--paper-rgb` `--space-6` `--text-body-lead` `--text-caption` `--text-eyebrow` `--tracking-mono` `--wrap-read`

**Classes scoped** : .card-cta .card-lead .card-price .card-title .hero-card .hero-card-cta .hero-card-eyebrow .hero-card-lead .hero-card-sub .hero-card-title .offer-card .offer-card--transparent .tier-eyebrow .tier-grid .tier-h2 .tier-ii .tier-ii-grid .tier-iii-grid .tier-lede .tier-section .wrap-wide

**Dette hardcode** : 26 valeur(s) — -0.024em, -0.02em, -0.03em, -2px, -3px, 0.14em, 0.1em, 14px

**Agent** : Layout : `variant` (schema, 0 CSS). Espacement : --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 26 litteral(s) hardcode(s) (-0.024em, -0.02em, -0.03em).

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

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--ink` `--paper` `--paper-rgb` `--radius-md` `--space-2` `--space-3` `--space-7` `--space-8` `--text-eyebrow` `--text-mono-xs` `--tracking-display` `--wrap-read`

**Classes scoped** : .operating-layer .operating-layer__attr-k .operating-layer__attr-v .operating-layer__attrs .operating-layer__console-body .operating-layer__console-cmd .operating-layer__console-k .operating-layer__console-row .operating-layer__console-v .operating-layer__ctas .operating-layer__grid .operating-layer__h2 .operating-layer__hd .operating-layer__lede .operating-layer__spec .wrap-wide

**Dette hardcode** : 21 valeur(s) — .12em, .1em, 10px, 1200px, 140px, 14px, 1px, 20px

**Agent** : Espacement : --space-2 --space-3 --space-7. Couleur : --accent --ink --paper. Typographie : --font-display --font-mono. Dette : 21 litteral(s) hardcode(s) (.12em, .1em, 10px).

---

### `persona-attributes-grid`

> Grille persona 2×2 pain points / critères / objections / preuves avec footer méta sombre en trois colonnes.
> PersonaAttributesGrid · src/components/sections/PersonaAttributesGrid.astro · marketing/feature-sections
> status : stable · tags : attributes, grid, meta, persona

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `blocks` | array | oui |  | min:1 |
| `meta` | array | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--hairline` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--paper-2` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--text-body-sm` `--text-mono-xs`

**Classes scoped** : .persona-detail__block .persona-detail__grid .persona-detail__meta .persona-kicker .persona-kicker--dark

**Dette hardcode** : 5 valeur(s) — .14em, 1px, 6px, 768px, clamp(18px, 1.6vw, 22px)

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (.14em, 1px, 6px).

---

### `problem-statement`

> Énoncé macro-typographique du problème avec stats optionnelles en grille hairline.
> ProblemStatement · src/components/sections/ProblemStatement.astro · marketing/feature-sections
> status : stable · tags : macro-typography, metrics, problem, statement

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `dropcap` | boolean | non |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `statement_en` | string | oui |  |  |
| `statement_fr` | string | oui |  |  |
| `stats` | array | non |  | max:4 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h2` `--muted` `--problem-statement-cols` `--problem-statement-inline` `--problem-statement-pad` `--section-loose` `--space-11` `--space-12` `--space-2` `--space-5` `--space-6` `--space-8` `--text-eyebrow` `--text-h2-grand` `--text-h2-section` `--text-h2-tight` `--tracking-display` `--tracking-mono`

**Classes scoped** : .drop-cap .problem-statement .problem-statement__kicker .problem-statement__label .problem-statement__stat .problem-statement__statement--dropcap .problem-statement__stats .problem-statement__text .problem-statement__value

**Dette hardcode** : 8 valeur(s) — 0.16em, 1100px, 1px, 800px, clamp(var(--space-11), clamp(var(--space-8), clamp(var(--text-h2-section), clamp(var(--text-h2-tight)

**Agent** : Espacement : --space-11 --space-12 --space-2. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (0.16em, 1100px, 1px).

---

### `problems-grid`

> Grille de problèmes/frictions auto-fit (3 cards min) : num + kicker + h3 + body, séparateurs hairline 1px.
> ProblemsGrid · src/components/sections/ProblemsGrid.astro · marketing/feature-sections
> status : stable · tags : cards, frictions, grid, numbered, problems

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `problems` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--font-mono` `--font-sans` `--font-serif` `--ink` `--ink-rgb` `--leading-prose` `--muted` `--paper` `--radius-sm` `--space-2` `--space-3` `--space-4` `--text-body-sm` `--text-eyebrow`

**Classes scoped** : .problems-grid .problems-grid__card .problems-grid__cards .problems-grid__h2 .problems-grid__kicker .problems-grid__num .wrap-wide

**Dette hardcode** : 11 valeur(s) — -.01em, .06em, .08em, 1200px, 1px, 280px, clamp(18px, 2vw, 24px), clamp(20px, 5vw, 80px)

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --ink-rgb. Typographie : --font-mono --font-sans. Dette : 11 litteral(s) hardcode(s) (-.01em, .06em, .08em).

---

### `related-cards-band`

> Bande de trois cards connexes pour relier cas, offres ou ressources en fin de page.
> RelatedCardsBand · src/components/sections/RelatedCardsBand.astro · marketing/feature-sections
> status : stable · tags : cards, editorial, navigation, related

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cards` | array | oui |  | min:2 max:3 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--ease` `--font-mono` `--hairline-strong` `--muted` `--paper-2` `--related-cards-band-inline` `--related-cards-band-pad` `--section-loose` `--space-11` `--space-6` `--text-eyebrow` `--tracking-mono`

**Classes scoped** : .related-card .related-cards-band .related-cards-band__grid .related-cards-band__kicker

**Dette hardcode** : 3 valeur(s) — -2px, 1px, clamp(var(--space-11)

**Agent** : Espacement : --space-11 --space-6. Couleur : --muted --paper-2. Typographie : --font-mono --text-eyebrow. Dette : 3 litteral(s) hardcode(s) (-2px, 1px, clamp(var(--space-11)).

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
| `services` | array | non |  | min:2 max:8 |

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--hairline` `--hairline-strong` `--leading-body` `--muted` `--paper` `--paper-2` `--space-2` `--space-5` `--space-6` `--space-7` `--text-body-lead` `--text-caption` `--text-eyebrow` `--wrap-prose` `--wrap-read`

**Classes scoped** : .astro .dept-sector .sec .svc-arr .svc-cat-footer .svc-cat-list .svc-cat-sec .svc-desc .svc-meta .svc-num .svc-row .svc-title

**Dette hardcode** : 21 valeur(s) — -0.022em, -2px, .14em, 0.08em, 0.1em, 100%, 10px, 110px

**Agent** : Espacement : --space-2 --space-5 --space-6. Couleur : --accent --muted --paper. Typographie : --font-display --font-mono. Dette : 21 litteral(s) hardcode(s) (-0.022em, -2px, .14em).

---

### `services-grid`

> Grille éditoriale de services 3×2 avec figure, métrique, body et ligne de connecteurs en pied de cellule.
> ServicesGrid · src/components/sections/ServicesGrid.astro · marketing/feature-sections
> status : stable · tags : connectors, grid, metrics, services

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `connectors_label_en` | string | non | Connectors |  |
| `connectors_label_fr` | string | non | Connecteurs |  |
| `fig_num` | string | oui |  |  |
| `fig_title_en` | string | oui |  |  |
| `fig_title_fr` | string | oui |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `services` | array | oui |  | min:3 max:6 |
| `spec_en` | string | oui |  |  |
| `spec_fr` | string | oui |  |  |

**Tokens** : `--accent` `--accent-rgb` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-h3` `--muted` `--paper-2` `--radius-full` `--space-1` `--space-3` `--space-4` `--text-body-sm` `--text-eyebrow` `--text-h2-section` `--text-h3-row` `--text-mono-xs` `--text-ui` `--tracking-display` `--tracking-mono` `--wrap-read`

**Classes scoped** : .services-grid .services-grid__cell .services-grid__cell-arr .services-grid__cell-body .services-grid__cell-fig .services-grid__cell-foot .services-grid__cell-foot-key .services-grid__cell-foot-val .services-grid__cell-head .services-grid__cell-metric .services-grid__cell-rule .services-grid__cell-title .services-grid__chapter .services-grid__dot .services-grid__grid .services-grid__h2 .services-grid__hd .services-grid__num .services-grid__sep .services-grid__spec

**Dette hardcode** : 27 valeur(s) — -0.02em, -1px, -2px, 0.04em, 0.08em, 0.14em, 0.1em, 10px

**Agent** : Espacement : --space-1 --space-3 --space-4. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 27 litteral(s) hardcode(s) (-0.02em, -1px, -2px).

---

### `tech-stack-band`

> Bande stack technologique fond paper-2 avec kicker, lead et rangée de pills techniques.
> TechStackBand · src/components/sections/TechStackBand.astro · marketing/feature-sections
> status : stable · tags : pills, stack, technology, tools

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lead_en` | string | non |  |  |
| `lead_fr` | string | non |  |  |
| `pills` | array | non |  | min:2 max:16 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--hairline` `--leading-h3` `--muted` `--paper-2` `--space-10` `--space-14` `--space-4` `--space-6` `--space-8` `--tech-stack-band-inline` `--tech-stack-band-pad` `--text-eyebrow` `--text-h2-tight` `--text-h3-card` `--tracking-mono`

**Classes scoped** : .tech-stack-band .tech-stack-band__kicker .tech-stack-band__lead

**Dette hardcode** : 5 valeur(s) — 1px, 760px, clamp(var(--space-10), clamp(var(--space-6), clamp(var(--text-h3-card)

**Agent** : Espacement : --space-10 --space-14 --space-4. Couleur : --accent --muted --paper-2. Typographie : --font-display --font-mono. Dette : 5 litteral(s) hardcode(s) (1px, 760px, clamp(var(--space-10)).

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

**Tokens** : `--accent` `--accent-rgb` `--dur-fast` `--ease` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--muted` `--paper` `--space-4` `--space-5` `--text-eyebrow` `--text-h3-row` `--wrap-read`

**Classes scoped** : .css .dept-index .dept-row .dept-row-arr .dept-row-label .dept-row-num .dept-row-num-prefix .dept-row-tag .dept-sector .sec

**Dette hardcode** : 23 valeur(s) — -0.02em, .12em, .14em, .16em, 100%, 14px, 16px, 1px

**Agent** : Espacement : --space-4 --space-5. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 23 litteral(s) hardcode(s) (-0.02em, .12em, .14em).

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

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--ink` `--leading-body` `--muted` `--space-2` `--space-5` `--space-8` `--text-eyebrow` `--text-ui` `--tracking-mono` `--wrap-read`

**Classes scoped** : .why-stalls .why-stalls__aside .why-stalls__fig .why-stalls__grid .why-stalls__h2 .why-stalls__lead .why-stalls__row .why-stalls__row-text .wrap-wide

**Tailwind** : row-lines

**Dette hardcode** : 19 valeur(s) — -0.01em, -0.02em, 1200px, 120px, 1px, 20px, 22px, 240px

**Agent** : Espacement : --space-2 --space-5 --space-8. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 19 litteral(s) hardcode(s) (-0.01em, -0.02em, 1200px).

---

## Gallery Sections

### `gallery-masonry`

> Galerie editoriale en colonnes CSS (masonry naturel) avec legende au hover par overlay. Hauteurs variees, responsive 3 colonnes -> 2 -> 1.
> GalleryMasonry · src/components/sections/GalleryMasonry.astro · marketing/gallery-sections
> status : stable · tags : editorial, gallery, images, masonry

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `intro_en` | string | non |  |  |
| `intro_fr` | string | non |  |  |
| `items` | array | oui |  | min:3 max:12 |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |

**Tokens** : `--dur-base` `--dur-reveal` `--ease` `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--ink-rgb` `--leading-body` `--leading-h3` `--muted` `--paper` `--paper-2` `--radius-md` `--space-1` `--space-3` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section` `--text-h3-card`

**Classes scoped** : .gallery-masonry .gallery-masonry__caption .gallery-masonry__caption-body .gallery-masonry__caption-title .gallery-masonry__grid .gallery-masonry__header .gallery-masonry__intro .gallery-masonry__item .gallery-masonry__media .gallery-masonry__placeholder .gallery-masonry__tag

**Dette hardcode** : 10 valeur(s) — 0%, 100%, 133%, 1px, 50%, 540px, 56%, 640px

**Agent** : Espacement : --space-1 --space-3 --space-4. Couleur : --ink --ink-rgb --muted. Typographie : --font-display --font-sans. Dette : 10 litteral(s) hardcode(s) (0%, 100%, 133%).

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
| `caption_en` | string | non |  |  |
| `caption_fr` | string | non |  |  |
| `height` | number | non |  |  |
| `media_kind` | enum | oui |  | image | svg | video | embed |
| `src` | string | oui |  |  |
| `width` | number | non |  |  |

**Tokens** : `--font-sans` `--hairline` `--leading-body` `--muted` `--space-4` `--spacing-section` `--text-body-sm`

**Classes scoped** : .media-block .media-block__caption .media-block__embed .media-block__img .media-block__svg-wrap .media-block__video

**Dette hardcode** : 2 valeur(s) — 100%, 1px

**Agent** : Layout : `media_kind` (schema, 0 CSS). Espacement : --space-4 --spacing-section. Couleur : --muted. Typographie : --font-sans --leading-body. Dette : 2 litteral(s) hardcode(s) (100%, 1px).

---

## Hero Header Sections

### `hero-academy-hub`

> Hero hub académie : kicker mono, h1 display, lede et bande de stats mono (cours, parcours, alumni).
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : academy, hero, school, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `stats_label_en` | string | non |  |  |
| `stats_label_fr` | string | non |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-atlas`

> Hero Atlas en deux colonnes avec signature grid, copy éditoriale, CTAs et mini-map des quatre piliers.
> HeroAtlas · src/components/sections/HeroAtlas.astro · marketing/hero-header-sections
> status : stable · tags : atlas, hero, map, pillars

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--leading-h3` `--leading-lede` `--muted` `--radius-full` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-7` `--text-eyebrow` `--text-lede` `--text-mono-xs` `--tracking-mono` `--wrap-prose` `--wrap-read`

**Classes scoped** : .amm-content .amm-deliverable .amm-desc .amm-dot .amm-item .amm-kicker .amm-label .amm-list .amm-num .atlas-mini-map .hero-atlas .hero-atlas-ctas .hero-atlas-inner .hero-atlas-lead .hero-atlas-subhead .hero-atlas-title .kick .kick-dot .signature-grid

**Dette hardcode** : 29 valeur(s) — -0.01em, -0.03em, .08em, .16em, .18em, 10px, 1500px, 1px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 29 litteral(s) hardcode(s) (-0.01em, -0.03em, .08em).

---

### `hero-author`

> Hero de page auteur : 2-col copy/portrait, breadcrumb équipe, role eyebrow, h1 split prénom+nom italic accent, lede display.
> HeroAuthor · src/components/sections/HeroAuthor.astro · marketing/hero-header-sections
> status : stable · tags : author, hero, portrait, profile

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--muted` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--text-eyebrow` `--text-lede` `--tracking-display` `--tracking-mono` `--wrap` `--wrap-read`

**Classes scoped** : .author-hero .author-portrait .css .g12 .g12--full .hero-author .hero-author__bc .hero-author__copy .hero-author__eyebrow .hero-author__h1 .hero-author__lede .hero-author__portrait .hero-author__portrait-frame .start-9

**Dette hardcode** : 20 valeur(s) — -0.03em, 100%, 12px, 1440px, 18px, 1px, 24px, 280px

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 20 litteral(s) hardcode(s) (-0.03em, 100%, 12px).

---

### `hero-case-study`

> Hero d'étude de cas avec décor géométrique, titre et barre de spécifications (client, secteur, durée).
> HeroCaseStudy · src/components/sections/HeroCaseStudy.astro · marketing/hero-header-sections
> status : stable · tags : case-study, decoration, hero, specs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `case_num` | string | oui |  |  |
| `eyebrow_en` | string | non | § Case study |  |
| `eyebrow_fr` | string | non | § Cas client |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `specs` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--hcs-h1-gap` `--hcs-top-pad` `--header-height` `--ink` `--space-4` `--space-5` `--space-6` `--space-7` `--spec-cols` `--text-eyebrow` `--tracking-mono` `--wrap-read`

**Classes scoped** : .hero-case-study__deco .hero-case-study__eyebrow .hero-case-study__h1 .hero-case-study__mast .hero-case-study__num .hero-case-study__spec .hero-case-study__spec-l .hero-case-study__spec-v .hero-case-study__specs .hero-case-study__specs-grid .wrap-wide

**Dette hardcode** : 12 valeur(s) — -0.01em, -0.03em, 1px, 20px, 22px, 240px, 280px, 400px

**Agent** : Espacement : --space-4 --space-5 --space-6. Couleur : --accent --ink. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-0.01em, -0.03em, 1px).

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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-conversion-funnel`

> Hero magnétique flagship : kicker num + h1 monumental, lede, meta pills, benefits checklist, ligne preuve mono, double CTA et grille stats 4-col.
> HeroConversionFunnel · src/components/sections/HeroConversionFunnel.astro · marketing/hero-header-sections
> status : stable · tags : benefits, conversion, flagship, funnel, hero, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-body` `--muted` `--paper` `--radius-pill` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--text-caption` `--text-eyebrow` `--wrap-wide`

**Classes scoped** : .hero-conversion-funnel .hero-conversion-funnel__benefits .hero-conversion-funnel__cta .hero-conversion-funnel__h1 .hero-conversion-funnel__lede .hero-conversion-funnel__meta .hero-conversion-funnel__num .hero-conversion-funnel__proof .hero-conversion-funnel__stat--lead .hero-conversion-funnel__stat-label .hero-conversion-funnel__stat-value .hero-conversion-funnel__stats .wrap-wide

**Dette hardcode** : 27 valeur(s) — 0.08em, 0.1em, 0.7em, 10px, 11px, 1200px, 140px, 18px

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 27 litteral(s) hardcode(s) (0.08em, 0.1em, 0.7em).

---

### `hero-course`

> Hero de page cours/formation : kicker accent + title + lede + meta-pills (niveau/durée/format/prix) + cta-group primary/ghost.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : course, hero, meta, pills, training

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `pills` | array | non | default | min:1 max:8 |
| `title_en` | string | oui |  |  |
| `title_fr` | string | oui |  |  |
| `type_label_en` | string | oui |  |  |
| `type_label_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-detail-menu`

> Hero d'entrée de menu détail : kicker parent + numéro § accent + h1 + lede sobre, idéal pour sous-pages catalogue.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : detail, hero, menu, nested

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `detail_num` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `parent_kicker_en` | string | oui |  |  |
| `parent_kicker_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-essay`

> Hero d'article éditorial avec accroche italique et métadonnées auteur, date et temps de lecture.
> HeroEssay · src/components/sections/HeroEssay.astro · marketing/hero-header-sections
> status : stable · tags : editorial, essay, hero, meta

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `author` | string | oui |  |  |
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--he-top-pad` `--header-height` `--ink` `--leading-h1` `--leading-lede` `--muted` `--space-3` `--space-5` `--space-6` `--text-eyebrow`

**Classes scoped** : .hero-essay__h1 .hero-essay__hd .hero-essay__image .hero-essay__kicker .hero-essay__lede .hero-essay__meta

**Dette hardcode** : 11 valeur(s) — -0.026em, 0.1em, 100%, 1200px, 1px, 24px, 760px, clamp(20px, 2.2vw, 28px)

**Agent** : Espacement : --space-3 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 11 litteral(s) hardcode(s) (-0.026em, 0.1em, 100%).

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

**Tokens** : `--font-display` `--font-sans` `--hairline` `--header-height` `--ink` `--leading-h1` `--paper` `--paper-rgb` `--spacing-block`

**Classes scoped** : .hero-fb .hero-fb__inner

**Dette hardcode** : 4 valeur(s) — 1px, clamp(16px, 1.4vw, 20px), clamp(60px, 10vw, 180px), clamp(80px, 14vw, 200px)

**Agent** : Layout : `background_kind` (schema, 0 CSS). Espacement : --spacing-block. Couleur : --ink --paper --paper-rgb. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (1px, clamp(16px, 1.4vw, 20px), clamp(60px, 10vw, 180px)).

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

**Tokens** : `--accent` `--dur-fast` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--gut` `--hairline` `--ink` `--ink-2` `--leading-body` `--leading-h1` `--leading-lede` `--section-loose` `--space-1` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-9` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--tracking-display` `--wrap-read` `--wrap-wide`

**Classes scoped** : .acc .hero-home .hero-home__cta-sub .hero-home__ctas .hero-home__fig .hero-home__headline .hero-home__lede .hero-home__minimap .hero-home__mm-item .hero-home__mm-items .hero-home__mm-label .hero-home__proof .hero-home__proof-label .hero-home__proof-num .hero-home__proofs .hero-home__sub .hero-sig-mark .signature-grid .wrap-wide

**Dette hardcode** : 25 valeur(s) — -0.025em, -0.02em, 0.005em, 0.14em, 100%, 110px, 1px, 440px

**Agent** : Espacement : --space-1 --space-3 --space-4. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 25 litteral(s) hardcode(s) (-0.025em, -0.02em, 0.005em).

---

### `hero-hub-listing`

> (déprécié → hero-hub-masthead variant=listing) Hero éditorial de hub avec titre monumental et lede courte, sans appel à l'action, pour pages de listing.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : deprecated · tags : editorial, hero, hub, listing

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `decoration` | boolean | non | false |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-hub-masthead`

> Masthead unifié paramétrable (variant hub|listing|detail) : absorbe hero-hub-listing et hero-utility-masthead. hub = kicker mono + h1 italique display + lede court ; listing = deco SVG optionnelle + h1 monumental + lede révélée ; detail = kicker optionnel + h1 + lede display italique, alignement gauche ou centré.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, index, masthead, unified, variant

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `align` | enum | non | left | left | centered |
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Layout : `align`, `scale`, `variant` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-hub-stats`

> Hero hub avec stats : meta kicker double + numéro § accent + h1 maximal, lede, grille KeyMetric 4-col en pied avec accent.
> HeroHubStats · src/components/sections/HeroHubStats.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, masthead, pillar, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hub_num` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_kicker_en` | string | oui |  |  |
| `meta_kicker_fr` | string | oui |  |  |
| `stats` | array | non | false | min:2 max:4 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--header-height` `--ink` `--muted` `--space-2` `--space-5` `--space-6` `--text-eyebrow` `--wrap-read`

**Classes scoped** : .astro .hero-hub-stats .hero-hub-stats__cell .hero-hub-stats__cell--accent .hero-hub-stats__cell--lead .hero-hub-stats__grid .hero-hub-stats__h1 .hero-hub-stats__label .hero-hub-stats__lede .hero-hub-stats__meta .hero-hub-stats__num .hero-hub-stats__value .hero-pillar-hub .hero-pillar-hub__h1 .hero-pillar-hub__lede .hero-pillar-hub__meta .hero-pillar-hub__num .hero-pillar-hub__stats .key-metric .key-metric-value .wrap-wide

**Dette hardcode** : 17 valeur(s) — -0.035em, 0.1em, 100%, 1200px, 140px, 1px, 24px, 640px

**Agent** : Espacement : --space-2 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 17 litteral(s) hardcode(s) (-0.035em, 0.1em, 100%).

---

### `hero-landing`

> Hero magnétique landing : eyebrow mono, h1 italique avec emphasis, lede, double CTA et bandeau de disponibilité.
> HeroLanding · src/components/sections/HeroLanding.astro · marketing/hero-header-sections
> status : stable · tags : cta, hero, landing, magnetic

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `availability_en` | string | non |  |  |
| `availability_fr` | string | non |  |  |
| `cta_primary` | object | oui |  |  |
| `cta_secondary` | object | non |  |  |
| `eyebrow_en` | string | oui |  |  |
| `eyebrow_fr` | string | oui |  |  |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-mono` `--font-sans` `--font-serif` `--fw-semibold` `--ink` `--ink-rgb` `--muted` `--paper` `--radius-sm` `--space-4` `--space-5` `--text-body-lead` `--text-eyebrow`

**Classes scoped** : .hero-landing .hero-landing__avail .hero-landing__btn-primary .hero-landing__btn-secondary .hero-landing__ctas .hero-landing__eyebrow .hero-landing__h1 .hero-landing__lede .wrap-wide

**Dette hardcode** : 15 valeur(s) — -.025em, .08em, .1em, 1200px, 14px, 1px, 28px, 640px

**Agent** : Espacement : --space-4 --space-5. Couleur : --accent --ink --ink-rgb. Typographie : --font-mono --font-sans. Dette : 15 litteral(s) hardcode(s) (-.025em, .08em, .1em).

---

### `hero-lead-magnet`

> Hero lead magnet (livre blanc) : 2-col texte/cover PDF, kicker + h1 + lede italique, meta format/date, carte download CTA.
> HeroLeadMagnet · src/components/sections/HeroLeadMagnet.astro · marketing/hero-header-sections
> status : stable · tags : cover, download, hero, lead-magnet, whitepaper

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-lede` `--muted` `--paper-2` `--radius-md` `--space-3` `--space-4` `--space-5` `--space-6` `--text-eyebrow`

**Classes scoped** : .hero-lead-magnet .hero-lead-magnet__cover .hero-lead-magnet__download .hero-lead-magnet__download-label .hero-lead-magnet__grid .hero-lead-magnet__h1 .hero-lead-magnet__kicker .hero-lead-magnet__lede .hero-lead-magnet__meta .hero-lead-magnet__panel .wrap-wide

**Dette hardcode** : 14 valeur(s) — -0.03em, 0.1em, 100%, 1200px, 140px, 1px, 20px, 280px

**Agent** : Espacement : --space-3 --space-4 --space-5. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 14 litteral(s) hardcode(s) (-0.03em, 0.1em, 100%).

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

**Tokens** : `--accent` `--font-display` `--fw-regular` `--ink` `--paper` `--paper-rgb` `--wrap-prose` `--wrap-wide`

**Classes scoped** : .accent .hero-liquid .hero-liquid__cta .hero-liquid__h1 .hero-liquid__inner .hero-liquid__lede .liquid-hero

**Dette hardcode** : 10 valeur(s) — -0.035em, 100%, 10px, 1400px, clamp(18px,1.8vw,26px), clamp(20px,2.5vw,36px), clamp(20px,4vw,48px), clamp(40px,7vw,100px)

**Agent** : Couleur : --accent --ink --paper. Typographie : --font-display --fw-regular. Dette : 10 litteral(s) hardcode(s) (-0.035em, 100%, 10px).

---

### `hero-offer-detail`

> Hero de page offre détail : SVG cercles concentriques signature, breadcrumb, tier kicker, h1 + lead italique, CTA et meta.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : concentric-svg, detail, hero, offer, tier

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--header-height` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--radius-lg` `--radius-pill` `--radius-sm` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-9` `--text-body-sm` `--text-eyebrow` `--text-mono-xs` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 26 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `hero_variant` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 26 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-pillar-hub`

> Hero de page pilier avec titre maximal et grille de statistiques quatre colonnes optionnelle.
> HeroHubStats · src/components/sections/HeroHubStats.astro · marketing/hero-header-sections
> status : stable · tags : hero, hub, pillar, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `hub_num` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `meta_kicker_en` | string | oui |  |  |
| `meta_kicker_fr` | string | oui |  |  |
| `stats` | array | non |  | min:2 max:4 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--header-height` `--ink` `--muted` `--space-2` `--space-5` `--space-6` `--text-eyebrow` `--wrap-read`

**Classes scoped** : .astro .hero-hub-stats .hero-hub-stats__cell .hero-hub-stats__cell--accent .hero-hub-stats__cell--lead .hero-hub-stats__grid .hero-hub-stats__h1 .hero-hub-stats__label .hero-hub-stats__lede .hero-hub-stats__meta .hero-hub-stats__num .hero-hub-stats__value .hero-pillar-hub .hero-pillar-hub__h1 .hero-pillar-hub__lede .hero-pillar-hub__meta .hero-pillar-hub__num .hero-pillar-hub__stats .key-metric .key-metric-value .wrap-wide

**Dette hardcode** : 17 valeur(s) — -0.035em, 0.1em, 100%, 1200px, 140px, 1px, 24px, 640px

**Agent** : Espacement : --space-2 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 17 litteral(s) hardcode(s) (-0.035em, 0.1em, 100%).

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
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

---

### `hero-sector`

> Hero de page secteur ou département : SVG rotated 15° accent, dept kicker, h1 + lead italique, CTA et meta, tags secteurs.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : department, hero, sector, tags

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--header-height` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--radius-lg` `--radius-pill` `--radius-sm` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-9` `--text-body-sm` `--text-eyebrow` `--text-mono-xs` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 26 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `hero_variant` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 26 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-service-detail`

> Hero de page service avec numéro éditorial, titre, accroche et barre de preuves chiffrées optionnelle.
> HeroServiceDetail · src/components/sections/HeroServiceDetail.astro · marketing/hero-header-sections
> status : stable · tags : detail, hero, metrics, service

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `metrics` | array | non |  | min:2 max:4 |
| `service_num` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--header-height` `--ink` `--muted` `--space-2` `--space-5` `--space-6` `--text-eyebrow` `--tracking-mono`

**Classes scoped** : .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .wrap-wide

**Dette hardcode** : 15 valeur(s) — -0.028em, -0.02em, 1200px, 140px, 160px, 1px, 20px, 24px

**Agent** : Espacement : --space-2 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 15 litteral(s) hardcode(s) (-0.028em, -0.02em, 1200px).

---

### `hero-service-masthead`

> Masthead service sobre : kicker § Service N + h1 display + lede display muted, sans décor SVG.
> HeroServiceDetail · src/components/sections/HeroServiceDetail.astro · marketing/hero-header-sections
> status : stable · tags : hero, masthead, service, simple

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `service_num` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--header-height` `--ink` `--muted` `--space-2` `--space-5` `--space-6` `--text-eyebrow` `--tracking-mono`

**Classes scoped** : .hero-service-detail .hero-service-detail__h1 .hero-service-detail__lede .hero-service-detail__metric .hero-service-detail__metric-l .hero-service-detail__metric-v .hero-service-detail__metrics .hero-service-detail__num .hero-service-masthead .hero-service-masthead__h1 .hero-service-masthead__lede .hero-service-masthead__num .wrap-wide

**Dette hardcode** : 15 valeur(s) — -0.028em, -0.02em, 1200px, 140px, 160px, 1px, 20px, 24px

**Agent** : Espacement : --space-2 --space-5 --space-6. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 15 litteral(s) hardcode(s) (-0.028em, -0.02em, 1200px).

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

**Tokens** : `--font-display` `--font-sans` `--hairline` `--header-height` `--ink` `--leading-h2` `--paper-2` `--space-3` `--spacing-block` `--spacing-section` `--text-body-md` `--text-h1-hero`

**Classes scoped** : .hero-split .hero-split__ctas .hero-split__inner .hero-split__left .hero-split__meta .hero-split__right

**Dette hardcode** : 4 valeur(s) — -8px, 1px, 768px, clamp(32px, 5vw, 80px)

**Agent** : Layout : `right_block` (schema, 0 CSS). Espacement : --space-3 --spacing-block --spacing-section. Couleur : --ink --paper-2. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (-8px, 1px, 768px).

---

### `hero-tech-layer`

> Hero de couche technologique : triangles SVG signature, layer badge (claude/os/orch), h1 + lead italique, CTA et meta.
> HeroOfferDetail · src/components/sections/HeroOfferDetail.astro · marketing/hero-header-sections
> status : stable · tags : hero, layer, technology, triangles

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--header-height` `--hod-wrap` `--htl-wrap` `--ink` `--ink-2` `--leading-h1` `--leading-lede` `--muted` `--paper` `--paper-2` `--radius-lg` `--radius-pill` `--radius-sm` `--space-10` `--space-11` `--space-12` `--space-13` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-9` `--text-body-sm` `--text-eyebrow` `--text-mono-xs` `--tracking-body` `--tracking-display` `--tracking-mono`

**Classes scoped** : .hero-detail .hero-detail__actions .hero-detail__art .hero-detail__bc .hero-detail__copy .hero-detail__eyebrow .hero-detail__geo .hero-detail__lead .hero-detail__meta .hero-detail__meta--copy .hero-detail__sub .hero-detail__sumie .hero-detail__tag .hero-detail__tags .hero-detail__title .hero-detail__visual .hero-detail__wrap .hero-detail--encadre .hero-detail--equilibre .hero-detail--showcase .hero-tech-layer .hero-tech-layer__actions .hero-tech-layer__cta .hero-tech-layer__geo .hero-tech-layer__layer .hero-tech-layer__layer--claude .hero-tech-layer__layer--orch .hero-tech-layer__layer--os .hero-tech-layer__lead .hero-tech-layer__meta .hero-tech-layer__sub .hero-tech-layer__title .hero-tech-layer__wrap

**Dette hardcode** : 26 valeur(s) — -50%, 100%, 1100px, 118%, 1320px, 138%, 1px, 280px

**Agent** : Layout : `layer_type` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-12. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 26 litteral(s) hardcode(s) (-50%, 100%, 1100px).

---

### `hero-tunnel-step`

> Hero d'étape de tunnel : kicker accent + barre de progression [01][02]... + h1 (variante hero ou section) + lede.
> HeroTunnelStep · src/components/sections/HeroTunnelStep.astro · marketing/hero-header-sections
> status : stable · tags : funnel, hero, progress, step, tunnel

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | oui |  |  |
| `kicker_fr` | string | oui |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |
| `progress_total` | number | oui |  | int min:1 max:12 |
| `step` | number | oui |  | int min:1 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--gut` `--hairline` `--ink` `--muted` `--space-6` `--space-7` `--text-eyebrow` `--text-h1-hero` `--text-h2-grand` `--text-lede`

**Classes scoped** : .hero-tunnel-step .hero-tunnel-step__h1 .hero-tunnel-step__h1--hero .hero-tunnel-step__h1--section .hero-tunnel-step__kicker .hero-tunnel-step__lede .hero-tunnel-step__progress .hero-tunnel-step__progress-step .is-active .wrap-wide

**Dette hardcode** : 12 valeur(s) — -.02em, .06em, .1em, 10px, 1200px, 1px, 24px, clamp(10px, 1.1vw, 12px)

**Agent** : Espacement : --space-6 --space-7. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-.02em, .06em, .1em).

---

### `hero-utility-masthead`

> (déprécié → hero-hub-masthead variant=detail) Masthead utilitaire générique (about, méthode, academy intro) : kicker, h1 monumental, lede display italique, alignement gauche ou centré.
> HeroCentered · src/components/sections/HeroCentered.astro · marketing/hero-header-sections
> status : deprecated · tags : editorial, hero, masthead, utility

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `align` | enum | non | left | left | centered |
| `h1_en` | string | oui |  |  |
| `h1_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | oui |  |  |
| `lede_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--fw-semibold` `--hahub-top-pad` `--hairline` `--header-height` `--hero-course-top-pad` `--hhl-lede-max` `--ink` `--ink-2` `--leading-body` `--leading-h2` `--leading-lede` `--leading-prose` `--muted` `--muted-2` `--paper` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-page-x` `--spacing-block` `--spacing-section` `--text-body-lead` `--text-body-md` `--text-body-sm` `--text-caption` `--text-eyebrow` `--text-h1-hero` `--text-lede` `--text-ui` `--wrap-prose`

**Classes scoped** : .hero-academy-hub .hero-academy-hub__heading .hero-academy-hub__hero .hero-academy-hub__kicker .hero-academy-hub__lede .hero-academy-hub__stats .hero-academy-hub__stats-text .hero-academy-hub--unwrapped .hero-centered .hero-centered__ctas .hero-centered__inner .hero-course .hero-course__btn-ghost .hero-course__btn-primary .hero-course__btn-primary--disabled .hero-course__cta .hero-course__hd .hero-course__hd--legacy-ghost .hero-course__lede .hero-course__pill .hero-course__pill--accent .hero-course__pill--price .hero-course__pills .hero-course__title .hero-detail-menu .hero-detail-menu__h1 .hero-detail-menu__lede .hero-detail-menu__num .hero-detail-menu__parent .hero-hub-listing .hero-hub-listing__deco .hero-hub-listing__filters .hero-hub-listing__h1 .hero-hub-listing__kicker .hero-hub-listing__lede .hero-hub-listing--bordered .hero-hub-listing--standard .hero-hub-masthead .hero-hub-masthead__h1 .hero-hub-masthead__kicker .hero-hub-masthead__lede .hero-hub-masthead--standard .hero-problem-index .hero-problem-index__canonical .hero-problem-index__geo .hero-problem-index__h1 .hero-problem-index__kicker .hero-problem-index__lede .hero-utility .hero-utility__h1 .hero-utility__kicker .hero-utility__lede .hero-utility__role .hero-utility--centered .hero-utility--standard .wrap-wide

**Dette hardcode** : 42 valeur(s) — -0.028em, -0.03em, 0.06em, 0.08em, 100%, 10px, 1100px, 1200px

**Agent** : Layout : `align` (schema, 0 CSS). Espacement : --space-1 --space-2 --space-3. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 42 litteral(s) hardcode(s) (-0.028em, -0.03em, 0.06em).

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
| `tiers` | array | oui |  |  |

**Tokens** : `--ink` `--muted` `--muted-2` `--space-6`

**Classes scoped** : .pyramid-wrap

**Dette hardcode** : 3 valeur(s) — 100%, 800px, clamp(48px, 6vw, 80px)

**Agent** : Espacement : --space-6. Couleur : --ink --muted --muted-2. Dette : 3 litteral(s) hardcode(s) (100%, 800px, clamp(48px, 6vw, 80px)).

---

## Index Sections

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

**Tokens** : `--accent` `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink-2` `--leading-lede` `--space-3` `--space-5` `--space-6`

**Classes scoped** : .list-body .list-filters .list-footer .list-h1 .list-hd .list-kicker .list-lede

**Tailwind** : list-body list-filters list-footer list-h1 list-hd list-kicker list-lede

**Dette hardcode** : 9 valeur(s) — -0.03em, 140px, 1px, 760px, clamp(20px, 2.2vw, 32px), clamp(36px, 4vw, 56px), clamp(40px, 5vw, 72px), clamp(56px, 11vw, 180px)

**Agent** : Espacement : --space-3 --space-5 --space-6. Couleur : --accent --ink-2. Typographie : --font-display --font-sans. Dette : 9 litteral(s) hardcode(s) (-0.03em, 140px, 1px).

---

## Logo Sections

### `logo-wall`

> Grille statique de logos partenaires ou clients, avec effet grayscale vers couleur au hover. Distinct du bandeau animé marquee-band.
> LogoWall · src/components/sections/LogoWall.astro · marketing/logo-sections
> status : stable · tags : grid, logos, social-proof, static

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logos` | array | oui |  | min:3 max:20 |

**Tokens** : `--accent` `--dur-fast` `--ease` `--font-display` `--hairline` `--ink` `--leading-h3` `--radius-sm` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-h2-section`

**Classes scoped** : .logo-wall .logo-wall__cell .logo-wall__grid .logo-wall__header .logo-wall__img .logo-wall__link

**Dette hardcode** : 13 valeur(s) — -1px, 100%, 110px, 120px, 140px, 1px, 2px, 3px

**Agent** : Espacement : --space-4 --space-5 --spacing-block. Couleur : --accent --ink. Typographie : --font-display --leading-h3. Dette : 13 litteral(s) hardcode(s) (-1px, 100%, 110px).

---

### `marquee-band`

> Bandeau marquee mono uppercase à défilement horizontal infini · items + séparateurs · respecte prefers-reduced-motion.
> MarqueeBand · src/components/sections/MarqueeBand.astro · marketing/logo-sections
> status : stable · tags : band, infinite, marquee, mono, scroll

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `items_en` | array | non |  | min:2 max:12 |
| `items_fr` | array | oui |  | min:2 max:12 |
| `repeat` | number | non | 2 | int min:1 max:4 |
| `separator` | string | non | · |  |

**Tokens** : `--accent` `--font-mono` `--ink` `--ink-rgb` `--text-caption`

**Classes scoped** : .marquee-band .marquee-band__item .marquee-band__sep .marquee-band__track

**Dette hardcode** : 5 valeur(s) — -50%, .1em, 18px, 1px, 28px

**Agent** : Couleur : --accent --ink --ink-rgb. Typographie : --font-mono --text-caption. Dette : 5 litteral(s) hardcode(s) (-50%, .1em, 18px).

---

### `social-proof`

> Section de logos clients ou partenaires pour installer une preuve sociale immédiate.
> SocialProof · src/components/sections/SocialProof.astro · marketing/logo-sections
> status : stable · tags : logos, marquee, social-proof

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `logos` | array | non |  |  |
| `marquee` | boolean | non | true |  |

**Tokens** : `--font-display` `--hairline` `--muted` `--space-5` `--space-6`

**Classes scoped** : .social-proof .social-proof__kicker .social-proof__logo .social-proof__marquee .social-proof__marquee-wrap .social-proof__static

**Dette hardcode** : 4 valeur(s) — -50%, 1px, clamp(14px, 1.2vw, 18px), clamp(32px, 4vw, 56px)

**Agent** : Espacement : --space-5 --space-6. Couleur : --muted. Typographie : --font-display. Dette : 4 litteral(s) hardcode(s) (-50%, 1px, clamp(14px, 1.2vw, 18px)).

---

## Pricing Sections

### `pricing-comparison-matrix`

> Matrice comparative tarifaire pour mettre en regard les fonctionnalites de 3 plans avec mise en avant de la colonne recommandee.
> PricingComparisonMatrix · src/components/sections/PricingComparisonMatrix.astro · marketing/pricing-sections
> status : stable · tags : comparison, matrix, pricing, table

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `body_en` | string | non |  |  |
| `body_fr` | string | non |  |  |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `plans` | array | oui |  | min:2 max:4 |
| `rows` | array | oui |  | min:2 |

**Tokens** : `--accent` `--accent-rgb` `--dur-fast` `--ease-out` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--muted-2` `--paper-2` `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-eyebrow` `--text-h2-section` `--text-mono-xs`

**Classes scoped** : .pcm .pcm__body .pcm__btn .pcm__cell .pcm__cell--featured .pcm__col-feature .pcm__col-plan .pcm__col-plan--featured .pcm__feature .pcm__feature-label .pcm__glyph .pcm__glyph--no .pcm__glyph--yes .pcm__group .pcm__header .pcm__plan-cta .pcm__plan-name .pcm__plan-note .pcm__plan-price .pcm__row .pcm__scroll .pcm__table .pcm__value .sr-only

**Tailwind** : sr-only

**Dette hardcode** : 12 valeur(s) — -1px, .12em, .14em, 100%, 180px, 1px, 2px, 40%

**Agent** : Espacement : --space-1 --space-2 --space-3. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 12 litteral(s) hardcode(s) (-1px, .12em, .14em).

---

### `pricing-table`

> Table de prix pour présenter clairement les formules, paliers et options commerciales.
> PricingTable · src/components/sections/PricingTable.astro · marketing/pricing-sections
> status : stable · tags : plans, pricing, tiers

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `tiers` | array | oui |  | min:1 max:5 |

**Tokens** : `--accent` `--accent-rgb` `--col-count` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h3` `--muted` `--space-2` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-eyebrow` `--text-h2-section` `--text-mono-xs`

**Classes scoped** : .pricing-table .pricing-table__btn .pricing-table__check .pricing-table__cta .pricing-table__features .pricing-table__grid .pricing-table__header .pricing-table__price .pricing-table__tier .pricing-table__tier--featured .pricing-table__tier-header .pricing-table__tier-name

**Dette hardcode** : 8 valeur(s) — -1px, .14em, 100%, 10px, 1px, 2px, 768px, clamp(24px, 2.5vw, 36px)

**Agent** : Espacement : --space-2 --space-4 --space-5. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 8 litteral(s) hardcode(s) (-1px, .14em, 100%).

---

## Stats Sections

### `metric-shift`

> Comparaison avant → après : valeur initiale et finale magnifiées, delta.
> MetricShift · src/components/sections/MetricShift.astro · marketing/stats-sections
> status : stable · tags : before-after, metrics, proof, results

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `background` | enum | non | paper | paper | paper-2 | ink |
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `shifts` | array | non |  | min:2 max:6 |

**Tokens** : `--accent` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--leading-body` `--leading-h2` `--leading-lede` `--muted` `--paper` `--paper-2` `--paper-rgb` `--section-loose` `--space-11` `--space-12` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--text-body-md` `--text-eyebrow` `--text-h2-section` `--text-ui` `--tracking-display` `--tracking-mono` `--wrap-read`

**Classes scoped** : .metric-shift .metric-shift__after .metric-shift__arrow .metric-shift__before .metric-shift__delta .metric-shift__delta--down .metric-shift__delta--flat .metric-shift__delta--up .metric-shift__hd .metric-shift__kicker .metric-shift__label .metric-shift__lede .metric-shift__row .metric-shift__rows .metric-shift__title .metric-shift__values .metric-shift--ink .metric-shift--paper-2

**Dette hardcode** : 9 valeur(s) — 120px, 180px, 1px, 680px, clamp(20px, 2.2vw, 28px), clamp(28px, 3.2vw, 44px), clamp(48px, 6vw, 92px), clamp(var(--space-11)

**Agent** : Layout : `background` (schema, 0 CSS). Espacement : --space-11 --space-12 --space-2. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 9 litteral(s) hardcode(s) (120px, 180px, 1px).

---

### `proof-bar`

> Barre de preuve compacte pour afficher des métriques clés et renforcer la crédibilité.
> ProofBarSection · src/components/sections/ProofBarSection.astro · marketing/stats-sections
> status : stable · tags : bar, metrics, proof

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `layout` | enum | non | horizontal | horizontal | vertical-stack |
| `metrics` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent` `--font-display` `--font-sans` `--hairline` `--leading-lede` `--muted` `--space-4` `--space-5` `--text-body-sm`

**Classes scoped** : .proof-bar .proof-bar__item .proof-bar__kicker .proof-bar__label .proof-bar__list .proof-bar__value

**Dette hardcode** : 5 valeur(s) — 140px, 1px, 6px, clamp(16px, 2vw, 32px), clamp(32px, 4vw, 56px)

**Agent** : Layout : `layout` (schema, 0 CSS). Espacement : --space-4 --space-5. Couleur : --accent --muted. Typographie : --font-display --font-sans. Dette : 5 litteral(s) hardcode(s) (140px, 1px, 6px).

---

### `spec-bar`

> Barre de spécifications projet N colonnes (label mono + valeur) avec grille CSS var  ·  extrait de CaseStudyTemplate.
> SpecBar · src/components/sections/SpecBar.astro · marketing/stats-sections
> status : stable · tags : case-study, grid, meta, mono, specs

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `specs` | array | oui |  | min:2 max:8 |

**Tokens** : `--font-mono` `--hairline` `--ink` `--leading-lede` `--muted` `--paper-2` `--spec-cols` `--text-mono-xs` `--text-ui`

**Classes scoped** : .spec-bar .spec-bar__grid .spec-bar__item .spec-bar__label .spec-bar__value

**Dette hardcode** : 8 valeur(s) — 0.04em, 0.14em, 1px, 480px, 6px, 800px, clamp(18px, 2vw, 28px), clamp(20px, 2.5vw, 32px)

**Agent** : Couleur : --ink --muted --paper-2. Typographie : --font-mono --leading-lede. Dette : 8 litteral(s) hardcode(s) (0.04em, 0.14em, 1px).

---

### `stat-block`

> Bloc de statistiques en grille pour mettre en avant des chiffres de performance ou d'impact.
> StatBlock · src/components/sections/StatBlock.astro · marketing/stats-sections
> status : stable · tags : grid, metrics, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
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

**Tokens** : `--accent` `--font-display` `--font-sans` `--hairline` `--ink` `--leading-h3` `--leading-lede` `--muted` `--space-10` `--space-2` `--space-4` `--space-5` `--space-6` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section`

**Classes scoped** : .pull-quote .stat-block .stat-block__grid .stat-block__header .stat-block__item .stat-block__label .stat-block__split .stat-block__value

**Dette hardcode** : 6 valeur(s) — -1px, 1px, 480px, 768px, clamp(36px, 5vw, 64px), clamp(var(--space-6)

**Agent** : Layout : `layout` (schema, 0 CSS). Espacement : --space-10 --space-2 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-sans. Dette : 6 litteral(s) hardcode(s) (-1px, 1px, 480px).

---

### `stats-bento`

> Quatre KPI en grille bento de tailles inegales : une grande cellule avec chiffre geant et trois cellules secondaires, plus un bandeau bas pleine largeur.
> StatsBento · src/components/sections/StatsBento.astro · marketing/stats-sections
> status : stable · tags : bento, kpi, metrics, stats

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `stats` | array | oui |  | min:4 max:4 |

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-body` `--leading-h2` `--leading-h3` `--muted` `--paper` `--radius-sm` `--shadow-card-hover` `--space-2` `--space-3` `--space-4` `--space-5` `--spacing-block` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-caption` `--text-h2-grand` `--text-h2-section` `--text-h2-tight` `--tracking-display` `--tracking-mono`

**Classes scoped** : .stats-bento .stats-bento__cell .stats-bento__cell--1 .stats-bento__cell--2 .stats-bento__cell--3 .stats-bento__cell--4 .stats-bento__delta .stats-bento__grid .stats-bento__header .stats-bento__label .stats-bento__number

**Dette hardcode** : 7 valeur(s) — -2px, 1023px, 1px, 639px, 640px, clamp(24px, 3vw, 40px), clamp(32px, 4vw, 56px)

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 7 litteral(s) hardcode(s) (-2px, 1023px, 1px).

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

**Tokens** : `--accent` `--dur-fast` `--ease` `--font-display` `--font-mono` `--fw-medium` `--fw-regular` `--hairline` `--ink` `--leading-h2` `--leading-lede` `--muted` `--paper-2` `--space-1` `--space-5` `--text-body-lead` `--text-eyebrow` `--text-h2-section` `--text-h2-tight` `--text-mono-xs` `--text-ui` `--tracking-display`

**Classes scoped** : .cases-arr .cases-client .cases-col .cases-col-k .cases-col-v .cases-foot .cases-h2 .cases-hd .cases-idx .cases-impact .cases-row .cases-spec .cases-tbl

**Tailwind** : row-lines

**Dette hardcode** : 23 valeur(s) — -0.02em, -2px, .12em, .14em, .16em, .1em, 1080px, 10px

**Agent** : Espacement : --space-1 --space-5. Couleur : --accent --ink --muted. Typographie : --font-display --font-mono. Dette : 23 litteral(s) hardcode(s) (-0.02em, -2px, .12em).

---

### `pull-quote-block`

> Citation éditoriale isolée centrée ou inline, wrapper catalogue autour de la molécule PullQuote.
> PullQuoteBlock · src/components/sections/PullQuoteBlock.astro · marketing/testimonial-sections
> status : stable · tags : closing, editorial, pullquote, quote

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `cite_en` | string | non |  |  |
| `cite_fr` | string | non |  |  |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `variant` | enum | non | centered | breakout | inline | centered |

**Tokens** : `--hairline` `--pull-quote-block-pad` `--section-loose` `--space-10` `--space-11` `--space-6`

**Classes scoped** : .pull-quote .pull-quote-block

**Dette hardcode** : 3 valeur(s) — 1px, clamp(var(--space-11), clamp(var(--space-6)

**Agent** : Layout : `variant` (schema, 0 CSS). Espacement : --space-10 --space-11 --space-6. Dette : 3 litteral(s) hardcode(s) (1px, clamp(var(--space-11), clamp(var(--space-6)).

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
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `quote_en` | string | oui |  |  |
| `quote_fr` | string | oui |  |  |
| `role_en` | string | oui |  |  |
| `role_fr` | string | oui |  |  |

**Tokens** : `--accent` `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--leading-lede` `--muted` `--paper` `--paper-2` `--radius-full` `--space-1` `--space-4` `--space-5` `--space-7` `--spacing-section` `--text-body-md` `--text-body-sm` `--text-h2-section` `--text-lede` `--wrap-prose`

**Classes scoped** : .qs-author .qs-author-name .qs-author-role .qs-avatar .qs-avatar--placeholder .qs-caption .qs-figure .qs-mark .qs-quote .quote-spotlight .wrap-wide

**Dette hardcode** : 4 valeur(s) — 1px, 48px, 600px, clamp(72px, 10vw, 140px)

**Agent** : Espacement : --space-1 --space-4 --space-5. Couleur : --accent --ink --muted. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (1px, 48px, 600px).

---

### `team-card-grid`

> Grille auto-fill de cartes auteurs avec photo, rôle, description, compteur de publications et CTA profil.
> TeamCardGrid · src/components/sections/TeamCardGrid.astro · marketing/testimonial-sections
> status : stable · tags : authors, cards, profiles, team

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `count_plural_en` | string | non | publications |  |
| `count_plural_fr` | string | non | publications |  |
| `count_singular_en` | string | non | publication |  |
| `count_singular_fr` | string | non | publication |  |
| `cta_label_en` | string | non | View profile → |  |
| `cta_label_fr` | string | non | Voir le profil → |  |
| `members` | array | non | Portrait auteur Waimia | int min:0 max:6 |

**Tokens** : `--accent` `--ease` `--ease-out` `--font-display` `--font-mono` `--font-sans` `--fw-regular` `--ink` `--ink-rgb` `--muted` `--paper` `--paper-2` `--radius-sm` `--space-2` `--space-4` `--space-6` `--text-body-lead` `--text-eyebrow`

**Classes scoped** : .eq-card .eq-card-body .eq-card-count .eq-card-cta .eq-card-desc .eq-card-meta .eq-card-name .eq-card-photo .eq-card-role .eq-grid .eq-grid-sec .wrap

**Dette hardcode** : 17 valeur(s) — -2px, .12em, .1em, 100%, 1240px, 12px, 16px, 1px

**Agent** : Espacement : --space-2 --space-4 --space-6. Couleur : --accent --ink --ink-rgb. Typographie : --font-display --font-mono. Dette : 17 litteral(s) hardcode(s) (-2px, .12em, .1em).

---

### `testimonial-block`

> Bloc témoignage pour mettre en avant une citation client et renforcer la confiance.
> TestimonialBlock · src/components/sections/TestimonialBlock.astro · marketing/testimonial-sections
> status : stable · tags : quote, social-proof, testimonial

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | non |  |  |
| `h2_fr` | string | non |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `layout` | enum | non | grid-2 | carousel | grid-2 | rows |
| `testimonials` | array | oui |  | min:1 max:6 |

**Tokens** : `--accent` `--font-display` `--hairline` `--ink` `--leading-h3` `--leading-lede` `--space-1` `--space-4` `--spacing-block` `--spacing-section` `--text-h2-section`

**Classes scoped** : .testimonial-block .testimonial-block__author .testimonial-block__footer .testimonial-block__header .testimonial-block__item .testimonial-block__list .testimonial-block__quote

**Dette hardcode** : 9 valeur(s) — -1px, 16px, 1px, 20px, 2px, 640px, clamp(18px, 2vw, 28px), clamp(20px, 2.5vw, 40px)

**Agent** : Layout : `layout` (schema, 0 CSS). Espacement : --space-1 --space-4 --spacing-block. Couleur : --accent --ink. Typographie : --font-display --leading-h3. Dette : 9 litteral(s) hardcode(s) (-1px, 16px, 1px).

---

## Timeline Sections

### `how-we-ship`

> Section "comment on livre"  ·  sticky pin scrub : N étapes avec numline et stage cards animées au scroll (graceful degradation mobile).
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

**Tokens** : `--accent` `--ease` `--font-display` `--fw-regular` `--hairline` `--hairline-strong` `--muted` `--space-8` `--wrap-read`

**Classes scoped** : .how-we-ship .how-we-ship__body .how-we-ship__card .how-we-ship__numline .how-we-ship__pip .how-we-ship__roman .how-we-ship__stage .how-we-ship__sticky .how-we-ship__title .how-we-ship__tracks .how-we-ship__wrap .is-active .wrap-wide

**Dette hardcode** : 18 valeur(s) — -0.02em, -0.03em, 1200px, 120px, 18px, 1px, 20px, 640px

**Agent** : Espacement : --space-8. Couleur : --accent --muted. Typographie : --font-display --fw-regular. Dette : 18 litteral(s) hardcode(s) (-0.02em, -0.03em, 1200px).

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
| `heading_en` | string | oui |  |  |
| `heading_fr` | string | oui |  |  |
| `label_en` | string | oui |  |  |
| `label_fr` | string | oui |  |  |
| `roman` | string | oui |  |  |
| `steps` | array | oui |  |  |
| `tier_cta_en` | string | non | Open tier → |  |
| `tier_cta_fr` | string | non | Voir le palier → |  |
| `tiers` | array | oui |  |  |
| `timeline_label_en` | string | non | AI maturity path |  |
| `timeline_label_fr` | string | non | Progression de maturité IA |  |

**Tokens** : `--accent` `--accent-rgb` `--dur-fast` `--ease` `--font-display` `--font-mono` `--hairline` `--hairline-strong` `--ink` `--ink-2` `--leading-h3` `--leading-lede` `--muted` `--radius-full` `--space-1` `--space-2` `--text-caption` `--text-eyebrow` `--text-h3-row` `--text-mono-xs` `--wrap-read`

**Classes scoped** : .e-action .e-body .e-list .e-num .e-tag .e-title .editorial-cell .pyramid-asym .pyramid-step .pyramid-step-roman .pyramid-step-stage .pyramid-step-verb .pyramid-svg .pyramid-timeline .sec

**Dette hardcode** : 20 valeur(s) — -0.01em, -0.02em, -3px, 0.14em, 100%, 140px, 1px, 3px

**Agent** : Espacement : --space-1 --space-2. Couleur : --accent --accent-rgb --ink. Typographie : --font-display --font-mono. Dette : 20 litteral(s) hardcode(s) (-0.01em, -0.02em, -3px).

---

### `method-timeline`

> Timeline méthodologique pour expliquer les étapes d'un accompagnement ou d'un processus.
> MethodTimeline · src/components/sections/MethodTimeline.astro · marketing/timelines
> status : stable · tags : method, steps, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `lede_en` | string | non |  |  |
| `lede_fr` | string | non |  |  |
| `steps` | array | oui |  | min:2 max:6 |

**Tokens** : `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--space-2` `--space-4` `--space-6` `--spacing-block` `--spacing-section` `--text-body-md` `--text-h2-section`

**Classes scoped** : .method-timeline .method-timeline__content .method-timeline__header .method-timeline__label .method-timeline__list .method-timeline__num .method-timeline__step

**Dette hardcode** : 5 valeur(s) — 10px, 1px, 20px, 40px, clamp(18px, 1.8vw, 24px)

**Agent** : Espacement : --space-2 --space-4 --space-6. Couleur : --ink --muted. Typographie : --font-display --font-sans. Dette : 5 litteral(s) hardcode(s) (10px, 1px, 20px).

---

### `steps-horizontal`

> Etapes numerotees en ligne avec pastilles et connecteurs hairline. Passage vertical sous 760px.
> StepsHorizontal · src/components/sections/StepsHorizontal.astro · marketing/timelines
> status : stable · tags : horizontal, process, steps, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |
| `kicker_en` | string | non |  |  |
| `kicker_fr` | string | non |  |  |
| `steps` | array | oui |  | min:2 max:6 |

**Tokens** : `--accent` `--accent-ink` `--font-display` `--font-mono` `--font-sans` `--fw-medium` `--fw-regular` `--hairline` `--hairline-strong` `--ink` `--leading-h3` `--muted` `--radius-full` `--space-2` `--space-4` `--space-5` `--space-6` `--space-9` `--spacing-block` `--spacing-section` `--text-body-sm` `--text-h2-section` `--text-h3-card`

**Classes scoped** : .steps-horizontal .steps-horizontal__connector .steps-horizontal__content .steps-horizontal__header .steps-horizontal__list .steps-horizontal__pill .steps-horizontal__step .steps-horizontal__title .steps-horizontal__track

**Dette hardcode** : 3 valeur(s) — 1px, 40px, 760px

**Agent** : Espacement : --space-2 --space-4 --space-5. Couleur : --accent --accent-ink --ink. Typographie : --font-display --font-mono. Dette : 3 litteral(s) hardcode(s) (1px, 40px, 760px).

---

### `timeline-block`

> Bloc chronologique pour raconter une progression, un historique ou une séquence d'événements.
> TimelineBlock · src/components/sections/TimelineBlock.astro · marketing/timelines
> status : stable · tags : events, history, timeline

**Props**

| Champ | Type | Req | Default | Contrainte |
|---|---|---|---|---|
| `events` | array | oui |  | min:2 |
| `h2_en` | string | oui |  |  |
| `h2_fr` | string | oui |  |  |

**Tokens** : `--font-display` `--font-sans` `--fw-regular` `--hairline` `--ink` `--leading-h3` `--muted` `--space-1` `--space-2` `--space-5` `--space-6` `--spacing-block` `--spacing-section` `--text-body-md` `--text-h2-section`

**Classes scoped** : .timeline-block .timeline-block__content .timeline-block__date .timeline-block__event .timeline-block__list .timeline-block__title

**Dette hardcode** : 4 valeur(s) — 120px, 1px, 600px, clamp(16px, 1.6vw, 22px)

**Agent** : Espacement : --space-1 --space-2 --space-5. Couleur : --ink --muted. Typographie : --font-display --font-sans. Dette : 4 litteral(s) hardcode(s) (120px, 1px, 600px).

---

## Trust Sections

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

**Tokens** : `--accent` `--ease` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--ink` `--ink-2` `--leading-lede` `--leading-prose` `--muted` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--text-body-md` `--text-body-sm` `--text-eyebrow` `--text-mono-xs` `--wrap-read`

**Classes scoped** : .trust-body .trust-footer-version .trust-grid .trust-h1 .trust-hd .trust-kicker .trust-lede .trust-legal-footer .trust-meta .trust-sections .trust-toc .trust-toc-k .trust-toc-num

**Dette hardcode** : 26 valeur(s) — -0.022em, -0.028em, 0.08em, 0.1em, 0.5em, 1.2em, 1.4em, 1.5em

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --ink --ink-2. Typographie : --font-display --font-mono. Dette : 26 litteral(s) hardcode(s) (-0.022em, -0.028em, 0.08em).

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
| `next_steps` | array | non |  | min:1 max:3 |

**Tokens** : `--accent` `--accent-2` `--dur-fast` `--ease` `--font-display` `--font-mono` `--fw-regular` `--hairline` `--ink-2` `--leading-body` `--leading-h1` `--leading-h3` `--muted` `--paper-2` `--radius-lg` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--text-body-sm` `--text-caption` `--wrap-prose`

**Classes scoped** : .welcome .welcome-back .welcome-foot .welcome-h1 .welcome-kicker .welcome-lede .welcome-mark .welcome-step .welcome-step-cta .welcome-step-num .welcome-step-text .welcome-step-title .welcome-steps .welcome-wrap

**Dette hardcode** : 16 valeur(s) — -0.018em, -0.028em, 0.04em, 10px, 18px, 1px, 20px, 2px

**Agent** : Espacement : --space-2 --space-3 --space-4. Couleur : --accent --accent-2 --ink-2. Typographie : --font-display --font-mono. Dette : 16 litteral(s) hardcode(s) (-0.018em, -0.028em, 0.04em).

---
