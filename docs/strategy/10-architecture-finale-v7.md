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

## 0bis. ADDENDUM V8 (2026-07-12) — Positionnement « systèmes business » + architecture 3 étages (VALIDÉ Simon)

> **Statut : VALIDÉ Simon 2026-07-12** (décisions 1-4 explicites en session). Supersede le §4
> ci-dessous pour le positionnement, le nom des offres et la colonne Solutions de la nav.
> Fondé sur 4 recherches empiriques (audit prod live + docs, intentions de recherche FR via
> autocomplete/SERP, benchmark 12 concurrents FR + 8 studios EN, vocabulaire par fonction).

### 0bis.1 Positionnement final

Le métier = **ingénierie de systèmes business** (analyser les process → concevoir → construire
→ intégrer → opérer/former). Ni cabinet de conseil, ni ESN, ni agence marketing, ni « agence IA ».

| Niveau | Formulation canonique | Rôle |
|---|---|---|
| **Signature (H1 home)** | « Le studio qui construit les *systèmes* qui font tourner votre *PME*. » | Mémorisation (évolution douce du H1 précédent) |
| **Définition GEO (extractible)** | « Waimia est un studio d'ingénierie français basé à Montpellier qui conçoit, développe et intègre les systèmes business des PME : site, tunnel de conversion, CRM, automatisations et agents IA, connectés en un seul système que l'entreprise possède. » | Ce que les LLM citent |
| **Sous-titre classable** | « Agence d'automatisation et d'intégration IA pour PME » | Label des comparatifs/LLM ; metadata, footer, à-propos, JAMAIS en signature |
| **Pitch** | « Votre PME tourne sur des systèmes : un qui trouve des clients, un qui vend, un qui produit. Nous les construisons, nous les connectons, et vous les possédez. » | Oral, à-propos |

Trois verbes structurants : **concevoir** (audit process, feuille de route : le conseil est DANS
le métier), **construire** (software engineering, cœur véridique), **opérer** (run, maintenance,
formation, récurrent).

**Différenciation révisée (remplace « anthropic-first »)** : on **adapte la solution au besoin
et aux contraintes** : Claude / GPT / Mistral ; Astro-React-Next sur mesure OU WordPress /
Webflow ; Make / Zapier / n8n OU sur-mesure. Claude reste la **lance SEO/GEO** (case quasi
vierge côté prestataires FR), pas l'identité. On n'est PAS anti no-code : on l'intègre quand
c'est le bon composant. Le différenciateur constant : **production (pas POC), système possédé
par le client (0 captivité), interlocuteur direct.**

### 0bis.2 Architecture 3 étages (la règle de nommage)

| Étage | Rôle | Langage |
|---|---|---|
| 1 · Marque | mémorisation + classement GEO | « studio », « systèmes business » |
| 2 · Systèmes par fonction | modèle mental + nav + pages bundle | « Système marketing », « Intégration IA »… (récit, PAS cibles SEO) |
| 3 · Portes d'entrée | capter les requêtes réelles | 1 page = 1 requête (grammaire : outcome + agence/consultant/formation/outil) |

**Données verrouillées (recherche 2026-07-12)** : les formulations « système X » ont **0 demande
de recherche FR** (autocomplete dérive vers l'académique/« vente pyramidale ») → « système » =
copy de marque et architecture d'offre, **JAMAIS un `<title>`/H1 ciblé SEO**. « Site web
intelligent » et « intégrateur Claude » ne sont pas recherchés non plus (concepts de marque, pas
requêtes). RH et direction/pilotage = requêtes mortes (territoire SIRH / Excel / coaching).

**Familles (étage 2)** : Système marketing · Intégration IA (couche transversale vendable :
audit → feuille de route → build agents/automatisations → formation → référent IA) · Système
commercial (PLUS TARD, angle « OWN » : le client possède son système, vs agences prospection
« RUN » au RDV) · Système RH / direction : **upsell relationnel uniquement, jamais de pages
d'acquisition**.

**Système marketing = « système d'exploitation professionnel des équipes marketing »
(précision Simon 2026-07-12)** :
- **La page hub du système = `/services/site-web-ia`** (ex-SWI) : elle raconte le système
  entier ET vend le produit d'entrée. Le SEO/GEO appartient à content-marketing-intelligent,
  qui appartient au système ; tout converge vers le système final.
- **Échelle d'upsell (le récit de la page hub)** : site web intelligent → + pack SEO/GEO (un
  des packs de `/services/content-marketing-intelligent`) → + tunnel de qualification
  intelligent → + CRM / RevOps = le système business marketing complet.
- **Grille de la page site-web-ia (4 cards, remplace les 4 paliers actuels)** : Landing page ·
  Site vitrine · Site premium (design) · **Sur mesure** (le complet du système marketing, prix
  « à partir de X » : fonctionnalités IA, dashboard intégrant Google Analytics + Google Search
  Console, CRM, Stripe, autres intégrations). ⚠️ « Intelligent » qualifie TOUTE la gamme
  (chaque offre est un site web intelligent) : aucune card ne porte le nom « site web
  intelligent ».
- Copywriting du hub à adapter en conséquence (chiffres exacts, listes de périmètre complètes
  par card, rien d'oublié) : **vague 2**.

### 0bis.3 Décisions d'exécution (Simon 2026-07-12)

1. **Pas de nouvelles pages** « formation IA » / « GEO » : des **cards dans les hubs + entrées
   méga menu** (ancre ou lien vers hub, règle 0-lien-mort inchangée).
   - Le **SEO-GEO-AIO** a pour hub `/services/content-marketing-intelligent` (la page entre dans
     la nav, colonne Système marketing).
   - Le hub **site web** porte les déclinaisons en cards **LIÉES aux pages enfants existantes**
     (`/services/site-web-ia/{wordpress,webflow,sur-mesure}` : contenus déjà présents dans
     `src/content/services/site-web-ia/`, à désorpheliniser) ; la card Application/MVP reste
     sans lien tant que sa page n'existe pas (0 lien mort). **Maillage parent/enfant fort
     obligatoire** : la section dashboard/media du hub affiche les liens vers les services
     parent/enfant, et chaque page enfant lie son hub parent + ses sœurs (via internal-mesh /
     related-links, jamais de liens hardcodés).
   - La **formation IA / référent IA** = cards dans le hub Intégration IA.
2. **Retitrages + 301** :
   - `/services/site-web-intelligent` → slug **`/services/site-web-ia`** (301), H1 « Un site
     web IA pour PME » ; « site web intelligent » reste le **concept propriétaire** (définition
     extractible dans le corps : « nous appelons ça un site web intelligent »).
   - `/services/integrateur-claude` → slug **`/services/integration-claude`** (301), H1
     « Intégration Claude en entreprise » (pattern de requête réel ; « intégrateur » attire les
     candidats, pas les clients).
   - 301 des URLs nues `/site-web-intelligent` et `/integrateur-claude` (404 aujourd'hui) vers
     les pages services.
3. **Hiérarchie pricing 3 niveaux** (répare l'incohérence prod relevée en audit) : home =
   points d'entrée seulement (« à partir de… ») · page système = prix du bundle (+ économie vs
   briques) · page service = SA grille 3-4 paliers. **Noms de paliers distincts par niveau**
   (les paliers d'un service ne portent jamais les mêmes noms que ceux du bundle). Page =
   requête, palier = périmètre, feature (tracking, consentement, GSC/GSA, hébergement,
   maintenance, chatbot…) = ligne de tableau.
4. **Nav Solutions v8** : col 1 **Système marketing** (tête → bundle ; liens : site web IA ·
   tunnel de qualification · content marketing & SEO-GEO-AIO · maintenance-growth) · col 2
   **Intégration IA** (tête → intégration Claude ; liens : intégration Claude · agents IA ·
   consultant IA + cards formation/référent) · col 3 Résoudre un problème (inchangée) · col 4 /
   featured : audits. Les **titres de colonnes** portent le récit « système », les **liens**
   portent les requêtes.

### 0bis.4 Interdits (anti-scénarios, validés par les données)

- ❌ Pages d'acquisition « Système RH » / « Système direction » (0 requête, dilution).
- ❌ « Système X » ou « site web intelligent » ou « intégrateur Claude » comme title/H1 ciblé SEO.
- ❌ « agence GEO » seul (autocomplete pollué par Geodis) → toujours « generative engine
  optimization », « GEO SEO », « visibilité ChatGPT ».
- ❌ Attaque frontale « agence prospection B2B » (catégorie la plus commoditisée du lot) tant
  que l'angle OWN + preuve n'existent pas.
- ❌ 1 page par outil (Mistral, Webflow, Make…) sans cas réel : les outils vivent en cards,
  briques et tableaux comparatifs DANS les hubs (index-on-quality inchangé).

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

> ⚠️ **SUPERSEDED par §0bis (V8, 2026-07-12)** pour le positionnement, le nom des offres et la
> colonne Solutions. Le « cabinet d'orchestration IA » de `strategy/02 §0ter` était déjà écarté
> le 2026-06-15 (cf `README.md` §Positionnement + `state/RECONCILIATION-REPORT.md` §1) : la
> marque est « **studio** ». Le reste de ce §4 (menus Cas clients / Ressources / Agence, règle
> 0-lien-mort, footer) reste valide.

Positionnement courant : voir **§0bis.1**. Deux offres porteuses (étage 3, portes d'entrée) :
- **Site web IA** (ex « Site Web Intelligent », retitré + 301, cf §0bis.3) — porte d'entrée
  tangible ; « site web intelligent » = concept propriétaire dans le corps.
- **Intégration Claude en entreprise** (ex « Intégrateur Claude », retitré + 301) — flagship
  GEO #1 (case quasi vierge côté prestataires FR).

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
