# Audit de rationalisation DS : waimia-web (read-only, 2026-06-10)

Périmètre lu : tokens.css (110 défs), global.css (1589 l), grid.css, design-system.lock.json, library-manifest.ts, schemas/sections.ts, section-registry.ts, 96 composants `sections/*.astro` ; docs 17/18/23/28/31 + DS-COHERENCE-STANDARD.
Critère d'arbitrage appliqué : QUALITÉ (esthétique / lisibilité / hiérarchie / variété contrôlée), pas la fréquence. La version minoritaire est recommandée quand elle est la meilleure (noté MINORITÉ-GAGNE).

Convention d'écriture : 0 caractère U+2014 dans ce rapport (ponctuation naturelle uniquement).

---

## 1. Deltas docs vs code (les docs cartographie sont PÉRIMÉS)

| Sujet | Doc (source) | Code réel (vérifié) | Verdict |
|---|---|---|---|
| Composants `sections/*.astro` | 19 (doc 17:108) puis 20 (doc 31:76) | **96** fichiers (95 sections + `SectionsRenderer`) | doc 17/18/31 obsolètes : explosion x5 du catalogue. |
| Types de section (union) | n/a | **108** `z.literal` distincts dans schemas/sections.ts | c'est le « catalogue » réel. La mission dit 106, le CLAUDE.md dit 87 ; le code = 108 littéraux. |
| Organisms `ui/organisms/` | 25 (doc 18) / 27 (doc 31) | **8** fichiers | les organisms doublons ont été migrés/supprimés (ProofBar, CtaBand, CapabilityStrip, TrustMarquee, Pyramid... partis). doc 31 périmé. |
| Templates | 18/19 | **17** | proche. |
| Tokens définis | 147 (doc 18) | **110** (tokens.css) ; lock.json en liste 110 mais affiche `tokenCount: 106` (champ faux) | doc 18 périmé ; cleanups Phase D / ds-cleanup / fusions A3 réalisés. **Bug mineur : `design-system.lock.json` `tokenCount:106` ne correspond pas aux 110 entrées listées.** |
| Tailwind `@theme` | doc 18 dit 10 tokens couleur dont `--color-success/error` | tokens.css n'expose plus que paper/ink/muted/accent + fonts + `--ease-out` ; **0 `--color-success/error`** | doc 18 périmé. |
| Doc le plus fiable | doc **23-DS-TOKEN-COHERENCE-AUDIT** (2026-06-08/09) | colle au code à ~95% | référence d'arbitrage. |

**Bugs doc 23 désormais RÉSOLUS (vérifié grep)** : les tokens « référencés mais jamais définis » (`--color-surface/-border/-bg/-success`, `--text-primary`, `--font-body`) ont **0 référence** dans `src/` aujourd'hui. Le rewire « 3 vocabulaires couleur → 1 » annoncé est fait. Restent vivants et sains : `--shadow-lift` (def 1, usé 2).

---

## 2. Doublons / quasi-doublons de TOKENS (occurrences + reco qualité-first)

| # | Doublon | Occ. | Reco QUALITÉ | Note |
|---|---|---|---|---|
| T1 | `--shadow-hairline` (×1) == `--shadow-card-rest` (×1) : valeur identique `0 0 0 1px var(--hairline)` | 1 / 1 | **Garder `--shadow-card-rest`** (paire sémantique rest/hover, exprime l'état de card interactive) ; **fusionner `--shadow-hairline` dedans** (rôle « ring séparateur » couvert par `.hline`/`--hairline`). Réduit le bruit de nommage. | doc 23 §9.3-C laissait ambigu : trancher fusion. |
| T2 | `--radius-xs` (4px) **nommé plus petit que** `--radius-sm` (2px) | 16 / nombreux | **Renommer pour rétablir l'échelle t-shirt** : `sm`=2 → garder, `xs`=4 est une inversion. Reco : `--radius-sm:2`, `--radius-md:4`(form/inputs), `--radius-lg:8`... OU `--radius-2:4`. Le naming inversé nuit à la clarté mentale (critère Simon). | structurel, byte-équiv si valeurs conservées. |
| T3 | `--section-base/loose/grand` (fixes 96/160/256, ×10) **vs** `--spacing-section`/`-block` (fluides clamp, ×28+) | 10 / 28+ | **MINORITÉ-GAGNE : garder les FIXES `--section-*` comme rythme inter-sections** (prévisibles, hiérarchie nette base/loose/grand = exactement la « hiérarchie des sections » voulue). Les `--spacing-*` fluides clamp(64,8vw,96) sont les plus utilisés MAIS divergent selon viewport et écrasent la hiérarchie (tout devient ~même hauteur). Migrer `--spacing-section`→`--section-base` etc. | LE doublon de rôle #1 du DS. Le commentaire tokens.css:154 flagge `--spacing-*` comme « transitoires ». Vague GF-1 dédiée (perceptible). |
| T4 | `--accent-ink` (#F6F1E8) == `--paper` | 2 | **Garder les deux** : rôle distinct (texte SUR accent vs fond page). Indépendance repaint Tool D. PAS un doublon. | doc 23 §9.4. |
| T5 | `--gut` (32 responsive) ≈ `--space-6` (32 fixe) | - | **Garder les deux** : gouttière responsive vs cran fixe. PAS un doublon. | |
| T6 | `--col-full` = `var(--wrap)` (alias pur 1440) | 2 (grid.css) | **Garder** : documente l'intention « colonne pleine = wrap ». Marginal. | |

Pas d'autre gisement de token mort : l'audit d'usage exhaustif (doc 23 §9.2) + mon recoupement confirment que tous les tokens du contrat sont consommés (les extrêmes `--space-12/13/14/15` alimentent `--section-*`, garder l'échelle 8pt entière = prévisibilité génération).

---

## 3. Variables trop spécifiques / classes isolées : verdict

### Tokens
- `--shadow-cta`, `--shadow-paper-lift`, `--shadow-lift` : single-use chacun mais rôles de surface distincts → **GARDER** (un DS a des ombres nommées single-use ; coût d'1 def négligeable).
- `--text-drop-cap`, `--text-pull-quote` : consommés par atomes éditoriaux réels → **GARDER**. (Caveat doc 23 §5 : `--text-drop-cap` token 6vw mais `DropCap` fallback inline 8vw → aligner.)
- `--z-sticky` seul z-index survivant : **GARDER** (les autres paliers déjà rasés).

### Classes globales (global.css)
- `.sec` : `padding: clamp(110px,15vw,240px)` = un 4e système de rythme vertical bespoke, **hors** `--section-*` et `--spacing-*`. **FUSIONNER** vers `--section-loose`/`--spacing-section` (ne pas garder une 3e échelle verticale). 
- `.kicker` (global.css) ↔ `Kicker.astro` (atome, 102 usages) ↔ `.chapter-label` ↔ `.fig` : **3-4 façons de styler un label mono caps**. **Canoniser sur l'atome `Kicker.astro`** (le plus utilisé ET le plus typé) ; déprécier les classes `.kicker`/`.fig` brutes. Clarté mentale.
- `.editorial-cell` / `.ec-grid` / `.case-row` / `.how-grid` / `.how-row` : classes éditoriales riches, légitimes mais **`.how-*` est spécifique à 1 organism** (HowWeShip) → candidat scoped. `.editorial-cell`+`.ec-grid` = **GARDER** (système réutilisé, qualité éditoriale forte).
- `.page-pill*` (dev nav) : utilitaire de chrome, **GARDER** (isolé mais fonctionnel).
- Littéraux dans global.css (font-size 22/26/28/38px hdr/mega, line-height 1.55/1.6, tracking 0.14/0.18/0.2em, durées 220/280/340/440/480/540ms) : **contournent les tokens** (doc 23 Bucket A/B). C'est le vrai foyer d'incohérence (« tokens non-enforced », pas « trop de tokens »). Tokeniser les byte-équivalents (Bucket A) ; snapper les near-dups (Bucket B) en vague GF-1.

---

## 4. Échelles d'espacement : dominantes réelles + harmonisation

**Vertical (entre/dans sections)** : fragmentation forte mesurée dans `sections/*.astro` :
- Dominante tokenisée : `padding-block: var(--spacing-section)` ×24 + `var(--section-loose)` ×7 + `var(--section-base)` ×3.
- Clamps bespoke concurrents (NON tokenisés) : `clamp(48px,6vw,80px)` ×9, `clamp(56px,7vw,88px)` ×8, `clamp(72px,8vw,120px)` ×5, `clamp(80px,10vw,120px)` ×4, `clamp(60px,8vw,100px)` ×2, `clamp(64px,7vw,96px)` ×2... = **au moins 8 rythmes verticaux ad hoc** + `.sec` clamp(110,15vw,240) = un 9e.
- **Proposition** : 1 SEULE famille verticale = `--section-base` (96) / `--section-loose` (160) / `--section-grand` (256) + un cran compact `--section-tight` (48, à recréer car rasé). Mapper tous les clamps : 48/56/64→tight ; 80/88/96→base ; 100/120→loose. Donne une **hiérarchie lisible** (la variété entre sections vient du choix base/loose/grand, pas d'un clamp aléatoire par composant).

**Horizontal (wrap)** :
- Dominante : classe `.wrap` ×106 dans sections, `.wrap-wide` ×1 seulement, `g12*` ×9. Tokens largeur : `--wrap` 1440 / `--wrap-wide` 1560 / `--wrap-tight` 1120 / `--wrap-prose` 720 / `--wrap-read` 900.
- **Écart** : `.wrap-wide` quasi inutilisé alors que doc 18 §A.6.4 anti-pattern #4 exigeait `.wrap-wide` sur les sections pour ne pas coller le contenu au bord. **Vérifier** que les 95 sections ont bien un container interne (la plupart via `.wrap`).
- Near-dups largeur (doc 23 Bucket B) : `1100/1200/1240px`≈`--wrap-tight` 1120 ; `1400/1500`≈wrap. **Snapper sur les 5 tokens wrap** ; pas besoin d'en créer.

**Conclusion espacement** : le DS a les bonnes échelles (8pt + 5 wrap), mais 2-3 systèmes verticaux coexistent et beaucoup de clamps bespoke les contournent. Harmonisation = collapser sur `--section-*` (vertical) + `.wrap-*` (horizontal), gate `check-token-purity` étendu pour interdire un clamp vertical bespoke == cran existant.

---

## 5. Variantes de sections redondantes (catalogue 108) : candidats consolidation

96 composants `sections/`, 108 types. Familles à fort recouvrement (reco QUALITÉ-first) :

| Famille | Variantes (code réel) | Reco |
|---|---|---|
| **Hero (33 fichiers Hero*/* Hero)** | HeroSplit, HeroCentered, HeroFullBleed, HeroHome, HeroLiquid, HeroAtlas, HeroAuthor, HeroCaseStudy, HeroConversionFunnel, HeroEssay, HeroHubStats, HeroLanding, HeroLeadMagnet, HeroOfferDetail, HeroServiceDetail, HeroTunnelStep, TunnelStepHero... | **Sur-fragmenté.** Beaucoup sont des Hero « par type de page » (OfferDetail/ServiceDetail/LeadMagnet/CaseStudy/Author/Essay) = même layout, données différentes. **Consolider vers 3-4 archétypes** : `HeroSplit` (asymétrique), `HeroCentered`, `HeroFullBleed`, + 1 `HeroHome`/`HeroLiquid` signature. Les variantes « par collection » doivent devenir des **presets de données** sur ces 3-4, pas des composants. `HeroTunnelStep` vs `TunnelStepHero` = **doublon de nom quasi-identique à fusionner**. |
| **CTA (5)** | CtaFinal, CtaInline, CtaBandSection, CtaSplitVisual, DepartmentCta | Garder CtaFinal (climax), CtaInline (mid-page), CtaSplitVisual (avec visuel) = 3 rôles distincts clairs. **DepartmentCta** = probable preset → fusionner dans CtaInline/CtaBand. CtaBandSection = bande pleine largeur, garder. |
| **Grilles « features/services »** | FeatureGrid, FeatureTabs, FeatureZigzag, ServicesGrid, BentoGrid, CommitmentsGrid, DeliverablesGrid, ProblemsGrid, IconTrio, PersonaAttributesGrid, TeamCardGrid, CaseCardGrid | **Recouvrement massif** (toutes = grille de cards à N colonnes). **MINORITÉ-GAGNE : garder `BentoGrid` (bento = le plus distinctif/Awwwards) + `FeatureZigzag` (alternance, casse la monotonie) + `FeatureGrid` (régulier)**. Les « *Grid » spécialisées (Deliverables/Commitments/Problems/Team/Case) = presets de FeatureGrid/BentoGrid pilotés par données + une variante de label. IconTrio = FeatureGrid à 3 col. |
| **Stats / Proof** | StatBlock, StatsBento, MetricShift, ProofBarSection, SocialProof, RoiBand, SpecBar | StatsBento (bento chiffres = fort visuellement) + ProofBarSection (bande inline) + MetricShift (avant/après, narratif) = 3 rôles. SocialProof (logos/témoignages) distinct. **RoiBand/SpecBar** = presets de StatBlock → fusionner. |
| **Pricing** | PricingTable, PricingComparisonMatrix, OfferTierGrid | PricingTable (N tiers) + PricingComparisonMatrix (matrice features) = 2 rôles distincts. **OfferTierGrid** recouvre PricingTable → fusionner ou clarifier (tiers offre vs tiers prix). |
| **Timeline / Steps / Process** | MethodTimeline, TimelineBlock, StepsHorizontal | MethodTimeline (index éditorial vertical) + StepsHorizontal (frise horizontale) = 2 rôles. **TimelineBlock** recouvre MethodTimeline → fusionner. |
| **Comparaison** | ComparisonTable, ComparisonDuo, TechWhenDual | ComparisonTable (N col) + ComparisonDuo (2 col face-à-face) = OK. **TechWhenDual** = ComparisonDuo thématisé → preset. |
| **Tables tech** | TechModelsTable, TechCapabilitiesSpecs, CourseCatalogTable, WorkflowTable, EditorialTableBlock | Beaucoup de « tables » bespoke. **Canoniser sur `EditorialTableBlock`** + données ; les Tech*/Course*/Workflow* = presets. |
| **Quote / éditorial** | PullQuoteBlock, QuoteSpotlight, BrandedCallout, ManifestoBlock, ProblemStatement | QuoteSpotlight (citation cinématique) + PullQuoteBlock (inline) = 2 rôles ; **BrandedCallout** garder (variété fonds). ManifestoBlock/ProblemStatement = éditoriaux distincts, garder. |

**Estimation** : le catalogue 108 peut se consolider vers ~60-70 types « canoniques » + presets de données, sans perdre de capacité visuelle. Priorité #1 = la famille **Hero (33 → ~5)**, plus gros gisement et plus gros risque d'incohérence visuelle entre pages.

---

## 6. Backgrounds disponibles (chantier « alternance des fonds / variété contrôlée »)

Fonds de section réellement disponibles + usage mesuré dans `sections/*.astro` :

| Fond | Token / classe | Usage actuel | Rôle |
|---|---|---|---|
| Parchemin base | `var(--paper)` #F6F1E8 | 15 | fond par défaut du body. |
| Parchemin subtil | `var(--paper-2)` #EFE9DD + classe `.sec-paper` | 35 + 11 | **le plus utilisé** pour différencier une section (lift léger). |
| Parchemin profond | `var(--paper-3)` #E6E0D0 | 1 | quasi inutilisé → **levier de variété sous-exploité**. |
| Encre (dark) | `var(--ink)` #0C0B09 + classe `.sec-dark` + `.on-dark` | 21 + 4 + 3 | section sombre cinématique (climax, signature). |
| Grille signature | `.signature-grid` / `.signature-grid.on-dark` | - | overlay millimétrique terracotta (texture, pas un fond plein). |

**Palette d'alternance recommandée (3 fonds pleins + 1 texture)** : `paper` (base) → `paper-2` (respiration) → `ink` (climax dark) → `paper-3` (variante chaude rare, à réhabiliter pour casser le binaire paper/paper-2). La grille signature en overlay sur paper OU ink pour les moments forts. 
**Garde-fou** : pas de gradient (contrat doc 28 §7), pas de couleur hors palette parchemin/encre/terracotta. L'alternance se pilote par une prop `background: 'paper' | 'paper-2' | 'paper-3' | 'ink'` sur les sections (rythme contrôlé), pas par du bespoke. Actuellement `paper-3` (×1) et `.sec-dark` (×4) sont sous-utilisés → marge pour plus de hiérarchie visuelle sans nouveau token.

---

## 7. Synthèse priorités (qualité-first, anti-dette)

1. **Hero 33 → ~5 archétypes** (presets données) : plus gros gisement de cohérence + clarté.
2. **Vertical rhythm : 1 famille `--section-*`**, raser `--spacing-*` fluides + clamps bespoke + `.sec` clamp 240 (hiérarchie de sections nette = critère Simon).
3. **Labels mono caps : canoniser sur `Kicker.astro`**, déprécier `.kicker`/`.fig`/`.chapter-label` brutes.
4. **Renommer `--radius-xs/sm`** (échelle inversée) + **fusionner `--shadow-hairline`→`--shadow-card-rest`**.
5. **Backgrounds : réhabiliter `paper-3` + `.sec-dark`** pour l'alternance contrôlée (prop `background` sur sections).
6. **Tokeniser les littéraux byte-équiv** (global.css foyer) + étendre `check-token-purity` (anti-régression).
7. **Corriger** : `design-system.lock.json tokenCount:106` (≠ 110) ; `--text-drop-cap` 6vw vs fallback 8vw.
8. Marquer docs 17/18/31 PÉRIMÉS (rediriger vers doc 23 + ce rapport).
