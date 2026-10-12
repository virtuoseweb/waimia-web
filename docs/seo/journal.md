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

### 2026-W42 (session du 12 octobre 2026, collecte du 11 octobre 2026)

**Données** : collecte du 11 octobre 2026 à 22:55 UTC (`generatedAt`), fraîche oui (`freshness.mjs` : « FRAÎCHE · collecte complète de 6.8 h ») · Search Console configuré oui · étapes en erreur : aucune (8 étapes `ok`). Les données de performance s'arrêtent au 8 octobre 2026. Flux : 0 en erreur. Concurrents : 14 URL nouvelles, toutes chez claudin.tech.

**KPI** (28 jours, du 11 septembre au 8 octobre 2026, contre les 28 précédents) : clics 5 (-1) · impressions 1 007 (+921) · CTR 0,50 % · position 28,2 (-7,4, gain) · pages indexées 80 sur 120. Sur 7 jours (2 au 8 octobre) : clics 3 (+1) · impressions 765 (+587) · position 29,6 (+4,1). Indexation : 23 pages nouvellement indexées, 1 nouvellement non indexée (`/blog/tableau-de-bord-pme-quelles-donnees-suivre`, « explorée, actuellement non indexée »), 16 vues pour la première fois. Aucune page n'atteint `weeksNotIndexed` > 3 (maximum : 1) : la règle 4.1-3 ne se déclenche pas. Indexing API : 54 notifications envoyées le 11 octobre (16 ajoutées, 38 modifiées, 0 erreur, quota 54 sur 200), des notifications et pas des pages indexées.

**Brave** : 93 URL dans la file du 12 octobre 2026 à 06:09 UTC (`brave-queue.mjs --from-sitemap --days=8`), 40 à soumettre par la tâche Brave, 53 à reprendre (`--offset=40`). Rien n'a été soumis par cette session.

**Bilan des actions précédentes** (toutes mises en production les 5 et 6 octobre 2026 ; une seule collecte complète archivée depuis, celle du 11 octobre : verdict « trop tôt » partout, comme l'indiquaient les lignes « À mesurer », à juger à partir de 2026-W44)
- 2026-W41, `/ressources/comparatifs/claude-vs-chatgpt-pme`, requête « claude vs chatgpt » : trop tôt. Avant (collecte du 4 octobre) : page en position 13,4, 21 impressions. Maintenant : page en position 32, 150 impressions ; requête « claude vs chatgpt » en position 15,2 (6 impressions). Indexée.
- 2026-W41, `/ressources/guides/n8n-prix`, requête « n8n prix » : trop tôt. Avant : aucune page. Maintenant : page indexée, 4 impressions en position 13,8 ; la requête « n8n prix » n'a aucune impression.
- 2026-W41, `/ressources/guides/agent-ia-definition`, requête « agents ia c'est quoi » : trop tôt. Avant : aucune impression. Maintenant : page indexée, 22 impressions en position 83,2 ; la requête exacte n'a aucune impression.
- 2026-W41, `/ressources/guides/devis-automatise`, requête « devis automatisé » : trop tôt. Avant : aucune impression. Maintenant : aucune impression, page « détectée, actuellement non indexée » (`weeksNotIndexed` 0).
- 2026-W41, `/ressources/guides/claude-cowork`, requête « claude cowork prix » : trop tôt. Valeur de départ relevée : aucune impression sur la requête ; page indexée, 9 impressions en position 22,9.

**Actions de la semaine** (PR de la branche `feat/seo-2026-W42`) : une création, deux révisions.

1. Création de `/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche` (entrée `w45-crm-sur-mesure`, planifiée en 2026-W42).
   - Pourquoi : entrée du calendrier ; « crm sur mesure » et « automatisation crm » visaient la même page service pour deux intentions.
   - Recherche en ligne : requêtes « crm sur mesure », « crm sur mesure ou crm du marché pme prix », « développer son propre crm vs hubspot salesforce avantages inconvénients », plus les pages CRM des concurrents. Pages lues le 12 octobre 2026 : <https://www.leblogdudirigeant.com/crm-standard-sur-mesure-comment-trancher/>, <https://www.appvizer.fr/magazine/relation-client/customer-relationship-management-crm/crm-sur-mesure>, <https://www.hostinger.com/ca-fr/horizons/custom-crm>, <https://www.codeur.com/pages/prix-crm>, <https://www.raftlabs.com/blog/cost-to-build-app-like-hubspot>, <https://www.lafabriquedunet.fr/logiciels/productivite/crm/crm-tpe-pme>, <https://independant.io/prix-crm/>, <https://sparkyflow.com/agence/agence-crm/> (concurrent). Non lue : la page d'innowise.com (introuvable au moment de la lecture). Ce qu'elles couvrent : définitions, avantages du sur mesure, fourchettes de prix larges. Ce qui manque : la troisième voie (CRM du marché et sur mesure autour), un calcul sur trois ans avec prix datés, les cas où le calcul s'inverse, « ne le faites pas si ». Questions récurrentes : prix d'un CRM sur mesure, propriété du code, no-code ou développement, délai.
   - Ce que la page apporte : trois options définies, tableau à 8 critères, prix publics datés, exemple illustratif sur trois ans, verdict en 7 situations, test en 5 questions, retour d'expérience Amploi (HubSpot gardé, demandes du site routées par l'API Forms), FAQ de 6 questions, illustration dessinée pour la page (moteur SVG du skill `waimia-illustration`).
   - Sources primaires : <https://www.pipedrive.com/fr/pricing>, <https://www.hubspot.com/pricing/sales/starter> (vérifiées le 12 octobre 2026). Non écrit : le prix de l'offre HubSpot Starter (promotion affichée, montant ambigu).
   - `docs/seo/keywords.json` : la cible de « crm sur mesure » passe de `/services/crm-scoring-routing` au comparatif. La page service garde « CRM sur mesure » dans son title : risque de cannibalisation à surveiller.
   - À mesurer : `/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche`, requête « crm sur mesure » : aucune impression sur 28 jours au 11 octobre 2026. Attendu : page indexée, premières impressions, `onTarget` vrai. À juger à partir de 2026-W45.

2. Révision de `/ressources/guides/combien-coute-un-agent-ia-pme` (entrée `w42-revision-cout-agent-ia-haiku-5-5`, ajoutée cette semaine).
   - Pourquoi : règle 4.1-4, contenu daté par une actualité. Trois entrées de flux de sources différentes (Le Monde Informatique le 9 octobre, Blog du Modérateur le 8 octobre, Make Community le 10 octobre) annoncent Claude Haiku 5.5. La page chiffrait le modèle avec Claude Haiku 4.5 (1 $ / 5 $) ; Haiku 5.5 coûte 0,10 $ / 0,50 $. Cette règle passe devant les deux révisions planifiées en 2026-W42, replanifiées en 2026-W43.
   - Recherche en ligne : « combien coûte un agent IA PME », « prix agent ia entreprise coût mensuel API », pages concurrentes sur le coût des agents. Pages lues le 12 octobre 2026 : <https://www.the-intelligence-academy.com/blog/cout-agent-ia-pme-budget-roi>, <https://www.studeria.fr/articles-de-blog/cout-agent-ia-production-pme-2026> (7 octobre, cite encore Haiku 4.5 comme option économique), <https://kolonell.com/fr/blog/agent-ia-service-client-pme-cout-integration-2026>, <https://www.mission-open-data.fr/budget-ia-pme-2026-guide-complet/>, <https://omidsaffari.com/fr/blog/agent-ia-prix-cout-mensuel>, <https://www.koino.fr/articles/employes-ia-pme-comparatif-limova-delos-alternatives-2026>, <https://www.limova.ai/tarifs/> (concurrent). Aucune ne parle de Haiku 5.5, de l'écart de découpage en jetons ni des crédits API des offres Team.
   - Ce qui a changé : chiffres clés, exemple de calcul (0,59 $ contre 4,50 $ pour 1 000 e-mails, avec la correction d'environ 30 % de jetons en plus à partir des modèles 4.7), paragraphe « ce que ça change pour une PME », crédits API mensuels des offres Team et Max (20 $ par siège Standard, 100 $ par siège Premium, plafond 500 $, ce qu'ils couvrent ou non), tableau des trois budgets, deux réponses de FAQ, badge et date de mise à jour, sources, phrase sur la mécanique d'orchestration (n8n contre Make) corrigée après relecture, `updatedAt` au 12 octobre.
   - Sources primaires : <https://www.anthropic.com/claude-haiku-5-5> (annonce du 7 octobre 2026), <https://platform.claude.com/docs/en/about-claude/pricing>, <https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans> (vérifiées le 12 octobre 2026). Non relues ce jour, donc gardées avec leur date du 6 octobre dans la page : <https://claude.com/pricing>, n8n, Make, OVHcloud.
   - À mesurer : `/ressources/guides/combien-coute-un-agent-ia-pme` : absente de `byPage` sur 28 jours au 11 octobre 2026, indexée à cette collecte. Attendu : premières impressions sur « combien coûte un agent ia ». À juger à partir de 2026-W45.

3. Révision de `/ressources/comparatifs/claude-platform-vs-openai-platform` (entrée `w42-revision-claude-platform-vs-openai-haiku-5-5`, ajoutée cette semaine).
   - Pourquoi : règle 4.1-4. La page affirmait que GPT-6 Luna coûte dix fois moins cher que Claude Haiku 4.5 : faux depuis le 7 octobre 2026, Haiku 5.5 étant au même prix public que GPT-6 Luna.
   - Recherche en ligne : « API Claude ou API OpenAI comparatif prix entreprise », « Claude Haiku 5.5 vs GPT-6 Luna ». Pages lues le 12 octobre 2026 : <https://tensoria.fr/blog/api-claude-openai-mistral-integrer-ia-logiciel>, <https://www.kunalganglani.com/blog/claude-api-vs-openai-api-2026>, <https://costbench.com/compare/openai-vs-claude/>, <https://enterprisedna.co/resources/blog/claude-api-vs-chatgpt-api>, <https://redresscompliance.com/anthropic-claude-pricing-2026.html>. Toutes citent encore Haiku 4.5 ou des modèles plus anciens.
   - Ce qui a changé : tableau (gamme et petit modèle), section prix (petits modèles au même prix, seuils de contexte long différents, découpage en tokens propre à chaque éditeur, baisse du prix des lectures en cache de Sonnet 5.5), réponse courte, verdict « gros volumes », FAQ prix et FAQ Europe (10 % de plus sur Bedrock comme sur Vertex, vérifié sur la grille d'Anthropic), sources, dates, `updatedAt` au 12 octobre.
   - Sources primaires : <https://www.anthropic.com/claude-haiku-5-5>, <https://platform.claude.com/docs/en/about-claude/pricing>, <https://developers.openai.com/api/docs/pricing> (vérifiées le 12 octobre 2026). Les autres sources de la page n'ont pas été relues et gardent leur date.
   - À mesurer : `/ressources/comparatifs/claude-platform-vs-openai-platform` : 6 impressions, position 22,5 sur 28 jours au 11 octobre 2026. Attendu : plus de 30 impressions sur 28 jours. À juger à partir de 2026-W45.

**Relecture sceptique** : un sous-agent a relu les trois pages avec la grille de la section 6. Verdict « oui » pour les trois (la page apprend quelque chose que les premiers résultats ne disent pas), avec des corrections faites dans la PR : CRM (calcul Pipedrive sur l'offre Premium, comparable à HubSpot Professional ; exemple sur trois ans côté sur mesure ; cas des utilisateurs occasionnels rendu conditionnel ; délais et règle du test alignés ; affirmations sans preuve retirées), agent IA (badge et date, crédit Team expliqué, phrase contradictoire sur l'orchestration), Platform (exemple à 11 $ « à nombre de tokens égal », FAQ « en contexte court », cache limité à la lecture). Le détail est dans la PR.

**Calendrier** : livré cette semaine : `w45-crm-sur-mesure` (création), deux révisions ajoutées par la règle 4.1-4. Mise à jour des statuts : 23 entrées « en cours » livrées par les PR #76, #78 et #80 (fusionnées les 6 octobre) passent à « publié ». Replanifiées : `w42-revision-automatisation-n8n` et `w42-revision-calculateur-roi-ia` en 2026-W43. Ajoutées : quatre révisions « Haiku 5.5 » (`agent-ia-definition` en W43, `n8n-prix` en W44, `trier-emails-entrant-claude-n8n` en W48, `roi-automatisation` en W49) ; quatre créations (`w44-guide-application-metier`, origine : quatre requêtes de `keywords.json` dont deux de priorité 1 sur une page de vente ; `w45-guide-claude-tpe`, origine : huit variantes de « claude tpe » réparties sur quatre pages ; `w47-guide-claude-finance-pme`, origine : « claude finance » sur un guide général et six pages finance nouvelles chez claudin.tech, deux lues ; `w48-article-agent-ia-entreprise-exemples`, origine : « agent ia entreprise » de priorité 1 sur une page de vente, `onTarget` faux sur « agent ia »). Prévu la semaine suivante (2026-W43) : création `w47-freelance-cabinet-agence-ia`, révisions `automatisation-n8n`, `calculateur-roi-ia`, `agent-ia-definition`. 6 semaines d'avance (`check-calendar.mjs`), de 2026-W43 à 2026-W48. Aucune entrée abandonnée. Aucune entrée « mesurée » : la première collecte qui le permet est celle de 2026-W44.

**Brouillon LinkedIn** : `docs/seo/posts/2026-W42.md` (une section, à relire et à publier par Simon).

**Non retenu cette semaine**
- Réviser `/ressources/guides/claude-pme`, en position 8 à 20 sur plusieurs requêtes (`strikingDistance`) et en cannibalisation sur « claude pme » avec deux autres pages : révisée les 6 octobre (PR #76 et #79), trop tôt pour la retoucher sans mesure.
- `lowCtrPages` : toutes les pages listées sont en position 17 à 43 avec 0 clic ; le CTR attendu à ces positions (0,4 % à 1 %) donne moins d'un clic. Pas de signal exploitable.
- `/implantations/montpellier`, 144 impressions sur « agence airtable montpellier » et « agence no code montpellier » : hors positionnement, comme noté en W41.
- Mettre à jour le PDF du guide d'achat Claude, que la page « combien coûte un agent IA » propose et qui cite des prix du 5 octobre : hors périmètre d'une PR de contenu JSON, signalé à Simon.

**Pour Simon**
- Le PDF proposé en téléchargement sur la page « combien coûte un agent IA » (prix Anthropic relevés le 5 octobre 2026) est antérieur à Claude Haiku 5.5 et aux crédits API des offres Team : à régénérer.
- `/services/crm-scoring-routing` garde « CRM sur mesure » dans son title alors que le mot-clé vise maintenant le comparatif : à trancher (retirer du title, ou garder si l'intention d'achat d'un CRM développé doit aller sur la page service).
- Idées en attente de ta décision depuis le 5 octobre : `idee-agence-ia-toulouse`, `idee-formation-claude-code`, `idee-logiciel-seo-ia-pme`.
- Les mentions de Claude Haiku 4.5 restent sur quatre pages planifiées au calendrier (W43 à W49) ; si tu préfères tout corriger d'un coup, une PR dédiée le permet.

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
   - Trois révisions inscrites au calendrier, avec passage en index à la livraison : `w45-revision-secteur-batiment`, `w46-revision-secteur-e-commerce`, `w47-revision-secteur-startup-logiciel`. Simon juge le secteur logiciel pertinent, sur deux projets distincts : Amploi (client venu par Inbound Value) et l'application livrée à Inbound Value, dont il a tiré une version SaaS. Les deux fiches cas sont à compléter avant d'écrire (détail dans `origine` de l'entrée).

7. Fiche cas `/cas-clients/amploi` complétée, sur les indications de Simon du 5 octobre : TinaCMS sur mesure avec interface en glisser-déposer, skills de création de contenu livrés dans un dépôt GitHub et utilisés par un agent Claude qui commite et déploie sur Vercel. Title et description mis à jour, quatrième phase et quatrième livrable ajoutés, `updatedAt` au 5 octobre. Le score PageSpeed est écrit dans la fiche (impact, chiffre de contexte, section « Ce qui est mesuré », FAQ) : 100 sur 100 en performances, accessibilité, bonnes pratiques et SEO, sur mobile et sur ordinateur, rapport PageSpeed Insights de <https://amploi.fr/> du 5 octobre 2026 à 17 h 06 (Lighthouse 13.5.0 ; mobile : FCP 1,1 s, LCP 1,7 s, TBT 0 ms, CLS 0). Source : captures fournies par Simon, puis rapport relu par l'agent à son adresse permanente (<https://pagespeed.web.dev/analysis/https-amploi-fr/sy0utfy5ep?form_factor=mobile>, lu le 5 octobre 2026). Deux captures du rapport (mobile, ordinateur), refaites depuis cette adresse sans l'habillage du navigateur, sont ajoutées à la vitrine de la fiche, avec un lien vers le rapport. À la demande de Simon, la fiche parle d'une mesure Google PageSpeed Insights du site en production, sans le mot « laboratoire ». Elle précise que le score peut varier d'une analyse à l'autre : une capture du même jour à 16 h 54 affichait 98 en performances sur mobile. La version SaaS tirée de l'application livrée à Inbound Value n'est pas ajoutée : c'est un produit de Simon, à ranger avec les projets internes.

8. Gabarit des fiches cas (`src/lib/templates/case-study.ts`) : ajout de la section catalogue `faq-accordion`, alimentée par `faq_fr` / `faq_en`, entre la stack et la carte auteur. Les questions existaient dans les dix fiches mais n'étaient ni affichées ni balisées : elles sont maintenant visibles, avec un JSON-LD FAQPage par fiche. Aucune réponse réécrite, sauf les deux ajoutées sur Amploi (actions 7).

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
- ~~Confirmer l'indexation des deux hubs ressources, et trancher le sort des liens vers `/secteurs/*`.~~ Clos le 5 octobre (voir « Clôture du 5 octobre 2026 »).
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

### Décision du 5 octobre 2026 · pages secteurs

**Décision (Simon).** Indexer les secteurs utiles et liés, laisser les autres hors index. Mesure sur le build avant changement : aucune page publique ne liait les trois secteurs encore en ligne (seuls le plan du site et la cartographie interne) ; les neuf autres sont redirigés en 301 vers `/services` depuis le pivot, sans lien entrant ni cas propre, et le restent.

**Fait.**
- `/secteurs/batiment` et `/secteurs/e-commerce` : index, sortis de `sitemap-noindex-exclude.ts`, déclarés cibles du maillage (`kind: 'secteur'`, groupe « Par secteur »). Contenu réécrit pour l'intention d'achat : douleurs, workflows alignés sur le title (le title e-commerce promettait commandes, support et catalogue, la page parlait de vitesse de site), déroulé semaine par semaine (`methodSteps` → `method-timeline`), offre et prix (`offer_sections` → `pricing-cards`, sprint 999 € HT puis régie 99 € HT/h), six questions d'achat en FAQ. Le diagnostic générique de maturité cède la place à l'offre.
- `/secteurs/startup-logiciel` : même réécriture, **reste noindex** (cas Amploi = RH et santé au travail, pas un éditeur). Déclaré au registre du maillage : il s'active seul le jour où son `seo.noindex` tombe.
- Visuels : illustrations propres à chaque workflow (skill `waimia-illustration`) à la place du pool générique partagé par les trois pages ; une du hub `/ressources` affichait un cadre vide (`media_src` jamais passé), elle reprend l'illustration du hero de l'article.

**À mesurer.** Couverture Search Console des deux pages à partir de la collecte W42, puis impressions sur « automatisation devis bâtiment / artisan » et « automatisation e-commerce ».

### Clôture du 5 octobre 2026 · décisions laissées ouvertes par la PR #72

**Hubs `/ressources/guides` et `/ressources/comparatifs` : indexation confirmée (Simon).** Mesure en production : `robots: index, follow` sur les deux, présents dans `sitemap-0.xml`.

**Liens vers `/secteurs/*` : soldé par la décision secteurs ci-dessus (PR #74).** Mesure en production sur les 97 URL du sitemap : 52 couples page-cible vers `/secteurs/batiment` (24) et `/secteurs/e-commerce` (28), tous deux index, aucun vers `/secteurs/startup-logiciel` (noindex) ; `/secteurs` répond en 301. Le constat de l'audit (« l'accueil et 17 pages services renvoient vers des secteurs noindex ») ne se vérifie plus.

Les deux points correspondants de « Pour Simon » de l'entrée W41 sont clos.

