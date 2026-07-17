# 15 · App « waimia-seo » : vision, comparatif boilerplates, architecture (cadrage stratégique)

> **Statut : DOC DE STRATÉGIE. Aucune décision d'implémentation figée, aucune ligne de code.**
> Cadre le produit SaaS SEO multi-clients de l'agence et tranche : boilerplate, base de
> données, design des connecteurs, intégration Google Search Console, couche IA.
> Source de vérité de CE sujet. Croise sans dupliquer :
> `docs/strategy/13-vision-dashboard-systeme-forkable.md` (§4bis : l'app SEO comme plugin du
> dashboard forkable), `docs/strategy/10-architecture-finale-v7.md §0bis` (positionnement V8,
> 0 captivité), `docs/strategy/05-stack-decision.md` (stack du site). L'app SEO est le premier
> plugin à forte valeur récurrente du boilerplate produit : le site du client s'améliore seul.
>
> Historique : création 2026-07-16 (brief Simon + extension boucle contenu, même session).
> **Addendum 2026-07-17 : le chemin v0 change (directive Simon du matin) → §7bis POC git-based.**

---

## §7bis ADDENDUM 2026-07-17 · POC git-based D'ABORD, saasification ensuite (directive Simon)

> Verbatim Simon (2026-07-17 matin) : « l'objectif suivant c'est d'avoir la SPA avec le contenu
> en .md servi par exemple via waimia.com/dashboard-seo [...] Pour les logiciels plutôt que
> d'enregistrer dans des tables la mémoire vit dans des lignes d'un fichier markdown et lorsqu'on
> met à jour une info CRUD c'est le markdown qui se met à jour ainsi que notre app au build. Au
> début plutôt que de faire des saas on utilise cette technique de logiciel sans serveur/bdd
> seulement git-based ça suffit pour le POC normalement et si le POC fonctionne sur le marché
> [...] on verra pour le saasifier. »

Ce que ça change par rapport aux §2/§6/§7 (qui restent valides pour la phase SaaS ultérieure) :

1. **v0 = SPA `/dashboard-seo` DANS waimia-web** (pas un nouveau repo, pas de boilerplate, pas
   de Postgres). « L'OS » = l'app dashboard à laquelle se branchent les briques (catalogue/DS,
   builder, listing des apps, dashboard-seo) ; **au départ, cet OS est le projet waimia lui-même**.
2. **Mémoire = markdown git-based** : collection Astro `dashboard-seo` (.md) = pages suivies,
   recommandations, snapshots de scores. CRUD = éditer le .md (commit) → l'app se met à jour au
   build. Zéro serveur, zéro BDD.
3. **Data v0 = PageSpeed Insights API v5** (fetch client, pas d'OAuth requis). La connexion
   Google/GSC (OAuth, §4) arrive en v0.2 : prérequis = client OAuth GCP créé par Simon.
4. **« Auto improve » v0.2** : accepter une reco = écriture du .md via endpoint `/api/*`
   (pattern forms existant) + GitHub API → commit → rebuild → modif appliquée. C'est la version
   git-based du connecteur « applyChange » du §3 : le POC valide le concept sur NOTRE site avant
   de le généraliser aux sites clients.
5. **Saasification (§2 boilerplate, §6 Postgres) : conditionnée à la traction du POC.**

Fiche décision : `~/.claude/night-sessions/2026-07-16/decisions/0014`.

## §0 Vision produit (reformulation fidèle du brief, 0 invention de scope)

App SaaS **waimia-seo**, opérée par l'agence pour ses clients. Chaque client la branche sur
**son propre site web**. Fonctions :

- **Connexion Google (OAuth) + Google Search Console** : le client voit les stats de ses pages
  (clics, impressions, CTR, positions).
- **App IA** : recommandations et workflows IA. Analyser X pages, identifier quoi améliorer
  pour le taux de clic et les impressions.
- **Boucle agentique on-page (contrainte d'infra n°1)** : quand une reco dit « change le H1 /
  la meta description / le title par X », un agent IA **applique la modification directement et
  automatiquement sur le site du client**.
  - v1 : sites sur notre stack (Astro SSG git-based, repo GitHub, contenu MDX/JSON, déployé
    Vercel) : appliquer une modif = commit/PR sur le repo.
  - v2 : sites **WordPress** (REST API) et autres CMS.
  - Conséquence : architecture en **connecteurs/adapters par type de site**. L'app SEO
    « fonctionne comme un plugin » des boilerplates d'app de l'agence (Astro sur-mesure,
    WordPress).
- **Boucle contenu automatique (extension brief 2026-07-16)** : une fois branchée, l'app ne se
  limite pas aux modifs on-page. Elle **crée des articles et les publie automatiquement** sur le
  site du client, puis les **améliore chaque semaine** selon les recos pilotées par la donnée GSC
  réelle. Le produit est une **équipe marketing packagée** (mesure, création, test, itération) qui
  tourne seule, cohérente avec la famille « Système marketing » V8 (`strategy/10`).
- **Boilerplate SaaS** : partir d'un premier boilerplate qui assemble proprement les technos
  nécessaires. Pistes ouvertes au départ (Next.js ou TanStack Start, Postgres ou autre, voire
  git-based sans BDD) : ce doc les compare honnêtement et tranche.
- **Observabilité** : l'app SEO expose son état (workflows, logs des actions de l'agent) pour être
  **monitorée depuis le dashboard forkable** (`strategy/13`), qui agrège toutes les apps/agents.

Invariant de positionnement (V8, `strategy/10 §0bis`) : **0 captivité, passation incluse**. Le
site reste au client, l'app agit dessus par API/git sans le verrouiller.

---

## §1 Parcours utilisateur v1

### Parcours A : recos on-page (le cœur v1)

1. **Connexion Google** (OAuth). Signup avec scope minimal (identité), puis **autorisation
   incrémentale** du scope Search Console au moment où l'utilisateur ouvre la section SEO.
2. **Choix de la propriété GSC** : l'app liste les propriétés vérifiées du compte
   (`sites.list`), le client en sélectionne une (ex. `sc-domain:waimia.com`).
3. **Dashboard stats** : séries clics / impressions / CTR / position par page et par requête,
   historisées côté app (pas seulement les 16 mois de Google).
4. **Analyse IA de X pages** : l'agent croise les pages faibles (fort volume d'impressions, CTR
   bas, position 5 à 15 = potentiel) et propose des changements ciblés de title / meta / H1.
5. **Recommandations** : liste priorisée, chaque item = page + champ + valeur actuelle + valeur
   proposée + justification + gain attendu.
6. **« Appliquer »** : le client valide (human-in-the-loop). L'agent appelle le **connecteur** du
   site : côté Astro, ouverture d'une **PR** (ou commit direct selon le mode) ; côté WordPress,
   **update REST** du champ SEO. Retour = lien PR / id de révision.
7. **Boucle** : après le déploiement et le délai de fraîcheur GSC (2 à 3 jours), l'app re-mesure et
   attribue l'effet (avant/après), nourrissant les recos suivantes.

### Parcours B : contenu automatique (extension, v1.5 à v2)

1. **Branchement du site** (même connecteur qu'en A).
2. **Calendrier éditorial IA** : à partir des requêtes GSC (impressions sans clic, positions
   11 à 20, requêtes émergentes) + du maillage interne + du catalogue de sections, l'agent propose
   un planning d'articles.
3. **Publication auto** : l'agent **crée** l'article (MDX + frontmatter côté Astro via PR ; POST
   post côté WordPress) et le publie (ou le met en attente de validation selon le mode du client).
4. **Rapport hebdomadaire** : chaque semaine, un job récurrent mesure la performance des contenus
   publiés, révise/enrichit ceux qui stagnent, et envoie un rapport (clics gagnés, articles
   publiés, modifs appliquées).

---

## §2 Comparatif boilerplates (2026) et recommandation

Activité repo vérifiée le 2026-07-16 via `gh repo view`.

| Boilerplate | Framework | Auth | DB / ORM | Billing | Multi-tenant | Activité (pushedAt · stars) | Licence | Fit agentique | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **nextjs/saas-starter** (officiel) | Next.js (App Router) | JWT cookie **maison** | Postgres + **Drizzle** | Stripe Checkout + portail | Équipes basiques (Owner/Member) | 2025-12-11 · ~15,9k | **MIT** | Vercel-natif, AI SDK 1re classe, auth qu'on possède | **RECO (skeleton)** |
| **ixartz/SaaS-Boilerplate** | Next.js 16 | **Clerk** (vendor) | Postgres + Drizzle | Stripe | **Oui** (orgs + RBAC + i18n) | 2026-07-02 · ~7,3k | MIT | Riche mais Clerk complique la possession des tokens Google | Runner-up écarté (lock-in auth) |
| **Supastarter (TanStack Start)** | TanStack Start | **Better Auth** | Postgres + Drizzle (DB-agnostique) | Stripe / Lemon / Polar | **Oui** (natif) | Produit payant (repo privé) | Payant | Better Auth possède les tokens Google, multi-tenant prêt | **RUNNER-UP** |
| **BetterStarter (TanStack Start)** | TanStack Start | Better Auth | Postgres + Drizzle | Stripe | Oui | Produit payant | Payant | Idem, moins mûr que supastarter | Alternative runner-up |
| **mugnavo/tanstarter** | TanStack Start | Better Auth | Postgres + Drizzle | (aucun) | Non | 2026-07-14 · ~1,2k | Unlicense | Base propre mais sans billing ni multi-tenant | Trop minimal |
| **t3 (create-t3-app)** | Next.js | NextAuth | Prisma (au choix) | (aucun) | Non | 2025-12-13 · ~29k | MIT | Générateur, pas un SaaS kit (ni billing ni tenant) | Hors cible |
| **wasp-lang/open-saas** | **Wasp** (framework) | Wasp Auth (Google/GitHub…) | Postgres + Prisma | Stripe / Polar | Partiel | actif · repo dédié | MIT | Framework lock-in Wasp, pas Vercel-natif | Écarté (lock-in framework) |
| **vercel/ai-chatbot** | Next.js | Auth.js | Postgres | (non SaaS) | Non | 2026-07-08 · ~20,6k | Autre | Excellent socle **IA** mais pas un SaaS multi-tenant | Réf. pour la couche IA, pas le socle |

### Recommandation tranchée

**Base = `nextjs/saas-starter` (officiel), à laquelle on ajoute Better Auth pour posséder les
tokens Google.** Justification :

1. **La contrainte n°1 (l'agent applique des modifs) impose de posséder l'auth.** L'app doit
   détenir côté serveur les **refresh tokens Google** avec **scopes incrémentaux** (GSC ajouté
   après signup) pour appeler l'API GSC et, plus tard, d'autres API Google. Un kit qui délègue
   l'auth à un vendor (Clerk, dans ixartz) rend l'obtention d'un refresh token long à scope
   arbitraire pour des appels backend inutilement tordue. **Better Auth** (self-hosted, provider
   Google + `genericOAuth`, stockage des tokens en base) répond exactement à ce besoin : c'est le
   seul écart qu'on assume vs le starter officiel, et il est décisif.
2. **Minimal = bon ici.** On a beaucoup de custom à construire (connecteurs, ingestion GSC,
   agents, boucle contenu). Un kit « batteries incluses » (Makerkit, ixartz) se battrait contre
   nous. Le starter officiel donne le squelette juste : Next + Drizzle + Postgres + Stripe +
   shadcn, MIT, sans dette.
3. **Vercel-natif.** L'agence déploie déjà `waimia-web` sur Vercel. Next.js sur Vercel = 1re
   classe pour le **Vercel AI SDK 6**, les **Vercel Cron**, les fonctions serverless. Zéro friction
   d'infra.
4. **Postgres + Drizzle** est exactement ce qu'exige l'historisation GSC et le multi-tenant (§6).

**Runner-up = Supastarter (TanStack Start + Better Auth + Drizzle + multi-tenant + multi-billing).**
On paie pour sauter le scaffolding multi-tenant/billing et Better Auth est déjà câblé. On l'écarte
en n°1 seulement parce que **TanStack Start est plus jeune sur Vercel** que Next, et que payer un
kit fermé va contre l'esprit « on possède le socle, 0 captivité ». Si la vitesse de mise sur le
marché prime sur la maîtrise, c'est le bon choix de repli.

Sources : [nextjs/saas-starter](https://github.com/nextjs/saas-starter) ·
[ixartz/SaaS-Boilerplate](https://github.com/ixartz/SaaS-Boilerplate) ·
[supastarter TanStack Start](https://supastarter.dev/tanstack-start-saas-boilerplate) ·
[BetterStarter](https://betterstarter.dev/) ·
[mugnavo/tanstarter](https://github.com/mugnavo/tanstarter) ·
[wasp open-saas](https://github.com/wasp-lang/open-saas) ·
[Makerkit : comparatif honnête 2026](https://makerkit.dev/blog/saas/best-nextjs-saas-boilerplate) ·
[Orbit : comparatif 2026](https://wereorbit.com/blog/best-nextjs-saas-boilerplates-2026) ·
[Better Auth](https://www.better-auth.com/).

---

## §3 Architecture connecteurs (le cœur du produit)

Un **connecteur** = un adapter par type de site. L'agent ne connaît que l'interface, jamais le
détail du CMS. Interface commune (contrat) :

```ts
interface SiteConnector {
  // Lecture de l'état SEO d'une page (title, description, H1, corps, canonical…)
  readPage(url: string): Promise<PageSnapshot>;
  // Diff proposé, sans écrire (prévisualisation + validation humaine)
  proposeChange(page: PageRef, patch: SeoPatch): Promise<ChangeDiff>;
  // Application on-page (title/meta/H1) : renvoie une réf traçable (PR/commit/révision)
  applyChange(diff: ChangeDiff): Promise<AppliedChange>;
  // Création d'un contenu neuf (article/page) : renvoie la réf de publication
  createContent(doc: ContentDraft): Promise<AppliedChange>;
}
```

`AppliedChange` porte toujours une **réf traçable** (`prUrl` / `commitSha` côté git, `postId` /
`revisionId` côté WordPress) : c'est la brique de l'**audit trail** (§6).

### v1 : `AstroGitConnector` (notre stack, ancré dans le vrai repo)

Ancrage réel `waimia-web` (vérifié le 2026-07-16) : le contenu des pages services vit en **JSON**
dans `src/content/services/*.json`. Les champs SEO sont :

- **title** : `title_fr` / `title_en` (racine du JSON).
- **meta description** : `description_fr` / `description_en` (racine).
- **H1** : dans `sections[0]` (type `hero-masthead-card`), champs `h1_fr` / `h1_en`.

Les collections MDX (`src/content/**/*.mdx`, ex. `authors`, `outils`) portent title/description en
**frontmatter YAML**. Le connecteur doit donc résoudre, par type de fichier, un **chemin de champ**
(JSON path ou clé frontmatter) : c'est une **table de mapping** `collection → {titlePath,
descriptionPath, h1Path}`, pas du texte brut réécrit. Écriture :

- **Read** : GitHub Contents API (`GET /repos/.../contents/<path>`), parse JSON/frontmatter, extrait
  les champs via le mapping.
- **Apply / Create** : édition du champ (ou création d'un fichier MDX pour un article) puis
  **ouverture de PR** via une **GitHub App** installée sur le repo du client, avec
  [`octokit-plugin-create-pull-request`](https://github.com/gr2m/octokit-plugin-create-pull-request)
  (multi-fichiers, commit + PR en un appel, `emptyCommit:false`). Le déploiement Vercel du client
  fait le reste (aperçu sur la preview, mise en prod au merge). Mode « commit direct sur `main` »
  possible pour les clients qui l'autorisent, mais **PR par défaut** (revue + rollback git natif).

L'authent = **GitHub App** (installation par repo, permissions `contents:write` + `pull_requests:write`),
pas un PAT personnel : scope minimal, révocable, multi-tenant propre.

### v2 : `WordPressConnector` (REST API)

- **Read/Apply title+meta** : le SEO WordPress vit dans les plugins. **Yoast** n'expose pas ses
  champs en écriture REST par défaut : il faut **enregistrer les meta** `_yoast_wpseo_title` /
  `_yoast_wpseo_metadesc` comme `register_post_meta(..., show_in_rest:true)` via un petit plugin
  compagnon, puis `POST /wp-json/wp/v2/posts/<id>` avec `{ meta: { _yoast_wpseo_title, ... } }`.
  **RankMath** : idem, `rank_math_title` / `rank_math_description` souvent ignorés en REST natif,
  d'où le plugin [Rank Math API Manager](https://github.com/Devora-AS/rank-math-api-manager)
  (endpoint `POST /wp-json/rank-math-api/v1/update-meta`).
- **H1 / create** : `title.rendered` = souvent le H1, ou dans le corps. `createContent` = `POST
  /wp-json/wp/v2/posts` (statut `draft` ou `publish`).
- **Auth** : Application Passwords (ou JWT), stockées chiffrées par tenant.

Le WordPress connecteur suppose donc **un plugin compagnon installé côté client** (fourni par
l'agence) : c'est le pendant WP de la GitHub App. À cadrer commercialement (le plugin fait partie de
la prestation).

Sources : [Yoast REST API](https://developer.yoast.com/customization/apis/rest-api/) ·
[Update Yoast via REST (meta enregistrées)](https://kahunam.com/articles/wordpress/how-to-update-yoast-seo-titles-and-meta-descriptions-via-the-wordpress-rest-api/) ·
[Rank Math API Manager](https://github.com/Devora-AS/rank-math-api-manager).

### Branchement sur les boilerplates de l'agence

Le connecteur est le **contrat unique** entre l'app SEO et n'importe quel site produit par
l'agence. Un nouveau type de site = un nouvel adapter, sans toucher la couche IA ni le dashboard.
C'est ce qui rend l'app SEO « plugin » du boilerplate forkable (`strategy/13 §4bis`). L'app expose
en plus un flux d'**observabilité** (état des workflows + logs des actions de l'agent) consommé par
le dashboard d'agrégation.

---

## §4 Intégration Google Search Console

- **API** : Search Console API, méthode `searchanalytics.query` pour les stats, `sites.list` pour
  lister les propriétés vérifiées.
- **Scopes OAuth** : `https://www.googleapis.com/auth/webmasters.readonly` suffit (lecture stats +
  `sites.list`). Bonne nouvelle : Google a **reclassé `webmasters.readonly` en scope non sensible en
  2024**, donc **pas de vérification par-scope** requise (l'app reste soumise à la vérification OAuth
  générale si publique). Autorisation **incrémentale** : signup avec identité, on ajoute le scope GSC
  à l'ouverture de la section SEO.
- **Vérification de propriété** : l'app ne lit que des propriétés **déjà vérifiées** dans le compte
  Google du client (via `sites.list`). Pas de flux de vérification à construire en v1 : on s'appuie
  sur l'existant du client.
- **Quotas / limites** (à intégrer dans le design d'ingestion) :
  - **50 000 lignes / jour / search type** maximum exposées (top par clics) : au-delà, invisible.
  - **25 000 lignes / requête** (pagination via `startRow`).
  - Quotas de charge : ~1 200 QPM par site/user ; 40 000 QPM et 30 M QPD par projet.
  - **Délai de fraîcheur : 2 à 3 jours.** Les mesures « avant/après » d'une modif doivent en tenir
    compte (ne pas conclure trop tôt).
- **Modèle de données minimal** (Postgres, §6) :
  - `gsc_property(id, org_id, site_url, permission_level, connected_at)`
  - `gsc_daily_metric(property_id, date, page, query, device, clicks, impressions, ctr, position)`
    (snapshot quotidien via job : c'est notre historique propre, au-delà des 16 mois Google).
  - `google_oauth_token(org_id, refresh_token_enc, scopes, expires_at)`.

Sources : [Usage Limits GSC API](https://developers.google.com/webmaster-tools/limits) ·
[Récupérer ses données (pagination 25k)](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data) ·
[Autoriser les requêtes / scopes](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing) ·
[OAuth 2.0 Scopes Google](https://developers.google.com/identity/protocols/oauth2/scopes) ·
[Limite 50 000 lignes](https://weld.app/blog/google-search-console-50k-limit).

---

## §5 Couche IA (recos + workflows + application agentique + boucle contenu)

**Choix cadre : Vercel AI SDK 6 comme couche agent, Claude (Anthropic) comme modèle par défaut.**
Justification honnête (les deux SDK sont valables) :

- **Vercel AI SDK 6** : `ToolLoopAgent` (ex-`Experimental_Agent`, désormais production-grade) gère
  la boucle tool-calling avec **`stopWhen`** (garde-fou : 20 steps par défaut, condition de budget
  possible) et **`prepareStep`**. **Provider-agnostique** (on garde Claude, on peut basculer),
  **human-in-the-loop en une ligne** (`needsApproval` : parfait pour le « Appliquer » validé),
  MCP stable. C'est le meilleur fit pour une **IA intégrée dans une web app Next sur Vercel**.
- **Claude Agent SDK** : « Claude Code en librairie », batteries incluses (contexte, outils,
  sous-agents), plus fort pour des agents **d'ops autonomes end-to-end**. On le garde en réserve
  pour les workflows lourds hors requête web (ex. génération de gros batch de contenu), mais il n'a
  pas besoin d'être le socle applicatif.

**Décision : socle = Vercel AI SDK 6** (dans l'app Next), Claude en modèle. Les **connecteurs sont
exposés comme tools** de l'agent (`readPage`, `proposeChange`, `applyChange`, `createContent`), avec
`needsApproval` sur les tools mutants en mode supervisé.

### Workflows

1. **Reco on-page (à la demande)** : ingest GSC → sélection des pages à potentiel → l'agent lit la
   page (tool `readPage`) → propose des patchs → validation → `applyChange` → trace la réf.
2. **Boucle contenu hebdomadaire (récurrente)** : c'est un **job cron**. Chaque semaine :
   `mesurer GSC (requêtes à potentiel) → générer/réviser des articles → publier (createContent) →
   planifier la re-mesure`. Human-in-the-loop optionnel selon le mode du client (auto-publish vs
   file de validation).

**Ordonnancement des jobs : Vercel Cron.** Suffisant et natif :
- Ingestion GSC quotidienne + boucle contenu hebdomadaire = cadence largement compatible (Pro :
  cadence à la minute ; même le plan Hobby autorise 1x/jour, 100 crons/projet sur tous les plans).
- Pour les traitements longs (batch de contenu, re-mesure de N pages), **découper en chunks** et
  répondre vite (pattern serverless standard), ou pousser dans une file. Si le volume grossit,
  passer à une vraie **queue** (Vercel Queues / un worker dédié) : à réévaluer, pas nécessaire en v1.

Sources : [AI SDK 6 (Vercel)](https://vercel.com/blog/ai-sdk-6) ·
[AI SDK : Loop Control (`stopWhen`)](https://ai-sdk.dev/docs/agents/loop-control) ·
[Claude Agent SDK vs Vercel AI SDK 6](https://bertomill.medium.com/managed-agents-vs-agent-primitives-comparing-claudes-agent-sdk-and-vercel-s-ai-sdk-fb99d6b2af5f) ·
[Vercel Cron : usage & pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing) ·
[Cron : 100/projet tous plans](https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan).

---

## §6 Décision base de données : **Postgres, oui, sans hésiter**

Avis tranché : **Postgres (Neon, serverless, Vercel-natif) est incontournable.** Le git-based /
sans-BDD ne tient pas ici. Raisons :

1. **Séries temporelles GSC.** Google ne garde que ~16 mois et l'API plafonne à 50 000 lignes/jour.
   Pour avoir un **historique propre**, des dashboards rapides et des comparaisons avant/après, il
   faut **snapshotter quotidiennement** dans une table relationnelle indexée. Ni le git, ni un simple
   KV ne font des requêtes d'agrégat temporel correctes.
2. **Multi-tenant.** Isolation par `org_id` (row-level), permissions, facturation par plan : c'est du
   relationnel. Le git-based ne modélise pas des tenants.
3. **Audit trail des modifs appliquées.** Traçabilité qui/quoi/quand + réf (`prUrl`/`commitSha`/
   `revisionId`) + effet mesuré : table transactionnelle. C'est la preuve produit (« le site s'est
   amélioré de X ») et la sécurité (rollback, responsabilité).
4. **État des jobs et des workflows** (cron, files, retries) + **coffre à tokens OAuth chiffrés**.
5. **Recos et calendrier éditorial** : entités liées (page, reco, article, statut) = relationnel.

Le **contenu du site client**, lui, **reste où il vit** (git du client, WordPress du client) : la
BDD Postgres est la base de **l'app SEO**, pas un CMS. On ne recopie pas le site en base, on stocke
stats + recos + audit + tokens + état. ORM : **Drizzle** (déjà dans le boilerplate reco, type-safe,
Vercel-friendly). Base : **Neon** (Postgres serverless, intégration Vercel).

---

## §7 Chemin v0 → v1 (et ce qu'on ne fait pas)

- **v0 (socle)** : instancier le boilerplate (`nextjs/saas-starter` + Better Auth), Postgres Neon +
  Drizzle, Stripe, shadcn. Connexion Google OAuth (identité) + autorisation incrémentale GSC.
  `sites.list` + sélection de propriété. **Sortie : un client se connecte et voit ses propriétés.**
- **v1 (le produit qui a de la valeur)** :
  1. Ingestion GSC quotidienne (cron) + tables `gsc_daily_metric` + dashboard stats.
  2. Agent de reco on-page (Vercel AI SDK 6, Claude) : analyse X pages → recos priorisées.
  3. **`AstroGitConnector`** (GitHub App + PR) : bouton « Appliquer » → PR sur le repo du client.
     C'est la **boucle agentique complète** sur notre propre stack, prouvable de bout en bout.
  4. Audit trail + re-mesure avant/après (en tenant compte du délai 2 à 3 jours).
- **v1.5** : **`WordPressConnector`** (REST + plugin compagnon Yoast/RankMath). Élargit le marché
  au-delà des sites maison.
- **v2** : **boucle contenu automatique** (`createContent` + cron hebdomadaire : calendrier éditorial
  IA → publication → rapport hebdo). Placée après v1/v1.5 en connaissance de cause : créer et publier
  du contenu neuf a un **risque qualité/marque** plus élevé que modifier un title. On la lance quand
  la boucle on-page (plus sûre, plus bornée) a fait ses preuves et que le human-in-the-loop est rôdé.
  **Justification du séquencement** : on gagne d'abord la confiance sur des changements réversibles et
  petits (title/meta/H1 via PR), avant de laisser l'agent produire des pages entières.

**Ce qu'on NE fait PAS en v1** :

- Pas de connecteur autre qu'Astro-git (WordPress = v1.5, autres CMS = plus tard).
- Pas de création de contenu automatique (v2).
- Pas de flux de **vérification de propriété** GSC maison (on lit les propriétés déjà vérifiées).
- Pas de multi-tenant « teams/RBAC » élaboré : un tenant = un client + ses sites. On reste simple.
- Pas de queue dédiée : Vercel Cron + chunking suffisent tant que le volume est modéré.
- Pas de dashboard d'agrégation ici : l'app SEO **expose** son observabilité, le dashboard
  (`strategy/13`) la consomme, mais c'est un autre chantier.

---

## Annexe : ancrages vérifiés dans le repo (2026-07-16)

- `src/content/services/agents-ia.json` : `title_fr`/`title_en`, `description_fr`/`description_en`
  en racine ; H1 dans `sections[0]` (`hero-masthead-card`) champs `h1_fr`/`h1_en` (20 sections).
- Collections MDX (`src/content/authors`, `src/content/outils`) : title/description en frontmatter.
- Conclusion : le connecteur Astro doit résoudre les champs SEO par une **table de mapping
  collection → chemins**, jamais par réécriture de texte brut.
