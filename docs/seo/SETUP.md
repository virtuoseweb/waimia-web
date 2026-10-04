# Routine SEO/GEO : mise en route

Ce que Simon fait lui-même, une seule fois. Compter quinze minutes. Tant que ce n'est pas fait, la collecte tourne quand même chaque lundi, sans les données Search Console (flux, concurrents et IndexNow seulement).

Étapes vérifiées dans la documentation Google le 4 octobre 2026 (liens en bas de page). Les libellés des consoles peuvent changer.

## 1. Créer le compte de service (Google Cloud)

1. Ouvrir [console.cloud.google.com](https://console.cloud.google.com/) avec le compte Google propriétaire de la propriété Search Console. Choisir un projet existant ou en créer un (par exemple `waimia-seo`).
2. Activer l'API : menu « API et services » puis « Bibliothèque », chercher **Google Search Console API**, cliquer « Activer ».
3. Créer le compte : menu « IAM et administration » puis « Comptes de service », « Créer un compte de service ». Donner un nom (par exemple `seo-routine`), puis cliquer « OK ». Les étapes d'attribution de rôles sont facultatives : n'en donner aucun. Les droits se règlent dans Search Console, pas dans Google Cloud.
4. Noter l'adresse du compte, de la forme `seo-routine@<projet>.iam.gserviceaccount.com`.
5. Créer la clé : cliquer sur l'adresse du compte, onglet « Clés », « Ajouter une clé », « Créer une clé », type **JSON**, « Créer ». Le fichier se télécharge une seule fois : il ne pourra pas être récupéré plus tard.

Si la création de clé est refusée : dans les organisations Google Cloud créées depuis le 3 mai 2024, la règle `iam.disableServiceAccountKeyCreation` est active par défaut. Deux solutions : créer le projet hors organisation (compte Google personnel), ou faire lever la règle pour ce projet par un administrateur de l'organisation.

## 2. Donner accès à la propriété (Search Console)

1. Ouvrir [search.google.com/search-console](https://search.google.com/search-console) et choisir la propriété de domaine `waimia.com`.
2. « Paramètres » puis « Utilisateurs et autorisations », « Ajouter un utilisateur ».
3. Coller l'adresse du compte de service, choisir l'autorisation **Complète** (« Utilisateur avec accès complet »), valider.

Seul un propriétaire de la propriété peut ajouter un utilisateur. L'accès complet est nécessaire : un accès limité ne permet ni d'envoyer le sitemap ni d'inspecter les URL.

## 3. Ajouter le secret (GitHub)

1. Dans le repo `virtuoseweb/waimia-web` : « Settings », « Secrets and variables », « Actions », « New repository secret ».
2. Nom : `GSC_SERVICE_ACCOUNT_JSON`. Valeur : le contenu entier du fichier JSON téléchargé à l'étape 1 (de `{` à `}`).
3. Supprimer le fichier JSON de l'ordinateur, ou le ranger dans un gestionnaire de mots de passe. Ne jamais le commiter.

## 4. Premier lancement

1. Onglet « Actions » du repo, workflow « Routine SEO · collecte hebdomadaire », « Run workflow » sur `main`, sans cocher la simulation.
2. Ouvrir le run : le résumé liste chaque étape. Les trois étapes `gsc-*` doivent être `ok`.
3. Un commit `chore(seo-data): collecte AAAA-Www` apparaît sur `main`, avec `docs/seo/data/latest.json`.

Attendre au moins 60 secondes entre la création de la clé et ce premier lancement : une clé toute neuve peut être refusée.

Si une étape `gsc-*` est en erreur :

| Message | Cause | Correction |
| --- | --- | --- |
| `API Google 403` avec « permission » | Le compte de service n'est pas utilisateur de la propriété, ou la propriété n'est pas celle de domaine. | Refaire l'étape 2 sur la propriété `waimia.com` de type domaine. |
| `API Google 403` avec « has not been used in project » ou « is disabled » | L'API n'est pas activée dans le projet. | Refaire l'étape 1.2. |
| `échec OAuth2` | Le secret est tronqué ou n'est pas le fichier de clé. | Recoller le JSON entier à l'étape 3. |
| `non configuré` | Le secret n'existe pas ou porte un autre nom. | Vérifier le nom exact `GSC_SERVICE_ACCOUNT_JSON`. |

Pour vérifier le secret depuis un poste, sans l'afficher : `GSC_SERVICE_ACCOUNT_JSON="$(cat cle.json)" node scripts/seo-routine/gsc-auth.mjs` liste les propriétés visibles par le compte.

## 5. Facultatif : Bing Webmaster Tools

La routine prévient déjà Bing par IndexNow, sans compte. Déclarer le site dans [Bing Webmaster Tools](https://www.bing.com/webmasters) sert seulement à voir les URL reçues et l'état d'indexation côté Bing (le site peut y être importé depuis Search Console).

La clé IndexNow n'est pas un secret : c'est le fichier `public/34c4e7bcd4aa2c942247305687c341d9.txt`, servi à la racine du site, qui prouve que l'envoi vient du propriétaire. Tant que ce fichier n'est pas en production, la routine n'envoie rien et l'indique (« clé non déployée »).

## 6. Planifier la session Claude

La collecte tourne le lundi à 04:30 UTC. Planifier la session Claude hebdomadaire après (le lundi en début de matinée, heure de Paris), avec pour consigne : « Exécute `docs/seo/ROUTINE.md` dans le repo `virtuoseweb/waimia-web`. »

## Ce que la routine fait, et ce qu'aucune API ne permet

Google ne propose pas d'API pour « demander l'indexation » d'une page ordinaire (l'Indexing API est réservée aux offres d'emploi et aux diffusions en direct). Ce que l'API permet : resoumettre le sitemap, inspecter l'état d'indexation de chaque URL.

La routine fait donc exactement cela chaque semaine : elle resoumet `https://waimia.com/sitemap-index.xml`, inspecte chaque URL du sitemap (verdict, motif, dernière exploration, canonique retenue par Google) et compare à la semaine précédente. Elle n'utilise pas l'Indexing API. Le bouton « Demander l'indexation » de Search Console reste manuel : le compte rendu hebdomadaire dit quand une page le mérite.

IndexNow complète côté Bing, Yandex, Seznam et Naver. Google n'y participe pas.

## Où vont les données, et pourquoi

Le workflow commite directement sur `main`, et uniquement des fichiers sous `docs/seo/data/` (vérifié avant le push, sinon le job échoue). Ce choix plutôt qu'une PR par semaine :

- **Pas de CI inutile** : un push fait par le jeton du workflow (`GITHUB_TOKEN`) ne déclenche pas les autres workflows. Les trois builds de `ci.yml` ne tournent pas.
- **Pas de déploiement inutile** : `vercel.json` n'ignorait aucun chemin, donc tout push sur `main` redéployait la production. La PR qui installe la routine ajoute `ignoreCommand` (`scripts/seo-routine/vercel-ignore-build.sh`) : Vercel saute le déploiement seulement s'il est prouvé que tous les fichiers modifiés depuis le dernier déploiement réussi sont sous `docs/seo/data/`. Au moindre doute, il déploie.
- **Pas d'intervention** : avec une PR par semaine, quelqu'un devrait la fusionner pour que la session Claude lise les données et que l'état (indexation, IndexNow, concurrents) soit conservé d'une semaine à l'autre.

Le repo est privé sur un plan GitHub gratuit : la protection de branche n'y est pas disponible, donc le push sur `main` est accepté. Si une protection est activée plus tard et refuse le push, le workflow se rabat tout seul sur une branche `seo-data/AAAA-Www` et ouvre une PR ; `vercel.json` désactive les déploiements de ces branches. Ce repli demande d'autoriser, dans « Settings », « Actions », « General », l'option « Allow GitHub Actions to create and approve pull requests », et de fusionner la PR chaque semaine.

À savoir : `ignoreCommand` dans `vercel.json` remplace un éventuel réglage « Ignored Build Step » saisi dans le tableau de bord Vercel.

## Outillage

| Commande | Rôle |
| --- | --- |
| `node scripts/seo-routine/run.mjs` | Collecte complète, écrit `docs/seo/data/`. `--dry-run` : aucune écriture externe. `--only=feeds,competitors` : étapes choisies. `SEO_DATA_DIR=<dossier>` : écrit ailleurs (essai local). |
| `node scripts/seo-routine/feeds.mjs --check` | État de chaque flux de `feeds.json`. |
| `node scripts/seo-routine/check-config.mjs` | Vérifie `keywords.json` (chaque page cible existe), `feeds.json`, `competitors.json`, la clé IndexNow. |
| `node --test "scripts/seo-routine/tests/*.test.mjs"` | Tests unitaires. |
| `node scripts/seo-routine/gsc-auth.mjs` | Vérifie le compte de service. |

Fichiers à tenir à jour à la main : `docs/seo/keywords.json` (mots-clés suivis et pages cibles), `docs/seo/feeds.json` (flux, et éditeurs sans flux dans `noFeed`), `docs/seo/competitors.json`.

Quotas de l'API d'inspection d'URL : 2 000 requêtes par jour et 600 par minute pour une propriété. Le script plafonne à 1 800 par exécution et à 300 par minute ; le sitemap compte moins de 100 URL.

## Sources

- Créer un compte de service : <https://docs.cloud.google.com/iam/docs/service-accounts-create>
- Créer une clé de compte de service : <https://docs.cloud.google.com/iam/docs/keys-create-delete>
- Utilisateurs et autorisations Search Console : <https://support.google.com/webmasters/answer/7687615?hl=fr>
- Search Analytics : <https://developers.google.com/webmaster-tools/v1/searchanalytics/query>
- Inspection d'URL : <https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect>
- Sitemaps : <https://developers.google.com/webmaster-tools/v1/sitemaps/submit>
- Quotas : <https://developers.google.com/webmaster-tools/limits>
- Indexing API, pages concernées : <https://developers.google.com/search/apis/indexing-api/v3/quickstart>
- IndexNow : <https://www.indexnow.org/documentation>
- Vercel, `ignoreCommand` et `git.deploymentEnabled` : <https://vercel.com/docs/project-configuration/vercel-json>, <https://vercel.com/docs/project-configuration/git-configuration>
