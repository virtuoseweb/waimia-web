# 09 — Audit CSS / Design System

> Audit réalisé le 2026-06-04 sur le repo `waimia-web`.
> Objectif : resserrer le DS pour le rendre pilotable par les variables (type Automatic.css),
> réutilisable cross-projets. Aucun fichier CSS n'a été modifié — lecture seule.
> Fichiers analysés : `tokens.css` (267 l), `global.css` (1586 l), `grid.css` (178 l),
> `scroll-reveal.css` (236 l), `fonts.css` (130 l) + balayage `src/**/*.astro`.

---

## Tokens par famille

Les comptages sont obtenus via `grep -roh "var(--<nom>)" src | wc -l`.

### Couleurs base

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--paper` | `#F6F1E8` | 240 | Fond chaud principal |
| `--paper-2` | `#EFE9DD` | 109 | Fond alternatif |
| `--paper-3` | `#E6E0D0` | 1 | Quasi-orphelin |
| `--ink` | `#0C0B09` | 475 | Texte principal |
| `--ink-2` | `#1A1814` | 142 | Texte sombre alternatif |
| `--ink-3` | `#2B2620` | 3 | Quasi-orphelin |
| `--muted` | `#6B6560` | 455 | Texte secondaire |
| `--muted-2` | `#9A948D` | 23 | Texte tertiaire |
| `--hairline` | `rgba(12,11,9, 0.09)` | 525 | Séparateur fin |
| `--hairline-strong` | `rgba(12,11,9, 0.18)` | 108 | Séparateur renforcé |
| `--accent` | `#C94F2E` | 744 | Terracotta — token le + utilisé |
| `--accent-2` | `#A83D20` | 2 | Quasi-orphelin (hover seulement) |
| `--accent-ink` | `#F6F1E8` | 2 | Quasi-orphelin |

### Aliases sémantiques (couche `--fg-*`)

| Token | Valeur | Usages | Diagnostic |
|-------|--------|--------|------------|
| `--fg` | `var(--ink)` | **0** | Orphelin — inutilisé |
| `--fg-secondary` | `var(--muted)` | **0** | Orphelin |
| `--fg-tertiary` | `var(--muted-2)` | **0** | Orphelin |
| `--fg-inverted` | `var(--paper)` | **0** | Orphelin |

Tous les 4 alias `--fg-*` sont définis mais jamais consommés. Le codebase utilise directement `var(--ink)`, `var(--muted)`, etc.

### Polices

| Token | Valeur | Usages |
|-------|--------|--------|
| `--font-display` | Instrument Serif | 473 |
| `--font-sans` | Inter Tight | 227 |
| `--font-mono` | JetBrains Mono | 461 |

### Easing

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | 263 | Dominant |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.30, 1)` | 21 | Reveal editoriaux |
| `--ease-sharp` | `cubic-bezier(0.20, 0, 0.00, 1)` | **0** | Orphelin |

### Layout

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--wrap` | `1440px` | 3 | Peu utilisé |
| `--wrap-wide` | `1560px` | 17 | Via `.wrap-wide` |
| `--wrap-tight` | `1120px` | 2 | Peu utilisé |
| `--gut` | `32px` (responsive 20/16) | 26 | Gutter principal |
| `--header-height` | `72px` | 30 | Ancre scroll + layout |
| `--cookie-banner-height` | `0px` (JS-piloté) | 1 | Runtime only |
| `--signature-angle` | `-28deg` | **0** | Orphelin |

### Timing — reveals éditoriaux

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--reveal-slow` | `1400ms` | 5 | Parallel system avec `--dur-*` |
| `--reveal-med` | `1100ms` | 2 | Idem |

### Durées (`--dur-*`) — 7 paliers

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--dur-instant` | `0ms` | **0** | Orphelin |
| `--dur-snap` | `120ms` | **0** | Orphelin |
| `--dur-fast` | `200ms` | 11 | Utilisé (transitions UI) |
| `--dur-base` | `400ms` | 1 | Quasi-orphelin |
| `--dur-slow` | `800ms` | **0** | Orphelin (confondu avec `--reveal-slow`) |
| `--dur-deliberate` | `1200ms` | **0** | Orphelin |
| `--dur-cinematic` | `1800ms` | **0** | Orphelin |

### Typographie base

| Token | Valeur | Usages |
|-------|--------|--------|
| `--text-display-md` | `clamp(44px, 6vw, 96px)` | 2 |
| `--text-body-md` | `17px` | 27 |
| `--text-body-sm` | `14px` | 16 |
| `--text-mono-md` | `11px` | 1 |
| `--text-mono-xs` | `10px` | **0** |
| `--leading-display` | `0.94` | 1 |
| `--leading-body` | `1.5` | 1 |
| `--leading-loose` | `1.55` | 1 |
| `--tracking-display` | `-0.025em` | 2 |
| `--tracking-body` | `-0.005em` | 1 |
| `--tracking-mono` | `0.12em` | 7 |
| `--tracking-label` | `0.14em` | **0** |

### Typographie enrichie (eyebrow, lede, pull, etc.)

| Token | Valeur | Usages |
|-------|--------|--------|
| `--text-eyebrow` | `11px` | 7 |
| `--text-eyebrow-lg` | `12px` | **0** |
| `--text-lede` | `clamp(20px, 1.7vw, 24px)` | 16 |
| `--text-pull-quote` | `clamp(28px, 3.4vw, 44px)` | 1 |
| `--text-drop-cap` | `clamp(64px, 6vw, 96px)` | **0** |
| `--text-caption` | `12px` | 1 |

### Titres V6 (headings sémantiques)

| Token | Valeur | Usages |
|-------|--------|--------|
| `--text-h1-hero` | `clamp(40px, 6vw, 92px)` | 20 |
| `--text-h2-grand` | `clamp(44px, 7vw, 96px)` | 5 |
| `--text-h2-section` | `clamp(28px, 4vw, 56px)` | 24 |
| `--text-h2-tight` | `clamp(24px, 3vw, 42px)` | 3 |
| `--text-h3-row` | `clamp(20px, 2vw, 28px)` | 10 |
| `--text-h3-card` | `clamp(18px, 1.6vw, 24px)` | 1 |
| `--text-h4-meta` | `clamp(14px, 1.1vw, 16px)` | 1 |
| `--leading-h1` | `0.96` | 1 |
| `--leading-h2` | `1.02` | 13 |
| `--leading-h3` | `1.1` | 8 |
| `--leading-h4` | `1.3` | **0** |

### Espacement 8pt (17 paliers)

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--space-0` | `0` | **0** | Orphelin |
| `--space-1` | `4px` | 1 | Quasi-orphelin |
| `--space-2` | `8px` | 9 | |
| `--space-3` | `12px` | 35 | |
| `--space-4` | `16px` | 29 | |
| `--space-5` | `24px` | 33 | |
| `--space-6` | `32px` | 24 | |
| `--space-7` | `40px` | 20 | |
| `--space-8` | `48px` | 3 | |
| `--space-9` | `64px` | 2 | |
| `--space-10` | `80px` | **0** | Orphelin |
| `--space-11` | `96px` | 1 | Via `--section-base` |
| `--space-12` | `120px` | **0** | Orphelin |
| `--space-13` | `160px` | 1 | Via `--section-loose` |
| `--space-14` | `200px` | **0** | Orphelin |
| `--space-15` | `256px` | 1 | Via `--section-grand` |
| `--space-16` | `320px` | **0** | Orphelin |

### Rythme sectionnel

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--section-tight` | `var(--space-8)` = 48px | **0** | Orphelin |
| `--section-base` | `var(--space-11)` = 96px | 4 | Peu utilisé |
| `--section-loose` | `var(--space-13)` = 160px | 2 | Peu utilisé |
| `--section-grand` | `var(--space-15)` = 256px | 1 | Quasi-orphelin |
| `--spacing-section` | `clamp(64px, 8vw, 96px)` | **42** | De facto standard |
| `--spacing-block` | `clamp(28px, 3vw, 48px)` | 13 | Compact blocks |

### Z-index

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--z-base` | `1` | **0** | Orphelin |
| `--z-sticky` | `10` | **0** | Orphelin |
| `--z-overlay` | `100` | **0** | Orphelin |
| `--z-modal` | `1000` | **0** | Orphelin |
| `--z-toast` | `2000` | **0** | Orphelin |
| `--z-cursor` | `9999` | **0** | Orphelin |

### Ombres

| Token | Usages | Note |
|-------|--------|------|
| `--shadow-hairline` | 1 | Quasi-orphelin |
| `--shadow-paper-lift` | 1 | Quasi-orphelin |
| `--shadow-card-rest` | 1 | Quasi-orphelin |
| `--shadow-card-hover` | 1 | Quasi-orphelin |
| `--shadow-cta` | 1 | Quasi-orphelin |

### Grille

| Token | Valeur | Usages | Note |
|-------|--------|--------|------|
| `--grid-cols` | `12` | **0** | Orphelin |
| `--grid-gutter` | `var(--gut)` | **0** | Orphelin |
| `--col-full` | `var(--wrap)` = 1440px | 2 | Utilisé dans `grid.css` |

### Bloc @theme (Tailwind v4)

Le bloc `@theme` redéclare 10 couleurs, 3 polices et 3 easing sous des noms préfixés (`--color-*`, `--ease-default`). Usage Tailwind utility effectif :
- `text-muted` : 10 occurrences (via `--color-muted`)
- `border-paper` : 1 occurrence
- `var(--color-paper)` inline : 1 occurrence
- Tout le reste : **0** — les classes Tailwind dérivées (`bg-ink`, `text-accent`, etc.) ne sont pas utilisées.

---

## Tokens orphelins

Tokens définis avec **0 usage** dans `src/` — candidats à suppression directe :

### Groupe 1 — Aliases sémantiques redondants (4 tokens)
```
--fg           → utiliser var(--ink) directement (le codebase le fait déjà)
--fg-secondary → utiliser var(--muted)
--fg-tertiary  → utiliser var(--muted-2)
--fg-inverted  → utiliser var(--paper)
```
Ces aliases avaient été conservés pour une future couche dark-mode. La décision Simon (Phase D 2026-05-15) de supprimer les reliquats dark-mode les rend définitivement inutiles.

### Groupe 2 — Z-index (6 tokens)
```
--z-base, --z-sticky, --z-overlay, --z-modal, --z-toast, --z-cursor
```
Le codebase utilise des valeurs littérales `z-index: 10`, `z-index: 100`, etc. dans global.css. Les tokens existent mais ne sont jamais consommés via `var(--z-*)`.

### Groupe 3 — Durées inutilisées (5 tokens sur 7)
```
--dur-instant    (0ms)
--dur-snap       (120ms)
--dur-slow       (800ms)   ← confondu avec --reveal-slow 1400ms
--dur-deliberate (1200ms)
--dur-cinematic  (1800ms)
```
Seuls `--dur-fast` (200ms, 11 usages) et `--dur-base` (400ms, 1 usage) sont actifs.

### Groupe 4 — Espacement haut de gamme inutilisé (6 tokens)
```
--space-0  (0)
--space-10 (80px)
--space-12 (120px)
--space-14 (200px)
--space-16 (320px)
```
Plus `--space-1` (4px, 1 usage seul = quasi-orphelin).

### Groupe 5 — Tokens isolés (5 tokens)
```
--ease-sharp       (cubic-bezier entrante, aucune animation courante ne s'en sert)
--signature-angle  (-28deg)
--text-mono-xs     (10px — seul --text-mono-md survit)
--tracking-label   (0.14em)
--section-tight    (var(--space-8) = 48px)
```

### Groupe 6 — Typographie sans usage (3 tokens)
```
--text-eyebrow-lg  (12px — seul --text-eyebrow 11px est utilisé)
--text-drop-cap    (clamp 64-96px)
--leading-h4       (1.3)
```

### Groupe 7 — Grille (2 tokens)
```
--grid-cols     (12)
--grid-gutter   (var(--gut))
```
Utilisés nulle part via `var()` — la grille de grid.css compose directement avec les valeurs littérales ou `var(--gut)`.

**Total orphelins stricts : 31 tokens** (0 usage confirmé).
**Quasi-orphelins (1-2 usages) : 14 tokens supplémentaires**.

---

## Valeurs en dur à tokeniser

### A — Couleurs hexadécimales hardcodées dans les composants

| Valeur | Token à utiliser | Fichier(s):ligne(s) |
|--------|-----------------|---------------------|
| `#C94F2E` | `var(--accent)` | `SecteurFinance.astro:40`, `SecteurServicesB2B.astro:44` (SVG `fill`) |
| `stroke="#C94F2E"` | `var(--accent)` | `PortraitSimon.astro:40`, `SecteurIndustrie.astro:41` (SVG `stroke`) |
| `#fff` | `var(--paper)` ou `var(--accent-ink)` | `global.css:247` (btn text), `TagPills.astro:50`, `TechPillRow.astro:70` |
| `#2aa876` | nouveau token `--color-success` | `global.css:927` (dot conformité), `TechPillRow.astro:70` |
| `#c0392b` | nouveau token `--color-error` | `NewsletterSignup.astro:111,115` |
| `#c07046` | fallback erroné → `var(--accent)` | `ScrollProgress.astro:23` (fallback `var(--accent, #c07046)` — valeur incorrecte, `--accent` = `#C94F2E`) |
| `#0c0b09` / `#111` | `var(--ink)` | `HeroCourse.astro:117` (fallback erroné `var(--ink, #111)`) |
| `#444` / `#888` | `var(--ink-3)` / `var(--muted)` | `HeroAcademyHub.astro:63,75`, `HeroCourse.astro:100,120,133` (tokens `--text-secondary`, `--text-muted` — non définis) |

#### Tokens fantômes référencés mais non définis

Ces tokens sont appelés dans des composants mais absents de `tokens.css` :

| Token fantôme | Référencé dans | Substitut correct |
|---------------|---------------|-------------------|
| `--waimia-accent` | `MethodeProcessDiagram.astro:8`, `ConseilAuditDiagram.astro`, `AuditMaturityTimeline.astro`, `RevOpsFunnel.astro` | `--accent` |
| `--text-secondary` | `HeroAcademyHub.astro:63`, `HeroCourse.astro:100,120` | `--muted` ou `--ink-3` |
| `--text-muted` | `HeroAcademyHub.astro:75`, `HeroCourse.astro:133` | `--muted-2` |
| `--text-mono-sm` | `global.css` (h4 rule) | `--text-mono-md` (11px) ou `--text-mono-xs` (10px) |
| `--color-muted` via Tailwind | `TunnelNav.astro` (fallback `#888` erroné) | `var(--muted)` = `#6B6560` ≠ `#888` |

### B — Valeurs rgba répétées non tokenisées

Trois couleurs RGB sont utilisées à de nombreuses opacités différentes via `rgba()` brut :

#### Ink (12, 11, 9)
Apparaît à ~8 opacités différentes à travers le codebase sans canal RGB token :

| Localisation | Valeur |
|-------------|--------|
| `global.css:230` | `rgba(12, 11, 9, 0.10)` (box-shadow btn) |
| `global.css:458` | `rgba(12, 11, 9, 0.05)` |
| `global.css:725` | `rgba(12, 11, 9, 0.28)` |
| `global.css:1148, 1450` | `rgba(12, 11, 9, 0.08)` |
| `tokens.css` (shadows) | `rgba(12, 11, 9, 0.07/.10/.18)` |
| `AuthorCard.astro:86,141` | `rgba(0,0,0,.08/.2)` (noir pur — doublon approximatif) |

#### Accent (201, 79, 46)
Utilisé à ~10 opacités différentes :

| Localisation | Valeur |
|-------------|--------|
| `global.css:173-186` | `rgba(201, 79, 46, 0.055)` et `rgba(201, 79, 46, 0.1)` |
| `global.css:234, 251` | `rgba(201, 79, 46, 0.22)` et `rgba(201, 79, 46, 0.28)` |
| `tokens.css:244` (shadow-cta) | `rgba(201, 79, 46, 0.18)` |
| `Pyramid.astro:157,172` | `rgba(201,79,46,0.025/.04)` |
| `Departments.astro:82` | `rgba(201,79,46,0.04)` |
| `SystemArchitecture.astro:71,85` | `rgba(201,79,46,0.06/.04)` |
| `FieldNotes.astro:80` | `rgba(201,79,46,0.04)` |

#### Paper (246, 241, 232)
Utilisé à ~12 opacités différentes, notamment dans les composants dark :

| Localisation | Valeur |
|-------------|--------|
| `global.css:382, 402` | `rgba(246, 241, 232, 0.78)` et `rgba(246, 241, 232, 0.92)` (header) |
| `global.css:1163, 1229` | `rgba(246, 241, 232, 0.1/.04)` |
| `FitColumns.astro` | `rgba(246,241,232,0.14/.5/.1/.14)` |
| `TerminalMockup.astro:42-50` | Multiples (calculées dynamiquement depuis prop) |
| `ChapterLabel.astro:24-25` | `rgba(246,241,232,.55/.35)` |
| `PillCTA.astro:37` | `rgba(246,241,232,.35)` |
| `TerminalCTA.astro:43` | `rgba(246,241,232,.3)` |
| `Kicker.astro:41` | `rgba(246,241,232,.5)` |
| `OperatingLayer.astro:100-115` | 12 opacités distinctes en inline style |

**Solution recommandée** : ajouter 3 canaux RGB dans `tokens.css` :
```css
--ink-rgb:    12, 11, 9;
--accent-rgb: 201, 79, 46;
--paper-rgb:  246, 241, 232;
```
Usage : `rgba(var(--ink-rgb), 0.08)` — un seul endroit à changer si les couleurs évoluent.

### C — Timings hardcodés non couverts par `--dur-*`

Valeurs trouvées dans les fichiers CSS (hors pattern fallback `var(--dur-X, YYYms)`) :

| Valeur | Localisation | Contexte |
|--------|-------------|----------|
| `280ms` | `global.css:217-221` (×5) | Transitions boutons (interactive) |
| `220ms` | `global.css:339,363,632-633,1026,1122` | Hover nav, délais |
| `320ms` | `global.css:1221,1384-1385` | Background transition, opacity |
| `10.5px` | `global.css:123,130,479,815,915,1174` | font-size intermédiaire (sans token) |
| `900ms` | `scroll-reveal.css:70,85` | `.reveal-mask-up`, `.reveal-zoom-in` |
| `1100ms` | `scroll-reveal.css:71,133` | `.reveal-mask-up`, `.reveal-curtain` |
| `1200ms` | `scroll-reveal.css:102-105` | `.reveal-blur-clip` |
| `520ms` | `scroll-reveal.css:163,164` | `.reveal-split-letter` |

Les valeurs `220ms`, `280ms`, `320ms` sont des intermédiaires UI absents du scale `--dur-*`. Candidats pour de nouveaux paliers ou tokens nommés sémantiquement.

### D — Courbes cubic-bezier hardcodées (hors pattern fallback)

| Valeur | Token équivalent | Localisation |
|--------|-----------------|-------------|
| `cubic-bezier(0.22, 1, 0.36, 1)` | `var(--ease)` | `MethodeProcessDiagram.astro:148` (JS), `AtlasConnections.astro:85` (JS) |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Aucun — bounce easing | `MethodeProcessDiagram.astro:156`, `AtlasConnections.astro:108` |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Aucun — Material ease | `SolutionsDetailTemplate.astro:543` |

Les fallbacks CSS dans `scroll-reveal.css` (format `var(--ease, cubic-bezier(...))`) sont légitimes et ne sont pas des hardcodes à corriger.

---

## Redondances / fusion

### 1. Double système de timing (critique)

Deux systèmes d'animation coexistent avec des valeurs non alignées :

| Système 1 | Valeur | Système 2 | Valeur | Alignés ? |
|-----------|--------|-----------|--------|-----------|
| `--reveal-slow` | 1400ms | `--dur-cinematic` | 1800ms | Non |
| `--reveal-med` | 1100ms | `--dur-deliberate` | 1200ms | Non |
| _(absent)_ | _(absent)_ | `--dur-slow` | 800ms | — |

`--reveal-slow` et `--reveal-med` sont des tokens legacy de l'ère « contemplative tempo » (5 + 2 usages). `--dur-*` est le scale moderne mais presque vide. Ces deux systèmes doivent être unifiés sous `--dur-*` avec les valeurs recalibrées.

**Recommandation de fusion** :
- `--reveal-slow` (1400ms) → `--dur-cinematic: 1400ms` (ajuster la valeur, actuellement 1800ms)
- `--reveal-med` (1100ms) → `--dur-reveal: 1100ms` (nouveau palier intermédiaire)
- Supprimer `--reveal-slow` et `--reveal-med` après migration

### 2. Double namespace couleurs (@theme vs :root)

Le bloc `@theme` reduplique 10 couleurs sous forme `--color-paper`, `--color-ink`, etc. Ces tokens Tailwind génèrent un namespace parallèle rarement utilisé (11 usages Tailwind vs 2000+ usages `var(--ink/paper/accent/...)`).

**Redondance** : `--paper` et `--color-paper` contiennent exactement la même valeur `#F6F1E8` — deux points de vérité divergents si l'une évolue sans l'autre.

**Option A** : laisser `@theme` pointer sur les tokens `:root` (Tailwind v4 le supporte) :
```css
@theme {
  --color-paper: var(--paper); /* au lieu de dupliquer la valeur hexadécimale */
}
```
**Option B** : Tailwind Utility-first only sur le périmètre concerné — ne conserver que les tokens réellement utilisés en classe Tailwind (`--color-muted` utilisé 10 fois).

### 3. Rythme sectionnel fragmenté

`--section-tight/base/loose/grand` (0-4 usages) coexistent avec `--spacing-section` (42 usages) et `--spacing-block` (13 usages). Les premiers sont des aliases de `--space-*` ; les seconds sont des `clamp()` directs.

En pratique, `--spacing-section` est le standard de facto. Les `--section-*` ont été créés pour une API plus sémantique mais ne sont pas adoptés.

**Recommandation** : promouvoir `--spacing-section`/`--spacing-block` comme standard officiel. Déprecier `--section-*` (4 usages seulement à migrer).

### 4. Échelle d'espacement surdimensionnée

17 paliers (`space-0` à `space-16`) mais :
- 6 paliers à 0 usage (space-0, 10, 12, 14, 16)
- 4 paliers à 1-2 usages (quasi-orphelins)
- Paliers actifs concentrés sur `space-2` à `space-9`

**Recommandation** : réduire à 10 paliers (`space-1` à `space-9` + `space-11`) ou éliminer les extrêmes non utilisés.

### 5. `.reveal` class définie deux fois

`global.css` et `scroll-reveal.css` définissent toutes deux une classe `.reveal` avec des comportements différents :

| Propriété | `global.css` | `scroll-reveal.css` |
|-----------|-------------|---------------------|
| `translateY` | `22px` | `12px` |
| `filter: blur()` | absent | `blur(8px)` |
| Token durée | `--reveal-slow` | `--dur-slow` |

CSS en cascade : `scroll-reveal.css` prend la priorité (chargé après). Mais `global.css` définit un `.reveal` mort — source de confusion et de bugs potentiels lors de modifications.

**Recommandation** : supprimer la définition `.reveal` de `global.css`, conserver uniquement celle de `scroll-reveal.css`.

### 6. Tokens couleur quasi-orphelins à merger ou supprimer

| Token | Usages | Valeur | Action |
|-------|--------|--------|--------|
| `--paper-3` | 1 | `#E6E0D0` | Supprimer si usage dispensable |
| `--ink-3` | 3 | `#2B2620` | Consolider sur `--ink-2` |
| `--accent-2` | 2 | `#A83D20` | Vérifier si hover state unique |
| `--accent-ink` | 2 | `#F6F1E8` | Alias de `--paper` — supprimer |
| `--muted-2` | 23 | `#9A948D` | Conserver (utilisé dans captions) |

### 7. grid.css — classes broken (bug actif)

`.g12--narrow`, `.g12--standard`, `.g12--wide`, `.g12--grand` référencent `var(--col-narrow)`, `var(--col-standard)`, `var(--col-wide)`, `var(--col-grand)` — tous supprimés en Phase D.1 (2026-05-15). Ces 4 classes CSS sont **silencieusement cassées** : elles compilent sans erreur mais la propriété `max-width` ne prend aucune valeur.

**Vérification** : `grep -rn "g12--narrow\|g12--standard\|g12--wide\|g12--grand" src` indique si ces classes sont utilisées dans les templates. Si oui, remplacer les tokens manquants par les valeurs `.wrap-*` équivalentes de `global.css`.

---

## Recommandation DS resserré

L'objectif est un DS pilotable par ~30-40 variables au lieu des ~95 actuelles — changer une valeur se propage partout.

### Tokens à supprimer (31 orphelins stricts)

**Sans risque de casse** (0 usage confirmé) :
- Aliases `--fg-*` (4 tokens) → utiliser les tokens base directement
- Z-index `--z-*` (6 tokens) → migrer vers valeurs littérales ou créer à la demande
- Durées inutilisées `--dur-instant`, `--dur-snap`, `--dur-slow`, `--dur-deliberate`, `--dur-cinematic` (5 tokens)
- Espacement haut `--space-0`, `--space-10`, `--space-12`, `--space-14`, `--space-16` (5 tokens)
- `--ease-sharp` (1 token)
- `--signature-angle` (1 token)
- `--text-mono-xs`, `--tracking-label`, `--text-eyebrow-lg`, `--text-drop-cap`, `--leading-h4` (5 tokens)
- `--section-tight` (1 token)
- `--grid-cols`, `--grid-gutter` (2 tokens)

### Tokens à ajouter (nouveaux besoins)

```css
/* Canaux RGB — éliminer les rgba() hardcodés dans tout src/ */
--ink-rgb:    12, 11, 9;
--accent-rgb: 201, 79, 46;
--paper-rgb:  246, 241, 232;
/* Usage : rgba(var(--accent-rgb), 0.08) */

/* Couleurs sémantiques manquantes (2 hardcodes répétés) */
--color-success: #2aa876;  /* conformité, badges positifs */
--color-error:   #c0392b;  /* erreurs formulaire */

/* Easing manquant */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);  /* utilisé dans SVG/motion */
```

### Tokens à consolider (unification timing)

Remplacer le double système `--reveal-*` + `--dur-*` par un scale unique :

```css
/* NOUVEAU scale unifié (valeurs recalibrées) */
--dur-fast:      200ms;   /* ✅ conservé — transitions UI micro */
--dur-interact:  280ms;   /* NEW — boutons, hover (remplace hardcode 280ms) */
--dur-nav:       220ms;   /* NEW — navigation, délais (remplace hardcode 220ms) */
--dur-base:      400ms;   /* ✅ conservé */
--dur-reveal:   1100ms;   /* NEW — fusionne --reveal-med */
--dur-slow:     1400ms;   /* RECALIBRÉ (était 800ms) — fusionne --reveal-slow */
/* Supprimer : --reveal-slow, --reveal-med */
```

### DS minimal cible (cross-projet)

Un DS réutilisable cross-projets n'a besoin que de :

**Couleurs (13 tokens essentiels)** :
```
--paper, --paper-2         → fonds
--ink, --ink-2, --muted    → textes (supprimer ink-3, paper-3 quasi-orphelins)
--hairline, --hairline-strong → séparateurs
--accent                   → brand (supprimer accent-2, accent-ink)
--ink-rgb, --accent-rgb, --paper-rgb  → canaux rgba
--color-success, --color-error        → feedback states
```

**Typographie (12 tokens essentiels)** :
```
--font-display, --font-sans, --font-mono
--text-h1-hero, --text-h2-section, --text-h3-row → titres (supprimer les variantes peu utilisées)
--text-body-md, --text-body-sm
--text-eyebrow, --text-lede, --text-caption
--tracking-mono  → seul tracking actif au-delà du défaut
```

**Easing (3 tokens)** :
```
--ease, --ease-out, --ease-bounce  (supprimer --ease-sharp)
```

**Layout (6 tokens)** :
```
--wrap, --wrap-wide, --wrap-tight
--gut, --header-height, --cookie-banner-height
```

**Espacement (10 paliers utiles)** :
```
--space-1 à --space-9, --space-11
(supprimer space-0, 10, 12, 13, 14, 15, 16 — remplacés par --spacing-section/block)
```

**Rythme sectionnel (2 tokens actifs)** :
```
--spacing-section: clamp(64px, 8vw, 96px)
--spacing-block: clamp(28px, 3vw, 48px)
```

**Durées (6 paliers unifiés)** :
```
--dur-fast, --dur-interact, --dur-nav, --dur-base, --dur-reveal, --dur-slow
```

**Total cible : ~52 tokens** vs ~95 actuels.
Gains : suppression de 31 orphelins + 3 canaux RGB qui remplacent ~60 `rgba()` hardcodés dans src.

### Bugs à corriger en priorité (avant tout DS cleanup)

1. **`grid.css:14-35`** — 4 classes cassées (`g12--narrow/standard/wide/grand`) : tokens supprimés, classes silencieusement broken. Vérifier usage dans templates et patcher ou supprimer.
2. **`global.css` ligne `h4 { font-size: var(--text-mono-sm) }`** — token `--text-mono-sm` inexistant (seuls `--text-mono-md` et `--text-mono-xs` existent). Remplacer par `--text-mono-md`.
3. **`.reveal` dupliqué** — supprimer la définition dans `global.css`, conserver `scroll-reveal.css`.
4. **SVG components** — 4 fichiers SVG utilisent `fill="..."` / `stroke="..."` avec la valeur hex brute `#C94F2E` au lieu de CSS currentColor ou `var(--accent)`.
5. **Tokens fantômes** — `--waimia-accent`, `--text-secondary`, `--text-muted` référencés mais non définis : les fallbacks inline masquent le problème mais créent une dette.
6. **Fallback erroné** `ScrollProgress.astro:23` : `var(--accent, #c07046)` — `#c07046` ≠ `#C94F2E`.

---

*Audit lu-seul — aucun fichier CSS modifié. Prochaine étape suggérée : créer une branche `chore/ds-cleanup` et appliquer les suppressions par groupe (orphelins → unification timing → canaux RGB).*
