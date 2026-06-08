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

Date : 2026-06-08 · Source de vérité tokens : `src/styles/tokens.css` (258 l).

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
