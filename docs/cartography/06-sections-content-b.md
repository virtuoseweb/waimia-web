# 06 — Sections contenu B (16)

> Inventaire exhaustif — lus intégralement, 2026-06-04.
> Fichier source : `src/schemas/sections.ts` (1173 l) + 16 composants `src/components/sections/*.astro`.
> Lecture seule — aucun composant modifié.

---

## 1. MediaBlock

- **name** : MediaBlock
- **file** : `src/components/sections/MediaBlock.astro` (74 l)
- **type-id** : `'media-block'`

### role
Section utilitaire générique pour insérer un media (image, vidéo, embed iframe, SVG inline) avec légende bilingue facultative. Pas de texte éditorial autour — le contenu *est* le média.

### props
```ts
{
  type: 'media-block',
  media_kind: 'image' | 'svg' | 'video' | 'embed',  // discriminant de rendu
  src: string,
  alt_fr?: string,
  alt_en?: string,
  caption_fr?: string,
  caption_en?: string,
  width?: number,
  height?: number
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--font-sans)`, `var(--text-body-sm)`, `var(--muted)`

### css_classes
`.media-block`, `.media-block__img`, `.media-block__video`, `.media-block__embed`, `.media-block__svg-wrap`, `.media-block__caption`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
`media_kind` : `image` | `svg` | `video` | `embed` (4 rendus conditionnels CSS/HTML distincts)

### status
`unique` — aucun autre composant section ne couvre l'insertion de média brut

### page_objective_fit
`information` | `editorial` | `seo` (illustration contenu long-form, pilier, cas d'usage)

### notes
Section épurée et polyvalente. Rendu conditionnel par `data-kind` + CSS attribute selectors. L'iframe reçoit `style="aspect-ratio:16/9"` inline — seul cas d'inline style du DS. Le SVG est wrappé dans `.media-block__svg-wrap` (div), pas dangerouslySetInnerHTML. Pas de reveal animation. Réutilisabilité maximale (tout type de média, toute page).

---

## 2. MethodTimeline

- **name** : MethodTimeline
- **file** : `src/components/sections/MethodTimeline.astro` (112 l)
- **type-id** : `'method-timeline'`

### role
Présente une méthodologie en étapes ordonnées (2–6). Chaque step a un numéro (affiché via `Kicker` tone=`accent`), un label (font display), un corps (font sans), et des méta-données optionnelles (Kicker tone=`dim` pour meta, `muted` pour durée).

### props
```ts
{
  type: 'method-timeline',
  kicker_fr?: string,
  kicker_en?: string,
  h2_fr: string,
  h2_en: string,
  lede_fr?: string,
  lede_en?: string,
  steps: Array<{
    num: string,
    label_fr: string,
    label_en: string,
    body_fr: string,
    body_en: string,
    meta_fr?: string,
    meta_en?: string,
    duration_fr?: string,        // uniquement FR (pas duration_en dans schema)
  }>,  // min(2) max(6)
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--spacing-block)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--font-sans)`, `var(--text-body-md)`, `var(--muted)`

### css_classes
`.method-timeline`, `.method-timeline__header`, `.method-timeline__list`, `.method-timeline__step`, `.method-timeline__num`, `.method-timeline__content`, `.method-timeline__label`

### consumers
- Templates live : `src/components/templates/CaseStudyTemplate.astro`, `src/components/templates/DetailMenuTemplate.astro`, `src/components/templates/ServiceDetailTemplate.astro`
- MDX : `src/content/offres/composable-pilot.mdx`
- Pages : `src/pages/agence/design-system.astro`, `src/pages/test-composable.astro`

### variants_existing
Pas de `layout` variant. Variabilité via présence/absence de kicker, lede, meta, duration par step.

### status
`unique` — aucun doublon; `TimelineBlock` est proche conceptuellement (chronologie) mais diffère : MethodTimeline = étapes de processus numérotées avec corps riche, TimelineBlock = événements datés avec structure plus légère.

### page_objective_fit
`information` | `seo` | `pillar` | `editorial` (expliquer une méthode, un process, un workflow)

### notes
L'un des composants les plus consommés (3 templates + 1 MDX). Structure en `<ol>` accessible. La colonne num fait 40px via `grid-template-columns: 40px 1fr`. Le lede porte `reveal reveal-fade`. `duration_fr` n'a pas de contrepartie `duration_en` dans le schéma — incohérence bilingue à noter (DA debt).

---

## 3. NewsletterBand

- **name** : NewsletterBand
- **file** : `src/components/sections/NewsletterBand.astro` (159 l)
- **type-id** : `'newsletter-band'`

### role
Bande d'acquisition email pleine largeur, fond `var(--ink)` (dark). Titre display imposant à gauche, formulaire email + CTA à droite, mention légale optionnelle (`hint`). Le seul composant section avec un `<form>` natif.

### props
```ts
{
  type: 'newsletter-band',
  kicker_fr?: string,
  kicker_en?: string,
  h2_fr: string,
  h2_en: string,
  lead_fr?: string,
  lead_en?: string,
  placeholder_fr: string,   // défaut fourni en schema
  placeholder_en: string,
  cta_label_fr: string,     // défaut fourni en schema
  cta_label_en: string,
  hint_fr?: string,
  hint_en?: string,
  form_action?: string
}
```

### css_vars
`var(--ink)`, `var(--paper)`, `var(--font-mono)`, `var(--font-display)`, `var(--font-sans)`, `var(--accent)`, `var(--ease)`

### css_classes
`.newsletter-band`, `.newsletter-band__inner`, `.newsletter-band__left`, `.newsletter-band__right`, `.newsletter-band__kicker`, `.newsletter-band__h2`, `.newsletter-band__lead`, `.newsletter-band__form`, `.newsletter-band__field`, `.newsletter-band__input`, `.newsletter-band__btn`, `.newsletter-band__hint`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Pas de variant layout. Variabilité par présence/absence kicker, lead, hint, form_action.

### status
`unique` — seule section avec formulaire d'acquisition; aucune autre section n'a un fond `--ink` nativement sauf `OperatingLayer`.

### page_objective_fit
`conversion` (acquisition email, lead capture)

### notes
`aria-labelledby="newsletter-band-h2"`. Grid 2-col `1.2fr / 1fr`, collapse à 860px. Kicker stylistiquement maison (span mono) au lieu de l'atome `Kicker` — incohérence interne (pas un problème fonctionnel mais mérite refactor DA à l'occasion). `reveal` sur les deux colonnes. Poids élevé (159 l) pour une section sans variant. Le `form_action` est optionnel — sans action, le form ne fait rien (à compléter par intégration JS).

---

## 4. ObjectionHandler

- **name** : ObjectionHandler
- **file** : `src/components/sections/ObjectionHandler.astro` (88 l)
- **type-id** : `'objection-handler'`

### role
Table question/réponse 2 colonnes (« Ce que vous pensez » / « Notre réponse ») pour lever les objections commerciales. Chaque ligne : une objection (italic display muted) face à une réponse (sans ink).

### props
```ts
{
  type: 'objection-handler',
  h2_fr: string,
  h2_en: string,
  objections: Array<{
    objection_fr: string,
    objection_en: string,
    response_fr: string,
    response_en: string,
  }>,  // min(2)
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--muted)`, `var(--font-sans)`, `var(--text-body-md)`

### css_classes
`.objection-handler`, `.objection-handler__table-head`, `.objection-handler__list`, `.objection-handler__row`, `.objection-handler__objection`, `.objection-handler__response`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Aucune variant layout. Pas de kicker. Structure fixe 2-col tableau.

### status
`unique` — pattern Q/R spécifique non couvert ailleurs. Proche sémantiquement de `WhyStalls` (liste de réponses à des blockers) mais structure visuelle distincte (tableau vs aside+rows).

### page_objective_fit
`conversion` | `information` (FAQ commerciale, levée d'objections)

### notes
Les en-têtes de colonnes sont hardcodés FR/EN côté composant (pas en prop). Ce choix simplifie la data mais verrouille le vocabulaire — acceptable pour un usage conversion. La grille collapse à 640px. Pas de `reveal` animation. Bonne réutilisabilité sur pages offres, pricing, landing.

---

## 5. OperatingLayer

- **name** : OperatingLayer
- **file** : `src/components/sections/OperatingLayer.astro` (167 l)
- **type-id** : `'operating-layer'`

### role
Section hero-like dark avec console mockup terminal + strip de 4 attributs métriques. Présente le « fonctionnement » du produit : chapitre, h2 display XL, lede, CTAs, TerminalMockup avec lignes k/v + commande, puis strip 4 colonnes de descripteurs techniques.

### props
```ts
{
  type: 'operating-layer',
  chapter_num: string,
  chapter_title_fr: string,
  chapter_title_en: string,
  spec_label: string,
  h2_fr: string,
  h2_en: string,
  lede_fr: string,
  lede_en: string,
  cta_primary: { href, label_fr, label_en, variant? },
  cta_secondary?: { href, label_fr, label_en },
  terminal_label: string,
  console_lines: Array<{ k: string, v: string }>,  // min(2) max(8)
  console_cmd: string,
  attrs: Array<{ k: string, v_fr: string, v_en: string }>,  // length(4) exactement
}
```

### css_vars
`var(--ink)`, `var(--paper)`, `var(--font-mono)`, `var(--font-display)`, `var(--accent)`, `var(--ease)` (via transition)

### css_classes
`.operating-layer`, `.operating-layer__hd`, `.operating-layer__spec`, `.operating-layer__grid`, `.operating-layer__h2`, `.operating-layer__lede`, `.operating-layer__ctas`, `.operating-layer__console-body`, `.operating-layer__console-row`, `.operating-layer__console-k`, `.operating-layer__console-v`, `.operating-layer__console-cmd`, `.operating-layer__attrs`, `.operating-layer__attr-k`, `.operating-layer__attr-v`

### consumers
- Pages live : `src/pages/index.astro`, `src/pages/en/index.astro`
- Page catalogue : `src/pages/agence/design-system.astro`

### variants_existing
Pas de variant layout. Le `cta_secondary` est optionnel. Les `attrs` sont fixes à 4 (constraint schema `length(4)`).

### status
`unique` — section la plus complexe (3 sous-composants : `ChapterLabel`, `Button`, `TerminalMockup`). Aucun doublon direct. `WhyStalls` partage le pattern `ChapterLabel` + sticky aside mais diffère radicalement.

### page_objective_fit
`conversion` | `pillar` (section produit clé, haut de page Homepage)

### notes
COPIE FIDÈLE de `src/components/ui/organisms/OperatingLayer.astro` (double source de vérité — DA debt). Padding ultra-large `clamp(120px,15vw,200px)`. `signature-grid on-dark` en décor absolu. La valeur `◉` dans les console_lines est remplacée inline par `<span style="color:var(--accent)">◉</span>` — seul usage de `set:html` avec substitution inline dans le catalogue. `attrs` exactement 4 = contrainte forte sur la data.

---

## 6. PricingTable

- **name** : PricingTable
- **file** : `src/components/sections/PricingTable.astro` (153 l)
- **type-id** : `'pricing-table'`

### role
Grille de tiers de tarification (1–5 colonnes). Chaque tier : nom, prix, liste de features (checkmarks `▸`), CTA. Un tier peut être `featured` (bandeau accent top + fond légèrement teinté). Kicker et h2 section optionnels.

### props
```ts
{
  type: 'pricing-table',
  kicker_fr?: string,
  kicker_en?: string,
  h2_fr: string,
  h2_en: string,
  tiers: Array<{
    name_fr: string,
    name_en: string,
    price: string,
    features_fr: string[],
    features_en: string[],
    cta: { href, label_fr, label_en, variant? },
    featured: boolean,
  }>,  // min(1) max(5)
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--accent)`, `var(--font-mono)`, `var(--font-sans)`, `var(--text-body-sm)`, `var(--muted)`

### css_classes
`.pricing-table`, `.pricing-table__header`, `.pricing-table__grid`, `.pricing-table__tier`, `.pricing-table__tier--featured`, `.pricing-table__tier-header`, `.pricing-table__tier-name`, `.pricing-table__price`, `.pricing-table__features`, `.pricing-table__check`, `.pricing-table__cta`, `.pricing-table__btn`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**
- Note : `src/components/ui/molecules/PricingTier.astro` existe en parallèle (molecule dédiée) — potentielle dette

### variants_existing
Pas de variant `layout` explicite. Le nombre de colonnes est dynamique via `--col-count` CSS var calculé depuis `data.tiers.length`. `featured: boolean` = seule variante.

### status
`unique` — aucune autre section comparable pour la tarification.

### page_objective_fit
`conversion` (page tarification, offre, pricing)

### notes
`--col-count` = pattern CSS var dynamique depuis JS (inline style). `featured` tier : `::before` top-bar accent 2px + `rgba(181,71,42,.04)` bg. Le checkmark est `▸` (mono accent) — pas un SVG. CTA : `accent` si `featured`, sinon `tier.cta.variant`. Collapse 1-col à 768px. `PricingTier.astro` molecule existe en parallèle — risque de dérive divergente si les deux évoluent séparément.

---

## 7. ProblemsGrid

- **name** : ProblemsGrid
- **file** : `src/components/sections/ProblemsGrid.astro` (79 l)
- **type-id** : `'problems-grid'`

### role
Grille auto-fit de cards de problèmes (2–6). Chaque card : numéro, kicker (accent mono uppercase), h3 (serif), corps (body muted). Fond sombre (dark background via `rgba(0,0,0,.08)` sur le grid = hairlines séparateurs).

### props
```ts
{
  type: 'problems-grid',
  h2_fr: string,
  h2_en: string,
  problems: Array<{
    num?: string,
    kicker_fr: string,
    kicker_en: string,
    title_fr: string,
    title_en: string,
    body_fr: string,
    body_en: string,
  }>,  // min(2) max(6)
}
```

### css_vars
`var(--ink)`, `var(--muted)`, `var(--accent)`, `var(--paper)`, `var(--font-serif)` (alias `--font-serif`), `var(--font-mono)` (alias `--font-mono`), `var(--font-body)` (alias `--font-body`)

> ⚠️ Utilise `var(--font-serif)`, `var(--font-mono)`, `var(--font-body)` avec fallbacks explicites (`'Instrument Serif'`, `'JetBrains Mono'`, `'Inter Tight'`) — diffère des autres sections qui utilisent `var(--font-display)` et `var(--font-sans)` sans fallback. Potentielle inconsistance de token (DA debt).

### css_classes
`.problems-grid`, `.problems-grid__h2`, `.problems-grid__cards`, `.problems-grid__card`, `.problems-grid__num`, `.problems-grid__kicker`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Pas de variant. Auto-fit `minmax(280px,1fr)`. `num` optionnel avec fallback `String(i+1).padStart(2,'0')`.

### status
`proche-de StatBlock` (grille de blocs de contenu) mais différent : ProblemsGrid = cards full-background avec rich content (kicker+h3+body), StatBlock = grille de métriques valeur/label. Pas de fusion DA directe possible.

### page_objective_fit
`conversion` | `seo` | `pillar` (identifier les douleurs client, homepage, landing)

### notes
COPIE FIDÈLE de `.tnl-problems / .tnl-cards / .tnl-card` de `site-web-ia-landing.astro`. Section + wrap-wide sur le même element (`<section class="problems-grid wrap-wide reveal-blur-clip">`). La `.wrap-wide` locale surcharge : `clamp(20px,5vw,80px)` padding. `reveal-blur-clip` sur la section entière, `reveal` sur le h2.

---

## 8. ProofBarSection

- **name** : ProofBarSection
- **file** : `src/components/sections/ProofBarSection.astro` (75 l)
- **type-id** : `'proof-bar'`

### role
Barre de métriques sociales / chiffres de preuve. Affiche 2–6 métriques avec valeur display (accent) + label italic muted. Deux layouts CSS distincts par attribut `data-layout`.

### props
```ts
{
  type: 'proof-bar',
  kicker_fr?: string,
  kicker_en?: string,
  metrics: Array<{
    value: string,
    label_fr: string,
    label_en: string,
    emphasis: boolean,
  }>,  // min(2) max(6)
  layout: 'horizontal' | 'vertical-stack',  // défaut 'horizontal'
}
```

### css_vars
`var(--hairline)`, `var(--font-display)`, `var(--accent)`, `var(--font-sans)`, `var(--text-body-sm)`, `var(--muted)`

### css_classes
`.proof-bar`, `.proof-bar__kicker`, `.proof-bar__list`, `.proof-bar__item`, `.proof-bar__item--emphasis`, `.proof-bar__value`, `.proof-bar__label`

### consumers
- Templates live : `src/components/templates/DetailMenuTemplate.astro`, `src/components/templates/ServiceDetailTemplate.astro`
- Pages live : `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/manifesto.astro`
- Pages test : `src/pages/test-composable.astro`
- Autres refs : `src/components/sections/HeroServiceDetail.astro`, `src/components/ui/organisms/Hero.astro`, `src/content/offres/composable-pilot.mdx`
- Section parmi les plus utilisées du catalogue

### variants_existing
`layout` : `'horizontal'` (auto-fit colonnes + bordures droites) | `'vertical-stack'` (1 col + bordures bottom + direction row value/label)
`emphasis` par item : modifier de classe disponible (pas de CSS rule additionnelle visible dans la section, hérite du style de base)

### status
`proche-de StatBlock` — tous deux affichent des métriques valeur/label avec un `data-layout`. Différences : ProofBar = horizontal/vertical-stack, valeurs display XL accent, pas de h2 ; StatBlock = grid-3/grid-4/rows-hairlines, h2 + lede optionnels, items plus compacts. Candidats à harmonisation DA (même atome métrique commun possible).

### page_objective_fit
`conversion` | `seo` | `pillar` (preuve sociale, chiffres clés, KPIs homepage)

### notes
Section la plus consommée parmi le lot B (5 fichiers live hors registre). Layouts pilotés par `data-layout` HTML attribute CSS selectors — pattern propre et extensible. `.proof-bar__item--emphasis` déclaré mais sans règle CSS supplémentaire dans le composant (à vérifier si le site global a une règle ou si c'est une extension future).

---

## 9. ServicesGrid

- **name** : ServicesGrid
- **file** : `src/components/sections/ServicesGrid.astro` (219 l)
- **type-id** : `'services-grid'`

### role
Grille 3×2 de services avec figure (FIG N + métrique accent), h3 display, rule accent animée (hover), body court, footer connecteurs (dashed). Section fond `var(--paper-2)` avec hover lift sur les cards.

### props
```ts
{
  type: 'services-grid',
  fig_num: string,
  fig_title_fr: string,
  fig_title_en: string,
  spec_fr: string,
  spec_en: string,
  h2_fr: string,
  h2_en: string,
  connectors_label_fr: string,   // défaut fourni en schema
  connectors_label_en: string,
  services: Array<{
    fig: string,
    metric_fr: string,
    metric_en: string,
    label_fr: string,
    label_en: string,
    body_fr: string,
    body_en: string,
    connectors_fr: string,
    connectors_en: string,
  }>,  // min(3) max(6)
}
```

### css_vars
`var(--hairline)`, `var(--hairline-strong)`, `var(--paper-2)`, `var(--font-mono)`, `var(--muted)`, `var(--accent)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--leading-h2)`, `var(--ink)`, `var(--font-sans)`, `var(--text-h3-row)`, `var(--leading-h3)`, `var(--ease)`, `var(--ink-2)`

> Utilise `var(--hairline-strong)`, `var(--paper-2)`, `var(--ink-2)`, `var(--leading-h2)`, `var(--leading-h3)`, `var(--text-h3-row)` — tokens plus avancés que la plupart des autres sections.

### css_classes
`.services-grid`, `.services-grid__hd`, `.services-grid__chapter`, `.services-grid__dot`, `.services-grid__num`, `.services-grid__sep`, `.services-grid__spec`, `.services-grid__h2`, `.services-grid__grid`, `.services-grid__cell`, `.services-grid__cell-head`, `.services-grid__cell-fig`, `.services-grid__cell-metric`, `.services-grid__cell-title`, `.services-grid__cell-rule`, `.services-grid__cell-body`, `.services-grid__cell-foot`, `.services-grid__cell-foot-key`, `.services-grid__cell-foot-val`, `.services-grid__cell-arr`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Pas de variant layout. Grille fixe 3-col → 2-col (900px) → 1-col (600px). Hover interactif (card lift + rule expansion + flèche slide).

### status
`unique` — pattern "grille de services avec connecteurs" non couvert ailleurs. Proche de `UseCaseIndex` (liste de services) mais structuralement différent (cards vs rows cliquables).

### page_objective_fit
`information` | `pillar` | `seo` (présentation des offres / services page agence)

### notes
Section la plus lourde du catalogue B (219 l). Source : `SixServices.astro` (Acte II). Header chapitre maison (non `ChapterLabel` atom) — incohérence avec `OperatingLayer`/`WhyStalls` qui utilisent `ChapterLabel`. `connectors` = colonne footer des cards présentant les intégrations/synergies inter-services. Hover interactif riche mais zero JS. Le `.services-grid__cell-arr` (`→`) est en position absolute en bas-droite.

---

## 10. SocialProof

- **name** : SocialProof
- **file** : `src/components/sections/SocialProof.astro` (77 l)
- **type-id** : `'social-proof'`

### role
Bande de logos clients / partenaires. Deux modes : marquee animé horizontal infini (liste dupliquée aria-hidden) ou grille statique flex-wrap. Kicker optionnel au-dessus.

### props
```ts
{
  type: 'social-proof',
  kicker_fr?: string,
  kicker_en?: string,
  logos: Array<{
    name: string,
    src?: string,  // chemin image optionnel (actuellement rendu texte seulement)
  }>,
  marquee: boolean,  // défaut true
}
```

### css_vars
`var(--hairline)`, `var(--font-display)`, `var(--muted)`

### css_classes
`.social-proof`, `.social-proof__kicker`, `.social-proof__logo`, `.social-proof__static`, `.social-proof__marquee-wrap`, `.social-proof__marquee`

### consumers
- Pages live : `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/technologies/index.astro`, `src/pages/en/technologies/index.astro`
- Autres : `src/components/footer/Footer.astro`
- Page catalogue : `src/pages/agence/design-system.astro`

### variants_existing
`marquee: boolean` : marquee animé (32s linear infinite) | grille statique flex-wrap
`prefers-reduced-motion`: animation stoppée automatiquement

### status
`unique` — aucun autre composant section pour les logos. Proche de `ProofBarSection` (preuve sociale) mais radicalement différent : SocialProof = logos branding, ProofBarSection = chiffres. Pas de fusion.

### page_objective_fit
`seo` | `conversion` | `pillar` | `hub` (confiance, preuve, homepages)

### notes
Le `src?` de logo est déclaré en schema mais non rendu comme `<img>` dans le composant — le composant affiche uniquement `l.name` (texte). Limitation actuelle : pas de support logo image (DA dette ou choix délibéré pour les sites texte-only). `prefers-reduced-motion` correctement géré. Le Footer consomme ce composant section directement — couplage atypique (template → section dans Footer).

---

## 11. SpecBar

- **name** : SpecBar
- **file** : `src/components/sections/SpecBar.astro` (88 l)
- **type-id** : `'spec-bar'`

### role
Barre de spécifications techniques N colonnes (label mono muted + valeur mono ink). Fond `var(--paper-2)`. Utilisée pour les fiches techniques projet/offre. `--spec-cols` CSS var pilote la grille.

### props
```ts
{
  type: 'spec-bar',
  kicker_fr?: string,
  kicker_en?: string,
  specs: Array<{
    label_fr: string,
    label_en: string,
    value: string,   // pas de value_fr/en — valeur unique (technique, ex: "Astro 6.4")
  }>,  // min(2) max(8)
}
```

### css_vars
`var(--hairline)`, `var(--paper-2)`, `var(--font-mono)`, `var(--muted)`, `var(--ink)`

### css_classes
`.spec-bar`, `.spec-bar__grid`, `.spec-bar__item`, `.spec-bar__label`, `.spec-bar__value`

### consumers
- `src/components/sections/HeroCaseStudy.astro` (consomme la type-id ou le motif)
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`

### variants_existing
Pas de variant layout explicite. `--spec-cols` = `data.specs.length` → grille dynamique. Collapse 2-col à 800px, 1-col à 480px.

### status
`proche-de ServicesGrid__hd` (header chapitre + spec label) en tant que pattern de métadonnées mono, mais SpecBar est une section autonome dédiée aux specs. Proche aussi de `ProofBarSection` (grille valeurs/labels) mais purpose différent (technique vs performance). Pas de fusion.

### page_objective_fit
`information` | `seo` | `editorial` (fiche cas d'usage, détail offre, case study)

### notes
Source : `case-specs` section de `CaseStudyTemplate.astro`. `value` est non bilingue (volontaire : les valeurs techniques sont universelles). Le `kicker` sert de `aria-label` via prop `aria-label={isFr ? data.kicker_fr ?? 'Spécifications' : data.kicker_en ?? 'Specifications'}`. `reveal-stagger` sur la grid. `HeroCaseStudy.astro` consomme le motif (via grep) — vérifier si c'est le type-id ou une implémentation locale propre.

---

## 12. StatBlock

- **name** : StatBlock
- **file** : `src/components/sections/StatBlock.astro` (106 l)
- **type-id** : `'stat-block'`

### role
Grille de statistiques/métriques avec 3 layouts CSS distincts. H2 et lede optionnels. Chaque métrique : valeur display accent (large), label italic muted. `emphasis` par item disponible.

### props
```ts
{
  type: 'stat-block',
  h2_fr?: string,
  h2_en?: string,
  lede_fr?: string,
  lede_en?: string,
  metrics: Array<{
    value: string,
    label_fr: string,
    label_en: string,
    emphasis: boolean,
  }>,  // min(1) max(8)
  layout: 'grid-3' | 'grid-4' | 'rows-hairlines',  // défaut 'grid-3'
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--spacing-block)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--font-sans)`, `var(--text-body-md)`, `var(--text-body-sm)`, `var(--accent)`, `var(--muted)`

### css_classes
`.stat-block`, `.stat-block__header`, `.stat-block__grid`, `.stat-block__item`, `.stat-block__item--emphasis`, `.stat-block__value`, `.stat-block__label`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
`layout` : `'grid-3'` (3-col grille avec borders) | `'grid-4'` (4-col, collapse 2-col à 768px) | `'rows-hairlines'` (1-col, value+label horizontal, hairlines séparateurs)
`emphasis` par item : modifier classe disponible (pas de CSS rule supplémentaire visible)

### status
`proche-de ProofBarSection` — tous deux : métriques valeur display accent + label italic muted, emphasis par item, layout variant. Différences clés : StatBlock a h2+lede, 3 layouts (grid-3/grid-4/rows vs horizontal/vertical-stack), tokens spacing (`--spacing-section`, `--spacing-block`). Fusion DA partielle possible : atome commun pour item métrique.

### page_objective_fit
`information` | `seo` | `conversion` (chiffres d'impact, résultats, KPIs section)

### notes
`reveal reveal-fade` sur le lede. Items avec `border: 1px solid var(--hairline)` + `margin: -1px -1px 0 0` (hack border collapse classique, évite double border). Les sélecteurs `h2` et `p` sont directement dans le `<style>` sans classe parente → à surveiller en composition (risque de cascade globale — Astro scoped les contient via attribut de scope, donc OK en pratique).

---

## 13. TestimonialBlock

- **name** : TestimonialBlock
- **file** : `src/components/sections/TestimonialBlock.astro` (111 l)
- **type-id** : `'testimonial-block'`

### role
Grille de témoignages (1–6) avec 3 layouts : grid 2 colonnes, rows, ou carousel scroll-snap. Chaque témoignage : quote italic display, auteur (Kicker accent), rôle+company (Kicker dim). Kicker section et h2 optionnels.

### props
```ts
{
  type: 'testimonial-block',
  kicker_fr?: string,
  kicker_en?: string,
  h2_fr?: string,
  h2_en?: string,
  testimonials: Array<{
    quote_fr: string,
    quote_en: string,
    author: string,
    role_fr: string,
    role_en: string,
    company?: string,
  }>,  // min(1) max(6)
  layout: 'carousel' | 'grid-2' | 'rows',  // défaut 'grid-2'
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--spacing-block)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--accent)` (via Kicker), `var(--muted)` (via Kicker)

### css_classes
`.testimonial-block`, `.testimonial-block__header`, `.testimonial-block__list`, `.testimonial-block__item`, `.testimonial-block__quote`, `.testimonial-block__footer`, `.testimonial-block__author`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
`layout` : `'grid-2'` (2-col, collapse 1-col à 640px) | `'rows'` (1-col full-width) | `'carousel'` (2-col avec `overflow-x: auto` + `scroll-snap-type: x mandatory`)
Note : `carousel` = scroll-snap CSS natif, pas de JS — accessibilité scroll potentiellement limitée (pas de boutons prev/next).

### status
`unique` — seule section témoignages. Sémantiquement liée à `SocialProof` (preuve) mais structure complètement différente.

### page_objective_fit
`conversion` | `seo` | `pillar` (preuve sociale qualitative, landing, pages offre)

### notes
Items avec `::before` (left: 0, 2px background `--hairline`) = barre décorative latérale gauche. `border: 1px solid var(--hairline)` + `margin: -1px -1px 0 0` (même hack border collapse que StatBlock). `carousel` en CSS pur : `scroll-snap-align: start` sur chaque item. `h2` et `p` via sélecteurs simples (scoped Astro). Le `layout: 'carousel'` affiche 2 colonnes visibles avec scroll — peut paraître grid-2 au départ.

---

## 14. TimelineBlock

- **name** : TimelineBlock
- **file** : `src/components/sections/TimelineBlock.astro` (80 l)
- **type-id** : `'timeline-block'`

### role
Chronologie d'événements datés en liste ordonnée (`<ol>`). Chaque event : date (Kicker muted, colonne fixe 120px), titre (display), corps (sans muted). H2 obligatoire sans optionnel.

### props
```ts
{
  type: 'timeline-block',
  h2_fr: string,
  h2_en: string,
  events: Array<{
    date: string,
    title_fr: string,
    title_en: string,
    body_fr: string,
    body_en: string,
  }>,  // min(2), pas de max
}
```

### css_vars
`var(--spacing-section)`, `var(--hairline)`, `var(--spacing-block)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--ink)`, `var(--font-sans)`, `var(--text-body-md)`, `var(--muted)`

### css_classes
`.timeline-block`, `.timeline-block__list`, `.timeline-block__event`, `.timeline-block__date`, `.timeline-block__content`, `.timeline-block__title`

### consumers
- Page catalogue : `src/pages/agence/design-system.astro`
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template live → **catalogue-only** (hors design-system)

### variants_existing
Pas de variant. Structure fixe : 2-col `120px 1fr`, collapse 1-col à 600px. H2 toujours requis.

### status
`proche-de MethodTimeline` — tous deux = listes d'éléments ordonnés avec métadonnées. Différences : TimelineBlock = événements avec `date` (passé/futur), structure simple date+titre+corps ; MethodTimeline = étapes de process avec num+label+body+meta+durée, header riche optionnel. Pas de fusion (usage radicalement différent).

### page_objective_fit
`information` | `editorial` | `seo` (historique, roadmap, chronologie projet)

### notes
Structure pure et légère (80 l). Pas de reveal animation. `<ol>` liste ordonnée (correct sémantiquement). Kicker utilisé pour la date (`tone="muted" size={10}`). Premier event : `border-top` (via `.timeline-block__list` border-top implicite). Dernier event : `border-bottom` via `:last-child`. Variante max illimitée dans le schema (pas de `max()` — contrairement à MethodTimeline qui cap à 6).

---

## 15. UseCaseIndex

- **name** : UseCaseIndex
- **file** : `src/components/sections/UseCaseIndex.astro` (205 l)
- **type-id** : `'use-case-index'`

### role
Index éditorial de cas d'usage par département. Header 2-col (roman numéral display accent + label mono / h2 + aside). Liste de rows cliquables (4 colonnes : num-prefix, label italic, tag mono, flèche). Footer optionnel (lien CTA encadré).

### props
```ts
{
  type: 'use-case-index',
  roman: string,              // ex: "II"
  label_fr: string,
  label_en: string,
  heading_fr: string,
  heading_en: string,
  aside_fr?: string,
  aside_en?: string,
  num_prefix_fr: string,      // défaut 'USE CASE'
  num_prefix_en: string,
  items: Array<{
    label_fr: string,
    label_en: string,
    tag_fr: string,
    tag_en: string,
    href: string,
    footer_label_fr?: string,
    footer_label_en?: string,
    footer_href?: string,
  }>,  // min(2) max(8)
  footer_label_fr?: string,   // footer global (≠ item footer)
  footer_label_en?: string,
  footer_href?: string,
}
```

> Note : `footer_label_fr/en` et `footer_href` apparaissent à la fois au niveau de la section ET dans les items — comportement à valider dans les demos.

### css_vars
`var(--hairline)`, `var(--hairline-strong)`, `var(--font-mono)`, `var(--accent)`, `var(--font-display)`, `var(--text-h2-section)`, `var(--leading-h2)`, `var(--ink)`, `var(--font-sans)`, `var(--muted)`, `var(--ease)`, `var(--text-h3-row)`, `var(--leading-h3)`, `var(--ink-2)`, `var(--paper)`

### css_classes
`.use-case-index`, `.use-case-index__hd`, `.use-case-index__kicker`, `.use-case-index__roman`, `.use-case-index__h2`, `.use-case-index__aside`, `.use-case-index__list`, `.use-case-index__row`, `.use-case-index__row-num`, `.use-case-index__row-prefix`, `.use-case-index__row-label`, `.use-case-index__row-tag`, `.use-case-index__row-arr`, `.use-case-index__footer`

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Pas de variant layout. Hover interactif sur les rows (padding-left expand + label accent + arrow slide). `reveal-stagger` sur la liste.

### status
`unique` — pattern éditorial liste de cas d'usage avec navigation. Proche de `ServicesGrid` (liste de services) mais format rows vs cards, intention navigation hub vs présentation.

### page_objective_fit
`hub` | `seo` | `pillar` | `editorial` (index de pages cas d'usage, portail département, navigation éditoriale)

### notes
Source : `Departments.astro` (§ 05). Section la plus complexe visuellement avec `UseCaseIndex__roman` (italic display 28px accent) combiné au label mono. Le hover row alterne `padding-left: 0 → 14px` + `padding-right: 0 → 14px` (illusion de scan visuel). `--spec-cols` absent ici (grille fixe 4 cols `110px 1.4fr 1fr 32px`). Footer global = lien encadré `min(100%,360px)` avec `span` mono accent (pas de `→` visible — pas d'icône).

---

## 16. WhyStalls

- **name** : WhyStalls
- **file** : `src/components/sections/WhyStalls.astro` (85 l)
- **type-id** : `'why-stalls'`

### role
Section éditoriale sticky : aside gauche fixe (ChapterLabel + h2 display + lead) + colonne droite de rows (FIG label + texte display XL). Présente les raisons pour lesquelles une situation stagne / les obstacles structurels. Padding XL (héro-like).

### props
```ts
{
  type: 'why-stalls',
  chapter_num: string,
  chapter_title_fr: string,
  chapter_title_en: string,
  h2_fr: string,
  h2_en: string,
  aside_lead_fr: string,
  aside_lead_en: string,
  rows: Array<{
    fig: string,
    text_fr: string,
    text_en: string,
  }>,  // min(2) max(8)
}
```

### css_vars
`var(--font-display)`, `var(--muted)`, `var(--hairline)`, `var(--ink)`, `var(--accent)`, `var(--font-mono)`

### css_classes
`.why-stalls`, `.why-stalls__grid`, `.why-stalls__aside`, `.why-stalls__h2`, `.why-stalls__lead`, `.why-stalls__rows`, `.why-stalls__row`, `.why-stalls__fig`, `.why-stalls__row-text`

> Utilise aussi `row-lines` (classe externe) sur `.why-stalls__rows` + `on-dark` absent (section light).

### consumers
- `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts`
- Aucun template/page live → **catalogue-only**

### variants_existing
Pas de variant layout. Aside sticky (`position: sticky; top: 120px`). Premier row : `border-top: 1px solid var(--ink)` (fort) vs autres rows : `border-bottom: 1px solid var(--hairline)` (light). `data-first="true"` sur le premier article.

### status
`unique` — pattern sticky-aside + rows avec texte display XL non couvert ailleurs. Proche de `OperatingLayer` (ChapterLabel + layout 2-col) mais différent : WhyStalls = light, sticky, rows texte, pas de console/CTAs. Pas de fusion directe.

### page_objective_fit
`information` | `pillar` | `editorial` (diagnostic, obstacles, analyse situation, page positionnement)

### notes
COPIE FIDÈLE de `src/components/ui/organisms/WhyAIStalls.astro` (double source de vérité — DA debt, même problème qu'`OperatingLayer`). Padding éditorial XL `clamp(120px,16vw,200px)` top, `clamp(80px,10vw,140px)` bottom. `.wrap-wide` locale : `clamp(20px,4vw,48px)` padding. `row-lines` = classe utilitaire externe appliquée au div rows. Texte des rows : `font-size: clamp(22px,2.4vw,30px)` display — très lisible, impact éditorial fort.

---

## Synthèse

### Sections proches — candidats fusion / harmonisation DA

| Paire | Similarité | Action recommandée |
|---|---|---|
| **ProofBarSection** ↔ **StatBlock** | Même atome fondamental (valeur display accent + label italic muted), même `emphasis` par item, layouts data-attribute similaires | Extraire un atome `MetricItem` commun. Conserver les 2 sections (contextes différents : ProofBar = horizontal dominant, StatBlock = grille riche + h2/lede) |
| **MethodTimeline** ↔ **TimelineBlock** | Tous deux = liste ordonnée avec métadonnées par item. Différence : MethodTimeline = process + rich step, TimelineBlock = chronologie date simple | Pas de fusion — usage sémantique différent. Harmoniser le pattern header (kicker+h2+lede optionnel) |
| **ServicesGrid** ↔ **UseCaseIndex** | Tous deux = liste de "services/cas" avec header chapitre + items structurés | Pas de fusion — ServicesGrid = cards background hover, UseCaseIndex = rows link cliquables navigation |
| **OperatingLayer** ↔ **WhyStalls** | Tous deux : `ChapterLabel` atom + grid 2-col + padding XL | Pas de fusion — OperatingLayer dark + console + CTAs vs WhyStalls light + sticky + rows texte |
| **ObjectionHandler** ↔ **WhyStalls** | Tous deux = réponse à des blockers/objections | Pas de fusion — ObjectionHandler = tableau 2-col, WhyStalls = editorial sticky rows |

### Incohérences de tokens CSS à corriger

| Section | Token utilisé | Token standard DS | Gravité |
|---|---|---|---|
| **ProblemsGrid** | `var(--font-serif)`, `var(--font-body)` | `var(--font-display)`, `var(--font-sans)` | Moyenne — aliases avec fallback correct, risque si token renommé |
| **NewsletterBand** | Kicker maison (span mono inline styles) | Atome `Kicker` | Faible — cosmétique, identique visuellement |
| **ServicesGrid** | Header chapitre maison (span + dot) | Atome `ChapterLabel` | Faible — cosmétique |

### Doubles sources de vérité (DA debt critique)

| Section catalogue | Organisme source | Action |
|---|---|---|
| `OperatingLayer.astro` (sections/) | `OperatingLayer.astro` (ui/organisms/) | Faire consommer l'organisme depuis la section, ou supprimer la copie locale post-refactor |
| `WhyStalls.astro` (sections/) | `WhyAIStalls.astro` (ui/organisms/) | Idem — 2 fichiers à maintenir en sync = dette |

### Variantes redondantes

- `testimonial-block` layout `'carousel'` = CSS scroll-snap sans boutons nav → UX limitée mobile. Envisager `grid-2` comme seul layout universel + CSS container query pour adaptation.
- `proof-bar` `emphasis` et `stat-block` `emphasis` : modificateurs déclarés sans règle CSS additionnelle dans les composants. À implémenter ou à retirer du schéma.

### Mapping objectif-de-page

| Objectif | Sections recommandées |
|---|---|
| **conversion** | NewsletterBand, PricingTable, ObjectionHandler, ProofBarSection, OperatingLayer, TestimonialBlock |
| **seo** | MethodTimeline, SocialProof, ServicesGrid, UseCaseIndex, StatBlock, ProofBarSection, TimelineBlock |
| **information** | MediaBlock, ObjectionHandler, MethodTimeline, ServicesGrid, StatBlock, TimelineBlock, WhyStalls |
| **pillar** | OperatingLayer, ProblemsGrid, UseCaseIndex, SocialProof, WhyStalls, TestimonialBlock |
| **hub** | UseCaseIndex, SocialProof |
| **editorial** | MediaBlock, WhyStalls, UseCaseIndex, TimelineBlock, SpecBar |
| **silo** | SpecBar, MethodTimeline |

### Sections non-consommées (catalogue-only)

7 sections sur 16 ne sont consommées par aucun template/page live au moment de l'inventaire :
`MediaBlock`, `NewsletterBand`, `ObjectionHandler`, `PricingTable`, `ProblemsGrid`, `ServicesGrid`, `StatBlock`, `TestimonialBlock`, `UseCaseIndex`, `WhyStalls` — réservoir disponible pour futures pages.

`ProofBarSection`, `MethodTimeline`, `SocialProof`, `OperatingLayer`, `SpecBar`, `TimelineBlock` sont actifs en production.
