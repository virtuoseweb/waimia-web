# docs/43 — Directive variantes : dark systématique, alignement, sections standard

> Capitalisation des directives Simon (2026-06-11) pour TOUTE génération/variante de section de la bibliothèque. Critères GF-1 obligatoires : un nouveau type ou une nouvelle variante n'est pas « fini » sans les respecter.

## 1. Variante DARK systématique

CHAQUE type de section expose un champ `background` (enum) incluant la valeur `ink` (fond sombre), avec un rendu dark **soigné et lisible**, pas un dark bâclé :

- Override explicite des couleurs texte / hairline / surfaces sur fond `ink` (contraste AA minimum).
- Le rendu sur `ink` doit être aussi fini que sur `paper` (pas de bord cassé, pas de texte gris illisible, pas d'atome qui disparaît).
- La démo (`section-demos.ts`) peut montrer le type sur fond clair par défaut ; le dark se teste en passant `background: 'ink'` dans le champ.
- Vérification GF-1 : screenshot du type avec `background: ink` + `getComputedStyle` sur titre/CTA (opacity ≠ 0, couleur claire effective sur fond sombre).

Backgrounds canoniques : `paper` / `paper-2` / `paper-3` (clairs) + `ink` (dark). Pas de nouveau token.

## 2. Alignement gauche/droite discipliné

Les éléments d'une section (kicker, titre, intro, contenu, CTA) s'alignent sur les **mêmes axes verticaux gauche et droite**. Pas de décalages arbitraires.

- Conteneurs cohérents : `.wrap` / `.wrap-wide` / `.wrap-tight` — un seul par section, pas de mélange qui crée des bords désalignés.
- L'en-tête de section (kicker + titre + intro) partage l'**axe gauche** du contenu en dessous.
- Les colonnes/cartes s'alignent sur une grille ; les bords gauches forment une ligne nette.
- Vérification GF-1 : sur le screenshot, les bords gauches des blocs successifs doivent s'aligner (vérifier au pixel sur 2-3 éléments empilés).

## 3. Sections standard avant exotiques

Privilégier les patterns **canoniques B2B-SaaS** (ce qu'on retrouve sur tous les bons sites), bien faits, plutôt que des variations gadget. Le catalogue doit d'abord couvrir les classiques attendus (hero, features, pricing, FAQ, CTA, témoignages, logos, stats, contact, process, comparatif) avant les variations exotiques.

## Application

- Le gabarit de génération (`gen-COMMON.md`, brief worker) intègre ces 3 directives en section « Directives qualité ».
- Ces critères s'ajoutent aux 5 touchpoints (CLAUDE.md) et aux gates (`check-touchpoints`, `check-no-emdash`, `check-token-purity`).
- Lot P0 livré 2026-06-11 (21 types hero-feature/conversion/structure/trust-proof + 3 pricing) : dark structurellement présent sur les 21 composants ; alignement et qualité dark fine à auditer en passe d'harmonisation dédiée (vague suivante : dark fine + alignement sur les 29 héros existants + types antérieurs).
- **Vague dark-retrofit livrée + validée prod 2026-06-11** (`main` `1d2251f`) : champ `background` ajouté à 37 schémas C + 5 enums B + 3 schémas tardifs (marqueeBand/pullQuoteBlock/announcementBanner) ; rendu `ink` câblé sur 41 composants `.astro` ; fix du piège CSS self-reference (`--ink: var(--paper)` scopé aux enfants) sur DataTable + ProcessSteps. **GF-1 PROD PASS** (chromium isolé sur `waimia.com/preview/<type>`, `/tmp/gf1prod-dark.mjs`) : 18/18 types dark OK (17 basculent en `rgb(12,11,9)` fond + `rgb(246,241,232)` titre ; `newsletter-band` déjà ink natif). 0 régression light (les pages live n'optent pas pour `ink`, `background` étant `.optional()`).
- **Passe héros dark LIVRÉE + close 2026-06-11** (`main` `868ab2d`) : variante `ink` câblée sur **19 hero-literals** via 7 composants (HeroSplit, HeroHubStats, HeroOfferDetail, HeroFormInline, HeroSocialProof, HeroTunnelStep, HeroCentered 12 variantes, HeroAtlas). HeroFullBleed + HeroLiquid déjà-dark. GF-1 dark+light non-régression PASS sur chaque type + régression live OK. **Exclus définitifs (VETO Simon)** : `hero-home` (home `/`) + `hero-problem-index` (masthead `/solutions`).

## État des 3 directives (2026-06-11, close)
- **#1 Dark systématique : CLOSE.** ~51 sections non-héros + 10 standards natifs + 19 hero-literals + 2 déjà-dark. Idiome `[data-bg='ink']` (modèle BentoGrid), boutons CTA gérés globalement (`global.css`). Seuls les 2 vetos exclus.
- **#2 Alignement : SATISFAITE.** Audit empirique des 147 types + 9 pages live (2026-06-11) : 0 désalignement P1, 1 seul P2 (tech-models-table en-tête↔colonne 33px, en cours de fix), 6 familles P3 **intentionnelles** (overhang serif, splits, mastheads) à NE PAS « corriger ». Recommandation : pas de refactor large.
- **#3 Standards : SATISFAITE.** Catalogue exhaustif (147 types : 8 pricing, 11 proof, 12 cta, 8 process, 6 comparison, etc.). Ne pas padder d'exotiques (rule 28 DS figé).
