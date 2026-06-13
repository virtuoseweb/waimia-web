# DS-HEALTH-AUDIT — Santé du Design System Waimia (industrialisation)

> Audit de santé du Design System en vue de l'industrialisation (visual builder / DS Studio).
> Repo `waimia-web` · Astro 6 SSG · source de vérité prod `waimia.com`.
> Données : 4 scans (hardcoded-css structure · migration-gaps · class-consolidation · section-listing-format), recoupées contre le code réel (`src/styles/tokens.css`, `src/lib/section-registry.ts`).
> Ce doc est **agent-readable** : tables fichier:ligne → token cible, manifest par-section déterministe, séquençage à dépendances explicites. L'orchestrateur relit avant exécution — rien n'est marqué « validé ».

> ## ⚠️ VALEURS RE-MESURÉES 2026-06-13 (les compteurs de ce doc décrivaient un snapshot ANCIEN — utiliser CEUX-CI)
> Ce doc a été écrit avant l'expansion du catalogue (87→151 types) et avant les Waves de correction hardcoded. Chiffres faux corrigés (vérifiés contre le code, commandes reproductibles) :
> | Élément | Ce doc disait | **Réel 2026-06-13** | Commande |
> |---|---|---|---|
> | Entrées registry / types | 87 | **≈151** | `grep -cE "z\.literal\(" src/schemas/sections.ts` → 153 ; clés `SECTIONS` = 151 |
> | Composants `sections/*.astro` | 77 | **123** | `ls src/components/sections/*.astro \| wc -l` |
> | Templates | 18 | **13** | `ls src/components/templates/*.astro \| wc -l` |
> | Pages `.astro` | 112 | **83** (+11 endpoints `.ts`) | `find src/pages -name '*.astro' \| wc -l` |
> | Routes via `SectionsRenderer` | 3 | **13** | `grep -rln SectionsRenderer src/pages \| wc -l` (templates : 0) |
> | Tokens (noms uniques) | — | **≈121** | `grep -oE '^\s*--[a-z0-9-]+' src/styles/tokens.css \| sort -u \| wc -l` |
> | `#EFEBE2` fallback faux | ×9 à corriger | **0** (corrigé Wave 4.1) | `grep -rn '#EFEBE2' src/` → 0 |
> | `--accent-offre` bug | `CaseStudy:544` | **0** (corrigé Wave 4.1) | `grep -rn 'accent-offre' src/` → 0 |
> | `--paper-2: #EFE9DD` @ `tokens.css:11` | (juste) | **CORRECT** | `grep -n paper-2 src/styles/tokens.css` |
>
> **DETTE STRUCTURELLE du doc** : ces compteurs sont écrits à la main → ils re-divergeront. Action canonique (cf §6 L280, rule 18) : les faire **générer depuis le code** (script `gen-ds-registry.mjs` étendu) plutôt que les maintenir à la main. Les sections §3 (bugs `#EFEBE2`/`accent-offre`) sont **RÉSOLUES** — gardées pour l'historique, ne plus traiter comme actif.

---

## 1. TL;DR — état réel pour l'industrialisation

Le DS a une **fondation token saine** (palette, type, radius, durée, shadow définis dans `tokens.css`) et un **catalogue riche** (≈151 types en registry, 123 composants `sections/`), mais il n'est **pas encore une machine d'industrialisation** : à runtime, **13 routes sur 83** consomment le registry via `SectionsRenderer`. **0/13 templates** passent par le registry — chacun rend son body en markup inline. Résultat : le catalogue dispatche encore une fraction du markup live ; le gros reste markup local (templates + pages orphelines). Côté hygiène : le lot **21 hardcoded tokenisables** (dont `#EFEBE2` ×9 + `--accent-offre`) est **CORRIGÉ (0 restant, Wave 4.1)** ; reste un **sprawl de classes** scoped massif (~2 800 classes distinctes all-src — chiffre à re-générer, cf bannière). Naming non grep-able (abréviations `.k` `.t` `.wm` ambiguës).

**Verdict : DS opérationnel à ~60% pour un humain qui compose à la main ; ~20% pour un agent / visual builder qui doit composer de façon déterministe.** Le blocage n°1 vers le builder n'est pas l'hygiène CSS (cosmétique), c'est **l'adoption registry** : tant que les templates et hubs rendent du markup inline, le builder ne peut piloter que la fraction MDX. Chantier structurant = migration templates → registry + manifest par-section. L'hygiène CSS et la consolidation classes sont des pré-requis de **fiabilité** du builder, pas de faisabilité.

---

## 2. Backlog priorisé

Effort : S (≤ ½ j) · M (1-2 j) · L (3-5 j) · XL (> 1 sem). Risque GF-1 (régression visuelle prod).

| # | Chantier | Effort | Risque | Impact industrialisation | Dépend de |
|---|---|---|---|---|---|
| **A** | **Kill hardcoded — lot « tokenisable direct »** (21 hits, dont fallback `#EFEBE2`→`#EFE9DD` ×9, `ease` bare ×5, `#fff`→`--paper` ×3, radius/JS exacts) | S | Faible | Fiabilité builder (sortie déterministe, 0 valeur magique) | — |
| **B** | **Manifest par-section** (JSON+MD, 1 entrée/type registry : schema_fields + scoped_classes + tokens + data_coupling + agent_guide) | M | Nul (additif, 0 prod) | **Brique pivot du builder** : décrit comment personnaliser chaque section sans toucher au CSS | section-listing-format (spec ✓) |
| **C** | **Migration templates → registry** (18 templates, body inline → `SectionsRenderer`) | XL | **Élevé** | Débloque le pilotage builder sur ~58 pages (le Hero est déjà catalogué, le body non) | nouveaux types section (cf P3 migration) |
| **D** | **Consolidation classes** (5 groupes reveal fusionnables, utilitaires `display:none`/`color:accent` dupliqués, promotion `.wrap*`/`.btn-*`/`.sumie-*` en global) | M | Moyen (shadow Astro `.sec`) | Réduit la surface CSS que le builder doit comprendre ; supprime les doublons | A (tokens propres d'abord) |
| **E** | **Kill hardcoded — lot « token à créer »** (radius 6/9/10/14/16/18, durées 150/180/220/240, font-size fixes hors échelle clamp, couleurs sémantiques `#3a7d44`/`#7b4ea6`) | L | Moyen | Décision DS (étendre l'échelle vs accepter) — bloque la cohérence stricte | arbitrage Simon (DS figé) |
| **F** | **Naming gel** (pattern B `composant-role` systématique, interdire noms < 4 chars hors utilitaires documentés) | M | Faible | Grep-abilité agent (condition d'un builder qui édite par sélecteur) | D |
| **G** | **Orphelins pages hubs** (manifesto, console, *.index, landings → décomposer en sections registry) | XL | Élevé | Étend la couverture builder au-delà des templates | B, C |

**Ordre court (pré-builder) :** A → B (parallélisables) → D+F → C → E → G.

---

## 3. CSS hardcodé — table fichier:ligne → token cible

### 3a. Lot « TOKENISABLE DIRECT » (21 hits) — chantier A, faible risque

Remplacement 1:1 par un token existant. Vérifié contre `tokens.css`.

| Fichier | Ligne | Valeur | → Token | Contexte |
|---|---|---|---|---|
| `src/pages/comparer/[slug].astro` | 151 | `#fff` | `var(--paper)` | color sur fond ink |
| `src/pages/en/comparer/[slug].astro` | 151 | `#fff` | `var(--paper)` | color sur fond ink |
| `src/components/ui/molecules/TagPills.astro` | 50 | `#fff` | `var(--paper)` | color sur fond ink |
| `src/components/ui/molecules/AuthorCard.astro` | 85 | `#EFEBE2` | `var(--paper-2)` ❗ | **fallback FAUX** (token réel `#EFE9DD`) |
| `src/components/templates/OffresDetailTemplate.astro` | 615 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/templates/OffresDetailTemplate.astro` | 792 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/templates/SolutionsDetailTemplate.astro` | 481 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/templates/SolutionsDetailTemplate.astro` | 822 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/templates/TechnologiesDetailTemplate.astro` | 428 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/templates/TechnologiesDetailTemplate.astro` | 686 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/pages/archive.astro` | 169 | `#EFEBE2` | `var(--paper-2)` ❗ | fallback FAUX |
| `src/components/ui/atoms/TerminalCTA.astro` | 37 | `8px` | `var(--radius-md)` | border-radius (= md exact) |
| `src/components/ui/atoms/PillCTA.astro` | 33 | `999px` | `var(--radius-pill)` | border-radius |
| `src/components/motion/ProductReel.tsx` | 165 | `12` | `var(--radius-lg)` | borderRadius JS (12px = lg) |
| `src/components/motion/LiquidHero.tsx` | 11 | `#0C0B09` | `var(--ink)` | param canvas JS (lire CSS var au runtime) |
| `src/components/motion/LiquidHero.tsx` | 12 | `#C94F2E` | `var(--accent)` | param canvas JS |
| `src/components/motion/LiquidHero.tsx` | 13 | `#F6F1E8` | `var(--paper)` | param canvas JS |
| `src/components/templates/TechnologiesDetailTemplate.astro` | 747 | `ease` | `var(--ease)` | timing bare keyword |
| `src/components/templates/CaseStudyTemplate.astro` | 601 | `ease` | `var(--ease)` | timing bare keyword |
| `src/components/sections/HowWeShip.astro` | 99 | `ease` | `var(--ease)` | timing bare keyword |
| `src/components/ui/molecules/NewsletterSignup.astro` | 105 | `ease` | `var(--ease)` | timing bare keyword |
| `src/pages/api/og.png.ts` | 57 / 64 / 72 | `#1a1a1a` / `#666666` / `#F6F1E8` | `--ink` / `--muted` / `--paper` | SVG OG (valeurs littérales acceptables hors runtime CSS, à documenter) |

> ❗ **Bug de cohérence prioritaire** : le fallback `var(--paper-2, #EFEBE2)` est faux dans 9 fichiers. Si `--paper-2` est défini (cas normal), aucun impact visuel ; mais le fallback diverge du token (`#EFE9DD`) — dette silencieuse + signal d'erreur pour un agent qui lit la valeur. Corriger les 9 d'un coup.

### 3b. Lot « TOKEN À DISCUTER / créer » (120 hits) — chantier E, arbitrage DS

L'échelle réelle (vérifiée `tokens.css`) a des **trous** que ces hits exposent :

- **radius** : `xs=4 · sm=2 · md=8 · lg=12 · pill=999 · full=50%`. Hits hors échelle : `6px` (×5 — TerminalCTA, comparer FR/EN, NewsletterSignup, ConversionFunnel), `9px`/`9` JS, `10px` (×5 — console FR/EN, TerminalTable), `14px` (PricingTier), `16px` (AuthorCard), `18px` (EditorialCaseCard), `32px 32px 0 0` (BookSession). **Trou réel `8→12`** : aucun cran pour 9/10. Décision : créer `--radius-base: 6px` + `--radius-xl: 16px` ? ou accepter ces valeurs comme décoratives one-off ?
- **transition-duration** : `fast=200 · base=400 · reveal=1100 · slow=1400`. Hits : `150ms`, `180ms`, `220ms` (×8 — taxonomies/ressources), `240ms`, `600ms`, `720ms`. Le `220ms` récurrent (×8) justifie un cran `--dur-micro` ou `--dur-trim`. Les valeurs reveal (600/720) sont des animations bespoke (HowWeShip) → probablement à laisser local + commenter.
- **font-size fixes** : les tokens type sont des `clamp()` ; ces littéraux (`9/16/18/20/22/24/26/28/32/34/48/52/96px`) n'ont pas d'équivalent fixe. `16px` apparaît **22×** entre body-sm(14) et body-md(17) → candidat `--text-body-base: 16px`. `96px` ×2 = display décoratif (hors échelle, OK local). SVG OG (`72/60/24/20`) = attributs SVG, hors scope CSS.
- **couleurs sémantiques sans token** : `#3a7d44` (vert débutant/lecture ×4), `#7b4ea6` (violet avancé/projet ×4), `#2aa876` (teal), `#c0392b` (rouge erreur ×2), `#7FB069` (dev page compare), `#f59e0b` (amber — fallback d'un `--accent-offre` **inexistant** dans CaseStudy:544, bug à signaler), `#17140F` (dark ink variant), `#8B7355` (warm gold OG). → Décision : créer une mini-palette sémantique (`--level-beginner`, `--level-advanced`, `--state-error`) ou garder ces couleurs locales aux composants pédagogiques (EcoleHub/CourseDetail) ?
- **box-shadow custom** (10 hits) : aucune ne matche exactement `--shadow-*`. Variantes d'offset/opacité (`0 12px 36px …0.06`, `0 40px 120px …0.18`, etc.). Candidat : étendre l'échelle shadow ou tolérer les variantes éditoriales.

> ⚠️ **CaseStudyTemplate.astro:544** — `border-left: …#f59e0b` est un **fallback d'un token `--accent-offre` qui n'existe pas** dans tokens.css. À traiter comme bug (couleur orpheline), pas comme simple hardcode.

---

## 4. Migration — état des 18 templates + orphelins

### 4a. Fait structurant

**0/18 templates consomment le registry via `SectionsRenderer`.** Tous rendent leur body en markup inline (props → HTML propriétaire). Le **Hero** est catalogué (`sections/Hero*`) sur 15/18 ; le **body** reste inline partout. Seules **3 pages** (MDX `offres/[...slug]` FR+EN + test, via `useComposable`) consomment vraiment le registry à runtime.

### 4b. Tableau des 18 templates (par difficulté de migration croissante)

| Template | Total L | Body inline | Hero catalogué | Migrabilité | Note |
|---|---|---|---|---|---|
| `TrustLegalTemplate` | 88 | ~35 | (slot) TrustLegalSection ∈ registry | **Quasi-immédiate** | body = 1 section déjà cataloguée |
| `ListIndexTemplate` | 93 | ~40 | HeroCentered ∈ registry | **Facile** | HeroCentered + CtaBand suffisent |
| `UtilityTemplate` | 151 | ~60 | HeroCentered | Facile | léger |
| `WelcomeTemplate` | 197 | ~80 | (slot) WelcomeSection ∈ registry | Facile | slot-based |
| `DetailMenuTemplate` | 285 | ~110 | HeroCentered | Moyenne | ProofBar/MethodTimeline ∈ sections/ |
| `EcoleHubTemplate` | 286 | ~100 | HeroCentered | Moyenne | body minimal + couleurs `#3a7d44/#7b4ea6` |
| `HubTemplate` | 307 | ~110 | HeroHubStats | Moyenne | body inline |
| `ServiceDetailTemplate` | 312 | ~100 | HeroServiceDetail | Moyenne | ProofBand/MethodTimeline/CtaFinal ∈ sections/ |
| `TunnelStepTemplate` | 333 | ~100 | (HeroTunnelStep ∈ registry, non utilisé) | Moyenne | 2 sections inline |
| `LeadMagnetTemplate` | 366 | ~120 | HeroLeadMagnet | Moyenne | Pricing/Timeline/Dingbat inline |
| `CaseStudyTemplate` | 640 | ~162 | HeroCaseStudy | **Difficile** | sections importées en direct mais hardcodées ; bug `--accent-offre` |
| `EssayTemplate` | 649 | ~135 | HeroEssay | Difficile | body éditorial = candidat section `EssayBody` à créer |
| `CourseDetailTemplate` | 683 | ~202 | HeroCentered | Difficile | couleurs pédago hardcodées |
| `ConversionFunnelTemplate` | 719 | ~216 | HeroConversionFunnel | **Très difficile** | CSS inline spécialisé, parsing MDX complexe |
| `AuthorPageTemplate` | 976 | ~194 | HeroAuthor | Très difficile | Timeline/ProcessDiagram/Portrait inline |
| `TechnologiesDetailTemplate` | 918 | ~200 | HeroOfferDetail | Très difficile | 3-4 **nouveaux types** (positionnement/capabilities/models) |
| `SolutionsDetailTemplate` | 1094 | ~215 | HeroOfferDetail | Très difficile | 3 nouveaux types (friction/workflows/ROI) ; Solutions hero **non migré** (décision Simon) |
| `OffresDetailTemplate` | 1379 | ~339 | HeroOfferDetail | Partiel | déjà partiellement composable via bypass `useComposable` |

### 4c. Orphelins pages — top prioritaires (markup inline, 0 template)

~51 pages orphelines (~45% des 112), dont ~20 mirrors EN (coût 0 si FR migré).

| Rang | Fichier | Total L | Sections inline | Stratégie |
|---|---|---|---|---|
| 1 | `offres/site-web-ia-landing.astro` | 470 | 8 | landing 100% inline, 0 import sections/ — gros chantier isolé |
| 2 | `ressources/index.astro` | 452 | 4 | hub : 4 sections custom (tools/cases/cookbooks/nl) à cataloguer |
| 3 | `manifesto.astro` | 437 | 7 | markup très bespoke — coût élevé, faible réutilisation |
| 4-5 | `console.astro` / `en/console.astro` | 429 / 304 | 8 | TerminalMockup/ProductReel/EditorialWriteRow inline |
| 7-8 | `technologies/index.astro` (+EN) | 355 / 347 | 3 | hub layers/flagship/frameworks décomposable |
| 9 | `secteurs/index.astro` | 333 | 3 | hub-mast/hub-sectors-live/hub-cta-band |
| 14-15 | `solutions/index.astro` (+EN) | 300 / 298 | 3 | hub-mast/hub-solutions/hub-sectors |

**Organisms candidats catalogue (3 réels) :** `AtlasGrid` (124L, atlas FR+EN → `atlas-grid`), `PersonaSwitcher` (205L, atlas → `persona-switcher`), `BookSession` (82L, 5 pages → `book-session` ou extension `cta-final`). À NE PAS cataloguer : `Hero.astro` (381L, `@home-only`, **dépréciable** — doublon de HeroHome déjà ∈ registry), `CookiesBanner`/`FooterMarquee` (chrome global), `Stub` (placeholder).

---

## 5. Consolidation classes + verdict naming

### 5a. Magnitude

**1 480 classes scoped** (158 fichiers `.astro`) vs **174 globales** (registry `ds-registry.json`) — ratio **~9:1**. **1 434 classes mono-usage** ; 46 dans ≥2 fichiers, 15 dans ≥3. Sprawl massif.

### 5b. Top groupes de doublons (candidats fusion) — chantier D

| Groupe | N classes | Signature compilée | Action |
|---|---|---|---|
| Reset animation final (`reveal*`, `blur-in`, `clip-up`, `scale-in`…) | 11 + 8 + 5 = **plusieurs groupes** | `opacity:1;transform:none` (±`!important`/`clip-path`) | **1 seule `.is-revealed`** — fragmenté en 5 groupes distincts (groupes 2/5/10) à travers `scroll-reveal.css` + scoped |
| grid-column variantes (`col-1..12`, `col-aside`…) | 17 | `grid-column:1 / -1` | fusionner variantes grid identiques |
| `prefers-reduced-motion` (`btn`, `prose`, `mega`…) | 8 | `transition:none !important` | 1 utilitaire global |
| accent color (`dot`, `featured`, `wm`…) | 8 | `color:var(--accent)` | utilitaire `.text-accent` |
| `display:none` (`cta`, `hdr-nav`, `page-pill-*`…) | 6 | `display:none` | utilitaire `.hidden` / `@media` |
| eyebrow/kicker mono (`badge`, `k`, `mega-col-hd`…) | 4 | accent + mono + text-mono-xs | 1 classe `.eyebrow-mono` |
| `start-1..8` | 8 | `grid-column-start:auto` (= défaut CSS) | **supprimer** (no-op en état final) |

**`unusedTokens`** signalés : `--color-accent`, `--color-ink`, `--color-paper`… (les 10 alias `--color-*`) — non consommés car le code utilise les alias courts `var(--accent)`/`var(--ink)` directement. À nettoyer ou documenter comme alias morts.

### 5c. Candidats promotion (scoped récurrent → global)

| Classe | Fichiers | Action |
|---|---|---|
| `.wrap-wide` / `.wrap` / `.wrap-tight` | 20 / 4 / 3 | **déjà globales mais redéfinies scoped** → supprimer les redéfs, 1 source `global.css` |
| `.sumie-sector(-sm/md/lg)` | 9 fichiers Motif | extraire `svg/sumie/sumie-common.css` |
| `.btn-accent` / `.btn-light` | 3 chacune (templates Offres/Solutions/Tech) | passer en global avec les `.btn-*` |
| `.signature-grid` | 3 héros | classe globale section-level |
| `.sr-only` | 3 | **accessibilité standard** → 1 seule globale (ne jamais re-scoper) |

### 5d. Verdict naming

**Convention hybride non homogène, 3 systèmes coexistent :**
- **A — abréviations** (majoritaire global) : `.wm` `.hdr` `.sec` `.ttl` `.k` `.t` `.w` → **non grep-able, ambigu** (`.k` = signature partagée entre `mega-col-hd` et `badge`). Un agent ne peut pas cibler `.t` de façon fiable.
- **B — préfixe-composant** (meilleure pratique, présent scoped) : `.sysarch-hd` `.hdr-nav-item` `.mega-col-hd`. **Grep-able** (`rg '\.sysarch'` trouve tout). **Pattern cible.**
- **C — BEM partiel** : `.bento-grid__cell--1`, coexiste avec B sans règle `__` vs `-`.

**Incohérences concrètes** : `ds-registry.json` liste `reveal`/`in` en double ; `.sec` est globale ET scoped (3 composants, défs divergentes → **risque shadow Astro**) ; `.css` apparaît comme « classe » dans 6 fichiers = artefact de parsing de commentaires `/* tokens.css */`.

**Recommandation (chantier F, avant gel builder)** : adopter le pattern B systématiquement pour les globals, **interdire les noms < 4 chars** sauf utilitaires documentés (`btn`, `hdr`). Condition nécessaire pour un builder qui édite par sélecteur.

---

## 6. Format de listing par-section (spécification du manifest)

C'est la **brique pivot** du visual builder : 1 entrée déterministe par type registry, décrivant comment personnaliser sans toucher au CSS. Source : section-listing-format.

### 6a. Schéma JSON par section (draft-07)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "required": ["type", "file", "registry", "schema_fields", "scoped_classes", "tokens", "agent_guide"],
  "properties": {
    "type":         { "type": "string", "description": "Discriminant SectionType" },
    "file":         { "type": "string", "description": "Chemin absolu du .astro" },
    "schema_line":  { "type": "integer" },
    "registry_line":{ "type": "integer" },
    "registry_meta":{ "type": "object", "properties": {
      "category": {"type":"string"}, "subcategory": {"type":"string"},
      "tags": {"type":"array","items":{"type":"string"}},
      "status": {"enum":["stable","draft","deprecated"]} } },
    "schema_fields":{ "type": "array", "items": { "type": "object",
      "required": ["name","type","required"],
      "properties": { "name":{"type":"string"}, "type":{"type":"string"},
        "required":{"type":"boolean"}, "default":{}, "constraint":{"type":"string"} } } },
    "scoped_classes":{ "type": "array", "items": { "type": "object",
      "required": ["name","role"],
      "properties": { "name":{"type":"string"}, "role":{"type":"string"},
        "data_coupling": { "type":"array","items":{ "type":"object","properties":{
          "attr":{"type":"string"}, "values":{"type":"array","items":{"type":"string"}},
          "effect":{"type":"string"} } } } } } },
    "tokens":{ "type":"array","items":{ "type":"object",
      "required":["name","resolved"],
      "properties":{ "name":{"type":"string"}, "resolved":{"type":"string"},
        "role":{"type":"string"},
        "hardcoded_override":{"type":"string","description":"Littéral non-token utilisé à la place — signal de dette"} } } },
    "local_css_vars":{ "type":"array","items":{ "type":"object","properties":{
      "name":{"type":"string"}, "default":{"type":"string"},
      "overridable_via_prop":{"type":"string"} } } },
    "tailwind_utils":{ "type":"array","items":{"type":"string"} },
    "agent_guide":{ "type":"string","description":"Quel token/prop/champ toucher pour quel effet + dette signalée" }
  }
}
```

### 6b. Constantes de format (4, après lecture de 6 composants)

1. **Hiérarchie minimale = 5 blocs** : `schema_fields` + `scoped_classes` + `tokens` + `local_css_vars` + `agent_guide`. `tailwind_utils` rare (CSS scoped domine) mais champ obligatoire.
2. **`hardcoded_override` = dette détectable** : tout `clamp()`/px littéral non-token dans le composant doit être listé (ex. `.hero-detail__title` = `clamp(52px,7vw,112px)` alors que `--text-h1-hero` existe).
3. **`data_coupling` = levier n°1 de perso sans CSS** : indispensable pour `cta-band` (`data-bg`), `stat-block` (`data-layout`), `feature-grid` (`data-cols`).
4. **`local_css_vars` ≠ tokens globaux** : `hero-offer-detail` expose `--hod-wrap` (override via prop `wrapMax`) — point d'injection à lister séparément.

### 6c. Les 6 manifests de référence (verbatim, déjà extraits du code)

#### `feature-grid` — `src/components/sections/FeatureGrid.astro` · schema:819 · registry:510 (marketing / Feature Sections)
- **Props** : `kicker_fr/en?`, `h2_fr/en` (req), `features[3..8]{icon?,title_fr/en,body_fr/en}` (req), `columns:'2'|'3'|'4'`=`'3'`.
- **Classes** : `.feature-grid` `__header` `__list` (grid via `data-cols`) `__item` `__icon` `__title`.
- **Tokens** : `--spacing-section` `--spacing-block` `--hairline` `--space-4/-1` `--font-display/-sans` `--text-h2-section/-body-sm` `--leading-h3` `--fw-regular` `--ink` `--muted`.
- **Agent** : grille = `columns` (schema, 0 token). Espacement = `--spacing-section/-block`. **Dette** : titre item `clamp(16px,1.4vw,20px)` hardcodé dans `.feature-grid__title` → à tokeniser.

#### `hero-offer-detail` — `src/components/sections/HeroOfferDetail.astro` · schema:400 · registry:280 (marketing / Hero Header)
- **Props** : `hero_variant:'equilibre'|'showcase'|'encadre'?`, `breadcrumb_*?`, `tier_fr/en` (req), `h1_fr/en` (req), `lead_fr/en` (req), `cta{label_fr/en,href,variant,mag?}` (req), `meta_*?`, `tags[0..8]{label_fr/en}?`.
- **Classes** : `.hero-detail(--equilibre/--showcase/--encadre)` `__wrap` `__bc` `__eyebrow` `__title` `__sub` `__copy` `__lead` `__tags` `__tag` `__visual` `__art` `__sumie` `__actions` `__meta`.
- **local_css_vars** : `--hod-wrap` = `1320px` (override prop `wrapMax`). Partage le composant avec `hero-sector` + `hero-tech-layer`.
- **Tokens** : `--header-height` `--space-2..11` `--hairline` `--font-display/-mono/-sans` `--tracking-display/-mono` `--leading-h1/-lede` `--text-eyebrow/-mono-xs/-body-sm` `--fw-regular/-medium` `--radius-pill/-lg/-sm` `--ink` `--ink-2` `--muted` `--accent` `--paper` `--paper-2`.
- **Agent** : layout = `hero_variant` (schema, 0 CSS). Largeur = prop `wrapMax`→`--hod-wrap`. **Dette** : h1 `clamp(52px,7vw,112px)` hardcodé alors que `--text-h1-hero` (`clamp(40px,6vw,92px)`) coexiste.

#### `cta-band` — `src/components/sections/CtaBandSection.astro` · schema:912 · registry:590 (marketing / CTA)
- **Props** : `text_fr/en` (req), `cta{…}` (req), `background:'paper-2'|'ink'|'accent'`=`'paper-2'`.
- **Classes** : `.cta-band[data-bg]` (3 combinaisons bg+texte auto : ink/accent → texte paper) `__inner` `__text` (max-width 60ch).
- **Tokens** : `--hairline` `--space-5` `--font-sans` `--text-body-md` `--leading-body` `--ink` `--paper` `--paper-2` `--accent`.
- **Agent** : fond = `background` (schema, inverse le texte auto via `data-bg`). CTA = `cta.variant`. **Dette** : padding `20px` littéral dans `.cta-band`.

#### `faq-accordion` — `src/components/sections/FaqAccordion.astro` · schema:868 · registry:560 (marketing / FAQ)
- **Props (mode CMS)** : `kicker_*?`, `h2_fr/en` (req), `items[2+]{q_fr/en,a_fr/en}` (req). Mode Direct aussi (`items`+`heading`+`intro` inline).
- **Classes** : `.faq-accordion` `__header` `__intro` `__list` `__item`(`<details>`) `__q`(`<summary>`) `__q-label` `__arrow`(rotate 180 si open) `__a`.
- **Spécial** : `<details name="faq">` fermeture auto (0 JS) + **JSON-LD FAQPage auto** via `faqPage()`.
- **Tokens** : `--spacing-section/-block` `--hairline` `--space-4/-5` `--font-display/-sans/-mono` `--text-h2-section/-body-md/-body-sm` `--leading-h3` `--ink` `--muted`.
- **Agent** : contenu = `items` uniquement. **Dette** : `.faq-accordion__a p` max-width `64ch` littéral.

#### `stat-block` — `src/components/sections/StatBlock.astro` · schema:763 · registry:470 (marketing / Stats)
- **Props** : `h2_*?`, `lede_*?`, `metrics[1..8]{value,label_fr/en,emphasis}` (req), `layout:'grid-3'|'grid-4'|'rows-hairlines'`=`'grid-3'`.
- **Classes** : `.stat-block[data-layout]` `__header` `__grid` `__item` `__item--emphasis` (hook, sans CSS actuel) `__value` `__label`.
- **Tokens** : `--spacing-section/-block` `--hairline` `--space-2/-4/-5/-6` `--font-display/-sans` `--text-h2-section/-body-md/-body-sm` `--leading-h3/-lede` `--ink` `--muted` `--accent`.
- **Agent** : disposition = `layout` (schema). **Dette** : valeur `clamp(36px,5vw,64px)` hardcodée ; `--item--emphasis` sans style (hook libre).

#### `editorial-preview` — `src/components/sections/EditorialPreview.astro` · schema:1351 · registry:770 (marketing / Feature)
- **Props** : `kicker_*?`, `roman?`, `act_label_*?`, `aside_*?`, `h2_fr/en` (req), `items[2..8]{num,date_fr/en,tag_fr/en,label_fr/en,href}` (req), `all_label_*?`, `all_href?`.
- **Classes** : `.sec[aria-labelledby="notes-h2"]` `.notes-index` `.notes-row` (grid `48px 80px 110px 1fr 32px`) `-num` `-date` `-tag` `-text` `-arr` `.notes-foot(-link)`.
- **Tokens** : `--hairline(-strong)` `--font-display/-mono` `--text-eyebrow/-mono-xs/-body-sm/-h3-row` `--leading-h3` `--tracking-mono` `--ease` `--dur-fast` `--ink` `--ink-2` `--muted` `--accent` `--accent-rgb` `--wrap-read`.
- **Agent** : contenu = `items` ; en-tête = `roman`+`act_label_*`. **Dette** : grille `.notes-row` `48px 80px 110px 1fr 32px` hardcodée (modifier directement pour redistribuer).

### 6d. Rendu MD cible (exemple `cta-band`)

```markdown
## `cta-band`
> Bandeau CTA horizontal — fond configurable (paper-2 / ink / accent).
> CtaBandSection.astro · schema:912 · registry:590
### Props | Champ | Type | Req | Default |
text_fr/en (string, req) · cta ({…}, req) · background ('paper-2'|'ink'|'accent', non, 'paper-2')
### Classes & data-coupling
.cta-band[data-bg] — 3 combos bg+texte auto. .cta-band__text — max-width 60ch.
### Tokens : --hairline --space-5 --font-sans --text-body-md --leading-body --ink --paper --paper-2 --accent
### Personnalisation agent
Fond = `background` (0 CSS). CTA = `cta.variant`. Dette : padding 20px littéral.
```

> **Génération du manifest** : doit être **dérivée du code** (parse `sections.ts` + `section-registry.ts` + `<style>` de chaque `.astro`), pas écrite à la main (rule 18 — pas de descripteur JSON manuel). Les 6 ci-dessus = ground truth pour valider le générateur sur les 87 types.

---

## 7. Séquençage recommandé vers le visual builder

Dépendances explicites. Un chantier ne démarre qu'avec ses pré-requis verts.

```
PHASE 0 — Hygiène & fondations (parallélisable, faible risque)
  A. Kill hardcoded « direct » (21 hits, fallback #EFEBE2 ×9)   [S, faible]   ── indépendant
  B. Générateur de manifest par-section (parse code → JSON+MD) [M, nul]       ── indépendant (additif)
       └─ valider sur les 6 sections de référence (6c) avant les 87
  Bug à corriger en passant : --accent-offre inexistant (CaseStudy:544)

PHASE 1 — Lisibilité CSS pour agent (dépend de A)
  D. Consolidation classes (reveal → .is-revealed, utilitaires, promotions)  [M, moyen]
  F. Gel naming (pattern B, interdire < 4 chars)                              [M, faible]
       └─ D et F conditionnent un builder qui édite par sélecteur fiable

PHASE 2 — Décision DS (arbitrage Simon, DS figé)
  E. Token-gaps : radius 6/9/10, durées 220ms, font 16px, couleurs sémantiques [L, moyen]
       └─ NÉCESSITE arbitrage : étendre l'échelle vs accepter local
       └─ bloque la « cohérence stricte » mais PAS la faisabilité du builder

PHASE 3 — Adoption registry (le vrai déblocage builder, risque GF-1 élevé)
  C. Migration templates → SectionsRenderer                                   [XL, élevé]
       ordre : TrustLegal → ListIndex → Utility → Welcome   (P1, slot/léger)
            → DetailMenu → EcoleHub → Hub → Service → Essay  (P2, body décomposable)
            → Tech → Solutions → Offres                      (P3, nouveaux types requis)
       └─ DÉPEND de B (manifest = contrat de chaque section à composer)
       └─ DÉPEND des nouveaux types (P3) : positionnement/capabilities/models,
          friction/workflows/ROI, EssayBody — chacun = tâche dédiée 4-touchpoints
       └─ GF-1 par page sur preview Vercel avant merge main
  NE PAS migrer en 1er : ConversionFunnel, AuthorPage, CaseStudy (CSS+MDX complexes)

PHASE 4 — Couverture étendue (dépend de B+C)
  G. Orphelins hubs : décomposer solutions/tech/secteurs index → sections registry [XL, élevé]
       mirrors EN gratuits une fois le FR migré
       organisms à cataloguer : AtlasGrid, PersonaSwitcher, BookSession
  Déprécier Hero.astro (@home-only, doublon HeroHome ∈ registry)
```

**Dépendances avec DS Studio / builder :**
- Le builder ne peut piloter de façon déterministe que ce qui passe par le **registry** → **C est le goulot** (sans lui, ~92% du markup est hors de portée).
- Le builder a besoin du **manifest B** comme contrat machine (props éditables + data-coupling + tokens) → **B avant tout pilotage**.
- A/D/F sont des **conditions de fiabilité** (sortie déterministe, sélecteurs grep-ables) mais pas de faisabilité → peuvent avancer en parallèle de la conception builder.
- E est un **arbitrage produit** (DS figé) découplé du builder : à trancher avec Simon, ne bloque pas le MVP builder.

**Chemin critique MVP builder** : B (manifest généré + validé) → C-P1/P2 (templates légers/moyens migrés, GF-1) → builder pilote ces pages. P3/P4/E en parallèle ou après.

---

## 8. Chemins de fichiers clés

- **Tokens** : `src/styles/tokens.css` (radius:123-128 · dur:173-176 · shadow:239-246 · paper-2:11 = `#EFE9DD`)
- **Globaux** : `src/styles/global.css` · registry classes `src/data/ds-registry.json`
- **Catalogue** : `src/schemas/sections.ts` · `src/lib/section-registry.ts` · `src/lib/section-demos.ts` · `src/components/sections/*.astro` (77) · `src/components/SectionsRenderer.astro`
- **Templates** : `src/components/templates/*.astro` (18) · organisms `src/components/ui/organisms/*.astro`
- **Rendu composable** : `src/pages/offres/[...slug].astro` (`useComposable`) = seul pattern registry à runtime
- **Bugs ponctuels** : fallback `#EFEBE2` (9 fichiers, §3a) · `--accent-offre` inexistant (`CaseStudyTemplate.astro:544`)
- **Docs liés** : `docs/22-TEMPLATE-REGISTRY-MIGRATION.md` (runbook migration) · `docs/23-DS-TOKEN-COHERENCE-AUDIT.md` · `docs/20-DESIGN-SYSTEM-CATALOGUE-PLAN.md` · `docs/28-DESIGN-SYSTEM-CONTRACT.md` · `docs/19-DESIGN-SYSTEM-CLOSED.md`

> Audit factuel, recoupé au code. Aucun chantier n'est « validé » : l'orchestrateur relit et arbitre (notamment E = décision DS figé, et C = risque GF-1).
