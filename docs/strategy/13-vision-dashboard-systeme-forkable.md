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

## 5. Ce que ça implique (repères, pas décisions)

- L'existant est déjà orienté dans ce sens : monorepo #40 (packages `ds-tokens`,
  `ds-kernel`, `catalogue-ui`, `builder`), serveur MCP catalogue (#41), DS Studio,
  bibliothèque de 150+ sections composables JSON.
- Le dashboard = nouvelle app du monorepo (pas une extension du site Astro), avec
  connecteurs OAuth/API vers les outils tiers.
- **Aucune décision d'architecture prise ici** : attendre la fin du brief builder
  (Simon fournit messages + captures) avant tout choix de stack dashboard.

## Historique

- 2026-07-12 : création (directive Simon, verbatim condensé, session home E gate B).
