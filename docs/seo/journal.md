# Journal de la routine SEO/GEO

Une entrée par semaine, la plus récente en haut. Écrit par la session Claude hebdomadaire (voir `docs/seo/ROUTINE.md`, section 9). Chaque entrée dit ce qui a été fait, pourquoi, et quoi mesurer ensuite. Les chiffres viennent de `docs/seo/data/` : aucun chiffre de mémoire, aucun chiffre estimé.

## Modèle d'entrée

```markdown
## AAAA-Www (collecte du JJ mois AAAA)

**Données** : Search Console configuré oui/non · étapes en erreur : aucune / liste.

**KPI** (28 jours, variation contre les 28 précédents) : clics N (±N) · impressions N (±N) · CTR N % · position N (±N) · pages indexées N sur N.

**Brave** : N URL dans la file de la semaine (`brave.count`), à soumettre par la tâche Brave.

**Bilan mensuel** (premier lundi du mois seulement, runbook section 13) : évolution sur quatre semaines contre la référence · ce qui a marché ou non · changements proposés.

**Bilan des actions précédentes**
- AAAA-Www, `/chemin`, requête « … » : gagné / stable / perdu / trop tôt / non mesurable. Avant : position N, N impressions. Maintenant : position N, N impressions. Indexée : oui depuis le … / non (motif).

**Actions de la semaine** (PR #N)
1. Révision / création / fusion de `/chemin`.
   - Pourquoi : règle 4.x du runbook, avec la donnée qui l'a déclenchée.
   - Ce qui a changé : …
   - Sources lues : lien (vérifié le JJ mois AAAA).
   - À mesurer : `/chemin`, requête « … » : valeur de départ. Attendu : … À juger à partir de AAAA-Www.

**Non retenu cette semaine** : ce qui a été envisagé et écarté, en une ligne chacun.

**Pour Simon** : décisions attendues.
```

## Entrées

### 2026-W41 (session du 5 octobre 2026, données de la collecte du 4 octobre 2026)

**Données** : la collecte planifiée du lundi 5 octobre (04:30 UTC) n'avait pas tourné à 06:10 UTC : aucun run `schedule` du workflow `seo-routine.yml`, `latest.json` toujours en `2026-W40`. La session a travaillé sur la collecte W40 du 4 octobre 2026 à 21:20 UTC (Search Console configuré : oui, 7 étapes `ok`), comme le prévoit la section 10 du runbook. Flux et concurrents relancés en local sans rien commiter (`--dry-run --only=feeds,competitors`) : 137 entrées, 0 flux en erreur, 0 URL nouvelle chez les 5 concurrents. Aucune mesure nouvelle de performance ni d'indexation depuis l'entrée précédente.

**KPI** (collecte W40, 28 jours du 4 septembre au 1er octobre 2026, contre les 28 précédents) : clics 4 (±0) · impressions 193 (+122) · CTR 2,07 % · position 23,3 (-15,4) · pages indexées 38 sur 73. Sur 7 jours (25 septembre au 1er octobre) : clics 2 (+2) · impressions 109 (+61) · position 26,8 (+9,9).

**Brave** : file non calculée (la clé `brave` n'existe pas encore dans `latest.json` : la collecte W40 est antérieure à l'étape `brave-queue`). Le sitemap construit depuis `main` compte 88 URL contre 73 à la collecte : 15 pages nouvelles, listées dans le compte rendu.

**Bilan mensuel** (premier lundi d'octobre) : une seule collecte existe, celle qui sert de référence (38 pages indexées sur 73 ; avant refonte, du 30/06 au 29/09/2026, 92 jours : 16 clics, 322 impressions). Aucune évolution sur quatre semaines n'est mesurable. Sur les 28 derniers jours : 4 clics, 193 impressions. Mots-clés de priorité 1 : 1 visible sur 26 (« agence n8n », 1 impression). Aucun changement proposé à `keywords.json`, `feeds.json` ou `competitors.json`. Changement proposé hors fichiers : l'horaire (voir « Pour Simon »). Premier bilan complet : lundi 2 novembre 2026.

**Bilan des actions précédentes** : aucune action de contenu antérieure à mesurer. Les refontes fusionnées les 4 et 5 octobre (#56, #61, #67) sont postérieures à la fenêtre de données (arrêtée au 1er octobre) : trop tôt.

**Points de lecture de la collecte W40**
- Indexation : 35 pages non indexées, toutes à `weeksNotIndexed` 0 (première mesure). La règle des trois collectes (4.1, règle 3) ne se déclenche pas avant W44.
- `/implantations` et `/implantations/bordeaux` vues « exclue par la balise noindex » : explorations du 25 juillet et du 23 septembre, avant la refonte. Le build de production du 5 octobre sert `index, follow` sur les deux (vérifié dans `dist/client`). Pas de bug : attendre la réexploration.
- Canonique : Google retient `https://waimia.com` pour `https://waimia.com/` (barre finale). Sans conséquence.
- `strikingDistance` et `lowCtrPages` vides. `/implantations/montpellier` : 26 impressions en position 54,8, sur « agence airtable montpellier » et « agence no code montpellier », hors positionnement : rien à faire.
- Flux : Claude Sonnet 5.5 (28 septembre), GPT-6.1 Sol et annonces du DevDay d'OpenAI (29 septembre). Les pages qui citent des modèles (`claude-platform-vs-openai-platform`, formations) les nomment déjà.

**Actions de la semaine** (PR de la branche `feat/seo-2026-W41`)
1. Révision de `/ressources/comparatifs/claude-vs-chatgpt-pme`.
   - Pourquoi : règle 4.1, contenu incomplet (la page écrivait ne pas avoir pu relire les prix et les conditions d'OpenAI et renvoyait le lecteur au site d'OpenAI pour la moitié du tableau), sur la page qui porte le mot-clé de priorité 1 « claude vs chatgpt » : 21 impressions et position 13,4 sur 28 jours, requêtes « chatgpt vs claude » (position 7,5), « comparaison entre claude et chatgpt » (7), « abonnement claude vs chatgpt » (10). Les sources d'OpenAI ont pu être lues le 5 octobre.
   - Ce qui a changé : colonne ChatGPT complétée (offre ChatGPT Business, prix, sièges, données, MCP) ; constat « même prix public des deux côtés » en réponse directe ; exemple de coût illustratif (10 sièges) ; limites des engagements sur les données ; avertissement d'OpenAI sur les serveurs MCP ; sections « Ce qui peut rater » et limites du comparatif (hébergement, conservation, Copilot et Gemini non traités) ; question de FAQ reprise de la requête réelle « abonnement claude vs chatgpt » ; lien vers le modèle de charte IA à la place d'une page de service ; meta description ; `updatedAt` au 5 octobre.
   - Sources lues : <https://claude.com/pricing>, <https://support.claude.com/en/articles/9266767-what-is-the-team-plan>, <https://help.openai.com/en/articles/8792828-what-is-chatgpt-business>, <https://openai.com/business/pricing/>, <https://openai.com/enterprise-privacy/> (page datée du 8 janvier 2026), <https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt> (vérifiées le 5 octobre 2026). Non relues ce jour, donc gardées avec leur date du 4 octobre dans la page : centre de confidentialité d'Anthropic, annonce du protocole MCP.
   - À mesurer : `/ressources/comparatifs/claude-vs-chatgpt-pme` : 21 impressions et position 13,4 sur 28 jours à la collecte du 4 octobre ; requête « chatgpt vs claude » : position 7,5 (2 impressions) ; mot-clé suivi « claude vs chatgpt » : aucune impression. Attendu : position de la page sous 10 et plus de 30 impressions sur 28 jours. À juger à partir de 2026-W44 (deux collectes complètes après la mise en production), `trop tôt` avant.

**Non retenu cette semaine**
- Créer une page pour une requête sans cible (« n8n prix », « ia expert comptable », « automatisation rh », « automatisation comptabilité », « agence ia paris », « agence ia toulouse ») : 15 pages viennent d'être publiées et ne sont pas encore mesurées ; `/implantations/paris`, `/cas-usages/rh` et `/cas-usages/finance-comptabilite` existent désormais et peuvent porter trois de ces requêtes (cibles à renseigner au bilan de novembre, une fois les pages vues par Google).
- Retoucher `/blog/agent-ia-vs-automatisation-classique-2026` (« explorée, non indexée », cite Claude Sonnet 4.6 en exemple) : première semaine de mesure, à reprendre si elle reste non indexée.
- Traiter les 4 pages « explorée, non indexée » (`/tarifs`, `/services/sequences-de-suivi`, deux articles) : explorations de juillet, antérieures à la refonte ; attendre la réexploration.

**Pour Simon**
- La session tourne avant la collecte : décaler l'un des deux horaires (par exemple la collecte le dimanche soir), sinon la session lira chaque lundi les données de la semaine précédente.
- Date du sitemap : `lastmod` vient de la date du commit. Si la collecte du 5 octobre tourne avant la fusion de cette PR et que la fusion a lieu le même jour, la page révisée garde `lastmod` 2026-10-05 et ne sera pas renvoyée à Google ni à Bing : « Demander l'indexation » à la main dans Search Console pour cette URL après la fusion.
- `src/data/lastmod.generated.json` n'a pas pu être régénéré ici (clone superficiel) : sa valeur pour la page est déjà 2026-10-05.

### 2026-W40 (4 octobre 2026) · mise en service

**Données** : Search Console configuré : oui. Étapes en erreur : aucune. Première collecte complète le 4 octobre 2026 (`docs/seo/data/2026-W40/`) : 7 étapes `ok`.

**Mise en route faite** (`docs/seo/SETUP.md`) : API activées dans le projet `master-well-486317-d9`, compte de service propriétaire de `sc-domain:waimia.com`, secret `GSC_SERVICE_ACCOUNT_JSON` posé.

**KPI** (28 jours, du 4 septembre au 1er octobre 2026, contre les 28 précédents) : clics 4 (±0) · impressions 193 (+122) · CTR 2,07 % · position 23,3 (-15,4) · pages indexées 38 sur 73.

**Point zéro de l'indexation** (inspection d'URL, 73 URL du sitemap) : 38 indexées · 14 « détectée, actuellement non indexée » · 15 « Google ne reconnaît pas cette URL » · 4 « explorée, actuellement non indexée » · 2 « exclue par la balise noindex ».

**Référence d'avant refonte** (Search Console, du 30/06 au 29/09/2026, 92 jours) : 16 clics, 322 impressions. Ces deux points servent de référence au bilan mensuel (runbook, section 13).

**Soumissions du 4 octobre 2026** : 73 URL notifiées à Google par l'Indexing API (passe complète, 0 erreur, quota 73 sur 200) ; 73 URL envoyées à IndexNow (réponse « envoyé, clé en cours de validation ») ; les 73 URL soumises une première fois à Brave Search, à la main, par le formulaire <https://search.brave.com/submit-url>. Ce sont des notifications envoyées, pas des pages indexées.

**Ajout du 4 octobre 2026 (PR Brave et bilan mensuel)** : la collecte calcule désormais la file des URL à soumettre à Brave (`scripts/seo-routine/brave-queue.mjs`, clé `brave` de `latest.json`), sans rien soumettre, Brave n'ayant pas d'API. La soumission se fait par le navigateur de Simon, dans la tâche planifiée « Soumission Brave hebdomadaire Waimia ». Le runbook gagne les sections 12 (Brave Search) et 13 (bilan mensuel), et la règle des pages non indexées depuis plus de trois collectes.

**Actions de la semaine** : aucune action de contenu.

**À mesurer** : à partir de 2026-W41, le nombre de pages indexées contre le point zéro (38 sur 73), et le sort des 18 pages « détectée » ou « explorée, non indexée » : celles qui le sont encore après trois collectes appellent une décision (runbook, 4.1, règle 3). Premier bilan mensuel : lundi 2 novembre 2026.

**Pour Simon** : rien à configurer. La file Brave sera vide à la première collecte (amorçage sur le sitemap du 4 octobre 2026, déjà soumis à la main).

### 2026-W40 (4 octobre 2026) · mise en place

**Données** : Search Console non configuré (secret `GSC_SERVICE_ACCOUNT_JSON` absent). Aucune collecte commitée à cette date.

**Actions de la semaine** : aucune action de contenu. Mise en place de l'outillage : scripts `scripts/seo-routine/`, workflow `.github/workflows/seo-routine.yml`, runbook, mots-clés suivis (66), flux (25), concurrents (5).

**Ajout du 4 octobre 2026 (PR Indexing API)** : la collecte notifie désormais Google par l'Indexing API (`scripts/seo-routine/indexing-api.mjs`) pour les URL du sitemap nouvelles ou modifiées, pages non indexées en premier, 200 par jour au plus, avec le compte de service déjà utilisé pour virtuoseweb.fr. Usage hors du cadre documenté par Google (API réservée aux offres d'emploi et aux diffusions en direct) : aucune garantie d'exploration ni d'indexation, à juger sur `indexation` dans `latest.json`. Aucun appel réel à cette date (secret absent).

**État de départ connu** (brief Semrush d'octobre 2026, hors Search Console) : score d'autorité 2 ; 9 pages indexées sur 96 avant la refonte, 81 « détectée, actuellement non indexée ». Le sitemap de production compte 74 URL le 4 octobre 2026.

**À mesurer** : à la première collecte avec Search Console, relever le nombre de pages indexées et les KPI sur 28 jours. Ils servent de point zéro pour toutes les entrées suivantes.

**Pour Simon** : faire la mise en route de `docs/seo/SETUP.md` (activer « Google Search Console API » dans le projet `master-well-486317-d9`, ajouter le compte de service comme propriétaire de `sc-domain:waimia.com`, créer le secret, lancer le workflow avec la première passe).
