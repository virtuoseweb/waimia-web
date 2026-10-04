# Routine SEO/GEO : mise en route

Ce que Simon fait lui-même, une seule fois. Compter quinze minutes. Tant que ce n'est pas fait, la collecte tourne quand même chaque lundi, sans les données Search Console ni les notifications de l'Indexing API (flux, concurrents et IndexNow seulement).

Étapes vérifiées dans la documentation Google le 4 octobre 2026 (liens en bas de page). Les libellés des consoles peuvent changer.

Un seul compte de service et un seul secret servent aux deux API de Google : Search Console (performances, inspection, sitemap) et Indexing API (notification des pages nouvelles ou modifiées). Le chemin retenu réutilise le compte qui sert déjà à virtuoseweb.fr :

- compte de service : `indexing-api-virtuoseweb@master-well-486317-d9.iam.gserviceaccount.com`
- projet Google Cloud : `master-well-486317-d9`

Faut-il que le compte Google qui gère Search Console pour waimia.com soit le même que celui du projet Cloud ? Non : les droits se donnent propriété par propriété dans Search Console, il suffit donc qu'un propriétaire de `sc-domain:waimia.com` y ajoute l'adresse du compte de service, quel que soit le compte Google qui possède le projet Cloud.

## 1. Activer les deux API dans le projet Google Cloud

1. Ouvrir [console.cloud.google.com](https://console.cloud.google.com/) avec le compte Google qui possède le projet `master-well-486317-d9`, et sélectionner ce projet.
2. Menu « API et services » puis « Bibliothèque ». Chercher **Google Search Console API**, cliquer « Activer ». C'est celle qui manque aujourd'hui : le projet n'a servi qu'à l'Indexing API.
3. Au même endroit, vérifier que **Web Search Indexing API** est bien activée (elle l'est déjà si le script de virtuoseweb.fr fonctionne).

Équivalent en ligne de commande :

```bash
gcloud services enable searchconsole.googleapis.com indexing.googleapis.com --project=master-well-486317-d9
```

Aucun rôle IAM n'est à donner au compte de service dans Google Cloud : ses droits se règlent dans Search Console.

## 2. Ajouter le compte de service comme propriétaire (Search Console)

1. Ouvrir [search.google.com/search-console](https://search.google.com/search-console) avec un compte propriétaire de la propriété de domaine `waimia.com` (`sc-domain:waimia.com`), et choisir cette propriété.
2. « Paramètres » puis « Utilisateurs et autorisations », « Ajouter un utilisateur ».
3. Coller `indexing-api-virtuoseweb@master-well-486317-d9.iam.gserviceaccount.com`, choisir l'autorisation **Propriétaire**, valider.

Pourquoi « Propriétaire » et pas « Complète » : l'Indexing API l'exige. La page des prérequis de Google demande d'ajouter le compte de service comme propriétaire délégué (« add your service account as a (delegated) site owner »), et sa page d'erreurs décrit le refus sinon : 403, « Permission denied. Failed to verify the URL ownership. » Le statut de propriétaire couvre aussi tout ce que demande l'API Search Console (un accès complet aurait suffi pour elle seule).

Seul un propriétaire peut en ajouter un autre. Un propriétaire délégué se retire au même endroit, à tout moment. Ce que ce droit permet au compte de service sur cette propriété : tout ce qu'un propriétaire peut faire, y compris gérer les utilisateurs. La clé de ce compte se garde donc comme un mot de passe.

## 3. Ajouter le secret (GitHub)

1. Retrouver le fichier de clé JSON du compte de service (celui que le script de virtuoseweb.fr utilise sur ton poste, nommé `master-well-486317-d9-<identifiant>.json`).
2. Dans le repo `virtuoseweb/waimia-web` : « Settings », « Secrets and variables », « Actions », « New repository secret ».
3. Nom : `GSC_SERVICE_ACCOUNT_JSON`. Valeur : le contenu entier du fichier JSON (de `{` à `}`).

Avec le client GitHub, sans afficher la clé :

```bash
gh secret set GSC_SERVICE_ACCOUNT_JSON --repo virtuoseweb/waimia-web < chemin/vers/la-cle.json
```

Si le fichier de clé est perdu : une clé ne se retélécharge pas, il faut en créer une nouvelle. L'ancienne continue de fonctionner tant qu'elle n'est pas supprimée, donc le script de virtuoseweb.fr n'est pas touché.

```bash
gcloud iam service-accounts keys create cle-waimia.json \
  --iam-account=indexing-api-virtuoseweb@master-well-486317-d9.iam.gserviceaccount.com \
  --project=master-well-486317-d9
```

Le fichier ne se commite jamais, dans aucun repo. Après l'avoir collé dans le secret, le ranger dans un gestionnaire de mots de passe ou le supprimer. Si la création de clé est refusée : dans les organisations Google Cloud créées depuis le 3 mai 2024, la règle `iam.disableServiceAccountKeyCreation` est active par défaut, et un administrateur de l'organisation doit la lever pour ce projet.

## 4. Premier lancement, avec la première passe de l'Indexing API

1. Onglet « Actions » du repo, workflow « Routine SEO · collecte hebdomadaire », « Run workflow » sur `main`. Cocher **« Indexing API : première passe complète »**, ne pas cocher la simulation.
2. Ouvrir le run : le résumé liste chaque étape. Les trois étapes `gsc-*` et l'étape `indexing-api` doivent être `ok`, avec une ligne « Indexing API : soumis (N URL soumises…) ».
3. Un commit `chore(seo-data): collecte AAAA-Www` apparaît sur `main`, avec `docs/seo/data/latest.json` et `docs/seo/data/state/indexing-api.json` (l'historique des URL soumises).

Pour voir ce qui partirait sans rien envoyer : cocher la simulation à la place. Elle n'écrit ni état ni commit.

À quoi sert l'option de première passe : elle soumet tout le sitemap, sans tenir compte de l'historique. Au tout premier lancement, l'historique est vide, donc toutes les URL sont « nouvelles » et partent de toute façon ; l'option sert surtout à forcer une nouvelle passe complète plus tard, après une refonte. Ne pas la cocher en routine : resoumettre des pages inchangées consomme le quota pour rien. Le sitemap compte 74 URL le 4 octobre 2026, sous le plafond de 200 par jour ; au-delà, le reste part à la collecte suivante.

Attendre au moins 60 secondes entre la création d'une clé et ce premier lancement : une clé toute neuve peut être refusée.

Si une étape est en erreur :

| Message | Cause | Correction |
| --- | --- | --- |
| `API Google 403` avec « permission » (étapes `gsc-*`) | Le compte de service n'est pas ajouté à la propriété, ou la propriété n'est pas celle de domaine. | Refaire l'étape 2 sur la propriété `waimia.com` de type domaine. |
| `API Google 403` avec « has not been used in project » ou « is disabled » (étapes `gsc-*`) | « Google Search Console API » n'est pas activée dans le projet. | Refaire l'étape 1.2. |
| `Indexing API 403 : … n'est pas propriétaire de sc-domain:waimia.com` | Le compte de service est absent de la propriété, ou n'y a qu'un accès complet ou limité. | Étape 2, avec l'autorisation « Propriétaire ». |
| `Indexing API 403 : l'API n'est pas activée` | « Web Search Indexing API » n'est pas activée dans le projet. | Étape 1.3, attendre quelques minutes, relancer. |
| `Indexing API 429` ou état « quota atteint » | Les 200 soumissions du jour sont consommées. Le quota est celui du projet Cloud, donc partagé avec virtuoseweb.fr. | Rien : le reste part à la collecte suivante. |
| `échec OAuth2` | Le secret est tronqué ou n'est pas le fichier de clé. | Recoller le JSON entier à l'étape 3. |
| `non configuré` | Le secret n'existe pas ou porte un autre nom. | Vérifier le nom exact `GSC_SERVICE_ACCOUNT_JSON`. |

Pour vérifier le secret depuis un poste, sans l'afficher : `GSC_SERVICE_ACCOUNT_JSON="$(cat cle.json)" node scripts/seo-routine/gsc-auth.mjs` liste les propriétés visibles par le compte et son niveau d'accès (`siteOwner` attendu pour `sc-domain:waimia.com`).

### Variante : un compte de service neuf

Possible si tu préfères séparer waimia.com de virtuoseweb.fr (quota de 200 par jour non partagé, clé distincte). Dans le projet Cloud de ton choix : activer les deux API de l'étape 1, puis « IAM et administration », « Comptes de service », « Créer un compte de service » (aucun rôle à donner), onglet « Clés », « Ajouter une clé », « Créer une clé », type JSON. Reprendre ensuite les étapes 2 à 4 avec l'adresse du nouveau compte.

## 5. Facultatif : Bing Webmaster Tools

La routine prévient déjà Bing par IndexNow, sans compte. Déclarer le site dans [Bing Webmaster Tools](https://www.bing.com/webmasters) sert seulement à voir les URL reçues et l'état d'indexation côté Bing (le site peut y être importé depuis Search Console).

La clé IndexNow n'est pas un secret : c'est le fichier `public/34c4e7bcd4aa2c942247305687c341d9.txt`, servi à la racine du site, qui prouve que l'envoi vient du propriétaire. Tant que ce fichier n'est pas en production, la routine n'envoie rien et l'indique (« clé non déployée »).

## 6. Planifier la session Claude

La collecte tourne le lundi à 04:30 UTC. Planifier la session Claude hebdomadaire après (le lundi en début de matinée, heure de Paris), avec pour consigne : « Exécute `docs/seo/ROUTINE.md` dans le repo `virtuoseweb/waimia-web`. »

## Ce que la routine fait pour l'indexation, et ce que Google garantit

Trois mécanismes tournent à chaque collecte.

**Le socle : sitemap et inspection d'URL (API Search Console).** La routine resoumet `https://waimia.com/sitemap-index.xml`, inspecte chaque URL du sitemap (verdict, motif, dernière exploration, canonique retenue par Google) et compare à la semaine précédente. C'est la voie que Google documente pour des pages ordinaires, avec le maillage interne. L'inspection lit l'état d'indexation, elle ne demande rien.

**L'Indexing API de Google, en complément et sans garantie.** Le script `scripts/seo-routine/indexing-api.mjs` notifie Google (`urlNotifications.publish`, type `URL_UPDATED`) pour chaque URL du sitemap nouvelle ou dont le `lastmod` a changé depuis sa dernière soumission, les pages relevées non indexées par l'inspection en premier. Une URL inchangée n'est jamais resoumise.

Ce que dit la documentation de Google, lue le 4 octobre 2026 (pages mises à jour le 16 juillet 2026) :

- l'API est réservée à deux types de pages : « The Indexing API can only be used to crawl pages with either `JobPosting` or `BroadcastEvent` embedded in a `VideoObject`. » Le guide d'utilisation la présente ainsi : « You can use the Indexing API to tell Google to update or remove job posting or livestreaming event pages from the Google index. » ;
- une réponse 200 n'est pas une promesse : « An HTTP 200 response means that Google may try to recrawl this URL soon » ;
- le quota par défaut est donné pour la prise en main et les essais, et l'usage demande une approbation : « The Indexing API provides a default 200 quota for API onboarding and submission testing, and it requires additional approval for usage and resource provisioning. » ;
- les envois sont filtrés : « All submissions through the Indexing API undergo rigorous spam detection. Any attempts to abuse the Indexing API, including the use of multiple accounts or other means to exceed usage quotas, may result in access being revoked. »

Les pages de waimia.com ne sont ni des offres d'emploi ni des diffusions en direct : cet usage sort donc du cadre documenté. Simon utilise déjà l'API de cette façon sur virtuoseweb.fr et a choisi de la réutiliser ici, en connaissance de cause. Ce que cela implique :

- Google peut ignorer ces notifications pour des pages ordinaires. Rien ne garantit une exploration, encore moins une indexation.
- L'effet se mesure, il ne se suppose pas : seule l'inspection d'URL (`indexation` dans `latest.json`) dit si une page est indexée.
- L'accès peut être retiré par Google. Le compte de service étant commun, un retrait toucherait aussi virtuoseweb.fr. La routine reste sobre pour cette raison : uniquement des URL du sitemap de waimia.com, uniquement nouvelles ou modifiées, 200 par jour au plus, une requête toutes les 500 ms, un seul compte.
- Si l'étape tombe (403, quota, retrait d'accès), le reste de la routine n'en dépend pas.

Quotas par défaut de l'Indexing API, par projet Google Cloud : 200 requêtes `publish` par jour, 180 lectures de métadonnées par minute, 380 requêtes par minute au total. Le projet `master-well-486317-d9` étant commun, les 200 par jour se partagent avec virtuoseweb.fr. Le compteur local de la routine ne connaît que ses propres envois (il repart à minuit, heure du Pacifique) ; si Google répond 429 avant, le lot s'arrête et le reste part à la collecte suivante. Pour réserver une part à virtuoseweb.fr, abaisser le plafond avec la variable d'environnement `INDEXING_DAILY_CAP` (par exemple `100`).

**IndexNow, pour les autres moteurs.** Bing, Yandex, Seznam et Naver. Google n'y participe pas.

Le bouton « Demander l'indexation » de Search Console reste manuel : le compte rendu hebdomadaire dit quand une page le mérite.

Après la fusion d'une PR de contenu, il n'y a rien à lancer : les pages créées ou modifiées (celles dont `updatedAt`, donc le `lastmod` du sitemap, a changé) partent à la collecte suivante, par IndexNow et par l'Indexing API. Pour ne pas attendre le lundi, lancer le workflow à la main (sans cocher la première passe).

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
| `node scripts/seo-routine/run.mjs` | Collecte complète, écrit `docs/seo/data/`. `--dry-run` : aucune écriture externe. `--indexing-all` : première passe complète de l'Indexing API. `--only=feeds,competitors` : étapes choisies. `SEO_DATA_DIR=<dossier>` : écrit ailleurs (essai local). |
| `node scripts/seo-routine/indexing-api.mjs` | Indexing API seule : URL nouvelles ou modifiées. `--all` : tout le sitemap. `--dry-run` : liste ce qui partirait. `--url <url>` : soumet une URL précise. `--status <url>` : dernière notification connue de Google pour cette URL (`urlNotifications.getMetadata`). Demande `GSC_SERVICE_ACCOUNT_JSON` dans l'environnement. |
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
- Indexing API, pages concernées, détection du spam et approbation (lu le 4 octobre 2026, page mise à jour le 16 juillet 2026) : <https://developers.google.com/search/apis/indexing-api/v3/quickstart>
- Indexing API, prérequis (compte de service propriétaire délégué) : <https://developers.google.com/search/apis/indexing-api/v3/prereqs>
- Indexing API, utilisation (`publish`, `metadata`, sens de la réponse 200) : <https://developers.google.com/search/apis/indexing-api/v3/using-api>
- Indexing API, quotas : <https://developers.google.com/search/apis/indexing-api/v3/quota-pricing>
- Indexing API, erreurs (403, 429) : <https://developers.google.com/search/apis/indexing-api/v3/core-errors>
- IndexNow : <https://www.indexnow.org/documentation>
- Vercel, `ignoreCommand` et `git.deploymentEnabled` : <https://vercel.com/docs/project-configuration/vercel-json>, <https://vercel.com/docs/project-configuration/git-configuration>
