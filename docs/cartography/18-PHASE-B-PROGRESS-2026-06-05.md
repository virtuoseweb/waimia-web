# 18 — Phase B (branchement pages live) · journal d'avancement

> Suit la séquence de `17-TIER2-INLINE-MAPPING-2026-06-05.md`. Chaque batch = subagents (édition) → 1 build → GF-1 serve-dist (port 4330, dist/client) → commit isolé. Anti-collision : 1 seul build à la fois.

## FAIT cette session (5 commits, tous GF-1 PASS, build vert, tree clean)

| Commit | Batch | Pages | Type | Statut GF-1 |
|---|---|---|---|---|
| `5798648` | B2 hub-masts | offres·cas·ressources·technologies (FR+EN) | `hero-hub-masthead` variant **hub** | 8/8 op=1, monumental 158px, 0 err |
| `26feada` | B3 fidèles 0-delta | secteurs `.hub-coming`→coming-soon-pills · ressources `.hub-blog-lb` FR+EN→editorial-split-grid · personas `[slug]` __grid→persona-attributes-grid | nouveaux types (verbatim) | counts exacts (5 pills / dual listing / 4 blocks+3 meta), 0 err |
| `26feada`(equipe préalable) | — | equipe grid+masthead (sessions antérieures) | team-card-grid + hub | — |
| `e041c69` | B3 atlas | atlas FR+EN `.hero-atlas`→hero-atlas | hero-atlas | 4/4 piliers, h1 94px op=1 |
| `835fe72` | B5 listing | glossaire·testimonials·personas-index·field-notes·integrations(FR+EN)·comparer(FR+EN) | `hero-hub-masthead` variant **listing** | 6/6 listing, h1 158px op=1, ledes dyn préservés, 0 err* |
| `8f5814e` | docs | journal d'avancement (ce fichier) | — |
| `e942a07` | **B6 detail** | personas/[slug] `__hd` → variant **detail** (+ext `role` opt.) | detail OK (h1+role mono+lede op=1), **non-régression hub/listing confirmée** |

### ✅ UNIFICATION MASTHEAD COMPLÈTE — `hero-hub-masthead` à 3 variants, tous branchés en prod-branch
- **hub** (B2) offres·cas·ressources·technologies · **listing** (B5) glossaire·testimonials·personas-index·field-notes·integrations·comparer · **detail** (B6) personas/[slug]
- Schéma : `variant` + opt `decoration`/`align`/`transition_id`/`role_fr,en`. Dispatch dans `HeroCentered.astro`. **Champs opt + rendus conditionnels isolés par variant → 0 régression croisée (GF-1 prouvé).**

### Décisions de curation (restant) — proposées, veto Simon possible
- **secteurs `.hub-mast`** → **KEEP-BESPOKE** proposé : `sector-svg-sig` (signature SVG dessinée unique) + `hub-canonical` (2ᵉ p) sont spécifiques, non réutilisés → les forcer dans le composant masthead partagé = blast radius élevé pour 0 réutilisation. Garder inline.
- **cas `.cas-grid`** (featured 7fr/5fr + VT) + **`.cas-cta`** (eyebrow + 1 CTA) → **KEEP-BESPOKE** proposé : structures uniques ≠ case-card-grid/cta-final (≠ 0-delta). Branchement = restyle non justifié.
- **B8 content-bands** (technologies layers/flagship/frameworks · ressources tools/cases/cookbooks) → candidats use-case-index/related-cards-band **+ext** : à évaluer cas par cas (prochain fire boucle).

## ⚠️ DELTAS À VALIDER SIMON (veto = revert du commit isolé)
1. **atlas EN** (`e041c69`) : l'ancien hero EN était un **test A/B explicite** (kicker `Vol. 03 — Atlas (direction 3 test)`, CTA `← See the home (direction 1)`, markup monocolonne désync du FR) → uniformisé sur le hero 2-col canonique. Rendu en/atlas change (monocolonne → 2-col). Hors scope : l'organism `<AtlasGrid>` qui suit garde un vestige texte « Direction 3 test ».
2. **6 mastheads listing** (`835fe72`) : **restyle monumental** des pages référence/listing (h1 86 → 158px, hero plus haut → contenu repoussé sous le fold). Look = le monumental déjà approuvé sur les hub. Si veto → revert `835fe72` (1 commit).

## NOTÉ (préexistant / hors scope — tâches contenu séparées)
- **404 hreflang** : `/en/ressources/testimonials` + `/en/ressources/personas` (liens switch/alternate EN vers pages **FR-only** inexistantes). Préexistant, non lié au refactor masthead. *(= les 2 « ❌ » du GF-1 listing.)*
- **Typo source comparer** : `detaillees` / `selectionner` (sans accents) — **préservés verbatim** (branchement = pur refactor). À corriger en tâche contenu.
- Variables orphelines laissées (inoffensives, build vert) : `sectorsToCome` (secteurs), `pains/criteria/objections/proofs` (personas [slug]).

## RESTE Phase B (prochains batches)
- **B4 secteurs `.hub-mast`** → ⚠️ a `hub-canonical` (2ᵉ p) + `sector-svg-sig` (signature SVG custom) NON couverts par variant hub → **extension schéma requise** (`canonical_*` + slot `svg_signature` optionnels sur heroHubMasthead, 4 touchpoints) OU garder bespoke. Arbitrage.
- **B6 detail/utility mastheads** → variant **detail** (ex. personas/[slug] `__hd` +`role` mono, autres pages détail). Variant detail créé mais jamais branché → pilote requis.
- **B7 FAITHFUL** : cas/index grille+cta (l.56 `.cas-grid` / l.77 `.cas-cta`) + manifesto → case-card-grid / cta-final / manifesto-block (types déjà live home/atlas). Vérifier 0-delta de la grille cas (≠ grille home ?).
- **B8 APPROX** (extensions optionnelles) : secteurs `.hub-sectors-live` (sector-card-grid ?) · technologies `.hub-layers/.hub-flagship/.hub-frameworks` → use-case-index/related-cards-band +ext · ressources `.hub-tools/.hub-cases-detail/.hub-cookbooks` → related-cards-band/use-case-index +ext.
- **Solutions** : GATÉ (HeroSector infidèle, décision Simon — ne pas toucher).

## Phase C (après B) : faire consommer le registry par les 18 templates via SectionsRenderer (doc 22).

## Méthode GF-1 rodée (réutiliser)
Harnais jetable `_gf1-*.mjs` à la racine repo (résolution node_modules locale) : `import { chromium } from '@playwright/test'`, addStyleTag force reveals (`opacity:1!important;transform:none!important`), getComputedStyle (opacity/fontPx/transform/viewTransitionName) + count d'éléments + screenshot clip above-fold, `rm -f` après. serve-dist : `node scripts/serve-dist.mjs --port 4330 --root dist/client` (parité prod statique, évite le bruit vite-dev 504). ⚠️ assertion transform : tolérer `matrix(1,0,0,1,0,~0.01)` (reveal résiduel sous-pixel, ≠ régression).
