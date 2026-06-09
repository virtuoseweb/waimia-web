# 24 — Contrat de marque figé (brand-forge / Tool D)

> Capstone de l'initiative repaintabilité (cf `docs/23` §9). La surface de rendu est désormais **100 % token-driven** (hex CSS, hex SVG, rgba, contrat interne) + **enforced CI** (`check-token-purity`). Ce document fige **le contrat** : ce qu'un générateur d'identité (Tool D / brand-forge) **override par marque** vs ce qui **reste structurel**. Les composants consomment des **NOMS** de tokens ; seules les **VALEURS** de la palette varient d'une marque à l'autre.

## Principe
- **1 contrat de NOMS figé** → tous les composants/sections/SVG du catalogue référencent ces noms (jamais une couleur en dur — verrouillé par le gate).
- **N jeux de VALEURS** (1 par marque) → Tool D génère uniquement les valeurs de la **palette** ci-dessous. Tout le reste (rythme, échelle typo, rayons, durées) est **partagé/figé** = cohérence structurelle inter-sites garantie.
- **Preuve empirique** (2026-06-09) : un swap de **13 tokens-valeurs** (palette ci-dessous) repeint l'intégralité de `/technologies` (texte, accents, hairlines ×616, ombres, **SVG inline** fill/stroke) de façon cohérente — screenshot teal/emerald + `getComputedStyle` round-trip (`docs/23` §9.1).

## A. Palette OVERRIDABLE par marque (ce que Tool D génère)
Source : `src/styles/tokens.css` (`:root` + bloc `@theme`). **14 slots couleur** + leurs miroirs Tailwind. Une marque fournit **uniquement** ces valeurs.

| Slot | Waimia (réf.) | Rôle sémantique (invariant) | Miroir Tailwind `@theme` à synchroniser |
|---|---|---|---|
| `--paper` | `#F6F1E8` | fond principal (surface) | `--color-paper` |
| `--paper-2` | `#EFE9DD` | surface secondaire / cards | `--color-paper-2` |
| `--paper-3` | `#E6E0D0` | surface tertiaire | `--color-paper-3` |
| `--ink` | `#0C0B09` | texte/trait principal | `--color-ink` |
| `--ink-2` | `#1A1814` | texte secondaire (lede) | `--color-ink-2` |
| `--ink-3` | `#2B2620` | texte tertiaire | `--color-ink-3` |
| `--muted` | `#6B6560` | texte atténué | `--color-muted` |
| `--muted-2` | `#746C63` | atténué secondaire | `--color-muted-2` |
| `--accent` | `#C94F2E` | accent de marque | `--color-accent` |
| `--accent-2` | `#A83D20` | accent foncé (hover) | `--color-accent-2` |
| `--accent-ink` | `#F6F1E8` | **texte SUR fond accent** (slot distinct — peut ≠ paper selon la marque) | — |
| `--ink-rgb` | `12, 11, 9` | canaux R,G,B de `--ink` → pilote `rgba(var(--ink-rgb), α)` (hairlines, ombres) | — |
| `--accent-rgb` | `201, 79, 46` | canaux de `--accent` → `rgba()` accent | — |
| `--paper-rgb` | `246, 241, 232` | canaux de `--paper` → `rgba()` on-dark | — |

> ⚠️ **Cohérence obligatoire** : `--ink-rgb` doit être les canaux exacts de `--ink` (idem accent/paper). Sinon hairlines/ombres divergent du texte. (Pas de `--muted-rgb`/`--paper-2-rgb` : aucun usage `rgba()` ne les requiert — ne pas créer sans besoin, cf `docs/23` §9.2.)
> **Polices** (`--font-display`/`--font-sans`/`--font-mono`) = override **optionnel** (nécessite les assets `@font-face` dans `fonts.css` + preload `Base.astro`). Hors palette couleur de base.

## B. Tokens STRUCTURELS figés (NE varient PAS par marque — partagés inter-sites)
Garantissent la cohérence de rythme/échelle de l'usine. Une marque n'y touche pas.

- **Espacement** : `--space-1…15` (grille 8pt), `--section-base/loose/grand`, `--spacing-section/block`, `--gut`. *(résiduel cohérence : double vocabulaire section fixe vs fluide — cf `docs/23` §9.3-A, arbitrage Simon.)*
- **Rayons** : `--radius-xs/sm/md/lg/pill/full`. *(résiduel : `--radius-xs` 4px nommé « xs » mais > `--radius-sm` 2px — cf §9.3-B.)*
- **Échelle typo** : `--text-*` (body/ui/caption/mono/eyebrow/lede/pull-quote/drop-cap + headings sémantiques `--text-h1-hero`…`--text-h3-card`).
- **Leading / tracking** : `--leading-*`, `--tracking-*`.
- **Poids** : `--fw-regular/medium/semibold`.
- **Durées / easing** : `--dur-fast/base/reveal/slow`, `--ease/ease-out/ease-spring`.
- **Layout** : `--wrap/-wide/-tight/-prose/-read`, `--col-full`, `--header-height`, `--z-sticky`.
- **Ombres** : `--shadow-*` (composées sur `--hairline`/canaux → suivent la palette **sans** être overridées directement).

## C. Procédure de repeinte (Tool D)
1. Générer les **14 valeurs** de la section A (palette cohérente : contraste AA texte/fond, canaux `-rgb` == hex correspondants).
2. Écrire ces valeurs dans `:root` **et** synchroniser les miroirs `@theme` (`--color-*`).
3. Aucune autre modification : composants, SVG, rythme, typo restent figés.
4. Valider **GF-1 repaint** : `getComputedStyle` sur un échantillon (H1, accent, hairline, fill SVG) = nouvelles valeurs cohérentes + 0 hex/rgba de marque résiduel (`check-token-purity` exit 0, déjà enforced CI).

## D. Enforcement (déjà en place)
`scripts/check-token-purity.mjs` (CI `.github/workflows/ci.yml`) **bloque** toute couleur de marque en dur (hex brut, hex `fill`/`stroke` SVG, `rgba()` de marque) — **y compris dans `tokens.css`** (seules les définitions de canaux bare y subsistent). → un composant généré (Tool C) ne **peut** pas hardcoder une couleur : le contrat de noms est mécaniquement garanti.
