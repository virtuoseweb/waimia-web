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

### 2026-10-28 (session de production du mercredi, collecte du 27 octobre 2026)

**Données** : collecte du 27 octobre 2026 à 08:30 UTC, fraîche (`freshness.mjs` : « FRAÎCHE · collecte complète de 22.2 h »). KPI et bilan non refaits (session du mercredi, runbook en tête). **Brave** : 64 URL dans la file du 28 octobre 2026 (`brave-queue.mjs --from-sitemap --days=8`), 40 à soumettre par la tâche Brave, 24 à reprendre ; rien soumis par cette session.

**PR encore ouvertes** : PR #149 (27 octobre 2026) et PR #130 (2026-W43). Leurs entrées ne sont ni refaites ni replanifiées ; cette PR part de `main` et touchera les mêmes fichiers (calendrier, journal, `keywords.json`, `internal-mesh.ts`) : mise à jour à prévoir après la fusion de la première.

**Actions du jour** (PR #151, branche `feat/seo-2026-10-28`) : deux créations de la série « IA par métier », aucune révision (aucune règle de 4.1 ne l'impose un mercredi).

1. Création de `/blog/ia-pme-industrielle` (entrée `idee-ia-metier-industrie`, prise en 2026-W44).
   - Pourquoi : série « IA par métier » prioritaire (décision de Simon du 26 octobre 2026) ; aucune entrée planifiée en W44 ne restait à livrer sur `main` hors PR ouvertes ; `/secteurs/industrie` publiée.
   - Recherche en ligne : « IA PME industrielle ChatGPT Claude Mistral usages », « intelligence artificielle pour les PME industrielles guide », « IA générative industrie PME cas d'usage atelier qualité maintenance ChatGPT », « ChatGPT pour l'industrie PME usine exemples prompts fiche de non-conformité 8D AMDEC ». Pages lues le 28 octobre 2026 : <https://www.step-agency.fr/ressources/blog/chatgpt-claude-mistral-entreprise>, <https://digitalchimist.com/blog/ia-operationnelle-chatgpt-claude-mistral>, <https://tensoria.fr/formations-ia/industrie-production>, <https://www.fabrico.io/fr/blog/generative-ai-for-maintenance-guide-2026/>, <https://www.cetim.fr/view/content/200193/downloadPdf> (annonce d'événement, sans contenu exploitable), <https://mesaidespubliques.infogreffe.fr/aides/accelerateur-ia-industrie>. Ce qu'elles couvrent : comparatifs généraux, listes de cas d'usage, formation. Ce qui manque : aucune ne parle du secret industriel, des plans clients sous accord de confidentialité ni des formats de CAO ; prix non datés et sans source (step-agency, digitalchimist) ; aucune liste de données à exclure (tensoria, fabrico).
   - Sources primaires (vérifiées le 28 octobre 2026) : <https://claude.com/pricing>, <https://support.claude.com/en/articles/8241126-upload-files-to-claude>, <https://claude.com/docs/office-agents/powerpoint>, <https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller>, <https://help.openai.com/en/articles/8792536-managing-billing-and-seats-in-chatgpt-business>, <https://help.openai.com/en/articles/8798634-chatgpt-team>, <https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt>, <https://mistral.ai/pricing/>, <https://mistral.ai/products/vibe/>, <https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training>, <https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data>, <https://www.entreprises.gouv.fr/osez-lia> (mise à jour le 28 septembre 2026). Non lues : Légifrance (article L151-1, erreur de l'outil ; trois critères repris de <https://cms.law/fr/fra/a-la-une/la-nouvelle-protection-du-secret-des-affaires>, présenté comme source secondaire) ; <https://help.openai.com/en/articles/8792828-what-is-chatgpt-business> et la FAQ « visual retrieval » d'OpenAI (erreur de l'outil).
   - Ce que la page apporte : tableau des trois offres d'équipe (prix, entraînement, lecture des PDF et schémas, hébergement, déploiement sur site), exemple illustratif de budget pour 10 sièges, cinq consignes, tableau des données à garder hors de l'outil, secret des affaires, aides Bpifrance du plan Osez l'IA (conditions de la page officielle), « ne le faites pas si », six FAQ. Category `conseil`, au maillage (thèmes conseil, conformité), cible ajoutée dans `keywords.json`.
   - À mesurer : `/blog/ia-pme-industrielle`, requête « ia pme industrielle » : page hors sitemap au 28 octobre 2026. Attendu : page indexée et premières impressions sur la requête. À juger à partir de 2026-W47.

2. Création de `/blog/ia-cabinet-conseil` (entrée `idee-ia-metier-conseil`, prise en 2026-W44).
   - Pourquoi : série « IA par métier » ; satellite de `/secteurs/conseil` (publiée).
   - Recherche en ligne : « IA cabinet de conseil ChatGPT Claude Mistral consultants usages », « IA pour consultants : quel outil choisir prompts cabinet conseil ». Pages lues le 28 octobre 2026 : <https://ethanolle.com/ia-pour-les-consultants/>, <https://www.the-intelligence-academy.com/blog/consulting-chatgpt-guide-consultants>, <https://decisionia.com/outils-ia-consultant-devrait-maitriser/>, <https://digitalchimist.com/blog/ia-operationnelle-chatgpt-claude-mistral>, et le concurrent suivi <https://www.claudin.tech/clients/conseil>. Ce qu'elles couvrent : prompts de mission, listes d'outils, mises en garde générales. Ce qui manque : ethanolle sans Mistral ni hébergement (agence partenaire d'Anthropic) ; the-intelligence-academy sans aucun prix, prompts annoncés et absents ; decisionia sans une ligne de confidentialité ; claudin.tech, Claude seul et sans prix. Aucune ne traite la relecture des livrables comme norme d'équipe.
   - Sources primaires (vérifiées le 28 octobre 2026) : <https://claude.com/pricing>, <https://claude.com/docs/office-agents/powerpoint>, <https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller>, <https://help.openai.com/en/articles/8792536-managing-billing-and-seats-in-chatgpt-business>, <https://help.openai.com/en/articles/8798634-chatgpt-team>, <https://help-lb.openai.com/en/articles/10500283-deep-research-in-chatgpt>, <https://mistral.ai/pricing/>, <https://mistral.ai/products/vibe/>, <https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training>, <https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data>, Baromètre du Conseil 2026 d'emlyon business school (<https://res.cloudinary.com/emlyon/image/upload/v1782911492/PDF/Barome%CC%80tre_du_conseil_IA_2026_FR_1.pdf>, 109 consultants, panel non représentatif selon ses auteurs). Non lue : l'app SharePoint de ChatGPT (erreur de l'outil).
   - Ce que la page apporte : chiffres du baromètre (usage quotidien 72 %, politique écrite 83 %, normes de vérification 18 %), tableau des trois offres (prix, entraînement, rôle de l'éditeur, slides, recherche, hébergement), exemple illustratif de budget, cinq consignes dont une relecture avant envoi, tableau des données à retirer, « ne le faites pas si », six FAQ. Category `conseil`, au maillage (thèmes conseil, commercial), cible ajoutée dans `keywords.json`.
   - À surveiller : la requête « cabinet conseil ia pme » (achat d'un conseil en IA) est portée par `/services/consultant-ia-claude` ; la nouvelle page vise l'intention inverse (l'IA pour un cabinet). Si la collecte montre `/blog/ia-cabinet-conseil` classée sur la première, clarifier par le title ou un lien (règle 4.1-5).
   - À mesurer : `/blog/ia-cabinet-conseil`, requête « ia cabinet de conseil » : page hors sitemap au 28 octobre 2026. Attendu : page indexée et premières impressions sur la requête. À juger à partir de 2026-W47.

**Relecture sceptique** : un sous-agent a relu les deux textes avec la grille de la section 6. Verdict : oui pour les deux (industrie : secret des affaires relié aux comptes personnels, formats de CAO, tableau des données ; conseil : Claude for PowerPoint au gabarit, recherche limitée aux sources choisies, écart 83 % / 18 %). Corrigé : contradiction de l'encadré industrie (plan client seulement avec accord écrit) ; compléments Office réduits à ce que la page lue documente ; entraînement « opt-out » des offres individuelles attribué aux pages de prix de Claude et de Mistral, OpenAI non relu ; affirmations juridiques présentées comme « lecture de Waimia, qui n'est pas un avis juridique » ; 46 % de l'Accélérateur précisé (montant total non indiqué) ; « cabinets » remplacé par « consultants » pour le baromètre ; « 69 % des usages » corrigé ; offres et versions de PowerPoint requises pour le complément ; accord de traitement Mistral marqué « non relu ». Non corrigé : prix en euros et TTC (les pages affichent des dollars HT), délai de mise en place et charge pour les équipes (aucune source lue), quotas de recherche approfondie de ChatGPT Business (non précisés sur la page lue).

**Vérifications** : build de production « Complete! » ; `check-head` (243 pages), `check-jsonld`, `check-sitemap` (243 URL), `check-redirects` (90), `check-public-surface --prod`, `check-seo`, `check-static-quality` (0 violation), `check-internal-mesh` (237/237, 0 orpheline), `check-silos`, `check-no-emdash`, `check-internal-links`, `check-content-refs`, `check-touchpoints`, `check-section-modules`, `check-news`, `check-config`, `check-calendar` : OK ; `astro check` : 8 erreurs (référence de `main`). `llms.txt` : les deux pages dans « Blog », avec leur description. Preuve visuelle sur le build servi, 1440 et 390 px : H1 visible (opacity 1, sans transform), 0 erreur console, aucun débordement de page ; balayage des 243 URL du sitemap aux deux tailles : 0 débordement horizontal. À 1440 px, le H1 long chevauche l'illustration du gabarit, comme sur les billets existants (gabarit non modifié).

**Calendrier** : livré : `idee-ia-metier-industrie` et `idee-ia-metier-conseil` (URL alignées sur la requête). Ajoutées : `idee-ia-metier-startup-logiciel` et `idee-ia-metier-commercial` (pages `/secteurs/startup-logiciel` et `/cas-usages/generer-plus-de-leads` publiées, non couvertes par la série), `idee-aides-ia-bpifrance-osez-lia` (page officielle Osez l'IA lue le 28 octobre 2026, fiche Infogreffe dans les premiers résultats d'une requête lue ; aucune page du site ne porte le sujet). Stock : 20 créations (11 idées, 7 planifiées, 2 livrées en attente de PR), 6 semaines d'avance (`check-calendar.mjs`). Avertissements lus : W43 en retard (PR #130) ; les deux pages « semblent déjà exister » avant le passage à « publié ».

**Brouillon LinkedIn** : `docs/seo/posts/2026-10-28.md` (deux sections, à relire et à publier par Simon ; un emplacement d'anecdote par post).

**Pour Simon**
- Volumes de « ia pme industrielle » et « ia cabinet de conseil » à relever dans Semrush.
- PR #149 et #130 toujours ouvertes : conflits attendus sur le calendrier, le journal, `keywords.json` et `internal-mesh.ts`.

### Mesure avant/après, 27 octobre 2026 (collecte Actions 2026-W44, Search Console, Web Analytics, leads)

**Sources.** Collecte `chore(seo-data): collecte 2026-W44` relancée à la main (`generatedAt` 2026-10-27T08:30 UTC, données finales au 24/10, neuf étapes « ok »). Search Console lue dans la console le 27/10 (données au 25/10) pour le 14 jours par page et l'inspection d'URL. Web Analytics par l'API Vercel. Alertes `[Lead]` dans Gmail.

**Search Console, collecte W44 (source principale).**

| Période | Clics | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| 7 jours, 18 au 24/10 | 9 | 2 803 | 0,32 % | 31,6 |
| 7 jours précédents, 11 au 17/10 | 5 | 1 392 | 0,36 % | 37,8 |
| 28 jours, 27/09 au 24/10 | 19 | 5 311 | 0,36 % | 32,7 |
| 28 jours précédents, 30/08 au 26/09 | 3 | 142 | 2,11 % | 25,7 |

Console (au 25/10), pour recoupement : 28 jours (28/09 au 25/10) 21 clics, 5,71 k impressions, CTR 0,4 %, position 32,7, contre 3 clics, 156 impressions, 1,9 %, 26,3 ; 7 jours (19 au 25/10) 9 clics, 2,83 k impressions, 0,3 %, 30,9, contre 6 clics, 1,7 k, 0,4 %, 38 ; 14 jours (12 au 25/10) 15 clics, 4,52 k impressions, 0,3 %, 33,5, contre 6 clics, 1,18 k, 0,5 %, 29,3.

**Lecture.** Hausse mesurée : sur 7 jours, impressions x 2,0 et clics x 1,8 ; sur 28 jours, 19 clics contre 3. Le CTR global baisse parce que les impressions montent plus vite que les clics (requêtes nouvelles, souvent au-delà de la page 3). Contre la référence du 16/10 (8 clics, 1 540 impressions du 16/09 au 13/10), le 28 jours actuel monte à 19 clics et 5 311 impressions, mais les deux fenêtres partagent 17 jours (27/09 au 13/10). Les clics de la semaine vont à `/blog/claude-pro-vs-team` (3, position 10,8), `/blog/claude-code-skills` (2, position 10,2), `/implantations/montpellier` (2), puis un clic chacune pour `/blog/claude-microsoft-copilot-pme` et `/politique-confidentialite`. La hausse du 21/10 (impressions x 2,6 par jour sur trois jours) est confirmée sur une semaine complète.

**Les 4 pages cibles CTR, 14 jours (12 au 25/10) contre les 14 précédents (28/09 au 11/10), console filtrée par page.**

| Page | Clics | Impressions | CTR | Position | Requête cible (collecte, 28 jours au 24/10) |
| --- | --- | --- | --- | --- | --- |
| `/ressources/outils/calculateur-roi-ia` | 0 / 0 | 6 / 10 | 0 % / 0 % | 39,3 / 7,2 | « roi ia » : 10 impressions, position 7,4, 0 clic ; 0 impression sur 7 jours |
| `/ressources/guides/claude-pme` | 0 / 0 | 242 / 152 | 0 % / 0 % | 33 / 31,5 | « diagnostic claude pme » : 26 impressions, position 9,3 ; 7 sur 7 jours à 10,4 |
| `/services/consultant-ia-claude` | 0 / 0 | 4 / 26 | 0 % / 0 % | 26,5 / 11,5 | « cabinet conseil ia pme » 5 impressions à 6,2 ; « prix consultant ia » 2 à 1,0 ; aucune sur 7 jours |
| `/ressources/comparatifs/claude-vs-chatgpt-pme` | 0 / 0 | 169 / 149 | 0 % / 0 % | 34,8 / 32,9 | « chatgpt vs claude » : 4 impressions, position 11,5 ; 2 sur 7 jours à 14,5 |

**Verdict.** Le CTR n'a monté sur aucune des quatre pages : 0 clic avant comme après. Le test de title n'est pas concluant, faute d'impressions en haut de page. Ce qui est mesuré, c'est la position :
- Calculateur : positions de 6 à 12 du 28/09 au 7/10 (1,0 le 3/10), aucune impression du 8 au 15/10, puis 28,5 le 16/10, 31 le 17/10, 85 le 19/10, 32 le 25/10. La page a perdu ses impressions sur « roi ia » entre le 7 et le 16/10, période où le title est passé de « Calculateur ROI IA : temps récupérable et budget maximal » (avant le 14/10) à « ROI IA : calculateur gratuit… » (14/10) puis « ROI IA : formule de calcul et calculateur gratuit » (16/10). Corrélation, pas preuve : la page a aussi changé de contenu le 16/10 (FAQ, formule).
- Consultant : positions de 2 à 18 du 28/09 au 9/10 (deux jours à 30,7 et 44), puis 27,5 le 16/10, 50 le 19/10, 1,0 le 21/10. Quatre impressions en 14 jours : trop peu pour conclure.
- `claude-pme` : son title n'a pas été réécrit du 13 au 16/10 (seule la description a changé le 14/10). Impressions en hausse, position stable, « diagnostic claude pme » stable vers 10.
- Comparatif : impressions en légère hausse, position stable, 4 impressions sur la requête cible en 28 jours.

**Décisions (propositions, aucun fichier de contenu modifié par cette entrée).**
1. Calculateur : revenir au title en ligne pendant la fenêtre de référence, en retirant `seoTitle_fr` pour que le title soit « Calculateur ROI IA : temps récupérable et budget maximal » (56 caractères), et reprendre la description d'avant le 16/10 : « Calculateur ROI IA gratuit : vos heures, votre coût horaire et vos hypothèses donnent le temps récupérable par an et le budget à ne pas dépasser. » (145 caractères). À faire dans une PR dédiée, puis relire « roi ia » trois semaines après.
2. Consultant : revenir au title d'avant le 13/10, « Consultant IA pour PME : conseil et mise en œuvre » (49 caractères), et à une description proche de celle d'alors : « Consultant IA pour PME : état des lieux, cas d'usage chiffrés, feuille de route, puis mise en œuvre par la même personne. Audit gratuit. » (136 caractères). Même PR, même relecture.
3. `claude-pme` : garder le title ; la hausse d'impressions ne justifie pas de toucher une page dont le title n'a pas changé. Si aucun clic au prochain relevé avec « diagnostic claude pme » toujours vers 10 : tester « Claude en PME : diagnostic, coût et plan sur 90 jours » (53 caractères, termes repris de la description actuelle).
4. Comparatif : garder ; 4 impressions sur la requête cible en 28 jours ne permettent pas de juger un title.

**Inspection d'URL (console, 27/10).** Les treize URL publiées du 14 au 16/10 sont toutes « Cette URL est sur Google », « La page est indexée » : `/blog/claude-max-pme`, `/blog/claude-pro-vs-team`, `/blog/facture-electronique-reception-pme`, `/blog/ai-act-pme-utilisatrice-ia` (inconnue de Google le 17/10), `/blog/claude-code-skills`, `/blog/cahier-des-charges-refonte-site`, `/blog/application-metier-exemples-pme`, `/blog/formation-ia-rh-pme`, `/blog/chatbot-rh-pme`, `/blog/audit-site-internet-pme`, `/blog/claude-cowork-windows`, `/ressources/outils/grille-audit-site-internet`, `/ressources/guides/automatisation-factures-fournisseurs-pme`. Aucun problème de découverte sur ce lot. Aucune demande d'indexation faite ce jour.

**Suivi des demandes du 19/10 (collecte W44, inspection API).** Neuf sur onze indexées (`/agence`, `/agence/methode`, `/cas-clients`, `/cas-clients/desangles-peinture`, `/ressources/comparatifs/claude-code-vs-cursor`, `/ressources/guides/devis-automatise`, `/secteurs/batiment`, `/services/cold-email-b2b`, `/services/referencement-ia`). `/services/systeme-acquisition` : « Détectée, actuellement non indexée ». `/services/automatisations` : « Google ne reconnaît pas cette URL » (aucun sitemap ni page d'origine détectés, confirmé dans la console le 27/10) alors qu'elle répond 200, figure dans `sitemap-0.xml` et est liée depuis l'accueil (deux liens) : retard de découverte, pas de défaut technique trouvé. Sitemap resoumis par la collecte (240 URL soumises, dernier téléchargement par Google le 25/10).

**Indexation globale.** Inspection API des 241 URL du sitemap : 173 indexées, 68 non indexées (47 « Détectée, actuellement non indexée », 11 « Google ne reconnaît pas cette URL », 5 noindex, 4 « Explorée, actuellement non indexée », 1 redirection). Le rapport Pages de la console affiche 159 indexées et 81 non indexées : les deux instruments ne comptent pas la même chose, pas de tendance à en tirer. Nouvellement indexées depuis le 25/10 : cinq pages, dont `/ressources/guides/claude-tpe` et `/services/webflow`.

**Web Analytics (13 au 26/10).** 203 visiteurs, 606 pages vues. Les 13, 14 et 15/10 valent 0 : 11 jours de données sur 14, pas de période « avant » comparable. Le 16/10 se lit aujourd'hui 42 visiteurs et 141 pages vues, et non 5 et 24 comme relevé le 16/10 en cours de journée : la base du 16/10 ne sert pas de point de comparaison. Référents : aucun pour 171 visiteurs, google.com 31, search.brave.com 3, bing.com 1, search.google.com 1, LinkedIn 1 ; ChatGPT 0. Pages les plus vues : `/` (44 visiteurs), `/404` (27), `/contact` (18), `/blog` (9), `/bienvenue/contact` (8), `/blog/claude-code-skills` (8), `/blog/claude-pro-vs-team` (8), `/ressources/diagnostics/maturite-ia` (7), `/tarifs` (7). Pages d'arrivée depuis un moteur ou LinkedIn : `/` 8, `/blog/claude-code-skills` 5, `/blog/claude-pro-vs-team` 5, `/blog/chatgpt-dots-europe-disponibilite` 4.

**Leads (alertes `[Lead]` depuis le 17/10).** 8 alertes : 6 tests de Simon (19/10, lead magnets et calculateur), 2 demandes de contact (23 et 26/10) qui sont du démarchage, l'une une offre de partenariat de marque non sollicitée, l'autre une prospection avec lien externe de réservation. **0 lead réel**, 0 demande de contact réelle. Cal.com : aucune réservation depuis le 17/10 (la recherche remonte bien les e-mails `cal.com` antérieurs, dont le dernier le 15/09). Limite : `/bienvenue/contact`, page servie après un envoi réussi de `/api/contact`, compte 8 vues (21/10 : 2, 23/10 : 1, 25/10 : 2, 26/10 : 3) pour 2 alertes ; les vues du 21 et du 25/10 n'ont pas d'alerte correspondante (visite directe, rechargement ou alerte manquante, non tranché).

**À mesurer ensuite.** Après la PR des titles calculateur et consultant : « roi ia » et « cabinet conseil ia pme » trois semaines après le déploiement. `/services/automatisations` et `/services/systeme-acquisition` à la prochaine collecte. L'écart entre vues de `/bienvenue/contact` et alertes `[Lead]`.

### 2026-W44 (session du 26 octobre 2026, collecte du 25 octobre 2026)

**Données** : collecte du 25 octobre 2026 à 21:48 UTC (`generatedAt`), fraîche oui (`freshness.mjs` : « FRAÎCHE · collecte complète de 8.9 h ») · Search Console configuré oui · étapes en erreur : aucune (9 étapes `ok`). Données de performance du 25 septembre au 22 octobre 2026 (28 jours) et du 16 au 22 octobre (7 jours). Flux : 128 entrées, 1 flux en erreur (`commission-europeenne-numerique`, HTTP 403). Concurrents : 10 URL nouvelles (kayro.ai 3, claudin.tech 7).

**PR de la semaine précédente encore ouverte** : PR #130 (2026-W43 : billet « apparaître dans ChatGPT », révisions n8n et Claude Skills, bilan des actions du 5 et 6 octobre). Ses entrées ne sont pas refaites ici. Les deux PR touchent le calendrier, le journal et `keywords.json` : la seconde fusionnée demandera une mise à jour. L'entrée `w44-revision-ai-act-calendrier-repit` ajoutée par la PR #130 est livrée ici sous l'identifiant `w44-revision-ai-act-norme-en-18286` (même page) : à passer à « abandonné » (« livrée par w44-revision-ai-act-norme-en-18286 ») au moment de résoudre le conflit.

**KPI** (28 jours au 22 octobre 2026, contre les 28 précédents) : clics 17 (+15) · impressions 4 652 (+4 554) · CTR 0,37 % (-1,67 point) · position 32,9 (+8,0, perte) · pages indexées 168 sur 240 inspectées. Sur 7 jours : clics 8 (+4) · impressions 2 768 (+1 827) · CTR 0,29 % · position 33,3 (-2,5, gain). Indexation : 10 pages nouvellement indexées, 0 nouvellement non indexée ; 52 « détectées, non indexées », 10 inconnues de Google, 4 « explorées, non indexées », 5 en noindex, 1 redirection. Sur les 23 URL vues pour la première fois (lot du 24 octobre, PR #135), 15 sont déjà indexées, 7 détectées non indexées, 1 inconnue. Indexing API : 61 notifications envoyées le 25 octobre (23 ajoutées, 38 modifiées, 0 erreur, quota 61 sur 200), des notifications et pas des pages indexées. IndexNow : « rien à envoyer ».

**Brave** : 61 URL dans la file du 26 octobre 2026 à 07:22 UTC (`brave-queue.mjs --from-sitemap --days=8`), 40 à soumettre par la tâche Brave, 21 à reprendre (`--offset=40`). Rien n'a été soumis par cette session.

**Bilan des actions précédentes**
- Les verdicts des actions du 5 et 6 octobre sont dans la PR #130, non fusionnée : non refaits ici.
- 2026-W41, `/ressources/comparatifs/claude-vs-chatgpt-pme`, « claude vs chatgpt » (à juger en W44) : trop tôt. Requête : position 16,9, 9 impressions sur 28 jours, sous le seuil de 30. Page : 284 impressions en position 33,0 sur 28 jours contre 12 en position 18,3 les 28 précédents ; 0 clic. Indexée.
- Titles réécrits du 13 au 16 octobre, relecture prévue à partir du 27 octobre : trop tôt (une seule semaine de données après réécriture). 7 jours au 22 octobre contre les 7 précédents : `claude-pme` 121 impressions (position 34,5) contre 68 (30,3) ; `claude-vs-chatgpt-pme` 85 (34,0) contre 61 (31,4) ; `consultant-ia-claude` 4 (26,5) contre 1 (18,0) ; `calculateur-roi-ia` 5 (40,8) contre aucune. 0 clic sur les quatre. Non retouchés.
- Demandes d'indexation du 19 octobre (11 URL) : 9 indexées à la collecte du 25 octobre (`referencement-ia`, `cas-clients`, `agence`, `agence/methode`, `cold-email-b2b`, `claude-code-vs-cursor`, `secteurs/batiment`, `devis-automatise`, `desangles-peinture`) ; 2 toujours « détectées, non indexées » depuis le 4 octobre (`/services/automatisations`, `/services/systeme-acquisition`).

**Actions de la semaine** (PR #139) : une création, deux révisions.

1. Création de `/blog/claude-extension-chrome` (entrée `w44-article-claude-extension-chrome`, planifiée en 2026-W44).
   - Pourquoi : entrée du calendrier, satellite du guide `/ressources/guides/claude-in-chrome-entreprise` (qui garde « claude extension » et le déploiement d'équipe ; ce guide est « détecté, non indexé » depuis une collecte : le billet lui ajoute un lien entrant, et le guide renvoie au billet en FR et EN, sans changer sa date).
   - Recherche en ligne : « claude extension chrome », « installer extension Claude Chrome tutoriel », « Claude in Chrome extension ne fonctionne pas connexion ». L'outil de recherche donne des résultats américains : ce sont eux qui ont été lus, ce qui donne des sources récentes ; le contenu français s'en inspire sans les reprendre. Pages lues le 26 octobre 2026 : <https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome>, <https://www.datacamp.com/tutorial/claude-for-chrome-ai-powered-browser-assistance-automation>, <https://travis.media/blog/claude-for-chrome-explained/>, <https://aimaker.substack.com/p/claude-chrome-extension-browser-automation-guide>, <https://atlas.utdallas.edu/TDClient/30/Portal/KB/Article/1599/Claude-for-Chrome>. Concurrents suivis, lus le 26 octobre 2026 : <https://www.claudin.tech/blog/claude-cowork-chrome-sans-connecteur> (15 août 2026 : session Cowork dans Chrome, injection, secteurs réglementés ; ni installation, ni modes, ni dépannage) et <https://www.claudin.tech/blog/claude-cowork-navigateur-integre-securite> (28 août 2026 : navigateur intégré contre extension, chiffres d'injection d'Anthropic, pilote de 5 à 10 personnes). Résultats américains récents lus le même jour : <https://claude.com/blog/claude-in-chrome-generally-available>, <https://findskill.ai/blog/claude-in-chrome-is-it-safe-2026/>, <https://gigazine.net/gsc_news/en/20260827-claude-chrome-available/>. Ce qu'ils ont changé : l'extension est généralement disponible sur toutes les offres payantes depuis le 26 août 2026 (le premier jet disait « bêta », d'après la page produit et la page de dépannage, qui le disent encore) ; « Automatically approve » est le mode par défaut depuis cette date, avec un classificateur qui compare chaque action à la demande. Ce qu'elles couvrent : installation, cas d'usage, risques d'injection. Ce qui manque : aucun tableau de dépannage, aucune correspondance entre anciens et nouveaux noms des modes. Ce qui est périmé : « réservée à Max » et liste d'attente (DataCamp, octobre 2025), « Haiku 4.5 sans choix » (The AI Maker, janvier 2026), « Sonnet 4.5 » (DataCamp), modes « Ask before acting » et « Act without asking », conseils de sécurité qui supposent les confirmations activées par défaut (travis.media, juillet 2026).
   - Ce que la page apporte : réponse directe et définition, installation en cinq étapes, tableau des trois modes (nom actuel, ancien nom, conseil), liste des actions et catégories de sites refusées, liaison avec Claude Desktop, raccourcis et tâches planifiées, tableau symptôme-cause-solution, autorisations Chrome expliquées, ce que les tutoriels disent à tort, « ne l'installez pas si », FAQ de six questions. Category `claude`, au maillage, cible ajoutée dans `keywords.json`.
   - Sources primaires : <https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome>, <https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide>, <https://support.claude.com/fr/articles/12902405-depannage-de-claude-dans-chrome>, <https://claude.com/chrome> (vérifiées le 26 octobre 2026).
   - À mesurer : `/blog/claude-extension-chrome`, requête « claude extension chrome » : page hors sitemap au 25 octobre 2026. Attendu : page indexée et premières impressions classées sur le billet, pas sur le guide. À juger à partir de 2026-W47.

2. Révision de `/ressources/guides/ai-act-pme-calendrier` (entrée `w44-revision-ai-act-norme-en-18286`, prévue en W44 par la PR #130 sous un autre identifiant).
   - Pourquoi : règle 4.1-4. Flux du 22 octobre 2026 (ActuIA, « AI Act : la première norme harmonisée ne couvre que le système qualité ») ; flux du 15 octobre (Journal du Net, ActuIA) sur un « répit ».
   - Recherche en ligne : « ai act calendrier application dates PME », « AI Act un an de répit sanctions PME octobre 2026 », « AI Act digital omnibus adopted high-risk obligations postponed 2027 », « EN 18286 harmonised standard ». Pages lues le 26 octobre 2026 : <https://www.donneespersonnelles.fr/ai-act-calendrier>, <https://hayot-expertise.fr/blog/ai-act-eu-2026-obligations-entreprises-pme>, <https://opsiocloud.com/fr/knowledge-base/ai-act-calendrier-dates-cles/>, <https://www.studeria.fr/articles-de-blog/ai-act-2026-obligations-tpe-pme>, <https://anthemcreation.com/intelligence-artificielle/digital-omnibus-ai-act-7-changements-pme-2026/>, <https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus>, <https://lne-gmed.com/news/ai-act-a-first-harmonized-standard-published-in-the-ojeu>. Ce qu'elles couvrent : dates de l'omnibus. Ce qui manque à toutes : la norme EN 18286. Erreurs relevées : statut de l'omnibus encore « à confirmer » (hayot, anthemcreation, studeria), dates du haut risque floues (studeria).
   - Ce qui a changé : dates relues dans l'article 113 (aucune ne change) ; paragraphe sur la décision d'exécution (UE) 2026/2274 et la norme EN 18286, avec ce qu'elle change pour une PME (rien de direct, sauf mise sur le marché ou article 25) et une lecture Waimia (la demander au fournisseur d'un système à haut risque) ; ligne du 14 octobre 2026 au tableau ; une FAQ ; sources ; dates de relecture distinguées (26 octobre pour l'article 113 et la norme, 16 octobre pour le reste) ; `updatedAt` au 26 octobre.
   - Sources primaires : <https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113>, <https://eur-lex.europa.eu/eli/dec_impl/2026/2274/oj>, <https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-10-15-en-18286-2026-published-in-ojeu/> (vérifiées le 26 octobre 2026). Relues aussi le 26 octobre 2026, à la demande de Simon : <https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-111>, <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai> (même calendrier, plus de date de mise à jour affichée), <https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force>, <https://www.cnil.fr/fr/entree-en-vigueur-du-reglement-europeen-sur-lia-les-premieres-questions-reponses-de-la-cnil> (mise à jour du 17 août 2026, mêmes dates), <https://www.entreprises.gouv.fr/espace-presse/la-dge-et-la-dgccrf-publient-le-projet-de-designation-des-autorites-nationales-en> (le schéma « doit être soumis au Parlement par le biais d'un projet de loi » : formulation du guide corrigée), <https://www.senat.fr/enseance/2025-2026/348/Amdt_442.html>, <https://www.assemblee-nationale.fr/17/projets/pl2518.asp> (seul le dépôt du 20 février 2026 apparaît). Concurrents lus : <https://www.claudin.tech/blog/ai-act-controles-effectifs-entreprises> (15 septembre 2026, mis à jour le 12 octobre ; pas de date reportée détaillée, pas d'EN 18286) et <https://www.claudin.tech/blog/ia-ressources-humaines-grille> (25 octobre 2026 ; dates de l'annexe III conformes au guide). Non confirmées le 26 octobre, gardées à leur date du 16 octobre dans le guide : la page de la Commission sur le code de bonnes pratiques (la version servie ne montre ni version finale, ni signataires) et celle des lignes directrices sur l'article 50 (affiche le 29 juillet 2026, le guide disait 6 août).
   - À mesurer : `/ressources/guides/ai-act-pme-calendrier` : 2 impressions en position 8,5 sur 28 jours au 22 octobre 2026, indexée. Attendu : guide exact à la prochaine échéance (2 décembre 2026) ; impressions sur « ai act calendrier » à relire à partir de 2026-W47.

3. Révision de `/blog/application-metier-exemples-pme` et de `/services/applications-internes` (entrée `w44-revision-application-metier-cible`, ajoutée cette semaine).
   - Pourquoi : règle 4.1-5, « application métier » (priorité 1) classée sur le billet et non sur la page cible (`onTarget: false`, cannibalisation) ; règle 4.1-2, billet dans `lowCtrPages` (454 impressions, position 28,8, 0 clic, toutes dans les 7 derniers jours).
   - Recherche en ligne : « application métier », « application métier définition exemples », « développement application métier sur mesure PME prix ». Pages lues le 26 octobre 2026 : <https://www.appvizer.fr/magazine/services-informatiques/apaas/application-metier>, <https://agence-scroll.com/blog/application-metier-sur-mesure-exemples-et-avantages>, <https://appmaster.io/fr/glossary/application-commerciale-sans-code>. Non lue (erreur du site) : la page de l'académie de Nancy-Metz, gardée à sa date du 16 octobre. Ce que montre la page de résultats : définitions et glossaires en tête, une page d'agence ; l'intention est informationnelle. Ce qui manque : aucune ne compare SaaS, ERP, sans code et sur mesure ; agence-scroll annonce sept exemples et en développe quatre, sans prix.
   - Ce qui a changé : billet : tableau des quatre types (présenté comme un classement de Waimia), deux FAQ, description, une source, `updatedAt` au 26 octobre ; page service : `seoTitle_fr` « Application métier sur mesure pour PME : code remis », définition recentrée sur « sur mesure », lien vers le billet (date inchangée, pas de changement de fond) ; `keywords.json` : cible de « application métier » basculée sur le billet, la page service garde « application métier sur mesure ».
   - À mesurer : `/blog/application-metier-exemples-pme`, requête « application métier » : position 29,5, 144 impressions sur 28 jours au 22 octobre 2026 ; page 454 impressions, 0 clic. Attendu : position sous 20 et au moins un clic ; « application métier sur mesure » classée sur `/services/applications-internes`. À juger à partir de 2026-W47.

**Relecture sceptique** : un sous-agent a relu les trois contenus avec la grille de la section 6. Verdicts : extension Chrome oui (correspondance des modes, liste datée des erreurs des tutoriels, tableau de dépannage) ; AI Act oui, mince (EN 18286 absente chez les autres, conclusion « rien à faire ») ; application métier non, ou à peine. Corrigé : Chrome, « une dizaine de minutes » retiré (aucune source), paragraphe sur le panneau Cowork réécrit, « consignes des e-mails » présenté comme une défense et non une garantie, colonne « cause » déclarée comme notre lecture, contradiction sur la consommation levée, source en doublon retirée ; AI Act, phrase « aucun texte adopté » contradictoire retirée, annexe I et article 25 ajoutés, dates de la décision clarifiées (adoptée le 12, en vigueur le 14 octobre), statut « Publiée, d'application volontaire » dans le tableau, usage concret pour une PME ajouté ; application métier, classement présenté comme celui de Waimia avec recoupements, exemple mal rangé corrigé, FAQ rendue actionnable. Non corrigé : pas de prix ni de délai par type d'application (aucune source lue n'en donne ; prix Waimia déjà dans le billet), pas de date de prix de la norme EN 18286 (non lue). Le billet application métier reste une révision de ciblage plus qu'un apport : la mesure de W47 dira si elle suffit.

**Vérifications** : build de production « Complete! » ; `check-head`, `check-jsonld`, `check-sitemap` (241 URL), `check-redirects`, `check-public-surface --prod`, `check-seo`, `check-static-quality` (0 violation bloquante), `check-internal-mesh` (235/235 au seuil, 0 orpheline), `check-silos`, `check-no-emdash`, `check-internal-links`, `check-content-refs`, `check-touchpoints`, `check-section-modules`, `check-news`, `check-config`, `check-calendar` : OK ; `astro check` : 8 erreurs (référence de `main`). Preuve visuelle sur le build servi : 5 pages à 1440 et 390 px, H1 visible (opacity 1), 0 erreur console ; un tableau à cinq colonnes débordait de 53 px à 390 px, ramené à quatre colonnes ; balayage des 241 pages du sitemap aux deux tailles : 0 débordement horizontal.

**Calendrier** : livré cette semaine : `w44-article-claude-extension-chrome` (création), `w44-revision-ai-act-norme-en-18286` et `w44-revision-application-metier-cible` (révisions). Mesuré : aucune entrée (les entrées « publié » d'octobre attendent la fusion de la PR #130, qui porte leurs verdicts). Ajoutées : `w49-article-acces-agent-ia-identifiants` (origine : quatre entrées de flux du 20 au 23 octobre 2026 sur la délégation aux agents IA et leurs identifiants : Le Monde Informatique, Journal du Net deux fois, Blog du Modérateur) et `w50-comparatif-navigateur-cowork-vs-claude-in-chrome` (origine : navigateur intégré de Cowork annoncé en déploiement sur la page d'aide lue le 26 octobre, nouvelle URL claudin.tech sur ce sujet). Prévu la semaine suivante (2026-W45) : création `w45-article-automatisation-processus-metiers`. 6 semaines d'avance (`check-calendar.mjs`), de 2026-W45 à 2026-W50. Abandonnée : `w50-comparatif-navigateur-cowork-vs-claude-in-chrome` (sujet couvert par une section du billet Chrome et par claudin.tech le 28 août 2026 ; son origine, un navigateur « en déploiement cette semaine », était fausse : il date de fin août). Remplacée par `w50-article-veille-reglementaire-automatisee` (origine : nouvelle page claudin.tech du 22 octobre 2026, lue ; angle : la chaîne de veille que Waimia fait tourner pour son propre site). Avertissements lus : `w43-article-apparaitre-dans-chatgpt-pme` en retard sur `main` (livrée par la PR #130, non fusionnée) ; `w44-article-claude-extension-chrome` « semble déjà exister » (c'est la page créée par cette PR, avant le passage à « publié »).

**Compléments du 26 octobre 2026, à la demande de Simon** (vérifications manquantes et lecture des nouvelles pages concurrentes)
- Nouvelles URL concurrentes de la collecte, toutes lues le 26 octobre 2026. kayro.ai : `agence-claude-code`, `agence-machine-learning`, `agence-automatisation-ia-geneve` (pages service nommées comme la requête, sans prix, chiffres non sourcés comme « 100 % de projets réussis », marqueur de relecture « [[À VÉRIFIER avec Kayro]] » laissé en ligne sur la page Claude Code). claudin.tech : `claude-enterprise-vs-chatgpt-enterprise` (24 octobre, prix par siège et résidence des données), `ia-ressources-humaines-grille` (25 octobre), `formation-claude-gratuite-ou-payante` (20 octobre), `veille-reglementaire-ia-modele` (22 octobre), `preparer-codir-ia` (21 octobre), `revue-nda-ia-grille-tri` (19 octobre), `ia-cgp-rapport-ecrit` (23 octobre). claudin publie un billet par jour sur des usages de Claude par métier, avec des estimations de gain présentées comme hypothèses et un même cas client (Voodoo) partout.
- Corrigé dans le billet Chrome après lecture : disponibilité générale au 26 août 2026 (au lieu de « bêta »), mode par défaut et classificateur, nouvelle section sur les pages piégées (chiffres d'Anthropic, présentés comme ses propres tests), nouvelle section « extension ou navigateur intégré de Cowork », deux FAQ, deux sources primaires.
- Build complet (avec outils internes) : « Complete! » (en local, il faut `NODE_OPTIONS=--max-old-space-size=6144`, sinon manque de mémoire ; la CI le passe). E2E contre le build servi : 83 passés, 38 ignorés (en local, avec le navigateur préinstallé : la version de Playwright du dépôt en attend une autre). CI de la PR : `gf1-sweep` vert sur fb51fee.

**Brouillon LinkedIn** : `docs/seo/posts/2026-W44.md` (une section, à relire et à publier par Simon ; un emplacement d'anecdote à remplir).

**Non retenu cette semaine**
- `claude-pme` et `claude-vs-chatgpt-pme` en `strikingDistance` et `lowCtrPages` : titles réécrits du 13 au 16 octobre, relecture prévue à partir du 27 octobre.
- `/ressources/outils/charte-ia-entreprise` (« charte ia pme » position 19,8, « charte gemini pme » 18,4) : plafond de révisions, à traiter une prochaine semaine.
- `/implantations/montpellier` (« agence ia hérault » 15,7), pages villes en `lowCtrPages` : pages locales, hors cadence.
- Publicité ChatGPT étendue à 26 pays (OpenAI, 21 octobre) : sujet publicitaire, hors positionnement.
- Article 88 bis du RGPD approuvé par le Conseil le 23 octobre (relevé dans un article tiers, non lu à la source) : à vérifier avant tout usage.

**Pour Simon**
- PR #130 encore ouverte : fusionner l'une puis mettre l'autre à jour (calendrier, journal, `keywords.json`).
- 18 pages sont non indexées depuis trois collectes (depuis le 4 octobre) : elles passeront la règle 4.1-3 en W45 si rien ne bouge. Les plus utiles à demander à la main dans Search Console : `/services/automatisations`, `/services/systeme-acquisition`, `/ressources/comparatifs/n8n-vs-make`, `/ressources/comparatifs/geo-vs-seo`.
- Bascule de cible « application métier » vers le billet : décision proposée dans la PR, à refuser si la page service doit rester la cible.
- Flux de la Commission européenne (`digital-strategy.ec.europa.eu/en/rss.xml`) en HTTP 403 cette semaine : à surveiller, retrait au bout de trois semaines.
- Écart à vérifier : la page de la Commission sur le code de bonnes pratiques, servie le 26 octobre, ne montre plus la version finale du 10 juin 2026 ni les signataires que le guide AI Act cite (lus le 16 octobre). Laissé tel quel, daté du 16 octobre.
- Le billet n'a pas d'illustration dédiée (illustration du silo Claude). À 1440 px, le H1 long du gabarit des billets chevauche l'illustration, comme sur `claude-cowork-windows` : comportement du gabarit, non modifié.

### Changement de stratégie, 24 octobre 2026 : création de pages assumée sur les agents IA toujours actifs, recomptage des pages (PR #135)

**Décision (Simon, 24 octobre 2026).** Pour le thème « agents IA toujours actifs et moteurs ouverts », la ligne du 13 octobre « renforcer sans créer, aucune page neuve » (`docs/audits/2026-10-13-strategie-seo-geo.md`, section 3) est remplacée par une création assumée. Raisons : produits lancés ou en forte demande (Claude Duet le 21 octobre, ChatGPT dots le 29 septembre, Hermes Agent, OpenClaw 2.0), Claude comme lance SEO/GEO (`strategy/10`), et une offre commerciale à construire autour des moteurs ouverts. Une requête = une page cible (`keywords.json`).

**Livré (22 pages).**

| Type | Pages | Cible principale |
| --- | --- | --- |
| Guides (4) | claude-duet, chatgpt-dots, hermes-agent, openclaw | requêtes de marque des produits |
| Comparatifs (2) | claude-duet-vs-chatgpt-dots, hermes-agent-vs-openclaw | « X vs Y » |
| Pages de service (3) | `/services/agents-ia-open-source` et deux sous-services `/services/integration-hermes-agent`, `/services/integration-openclaw` | « agence agent ia open source », « openclaw entreprise », « hermes agent entreprise » |
| Billets (13) | un billet de synthèse et douze billets d'appui (trois sur Claude Duet, trois sur ChatGPT dots, quatre sur Hermes Agent et OpenClaw, deux transversaux : missions et coût) | longue traîne précise de chaque guide |

Le parent de l'offre entre au menu Solutions (colonne Agents IA) et au pied de page ; les deux sous-services sont des déclinaisons du méga-menu et du plan du site. Plus de trente pages existantes renvoient vers ces contenus (liens et passages informatifs : fonctionnalités Claude, TPE, modèles, connecteurs, skills, plugins, RGPD, n8n auto-hébergé, second cerveau, services d'agents).

**Recomptage.**

| Mesure | Valeur | Source |
| --- | --- | --- |
| URL du sitemap, collecte W42 (18 octobre) | 217 | `docs/seo/data/2026-W42/summary.json` |
| URL du sitemap, build du 24 octobre | **239** (+22) | `dist/client/sitemap-0.xml` (blog 57, services 50, guides 49, comparatifs 14) |
| Inspectées par Google à la dernière lecture (18 octobre) | 217 des 239 | `docs/seo/data/state/gsc-index.json` |
| Indexées parmi elles | **143**, soit 65,9 % des inspectées et 59,8 % des 239 | idem |
| Non indexées parmi elles | 74 : 50 « détectée, non indexée », 10 inconnues de Google, 6 « noindex », 4 « explorée, non indexée », 4 redirections | idem |
| Jamais inspectées (les 22 nouvelles) | 22 | écart sitemap moins état |
| Maillage interne | 233 pages sur 233 au seuil de 3 liens entrants, 0 orpheline | `node scripts/check-internal-mesh.mjs` |

**Limites du recomptage.** Aucun accès à Search Console depuis cette session : le nombre de pages indexées n'est PAS remesuré, c'est celui du 18 octobre ; il se relit à la collecte 2026-W44. Certains états (noindex, redirection) peuvent précéder des correctifs. Une URL inspectée (`/blog/essai-pillar-ia-pme-2026`) n'est plus au sitemap.

**Écart à la règle de cadence.** `scripts/seo-routine/check-calendar.mjs` plafonne à 2 créations par semaine ; ce lot en compte 22 dans la semaine 2026-W43. Exception décidée par Simon, consignée dans `calendrier-editorial.json` (22 entrées « publié », PR 135). Les semaines suivantes reviennent à la cadence.

**Risque et suivi.** Chaque page ajoutée dilue la file d'exploration : 74 URL attendent déjà. Le quota de demandes manuelles est dépassé dès la première demande (entrée du 20 octobre), donc on compte sur le sitemap, l'Indexing API et IndexNow de la routine. Priorité de lecture à la collecte W44 : les 3 pages de service, les 4 guides, les 2 comparatifs. Aucune page n'est mise en `noindex` par précaution. Proposition à trancher par Simon si, à la collecte W45, moins de la moitié de ces neuf pages est explorée : revoir le maillage depuis les pages déjà indexées et regrouper les billets d'appui les plus faibles, sans les retirer sans 301.

**À mesurer.** Indexation des 22 pages ; impressions sur « claude duet », « chatgpt dots », « hermes agent », « openclaw », « claude duet vs chatgpt dots », « agent ia open source » ; demandes de contact dont la page d'arrivée est une des trois pages de service (`offer=agents-ia-open-source`).

**Pour Simon.** (1) Relire `chatgpt-dots` chez OpenAI : palier Pro, prix du siège Premium, régions Business Premium (écrits « à vérifier »). (2) Les billets sur ChatGPT dots sont à réviser après la fin du premier mois d'usage étendu (conditions d'usage à publier par OpenAI). (3) Aucune illustration nouvelle : les pages réutilisent des visuels existants.

### Mesure intermédiaire, 21 octobre 2026 (Search Console lue dans la console, données au 18/10)

**Source.** Rapport Performances, 28 derniers jours, ventilation par jour, lu le 21/10. Les données s'arrêtent au 18/10.

| Période | Jours | Clics | Impressions | Clics/jour | Impressions/jour | Position |
| --- | --- | --- | --- | --- | --- | --- |
| Avant : 9 au 15/10 | 7 | 4 | 941 | 0,57 | 134 | 28 à 44 |
| Après : 16 au 18/10 | 3 | 4 | 1 060 | 1,33 | 353 | 37,2 à 39,7 |

Détail après : 16/10 1 clic, 303 impressions ; 17/10 1 clic, 367 impressions ; 18/10 2 clics, 390 impressions. Sur 28 jours : 13 clics, 2 990 impressions.

**Lecture.** Hausse mesurée par jour : impressions x 2,6, clics x 2,3. Limites : 4 clics en tout, trois jours seulement, aucune ventilation par page faite ici, donc pas d'imputation à une action précise. La position moyenne baisse (plus de requêtes lointaines). À confirmer au 27/10 sur une semaine complète.

### Demandes d'indexation, 20 octobre 2026

**Résultat : quota quotidien Search Console dépassé dès la première demande.** Propriété `sc-domain:waimia.com`, champ « Inspecter n'importe quelle URL ». Deux URL sur onze inspectées, une seule demande tentée, refusée avec « Quota dépassé » (« Désolé, nous n'avons pas pu traiter cette demande, car vous avez dépassé votre quota quotidien. Veuillez réessayer de l'envoyer demain. »). Arrêt conformément à la consigne : les neuf autres URL n'ont pas été inspectées.

| URL | État d'inspection | Dernière exploration | Résultat lu à l'écran |
| --- | --- | --- | --- |
| `/services/seo-local` | « Cette URL est sur Google », page indexée (découverte par `sitemap-index.xml`, origine `/services/seo-geo-contenu` et `/services/automatisations`) | 13 oct. 2026, 18:16:24 | Aucune demande, comme prévu pour une URL déjà sur Google. Exploration antérieure à la réécriture des 15-16/10. |
| `/blog/seo-geo-etre-cite-par-les-ia-generatives` | « Cette URL n'a pas été indexée par Google », « Explorée, actuellement non indexée » | 29 juil. 2026, 04:15:08 | Demande tentée : « Quota dépassé ». Non demandée. |
| `/blog/agent-ia-vs-automatisation-classique-2026` | non inspectée | non lue | Non traitée (quota) |
| `/blog/tableau-de-bord-pme-quelles-donnees-suivre` | non inspectée | non lue | Non traitée (quota) |
| `/cas-clients/amploi` | non inspectée | non lue | Non traitée (quota) |
| `/ressources/comparatifs/n8n-vs-make` | non inspectée | non lue | Non traitée (quota) |
| `/ressources/comparatifs/geo-vs-seo` | non inspectée | non lue | Non traitée (quota) |
| `/cas-usages/finance-comptabilite` | non inspectée | non lue | Non traitée (quota) |
| `/ressources/outils/grille-taches-a-automatiser` | non inspectée | non lue | Non traitée (quota) |
| `/secteurs/e-commerce` | non inspectée | non lue | Non traitée (quota) |
| `/equipe/simon-beros` | non inspectée | non lue | Non traitée (quota) |

**Constats.** `seo-local` est déjà indexée : le statut « Explorée, actuellement non indexée » relevé le 19/10 ne s'applique plus ; la dernière exploration (13/10) précède pourtant la réécriture, donc Google n'a pas encore relu la version du 15-16/10. Les demandes d'indexation d'hier (19/10) ont probablement consommé le quota du jour (non mesuré : le quota exact n'est pas affiché).

**Pour Simon.** Reprendre demain (21/10) avec la même liste, en commençant par `/blog/seo-geo-etre-cite-par-les-ia-generatives` (priorité 1), puis les deux autres billets, puis la priorité 2. Aucun correctif de code n'est en cause.

### Diagnostic indexation et baisse de `claude-pme`, 19 octobre 2026

**Signal reçu (Simon, captures Search Console).** Recommandation « `/ressources/guides/claude-pme` -62 % » ; raisons de non-indexation : redirection 13, noindex 10, canonique 1 (`/contact?offer=wordpress&intent=premium`), explorée non indexée 7, détectée non indexée 35.

**Baisse de `claude-pme` : non imputable aux changements du 16/10.** Les données Search Console de la collecte W42 s'arrêtent au 15/10 ; la baisse compare le 9 au 15/10 à la semaine précédente, donc avant l'ajout du bloc `editorial-prose` (PR #126). Impressions 117 → 62, réparties uniformément sur les 19 à 20 requêtes de longue traîne (environ une par jour chacune), position 32,3 → 30,3, 0 clic avant comme après. Lecture probable : un outil de suivi de positions qui a cessé d'interroger ces requêtes, pas une perte de visibilité réelle. Aucune action corrective.

**Audit technique des URL listées (production, robots, canonique, sitemap, liens internes dans `dist`).** Aucun défaut.
- Redirection : 4 redirections volontaires (`google-ads-vs-meta…`, `landing-page-google-ads`, `relance-devis`, `integration-crm`) ; 4 répondent 200 aujourd'hui (`referencement-ia`, `sur-mesure-headless`, `cold-email-b2b`, `wordpress`), le rapport date d'explorations antérieures.
- noindex : rapport périmé, les pages concernées sont passées en index depuis ; restent normaux `/plan-du-site` (noindex voulu), `/demonstrations` (301), `/library` (404).
- Explorée, non indexée : `seo-local` et trois billets (qualité ou autorité, à retravailler plus tard) ; trois redirections normales.
- Détectée, non indexée (35) : toutes en 200, indexables, dans le sitemap et liées. Il manque l'exploration par Google, pas un correctif. Sitemap `sitemap-index.xml` : « Opération effectuée », lu le 18/10, 217 pages découvertes.

**Inspections et demandes du 19/10 (même méthode que le 17/10).**
- Déjà indexées : `/implantations/bordeaux`, `/services/wordpress`, `/services/sur-mesure-headless`, `/ressources/guides/ai-act-pme-calendrier`.
- « Indexation demandée » lue à l'écran (11) : `/services/referencement-ia` (exploration du 12/10 avec canonique vers seo-geo-contenu), `/cas-clients`, `/agence`, `/services/cold-email-b2b` (exploration du 7/10 en redirection), `/ressources/comparatifs/claude-code-vs-cursor` (exploration du 7/10 en noindex), `/secteurs/batiment`, `/ressources/guides/devis-automatise`, `/cas-clients/desangles-peinture`, `/services/automatisations`, `/services/systeme-acquisition`, `/agence/methode`.
- Pas de « Quota dépassé » rencontré ; arrêt volontaire à onze.

**À mesurer.** Au 27/10 (tâche programmée) : statut d'inspection de ces onze URL, total « Détectée, non indexée », impressions et clics de `claude-pme` sur données postérieures au 16/10.

### Demandes d'indexation, 17 octobre 2026

**Méthode.** Search Console, propriété `sc-domain:waimia.com`, champ « Inspecter n'importe quelle URL ». Pour chaque URL : inspection, contrôle que l'URL affichée est la bonne, clic sur « Demander une indexation », lecture de la confirmation. Pas de « Quota dépassé » rencontré.

**Résultat lu à l'écran.** Les six demandes ont affiché « Indexation demandée » (« Cette URL a été ajoutée à une file d'attente d'exploration prioritaire »).

| URL | État d'inspection avant la demande | Résultat |
| --- | --- | --- |
| `/blog/claude-max-pme` | connue : « Cette URL est sur Google », la page est indexée | Indexation demandée |
| `/blog/claude-pro-vs-team` | connue : « Cette URL est sur Google », la page est indexée | Indexation demandée |
| `/blog/facture-electronique-reception-pme` | connue : « Cette URL est sur Google », la page est indexée | Indexation demandée |
| `/blog/ai-act-pme-utilisatrice-ia` | inconnue : « Cette URL n'a pas été indexée par Google », « Google ne reconnaît pas cette URL » (aucun sitemap référent, aucune page d'origine) | Indexation demandée |
| `/blog/claude-code-skills` | connue : « Cette URL est sur Google », la page est indexée | Indexation demandée |
| `/blog/cahier-des-charges-refonte-site` | connue : « Cette URL est sur Google », la page est indexée | Indexation demandée |

**À noter.** Cinq URL sur six étaient déjà indexées : la demande vaut re-exploration, pas première indexation. `ai-act-pme-utilisatrice-ia` est la seule inconnue de Google ; elle n'est référencée par aucun sitemap lu par Search Console. À contrôler à la prochaine collecte : son entrée dans le sitemap soumis et son état d'indexation.

### Anciennes URL de l'export « backlinks pages », 16 octobre 2026

**Source.** Export Semrush `waimia.com-backlinks_pages.csv` (1 077 lignes) : ce sont les anciennes URL de nos propres domaines, pas des liens entrants. Elles viennent de l'ancien WordPress multisite (boutique, formations, démos de modèles sur demo.waimia.com), supprimé et refondu depuis en une seule entité sur waimia.com, sans sous-domaine. Aucune ne porte de backlink ni de domaine référent.

**Mesure du 16 octobre (chaque URL rejouée, redirections suivies).** demo.waimia.com : 462 URL, toutes en 404 (le sous-domaine ne résout que par l'enregistrement générique `*` de Vercel, rattaché à aucun projet). waimia.com : 553 en 404 (dont 337 après la 308 du slash final), 60 en 200 (les `?sc_product=`, `?sc_collection=`, `?page_id=` servent l'accueil, canonique `https://waimia.com/`), 2 en 403 (`wp-login.php`, `wp-comments-post.php`). Huit anciennes adresses `/ressources/blog/*` passent par la règle générique vers `/blog/*` puis tombent sur des billets supprimés : règle correcte, rien à corriger. Aucune URL morte n'a d'impression dans Search Console sur 56 jours.

**Décision.** Laisser ces URL en 404 : sans lien entrant, sans impression et sans équivalent actuel, une redirection de masse vers l'accueil ou vers `/cas-clients` serait lue par Google comme un soft 404 et n'apporterait rien. Simon a proposé de rediriger les démos vers `/cas-clients`, puis s'est demandé si la suppression définitive n'était pas plus pertinente : c'est l'option retenue, et elle est déjà effective. Les URL sortiront seules des outils au fil des recrawls.

### Base de conversions, 16 octobre 2026 (alertes internes, Cal.com, Web Analytics)

**Mesure.** Les formulaires (`/api/contact`, `/api/devis`, `/api/lead-magnet`) envoient à la boîte interne une alerte dont le sujet commence par `[Lead]`. Du 1er août au 16 octobre : 11 alertes, dont 8 tests internes (adresses de Simon, `contact@`, `resend.dev`), 1 démarchage SEO, et **1 lead réel** (7 octobre, une personne, diagnostic de maturité IA puis calculateur de ROI). Aucune demande de contact ni de devis réelle. Cal.com : aucun e-mail de réservation, seulement des lettres d'information (limite : une confirmation envoyée à une autre adresse échapperait à ce compte). Web Analytics : collecte active seulement depuis le 16 octobre (36 visiteurs et 118 pages vues ce jour-là, dont 1 venu de Google, une partie étant des vérifications internes), aucun relevé antérieur ; aucun événement personnalisé, le plan Hobby ne les enregistre pas et le code n'appelle pas `track()`.

**Lecture.** Les seuls leads réels viennent des outils à résultat calculé (diagnostic, calculateur), pas des téléchargements. Le calculateur est aussi la page outil la mieux placée (position 6,6 sur « roi ia », 14 impressions sur 28 jours).

**À mesurer le 27 octobre.** Recompter les alertes `[Lead]` réelles depuis le 17 octobre (requête Gmail `subject:"[Lead]" from:noreply@virtuoseweb.fr after:2026/10/17`, tests exclus) et les réservations Cal.com, à côté des clics Search Console.

### Première mesure avant/après, 16 octobre 2026 (collecte Actions 2026-W42)

- **GitHub Actions rétabli** : dépôt passé en public par Simon le 16 octobre ; CI de `main` verte (build, E2E, SEO), routine SEO relancée à la main et commitée (`chore(seo-data): collecte 2026-W42`).
- **Search Console, données finales arrêtées au 13 octobre** : 7 jours (7 au 13 octobre) contre les 7 précédents : clics 1 → 5, impressions 477 → 901 (+89 %), CTR 0,21 % → 0,55 %, position 27,4 → 32,3 (plus de requêtes, plus profondes). 28 jours au 13 octobre contre les 28 précédents : clics 5 → 8, impressions 80 → 1 536.
- **Pages qui reçoivent les clics** : `/formations/claude` (3 clics, 30 impressions) et `/ressources/guides/claude-rgpd-pme` (2 clics, 22 impressions) sur les 7 derniers jours ; la semaine d'avant, le seul clic allait à l'accueil.
- **Limite** : cette hausse mesure les vagues publiées avant le 13 octobre. Les titles réécrits du 13 au 16 octobre et les dix billets du 14 au 16 octobre ne sont pas encore dans les données (délai de Search Console) : relecture le 27 octobre.
- **Leads** : aucune mesure de conversion dans cette collecte ; l'alerte interne de chaque lead porte la page d'origine.

### Guide Claude Skills corrigé, 16 octobre 2026 (PR #121)

- **Synchronisation claude.ai vers Claude Code** : la documentation du 16 octobre dit environ 10 minutes en activité et environ 40 minutes au repos ; le guide disait « environ toutes les 10 minutes ». Corrigé en FR et EN, vérifié en production, envoyé à IndexNow.
- **Diffusion par plugin** : laissé tel quel. La phrase du guide vise le partage à l'organisation sur claude.ai (Team ou Enterprise) ; la documentation lue ne dit rien d'autre sur les offres requises.

### Contenu W48, 16 octobre 2026 (PR #119)

- **Articles** : `claude-code-skills` (« claude code skill », 480, KD 12 ; satellite du guide Claude Skills, documentation Claude Code relue le 16 octobre, exemple validé par `claude plugin validate`) et `cahier-des-charges-refonte-site` (« cahier des charges refonte site internet », 320, KD 21 ; satellite du guide cahier des charges ; aimant grille d'audit). Illustrés (`panneau-outils`, `maison-echafaudage`), au maillage, cibles basculées, liens retour depuis les deux guides en FR et EN.
- **Correction de rendu** : le tableau de redirections (6 colonnes) débordait de 133 px à 390 px ; points de coupure dans les chemins et colonne « Code » fusionnée dans « Décision ». Balayage : 214 pages, 0 débordement.
- **Calendrier** : deux satellites planifiés (W43 « apparaître dans chatgpt », guide visibilité IA ; W44 « claude extension chrome », guide Claude in Chrome) ; 6 semaines d'avance.
- **À reprendre (guide Claude Skills)** : il réserve la diffusion par plugin à Team ou Enterprise, alors que la documentation du 16 octobre décrit une marketplace Git sans offre requise ; il écrit « environ toutes les 10 minutes » pour la synchronisation, la documentation dit 10 minutes en activité et environ 40 au repos. À relire sur la source avant correction.

### IndexNow relancé, 16 octobre 2026

- **Constat** : dernier envoi IndexNow le 11 octobre ; la routine hebdomadaire tourne dans GitHub Actions, bloqué par la facturation. Aucune page publiée depuis n'avait été signalée à Bing (qui alimente aussi la recherche de ChatGPT).
- **Fait** : `node scripts/seo-routine/indexnow.mjs` lancé en local, réponse HTTP 200 : 214 URL du sitemap envoyées (97 nouvelles, 117 à `lastmod` changé). État dans `docs/seo/data/state/indexnow.json`.
- **Search Console** : nouvelle demande d'indexation refusée (« Quota dépassé ») ; `claude-max-pme`, `claude-pro-vs-team`, `facture-electronique-reception-pme` et `ai-act-pme-utilisatrice-ia` sont à demander le 17 octobre.
- **Tant qu'Actions est bloqué** : relancer IndexNow à la main après chaque mise en production.

### Contenu W47, 16 octobre 2026 (PR #116)

- **Articles** : `facture-electronique-reception-pme` (satellite du guide factures fournisseurs ; sources DGFiP, impots.gouv.fr, economie.gouv.fr, Service-Public, lues le 16 octobre ; montant de l'amende non cité, non relu sur Légifrance) et `ai-act-pme-utilisatrice-ia` (satellite du guide AI Act ; articles 3, 4, 26, 50 et 113 relus, dates identiques au guide). Illustrés (`boite-unique`, `conductrice`), au maillage ; les deux guides renvoient vers leur satellite en FR et EN.
- **Calendrier** : deux satellites planifiés pour garder 6 semaines d'avance : `claude-code-skills` (« claude code skill », 480, KD 12, guide Claude Skills) en W43 et `cahier-des-charges-refonte-site` (320, KD 21, guide cahier des charges) en W44.
- **À reprendre** : le guide factures dit n'avoir lu aucune source sur les PDF reçus ; le guide pratique DGFiP (réponse 3) couvre ce cas.
- **Preuves** : build 0, portes à la référence, 4 pages mesurées aux deux tailles (image, opacity 1, 0 erreur), balayage de 212 pages sans débordement, E2E 83 passés.

### Contenu W46, 16 octobre 2026 (PR #115)

- **Pourquoi ces deux billets** : les requêtes « agence » (n8n, IA PME) sont classées sur la bonne page, sans cannibalisation, mais en position 40 à 50 ; la page n8n compte déjà 4 552 mots : ce qui manque est l'autorité (liens entrants, action extérieure à Simon), pas le contenu. Le levier disponible tout de suite est le volume à faible difficulté : « claude max » (1 600, KD 20) et « claude pro vs team » visaient le guide des prix Claude.
- **Articles** : `claude-max-pme` et `claude-pro-vs-team`, satellites du guide `claude-fonctionnalites-pme` (prix relus sur claude.com/pricing le 16 octobre). Le guide renvoie vers les deux dans son corps. Illustrés (`camion-carton`, `canot-yole`), au maillage, cibles basculées dans `keywords.json`.
- **Calendrier** : les satellites factures passent de W49 et W50 à W43 et W47 (réception obligatoire depuis le 1er septembre) ; 6 semaines d'avance.
- **Preuves** : build 0, portes à la référence, 2 pages mesurées à 1366×768 et 390×844 (image chargée, opacity 1, 0 erreur console), balayage de 210 pages sans débordement, E2E 83 passés.

### Demandes d'indexation, 16 octobre 2026 (Search Console, inspection d'URL)

- **Dix demandes confirmées** (« Indexation demandée » lu à l'écran pour chacune) : `/implantations/bordeaux`, `/ressources/guides/automatisation-factures-fournisseurs-pme`, `/blog/relance-factures-impayees-automatique-pme`, `/blog/ia-reponse-appel-offres-pme`, `/blog/claude-cowork-windows`, `/blog/application-metier-exemples-pme`, `/blog/formation-ia-rh-pme`, `/blog/chatbot-rh-pme`, `/blog/audit-site-internet-pme`, `/ressources/outils/grille-audit-site-internet`. Quota quotidien atteint.
- **État à l'inspection** : les neuf pages publiées du 14 au 16 octobre étaient « Google ne reconnaît pas cette URL » (aucune découverte encore, sitemap non relu depuis). `/implantations/bordeaux` avait été explorée le 23 septembre avec un `noindex`, retiré depuis.
- **Déjà indexées, aucune demande** : `/services/audit-seo-technique`, `/ressources/guides/ai-act-pme-calendrier`.
- **Relecture** : avec celle du 27 octobre, inspecter ces dix URL ; une page toujours inconnue après dix jours signale un problème de découverte (sitemap, maillage), pas de contenu.

### Mesure de référence, 16 octobre 2026 (Search Console lue dans la console, Web Analytics)

- **Search Console, 28 jours (16 septembre au 13 octobre)** : 8 clics, 1 540 impressions, CTR 0,5 %, position moyenne 29,9. Les requêtes à impressions (« agence n8n », « agence ia pme », villes) sont en position 36 à 89 : le levier est la position, pas le titre.
- **En page 1 ou 2 sans clic** (cibles CTR) : « roi ia » 6,6 (`/ressources/outils/calculateur-roi-ia`), « diagnostic claude pme » 8,6 (`/ressources/guides/claude-pme`), « cabinet conseil ia pme » 6,2 et « prix consultant ia » 1,0 (`/services/consultant-ia-claude`), « chatgpt vs claude » 8,0 (`/ressources/comparatifs/claude-vs-chatgpt-pme`). Leurs titles ont été réécrits du 13 au 16 octobre, après la fenêtre mesurée : **ne pas les retoucher avant la relecture**.
- **Relecture** : à partir du 27 octobre (deux semaines de données sur les nouveaux titles), même lecture : CTR de ces quatre pages, clics totaux, position moyenne. Décision alors : garder ou réécrire.
- **Web Analytics, 16 octobre** : 5 visiteurs, 24 pages vues, sans référent ; 4 visiteurs ont vu une 404. Aucune URL connue de Search Console ne renvoie 404 (83 contrôlées, anciennes URL en 301) : origine non identifiée, à suivre.
- **Limite** : la collecte automatique Search Console est arrêtée (clé dans les secrets GitHub, Actions bloquées par la facturation).

### Contenu W45, 16 octobre 2026 (PR #112)

- **Articles** : `application-metier-exemples-pme` (satellite de `/services/applications-internes`, qui garde « application métier », 1 300 recherches mensuelles, et du guide refonte de logiciel métier) et `claude-cowork-windows` (satellite du guide Claude Cowork ; « claude cowork windows », 590 recherches mensuelles, basculée sur le billet). Illustrés, au maillage.
- **Correction** : le guide Claude Cowork affirmait qu'aucune fonction n'était réservée à un système ; Anthropic ne décrit l'utilisation de l'ordinateur en arrière-plan que pour macOS 15 ou plus. Phrase nuancée, lien vers le billet Windows.
- **Formulaires** (demande de Simon, PR #111) : un seul envoi par soumission vérifié sur tous les formulaires, au chargement direct et après navigation ; garde E2E permanente, falsifiée.
- **Calendrier** : deux satellites planifiés (Claude Max, AI Act côté PME utilisatrice).

### Contenu W44, 16 octobre 2026 (PR #110)

- **Guide pilier** `automatisation-factures-fournisseurs-pme` (sources DGFiP : réception obligatoire au 1er septembre 2026, émission des PME au 1er septembre 2027) et deux articles : `relance-factures-impayees-automatique-pme` (Code de commerce L441-10 et D441-5) et `ia-reponse-appel-offres-pme` (fiches Service-Public sur les marchés publics). Illustrés, déclarés au maillage, cibles basculées dans `keywords.json`.
- **Règle de Simon appliquée** : un sujet large reste un guide, entouré de 2 à 3 articles satellites qui le citent dans le corps. Le billet relance des impayés renvoie au guide ; deux satellites planifiés (réception de la facture électronique, saisie automatique des factures).
- **À mesurer** : volumes non mesurés par Semrush pour ces cinq requêtes (à mesurer au brief) ; impressions deux collectes après la mise en production ; alertes de lead par page d'arrivée.

### Contenu W43, 16 octobre 2026 (PR #109)

- **Articles** : `formation-ia-rh-pme`, `chatbot-rh-pme`, `audit-site-internet-pme` (requêtes de 390, 320 et 1 300 recherches mensuelles, cibles basculées dans `keywords.json`), illustrés et déclarés au maillage. Trois créations planifiées en remplacement (application métier, automatisation des processus métiers, formation IA générative).
- **Aimant** `grille-audit-site-internet` (demande de Simon) : PDF de 10 pages par e-mail, page outil, bandes de capture sur le guide cahier des charges, le guide refonte et `/services/site-web-ia`.
- **À mesurer** : alertes de lead dont la page d'arrivée est l'une de ces pages ; impressions des trois requêtes deux collectes après la mise en production.

### Illustrations en production, 16 octobre 2026 (PR #107, `0de8e586`)

- **Demande de Simon** : plusieurs pages créées n'avaient pas d'image. 20 illustrations dessinées avec le skill `waimia-illustration` (moteur B, SVG, aucune API payante) : 9 héros (6 guides, 3 comparatifs) et 11 billets récents.
- **Défaut trouvé** : le gabarit des billets (`essay`) ignore `body_sections[0].figures` ; les billets affichaient l'illustration par catégorie. Les 11 billets portent l'image en `heroIllustration`. Deux anciens billets (`automatiser-relance-devis-n8n`, `trier-emails-entrant-claude-n8n`) ont encore des `figures` non rendues : tâche séparée.
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, 20 pages mesurées à 1366×768 et 390×844 (image chargée, opacity 1, 0 débordement, 0 erreur console, bas des CTA des héros ≤ 725 px à 390×844), E2E 77 passés, preview 20 sur 20, production 20 sur 20.

### Vague 14 en production, 16 octobre 2026 (PR #105, `3d884315`)

- **Mesure** : Vercel Web Analytics activé et posé (composant Astro, injecté seulement lors d'un build Vercel). Première page vue comptée en production le 16 octobre. Une mesure maison (Neon, PR #104) a été construite puis fermée sur décision de Simon : Web Analytics est inclus dans le plan. Limite : les événements personnalisés (conversions) ne sont pas suivis ; l'e-mail interne de chaque lead porte déjà la page d'origine.
- **Contenu** : guide `cahier-des-charges-site-internet` (exemple de brief, méthode de Simon du 16 octobre, packs de 10 et 20 heures au taux horaire, option SEO/GEO, maillage vers le système complet) ; billet `ia-auto-hebergee-open-webui-pme` (accord de Simon), publié en article et non en guide.
- **Prix** : pages site web (hub, Shopify, Webflow, WordPress), prix d'entrée ramené au sprint de 10 heures.
- **Calendrier** : article « audit site internet » planifié en W48 ; 6 semaines d'avance. Orientation : plus d'articles que de guides (42 guides pour 32 billets le 16 octobre).
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, balayage des 202 pages à deux tailles (404 rendus, 0 défaut), E2E 77 passés, preview vérifiée sur le SHA (script d'analyse en 200), production vérifiée.

### Vague 13 en production, 16 octobre 2026 (PR #102, `bfd8bdb1`)

- **Conversion d'abord** : mesure sur le build, avant la vague, 23 pages du sitemap sur 193 portaient une bande de capture, et 12 des 15 pages à impressions n'en avaient aucune. Ajouts : 9 bandes `lead-capture-band` (aimants à pièce jointe : guide d'achat Claude, kit conformité, charte) et 50 appels vers les outils (diagnostic de maturité, grille des tâches, calculateur ROI), car les aimants-outils exigent un résultat calculé (`lead-magnet-delivery.ts` renvoie 400 sans lui). Après : 37 pages sur 200 avec bande, les 15 pages à impressions ont toutes une capture (777 impressions sur 777 de la collecte du 8 octobre).
- **Sept créations** planifiées en W43 à W47, publiées : guides `audit-geo-pme`, `accompagnement-ia-pme`, `refonte-logiciel-metier` (SERP vérifiée : refonte applicative, pas de site), comparatif `formateur-ia-organisme-freelance-agence`, billets `etre-cite-par-perplexity`, `formation-ia-marketing-pme`, `agent-ia-24-7-pme`. Déclarées au maillage.
- **Révisions** : cas d'usage `finance-comptabilite` (cadre CNOEC, secret professionnel, facture électronique) et `rh` (DPAE, CNIL, article 22) ; titre de `/tarifs` aligné sur « tarif agence IA » (révision abandonnée selon sa condition : page déjà indexée) ; promesse de l'audit gratuit alignée sur `/audit-ia-pme` dans `referencement-ia` et `mesurer-visibilite-ia-chatgpt` (décision du 14 octobre).
- **Calendrier** : 6 créations planifiées de W43 à W48 (formation IA RH, factures fournisseurs, chatbot RH, réponse aux appels d'offres, relance des impayés, cahier des charges site internet), 6 semaines d'avance, 0 avertissement.
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, balayage des 200 pages à deux tailles (400 rendus, 0 défaut), E2E 77 passés (5 nouveaux sur les captures, sans soumission), `lead-magnet-delivery` 18 sur 18, preview vérifiée sur le SHA, production vérifiée (8 URL en 200, sitemap 200, title de `/tarifs` servi).
- **Non fait** : mesure du CTR et des conversions (Search Console et CI bloquées par la facturation GitHub) ; secteurs sans bande (gabarit à `body_sections`) ; bande automatique de fin de billet (changement de gabarit, tâche dédiée).

### Vague 12 en production, 16 octobre 2026 (PR #101, `d315b66c`)

- **Cinq créations planifiées, publiées en avance** : comparatif `lovable-vs-developpement-sur-mesure`, billets `poc-ou-mvp-differences-pme`, `contenu-ia-seo-google-penalise`, `connecter-claude-wordpress-shopify-mcp`, `chatgpt-shopping-e-commerce` (disponibilité en France présentée comme non confirmée).
- **Sept révisions** : billet GEO aligné sur le guide de Google du 15 mai 2026 (viser l'IA générative reste du SEO) et sur le rapport Search Console IA générative ; `geo-vs-seo` recentré sur la décision de budget ; `ai-act-pme-calendrier` revérifié dans les articles 111 et 113 (délai du 2 décembre 2026 pour le marquage) ; `avis-n8n-vs-zapier-2026` (calcul des tâches Zapier corrigé), `n8n-vs-make`, `/services/automatisations`, `/services/sequences-de-suivi`. Frise de `/conformite-ia` complétée du 2 décembre 2026.
- **Revue Opus bloquante, corrigée avant fusion** : quatre affirmations contredites par leur source primaire (crédits Lovable : le site publié reste en ligne ; dépassement Zapier plafonné à 3 fois le quota de tâches ; dépassement n8n décrit seulement pour Business et Enterprise, corrigé aussi dans `n8n-prix` déjà en production ; délai AI Act du marquage) et trois réserves.
- **Calendrier et suivi** : sept créations planifiées de W43 à W47 (audit GEO, formateur IA, refonte de logiciel métier, formation IA marketing, agent IA 24/7, accompagnement IA, être cité par Perplexity), 6 semaines d'avance ; 14 requêtes ajoutées à `keywords.json` (pages des vagues 11 et 12, cibles à créer à `null`).
- **Preuves** : portes 37 sur 39, `astro check` 8 erreurs, balayage des 193 pages à deux tailles après corrections (386 rendus, 0 défaut), E2E 72 passés, preview vérifiée sur le SHA, production vérifiée (5 URL en 200, sitemap 193).
- **Mesure Lighthouse mobile en production (16 octobre)** : pages de contenu 88 à 98, SEO 100, accessibilité 96 à 97, CLS 0 ; accueil 75 à 95 selon le passage (1 761 éléments, 1,4 s de styles et mise en page).

### Vague 11 en production, 16 octobre 2026 (PR #100, `03af0de9`)

- **Six créations** sur des requêtes où les concurrents se classent sans page Waimia (analyse des exports Semrush du dossier `waimia seo` : noiise, kayro, ia4ops, lucasfonseque, bulk formation) : guides `claude-in-chrome-entreprise`, `prompt-engineering-pme`, `mesurer-visibilite-ia-chatgpt`, comparatif `chatgpt-claude-gemini-perplexity-pme`, billets `ai-mode-google-ai-overviews-pme` et `geo-local-recommande-par-les-ia`. Six autres sujets planifiés de W43 à W48 (Lovable ou sur mesure, POC ou MVP, contenu IA et Google, Claude avec WordPress et Shopify, ChatGPT Shopping, IA auto-hébergée) : la porte du calendrier passe de 0 à 6 semaines d'avance.
- **Révisions des pages à impressions sans clic** (collecte GSC du 8 octobre) : `automatisation-n8n`, `calculateur-roi-ia` (FAQ servie en accordéon, FAQPage), `consultant-ia-claude`. Secteurs `batiment`, `e-commerce`, `startup-logiciel` réécrits pour l'IA ; `startup-logiciel` entre dans l'index (décision du 5 octobre). Une page secteur qui déclare ses cas n'affiche plus qu'eux (`src/lib/sector-cases.ts`).
- **Design** : bandes de prose pleine largeur (110 contenus ; colonne de lecture inchangée à 656 px), tableaux et code de prose sans débordement, fonds alternés du comparatif Claude vs ChatGPT, héros de Montpellier, hub ressources, note de prix bornée.
- **Revue Opus** : ok avec réserves, corrigées avant fusion (cartes de cas hors sujet sur `startup-logiciel`, durée du sprint n8n, sources Studeria et SparkToro). Prix ChatGPT Business et Gemini Enterprise relus sur les pages officielles ; montant en euros de Workspace non relu (page servie en dollars).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs, balayage des 188 pages à deux tailles après corrections (376 rendus, 0 défaut), E2E 72 passés, preview vérifiée sur le SHA (9 pages, un H1, FAQPage, index), production vérifiée (7 URL en 200, sitemap 188, title n8n servi).
- **Non fait** : données Search Console à rafraîchir (identifiants seulement dans la CI, bloquée par la facturation) ; porte `semantic` (13 écarts de jetons DS, tâche DS dédiée).

### Vague 10 en production, 16 octobre 2026 (PR #99, `eb73dba7`)

- **Contenu** : guides `claude-tpe` (dirigeant seul et conditions grand public, comptes Team) et `claude-finance-pme` (factures, PDF, Excel, facturation électronique DGFiP 2026-2027), billet `agent-ia-entreprise-exemples`, section « Agence, freelance ou cabinet de conseil » dans `choisir-agence-ia-pme` (tarifs Freeland sourcés), pages services `agent-support-client` (chatbot à règles ou agent, article 50) et `applications-internes` (application métier ou logiciel du marché). Six entrées du calendrier publiées.
- **Revue Opus** : sources relues (Anthropic, Intercom, Salesforce, Freeland, DGFiP). Réserves corrigées avant fusion : réserve sur Pro et l'usage commercial ajoutée à `claude-for-small-business` (contradiction avec `claude-tpe`), limite PDF à 600 pages, marge d'environ 30 % du découpage des modèles depuis 4.7, accès de l'agent en lecture puis écriture. Laissé : « Quelques semaines, premier agent de support en production » (`agent-support-client`), qui ne l'attribue pas au sprint.
- **Preuves** : portes 37 sur 39 avec le numéro de PR (rouges connues), `astro check` 8 erreurs, balayage des 181 pages à deux tailles (362 rendus, 0 erreur, 0 débordement, 0 CTA hors écran), E2E 72 passés, preview vérifiée sur le SHA (200, un H1, marqueurs), production vérifiée (3 nouvelles URL en 200, sitemap 181 URL).
- **Rapprochements du dossier `waimia seo`** : « Pages with only one internal link » soldé (mesure sur le build, hors en-tête et pied : seules `/cgv` et `/mentions-legales` ont moins de 2 liens entrants) ; « Content not optimized » soldé (les 4 pages signalées le 9 octobre ont un paragraphe maximal de 68 à 69 mots).

### Vague 9 en production, 15 octobre 2026 (PR #98, `5a5881ab`)

- **Promesse du sprint** : 28 formulations « premier workflow/agent en production » remplacées par « prototypé et testé » sur les pages services Make, n8n, automatisations, agents IA, support client et la LP système IA marketing, alignées sur `/tarifs` (la mise en production relève du pilote). Faux positifs laissés : durées de mise en production d'un pilote, cas du marché.

### Vague 8 en production, 15 octobre 2026 (PR #97, `663f5b98`)

- **Contenu** : guide `claude-managed-agents` (17 sources Anthropic lues le 15 octobre), tutoriel Make `tutoriel-make-tri-emails-claude`, guide `second-cerveau-entreprise`, section « Combien coûte une automatisation n8n livrée ? » dans `n8n-prix`. Title de `/services/integration-claude` : « Agence Claude, intégrateur Claude pour PME : audit gratuit » (requêtes « agence Claude », « intégrateur Claude »).
- **Maillage local** : liens contextuels vers `/implantations/bordeaux` (5 → 14 dans le contenu), Montpellier (6 → 9), Lyon (8 → 11).
- **Écarté** : réindexer `/secteurs/comptabilite`. Décision du 5 octobre (les neuf secteurs restent en 301) et cannibalisation avec `/cas-usages/finance-comptabilite`.
- **Revue** : liens `<a>` affichés en texte brut dans deux guides, sprint présenté comme mise en production (contraire à `/tarifs`), crédits Make et modèles Haiku inexacts. Tout corrigé avant fusion.
- **Preuves** : portes 37 sur 39, `astro check` 8 erreurs, balayage des 178 pages (356 en 200, 0 débordement, 0 jeton brut), E2E 72 passés, preview balayée, production vérifiée (trois guides en 200, title servi).

### Vague 7 en production, 15 octobre 2026 (PR #96, `444eb942`)

- **Navigation** : entrée « Formations » au menu principal ; `/conformite-ia` et `/technologies` dans les panneaux ; H1 auteur « Simon Beros, architecte de systèmes IA » ; rubrique « Réalisations Waimia » sur `/cas-usages`, séparée des études de cas du marché.
- **Contenu** : six guides sourcés (relevés le 15 octobre) qui comblent les absents de la stratégie : transparence des chatbots (article 50), checklist RGPD des agents IA, n8n auto-hébergé et RGPD, coût d'un projet IA, aides au financement, architecture d'un agent SAV. FAQ article 4 de `/conformite-ia` alignée sur le texte modifié.
- **Design et qualité** : formation Claude rythmée par niveau, comparatif Claude vs ChatGPT aéré, carte Balzeo illustrée par la boutique (13 grilles), ids de titre uniques (31 pages avaient des doublons), titres masqués des bandes de cartes tirés du kicker.
- **Défaut attrapé par la revue** : neuf cartes « Pour aller plus loin » portaient un libellé à la place du lien (404 relatives). Réparées, et `check:content-refs` refuse désormais tout `href` qui n'est pas une adresse (falsifiée).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), balayage des 175 pages à deux tailles (0 débordement, 0 CTA hors écran), E2E 72 passés, preview balayée (26 mesures en 200), production vérifiée (six guides en 200).
- **Décisions pour Simon** : badges Meta Business Partner et Google Partner encore affichés (`src/data/eeat-proposals.ts`) alors que la stratégie les dit retirés faute de preuve ; mention « Activateur France Num » à confirmer.

### Vague 6 en production, 15 octobre 2026 (PR #95, `10da1e3f`)

- **Contenu** : cinq pages nouvelles sur des requêtes sans page dédiée : guides `quel-modele-claude-choisir`, `claude-gratuit` (usage commercial vérifié dans les conditions grand public d'Anthropic), `llm-rag-dirigeant`, `rpa-ou-agent-ia`, comparatif `mistral-vs-claude-pme`. Toutes reliées par le maillage interne et présentes au sitemap.
- **Maillage** : pied de page allégé (environ 26 liens), médiane des liens distincts par page 104 → 96, pages recevant 170 liens ou plus 98 → 90 (`mesure-liens.py` sur le build). Plan du site complet : les 169 URL du sitemap.
- **Performance** : feuilles CSS bloquantes 6 → 4 (petites feuilles intégrées au HTML).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), E2E local 72 passés et 38 ignorés (GitHub Actions bloqué par la facturation, CI rejouée en local), production vérifiée (les cinq pages en 200).

### Vague 5 en production, 15 octobre 2026 (PR #94, `a4ba5c5a`)

Demande de Simon du 15 octobre : traiter tout le contenu, tout le dossier `waimia seo`, le SEO/GEO et le design. Cinq audits en lecture seule (écart stratégie, écart audits du 5 octobre et Semrush, CTR/GEO des 99 pages d'offre, CTR/GEO des 62 ressources, design par gabarit), puis trois lots.

- **Titles et descriptions** : 103 titles et 68 descriptions changés sur 110 pages (mesure sur le HTML buildé avant et après). La requête reste en tête, suivie d'une raison de cliquer lue dans la page. Villes différenciées par un fait local. Jeton `prix.pilote` à la place de 2 000 € HT en dur dans 9 descriptions. Effet à lire en W43 et W44 dans `gsc-performance.json`.
- **GEO** : chapôs qui répondent dans les 80 premiers mots (services clés, 10 guides et comparatifs) ; blog : date de mise à jour affichée et `<time>` ISO, FAQPage servi par `FaqAccordion` sur 5 billets.
- **Conversion** : libellé unique « Réserver l'audit gratuit » et lien `/contact?offer=audit-ia-pme&intent=audit` (le fragment `#offer=` n'atteignait ni le serveur ni la mesure ; il reste lu pour les anciens liens) ; CTA du héros dans le premier écran à 1366×768 ; calendrier remonté sur `/contact` mobile ; cas et panneau auteur sur `/audit-ia-pme` ; bande CTA dans les fiches cas, le hub ressources, les billets, `/agence`, la page auteur.
- **Lisibilité** : chapô des héros 11 → 15 px, contrastes, libellés 9 → 11 px, comparatif replié sur mobile.
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), balayage des 176 pages à deux tailles en local et sur la preview (352 en 200, 0 débordement), revue Opus « ok », production vérifiée (9 liens `?offer=` sur l'accueil, 0 fragment, nouveau title de `/services/agents-ia`).
- **Hors dépôt, à Simon** : portrait, réglages Cal.com (description, semaine au lundi), demandes d'indexation, liens entrants.

### Mesure de la provenance des leads, 15 octobre 2026 (PR #92, branche `seo-v4/mesure`, non fusionnée)

Décision 2 du 14 octobre (mesure légère, maison, gratuite). Chaque alerte interne de contact et de lead magnet dit d'où vient la personne : source d'entrée (moteur, site, direct), page d'arrivée, page précédente et page du formulaire ; les journaux Vercel portent les mêmes champs (contact, lead magnet, newsletter) et Cal reçoit `metadata[landing]`, `metadata[entry]`, `metadata[prev]`. Ni cookie ni stockage : `window.wmLeadSource()` vit en mémoire pendant la visite ; politique de confidentialité v1.1. Défaut de production corrigé dans la même PR : un envoi de newsletter partait trois fois (3 POST mesurés sur waimia.com, 1 sur le build de la PR, au chargement et après navigation). Preuves locales : tests 18 sur 18 avec falsification, navigateur sur le build servi, `astro check` à 8 erreurs (référence), portes 36 vertes et 2 rouges connues. Non vérifié : l'enregistrement des `metadata` par Cal (exige une réservation réelle).

**Décisions de la nuit (Claude, mandat de Simon)** : pas de réécriture de title ni de description cette nuit, les pages candidates ayant déjà changé depuis le 8 octobre (effet à lire en W43 et W44) ; pas de lot de maillage (pages candidates déjà liées de 10 à 58 fois dans le corps des pages) ; pas d'embed Cal sur `/audit-ia-pme` (la page n'embarque aucune île React ; l'embed y ajouterait le client React et le script Cal sans preuve que l'étape `/contact` coûte des leads, à revoir avec la provenance mesurée) ; pas de création de guide (conditions de la stratégie non remplies).

### Décisions de Simon du 14 octobre 2026 · audit global SEO, GEO et conversion

Réponses de Simon aux dix questions de l'audit global du 14 octobre 2026 (9 dimensions, 117 constats retenus après relecture contradictoire). Elles sont acquises : ne pas les redemander.

1. **Bannière cookies** : la réduire à une barre compacte sur mobile, en gardant son style (couleurs, police, bordure). Pas de suppression.
2. **Mesure de conversion** : ajouter une mesure légère, open source ou maison (script et tableau de bord), sans outil payant. Cal reçoit très peu de réservations : l'effort va au référencement naturel, au GEO et à un contenu qui parle vraiment aux lecteurs, sans texte générique.
3. **Promesse de l'audit gratuit** : aligner partout sur `/audit-ia-pme`. Ajouter une partie site web et logiciel : Waimia fait aussi du développement web (sites et logiciels sur mesure). Sur les pages du sujet site web, recentrer les liens internes sur ce sujet au lieu de l'automatisation ou de l'IA, et séparer proprement les clusters. Créer les pages qui manquent, sur preuve de demande.
4. **`/services/seo-geo-contenu` et `/services/referencement-ia`** : garder deux pages différenciées, puis poser les liens « agence GEO » vers `/services/referencement-ia`.
5. **Pages créées les 12 et 13 octobre sans requête suivie** (5 villes, 6 secteurs) : les garder indexées. Point de contrôle le 11 novembre 2026 : sans impression à cette date dans `gsc-performance.json`, passer en `seo.noindex`.
6. **Siège** : Bordeaux, à uniformiser sur tout le site.
7. **Offre no code et Airtable** : aucune offre tant qu'aucune mission réelle n'est documentée ; le title de `/services/automatisations` se centre sur l'automatisation des processus métier.
8. **Description de l'événement Cal `simonberos/audit`** : elle existe ; proposer à Simon un texte de remplacement seulement si elle peut être améliorée.
9. **Mise en production** : validée.
10. **Italiques** : alléger l'accueil et `/manifesto` (paragraphes seulement, les accents serif des titres restent).

### Vague 1 en production le 14 octobre 2026 (PR #88, merge `b25b6b62`)

Neuf lots, intégrés puis prouvés sur la preview Vercel, puis en production : 11 marqueurs de contenu présents sur waimia.com, parcours Playwright à 390×844 et à 1440×900.

- **Mesures, avant puis après** :
  - bannière cookies en mobile : 141 px, puis 56 px ;
  - CTA du héros au-dessus de la bannière : 3 pages sur 11, puis 10 sur 11 ;
  - titres de plus de 60 caractères : 10, puis 0 ;
  - paragraphes longs : 33, puis 24 ;
  - contenu propre à la page de Toulouse : 16 %, puis 63 % ; de Lyon : 23 %, puis 61 %.
- **Exception sur `/tarifs` mobile.** Le fil d'Ariane ajouté sort de l'écran le CTA de l'étape 1, dont le bas passe à 907 px pour un écran de 844. En échange, le kicker n'est plus caché sous le header fixe, et le CTA « Audit gratuit » du header reste visible.
- **Chiffres retirés de la page sources, faute de source primaire lisible** : McKinsey (10 à 25 %), Clickzou, Batiweb, Warmly et CNB. Les six sources gardées ont été relues le 14 octobre.
- **Moteurs.** IndexNow et l'Indexing API sont laissés à la routine du dimanche, qui évite les doubles envois. Les demandes d'indexation manuelles dans Search Console restent à faire par Simon.
- **Siège.** Le registre officiel (recherche-entreprises, lu le 14 octobre) donne toujours l'établissement de Montpellier. « Basé à Bordeaux » est uniformisé, mais aucun identifiant légal bordelais (RCS, adresse, tribunaux) n'est écrit sans pièce.

### Vague 2 du 14 octobre 2026 · stratégie tirée des audits Semrush (branche `seo/vague2-1014`)

**En production le 14 octobre 2026 (PR #89, merge `40715069`).** Statut Vercel du commit de fusion : succès ; marqueur `id="site-web-logiciel"` présent sur waimia.com 60 s après la fusion. Sur la production : 21 contrôles de la vague 2 sur 21 (le même script donnait 16 KO sur la production précédente), 11 marqueurs de la vague 1 sur 11, CTA des héros à 390 sur 10 pages sur 11 (exception `/tarifs` inchangée), aucun débordement. Aucun envoi IndexNow ni demande Search Console manuels : routine du dimanche.

Source : lecture intégrale des 31 fichiers du dossier Semrush (PDF, xlsx, csv des quatre concurrents, audit du site, données Waimia), confrontée au dépôt ; stratégie en 39 lots, plan de design en 19 changements. Vingt lots écrits en worktrees séparés, chacun revu par Opus, puis intégrés ; le lot `catalogue` (composants partagés) part dans une PR distincte.

- **Promesse de l'audit** : une source unique, `AUDIT_PROMISE` (`src/data/conversion.ts`), avec une variante site web et logiciel liée à `/audit-ia-pme#site-web-logiciel`. « Trois automatisations rentables » : 175 pages, puis 0. Scan de la promesse sur `src/` : 834 signalements, puis 558, aucun fichier en hausse ; dans le HTML servi, aucune formule interdite ne décrit l'audit.
- **Clusters (décision 3)** : silos E-E-A-T `web` et `apps`, thème `web` du maillage, catégorie `web` sur 9 pages de site ; `/services/site-web-ia` ne lie plus l'automatisation (4 liens, puis 0). Nouveau guide `/ressources/guides/refonte-site-internet` (refonte site internet, 3 600, KD 28).
- **GEO (décision 4)** : `seo-geo-contenu` et `referencement-ia` restent deux pages ; libellé « Agence GEO : être cité par les IA » au méga-menu, au plan du site et au maillage ; anneau acquisition réordonné vers `referencement-ia`.
- **Technique** : `WebApplication` retiré des 5 outils (sans note ni avis, erreur Semrush), `Article` à la place ; `check:jsonld` suit ce choix. Accueil au sitemap avec sa barre finale, comme son canonical ; `check:sitemap` l'accepte. 301 de l'article Google Ads vs Meta Ads. Badges du panneau E-E-A-T dimensionnés (46 sans dimensions, puis 0). Schémas de pages régénérés : `check:page-schemas` passe de 5 erreurs à 0.
- **Plafond des méta descriptions** : 160 caractères (portes `check:head` et `check:seo`), pas 175 ; sept descriptions raccourcies, leçon d'`AGENTS.md` corrigée.
- **Contenu** : villes, formations, guides Claude, pilier IA, ressources et pages automatisation réécrits contre le texte générique ; aucun fait, client ni chiffre ajouté sans source.
- **Gelé, en attente de Simon** : visio ou sur site, siège légal, badges partenaires, prix « pilote » et « déploiement », Diag Data IA, page « agence web Montpellier », mesure de conversion.
- **Revue visuelle D1** (build servi, 390×844 et 1440×900) : espace avant « En savoir plus sur l'audit », panneau E-E-A-T mobile sous 1 800 px (environ 2 300 avant), métrique du guide de coût contenue, grille de cas de `/services/shopify` : Balzeo et Amploi, deux cas web, au lieu de Brow-X (cas de SAV, hors cluster) et Balzeo. Liens retirés des réponses de FAQ rendues en texte échappé (6 pages, 0 restante dans le build).
- **Revue Opus avant fusion** : aucun bloquant, les 15 bloquants de la phase 1 résolus. `check:jsonld` interdit désormais `WebApplication` et `SoftwareApplication` ; `check:sitemap` compare le canonical à l'identique et n'accepte l'accueil qu'avec sa barre. Les trois mutations correspondantes font rougir les portes.
- **Lot catalogue (PR #90, merge `393213f1`, en production le 15 octobre 2026)** : bande CTA finale à 414 à 548 px au lieu de 731 à 868 (390 et 1440, 8 pages) ; maillage « Sur le même sujet » une seule fois, avant la bande CTA ; « § 01 » retiré des blocs de prose à un seul H2 ; lede seul du héros en registre de lecture (CTA du héros toujours dans le premier écran : 638 px au plus à 390, 837 à 1440) ; TechWhenDual sur `.wrap-wide`. En production : statut Vercel du commit de fusion en succès, marqueur `hsm-lede--solo` présent sur waimia.com 80 s après la fusion, mêmes mesures que sur la preview.
- **Preuves locales (PR #89)** : portes `check:*` vertes sauf `semantic` et `hover-reflow` (hors CI, fichiers non touchés) ; `astro check` à 8 erreurs comme `main` ; Playwright 71 réussis ; marqueurs de la vague 1 : 11 sur 11 ; CTA des héros à 390 : 10 pages sur 11, comme en vague 1.

### Vague 3 du 15 octobre 2026 · restes mesurés après la vague 2 (branche `seo-v3/integration`)

**En production le 15 octobre 2026 (PR #91, merge `233a9426`)**, sur ordre de Simon (« met en prod ce qu'on a pour le moment »). Avant la fusion : Build (astro), E2E Playwright, SEO, tests de la routine et balayage GF-1 de la preview verts ; revue Opus des commits du parent « fusionnable », sans bloquant (ses mineurs sont repris dans la phase C). Après : statut Vercel du commit de fusion « success » ; marqueurs absents de la production avant la fusion, présents à 00:12 UTC (H1 `Ressources <i>IA</i> pour PME` sur `/ressources/outils`, « en six domaines » dans `/llms.txt`) ; les 35 pages touchées, les trois vues de ressources et `/llms.txt` en 200, aucun `{{prix` servi.

**Décisions de Simon du 15 octobre 2026**, acquises :
- Siège : « ok pour le siège, pas de RCS sans pièce », puis « c mon adresse a bdx c juste ». L'adresse d'activité de Bordeaux reste partout où elle est ; mentions légales inchangées tant qu'aucune pièce ne montre un siège bordelais.
- Ressources : « on voulait que les hub outils et comparatif disparaisse car se sont déjà des liens filtrables dans ressource et les liens affiche le bon filtre », puis « c les hub mais les filtres et les liens généré par les filtres doivent rester ». Appliqué : `/ressources/outils` et `/ressources/comparatifs` restent les URL des pastilles de filtre, sans 301 ; leur tête propre (H1, chapô, fil d'Ariane) est retirée, elles reprennent celle de `/ressources`. Title, description et indexation inchangés. `/ressources/guides` (non cité) garde sa tête.

**Six lots en worktrees, revus par Opus, puis intégrés** (phase A : navigation et hubs, services, ressources ; phase B : services, villes et GEO, promesse et clusters) :
- Méga-menu : « Commercial et visibilité » scindé en « Outils commerciaux » et « Site web, SEO et marque » ; `/llms.txt` tire le nombre de domaines du menu (six, au lieu de « cinq » écrit en dur).
- Services : formules creuses et chiffres sans source retirés, voix en « on », cartes de cas réalignées sur les fiches (rétention Balzeo écrite « de 32 % à 43 % »), FAQ « basés où » propres à chaque page, H1 de `/services` et `/implantations` sur leur requête.
- Faits Claude relus le 15 octobre sur la page tarifs d'Anthropic : Max dès 100 $ ; Claude Docs, Slides et Design inclus dans toutes les offres, Free comprise ; chartes de marque de Claude Design en bêta sur les offres payantes. Formation Claude et intégration Claude alignées.
- Villes et GEO : Lyon et Toulouse sur leurs requêtes, description de `/services/referencement-ia` sur « agence GEO et référencement IA », lien « agence GEO » depuis `/services/site-web-ia`.
- Cluster web : promesse de l'audit en variante site web sur la démonstration, redite corps et FAQ retirée de `/services/shopify`, source primaire Palantir pour l'article forward deployed engineer.

**Preuves locales** (build servi, 35 pages touchées) : 35 en 200 ; à 390×844 et 1440×900, aucun débordement horizontal et le CTA du héros dans le premier écran (783 px au plus à 390, 863 à 1440) ; aucun `{{prix` ni `<i>` échappé dans les 176 pages ; vues outils et comparatifs : H1 de `/ressources`, pastille active, seules les cartes du type, filtre de thème fonctionnel, aucune entrée de redirection dans `.vercel/output/config.json`, toujours au sitemap. Portes `check:*` vertes sauf `semantic` et `hover-reflow` (dette connue, fichiers non touchés) ; `astro check` à 8 erreurs comme `main`.

**Reste pour la phase C** (PR distincte) : chapôs de plus de 40 mots sur 35 pages de service, visuels de héros par sujet, alternance des fonds des villes, jeton de prix du sprint de cadrage, typographie des titres.

**Phase C (branche `seo-v3c/integration`, PR #93, non fusionnée)**. Quatre lots en worktrees, chacun revu par Opus, puis les mineurs des revues.
- **Chapôs** des 35 pages services : 40 mots au plus, deux phrases, intitulé recherché gardé.
- **Villes** : aucune section voisine au même fond sur les 10 villes, bloc Sources compris (fond calculé dans `[...slug].astro`) ; épingle au lieu du réseau générique sur 5 villes.
- **Héros** : un visuel par sujet sur 20 pages.
- **Ressources** :
  - chapôs directs ;
  - phrase MCP unique : « Anthropic examine les connecteurs de son annuaire, mais n'audite pas la sécurité des serveurs MCP » ;
  - ancres réécrites pour décrire leur cible.
- **Prix** : jeton `prix.sprint` (source `SCOPING_SPRINT_EUR`) à la place de 535 « 999 € » écrits en dur dans 78 fichiers. Le texte visible des 177 pages est identique avant et après, hors notes de prix allégées.
- **Titres** : insécable avant `? ! : ;`, imposée par la porte `check:title-typo`.
- **Dates** : `gen-lastmod` saute les commits marqués `Lastmod: ignore`. Instantané régénéré : `/outils-hub` retirée, 58 routes datées.
- **Débordement corrigé** sur le guide financement OPCO, présent en production : la variante `editorial` fige la première colonne sans retour à la ligne, et la page débordait de 872 px à 1440. Le tableau des sources passe en variante `default`.
- **Question ouverte à Simon** : le fil d'Ariane JSON-LD des vues `/ressources`, outils et comparatifs n'a pas de fil visible. La revue de #91 demandait de le retirer ; il est laissé en place, en attente de sa décision : le retirer, ou afficher un fil d'Ariane visible.

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

**Actions de la semaine** (PR #84) : une création, deux révisions.

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

### 2026-W42, lot 2 (demande de Simon du 12 octobre 2026, PR #85)

Demande de Simon après la PR #84 : régénérer et actualiser avec Claude Haiku 5.5 les pages et ressources concernées, créer la page Toulouse, la formation « Développer son projet avec Claude Code » et l'article « Logiciel SEO IA pour PME ». Les trois idées en attente depuis le 5 octobre sont donc tranchées par Simon.

1. Révisions Claude Haiku 5.5 (prix relus le 12 octobre 2026 sur platform.claude.com/docs/en/about-claude/pricing : 0,10 $ / 0,50 $ sous 100 000 jetons) : `agent-ia-definition`, `n8n-prix`, `roi-automatisation`, `trier-emails-entrant-claude-n8n`, `agent-ia-vs-automatisation-classique-2026`. Exemples recalculés, réserve de 30 % de jetons ajoutée.
2. PDF `guide-achat-claude-pme` régénéré (14 pages) : encadré sur les crédits API des plans Max et Team (support.claude.com/en/articles/17154008, lu le 12 octobre 2026).
3. Créations : `/implantations/toulouse` (modèle Lyon, rien d'inventé), `/formations/claude-code` (outils relus aux sources des éditeurs), `/blog/logiciel-seo-ia-pme` (prix des éditeurs relevés le 12 octobre 2026, sauf Semrush : page d'aide de février 2026).
4. Relecture sceptique par sous-agent : corrections appliquées (voir PR). Non vérifié : page tarifs Semrush actuelle, certification Qualiopi d'Akigora, disponibilité des dots en France.
5. Non modifié, à décider : mentions « Haiku 4.5 » dans les démos de sections, les variantes de page `content-marketing-intelligent`, `src/pages/[...slug].astro` et `_expertise-claude.astro` ; liste des villes dans le menu et la page agence.

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

