# Stratégie SEO, GEO et conversion de waimia.com · 10 novembre 2026

Sources : `perf46` = `docs/seo/data/2026-W46/gsc-performance.json` (collecte du 9/11, fenêtre 10/10 au 6/11) ; `sum46` = `docs/seo/data/2026-W46/summary.json` ; `idx` = `docs/seo/data/state/gsc-index.json` (inspection du 1/11) ; `jr` = `docs/seo/journal.md`. Sans source : « hypothèse ».

## Recommandation

Le goulot est la position, puis l'autorité, pas le contenu. Pendant quatre semaines : mesurer proprement après la panne, faire monter les pages déjà classées entre 9 et 20 plutôt qu'en créer, faire poser les dix annuaires par Simon, rendre les leads attribuables à un canal. Décision due demain, 11/11 : l'application de la règle des villes et secteurs (action 2). Proposition : réduire le plafond de créations de la routine tant que l'indexation n'est pas remesurée (action 11).

## 1. Point mesuré et diagnostic

| Mesure (28 jours, contre les 28 précédents) | Valeur | Source |
| --- | --- | --- |
| Clics | 52 (6) | `sum46` performance.kpi |
| Impressions | 11 114 (1 140) | idem |
| CTR / position | 0,47 % (0,53 %) / 31,8 (28,2) | idem |
| 7 jours : clics, position | 12 (26), 33,6 (27,1) | idem |
| Tendance, clics / impressions à 28 j (fin de fenêtre 8/10, 15/10, 22/10, 29/10, 5/11) | 5 / 1 007 · 9 / 1 932 · 17 / 4 652 · 39 / 7 690 · 53 / 10 701 | `summary.json` des collectes W41 à W45 |
| Indexées / inspectées (1/11) | 173 / 255 (80 / 120 au 11/10) | `summary.json` des collectes W44 et W41 |
| Sitemap en ligne le 10/11 | 274 URL | `curl` sitemap-0.xml ; `indexnow.json` : 274 |
| Liens entrants | 4 domaines (Search Console, 2/11) ; 336 domaines et 430 liens (Semrush, 9/10) | `jr`:352 ; PDF Backlinks |
| Leads réels | 0 du 17 au 27/10 ; non mesuré depuis | `jr`:670 |

**Où est le goulot**

- **Position (principal).** Sur les lignes de page, 9 022 des 11 574 impressions (78 %) sont sur des pages en position moyenne supérieure à 20 ; 19 pages à au moins 100 impressions n'ont aucun clic (7 008 impressions). 37 des 52 clics viennent de 72 pages en position 10 ou mieux (`perf46` byPage) : `/blog/claude-pro-vs-team` en fait 14 (position 8,2).
- **CTR.** Conséquence de la position : la tranche 20 à 50 donne 8 clics pour 7 707 impressions. Pas de réécriture de masse.
- **Autorité.** Semrush (PDF Domain Overview waimia) : 2 mots-clés, 0 visite, ancres de vente de liens sur 57 % des backlinks, domaines surtout de score 2 à 3. La requête de marque « waimia » : 1 impression sur 28 jours (`perf46` byQuery). Kayro tient 502 visites avec 167 mots-clés (PDF Positions kayro).
- **Indexation (secondaire).** 175 pages reçoivent des impressions, mais 27 URL étaient inconnues de Google le 1/11, dont 12 billets « IA par métier » (`idx`). Aucune mesure depuis : cinq étapes de la collecte du 9/11 sont en erreur (`sum46` steps), à cause de la panne 503 des 8 et 9/11 (`jr`:42, :76). Production rétablie : onze URL testées répondent 200 ; IndexNow envoyé le 10/11 à 10:56 UTC (`indexnow.json`).
- **Conversion.** Non mesurable à 52 clics en 28 jours. Hypothèse : les leads viendront d'abord de canaux directs (LinkedIn, annuaires).

**Lectures prudentes.** La baisse des clics à 7 jours (26 à 12) vient des billets d'actualité (ChatGPT dots Europe 4 puis 0, Claude Duet ou Cowork 3 puis 0, `perf46` previous7 et last7) ; interprétation sur de très petits nombres. Elle précède la panne (fenêtre close au 6/11) ; les fenêtres de W47 la contiendront. 27 % des impressions sont sur des requêtes anonymisées (8 056 sur 11 114 en byQuery) : « absent » n'est pas zéro.

**Groupe « application métier ».** La consigne cite environ 3 600 impressions ; je ne les retrouve pas. Mesuré : 2 189 sur la page `/blog/application-metier-exemples-pme` (`perf46` byPage), 2 038 sur 45 requêtes (byQuery, motif « métier »). Cannibalisation : « application métier sur mesure » (299 impressions, position 28,9, byQuery) est classée sur le billet, la cible étant `/services/applications-internes` (19 impressions, position 48,9). Le billet lie déjà le service avec l'ancre exacte : c'est la position qui pèche, pas le maillage.

## 2. Semrush et audits : ce qui reste

| Constat (source) | Statut | Preuve |
| --- | --- | --- |
| Santé 94 %, IA 95 %, 164 pages (Site Audit, 9/10) | Obsolète : aucun crawl depuis, 274 URL aujourd'hui ; **reste** : un nouveau crawl | `rapport-nuit`:205 |
| 35 hreflang et 33 « un seul lien » (variantes `/contact?offer=`) | Livré le 13/10 en fragment, **réapparu** : liens en `?offer=` (`conversion.ts`:9-13). Faux positif : canonical vers `/contact` (HTML servi le 10/11) | `rapport-nuit`:47 |
| 11 données structurées (`relatedLink`) | Fait | `rapport-nuit`:46 |
| 54 liens externes nofollow | Fait : 0 `nofollow` sur `/services/integration-claude` | audit 13/10, l.17 |
| Core Web Vitals : 6 pages sur 10 « à améliorer », LCP 2,6 à 3,0 s | **Reste** : trois mesures en désaccord (Lighthouse mobile en production, 1,8 à 2,6 s, `rapport-nuit`:19 ; mobile bridé, 0,5 à 0,8 s, :49) ; aucune donnée terrain lue | PDF CWV |
| 336 domaines référents, spam | Pas de désaveu sans action manuelle (`jr`:352) ; **reste** : de vrais liens | PDF Backlinks |
| 9 articles contre 499 chez Tensoria (audit 5/10) | Obsolète : 155 entrées publiées ou mesurées au calendrier | `calendrier-editorial.json` |
| 25 requêtes à plus forte opportunité (concurrents) | Pages faites ; **reste** la position : « agence ia lyon » 58,2 ; « agence n8n » 38,1 ; « formation make » 67,8 | audit 13/10 §3.32 ; `perf46` |
| Fiche France Num vers virtuoseweb.fr ; GBP ; Partner Network | **Reste**, hors dépôt (Simon) | `backlinks-annuaires.md`:28 |

Livré le 10/11 (PR #168), à ne pas reproposer : illustrations, deux articles d'offres, quatre pages « explorées non indexées » différenciées, maillage de chaque contenu vers le service de son silo.

## 3. Plan sur quatre semaines (10 novembre au 7 décembre)

Règle appliquée : pas de nouveau title sur une page modifiée depuis moins de trois semaines (`jr`:672, :1090) : `claude-pro-vs-team` et les six pages du 10/11 ; `application-metier-exemples-pme` et `applications-internes` (26/10) à partir du 16/11. Mesure par page, 7 jours après mise en ligne, sur collecte complète. Seuils de succès : hypothèses.

| # | Action | Cible, requête | Levier | Effort | Succès | Mesure |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Collecte complète après la panne, inspection des 27 inconnues | tout le site, requête : aucune | Indexation | 15 min | `freshness.mjs` complète ; moins de 27 inconnues | 16/11 |
| 2 | Règle du 14/10 (`jr`:1100), test en note ci-dessous | `/implantations/nantes`, `/secteurs/conseil`, `esn`, `industrie`, `startup-logiciel`, `agence`, `e-commerce` ; requête : sans objet | Décision | 30 min | Noindex posé ou date de mesure notée | 11/11, 15/11, 7/12 |
| 3 | Révision déjà planifiée W47 : définition en tête | `/blog/application-metier-exemples-pme`, « application métier définition » (194, position 19,3) | Contenu | 2 h | Position sous 15, premier clic | 7/12 |
| 4 | Révision déjà planifiée W46 | `/services/base-de-connaissance-ia`, « base de connaissance ia » (positions 14,3 à 16,6) | Contenu, méta | 2 h | Position sous 10 | 30/11 |
| 5 | Avancer la révision W48 en W47 | `/ressources/guides/claude-pme`, « diagnostic claude pme » (9,3), « claude pme » (16,8) ; title inchangé depuis la description du 14/10 (`jr`:653), test promis le 27/10 | Title, contenu | 2 h | « claude pme » sous 12 | 7/12 |
| 6 | Montpellier puis charte IA | `/implantations/montpellier`, « agence ia montpellier » (73, 15,9) ; `/ressources/outils/charte-ia-entreprise`, « charte ia pme » (15, 19,6) | Title, méta, preuve locale | 1 h chacune | Position sous 10 | 7/12 |
| 7 | Dix annuaires (section 5) | domaine entier, requête : aucune | Autorité | 4 h 30 (Simon) | Domaines référents réels : 4 aujourd'hui, objectif non chiffré | 30/11, 7/12 |
| 8 | Mesure des leads : obtenir la livraison du lot en cours (canal, UTM), UTM sur tout lien posé, une réservation Cal de test par Simon | formulaires, Cal ; requête : aucune | Conversion | 3 h | Première ligne de leads par canal et par page d'arrivée | 30/11 |
| 9 | Relevé GEO manuel de 8 requêtes dans un navigateur (aucune mesure à ce jour, `jr`:351) | « claude pme », « application métier », etc. | GEO | 30 min (Simon) | Base posée, puis comparaison | 16/11, 7/12 |
| 10 | Fusions `w47-fusion-*` : les quatre pages ont été différenciées le 10/11, six jours ne suffisent pas | calendrier ; requête : sans objet | Décision | 5 min | Jugement reporté à W49 ou confirmé par Simon | 16/11 |
| 11 | Ramener le plafond de 14 à 7 créations par semaine (hypothèse ; `check-calendar.mjs`:31, `ROUTINE.md`:7 et :148, décision de Simon) : indexation de 52 % (4/10) à 68 % (1/11) avec 14 URL toutes inconnues de Google (`jr`:339, :345), puis 19 URL de plus (sitemap 255 vers 274) | calendrier ; requête : sans objet | Cadence | 0 | Part indexée remesurée avant de relancer | 30/11 |

Action 2 : au 6/11, Nantes n'a aucune impression, ni les six secteurs autres que `batiment` (11 impressions, `perf46`) ; cette liste de six est déduite (secteurs indexables sans impression), git ne dit pas lesquels ont été créés les 12 et 13/10. Google les voyait « détectée, non indexée » ou « exclue par noindex » au 1/11 (`idx`), alors que le HTML servi le 10/11 est `index, follow` : zéro impression mesure l'indexation, pas la demande. Test proposé : noindex seulement pour une page indexée à l'inspection du 15/11 et sans impression sur les 28 jours suivants ; une page encore non indexée reçoit une dernière mesure le 7/12. Écart à confirmer par Simon.

Non retenu : titles de `/services/automatisation-n8n` (title du 16/10, classé « perdu », `jr`:89) et des villes (Toulouse : 759 impressions, position 45,1) : pas de levier de title à ces positions.

## 4. Conversion et leads

- **Parcours.** CTA unique « Réserver l'audit gratuit » vers `/contact?offer=audit-ia-pme&intent=audit` (`conversion.ts`:13), page `/audit-ia-pme` (44 impressions, position 33,8). Les deux billets les plus cliqués portent un lien d'audit et une ressource (`claude-pro-vs-team` : guide d'achat ; `claude-code-skills` : pack de skills).
- **Lead magnets.** Neuf ressources (`LEAD_MAGNETS`, `conversion.ts`:100) : six PDF livrés par e-mail, trois outils interactifs ; contenus dans `src/data/lead-magnets/` (quatre fichiers). 37 pages sur 200 ont une bande de capture le 16/10 (`rapport-nuit`:226). Prix : audit gratuit, sprint 999 € HT, pilote dès 2 000 € HT (`pricing.ts`).
- **Mesure en place.** Alertes `[Lead]` avec page d'arrivée, page précédente et source ; mêmes champs dans les journaux Vercel (`lead-source.ts`) ; Vercel Web Analytics sans événement personnalisé (`Base.astro`:24, `jr`:918).
- **Livré le 10/11 (PR #170 et suivante).** Canal, UTM et parcours sur chaque demande ; événements de conversion vers Vercel Web Analytics et Umami ; objectifs et entonnoirs Umami décrits dans `docs/mesure-des-leads.md`.
- **Ce qui manque.** (1) Canal par lead : livré. (2) Taux vue puis envoi par page : entonnoirs Umami en place, données à partir du 10/11. (3) Enregistrement des `metadata` par Cal : non vérifié (`rapport-nuit`:119). (4) Écart entre vues de `/bienvenue/contact` et alertes (`jr`:670). (5) Tableau mensuel : aucun, le comptage Gmail est manuel et date du 27/10.

## 5. Autorité : dix annuaires à faire par Simon

Comptes à son nom, rien d'inscrit. Source : `backlinks-annuaires.md`, tableau P1, n° 1 à 10 (prix du 21/10, à reconfirmer). Décisions préalables : URL de la fiche France Num ; adresse (Bordeaux avec justificatif, zone desservie ou attente d'une pièce) ; 150 € par an à French Tech Bordeaux ; clients citables.

| N° | Cible | Coût | Lien | Effort | Condition |
| --- | --- | --- | --- | --- | --- |
| 1 | France Num, fiche Activateur (pointe virtuoseweb.fr) | 0 | Suivi | 15 min | Accès au compte |
| 2 | Bing Places | 0 | Non vérifié | 15 min | Fiche Google alignée |
| 3 | French Tech Bordeaux | 150 €/an | Suivi | 30 min | Éligibilité à confirmer |
| 4 | La Fabrique du Net | 0 ; Premium 139 € HT/mois | Premium seulement | 45 min | Avis clients |
| 5 | Sortlist | 0 ; Sortlist+ 129 €/mois | Sortlist+ seulement | 40 min | Réalisations, avis |
| 6 | PagesJaunes | 0 | Non vérifié | 20 min | Décision d'adresse |
| 7 | Clutch | 0 ; Verified 499 $/an | Nofollow | 30 min | Avis |
| 8 | Europages | 0 | Non vérifié | 25 min | Compte |
| 9 | Apple Business | 0 | Non vérifié | 20 min | Marque sans lieu possible |
| 10 | impli.fr | non lu | Non vérifié | 20 min | Message de candidature |

Ordre : 1, 2, 3, puis 4, 5, 7 en une session, puis 10, 8, 9, enfin 6. Hors France Num et French Tech (seuls liens suivis constatés), ce sont surtout des citations (hypothèse). UTM `annuaire-<nom>` sur chaque fiche.

## Annexe : fichiers du dossier `waimia seo` (32) et apport

| Fichier | Apport |
| --- | --- |
| Backlinks Referring Domains waimia (PDF) | 336 domaines de spam, score 2 à 6 |
| Domain Overview waimia (PDF) | 2 mots-clés, 0 visite, 430 liens |
| Site Audit Overview (PDF) | 94 % et 95 %, 164 pages, 46 erreurs |
| Core Web Vitals (PDF) | 10 pages, LCP 2,6 à 3,0 s sur 6 |
| Issue Content not optimized (PDF) | 4 paragraphes longs, soldés |
| Issue Hreflang (PDF) | 35 variantes `/contact?` |
| Issue Invalid structured data (PDF) | 11 éléments : `relatedLink` ; `aggregateRating` et `review` des outils |
| Issue Nofollow (PDF) | 54 liens vers des sources |
| Issue One internal link (PDF) | 33 variantes de contact |
| Domain Overview ia4ops (PDF) | 65 visites, 773 domaines référents |
| Positions ia4ops (PDF) | 135 mots-clés, 100 lignes imprimées |
| Overview kayro (PDF) | 502 visites, 29 % sur « agence automatisation ia » |
| Positions kayro (PDF) | 167 mots-clés |
| Positions lucasfonseque (1) (PDF) | Base FR : 2,9 K visites, 1,5 K mots-clés |
| Positions lucasfonseque sans (1) (PDF) | Base US, 26 mots-clés : ignoré |
| Domain Overview lucasfonseque (PDF) | Base US, 0 visite : ignoré |
| Positions noiise (PDF) | 27,7 K visites, 15 K mots-clés |
| ia4ops.com_fr.xlsx | 109 lignes (extrait) : airtable, prompt optimizer |
| kayro.ai_fr.xlsx | 131 lignes (extrait) : 169 visites sur la page « agence automatisation ia » |
| lucasfonseque.fr_fr.xlsx | 481 lignes (extrait) : 54 en AI Overview |
| noiise.com_fr.xlsx | 919 lignes (extrait), fiches Google locales |
| noiise Positions xlsx | 14 986 lignes : aucune requête n8n ou Claude |
| noiise PositionChanges csv | 9 lignes, sans tendance |
| lucasfonseque Competitors csv | 1 515 domaines concurrents |
| formation-ia bulk xlsx | 25 requêtes : formation make 720, KD 12 |
| waimia mega_export xlsx | 164 pages ; pages par alerte : hreflang 35, données structurées 11, H1 = title 3, ratio 62, bloquées 2, nofollow 14, un seul lien 33, 403 externes 2, contenu 4 |
| waimia text_html_ratio xlsx | 62 pages, dont 35 variantes de contact |
| audit seo 5 octobre.md | Constats de départ : indexation, volume éditorial |
| audit seo 5 octobre maj.md | Mêmes constats, corrigés : 38 pages sur 73 |
| waimia strat claude.md | Pivot, volumes, fiches de pages |
| rapport-nuit-2026-10-15.md | Vagues 3 à 14, points ouverts |
| amploi_capture_site_homepage_entier.png | Accueil du site client Amploi, sans donnée SEO |
