# SR-2026-06-10-22 · Refonte R5a : famille Hero, 17 fichiers → 9, 28 types intacts

> **Addendum GF-1 PROD (21:14)** : deploy live, vérifié au `getComputedStyle` sur waimia.com : 3 pages migrées vers les archétypes (caserne → HeroCentered preset case-study, équipe → HeroSplit preset author, field-note → HeroCentered preset essay) : h1 opacity 1 + transform neutre, 0 erreur console. R5a close en prod.

> Worker **Fable 5** (worktree `.worktrees/r5hero`), branche **`feat/refonte-r5-hero-familles`** commit `2edeec6` (23 fichiers, +3 565/-1 670). Contre-vérifié orchestrateur (rule 09) : gates relancés, 0 import mort des 8 supprimés, diff structurel relu, veto /solutions vérifié au screenshot.

## 1. Résultat

La famille Hero passe de **17 fichiers composants à 9** (6 archétypes paramétrables + 3 signatures intouchables), **sans toucher un seul MDX** : les 28 types du catalogue restent valides, les anciens types deviennent des presets des archétypes.

| Archétype | Intention | Types servis |
|---|---|---|
| HeroCentered | masthead éditorial | 13 (dont essay, case-study, service-detail, landing absorbés) |
| HeroSplit | split média | 3 (+ author, lead-magnet) |
| HeroOfferDetail | détail produit | 3 |
| HeroHubStats | stats-led | 4 (+ conversion-funnel) |
| HeroTunnelStep | tunnel/process | 2 (doublon tunnel-step-hero fusionné) |
| HeroFullBleed | immersif | 1 |
| HeroHome / HeroLiquid / HeroAtlas | signatures (A7) | conservés tels quels |

8 composants supprimés (0 orphelin, vérifié par grep indépendant), registry repointé, schémas et demos inchangés (4 touchpoints synchronisés), 6 templates repointés. **Masthead /solutions : veto Simon respecté, vérifié intact au pixel.**

Note d'inventaire : l'audit parlait de « 33 heros » ; le compte vérifié au registry est 28 types / 17 fichiers (l'audit incluait des mastheads inline hors catalogue, traités dans d'autres vagues).

## 2. Preuves GF-1

- **Diff structurel 672 HTML** vs build de référence pré-R5a : 594 strictement équivalents + 77 équivalents modulo un espace inter-balises (token-diff exhaustif, 0 mismatch, espaces en contextes block/flex/grid sans rendu) + **1 delta réel justifié** (compteur ds-studio « 208 → 201 fichiers », conséquence directe des 8 suppressions).
- Corpus CSS : équivalent (colocalisations byte-identiques en corps, hash View Transitions renommés mécaniquement).
- Playwright 1440×900 : **28/28 previews hero PASS** (h1 opacity 1, transform neutre) + 7/7 pages live PASS + fold /solutions 82 %. 36 screenshots dans `/tmp/wmission/r5hero/`.
- Gates : astro check 0 errors · build Complete! · touchpoints · section-rhythm · no-emdash · token-purity : PASS (3 relancés indépendamment par l'orchestrateur).

## 3. Mesure above-fold (pour la vague visuelle à venir)

Le worker a mesuré le remplissage du fold de chaque archétype en preview isolée : 100 % pour hub-stats/pillar-hub/conversion-funnel/landing ; les mastheads éditoriaux (essay 61 %, academy-hub 46 %) remplissent moins en preview isolée mais sont complétés par le contenu sur pages live. **Candidat n°1 à resserrer : academy-hub.** Ces corrections changeraient le rendu : renvoyées à la vague R5-visuelle (cette vague était strictement iso-rendu).

## 4. Restes assumés

Harmonisation des 2 branches tunnel (changerait le rendu → vague visuelle) ; `library-manifest.ts` cite encore ServiceDetailTemplate (stale données-only depuis R0, à purger en R6).
