# Routine SEO/GEO hebdomadaire : runbook de la session Claude

Ce document est exécuté chaque semaine par une session Claude planifiée, sans Simon. Il est autoportant : suis-le dans l'ordre. Lis aussi `CLAUDE.md` à la racine (règles du repo, garde-fous GF-1 à GF-6) avant de modifier quoi que ce soit.

**Ton rôle : rédacteur en chef SEO/GEO de waimia.com.** Tu tiens un calendrier éditorial, tu fais la recherche en ligne, tu écris, tu révises, tu mesures. La collecte de données t'informe ; elle ne décide pas à ta place, et son absence ne t'arrête pas.

**Ce que la session produit**, chaque semaine : une PR qui contient au moins une création issue du calendrier éditorial et une à deux révisions de pages existantes (section 4) ; le calendrier `docs/seo/calendrier-editorial.json` tenu à jour ; un brouillon de post LinkedIn par création ; une entrée dans `docs/seo/journal.md` ; un compte rendu court à Simon. **Ce qu'elle ne fait jamais** : merger, pousser sur `main`, créer un secret ou un compte, inventer un chiffre, soumettre une URL à un moteur, publier ou envoyer quoi que ce soit à l'extérieur (réseau social, e-mail, formulaire).

**Deux usages du web, à ne pas confondre.**

- **Les mesures** (Search Console, indexation, flux, concurrents) viennent de la collecte par API, commitée dans le repo sous `docs/seo/data/`. Tu n'ouvres ni Search Console, ni Bing Webmaster Tools, ni aucune console dans un navigateur.
- **La recherche en ligne fait partie du travail.** Avant d'écrire, tu cherches la requête et tu lis réellement les pages qui se classent, celles des concurrents et les sources primaires, avec les outils de recherche et de lecture web de la session (section 5.1). Une page écrite sans cette lecture n'est pas livrable.
- Le navigateur de Simon ne sert qu'à Brave Search, qui n'a pas d'API, et seulement dans la tâche planifiée dédiée (section 12), pas dans cette session.

## Qui fait quoi, et quand

| Quoi | Quand | Par quoi |
| --- | --- | --- |
| Collecte des données : Search Console, inspection d'indexation, flux, concurrents | Dimanche 19:17 UTC ; rattrapage le lundi 03:17 UTC si la collecte du dimanche manque ou est incomplète | Workflow GitHub Actions `seo-routine.yml` (API) |
| Soumission à Google (sitemap, Indexing API) et à Bing et partenaires (IndexNow) | Dans la collecte | Le même workflow (API) |
| File Brave de la collecte (`latest.json > brave.toSubmit`) | Dans la collecte | Le même workflow (`brave-queue.mjs`, ne soumet rien) |
| Recherche en ligne, création et révisions du calendrier, PR, calendrier, brouillon LinkedIn, journal, compte rendu | Lundi matin (7 h 42 à Paris) | Session Claude hebdomadaire (ce runbook, sections 1 à 11). Texte de la tâche : `docs/seo/prompts/routine-hebdo.md` |
| Soumission à Brave Search, file calculée par la tâche elle-même | Lundi matin (8 h 21 à Paris) | Tâche planifiée « Soumission Brave hebdomadaire Waimia », dans le navigateur de Simon, ordinateur allumé (section 12). Texte de la tâche : `docs/seo/prompts/brave.md` |
| Bilan mensuel | Premier lundi du mois | La session hebdomadaire, en plus du reste (section 13) |
| Fusion de la PR, publication du post LinkedIn, « Demander l'indexation » dans Search Console, décisions | Quand Simon le décide | Simon |

## 0. Comment les données arrivent

Le workflow GitHub Actions `.github/workflows/seo-routine.yml` a deux créneaux :

- **dimanche 19:17 UTC**, la collecte principale, pour que les données soient prêtes avant la session du lundi ;
- **lundi 03:17 UTC**, un rattrapage. Il ne refait rien si une collecte complète de moins de 36 heures existe déjà (`generatedAt` et `steps` de `latest.json`, lus par `scripts/seo-routine/freshness.mjs`) : le job se termine sans rien envoyer, donc sans double envoi à l'Indexing API ni à IndexNow. Il ne recollecte que si celle du dimanche n'est pas partie ou a laissé une étape en `erreur`.

Un créneau planifié de GitHub Actions peut partir en retard, ou ne pas partir : le 5 octobre 2026, aucun run `schedule` n'est apparu. C'est la raison du second créneau, et la raison pour laquelle ni la rédaction (section 10) ni la file Brave (section 12) ne dépendent plus de la collecte.

**Numéro de semaine.** Le résumé porte la semaine ISO du jour de la collecte (`week`, et le dossier `docs/seo/data/AAAA-Www/`). La collecte du dimanche soir porte donc le numéro de la semaine qui se termine, alors que ta session du lundi porte celui de la semaine qui commence : en 2026-W42, tu lis normalement `week: 2026-W41`. Ne compare jamais les deux numéros : la fraîcheur se juge par `generatedAt` (section 2). Un rattrapage du lundi porte, lui, le numéro de ta semaine.

Le workflow lance `scripts/seo-routine/run.mjs` et commite le résultat sur `main`, sous `docs/seo/data/` :

| Fichier | Contenu |
| --- | --- |
| `docs/seo/data/latest.json` | Résumé de la dernière collecte. C'est le fichier à lire en premier. |
| `docs/seo/data/AAAA-Www/summary.json` | Le même résumé, archivé par semaine ISO. |
| `docs/seo/data/AAAA-Www/gsc-performance.json` | Search Console, lignes complètes par requête, par page, par page et requête, sur 4 périodes. |
| `docs/seo/data/AAAA-Www/gsc-index.json` | Résultat de l'inspection de chaque URL du sitemap. |
| `docs/seo/data/AAAA-Www/gsc-sitemap.json` | État du sitemap dans Search Console après resoumission. |
| `docs/seo/data/AAAA-Www/indexnow.json` | URL envoyées à IndexNow. |
| `docs/seo/data/AAAA-Www/indexing-api.json` | URL notifiées à Google par l'Indexing API, reports et erreurs. |
| `docs/seo/data/AAAA-Www/brave-queue.json` | File Brave vue par la collecte (URL nouvelles ou modifiées depuis la collecte précédente), sans soumission. |
| `docs/seo/data/AAAA-Www/feeds.json` | Entrées des flux des 8 derniers jours, résumés complets. |
| `docs/seo/data/AAAA-Www/competitors.json` | URL nouvelles et retirées chez les concurrents. |
| `docs/seo/data/state/*.json` | État technique d'une semaine sur l'autre. Ne pas modifier. |

Ce que l'automatisation fait déjà pour l'indexation, et ses limites :

À chaque collecte, le workflow :

1. resoumet le sitemap à Google et inspecte l'état d'indexation de chaque URL (API Search Console). C'est le socle, avec le maillage interne ;
2. prévient Bing et les moteurs partenaires par IndexNow pour chaque URL nouvelle ou modifiée ;
3. notifie Google par l'Indexing API (`urlNotifications.publish`, type `URL_UPDATED`) pour chaque URL du sitemap nouvelle ou dont le `lastmod` a changé depuis sa dernière soumission, les pages non indexées en premier, 200 par jour au plus. Une URL inchangée n'est jamais resoumise.

Brave Search n'a aucune API : la soumission passe par une tâche à part, qui calcule sa file elle-même depuis le sitemap de production et y ajoute celle de la collecte quand elle existe (section 12).

Ce qu'il faut savoir sur le point 3, sans l'enjoliver :

> La documentation de Google réserve l'Indexing API aux pages d'offres d'emploi et de diffusion en direct : « The Indexing API can only be used to crawl pages with either `JobPosting` or `BroadcastEvent` embedded in a `VideoObject`. » (<https://developers.google.com/search/apis/indexing-api/v3/quickstart>, lu le 4 octobre 2026). Simon l'utilise déjà sur virtuoseweb.fr et a choisi de la réutiliser ici. Google peut ignorer ces notifications pour des pages ordinaires et ne garantit rien : une réponse 200 veut seulement dire que Google « may try to recrawl this URL soon ».

Conséquences pour toi :

- **Tu n'as rien à soumettre toi-même**, à aucun moteur. Après la fusion d'une PR de contenu et le déploiement, les pages créées ou modifiées partent à la collecte suivante, par IndexNow et par l'Indexing API, et la tâche Brave du lundi suivant les trouve dans le sitemap. Ne lance ni `indexing-api.mjs`, ni `indexnow.mjs`, ne relance pas le workflow, n'ouvre pas le formulaire de Brave. (`brave-queue.mjs --from-sitemap` ne soumet rien et n'écrit rien : tu peux le lancer pour reporter la file dans ton compte rendu.)
- Une page modifiée n'est repérée, par la collecte comme par la tâche Brave, que si son `lastmod` change dans le sitemap, donc si `updatedAt` a été mis à jour dans son fichier de contenu (section 5.5). C'est une raison de plus de le faire à chaque révision de fond, et seulement dans ce cas.
- Une notification acceptée ne prouve pas l'indexation. La seule mesure reste `indexation` dans `latest.json` (inspection d'URL). N'écris jamais « indexée » parce qu'une URL figure dans `indexingApi.submittedPaths`.
- Une page non indexée se traite toujours par la section 4.1, règle 3 (enrichir, mailler, fusionner ou rediriger, ou corriger un bug), pas par une nouvelle soumission.
- Le bouton « Demander l'indexation » de Search Console reste un geste manuel de Simon : si une page précise le mérite, dis-le dans le compte rendu.

## 1. Préparer la session

```bash
git fetch origin main
git switch -c feat/seo-AAAA-Www origin/main   # semaine ISO du jour, ex. feat/seo-2026-W41
npx -y pnpm@9.15.0 install --frozen-lockfile
```

`AAAA-Www` est la semaine ISO **du jour de la session**, pas celle de `latest.json` (section 0).

Si la branche `feat/seo-AAAA-Www` existe déjà sur le dépôt distant, une session a déjà tourné cette semaine : reprends-la au lieu d'en créer une autre, et n'ouvre pas de seconde PR.

Regarde aussi si la PR de la semaine précédente est encore ouverte (`gh api "repos/virtuoseweb/waimia-web/pulls?state=open&per_page=30"`). Si oui, ses entrées du calendrier sont toujours « planifié » sur `main`, avec une semaine passée : ne les refais pas et ne les replanifie pas, dis-le en tête du compte rendu, et livre les entrées de ta semaine. Les deux PR toucheront le calendrier et le journal : préviens Simon que la seconde demandera une mise à jour après la fusion de la première.

## 2. Lire

1. `docs/seo/data/latest.json` en entier.
2. `docs/seo/journal.md` : les quatre dernières entrées au moins.
3. `docs/seo/calendrier-editorial.json` : les entrées de ta semaine, celles en retard, celles à juger (section 4.5).
4. `docs/seo/keywords.json` : mots-clés suivis, page cible, grappe, priorité.
5. Au besoin, les fichiers détaillés de la dernière collecte (voir le tableau ci-dessus).

Contrôles avant d'aller plus loin :

- **Fraîcheur** : `node scripts/seo-routine/freshness.mjs` doit répondre `FRAÎCHE`. La règle : `latest.json > generatedAt` date de moins de 48 heures et aucune étape n'est en `erreur` ni `ignoré`. Le numéro `week` ne compte pas (section 0). Si la réponse est `PAS FRAÎCHE`, voir la section 10 : tu le signales, et tu produis quand même le contenu prévu.
- `latest.json > steps` : chaque étape vaut `ok`, `erreur` ou `non configuré`. Note les étapes qui ne sont pas `ok` : elles vont dans le compte rendu.
- `latest.json > gscConfigured` : si `false`, voir la section 10.

Repères de lecture de `latest.json` :

| Clé | Ce qu'elle dit |
| --- | --- |
| `performance.kpi.last7` et `.last28` | Clics, impressions, CTR, position, avec `previous`, `delta` et `pct`. Pour la position, un `delta` négatif est un gain. Les données s'arrêtent trois jours avant la collecte. |
| `performance.strikingDistance` | Couples requête et page en position 8 à 20 sur 28 jours, triés par impressions. |
| `performance.lowCtrPages` | Pages à fortes impressions dont le CTR est sous la moitié du CTR attendu à cette position (`expectedCtr` est un repère heuristique, pas une mesure). |
| `performance.pageMovers`, `queryMovers` | Plus fortes hausses et baisses d'impressions, 28 jours contre les 28 précédents. |
| `keywords.rows` | Pour chaque mot-clé suivi : `position`, `previousPosition`, `positionDelta`, `rankedPage`, `onTarget` (la page classée est la page cible), `cannibalisation` (plusieurs pages classées sur la requête). `visible: false` = aucune impression sur 28 jours. |
| `keywords.withoutTarget` | Requêtes suivies sans page cible : candidates à une création. |
| `keywords.targetsMissingFromSitemap` | Pages cibles absentes du sitemap de production : anomalie à signaler. |
| `indexation.notIndexed` | Pages non indexées, avec `coverageState` (motif donné par Google), `notIndexedSince` et `weeksNotIndexed`. |
| `indexation.changes` | `newlyIndexed`, `newlyNotIndexed`, `firstSeen` par rapport à la collecte précédente. |
| `indexation.canonicalMismatches` | Pages dont Google a retenu une autre canonique que celle déclarée. |
| `indexingApi` | Notifications envoyées à Google : `status` (`soumis`, `soumis en partie`, `rien à soumettre`, `quota atteint`, `interrompu`, `simulation`), `submitted` (nombre), `submittedPaths`, `added`, `modified`, `prioritizedNotIndexed`, `deferred` (reportées à la collecte suivante), `errors` et `firstError`, `quota`. `null` si l'étape est `non configuré` ou en `erreur`. |
| `brave` | File Brave vue par la collecte : `toSubmit` (URL complètes, nouvelles ou dont le `lastmod` a changé depuis la collecte précédente), `count`, `note`. La tâche Brave l'ajoute à la file qu'elle calcule elle-même (section 12). `null` si l'étape `brave-queue` est en `erreur`, absente d'une collecte antérieure à cette étape. |
| `feeds.entries` | Titre, lien, date, source, thème, résumé court. `feeds.feedsInError` liste les flux tombés. |
| `competitors.rows[].newUrls` | URL nouvelles chez chaque concurrent, avec `title`, `h1` et `description` relevés. |

## 3. Évaluer les actions des semaines précédentes

Pour chaque action du journal dont la ligne « À mesurer » n'a pas encore de verdict :

1. Retrouve la page dans `gsc-performance.json` de la semaine (`periods.last28.byPage`, `periods.previous28.byPage`) et dans `indexation`.
2. Réponds par des chiffres à trois questions : la page a-t-elle gagné des impressions ? La requête visée a-t-elle gagné des positions (`keywords.rows` ou `byPageQuery`) ? La page est-elle indexée, et depuis quand ?
3. Écris le verdict dans l'entrée de la semaine en cours, section « Bilan des actions précédentes » : `gagné`, `stable`, `perdu` ou `trop tôt`, avec les deux chiffres comparés.

Règles de lecture :

- Une modification de contenu ne se juge pas avant deux collectes complètes après la mise en production (Google doit réexplorer, et les données ont trois jours de retard). Avant, le verdict est `trop tôt`.
- Sous 30 impressions sur 28 jours, une variation de position n'est pas un signal : écris `trop tôt`, pas `gagné`.
- Une action `perdu` deux semaines de suite se corrige ou s'annule en priorité, avant toute nouvelle action.
- Ne conclus jamais à un effet sans la mesure correspondante. « Probablement », « sans doute » : à bannir du journal.

Chaque verdict se reporte dans le calendrier : l'entrée correspondante passe à « mesuré », avec le verdict et les deux chiffres dans `resultat` (section 4.5).

Le premier lundi du mois, ajoute le bilan mensuel (section 13).

## 4. Décider : le travail de la semaine

**Cadence.** Chaque semaine, la PR contient :

- **au moins une création** issue du calendrier éditorial (4.2), deux au plus ;
- **une à deux révisions** de pages existantes (4.1), trois au plus.

Le plafond (2 créations et 3 révisions) protège la qualité : chaque contenu passe toute la section 5, recherche en ligne comprise. Mieux vaut une création et une révision solides que cinq contenus moyens. Ne rien créer est l'exception, à justifier par écrit (4.4).

**Ordre de travail.** D'abord ce que le calendrier prévoit pour la semaine (`semainePrevue` = ta semaine, statut « planifié »), puis les entrées en retard. Avant d'écrire, confronte chaque entrée aux données de la semaine : une règle de 4.1 plus urgente (page qui perd, contenu rendu faux par une actualité) prend la place d'une révision planifiée, qui se replanifie. Une création planifiée ne se remplace que par une autre création.

### 4.1 Réviser une page existante quand

Les révisions de la semaine sont celles du calendrier, sauf si l'une de ces règles désigne une page plus urgente. Chaque règle qui se déclenche sans pouvoir être traitée cette semaine devient une entrée du calendrier (4.5).

1. **Position 8 à 20** : la page apparaît dans `performance.strikingDistance` pour une requête suivie ou proche de l'offre. Priorité aux requêtes de priorité 1 dans `keywords.json`, puis au plus grand nombre d'impressions.
2. **CTR faible** : la page est dans `performance.lowCtrPages`. Le travail porte sur le title et la meta description (promesse concrète, requête en tête), pas sur le corps.
3. **Non indexée depuis plus de trois collectes** : `weeksNotIndexed` supérieur à 3 (une collecte par semaine). Une page « détectée » ou « explorée, actuellement non indexée » au-delà de ce délai **appelle une décision**, écrite dans le journal : enrichir, mailler, fusionner ou rediriger. La laisser en l'état sans le dire n'est pas une option ; si tu ne peux pas la traiter cette semaine (plafond atteint), inscris-la au calendrier avec sa semaine et dans « Pour Simon » avec la décision proposée. Lis d'abord `coverageState` :
   - « Détectée, actuellement non indexée » : Google connaît l'URL et ne l'a pas explorée. **Mailler** : renforce les liens internes vers la page (registre `src/lib/internal-mesh.ts`) et vérifie qu'elle n'est pas un doublon d'une autre.
   - « Explorée, actuellement non indexée » : Google a lu la page et ne l'a pas retenue. C'est un problème de contenu. **Enrichir** : la page doit apporter ce que les autres n'ont pas (section 5). Sinon **fusionner ou rediriger** (4.3).
   - « Google ne reconnaît pas cette URL » : Google ne l'a pas encore vue. Vérifie qu'elle est dans le sitemap et reçoit des liens internes ; au-delà de trois collectes, traite-la comme « détectée ».
   - Motif technique (noindex, robots.txt, redirection, 404, canonique différente) : c'est un bug. Corrige-le ou signale-le, ce n'est pas une révision éditoriale.
4. **Contenu daté par une actualité** : une entrée de `feeds.entries` rend une page fausse ou incomplète (changement de prix d'un outil, nouvelle version, nouvelle obligation, date d'application d'un texte). Lis la source primaire avant de corriger. Cette règle passe devant toute révision planifiée : une page fausse se corrige la semaine même.
5. **Mauvaise page classée** : `onTarget: false` ou `cannibalisation` non nul sur un mot-clé suivi. Clarifie laquelle des deux pages répond à la requête (title, H1, lien interne de l'une vers l'autre), ou fusionne.

Une révision passe la même recherche en ligne qu'une création (5.1) : on ne sait pas ce qui manque à une page sans lire celles qui se classent devant elle.

### 4.2 Créer : l'entrée du calendrier

La création de la semaine est l'entrée du calendrier dont `semainePrevue` est ta semaine. Le calendrier ne t'engage pas sur l'angle : celui qu'il porte est une hypothèse, que ta recherche en ligne (5.1) confirme, corrige ou invalide.

- **L'angle tient** : écris la page.
- **La recherche montre autre chose** (la requête appelle un autre type de contenu, une page existante peut la porter par une révision) : change le type ou transforme l'entrée en révision, écris pourquoi dans `angle`, et avance la création suivante du calendrier pour tenir la cadence.
- **Il n'y a pas de place** (rien à apporter que les premiers résultats n'ont pas, sujet hors positionnement) : passe l'entrée à « abandonné » avec la raison dans `resultat`, et avance la création suivante.

Une page se nomme comme sa requête (URL, title et H1 alignés) : c'est ce qui fait gagner les concurrents réels (kayro.ai, sparkyflow.com).

**Ce qui ne se crée pas sans Simon.** Une page service, une page de formation ou une page locale qui suppose une offre, un prix ou une présence que le site n'affiche pas déjà. L'entrée reste une « idée », et la question va dans « Ce qui demande ta décision » (section 11). Les guides, articles, comparatifs et cas d'usage ne posent pas ce problème tant qu'ils ne promettent rien de neuf.

Après création : ajoute la page au registre `src/lib/internal-mesh.ts` et donne à son JSON le `category` égal au premier thème de la page dans ce registre (section 5.6, silos), renseigne ou corrige `target` du mot-clé dans `docs/seo/keywords.json` (puis `node scripts/seo-routine/check-config.mjs`), et écris le brouillon LinkedIn (5.7).

### 4.3 Fusionner ou rediriger quand

- Deux pages visent la même requête et se partagent les impressions (`cannibalisation`) : garde celle qui a le plus d'impressions et de liens, reprends le meilleur de l'autre, redirige l'autre.
- Une page est non indexée depuis plus de 8 semaines malgré une révision, et son sujet est couvert ailleurs.
- Une redirection suit la mécanique du repo : le fichier de contenu est conservé, la page est dépubliée dans `src/data/depublished.ts` et l'ancienne URL est redirigée en 301 dans le bloc `redirects` d'`astro.config.mjs`. Un seul saut, cible en 200, contrôlé par `node scripts/check-redirects.mjs`. Une suppression ou une redirection de page se propose dans la PR avec sa justification chiffrée ; c'est Simon qui tranche en mergeant.

Une fusion compte comme une révision dans la cadence, et s'inscrit au calendrier avec le type « fusion ».

### 4.4 Ne rien créer : l'exception

Une semaine sans création n'est acceptable que dans l'un de ces cas :

- une action précédente est `perdu` deux semaines de suite et sa correction occupe la session (section 3) ;
- `main` ne build pas, ou un gate de la section 7 échoue sur `main` avant toute modification : aucune page ne peut être vérifiée. Signale-le en tête du compte rendu ;
- les outils de recherche et de lecture web de la session ne répondent pas : sans lecture des résultats, aucune création n'est livrable (5.1) ;
- les créations planifiées de la semaine et de la suivante ont toutes été invalidées par la recherche en ligne, et aucune idée du calendrier n'est prête ;
- Simon a demandé une pause.

« Les données manquent », « les actions précédentes sont encore trop récentes pour être jugées » ou « 15 pages viennent d'être publiées » ne sont pas des raisons : la création ne dépend ni de la collecte (section 10) ni du verdict des semaines passées.

Dans ces cas : les révisions restent dues si elles sont possibles, le calendrier est replanifié, et le journal dit laquelle de ces raisons s'applique, avec le fait qui la prouve. Le compte rendu le dit en première ligne du bloc « État du calendrier ».

### 4.5 Tenir le calendrier

`docs/seo/calendrier-editorial.json` est la planification des contenus. Une entrée par contenu : `id`, `type` (article, guide, comparatif, page service, cas d'usage, page locale, révision, fusion), `titreProvisoire`, `requeteCible`, `intention`, `urlCible` (existante ou à créer), `angle` (ce que la page apportera que les premiers résultats n'ont pas), `sourcesALire`, `semainePrevue` (AAAA-Www, `null` permis pour une idée), `statut`, `pr`, `mesureAttendue`, `resultat`, `origine` (la donnée qui justifie l'entrée).

Statuts, dans l'ordre de la vie d'une entrée :

| Statut | Sens | Qui le pose |
| --- | --- | --- |
| `idée` | Sujet repéré, pas encore daté ou en attente d'une décision de Simon. | Toi, en ajoutant l'entrée. |
| `planifié` | Daté : `semainePrevue` renseignée. | Toi. |
| `en cours` | La session y travaille, ou la PR n'est pas encore ouverte. | Toi, pendant la session. |
| `publié` | Livré dans une PR : `pr` porte son numéro. Le statut n'arrive sur `main` qu'à la fusion, donc `main` ne ment pas. | Toi, après l'ouverture de la PR (section 8). |
| `mesuré` | Jugé après au moins deux collectes complètes en production : `resultat` porte le verdict (`gagné`, `stable`, `perdu`) et les deux chiffres comparés. | Toi, à la section 3. |
| `abandonné` | Écarté : `resultat` dit pourquoi. | Toi, ou Simon. |

Chaque semaine, dans cet ordre :

1. **Livré** : les entrées de la PR passent à « publié » avec le numéro de PR.
2. **Jugé** : les entrées « publié » depuis au moins deux collectes complètes passent à « mesuré », avec le résultat (section 3). Avant ce délai, elles restent « publié ».
3. **Ajouté** : les idées nées de la semaine, chacune avec son `origine` :
   - une requête de `performance.strikingDistance` (position 8 à 20) ou de `performance.topQueries` qu'aucune page ne porte vraiment ;
   - un sujet qui revient dans au moins trois entrées de flux de sources différentes sur deux semaines, lié à une prestation de Waimia, et dont une PME peut tirer une décision ;
   - une page nouvelle chez un concurrent (`competitors.rows[].newUrls`) sur une requête suivie, lue pendant la session ;
   - une requête de `keywords.withoutTarget`, ou une requête suivie dont la page cible porte plusieurs intentions ;
   - une question qui revient dans les résultats lus pendant la recherche en ligne.
4. **Replanifié** : il doit rester **au moins 6 semaines d'avance**, chacune avec une création planifiée. `node scripts/seo-routine/check-calendar.mjs` le mesure et avertit en dessous. Les entrées en retard (semaine passée, encore « planifié ») se livrent, se replanifient ou s'abandonnent : aucune ne reste en l'état.
5. **Vérifié** : `node scripts/seo-routine/check-calendar.mjs` passe (schéma, statuts, semaines, `urlCible` unique parmi les entrées actives, pages des révisions existantes). Ses avertissements se lisent : chacun se corrige ou se justifie dans le journal.

Règles de tenue :

- Une entrée ne se supprime jamais : elle finit « mesuré » ou « abandonné ». C'est l'historique de ce qui a marché.
- `origine` cite une donnée du repo ou une page lue, avec sa date. Pas d'entrée « parce que le sujet est intéressant ».
- Aucun volume de recherche, aucun chiffre qui ne vient pas de `docs/seo/data/` ou de `keywords.json`.
- `mesureAttendue` suit la règle de la ligne « À mesurer » du journal (section 9) : vérifiable sans interprétation.
- Une même page ne porte qu'une entrée active à la fois.

## 5. Exigences de contenu

Chaque création ou révision passe toutes ces exigences, dans cet ordre. Si l'une ne peut pas être tenue, change d'entrée (4.2).

### 5.1 Recherche en ligne, avant d'écrire

Obligatoire pour chaque contenu, création ou révision, avec les outils de recherche et de lecture web de la session (WebSearch et WebFetch, ou leurs équivalents). Si ces outils ne répondent pas, dis-le dans le journal et le compte rendu, ne livre aucune création cette semaine-là (la révision reste possible si elle ne tient qu'à une source primaire que tu as pu lire), et n'écris jamais « d'après les résultats de recherche » sans les avoir lus.

1. **Chercher** la requête cible et deux ou trois variantes (singulier ou pluriel, question, « prix », « avis », « vs »), en français.
2. **Lire réellement** les premiers résultats : ouvre au moins les cinq premières pages de la requête cible, pas seulement leurs titres ou leurs extraits.
3. **Lire les concurrents** de `docs/seo/competitors.json` sur le sujet : leurs pages qui visent la requête, et leurs nouvelles pages de la semaine (`competitors.rows[].newUrls`).
4. **Relever**, par écrit : ce que ces pages couvrent toutes ; ce qui manque ; les questions qui reviennent (titres, FAQ, « autres questions posées ») ; le type de contenu que la requête appelle (tableau de prix, comparatif, procédure, définition) ; ce qui est faux ou périmé chez elles.
5. **Noter** chaque URL lue avec la date du jour. Cette liste va dans le corps de la PR et dans le journal. Elle met aussi à jour `sourcesALire` et `angle` de l'entrée du calendrier.

L'angle se décide après cette lecture, pas avant. Si rien ne manque aux premiers résultats et que tu n'as rien à leur ajouter, la page ne s'écrit pas (4.2).

### 5.2 Apporter ce que les premiers résultats n'ont pas

La page doit contenir au moins un de ces éléments, absent des pages lues :

- un retour d'expérience de mise en œuvre (ce qui casse, ce qui prend du temps, l'ordre des étapes), tiré de ce que le repo documente déjà ou des cas clients réels ;
- un exemple chiffré, étiqueté « exemple illustratif » dans le texte ;
- une procédure pas à pas qu'on peut suivre sans appeler personne ;
- une comparaison avec des critères explicites et un verdict par cas d'usage ;
- une prise de position argumentée, y compris « ne le faites pas si ».

**Pas de résumé d'actualité.** Une actualité n'entre dans une page qu'avec son analyse pour une PME de 10 à 250 personnes : ce que ça change, pour qui, quoi faire lundi, quoi ne pas faire.

**Profondeur proportionnée à la requête.** Une requête de prix veut un tableau et trois paragraphes, pas un essai. Une requête « X vs Y » veut des critères et un verdict. Aucune section de remplissage.

### 5.3 Sources et faits : rien de mémoire, rien d'inventé

**Sources primaires, lues pendant la session.** Tout fait, prix ou date sur un produit tiers (n8n, Make, Claude, OpenAI, Mistral), un texte de loi ou un organisme vient d'une source primaire lue pendant la session, citée avec son lien et la mention « vérifié le » suivie de la date du jour. Rien ne s'écrit de mémoire, même ce qui te paraît sûr : un prix ou un nom de modèle change entre deux sessions. Un média qui rapporte une annonce n'est pas une source primaire : remonte à l'annonce. Anthropic n'a pas de flux : lis `https://www.anthropic.com/news` et les pages listées dans `docs/seo/feeds.json > noFeed`. Une source que tu n'as pas pu relire garde sa date précédente dans la page, ou le fait sort de la page.

**Rien d'inventé.** Aucun chiffre de résultat, client, témoignage, avis, logo, partenariat ou certification inventé. Cas clients réels uniquement : ceux de `src/content/cases/`. Interdits : « partenaire Anthropic », « Claude certified », « certifié », « ISO 27001 », « n°1 », « leader ». Autorisé : « Activateur France Num ». Formation : « Formations dispensées via Akigora, organisme certifié Qualiopi » ; financement : « prise en charge possible selon votre situation » ; ni « CPF » ni « éligible ».

**Prix.** Uniquement ceux de `src/data/pricing.ts`, la source unique du site, pour une prestation équivalente ; sinon « sur devis après audit gratuit ». Tu ne modifies jamais ce fichier.

**Positionnement.** Waimia est un studio de développement IA et un cabinet d'automatisation des processus pour PME et ETI. Une page qui tire le site vers un autre métier (agence web généraliste, no-code, publicité) ne s'écrit pas : l'entrée s'abandonne avec cette raison.

### 5.4 GEO : écrire pour être cité par les moteurs IA

Un moteur IA cite un passage qui se comprend seul, qui nomme ce dont il parle et qui porte sa source. Pour chaque page :

- **Réponse directe en tête** : les deux ou trois premières phrases répondent à la requête, sans préambule, et restent vraies sorties de leur contexte.
- **Définitions nettes** : chaque notion clé a une phrase de la forme « X est… », autonome, sans pronom qui renvoie plus haut.
- **Tableaux et listes quand la requête compare** ou énumère (prix, « X vs Y », étapes, critères) : une ligne par option, une colonne par critère, les unités dans les cellules.
- **FAQ tirée des questions réelles** : requêtes de `gsc-performance.json` (`byQuery`) formulées en question, questions relevées en 5.1. Chaque réponse tient seule en deux à quatre phrases. Pas de question inventée pour placer un mot-clé.
- **Entités nommées sans ambiguïté** : le nom complet du produit, son éditeur, la version et la date quand elles comptent (« Claude Sonnet 5.5, d'Anthropic, sorti le… », pas « le dernier modèle ») ; « Waimia » et « Simon Beros » en toutes lettres là où la page parle d'eux.
- **Sources citées** dans le texte, avec le lien et la date de vérification (5.3) : c'est ce qui rend un passage citable.
- **Données structurées** : elles sont produites par les gabarits à partir du contenu JSON (FAQ, fil d'Ariane, article, `dateModified`). N'écris aucun JSON-LD à la main ; remplis les champs du contenu, puis vérifie avec `node scripts/check-jsonld.mjs`.
- **`llms.txt`** : il est généré au build par `src/integrations/llms-md-pages.ts`, jamais à la main. Toute page publique indexable y entre seule, rangée par silo d'après son chemin, avec une version `.md` ; sa ligne reprend le **title et la meta description** de la page, qui sont donc ce que lit un moteur IA en premier. L'en-tête (offre, parcours, prix) vient de `src/lib/seo/llms-summary.ts`, dérivé des sources uniques. Après le build, vérifie que la page neuve figure dans `dist/client/llms.txt`, dans le bon silo, avec une ligne qui dit ce qu'elle apporte. Si elle tombe dans « Autres pages », ou si elle rend fausse la note d'un silo (une nouvelle ville, par exemple), ne modifie pas l'intégration : signale-le à Simon.

### 5.5 Structure, ton et forme

- Title et H1 alignés sur la requête visée ; meta description de 160 caractères au plus, qui dit ce que la page apporte.
- Date de mise à jour : champ `updatedAt` du fichier de contenu à la date du jour à chaque révision de fond (il alimente le `lastmod` du sitemap, le JSON-LD et la ligne « Mis à jour le »). Ne change pas `updatedAt` pour une retouche qui ne modifie pas le fond.
- Ton direct, concret, phrases courtes. Pas de superlatifs, pas de « révolutionner », « booster », « libérer le potentiel ». Pas de tiret cadratin (gate `check:no-emdash`).

### 5.6 Règles du repo

- Le contenu vit en JSON sous `src/content/` (aucun fichier `.mdx`). Regarde une page voisine de la même collection avant d'écrire.
- Les pages se composent avec les sections du catalogue (`src/sections/<type>/`). Aucun markup neuf dans une page ou un gabarit, aucun nouveau token ni nouvelle variable du design system. Si une section manque vraiment, ne la crée pas dans cette routine : signale-le à Simon.
- Maillage interne : déclare ou mets à jour la page dans `src/lib/internal-mesh.ts`. Pas de liste de liens écrite à la main.
- Silo : tout article, guide ou comparatif porte un `category` obligatoire, clé de `SILOS` (`src/data/taxonomies.ts` : automatisation, agents, claude, applications, commercial, acquisition, donnees, conseil, conformite, formation, studio). C'est le premier thème de la page au registre du maillage : choisis d'abord le silo dont la page relève vraiment, puis place-la en tête de ce thème dans `internal-mesh.ts`. Le silo pilote le libellé du kicker, la question du bandeau d'appel à l'action, l'illustration par défaut et les filtres des hubs. `node scripts/check-silos.mjs` refuse un contenu sans silo, un silo inconnu ou un silo qui contredit le maillage. Ne crée pas de silo dans la routine : un sujet qui n'entre dans aucun silo se signale à Simon.
- Appel à l'action : le bouton de prise de rendez-vous pointe vers `/contact?offer=audit-ia-pme&intent=audit`. Les liens « En savoir plus sur l'audit » pointent vers `/audit-ia-pme`.
- Ne touche ni aux mentions légales ni aux adresses des données structurées.
- Fichiers générés (`src/lib/*.generated.ts`, `src/data/ds-*.json`, `src/data/lastmod.generated.json`) : jamais à la main, toujours par le script du repo.

### 5.7 Dérivé : un brouillon de post LinkedIn par création

Pour chaque création, écris un brouillon de post LinkedIn dans `docs/seo/posts/AAAA-Www.md` (la semaine de la session ; un fichier par semaine, une section `## <titre de la page>` par création).

- **Voix de Simon, première personne** (« j'ai », « je vois chez mes clients »), comme il parlerait à un dirigeant de PME. Pas de « nous », pas de jargon, pas de mot d'agence.
- Une accroche d'une ligne, puis trois à huit paragraphes courts, aérés. Une idée que le lecteur peut appliquer sans cliquer.
- **Rien d'inventé** : aucun chiffre, client, anecdote ou résultat qui ne soit pas dans la page ou dans `src/content/cases/`. Si le post a besoin d'une anecdote que tu n'as pas, laisse un emplacement entre crochets à remplir par Simon (« [exemple vécu à ajouter] ») plutôt que de l'écrire.
- Le lien vers la page en dernière ligne (son URL de production à venir), trois mots-dièse au plus, pas d'émoji en rafale.
- En tête de chaque section : la page concernée, la PR, et la mention « Brouillon : à relire et à publier par Simon ».

**Brouillon seulement.** La routine ne publie jamais rien sur un réseau, n'ouvre pas LinkedIn, n'envoie le texte à personne. Une révision ne demande pas de post, sauf si elle change une conclusion que Simon gagnerait à annoncer : dans ce cas, propose-le dans le compte rendu.

## 6. Relecture par un dirigeant de PME sceptique

Avant la PR, quand l'outil de sous-agent est disponible, lance un sous-agent avec ce rôle et le texte final de chaque page créée ou révisée :

> Tu diriges une PME de 40 personnes. Tu as déjà payé un prestataire IA qui n'a rien livré d'utilisable. Lis cette page comme si tu cherchais une raison de fermer l'onglet. Relève : chaque phrase qui ne t'apprend rien ; chaque affirmation sans preuve ou sans source ; chaque chiffre dont tu ne vois pas l'origine ; ce que tu ne sais toujours pas après lecture (prix, délai, ce que ça demande à tes équipes, ce qui peut rater) ; l'endroit précis où tu aurais arrêté de lire. Termine par : est-ce que cette page t'apprend quelque chose que les trois premiers résultats Google ne disent pas ? Oui ou non, et quoi.

Traite chaque remarque : corrige, ou note dans la PR pourquoi tu ne corriges pas. Si la réponse à la dernière question est non, la page n'est pas prête : retravaille-la ou retire l'action. Si l'outil n'est pas disponible, fais cette relecture toi-même avec la même grille et écris dans la PR qu'aucun sous-agent n'a relu.

## 7. Vérifications avant la PR

Tout doit passer en local avant le push. Colle la dernière ligne de chaque commande dans le corps de la PR. « Ça build » ne suffit pas.

```bash
# Build de production (sans le catalogue interne). Attendu : « Complete! »
WAIMIA_INTERNAL_TOOLS=0 npx -y pnpm@9.15.0 build

# Gates lancés par la CI sur le build de production (job « seo » de .github/workflows/ci.yml)
node scripts/check-head.mjs
node scripts/check-jsonld.mjs
node scripts/check-sitemap.mjs
node scripts/check-redirects.mjs
node scripts/check-public-surface.mjs --prod
node scripts/check-seo.mjs
node scripts/check-static-quality.mjs
node scripts/check-internal-mesh.mjs        # rapport, ne bloque pas
node scripts/check-silos.mjs                # silo de chaque contenu = premier thème au maillage

# Gates de contenu et de catalogue
node scripts/check-no-emdash.mjs
node scripts/check-internal-links.mjs
node scripts/check-content-refs.mjs
node scripts/check-touchpoints.mjs
node scripts/check-section-modules.mjs
node scripts/seo-routine/check-config.mjs   # si keywords.json, feeds.json ou competitors.json a changé
node scripts/seo-routine/check-calendar.mjs # toujours : le calendrier change chaque semaine. Lis aussi ses avertissements.

# Types : 8 erreurs existent déjà sur main (eeat-panel, pricing-tabs-showcase). N'en ajoute aucune.
npx -y pnpm@9.15.0 exec astro check
```

La CI lance aussi un build complet (job « build ») et les tests Playwright (job « e2e »). Si tu as modifié autre chose que du contenu JSON, lance-les aussi : `npx -y pnpm@9.15.0 build` puis la commande du job « e2e » de `.github/workflows/ci.yml`.

Preuve visuelle (GF-1) pour toute page créée ou dont la structure a changé : sers le build (`node scripts/serve-dist.mjs --port 4330 --root dist/client`), puis capture Playwright à 1440 px et 390 px ; vérifie que le H1 est visible, qu'il n'y a ni débordement horizontal ni erreur console.

## 8. Livrer

0. Tu ne soumets aucune URL aux moteurs. Une fois la PR fusionnée par Simon et la production déployée, la collecte suivante envoie les pages créées ou modifiées à IndexNow et à l'Indexing API (section 0), et la tâche Brave du lundi suivant les prend dans le sitemap (section 12).
1. Restaure le board régénéré par le hook de commit : `git checkout docs/state/00-BOARD.md` avant chaque commit. Ne le commite jamais.
2. Ajoute les fichiers un par un (`git add <chemin>`), jamais `git add -A`.
3. Dans la même branche : le journal `docs/seo/journal.md` (section 9), le calendrier `docs/seo/calendrier-editorial.json` (section 4.5) et le brouillon `docs/seo/posts/AAAA-Www.md` (section 5.7).
4. Commits en français. Push :
   `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin feat/seo-AAAA-Www`
5. Une seule PR par semaine, vers `main` :
   `gh api -X POST repos/virtuoseweb/waimia-web/pulls -f title="SEO AAAA-Www : <actions>" -f head=feat/seo-AAAA-Www -f base=main -f body=...`
   (`gh pr create` peut renvoyer 403 dans cet environnement.)
6. Corps de la PR : l'entrée du calendrier et la donnée qui motivent chaque action, ce qui a changé page par page, la recherche en ligne (requêtes cherchées, pages lues avec lien et date, ce qui manquait), les sources primaires lues avec lien et date, le retour du relecteur sceptique et ce que tu en as fait, la sortie des vérifications de la section 7, le lien vers le brouillon LinkedIn, ce qui n'a pas été vérifié.
7. Une fois la PR ouverte, son numéro est connu : écris-le dans le champ `pr` des entrées livrées, passe-les à « publié », relance `node scripts/seo-routine/check-calendar.mjs`, commite et pousse sur la même branche.
8. Attends la CI et corrige jusqu'au vert. Ne merge pas, ne pousse rien sur `main`, n'active pas l'auto-merge.

Si, par exception, la semaine ne contient aucune création (section 4.4), la PR porte quand même les révisions, le calendrier replanifié et l'entrée de journal qui dit pourquoi.

## 9. Tenir le journal

Ajoute une entrée en haut de `docs/seo/journal.md`, en suivant le modèle qui s'y trouve. Une entrée par semaine, même sans action. Elle contient : les KPI de la semaine, le bilan chiffré des actions précédentes, ce qui a été fait et pourquoi (l'entrée du calendrier, la règle de la section 4 et la donnée), la recherche en ligne de chaque contenu (requêtes cherchées, pages lues avec la date), pour chaque action ce qu'il faudra mesurer, sur quelle page, quelle requête, à partir de quelle semaine, l'état du calendrier (livré, prévu la semaine suivante, entrées ajoutées ou abandonnées et pourquoi, semaines d'avance), le lien vers le brouillon LinkedIn, la file Brave (section 11) et, le premier lundi du mois, le bilan mensuel (section 13). Si aucune création n'a été livrée, l'entrée dit laquelle des raisons de la section 4.4 s'applique.

La ligne « À mesurer » doit être vérifiable par la session suivante sans interprétation. Exemple : « `/services/automatisation-n8n`, requête "agence n8n" : position 11,4 et 120 impressions sur 28 jours au 5 octobre. Attendu : position sous 10. À juger à partir de 2026-W43. »

## 10. Si les données manquent

**La production de contenu ne dépend pas de la collecte.** Quelle que soit la panne décrite ci-dessous, tu livres la création et les révisions prévues au calendrier. Ce qui change : les décisions qui demandent une mesure récente attendent, et tu le dis.

**`latest.json` absent ou pas frais** (`freshness.mjs` répond `PAS FRAÎCHE` : plus de 48 heures, ou une étape en `erreur`). La collecte n'a pas tourné ou a échoué. Ne fabrique aucune donnée et ne relance pas le workflow toi-même. Dans l'ordre :

1. Signale la panne en tête du compte rendu et dans le journal, avec la date de `generatedAt` et, si tu peux les lire, les runs du workflow (`gh api "repos/virtuoseweb/waimia-web/actions/workflows/seo-routine.yml/runs?per_page=10"`). Constate, n'explique pas : si aucun run `schedule` n'apparaît, écris cela et rien de plus.
2. Relance en local, en simulation, les étapes qui n'ont pas besoin de secret, sans rien commiter sous `docs/seo/data/` :

   ```bash
   SEO_DATA_DIR=/tmp/seo-data node scripts/seo-routine/run.mjs --dry-run --only=feeds,competitors
   ```

   Tu as alors les flux et les concurrents du jour dans `/tmp/seo-data/`.
3. Produis le contenu prévu au calendrier pour la semaine (création et révisions), avec la recherche en ligne de la section 5.1, qui ne dépend d'aucune collecte.
4. Pour les chiffres, sers-toi de la dernière collecte disponible en donnant sa date à chaque fois. Ne rends aucun verdict sur les actions passées avec des données qui n'ont pas bougé : écris `non mesurable cette semaine`.
5. Ne fais pas passer devant le calendrier une révision dont le seul motif est une mesure périmée (position 8 à 20, CTR faible, page non indexée). Si la révision planifiée de la semaine repose sur une telle mesure, remplace-la par la révision suivante du calendrier dont le motif tient sans mesure (contenu daté par une actualité, requête à faire porter par une page).

**Search Console non configuré (`gscConfigured: false`, étapes `non configuré`).** Aucune mesure de performance ni d'indexation n'existe. Dans ce cas :

- pas de bilan chiffré des actions précédentes : écris `non mesurable` ;
- le calendrier s'applique normalement (création et révisions). Seules les révisions motivées par une mesure (« position 8 à 20 », « CTR faible », page non indexée) sont impossibles, faute de mesure ;
- rappelle en tête du compte rendu que la mise en route de `docs/seo/SETUP.md` reste à faire.

**Une étape en `erreur`.** Recopie le message de `steps.<étape>.error` dans le compte rendu. Les autres sections restent utilisables. Un flux en erreur trois semaines de suite (`feeds.feedsInError`) se retire de `docs/seo/feeds.json` dans la PR, avec la raison, et se remplace si un équivalent existe (vérifie-le avec `node scripts/seo-routine/feeds.mjs --check`).

**Indexing API en `erreur`, `interrompu` ou `quota atteint`.** Rien à faire côté contenu, et rien à resoumettre : les URL non acceptées repartent à la collecte suivante. Recopie `steps.indexing-api.error` ou `indexingApi.firstError` dans le compte rendu. Un 403 « n'est pas propriétaire » ou « n'est pas activée » demande une action de Simon (`docs/seo/SETUP.md`, étapes 1 et 2). Un `quota atteint` vient du plafond de 200 par jour, partagé avec virtuoseweb.fr. Si l'étape est `non configuré`, la mise en route n'est pas faite. Dans tous les cas, le sitemap et l'inspection d'URL continuent de fonctionner.

**Étape `brave-queue` en `erreur`** (`brave` vaut `null`). Le sitemap de production n'a pas pu être lu pendant la collecte. Sans conséquence : la tâche Brave calcule sa file elle-même (section 12). Signale-le seulement.

**IndexNow en « clé non déployée ».** Le fichier `public/<clé>.txt` n'est pas en ligne. Rien à faire côté contenu : signale-le.

## 11. Compte rendu final à Simon

Court, en français, sans jargon inutile. Cinq blocs, dans cet ordre (six le premier lundi du mois : le bilan mensuel de la section 13 se place après le bloc 2) :

1. **KPI** : clics, impressions, CTR, position sur 7 et 28 jours avec la variation ; nombre de pages indexées sur le total ; nombre d'URL notifiées à Google par l'Indexing API (`indexingApi.submitted`), présenté comme des notifications envoyées, pas comme des pages indexées ; date de la collecte lue (`generatedAt`) et verdict de fraîcheur. File Brave : le nombre d'URL que donne `node scripts/seo-routine/brave-queue.mjs --from-sitemap` au moment de la session, présenté comme « à soumettre par la tâche Brave », jamais comme soumis. Si une mesure manque, dis-le au lieu de l'omettre.
2. **Ce qui a bougé** : les deux ou trois faits marquants (une requête qui entre dans les dix premiers, une page désindexée, un concurrent qui publie sur une requête suivie, une annonce qui touche une page), et le verdict des actions précédentes.
3. **Ce que propose la PR** : le lien, la ou les créations et les révisions (une ligne chacune : l'entrée du calendrier, la donnée qui la motive, ce que la recherche en ligne a montré), l'état de la CI, et le lien vers le brouillon LinkedIn (`docs/seo/posts/AAAA-Www.md` dans la PR), que Simon relit et publie lui-même s'il le veut.
4. **État du calendrier** : ce qui a été livré cette semaine ; ce qui est prévu la semaine suivante ; les entrées ajoutées, avec la donnée qui les justifie ; les entrées abandonnées ou replanifiées, et pourquoi ; le nombre de semaines d'avance (`check-calendar.mjs`). Si aucune création n'a été livrée, la raison (section 4.4) vient ici, en première ligne.
5. **Ce qui demande ta décision** : idée du calendrier qui suppose une offre, un prix ou une présence que le site n'affiche pas (section 4.2), fusion ou redirection proposée, page non indexée depuis plus de trois collectes que tu n'as pas pu traiter (4.1, règle 3), changements proposés au bilan mensuel, page à « demander l'indexation » à la main dans Search Console, section du catalogue manquante, flux à remplacer, panne de collecte, PR de la semaine précédente encore ouverte, erreur de l'Indexing API (compte de service non propriétaire, API non activée).

N'écris jamais « validé » ou « terminé » sans la sortie de commande correspondante.

## 12. Brave Search

Brave a son propre index. Ce qui suit a été vérifié le 4 octobre 2026.

**Ce que Brave propose, et ne propose pas.**

- Brave Search n'a ni API d'indexation, ni outil pour webmasters, ni IndexNow. Sa page d'aide officielle (<https://search.brave.com/help/brave-search-crawler>) indique un formulaire de soumission d'une page à la réexploration : <https://search.brave.com/submit-url>, une URL à la fois.
- Vérifié à l'écran le 4 octobre 2026 : le formulaire a un champ « Insert the URL to be re-fetched » et un bouton « Submit » ; la réponse attendue est « Success · Thank you for your submission ». Le bouton reste inactif après un envoi : il faut recharger la page avant l'URL suivante.
- Le robot de Brave ne s'annonce pas sous un user-agent distinct, n'explore pas une page inaccessible à Googlebot et respecte `noindex` (même page d'aide). Il n'y a donc rien à régler dans `robots.txt` pour lui.
- Son index est alimenté en partie par le Web Discovery Project : les utilisateurs du navigateur Brave qui ont choisi d'y participer.
- Le 4 octobre 2026, les 73 URL du sitemap ont été soumises une première fois à Brave, à la main.

Une soumission acceptée ne garantit ni exploration ni indexation, et la routine n'a aucune mesure de l'indexation chez Brave : n'écris jamais qu'une page y est indexée.

**Qui fait quoi.**

| Acteur | Rôle |
| --- | --- |
| Tâche planifiée « Soumission Brave hebdomadaire Waimia » (lundi, 8 h 21 à Paris) | Calcule sa file elle-même, puis la soumet au formulaire par le navigateur de Simon. Elle exige son ordinateur allumé. C'est une décision de Simon : c'est le seul usage de son navigateur dans toute la routine. Texte de la tâche : `docs/seo/prompts/brave.md`. |
| Collecte (`scripts/seo-routine/brave-queue.mjs`, dans `run.mjs`) | Calcule en plus la file des URL nouvelles ou dont le `lastmod` a changé depuis la collecte précédente, et l'écrit dans `latest.json > brave.toSubmit`. Ne soumet rien. La tâche l'ajoute à sa file quand elle existe ; elle n'en a pas besoin. |
| Session hebdomadaire de contenu (ce runbook) | Ne soumet rien, n'ouvre pas le formulaire. Reporte dans son compte rendu la taille de la file du moment (section 11). |

**La file est autonome.** Le 5 octobre 2026, la collecte planifiée n'est pas partie : `latest.json` n'avait pas de clé `brave`, la tâche a répondu « rien à soumettre », alors que 15 pages neuves étaient en ligne. Depuis, la tâche ne dépend plus de la collecte. Sa file est la réunion de deux listes :

1. les URL du sitemap de production (`https://waimia.com/sitemap-0.xml`, atteint par `https://waimia.com/sitemap-index.xml`) dont le `lastmod` date de **moins de 8 jours** ;
2. `brave.toSubmit` de `docs/seo/data/latest.json`, s'il existe.

Elle se calcule sans secret, sans état et sans rien écrire :

```bash
node scripts/seo-routine/brave-queue.mjs --from-sitemap --days=8
```

La sortie donne « À SOUMETTRE MAINTENANT » (40 URL au plus) et « À REPRENDRE » (le reste). Options : `--cap=40` (plafond par exécution), `--offset=40` (lot suivant), `--sitemap=<URL ou fichier>` (autre sitemap, ou sitemap enregistré), `--json`. Ordre de la file : celle de la collecte, puis les pages que la dernière inspection d'indexation ne connaissait pas (`docs/seo/data/state/gsc-index.json`, donc les pages nouvelles), puis les autres, les plus récentes d'abord.

Sans le repo ni le script, la même file se calcule à la main : ouvrir `https://waimia.com/sitemap-0.xml`, garder chaque `<loc>` dont le `<lastmod>` est postérieur ou égal à la date du jour moins 7 jours, les plus récentes d'abord, s'arrêter à 40.

**Pourquoi pas d'état.** Resoumettre à Brave une URL déjà soumise est sans conséquence : le formulaire demande une réexploration, rien de plus. La fenêtre de 8 jours recouvre donc volontairement celle de la semaine précédente, et une semaine manquée se rattrape en élargissant la fenêtre (`--days=15`).

**Plafond de 40 par exécution.** Le 4 octobre 2026, une vérification anti-robot est apparue vers 47 soumissions d'affilée. La tâche s'arrête à 40 et liste le reste « à reprendre ». Comme la tâche n'a pas de mémoire, ce reste ne revient pas tout seul la semaine suivante si son `lastmod` a plus de 8 jours : il se reprend dans une exécution séparée (plus tard dans la journée ou le lendemain, avec `--offset=40`), que Simon lance ou demande.

**Ce que vaut `lastmod`, et ses limites.** Le `lastmod` du sitemap vient de `src/lib/seo/lastmod.mjs` : la plus récente de deux dates, le champ `updatedAt` (sinon `publishedAt`) du fichier de contenu, et la date du dernier commit qui a touché le fichier source de la page, lue dans l'instantané `src/data/lastmod.generated.json`. Une page hub prend la date de son enfant le plus récent. Conséquences :

- la date est au jour près, et c'est celle du contenu, pas celle de la mise en ligne. Une PR fusionnée plus de 7 jours après la date `updatedAt` de ses pages sort de la fenêtre avant d'être en production : ces pages n'arrivent alors que par la file de la collecte (`brave.toSubmit`), ou en élargissant la fenêtre ;
- une page modifiée sans que `updatedAt` change, et sans que l'instantané soit régénéré, ne sort pas ;
- un commit qui touche beaucoup de fichiers de contenu fait sortir toutes leurs pages : le 5 octobre 2026, après la refonte, 84 des 88 URL du sitemap avaient un `lastmod` de moins de 8 jours. Le plafond de 40 et l'ordre de la file (pages nouvelles d'abord) servent à cela ;
- une page pas encore déployée n'est pas dans le sitemap : rien à soumettre avant la mise en production.

**Procédure de soumission (tâche Brave uniquement).**

1. Calculer la file (commande ci-dessus, ou à la main). Y ajouter les URL que Simon a nommées dans sa demande, s'il y en a. Si la file est vide, s'arrêter et le dire.
2. Ouvrir <https://search.brave.com/submit-url> dans le navigateur de Simon. Si le navigateur est injoignable (ordinateur éteint, extension déconnectée), ne rien tenter d'autre : lister les URL qui n'ont pas pu être soumises et s'arrêter.
3. Coller une URL dans le champ « Insert the URL to be re-fetched », cliquer « Submit ». **Une URL à la fois.**
4. Vérifier que la page affiche « Success · Thank you for your submission ». Tout autre résultat (message d'erreur, page inchangée) est un échec : noter l'URL et ce qui s'est affiché, ne pas insister plus de deux fois.
5. **Recharger la page avant l'URL suivante** (le bouton reste inactif sinon), puis reprendre à l'étape 3.
6. **S'arrêter net devant toute vérification humaine** : captcha, case « je ne suis pas un robot », page d'attente, demande de connexion. Ne pas tenter de la résoudre ni de la contourner, ne saisir aucun identifiant. Noter à quelle URL elle est apparue ; tout ce qui suit est « à reprendre ». **Exception, à ne pas confondre** : après chaque clic sur « Submit », le formulaire affiche lui-même « Verifying you're a human being » pendant quelques secondes, puis « Success » (constaté sur 16 soumissions le 5 octobre 2026). C'est son fonctionnement normal, sans aucune action demandée : attendre jusqu'à 30 secondes. Ne s'arrêter que si « Success » n'arrive pas dans ce délai, ou si une épreuve à résoudre apparaît.
7. S'arrêter à 40 soumissions, même si tout se passe bien.
8. Terminer par un compte rendu à Simon : comment la file a été calculée (script ou à la main, date, nombre d'URL trouvées) ; nombre d'URL soumises avec « Success » ; liste des échecs avec le message vu ; liste « à reprendre » (au-delà de 40, ou après une vérification humaine, ou navigateur injoignable).

**Ce que la tâche ne fait jamais.** Appeler l'adresse du formulaire directement (requête HTTP, script, `curl`) : la soumission passe par la page, dans le navigateur, comme le ferait Simon. Soumettre autre chose qu'une URL de `https://waimia.com` présente dans le sitemap de production ou dans la file de la collecte. Modifier le repo. Écrire qu'une page est indexée chez Brave.

**Reste de l'ancien fonctionnement.** `docs/seo/data/state/brave.json` (état de la file de la collecte) est créé à la première collecte qui inclut l'étape `brave-queue` : elle enregistre le sitemap courant comme déjà vu et sort une file vide. Pour remettre tout le sitemap dans la file de la collecte, après une refonte par exemple : `node scripts/seo-routine/run.mjs --brave-all`, à la demande de Simon seulement.

## 13. Bilan mensuel

**Quand.** Le premier lundi de chaque mois, la session ajoute un bilan mensuel au compte rendu (section 11) et à l'entrée de journal de la semaine. Si la session de ce lundi n'a pas tourné, le bilan se fait à la session suivante. Premier bilan : le lundi 2 novembre 2026 (le 5 octobre 2026, une seule collecte existe).

**Référence.** Deux points fixes, à citer tels quels :

- avant la refonte, du 30/06 au 29/09/2026 (92 jours) : 16 clics, 322 impressions ;
- collecte du 4 octobre 2026 (2026-W40) : 38 pages indexées sur 73, 14 « détectée, non indexée », 15 inconnues de Google, 4 « explorée, non indexée », 2 vues en noindex.

La référence d'avant refonte couvre 92 jours et le bilan 28 : donne les deux chiffres avec leur durée, sans les présenter comme des périodes égales.

**Ce que le bilan contient.**

1. L'évolution sur quatre semaines, chiffres de `performance.kpi.last28` (28 derniers jours contre les 28 précédents) et des archives `docs/seo/data/AAAA-Www/summary.json` des quatre dernières collectes :
   - clics, impressions, CTR, position moyenne ;
   - pages indexées sur le total, et répartition par motif (`indexation.byCoverageState`), comparées à la collecte d'il y a quatre semaines et à la référence du 4 octobre 2026 ;
   - position des mots-clés de priorité 1 de `keywords.json` (`keywords.rows`), semaine par semaine, avec ceux qui sont entrés ou sortis des dix et des vingt premiers.
2. Ce qui a marché et ce qui n'a pas marché : les verdicts `gagné`, `stable` et `perdu` des actions du mois (section 3), avec leurs chiffres, et les pages restées non indexées malgré une action.
3. Les changements proposés, faits dans la PR de la semaine avec leur justification chiffrée :
   - `docs/seo/keywords.json` : mots-clés à ajouter (requêtes réelles vues dans `topQueries`), à retirer (aucune impression sur le mois, hors de l'offre), cibles ou priorités à corriger ;
   - `docs/seo/feeds.json` : flux tombés ou sans entrée utile sur le mois, sources à ajouter ;
   - `docs/seo/competitors.json` : concurrents qui ne publient plus ou ne se classent sur aucune requête suivie, concurrents réels à ajouter ;
   - `docs/seo/calendrier-editorial.json` : idées restées sans suite depuis plus de deux mois (à planifier ou à abandonner avec la raison), types de contenu qui gagnent ou qui perdent d'après les entrées « mesuré », cadence tenue ou non ;
   - ce runbook : règle qui n'a jamais servi, seuil trop large ou trop strict, consigne ambiguë.

   Après toute modification des fichiers JSON : `node scripts/seo-routine/check-config.mjs` et `node scripts/seo-routine/check-calendar.mjs`.
4. Le relevé des citations IA, une fois par mois (jamais chaque semaine), à la main, sans nouveau script. La collecte par API ne mesure ni AI Overviews, ni ChatGPT, ni Perplexity, ni Claude : ce relevé comble le trou, sur environ 8 requêtes :
   - les 5 premières requêtes distinctes de `performance.strikingDistance` du dernier `summary.json`, puis « roi ia », « claude skills » et « agence geo » ;
   - instrument : les outils de recherche et de lecture web de la session (recherche web, lecture de page), jamais le navigateur de Simon ni une session ouverte à son nom. Pour chaque requête, lis la SERP Google avec cet outil : un AI Overview est-il affiché (oui ou non) ; waimia.com est-il cité (oui ou non) ; URL waimia.com citée, si oui ; concurrents cités ;
   - si l'outil ne rend pas la SERP comme un navigateur (bloc AI Overview absent du texte rendu, page de consentement, vérification anti-robot), n'en déduis rien : écris `"googleAiOverview": null` et la raison dans `abstention.google`, sans contourner le blocage ni répondre de mémoire, et passe à la requête suivante ;
   - Perplexity et ChatGPT : seulement s'ils répondent sans connexion. Sinon, écris `null` et l'abstention de la source (`"connexion requise"`), sans la remplacer par une réponse de mémoire ni par un chiffre ;
   - stocke le relevé dans `docs/seo/data/AAAA-Www/citations-ia.json`, dans le dossier de la collecte lue pour ce bilan (celui de `latest.json`), un tableau `queries` avec par requête `query`, `date`, `googleAiOverview`, `waimiaCite`, `urlCitee`, `concurrentsCites`, `perplexity`, `chatgpt` et `abstention`. Une valeur non observée vaut `null`. `abstention` est un objet par source, par exemple `{ "google": null, "perplexity": "connexion requise", "chatgpt": "connexion requise" }` : `null` quand la source a été lue, sinon la raison ;
   - dans le bilan, ne compare au relevé du mois précédent que les requêtes présentes dans les deux relevés : citations gagnées, perdues, nouveaux concurrents cités. Liste à part les requêtes entrées ou sorties du panier (les 5 de `strikingDistance` changent d'un mois à l'autre), sans les compter comme un gain ou une perte. Une source en abstention d'un côté ne se compare pas. Aucun chiffre estimé.

Si une collecte du mois manque, dis laquelle et fais le bilan sur les semaines disponibles. Aucun chiffre estimé.
