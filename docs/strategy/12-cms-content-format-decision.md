# 12 — Décision CMS, format de page et surface d'édition

**Statut** : ✅ FIGÉ (direction validée Simon 2026-06-28)
**Sujet** : comment le contenu/structure des pages est stocké, par qui il est édité (humain + IA), et quel CMS.
**Lié** : [05-stack-decision](05-stack-decision.md) (Astro vs TanStack, figé), [10-architecture-finale-v7](10-architecture-finale-v7.md), backlog ARCHI #38/#39/#40/#41.

---

## Contexte et constat

L'audit a montré que les pages composables (offres, services, cas-usages, lp, audits, diagnostics) sont stockées en `.mdx` dont le **corps est vide** : le frontmatter YAML est un PageDocument déguisé. Tina est branché sur ces collections (`tina/config.ts`, champ `sections`). Le blog et l'éditorial utilisent vraiment le corps MDX.

## Décision

1. **Tina hors scope pour CE produit (site Waimia + boilerplate), PAS « mauvais outil ».** Raison décisive, par ordre : (a) on a **déjà** construit l'éditeur visuel section-aware (le builder, #67/#70/#71) → l'atout phare de Tina (édition visuelle/contextuelle) est la capacité qu'on a déjà remplacée, en mieux (DS-aware) ; adopter Tina = payer son infra la plus lourde pour une feature déjà possédée. (b) L'édition Tina **en prod** exige Tina Cloud (SaaS externe) OU self-host = `TinaNodeBackend` + `@tinacms/datalayer` + un adaptateur DB (ex. MongoDB) + Auth.js + fonctions serverless (doc officielle self-hosted) → contredit frontalement la cible « zéro serveur, zéro DB, forkable clone+install+run ». (c) Le visual editing veut `output: 'server'` + adaptateur SSR ; `output: 'static'` n'est possible qu'en enveloppant **toutes** les régions éditables dans `<TinaIsland>` (invasif sur ~168 composants, chemin non-défaut). Ce n'est PAS une question de format (Tina gère md/mdx/json/yaml/toml) ni de compatibilité Astro (Tina EST compatible) : c'est l'architecture d'édition. **Tina reste le bon choix pour un AUTRE segment** (offre PME éditoriale autonome : beaucoup de contenu long, confort visual/preview, backend accepté) → cf positionnement 2 tiers en bas.

2. **PageDocument JSON canonique, git-based.** Le contenu/structure des pages vit en `.json` validé par le schéma Zod existant (loader data Astro `glob`/`file`, supporté nativement). Git EST la base de données (commits = journal, branches = brouillons, historique = audit). Zéro DB, zéro serveur pour faire tourner le site. Boilerplate forkable : `clone + install + run`. Chaque page porte `"$schema"` (généré depuis Zod via zod-to-json-schema) pour l'autocomplétion humaine et le contrat IA.

3. **Keystatic pour la coque CMS de commodité** : lister/créer/dupliquer, media library, drafts via branches GitHub, et le **contenu d'entités partagées** (`src/data/**` : cas, prix, témoignages, auteurs = le contenu GLOBAL qui manque aujourd'hui). Git-native, JSON-native, no DB, reader au build (SSG préservé). Open-source, réversible (le contenu reste du JSON git : Keystatic est jetable, zéro lock-in).

4. **Builder maison pour les sections.** Le `sections[]` est édité dans le builder (canvas visuel + preview live via la route SSR render), PAS dans Keystatic. Le builder EST l'éditeur visuel (remplace l'édition visuelle de Tina, en mieux : DS-aware, section-aware).

5. **MCP = surface IA** (déjà livré #41) : compose/écrit le même PageDocument JSON.

## Règle structurante : 1 fichier = 1 propriétaire

| Donnée | Fichier | Propriétaire écrivain |
|---|---|---|
| Page (meta + `sections[]`) | `src/content/<col>/<slug>.json` | **Builder + MCP** uniquement |
| Entités partagées | `src/data/<entity>/*.json` | **Keystatic** |
| Media, settings, nav | `src/data/**` | **Keystatic** |

Keystatic ne possède JAMAIS les page docs → pas de risque de strip de clé inconnue (un CMS schema-driven n'écrit que les champs déclarés). Le builder et Keystatic n'écrivent jamais le même fichier.

## Question tranchée : ré-écrire les 199 schémas dans Keystatic ? NON

Même si des agents IA font le travail (coût de main-d'œuvre bas), c'est NON pour les 199 sections, parce que :
- Keystatic **ne sait pas rendre tes composants Astro** : même après ré-encodage, tu n'aurais qu'un formulaire SANS aperçu. Tu ré-encodes pour un bénéfice que tu n'obtiens pas.
- Double source de schéma (Zod + fields Keystatic) = mode de défaillance permanent (drift, perte de données), pas juste du labeur.
- Tu reconstruirais une version inférieure du builder que tu possèdes déjà (lui a l'aperçu live).

OUI en revanche pour définir nativement dans Keystatic les entités/meta simples (mapping natif, générable depuis Zod). Ce n'est pas de la bidouille, c'est l'usage correct. La bidouille serait de forcer Keystatic à posséder les sections.

## Cible primaire (affinée 2026-06-28, trigger Simon) : équipe marketing / PME en self-serve

Le produit ne vise PAS que des équipes techniques. **Cible primaire = équipes marketing / PME** qui héritent du boilerplate comme un template WordPress clé-en-main et **éditent elles-mêmes** contenu, sections, pages, landing, case-studies. Conséquences directes :
- **Wedge de positionnement** : « réduire le temps qu'une équipe marketing passe derrière un CMS, parce qu'elle prend déjà en main Claude/ChatGPT, + performance Astro/SSG » vs WordPress/Webflow (legacy, lourds, perf médiocre, IA bolt-on). Position différenciée et opportune (adoption IA généralisée maintenant).
- **Édition = 3 surfaces, toutes couvertes sans Tina** : (1) composer sections/pages = NOTRE builder (visuel, DS-aware, preview live) ; (2) entités/media/nav = formulaires Keystatic (intuitifs à l'usage ; le « dev-first » concerne la CONFIG qu'on écrit, pas l'utilisateur) ; (3) corps éditorial long = Keystatic `fields.document` (rich-text WYSIWYG). L'IA (chatbot → MCP → JSON → preview, #41) est le différenciateur du temps réduit ; JSON est le format le plus propre pour que l'IA produise et valide.
- **Friction honnête à soigner** : onboarding Keystatic mode GitHub (compte GitHub + GitHub App) moins « connexion-et-j'édite » que Tina Cloud. Mitigations : agence opère git/deploy au handoff ; mode local ; surtout l'édition passe d'abord par le chatbot IA (contourne l'admin). = maillon faible UX à surveiller.
- **Décision Tina/Keystatic INCHANGÉE par cette cible** : Tina n'ajouterait que l'édition in-context du corps au prix d'un backend (DB+auth) qui casse la promesse forkable clone+install+run = anti-turnkey pour une PME.

## Contrainte de premier rang : UX des utilisateurs du PRODUIT

Avec la cible marketing/PME self-serve ci-dessus, l'UX du builder + coque Keystatic + boucle IA doit être « facile comme un template WordPress » : c'est l'**exigence produit n°1**, devant la complétude du catalogue. L'expérience des utilisateurs de l'app (ceux qui composent les sites) est un critère de conception, pas un après-coup. Conséquence sur les choix :
- Les surfaces à **haute fréquence et signature produit** (le builder/canvas) doivent être bespoke et soignées. On les possède, on y investit le design.
- Les surfaces **utilitaires/back-office** (CRUD entités, media) tolèrent le générique-propre de Keystatic. Si la cohérence de marque y devient un argument de vente, prévoir un admin bespoke en investissement ULTÉRIEUR, sans bloquer l'archi maintenant.
- Ne pas laisser l'admin générique de Keystatic devenir le VISAGE du produit : le visage, c'est le builder.

## Visiteurs : SSG/perf intacts

Site public en `output: 'static'` (contenu lu au build), ISR per-route via `@astrojs/vercel` là où utile (gros ensembles programmatiques). Seule la route admin `/keystatic` est dynamique (hybride `prerender = false`), ou en local-only. Zéro impact sur la perf visiteur.

## À vérifier avant industrialisation (rule 03, POC)

1. Comportement Keystatic sur clés inconnues (garantir qu'il ne touche jamais les page docs).
2. Existence d'un champ custom hors-document pour un bouton deep-link in-admin (sinon pont au niveau navigation).
3. Câblage `@keystatic/astro` admin hybride SSG-safe + collections format JSON.

## Migration (dans #39/#40, pas en reformatage isolé)

1. Générer `page.schema.json` depuis Zod.
2. Loader data JSON pour les collections composables ; garder MDX pour l'éditorial (blog, cases-avec-corps).
3. Convertir les ~23 `.mdx` composables → `.json` (transform déterministe).
4. Retirer Tina (config, deps, generated, bridge).
5. Builder write-back dev (`/api/page/save`) + MCP `page_write`.
6. POC Keystatic : 1 collection entité + media + reader au build.
7. GF-1 = parité de rendu (texte visible identique au dist actuel, même méthode que la vérif #38 T5).

## Réévaluation 2026-06-28 (Tina vs Keystatic, doc officielle) : décision MAINTENUE

Re-vérifiée à la demande de Simon, sources officielles via context7.

**Preuve Tina** (`tinacms/tina.io`, framework Astro + self-hosted) :
- Visual editing par défaut = `output: 'server'` + adaptateur SSR ; l'éditeur « refetch les régions éditables depuis des routes on-demand ». `output: 'static'` possible UNIQUEMENT si toutes les régions éditables sont enveloppées dans `<TinaIsland>`.
- Édition en prod = Tina Cloud OU self-host (`TinaNodeBackend` + `@tinacms/datalayer` + adaptateur DB type MongoDB + Auth.js + fonctions serverless).

**Preuve Keystatic** (`thinkmill/keystatic`) :
- `storage: github` = commit direct dans le repo via GitHub App, **sans DB ni backend persistant** ; `storage: local` = filesystem en dev.
- `createReader` (build) / `createGitHubReader` (SSG/SSR) → lecture build-time, SSG intact.

**Point factuel corrigé** : Tina N'EST PAS limité à Markdown/MDX (gère json/yaml/toml + objets/listes/templates). Le format n'a jamais été le critère ici (cf point 1). Le différenciateur est la **philosophie d'édition** + l'**infra d'édition prod**, pas le format.

**Positionnement 2 tiers (adopté de la note Simon)** :
- **Option 1 (socle Waimia + boilerplate) = Keystatic** : site propriétaire contrôlé par l'équipe technique, SSG/perf/SEO/GEO prioritaires, Git + PR + Vercel, zéro DB. = NOTRE cas.
- **Option 2 (offre future, PME éditoriale autonome) = Tina** : client qui édite beaucoup, veut visual/preview confortable, accepte un backend. Reste sur la table comme tier d'offre, pas comme dette.

**Conditions de bascule vers Tina** (réversibilité, anti-dogme) : (1) la cible cesse d'être « zéro serveur/DB forkable » ; (2) on abandonne le builder maison au profit de l'édition contextuelle in-page clé-en-main ; (3) la cible primaire devient le PME marketing autonome plutôt que le boilerplate tech-first. Aucune n'est vraie aujourd'hui.

---

*Décision produit + ingénierie · 2026-06-28 · à exécuter sous #39/#40. Réévaluée 2026-06-28 (doc officielle Tina + Keystatic), décision maintenue.*
