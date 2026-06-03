# 04 — Organisms (21)

> Inventaire exhaustif des 21 composants `src/components/ui/organisms/*.astro`.
> Méthode : lecture intégrale de chaque fichier + grep consumers.
> Champ **status** : `DUPLIQUE-TYPE <section-type>` / `UNIQUE bespoke chrome` / `À CATALOGUER`.

---

## 01 · AtlasGrid

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/AtlasGrid.astro` |
| **role** | Grille 2×2 des 4 piliers Waimia (page Atlas — Direction 3 test) |

**props/data**
- Données : `pillars` hardcodé inline (I Audit · II Adoption · III Automatisation · IV Souveraineté)
- Imports : `SectionHeader` molecule · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--paper-2` · `--ease` · `--ease-out` · `--accent` · `--font-display` · `--font-mono` · `--muted` · `--ink-2`

**css_classes**
`.atlas-grid` · `.atlas-card` · `.atlas-num` · `.atlas-label` · `.atlas-lead` · `.atlas-list` · `.atlas-go`

**motion**
Inline `<script>` : `data-tilt` mousemove parallax (translateX/Y ±8 px)

**consumers**
- `src/pages/atlas.astro`
- `src/pages/en/atlas.astro`
- `src/pages/agence/design-system.astro` (preview)

**status** — `UNIQUE bespoke chrome`

**notes**
Grille 2×2 de piliers spécifique à la page Atlas. Aucun type de section équivalent dans la bibliothèque. À conserver en bespoke. Si le motif « grille de piliers avec tilt parallax » est réutilisé ailleurs, cataloguer en nouveau type `PillarGrid`.

---

## 02 · BookSession

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/BookSession.astro` |
| **role** | CTA final « Acte V — Passer à l'action » — diagnostic 45 min |

**props/data**
- Aucune prop (uses `langFromPath`)
- Imports : `ChapterLabel` atom · `Button` atom · `langFromPath` (i18n)

**css_vars**
`--paper` · `--hairline` · `--ease` · `--font-display` · `--text-h2-grand` · `--leading-h1` · `--accent` · `--muted` · `--font-mono` · `--font-sans`

**css_classes**
`.book-session` · `.book-session.in` · `.book-inner` · `.book-chapter` · `.book-h2` · `.book-lede` · `.book-avail` · `.book-ctas` · `.book-sub`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/ui/organisms/Hero.astro` (référence interne, non-import)

**status** — `DUPLIQUE-TYPE CtaFinal`

**notes**
CTA de réservation de session = cas d'usage couvert par `sections/CtaFinal.astro`. Migrer les pages `/` (FR + EN) pour utiliser `CtaFinal` via le registry. Données `ChapterLabel` + `Button` à passer en props schema Tina. Bénéfice : données éditables CMS sans redéploiement.

---

## 03 · Cases

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Cases.astro` |
| **role** | « Acte IV — Les preuves » — grille 6-colonnes de 4 dossiers clients |

**props/data**
- Données : `CASE_FEED` (import `src/data/sitemap`) · `.slice(0, 4)`
- Imports : `ChapterLabel` atom · `CASE_FEED` · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline` · `--paper-2` · `--ease` · `--accent` · `--font-display` · `--text-h2-section` · `--leading-h2` · `--text-h2-tight` · `--font-mono` · `--muted` · `--ink` · `--ink-2`

**css_classes**
`.cases-hd` · `.cases-spec` · `.cases-h2` · `.cases-tbl` · `.cases-row` · `.cases-idx` · `.cases-client` · `.cases-col` · `.cases-col-k` · `.cases-col-v` · `.cases-impact` · `.cases-arr` · `.cases-foot`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- (`Cases` string apparaît dans de nombreux fichiers — les occurrences isolées ci-dessus sont les imports directs de l'organism)

**status** — `DUPLIQUE-TYPE CaseCardGrid`

**notes**
Tableau éditorial de cas clients = cas d'usage couvert par `sections/CaseCardGrid.astro`. Migrer les pages d'accueil FR + EN. Le layout 6-colonnes est propre à cet organism ; le composant section offre un layout cards standard plus réutilisable. Données issues de `CASE_FEED` → à brancher sur schema Tina pour édition CMS.

---

## 04 · CookiesBanner

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/CookiesBanner.astro` |
| **role** | Bandeau cookie RGPD fixe en bas d'écran |

**props/data**
- Prop : `lang?: 'fr' | 'en'`
- Imports : `langFromPath` (i18n)

**css_vars**
`--paper` · `--hairline` · `--ink-2` · `--ink` · `--font-sans`

**css_classes**
`.cb` · `.cb-inner` · `.cb-text` · `.cb-actions` · `.cb-btn` · `.cb-btn--primary` · `.cb-btn--secondary`

**motion**
Inline `<script>` : `localStorage` key `waimia_cookies_consent`, pilote `data-cookie-visible` sur `<html>`

**consumers**
- `src/pages/agence/design-system.astro` (preview)
- `src/pages/preview/[type].astro`

**status** — `UNIQUE bespoke chrome`

**notes**
Composant UI global (chrome, pas contenu éditorial). Doit rester en bespoke — pas de type section équivalent. Inséré dans le layout `Base.astro` ou pages globalement. Pas de migration prévue.

---

## 05 · Departments

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Departments.astro` |
| **role** | Index horizontal de 5 cas d'usage cliquables (rows) |

**props/data**
- Données : `DEPARTMENTS_GRID` (import `src/data/sitemap`)
- Imports : `SectionHeader` molecule · `DEPARTMENTS_GRID` · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--ease` · `--accent` · `--font-mono` · `--text-h3-row` · `--leading-h3` · `--ink` · `--ink-2` · `--muted` · `--paper` · `--font-display`

**css_classes**
`.dept-index` · `.dept-row` · `.dept-row-num` · `.dept-row-num-prefix` · `.dept-row-label` · `.dept-row-tag` · `.dept-row-arr` · `.dept-sector`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/footer/Footer.astro` (référence string, pas import direct)
- `src/components/sections/UseCaseIndex.astro` (section twin — import de `DEPARTMENTS_GRID`)

**status** — `DUPLIQUE-TYPE UseCaseIndex`

**notes**
Index de départements = structurellement identique au type `sections/UseCaseIndex.astro` (même données `DEPARTMENTS_GRID`, même motif rows numérotées). Migrer les pages d'accueil FR + EN. La section `UseCaseIndex` est déjà branchée sur le même dataset.

---

## 06 · FieldNotes

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/FieldNotes.astro` |
| **role** | « Acte VI — Notes de terrain » — feed de 5 notes sous forme rows |

**props/data**
- Données : `FIELD_NOTES` (import `src/data/sitemap`)
- Imports : `SectionHeader` molecule · `FIELD_NOTES` · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--ease` · `--accent` · `--muted` · `--ink-2` · `--ink` · `--font-mono` · `--text-h3-row` · `--leading-h3` · `--font-display`

**css_classes**
`.notes-index` · `.notes-row` · `.notes-row-num` · `.notes-row-date` · `.notes-row-tag` · `.notes-row-text` · `.notes-row-arr` · `.notes-foot` · `.notes-foot-link`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/atlas.astro`
- `src/pages/en/atlas.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/EditorialPreview.astro` (section twin — import de `FIELD_NOTES`)

**status** — `DUPLIQUE-TYPE EditorialPreview`

**notes**
Feed de notes terrain = cas d'usage couvert par `sections/EditorialPreview.astro`. Migrer les pages d'accueil FR + EN et les pages Atlas. Voir aussi `WritingNotes` (variante sticky 2-col du même dataset).

---

## 07 · FooterMarquee

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/FooterMarquee.astro` |
| **role** | Bande décorative marquee scrollante (aria-hidden, texte FR+EN codé en dur) |

**props/data**
- Aucune prop, aucun import de data — tout hardcodé inline
- Aucun import de composant

**css_vars**
`--hairline-strong` · `--font-mono` · `--muted` · `--accent` · `--space-5` · `--space-6`

**css_classes**
`.marquee-footer` · `.marquee-footer-track` · `.mf-item` · `.mf-sep`

**motion**
Animation CSS `mf-scroll` : `translateX(0 → -50%)` · 40 s linear infinite

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)

**status** — `DUPLIQUE-TYPE MarqueeBand`

**notes**
Bande marquee = cas d'usage couvert par `sections/MarqueeBand.astro`. Migrer les pages d'accueil. Le contenu hardcodé peut être passé en prop `items[]` du type catalogué.

---

## 08 · Hero

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Hero.astro` |
| **role** | Hero home-only (annoté `@home-only`) — H1 + signature SVG + minimap 3×2 + 3 métriques |

**props/data**
- Aucune prop (uses `langFromPath`)
- Imports : `MastheadRow` molecule · `Kicker` atom · `Button` atom · `langFromPath` (i18n)

**css_vars**
`--hairline` · `--ease` · `--font-display` · `--font-sans` · `--text-h1-hero` · `--leading-h1` · `--tracking-display` · `--space-5` · `--space-7` · `--space-4` · `--space-3` · `--space-6` · `--space-9` · `--accent` · `--ink` · `--ink-2` · `--muted` · `--gut` · `--section-loose` · `--text-lede` · `--leading-body` · `--font-mono`

**css_classes**
`.hero-a` · `.home-hero` · `.signature-grid` · `.hero-sig-mark` · `.hero-headline` · `.hero-masthead` · `.hero-sub` · `.hero-fig` · `.hero-lede` · `.hero-minimap` · `.hero-mm-item` · `.hero-mm-label` · `.hero-mm-items` · `.hero-ctas` · `.hero-cta-sub` · `.hero-proofs` · `.hero-proof` · `.hero-proof-num` · `.hero-proof-label` · `.metrics-reveal`

**motion**
`transition:name` View Transitions · `metrics-reveal` (counters animés) · `.hero-a reveal`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`

**status** — `DUPLIQUE-TYPE HeroHome`

**notes**
Hero de la home = cas d'usage du type `sections/HeroHome.astro`. Le bespoke a des éléments spécifiques (SVG signature mark, minimap 3×2, 3 métriques). Évaluer si `HeroHome` peut absorber ces variantes via props optionnelles, ou si une migration partielle suffit. Priorité basse (déjà `@home-only`, peu de duplications).

---

## 09 · HowWeShip

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/HowWeShip.astro` |
| **role** | « Acte IV — Comment on livre » — 4 étapes de livraison avec sticky scroll scrub |

**props/data**
- Données : `steps` hardcodé inline (i Diagnostic · ii Sprint MVP 4 sem · iii Mise en prod · iv Maintenance)
- Imports : `SectionHeader` molecule · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--ease` · `--font-display` · `--accent` · `--muted` · `--ink`

**css_classes**
`.how-wrap` · `.how-sticky` · `.how-numline` · `.how-num-pip` · `.how-stage` · `.how-stage-card` · `.how-roman` · `.how-title` · `.how-body` · `.how-tracks` · `.is-active`

**motion**
Inline `<script>` : sticky scroll scrub · toggle `.is-active` sur chaque étape

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/HowWeShip.astro` (section twin — même commentaire source)

**status** — `DUPLIQUE-TYPE HowWeShip`

**notes**
Copie directe du type `sections/HowWeShip.astro` (commentaire source confirmé). Migrer les pages d'accueil. Les données hardcodées `steps` doivent être portées vers le schema Tina du type catalogué pour édition CMS.

---

## 10 · Manifesto

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Manifesto.astro` |
| **role** | Bloc manifeste éditorial anti-IA-théâtre (§ Manifeste · Viewport 01, fond paper) |

**props/data**
- Aucune prop (texte FR/EN hardcodé)
- Imports : `Kicker` atom · `langFromPath` · `t` (i18n)

**css_vars**
`--paper` · `--font-display` · `--accent`

**css_classes**
`.manifesto` · `.manifesto-kicker` (`:global`) · `.manifesto-text` · `.acc`

**consumers**
- Aucun consumer direct actif (aucun `import Manifesto` trouvé dans `src/pages` ou `src/components`)
- Présent dans `src/pages/agence/design-system.astro` (design-system preview uniquement)

**status** — `DUPLIQUE-TYPE ManifestoBlock`

**notes**
Organism inutilisé dans les pages live — uniquement visible dans le design-system preview. La version active du contenu manifeste est le type `sections/ManifestoBlock.astro`. Supprimer cet organism ou archiver. Pas de migration requise (aucune page live à migrer).

---

## 11 · ManifestoAccent

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/ManifestoAccent.astro` |
| **role** | Manifeste full-bleed terracotta (§ Manifeste · Viewport 02, fond `--accent`) |

**props/data**
- Aucune prop (texte FR/EN hardcodé)
- Source annotée : `// Source: virtuoseweb/waimia DirectionB.tsx · lines 199-210`
- Imports : `Kicker` atom · `langFromPath` · `t` (i18n)

**css_vars**
`--accent` (background full-bleed) · `--paper` (couleur texte) · `--font-display`

**css_classes**
`.manifesto-accent` · `.manifesto-accent-grid` · `.manifesto-accent-kicker` (`:global`) · `.manifesto-accent-text`

**consumers**
- `src/pages/manifesto.astro`
- `src/pages/en/manifesto.astro`

**status** — `À CATALOGUER`

**notes**
Variante full-bleed accent (fond terracotta `--accent`, texte `--paper`) non couverte par `ManifestoBlock` (qui est fond paper). Activement utilisé dans les pages `/manifesto` FR + EN. Cataloguer comme variante `ManifestoAccent` dans la bibliothèque (4 touchpoints : schema · demo · registry · composant). Priorité haute : 2 pages live dépendent de cet organism.

---

## 12 · Offices

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Offices.astro` |
| **role** | Affichage 2 bureaux (Paris + Genève) en split 50/50 |

**props/data**
- Données : `offices` hardcodé inline (Paris · Genève)
- Imports : `SectionHeader` molecule · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--ease` · `--font-display` · `--paper-2` · `--muted` · `--accent` · `--ink`

**css_classes**
`.offices` · `.office` · `.city` · `.addr` · `.mono`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/pages/en/agence/about.astro`

**status** — `UNIQUE bespoke chrome`

**notes**
Affichage bureaux géographiques sans équivalent dans la bibliothèque de sections. Conserver en bespoke. Si Waimia ouvre de nouveaux bureaux ou si ce motif est réutilisé dans d'autres contextes (footer, page contact), envisager un type `OfficesGrid`.

---

## 13 · OperatingLayer

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/OperatingLayer.astro` |
| **role** | « Acte III — La plateforme » — section sombre avec terminal VirtuoseOS + 4 attributs |

**props/data**
- Données : `consoleLines` hardcodé (5 lignes kernel log) · `attrs` hardcodé (Kernel · Agents · Data · Locale)
- Imports : `ChapterLabel` atom · `Button` atom · `TerminalMockup` molecule · `langFromPath` · `t` (i18n)

**css_vars**
`--ink` · `--paper` · `--accent` · `--font-mono` · `--font-display` · `--ease`

**css_classes**
`.op-layer` · `.on-dark` · `.op-hd` · `.op-spec` · `.op-grid` · `.op-h2` · `.op-lede` · `.op-ctas` · `.op-console-body` · `.op-console-row` · `.op-console-k` · `.op-console-v` · `.op-console-cmd` · `.op-attrs` · `.op-attr-k` · `.op-attr-v`

**motion**
`reveal` sur h2 · `blur-in` sur `TerminalMockup`

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/OperatingLayer.astro` (section twin)
- `src/components/ui/molecules/TerminalMockup.astro` (référence import dans le twin)

**status** — `DUPLIQUE-TYPE OperatingLayer`

**notes**
Section plateforme = copie du type `sections/OperatingLayer.astro`. Migrer les pages d'accueil FR + EN. Les données `consoleLines` et `attrs` sont candidats à une extension du schema Tina existant.

---

## 14 · PersonaSwitcher

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/PersonaSwitcher.astro` |
| **role** | Sélecteur tabbed de 3 personas (CEO PME · DSI/RSSI · CTO/Tech) |

**props/data**
- Données : `getCollection('personas')` (astro:content) avec fallback `FALLBACK_PERSONAS`
- `PATHS_BY_SLUG` hardcodé (liens nav par slug persona)
- Imports : `getCollection` (`astro:content`) · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--font-mono` · `--ease` · `--accent` · `--muted` · `--ink` · `--paper` · `--font-display`

**css_classes**
`.persona-tabs` · `.persona-tab` · `.is-active` · `.persona-tab .k` · `.persona-stage` · `.persona-panel` · `.persona-role` · `.persona-pitch` · `.persona-paths` · `.persona-paths li` · `.persona-paths a` · `.persona-paths .i` · `.persona-paths .t` · `.persona-paths .g`

**motion**
Inline `<script>` : click → toggle `.is-active` sur tabs + panels

**consumers**
- `src/pages/atlas.astro`
- `src/pages/en/atlas.astro`
- `src/pages/agence/design-system.astro` (preview)

**status** — `UNIQUE bespoke chrome`

**notes**
Composant interactif React-like (pure Astro + vanilla JS) pour switcher de persona. Aucun type de section équivalent. Lié à la collection de contenu `personas` — nature hybride contenu+UI. Conserver en bespoke. Si réutilisé sur d'autres pages, envisager un composant React island pour bénéficier de l'hydration partielle.

---

## 15 · Pyramid

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Pyramid.astro` |
| **role** | « Acte II — La pyramide d'engagements » — 4 niveaux, SVG + timeline + grille editorial-cell |

**props/data**
- Données : `PYRAMID_TIERS` (import `src/data/sitemap`) · `ACTION_LABELS` hardcodé
- Imports : `SectionHeader` molecule · `PYRAMID_TIERS` · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline-strong` · `--hairline` · `--accent` · `--font-mono` · `--font-display` · `--ink` · `--ink-2` · `--muted` · `--ease` · `--text-h3-row` · `--leading-h3` · `--space-2`

**css_classes**
`.pyramid-timeline` · `.pyramid-step` · `.pyramid-step-roman` · `.pyramid-step-verb` · `.pyramid-step-stage` · `.pyramid-svg` · `.pyramid-asym` · `.editorial-cell` · `.e-action` · `.e-num` · `.e-tag` · `.e-title` · `.e-body` · `.e-list` · `.e-go`

**motion**
`reveal reveal-fade` sur timeline · `reveal-blur-clip` sur SVG · `reveal-stagger` sur grille

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`

**status** — `DUPLIQUE-TYPE MaturityPyramid`

**notes**
Pyramide d'engagements = cas d'usage du type `sections/MaturityPyramid.astro`. Le SVG asymétrique et la grille `editorial-cell` sont propres à cet organism. Vérifier si `MaturityPyramid` supporte le rendu SVG + editorial-cell avant de migrer. Les données `PYRAMID_TIERS` sont déjà dans `src/data/sitemap`.

---

## 16 · SigBand

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/SigBand.astro` |
| **role** | Sign-off final de la marque — wordmark « Waim*i*a. » |

**props/data**
- Aucune prop, aucun import — entièrement hardcodé
- Aucun import de composant ni de data

**css_vars**
`--gut` · `--font-display` · `--accent`

**css_classes**
`.sig-band` · `.wm` · `.dot`

**motion**
`reveal reveal-fade` sur `.wm`

**consumers**
- `src/pages/agence/design-system.astro` (preview uniquement)

**status** — `UNIQUE bespoke chrome`

**notes**
Signature de marque finale — ornement éditorial minimal. Aucun type de section équivalent. Conserver en bespoke. Actuellement visible uniquement dans le design-system preview — vérifier si activement utilisé en production ou si orphelin.

---

## 17 · SixServices

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/SixServices.astro` |
| **role** | « Acte II — Six services, appris en livrant » — grille 3×2 de cartes service |

**props/data**
- Données : `SIX_SERVICES` (import `src/data/sitemap`)
- Imports : `ChapterLabel` atom · `SIX_SERVICES` · `langFromPath` · `t` (i18n)

**css_vars**
`--hairline` · `--font-mono` · `--muted` · `--ease` · `--accent` · `--font-display` · `--text-h2-section` · `--leading-h2` · `--text-h3-row` · `--leading-h3` · `--font-sans`

**css_classes**
`.six-hd` · `.six-spec` · `.six-h2` · `.six-grid` · `.six-cell` · `.six-cell-head` · `.six-cell-fig` · `.six-cell-metric` · `.six-cell-title` · `.six-cell-rule` · `.six-cell-body` · `.six-cell-foot` · `.six-cell-foot-key` · `.six-cell-foot-val` · `.six-cell-arr`

**motion**
`reveal` sur h2 · `reveal-stagger` sur grille

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/ServicesGrid.astro` (section twin — import de `SIX_SERVICES`)

**status** — `DUPLIQUE-TYPE ServicesGrid`

**notes**
Grille 6 services = cas d'usage du type `sections/ServicesGrid.astro` (qui importe déjà `SIX_SERVICES`). Migrer les pages d'accueil FR + EN vers `ServicesGrid` via le registry. La grille 3×2 propre à cet organism est déjà reproduite dans la section cataloguée.

---

## 18 · Stub

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/Stub.astro` |
| **role** | Placeholder éditorial pour pages en cours de rédaction (évite les 404) |

**props/data**
- Props : `kicker_fr` · `kicker_en` · `title_fr` · `title_en` · `body_fr` · `body_en`
- Imports : `Kicker` atom · `langFromPath` · `localizeHref` (i18n)

**css_vars** (inline styles uniquement — pas de `<style>` block)
`--font-display` · `--muted` · `--hairline-strong` · `--accent` · `--paper-2`

**css_classes** (classes globales uniquement)
`.stub-kicker` (`:global`) · `.btn` · `.btn-primary` · `.btn-ghost` · `.btn-lg` · `.signature-grid`

**consumers**
- `src/pages/[...slug].astro`

**status** — `UNIQUE bespoke chrome`

**notes**
Composant d'infrastructure pour pages stub — pas un type de contenu éditorial. Conserver en bespoke. Utilisé dans la route catch-all `[...slug].astro`. Aucune migration envisagée.

---

## 19 · SystemArchitecture

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/SystemArchitecture.astro` |
| **role** | Diagramme SVG éditorial « Une seule architecture. Six entrées, quatre sorties, mille décisions. » |

**props/data**
- Données : `inputs` (6 : Ads · Contenu · Site · CRM · Analytics · Marque) et `outputs` (4 : Actions · Supports · Reporting · Pipeline) — hardcodés, bilingues
- Imports : `ChapterLabel` atom · `langFromPath` (i18n)

**css_vars**
`--accent` · `--font-mono` · `--font-display` · `--ink` · `--ink-2` · `--hairline` · `--paper` · `--text-h2-section` · `--leading-h2`

**css_classes**
`.sysarch` · `.sysarch-hd` · `.sysarch-spec` · `.sysarch-h2` · `.sysarch-fig` · `.sysarch-svg` · `.sysarch-cap`

**motion**
`reveal` sur h2 · `reveal reveal-fade` (delay 180 ms) sur figure

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/ArchitectureDiagram.astro` (section twin — commentaire source confirmé)

**status** — `DUPLIQUE-TYPE ArchitectureDiagram`

**notes**
Diagramme SVG système = type `sections/ArchitectureDiagram.astro`. Le SVG inline est spécifique à cet organism mais la structure (inputs→système→outputs) est identique. Migrer les pages d'accueil FR + EN. Le SVG pourrait être porté en slot ou prop `svgSrc` dans le type catalogué.

---

## 20 · WhyAIStalls

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/WhyAIStalls.astro` |
| **role** | « Acte I — Le constat » — sticky aside gauche + 4 rows FIG droite (row-lines) |

**props/data**
- Données : `WHY_AI_STALLS` (import `src/data/sitemap`)
- Imports : `ChapterLabel` atom · `WHY_AI_STALLS` · `langFromPath` · `t` (i18n)

**css_vars**
`--font-display` · `--accent` · `--muted` · `--ink`

**css_classes**
`.why-grid` · `.why-aside` · `.why-h2` · `.why-aside-lead` · `.why-row` · `.why-row-text` · `.row-lines` (motion class) · `data-first` (attribut)

**motion**
`.row-lines` : border-bottom scale-x scrub effect

**consumers**
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/components/sections/WhyStalls.astro` (section twin — import de `WHY_AI_STALLS`)

**status** — `DUPLIQUE-TYPE WhyStalls`

**notes**
Constat IA = type `sections/WhyStalls.astro` (même données `WHY_AI_STALLS`, même motif sticky aside + rows). Migrer les pages d'accueil FR + EN. La section cataloguée est déjà branchée sur le même dataset.

---

## 21 · WritingNotes

| Champ | Valeur |
|---|---|
| **file** | `src/components/ui/organisms/WritingNotes.astro` |
| **role** | « Notes lentes du terrain » — layout sticky 2-col (aside + feed) pour section Writing |

**props/data**
- Données : `FIELD_NOTES` (import `src/data/sitemap`)
- Imports : `EditorialWriteRow` molecule · `FIELD_NOTES` · `langFromPath` · `t` · `localizeHref` (i18n)

**css_vars**
`--hairline` · `--font-display` · `--accent` · `--muted` · `--font-mono` · `--ink`

**css_classes**
`.writing-grid` · `.writing-aside` · `.writing-h2` · `.writing-aside-lead` · `.writing-all` · `.writing-feed` · `.chapter-label` · `.dot`

**motion**
`reveal` sur `.writing-feed`

**consumers**
- `src/pages/index.astro`
- `src/pages/agence/design-system.astro` (preview)
- `src/pages/ressources/index.astro`
- `src/components/ui/molecules/EditorialWriteRow.astro` (molécule utilisée, pas import direct)
- `src/components/footer/Footer.astro` (référence string)

**status** — `DUPLIQUE-TYPE EditorialPreview`

**notes**
Variante sticky 2-col de `FieldNotes` (même dataset `FIELD_NOTES`, même logique, mais utilise `EditorialWriteRow` molecule au lieu de rows inline). Correspond fonctionnellement à `sections/EditorialPreview.astro`. La différence de layout (aside sticky + feed vertical vs index numéroté) mérite évaluation avant migration — `WritingNotes` a une signature visuelle plus éditoriale. Utilisé dans `src/pages/ressources/index.astro` en plus de la home.

---

## Synthèse

### Tableau organism → type catalogué jumeau

| # | Organism | Type catalogué jumeau | Status |
|---|---|---|---|
| 01 | AtlasGrid | — | UNIQUE |
| 02 | BookSession | `CtaFinal` | DUPLIQUE |
| 03 | Cases | `CaseCardGrid` | DUPLIQUE |
| 04 | CookiesBanner | — | UNIQUE |
| 05 | Departments | `UseCaseIndex` | DUPLIQUE |
| 06 | FieldNotes | `EditorialPreview` | DUPLIQUE |
| 07 | FooterMarquee | `MarqueeBand` | DUPLIQUE |
| 08 | Hero | `HeroHome` | DUPLIQUE |
| 09 | HowWeShip | `HowWeShip` (section) | DUPLIQUE |
| 10 | Manifesto | `ManifestoBlock` | DUPLIQUE (orphelin — 0 consumer live) |
| 11 | ManifestoAccent | — (variante non cataloguée) | À CATALOGUER |
| 12 | Offices | — | UNIQUE |
| 13 | OperatingLayer | `OperatingLayer` (section) | DUPLIQUE |
| 14 | PersonaSwitcher | — | UNIQUE |
| 15 | Pyramid | `MaturityPyramid` | DUPLIQUE |
| 16 | SigBand | — | UNIQUE (design-system preview only) |
| 17 | SixServices | `ServicesGrid` | DUPLIQUE |
| 18 | Stub | — | UNIQUE (infrastructure) |
| 19 | SystemArchitecture | `ArchitectureDiagram` | DUPLIQUE |
| 20 | WhyAIStalls | `WhyStalls` | DUPLIQUE |
| 21 | WritingNotes | `EditorialPreview` | DUPLIQUE |

### Comptage

| Catégorie | Nombre | Organisms |
|---|---|---|
| **DUPLIQUE-TYPE** | **13** | BookSession · Cases · Departments · FieldNotes · FooterMarquee · Hero · HowWeShip · Manifesto · OperatingLayer · Pyramid · SixServices · SystemArchitecture · WhyAIStalls · WritingNotes *(14 entrées, Manifesto orphelin)* |
| **UNIQUE bespoke chrome** | **6** | AtlasGrid · CookiesBanner · Offices · PersonaSwitcher · SigBand · Stub |
| **À CATALOGUER** | **1** | ManifestoAccent |

> Note : `Manifesto` et `WritingNotes` comptent chacun comme 1 DUPLIQUE — total effectif 13 organisms dupliqués sur 21.

### Pages live impactées par une éventuelle migration

| Page(s) | Organisms à migrer | Types cibles |
|---|---|---|
| `src/pages/index.astro` + `src/pages/en/index.astro` | Hero · WhyAIStalls · OperatingLayer · Pyramid · SixServices · Cases · HowWeShip · FooterMarquee · Departments · BookSession · WritingNotes · SystemArchitecture | HeroHome · WhyStalls · OperatingLayer · MaturityPyramid · ServicesGrid · CaseCardGrid · HowWeShip · MarqueeBand · UseCaseIndex · CtaFinal · EditorialPreview · ArchitectureDiagram |
| `src/pages/atlas.astro` + `src/pages/en/atlas.astro` | FieldNotes | EditorialPreview |
| `src/pages/manifesto.astro` + `src/pages/en/manifesto.astro` | ManifestoAccent | Cataloguer → nouveau type `ManifestoAccent` |
| `src/pages/ressources/index.astro` | WritingNotes | EditorialPreview |

**Pages à fort impact (12 migrations sur la home FR+EN)** — migrer la home est la priorité #1 de déduplication ; elle représente ~90 % des consumers.

**Action prioritaire unique non-migration :** cataloguer `ManifestoAccent` (2 pages live, aucun type existant).
