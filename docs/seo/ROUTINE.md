# Routine SEO/GEO hebdomadaire : runbook de la session Claude

Ce document est exécuté chaque semaine par une session Claude planifiée, sans Simon. Il est autoportant : suis-le dans l'ordre. Lis aussi `CLAUDE.md` à la racine (règles du repo, garde-fous GF-1 à GF-6) avant de modifier quoi que ce soit.

**Ce que la session produit** : une PR par semaine (zéro si la décision est de ne rien faire), une entrée dans `docs/seo/journal.md`, un compte rendu court à Simon. **Ce qu'elle ne fait jamais** : merger, pousser sur `main`, créer un secret ou un compte, inventer un chiffre, soumettre une URL à un moteur.

**Rappel : API d'abord, navigateur jamais.** La routine travaille uniquement sur les données collectées par API et commitées dans le repo (`docs/seo/data/`). Elle n'ouvre ni Search Console, ni Bing Webmaster Tools, ni aucun autre outil dans un navigateur. Le navigateur ne sert qu'à Brave Search, qui n'a pas d'API, et seulement dans la tâche planifiée dédiée (section 12), pas dans cette session.

## Qui fait quoi, et quand

| Quoi | Quand | Par quoi |
| --- | --- | --- |
| Collecte des données : Search Console, inspection d'indexation, flux, concurrents | Lundi 04:30 UTC | Workflow GitHub Actions `seo-routine.yml` (API) |
| Soumission à Google (sitemap, Indexing API) et à Bing et partenaires (IndexNow) | Lundi, dans la collecte | Le même workflow (API) |
| Calcul de la file Brave (`latest.json > brave.toSubmit`) | Lundi, dans la collecte | Le même workflow (`brave-queue.mjs`, ne soumet rien) |
| Soumission de la file à Brave Search | Lundi, après la collecte | Tâche planifiée « Soumission Brave hebdomadaire Waimia », dans le navigateur de Simon, ordinateur allumé (section 12) |
| Analyse, une à trois actions de contenu, PR, journal, compte rendu | Lundi matin, après la collecte | Session Claude hebdomadaire (ce runbook, sections 1 à 11) |
| Bilan mensuel | Premier lundi du mois | La même session, en plus du reste (section 13) |
| Fusion de la PR, « Demander l'indexation » dans Search Console, décisions | Quand Simon le décide | Simon |

## 0. Comment les données arrivent

Le workflow GitHub Actions `.github/workflows/seo-routine.yml` tourne chaque lundi à 04:30 UTC. Il lance `scripts/seo-routine/run.mjs` et commite le résultat sur `main`, sous `docs/seo/data/` :

| Fichier | Contenu |
| --- | --- |
| `docs/seo/data/latest.json` | Résumé de la semaine. C'est le fichier à lire en premier. |
| `docs/seo/data/AAAA-Www/summary.json` | Le même résumé, archivé par semaine ISO. |
| `docs/seo/data/AAAA-Www/gsc-performance.json` | Search Console, lignes complètes par requête, par page, par page et requête, sur 4 périodes. |
| `docs/seo/data/AAAA-Www/gsc-index.json` | Résultat de l'inspection de chaque URL du sitemap. |
| `docs/seo/data/AAAA-Www/gsc-sitemap.json` | État du sitemap dans Search Console après resoumission. |
| `docs/seo/data/AAAA-Www/indexnow.json` | URL envoyées à IndexNow. |
| `docs/seo/data/AAAA-Www/indexing-api.json` | URL notifiées à Google par l'Indexing API, reports et erreurs. |
| `docs/seo/data/AAAA-Www/brave-queue.json` | File des URL à soumettre à Brave Search (nouvelles, modifiées), sans soumission. |
| `docs/seo/data/AAAA-Www/feeds.json` | Entrées des flux des 8 derniers jours, résumés complets. |
| `docs/seo/data/AAAA-Www/competitors.json` | URL nouvelles et retirées chez les concurrents. |
| `docs/seo/data/state/*.json` | État technique d'une semaine sur l'autre. Ne pas modifier. |

Ce que l'automatisation fait déjà pour l'indexation, et ses limites :

À chaque collecte, le workflow :

1. resoumet le sitemap à Google et inspecte l'état d'indexation de chaque URL (API Search Console). C'est le socle, avec le maillage interne ;
2. prévient Bing et les moteurs partenaires par IndexNow pour chaque URL nouvelle ou modifiée ;
3. notifie Google par l'Indexing API (`urlNotifications.publish`, type `URL_UPDATED`) pour chaque URL du sitemap nouvelle ou dont le `lastmod` a changé depuis sa dernière soumission, les pages non indexées en premier, 200 par jour au plus. Une URL inchangée n'est jamais resoumise.

Brave Search n'a aucune API : la collecte calcule seulement la file des URL à lui soumettre, et la soumission passe par une tâche à part (section 12).

Ce qu'il faut savoir sur le point 3, sans l'enjoliver :

> La documentation de Google réserve l'Indexing API aux pages d'offres d'emploi et de diffusion en direct : « The Indexing API can only be used to crawl pages with either `JobPosting` or `BroadcastEvent` embedded in a `VideoObject`. » (<https://developers.google.com/search/apis/indexing-api/v3/quickstart>, lu le 4 octobre 2026). Simon l'utilise déjà sur virtuoseweb.fr et a choisi de la réutiliser ici. Google peut ignorer ces notifications pour des pages ordinaires et ne garantit rien : une réponse 200 veut seulement dire que Google « may try to recrawl this URL soon ».

Conséquences pour toi :

- **Tu n'as rien à soumettre toi-même**, à aucun moteur. Après la fusion d'une PR de contenu, les pages créées ou modifiées partent à la collecte suivante, par IndexNow et par l'Indexing API, et entrent dans la file Brave de cette collecte. Ne lance ni `indexing-api.mjs`, ni `indexnow.mjs`, ni `brave-queue.mjs`, ne relance pas le workflow, n'ouvre pas le formulaire de Brave.
- Une page modifiée n'est repérée que si son `lastmod` change dans le sitemap, donc si `updatedAt` a été mis à jour dans son fichier de contenu (section 5). C'est une raison de plus de le faire à chaque révision de fond, et seulement dans ce cas.
- Une notification acceptée ne prouve pas l'indexation. La seule mesure reste `indexation` dans `latest.json` (inspection d'URL). N'écris jamais « indexée » parce qu'une URL figure dans `indexingApi.submittedPaths`.
- Une page non indexée se traite toujours par la section 4.1, règle 3 (enrichir, mailler, fusionner ou rediriger, ou corriger un bug), pas par une nouvelle soumission.
- Le bouton « Demander l'indexation » de Search Console reste un geste manuel de Simon : si une page précise le mérite, dis-le dans le compte rendu.

## 1. Préparer la session

```bash
git fetch origin main
git switch -c feat/seo-AAAA-Www origin/main   # semaine ISO du jour, ex. feat/seo-2026-W41
npx -y pnpm@9.15.0 install --frozen-lockfile
```

Si la branche `feat/seo-AAAA-Www` existe déjà sur le dépôt distant, une session a déjà tourné cette semaine : reprends-la au lieu d'en créer une autre, et n'ouvre pas de seconde PR.

## 2. Lire

1. `docs/seo/data/latest.json` en entier.
2. `docs/seo/journal.md` : les quatre dernières entrées au moins.
3. `docs/seo/keywords.json` : mots-clés suivis, page cible, grappe, priorité.
4. Au besoin, les fichiers détaillés de la semaine (voir le tableau ci-dessus).

Contrôles avant d'aller plus loin :

- `latest.json > week` est la semaine ISO en cours. Sinon, voir la section 10.
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
| `brave` | File Brave de la semaine : `toSubmit` (URL complètes, nouvelles ou dont le `lastmod` a changé), `count`, `note`. À reporter dans le compte rendu, pas à soumettre (section 12). `null` si l'étape `brave-queue` est en `erreur`. |
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

Le premier lundi du mois, ajoute le bilan mensuel (section 13).

## 4. Décider : une à trois actions, pas plus

La révision passe avant la création. Parcours les règles dans cet ordre et arrête-toi à trois actions. Une seule action bien faite vaut mieux que trois moyennes.

### 4.1 Réviser une page existante quand

1. **Position 8 à 20** : la page apparaît dans `performance.strikingDistance` pour une requête suivie ou proche de l'offre. Priorité aux requêtes de priorité 1 dans `keywords.json`, puis au plus grand nombre d'impressions.
2. **CTR faible** : la page est dans `performance.lowCtrPages`. Le travail porte sur le title et la meta description (promesse concrète, requête en tête), pas sur le corps.
3. **Non indexée depuis plus de trois collectes** : `weeksNotIndexed` supérieur à 3 (une collecte par semaine). Une page « détectée » ou « explorée, actuellement non indexée » au-delà de ce délai **appelle une décision**, écrite dans le journal : enrichir, mailler, fusionner ou rediriger. La laisser en l'état sans le dire n'est pas une option ; si tu ne peux pas la traiter cette semaine (trois actions déjà prises), inscris-la dans « Pour Simon » avec la décision proposée. Lis d'abord `coverageState` :
   - « Détectée, actuellement non indexée » : Google connaît l'URL et ne l'a pas explorée. **Mailler** : renforce les liens internes vers la page (registre `src/lib/internal-mesh.ts`) et vérifie qu'elle n'est pas un doublon d'une autre.
   - « Explorée, actuellement non indexée » : Google a lu la page et ne l'a pas retenue. C'est un problème de contenu. **Enrichir** : la page doit apporter ce que les autres n'ont pas (section 5). Sinon **fusionner ou rediriger** (4.3).
   - « Google ne reconnaît pas cette URL » : Google ne l'a pas encore vue. Vérifie qu'elle est dans le sitemap et reçoit des liens internes ; au-delà de trois collectes, traite-la comme « détectée ».
   - Motif technique (noindex, robots.txt, redirection, 404, canonique différente) : c'est un bug. Corrige-le ou signale-le, ce n'est pas une révision éditoriale.
4. **Contenu daté par une actualité** : une entrée de `feeds.entries` rend une page fausse ou incomplète (changement de prix d'un outil, nouvelle version, nouvelle obligation, date d'application d'un texte). Lis la source primaire avant de corriger.
5. **Mauvaise page classée** : `onTarget: false` ou `cannibalisation` non nul sur un mot-clé suivi. Clarifie laquelle des deux pages répond à la requête (title, H1, lien interne de l'une vers l'autre), ou fusionne.

### 4.2 Créer une page quand

Toutes les conditions de l'un de ces cas sont réunies, et aucune révision de la section 4.1 n'est plus urgente :

1. **Requête suivie sans page cible** : présente dans `keywords.withoutTarget`, et aucune page existante ne peut la porter par une révision. La page est nommée comme la requête (URL, title et H1 alignés), c'est ce qui fait gagner les concurrents réels (kayro.ai, sparkyflow.com).
2. **Sujet récurrent dans les flux et lié à l'offre** : le sujet revient dans au moins trois entrées de sources différentes sur deux semaines, il touche une prestation de Waimia (conseil, intégration, développement, formation), et une PME peut en tirer une décision.
3. **Angle absent chez les concurrents** : vérifié en lisant leurs pages pendant la session (`competitors.rows[].newUrls` et leurs pages sur le sujet), pas supposé.

Après création : ajoute la page au registre `src/lib/internal-mesh.ts`, et renseigne `target` du mot-clé dans `docs/seo/keywords.json` (puis `node scripts/seo-routine/check-config.mjs`).

### 4.3 Fusionner ou rediriger quand

- Deux pages visent la même requête et se partagent les impressions (`cannibalisation`) : garde celle qui a le plus d'impressions et de liens, reprends le meilleur de l'autre, redirige l'autre.
- Une page est non indexée depuis plus de 8 semaines malgré une révision, et son sujet est couvert ailleurs.
- Une redirection suit la mécanique du repo : le fichier de contenu est conservé, la page est dépubliée dans `src/data/depublished.ts` et l'ancienne URL est redirigée en 301 dans le bloc `redirects` d'`astro.config.mjs`. Un seul saut, cible en 200, contrôlé par `node scripts/check-redirects.mjs`. Une suppression ou une redirection de page se propose dans la PR avec sa justification chiffrée ; c'est Simon qui tranche en mergeant.

### 4.4 Ne rien faire quand

- Les actions des deux dernières semaines sont encore `trop tôt` et aucune règle de 4.1 ne se déclenche.
- Les données manquent (section 10) et aucune correction factuelle n'est nécessaire.
- La seule idée disponible est un résumé d'actualité sans conséquence pour une PME.

Ne rien faire est un résultat valide. Dans ce cas : pas de PR de contenu, une entrée de journal qui dit pourquoi, et le compte rendu.

## 5. Exigences de contenu

Chaque création ou révision doit passer toutes ces exigences. Si l'une ne peut pas être tenue, change d'action.

**Apporter ce que les dix premiers résultats n'ont pas.** Avant d'écrire, lis les résultats réels de la requête (WebSearch, puis WebFetch sur les premiers) et note ce qui manque. La page doit contenir au moins un de ces éléments :

- un retour d'expérience de mise en œuvre (ce qui casse, ce qui prend du temps, l'ordre des étapes), tiré de ce que le repo documente déjà ou des cas clients réels ;
- un exemple chiffré, étiqueté « exemple illustratif » dans le texte ;
- une procédure pas à pas qu'on peut suivre sans appeler personne ;
- une comparaison avec des critères explicites et un verdict par cas d'usage ;
- une prise de position argumentée, y compris « ne le faites pas si ».

**Sources.** Tout fait sur un produit tiers (n8n, Make, Claude, OpenAI, Mistral), un texte de loi ou un organisme vient d'une source primaire lue pendant la session, citée avec son lien et la mention « vérifié le » suivie de la date du jour. Un média qui rapporte une annonce n'est pas une source primaire : remonte à l'annonce. Anthropic n'a pas de flux : lis `https://www.anthropic.com/news` et les pages listées dans `docs/seo/feeds.json > noFeed`.

**Rien d'inventé.** Aucun chiffre de résultat, client, témoignage, logo, partenariat ou certification inventé. Cas clients réels uniquement : ceux de `src/content/cases/`. Interdits : « partenaire Anthropic », « Claude certified », « certifié », « ISO 27001 », « n°1 », « leader ». Autorisé : « Activateur France Num ». Formation : « Formations dispensées via Akigora, organisme certifié Qualiopi » ; financement : « prise en charge possible selon votre situation » ; ni « CPF » ni « éligible ». Prix : seulement ceux déjà affichés sur le site pour une prestation équivalente, sinon « sur devis après audit gratuit ».

**Pas de résumé d'actualité.** Une actualité n'entre dans une page que avec son analyse pour une PME de 10 à 250 personnes : ce que ça change, pour qui, quoi faire lundi, quoi ne pas faire.

**Profondeur proportionnée à la requête.** Une requête de prix veut un tableau et trois paragraphes, pas un essai. Une requête « X vs Y » veut des critères et un verdict. Aucune section de remplissage.

**Structure.**

- Réponse directe en tête de page : les deux ou trois premières phrases répondent à la requête, sans préambule. C'est ce que les moteurs IA citent.
- FAQ faite de questions réelles : requêtes de `gsc-performance.json` (`byQuery`) formulées en question, questions lues dans les résultats de recherche. Pas de question inventée pour placer un mot-clé.
- Date de mise à jour : champ `updatedAt` du fichier de contenu à la date du jour à chaque révision de fond (il alimente le `lastmod` du sitemap, le JSON-LD et la ligne « Mis à jour le »). Ne change pas `updatedAt` pour une retouche qui ne modifie pas le fond.
- Title et H1 alignés sur la requête visée ; meta description de 160 caractères au plus.

**Ton et forme.** Direct, concret, phrases courtes. Pas de superlatifs, pas de « révolutionner », « booster », « libérer le potentiel ». Pas de tiret cadratin (gate `check:no-emdash`).

**Règles du repo.**

- Le contenu vit en JSON sous `src/content/` (aucun fichier `.mdx`). Regarde une page voisine de la même collection avant d'écrire.
- Les pages se composent avec les sections du catalogue (`src/sections/<type>/`). Aucun markup neuf dans une page ou un gabarit, aucun nouveau token ni nouvelle variable du design system. Si une section manque vraiment, ne la crée pas dans cette routine : signale-le à Simon.
- Maillage interne : déclare ou mets à jour la page dans `src/lib/internal-mesh.ts`. Pas de liste de liens écrite à la main.
- Appel à l'action : le bouton de prise de rendez-vous pointe vers `/contact?offer=audit-ia-pme&intent=audit`. Les liens « En savoir plus sur l'audit » pointent vers `/audit-ia-pme`.
- Ne touche ni aux mentions légales ni aux adresses des données structurées.
- Fichiers générés (`src/lib/*.generated.ts`, `src/data/ds-*.json`, `src/data/lastmod.generated.json`) : jamais à la main, toujours par le script du repo.

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

# Gates de contenu et de catalogue
node scripts/check-no-emdash.mjs
node scripts/check-internal-links.mjs
node scripts/check-content-refs.mjs
node scripts/check-touchpoints.mjs
node scripts/check-section-modules.mjs
node scripts/seo-routine/check-config.mjs   # si keywords.json, feeds.json ou competitors.json a changé

# Types : 8 erreurs existent déjà sur main (eeat-panel, pricing-tabs-showcase). N'en ajoute aucune.
npx -y pnpm@9.15.0 exec astro check
```

La CI lance aussi un build complet (job « build ») et les tests Playwright (job « e2e »). Si tu as modifié autre chose que du contenu JSON, lance-les aussi : `npx -y pnpm@9.15.0 build` puis la commande du job « e2e » de `.github/workflows/ci.yml`.

Preuve visuelle (GF-1) pour toute page créée ou dont la structure a changé : sers le build (`node scripts/serve-dist.mjs --port 4330 --root dist/client`), puis capture Playwright à 1440 px et 390 px ; vérifie que le H1 est visible, qu'il n'y a ni débordement horizontal ni erreur console.

## 8. Livrer

0. Tu ne soumets aucune URL aux moteurs. Une fois la PR fusionnée par Simon et la production déployée, la collecte suivante envoie les pages créées ou modifiées à IndexNow et à l'Indexing API (section 0) et les met dans la file Brave (section 12).
1. Restaure le board régénéré par le hook de commit : `git checkout docs/state/00-BOARD.md` avant chaque commit. Ne le commite jamais.
2. Ajoute les fichiers un par un (`git add <chemin>`), jamais `git add -A`.
3. Mets à jour `docs/seo/journal.md` (section 9) dans la même branche.
4. Commits en français. Push :
   `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin feat/seo-AAAA-Www`
5. Une seule PR par semaine, vers `main` :
   `gh api -X POST repos/virtuoseweb/waimia-web/pulls -f title="SEO AAAA-Www : <actions>" -f head=feat/seo-AAAA-Www -f base=main -f body=...`
   (`gh pr create` peut renvoyer 403 dans cet environnement.)
6. Corps de la PR : les données qui motivent chaque action (chiffres de `latest.json`), ce qui a changé page par page, les sources lues avec lien et date, le retour du relecteur sceptique et ce que tu en as fait, la sortie des vérifications de la section 7, ce qui n'a pas été vérifié.
7. Attends la CI et corrige jusqu'au vert. Ne merge pas, ne pousse rien sur `main`, n'active pas l'auto-merge.

Si la décision de la semaine est de ne rien faire, la PR ne contient que l'entrée de journal. Elle reste utile : c'est la trace que la routine a tourné.

## 9. Tenir le journal

Ajoute une entrée en haut de `docs/seo/journal.md`, en suivant le modèle qui s'y trouve. Une entrée par semaine, même sans action. Elle contient : les KPI de la semaine, le bilan chiffré des actions précédentes, ce qui a été fait et pourquoi (la règle de la section 4 qui s'est déclenchée, avec la donnée), pour chaque action ce qu'il faudra mesurer, sur quelle page, quelle requête, à partir de quelle semaine, la file Brave de la semaine (`brave.count`) et, le premier lundi du mois, le bilan mensuel (section 13).

La ligne « À mesurer » doit être vérifiable par la session suivante sans interprétation. Exemple : « `/services/automatisation-n8n`, requête "agence n8n" : position 11,4 et 120 impressions sur 28 jours au 5 octobre. Attendu : position sous 10. À juger à partir de 2026-W43. »

## 10. Si les données manquent

**`latest.json` absent ou d'une semaine passée.** La collecte n'a pas tourné ou a échoué. Ne fabrique aucune donnée et ne relance pas le workflow toi-même. Tu peux lancer en local les étapes qui n'ont pas besoin de secret, sans rien commiter sous `docs/seo/data/` :

```bash
SEO_DATA_DIR=/tmp/seo-data node scripts/seo-routine/run.mjs --dry-run --only=feeds,competitors
```

Travaille alors avec ces flux et les données de la dernière semaine disponible, en disant clairement dans le journal et le compte rendu de quelle date elles sont. Limite-toi aux révisions justifiées par une actualité (4.1, règle 4) ou par les données déjà connues. Signale la panne en tête du compte rendu.

**Search Console non configuré (`gscConfigured: false`, étapes `non configuré`).** Aucune mesure de performance ni d'indexation n'existe. Dans ce cas :

- pas de bilan chiffré des actions précédentes : écris `non mesurable` ;
- décisions possibles : contenu daté par une actualité, requête suivie sans page cible, angle absent chez les concurrents. Pas de révision « position 8 à 20 » ni « CTR faible », faute de mesure ;
- une action au maximum ;
- rappelle en tête du compte rendu que la mise en route de `docs/seo/SETUP.md` reste à faire.

**Une étape en `erreur`.** Recopie le message de `steps.<étape>.error` dans le compte rendu. Les autres sections restent utilisables. Un flux en erreur trois semaines de suite (`feeds.feedsInError`) se retire de `docs/seo/feeds.json` dans la PR, avec la raison, et se remplace si un équivalent existe (vérifie-le avec `node scripts/seo-routine/feeds.mjs --check`).

**Indexing API en `erreur`, `interrompu` ou `quota atteint`.** Rien à faire côté contenu, et rien à resoumettre : les URL non acceptées repartent à la collecte suivante. Recopie `steps.indexing-api.error` ou `indexingApi.firstError` dans le compte rendu. Un 403 « n'est pas propriétaire » ou « n'est pas activée » demande une action de Simon (`docs/seo/SETUP.md`, étapes 1 et 2). Un `quota atteint` vient du plafond de 200 par jour, partagé avec virtuoseweb.fr. Si l'étape est `non configuré`, la mise en route n'est pas faite. Dans tous les cas, le sitemap et l'inspection d'URL continuent de fonctionner.

**Étape `brave-queue` en `erreur`** (`brave` vaut `null`). Le sitemap de production n'a pas pu être lu. Rien à faire côté contenu : écris dans le compte rendu que la file Brave de la semaine n'a pas été calculée. L'état n'a pas bougé, donc les URL concernées sortiront à la collecte suivante.

**IndexNow en « clé non déployée ».** Le fichier `public/<clé>.txt` n'est pas en ligne. Rien à faire côté contenu : signale-le.

## 11. Compte rendu final à Simon

Court, en français, sans jargon inutile. Quatre blocs, dans cet ordre (cinq le premier lundi du mois : le bilan mensuel de la section 13 se place après le bloc 2) :

1. **KPI** : clics, impressions, CTR, position sur 7 et 28 jours avec la variation ; nombre de pages indexées sur le total ; nombre d'URL notifiées à Google par l'Indexing API (`indexingApi.submitted`), présenté comme des notifications envoyées, pas comme des pages indexées ; file Brave de la semaine (`brave.count`, puis la liste `brave.toSubmit` si elle n'est pas vide), présentée comme « à soumettre par la tâche Brave », jamais comme soumise. Si une mesure manque, dis-le au lieu de l'omettre.
2. **Ce qui a bougé** : les deux ou trois faits marquants (une requête qui entre dans les dix premiers, une page désindexée, un concurrent qui publie sur une requête suivie, une annonce qui touche une page), et le verdict des actions précédentes.
3. **Ce que propose la PR** : le lien, les actions (une ligne chacune avec la donnée qui la motive), l'état de la CI.
4. **Ce qui demande ta décision** : fusion ou redirection proposée, page non indexée depuis plus de trois collectes que tu n'as pas pu traiter (4.1, règle 3), changements proposés au bilan mensuel, page à « demander l'indexation » à la main dans Search Console, section du catalogue manquante, flux à remplacer, panne de collecte, erreur de l'Indexing API (compte de service non propriétaire, API non activée).

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
| Collecte du lundi (`scripts/seo-routine/brave-queue.mjs`) | Calcule la file : URL du sitemap de production nouvelles ou dont le `lastmod` a changé depuis la dernière file. L'écrit dans `latest.json > brave` (`toSubmit`, `count`, `note`) et dans `AAAA-Www/brave-queue.json`. Ne soumet rien. |
| Tâche planifiée « Soumission Brave hebdomadaire Waimia » | Le lundi après la collecte, soumet la file au formulaire par le navigateur de Simon. Elle exige son ordinateur allumé. C'est une décision de Simon : c'est le seul usage du navigateur de toute la routine. |
| Session hebdomadaire de contenu (ce runbook) | Ne soumet rien, n'ouvre pas le formulaire. Reporte dans son compte rendu la file de la semaine (`brave.count` et `brave.toSubmit`). |

**Comment la file se comporte.**

- La collecte considère la file de la semaine comme transmise : une URL sortie une semaine ne ressort pas tant que son `lastmod` ne change pas. La collecte ne sait pas ce qui a réellement été soumis.
- Si la collecte tourne plusieurs fois dans la même semaine ISO, la file de la semaine est conservée et complétée, pas vidée.
- Amorçage : l'état `docs/seo/data/state/brave.json` n'existant pas avant la première exécution, celle-ci enregistre le sitemap courant comme déjà soumis (la soumission manuelle du 4 octobre 2026) et sort une file vide. Pour remettre tout le sitemap dans la file, après une refonte par exemple : `node scripts/seo-routine/run.mjs --brave-all`, à la demande de Simon seulement.
- Si l'ordinateur de Simon n'est pas disponible, la tâche dit ce qu'elle n'a pas pu soumettre, et ces pages restent à faire la semaine suivante. Comme la collecte ne les ressort pas, la tâche les reprend dans l'archive de la semaine manquée : `docs/seo/data/AAAA-Www/summary.json > brave.toSubmit`.

**Procédure de soumission (tâche Brave uniquement).**

1. Lire `brave.toSubmit` dans `docs/seo/data/latest.json` sur `main`. Y ajouter les URL qu'une exécution précédente a signalées comme non soumises, et la file des semaines où la tâche n'a pas tourné (archives `AAAA-Www/summary.json`). Si le total est vide, s'arrêter et le dire.
2. Ouvrir <https://search.brave.com/submit-url>.
3. Coller une URL dans le champ « Insert the URL to be re-fetched », cliquer « Submit ».
4. Vérifier que la page affiche « Success · Thank you for your submission ». Tout autre résultat (message d'erreur, page inchangée, contrôle anti-robot) est un échec : noter l'URL et ce qui s'est affiché, ne pas insister plus de deux fois.
5. Recharger la page avant l'URL suivante (le bouton reste inactif sinon), puis reprendre à l'étape 3.
6. Terminer par un compte rendu à Simon : nombre d'URL soumises avec « Success », liste des échecs avec le message vu, liste de ce qui reste à faire la semaine suivante.

La tâche ne modifie rien dans le repo et ne soumet que des URL de `https://waimia.com` présentes dans la file.

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
   - ce runbook : règle qui n'a jamais servi, seuil trop large ou trop strict, consigne ambiguë.

   Après toute modification des trois fichiers JSON : `node scripts/seo-routine/check-config.mjs`.

Si une collecte du mois manque, dis laquelle et fais le bilan sur les semaines disponibles. Aucun chiffre estimé.
