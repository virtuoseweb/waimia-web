# 13 — Vision produit : dashboard admin + système forkable (directive Simon 2026-07-12)

> **Statut : VISION CONSIGNÉE, chantier NON ouvert.** Ce doc capture fidèlement la directive
> Simon du 2026-07-12 (session design-lab home E). Il complète le brief builder en cours
> (cf. memory `builder-vision-hybrid-mcp-chat` : ne pas attaquer l'architecture tant que
> Simon n'a pas dit « j'ai toutes les infos »). Source de vérité de CE sujet.
> Liens : `docs/specs/05-builder-vision-reference.md` (vision builder, brief clos 2026-06-29)
> et `docs/specs/06-builder-architecture.md` (archi builder planifiée Φ0→Φ6, 0 build),
> `strategy/05-stack-decision.md` (stack), `docs/audits/04-packages-monorepo-40.md`
> (packages existants), `mcp/waimia-catalogue-server.mjs` (MCP catalogue livré, #41).

## 1. Le système final (produit cible)

Un **app/système forkable** : une base clonable par client qui contient les pages de
connexion aux différentes intégrations, et qui assemble :

- le **site web** (Astro/React actuel) ;
- le **builder** (hybride relume/webflow simplifié + chat MCP, brief en cours) ;
- le **DS Studio** (source de vérité design, déjà en prod `/agence/ds-studio`) ;
- le **CMS sur mesure** (contenu ; Tina reste la piste pour le contenu, cf. memory
  `vision-produit-roadmap-saas`) ;
- les **apps et fonctionnalités IA** créées pour le site (bibliothèque de sections,
  serveur MCP catalogue, quiz/diagnostic, etc.).

## 2. Le méga dashboard admin

- **Une app dédiée**, distincte du site : elle **intègre** le site Astro/React, le CMS,
  le builder et les apps, sans jamais écraser le projet du site connecté au domaine.
- **Déploiement progressif** :
  1. d'abord sur le **même domaine, en sous-URL** (ex. `virtuoseweb.fr/dashboard-admin`),
     fonctionnant à côté du projet site (routing par chemin, zéro collision) ;
  2. ensuite sur un **sous-domaine** dédié.
- On peut y **connecter plusieurs autres applications** au fil du temps : le dashboard
  est le point d'agrégation.

## 3. Extensions et préconfigurations

- Le dashboard s'étend par **extensions** (modules activables).
- On crée des **préconfigurations** du dashboard : chacune active un jeu d'extensions
  **avec leur abonnement** et affiche le contenu correspondant. C'est le mécanisme de
  packaging commercial (gammes light/moyen/haut de la roadmap SaaS).

## 4. Modularité multi-outils (le choix, pas le verrouillage)

Les systèmes sont **modulaires** : pour chaque brique, le client choisit parmi plusieurs
options du marché. On sélectionne pour lui **le meilleur rapport qualité/prix** parmi les
meilleures apps du marché, en fonction des **enjeux de son entreprise**.

| Brique | Options envisagées |
| --- | --- |
| Site web | **Astro IA (maison)** · WordPress · Webflow |
| CRM | HubSpot · Pipedrive |
| ERP | Odoo · autres ERP |
| Prospection / outbound | Clay · PhantomBuster · Pharow · Lemlist · Instantly |
| Réseaux sociaux | Buffer |
| Automation | n8n · Make |
| Suites bureautiques | apps Microsoft · apps Google |
| Design | Canva · autres logiciels de design |
| IA | Claude · ChatGPT · Mistral |

Cohérence positionnement (V8, `strategy/10 §0bis`) : « on adapte la solution au
besoin/contraintes » devient ici un principe produit, pas seulement un discours
commercial. 0 captivité (passation incluse) reste un invariant : le fork appartient
au client.

## 4bis. App SEO autonome branchée au dashboard (ajout Simon 2026-07-12, même session)

C'est sur cette app dashboard que se branchera **notre app SEO / test A/B / amélioration
continue** : une fois correctement programmée avec les fonctions IA, elle travaille **en
autonomie** sur le site :

- **SEO continu** : mesure, itération, optimisation sans intervention manuelle ;
- **Tests A/B** pilotés par l'IA ;
- **Création générative** : landing pages (et autres surfaces) « parfaites », assemblées
  avec **toutes les bonnes pièces du puzzle** : le catalogue de sections composables,
  le DS, le maillage interne, les données de conversion. C'est la continuité directe
  du serveur MCP catalogue (#41 : `catalogue_search` / `page_compose` / `preview_render`)
  et de la couche métadonnées sémantiques (C2 : intent/pageRole/slots).

Le dashboard accueille de la même façon **les autres apps/plugins du boilerplate de
software product** : le repo est pensé comme boilerplate forkable (cf. cadrage builder
2026-06-29, `docs/specs/05` : features = « plugins standalone », futurs upsell/abo).
L'app SEO autonome est donc UN plugin du boilerplate parmi d'autres, le premier à forte
valeur récurrente (il justifie l'abonnement : le site s'améliore tout seul).

**Compléments (Simon 2026-07-12, suite)** :

- **Données branchées** : on y connecte **GSC** (Google Search Console) et les autres
  outils de tracking (Analytics, etc.). L'amélioration continue s'appuie sur la donnée
  réelle, pas sur des heuristiques.
- **E-commerce** : le dashboard gère « tout un tas de choses » pour les e-commerçants
  (périmètre à détailler : catalogue, fiches produit, SEO produit, flux).
- **Automatisation du support** client.
- **Réduction des clics par jour** : des workflows étudiés pour réduire le travail
  manuel quotidien de l'équipe. Le « nombre de clics économisés par jour » est une
  métrique produit en soi.
- **L'agent IA opère comme une équipe marketing complète (ou presque)** : organisation
  simple et efficace, **workflows + SOP ultra clean**. Le produit n'est pas un outil de
  plus : c'est une équipe marketing packagée (analyse, création, test, itération) avec
  ses procédures opératoires standardisées.

Cohérence commerciale : ça matérialise exactement la promesse V8 de la famille
« Système marketing » (strategy/10) : le système marketing vendu en prestation devient,
à terme, un produit qui tourne seul dans le dashboard.

## 5. Ce que ça implique (repères, pas décisions)

- L'existant est déjà orienté dans ce sens : monorepo #40 (packages `ds-tokens`,
  `ds-kernel`, `catalogue-ui`, `builder`), serveur MCP catalogue (#41), DS Studio,
  bibliothèque de 150+ sections composables JSON.
- Le dashboard = nouvelle app du monorepo (pas une extension du site Astro), avec
  connecteurs OAuth/API vers les outils tiers.
- **Aucune décision d'architecture prise ici** : attendre la fin du brief builder
  (Simon fournit messages + captures) avant tout choix de stack dashboard.

## Addendum 2026-07-21 — gate levé (« j'ai toutes les infos » + « 4.3 a ok »), constat honnête avant cadrage

Le brief builder est clos (Simon, `docs/specs/05` — confirmé et relancé le 2026-07-21 : « j'ai toutes
les infos », `4.3 a ok`). Le gate posé au §5 (« attendre la fin du brief builder avant tout choix de
stack dashboard ») est donc **levé** — P4.3-a n'est plus bloqué sur ce critère.

**Constat avant d'aller plus loin** : contrairement au builder, qui disposait de 5 messages détaillés
+ captures d'écran d'apps de référence (Relume/Webflow/Lovable) avant que `docs/specs/06` puisse être
écrit avec des contrats précis, ce document reste une **vision en une session** (2026-07-12), sans le
même niveau de détail UX. Rédiger une architecture cadrée (contrats, phases, stack) sur cette seule
base reviendrait à **inventer** des décisions (lequel des ~10 intégrations tierces en premier ? quelle
stack pour l'app dashboard elle-même ? modèle multi-tenant dès le v1 ou après ?) que Simon n'a pas
encore données — c'est exactement le travers que l'audit 08 ({ref}) et l'audit 09 (chat-MCP) ont évité
en posant des options + des questions plutôt qu'en tranchant à la place de Simon.

**Ce qui est raisonnablement clair déjà** (dérivable de ce doc + de l'existant, pas une invention) :
- Le dashboard est une **nouvelle app du monorepo** (§5), pas une extension du site Astro — cohérent
  avec le pattern déjà prouvé `packages/apps-*` (apps-atelier, apps-seo-dashboard) + `injectRoute`.
- Le premier « plugin » à forte valeur déjà nommé par Simon est **l'app SEO autonome** (§4bis) —
  candidat naturel de première brique si/quand le chantier s'ouvre, car elle réutilise du **livré** :
  MCP catalogue (#41), couche métadonnées C2, `catalogue_search`/`page_compose`/`preview_render`.

**Ce qui manque encore avant un vrai cadrage type doc06** :
1. Une **priorisation** : quelle est LA première intégration/fonctionnalité à livrer (GSC seul ? SEO
   autonome seul ? autre ?) plutôt que le catalogue complet des ~10 options du §4.
2. Des **références UX concrètes** (captures d'un dashboard existant qui plaît, comme Relume l'a été
   pour le builder) si Simon veut un niveau de précision comparable à doc06.
3. Un arbitrage **modèle multi-tenant** : v1 mono-client (comme le builder, §2 cadrage doc06) ou
   multi-tenant dès le départ (le dashboard sert plusieurs clients par nature, contrairement au builder
   interne) — ce choix structure toute l'archi (auth, isolation données), donc bloquant réel.

**Action prise ici** : aucune, volontairement — ce constat remplace un cadrage prématuré. Prochaine
étape si Simon veut avancer : répondre aux 3 points ci-dessus (peut être aussi léger qu'un message),
puis un cadrage détaillé (façon doc06) devient possible sans inventer à sa place.

## Historique

- 2026-07-12 : création (directive Simon, verbatim condensé, session home E gate B).
- 2026-07-21 : addendum gate-levé + constat honnête (voir ci-dessus).
