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
- **B8 content-bands** (technologies `.hub-frameworks` · ressources `.hub-tools`/`.hub-cookbooks`) → **KEEP-BESPOKE** (tranché 2026-06-05, branchements évalués puis revertés) : chaque bande porte un **titre h2 monumental** (`clamp(40px,6vw,88px)`, font-display, textes « Trois frameworks. Trois grammaires. » / « Trois lectures. Pas de funnel commercial. » / « Les recettes qu'on applique en mission. ») dont le style `<i>` **diffère même entre les sections** (frameworks `--muted`, tools/cookbooks `--accent`). Or `related-cards-band` n'expose **qu'un kicker mono + grille** — **aucun slot h2**. Les 3 voies possibles échouent au 0-delta : (a) drop le h2 = perte de contenu ; (b) h2 inline + section composant = delta de vertical-gap (double padding) ; (c) extension h2 dans le composant = restyle (styles `<i>` hétérogènes non reproductibles par une règle unique). Forcer = violer « 0-delta only ». Cards laissées bespoke avec leur titre.

## ⚠️ DELTAS À VALIDER SIMON (veto = revert du commit isolé)
1. **atlas EN** (`e041c69`) : l'ancien hero EN était un **test A/B explicite** (kicker `Vol. 03 — Atlas (direction 3 test)`, CTA `← See the home (direction 1)`, markup monocolonne désync du FR) → uniformisé sur le hero 2-col canonique. Rendu en/atlas change (monocolonne → 2-col). Hors scope : l'organism `<AtlasGrid>` qui suit garde un vestige texte « Direction 3 test ».
2. ~~**6 mastheads listing** (`835fe72`) : restyle monumental.~~ **✅ RÉSOLU 2026-06-05 (`158bade`)** — décision Simon : **découpler `scale` du variant**. Le type `hero-hub-masthead` a un champ optionnel `scale` ('monumental'|'standard') orthogonal au variant ; défaut listing→standard (réutilise `--text-h1-hero` = `clamp(40,6vw,92)` → ~77px@1280, 0 nouveau token), hub/detail→monumental. Les 6 pages listing repassent au scale standard automatiquement (h1 de référence visible above-fold) **sans perdre** le branchement catalogue de 835fe72 (markup composant conservé). Hub & detail inchangés (GF-1 6/6 : listing 76.8px op=1, hub/detail 140.8px op=1). Catalogue template-ready : structure × échelle indépendantes. Détail : §« Découplage scale » ci-dessous.

## NOTÉ (préexistant / hors scope — tâches contenu séparées)
- **404 hreflang** : `/en/ressources/testimonials` + `/en/ressources/personas` (liens switch/alternate EN vers pages **FR-only** inexistantes). Préexistant, non lié au refactor masthead. *(= les 2 « ❌ » du GF-1 listing.)*
- **Typo source comparer** : `detaillees` / `selectionner` (sans accents) — **préservés verbatim** (branchement = pur refactor). À corriger en tâche contenu.
- Variables orphelines laissées (inoffensives, build vert) : `sectorsToCome` (secteurs), `pains/criteria/objections/proofs` (personas [slug]).

## ✅ PHASE B TERMINÉE (2026-06-05)
Tout ce qui mappe **0-delta** est branché ; tout le reste est tranché **KEEP-BESPOKE** avec raison sourcée (jamais forcé). Bilan :
- **Branché** : masthead 3 variants (hub B2 · listing B5 · detail B6) + nouveaux types fidèles (B3 : coming-soon-pills, editorial-split-grid, persona-attributes-grid, hero-atlas).
- **KEEP-BESPOKE** (non 0-delta, décisions ci-dessus) : secteurs `.hub-mast` (svg signature) · cas `.cas-grid`/`.cas-cta` · **B8 content-bands** (3 titres h2 monumentaux non hostables par related-cards-band).
- **GATÉ** (hors scope, décision Simon) : solutions (HeroSector infidèle).
- **2 deltas en attente de veto Simon** (cf section ci-dessus) : atlas EN restyle (`e041c69`) · 6 mastheads listing monumental (`835fe72`). Veto = revert du commit isolé.

### Restes hors « 0-delta » (= tâches dédiées Simon, PAS de branchement auto)
- **B4 secteurs `.hub-mast`** → KEEP-BESPOKE : `hub-canonical` (2ᵉ p) + `sector-svg-sig` (SVG signature custom) non couverts par variant hub. Extension schéma possible (`canonical_*` + slot `svg_signature` opt., 4 touchpoints) **si** Simon arbitre que ça vaut le blast-radius pour 0 réutilisation.
- **B7 cas grille+cta** → KEEP-BESPOKE : `.cas-grid` (featured 7fr/5fr + VT) ≠ case-card-grid ; `.cas-cta` ≠ cta-final → branchement = restyle, pas 0-delta.
- **Solutions** : GATÉ (ne pas toucher).

## Phase C (après B, NON enchaînée automatiquement — GF-1 par template requis) : faire consommer le registry par les 18 templates via SectionsRenderer (doc 22).

## 🏛️ Découplage `scale` du `variant` (décision archi catalogue-template — 2026-06-05, `158bade`)
**Problème soulevé par Simon** : en unifiant le masthead en « 1 type / 3 variants », le `variant` confondait deux axes orthogonaux — la **structure** (hub/listing/detail : déco SVG, role, align) ET l'**échelle typo** (monumental 140px vs utilitaire). Conséquence : le variant listing héritait du monumental, enterrant le contenu de référence sous le fold (prouvé screenshot).
**Décision** : découpler. Un seul type catalogue, mais `scale` ('monumental'|'standard') **indépendant** du variant.
- **Schéma** (`sections.ts` `heroHubMastheadSchema`) : `scale: z.enum(['monumental','standard']).optional()`.
- **Composant** (`HeroCentered.astro`) : `const mastScale = data.scale ?? (variant==='listing' ? 'standard' : 'monumental')`. Modificateur `--standard` sur les 3 branches (`.hero-hub-masthead--standard` / `.hero-hub-listing--standard` / `.hero-utility--standard`) → `font-size: var(--text-h1-hero)`. **0 nouveau token** (rule 28 respectée — réutilise un token DS existant ; on conçoit le catalogue, pas une page).
- **0 édition de page** : les 6 listing passent standard via le défaut-par-variant ; n'importe quelle page peut surcharger (`scale`).
**Pourquoi c'est template-ready** : structure × échelle se choisissent indépendamment → un hub compact ou un listing monumental devient possible sans nouveau type ni duplication. Pattern DS mature (un Heading a un `level` sémantique ≠ une `size` visuelle).
**Défauts choisis pour 0 delta non demandé** : hub & detail restent monumental (inchangés). Seul listing change (= le delta que Simon voulait corriger). GF-1 : 6/6 PASS.

## Méthode GF-1 rodée (réutiliser)
Harnais jetable `_gf1-*.mjs` à la racine repo (résolution node_modules locale) : `import { chromium } from '@playwright/test'`, addStyleTag force reveals (`opacity:1!important;transform:none!important`), getComputedStyle (opacity/fontPx/transform/viewTransitionName) + count d'éléments + screenshot clip above-fold, `rm -f` après. serve-dist : `node scripts/serve-dist.mjs --port 4330 --root dist/client` (parité prod statique, évite le bruit vite-dev 504). ⚠️ assertion transform : tolérer `matrix(1,0,0,1,0,~0.01)` (reveal résiduel sous-pixel, ≠ régression).
