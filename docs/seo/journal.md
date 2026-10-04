# Journal de la routine SEO/GEO

Une entrée par semaine, la plus récente en haut. Écrit par la session Claude hebdomadaire (voir `docs/seo/ROUTINE.md`, section 9). Chaque entrée dit ce qui a été fait, pourquoi, et quoi mesurer ensuite. Les chiffres viennent de `docs/seo/data/` : aucun chiffre de mémoire, aucun chiffre estimé.

## Modèle d'entrée

```markdown
## AAAA-Www (collecte du JJ mois AAAA)

**Données** : Search Console configuré oui/non · étapes en erreur : aucune / liste.

**KPI** (28 jours, variation contre les 28 précédents) : clics N (±N) · impressions N (±N) · CTR N % · position N (±N) · pages indexées N sur N.

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

### 2026-W40 (4 octobre 2026) · mise en place

**Données** : Search Console non configuré (secret `GSC_SERVICE_ACCOUNT_JSON` absent). Aucune collecte commitée à cette date.

**Actions de la semaine** : aucune action de contenu. Mise en place de l'outillage : scripts `scripts/seo-routine/`, workflow `.github/workflows/seo-routine.yml`, runbook, mots-clés suivis (66), flux (25), concurrents (5).

**État de départ connu** (brief Semrush d'octobre 2026, hors Search Console) : score d'autorité 2 ; 9 pages indexées sur 96 avant la refonte, 81 « détectée, actuellement non indexée ». Le sitemap de production compte 74 URL le 4 octobre 2026.

**À mesurer** : à la première collecte avec Search Console, relever le nombre de pages indexées et les KPI sur 28 jours. Ils servent de point zéro pour toutes les entrées suivantes.

**Pour Simon** : faire la mise en route de `docs/seo/SETUP.md`.
