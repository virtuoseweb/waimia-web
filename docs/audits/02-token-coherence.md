# 23 — Audit de cohérence des tokens DS (avant migration rgba → channels)

> **Objet** : avant toute migration, garantir que le design-system a un nombre **limité** de
> variables, **réutilisées** par les composants, sans doublon d'intention. Préparer le futur
> logiciel d'identité (« Tool D / brand-forge ») qui ne changera que les **valeurs** des tokens —
> les composants doivent déjà référencer les **bons noms canoniques**, byte-stable d'un site à l'autre.
>
> **Méthodo (exigée par Simon)** : on ne **compte pas** les usages pour conclure « pas de doublon ».
> Le fait qu'un composant utilise `--a` plutôt que `--b` qu'il aurait aussi pu utiliser ne prouve rien —
> juste que la construction initiale était biaisée (on a créé une valeur au lieu de réutiliser l'existante).
> On lit le **rôle réel** de chaque token. Et un token **avec valeur et usage** peut quand même être une
> **création non nécessaire** qui complexifie le DS pour rien. Chaque verdict est sourcé `fichier:ligne`.
>
> **Census fiable** : pattern *fallback-aware* `var(--x[,)]` (un token peut être consommé via
> `var(--x, fallback)` — le comptage naïf `var(--x)` rate ces usages et **rase du vivant**).
> Pièges réels rattrapés par cette rigueur : `--color-success` (compté 0 en naïf, en réalité utilisé
> dans `comparer/*`), `--text-drop-cap` (0 en naïf, 4 réels dans `DropCap.astro`).

Date : 2026-06-08 · Source de vérité tokens : `src/styles/tokens.css` (**283 l**, re-mesuré 2026-06-13 ; « 258 l » périmé · bloc `@theme` à L266).

---

## 0. Le constat structurant : **3 vocabulaires couleur coexistent**

C'est l'incohérence la plus coûteuse, née de constructions successives par des agents à contexte limité.

| # | Vocabulaire | Défini où | Exemple | Usages | Statut |
|---|---|---|---|---|---|
| 1 | **Canonique `:root`** | `tokens.css:8-61` | `var(--ink)` `var(--paper)` `var(--accent)` `var(--muted)` `var(--hairline)` | **2697** | ✅ **source de vérité** |
| 2 | **Tailwind `@theme`** | `tokens.css:239-257` | `var(--color-ink)` + classe `text-muted` | ~9 classes + ~20 `var(--color-*)` | ⚠️ doublon de #1 |
| 3 | **Generic « shadcn » fantôme** | *nulle part* (fallback-only) | `var(--color-surface)` `var(--color-border)` `var(--color-bg)` `var(--color-success-subtle)` | comparer/integrations/TunnelNav (FR+EN) | ❌ **hallucination AI** |

- **Vocab #2** : en Tailwind v4, `@theme { --color-ink: … }` émet `:root --color-ink` **et** la classe `bg-ink`/`text-ink`. Mais le code consomme `var(--ink)` (sans préfixe `color-`) **2697×**, qui vient du bloc `:root` séparé (#1). Donc `--ink` (#1) et `--color-ink` (#2) sont **deux variables distinctes de même valeur** → doublon de namespace. Seules 9 classes (`text-muted`×8, `border-paper`×1) + quelques `var(--color-muted/ink/accent/paper)` (comparer/integrations) consomment #2.
- **Vocab #3** : `--color-border`, `--color-surface`, `--color-bg`, `--color-success-subtle` ne sont **définis nulle part** — ils ne « marchent » que par fallback inline (`var(--color-surface, #fff)`). Conventions génériques qu'un agent a supposées au lieu de réutiliser `--paper`/`--hairline`/`--ink`. **Cas d'école de la divergence par hallucination.**

**Action cible** : rewire #2 et #3 → #1 (`--color-surface`→`--paper-2`, `--color-border`→`--hairline`, `--color-bg`→`--paper`, `--color-muted`→`--muted`, `--color-ink`→`--ink`, etc.), puis réduire le bloc `@theme` couleur au strict nécessaire (ou le supprimer en migrant les 9 classes). **3 systèmes → 1.** Gros rewire (~6 pages FR+EN + TunnelNav), **non byte-équivalent** (les fallbacks generic ≠ valeurs canoniques) → worker délégué + GF-1. Arbitrage feedback-green attaché (cf §4-A1).

---

## 1. BUCKET « vraiment morts » — 0 usage prod (rasage = pur retrait, build le prouve)

| Token | Valeur | Usage prod | Verdict |
|---|---|---|---|
| `--ease-bounce` | `cubic-bezier(.34,1.56,.64,1)` | **0** | mort — jamais branché |
| `--dur-interact` | `280ms` | **0** | mort |
| `--dur-nav` | `220ms` | **0** | mort |
| `--color-error` | `#c0392b` | **0** (défini, jamais référencé) | mort (cf arbitrage feedback §4-A1) |
| `--ease-default` (`@theme`) | `cubic-bezier(.22,1,.36,1)` | **0** | **artefact** ≡ `--ease` (`:root`) |
| `--ease-out` (`:root` l.49) | identique à `@theme` l.256 | doublon | **artefact** — défini 2× (identique) |

→ Rasage sûr, byte-équivalent. Le build vert prouve l'absence de référence cassée.

---

## 2. BUCKET « phantoms catalogue » — valeur + usage **UNIQUEMENT dans la vitrine** `agence/design-system.astro`

C'est le cas exact pointé par Simon : tokens **créés avec valeur**, « utilisés »… mais seulement dans la
page qui *montre* le DS, jamais dans une section produit. Enrichissement spéculatif jamais adopté.

| Token | Valeur | Seul usage | Verdict |
|---|---|---|---|
| `--text-h4-meta` | `clamp(14,1.1vw,16)` | `design-system.astro:249` | phantom → raser (token + ligne vitrine) |
| `--text-caption` | `12px` | `design-system.astro:269` | phantom (palier 12px distinct de body-sm 14px, jamais adopté) → raser |
| `--shadow-hairline` | … | `design-system.astro:298` | phantom catalogue |
| `--shadow-paper-lift` | … | `design-system.astro:302` | phantom catalogue |
| `--shadow-card-rest` | … | `design-system.astro:306` | phantom catalogue |
| `--shadow-card-hover` | … | `design-system.astro:310` | phantom catalogue |
| `--shadow-cta` | … | `design-system.astro:314` | phantom catalogue |

→ **Dette liée (arbitrage §4-A7)** : les vraies sections **hardcodent** `box-shadow: … rgba(0,0,0,.12)` (noir, **hors palette** — devrait être teinté `--ink`). Donc soit on **adopte** un token ombre canonique (teinté ink) dans les sections et on garde 1-2 `--shadow-*`, soit on rase les 5 et on tolère le hardcode. Décision design.

---

## 3. BUCKET « artefacts de doublon » — 2 tokens / même intention → garder le canonique sémantique

| Doublon | Canonique à garder | Pourquoi artefact | Byte-equiv ? | Rewire |
|---|---|---|---|---|
| `--text-mono-md` (11px) | **`--text-eyebrow`** (11px) | même rôle exact : label mono caps. `mono-md` vient de l'ancienne famille mono-{lg,md,sm,xs} ; `eyebrow` du pass sémantique W6. Convergés sur 11px pour la même chose. Le nom **sémantique** gagne (exprime l'intention, pas le slot police+taille). | **oui** (11≡11) | 9 usages + atome `Kicker.astro` (défaut `size=11` littéral → token) |
| `--text-display-md` (44/**6vw**/96) | **`--text-h2-grand`** (44/**7vw**/96) | même tier « titre géant H2-climax » Instrument Serif. La divergence 6vw/7vw n'est pas une décision design (personne ne règle volontairement 2 titres du même poids visuel à des vw différents) → artefact de 2 constructions. `display-md` vient de l'ancienne échelle display, `h2-grand` du pass sémantique. | **non** (6→7vw, delta intermédiaire) | 4 usages — **arbitrage léger §4-A3** |

> ⚠️ Distinct à NE PAS fusionner : `--text-h1-hero` (40/6vw/92) = H1 manifeste de page (1/page), rôle réel
> distinct du H2-climax. **Garder** (cf §5).

---

## 4. ARBITRAGES SIMON (raison réelle possible — jugement design requis)

| # | Sujet | Constat sourcé | Recommandation |
|---|---|---|---|
| **A1** | **Feedback couleur** | `comparer/[slug].astro:143-144` (FR+EN) : cellule « winner » en **vert** `var(--color-success,#16a34a)` + `--color-success-subtle` (fantôme). Token défini `#2aa876` ≠ fallback `#16a34a` → 3 verts incohérents, **hors palette** terracotta/parchemin. | Basculer la sémantique « winner » sur l'**accent terracotta** `--accent` (DS chaud, **0 vert**). Supprimer `--color-success/-error/-success-subtle`. |
| **A2** | **Channels rgba** | `--ink-rgb/--accent-rgb/--paper-rgb` = **0 usage** vs **191 `rgba()` bruts** dans les sections. Les channels sont le **mécanisme cible non adopté**, pas un doublon. | **Adopter** : migrer 191 rgba → `rgba(var(--ink-rgb),α)`. C'est précisément ce qui permet à Tool D de repeindre les teintes en swappant 1 valeur. (Alternative : abandonner = YAGNI, mais on perd le single-source des teintes.) |
| **A3** | `display-md`→`h2-grand` | harmonise 6vw→7vw | Oui — artefact ; delta visible seulement à viewport intermédiaire, GF-1 le confirmera. |
| **A4** | `--leading-display` .94 vs `--leading-h1` .96 | 2 valeurs très proches, même tier titre géant (`global.css:64` vs `BookSession.astro:73`). | Fusionner en 1 (garder `.96`/`--leading-h1` sémantique, rewire l'autre). Léger. |
| **A5** | `--leading-loose` 1.55 vs `--leading-body` 1.5 | 1 seul usage `!important` (`OffresDetailTemplate.astro:972`). | Fusionner → `--leading-body`. |
| **A6** | Scale tail `--space-13/14/15` (160/200/256) | ~1 usage direct chacun ; 13/15 alimentent `--section-loose/-grand`. | **Garder** la grille 8pt **complète** (échelle régulière = plus prévisible pour la génération ; coût d'1 def ≪ valeur systématique). |
| **A7** | Ombres (cf §2) | 5 `--shadow-*` catalogue-only ; sections hardcodent `rgba(0,0,0)` noir hors-palette. | Adopter `--shadow-card-rest/-hover` (teinte ink) dans les sections, raser les 3 autres + les rgba noirs. |

---

## 5. RAISON RÉELLE CONFIRMÉE — **PAS des doublons** (intentions distinctes, garder + justifier)

| Tokens | Pourquoi distincts (rôle réel lu) |
|---|---|
| `--text-h1-hero` (40/6vw/92) ≠ `--text-h2-grand` (44/7vw/96) | H1 manifeste de page (1 seul/page) vs H2 climax cinématique. Min/max distincts. |
| `--spacing-section` (clamp 64-96 **padding** responsive) ≠ `--section-base` (96 **marge** fixe) | padding interne de section vs marge inter-sections. *Dette* : 2 systèmes de rythme vertical (W6 transitoire `--spacing-*` vs canonique `--section-*`) coexistent → à converger un jour (hors scope cohérence). |
| `--gut` (responsive 32/20/16) ≠ `--space-6` (32 fixe) | gouttière de grille responsive vs pas d'échelle fixe. |
| `--text-drop-cap` (DropCap.astro) · `--text-pull-quote` (PullQuote.astro) | **vivants** : consommés par des atomes éditoriaux réels (eux-mêmes utilisés par HeroHubStats/Hub/OffresDetail templates). ⚠️ `--text-drop-cap` : token `6vw` mais fallback inline `8vw` dans DropCap → incohérence latente à aligner. |
| Famille `--leading-{h1,h2,h3,body}` · `--tracking-{display,body,mono}` | échelles par tier, usages réels distribués (h2×9, h3×6, tracking-mono×33…). Cohérentes. |
| `--col-full` = `var(--wrap)` | alias légitime documenté (consommé par `grid.css .g12--full`). |

---

## 6. Plan d'exécution par vagues

| Vague | Contenu | Risque | Validation |
|---|---|---|---|
| **V1** (sûr) | Raser BUCKET 1 (6 tokens 0-usage) | nul (byte-equiv) | build vert |
| **V2** | BUCKET 3 `mono-md→eyebrow` (byte-equiv) + atome Kicker | faible | build + GF-1 |
| **V3** (arbitrage) | BUCKET 2 phantoms catalogue + ombres (A7) | faible | build + GF-1 vitrine |
| **V4** (arbitrage A1) | **3 vocab couleur → 1** : rewire comparer/integrations/TunnelNav + réduire `@theme` | moyen | GF-1 prod comparer/integrations FR+EN |
| **V5** (arbitrage A2) | Migration **191 rgba → channels** | moyen (volume) | GF-1 + check-token-purity |
| **V6** (arbitrages A3-A5) | Fusions leading + display→h2-grand | faible | GF-1 |

> Chaque vague = 1 branche `feat/ds-coherence-vN`, worker délégué (GF-2), GF-1 sur preview Vercel avant merge `main`.
> `scripts/check-token-purity.mjs` (déjà en CI) verrouille l'anti-régression hex brut ; à étendre aux rgba bruts après V5.

> **ÉTAT 2026-06-08** : V1→V4a + V6 mergés sur `main` (tokens.css 111 → 100 défs). V4b foldé dans la finale couleur (conflit V4a∥V4b). Audit étendu ci-dessous (§7) → la finale couleur devient un **codemod byte-équiv** (rgba→channels) au lieu d'un rewire manuel.

---

## 7. AUDIT EXHAUSTIF near-duplicates (2026-06-08, 3 agents read-only) — reframe

**Conclusion qui change le diagnostic** : le DS a un **bon jeu de tokens**, mais ils sont **massivement contournés par des littéraux** (+ variantes near-miss créées au lieu de réutiliser). L'incohérence n'est pas « trop de tokens » mais « tokens non-enforced ». Foyer = `src/styles/global.css` (~60 % des occurrences). 4 buckets :

### Bucket A — Littéraux == valeur d'un token (BYTE-ÉQUIVALENT, tokeniser = 0 pixel changé)
Grosse victoire d'industrialisation (DS vraiment token-driven → Tool D repeint en swappant 1 valeur). Sûr.

| Littéral | = Token (valeur exacte) | Compte |
|---|---|---|
| `font-size: 11px` | `--text-eyebrow` | **202** |
| `font-size: 14px` | `--text-body-sm` | 76 |
| `font-size: 10px` | `--text-mono-xs` | 38 |
| `font-size: 17px` | `--text-body-md` | 17 |
| `line-height: 1.5` | `--leading-body` | 76 |
| `line-height: 1.1` | `--leading-h3` | 45 |
| `line-height: 0.96 / 1.02` | `--leading-h1 / -h2` | 26 / 12 |
| `letter-spacing: 0.12em` | `--tracking-mono` | 42 |
| `letter-spacing: -0.025em / -0.005em` | `--tracking-display / -body` | 26 / 16 |
| `200ms / 1100ms / 1400ms` | `--dur-fast / -reveal / -slow` | 43 / 5 / 2 |
| `cubic-bezier(.22,1,.36,1)` | `--ease` | 22 |
| `rgba(246,241,232,x)` | `rgba(var(--paper-rgb),x)` | 82 |
| `rgba(0,0,0,x)` *(noir→encre chaude)* | `rgba(var(--ink-rgb),x)` | 49 |
| `rgba(12,11,9,x)` | `rgba(var(--ink-rgb),x)` / `--hairline(-strong)` | 36 |
| `rgba(201,79,46,x)` | `rgba(var(--accent-rgb),x)` | 10 |
| hex nus `#0C0B09/#C94F2E/#EFE9DD` *(CSS only, pas SVG/JS)* | `--ink / --accent / --color-paper-2` | 42 |

### Bucket B — Near-dups (valeur légèrement ≠ → snapper) — NON byte-équiv, GF-1
Le cas exact de Simon : valeur créée au lieu de réutiliser. À collapser pour un cadre restrictif.

| Famille | Variantes créées | Canonique | Compte |
|---|---|---|---|
| Durée UI | `220ms` (114), 240/280/320ms | `--dur-fast` 200 (ou créer `--dur-ui` 220 si 114× justifie) | ~200 |
| font-size corps | `13px` (68), `12px` (65), `15px` (40) | `--text-body-sm` 14 | ~250 |
| line-height corps | `1.55` (62), `1.6` (51), `1.4` (56) | `--leading-body` 1.5 | ~250 |
| tracking | `0.14em` (51), `0.1em` (48), `0.08em` (32) | `--tracking-mono` 0.12 | ~130 |
| near-black | `#111` / `#1A1A1A` (14) | `--ink` | 14 |
| Tailwind grays | `#6B7280/#F9FAFB/#e5e7eb` (comparer/integrations) | `--muted / --paper / --hairline` | ~30 |
| largeurs | `1100/1200/1240px` ≈ `--wrap-tight` 1120 ; `1400/1500` ≈ `--wrap(-wide)` | wrap tokens | ~60 |
| terracotta bâtard | `rgba(181,71,42)` | `--accent` (201,79,46) | 2 |

### Bucket C — GAPS (aucun token → fragmentation pure ; créer échelle restreinte = rule 28 tâche dédiée)
| Catégorie manquante | Paysage actuel | Échelle minimale proposée |
|---|---|---|
| **Rayons** (0 token) | `2px`×39, `4px`×12, `8px`×5, `12px`×3, `999px`×9, `50%`×12 | `--radius-sm:2 -md:8 -lg:12 -pill:999` + `50%` |
| **Font-weight** (0 token) | 400×258, 500×57, 600×29, 100×8 | `--fw-regular:400 -medium:500 -semibold:600` |
| **Largeur prose** (0 token) | 720×31, 900×46, 640×30 | `--wrap-prose:720 --wrap-read:900` |
| **Easing spring** (0 token) | `cubic-bezier(.34,1.56,.64,1)` ×3 | `--ease-spring` |

### Bucket D — Hors-palette sémantique (raison réelle possible → arbitrage)
- Couleurs catégories pédagogiques `#3A7D44`/`#7B4EA6`/`#7FB069` (EcoleHub/CourseDetail) — système difficulté. Intentionnel ou brandifier ?
- Taxonomy `#1E40AF/#7C3AED/#EA580C` (`taxonomies.ts`).
- Feedback `--color-success/-error/-success-subtle` (verts/rouges hors-palette).

### Bugs latents (à corriger quel que soit l'arbitrage)
- Tokens **référencés mais supprimés/jamais définis** (marchent par fallback) : `--color-surface/-border/-success-subtle`, `--shadow-lift`, `--text-primary`, `--font-body`.
- `EssayTemplate` : `rgba(255,255,255,0.15)` reliquat dark-mode, **polarité inversée** → `rgba(var(--ink-rgb),0.18)`.
- `archive.astro` : fallback `cubic-bezier(0.2,0.8,0.2,1)` ≠ `--ease` (piège silencieux).
- `design-system.astro:163` : label `--muted-2` avec valeur fausse `#9A948D`.

### Recommandation d'industrialisation
1. **Codemod déterministe** `scripts/tokenize-literals.mjs` pour Bucket A (byte-équiv, CSS-only `.astro <style>` + `.css`, exclut `.tsx/.ts/SVG`). 0 pixel changé.
2. **Étendre `check-token-purity.mjs`** : interdire en CI un littéral == valeur d'un token (anti-régression → DS reste enforced).
3. **Bucket B** : snapper par famille, GF-1 (cadre restrictif voulu).
4. **Bucket C** : créer échelles `--radius-*/--fw-*/--wrap-prose/--ease-spring` (rule 28).
5. **Bucket D** : arbitrage Simon.

## 8. ANALYSE FINE DU RÔLE (cran vs dérive) + arbitrage d'échelle — 2026-06-09

> Trigger Simon : « le fait qu'un composant utilise une variable et pas une autre ne prouve pas qu'on n'a pas un doublon… cela demande un audit de profondeur de lecture et d'analyse réel » + « ne pas créer de variables même valeurs ≠ alors qu'on aurait dû réutiliser… un cadre restrictif, un DS réellement industrialisable ».

3 agents read-only ont lu le **rôle réel** de chaque near-dup (pas juste le compte). **Principe d'arbitrage retenu** (réconcilie « tout snapper » + « cadre restrictif » + « ne pas dégrader ») :
- **Cran intentionnel** (rôle distinct récurrent, ≥ ~15 usages, valeur ronde) → **FORMALISER** en token = créer le token à la valeur exacte + tokeniser les littéraux exacts = **byte-équivalent (0 pixel changé)**. Industrialise sans rien casser.
- **Dérive** (même rôle qu'un cran voisin ; demi-pixels ; valeur « bâtarde ») → **COLLAPSE** vers le canonique = **changement de valeur perceptible** → vague séparée GF-1 (jamais mélangé à du byte-équiv).
- **Stagger / ambiance / morph chorégraphique** → **INTOUCHABLE** (séquences arithmétiques de delay, loops infinis, state-machines couplées).

État empirique confirmé (grep property-anchored, hors `var(`) : font-size 13px×66 / 12px×65 / 15px×39 / **demi-pixels** 10.5×32 13.5×9 12.5×9 11.5×7 14.5×6 (dérive systémique) ; line-height 1.55×62 1.6×51 1.4×56 1.65×20 ; tracking 0.14em×51 0.10em×48 0.08em×32 ; radius 4px×16 50%×15 ; durée 220ms×96 (≠ `--dur-fast` 200) 240×27 320×22 280×14.

### V9c — FORMALISATIONS byte-équivalentes (0 risque, à exécuter) — 7 tokens
| Nouveau token | Valeur | Rôle prouvé | Occ. exactes |
|---|---|---|---|
| `--text-caption` | 12px | captions / pills / badges mono | 65 |
| `--text-ui` | 13px | boutons (`.btn`) / nav / chrome UI | 66 |
| `--text-body-lead` | 15px | corps prose intermédiaire (14↔17) | 39 |
| `--leading-lede` | 1.4 | lede hero / sous-titres display (18–32px) | 56 |
| `--leading-prose` | 1.65 | corps long de lecture (articles, FAQ, glossaire) | 20 |
| `--radius-xs` | 4px | inputs / focus-visible / form (cran manquant sm↔md) | 16 |
| `--radius-full` | 50% | cercles / avatars / dots (distinct de pill 999px) | 15 |

Tokeniser uniquement les **littéraux == valeur exacte** (lookahead strict : `1.4` ≠ `1.45`, `4px` ≠ `40px`). Gate `check-token-purity` étendu (anti-régression). ~280 occ → tokens, 0 pixel changé.

### Vagues PERCEPTIBLES différées (changement de valeur → GF-1 visuel par page, NE PAS byte-équiv)
- **V9d — demi-pixels** : 10.5/11.5/12.5/13.5/14.5/15.5px → entier proche (10.5→11, 12.5→13(`--text-ui`), 13.5→13, 14.5→14, 15.5→15). Sub-pixel, faible risque mais perceptible cumulé.
- **V9e — line-height corps** : 1.55(62)+1.6(51) → `--leading-body` 1.5 (rythme vertical). Gros volume, reflow léger.
- **V9f — tracking** : 0.08/0.10/0.14em — **probable dérive** autour de ~0.1em (continuum d'emphase, pas crans nets) ; arbitrage : 1 seul `--tracking-label` (~0.1em) + recalibrer `--tracking-mono` 0.12→ ? Letter-spacing perceptible sur uppercase.
- **V9g — durées** : recalibrer `--dur-fast` 200→220ms (96 littéraux de facto) puis créer `--dur-hover:240` / `--dur-follow:320` (crans réels). Touche le « feel » (53 usages var existants passent 200→220). GF-1 difficile en statique.
- **V9h — collapses divers** : 16px corps→15 ; radius 6→4 ; near-dups largeurs wrap 1100/1200/1240→`--wrap-tight` 1120.
- **Outliers laissés** : flèches mono 16/18px (iconiques), drop-cap 0.85, H1 optical-sizing 0.88/0.92/0.94 (1 seul `--leading-h1` 0.96 suffit, sinon dérive de raffinement), 32px radius morph, durées d'ambiance s, stagger.

**Refus explicite du sur-formalisme** (caveat « ne pas créer de tokens inutiles ») : on NE crée PAS de token demi-pixel (10.5/11.5…), NI 4 variantes `--leading-h1` (0.88/0.92/0.94/0.96 → un seul cran), NI 5 trackings entre 0.06–0.14em. Le DS reste restrictif : un cran = un rôle distinct + un volume réel.

## 9. REPAINTABILITÉ COMPLÉTÉE + audit d'usage exhaustif — 2026-06-09

> Suite logique de §8 (formalisation byte-équiv) : fermeture de la **surface repaintable** (prérequis outil identité / Tool D) + réponse chiffrée à la requête gouvernante « y a-t-il des tokens sur-créés / des doublons de rôle mal réutilisés ? ».

### 9.1 — Vagues byte-équivalentes EXÉCUTÉES (0 pixel changé, GF-1 prod/dist validé, gate étendu)
| Vague | Commit | Portée | Preuve GF-1 |
|---|---|---|---|
| **V9-SVG** | `7da924f` | 36 hex marque en `fill=`/`stroke=` → `var(--token)` sur 6 `.astro` (sumie/* + technologies FR+EN) | prod `waimia.com/technologies` : `var()` résout aux rgb d'origine (ink 12,11,9 · accent 201,79,46 · muted 107,101,96 · paper-2 239,233,221) + repaint emerald + 0 erreur console |
| **V9-RGBA** | `0595ada` | 9 `rgba(246,241,232,X)` (hairlines on-dark : Masthead/Terminal/ChapterLabel/Kicker/PillCTA/TerminalCTA) → `rgba(var(--paper-rgb),X)` | dist `/cas/plateau` : `rgba(246,241,232,.55)` identique → repaint `rgba(14,124,102,.55)` (alpha préservé) |
| **V9-RGBA-contract** | `7c57101` | 5 rgba marque HARDCODÉES dans `tokens.css` (`--hairline` ×616, `--hairline-strong`, 3 ombres) → canaux, alignées sur `--shadow-lift` déjà correct | dist : `--hairline` rend `rgba(12,11,9,.09)` identique **et** suit désormais un swap `--ink-rgb` (avant : hardcodé → ne suivait pas) |

**Surface repaintable = COMPLÈTE** : composants (CSS sections, V8/V9b-d) + SVG inline (V9-SVG) + rgba composants (V9-RGBA) + **contrat lui-même** (V9-RGBA-contract). Le gate `check-token-purity` bloque en CI toute réapparition d'hex/rgba de marque, **y compris dans `tokens.css`**. Un swap des canaux (`--ink-rgb`/`--accent-rgb`/`--paper-rgb`) + des hex de surface (`--paper`/`--ink`/`--accent`…) repeint désormais 100% du rendu, hairlines et ombres comprises.

> Hors-scope repaintabilité (légitimement hex brut, var() inapplicable) : `LiquidHero.tsx` (canvas WebGL), `og.png.ts` (génération image serveur), `components/emails/*` (clients mail sans var()). Exclus du gate à dessein.

### 9.2 — Audit d'usage EXHAUSTIF : 0 token mort (réfute « tokens sur-créés »)
Comptage `var(--x)` + utilitaires Tailwind sur tout `src/` (hors `tokens.css`). **Tous les tokens du contrat sont consommés** — y compris les extrêmes :
- Couleurs : la plus basse = `--accent-ink` ×2, `--ink-3` ×4, `--paper-3` ×5, `--accent-2` ×7, `--muted-2` ×19. Aucune morte.
- Spacing : `--space-15` (256) = 0 usage direct **mais** consommé via `--section-grand` (chaîne intentionnelle breakout signature). `--space-12/13/14` = 3/2/1 — extrêmes rares mais l'intégrité de l'échelle 8pt prime sur le compte (retirer = échelle trouée).
- Ombres : chacune ×1 (tokens de traitement de surface nommés — single-use normal pour un DS).
- Headings V6, leading/tracking, radius, weights, durées : tous ≥ 2 usages, rôles distincts.

→ **Verdict : pas de gisement « token inutile à raser ».** Les passes de cleanup antérieures (Phase D.1, ds-cleanup 2026-06-04, Fusion A3, V2 cohérence) ont déjà purgé les morts. Le contrat est dense.

### 9.3 — Incohérences RÉSIDUELLES (perceptibles/structurelles → arbitrage Simon, NON auto-exécutées)
Analyse de rôle réel (pas le compte). Verdict par candidat :

| # | Candidat | Constat | Verdict |
|---|---|---|---|
| **A** | **Double vocabulaire d'espacement de section** : `--section-base/loose/grand` (fixes, =space-11/13/15, ×16 total) **vs** `--spacing-section/block` (fluides `clamp()`, ×64 total) | Deux intentions pour « rythme de section ». Le commentaire `tokens.css:154` flagge lui-même `--spacing-*` comme « transitoires W6 ». C'est le doublon de rôle #1 du DS. | **PERCEPTIBLE** (fixe 96 vs `clamp(64,8vw,96)` divergent selon viewport) → arbitrage Simon : choisir UNE famille (probable : garder les fluides `--spacing-*`, migrer les `--section-*`, ou inverse). Vague GF-1 dédiée. |
| **B** | **`--radius-xs` (4px) nommé « xs » mais PLUS GRAND que `--radius-sm` (2px)** | Inversion de l'échelle t-shirt (xs 4 > sm 2 < md 8). Naming incohérent (créé comme « cran manquant sm↔md » mais nommé xs). | **STRUCTUREL** (rename contrat, ×16 usages, byte-équiv si valeur conservée) → arbitrage Simon : renommer (ex. `--radius-sm`→2 reste, `--radius-xs`4→`--radius-smd`/réordonner). |
| **C** | **`--shadow-hairline` ≡ `--shadow-card-rest`** : valeur **identique** `0 0 0 1px var(--hairline)` (×1 chacun) | Doublon de valeur exact. Mais `--shadow-card-rest` appartient à une **paire rest/hover** (`--shadow-card-hover`), donc rôle sémantique « état repos de card interactive » ≠ « ring séparateur statique ». | **AMBIGU** → arbitrage Simon (byte-équiv de collapse, mais le choix du canonique + valeur de la paire rest/hover relève de l'intention design). Recommandation : garder les deux (la paire justifie), OU collapser `--shadow-card-rest`→`--shadow-hairline` si la paire n'est pas exploitée. |
| **D** | **`--col-full` = `var(--wrap)`** (alias pur 1440px, ×2 dans `grid.css`) | Indirection sémantique « colonne pleine grille = wrap page ». | **MARGINAL** byte-équiv collapsible (inline `var(--wrap)`) mais l'alias documente l'intention grille → garder (faible valeur à raser). |

### 9.4 — Coïncidences de valeur JUSTIFIÉES (PAS des doublons — documenté pour ne plus les re-flagger)
- **`--accent-ink` (#F6F1E8) == `--paper`** : même valeur, **rôle distinct** = couleur de texte SUR fond accent. Slot de contrat indépendant pour Tool D (une marque à accent clair voudra un `--accent-ink` foncé ≠ son paper). **GARDER** — collapser casserait l'indépendance de repaint.
- **`--gut` (32px responsive : 20@900, 16@600) vs `--space-6` (32px fixe)** : coïncident à 32px sur desktop mais `--gut` est **responsive** (gouttière) et `--space-6` fixe (cran d'échelle). Rôles distincts. **GARDER**.

> Principe (réconcilie « cadre restrictif » + « ne pas aplatir l'intentionnel ») : une coïncidence de valeur n'est un doublon **que si le rôle est identique**. A/B/C/D ci-dessus sont des incohérences réelles mais **perceptibles ou structurelles** → décision Simon, jamais auto-exécutées dans une vague byte-équiv.
