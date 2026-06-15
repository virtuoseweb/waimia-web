# 03 — Molécules R→Z + Éditoriaux (21)

> Inventaire exhaustif — lecture intégrale de chaque fichier source.
> Cible : `src/components/ui/molecules/` (R→Z, 13 composants) + `src/components/editorial/` (8 composants).
> DS figé post-V1 — 0 nouveau token, composition uniquement.

---

## MOLÉCULES R→Z

---

### RelatedByCluster

- **file** `src/components/ui/molecules/RelatedByCluster.astro`
- **category** molecule
- **role** Chargeur de données : récupère les entrées blog + cookbooks + livresBlancs via `getCollection`, filtre par `cluster`, trie par date desc, tronque à `limit`, puis délègue tout le rendu à RelatedCards. Retourne null si aucun cluster ni aucun résultat.
- **props**
  ```ts
  cluster?: string
  excludeId?: string
  limit?: number  // défaut 3
  ```
- **css_vars** `--font-mono`, `--accent`
- **css_classes** `.rel-cluster-wrap`, `.rel-cluster-label`, `.rel-cluster-cta`
- **consumers**
  - `src/components/templates/EssayTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Couche data-loader propre, découplée du rendu. Délègue 100 % à RelatedCards (bonne séparation). Seul composant qui lit 3 collections pour le cluster. Si on ajoute `veilleIA` ou `cases` au cluster, ce fichier est le seul à modifier.

---

### RelatedCards

- **file** `src/components/ui/molecules/RelatedCards.astro`
- **category** molecule
- **role** Grille de 3 cartes liées affichées en fin de page (hub, case study, service). Rendu pur, pas de fetch. Imports `Bi` atom.
- **props**
  ```ts
  cards: Card[]  // { kicker, title_fr, title_en, lead_fr, lead_en, href }
  class?: string
  ```
- **css_vars** `--hairline-strong`, `--hairline`, `--paper-2`, `--accent`, `--font-mono`, `--font-display`, `--muted`, `--ease`
- **css_classes** `.related-grid`, `.related-card`, `.related-k`, `.related-title`, `.related-lead`, `.related-go`
- **consumers**
  - `src/components/ui/molecules/RelatedByCluster.astro`
  - `src/components/templates/CaseStudyTemplate.astro`
  - `src/components/templates/HubTemplate.astro`
  - `src/components/templates/ServiceDetailTemplate.astro`
  - `src/components/templates/DetailMenuTemplate.astro`
  - `src/components/templates/EssayTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/pages/technologies/index.astro`
  - `src/pages/en/technologies/index.astro`
  - `src/pages/ressources/index.astro`
  - `src/pages/en/ressources/index.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Molécule la plus consommée du repo (12 consumers). Grid 3 colonnes desktop / 1 colonne mobile (breakpoint 800px). Délibérément limitée à max 3 cartes ; `RelatedCardsGrid` prévu pour N cartes (non encore créé). Très haute réutilisabilité — ne pas modifier la signature sans audit des 12 consumers.

---

### SectionHeader

- **file** `src/components/ui/molecules/SectionHeader.astro`
- **category** molecule
- **role** Header standard de section numérotée : roman numeral italic terracotta + label mono + h2 + aside optionnel à droite. Pattern inline le plus dupliqué avant ce refactor (≥7 occurrences). Importe `Kicker` atom.
- **props**
  ```ts
  roman?: string     // ex: "II", "FIG IV"
  label?: string     // texte mono uppercase
  id?: string        // pour aria-labelledby
  tone?: 'accent' | 'dim'  // défaut 'accent'
  class?: string
  ```
  **Slots** : `heading` (ou default) · `aside` (optionnel) · `chapter` (override complet du kicker)
- **css_vars** Styles définis dans `src/styles/global.css` (pas de `<style>` scoped) : règles `.sec-hd`, `.sec-hd .n`, `.sec-hd .roman`, `.sec-hd h2`, `.sec-hd h2 i`, `.sec-hd .aside` (lignes 1165–1210+)
- **css_classes** `.sec-hd` (wrapper), `.n` (kicker interne), `.roman` (span roman numeral), `.aside` (paragraphe droite)
- **consumers**
  - `src/components/ui/organisms/Pyramid.astro`
  - `src/components/ui/organisms/AtlasGrid.astro`
  - `src/components/ui/organisms/Offices.astro`
  - `src/components/ui/organisms/Departments.astro`
  - `src/components/ui/organisms/HowWeShip.astro`
  - `src/components/ui/organisms/FieldNotes.astro`
  - `src/components/sections/HowWeShip.astro`
  - `src/pages/agence/design-system.astro`
  - `src/pages/en/agence/design-system.astro`
- **status** unique
- **notes** 2e composant le plus consommé (9 consumers, tous dans organisms/sections — pas dans templates). Absence de `<style>` scoped : styles dans `global.css`, ce qui facilite le thème global mais couple à la feuille globale. Excellente API slot avec 3 slots distincts. Composant de référence du pattern « section numérotée Waimia ».

---

### ServiceCatalogRow

- **file** `src/components/ui/molecules/ServiceCatalogRow.astro`
- **category** molecule
- **role** Rangée de catalogue de service : numéro·titre·description·meta·flèche. Grid 4 colonnes desktop. Importe `Bi` atom.
- **props**
  ```ts
  num: string | number
  title_fr: string
  title_en: string
  desc_fr: string
  desc_en: string
  meta?: string
  href: string
  class?: string
  ```
- **css_vars** `--font-mono`, `--accent`, `--space-7`, `--hairline`, `--paper-2`, `--muted`, `--ease`, `--font-display`
- **css_classes** `.svc-row`, `.svc-num`, `.svc-body`, `.svc-title`, `.svc-desc`, `.svc-meta`, `.svc-arr`
- **consumers**
  - `src/components/templates/HubTemplate.astro`
  - `src/pages/offres/conseil.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Grid `110px 1fr 180px 60px` desktop, stack mobile (900px). La classe `reveal` sur le root déclenche l'animation d'entrée. Hover décale `padding-left` (animation positionnelle). Utilisé uniquement dans 2 consumers actifs — candidat à vérifier si le pattern se généralise à d'autres catalogues.

---

### ShareButtons

- **file** `src/components/ui/molecules/ShareButtons.astro`
- **category** molecule
- **role** Partage Twitter + LinkedIn + copie presse-papiers. Island client avec `<script>` vanilla. Aucun import d'atome.
- **props**
  ```ts
  url: string
  title: string
  lang?: 'fr' | 'en'  // défaut 'fr'
  ```
- **css_vars** `--font-mono`, `--muted`, `--hairline`, `--accent`
- **css_classes** `.share-wrap`, `.share-label`, `.share-link`, `.share-copy`, `.share-copy--copied`
- **consumers**
  - `src/components/templates/EssayTemplate.astro`
  - `src/pages/agence/design-system.astro`
  - `src/pages/en/agence/design-system.astro`
- **status** unique
- **notes** Auto-contenu (0 dépendance atome). Fallback clipboard via `execCommand` pour navigateurs sans `navigator.clipboard`. Feedback visuel `.share-copy--copied` + timeout 1,8 s. Consommé uniquement dans `EssayTemplate` — si d'autres pages long-form arrivent (livre blanc detail, cookbook detail), à étendre.

---

### StatRow

- **file** `src/components/ui/molecules/StatRow.astro`
- **category** molecule
- **role** Rangée de N KPI larges avec labels. Grid `repeat(var(--cols, 4), 1fr)` ; count CSS via variable. Importe `Kicker` + `Bi`.
- **props**
  ```ts
  stats: Stat[]  // { k: string, label_fr: string, label_en: string }
  tone?: 'paper' | 'ink'  // défaut implicite paper
  class?: string
  ```
- **css_vars** `--font-display`, `--ink`, `--paper`, `--hairline-strong`, `--hairline`, `--accent`, `--muted`, `--space-*` (multiples)
- **css_classes** `.stat-row`, `.on-ink`, `.stat-cell`, `.stat-k`, `.stat-l` (via `:global`)
- **consumers**
  - `src/pages/agence/design-system.astro` (seulement)
- **status** unique — potentiellement orphelin actif
- **notes** Grid adaptatif (col count via `--cols` CSS var). Ton `on-ink` pour fond sombre. Mobile 2 colonnes (700px). Consommé uniquement dans design-system — pas encore intégré dans un template ou page live. Candidat à intégrer dans HubTemplate ou HeroHubStats si expansion des KPIs.

---

### TableOfContents

- **file** `src/components/ui/molecules/TableOfContents.astro`
- **category** molecule
- **role** TOC collant avec scroll-spy `IntersectionObserver`. Retour anticipé si < 2 headings h2/h3. Island client avec `<script>` vanilla. Aucun import d'atome.
- **props**
  ```ts
  headings: Heading[]  // { depth: number, slug: string, text: string }
  lang?: 'fr' | 'en'
  ```
- **css_vars** `--font-mono`, `--muted`, `--ink`, `--accent`
- **css_classes** `.toc-wrap`, `.toc-label`, `.toc-list`, `.toc-link`, `.toc-active`, `.toc-h3`
- **consumers**
  - `src/components/templates/EssayTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** `rootMargin: '-15% 0px -70% 0px'` pour fenêtre d'activation réduite (évite faux positifs). Auto-masquage si contenu trop court (guard < 2 headings). Consommé uniquement dans EssayTemplate — à envisager pour les cookbook/livre-blanc longs si leur template est créé.

---

### TagPills

- **file** `src/components/ui/molecules/TagPills.astro`
- **category** molecule
- **role** Pills de tags et cluster comme liens filtrables. Pill cluster = fond accent plein ; pills tags = bordure subtile. Aucun import d'atome.
- **props**
  ```ts
  tags?: string[]
  cluster?: string
  clusterLabel?: string
  lang?: 'fr' | 'en'
  ```
- **css_vars** `--font-mono`, `--muted`, `--accent`
- **css_classes** `.tag-pills`, `.tag-pill`, `.tag-pill--cluster`
- **consumers**
  - `src/components/templates/EssayTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Retour anticipé si aucun cluster et aucun tag. Distinction visuelle claire cluster vs tag. Consommé uniquement dans EssayTemplate — si cookbooks/veilleIA ont des tags, à ajouter dans leurs templates respectifs.

---

### TaxonomyMenu

- **file** `src/components/ui/molecules/TaxonomyMenu.astro`
- **category** molecule
- **role** Navigation catégories ressources avec compteurs live. Data-driven : 5 collections (`getCollection`) + `CATEGORIES` de `src/data/taxonomies`. Aucune prop (fully self-contained).
- **props** aucune prop (composant fermé, data-driven)
- **css_vars** `--font-mono`, `--accent`, `--ink`, `--muted`, `--font-display`
- **css_classes** `.tax-menu`, `.tax-menu-kicker`, `.tax-menu-label`, `.tax-menu-count`
- **consumers**
  - `src/pages/agence/design-system.astro` (seulement)
- **status** unique — potentiellement orphelin actif
- **notes** Grid `repeat(auto-fit, minmax(200px, 1fr))` responsive. Compte toutes les entrées de 5 collections. Cachée si count = 0 pour une catégorie. Consommé uniquement dans design-system — pas encore dans une page `/ressources` ni hub. À intégrer dans un hub ressources ou page index catégories.

---

### TechPillRow

- **file** `src/components/ui/molecules/TechPillRow.astro`
- **category** molecule
- **role** Rangée de pills technologies avec dot coloré (primary/open/neutral). Aucun import d'atome.
- **props**
  ```ts
  pills: Pill[]  // { label: string, kind?: 'primary' | 'open' | 'neutral' }
  class?: string
  ```
- **css_vars** `--space-2`, `--hairline-strong`, `--accent`, `--muted`, `--ease`
- **css_classes** `.tech-pills`, `.tech-pill`, `.tech-pill-dot`, `.primary`, `.open`, `.neutral`
- **consumers**
  - `src/components/templates/ServiceDetailTemplate.astro`
  - `src/components/templates/CaseStudyTemplate.astro`
  - `src/components/templates/DetailMenuTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/pages/technologies/index.astro`
  - `src/pages/en/technologies/index.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** ⚠️ **Couleur hors token** : `.tech-pill.open .tech-pill-dot { background: #2aa876 }` — valeur hexadécimale hardcodée, pas dans le système de tokens DS. Si la couleur verte « open source » change, ce fichier est à mettre à jour manuellement. Hover accent correct (`rgba(201,79,46,.06)`). 7 consumers — bien diffusé dans les templates.

---

### TerminalMockup

- **file** `src/components/ui/molecules/TerminalMockup.astro`
- **category** molecule
- **role** Cadre de terminal/console : 3 dots + label + status + corps en slot. Unifie 4 variantes inline (OperatingLayer, /manifesto, /console hero, /console reel). Importe `Kicker`. Inline styles calculés selon `tone`.
- **props**
  ```ts
  label?: string     // texte entre les dots et le status
  status?: string    // ex: "◉ live"
  tone?: 'ink' | 'paper'  // défaut 'ink'
  bodyPadding?: number   // défaut 14
  class?: string
  ```
  **Slot** : `default` — contenu de la console (commandes, logs, table…)
- **css_vars** `--font-mono` (via inline style), `--paper`, `--hairline-strong`, `--paper-2`, `--hairline` (dans les calculs `tone`)
- **css_classes** `.u-terminal` (wrapper root) ; globaux : `.u-terminal-label`, `.u-terminal-status`
- **consumers**
  - `src/components/ui/organisms/OperatingLayer.astro`
  - `src/components/sections/OperatingLayer.astro`
  - `src/pages/console.astro`
  - `src/pages/en/console.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Préfixe `.u-` (utilitaire). Inline styles pour `bg`/`border`/`dotColor`/`headerBg`/`headerBorder` en fonction du `tone` — évite la multiplication de classes mais couple le JS au CSS. Tone `ink` = fond `#17140F` (hardcodé, non token). 5 consumers actifs. Utilisé avec `TerminalTable` pour les pages console.

---

### TerminalTable

- **file** `src/components/ui/molecules/TerminalTable.astro`
- **category** molecule
- **role** Table de données en style terminal/console (≠ table journalisme éditoriale). Importe `Kicker`. Rows via slot.
- **props**
  ```ts
  cols: string      // template de grid CSS ex: "120px 1fr 80px"
  headers: string[]
  tone?: 'ink' | 'paper'
  class?: string
  ```
  **Slot** : `default` — rangées `.u-edit-tbl-row` injectées par le parent
- **css_vars** `--ink`, `--paper`, `--paper-2`, `--hairline`, `--ease`
- **css_classes** `.u-edit-tbl`, `.u-edit-tbl-head` ; global : `.u-edit-tbl-row`
- **consumers**
  - `src/pages/console.astro`
  - `src/pages/en/console.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique — distinct de `editorial/EditorialTable`
- **notes** Renommé depuis `EditorialTable` pour éviter collision de nommage avec `editorial/EditorialTable.astro` (deux composants au rôle différent). Préfixe `.u-edit-tbl` = préfixe utilitaire. `:global(.u-edit-tbl-row)` pour les rows injectées en slot. 3 consumers (console seulement).

---

### TunnelNav

- **file** `src/components/ui/molecules/TunnelNav.astro`
- **category** molecule
- **role** Barre de progression sticky 4 étapes pour le tunnel de conversion `/offres/site-web-ia-tunnel/`. URLs et steps hardcodés.
- **props**
  ```ts
  currentStep: 1 | 2 | 3 | 4
  lang?: 'fr' | 'en'
  ```
- **css_vars** `--color-paper`, `--color-muted`, `--color-ink`, `--color-accent`, `--font-mono`, `--font-body`
- **css_classes** `.tunnel-nav`, `.tunnel-nav__inner`, `.tunnel-nav__step`, `.tunnel-nav__num`, `.tunnel-nav__label`, `.tunnel-nav__bar`, `.tunnel-nav__fill`, `.is-active`, `.is-done`
- **consumers**
  - `src/pages/agence/design-system.astro` (seulement)
- **status** unique — potentiellement orphelin (tunnel non déployé)
- **notes** ⚠️ **Nommage CSS vars non-standard** : utilise `--color-paper`, `--color-muted`, `--color-ink`, `--color-accent` au lieu des tokens DS standard `--paper`, `--ink`, `--muted`, `--accent`. Incohérence à corriger si le tunnel est mis en prod. Convention BEM (unique dans ce codebase). Mobile (640px) : label masqué, num seul visible. Hardcodé à 4 steps et 4 URLs — à rendre configurable si le tunnel évolue.

---

## ÉDITORIAUX

---

### Callout

- **file** `src/components/editorial/Callout.astro`
- **category** editorial
- **role** Aparté éditorial bordé (hairline accent gauche) avec 5 variantes. Utilisé dans MDX et templates pour encadrés info, citations, avertissements, manifestes.
- **props**
  ```ts
  variant?: 'info' | 'quote' | 'note' | 'warn' | 'manifesto'
  cite?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  ```
- **css_vars** `--space-7`, `--space-5`, `--space-6`, `--space-4`, `--space-8`, `--space-9`, `--space-3`, `--accent`, `--ink-2`, `--ink-3`, `--hairline-strong`, `--hairline`, `--font-display`, `--font-sans`, `--font-mono`, `--text-body-md`, `--text-body-sm`, `--leading-loose`, `--tracking-mono`, `--text-mono-md`, `--paper-2`, `--muted`
- **css_classes** `.callout`, `.callout-info`, `.callout-quote`, `.callout-note`, `.callout-warn`, `.callout-manifesto`, `.callout-sm`, `.callout-md`, `.callout-lg`, `.callout-left`, `.callout-center`, `.callout-body`, `.callout-cite`, `.callout-cite-mark`, `.callout-cite-text`
- **consumers**
  - `src/components/templates/AuthorPageTemplate.astro`
  - `src/components/templates/SolutionsDetailTemplate.astro`
  - `src/components/templates/LeadMagnetTemplate.astro`
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/components/templates/HubTemplate.astro`
  - `src/components/templates/TechnologiesDetailTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/pages/agence/trust-center.astro`
  - `src/pages/agence/governance.astro`
  - `src/pages/agence/docs.astro`
- **status** unique
- **notes** Editorial le plus consommé (10 consumers). Variante `manifesto` = design radicalement différent (sans bordure gauche, bordures top+bottom `--ink`, centré). Animation `reveal-fade-up` si `animate=true`. Densité CSS vars élevée (21 vars) — composant très complet stylistiquement. Note : `BrandedCallout.astro` est un composant section distinct qui référence le même mot mais n'importe pas `Callout`.

---

### Dingbat

- **file** `src/components/editorial/Dingbat.astro`
- **category** editorial
- **role** Ornement typographique entre sections ou en fin de chapitre. 5 variantes (default `· · ·`, section `§` avec lignes, end `— ◆ —`, rule `<hr>`, asterism `⁂`). Aucun import d'atome.
- **props**
  ```ts
  variant?: 'default' | 'section' | 'end' | 'rule' | 'asterism'
  size?: 'sm' | 'md' | 'lg'
  ```
- **css_vars** `--space-4`, `--space-6`, `--space-8`, `--space-9`, `--space-10`, `--space-12`, `--muted`, `--font-display`, `--accent`, `--hairline-strong`, `--ink-3`
- **css_classes** `.dingbat`, `.dingbat-default`, `.dingbat-section`, `.dingbat-end`, `.dingbat-rule`, `.dingbat-asterism`, `.dingbat-sm`, `.dingbat-md`, `.dingbat-lg`, `.dingbat-glyph`, `.dingbat-line`, `.dingbat-rule` (double usage classe+variante), `.dingbat-rule-sm`, `.dingbat-rule-md`, `.dingbat-rule-lg`
- **consumers**
  - `src/components/templates/LeadMagnetTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/components/templates/SolutionsDetailTemplate.astro`
  - `src/components/templates/TechnologiesDetailTemplate.astro`
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** La variante `rule` rend un `<hr>` (seul variant qui change d'élément HTML). Glyphes typographiques authentiques (§, ⁂, ◆). 5 consumers templates. Nom de classe `.dingbat-rule` ambigu (utilisé à la fois comme sélecteur de variante et comme modificateur de taille `.dingbat-rule-sm/md/lg`) — vigilance si on étend.

---

### DropCap

- **file** `src/components/editorial/DropCap.astro`
- **category** editorial
- **role** Lettrine flottante initiale (style presse/magazine) avec 3 variantes typographiques. Float left avec marges précises pour alignement 4 lignes. Usage MDX.
- **props**
  ```ts
  variant?: 'serif' | 'mono' | 'accent'  // défaut 'serif'
  ```
- **css_vars** `--font-display`, `--font-mono`, `--text-drop-cap` (clamp 64px–96px), `--accent`, `--ink`
- **css_classes** `.drop-cap`, `.drop-cap-serif`, `.drop-cap-mono`, `.drop-cap-accent`
- **consumers**
  - `src/components/sections/HeroHubStats.astro`
  - `src/components/templates/HubTemplate.astro`
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** Token `--text-drop-cap` = `clamp(64px, 6vw, 96px)`. `float: left` + `line-height: 0.75` pour alignement précis. Variante `accent` = couleur terracotta, `mono` = font monospace, `serif` = Instrument Serif italic. 3 consumers actifs (sections + templates).

---

### EditorialTable

- **file** `src/components/editorial/EditorialTable.astro`
- **category** editorial
- **role** Table de données journalisme/FT/NYT — sémantique HTML (`<table>`), caption, styles éditoriaux. Distincte de `TerminalTable` (console UI). Aucun import d'atome.
- **props**
  ```ts
  columns: string[]
  rows: (string | number)[][]
  caption?: string
  align?: 'left' | 'mixed'
  variant?: 'default' | 'compact' | 'editorial'
  ```
- **css_vars** `--space-9`, `--space-4`, `--space-3`, `--space-6`, `--space-1`, `--font-mono`, `--text-mono-md`, `--tracking-mono`, `--muted`, `--hairline-strong`, `--ink`, `--font-display`, `--text-body-md`, `--text-body-sm`, `--paper-2`, `--hairline`
- **css_classes** `.ed-table-figure`, `.ed-table-caption`, `.ed-table`, `.ed-table-th`, `.ed-table-th-right`, `.ed-table-tr`, `.ed-table-td`, `.ed-table-td-right`, `.ed-table-compact`, `.ed-table-editorial`
- **consumers**
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/components/templates/SolutionsDetailTemplate.astro`
  - `src/components/templates/TechnologiesDetailTemplate.astro`
  - `src/pages/offres/conseil.astro`
  - `src/pages/agence/trust-center.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique — distinct de `molecules/TerminalTable`
- **notes** Variante `editorial` : première colonne mono uppercase (colonne clé/label). Align `mixed` : dernière colonne right-aligned avec `font-variant-numeric: tabular-nums`. Mobile : `thead hidden`, toutes cellules en `display:block`. 5 consumers actifs. Nommage `EditorialTable` clair — la confusion potentielle avec `TerminalTable` (ex-`EditorialTable`) est résolue par le renommage de ce dernier.

---

### KeyMetric

- **file** `src/components/editorial/KeyMetric.astro`
- **category** editorial
- **role** KPI métrique large style FT/Bloomberg (value + label + delta optionnel). Sizes allant jusqu'à `hero` (clamp 96px–180px italic). Animation `reveal-zoom-in`.
- **props**
  ```ts
  value: string | number
  label: string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  size?: 'sm' | 'md' | 'lg' | 'hero'
  align?: 'left' | 'center' | 'right'
  variant?: 'default' | 'inverted' | 'accent'
  ```
- **css_vars** `--space-2`, `--space-4`, `--space-5`, `--space-6`, `--font-display`, `--tracking-display`, `--ink`, `--font-mono`, `--text-mono-md`, `--tracking-mono`, `--muted`, `--accent`, `--paper`
- **css_classes** `.key-metric`, `.key-metric-value`, `.key-metric-label`, `.key-metric-delta`, `.key-metric-delta-up`, `.key-metric-delta-down`, `.key-metric-delta-flat`, `.key-metric-sm`, `.key-metric-md`, `.key-metric-lg`, `.key-metric-hero`, `.key-metric-left`, `.key-metric-center`, `.key-metric-right`, `.key-metric-default`, `.key-metric-inverted`, `.key-metric-accent`
- **consumers**
  - `src/components/sections/HeroConversionFunnel.astro`
  - `src/components/sections/HeroPillarHub.astro`
  - `src/components/sections/HeroHubStats.astro`
  - `src/components/templates/SolutionsDetailTemplate.astro`
  - `src/components/templates/TechnologiesDetailTemplate.astro`
  - `src/components/templates/CaseStudyTemplate.astro`
  - `src/components/templates/HubTemplate.astro`
  - `src/components/templates/LeadMagnetTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** 2e éditorial le plus consommé (10 consumers). Variante `inverted` = fond sombre + couleurs inversées. Size `hero` = `clamp(96px, 12vw, 180px)` italic. Distinction visuelle forte entre les tailles (sm/md/lg/hero). Cross-usage sections + templates = preuve de haute réutilisabilité.

---

### PullQuote

- **file** `src/components/editorial/PullQuote.astro`
- **category** editorial
- **role** Citation extraite (breakout/inline/centered) avec attribution. Animation `reveal-blur-clip`.
- **props**
  ```ts
  attribution?: string
  source?: string
  variant?: 'breakout' | 'inline' | 'centered'
  ```
  **Slot** : `default` — corps de la citation
- **css_vars** `--space-9`, `--space-5`, `--space-7`, `--space-2`, `--space-6`, `--font-display`, `--text-pull-quote` (clamp 28px–44px), `--tracking-display`, `--ink`, `--ink-2`, `--font-mono`, `--text-mono-md`, `--tracking-mono`, `--muted`, `--accent`
- **css_classes** `.pull-quote`, `.pull-quote-body`, `.pull-quote-mark`, `.pull-quote-cite`, `.pull-quote-attr`, `.pull-quote-src`, `.pull-quote-breakout`, `.pull-quote-inline`, `.pull-quote-centered`
- **consumers**
  - `src/components/templates/HubTemplate.astro`
  - `src/components/templates/LeadMagnetTemplate.astro`
  - `src/components/templates/OffresDetailTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/pages/agence/design-system.astro`
- **status** unique
- **notes** `breakout` : marges négatives inline pour déborder la colonne (effet presse). `inline` : bordure gauche accent + guillemet `"` flottant masqué. Token `--text-pull-quote` = `clamp(28px, 3vw, 44px)`. 4 consumers actifs.

---

### Sidenote

- **file** `src/components/editorial/Sidenote.astro`
- **category** editorial
- **role** Note marginale style Tufte : absolue dans la marge desktop (≥1100px), inline italique mobile.
- **props**
  ```ts
  num?: number | string
  align?: 'right' | 'left'  // défaut 'right'
  ```
  **Slot** : `default` — contenu de la note
- **css_vars** `--font-mono`, `--accent`, `--text-mono-md`, `--muted`, `--col-aside` (240px), `--space-4`, `--ink-3`
- **css_classes** `.sidenote-anchor`, `.sidenote-num`, `.sidenote`, `.sidenote-right`, `.sidenote-left`, `.sidenote-mark`, `.sidenote-content`
- **consumers**
  - `src/pages/agence/design-system.astro` (seulement)
- **status** unique — potentiellement orphelin actif
- **notes** Position `absolute` desktop avec `--col-aside: 240px`. Mobile : contenu entre parenthèses via pseudo-élément CSS (`content: '('` / `')'`). Aucun consumer dans un template — orphelin de production. À intégrer dans EssayTemplate si les essays utilisent des notes marginales.

---

### Timeline

- **file** `src/components/editorial/Timeline.astro`
- **category** editorial
- **role** Timeline verticale ou horizontale avec axe central, items numérotés ou dotés, variante highlight. Props-driven (pas de slot principal).
- **props**
  ```ts
  events: TimelineEvent[]  // { num?, title, meta?, body, variant?: 'default' | 'highlight' }
  orientation?: 'vertical' | 'horizontal'  // défaut 'vertical'
  numbered?: boolean
  ```
- **css_vars** `--space-9`, `--space-8`, `--space-7`, `--space-5`, `--space-4`, `--space-3`, `--space-2`, `--font-mono`, `--text-mono-md`, `--tracking-mono`, `--accent`, `--hairline-strong`, `--font-display`, `--ink`, `--ink-2`, `--leading-loose`, `--hairline`, `--paper`
- **css_classes** `.timeline-vertical`, `.timeline-horizontal`, `.timeline-item`, `.timeline-item-default`, `.timeline-item-highlight`, `.timeline-marker`, `.timeline-num`, `.timeline-dot`, `.timeline-content`, `.timeline-header`, `.timeline-title`, `.timeline-meta`, `.timeline-body`
- **consumers** (usage `<Timeline`)
  - `src/components/templates/AuthorPageTemplate.astro`
  - `src/components/templates/SolutionsDetailTemplate.astro`
  - `src/components/templates/LeadMagnetTemplate.astro`
  - `src/components/templates/TechnologiesDetailTemplate.astro`
  - `src/components/templates/ConversionFunnelTemplate.astro`
  - `src/pages/agence/methode.astro`
  - `src/pages/en/agence/methode.astro`
- **status** ANALYSE DOUBLON — voir notes
- **notes** ⚠️ **Doublon potentiel avec `sections/MethodTimeline`** — analyse comparative :
  - `editorial/Timeline` : composant générique props-driven (`events[]`, orientation vertical/horizontal, numbered, variante highlight). Axe via `::before` pseudo-element. Horizontal = flex + scroll-snap. 7 consumers directs.
  - `sections/MethodTimeline` : composant section de bibliothèque (`data: SectionByType<'method-timeline'>`), billingue via `data.steps[].label_fr/en`, kicker+h2+lede en header, numéros via `Kicker` atom. Consommé par `section-registry.ts` → templates.
  - **Verdict** : NON-doublon strict — rôles différents. `editorial/Timeline` = composant libre pour tout contenu événementiel (MDX, templates, pages). `MethodTimeline` = section catalogue figée avec schéma Zod + données bilingues. Chevauchement fonctionnel existant (timelines numérotées) mais API et contexte d'usage distincts. Pas de fusion recommandée.

---

## Synthèse

### Composants par volume de consommation

| Rang | Composant | Consumers | Catégorie |
|------|-----------|-----------|-----------|
| 1 | **RelatedCards** | 12 | molecule |
| 2 | **Callout** | 10 | editorial |
| 2 | **KeyMetric** | 10 | editorial |
| 4 | **SectionHeader** | 9 | molecule |
| 5 | **TechPillRow** | 7 | molecule |
| 5 | **Timeline** | 7 | editorial |
| 7 | **Dingbat** | 5 | editorial |
| 7 | **EditorialTable** | 5 | editorial |
| 7 | **PullQuote** | 4 | editorial |
| 10 | **DropCap** | 3 | editorial |
| 10 | **TerminalMockup** | 4 | molecule |
| 10 | **ShareButtons** | 2 | molecule |
| 13 | **TableOfContents** | 2 | molecule |
| 13 | **TagPills** | 2 | molecule |
| 13 | **ServiceCatalogRow** | 2 | molecule |
| 16 | **RelatedByCluster** | 2 | molecule |
| 17 | **StatRow** | 1 | molecule |
| 17 | **TaxonomyMenu** | 1 | molecule |
| 17 | **TunnelNav** | 1 | molecule |
| 17 | **TerminalTable** | 2 | molecule |
| 17 | **Sidenote** | 1 | editorial |

### Orphelins actifs (design-system uniquement)

Ces composants ne sont consommés que dans la page design-system (`/agence/design-system`) — ils ne sont pas intégrés dans des templates ou pages live :

- **StatRow** — KPI row ; candidat à intégrer dans HubTemplate ou HeroHubStats
- **TaxonomyMenu** — nav catégories ; à intégrer dans un hub ressources ou index catégories
- **TunnelNav** — nav progression tunnel ; tunnel `/offres/site-web-ia-tunnel/` non déployé
- **Sidenote** — note marginale Tufte ; à intégrer dans EssayTemplate si essays utilisent des notes

### Doublons et variantes

- **`editorial/Timeline` vs `sections/MethodTimeline`** : NON-doublon — rôles distincts (composant libre générique vs section catalogue bilingue avec schéma Zod). Pas de fusion recommandée.
- **`editorial/EditorialTable` vs `molecules/TerminalTable`** : nomenclature résolue par renommage intentionnel. Préfixe `.u-edit-tbl` sur TerminalTable marque l'écart sémantique. Les deux coexistent légitimement.
- **`ui/molecules/RelatedByCluster` vs `ui/molecules/RelatedCards`** : relation data-loader ↔ renderer propre (pas un doublon, découplage intentionnel).

### Anomalies DS à surveiller

1. **`TunnelNav` — CSS vars non-standard** : utilise `--color-paper`, `--color-muted`, `--color-ink`, `--color-accent` au lieu des tokens DS (`--paper`, `--ink`, etc.). À corriger avant mise en prod du tunnel.
2. **`TechPillRow` — couleur hors token** : `#2aa876` hardcodé pour le dot `.open`. À tokeniser ou documenter comme exception intentionnelle.
3. **`TerminalMockup` — fond ink hardcodé** : `#17140F` dans le calcul de `tone`. Non dans le système de tokens.
4. **`SectionHeader` — styles dans global.css** : seul composant (hors atoms) sans `<style>` scoped. Fonctionnel mais moins isolé — à surveiller si on veut extraire la thématisation.

### Composants prêts pour extension

- **ShareButtons** : uniquement dans EssayTemplate → à ajouter dans `CookbookTemplate`, `LivreBlancTemplate` quand ils sont créés
- **TableOfContents** : uniquement dans EssayTemplate → applicable à tous les longs formats
- **TagPills** : uniquement dans EssayTemplate → à étendre aux cookbooks/veilleIA si ces collections ont des tags
- **RelatedByCluster** : uniquement dans EssayTemplate → logique cluster réutilisable pour n'importe quel type de contenu
