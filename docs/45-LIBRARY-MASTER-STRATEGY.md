# 45 — Stratégie maître : bibliothèque 1000+ components + DS minimaliste + studio créatif

> Vision Simon (2026-06-11, 5 directives convergentes). Source de vérité du méga-chantier.
> Fondé sur 3 cartographies : catalogue/variantes, DS Studio/persistance, audit chiffré du socle DS.

## 1. La vision (ce que Simon veut)

Transformer le catalogue (≈150 types) en une **vraie bibliothèque de blocks pro** (niveau Figma/Webflow), **1000+ components** organisés en taxonomie à 4 niveaux :

```
CATÉGORIE  (ex: hero-header-sections, services, pricing, testimonials…)
└─ FAMILLE     (un type structurel : hero split, hero centered, bento…)
   └─ VARIANTE     (layout : 3fr 1fr, 1fr 3fr, 1fr 1fr 1fr, 1fr 2fr 1fr, 6fr 1fr 1fr,
   │                bento asynchrone, mosaïque, multi-lignes asymétriques ; classique
   │                symétrique ET créatif awwwards ; avec/sans image, mask, ruban, géométrie)
   └─ DÉCLINAISON  (palette DS, typo, taille titres, densité atomes/molécules, effets)
```

- Couverture **historique des styles web design 2010→2026** (les familles pertinentes par époque/style).
- **Adaptable par client** : on change les variables du DS Studio → tout le catalogue se repeint au style voulu. Certaines familles restent + pertinentes selon le style (le catalogue s'adapte, mais on choisit les blocks adéquats).
- **Valeurs DS uniquement** : variables DS + classes utilitaires/Tailwind + classes déjà créées. Tout **listé sans oubli** dans le DS Studio.
- **DS minimaliste** : un socle TRÈS clean de classes + variables ; toutes les sections reposent sur les mêmes classes, qui reposent sur les mêmes variables ; quelques spécificités ciblées par famille/variante/déclinaison/catégorie.
- Workflow : on génère un DS par client (valeurs adaptées au style) → on sélectionne les blocks → l'agent IA orchestrateur (ou le designer sur TinaCMS) compose les pages.

## 2. Modèle instance / global (Figma-like) — directive 4

- **STYLE = global** : la source de vérité du style d'un block = le composant `.astro` (couche 3). L'éditer propage à **toutes les instances** (globales ou non). C'est la « Règle d'or ANTI-ORPHELIN » du CLAUDE.md, déjà en place.
- **CONTENU = local par défaut** : chaque page consomme `sections:[...]` → chaque usage = une **instance** avec son propre contenu (props/frontmatter MDX). Modifier le contenu d'une instance n'impacte pas les autres.
- **Instance globale (contenu)** : une instance liée à une source partagée (content-collection) → la bibliothèque sert de **miroir** : modifier le contenu en lib se propage aux instances globales. Les instances locales gardent leur override.

## 3. État réel (cartographies + audit — vérifié)

- **Socle tokens SAIN** : 115 tokens, 96 % consommés (12 823 usages `var()`), gates en place (`tokens.css` verrouillé par `design-system.lock.json`). La dette n'est PAS là.
- **Dette = styles scoped** : 2 091 classes scoped uniques dont **1 933 one-off (92 %)**, **280 groupes dupliqués cross-fichiers** qu'aucun outil ne mesure (angle mort de `gen-ds-registry.mjs`).
- **Pas de schema de base partagé** : `background` copié-collé 122×, `variant`/`layout`/`columns` ad hoc (~17 occurrences, nommage incohérent).
- **Idiome déclinaison couleur réel = `data-bg`** (106/122 sections, 87 %). `[data-palette]`/`[data-density]` n'existent pas. Tailwind v4 importé mais 0 utility consommée (10 tokens `@theme` morts).
- **DS Studio** : édite déjà les 115 tokens live (`setProperty` + injection iframes). Catalogue listé mais iframe rechargée au change de type. **Persistance « word de sécurité » EXISTE** : `/api/ds/save` dev-only, garde `DS_SAVE_KEYWORD`, pipeline git anti-main, écrit `tokens.css`. Presets = localStorage only (pas de persistance serveur).
- **Atelier de section LIVRÉ** (commit 4839398) : édition props live sans reload (fondation studio créatif).

## 4. Architecture cible — 4 couches (paramétrage, PAS duplication)

| Couche | Quoi | Volume | Rôle |
|---|---|---|---|
| 1. **Variables** | ≈92 tokens (après purge) | fixe | édité par DS Studio → repeint tout. Ce que le client change. |
| 2. **Classes utilitaires partagées** | ≈30 (`.wrap*`, `.sec`, `.sec-hd`, `.btn-*`, reveals) + axes d'état `data-bg` (puis `data-layout`/`data-density`) | fixe | langage commun de toutes les sections. Reposent sur couche 1. |
| 3. **Composants-familles** | ≈150 types Zod (1 type = 1 famille) | ~150 | le STYLE global (Figma master). Reposent sur 1+2. |
| 4. **Presets = Variantes × Déclinaisons** | `section-presets.ts` (combinaisons layout × palette × density × effects + demo) | **1000+** | sélectionnables, sauvegardables via DS Studio. Le volume. |

Pourquoi : 1000 types Zod dupliqués = dette × 1000. Le volume vient de presets sur ≈150 composants paramétrés → ~5-7× moins de code, chaque preset conforme aux gates par construction.

## 5. Phasage (ordre anti-dette — socle AVANT volume)

- **Phase A — Consolidation socle « DS minimaliste »** (EN COURS). Quick wins de l'audit, sans changer le rendu :
  - A1 ✅ règle globale `[data-bg='ink']` (muted/hairline/hairline-strong) + purge 82 composants + fix 3 bugs padding (`var(--section)`→`--section-base`). Réduit la dette ink d'un coup.
  - A2 emphase serif globale (tue ×73+×49 duplications) · A3 adoption `.sec`/`.sec-hd` (×34/×31) · A4 purge 11 tokens orphelins + fusions + `@theme`→vars · A5 étendre `gen-ds-registry.mjs` au scan scoped (mesurer les 280 groupes) · A6 fix 10 `var(--spacing-section)` résiduels pages + étendre gate rhythm aux pages.
  - Cible mesurable : duplicateGroupCount scoped 280→<50, tokens 115→~92, classes scoped 2091→~1200, 0 changement de rendu (gates verts + GF-1).
- **Phase B — Système de variation** : `sectionBaseSchema` mixin (background/palette/layout/density/effects) dans `sections.ts` ; `src/lib/section-presets.ts` (nouveau touchpoint) ; `family` sur `SectionDescriptor` ; classes `.sec--layout-*` (grid-template via CSS var) + `data-palette`/`data-density` (ajoutés APRÈS consolidation de `data-bg`) ; routing `/preview/[type]/[preset]` ; extension `check-touchpoints` au 6e touchpoint presets.
- **Phase C — DS Studio créatif** : généraliser l'atelier (tous champs + instance overrides Map par instance) ; supprimer le reload `loadCatalogType` ; **save preset** via nouvelle route `POST /api/ds/preset` (réutilise garde `DS_SAVE_KEYWORD` + pipeline git) → `src/data/ds-presets.json` + bloc `[data-theme='<slug>']` dans `src/styles/themes.css` (effet CSS réel) ; `DEMO_PRESETS` lus depuis le JSON (variante sauvée = sélectionnable).
- **Phase D — Production en masse** : vagues multi-agents (1 catégorie/agent, worktrees isolés), 40+ presets/catégorie, styles 2010→2026. GF-1 sur CHAQUE preset.
- **Phase E — Listing DS Studio exhaustif** : tout listé sans oubli (combler les angles morts de l'audit).

## 6. Blocage opérationnel

- **Déploiement Vercel bloqué ~24 h** : quota Hobby `api-deployments-free-per-day` (100/24 h) atteint. Tout le travail avance et se valide en **GF-1 LOCAL** (build réel + `serve-dist.mjs` = parité prod). La prod rattrape au reset glissant OU upgrade Pro (décision Simon, paiement).

## 7. Décisions structurantes (validées par défaut, ajustables)

1. Volume par **presets paramétrés**, pas types dupliqués (couche 4). 
2. **`data-bg` consolidé d'abord**, `data-palette`/`data-density` ajoutés ensuite (1 mécanisme d'état par axe — recommandation audit).
3. Persistance presets = JSON committé + `themes.css`, via extension de l'intégration dev-only existante (word de sécurité réutilisé).
4. STYLE global (composant) / CONTENU local (instance) / instance globale = miroir content-collection.
