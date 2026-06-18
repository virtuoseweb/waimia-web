# 10 — Architecture finale SEO/GEO v7 (source de vérité d'architecture)

> **Pour Claude Code. Doc maître de l'architecture cible du site.** Canonise l'architecture
> SEO/GEO v7 validée par Simon (2026-06-18) + la **politique d'indexation index-on-quality**.
> Remplace l'architecture « 3 piliers Acquérir / Piloter / Opérer » (ADR-002/ADR-003).
>
> **Plan d'exécution détaillé** : `~/.claude/plans/imperative-skipping-locket.md` (fait foi pour
> le découpage en vagues). Ce doc = l'**architecture cible + la doctrine d'indexation**.

---

## 0. Statut & supersession (daté)

- **Créé 2026-06-18.** Validé Simon (commande `/goal` + directive design Paper↔Ink du 2026-06-18).
- **SUPERSEDE** :
  - `docs/strategy/02-site-etat-final.md` §0bis/§0ter (architecture **3 piliers**
    Acquérir/Piloter/Opérer) → **abandonnée** de la nav publique.
  - `docs/specs/03-ADR-003` + `docs/state/06-mapping-migration-3-piliers` + `docs/state/08`
    (lignée ADR-003 « silo Acquérir ouvert ») → **note de supersession + archive**.
  - La doctrine **« domaine neuf = 0 redirection, supprimer net »** de `strategy/02 §0`
    → remplacée par **301 ciblés** (le site est désormais **live** en prod : des URLs réelles
    existent et sont indexables → un 301 redevient l'hygiène correcte).
- **PRÉSERVE** (ne se perd PAS — rule 59) : la **doctrine anti-dilution** de `strategy/02`
  reste valide et devient le **rationale** de la politique d'indexation §3 ci-dessous. Sur un
  domaine sans autorité, on **n'indexe que de l'excellent** — v7 le réalise par l'indexation
  par vagues, pas par une architecture étriquée.

---

## 1. La doctrine anti-dilution, correctement appliquée (le cœur)

**Ce que `strategy/02` a vu juste** : sur un domaine sans Domain Authority, le crawl budget et
le signal de qualité/cohérence sont rares. Indexer 200 URLs dont 90 % thin = Google lit
« généraliste low-quality » → répartit le peu de confiance sur du déchet → rien ne ranke.

**Ce que `strategy/02` confondait** : « ce que Google INDEXE » avec « ce qui EXISTE dans
l'architecture ». La dilution est un problème d'**indexation** (sitemap + indexable + maillage),
**pas d'architecture**. On peut avoir une arbo large dont la quasi-totalité est invisible à
Google.

**Deux couches, deux décisions :**

| Couche | Décision v7 | Justification |
|---|---|---|
| **Architecture** (templates, collections, hubs, routes, nav) | **Broad** (12 services, 6 secteurs, 5 collections neuves) | Squelette scalable, future-proof. Coût ≈ 0 tant que non indexé. |
| **Surface indexée** (sitemap + `index` + maillage interne) | **Strictement concentrée** (~15-25 URLs au lancement) | Honore l'anti-dilution sur domaine faible. |

**Mécanisme = indexation progressive / index-on-quality** : une page passe `index` **seulement
quand elle atteint le niveau qualité** (rédigée, design final, preuve réelle), puis est ajoutée
au sitemap + reçoit du maillage interne depuis les pages indexables.

---

## 2. Périmètre du livrable v7

Pas de stubs. On livre **tous les templates finaux** + **1 exemplaire COMPLET par
collection / hub / taxo** (sections finales, copy final recherché, design final : images, SVG,
animations, alternance Paper↔Ink, rythme éditorial). La **quantité** de pages est générée plus
tard. Vagues 1+2 prioritaires.

**Objectif business (figé)** : cabinet solo Montpellier, phase démarrage, **cash-first**.
Priorité SEO = ranker `/services/integrateur-claude` puis `/services/site-web-intelligent`,
convertir via `/audit-ia-pme` et `/audit-site-web-intelligent`.

---

## 3. Politique d'indexation (RÈGLE OPÉRATOIRE — à appliquer page par page)

1. **Indexé au lancement** uniquement : `/` + money pages prioritaires
   (`/services/integrateur-claude`, `/services/site-web-intelligent`) + les 2 audits
   (`/audit-ia-pme`, `/audit-site-web-intelligent`) + chaque **exemplaire complet** (1 par
   collection) + les hubs **réellement peuplés** + pages de confiance/légal existantes.
2. **Page non encore rédigée = PAS de route du tout** (préféré), **JAMAIS un stub noindexé**.
   On ne crée la page que **complète**. *(Correction au plan : « le reste en noindex » signifie
   « le reste n'existe pas encore comme route ».)*
3. **Hub indexé seulement s'il liste ≥ 3-5 enfants réels complets.** Un hub à 1 enfant =
   `noindex` + hors-sitemap jusqu'à peuplement (un hub quasi-vide dilue comme une page thin).
4. **`noindex` réservé à** : `/lp/*` (landing CRO + `<Base canonical>` vers la page mère),
   outils DS internes (`/agence/{design-system,ds-studio,hero-lab}`, `/preview/*`,
   `/components/*`, `/categories/*`), anciens secteurs conservés, et la **page roadmap
   éditoriale** (footer). Toute page `noindex` est AUSSI **hors-sitemap**
   (`NOINDEX_SITEMAP_PATHS`) ET **non liée depuis l'indexable** (sauf footer discret pour la
   roadmap) — sinon elle consomme du crawl budget et dilue le signal.
5. **301** (le site est live) : `/cas-clients → /etudes-de-cas` ; neutralisation
   `/acquerir`, `/piloter`, `/operer` (→ `noindex` + hors menu + 301 des ancres mortes vers la
   page Solution pertinente) ; corriger `/cas` et `/ressources/cas` (qui pointent vers
   `/realisations` **inexistant** → rediriger vers `/etudes-de-cas`).
6. **Anciens secteurs** (`batiment, e-commerce, liberal-independant, services-b2b,
   startup-logiciel, therapeutes`) : `seo.noindex: true` + retirés du menu + exclus du sitemap.
   Contenu réel **conservé** (réversible), pas supprimé.
7. **Discipline de maillage** : une page **indexable** ne lie QUE vers d'autres pages
   indexables. Le maillage transmet le signal — c'est lui qui « concentre » réellement.

---

## 4. Positionnement (2 offres) & nav

**Positionnement** (cf `strategy/02 §0ter`, conservé) : cabinet d'orchestration IA / conseil en
transformation IA. **PAS une agence web.** Deux offres porteuses :
- **Site Web Intelligent** — porte d'entrée tangible (preuve, pas produit). Marque = « site web
  **intelligent** » ; « site web IA / IA-native » = mots-clés de support dans le corps.
- **Intégration Claude** — intégrateur/consultant Claude & Claude Code, agents, gouvernance IA.
  C'est le **flagship SEO #1** (`/services/integrateur-claude`).

**Nav = 4 méga-menus** (réinjectés data-driven dans `src/data/mega-menu.ts`, 0 markup touché) :

- **Solutions** : col 1 Site Web Intelligent (6) · col 2 Intégration Claude (6) · col 3 Résoudre
  un problème (5 cas-usages) · col 4 Audits (2 audits + 2 diagnostics). Featured = audit.
- **Cas clients** : col 1 Par secteur · col 2 Études de cas · col 3 Résultats · col 4
  Démonstrations.
- **Ressources** : col 1 Lire (blog/guides/comparatifs) · col 2 Diagnostics · col 3 Outils ·
  col 4 Les plus consultés.
- **Agence** : col 1 Qui · col 2 Vision · col 3 Écosystème · col 4 Présence (implantations).

> Règle nav (héritée) : **0 lien vers une page inexistante**. Un sous-sujet sans page réelle =
> ancre ou « à venir » crédible, jamais un lien mort. Les liens du méga-menu ne pointent QUE
> vers des pages indexables OU des ancres réelles.

**Footer** (`src/data/sitemap.ts FOOTER_COLS`) resserré : audits + 2 diagnostics + contact +
lien **discret** roadmap (noindex). `/lp/*` jamais listées individuellement.

---

## 5. Collections & familles (existant → cible)

| Famille | Existant | Cible v7 |
|---|---|---|
| `services/*` | 2 réels (site-web-intelligent, content-marketing-intelligent) + refs | 12 services. Flagship = `integrateur-claude`. Hub `/services` à créer. |
| `secteurs/*` | 6 anciens (→ noindex) | nouvelle taxo (conseil, comptabilite, agence, industrie, formation, esn). Exemplaire = `conseil`. |
| `cas-usages/*` | — | collection + route + hub neufs. Exemplaire = `generer-plus-de-leads`. |
| `etudes-de-cas/*` | `/cas-clients` (collection `cases`, 5 réels) | renommer route → `/etudes-de-cas` (301) ; collection `cases` conservée. |
| `demonstrations/*` | — | collection + route + hub neufs. Exemplaire = `site-web-intelligent`. |
| `ressources/{guides,diagnostics,comparatifs}` | seul `outils` existe | 3 collections/routes neuves + hubs. Exemplaires : 1 guide, 1 diagnostic, 1 comparatif. |
| `implantations/*` | — | collection + route + hub. Exemplaire = `montpellier`. |
| pages locales `/integrateur-claude-{ville}` | `/agence-web-montpellier` seul | route + template page locale. Exemplaire = `integrateur-claude-paris`. |
| `/audit-ia-pme`, `/audit-site-web-intelligent` | — (base = `offres/audit-maturite-ia`) | 2 pages transactionnelles dédiées (exemplaires, priorité conversion). |
| `/lp/*` | 4 | template landing court noindex+canonical. Exemplaire = `/lp/audit-ia-pme`. |
| Roadmap éditoriale | — | page unique footer, noindex = plan de publication futur. |

**Extras repliés (rien ne se perd)** : `tunnel-conversion-intelligent` → rattaché à l'offre Site
Web Intelligent (ou `/lp`) ; `offres/audit-maturite-ia` = base de `/audit-ia-pme` ;
`offres/growth-system-ia` conservé en offre packagée.

---

## 6. Composition des templates (DS figé en variables, catalogue ACTIF)

**Principe** : chaque page se **compose** depuis le catalogue de sections
(`sections:[]` MDX → `SectionsRenderer` → `section-registry`). Réutiliser si une section couvre
~80 % ; **créer** la déclinaison/variante/famille manquante via le **DS Studio** (4 touchpoints
synchronisés : `src/schemas/sections.ts` + `src/lib/section-demos.ts` +
`src/lib/section-registry.ts` + `src/components/sections/*.astro`), **0 nouveau token DS**
(valeurs Tailwind / calculs / transparences sur variables existantes uniquement).

### 6.1 Alternance Paper ↔ Ink (principe FONDAMENTAL, pas un effet optionnel)

La rupture clair (Paper) ↔ sombre (Ink) est **volontaire et assumée** : rythme éditorial premium
(scannabilité, hiérarchie, segmentation, respirations, anti « mur de contenu »). Une page = une
**séquence rythmée** de `background: paper / ink / accent` par section (donnée de composition via
`[data-bg='ink']`, **jamais** du CSS inline). **DA de référence = `/services/site-web-intelligent`**
— les futures pages Services/Solutions/Offres/éditoriales suivent son rythme.

### 6.2 Langage d'interaction standardisé (sobre, premium, éditorial)

Animations au service de la compréhension/hiérarchie/rythme — jamais démonstratives. Effets
**validés** à garantir dans le DS Studio (auditer l'existant, n'ajouter QUE le manquant ;
**conserver** Terminal / saisie animée / interactions système déjà présents) :

| Effet | Intention de page |
|---|---|
| **Container Expansion** (carte → s'agrandit au scroll, marges/radius diminuent, occupe le viewport) | immersif, études, dashboards, cas, grands blocs narratifs |
| **Sticky Editorial** (titre/sujet fixe pendant que le contenu défile) | méthodo, concepts, process, storytelling |
| **Progressive Reveal** (opacité + translation légère, presque imperceptible) | apparition générale (sobre — pas de fade agressif) |
| **Scroll Morph** (un élément se transforme en un autre : carte→section, mockup→dashboard) | démo produit, transformation |

### 6.3 Structure HTML / SEO+GEO+conversion par nature de page

Hiérarchie de titres (1 `h1`, `h2/h3` logiques), arbo sémantique, et séquence de sections
optimisées **selon l'objectif** de chaque page. **Règles GEO** (cf `strategy/04-geo-aio-methode`)
sur chaque page de contenu : **définition courte** + **réponse directe** en tête, **FAQ**
(schema), **tableau** comparatif si pertinent, **entités** nommées, **date** + **auteur**
(E-E-A-T). **JSON-LD** adapté par type (Service / Article / FAQPage / BreadcrumbList /
CollectionPage / Offer / Person) via `src/lib/seo/schema-builder.ts`.

**Templates finaux à livrer (1 exemplaire complet chacun)** : page service · secteur · cas-usage
· étude de cas · démonstration · ressource (guide/diagnostic/outil/comparatif) · article (blog) ·
landing `/lp` · page locale commerciale · implantation · page audit (transactionnelle).

---

## 7. Vagues d'exécution (résumé — détail dans le plan)

- **V0 — Fondations** : nav+footer data-driven · 8 collections/schemas + routes `[...slug]` +
  hubs · 301/noindex · ce doc. + **V0-DS** : audit catalogue + langage d'interaction (créer le
  manquant). Pas de contenu.
- **V1 — Flagship + GATE** : `/services/integrateur-claude` complet → GF-1 preview Vercel →
  **STOP validation Simon (design + copy)** avant rollout. = patron de référence.
- **V2 — Rollout** (worktrees parallèles, workers Opus) : 1 exemplaire complet par template
  restant + hubs. GF-1 par exemplaire.
- **V3 — Roadmap + cohérence** : page roadmap éditoriale (footer, noindex) + maillage
  inter-surfaces + sitemap/robots/llms.txt cohérents + JSON-LD validés (Rich Results) + revue
  `visual-proof-reviewer`.

**Garde-fous** : 1 scope = 1 branche `feat/<scope>` ; merge sur `main` **seulement après GF-1**
sur preview Vercel + validation Simon ; pas de `git add -A` ; l'orchestrateur seul commite.

---

## 8. Indexation par vagues — récap

Indexé maintenant = exemplaires V1+V2 + hubs peuplés + services/secteurs prioritaires + audits.
Tout le reste = **n'existe pas encore** (préféré) ou `noindex` + hors-sitemap. `/lp/*` toujours
noindex+canonical. Anciens secteurs noindex. (Voir §3 pour la règle complète.)
