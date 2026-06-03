# 05 — Sections contenu A (16)

> Inventaire structuré des sections de contenu (1re moitié, non-hero).
> Fichiers : `src/components/sections/` — lecture intégrale de chaque composant.
> Contrainte : AUCUNE édition de composant. Seule écriture = ce fichier.

---

## 01 · ArchitectureDiagram

| Champ | Valeur |
|---|---|
| **name** | ArchitectureDiagram |
| **file** | `src/components/sections/ArchitectureDiagram.astro` |
| **type-id** | `architecture-diagram` |
| **role** | Schéma SVG 880×360 illustrant un flux inputs → système → outputs avec caption, numéro de figure et boucle optionnelle. |

**props** `data: SectionByType<'architecture-diagram'>`

| Prop | Type | Notes |
|---|---|---|
| `fig_num` | string | Numéro de figure (ex. « I ») |
| `fig_title_fr / _en` | string | Titre de la figure |
| `spec_fr / _en` | string | Sous-titre spec (aligné à droite dans le chapter header) |
| `h2_fr / _en` | string | Titre principal section |
| `inputs_fr / _en` | string[] 2–8 | Labels entités gauche |
| `outputs_fr / _en` | string[] 2–6 | Labels entités droite |
| `system_label` | string | Label boîte centrale |
| `kicker` | string | Kicker boîte centrale |
| `subtitle` | string | Sous-titre boîte centrale |
| `show_loop` | boolean | Affiche la flèche retour (boucle) |
| `loop_label_fr / _en` | string (opt) | Label de la boucle |
| `caption_fr / _en` | string (opt) | Légende sous le SVG |

**css_vars**

`--ink-2`, `--accent`, `--font-mono`, `--font-display`, `--text-h2-section`, `--leading-h2`, `--hairline`, `--paper`

**css_classes** (`.arch-diagram__*`)

`.arch-diagram`, `.__hd`, `.__chapter`, `.__dot`, `.__num`, `.__sep`, `.__spec`, `.__h2`, `.__fig`, `.__svg`, `.__cap`

**animation** : `reveal`, `reveal-fade`

**consumers** : catalogue-only (aucun template/page ne passe `'architecture-diagram'` en type — présence dans `section-demos`, `section-registry`, `/preview/` uniquement)

**variants_existing** : `show_loop: boolean` (bascule flèche retour)

**status** : `unique` — le chapitre header (dot + roman + · + titre + spec aligné droite) est partagé avec CaseCardGrid : pattern à factoriser en molécule `ChapterHeader`.

**page_objective_fit** : information | pillar

**notes** : SVG codé en dur dans le composant (viewBox 880×360, positions hardcodées). Puissant visuellement mais peu flexible si le nombre d'entités varie beaucoup. Le pattern chapter-header (`.arch-diagram__chapter`) est identique à `.case-card-grid__chapter` — candidat factorisation molécule.

---

## 02 · BrandedCallout

| Champ | Valeur |
|---|---|
| **name** | BrandedCallout |
| **file** | `src/components/sections/BrandedCallout.astro` |
| **type-id** | `branded-callout` |
| **role** | Boîte éditoriale sur fond `paper-2` avec kicker §, h2 display italique, 1–2 corps de texte et CTA optionnel. |

**props** `data: SectionByType<'branded-callout'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string | Kicker mono majuscules |
| `h2_fr / _en` | string | Titre display italique |
| `body1_fr / _en` | string | Premier paragraphe |
| `body2_fr / _en` | string (opt) | Second paragraphe |
| `cta` | ctaSchema (opt) | CTA optionnel |

**css_vars**

`--paper-2`, `--hairline`, `--font-mono`, `--font-display`, `--accent`, `--font-sans`, `--ink`, `--muted`

**css_classes**

`.branded-callout`, `.__box`, `.__kicker`, `.__h2`, `.__body1`, `.__body2`, `.__cta`

**animation** : `reveal`

**consumers** : catalogue-only

**variants_existing** : fond toujours `paper-2` (aucune variante background). CTA via `btn btn--{variant}` inline (pas le composant Button atom).

**status** : `proche-de CommitmentsGrid` (boîte éditoriale avec kicker + h2 + body) — se distingue par l'italique display et l'absence de grille.

**page_objective_fit** : conversion | editorial

**notes** : CTA utilise des classes `btn btn--{variant}` en dur au lieu de `<Button>` atom — incohérence avec les autres CTA (CtaBandSection, CtaFinal, CtaInline utilisent `<Button>`). À normaliser si DS autorise. Fond figé `paper-2` : si un fond `ink` ou `accent` est un jour voulu, c'est une variante à ajouter au schéma.

---

## 03 · CaseCardGrid

| Champ | Valeur |
|---|---|
| **name** | CaseCardGrid |
| **file** | `src/components/sections/CaseCardGrid.astro` |
| **type-id** | `case-card-grid` |
| **role** | Tableau éditorial de cas clients (6 colonnes, lignes cliquables) avec numéro de figure, en-têtes localisés et flèche hover. |

**props** `data: SectionByType<'case-card-grid'>`

| Prop | Type | Notes |
|---|---|---|
| `fig_num` | string | Numéro de figure |
| `fig_title_fr / _en` | string | Titre figure |
| `spec_fr / _en` | string | Spec alignée droite |
| `h2_fr / _en` | string | Titre section |
| `case_label_fr / _en` | string | En-tête col client |
| `sector_label_fr / _en` | string | En-tête col secteur |
| `impact_label_fr / _en` | string | En-tête col impact |
| `cases[]` | 2–6 items | `{ client, sector_fr/en, duration, stack, impact_fr/en, href }` |
| `all_label_fr / _en` | string (opt) | Label "Tout voir" |
| `all_href` | string (opt) | Lien "Tout voir" |

**css_vars**

`--font-mono`, `--font-display`, `--text-h2-section`, `--leading-h2`, `--hairline`, `--ink`, `--muted`, `--accent`, `--text-h2-tight`, `--ease`, `--paper-2`

**css_classes**

`.case-card-grid`, `.__hd`, `.__chapter`, `.__dot`, `.__num`, `.__sep`, `.__spec`, `.__h2`, `.__tbl`, `.__row`, `.__idx`, `.__client`, `.__col`, `.__col-k`, `.__col-v`, `.__impact`, `.__arr`, `.__foot`

**animation** : `reveal`, `reveal-stagger`

**consumers** : catalogue-only

**variants_existing** : aucune variante schema. Hover : fond `paper-2` + flèche accent + client italique accent. Responsive 2-col @1100px, 1-col @600px.

**status** : `unique` — pattern chapter-header partagé avec ArchitectureDiagram (factorisation molécule recommandée).

**page_objective_fit** : seo | conversion | hub

**notes** : composant le plus complet en CSS (27 classes BEM). Le hover fond `rgba(--accent, 0.05)` dépend d'une valeur RVB hardcodée (`201, 79, 46`) — dépendance couleur accent non-token. Si l'accent change, ce hardcode ne suit pas automatiquement. Candidat à l'extraction d'un token `--accent-rgb` ou `--accent-alpha-05`.

---

## 04 · CommitmentsGrid

| Champ | Valeur |
|---|---|
| **name** | CommitmentsGrid |
| **file** | `src/components/sections/CommitmentsGrid.astro` |
| **type-id** | `commitments-grid` |
| **role** | Grille 3 colonnes de cellules titre+corps, kicker et body optionnels, bordures hairline sur toutes les arêtes. |

**props** `data: SectionByType<'commitments-grid'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string (opt) | Kicker section |
| `h2_fr / _en` | string | Titre section |
| `body_fr / _en` | string (opt) | Corps intro |
| `commitments[]` | 2–6 items | `{ title_fr/en, body_fr/en }` |

**css_vars**

`--font-mono`, `--font-display`, `--text-h2-section`, `--leading-h2`, `--hairline`, `--font-sans`, `--ink`, `--muted`, `--accent`

**css_classes**

`.commitments-grid`, `.__kicker`, `.__h2`, `.__body`, `.__grid`, `.__cell`, `.__cell-title`, `.__cell-body`

**animation** : `reveal`, `reveal-stagger`

**consumers** : catalogue-only

**variants_existing** : aucune (toujours 3 col). Responsive : 1 col @800px.

**status** : `proche-de GuaranteeBlock` — tous deux rendent une liste titre+corps. GuaranteeBlock = liste verticale numérotée avec ◉ ; CommitmentsGrid = grille fixe 3-col. Candidats à une variante layout commune si le DS venait à évoluer.

**page_objective_fit** : information | pillar | conversion

**notes** : 3 colonnes figées, pas de variante `columns` (contrairement à FeatureGrid). Si un 4e commit devait être ajouté, la grille ne s'adapte pas. À noter pour arbitrage si le DS veut aligner CommitmentsGrid sur FeatureGrid avec `data-cols`.

---

## 05 · ComparisonTable

| Champ | Valeur |
|---|---|
| **name** | ComparisonTable |
| **file** | `src/components/sections/ComparisonTable.astro` |
| **type-id** | `comparison-table` |
| **role** | Tableau HTML natif `<table>` comparant N colonnes sur M lignes ; booléens rendus ◉ (accent) / ◦ (muted). |

**props** `data: SectionByType<'comparison-table'>`

| Prop | Type | Notes |
|---|---|---|
| `h2_fr / _en` | string | Titre section |
| `column_headers_fr / _en` | string[] | En-têtes colonnes |
| `rows[]` | items | `{ feature_fr/en, values: (string\|boolean)[] }` |

**css_vars**

`--hairline`, `--font-display`, `--text-h2-section`, `--font-mono`, `--muted`, `--font-sans`, `--text-body-sm`, `--ink`, `--accent`, `--spacing-section`, `--spacing-block`, `--text-body-md`

**css_classes**

`.comparison-table`, `.__wrap`, `.__feature`, `.__cell`, `.__bool`, `.__bool--yes`, `.__bool--no`

**animation** : aucune

**consumers** : catalogue-only

**variants_existing** : aucune (ni kicker, ni fig header). `overflow-x: auto` sur `.comparison-table__wrap` pour scroll mobile. Modificateurs : `.__bool--yes` (◉ accent) / `.__bool--no` (◦ muted).

**status** : `unique` — seule section utilisant `<table>` natif. Aucune section proche.

**page_objective_fit** : conversion | information | silo

**notes** : Pas de kicker, pas de fig-header — structure épurée. Le token `--spacing-section` et `--spacing-block` apparaissent ici mais absents des autres sections de contenu A (usage plus fréquent dans CTA + FaqAccordion). Sémantiquement correct (`<th>`, `scope`). Scroll horizontal mobile via `overflow-x: auto`.

---

## 06 · CtaBandSection

| Champ | Valeur |
|---|---|
| **name** | CtaBandSection |
| **file** | `src/components/sections/CtaBandSection.astro` |
| **type-id** | `cta-band` |
| **role** | Bandeau horizontal compact (pas une `<section>`) : texte à gauche + bouton à droite, fond piloté par `data-bg`. |

**props** `data: SectionByType<'cta-band'>`

| Prop | Type | Notes |
|---|---|---|
| `text_fr / _en` | string | Texte court |
| `cta` | ctaSchema | Bouton (href, label, variant, mag opt) |
| `background` | `'paper-2' \| 'ink' \| 'accent'` | Fond (défaut `'paper-2'`) |

**css_vars**

`--hairline`, `--font-sans`, `--text-body-md`, `--ink`, `--paper-2`, `--paper`, `--accent`

**css_classes**

`.cta-band`, `.cta-band__inner`, `.cta-band__text`

**animation** : aucune

**consumers** : `TrustLegalTemplate`, `ListIndexTemplate`, `EssayTemplate`

**variants_existing** : `background: 'paper-2' | 'ink' | 'accent'`. Texte adaptatif (blanc sur ink/accent).

**status** : `proche-de CtaInline` — même structure (texte + bouton en ligne). CtaBandSection = `<div>` + `data-bg` multi-fond + mag sur bouton ; CtaInline = `<div class="wrap-wide">` + fond figé `paper-2` + pas de mag. Famille CTA à 3 niveaux : Band (horizontal, multi-fond) < Inline (minimal, fond fixe) < Final (section complète, display).

**page_objective_fit** : conversion

**notes** : Seule section rendue en `<div>` (pas `<section>`) dans la liste des 16, avec CtaInline. Conçu pour s'insérer entre deux sections sans marquer une coupure sémantique forte. Consommé réellement par 3 templates.

---

## 07 · CtaFinal

| Champ | Valeur |
|---|---|
| **name** | CtaFinal |
| **file** | `src/components/sections/CtaFinal.astro` |
| **type-id** | `cta-final` |
| **role** | Section de clôture pleine largeur : h2 display + corps optionnel + 1 ou 2 boutons, fond piloté par `data-bg`. |

**props** `data: SectionByType<'cta-final'>`

| Prop | Type | Notes |
|---|---|---|
| `h2_fr / _en` | string | Titre display (set:html — supporte `<i>`) |
| `body_fr / _en` | string (opt) | Corps |
| `cta_primary` | ctaSchema | Bouton principal (mag 0.18) |
| `cta_secondary` | ctaSchema (opt) | Bouton secondaire |
| `background` | `'paper' \| 'paper-2' \| 'ink' \| 'accent'` | Fond (défaut `'ink'`) |

**css_vars**

`--spacing-section`, `--spacing-block`, `--font-display`, `--text-display-md`, `--ink`, `--paper`, `--paper-2`, `--hairline`, `--muted`, `--accent`

**css_classes**

`.cta-final`, `.cta-final__inner`, `.cta-final__ctas`

**animation** : `reveal-mask-up` (h2), `reveal reveal-fade` (body)

**consumers** : `CaseStudyTemplate`, `ServiceDetailTemplate`, `HubTemplate`, `DetailMenuTemplate`, `UtilityTemplate`, `src/pages/atlas.astro`, `src/pages/test-composable.astro`, `src/pages/technologies/index.astro`, `src/pages/offres/index.astro`, `src/pages/solutions/index.astro`, `src/pages/secteurs/index.astro`, `src/pages/equipe/index.astro`, `src/pages/ressources/index.astro`, `ressources/silo`, `ressources/categorie`, `ressources/tag`, `en/atlas.astro`, `en/technologies`, `en/offres`, `en/agence/design-system`, `en/solutions`, `en/ressources`

**variants_existing** : `background: 'paper' | 'paper-2' | 'ink' | 'accent'`. Texte `paper` sur fond sombre. 4 variantes fond = le plus complet des CTA.

**status** : `unique` — section de clôture canonique, la plus consommée des 16 (22+ fichiers). Aucune fusion envisageable.

**page_objective_fit** : conversion

**notes** : Section de loin la plus consommée du catalogue. Le font-size `--text-display-md` (plus grand que `--text-h2-section`) la distingue des autres sections. Animation `reveal-mask-up` = seule section content-A à l'utiliser. Fond `ink` par défaut = cohérent avec sa fonction de clôture contrastée.

---

## 08 · CtaInline

| Champ | Valeur |
|---|---|
| **name** | CtaInline |
| **file** | `src/components/sections/CtaInline.astro` |
| **type-id** | `cta-inline` |
| **role** | Micro-bandeau inline (pas de `<section>`) texte + bouton, fond `paper-2` fixe, sans variante de fond. |

**props** `data: SectionByType<'cta-inline'>`

| Prop | Type | Notes |
|---|---|---|
| `text_fr / _en` | string | Texte court |
| `cta` | ctaSchema | Bouton (href, label, variant) |

**css_vars**

`--hairline`, `--paper-2`, `--font-sans`, `--text-body-sm`, `--ink`

**css_classes**

`.cta-inline`, `.cta-inline__text`

**animation** : aucune

**consumers** : catalogue-only (aucun type-id `'cta-inline'` dans templates/pages — section la moins consommée des 3 CTA)

**variants_existing** : aucune (fond `paper-2` figé, taille `md`).

**status** : `proche-de CtaBandSection` — même structure texte+bouton mais plus minimal. CtaInline = fond fixe, aucun `data-bg`, taille bouton `md`, pas de mag. Voir famille CTA §06.

**page_objective_fit** : conversion

**notes** : Le texte utilise `--text-body-sm` (plus petit que CtaBandSection's `--text-body-md`) : plus discret. Wrapper `<div class="wrap-wide">` externe (pas de `<section>`) → insertion légère entre deux sections. Zéro animation. Candidat à la fusion avec CtaBandSection via variante `minimal` si le DS l'autorise.

---

## 09 · EditorialPreview

| Champ | Valeur |
|---|---|
| **name** | EditorialPreview |
| **file** | `src/components/sections/EditorialPreview.astro` |
| **type-id** | `editorial-preview` |
| **role** | Index de publications en lignes numérotées (num · date · tag · titre · flèche) avec lien "tout voir" optionnel. |

**props** `data: SectionByType<'editorial-preview'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string (opt) | Kicker section |
| `h2_fr / _en` | string | Titre section |
| `items[]` | 2–8 items | `{ num, date_fr/en, tag_fr/en, label_fr/en, href }` |
| `all_label_fr / _en` | string (opt) | Label "Tout voir" |
| `all_href` | string (opt) | URL "Tout voir" |

**css_vars**

`--hairline`, `--hairline-strong`, `--font-mono`, `--font-display`, `--text-h2-section`, `--leading-h2`, `--accent`, `--muted`, `--ink`, `--ink-2`, `--ease`, `--text-h3-row`, `--leading-h3`

**css_classes**

`.editorial-preview`, `.__kicker`, `.__h2`, `.__list`, `.__row`, `.__num`, `.__date`, `.__tag`, `.__label`, `.__arr`, `.__footer`, `.__all`

**animation** : `reveal` (h2), `reveal-stagger` (liste)

**consumers** : `src/pages/index.astro`, `src/pages/en/index.astro` (via FaqAccordion — consommé directement comme composant import, pas via type-id `'editorial-preview'`)

**variants_existing** : aucune variante schema. Responsive : @720px = masquer date+tag, grid 3-col.

**status** : `proche-de CaseCardGrid` — même pattern liste tabulaire avec lignes cliquables et flèche hover. CaseCardGrid = cas clients (6 cols, chapter header) ; EditorialPreview = articles (5 cols, kicker simple). Famille « listes éditoriales ». Hover identique (fond rgba accent, flèche translateX).

**page_objective_fit** : editorial | hub | seo

**notes** : Utilise `--hairline-strong`, `--text-h3-row`, `--leading-h3` — tokens absents des autres sections de contenu A. Hover hardcode `rgba(201, 79, 46, 0.05)` (même bug accent-RGB que CaseCardGrid). Le lien "tout voir" est aligné à droite (flex end) — distinction avec CaseCardGrid où c'est un `.__foot` centré.

---

## 10 · FaqAccordion

| Champ | Valeur |
|---|---|
| **name** | FaqAccordion |
| **file** | `src/components/sections/FaqAccordion.astro` |
| **type-id** | `faq-accordion` |
| **role** | Accordéon FAQ canonique GEO/AIO : `<details>`/`<summary>` natifs, double mode (CMS via `data` ou direct via `items`), JSON-LD FAQPage auto-généré. |

**props** `data: SectionByType<'faq-accordion'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string (opt) | Kicker section |
| `h2_fr / _en` | string | Titre section |
| `items[]` | min 2 | `{ q_fr/en, a_fr/en }` |

Mode direct (sans CMS) : `{ items: {q, a}[], heading?, intro? }` — pas de bilinguisme, usage inline.

**css_vars**

`--spacing-section`, `--spacing-block`, `--hairline`, `--font-display`, `--text-h2-section`, `--font-sans`, `--text-body-md`, `--ink`, `--muted`

**css_classes**

`.faq-accordion`, `.__header`, `.__intro`, `.__list`, `.__item`, `.__q`, `.__q-label`, `.__arrow`, `.__a`

**animation** : aucune (rotation flèche ↓ via CSS `details[open]`)

**consumers** : `src/pages/index.astro`, `src/pages/en/index.astro` (import direct comme composant, pas via section-registry)

**variants_existing** : double mode (CMS / direct). Numérotation auto `Q.01…`. Utilise `<Kicker>` atom (tone="muted" header, tone="accent" numéro).

**status** : `unique` — seul composant avec double interface Props (union discriminée `CmsProps | DirectProps`). Seul avec JSON-LD FAQPage (`<JsonLd>`). Pilier GEO/AIO.

**page_objective_fit** : seo | information | pillar

**notes** : Section stratégique GEO/AIO (cf commentaire en-tête : `Pivot du dispositif GEO/AIO. Cf docs/02-geo-aio-strategy.md`). JSON-LD FAQPage injecté via `<JsonLd data={faqPage(normalizedItems)} />` — seule section du groupe à générer du structured data. Le mode direct permet un usage en page Astro sans CMS. Utilise `name="faq"` sur `<details>` pour fermeture automatique des autres items.

---

## 11 · FeatureGrid

| Champ | Valeur |
|---|---|
| **name** | FeatureGrid |
| **file** | `src/components/sections/FeatureGrid.astro` |
| **type-id** | `feature-grid` |
| **role** | Grille de features (2/3/4 colonnes) avec kicker optionnel, h2, et items icon+titre+corps. |

**props** `data: SectionByType<'feature-grid'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string (opt) | Kicker section |
| `h2_fr / _en` | string | Titre section (set:html, supporte `<i>`) |
| `features[]` | 3–8 items | `{ icon?: string, title_fr/en, body_fr/en }` |
| `columns` | `'2' \| '3' \| '4'` | Nb colonnes (défaut `'3'`) |

**css_vars**

`--spacing-section`, `--hairline`, `--font-display`, `--text-h2-section`, `--font-sans`, `--text-body-sm`, `--ink`, `--muted`

**css_classes**

`.feature-grid`, `.__header`, `.__list`, `.__item`, `.__icon`, `.__title`

**animation** : aucune

**consumers** : `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/test-composable.astro`, `src/pages/en/agence/design-system.astro`

**variants_existing** : `columns: '2' | '3' | '4'` via `data-cols`. Responsive : 3/4-col → 2-col @768px ; 2-col → 1-col @768px. Icon = Kicker atom tone="accent" (▸ + texte).

**status** : `proche-de CommitmentsGrid` — même pattern kicker+h2+grille d'items titre+corps. FeatureGrid = colonnes flexibles (2/3/4), items avec icon optionnel, fond blanc ; CommitmentsGrid = 3-col fixe, hairline sur toutes arêtes, pas d'icon. Fusion possible via variante layout + icon.

**page_objective_fit** : information | conversion | pillar

**notes** : Seule section parmi les 16 à avoir `data-cols` comme attribut HTML piloté par le schéma — pattern propre et extensible. Le `<Kicker>` atom est utilisé pour les icônes (tone="accent", size=10) — usage détourné mais cohérent DS. Consommée dans `index.astro` (page d'accueil) — fort impact visuel.

---

## 12 · GuaranteeBlock

| Champ | Valeur |
|---|---|
| **name** | GuaranteeBlock |
| **file** | `src/components/sections/GuaranteeBlock.astro` |
| **type-id** | `guarantee-block` |
| **role** | Liste verticale numérotée (◉ 01, 02…) de garanties titre+corps, sans header de section. |

**props** `data: SectionByType<'guarantee-block'>`

| Prop | Type | Notes |
|---|---|---|
| `guarantees[]` | 1–4 items | `{ title_fr/en, body_fr/en }` |

**css_vars**

`--spacing-section`, `--hairline`, `--font-display`, `--font-sans`, `--text-body-md`, `--ink`, `--muted`

**css_classes**

`.guarantee-block`, `.__list`, `.__item`, `.__num`, `.__content`, `.__title`

**animation** : aucune

**consumers** : catalogue-only

**variants_existing** : aucune (toujours liste verticale). Numéro ◉ 01/02/03 en Kicker atom tone="accent". Grid 2-col (56px + 1fr). Responsive : 1-col @600px.

**status** : `proche-de CommitmentsGrid` — même concept liste d'items titre+corps. GuaranteeBlock = liste simple verticale numérotée, pas de kicker/h2 de section ; CommitmentsGrid = grille 3-col avec header complet. Candidat fusion ou extraction molécule `ItemList` partagée.

**page_objective_fit** : conversion | information

**notes** : Seule section content-A sans header (ni kicker ni h2) — conçue pour être précédée d'une autre section qui contextualise. Très épurée (7 classes BEM seulement). Le `Kicker` atom tone="accent" avec ◉ est le même motif que FaqAccordion (Q.01) — pattern numérotation cohérent.

---

## 13 · HowWeShip

| Champ | Valeur |
|---|---|
| **name** | HowWeShip |
| **file** | `src/components/sections/HowWeShip.astro` |
| **type-id** | `how-we-ship` |
| **role** | Processus en N étapes avec sticky scroll pin : numline italic à gauche, card d'étape active à droite, script vanilla scroll-drive. |

**props** `data: SectionByType<'how-we-ship'>`

| Prop | Type | Notes |
|---|---|---|
| `roman` | string | Numéro romain de section |
| `section_label_fr / _en` | string | Label section |
| `heading_fr / _en` | string | Titre (via slot, set:html) |
| `aside_fr / _en` | string | Texte aside droit |
| `steps[]` | 3–6 items | `{ n, label_fr/en, body_fr/en }` |

**css_vars**

`--hairline-strong`, `--hairline`, `--font-display`, `--muted`, `--accent`, `--font-sans` (via body), `--ink` (via h3/title)

**css_classes**

`.how-we-ship`, `.__wrap`, `.__sticky`, `.__numline`, `.__pip`, `.__pip.is-active`, `.__stage`, `.__card`, `.__card.is-active`, `.__roman`, `.__title`, `.__body`, `.__tracks`, `.__track-segment`

**animation** : scroll-drive vanilla JS (`IntersectionObserver`-free, calcul direct `getBoundingClientRect`). Transition CSS `opacity + translateY 720ms`. `prefers-reduced-motion`: cartes statiques empilées.

**consumers** : catalogue-only. (Copie fidèle de `src/components/ui/organisms/HowWeShip.astro` — doublon à surveiller.)

**variants_existing** : aucune. La hauteur `380vh` est figée (4 étapes implicites). N étapes variables (3–6) mais la proportion `380vh / N` n'est pas dynamique.

**status** : `unique` — seul composant avec interaction JS scroll-drive. Copie de l'organisme `organisms/HowWeShip.astro`.

**page_objective_fit** : information | pillar | conversion

**notes** : Le commentaire en-tête dit explicitement « COPIE FIDÈLE de `src/components/ui/organisms/HowWeShip.astro` » — dette de duplication. La section catalogue est autonome mais divergera de l'organisme si l'un est mis à jour. `SectionHeader` atom utilisé (molécule réutilisée). Hauteur `380vh` hardcodée : si le nombre d'étapes change, l'effet de scroll sera désynchronisé. `--hairline-strong` apparaît ici (et dans EditorialPreview + MaturityPyramid) mais pas dans les autres sections content-A.

---

## 14 · ManifestoBlock

| Champ | Valeur |
|---|---|
| **name** | ManifestoBlock |
| **file** | `src/components/sections/ManifestoBlock.astro` |
| **type-id** | `manifesto-block` |
| **role** | Grand bloc display italique sans box : kicker mono + texte display pleine largeur avec accent spans inline. |

**props** `data: SectionByType<'manifesto-block'>`

| Prop | Type | Notes |
|---|---|---|
| `kicker_fr / _en` | string | Kicker mono majuscules |
| `text_fr / _en` | string | Texte display (set:html — supporte `<span class="acc">`) |

**css_vars**

`--paper`, `--font-display`, `--accent`

**css_classes**

`.manifesto-block`, `.manifesto-block__kicker` (via `:global()`), `.manifesto-block__text`, `:global(.acc)`, `:global(span)` (accent)

**animation** : `reveal` (sur `.manifesto-block__text`)

**consumers** : catalogue-only

**variants_existing** : fond toujours `paper`. Texte display de 36px à 96px (clamp). Spans colorés via `.acc` ou `<span>` générique → accent.

**status** : `unique` — section la plus minimale (2 props + 3 classes). Aucune section proche.

**page_objective_fit** : editorial | pillar

**notes** : Copie fidèle de `src/components/ui/organisms/Manifesto.astro` (commentaire en-tête). Padding vertical extrême : `clamp(140px, 18vw, 260px)` — respiration maximale. Le commentaire signale « COPIE FIDÈLE » : même dette de doublon que HowWeShip. La coloration via `:global(span)` est très permissive (tout `<span>` dans le texte deviendra accent) — à documenter dans les données CMS.

---

## 15 · MarqueeBand

| Champ | Valeur |
|---|---|
| **name** | MarqueeBand |
| **file** | `src/components/sections/MarqueeBand.astro` |
| **type-id** | `marquee-band` |
| **role** | Bandeau défilant infini (CSS animation) mono uppercase, items + séparateurs, `aria-hidden` (décoratif). |

**props** `data: SectionByType<'marquee-band'>`

| Prop | Type | Notes |
|---|---|---|
| `items_fr` | string[] 2–12 | Items langue FR |
| `items_en` | string[] 2–12 (opt) | Items langue EN |
| `separator` | string | Séparateur (défaut `'·'`) |
| `repeat` | 1–4 | Nb de répétitions du loop (défaut 2) |

**css_vars**

`--font-mono` (avec fallback explicite `'JetBrains Mono', monospace`), `--ink`, `--accent`

**css_classes**

`.marquee-band`, `.marquee-band__track`, `.marquee-band__item`, `.marquee-band__sep`

**animation** : `@keyframes marquee-band-scroll` (translateX 0 → -50%, 36s linear infinite). `prefers-reduced-motion`: `animation: none`.

**consumers** : catalogue-only. (Copie de `pages/offres/site-web-ia-landing.astro:53-77` selon commentaire.)

**variants_existing** : `separator` libre, `repeat` 1–4. Items bilingues optionnels (fallback FR si EN absent).

**status** : `unique` — seul bandeau défilant du catalogue. `aria-hidden` = composant décoratif pur.

**page_objective_fit** : editorial | conversion (signal de marque)

**notes** : Rendu en `<div>` sans `wrap-wide` (pleine largeur). Borders `rgba(0,0,0,.07)` hardcodées (non-tokenisées) — incohérence avec les autres sections qui utilisent `var(--hairline)`. Fallback `--font-mono` explicite dans le CSS (`'JetBrains Mono', monospace`) — seule section à redéclarer un fallback de police (probablement héritage de la copie landing page). Composant décoratif : 0 valeur SEO directe, valeur signal-de-marque.

---

## 16 · MaturityPyramid

| Champ | Valeur |
|---|---|
| **name** | MaturityPyramid |
| **file** | `src/components/sections/MaturityPyramid.astro` |
| **type-id** | `maturity-pyramid` |
| **role** | Section composite : header roman + timeline 4 étapes + SVG pyramide 4 paliers + grille 4 cards cliquables avec action/tag/titre/body/items/CTA. |

**props** `data: SectionByType<'maturity-pyramid'>`

| Prop | Type | Notes |
|---|---|---|
| `roman` | string | Numéro romain de section |
| `label_fr / _en` | string | Label kicker |
| `heading_fr / _en` | string | Titre h2 (set:html, `<i>` → accent) |
| `aside_fr / _en` | string (opt) | Corps aside |
| `timeline_label_fr / _en` | string | Aria-label de la timeline |
| `tier_cta_fr / _en` | string | Libellé CTA global des cards |
| `steps[]` | length 4 (fixe) | `{ roman, verb_fr/en, stage_fr/en }` |
| `tiers[]` | length 4 (fixe) | `{ n, tag_fr/en, label_fr/en, lead_fr/en, items_fr/en[], action_fr/en, href }` |

**css_vars**

`--paper`, `--hairline`, `--hairline-strong`, `--font-mono`, `--font-display`, `--text-h2-section`, `--leading-h2`, `--font-sans`, `--ink`, `--ink-2`, `--muted`, `--accent`, `--ease`, `--text-h3-row`, `--leading-h3`, `--space-2`

**css_classes**

`.maturity-pyramid`, `.__hd`, `.__kicker`, `.__roman`, `.__h2`, `.__aside`, `.__timeline`, `.__step`, `.__step-roman`, `.__step-verb`, `.__step-stage`, `.__svg`, `.__cards`, `.__card`, `.__card-action`, `.__card-num`, `.__card-tag`, `.__card-title`, `.__card-body`, `.__card-list`, `.__card-go`

**animation** : `reveal reveal-fade` (timeline), `reveal-blur-clip` (SVG), `reveal-stagger` (cards). 3 classes d'animation distinctes — le plus animé des 16.

**consumers** : catalogue-only

**variants_existing** : aucune variant schema. SVG avec fill-opacity dégradé (0.22 / 0.10 / 0.05 / 0) hardcodé. 1re card mise en avant (border accent + fond léger). Hover : border accent + fond rgba accent.

**status** : `unique` — section la plus complexe du catalogue (21 classes BEM, 3 animations, SVG généré, 4+4 items fixes). Aucune section proche.

**page_objective_fit** : pillar | hub | information

**notes** : Schéma le plus dense des 16 (2 arrays de longueur fixe 4 = contrainte forte). Le SVG pyramide utilise des positions hardcodées (`widths`, `offsets`, `numAt`) alignées sur 4 paliers fixes — non extensible à N paliers. Hover hardcode `rgba(201, 79, 46, …)` (même pattern accent-RGB non-tokenisé que CaseCardGrid et EditorialPreview). `--space-2` est le seul usage de ce token dans le groupe (héritage). `--text-h3-row` / `--leading-h3` partagés avec EditorialPreview. Le token `--ease` est partagé avec CaseCardGrid et EditorialPreview.

---

## Synthèse

### Sections proches — candidats fusion / variante-reduction

| Groupe | Sections | Raison | Action recommandée |
|---|---|---|---|
| **CTA family** | CtaBandSection, CtaInline, CtaFinal | Même structure texte+bouton, niveaux de scope différents (band/inline/final) | Conserver les 3 (niveaux distincts) ; aligner le CTA de BrandedCallout sur `<Button>` atom |
| **Listes titre+corps** | CommitmentsGrid, GuaranteeBlock, FeatureGrid | Rendent une liste title+body avec header optionnel | Extraire molécule `ItemList` ; CommitmentsGrid = grille 3-col, GuaranteeBlock = liste numtée, FeatureGrid = grille N-col avec icon |
| **Listes éditoriales tabulaires** | CaseCardGrid, EditorialPreview | Lignes cliquables + flèche hover + footer "tout voir" | Factoriser le chapitre header en molécule `ChapterHeader` (partagé aussi avec ArchitectureDiagram) |
| **Chapter header** | ArchitectureDiagram, CaseCardGrid | Pattern dot + roman + · + titre + spec identique | Molécule `ChapterHeader` (priorité factorisation) |
| **Doubles organismes** | HowWeShip, ManifestoBlock | Copies fidèles de `organisms/` — risque divergence | Décision : supprimer les organismes (section = source unique) OU extraire la logique en molécule partagée |

### Variantes redondantes / incohérences DA

| Type | Sections concernées | Détail |
|---|---|---|
| `accent-rgb` hardcodé | CaseCardGrid, EditorialPreview, MaturityPyramid | `rgba(201, 79, 46, …)` dans CSS — non-token ; créer `--accent-alpha-05` |
| CTA non-`<Button>` | BrandedCallout | Utilise `btn btn--{variant}` inline au lieu du composant `<Button>` atom |
| Border non-tokenisée | MarqueeBand | `rgba(0,0,0,.07)` au lieu de `var(--hairline)` |
| Font fallback redéclaré | MarqueeBand | `--font-mono, 'JetBrains Mono', monospace` — autres sections n'ont pas ce fallback |
| Header absent | GuaranteeBlock | Seule section sans kicker/h2 — conçue pour usage combiné |
| Hauteur scroll hardcodée | HowWeShip | `380vh` figé pour 4 étapes ; si N≠4, désynchronisation |
| `:global(span)` accent | ManifestoBlock | Trop permissif, tout `<span>` devient accent |

### Mapping objectif-de-page

| Objectif | Sections |
|---|---|
| **conversion** | CtaBandSection ★, CtaFinal ★★★, CtaInline, BrandedCallout, FeatureGrid, CommitmentsGrid, GuaranteeBlock, MarqueeBand |
| **information** | ArchitectureDiagram, CommitmentsGrid, ComparisonTable, FaqAccordion, FeatureGrid, GuaranteeBlock, HowWeShip, MaturityPyramid |
| **seo** | FaqAccordion ★ (JSON-LD), CaseCardGrid, EditorialPreview, ComparisonTable |
| **editorial** | BrandedCallout, EditorialPreview, ManifestoBlock, MarqueeBand |
| **pillar** | ArchitectureDiagram, FaqAccordion, FeatureGrid, HowWeShip, ManifestoBlock, MaturityPyramid |
| **hub** | CaseCardGrid, EditorialPreview, MaturityPyramid |
| **silo** | ComparisonTable |

### Sections les plus consommées (hors catalogue)

1. `cta-final` — 22+ templates et pages (section de clôture universelle)
2. `feature-grid` — 4 fichiers dont `index.astro`
3. `cta-band` — 3 templates (TrustLegal, ListIndex, Essay)
4. `faq-accordion` — 2 pages (index.astro, direct import)

### Sections catalogue-only (0 consumer hors demo/registry)

`architecture-diagram`, `branded-callout`, `case-card-grid`, `commitments-grid`, `comparison-table`, `cta-inline`, `editorial-preview`, `guarantee-block`, `how-we-ship`, `manifesto-block`, `marquee-band`, `maturity-pyramid`

> Ces 12 sections sont prêtes à l'emploi mais n'ont pas encore été intégrées dans des templates ou pages réelles. Priorité d'intégration selon objectif-de-page : `case-card-grid` (hub), `faq-accordion` (seo/pillar), `editorial-preview` (hub/editorial), `maturity-pyramid` (pillar).
