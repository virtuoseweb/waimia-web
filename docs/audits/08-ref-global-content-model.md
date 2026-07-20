# 08 — Modèle de contenu « composants globaux `{ref}` » (gate de P4.4-e)

> Statut : **CADRAGE, en attente d'arbitrage Simon. Rien n'est implémenté.**
> Date : 2026-07-20. Auteur : orchestrateur (Opus 4.8). Reconnaissance : agent read-only `Explore`.
> Contexte : P4.4-e (dernier item du chantier atelier, board 8/9) est gaté sur ce choix.
> Le plan le marque « à trancher AVANT d'implémenter » (`docs/state/02-plan-execution-claude-code.md` §P4.4).
> Directive de référence : CLAUDE.md § « Contenu GLOBAL vs INSTANCE » + memory `composable-everything-catalogue-variants`.

---

## 1. Le problème, en une phrase

Aujourd'hui le contenu d'une section de catalogue est **INSTANCE-only** : les props sont écrites en dur
dans le frontmatter de chaque page (`src/content/<collection>/<slug>.json|mdx`, clé `sections:[...]`).
Un même contenu réutilisé sur plusieurs surfaces (un cas, un avis, un prix, un bloc auteur, un pain-point)
est donc **dupliqué** page par page : le modifier à un endroit ne le propage pas. C'est une **dette de
désync** que P4.4-e (pipeline builder 4 vues) veut résoudre en introduisant des **composants globaux
synchronisés** : une section peut porter une **référence** (`{ref}`) vers une source unique, résolue au
rendu, avec **override inline optionnel**.

## 2. État actuel vérifié (faits, `fichier:ligne`)

- **Renderer sans résolution** : `src/components/sections/SectionsRenderer.astro:22-34` mappe `type → composant`
  et forwarde `data` **tel quel**. Aucune notion de référence.
- **Schémas d'instance** : `sectionsArraySchema` (array de `discriminatedUnion('type')`) dans
  `@waimia/ds-kernel` (`packages/ds-kernel/src/schemas/sections.ts:96`), schémas co-localisés
  `packages/ds-kernel/src/sections/<type>/schema.ts`. Posé sur les collections dans `content.config.ts`.
- **Deux précédents ad hoc de résolution `ref + fallback inline`** (le patron « 2 états » existe déjà, mais
  cloisonné dans le composant, dupliqué à la main) :
  - `logo-marquee` : champ `logoIds` (`logo-marquee/schema.ts:16`) → `LOGOS[id]`, fallback `data.logos`
    inline (`src/components/sections/LogoMarquee.astro:20-22`). Réf vers un **store `src/data`**.
  - `case-card-grid` : champ `caseRefs` (`case-card-grid/schema.ts:57`) → `getCollection('cases')` par slug,
    fallback `data.cases` inline (`src/components/sections/CaseCardGrid.astro:22-38`). Réf vers une
    **collection Astro**.
- **`reference()` Astro natif** : utilisé uniquement côté **éditorial** (`author: reference('authors')`,
  `content.config.ts:169`), résolu par `getEntry` dans les templates, **jamais dans le catalogue de sections**.
- **Stores globaux prêts mais non branchés** : `pain-points`, `proof-points`, `guarantees`, `partners`,
  `pricing` ont des ids stables + accesseurs (`getPainPoint`, `getProofPoint`, `GUARANTEE_BY_ID`, `tierById`)
  mais **aucun schéma de section ne les cible** et **aucun composant ne les résout** (data inline). Seul
  `logos` est déjà consommé par id.
- **Précédent de résolution centralisée** : `src/lib/internal-mesh.ts` résout des **maps curées** id→objet
  **au build**, dans une lib appelée par les templates, et produit le `data` inline d'une section
  (`related-links`). Modèle le plus proche, mais cloisonné aux liens et hors frontmatter d'instance.
- **Builder / endpoints (dev-only, `src/integrations/ds-save-dev.mjs`)** :
  - `/api/ds/instance` PATCH réécrit `data.sections[index] = props` **inline** dans le fichier de contenu réel.
  - `/api/ds/compose` POST écrit un brouillon `PageDocument` (`src/data/page-variants/<slug>.json`) qui
    **réutilise `sectionsArraySchema` tel quel** (`packages/ds-kernel/src/schemas/page-document.ts:89`) : donc
    **le builder ne produit jamais de refs** aujourd'hui.
  - `page-recipes.json` = séquences de `section.type` **sans props ni refs**.

**Conclusion de l'état** : la brique de base (`{ref}` générique) n'existe pas ; deux implémentations ad hoc
prouvent le patron mais ne sont pas généralisées ; toute la chaîne builder produit de l'inline.

## 3. Décision n°1 (périmètre) : quel contenu doit devenir GLOBAL ?

`{ref}` ne doit PAS viser « tout le contenu ». Périmètre proposé (contenu réellement réutilisé cross-page,
per CLAUDE.md) :

| Contenu | Source unique candidate | Déjà réf ? |
| --- | --- | --- |
| Cas / études de cas | collection `cases` | oui (`caseRefs`) |
| Logos clients/partenaires | store `logos` / `partners` | partiel (`logoIds`) |
| Avis / témoignages | collection à créer OU store | non |
| Auteur / bloc expert | collection `authors` | oui côté éditorial, pas catalogue |
| Prix / grille tarifaire | store `pricing` (`tierById`) | non |
| Pain-points / preuves / garanties | stores `pain-points`/`proof-points`/`guarantees` | non |

Le reste (titres, ledes, CTA propres à une page) **reste INSTANCE** (inline). À valider : la liste ci-dessus
est-elle le bon périmètre, ou on démarre plus étroit (cas + avis + prix seulement) ?

## 4. Décision n°2 (mécanique) : les 4 options d'architecture

### Option A — Résolveur central + convention `{ref}` unifiée (généralise le patron)
Étape de résolution `resolveSectionData(section, lang)` en amont du rendu (dans `SectionsRenderer` ou une lib
appelée par lui). Convention de champ standard (ex. un champ peut valoir un littéral inline **ou** un
`{ ref: '<store|collection>/<id>' }`). Un **registre de résolveurs** (nom de source → accesseur) hydrate,
fallback inline conservé. Les 199 sections héritent du mécanisme sans le réimplémenter.
- **Pour** : un seul endroit, cohérent catalogue-wide, DS Studio et MCP peuvent raisonner uniformément sur
  les refs, migration outillable.
- **Contre** : touche le pipeline de rendu (risque sur 199 sections), demande un registre source→accesseur et
  une convention de schéma appliquée à plusieurs schémas ; `SectionsRenderer` peut devenir async (collections).
- **Effort** : élevé. **Risque** : moyen-élevé (pipeline central). **Réversibilité** : moyenne.

### Option B — Refs ad hoc par section (étend l'existant, incrémental)
On garde la résolution DANS chaque composant (comme LogoMarquee/CaseCardGrid) et on ajoute un champ ref
section par section, uniquement là où la sync cross-page est réellement utile (pricing, problème→pain-points,
preuves→proof-points, garanties, témoignages). Pas de résolveur central.
- **Pour** : risque faible, incrémental, calqué sur un précédent qui marche, 0 changement du pipeline.
- **Contre** : logique de résolution dupliquée, pas de convention unifiée, DS Studio/MCP ne peuvent pas
  raisonner génériquement sur les refs, dérive (chaque section réinvente le fallback anti-404).
- **Effort** : faible par section. **Risque** : faible. **Réversibilité** : bonne.

### Option C — Résolution build-time via une couche lib (modèle internal-mesh)
Le frontmatter stocke des refs ; une **passe de résolution build-time** (comme `internal-mesh`) les étend en
data inline AVANT le composant, qui reste « bête ». La passe vit dans `SectionsRenderer` ou le flux de page.
- **Pour** : composants inchangés (reçoivent de la data résolue), réutilise une mécanique éprouvée
  (`internal-mesh`), 100 % compatible SSG (résolu au build).
- **Contre** : où branche-t-on la passe ? (hook dans le renderer ou le flux page) ; demande quand même une
  convention de champ + un registre ; la donnée résolue « fige » au build (cohérent en SSG, mais pas de
  résolution runtime).
- **Effort** : moyen. **Risque** : moyen. **Réversibilité** : bonne (refs restent dans le frontmatter).

### Option D — `reference()` Astro natif étendu au catalogue
On utilise `reference()` (déjà en place pour `authors`) dans les schémas de section, résolu par `getEntry`
dans `SectionsRenderer`.
- **Pour** : natif, typé, validé par Astro (ref cassée = erreur de build).
- **Contre** : ne marche **que pour des collections**, pas pour les stores `src/data/*.ts` (pricing,
  pain-points, etc.) : il faudrait les convertir en collections ou vivre en hybride ; `SectionsRenderer`
  devient async-resolving.
- **Effort** : moyen (+ conversion des stores en collections). **Risque** : moyen. **Réversibilité** : moyenne.

## 5. Recommandation

**Hybride C+B, convention d'abord, câblage incrémental** :

1. **Figer la convention `{ref}` d'abord** (1 forme unique : `{ ref: '<source>/<id>' }` sur un champ dont le
   type reste « littéral inline OU ref »), et un **registre source→accesseur** minimal
   (`cases`, `logos`, `partners`, `pricing`, `pain-points`, `proof-points`, `guarantees`), en réutilisant les
   accesseurs déjà présents (`getPainPoint`, `tierById`, `LOGOS`, `getCollection('cases')`…).
2. **Résolution build-time (Option C)** centralisée dans une lib `resolve-section-refs.ts`, appelée par
   `SectionsRenderer` en une passe, avec **fallback inline** systématique et gate d'intégrité (ref cassée =
   échec de build, à la façon de `check-content-refs.mjs`).
3. **Migrer d'abord les 2 précédents** (`logoIds`, `caseRefs`) sur la convention pour prouver la parité
   (GF-1 : rendu identique), puis câbler **section par section** (Option B pour l'ajout des champs) selon le
   périmètre §3, sans big-bang sur les 199 sections.

Pourquoi ce mix : la convention + résolveur central (C) donne l'uniformité que DS Studio/MCP exigent et évite
la dérive de B ; le câblage incrémental (B) évite le risque d'un big-bang pipeline ; C plutôt que A/D parce
qu'il garde les composants inchangés et reste 100 % SSG sans forcer la conversion des stores en collections.

## 6. Impact modèle de contenu + migration

- **Schéma** : chaque champ « refable » passe d'un type inline à `z.union([<inline>, refSchema])`.
  Impact sur les schémas co-localisés concernés uniquement (pas les 199).
- **Frontmatter existant** : inchangé tant qu'on ne migre pas (l'inline reste un cas valide de l'union). La
  bascule inline→ref est **opt-in**, page par page, via le builder ou à la main.
- **Builder / `/api/ds/instance` + `/api/ds/compose`** : doivent apprendre à **écrire une ref** (aujourd'hui
  ils n'écrivent que de l'inline). C'est le point de couplage réel avec P4.4-e (le pipeline 4 vues doit
  pouvoir poser un `{ref}` depuis l'UI).
- **`PageDocument`** (`page-document.ts:89`) : réutilise `sectionsArraySchema`, donc suit automatiquement dès
  que l'union ref est dans le schéma. Pas de schéma parallèle.
- **Outil de migration** : un script `migrate-inline-to-ref.mjs` (repérer les instances dont le contenu
  matche un id de store et proposer la bascule) est un **plus**, pas un prérequis.

## 7. Risques

- **Pipeline** : rendre `SectionsRenderer` résolvant touche le chemin critique de toutes les pages. Mitigation :
  passe build-time isolée + GF-1 parité sur les 2 précédents avant généralisation.
- **Async** : si une source est une collection (`cases`), la résolution est async → `SectionsRenderer` (ou la
  passe) doit être async. À vérifier côté flux Astro.
- **Intégrité** : une ref cassée ne doit jamais casser la prod silencieusement. Gate build obligatoire.
- **Sur-portée** : viser « tout » (memory `no-hardcode`) ferait exploser le périmètre. Rester sur §3.

## 8. Ce qui reste à trancher par Simon (avant tout code)

1. **Périmètre §3** : la liste (cas, logos, avis, auteur, prix, pain/proof/garanties) ou un démarrage plus
   étroit (cas + avis + prix) ?
2. **Option §4** : la reco hybride C+B, ou une autre (A central pur / D reference Astro / B ad hoc pur) ?
3. **Convention de champ** : `{ ref: 'source/id' }` unique, ou refs typées par champ (`caseRefs`, `pricingRef`…) ?
4. **Sources = stores `src/data` ou collections ?** (détermine C vs D ; les avis n'existent en collection nulle part).
5. **Couplage builder** : P4.4-e doit-il livrer l'écriture de `{ref}` depuis l'UI dès la V3, ou d'abord le
   pipeline 4 vues en lecture puis l'écriture de refs en V3.1 ?

---

**Prochaine étape** : validation Simon des points §8. Aucune ligne de code ne sera écrite avant.
Une fois tranché, l'implémentation se décompose (worker isolé + GF-1 parité) selon l'option retenue.
