# 45 — Stratégie maître : bibliothèque 1000+ components + DS minimaliste + studio créatif

> Vision Simon (2026-06-11, 5 directives convergentes). Source de vérité du méga-chantier.
> Fondé sur 3 cartographies : catalogue/variantes, DS Studio/persistance, audit chiffré du socle DS.
>
> **Récolte de blocks externes** : l'inventaire sourcé des composants/sections distinctifs à
> récupérer depuis le site VirtuoseWeb (virtuoseOS) pour alimenter cette bibliothèque vit dans
> [08-harvest-virtuoseos-catalogue.md](08-harvest-virtuoseos-catalogue.md) (à adapter aux tokens DS, rule 60).

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
| 3. **Sections** (composants) | ≈150 types Zod (**1 type = 1 Section**, pas 1 famille — cf §9.6 ; une **Famille** = squelette partagé par plusieurs sections) | ~150 | le STYLE global (Figma master). Reposent sur 1+2. |
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
> Chantier courant DS+page = **`state/09-plan-harmonisation-ds-page-site-web-intelligent.md`** (harmonisation hover par tokens + système de variante + fusion CTA + recomposition page, par phases GF-1).

### 9.6 Taxonomie canonique — catégorie / famille / variante / déclinaison (adoptée Simon 2026-06-13)
Définition unique (FIGÉ #11 matriciel, remplace le #10 « arbre strict intra-catégorie » ; fait foi). Le modèle a **deux questions de classement orthogonales + deux axes de configuration + une unité atomique** :
- **(A) Classement = une matrice à 2 facettes qui se croisent.** **Catégorie = *pourquoi*** (l'intention : comparer, montrer des métriques, pricing, CTA…). **Famille = *comment*** (le squelette structurel : bento, card-grid, duo-contrast, table, band, timeline…). Ce sont deux axes indépendants : un **même squelette sert plusieurs intentions** → la Famille **traverse les catégories**. Une **Section = la cellule `Catégorie ∩ Famille`** (le bloc concret posable).
- **(B) Configuration = des axes orthogonaux réutilisables `Variante` + `Déclinaison`** (on règle une section ; le même axe sert N sections, toutes catégories/familles confondues).
- **Navigation catalogue** = on **browse par Catégorie** (menu haut-niveau, arbre de lecture) ; la **Famille est un filtre transversal** (« montre-moi tous les `card-grid` »), pas un enfant de la catégorie.

Mnémotechnique : **Catégorie = à quoi ça sert (pourquoi) · Famille = quel squelette (comment, trans-catégorie) · Section = le bloc concret = Catégorie ∩ Famille · Variante = quel agencement · Déclinaison = quelle peau.**

| Concept | Nature | Définition | Cardinalité | Porté par (technique) |
|---|---|---|---|---|
| **Catégorie** | facette de classement = *pourquoi* | Intention fonctionnelle ; menu haut-niveau du catalogue. | regroupe **N sections** ; une section a **1 catégorie primaire** | tag + `/categories/[slug]` |
| **Famille** | facette de classement = *comment* (**transversale**) | **Squelette structurel partagé** (bento, card-grid, duo, table, band…) ; porte les **classes CSS de base mutualisées**. **Peut traverser plusieurs catégories.** Éditer la famille (ses classes de base) propage à toutes ses sections. | regroupe **N sections**, potentiellement dans **plusieurs catégories** | classes de base + squelette partagés |
| **Section / Composant** | **unité atomique posable** = `Catégorie ∩ Famille` | Le bloc concret rendu sur une page ; **schéma de contenu propre**. | l'atome (ne contient rien) | **1 type Zod = 1 `.astro`** |
| **Variante** | axe de config (orthogonal) | Config **structurelle** d'une section (container, colonnes, densité, média on/off…). Axe **partagé**, défini une fois, réutilisé. | concerne **N sections** | enum (`sectionBaseSchema`) |
| **Déclinaison** | axe de config (orthogonal) | **Peau / thème** sans changement de structure (palette dark/light, idiome hover). Axe **partagé**, piloté DS Studio. | concerne **N sections** | tokens DS via `data-bg` / `data-hover` |

**Cardinalité (FIGÉ)** : une **Catégorie** regroupe **N Sections** (par intention) ; une **Famille** regroupe **N Sections** (par squelette) et **peut apparaître dans plusieurs Catégories** ; une **Section = `Catégorie ∩ Famille`** (1 type Zod = 1 `.astro`, schéma de contenu propre) ; elle se règle via les **axes Variante + Déclinaison** (réutilisés par d'autres sections). Le **schéma Zod appartient à la Section**, pas à la Famille (correction du 2026-06-13 : l'ancien « famille = schéma Zod » conflait Section et Famille).
- Exemple **trans-catégorie** (le cas qui justifie le modèle) : famille `card-grid` (grille de cartes uniformes, mêmes classes de base) → section `case-card-grid` (catégorie *cas* ; champs titre+desc+métrique) **+** cartes *features* (catégorie *features* ; champs icône+titre+desc) **+** cartes *équipe* (catégorie *team* ; champs nom+rôle+photo). Schémas différents, **squelette + classes de base partagés** → éditer la famille repeint les trois.
- Exemple **intra-catégorie** (reste valide) : catégorie `comparison` → famille `duo-contrast` (section `comparison-duo`) **+** famille `editorial-table` (section `comparison-table`). Deux squelettes différents pour une même intention.

**Où vit la base partagée (2 étages, ne pas confondre)** — la « base unifiée » n'est PAS la Famille à elle seule :
- **Base n°1 = globale (le cœur)** : **couche 1 tokens** (126 vars, `tokens.css`) **+ couche 2 utilitaires** (`.wrap`/`.sec`/`.sec-hd`/`.btn-*`/`.reveal*`, `global.css`). Partagée par **TOUTES** les sections, toutes catégories/familles. **C'est elle** qui garantit « je change une valeur DS Studio → tout se repeint ». ✅ réelle et active aujourd'hui.
- **Base n°2 = squelette de Famille** : les classes structurelles d'une lignée (ex. un `.card-grid` : grille + coque de carte + hover), partagées par les sections du **même squelette** (trans-catégorie). S'empile **au-dessus** de la base n°1. La **Section** n'ajoute par-dessus que son spécifique (`.cases-*`).

> **État actuel vs cible (honnêteté GF-4)** : la **base n°1** existe et marche (126 tokens + utilitaires globaux). La **base n°2 (squelette de Famille) n'existe PAS encore** : les sections d'un même squelette **dupliquent** au lieu de partager. Mesuré 2026-06-13 sur la lignée `card-grid` : `CaseCardGrid` = 21 classes `.cases-*`, `TeamCardGrid` = 19 `.eq-*`, `ResourceCardGrid` = 21 `.resource-*` ; **seule classe réellement commune aux 3 = `.wrap`** (couche 2). Formaliser le squelette `.card-grid` mutualisé = backlog D/F (`07-health-audit`) + chantier 09. En attendant, « Famille » est un **tag de squelette** (la base n°2 est une cible). Le passage en **trans-catégorie élargit** cette future base n°2 (un seul `.card-grid` pour cas + team + resource) au lieu de la cloisonner par catégorie.

> ✅ **Décision FIGÉE (sign-off Simon 2026-06-13)** : **Famille trans-catégorie** (matriciel #11) adoptée. Une Famille = squelette structurel partagé qui **peut traverser plusieurs catégories** (un seul `card-grid` pour cas + features + équipe). Raison : c'est ce qui rend l'invariant « change une valeur → tout le catalogue se repeint » tenable, la vraie duplication (`card-grid`, `bento`) étant trans-catégorie. L'ancien #10 « lignée d'une seule catégorie » est abandonné.

**Application CTA (tranché 2026-06-13)** : `band` (carré, pleine largeur, `FooterCtaBand`) vs `card` (arrondi, contenu, marge crème, pattern `BookSession`) = même contenu (titre + sous-titre + 2 actions), containment différent → **VARIANTE** `container: band | card` d'une famille `cta-final` (catégorie `cta`). Implémentée proprement en chantier 09 Phase C (pas de hack ponctuel).

**Tableau de propriété des axes (FIGÉ) — quel niveau possède quelle différence.** Référence pour trancher TOUS les cas (y compris atomes/molécules ajoutés, variables vs valeurs) :

| Ce qui diffère entre deux blocs | Niveau | Porté par |
|---|---|---|
| Intention (à quoi ça sert : comparer / métriques / pricing / témoignage…) | **Catégorie** | tag / menu catalogue |
| Squelette structurel fondamental (2-col / table / bento / card-grid / band / timeline…) | **Famille** | classes de base + squelette partagés (trans-catégorie) |
| Champs/slots **requis** différents **à squelette + intention égaux** (même `card-grid`, mais champs *cas* vs *équipe*) | **Section** | schéma Zod propre (type distinct, **réutilise les classes de la famille**) |
| Atome/molécule **non prévu** au schéma (nouveau contenu requis) | **Section** (nouveau schéma ; **+** nouvelle **Famille** seulement si le squelette aussi change) | schéma Zod |
| Atome/molécule **optionnel déjà prévu** au schéma (badge, média, avatar, ligne meta… on/off) | **Variante** | prop bool/enum |
| Agencement géométrique du **même** contenu (colonnes 2/3/4, conteneur band/card, densité, alignement, ordre, containment/largeur, radius **structurel**) | **Variante** | prop enum (`sectionBaseSchema`) |
| **Valeur** d'un token DS (couleur, radius cosmétique, ombre, espacement de thème, palette dark/light, idiome hover) | **Déclinaison** | valeur de token via `data-bg` / `data-hover` / thème |
| **Quelle variable** est référencée pour un rôle (`--accent` ici vs `--ink` là, même rôle) | AUCUN niveau → **divergence à unifier** | §9.1 : un rôle = un token sémantique ; on change sa VALEUR, jamais la variable référencée |

**Invariant d'industrialisation (le plus important)** : le **mapping rôle→token est FIXE dans la famille** (squelette partagé) ; une déclinaison change la **valeur** d'un token, **jamais** le token référencé. C'est précisément ce qu'un squelette **trans-catégorie** permet : `card-grid` mappe ses rôles une fois → changer une valeur dans le DS Studio repeint `case-card-grid`, les cartes *features* et *équipe* d'un coup. Swap de variable pour un même rôle = éparpillement à corriger, pas une déclinaison.

**Où chaque niveau se manipule (figé, pour les 4 consommateurs)** :

| Niveau | Catalogue (UI/UX) | DS Studio | Outil création/édition section | Règle agent IA |
|---|---|---|---|---|
| **Catégorie** | filtre / menu haut (par intention) | — | choisir à la création | classer par intention (*pourquoi*) |
| **Famille** | filtre **transversal** (« tous les `card-grid` ») | — | éditer le **squelette + classes de base** (propage à toutes ses sections, toutes catégories) | « squelette différent → autre famille ; même squelette ailleurs → réutiliser la famille » |
| **Section** | une carte (cellule Catégorie × Famille) | — | créer/éditer le **schéma Zod** (champs) du bloc | « champs requis différents à squelette+intention égaux → nouvelle section qui réutilise la famille » |
| **Variante** | sélecteur/onglet dans l'aperçu de la section | — | toggles enum (`container`, `columns`, `density`, options on/off) | « même info, autre agencement → prop variante, pas nouveau composant » |
| **Déclinaison** | switcher thème (dark/light, hover) sur l'aperçu | **éditer les valeurs de tokens** (+ créer un token = niveau 2) | choisir `data-bg` / `data-hover` | « seulement la peau → token/déclinaison, jamais dupliquer le composant » |

**Test rapide (ordre, 1er « oui » gagne)** — raccourci des tableaux ci-dessus : (1) **squelette structurel** différent (table vs bento vs card-grid…) → **Famille** ; (2) même squelette + même intention mais **champs requis différents** ou atome non prévu au schéma → **Section** (nouveau type Zod qui réutilise la famille) ; (3) même section, autre **agencement/géométrie** ou atome optionnel déjà prévu basculé → **Variante** ; (4) seulement la **peau** (valeurs de tokens, palette, hover) → **Déclinaison**. Doute Famille/Section : le **squelette** (classes de base) change = famille ; seuls les **champs** changent à squelette égal = section. Doute Variante/Déclinaison : ça touche le **layout/la boîte** = variante ; seulement **couleur/hover/valeur** = déclinaison.

Règles d'application :
- **Déclinaison dark/light déjà câblée** = `background: enum(paper|paper-2|paper-3|ink)` → `data-bg` (107/123 sections). Idiome déclinaison hover = `data-hover="surface|tint|lift"` mappé sur les **tokens DS existants** (`--dur-hover`/`--dur-trim`, `--ease*`, `--paper-2`/`--ink-2`, `rgba(var(--accent-rgb),…)`, `--shadow-lift`/`--shadow-card-hover`) — **0 nouveau token** (recon 2026-06-13 : le DS couvre déjà tous les rôles ; chantier 09 Phase B).
- **2 niveaux de perso** (cf `state/09 §1`) : niveau 1 = changer la **valeur** d'un token DS → repeint toutes les classes (aucune nouvelle classe) ; niveau 2 (exception délibérée) = nouveau token + nouvelle déclinaison (nouvelle classe).
- **Conservation** : une famille/variante/déclinaison correctement générée et cataloguée n'est **jamais supprimée** parce qu'une page ne l'utilise pas ; elle enrichit le catalogue, on choisit par page. Non conforme DS → **remise en conformité** (tokens/classes partagés), pas suppression.

## 10. Refonte « fluid modular scale » — base mathématique unique pilotable (plan staté, 2026-06-14)

> Vision Simon (verbatim 2026-06-14) : « des fonctions mathématiques calculées sur une base personnalisable qui redéfinit tous les espacements et valeurs… tout fluide… plusieurs systèmes de mesure du très petit au très grand pour chaque unité (block/section/card/button/padding/margin) + typo… puis réutiliser dans les sections/composants du catalogue… migration complète, remplacement de toutes les valeurs statiques + DS Studio épuré des doublons/variables inutiles. »
> Méthode canonique = fluid modular scale (Utopia.fyi) confirmée par recherche (web.dev 2025 baseline `cqi`/`pow()`, moderncsstools 2026). Source de vérité d'exécution de CE chantier. Remplace la doctrine R4 « crans fixes » (tokens.css:160-164) pour l'espacement vertical.

### 10.1 — Décisions actées (Simon, AskUserQuestion 2026-06-14)
- **Ratio DUAL** : ratio plus petit en mobile (≈1.2) que desktop (≈1.333). Hiérarchie punchy desktop SANS aéré mobile (règle empiriquement le 160/256px mesuré trop grand à 375px). Une base, 2 ratios.
- **Unité rem + vw** : tailles en rem (a11y zoom OK), interpolation vw. Standard Utopia.
- **Périmètre FLUIDE** : `--text-*`, `--space-*`, `--section-*`, gaps, paddings card/button. **Restent FIXES** : `--radius-*`, bordures 1px, `--dur-*`, font-weight (ne scalent pas avec le viewport de façon sensée).
- **Échelle** : on FLUIDIFIE les 15 crans `--space-1..15` existants (déjà une palette xs→xxxl riche) au lieu de renommer en 2xs..3xl (zéro churn). Aliases sémantiques (section/card/button) en dérivent.

### 10.2 — Décision pivot : CSS calc() paramétrique LIVE (pas clamps précalculés)
La base doit recalculer TOUT en direct dans le navigateur (DS Studio `setProperty` → repeint global). Donc racine paramétrique en CSS pur :
```
:root{
  --fl-min-vw: 360; --fl-max-vw: 1440;        /* plage d'interpolation */
  --fl-base: 1rem;                             /* pas 0 */
  --fl-ratio-min: 1.2; --fl-ratio-max: 1.333; /* ratio dual (knobs Studio) */
}
```
Chaque pas dérive base × ratio^n (via `pow()`, supporté 2026), avec un `clamp(min, slope·100vw + intercept, max)` où min utilise ratio-min et max ratio-max. Helper unique (mixin CSS custom-property ou util `--fl-step(n)`) → 0 valeur en dur. Clamps précalculés écartés : casseraient le live-tweak (relire `utopia.fyi/blog/clamp`).

### 10.3 — Le levier : migrer les DÉFINITIONS, pas les sites d'appel
`--space-*` consommé 836× via `var()`, `--section-*` 103× → redéfinir ces tokens (px→clamp math) propage à ~940 usages **sans toucher un composant**. Les titres `--text-*` (9 tokens) sont déjà fluides = modèle à généraliser. Reste à migrer (composants) : ~292 `font-size: clamp()` bruts + ~243 `clamp()` espacement bruts + ~200 px off-grid (14/18/6/10/20px…) → tokens.

### 10.4 — Phasage (anti-dette, GF-1 à chaque phase, branche dédiée)
- **P-A — Socle paramétrique** : racine `--fl-*` + générateur de pas + fluidifier `--space-1..15`, `--section-*`, consolider `--text-*` sur la même base. GF-1 : à `--fl-max-vw` le rendu desktop ≈ identique à l'actuel (preuve byte-proche) ; à 375px ça rétrécit proprement. **Worker (CSS > 3 lignes, GF-2) + arsenal preamble.**
- **P-B — DS Studio param-editor** : remplacer les 115 sliders par token par des knobs GLOBAUX (base, ratio-min, ratio-max, vw-min, vw-max) qui recomputent tout en live + garder override avancé par token. (JS applicatif → worker.)
- **P-C — Migration composants** : remplacer les ~535 clamps bruts → tokens fluides sémantiques. **Mode Workflow** (fan-out, 1 agent/fichier, arsenal preamble + worker-mcp-scoped). Jugement de rôle (quel clamp → quel `--text-*`/`--space-*`), ambigus remontés.
- **P-D — Réécriture des gates** : `check-section-rhythm` (autoriser clamp dérivé d'un token, interdire seulement les clamps bruts hors token) ; `check-token-purity` V8/V9b (rebaser `LITERAL_MAPPINGS`/`SPACE_PX` sur les tokens fluides) ; re-générer `design-system.lock.json` + `ds-registry.json`. Rappel contrainte : `var()` interdit en condition `@media` (gate `check-media-query-var`) → fluidité par clamp/vw uniquement.
- **P-E — Purge** : `--space-14` (0 usage), `--color-*` @theme si utilities Tailwind inutilisées (~1 usage `border-paper`), 144 groupes de classes au corps identique + 280 dupes scoped. Épure le DS Studio (« doublons & dette »).
- **P-F — GF-1 sweep** : Playwright desktop+mobile (375/768/1440) sur N previews + pages clés ; getComputedStyle (tokens résolus, hiérarchie préservée) + screenshots avant/après.

### 10.5 — Risques & garde-fous
- **Blast radius** = tout le site visuel → chaque phase sur branche, GF-1 avant merge, jamais de push direct main.
- **Anti-effondrement hiérarchie** (la crainte R4) : neutralisée par ratio systématique (chaque pas garde le ratio aux 2 bouts). Le dual ratio + mesure mobile = preuve à valider en P-A.
- **A11y** : rem partout (pas px) → zoom navigateur respecté. Vérifier `prefers-reduced-motion` inchangé (durées fixes).
- **Rule 60** : 0 valeur en dur post-migration ; tout dérive de `--fl-*`. Rule 59 : ce doc = source unique (09 pointe ici).

### 10.6 — Addendum 2026-06-14 : échelle étendue + passe migration AGRESSIVE (autorisation Simon)
Simon (verbatim) : « je t'autorise expressément à remplacer et uniformiser même si c'est pas pixel perfect [...] créer plus de valeurs xxs et xxxl et revoir les bases pour une mesure qui remplace/uniformise le plus ». Conséquence sur le phasage :
- **P-C passe 1 (conservatrice, LIVRÉE)** : 103 substitutions clamp→token à ±15 % strict (flotte 6 worktrees mergés), build vert. A laissé ~104 fichiers avec clamps bruts (giants, stats, petit texte, spacing à courbe divergente).
- **5 crans ajoutés à `tokens.css`** (calés sur l'histogramme réel des clamps, rule 60 vérif d'absence) : `--text-label` (13→15, XXS a11y floor 12), `--text-h1-display` (34→72, comble le gap 56→88), `--text-stat` (36→88, chiffres), `--text-display` (48→128, XXL), `--text-mega` (60→180, XXXL). Crans additifs : aucun token existant modifié (préserve la passe 1).
- **P-C passe 2 (agressive)** : Workflow 13 agents Sonnet (`/workflows`), mapping = token le plus proche PAR MAX, sans seuil ±15 %. Texte → `--text-*` ; padding/margin/gap → `--space-*` (déjà fluide) ; padding vertical de section → `--section-*` ; bloc intra-section ~28-48 → `--spacing-block`.
- **Re-dérivation ratio-pure de toute l'échelle** = option future P-B (knobs DS Studio), PAS exécutée à chaud (invaliderait la migration en cours, rule 30 §3). Décision tracée : `~/.claude/night-sessions/2026-06-14/decisions/0019-echelle-fluide-etendue-passe-agressive.md`.

### 10.7 — Addendum 2026-06-14 : SPLIT fluide / fixe (correction Simon, best practice agences)
« Tout fluide » (P-A) était excessif. Modèle correct, posé au niveau du TOKEN (indirection → 0 re-migration) :
- **FLUIDE (clamp)** : typo H1/H2/H3 + lede/pull-quote/display/mega · espacements de **section** (`--section-*`) · `--space-7..15` (40→256px, layout / gros gaps / hero / cartes très larges).
- **FIXE** : `--space-1..6` (4/8/12/16/24/32px = padding composant, gaps internes, boutons, champs, cards, icônes) · radius (`--radius-*`) · petit texte (`--text-body-*`/ui/caption/label). Plus prévisible, plus cohérent, évite les micro-variations inutiles (`gap: clamp(8px,1vw,12px)` = anti-pattern).
- **Cutoff = 32px** : ≤32 interne composant (fixe), ≥40 layout/section (fluide). Ajustable via DS Studio. Tous les tokens (fixes inclus) restent visibles/éditables dans le DS Studio.
- **Objectif Simon** : peu de tokens, très standardisés, 0 variance (pas 2 valeurs proches-mais-différentes dans le catalogue) → DS↔catalogue 100 % alignés, la personnalisation du DS affecte direct le catalogue. Reste P-E : standardiser icônes + chasser les variances résiduelles. Décision tracée : `decisions/0020-split-fluide-fixe-tokens.md`.

## 11. Addendum 2026-06-15 — clarification 3-audits + atelier `/library` + plan de vagues (ce doc = source unique, rule 59)

> Déclencheur : Simon constate sur la prod que roi-band et « plusieurs sections ressemblent mais ne sont pas vraiment ce qu'on avait » + animations « plates » en preview + catalogue trop concentré dans `/agence/design-system#sections`. 3 agents Opus lancés (comparaison `origin/feat/contenu` ↔ HEAD, lecture seule). Branche de travail : `feat/design-overhaul`.

### 11.1 Verdict empirique (3 audits croisés)
1. **Animations PAS perdues** : `src/pages/preview/[type].astro:63-72` neutralise volontairement tous les reveals (`opacity:1!important; transition:none!important`) → « plat en preview » est par design. Reveal réel prouvé sur `/acquerir` : `opacity 0→1` au scroll. Effets section-par-section 100 % conservés (HEAD en AJOUTE : `motion-signature.ts` count-up, `StatCounterValue.tsx`). Seule nuance : quelques instances ont permuté de variant reveal (zoom-in 18→8, mask-up 46→36), pas une perte de capacité.
2. **Réassemblage (hypothèse Simon « décomposé mais pas réassemblé ») VRAIE à ~90 %** : sections orphelines fidèles à recomposer = `roi-band`, `fit-columns` (la section FIT « Pour la DSI… / VOUS ÊTES FAIT POUR NOUS SI / ON REFUSERA SI » existe via `FitColumnsSection.astro`, rendue par HubTemplate), `department-stack`, `department-cta`, `case-split` (composée seulement sur `agence/index.astro`). **1 seule vraie perte de design** : la section **Proof d'OffresDetail** (`off-proof` : band PullQuote + grille KeyMetric 7-col + Dingbat rule) → à recréer. **Perte i18n** : `src/pages/en/` des index cas/offre absent. **Aplaties à ré-enrichir** : Pain Points (sous-ligne meta), FAQ éditoriale → générique, Offres Problem/Method/Tools.
3. **Typo fluide = régression RÉELLE et systématique** (~78 fichiers) : les `clamp()` numéraux/héros géants (180-200px) routés vers `--text-display` (cap 116) ou `--text-h1` (cap 80) → numéraux −36 à −60 %. **Cause-racine identifiée** : les crans fluides décidés en §10.6 (`--text-mega`→180, `--text-stat`→88, `--text-display`→128) **n'ont jamais été mergés sur cette branche** (vérifié 2026-06-15 : ABSENTS de `tokens.css`, display toujours 116). § 10.6 = doc en avance sur le code → **divergence à résorber** (W1 ci-dessous).
4. **Complétude catalogue** : catalogue strictement mono-démo (156 types ↔ 156 démos, 0 suffixe de déclinaison). `KeyMetric` (36 combinaisons) + 8 atomes éditoriaux = 0 % catalogués. Dark exposé 10/135 sections ink-capables. 2 reveals définis-mais-morts (`reveal-curtain`, `reveal-split-letter`). Layout cas index featured-grid orphelin inliné (`cas-clients/index.astro:104-142`, jamais catalogué).
5. **Infra Phase B partiellement LIVRÉE** (vérifié HEAD) : `src/lib/section-presets.ts` ✅, `src/styles/layouts.css` (`data-layout` split-3-1/even-2-3-4/center-1-2-1/editorial-6-1-1 + `data-density`) ✅, route `/preview/[type]/[preset]` ✅ → le build-out s'appuie dessus.

### 11.2 Décision architecture atelier `/library` (sign-off Simon 2026-06-15)
Les deux SPA (§9.3) prennent leur forme dédiée. Décisions (Simon) :
- **Namespace** : atelier `/library/*` (Catalogue + Studio + Hero Lab). Public OK mais **non référencé** : retiré du mega-menu, **lien footer** (nav interne), `noindex` (déjà présent), **redirects** depuis `/agence/design-system` + `/agence/ds-studio`.
- **Forme** : vraies apps **multi-routes Astro + islands React** pour le stateful (éditeur tokens, switch de variantes, lecture d'animation). `/library` (hub) · `/library/[category]` (intentions) · `/library/[type]` (section + variantes + toggle « voir l'animation ») · `/library/studio` · `/library/hero-lab`. Décompose le mono-page `design-system.astro` (1810 l). « SPA » au sens app-like, pas bundle-unique (Astro MPA-first, routes `noindex` partageables).
- **Finalité** : outillage d'industrialisation pour 3 acteurs (Simon, designers, Claude browser-control). Chaque variante pilotée `var(--token)` = harnais de preuve de la sync DS-Studio.
- **Cible profondeur** (Simon 2026-06-15) : **≥20 sections exploitables/catégorie, ≥5 familles/section, ≥5 variantes/déclinaisons** chacune — atteint par familles × variantes × déclinaisons + **presets** (couche 4, §4), création de nouvelles familles/sections **uniquement** où le squelette manque (PAS de duplication de types Zod, §4/§9.4).

### 11.3 Plan de vagues (socle avant volume, conforme §5)
- **W1 — Réparer la typo numérale géante** [EN COURS, worker Opus worktree] : lander les crans fluides §10.6 dans `tokens.css` + re-router KeyMetric/héros/numéraux régressés (mapping audit 3) vers `var(--token)` de rôle. GF-1 : numéral roi-band/hero-stat mesuré > 116px desktop. Répare la plainte initiale Simon (chiffres roi-band trop petits).
- **W2 — Recomposer les orphelines** : `roi-band`/`fit-columns`/`case-split`/`department-*` sur les pages Solutions/Offres ; recréer `off-proof` ; restaurer `src/pages/en/` index cas/offre ; ré-enrichir les sections aplaties (Pain Points meta, FAQ éditoriale, Offres Problem/Method/Tools).
- **W3 — Atelier `/library` + étoffer le catalogue** : construire les 2 SPA multi-routes (footer/noindex/redirects) ; cataloguer KeyMetric + 8 atomes éditoriaux + le featured-grid cas ; exposer déclinaisons dark + reveals sélectionnables ; produire familles/variantes/presets jusqu'à ≥20/catégorie via Phase B/D. Mode Workflow (fan-out par catégorie, worktrees isolés), GF-1 par preset.

## 12. Méthode exhaustive d'industrialisation du catalogue (2026-06-15, assemblée de 2 énumérations + recherche injection/modes)

> Source : agents `enum-layouts` (vocabulaire layout) + `enum-taxonomie` (16 catégories canoniques) + recherche orchestrateur (injection `SectionsRenderer` + `reference()` content-collections). Détail brut des énumérations = transcript de session 2026-06-15. CE §12 = la méthode actionnable.

### 12.1 Principes d'efficacité (invariants qui rendent le fan-out rapide ET sûr)
1. **Harnais d'abord, volume ensuite** (socle avant volume, §5) : 0 fan-out tant que `sectionBaseSchema` + vocabulaire layout + squelettes de famille + recette + gates + coquille `/library` ne sont pas prêts. Fan-out prématuré = 28 agents qui réinventent = dette × 28.
2. **Volume par PRESETS, pas types Zod dupliqués** (§4/§9.4) : ~40 nouveaux types max (cases vides `Catégorie ∩ Famille`) + ~1 600-2 500 presets sur ~150 composants paramétrés.
3. **Familles trans-catégorie réutilisées** (§9.6) : 1 squelette `card-grid` sert 6 catégories. L'effort de création se concentre sur les FAMILLES, pas les variantes.
4. **0 hardcode → `var(--token)`** : tout axe de layout = alias de composition (`--sec-grid`, `--sec-width`…) pointant des tokens existants. 0 nouveau token DS.
5. **GF-1 par preset** : preuve (screenshot + getComputedStyle), pas assertion.
6. **Worktree isolé par agent** (1 catégorie/agent) : 0 collision.
7. **Gate = qualité par construction** : `check-touchpoints`/`check-presets`/`check-token-purity`/`check-media-query-var` rendent l'output conforme ou rouge.

### 12.2 Le harnais (Phase 0, spec — prérequis au fan-out)
**A. `sectionBaseSchema` (mixin Zod partagé)** — ⚠️ CORRECTION 2026-06-15 (GF-4, j'avais grepé le mauvais nom) : il EXISTE déjà sous le nom `presentationSchema` (`src/schemas/sections.ts:23-27`, axes `background`/`layout`/`density`, appliqué via `.extend(presentationSchema.shape)`). MAIS appliqué **3 / 156** types seulement ; `background` redéfini **inline 135 fois** au lieu d'étendre le mixin. Travail réel = **consolider (appliquer partout) + élargir les axes**, pas créer. Axes à porter (injecté dans toutes les familles) :
- Présentation/variante : `layout` (enum `KNOWN_LAYOUTS` étendu), `density` (compact/base/ample/grand), `align` (start/center/end/justify), `width` (bleed/grand/wide/normal/read/narrow), `gap` (none/tight/base/loose), `frame` (band/card), `areas` (media-left/right/top/bottom/z/f), `order-media` (swap), `stack` (reflow/keep-2/swap-order/scroll-x), `reveal` (sélectionnable, axe nouveau).
- Déclinaison/peau : `background` (paper/paper-2/paper-3/ink, déjà 110 sections), `hover` (surface/tint/lift, tokens existants).
- **Contenu (les 2 modes, §2/§9.2)** : `content: { mode: 'global'|'instance', ref?: reference(<collection>) }`. `instance` (défaut) = props inline ; `global` = source partagée (content-collection) propagée. Généralise le pattern `reference('authors')` déjà en place aux sections.

**B. Vocabulaire de layouts** (← `enum-layouts`, token-pur, gate-aware) — étendre `layouts.css` + `KNOWN_LAYOUTS`. Priorité :
- P1 splits manquants : `split-3-2`/`split-2-3` (ratio 55/45 conversion 2026 ★), `split-2-1`/`split-1-2`, `even-5`/`even-6`, `lead-2-1-1`/`lead-1-1-2`, `golden-ab`/`golden-ba`.
- P2 axes transverses orthogonaux (multiplicatifs) : `data-align-text` ★ (centrage Simon), `data-width`→`--sec-width` (mappe `--wrap-*`), `data-gap`, `data-density=grand`, `data-order-media=swap`.
- P3 areas & bento : `data-areas` (media positionné), `bento-4/6/hero-lead`, `z-pattern`/`f-pattern`.
- P4 responsive & frame : `data-stack` (reflow anti-gate, breakpoints littéraux 768/900/1100 — `var()` interdit en condition `@media`, autorisé dans le corps), `data-frame` band/card, `masonry-3/4`.
- Mapping `era` 2010→2026 fourni (couverture historique des styles).

**C. Squelettes de Famille (base n°2, §9.6)** — n'existent pas (sections dupliquent ; `family` posé sur 2 entrées seulement). Priorité de formalisation (levier = nb catégories × duplication prouvée) : **1. card-grid (6 cat.) · 2. band (4) · 3. duo/split-media (5) · 4. table (4) · 5. stat-grid (3) · 6. timeline (2)**, puis list/accordion/tabs/marquee/masthead/terminal-shell/form-panel/prose à la demande. Chaque squelette = 1 set de classes de base + mapping rôle→token FIXE (invariant : une déclinaison change la VALEUR, jamais le token référencé).

**D. Injection + modes global/instance + CMS** — ⚠️ CORRECTION 2026-06-15 (GF-4) : TinaCMS n'est PAS futur, il est **déjà câblé** (`tina/config.ts` 484 l, `@tinacms/astro@0.5.0`, `tinacms@3.9.1`, `tina/__generated__/`, scripts `dev:tina`/`build:tina`). `SectionsRenderer.astro` (map `sections:[...]`→composant) est enveloppé par `TinaIsland` en DEV sur la collection `offres` (`src/pages/offres/[...slug].astro:82-87`) → édition visuelle git-based déjà fonctionnelle. Modèle = exactement « fichiers MDX = BDD, build/push = serveur ». STYLE toujours global (le `.astro`). Mode global = champ Tina `reference` (l'éditeur pointe une entrée de collection partagée, propagée) ; mode instance = champs inline. Généralise le `reference('authors')` déjà en place. **Le vrai blocage CMS = §13** (voir ci-dessous).

**E. Recette d'authoring** (le « bon pattern » remis à chaque agent) : 1 doc + 1 `.astro` squelette + le préambule worker = axes `sectionBaseSchema`, `var(--token)` only, réutilisation du squelette de famille, GF-1 par preset, sync 6 touchpoints (registry/demos/schema/composant/presets/layouts).

**F. Gates étendus** : `check-touchpoints` au 6e touchpoint presets ; `check-presets` (KNOWN_LAYOUTS↔layouts.css) ; `check-token-purity` (0 hardcode) ; `check-media-query-var` (0 var en condition media) ; nouveau gate « ≥20 presets/catégorie » = tableau de bord d'industrialisation.

**G. Coquille `/library`** (SPA multi-routes) : `/library` (hub) · `/library/[category]` (par intention) · `/library/[type]` (section + variantes + toggle « voir l'animation ») · `/library/studio` · `/library/hero-lab`. Footer, noindex, redirects depuis `/agence/*`. Islands React pour le stateful.

**H. Pilote** : prouver le pattern de bout en bout sur 1 catégorie non-hero (Stats ou Testimonials) AVANT le fan-out des 28.

### 12.3 Taxonomie canonique (16 catégories, ← `enum-taxonomie`) + universalité
28 sous-catégories incohérentes → 16 canoniques. Cible : ≥20 sections exploitables/catégorie, ≥5 familles/CATÉGORIE, ≥5 variantes/déclinaisons par section (lecture corrigée du libellé, cf 12.6).

| Catégorie | slug | actuel | gap →20 |
|---|---|---|---|
| Hero/Header | `hero` | 31 | 0 (consolider) |
| Features | `features` | ~28 | 0 (dégorger) |
| Testimonials/Cases | `proof-testimonials` | 10 | +10 |
| Comparison | `comparison` | 10 | +10 |
| CTA/Conversion | `cta` | 12 | +8 |
| Stats/Metrics | `stats` | 8 | +12 |
| Logos/Trust-bar | `logos` | 6 | +14 |
| Terminal/Code | `terminal` | 5 | +15 |
| Pricing | `pricing` | 5 | +15 |
| Timeline/Process | `timeline-process` | 10 | +10 |
| FAQ/Objections | `faq` | 4 | +16 |
| Tables/Data | `tables` | 3 | +17 |
| Manifesto/Editorial | `editorial` | 6 | +14 |
| Index/Listing | `index-listing` | 3 | +17 |
| Trust/Legal | `trust` | ~4 | +16 |
| About/Team/Gallery/Contact | `about-team` | 8 | +12 |

**Universalité — COMPLÉTÉE 2026-06-15** (énumération `enum-universal-archetypes` sur 24 archétypes web). Les 16 catégories portent un biais B2B (surreprésentation preuve rationnelle : `comparison`/`terminal`/`tables`/`trust`). Trois axes structurels manquants dominent le web grand public : **commerce/transaction**, **média immersif**, **conversion/communauté**. → **24 nouvelles catégories canoniques** (catalogue cible ~40) :

| slug | intention | familles typiques | archétypes |
|---|---|---|---|
| `product-grid` | produits/articles achetables ou filtrables (prix, badge) | card-grid, masonry, list, carousel | e-commerce, marketplace, immo, resto, média |
| `product-detail` | UN produit central : galerie + variantes + add-to-cart | duo (gallery+panel), tabs, accordion | e-commerce, marketplace, immo, SaaS |
| `media-gallery` | corpus visuel immersif (photos, projets, lookbook) | gallery, masonry, lightbox-grid | portfolio, resto/hôtel, immo, e-commerce, événementiel |
| `video-spotlight` | mise en avant vidéo (hero vidéo, démo, replay) | band (video-bg), duo, embed-grid | média/podcast, SaaS, événementiel, éducation |
| `audio-player` | lecture audio inline (épisodes, samples) | list, card-grid, band (player) | média/podcast, éducation, association |
| `newsletter-signup` | capter un email hors contact, valeur d'abonnement | band, duo, inline-strip | blog, média, e-commerce, SaaS, perso |
| `lead-form` | formulaire riche (devis, réservation, candidature, démo) | duo (form+contexte), full-band, multi-step | local, immo, santé, recrutement, resto, B2B |
| `booking-scheduler` | réserver un créneau/table/RDV/billet | duo (calendar+résumé), step-flow, slot-grid | santé, resto/hôtel, local, événementiel, éducation |
| `map-location` | situer : carte, adresse, zone, points de vente | duo (map+infos), card-grid, full-map | local, resto, immo, événementiel, santé |
| `category-nav` | parcourir/filtrer un grand inventaire (facettes, tags) | tile-grid, chip-row, sidebar-facets | e-commerce, marketplace, média, éducation, docs |
| `editorial-feed` | flux d'articles datés (featured + liste + méta) | hero-featured, card-grid, list-rows | blog/news, média, association, perso |
| `event-schedule` | agenda/sessions/line-up/horaires/dates | timeline-day, agenda-grid, tabbed-days | événementiel, éducation, communauté, resto |
| `curriculum-syllabus` | parcours d'apprentissage (modules, leçons, durée) | accordion, list, step-track | éducation/LMS, docs, SaaS onboarding |
| `instructor-profile` | personnes-expertes hors team corporate (profs, hôtes, speakers) | card-grid, duo (portrait+bio) | éducation, événementiel, podcast, communauté |
| `community-social` | preuve sociale vivante + UGC (feed, compteurs, mur) | wall (masonry), embed-grid, ticker | communauté, SaaS, e-commerce, association |
| `value-props-icons` | bénéfices courts émotion/usage (≠ `features` capacités) | icon-row, card-trio, band-split | local, e-commerce, association, santé, landing |
| `gallery-before-after` | transformation avant/après, slider comparatif | slider-compare, duo, pair-grid | santé, local (artisan/beauté), immo, portfolio |
| `menu-catalog` | offre lisible non-e-commerce (menu resto, carte services) | columns-list, tabbed-categories, price-list | resto/hôtel, local, santé, bien-être |
| `donation-support` | soutien financier non-produit (don, paliers, crowdfunding) | tier-cards, progress-band, duo | association/ONG, créateur, communauté |
| `download-app` | pousser une app (store badges, QR, mockup device) | duo (mockup+badges), band, device-frame | SaaS, fintech, santé, événementiel, média |
| `partners-sponsors` | partenaires/sponsors avec tiers (≠ `logos` plat) | tier-rows, grouped-grid, band | événementiel, association, communauté, fintech |
| `interactive-demo` | essayer : playground, configurateur, calculateur, quiz | duo (controls+preview), tabbed, embed-canvas | SaaS, dev-tools, fintech, éducation, e-commerce |
| `lookbook-story` | narration scroll-driven (storytelling visuel) | full-bleed-band, pinned-scroll, alternating-media | portfolio, e-commerce mode/luxe, média |
| `support-help` | orienter vers l'aide (centre d'aide, multi-canal, statut) | card-grid (channels), search-band, list | SaaS, dev-tools, fintech, e-commerce, santé |

**Arbitrages de dédup à surveiller (notes `enum-universal`)** : (1) `product-grid` ↔ `index-listing` (frontière n°1 : distinct retenu car sémantique commerciale prix/stock/urgence ≠ navigation) ; (2) `partners-sponsors` ↔ `logos` (fusionner si pas de hiérarchie de tiers réelle) ; (3) `newsletter-signup`/`lead-form`/`booking-scheduler` partagent « form+valeur » mais mécaniques de saisie distinctes (1 champ / N champs / créneau) ; (4) `media-gallery`/`video-spotlight`/`lookbook-story` : `lookbook-story` est peut-être un **mode de composition** (template) plutôt qu'une catégorie atomique, à trancher selon le système de scroll-reveal ; (5) `map-location`/`audio-player`/`support-help`/`interactive-demo` à la frontière section/widget (garder comme sections avec famille « encart compact »).

### 12.4 Protocole de travail des agents (fan-out Phase 1)
- **1 agent Opus/catégorie**, worktree isolé. Brief = harnais (squelettes + `sectionBaseSchema` + vocab layout + recette + préambule arsenal) + intention de la catégorie + cible (≥5 familles, ≥5 variantes/déclinaisons, ≥20 posables) + familles trans-catégorie à RÉUTILISER.
- **Mode `Workflow`** (fan-out ≥10), pipeline/catégorie : `author → self-GF-1 (chromium, screenshots desktop+mobile/preset) → review adversarial (visual-proof-reviewer) → gate (touchpoints + 0 hardcode + ≥20)`.
- **Completeness critic** final : chaque catégorie ≥20 ? familles réutilisées (pas dupliquées) ? déclinaisons dark exposées ? responsive propre ? a11y baseline (agent `a11y-architect`) ?

### 12.5 Chiffres d'industrialisation
~40 nouveaux types Zod (familles/sections où le squelette manque réellement : recréer `off-proof`, cataloguer KeyMetric + 8 atomes éditoriaux + featured-grid cas, `value-stack` pricing, `faq-grid`…) + **~1 600-2 500 presets** (320 sections exploitables × ≥5 variantes) sur ~150 composants paramétrés. PAS 186 types Zod (= dette × 186, interdit §4/§9.4).

### 12.6 Clarification du libellé cible (flag GF-4)
« ≥5 familles **par section** » est structurellement impossible (1 Section = 1 cellule `Catégorie ∩ Famille` = 1 famille, §9.6). Lecture retenue : **≥5 familles par CATÉGORIE + ≥5 variantes/déclinaisons par section**. À confirmer Simon.

### 12.7 Dépendances (ordre)
W1 (typo crans fluides §10.6, EN COURS) + W2 (orphelines `roi-band`/`fit-columns`/`off-proof`/featured-grid cas) AVANT le fan-out W3 : sinon on industrialise sur une base régressée.

## 13. Harnais CMS-natif : descripteur unique → projections générées (le pattern optimal, 2026-06-15)

> Trigger Simon 2026-06-15 (verbatim) : « on peut si besoin améliorer les mécanismes [...] il faut pas partir du principe que se qu'on a = le mieux si y'a mieux on refacto et on met dans la strat. Sachant qu'ensuite les sections pourront être injecté via TinaCMS [...] git based headless avec des fichiers qui font office de bdd ». Décision de conception validée à l'oral. Remplace l'hypothèse implicite « les 5-6 touchpoints manuels = le bon modèle ».

### 13.1 Le constat (mesuré, GF-4)
Le modèle actuel synchronise **à la main** 5-6 projections de la même section, qui divergent dès qu'on scale :

| Projection | Fichier | État sync (mesuré) |
|---|---|---|
| Validation Astro (Zod) | `src/schemas/sections.ts` | 160 schemas, 156 demos, 156 registry : **synchronisés** (discipline 4-touchpoints tient) |
| Mixin présentation | `presentationSchema` `:23-27` | appliqué **3/156** (135 `background` inline) : **divergent** |
| **Champs CMS (Tina)** | `tina/config.ts` `sectionTemplates` `:139` | **8/156** templates, écrits à la main, FR/EN re-déclarés : **divergence massive** |
| Catalogue/manifest/quickref | `gen-*.mjs` | **générés** (codegen déjà l'idiome maison) |

Conséquence directe sur l'objectif « composer des pages depuis le CMS » : **94 % du catalogue n'est PAS éditable dans Tina**. Ajouter une section = écrire une 3ᵉ copie de ses champs (après Zod + le composant) dans `tina/config.ts`. À 320+ sections, intenable.

### 13.2 La cible (1 source → codegen, extension de l'idiome `gen-*.mjs`)
Un **descripteur unique par type de section** (1 objet TS), source de vérité, d'où un `scripts/gen-sections.mjs` (frère de `gen-token-lock`/`gen-ds-registry`) génère **toutes** les projections :

```
descripteur de section  (fields[] + meta + presentation + content-mode)
   │  gen-sections.mjs
   ├─ z.object()                 → validation Astro (build)         [src/schemas/sections.ts généré]
   ├─ Template Tina (TinaField[])→ champs CMS + defaultItem + labels FR/EN  [tina/config.ts généré]
   ├─ registry + demo + manifest + quickref + catalogue            [déjà gen-*]
   └─ presets (volume, layer 4)
```

- **Faisable sans inventer de mécanisme (GF-6)** : un `Template` Tina est un simple objet `{name,label,fields:TinaField[],ui:{defaultItem}}` (types importés `tina/config.ts:1`). Les helpers `stringField`/`objectList`/`ctaFields` y sont déjà. Générer ces objets depuis un descripteur = exactement ce que `gen-ds-registry.mjs` fait déjà pour le registry.
- **Bilingue** : le descripteur déclare un champ `title` bilingue → génère `title_fr`+`title_en` côté Zod ET côté Tina (supprime la double déclaration FR/EN manuelle).
- **Migration douce, pas big-bang** : on garde `sections.ts`/`tina/config.ts` comme **sortie générée** ; on migre type par type vers le descripteur (le pilote 12.2.H sert aussi de pilote codegen). 0 régression tant qu'un type non migré garde sa déclaration manuelle.

### 13.3 Les 2 modes global/instance, nativement CMS
Le descripteur déclare, par champ de contenu, son **mode d'édition** :
- `instance` (défaut) : champ inline → généré en `TinaField` simple. Chaque usage `sections:[...]` = props propres (modèle actuel).
- `global` : champ `reference` → généré en `{type:'reference', collections:[<col>]}` Tina. L'éditeur pointe une entrée de collection partagée ; le build la résout et propage (édite une fois, propage partout). Extension directe de `reference('authors')` (`content.config.ts`).
- **STYLE toujours global** : le `.astro` reste la seule source du markup/CSS (règle anti-orphelin, `CLAUDE.md`). Le descripteur ne porte JAMAIS de style, seulement structure de données + axes de présentation (qui pointent des `var(--token)`).

Un composant catalogue-ready se conçoit donc avec les **2 états** (réf optionnelle + override inline), comme déjà prescrit `CLAUDE.md §contenu GLOBAL vs INSTANCE`.

### 13.4 Compatibilité « Tina OU solution maison »
Le descripteur est **agnostique du moteur CMS** : il décrit des champs + modes, pas l'API Tina. Tina est une **cible de génération** parmi d'autres. Si la solution maison (même modèle : git-based, fichiers = BDD, build/push = serveur) remplace Tina, on change le générateur `→ tina/config.ts` en `→ maison/schema.json` sans toucher aux 320 descripteurs ni aux composants. Le couplage est isolé dans 1 script.

### 13.5 Conséquence sur le plan de vagues
Le descripteur unique devient le **livrable n°1 de Phase 0** (avant le fan-out 12.4) : chaque catégorie industrialisée par les agents produit des **descripteurs**, pas 5-6 fichiers à synchroniser. Le codegen garantit Tina + Zod + catalogue cohérents par construction → un éditeur compose ses pages/collections/templates dans le CMS sans dette. Gate ajouté : `check:sections-generated` (les fichiers générés == sortie du descripteur, sinon rouge).

### 13.6 Décisions à acter (Simon)
1. **Adopter le descripteur unique + `gen-sections.mjs`** comme socle Phase 0 (vs garder les 5-6 touchpoints manuels). → recommandé.
2. **Migration progressive** (type par type, sortie générée) vs big-bang. → recommandé : progressive.
3. **Cible CMS** : Tina (déjà là) comme première sortie, descripteur agnostique pour basculer maison plus tard. → recommandé.

## 14. Éditeur visuel de composition (DS Studio v2) : créer/décliner/composer depuis l'UI, sauver au catalogue (2026-06-15)

> Trigger Simon 2026-06-15 (verbatim) : « un outil comme le ds studio qui nous permet de composer et créer de nouvelle section / modifier une directement depuis l'ui/ux front qui se save correctement et qui créer une copie bien servi dans le catalogue [...] grace aux atomes molécules organisme on pourra donc créer nos propres organisme ou décliner une version d'un organisme en choissant ce qu'on veut ajouter/composer/modifier [...] créer des templates et des pages dans lequelle seront injecté le contenu via les props ». Décision de conception validée à l'oral.

### 14.1 Constat (mesuré, GF-4) : l'outil existe déjà à ~70 %
`src/pages/agence/ds-studio.astro` contient déjà :
- **Introspecteur de schéma** `WorkshopFieldMap` (`:152-231`) : auto-découvre les axes éditables d'une section (`background`, tout enum `*variant*`, les textes). Le builder n'a donc PAS à connaître les champs à l'avance.
- **CRUD de presets** (`:409-420`) : créer/nommer/« sauver l'état courant »/export-import `.json`/seed des thèmes démo.
- Un `Preset` (`section-presets.ts`) = `{id,type,label,family,era,props}` = **donnée pure** → « créer une variante depuis l'UI » = écrire un objet preset.
- Inventaire primitives réel : **12 atomes, 28 molécules, 8 organismes** (`src/components/ui/{atoms,molecules,organisms}`).

**Le chaînon manquant** : la persistance va en **localStorage + export `.json`**, PAS en commit catalogue. Le `POST /api/ds/save (commit+push)` est référencé en commentaire (`ds-studio.astro:380`) mais l'endpoint **n'existe pas** (`src/pages/api/` n'a pas de `ds/`). Construire ce git-write-back = le vrai travail.

### 14.2 Principe directeur (ce qui rend l'outil viable, pas une dette)
**L'UI écrit de la DONNÉE** (presets / descripteurs / descripteurs de composition) commitée en git ; le **codegen §13** la transforme en entrées catalogue (Zod + Tina + registry). **L'UI n'émet JAMAIS de markup `.astro` arbitraire.** C'est la frontière qui sépare un outil DS-locked d'un page-builder à dette. Le STYLE reste dans le `.astro` (anti-orphelin) ; l'UI ne fait que choisir/composer des axes + slots qui pointent des `var(--token)`.

### 14.3 Trois niveaux de création (par coût croissant)
| Niveau | Création | Mécanisme | État |
|---|---|---|---|
| **1 · Page/template** | sections empilées, contenu injecté via props | Tina `blocks` (déjà live `offres`) | ✅ existe |
| **2 · Variante/déclinaison** | d'une section (layout/densité/fond/contenu) | écrire un `Preset` (donnée) → commit → catalogue | ~70 % (manque git-write) |
| **3a · Nouvel organisme** | par slots d'atomes/molécules choisis | descripteur de **composition** (slots + arrangement via axes `sectionBaseSchema`) → renderer générique | à construire, borné |
| **3b · Code libre** | `.astro` émis depuis l'UI | codegen de composant | ⚠️ déconseillé par défaut, « eject » gated plus tard |

- **Niveau 2 = le sweet spot** : volume du catalogue via presets (donnée), 0 nouveau type Zod, 0 code. C'est ce qui fait étendre le catalogue vite (cf §4 volume par presets).
- **Niveau 3a = la réponse à « créer nos propres organismes »** : un organisme = **coquille à slots** ; l'UI remplit les slots avec des primitives **déjà au registre** (12+28) + choisit l'agencement → sauve un descripteur de composition (donnée), rendu par un renderer générique. Borné par le registre + la grammaire de slots → token-pur, DS-locked, git-based, sans génération de code. Une « déclinaison d'organisme » = un descripteur qui réfère l'organisme de base + override des slots choisis.
- **Niveau 3b = hors défaut** : émettre un `.astro` pour les cas que la grammaire de slots ne couvre pas. Risque orphelin/token → réservé à un « eject » rare et gated, jamais le chemin nominal.

### 14.4 Contrainte runtime (GF-4) et cohérence avec le CMS git-based
La prod est statique (`output:'static'`) → **pas d'écriture fichier au runtime**. Le git-write-back fonctionne en **DEV / edit-mode** (local, ou petit endpoint d'édition), exactement le modèle de Tina (dev server + commit git, `dev:tina`/`build:tina`). L'éditeur visuel et Tina partagent donc la même contrainte et la même solution : **édition en mode authoring, fichiers = source, build/push = serveur**. Les deux surfaces (DS Studio v2 pour créer/décliner des sections ; Tina/maison pour composer des pages) écrivent dans le **même catalogue de descripteurs** (§13) et restent cohérentes par construction.

### 14.5 Composants de l'interface DS Studio v2 (à concevoir)
1. **Sélecteur de section/organisme** + introspecteur (déjà là) → panneau d'axes (layout/densité/fond/align/gap/areas/order + slots).
2. **Canvas de composition** (niveau 3a) : drag/place d'atomes/molécules dans les slots, preview live token-pur.
3. **Aperçu multi-déclinaison** : light/dark, densités, responsive (réutilise `/preview/[type]`).
4. **Save-to-catalogue** : `POST /api/ds/save` (DEV/edit-mode) → écrit un `Preset` (niveau 2) ou un descripteur de composition (niveau 3a) → commit git → `gen-sections.mjs` régénère les projections → la « copie bien servie dans le catalogue » apparaît.
5. **Garde-fous intégrés** : token-purity (pas de valeur libre, que des `var(--token)`), DS-lock, gate `check:sections-generated`.

### 14.6 Décisions à acter (Simon)
1. **DS Studio v2 = évolution de l'existant** (introspecteur + preset CRUD déjà là), pas un outil net-neuf. → recommandé.
2. **Construire le git-write-back** `POST /api/ds/save` (DEV/edit-mode) comme prochain livrable structurant de l'atelier. → recommandé.
3. **Niveau 3a (slots) comme modèle de création d'organismes** ; 3b (code libre) hors scope nominal. → recommandé.
