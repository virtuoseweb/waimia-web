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

- **Socle tokens SAIN** : ≈**121** tokens (re-mesuré 2026-06-13 ; le « 115 » initial était périmé), ~96 % consommés (~**12 k** usages `var()`), gates en place (`tokens.css` verrouillé par `design-system.lock.json`). La dette n'est PAS là.
- **Dette = styles scoped** : chiffre exact PÉRIMÉ (« 2 091 » écrit à la main → re-mesure 2026-06-13 ≈ **2 800 classes scoped distinctes all-src / ~1 370 mono-usage**). Reste l'angle mort de `gen-ds-registry.mjs` (à GÉNÉRER, méthode figée — cf `07-health-audit.md` bannière). ⚠️ « réutilisé souvent » ≠ « correct » : une classe répliquée peut être une divergence d'origine (cf §9.1).
- **Pas de schema de base partagé** : `background` copié-collé 122×, `variant`/`layout`/`columns` ad hoc (~17 occurrences, nommage incohérent).
- **Idiome déclinaison couleur réel = `data-bg`** (107/123 sections, re-mesuré 2026-06-13). `[data-palette]`/`[data-density]` n'existent pas. Tailwind v4 importé, **~9 utilities résiduelles seulement** (quasi-mort ; `@theme` non-`inline`, cf `audits/02` — le « 0 utility » littéral était imprécis).
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

## 8. Décision Tailwind — ACTÉE (2026-06-11, analyse de fond + context7)

**Question Simon** : pour l'industrialisation, adopter les utilities/variables/attributs Tailwind v4 (quitte à un refactor massif) + variables maison limitées, OU garder l'idiome maison ?

**Verdict : Option C — HYBRIDE, migration incrémentale (jamais big-bang).**

Fait technique décisif (sourcé context7 `/websites/tailwindcss`) : les variables `@theme` de Tailwind v4 **sont des CSS custom properties**. En mode **`@theme inline { --color-accent: var(--accent) }`**, l'utility `bg-accent` compile vers `background-color: var(--color-accent)` → **redéfinir `--accent` à runtime via `setProperty` repeint toutes les utilities**. Donc Tailwind v4 et l'idiome maison **ne sont pas concurrents** : avec `@theme inline`, ils partagent le MÊME mécanisme de theming. ⚠️ Sans `inline` (état actuel), Tailwind fige la valeur dans l'utility → le DS Studio ne pourrait plus repeindre. L'état présent (`@theme` non-inline + 0 utility consommée + 10 tokens morts) = pire des deux mondes.

**Principe directeur (à graver)** : les **tokens maison restent l'UNIQUE source de vérité**. Tailwind ne les possède pas, il les **consomme** via `@theme inline`. Le DS Studio édite la source ; Tailwind + CSS scoped + `data-*` repeignent ensemble.

**Répartition des 3 registres** :
1. Structurel répétitif (bg/text, spacing, flex/grid) → **utilities Tailwind sémantiques** mappées sur les tokens.
2. Axes de variation (palette/layout/density) → **`data-*` + `@custom-variant`** (formalise l'idiome `data-bg`/`data-layout`/`data-density` déjà en place).
3. Créatif / signature (masks, clip-path, géométrie, bento async, awwwards) → **CSS scoped** intouché. La différenciation reste libre.

**Chemin de migration (incrémental, zéro big-bang — conforme zéro-dette)** :
1. **Fondation** : convertir le `@theme` mort → **`@theme inline`** pointant vers TOUS les tokens consommés. Validation GF-1 : DS Studio bouge `--accent` → une utility `bg-accent` test repeint en live (screenshot + `getComputedStyle`).
2. **Axes** : déclarer `@custom-variant data-bg-ink (&[data-bg=ink])` etc. (additif, 0 migration de composant).
3. **Migration opportuniste** : quand on touche un composant, remplacer le *structurel* de son `<style>` par utilities ; **laisser le créatif en scoped**. Jamais de masse.
4. **Presets** : un preset = `{ tokens: {…overrides}, props, data-axes }` — l'agent IA génère des combinaisons déclaratives, pas du CSS.

**Garde-fous (à ajouter à `check:token-purity`)** :
- Tout token couleur dans `@theme` doit être `inline` ET pointer `var(--token-maison)` (jamais de littéral hex).
- Presets = classes **littérales complètes** (jamais `bg-${color}` → casse la purge JIT ; sinon safelist).
- Onboarding : « structurel = utilities, créatif = scoped » + lint densité d'arbitrary values.

**Ordre d'exécution global (anti-dette, validé Simon)** : Phase 1 harmonisation profonde 100% (3 vérifs sévères + juge critique) → Phase 2 DS Studio builder → Phase 3 scale presets. La fondation `@theme inline` s'insère en début de Phase 2 (elle conditionne l'authoring Tailwind des presets, mais pas l'harmonisation des tokens qui est neutre vis-à-vis de Tailwind).

---

## 9. Addendum 2026-06-13 — clarifications Simon (ce doc = source de vérité unique)

> **Source de vérité** : pour l'industrialisation catalogue + DS Studio, **CE doc** (`03`) = stratégie/vision ; `07-health-audit.md` = audit sourcé-code + backlog **A-G** + séquençage builder + spec manifest ; `audits/02-token-coherence.md` = audit cohérence tokens. **Pas d'autre doc** (un doublon `strategy/07` créé par erreur le 2026-06-13 a été supprimé — toute mise à jour future va ICI, on ne génère pas une nouvelle étude).

### 9.1 « Réutilisé souvent » ≠ « correct » (réflexion de fond)
> Méthodologie déjà énoncée par Simon dans `audits/02-token-coherence.md` (2026-06-08, §Méthodo) : « le fait qu'un composant utilise `--a` plutôt que `--b` ne prouve rien — juste que la construction initiale était biaisée ». Ce §9.1 la généralise au catalogue entier.

Une valeur réutilisée 30× n'est pas validée par son nombre d'usages : elle peut avoir **divergé dès le départ** et s'être propagée = **une erreur répliquée 30 fois**. L'anti-éparpillement doit interroger les **fondations** (cette valeur/classe a-t-elle un objectif distinct et juste ?), pas compter les occurrences. Preuves déjà documentées de divergence répliquée : le fallback `var(--paper-2, #EFEBE2)` **faux** dans 9 fichiers alors que le token réel est `#EFE9DD` (`07-health-audit.md §3a`), `--accent-offre` inexistant utilisé en fallback (`CaseStudyTemplate.astro:544`), et les 3 vocabulaires couleur concurrents (`audits/02`). → Le chantier d'unification peut imposer des **refactos massives** : deux classes/variables au même objectif = à fusionner, même très réutilisées.

### 9.2 Deux axes (rappel, ne jamais confondre)
- **DESIGN = TOUJOURS global** : éditer le composant propage à tous ses usages (global ET instancié). C'est la règle anti-orphelin.
- **CONTENU = 2 modes** : GLOBAL (source unique référencée → propage) vs INSTANCE (design propagé, valeurs de contenu propres). Cf §2 ci-dessus.

### 9.3 Finalité no-code (précision Simon) — les deux SPA, UI/UX impeccable
DS Studio (variables/valeurs) et Catalogue (composants : catégorie→famille→variante→déclinaison) = **deux mini-SPA, sources de vérité couplées, parfaitement bidirectionnelles**. UI/UX impeccable et rangée exigée, pour **trois acteurs** : Simon, des designers, et **Claude** (browser-control MCP + computer-use). Doivent permettre, sans markup orphelin :
- **Composer une page** : pour chaque section, choisir catégorie → famille/variante/déclinaison ; prévisualiser ; **enregistrer la composition → nouvelle page**.
- **Créer une variante** à partir d'un composant existant, en choisissant son **état CONTENU global ou instancié**.
- **Créer depuis zéro** en piochant les variables du DS Studio (ouvrir le DS Studio, choisir les valeurs) puis créer la section ; ou réutiliser l'existant.
- Chaque création **s'enregistre proprement au catalogue** (4 touchpoints sync). Cible ultime : Claude génère un **nouveau site** (style différent, nouvelles compositions) en pilotant ces deux SPA.

### 9.4 Régime DS (boundary exacte)
0 nouvelle **variable/token DS** ; ✅ nouvelles **valeurs/classes Tailwind**, calculs, transparences, déclinaisons **sur l'existant** ; ✅ nouveaux **composants/familles/variantes/déclinaisons** au catalogue (objet du chantier template, via DS Studio + variables DS + 4 touchpoints). Préférer la composition si une famille couvre ~80 %. Réutiliser au maximum les **mêmes** classes/variables = condition de « je change une valeur → tout le catalogue se met à jour ». (Rule globale 28 « 0 nouvelle section » = scopée Amploi `astro-tina-site-v1`, NE s'applique PAS ici.)

### 9.5 Chantiers
Les chantiers d'industrialisation = **backlog A-G de `07-health-audit.md §2`** (ne pas créer de nouveaux labels). Prioriser A (kill hardcoded direct) + B (manifest par-section) → D+F (consolidation classes + naming) → C (migration templates→registry, le vrai déblocage builder) → E (arbitrage tokens) → G (orphelins). Tout chantier = preuve GF-1 (les deux SPA sont des apps : flow réel testé).
