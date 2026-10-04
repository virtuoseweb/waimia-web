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
