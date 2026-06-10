# SR-2026-06-10-21 · Refonte R4 : DS familles (rythme, tokens, Kicker, background, gate)

> 2 workers **Fable 5** en relais (worktree `.worktrees/r4ds`) : le premier a abattu ~80 % du chantier avant d'être coupé par la limite de session ; le second a évalué l'état, terminé les livrables restants et tout re-validé. Branche **`feat/refonte-r4-ds-familles`** commit `eb71045` (129 fichiers, +10 727/-5 989). Contre-vérifié orchestrateur (rule 09). Tentative Codex intermédiaire : rate-limited avant le 1er tool call (0 contribution) ; depuis, **moratoire Codex** (décision Simon, rule 41).

## 1. Résultat (la dette de génération initiale du DS est purgée)

- **Rythme vertical : 4 crans fixes** `--section-tight` 48 / `--section-base` 96 / `--section-loose` 160 / `--section-grand` 256 px, substitués aux ~10 clamps fluides disparates qui exprimaient la même intention (arbitrage A4 : crans fixes = hiérarchie stable à tous les viewports). Modifier un cran re-rythme toute la famille dans DS Studio. **Gate `check-section-rhythm.mjs`** : 96 sections, 0 padding hors famille.
- **Radius : inversion historique corrigée** (`--radius-xs` 4px > `--radius-sm` 2px était une dette de génération) : échelle t-shirt rétablie (xs 2 < sm 4 < base 6 < md 8 < card 10 < lg 12), 669 usages substitués, 0 alias rétrocompat.
- **Tokenisation des littéraux récurrents** : leading-relaxed, tracking-mono-tight, tracking-caps, dur-hover, dur-panel, shadow-cta-hover (fusions minorité-gagne justifiées une à une). Verrou token-lock : 115 tokens.
- **Kicker canonique** : 16 sections qui rendaient leur kicker à la main + 4 variantes eyebrow migrées sur l'atome `<Kicker>` (20 fichiers). L'atome porte la typo, les classes locales ne gardent que le layout. Fusions de tracking/tailles documentées, 0 primitive nouvelle.
- **Prop `background`** paper|paper-2|paper-3|ink : 29 schémas + 29 sections `data-bg` (defaults = rendu actuel inchangé) : l'alternance de fonds de docs/37 §2.6 devient pilotable par composition.
- Copy DS aligné : « 118 tokens » → 115 sur les 3 surfaces vivantes (l'article de blog daté garde son chiffre d'époque).

## 2. Preuves GF-1 (la plus forte de la refonte : diff structurel exhaustif)

- **672 pages HTML comparées au build de référence pré-R4** : 606 strictement équivalentes après rejeu des substitutions mécaniques attendues, 62 équivalentes modulo espaces de slot Astro (rendu identique), **4 deltas réels tous justifiés** (pages design-system FR+EN « 3 → 4 rythmes section », compteurs ds-studio reflétant l'état réel, re-bundling CSS atlas vérifié identique au computed).
- Screenshots 1440×900 : home, offre, cas, design-system : h1 opacity 1 + transform neutre, 0 erreur console. Crans prouvés au `getComputedStyle` (48/96/160 px mesurés sur des sections représentatives), kickers canoniques mesurés (11px, .14em, uppercase, accent).
- Gates 10/10 PASS (astro check 0 errors, build 672 HTML, touchpoints, section-rhythm, token-purity, token-lock, no-emdash, static-quality, form-endpoints, media-query-var) ; section-rhythm/touchpoints/no-emdash relancés indépendamment par l'orchestrateur.

## 3. Restes assumés (scope R6)

Eyebrows des templates legacy (AuthorPage/CaseStudy/Offres) : migrés à l'extinction des templates (R6). Pages signature manifesto/console : paddings bespoke conservés (hors périmètre, exclus du gate, conformément à l'arbitrage A7).

## 4. Incident process documenté

Le 1er worker a été coupé par la limite de session Claude en pleine mission. La reprise a fonctionné parce qu'il avait laissé un **harnais de preuve réutilisable** (build de référence + scripts de classification de diff) : le 2e worker a repris sans rien refaire. Pattern à généraliser : les missions longues doivent matérialiser leur état (artefacts de preuve + outputs) en continu, pas seulement à la fin.
