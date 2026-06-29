# 06 — Builder waimia : architecture cible (PLANIFICATION — scope / contrat / vision / tests)

> 🛑 **ARTEFACT DE PLANIFICATION, PAS D'IMPLÉMENTATION.** Ce document fixe le **scope, les contrats,
> la vision, l'infra/techno, l'ingénierie, le design et la stratégie de tests** du futur builder. Il ne
> contient **aucun code applicatif à livrer** et n'autorise **aucun build ni refacto** maintenant.
> Le BUILD du builder = **chantier futur dédié**, lancé sur décision explicite de Simon.
>
> **Priorité courante = finaliser le site waimia** (minimal, à partir de l'existant, sans refacto) — cf board.
>
> Amont : vision/captures = `docs/specs/05-builder-vision-reference.md` ; contrat de save historique =
> `docs/archive/47-DS-STUDIO-BUILDER-SPEC.md` ; cadrage tranché = doc 05 §Cadrage. Grounding = 5 explorations
> read-only du 2026-06-29 (MCP, catalogue/moteur, save git-as-DB, DS Studio, builder/monorepo).

---

## 1. Vision & objectif (rappel)
Un **builder WYSIWYG hybride Relume × Webflow × Lovable, simplifié**, où **l'IA est facultative (opt-in)**, qui
produit des **sites waimia-class** et que **les clients de l'agence qui héritent du projet** peuvent utiliser
sans friction. **Différenciateur** vs Relume : l'utilisateur **crée ses propres composants/sections + variantes +
catégories** servis par la library (pas seulement composer un catalogue figé).

## 2. Cadrage (tranché Simon 2026-06-29 — pilote l'archi)
- **Audience** : interne **SaaS-ready by design** (pas de self-serve v1 ; points d'extension prévus, 0 dette auth/multi-tenant aujourd'hui).
- **Produit** : repo = **boilerplate forkable/vendable** ; features builder/studio = **« plugins standalone »** (intégrés au repo, parfaitement connectés ; futurs upsell/abo).
- **Persistance** : **Git-as-DB** (JSON versionnés = la « BDD », save = commit headless ; 0 vraie BDD ; 0 format parallèle).
- **Rendu** : **SSG par défaut** (Astro `output: 'static'`) + **SSR/ISR ciblé** ; plug-and-play Vercel/Netlify.
- **Base** : **refonte propre complète** (UI + orchestration neuves) en **réutilisant les artefacts moteur** existants.

## 3. Scope v1 (IN / OUT)
### IN (v1)
1. **Builder manuel WYSIWYG** : canvas zoomable, pages côte à côte, scope projet/page/section, drag-reorder, insert `+` scopé, inspecteur de section (variante/preset, scheme, asset, slots de contenu bilingue), preview live.
2. **Catalogue & library** : recherche facettée + preview + Saved (composants ET templates de page), compteur d'instances + repère global/instance.
3. **Style guide shufflable** : schemes (couleurs/typo/UI) branchés sur tokens DS + `[data-theme]` ; multi-concepts ; preview live.
4. **Chat-IA in-app (MCP)** : prompt → composition, modes plan/build, preview interactive (select/edit-inline/annotate/comment), gate d'interaction + auto-vérif DOM (GF-1 natif), chips d'actions.
5. **Pilotage IA externe** : mêmes capacités via MCP/commandes/skills depuis Claude/OpenAI.
6. ⭐ **Création de composants/sections custom** (le différenciateur) — *au moins* un chemin assisté (scaffolder + preview GF-1), périmètre v1 à arbitrer (cf §7 phase D et §11).

### OUT (v1, phases ultérieures)
- Self-serve client multi-tenant complet (auth, quotas, billing). *(Hooks prévus, pas livrés.)*
- Marketplace de libraries externes (idée Webflow) — design only en v1.
- Interactions/animations custom arbitraires (au-delà des presets/schemes/facettes existants).
- CMS éditable type collection libre au-delà de `sections:` + collections Astro actuelles.
- Éditeur de markup/CSS in-place (« live CSS editor ») — la création custom passe par schéma + composant scaffoldé, pas par édition CSS libre.

## 4. Inventaire moteur (verdict grounding) — GARDER / ADAPTER / JETER
| Élément | Chemin | Verdict | Raison |
|---|---|---|---|
| Tokens DS | `packages/ds-tokens/tokens.css` (+ fonts) | **GARDER** | Source de vérité design, 0 dep |
| Contrat sections (Zod) | `packages/ds-kernel/src/schemas/sections*.ts`, `page-document.ts` | **GARDER** | Validation, sérialisation, importable client+MCP |
| Slots / presets / colorschemes / facets / archetypes | `packages/ds-kernel/src/lib/*` | **GARDER** | Contrat de variation + sémantique (intent/pageRole/contentMode/slots) |
| Serveur MCP (5 tools) | `mcp/waimia-catalogue-server.mjs` | **GARDER** | Colonne agentique drop-in (search/get_section/ds_tokens/page_compose/preview_render) |
| Rendu chrome-less | `src/pages/library/builder/render.astro` + `SectionsRenderer.astro` | **GARDER** | Moteur d'exécution PageDocument → HTML (toujours 200, iframe-safe) |
| Preview section isolée | `src/pages/preview/[type].astro` | **GARDER** | Iframe technique |
| Registry helpers | `src/lib/section-registry.ts` (+ `*.generated.ts`) | **GARDER/ADAPTER** | listSections/categories/breadcrumb ; generated reste généré (`gen-section-aggregate.mjs`) |
| Save tokens headless | `src/integrations/ds-save-dev.mjs` (`POST /api/ds/save`) | **GARDER/ÉTENDRE** | Pattern git-as-DB prouvé → cloner pour preset/compose |
| Fiche détail | `src/pages/library/[type].astro` | **ADAPTER** | Logique OK, présentation à refaire |
| UI Builder | `packages/builder/src/BuilderCanvas.tsx` (+ types) | **JETER (refaire)** ; `types.ts` = input de spec | UI T3 ; le contrat sérialisable inspire la nouvelle UI |
| UI Catalogue | `packages/catalogue-ui/*` (CatalogueExplorer…) | **JETER (refaire)** | UI-only |
| Pages hub | `src/pages/library/{index,[category],family/*,compare,hero-*}.astro` | **JETER/REFAIRE** | Présentation |
| UI DS Studio | `src/pages/library/studio.astro` + `src/scripts/ds-studio.js` | **JETER (refaire)** ; logique token-editor + atelier = à porter | UI à redessiner ; flux setProperty/save réutilisable |

> ⚠️ **Doublon legacy à réconcilier** (dette à neutraliser, pas à propager) : il existe des chemins **legacy**
> (`src/schemas/sections.ts`, `src/lib/section-demos.ts`, `catalog.generated.json`) ET la **co-location**
> canonique (`packages/ds-kernel/src/sections/<type>/`, `src/sections/<type>/`, `gen-section-aggregate.mjs`).
> La refonte **canonise sur la co-location ds-kernel** ; le legacy est archivé/supprimé, pas étendu (rule 59/08).

## 5. Architecture cible — couches (du bas vers le haut)
```
┌─────────────────────────────────────────────────────────────────────┐
│ E. Surfaces de pilotage                                              │
│    E1 Builder UI (4 vues : sitemap → wireframe → style → design)     │  NEUF
│    E2 Chat-IA in-app (plan/build, preview interactive, auto-vérif)   │  NEUF
│    E3 IA externe (Claude/OpenAI) via MCP/commands/skills             │  GARDER+étendre
├─────────────────────────────────────────────────────────────────────┤
│ D. Création de composants custom (LE différenciateur)               │  NEUF (gros)
│    schema-builder · component-scaffolder · manifest live-sync ·     │
│    preview-pipeline (GF-1 auto) · variant/preset builder            │
├─────────────────────────────────────────────────────────────────────┤
│ C. Save / persistance « git-as-DB »                                 │
│    /api/ds/save (tokens) ✅ · /api/ds/compose (sections) ⛏ ·         │  ÉTENDRE
│    /api/ds/preset (presets+themes) ⛏ · /api/ds/component (custom) ⛏ │
├─────────────────────────────────────────────────────────────────────┤
│ B. Moteur (contrat + composition + rendu)                           │
│    ds-kernel (Zod, slots, presets, colorschemes, facets) ·          │  GARDER
│    MCP (5 tools) · render.astro/SectionsRenderer · registry         │
├─────────────────────────────────────────────────────────────────────┤
│ A. Artefacts git-as-DB (la « BDD » = fichiers versionnés)           │
│    tokens.css · sections: JSON (content/** + page-variants/*) ·     │  GARDER
│    ds-presets.json ⛏ · themes.css ⛏ · sections custom ⛏             │
└─────────────────────────────────────────────────────────────────────┘
   ✅ existe   ⛏ à créer (trou identifié)   NEUF = à concevoir/bâtir
```

### Principe « plugins standalone » (forkable/SaaS-ready)
Chaque surface (Builder UI, Chat-IA, DS Studio, Création-custom) est conçue comme un **module activable**
(« plugin ») au-dessus du **moteur stable** (couches A–C). Aujourd'hui intégrés au repo (pas de découplage
runtime réel), mais **frontières nettes** (le moteur ne dépend d'aucune UI) → permet plus tard : fork du
boilerplate sans les plugins, activation à la carte, upsell/abo. **Critère d'archi** : le moteur (A–C) ne
`import` jamais une surface (E) ; les surfaces consomment le moteur via contrats stables (MCP + ds-kernel + endpoints).

## 6. Contrats (interfaces stables — spécification, pas implémentation)
> Signatures de référence (le code réel sera écrit au chantier build). Tirées des artefacts existants à figer.

- **PageDocument** (`waimia.page-document/v1`) : `{ $schema, meta: { collection, slug, lang, title_*, description_* }, sections: SectionInstance[] }`. Validé Zod (ds-kernel `page-document.ts`).
- **SectionInstance** : `{ type: string, background?, anchor?, expand?, ...slotsData }` (champs bilingues `*_fr`/`*_en`). Validé par le schéma du `type` (union discriminée).
- **Preset** : axes transverses `{ background, layout, density, variant, columns, proportion, mediaSide, hover, placement }` → **merge shallow** sur la démo (0 nouveau type). Persisté (cible) `src/data/ds-presets.json`.
- **ColorScheme** : 1 des 16 (`7 mono + 6 duo + 3 trio`) → rendu via `[data-theme]` lisant `var(--surface)`.
- **MCP tools (contrat stable)** : `catalogue_search(query,facets…)`, `catalogue_get_section(type)`, `ds_tokens(prefix)`, `page_compose(sections,meta) → {pageDocument, validation}`, `preview_render(pageDocument) → {html}`. *(Extensions prévues : `catalogue_get_preset`, `catalogue_find_related`, `component_scaffold`.)*
- **Endpoints save (git-as-DB, pattern ds-save-dev)** : tous `prerender=false`, garde keyword + refus `main` + Zod strict + commit/push headless.
  - `POST /api/ds/save` (tokens) ✅
  - `POST /api/ds/compose` → écrit `sections:` dans `src/content/**` ou `src/data/page-variants/**` ⛏
  - `POST /api/ds/preset` → `src/data/ds-presets.json` + bloc `themes.css [data-theme]` ⛏
  - `POST /api/ds/component` → scaffolde les 5 touchpoints d'un type custom + régénère ⛏ (couche D)
- **Contrat « composant custom »** (couche D, à concevoir) : entrée = définition de schéma (champs/slots typés) + template de rendu paramétrique → sortie = module co-localisé `src/sections/<type>/` (schema/demo/meta/Component/index) + régénération aggregate + preview GF-1. **Invariant** : un composant custom reste une section catalogue normale (mêmes 5 touchpoints), pas un format à part.

## 7. Découpage en phases (roadmap d'ingénierie — chantiers futurs, ordonnés)
> Chaque phase = chantier dédié, lancé sur décision Simon. Chaque **brick** se termine par une **preuve GF-1**.
> (Réconcilier avec le board : recouvre P2.3/2.7/2.8/2.9 « système de variation / DS Studio créatif / presets » + P4.1 « boilerplate forkable ».)

- **Φ0 — Stabilisation du moteur (prérequis, peu coûteux)** : canoniser co-location ds-kernel (retirer legacy `src/schemas`), créer `ds-presets.json` + `themes.css`, ajouter `/api/ds/compose` + `/api/ds/preset` (clones de ds-save-dev), exposer facets i18n + presets concrets au MCP. *Sortie : moteur complet, 0 UI neuve.*
- **Φ1 — Builder manuel WYSIWYG (vues + canvas + inspecteur)** : nouvelle UI (E1) consommant moteur + MCP. Pipeline sitemap→wireframe→style→design. Save via `/api/ds/compose`. *Sortie : composer/éditer/sauver une page sans IA.*
- **Φ2 — Style guide shufflable** : schemes/concepts sur tokens DS + `[data-theme]`, preview live, save `/api/ds/preset`.
- **Φ3 — Chat-IA in-app (MCP) + preview interactive** : plan/build, select/edit/annotate/comment, gate + auto-vérif DOM (GF-1 natif), chips d'actions. Réutilise MCP `page_compose`/`preview_render`.
- **Φ4 — Pilotage IA externe** : commandes/skills + doc connecteurs (Claude/OpenAI ↔ MCP).
- **Φ5 — ⭐ Création de composants custom (le moat)** : schema-builder UI, component-scaffolder (`/api/ds/component`), manifest live-sync, preview-pipeline GF-1, variant/preset builder. *Le plus gros — périmètre v1 à arbitrer (§11).*
- **Φ6 — Boilerplate forkable / plugins standalone / hooks SaaS** : frontières de plugins, activation à la carte, points d'extension multi-tenant (sans livrer le self-serve).

## 8. Infra & techno (décisions)
- **Front** : Astro 6 `output: 'static'` ; îles React pour les surfaces interactives (builder/chat) ; preview = iframe sur endpoint SSR `render.astro`.
- **SSR/ISR ciblé** : uniquement endpoints `/api/*` (`prerender=false`) + sections qui l'exigent ; le site produit reste SSG. ISR exclut les `/api/*` (toujours frais).
- **Persistance** : git-as-DB via endpoints headless (commit/push) — **dev-only aujourd'hui** ; pour le SaaS futur = couche token GitHub headless (cf doc 47 couche C'). Pas de runtime serveur sur le site produit.
- **MCP** : serveur stdio Node pur (pas d'Astro requis) ; artefacts `dist/client/library/*` + `tokens.css`. *Amélioration : endpoint `render-static` qui n'a besoin que de `dist/` pour preview sans dev-server.*
- **Hébergement** : plug-and-play Vercel/Netlify (adapter Astro), 0 config pour le fork.

## 9. Design / UX (principes, niveau des apps de référence)
- **Pipeline 4 vues** (Relume) : sitemap → wireframe → style → design → publier (= créer/modifier vraies pages).
- **Canvas** zoomable (8→200 %, pinch/drag), pages côte à côte ; **scope contextuel** projet/page/section.
- **Inspecteur riche** : variante/preset, scheme, asset image/vidéo, element form/button, slots de contenu bilingue, make-global.
- **Recherche cross-variantes** avec preview + bookmark→Saved ; **compteur d'instances + repère global** (demande C).
- **Brand = panneau fixe** (logo, clair/sombre, hauteur).
- **Chat-IA opt-in** : preview live no-reload, toolbar select/edit/annotate/comment, sélection→contexte, **modes plan/build**, chips d'actions.
- **UX « héritable »** : pensé pour qu'un client non-technique qui reçoit le projet l'utilise sans chaos (onboarding, garde-fous, libellés FR clairs).
- **Garde-fou UX** : toute génération IA destructive est signalée (« écrase les sections »).

## 10. Stratégie de tests (le « tests » du cadrage)
- **GF-1 par brick (non négociable)** : chaque livraison = preuve EMPIRIQUE.
  - *Visuel* : Playwright screenshot above-fold + `getComputedStyle` (opacity≠0, transform neutre) sur preview déployée.
  - *Fonctionnel* (endpoints save, MCP, scaffolder) : appel réel + assertion réponse + **write→read git** (le commit existe + le fichier est relu + le build passe) + cas limite (refus `main`, keyword KO, Zod KO).
- **Gates CI** existants à réutiliser/étendre : `check:section-aggregate`, `check:section-modules`, `check:board`, `check-no-emdash`, token-lock, hover-reflow. *Ajouts : gate « composant custom scaffoldé build-clean ».*
- **Boucle IA = vérif intégrée** : le chat exécute un snippet DOM dans la preview pour prouver le rendu (pattern Lovable) → adossé à MCP `preview_render` + assertion `innerHTML.length`/sélecteur clé.
- **Contrats = tests** : chaque endpoint/tool a un test happy-path + erreurs (Zod, branche, keyword) + edge (doc>6 ko POST vs GET).

## 11. Décisions ouvertes (à trancher au lancement du chantier build, pas maintenant)
- **Périmètre Φ5 v1** : création custom **assistée par dev** (scaffolder + PR + GF-1) d'abord, vs **self-serve complet** (schema-builder UI + live-sync) — l'estimation grounding situe le self-serve complet à plusieurs mois. *Reco : Φ5 v1 = scaffolder + preview GF-1 (semi-assisté), self-serve UI en Φ5.2.*
- **Stockage presets** : migrer de TS (`section-presets.ts`) vers `ds-presets.json` (git-as-DB) — confirmer le moment (Φ0 vs Φ2).
- **MCP metadata** : la couche sémantique (intent/pageRole/contentMode/slots) existe déjà dans `ds-kernel` (facets+slots, exposée tier-2 MCP) ; décider si on l'enrichit (i18n agent-side, presets concrets) en Φ0.
- **SaaS hooks** : quels points d'extension multi-tenant poser dès la v1 (frontières plugins) sans coût.

## 12. Ce que ce document N'autorise PAS
- Aucun build du builder, aucun refacto moteur, aucune création d'endpoint/scaffolder **maintenant**.
- La priorité d'exécution reste **le site waimia** (closeout P0, habillage/maillage/cleanup/GF-1/merge), à partir de l'existant, sans refacto.
- Le chantier build du builder démarre sur **décision explicite de Simon**, en réutilisant ce doc comme contrat de référence.
