# Journal de la routine SEO/GEO

Une entrée par semaine, la plus récente en haut. Écrit par la session Claude hebdomadaire (voir `docs/seo/ROUTINE.md`, section 9). Le numéro de l'entrée est la semaine ISO de la session ; la collecte lue peut porter le numéro de la semaine précédente (runbook, section 0). Chaque entrée dit ce qui a été fait, pourquoi, et quoi mesurer ensuite. Les chiffres viennent de `docs/seo/data/` : aucun chiffre de mémoire, aucun chiffre estimé.

## Modèle d'entrée

```markdown
## AAAA-Www (collecte du JJ mois AAAA)

**Données** : collecte du JJ mois AAAA à HH:MM UTC (`generatedAt`), fraîche oui/non (`freshness.mjs`) · Search Console configuré oui/non · étapes en erreur : aucune / liste.

**KPI** (28 jours, variation contre les 28 précédents) : clics N (±N) · impressions N (±N) · CTR N % · position N (±N) · pages indexées N sur N.

**Brave** : N URL dans la file du jour (`brave-queue.mjs --from-sitemap`), à soumettre par la tâche Brave.

**Bilan mensuel** (premier lundi du mois seulement, runbook section 13) : évolution sur quatre semaines contre la référence · ce qui a marché ou non · changements proposés.

**Bilan des actions précédentes**
- AAAA-Www, `/chemin`, requête « … » : gagné / stable / perdu / trop tôt / non mesurable. Avant : position N, N impressions. Maintenant : position N, N impressions. Indexée : oui depuis le … / non (motif).

**Actions de la semaine** (PR #N) : au moins une création et une à deux révisions (runbook, section 4). Sans création : la raison admise par la section 4.4, avec le fait qui la prouve.
1. Création / révision / fusion de `/chemin` (entrée `id` du calendrier).
   - Pourquoi : l'entrée du calendrier ou la règle 4.x du runbook, avec la donnée qui l'a déclenchée.
   - Recherche en ligne : requêtes cherchées ; pages lues, avec lien (lues le JJ mois AAAA) ; ce qu'elles couvrent, ce qui manque.
   - Ce qui a changé : …
   - Sources primaires : lien (vérifié le JJ mois AAAA).
   - À mesurer : `/chemin`, requête « … » : valeur de départ. Attendu : … À juger à partir de AAAA-Www.

**Calendrier** : livré cette semaine · prévu la semaine suivante · entrées ajoutées (avec leur origine) · entrées abandonnées ou replanifiées (avec la raison) · N semaines d'avance (`check-calendar.mjs`).

**Brouillon LinkedIn** : `docs/seo/posts/AAAA-Www.md` (à relire et à publier par Simon).

**Non retenu cette semaine** : ce qui a été envisagé et écarté, en une ligne chacun.

**Pour Simon** : décisions attendues.
```

## Entrées

### 2026-W41 · session d'audit du 5 octobre 2026 (hors cadence, demandée par Simon)

**Contexte.** Session lancée à la main par Simon après un audit SEO complet du site en ligne (88 URL du sitemap lues, concurrents, Search Console consulté dans son navigateur). Elle s'ajoute à la session W41 du matin (PR #69) : c'est une seconde PR la même semaine, avec trois créations au lieu du plafond de deux, sur demande explicite. Les trois créations sont avancées depuis le calendrier (W42, W43, W44).

**Données.** Search Console, interface, lu le 5 octobre 2026 : rapport Pages à jour au 21 septembre 2026 seulement (9 pages indexées, 87 non indexées dont 81 « détectée, actuellement non indexée ») ; il est antérieur à la refonte et à la collecte du 4 octobre (38 indexées sur 73 par inspection d'URL), qui reste la référence. Performances sur 3 mois (3 juillet au 2 octobre) : 15 clics, 468 impressions, position moyenne 26,8. Liens externes : 1 (cal.com). Sitemap `sitemap-index.xml` lu le 5 octobre, 92 pages découvertes. Core Web Vitals : non mesurés (analyse PageSpeed non aboutie).

**Constats de l'audit qui ont donné lieu à une action**
- Fichiers statiques servis avec `Cache-Control: public, max-age=0, must-revalidate`, y compris les fichiers hachés de `/_astro/` (relevé sur la production le 5 octobre).
- Hubs `/ressources/guides` et `/ressources/comparatifs` en noindex alors qu'ils listent 6 et 4 pages complètes, et que les fils d'Ariane et le balisage BreadcrumbList des pages filles pointent vers eux.
- `/blog/brain-circuit` (noindex) listé sur le hub blog.
- Description du hub blog sans mot-clé ; title « guide pillar » ; 6 titles de plus de 60 caractères.
- Requêtes sans page : « n8n prix », « agents ia c'est quoi », et « devis automatisé » portée par une page service.

**Actions** (PR #72, branche `feat/seo-audit-2026-10-05`)

1. Création de `/ressources/guides/n8n-prix` (entrée `w42-n8n-prix`).
   - Recherche en ligne : « n8n prix », « n8n tarif auto-hébergé coût serveur PME ». Pages lues le 5 octobre 2026 : <https://tensoria.fr/blog/combien-coute-n8n-production>, <https://nordflux.de/fr/ressources/n8n-cout-licence>, <https://agence-scroll.com/fr/blog/price-automation-n8n>, <https://latenode.com/fr/blog/tarifs-n8n-2025-comparaison-complete-des-offres-et-analyse-des-couts-caches-face-aux-alternatives>, <https://sliplane.io/blog/n8n-pricing>. Elles donnent toutes la grille et des coûts de serveur ; aucune ne donne la durée maximale d'une exécution par offre, l'absence de partage en Community Edition, ce que la licence autorise à un prestataire, ni les cas où n8n n'est pas le bon choix.
   - Sources primaires (vérifiées le 5 octobre 2026) : <https://n8n.io/pricing/>, <https://docs.n8n.io/choose-how-to-use-n8n>, <https://docs.n8n.io/deploy/host-n8n/community-edition-features>, <https://docs.n8n.io/n8n-community-license/community-license/license-faq>, <https://www.ovhcloud.com/fr/vps/>, <https://platform.claude.com/docs/en/about-claude/pricing>.
   - Non vérifié : le prix en facturation mensuelle (la page n'affiche en clair que « Save 17% ») : non écrit dans la page. Le prix de dépassement des offres Starter et Pro n'est pas publié : la page le dit.
   - À mesurer : `/ressources/guides/n8n-prix`, requête « n8n prix » : aucune page, aucune impression au 5 octobre. Attendu : page indexée et premières impressions. À juger à partir de 2026-W44.

2. Création de `/ressources/guides/agent-ia-definition` (entrée `w44-agents-ia-definition`).
   - Recherche en ligne : « agent IA c'est quoi définition », « agents IA c'est quoi différence chatbot assistant automatisation entreprise ». Pages lues le 5 octobre 2026 : <https://www.salesforce.com/fr-ca/agentforce/ai-agents/>, <https://www.hubspot.fr/products/artificial-intelligence/breeze-ai-agents/what-is>, <https://larevueia.fr/agent-ia/>, <https://quelllm.fr/guide/agent-ia-c-est-quoi-definition-exemples>, <https://www.marketing-management.io/blog/agent-ia>. Aucune ne chiffre un coût d'usage ni ne donne de questions à poser à un vendeur.
   - Sources primaires (vérifiées le 5 octobre 2026) : <https://www.anthropic.com/engineering/building-effective-agents> (19 décembre 2024), <https://developers.openai.com/api/docs/guides/agents>, <https://platform.claude.com/docs/en/about-claude/pricing>.
   - Relecture sceptique : première version jugée « non » (rien que les premiers résultats ne disent). Ajoutés en réponse : cinq questions à poser à un vendeur, un exemple de coût d'usage chiffré (2,50 dollars contre 30 dollars par mois), un tableau de cinq pannes avec leur garde-fou. Le projet Les Carnets de Montpellier est désormais présenté comme proche d'un assistant, pas comme un agent.
   - À mesurer : `/ressources/guides/agent-ia-definition`, requête « agents ia c'est quoi » : cible déplacée depuis `/blog/agent-ia-vs-automatisation-classique-2026`, aucune impression au 5 octobre. Attendu : page indexée et premières impressions. À juger à partir de 2026-W44.

3. Création de `/ressources/guides/devis-automatise` (entrée `w43-devis-automatise`).
   - Recherche en ligne : « devis automatisé », « automatiser ses devis PME comment faire relance devis automatique ». Pages lues le 5 octobre 2026 : <https://abby.fr/guide/facturation/devis-automatise>, <https://www.webandseo.fr/devis-automatise/>, <https://estimaker.io/fr/blog/automatisation-des-devis>, <https://tulipemedia.com/automatiser-devis/>, <https://sparkyflow.com/generation-de-devis-automatise/>. Pages d'éditeurs pour l'essentiel : aucune ne dit quand ne pas automatiser, ni ce qui peut rater.
   - Source primaire (vérifiée le 5 octobre 2026) : <https://entreprendre.service-public.gouv.fr/vosdroits/F31144>.
   - Non traité : la facturation électronique obligatoire, faute de source relue pendant la session.
   - `docs/seo/keywords.json` : la cible de « devis automatisé » passe de `/services/sequences-de-suivi` au guide, comme le prévoit le calendrier. La page service garde son title actuel jusqu'à sa révision (`w44-revision-sequences-de-suivi`) : risque de cannibalisation à surveiller.
   - À mesurer : `/ressources/guides/devis-automatise`, requête « devis automatisé » : aucune impression au 5 octobre. Attendu : page indexée, premières impressions, et `onTarget` vrai. À juger à partir de 2026-W44.

4. Révision de `/ressources/guides/claude-cowork` (entrée `w43-revision-guide-claude-cowork`).
   - Pourquoi : « claude cowork » est le mot-clé suivi au plus fort volume en priorité 1, et « claude cowork prix » vise cette page, qui ne donnait les prix que dans une réponse de FAQ.
   - Ce qui a changé : tableau des prix par offre en tête de page, exemple de coût illustratif pour une équipe de 10 personnes, explication de ce qui fait varier l'usage, title et H1 avec « prix », réponse de FAQ complétée avec l'offre Team, `updatedAt` au 5 octobre.
   - Source primaire : <https://claude.com/pricing> (vérifiée le 5 octobre 2026). Les autres sources de la page n'ont pas été relues et gardent leur date du 4 octobre.
   - À mesurer : `/ressources/guides/claude-cowork`, requête « claude cowork prix ». Valeur de départ à relever dans la collecte W42. À juger à partir de 2026-W44.

5. Correctifs techniques et on-page (hors calendrier).
   - `vercel.json` : `Cache-Control` long sur `/_astro/` (immutable), `/fonts/`, `/images/` et `/logos/`. À vérifier sur la preview Vercel avant fusion.
   - `/ressources/guides` et `/ressources/comparatifs` passent en index, avec un title descriptif, et sortent de `src/data/sitemap-noindex-exclude.ts` : chacun liste plus de 3 à 5 pages complètes (politique index-on-quality, `strategy/10 §3`). Décision à confirmer par Simon à la fusion.
   - Hub blog : description avec la requête, articles en noindex retirés de la liste.
   - Titles raccourcis sous 60 caractères : `cas-usages/finance-comptabilite`, `guides/ai-act-pme-calendrier`, `guides/taches-a-automatiser-pme`, `implantations/montpellier`, `services/agents-ia`, hub `/services`. « Guide pillar » renommé « guide complet » (title seulement, URL inchangée). Aucun `updatedAt` modifié pour ces retouches.
   - `/services/automatisation-n8n` : lien vers le guide « prix de n8n » (version française). Ce n'est pas la révision `w42-revision-automatisation-n8n`, qui reste à faire.
   - `src/lib/internal-mesh.ts` : trois guides ajoutés au registre.

6. Décisions de Simon du 5 octobre, appliquées dans la même PR.
   - Hubs : l'indexation n'est plus écrite en dur. `src/lib/seo/hub-index.ts` : un hub s'indexe dès qu'il liste au moins 3 pages filles elles-mêmes indexables ; les pages filles en noindex ne sont plus listées. Appliqué à `/ressources/guides`, `/ressources/comparatifs` et `/ressources/outils` (3 outils : il passe en index). Le sitemap suit par l'intégration `sitemapHygiene`.
   - Secteurs : les trois pages restent en noindex pour l'instant, mais le panneau E-E-A-T (accueil et pages services) affiche leurs libellés sans lien. Le lien revient de lui-même quand une page sort de `sitemap-noindex-exclude.ts`.
   - Trois révisions inscrites au calendrier, avec passage en index à la livraison : `w45-revision-secteur-batiment`, `w46-revision-secteur-e-commerce`, `w47-revision-secteur-startup-logiciel`. Simon juge le secteur logiciel pertinent (Amploi, application livrée à Inbound Value, version SaaS qu'il en a tirée) : les fiches cas sont à relire avant d'écrire.

**Calendrier** : trois créations livrées en avance (W42, W43, W44) et une révision (W43). Les créations restantes sont avancées d'autant pour garder une création par semaine : `w45-crm-sur-mesure` en W42, `w46-workflow-ia` en W43, `w47-freelance-cabinet-agence-ia` en W44, `w48-architecte-ia` en W45, `w49-chatbot-service-client` en W46. Il reste 5 semaines d'avance, sous le seuil de 6 : la prochaine session doit ajouter des idées datées.

**Brouillon LinkedIn** : `docs/seo/posts/2026-W41.md` (trois brouillons, à relire et à publier par Simon).

**Non retenu**
- Indexer les pages `/secteurs/*` : noindex voulu au pivot d'octobre (« hors cible »). L'audit les signale parce que l'accueil et 17 pages services y renvoient : décision pour Simon.
- Raccourcir le title de l'accueil (67 caractères) : il porte la ligne de positionnement.
- Réécrire les blocs communs des pages formations (41 à 46 % de séquences communes entre pages) : à inscrire au calendrier.
- Alléger `section-registry.css` (678 Ko) et le pied de page : hors périmètre d'une PR de contenu.

**Non vérifié dans cette session** : aucun sous-agent n'a relu la révision de `claude-cowork` ; les versions anglaises n'ont pas été relues par un tiers ; Core Web Vitals non mesurés.

**Pour Simon**
- Fusionner après contrôle de la preview Vercel (GF-1), en particulier les en-têtes `Cache-Control`.
- Confirmer l'indexation des deux hubs ressources, et trancher le sort des liens vers `/secteurs/*`.
- Autorité : 1 seul lien externe relevé dans Search Console. Demander un lien aux clients cités et à Akigora, créer les profils d'annuaires (La Fabrique du Net, Sortlist, impli.fr, Malt) : ce sont des actions extérieures, non faites ici.
- Compléter les emplacements « [exemple vécu à ajouter] » des brouillons LinkedIn.

### Note du 5 octobre 2026 · collecte non partie, routine éditoriale

**Constat.** La collecte planifiée du lundi 5 octobre 2026 (04:30 UTC) n'est pas partie : la liste des runs du workflow `seo-routine.yml`, relue le 5 octobre vers 08:30 UTC, ne contient aucun run `schedule`, seulement des runs `pull_request` et un run lancé à la main le 4 octobre à 21:19 UTC. La cause n'est pas établie.

**Ce que cela a produit.** La session W41 a travaillé sur la collecte de la veille et n'a livré qu'une révision. La tâche Brave a répondu « rien à soumettre », faute de clé `brave` dans `latest.json`, alors que 15 pages neuves étaient en ligne.

**Ce que change la PR de la branche `feat/routine-editoriale`.**
- Collecte : créneau principal le dimanche à 19:17 UTC, rattrapage le lundi à 03:17 UTC, sans effet si une collecte complète de moins de 36 heures existe (`scripts/seo-routine/freshness.mjs`). La fraîcheur se juge par `generatedAt` (moins de 48 heures pour la session), plus par le numéro de semaine : la collecte du dimanche porte le numéro de la semaine qui se termine.
- Brave : la tâche calcule sa file elle-même, sans secret ni état (`node scripts/seo-routine/brave-queue.mjs --from-sitemap --days=8`) : URL du sitemap de production au `lastmod` de moins de 8 jours, plus `brave.toSubmit` de la collecte s'il existe, 40 URL au plus par exécution. Calcul réel du 5 octobre 2026 à 08:11 UTC : 88 URL au sitemap, 84 dans la fenêtre (la refonte des 4 et 5 octobre a daté presque tout le site), dont les 15 pages inconnues de la dernière inspection d'indexation placées en tête ; 40 à soumettre, 44 à reprendre. Rien n'a été soumis par cette PR.
- Rédaction : calendrier éditorial `docs/seo/calendrier-editorial.json` (28 entrées à l'amorce, 8 semaines d'avance, de 2026-W42 à 2026-W49), vérifié par `scripts/seo-routine/check-calendar.mjs`. Le runbook demande désormais au moins une création et une à deux révisions par semaine (plafond : 2 et 3), une recherche en ligne avant d'écrire, un volet GEO explicite, un brouillon de post LinkedIn par création, et ne fait plus dépendre la production de contenu de la collecte. La règle « une à trois actions, ne rien faire est un résultat valide » disparaît.
- Prompts des deux tâches planifiées versionnés : `docs/seo/prompts/routine-hebdo.md` et `docs/seo/prompts/brave.md`.

**À savoir.** Les angles du calendrier sont des hypothèses : aucune recherche en ligne n'a été faite pour l'amorce. Les créneaux planifiés ne sont pas éprouvés : le premier run `schedule` attendu est celui du dimanche qui suit la fusion.

**Pour Simon.** Recopier les deux prompts dans les tâches planifiées après la fusion. Décider des trois idées du calendrier qui supposent une offre ou un positionnement (`idee-agence-ia-toulouse`, `idee-formation-claude-code`, `idee-logiciel-seo-ia-pme`). Faire soumettre à Brave les 84 URL en trois exécutions espacées (40, puis `--offset=40`, puis `--offset=80` pour les 4 dernières).

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
