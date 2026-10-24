# Stratégie SEO/GEO waimia.com · 13 octobre 2026

**Sources.** [W] Overview waimia, [BL] Backlinks, [SA] Site Audit et mega_export, [CWV] Core Web Vitals, [S4] `waimia strat claude.md`, [A5] `audit seo 5 octobre maj.md`, [KP] Positions kayro, [K] kayro xlsx, [IP] Overview ia4ops, [I] ia4ops xlsx, [L] lucas xlsx, [N] noiise Positions, [N2] noiise_fr, [F] formation bulk, [C] `concurrents.md`, [G] git, [P] mesures live du 13 octobre. xlsx = extraits.

## 1. Diagnostic

1. **0 visite, 2 mots-clés** (« wimea » 58e, « hymaïa » 30e), contre 3 le 3 octobre [W][S4 l.33].
2. **336 domaines référents** contre 244 le 3 octobre. 26 des 100 listés sont vus du 3 au 9 octobre ; 57 % des ancres vendent des liens ; Singapour et Moldavie 98 % des pays localisés [BL].
3. **Santé 94 %, IA 95 %**, 164 URL dont 35 variantes `/contact?` : les 46 erreurs en venaient, corrigées le 13 [SA][G 73ad74ee]. LCP 2,6 à 3,0 s sur 6 pages sur 10 [CWV].
4. **Le site grossit** : 88 URL le 5 octobre [A5], 158 le 13. 37 URL du sitemap manquent au crawl du 9 [SA][G].
5. **Fusions du 4 octobre défaites** : `astro.config.mjs:304-313` (commit 936e04f0) redirigeait 7 slugs ; aucune redirection aujourd'hui, 7 pages en 200. Cinq restaurées le 12 par commit nommé, plus wordpress et webflow [G][P].
6. **Format à parité** : Kayro 3 880 à 4 430 mots, requête en H1 ; Lucas 4 010 mots ; Waimia 3 030 à 4 980 [P]. L'écart est l'autorité.
7. **Trafic concentré** : Kayro, 10 mots-clés, 39 % de marque [KP] ; AI Overview : Lucas 1 641 de 2 972 visites, 54 mots-clés dont 46 en position 1 [L], noiise 2 796 de 27 701 [N]. Ses 410 requêtes en question : 100 visites [N], donc PAA et FAQ ne sont pas un levier.
8. **ia4ops** vit de pages outil (airtable : 40 500 recherches, 14 visites) [I].

## 2. Six chantiers

1. **Trancher les 37 pages du 12 octobre** (contradiction avec la décision du 4, à trancher par Simon : garder, 301, noindex). Haut, 0,5 j. `astro.config.mjs`, `src/content/services/**`. Preuve : sitemap de `dist`, 301 dans `.vercel/output/config.json`.
2. **Liens crédibles** : fiche France Num citant waimia.com, French Tech Bordeaux si éligible, index-ia.fr, agences-web-france.com [IP], crédit « Réalisé par Waimia » (absent du pied de page Amploi, capture du 5). Haut, 2 j. Preuve : `curl` de la fiche, `grep waimia.com`.
3. **Mesure** : indexation demandée pour 10 pages, inspection de 10 des 37, suivi des 25 requêtes [C], Actions manuelles GSC (désaveu seulement si action manuelle, selon Google). Moyen, 2 h/sem. Preuve : rapport Pages avant/après.
4. **Renforcer sans créer** (section 3) : `formations/make`, `formations/n8n`, `claude-skills`. Haut, 3 j. Preuve : mots et H2 mesurés, positions suivies.
5. **H1 « Agence GEO »** sur `referencement-ia` ; retitrer le blog GEO. Moyen, 1 h. Preuve : `grep` dans `dist`.
6. **LCP** de 6 pages : CSS bloquant [CWV]. Bas, 3 j. Preuve : nouvel audit, 10 pages « Good ».

## 3. Quinze contenus

Aucune page neuve. Volume et KD : export cité.

1. **claude skills** et 6 variantes : 7 260, KD 9 à 26, Lucas 26e à 52e [L]. Info. `/ressources/guides/claude-skills`. Renforcer : un H2 par variante.
2. **agent ia c'est quoi**, 5 variantes : 1 080, KD 47 à 53 [K][I]. Info. `/ressources/guides/agent-ia-definition`. Définition de 50 mots en tête ; mesurer d'abord.
3. **diag data ia, diag ia bpi** : 420, KD 12 à 33 [I]. Financement. Guide `financement-formation-ia-opco`. Section ajoutée ; lire bpifrance.fr avant.
4. **formation make** : 720, KD 12 [F]. Transactionnelle. `/formations/make` (1 895 mots). Vers 3 000 mots, programme par module.
5. **formation n8n** : 1 000, KD 23 [F]. `/formations/n8n`. Idem ; annonces présentes [F].
6. **formation claude, claude code** : 470, KD 10 à 13, tendance de 0 à 0,6 [F]. Garder les deux pages, tableau des niveaux.
7. **formation ia bordeaux** 210 (0,23 à 1,00) et **lyon** 390 [F]. `/implantations/bordeaux`, `/lyon`. H2 Formation à Lyon.
8. **formateur ia** 390 KD 10, **formation ia qualiopi** 170 KD 6 [F]. `/formations`. Qualiopi = Akigora [S4 l.560].
9. **geo seo** 1 900 KD 34, **generative engine optimization** 1 300 KD 64 [N]. Info. Blog GEO : retitrer ; texte commun avec le service 1,8 % [P].
10. **agence geo** 2 900 KD 27, noiise 4e [N]. `/services/referencement-ia`. H1.
11. **make automatisation** 590 KD 19 [K]. `/services/automatisation-make` : H2.
12. **audit ia entreprise** 90 KD 7, **audit intelligence artificielle** 140 KD 20 [K]. `/audit-ia-pme` : H2.
13. **n8n vs make** 590 KD 31 [S4 l.308]. Fusion à trancher entre `n8n-vs-make` et `n8n-vs-make-vs-zapier` : 18,8 % commun [P].
14. **seo-geo-contenu et referencement-ia** : 22,4 % commun [P]. Fusion ou différenciation.
15. **agence no code** 1 600 KD 21 [I], **formation no code** 1 000 KD 28 [F]. Décision de Simon, aucune page à créer sans accord ; H2 « no-code » sur `/services/automatisations` seulement si l'offre le dit.

**Écartés** : airtable, lovable, Claude et WordPress (pages outil) ; gratuit, étudiant, moins cher (743 visites chez Lucas), origine (417) [L] : grand public.

## 4. Risques

- **Cannibalisation** : 8 groupes mesurés, 0,3 à 23,3 % de texte commun [P] : pas de doublon textuel ; risque SERP non mesuré.
- **Pages fines** : `pack-skills` 828 mots, `calculateur-roi` 724 (outils), `formations/make` 1 895 [P]. Kayro réutilise 4 H2 sur 9 entre villes et service [P] : à ne pas copier avec 81 pages non indexées [S4 l.14].
- **Indexation** : 9 sur 96 [S4 l.5] contre 38 sur 73 [A5 l.23], incompatibles. Chaque page ajoutée dilue.
- **Redirections** : si retrait, 301 prouvés dans la config Vercel.
- **Local** : LOCAL_BUSINESS sans adresse à Paris, Lyon, Montpellier [SA] ; aucune adresse fabriquée. Le local pack de noiise passe par 7 fiches [N2].

## 5. Non lu ou non conclu

- Aucun export Search Console : indexation, clics, requête « waimia » inconnus ; « 10 clics sur 16 » vient du 4 octobre [S4 l.13].
- Semrush ne voit pas « waimia » ; « wimea », « hymaïa » : marque non démontrée [W].
- xlsx = extraits ; lucasfonseque base US ignoré ; CSV noiise : 9 lignes, aucune tendance.
- PAA : présence seulement (19 sur 25 [F]), aucun texte de question.
- CWV : labo, 10 pages. Backlinks : 100 domaines sur 336 ; Kayro, Lucas, noiise absents.
- Tensoria, concurrent n° 1 [A5] : aucun export.
- Diag Data IA : conditions lues sur sites secondaires.
- Capture Amploi : site client, aucune donnée SEO ; l'audit du 9 précède les pages du 12.

## 6. Mise à jour du 24 octobre 2026 (décision de Simon)

**Ce qui change.** La section 3 (« Quinze contenus. Aucune page neuve ») reste vraie pour ses quinze lignes, mais n'est plus la règle pour le thème agents IA toujours actifs et moteurs ouverts : 22 pages sont créées (4 guides, 2 comparatifs, 3 pages de service dont deux sous-services, 13 billets), détail et cible de chacune dans `docs/seo/journal.md` (entrée du 24 octobre 2026) et `docs/seo/calendrier-editorial.json` (entrées `w43-*`).

**Chiffres recomptés.** Sitemap : 217 URL le 18 octobre, 239 le 24 octobre (+22). Indexées par Google à la dernière lecture : 143 sur 217 inspectées (65,9 %), 74 non indexées, 22 jamais inspectées ; le nombre d'URL indexées n'est pas remesuré (pas d'accès à Search Console depuis la session). Le risque 4 de ce document (« chaque page ajoutée dilue ») s'applique : suivi à la collecte W44, règle de repli proposée dans le journal.

**Menu.** L'offre « Agents IA open source » entre au menu Solutions (colonne Automatisation et agents IA), au pied de page et au plan du site ; Hermes Agent et OpenClaw sont des déclinaisons du méga-menu, liées depuis la page parente.
