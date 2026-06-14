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
