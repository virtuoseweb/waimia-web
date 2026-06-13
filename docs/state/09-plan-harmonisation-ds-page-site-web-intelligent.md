# 09 — Plan unique : harmonisation DS + page `site-web-intelligent` (staté, par phases, GF-1)

> **Statut** : LIVE · créé 2026-06-13 (échange Simon revue live↔local). **Source de vérité d'exécution de ce chantier.**
> Enchaîne : compréhension → harmonisation hover → système de variante → complétion catalogue → recomposition page.
> Ne remplace pas le brief v6 (`docs/state/08`) : il le **prolonge** (le plan v6 reste, on améliore ce qui a été tranché).
> Taxonomie + décisions DS = à porter en source unique dans `docs/design-system/03-library-strategy.md`.

---

## 0. Déclencheur (faits vérifiés)

Revue Simon de la page `/services/site-web-intelligent` : **live** (`origin/main` = `c1d07a8`) vs **local** (`2cf528b`, P0.4, non poussé). La P0.4 a réécrit la page selon le brief v6 et, ce faisant, a **changé la composition** :

| LIVE `c1d07a8` (capturé par Simon, bon visuellement) | LOCAL `2cf528b` (ma P0.4) |
|---|---|
| `stats-bento` (impact chiffré, bento sombre/crème) | retiré → `comparison-table` (livrable↔effet, rendue **vide à l'écran** image #4) |
| `comparison-duo` (avant/après SANS/AVEC) | retiré → fondu dans `problem-statement`+`problems-grid` (visuel fort perdu) |
| `proof-bar`, `deliverables-grid` | retirés |
| — | ajoutés : `case-card-grid` (**bug hover**), `comparison-pricing-callout`, `pull-quote-block`, 2ᵉ `feature-split-media` |

Cause : le brief v6 (§4 #3 « fusion avant/après dans Problème » + §4 #9/P2 « 0 métrique répétée → table ») a tranché ces retraits ; exécution fidèle mais **sans questionner que `stats-bento`/`comparison-duo` étaient des sections au design fort**. Capitalisé : memory `feedback-question-brief-diff-existing-before-refonte`.

**`2cf528b` (P0.4) ne doit PAS être poussée en l'état** (moins bonne que la live). On la dépasse via ce plan.

---

## 1. Principes directeurs (non négociables, ce chantier)

1. **Conservation > suppression.** Tout ce qui a été généré correctement et catalogué (y compris les ajouts P0.4 : `case-card-grid`, `comparison-table`, `pull-quote-block`) **reste** et **enrichit** le catalogue (plus de variation = bien). On **choisit** ce qui va sur la page ; on ne perd rien.
2. **Non conforme DS ≠ à supprimer.** Si une section n'utilise pas bien le DS Studio → on la **remet en conformité** (bonnes variables, bonnes classes, sync DS Studio), on ne la jette pas.
3. **Catalogue cohérent et simple, sans éparpillement.** Réutiliser au maximum les mêmes classes/variables ; deux classes/variables qui servent le même objectif = signal d'éparpillement à unifier.
4. **Hover/anim reflow-safe, PAS sur-restrictif.** On **garde** les effets riches (growth/scale, bounce, lift, glow). L'invariant : l'effet ne doit pas provoquer de **reflow** (saut de ligne, layout cassé) du contenu ou des voisins. On vise le mode d'échec réel, on ne bannit pas des propriétés par prudence (memory `feedback-hover-reflow-safe-not-overrestrictive`).
5. **DS Studio = source de vérité du DS.** 0 nouvelle variable DS par réflexe ; nouvelles valeurs Tailwind / calculs / transparences sur variables existantes OK ; nouveau token uniquement comme acte délibéré (niveau 2 ci-dessous). Tout propagé au catalogue (4-5 touchpoints).
6. **GF-1 comparatif** sur toute modif de la page rendue : screenshot above-fold + `getComputedStyle` (opacity≠0, transform neutre) + 0 reflow au hover + comparaison live↔local (on ne régresse pas).

### Modèle de personnalisation à 2 niveaux (DS Studio)
- **Niveau 1 (courant, encouragé)** : changer la **valeur** d'un token DS → toutes les classes existantes se repeignent partout. **Aucune nouvelle classe.**
- **Niveau 2 (exception délibérée)** : créer **un nouveau token + une nouvelle déclinaison** (nouvelle classe) quand le besoin sort des standards. Surface dans le DS Studio comme un choix assumé, pas le réflexe.

---

## 2. Taxonomie canonique (à graver dans `design-system/03`)

Modèle à 4 niveaux emboîtés (adopté Simon 2026-06-13). Mnémotechnique : **Catégorie = à quoi ça sert · Famille = quelle structure · Variante = quel agencement · Déclinaison = quelle peau.**

| Niveau | Définition | Porté par | Exemple |
|---|---|---|---|
| **Catégorie** | Intention fonctionnelle. Menu haut-niveau du catalogue. | `/categories/[slug]` | `comparison`, `cta`, `stats/metrics`, `hero`, `pricing`, `proof/cas`, `faq` |
| **Famille** | Archétype **structurel** distinct dans une catégorie. **1 famille = 1 type Zod = 1 composant.** | type Zod + `*.astro` | dans `comparison` : `duo` (2 col. SANS/AVEC) · `table` (lignes livrable↔effet) · `pricing-callout` (3 profils) |
| **Variante** | Config **structurelle** de la famille, même composant. Choisie par props/enum. | props enum (`layout`, `columns`, `container`, `with-media`, `density`) | CTA : `container: band` (carré pleine largeur) vs `card` (arrondi contenu) ; table : 2-col vs 3-col |
| **Déclinaison** | **Skin/thème** sans changement de structure : palette, hover. | tokens DS via `data-bg` / `data-hover` | dark (`data-bg="ink"`) vs light (`paper`) ; `data-hover="tint" \| "lift" \| "surface"` |

Conséquences :
- **CTA arrondi/carré** = variante `container: band \| card` d'une famille `cta-final` (catégorie `cta`). → on **fusionne** `FooterCtaBand` + le pattern arrondi de l'organisme `BookSession` en une famille à variante de conteneur.
- **avant/après vs table** = **deux familles** de la catégorie `comparison` ; on garde les deux, on choisit par page.
- **stats-bento** = famille de la catégorie `stats/metrics`.
- Déclinaison dark/light **déjà câblée** (`background: enum(paper|paper-2|paper-3|ink)` → `data-bg`, présent 107/123 sections).

---

## 3. État vérifié (recon 2026-06-13, à confirmer en Phase A)

- **Sections concernées toutes déjà cataloguées** (registry) : `stats-bento`, `comparison-duo`, `comparison-table`, `case-card-grid`, `footer-cta-band`.
- **`comparison-table` (livrable↔effet) a bien ses données** dans le MDX (4 lignes) → le « vide » de l'image #4 est probablement un **problème de contraste sur fond `ink` ou de reveal parent**, PAS des données manquantes (à confirmer Phase A).
- **Idiomes hover divergents** : `case-card-grid` = surface beige (`paper-2`) + accent ; `comparison-duo` = teinte coral (`rgba(accent,0.1)`) ; `stats-bento` = lift (`translateY(-2px)`). → à unifier via tokens.
- **Bug hover `case-card-grid`** (`.cases-row:hover` ajoute `padding-inline:14px` → vole ~28px de largeur → colonne IMPACT 2→3 lignes). Reflow in-flow.
- **Valeurs en dur (hex/px hors `var()`)** : CaseCardGrid 26, ComparisonTable 23, ComparisonDuo 9, StatsBento 9, FooterCtaBand 2. → cibler **seulement** celles qui dupliquent un concept DS (éparpillement), pas les littéraux légitimes (1px border, grid px spécifiques). Pas de sur-tokenisation.
- **Dépendance reveal/JS** : CaseCardGrid, ComparisonDuo, StatsBento utilisent `reveal` → vérifier `prefers-reduced-motion` + fallback no-JS (cf brief v6 P1).

---

## 4. Phases (exécution séquencée, GF-1 par phase)

### Phase A — Compréhension profonde + conformité DS (audit, lecture seule)
- [ ] **A1** Pour chaque famille concernée (`stats-bento`, `comparison-duo`, `comparison-table`, `case-card-grid`, `footer-cta-band`, + organisme `BookSession`) : matrice **{ classes/variables DS utilisées · valeurs en dur à tokeniser (vraies divergences seulement) · variante(s) actuelle(s) · déclinaison dark/light présente ? · idiome hover · risques reflow }**.
- [ ] **A2** Confirmer la cause du « comparison-table vide » (contraste `ink` vs reveal parent) → faits, pas hypothèse.
- [ ] **A3** Porter la **taxonomie §2** + les **principes §1** dans `design-system/03` (source unique ; addendum daté, pas de doc parallèle — rule 59).
- **DoD A** : matrice écrite dans ce fichier (annexe) ; `design-system/03` à jour ; 0 modif de composant.

### Phase B — Harmonisation hover (tokens DS EXISTANTS) + fix reflow + sweep + gate
> **Correction 2026-06-13 (recon `tokens.css`)** : le plan initial proposait de créer des tokens `--hover-*`. Recon prouve que le DS a **déjà** tous les rôles → **0 nouveau token** (conforme règle figée « 0 nouvelle variable DS »). Harmoniser = router les `:hover` vers l'existant.
- [ ] **B1** **Mapping rôle hover → token EXISTANT** (aucune création) : durée `--dur-hover` (300ms) / `--dur-trim` (220ms micro) · easing `--ease` / `--ease-out` / `--ease-spring` (bounce) · surface `--paper-2` (clair) / `--ink-2`·`--ink-3` (ink) · tinte `rgba(var(--accent-rgb), .08–.1)` · ombre `--shadow-lift` / `--shadow-card-hover`. Distances de transform (`translateY(-2px)`, `scale(1.02)`) = **littéraux légitimes** (géométrie de l'effet), pas des tokens.
- [ ] **B2** Refactorer les `:hover` des 5 sections pour **consommer ces tokens existants** au lieu des valeurs en dur (260/280/300ms, hex, ombres ad hoc) → changer le token DS Studio repeint tous les hover.
- [ ] **B3** Offrir un menu **fini** de déclinaisons hover `data-hover="surface" | "tint" | "lift"` (chacune mappée aux tokens existants ci-dessus), défini en **global** (`global.css`, couche 2 partagée) — choix sans chaos, 0 nouveau token.
- [ ] **B4** **Fix bug `case-card-grid`** : réserver le décalage en base OU `transform: translateX` sur le contenu interne ; **garder** background + flèche + couleur. 0 reflow.
- [ ] **B5** **Sweep** : `grep` des `:hover` du catalogue touchant une géométrie in-flow (`padding|margin|width|height|gap|grid-template|font-size|font-weight|letter-spacing`) **sans réservation neutralisante** → corriger chacun en reflow-safe (transform/opacity/shadow). Les transforms (growth/bounce/lift) restent.
- [ ] **B6** **Gate `check-hover-reflow`** (modèle `check-no-emdash`) : échoue si un `:hover` introduit une géométrie in-flow non neutralisée. **N'interdit PAS** les transforms ni les effets.
- **GF-1 B** : sur `/preview/<type>` des sections touchées + page : hover déclenché en Playwright → mesurer que le nombre de lignes / la `boundingClientRect` du voisin **ne change pas** ; screenshot avant/au-hover ; 0 reflow.

### Phase C — Système de variante + fusion CTA band/card
- [ ] **C1** `sectionBaseSchema` mixin (background/palette/layout/density/effects) dans `sections.ts` (cf `design-system/03 §5 Phase B`) — formalise le niveau **variante** (today ad hoc, ~17 occurrences incohérentes).
- [ ] **C2** **Famille `cta-final`** : fusionner `FooterCtaBand` + pattern arrondi `BookSession` → variante `container: band | card` (card = coins arrondis + marge crème) + déclinaison dark/light. **Conserver** `FooterCtaBand` existant (alias/variante, pas suppression).
- [ ] **C3** Câbler `container`/`radius` sur un token DS (`--radius-section-card`) éditable DS Studio.
- **GF-1 C** : `/preview` CTA en variante `band` ET `card`, dark ET light, rendus corrects ; home `BookSession` inchangée visuellement (ou migrée vers la famille sans régression, GF-1 comparatif).

### Phase D — Complétion catalogue + sync DS Studio (conservation)
- [ ] **D1** Mettre en **conformité DS** (sans supprimer) les sections à valeurs divergentes (Phase A) : remplacer les vraies divergences par tokens/classes partagés ; 0 sur-tokenisation.
- [ ] **D2** Garantir **déclinaison dark/light** sur les familles clés (`comparison-duo`, `comparison-table`, `stats-bento`, `case-card-grid`, `cta-final`) si manquante.
- [ ] **D3** Vérifier les **4-5 touchpoints** (schéma + demos + registry + manifest + composant) synchronisés pour chaque section touchée ; sync DS Studio (token-driven).
- [ ] **D4** Optionnel selon Simon : **créer de nouvelles familles/variantes fusionnées** identifiées en route (ex. une `comparison` unifiée si pertinent) — uniquement si ça réduit l'éparpillement.
- **GF-1 D** : `npm run build` Complete! ; `/agence/design-system` + `/preview/<type>` des familles touchées rendus ; `check:touchpoints` vert.

### Phase E — Recomposition de la page (choix Simon)
- [ ] **E1** Rendre **côte à côte** (previews) les candidates pour chaque rôle : impact (`stats-bento` vs `comparison-table`), avant/après (`comparison-duo` vs problème fondu), CTA (`band` vs `card`). Simon **tranche**.
- [ ] **E2** Recomposer `site-web-intelligent.mdx` avec les familles retenues + variantes/déclinaisons, en respectant le rythme v6 (4 beats sombres) et les garde-fous brief §9.
- [ ] **E3** Corriger le breadcrumb / reflow / reduced-motion résiduels (brief v6 P1).
- **GF-1 E** : build Complete! + screenshot above-fold + `getComputedStyle` H1/CTA (opacity≠0) + 0 reveal bloqué + 0 reflow hover + **comparaison live↔local : la nouvelle page ≥ la live**. Puis seulement : push prod (après ton feu vert).

---

## 5. Décisions

**Actées (Simon 2026-06-13)** :
- Un seul plan staté (ce fichier), par phases, GF-1.
- Taxonomie 4 niveaux adoptée → à documenter dans `design-system/03`.
- Conservation : on ne supprime rien d'utile ; le catalogue croît ; non-conforme → remise en conformité, pas suppression.
- Garder `comparison-duo` ET `stats-bento` au catalogue ; choix page tranché en Phase E (rendus côte à côte).
- Hover : reflow-safe mais riche (growth/bounce conservés).
- Ne pas pousser `2cf528b` en l'état.

**À trancher (Simon, en Phase E principalement)** :
- Quelles familles vont sur la page pour chaque rôle (impact / avant-après / CTA).
- Opportunité de créer des familles/variantes fusionnées supplémentaires (D4).
- Migrer ou non `BookSession` (home) vers la famille `cta-final` unifiée.

---

## 6. Definition of done (chantier)
- Taxonomie + principes DS gravés dans `design-system/03` (source unique).
- Hover unifié par tokens DS Studio + 0 reflow au catalogue (gate vert) + effets riches conservés.
- Famille `cta-final` à variante band/card + déclinaisons dark/light.
- Catalogue : familles concernées conformes DS, sync DS Studio, touchpoints verts, rien supprimé.
- Page `site-web-intelligent` recomposée ≥ live (GF-1 comparatif) ; push prod sur feu vert Simon.

---

## Annexe A — Audit Phase A (2026-06-13, lecture seule)

Matrice par famille (DS conformité · variante · dark/light · hover · reflow · reveal) :

| Famille | Bug fond ink | Reflow hover | Reveal dépend IO externe | Hardcodes notables (à tokeniser sélectivement) |
|---|---|---|---|---|
| `CaseCardGrid` | aucun | **OUI** (`:hover` `padding-inline:14px` l71 vole la largeur → 2→3 lignes) | OUI (pas de script inline) | `90px` col l70, `14px` hover-pad l71, `18px` flèche l82 |
| `ComparisonDuo` | **PROBABLE** : `.card-title--with`/`.item--with` = `var(--ink)` (l131/157) non remappés en ink → invisible sur fond sombre | non | OUI | `1.6` line-height l149, `10px` badge l107 |
| `StatsBento` | **PROBABLE** : cells `--2/--3/--4` gardent `background:var(--paper)` (blanc) en ink → boîtes blanches sur section noire | non (transform + box-shadow only) | **porte le script IO** pour les autres | `0.65` opacity l129, `280ms` l97 |
| `ComparisonTable` | **CONFIRMÉ** : `:where(.comparison-table) td{color:var(--ink)}` (l168) + `.comparison-table__feature{color:var(--ink)}` (l177) NON remappés en ink ; règle directe bat l'héritage `color:var(--paper)` de l'ancêtre → **texte sombre sur fond sombre = la "table vide" image #4** | non | non (statique pur) | `14px` td-pad l169, `200px` min-width l162, `0.15s` l165 |
| `FooterCtaBand` | aucun (remap complet) | non | non | `0.66` opacity l88, `860px` bp l77, `22ch`/`52ch` l62/70 |
| `BookSession` (organisme home, dark absolu) | N/A | non | reveal non-standard (`reveal-mask-up`/`reveal-snap`) + `.in` (border-radius `32px`/`1200ms` l67) | radius `32px` l67 (= le « card » arrondi à tokeniser `--radius-section-card`) |

**Confirmations clés** :
- **Cause « comparison-table vide » (image #4) = CONFIRMÉE** : texte des `td`/`feature` non remappé en clair sur le beat sombre (règle directe `var(--ink)` bat l'héritage). Fix Phase B/D : `.comparison-table[data-bg='ink'] td, .comparison-table[data-bg='ink'] .comparison-table__feature { color: var(--paper); }`.
- **2 autres bugs de déclinaison ink** (même nature, non remap) : `ComparisonDuo` carte `--with`, `StatsBento` cells secondaires. → à corriger Phase D (conformité déclinaison dark, sans suppression).
- **Bug reflow `CaseCardGrid` = CONFIRMÉ** (`padding-inline` au hover). Fix Phase B (réserver l'espace / `translateX`, garder l'effet).
- **Dette reveal/JS** : `StatsBento` **porte le script IntersectionObserver** que `CaseCardGrid`/`ComparisonDuo` consomment → si une page utilise ces sections SANS `StatsBento`, leur contenu reste à `opacity:0` (risque « section vide »). À traiter (script reveal global, pas porté par une section) + fallback no-JS / `prefers-reduced-motion` (brief v6 P1).
- **`BookSession` radius `32px`/`1200ms`** = le pattern « card arrondi » → source du token `--radius-section-card` + transition pour la variante CTA `card` (Phase C).

**Statut Phase A** :
- [x] **A1** matrice ci-dessus.
- [x] **A2** cause comparison-table vide confirmée (texte ink non remappé).
- [x] **A3** taxonomie + principes gravés `design-system/03 §9.6` (+ cardinalité/synonymes).
