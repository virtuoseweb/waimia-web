# Waimia — Système de 4 landing pages

## Cahier des charges stratégique, copywriting, UX et instructions pour agent IA

**Version :** 17 juillet 2026  
**Marché :** PME françaises, principalement B2B  
**Objectif :** transformer le trafic issu de cold email, cold DM LinkedIn, cold call, SEO/GEO et publicité en rendez-vous qualifiés.

---

## 1. Décision stratégique

Waimia ne doit pas se présenter comme une agence généraliste qui vend « des sites, du SEO et de l’IA ». La promesse commune est plus forte :

> **Waimia conçoit les systèmes numériques qui permettent aux PME d’acquérir des clients et d’automatiser leurs opérations.**

La compétence technique est la raison de croire, pas le produit affiché. Le design premium, le développement, l’intégration de données, l’automatisation et les agents IA sont les briques utilisées pour obtenir un résultat métier.

Les quatre landing pages correspondent à quatre problèmes, quatre niveaux de maturité et quatre intentions d’achat différents.

| Page | Problème acheté | Offre principale | Décideur prioritaire | CTA principal |
|---|---|---|---|---|
| `/lp/systeme-acquisition` | Les outils et canaux ne forment pas un système | Système d’acquisition sur mesure, livré comme un logiciel | DG, direction marketing, direction commerciale | **Cartographier mon système** |
| `/lp/site-web-intelligent` | Le site présente l’entreprise mais ne fait pas avancer la vente | Site marketing ou e-commerce connecté aux données et au CRM | DG, direction marketing | **Recevoir un plan de refonte** |
| `/lp/visibilite-google-ia` | La marque risque de disparaître des réponses Google et IA | Audit puis programme SEO + visibilité IA | Direction marketing, responsable SEO/contenu | **Tester ma visibilité** |
| `/lp/systeme-ia-marketing` | L’équipe perd du temps dans des tâches répétitives et fragmentées | Audit des opérations marketing puis systèmes/agents IA | DG, direction marketing, responsable opérations | **Cartographier les tâches à automatiser** |

### Pourquoi « Systèmes IA marketing » plutôt qu’« Intégrateur Claude »

« Intégrateur Claude » peut être conservé comme page SEO secondaire, comme compétence ou comme angle de campagne. Ce n’est pas le meilleur nom d’offre principal :

- il vend un fournisseur avant de vendre le résultat ;
- il devient fragile si un autre modèle devient plus adapté ;
- un décideur cherche d’abord à gagner du temps, fiabiliser une opération ou augmenter sa capacité ;
- il enferme Waimia dans un rôle d’installateur alors que sa valeur est dans l’analyse, l’architecture et l’exécution.

Nom recommandé : **Systèmes IA pour équipes marketing**.  
Sous-titre technique possible : **Audit, intégration et agents IA avec Claude, OpenAI et vos outils métier.**

---

## 2. Ce qu’il faut dire — et ne pas dire — sur Google en 2026

### Statut français au 17 juillet 2026

Google AI Overviews et AI Mode ne sont pas encore disponibles publiquement en France. D’après un courrier privé adressé aux éditeurs français et révélé par la presse, leur arrivée est attendue **au plus tard le 23 septembre 2026**. Cette échéance n’est pas, à ce jour, une date de lancement public annoncée sur le blog officiel de Google.

Formulation de campagne recommandée :

> **Les réponses IA de Google arrivent en France. Le travail pour y apparaître commence avant leur déploiement.**

Badge daté possible jusqu’au lancement :

> **AI Overviews + AI Mode : déploiement annoncé d’ici le 23 septembre 2026.**

Éviter : « Google AIO arrive en France en septembre » présenté comme une certitude officielle ou comme un lancement le 1er septembre.

### La vérité utile sur `llms.txt`

Google indique explicitement qu’il **n’utilise pas `llms.txt`** pour Google Search, AI Overviews ou AI Mode. Ce fichier n’améliore ni la visibilité ni le classement dans Google.

Waimia peut proposer `llms.txt` comme élément expérimental, peu coûteux et maintenable pour des systèmes tiers susceptibles de le lire, mais jamais comme fondation de l’offre ou preuve d’optimisation.

Formulation recommandée :

> **Nous pouvons maintenir `llms.txt` lorsqu’il est utile à votre écosystème, mais nous ne le vendons pas comme un raccourci. Google l’ignore. La visibilité se gagne avec une base SEO accessible, des preuves originales, une marque identifiable et des contenus suffisamment utiles pour être repris comme source.**

### Ce qui compte réellement

1. **Éligibilité technique :** crawl autorisé, pages indexables, statut HTTP correct, contenu important disponible en texte, canonicals et maillage interne propres.
2. **Expérience de page :** mobile, rapidité, lisibilité, accès immédiat au contenu principal.
3. **Contenu non générique :** expertise démontrée, données propriétaires, exemples, procédures, comparaisons et limites clairement expliquées.
4. **Preuves :** auteurs identifiables, cas clients, dates, sources, méthodes, captures et résultats vérifiables.
5. **Entité de marque :** informations cohérentes sur le site et ailleurs, mentions tierces légitimes, profils et annuaires de qualité, avis et partenariats réels.
6. **Données structurées cohérentes :** utiles pour les résultats enrichis, sans prétendre qu’un schema spécial GEO existe.
7. **Contenu multimodal :** texte, images et vidéos utiles lorsque le sujet le justifie.
8. **Mesure :** Search Console, analytics, conversions, pages citées, tests de prompts et suivi des moteurs IA.
9. **Crawlers IA :** choix explicite dans `robots.txt`. Par exemple, autoriser `OAI-SearchBot` permet l’éligibilité aux résultats de recherche de ChatGPT ; cette décision est indépendante de l’autorisation donnée à `GPTBot` pour l’entraînement.
10. **E-commerce :** données produit propres, prix et disponibilité à jour, Merchant Center et flux produits lorsque pertinents.

### Comment les recherches changent

Les recherches génératives sont souvent plus longues, plus précises et suivies de questions complémentaires. Google explique qu’AI Mode et AI Overviews peuvent lancer plusieurs recherches connexes — le **query fan-out** — pour traiter les sous-sujets d’une même demande.

Le contenu doit donc couvrir un problème et ses décisions, pas répéter artificiellement toutes les variantes d’un mot-clé.

Exemples de requêtes à haute valeur pour Waimia :

- « Quelle agence peut refondre un site B2B et connecter HubSpot sans repartir de zéro ? »
- « Webflow ou WordPress pour un site marketing de PME avec une équipe interne ? »
- « Comment mesurer si mon entreprise est citée dans Google AI Overviews et ChatGPT ? »
- « Comment automatiser la production d’une campagne marketing sans perdre la validation humaine ? »
- « Quelle architecture pour qualifier des leads venant du SEO, de LinkedIn et des campagnes payantes ? »
- « Quel budget pour un site e-commerce sur mesure avec migration SEO et flux produits ? »

Ces requêtes appellent des pages de comparaison, des méthodes, des cas réels, des grilles de décision et des réponses sourcées. Elles ne justifient pas une collection de pages minces créées automatiquement.

---

## 3. Architecture du hub et des campagnes

### Le rôle de `/lp`

`/lp` peut être un espace de campagnes ou une page de sélection interne, mais il ne doit pas être la destination normale d’un prospect déjà qualifié. Un visiteur venant d’un email sur la refonte de son site doit arriver directement sur la page « Site web intelligent », pas devoir choisir parmi quatre offres.

Si le hub existe publiquement, il contient :

- un titre commun : **Quel système freine votre croissance ?**
- quatre grandes cartes orientées problème ;
- un routeur de deux questions maximum ;
- une preuve commune ;
- un CTA vers un échange d’orientation.

Chaque campagne pointe vers la page fille correspondant exactement au message d’origine.

### Une page canonique, plusieurs variantes de message

Ne pas créer des dizaines de copies indexables. Utiliser :

- une page canonique par offre ;
- des variantes de hero pilotées par le canal ou un paramètre de campagne ;
- des pages publicitaires non indexées uniquement lorsqu’un niveau de personnalisation plus profond est nécessaire ;
- une personnalisation légère par secteur lorsque l’exemple et les preuves changent réellement.

Paramètres utiles :

```text
?src=cold-email&angle=fuite-leads&sector=conseil
?src=linkedin&angle=systeme&sector=industrie
?src=call-followup&angle=refonte
?src=ads&angle=agence-seo-ia
```

Les paramètres alimentent aussi les champs cachés du formulaire et le CRM.

### Adaptation au canal

| Canal | État du prospect | Premier écran | Preuve à montrer tôt | Conversion recommandée |
|---|---|---|---|---|
| Cold email | Froid, peu de confiance | Reprendre précisément le problème annoncé dans l’objet | Mini-audit, capture personnalisée, exemple proche | Voir le diagnostic puis réserver |
| Cold DM LinkedIn | Connaît le profil ou le contenu | Angle simple, humain, peu institutionnel | Travail en cours, cas ou démonstration visuelle | Répondre ou réserver 20 min |
| Cold call + email | Problème déjà évoqué | Continuité explicite avec l’appel | Méthode, périmètre, calendrier | Calendrier direct |
| Ads Search | Intention déclarée | Reprendre le besoin/mot-clé sans détour | Résultat, spécialisation et prix indicatif | Audit ou rendez-vous |
| Ads Social | Problème latent | Hook de rupture + mécanisme visuel | Avant/après, symptôme reconnu | Diagnostic court puis rendez-vous |
| SEO/GEO | Recherche et comparaison | Réponse utile avant la vente | Expertise, sources, méthode, cas | Audit ou contenu connexe puis rendez-vous |

### Règle de conversion

Chaque page possède :

- **un seul objectif principal** : le rendez-vous qualifié ;
- un CTA principal répété avec le même libellé ;
- un CTA secondaire discret vers une preuve ou un exemple, jamais vers une autre offre ;
- un formulaire court avant le calendrier : prénom, email professionnel, entreprise, site, enjeu principal ;
- 3 à 5 questions de qualification après la réservation, pas avant ;
- un calendrier embarqué ou ouvert sans rupture visuelle ;
- une page de confirmation avec préparation du rendez-vous et un cas client pertinent.

---

## 4. Direction artistique et rythme communs

### Positionnement visuel

Le site doit donner trois impressions simultanées :

1. **Waimia sait concevoir des interfaces premium.**
2. **Waimia comprend les systèmes, les données et les intégrations.**
3. **Le résultat reste lisible pour un décideur non technique.**

La bonne référence n’est ni le SaaS bleu générique, ni le portfolio d’agence Awwwards qui cache le contenu derrière des effets. Le design doit être éditorial, dense en preuves et animé seulement lorsque le mouvement explique le système.

### Palette Waimia

- accent : `#C94F2E`
- accent sombre : `#A83D20`
- encre : `#0C0B09`
- encre 2 : `#1A1814`
- encre 3 : `#2B2620`
- texte secondaire : `#6B6560`
- texte discret : `#9A948D`
- papier : `#F6F1E8`
- papier 2 : `#EFE9DD`

Utiliser l’accent pour les décisions, états actifs, flèches, indicateurs et CTA ; pas pour colorer tous les titres.

### Grammaire visuelle

- grands titres éditoriaux, lignes courtes et contrastées ;
- cartes asymétriques, séparateurs fins, numérotation technique discrète ;
- schémas de flux simples et réellement explicatifs ;
- captures annotées, extraits de livrables et interfaces manipulables ;
- une image ou démonstration « héroïque » par page, pas une mosaïque décorative ;
- pas de photos de bureaux, poignées de main, robots ou cerveaux lumineux ;
- pas de faux dashboards ni de chiffres inventés.

### Rythme de page

Alterner :

1. une ouverture très claire ;
2. un bloc de tension court ;
3. une démonstration visuelle riche ;
4. une section aérée de bénéfices ;
5. une preuve concrète ;
6. un bloc de décision plus dense ;
7. une respiration ;
8. un CTA.

Éviter dix sections constituées des mêmes trois cartes. Varier entre plein écran, tableau, sticky storytelling, comparaison, bandeau de preuves, capture annotée et FAQ.

### Comportement mobile

- message et CTA visibles sans dépendre d’une animation ;
- démonstrations transformées en étapes verticales ;
- sticky CTA discret après le premier écran ;
- taille de cible tactile minimale de 44 px ;
- pas de carrousel obligatoire pour comprendre l’offre ;
- performance et stabilité visuelle prioritaires.

---

## 5. Colonne vertébrale de conversion commune

Les pages partagent une logique, pas une succession identique de composants.

1. **Hero :** problème, résultat, cible, CTA, réduction du risque.
2. **Confiance immédiate :** logos, cas, technologies ou phrase de spécialisation vérifiable.
3. **Symptômes :** faire reconnaître la situation actuelle.
4. **Changement de modèle :** montrer pourquoi une prestation classique ne suffit pas.
5. **Mécanisme :** expliquer comment Waimia produit le résultat.
6. **Livrables :** rendre l’offre tangible.
7. **Démonstration :** interface, schéma, extrait d’audit, avant/après ou mini-outil.
8. **Preuve :** cas client, métrique, témoignage, capture ou artefact.
9. **Méthode :** étapes, durée, responsabilités.
10. **Périmètre et adéquation :** pour qui / pas pour qui.
11. **Offre et risque :** point d’entrée, fourchette ou manière de chiffrer.
12. **Objections :** FAQ courte.
13. **CTA final :** résultat attendu du rendez-vous et prochaine étape.

Si une preuve manque, ne pas la remplacer par une promesse. Utiliser un artefact : extrait de livrable, prototype, audit commenté, méthode, capture d’intégration ou démonstration en direct.

---

# 6. Landing page 1 — Système d’acquisition

## Angle

Waimia ne vend pas une addition d’outils ou de campagnes. Waimia conçoit un système sur mesure qui attire, qualifie, route, relance et mesure les prospects.

### Hero recommandé

**Surtitre :** Système d’acquisition sur mesure pour PME B2B

**H1 :**  
**Votre acquisition ne manque pas d’outils. Elle manque de système.**

**Sous-titre :**  
Waimia relie votre site, vos campagnes, vos contenus, votre CRM et vos données dans un logiciel d’acquisition conçu autour de votre cycle de vente.

**CTA principal :** Cartographier mon système  
**CTA secondaire :** Voir un système en fonctionnement

**Réassurance :** 30 minutes · aucun engagement · vous repartez avec les trois fuites prioritaires à corriger.

### Variante Ads Search

**Un système d’acquisition conçu comme un logiciel — pas un empilement de prestations.**

### Démonstration du hero

À droite, un flux animé contrôlé par le scroll :

```text
SEO / Ads / LinkedIn / Outbound
          ↓
Pages par intention et persona
          ↓
Capture → qualification → scoring
          ↓
CRM → routing → relance → rendez-vous
          ↓
Mesure → apprentissage → amélioration
```

Un interrupteur « système fragmenté / système connecté » modifie le flux. Il doit expliquer la différence en moins de cinq secondes.

## Structure détaillée

### 1. Reconnaissance — « Là où le système fuit »

Trois situations, formulées sans jargon :

- les canaux génèrent des visites mais personne ne sait lesquelles deviennent des opportunités ;
- les leads arrivent dans plusieurs outils, sans qualification ni suivi homogène ;
- le reporting décrit le passé mais ne dit pas quelle action lancer ensuite.

**Hook :** « Le problème n’est pas toujours d’obtenir plus de trafic. C’est de ne pas perdre celui que vous payez déjà. »

### 2. Comparaison — Prestations isolées vs système

| Prestations isolées | Système Waimia |
|---|---|
| Chaque canal a ses chiffres | Une définition commune du lead et de l’opportunité |
| Le site collecte un formulaire | Le site qualifie et route |
| Les relances dépendent d’une personne | Les relances utiles sont déclenchées, les décisions restent humaines |
| Les outils accumulent de la dette | Les données et responsabilités sont documentées |
| Les améliorations sont ponctuelles | Le système apprend grâce aux conversions réelles |

### 3. Architecture interactive

Afficher cinq couches cliquables :

1. **Attirer :** SEO, GEO, outbound, paid, contenus.
2. **Convaincre :** pages, preuves, personnalisation, outils interactifs.
3. **Capturer :** formulaires, calendriers, chat, ressources.
4. **Qualifier et transmettre :** scoring, enrichissement, CRM, routing.
5. **Mesurer et améliorer :** événements, pipeline, attribution utile, alertes.

Chaque clic révèle : objectif, livrable, signal de réussite et outils possibles.

### 4. Ce que Waimia dépose chez le client

- l’architecture cible ;
- les pages ou applications nécessaires ;
- les intégrations et automatisations ;
- le modèle de données et les événements ;
- les tableaux de pilotage utiles ;
- le mode opératoire et la formation ;
- un backlog d’optimisation priorisé.

### 5. Cas client ou preuve de travail

Format recommandé : situation → fuite identifiée → système construit → résultat → ce qui a été écarté.

Sans métrique publiable, montrer un plan d’architecture anonymisé, une capture de routing ou un extrait de cahier de recette. Insérer explicitement `[PREUVE À FOURNIR]` tant que l’élément n’existe pas.

### 6. Méthode

1. **Observer :** offre, cycle de vente, données, outils, trafic.
2. **Modéliser :** parcours, définitions, responsabilités et architecture.
3. **Construire :** interfaces, intégrations, automatisations.
4. **Instrumenter :** événements, tableaux, alertes et recette.
5. **Transmettre :** documentation, formation, backlog.

### 7. Offre

Point d’entrée recommandé : **Blueprint du système d’acquisition**, éventuellement facturé puis déduit du projet.

Fourchettes à tester, à confirmer selon le marché et les références :

- blueprint : 1 500 à 3 000 € HT ;
- construction d’un premier système : 8 000 à 25 000 € HT ;
- amélioration continue : forfait ou régie mensuelle.

Ne pas publier de prix tant que Waimia n’a pas défini précisément ce qui est inclus. Si la fourchette reste masquée, expliquer au minimum les trois facteurs de coût.

### 8. Pour qui / pas pour qui

**Adapté si :** offre validée, plusieurs canaux, CRM ou volonté de le structurer, responsable interne disponible.  
**Pas adapté si :** absence d’offre claire, recherche d’une campagne miracle ou volonté d’automatiser sans propriétaire interne.

### 9. FAQ

- Est-ce un CRM ?
- Faut-il remplacer nos outils ?
- Pouvez-vous travailler avec HubSpot/Pipedrive/Notion ?
- Qui possède le code et les données ?
- En combien de temps un premier système est-il utilisable ?
- Que reste-t-il à notre équipe après la livraison ?

### CTA final

**Voyons où votre acquisition perd des opportunités.**  
En 30 minutes, nous cartographions le parcours actuel, les ruptures et la première brique à construire.

---

# 7. Landing page 2 — Site web intelligent

## Angle

Le site n’est ni une œuvre décorative, ni un simple support de communication. C’est l’interface centrale entre la demande, le contenu, la qualification, le CRM et la vente.

### Hero recommandé

**Surtitre :** Sites marketing et e-commerce pour PME

**H1 :**  
**Votre site ne devrait pas seulement présenter l’entreprise. Il devrait faire avancer la vente.**

**Sous-titre :**  
Waimia conçoit des sites premium qui attirent la bonne demande, adaptent le parcours, qualifient les visiteurs et transmettent des données exploitables à vos équipes.

**CTA principal :** Recevoir un plan de refonte  
**CTA secondaire :** Explorer un parcours intelligent

**Réassurance :** Design, développement, SEO, données et intégrations réunis dans une seule équipe technique.

### Hero visuel

Une page de site réelle se transforme en parcours :

```text
Visiteur → intention reconnue → contenu/preuve adapté → action → CRM
```

Montrer la qualification et la transmission, pas une animation abstraite de particules.

## Structure détaillée

### 1. Trois niveaux de maturité

1. **Absent ou invisible :** le marché ne trouve pas l’entreprise.
2. **Vitrine :** le site rassure mais ne mesure ni ne qualifie.
3. **Système :** le site attire, guide, capture, transmet et apprend.

**Hook :** « Une refonte n’a de valeur que si elle améliore ce qui se passe avant et après le clic. »

### 2. Ce qui rend le site intelligent

- architecture par intention et persona ;
- propositions de valeur et preuves contextualisées ;
- contenus SEO et réponses utiles aux moteurs IA ;
- formulaires, quiz, calculateurs ou configurateurs lorsque pertinents ;
- événements et données reliés au CRM ;
- routing, alertes et relances ;
- boucle d’amélioration fondée sur les conversions.

Préciser : « intelligent » ne signifie pas ajouter un chatbot partout.

### 3. Parcours interactif

Proposer trois entrées :

- **Je compare une solution** ;
- **J’ai un besoin précis** ;
- **Je découvre le problème**.

Le visiteur voit comment les titres, preuves, CTA et informations demandées évoluent. Ce mini-prototype doit être une preuve de la compétence UX de Waimia.

### 4. Deux familles, une même exigence

#### Site vitrine marketing

Pour les entreprises qui vendent une expertise, un service ou une solution complexe. Priorités : compréhension, autorité, qualification et passage au commercial.

#### Site e-commerce

Pour les catalogues et transactions. Priorités : données produit, filtres, vitesse, réassurance, disponibilité, flux Merchant Center, mesure et réduction des frictions.

Créer des variantes de campagne `type=marketing` et `type=ecommerce`. Ne pas essayer de faire tenir les deux promesses dans le H1 principal.

### 5. Choix de la technologie

| Besoin | Option souvent adaptée | Message |
|---|---|---|
| Équipe marketing autonome, édition visuelle | Webflow | Rapidité d’édition et gouvernance visuelle |
| Écosystème de contenus ou besoins WordPress existants | WordPress | Continuité, extensibilité et migration maîtrisée |
| Performance, contenu structuré, intégrations sur mesure | Astro/headless | Contrôle, rapidité et architecture technique |
| Catalogue/transaction | Plateforme e-commerce selon contraintes | Ne pas imposer une stack avant l’audit |

La landing page ne doit pas vendre une technologie comme une fin. La FAQ et les pages SEO secondaires peuvent cibler « agence Webflow », « agence WordPress » et les comparaisons.

### 6. Preuve design + technique

Utiliser une étude de cas pleine largeur :

- captures avant/après ;
- problème commercial ;
- décisions d’architecture ;
- détails d’interface ;
- performance et accessibilité ;
- intégrations ;
- résultats disponibles.

Le niveau Awwwards doit se voir dans l’exécution. Il ne doit pas devenir une promesse vague ou détourner la page de la conversion.

### 7. Méthode

1. Cadrage du problème et des objectifs.
2. Architecture des contenus et parcours.
3. Direction artistique et système de design.
4. Prototype et tests.
5. Développement et intégrations.
6. Migration SEO, recette, mesure et formation.

### 8. Livrables

- stratégie et arborescence ;
- copywriting des pages prioritaires ;
- design system ;
- composants et CMS ;
- connexions CRM/analytics/outils ;
- migration et redirections ;
- documentation et formation ;
- plan d’amélioration post-lancement.

### 9. FAQ

- Webflow, WordPress ou sur mesure : que choisir ?
- Travaillez-vous à partir de notre identité existante ?
- Qui rédige les contenus ?
- Comment évitez-vous une perte SEO pendant la migration ?
- Le site nous appartient-il ?
- Pouvez-vous reprendre un projet existant ?
- Faites-vous aussi l’e-commerce ?
- Quel budget et quel délai prévoir ?

### CTA final

**Votre prochain site peut être beau. Il doit surtout devenir utile à la vente.**  
Recevez une lecture de votre site actuel, des parcours prioritaires et du périmètre de refonte recommandé.

---

# 8. Landing page 3 — SEO + visibilité Google et moteurs IA

## Nom d’offre recommandé

**Visibilité Google + IA**  
Descripteur SEO : **SEO, AI Overviews, AI Mode et moteurs de réponse**.

« GEO » reste visible dans la page pour éduquer et capter la demande, mais le titre principal utilise des mots compris immédiatement.

### Hero recommandé — campagne rentrée 2026

**Badge :** AI Overviews + AI Mode annoncés en France d’ici le 23 septembre 2026

**H1 :**  
**Google ne montrera plus seulement des liens. Votre marque sera-t-elle dans la réponse ?**

**Sous-titre :**  
Waimia prépare votre socle SEO, vos contenus, vos preuves et votre mesure pour rester trouvable dans Google — liens classiques, réponses IA et parcours conversationnels.

**CTA principal :** Tester ma visibilité  
**CTA secondaire :** Voir ce qui change vraiment

**Réassurance :** Audit technique + contenu + marque + citations. Aucun « hack GEO » vendu comme une garantie.

### Hero evergreen après déploiement

**Être bien classé ne suffit plus. Il faut devenir une source.**

### Hero visuel

Un même besoin se déploie en trois interfaces :

1. recherche Google classique ;
2. AI Overview avec sources ;
3. conversation avec questions de suivi.

Les sources sélectionnées se relient aux pages, preuves et entités qui ont permis leur apparition.

## Structure détaillée

### 1. Ce qui change / ce qui ne change pas

| Ce qui change | Ce qui reste fondamental |
|---|---|
| Des réponses synthétisées apparaissent avant ou à la place d’une liste de liens | Une page doit être accessible, indexable et utile |
| Les requêtes deviennent plus longues et conversationnelles | La qualité, la fiabilité et l’expérience comptent |
| Plusieurs sous-recherches peuvent être lancées | Le maillage, l’architecture et le texte visible restent essentiels |
| La citation et l’influence deviennent des métriques | Les conversions restent le but final |
| Les moteurs et leurs sources diffèrent | Aucune inclusion n’est garantie |

### 2. Diagnostic interactif — « Votre marque existe-t-elle dans la réponse ? »

Demander le domaine et trois thèmes. La démo présente ensuite un rapport exemple, sans prétendre tester en temps réel si l’outil n’est pas connecté :

- visibilité SEO classique ;
- requêtes conversationnelles ;
- pages susceptibles d’être citées ;
- concurrents et sources tierces ;
- problèmes techniques ;
- opportunités de contenus et preuves.

Si un vrai test est développé, afficher date, moteur, localisation, langue et formulation exacte. Les résultats génératifs sont variables : ne jamais présenter un test ponctuel comme un classement permanent.

### 3. Les six couches de visibilité

1. **Accessibilité :** crawl, indexation, rendu, canonicals, performances.
2. **Compréhension :** architecture, entités, relations, données structurées cohérentes.
3. **Réponse :** contenu clair, original, complet et adapté aux décisions.
4. **Preuve :** cas, données, auteurs, méthodes, sources, dates.
5. **Corroboration :** mentions et avis tiers légitimes, profils, partenaires, presse spécialisée.
6. **Mesure :** Search Console, analytics, suivi de prompts, pages citées et conversions.

### 4. Le bloc `llms.txt` — une démonstration d’honnêteté

Titre : **`llms.txt` n’est pas votre stratégie GEO.**

Texte :

> Google confirme qu’il n’utilise pas ce fichier pour Search, AI Overviews ou AI Mode. Nous pouvons l’ajouter s’il sert d’autres systèmes, mais nous concentrons le budget sur ce qui augmente réellement l’éligibilité, l’utilité et la crédibilité de vos pages.

Ce bloc crée de la confiance et différencie Waimia des offres opportunistes.

### 5. Contenus à produire

Prioriser des actifs à forte valeur de citation et de conversion :

- comparatifs avec critères explicites ;
- pages de décision et guides d’achat ;
- méthodes étape par étape ;
- données propriétaires et études ;
- cas clients documentés ;
- définitions précises avec exemples ;
- pages locales solides lorsque le service est réellement local ;
- pages auteur, entreprise et expertise ;
- FAQ issues des ventes et du support ;
- contenus multimodaux utiles.

### 6. Ce que contient l’audit

- état technique et indexabilité ;
- lecture Search Console et analytics ;
- cartographie des intentions et query fan-out ;
- benchmark Google/ChatGPT/Perplexity/Bing sur un corpus documenté ;
- cartographie entité/marque ;
- analyse des pages, preuves et contenus ;
- politique de crawlers (`Googlebot`, `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, etc.) ;
- données structurées, Merchant Center et profils locaux si pertinents ;
- roadmap 30/60/90 jours ;
- protocole de mesure et tableau de bord.

### 7. Offre en trois temps

1. **Audit de visibilité Google + IA :** diagnostic et roadmap.
2. **Sprint de préparation :** correctifs techniques, pages prioritaires, preuves et mesure.
3. **Programme continu :** contenu, autorité, tests, optimisation et reporting.

Fourchettes à tester : audit 1 500 à 3 000 € HT ; sprint 4 000 à 12 000 € HT ; programme continu 1 000 à 3 000 € HT/mois selon production et périmètre.

### 8. Preuve

Le cas idéal compare :

- visibilité avant/après sur un corpus fixe de requêtes ;
- pages indexées et problèmes corrigés ;
- citations ou apparitions par moteur ;
- clics qualifiés et conversions ;
- contenus/mentions ayant contribué au résultat.

Ne jamais promettre une place dans une réponse IA. Vendre la préparation, l’éligibilité, la qualité des actifs et l’amélioration mesurable.

### 9. FAQ

- Le GEO remplace-t-il le SEO ?
- Peut-on garantir une citation dans AI Overviews ou ChatGPT ?
- À quoi sert `llms.txt` ?
- Faut-il autoriser tous les crawlers IA ?
- Comment mesurez-vous la visibilité ?
- Est-ce utile avant le lancement français ?
- Faut-il réécrire tout notre contenu ?
- Les données structurées suffisent-elles ?
- Quelle différence avec une agence SEO traditionnelle ?

### CTA final

**Ne préparez pas votre visibilité après la bascule. Mesurez ce qui manque maintenant.**  
Nous testons votre socle, vos contenus et votre marque, puis nous vous remettons un plan priorisé.

---

# 9. Landing page 4 — Systèmes IA pour équipes marketing

## Angle

L’offre ne vend pas « de l’IA ». Elle transforme des opérations récurrentes en systèmes supervisés, connectés aux outils et documentés.

### Hero recommandé

**Surtitre :** Audit et systèmes IA pour départements marketing

**H1 :**  
**Votre équipe marketing n’a pas besoin d’un chatbot de plus. Elle a besoin d’un système qui exécute le travail répétitif.**

**Sous-titre :**  
Waimia cartographie vos tâches, sélectionne les bons cas d’usage et construit des workflows et agents IA reliés à vos données — avec validations humaines, traçabilité et mode opératoire.

**CTA principal :** Cartographier les tâches à automatiser  
**CTA secondaire :** Explorer les cas d’usage

**Réassurance :** Audit complet de 1 000 à 2 000 € HT · feuille de route chiffrée · aucune obligation d’implémentation.

### Hero visuel

Un workflow marketing réel :

```text
Brief → recherche → production → contrôle → validation humaine → publication → mesure
```

Les étapes automatisées, assistées et humaines sont visuellement distinctes. Le visiteur peut activer/désactiver un agent pour voir le temps de traitement et les contrôles nécessaires, sans promettre une économie inventée.

## Structure détaillée

### 1. Reconnaissance

- copier des données entre outils ;
- refaire les mêmes recherches et synthèses ;
- décliner manuellement un contenu ;
- contrôler des campagnes avec des checklists dispersées ;
- produire des reportings qui arrivent trop tard ;
- enrichir ou qualifier des leads un par un ;
- perdre la méthode lorsqu’une personne quitte l’équipe.

**Hook :** « Si une tâche se répète, suit des règles et manipule de l’information, elle mérite au minimum d’être cartographiée. »

### 2. Galerie de cas d’usage

Filtres : acquisition, contenu, campagne, reporting, CRM, commercial.

Exemples :

- veille → synthèse → validation → newsletter → déclinaisons ;
- recherche de comptes → enrichissement → scoring → préparation d’approche ;
- brief campagne → production → vérification de marque/légal → publication ;
- appels/entretiens → synthèse → objections → mises à jour CRM ;
- données multi-sources → anomalies → commentaire → rapport ;
- base documentaire → assistant interne avec sources et droits d’accès.

Chaque carte affiche : déclencheur, données, décision humaine, sortie, risque et métrique.

### 3. Calculateur d’opportunité

Entrées : fréquence, minutes par exécution, personnes impliquées, coût horaire chargé, taux de reprise/erreur.  
Sorties : temps annuel mobilisé, coût actuel estimatif, seuil de rentabilité d’un projet.

Ajouter une note claire : il s’agit d’une estimation ; les gains doivent être validés pendant le pilote.

### 4. Architecture d’un système fiable

1. Déclencheur et permissions.
2. Sources et qualité des données.
3. Modèle IA ou règle classique selon la tâche.
4. Outils et intégrations.
5. Contrôles, seuils et validation humaine.
6. Journalisation et reprise sur erreur.
7. Mesure du temps, de la qualité et du coût.

Le choix entre Claude, OpenAI, Mistral ou une autre solution arrive après l’analyse. La technologie suit la contrainte de données, de qualité, de coût et de gouvernance.

### 5. L’audit à 1–2 k€

**Livrables :**

- entretiens ciblés et inventaire des tâches ;
- matrice impact / faisabilité / risque ;
- trois à cinq cas d’usage prioritaires ;
- architecture cible et données nécessaires ;
- estimation coût, délai, maintenance et gains attendus ;
- risques, gouvernance et validations humaines ;
- roadmap 30/60/90 jours ;
- proposition de pilote, si pertinent.

**Promesse :** le client sait quoi automatiser, dans quel ordre et ce qu’il ne faut pas automatiser.

### 6. De l’audit au système

1. Audit.
2. Prototype sur données non sensibles ou périmètre contrôlé.
3. Pilote avec critères de réussite.
4. Intégration aux outils et droits réels.
5. Recette, documentation et formation.
6. Supervision et amélioration.

Fourchettes indicatives : audit 1 000–2 000 € HT ; pilote 3 000–8 000 € HT ; système complet 8 000–25 000 € HT ; supervision/MRR selon criticité.

### 7. Preuve

Présenter un système réel avec :

- schéma avant/après ;
- nombre d’étapes manuelles supprimées ou assistées ;
- temps de traitement mesuré ;
- taux de reprise ou d’erreur ;
- validation humaine ;
- coût d’exécution ;
- limites connues.

Une démonstration transparente, avec ses limites, vaut mieux qu’une promesse de « productivité ×10 ».

### 8. Pour qui / pas pour qui

**Adapté :** équipe avec volume récurrent, processus observable, propriétaire métier, données accessibles.  
**Pas adapté :** recherche d’un agent autonome sans contrôle, processus qui change chaque semaine, absence de responsable ou données inutilisables.

### 9. FAQ

- Est-ce que l’IA remplace des postes ?
- Nos données sont-elles utilisées pour entraîner les modèles ?
- Claude ou OpenAI : lequel choisissez-vous ?
- Pouvez-vous vous connecter à notre stack ?
- Qui maintient le système ?
- Que se passe-t-il si le modèle se trompe ?
- Combien de temps avant un premier pilote ?
- L’audit nous appartient-il si nous ne poursuivons pas ?

### CTA final

**Identifions les tâches qui méritent un système — et celles qui doivent rester humaines.**  
L’audit transforme une liste d’idées IA en feuille de route chiffrée, priorisée et exploitable.

---

## 10. Bibliothèque de hooks

### Système d’acquisition

- Vous n’avez pas un problème de leads. Vous avez un problème de circulation des leads.
- Chaque canal fonctionne. L’ensemble ne forme pas encore un système.
- Le trafic coûte. Les ruptures entre le site et le CRM coûtent davantage.
- Votre prochain levier n’est peut-être pas un canal de plus.

### Site web intelligent

- Un site vitrine montre. Un site intelligent fait avancer.
- Votre site connaît le nombre de visites. Sait-il lesquelles méritent une action ?
- Le plus beau site du marché ne compense pas un parcours qui fuit.
- Design premium devant. Système d’acquisition derrière.

### Google + IA

- Être premier ne suffit plus. Il faut être choisi comme source.
- Quand Google répond à votre place, que reste-t-il à cliquer ?
- Votre marque est-elle visible lorsqu’on ne cherche pas encore son nom ?
- Le GEO n’est pas un fichier. C’est une stratégie de preuve, de compréhension et d’autorité.

### Systèmes IA marketing

- Automatisez le répétitif. Gardez les décisions.
- Un agent IA sans processus crée seulement des erreurs plus vite.
- Ne commencez pas par choisir le modèle. Commencez par cartographier le travail.
- Votre équipe ne doit pas passer sa semaine à déplacer de l’information.

---

## 11. CTA et microcopy

### CTA principaux recommandés

- Cartographier mon système
- Recevoir un plan de refonte
- Tester ma visibilité
- Cartographier les tâches à automatiser

Éviter « En savoir plus », « Découvrir » et « Contactez-nous » comme CTA principal.

### Microcopy sous CTA

- 30 minutes, sans engagement.
- Réponse sous un jour ouvré.
- Vous repartez avec une première recommandation exploitable.
- Aucun accès à vos données n’est nécessaire pour le premier échange.

Ne promettre que ce qui est réellement tenu.

### Questions du formulaire

Avant réservation :

1. prénom et nom ;
2. email professionnel ;
3. entreprise ;
4. URL du site ;
5. enjeu principal, sous forme de quatre choix.

Après réservation :

- objectif à 6 mois ;
- stack actuelle ;
- urgence ;
- décideurs concernés ;
- fourchette budgétaire, si Waimia est prête à disqualifier.

---

## 12. Preuves à réunir avant le design final

Créer un inventaire, même imparfait :

- logos utilisables avec autorisation ;
- trois projets visuellement forts ;
- deux intégrations ou architectures montrables ;
- une migration ou amélioration SEO documentée ;
- un système IA avec temps/erreur/coût mesuré ;
- témoignages nominatifs ;
- captures avant/après ;
- extraits anonymisés de livrables ;
- performances Lighthouse/Core Web Vitals si solides ;
- nombre de pages, composants, outils ou équipes concernées ;
- objections réellement entendues en vente.

Règle : chaque bénéfice important doit être soutenu par une preuve, un mécanisme ou une limite honnêtement formulée.

---

## 13. Plan de mesure

### Événements

- `lp_view`
- `hero_cta_click`
- `secondary_proof_click`
- `interactive_demo_start`
- `interactive_demo_complete`
- `form_start`
- `form_submit`
- `calendar_view`
- `meeting_booked`
- `qualified_meeting`
- `proposal_sent`
- `won_deal`

### Dimensions

- page/offre ;
- source, medium, campagne, angle et créa ;
- secteur ;
- variante de hero ;
- device ;
- nouveau/récurrent ;
- valeur ou étape CRM.

### KPI

La conversion finale est le **rendez-vous qualifié**, pas le clic CTA.

Suivre :

1. visite → CTA ;
2. CTA → formulaire commencé ;
3. formulaire → rendez-vous ;
4. rendez-vous → qualifié ;
5. qualifié → proposition ;
6. proposition → vente ;
7. coût et revenu par canal/angle.

Ne pas lancer un A/B test avant d’avoir assez de volume pour apprendre. Avec peu de trafic, préférer des tests séquentiels documentés et l’analyse qualitative des appels, replays et objections.

---

## 14. Processus de travail avec l’agent IA

L’agent ne doit pas produire immédiatement une page complète en code. Il doit agir comme un prestataire senior avec des étapes et des validations.

### Phase 0 — Intake

L’agent collecte ou demande :

- offre, cible, prix, délai et capacité de delivery ;
- canal et message d’origine ;
- preuves disponibles ;
- objections commerciales ;
- stack du site ;
- contraintes légales, techniques et de marque ;
- objectif de conversion ;
- pages/concurrents de référence.

**Sortie :** `00-intake-et-hypotheses.md` avec chaque donnée classée en confirmé, hypothèse ou manquant.

### Phase 1 — Recherche

- vérifier les faits récents avec des sources primaires ;
- analyser cinq à dix concurrents directs et indirects ;
- collecter les formulations clients dans appels, emails, avis et forums ;
- cartographier les intentions et sous-questions ;
- distinguer les arguments prouvés des promesses banales.

**Sortie :** `01-recherche-et-evidence.md`, avec date et URL de chaque source.

### Phase 2 — Stratégie de message

- segment et job-to-be-done ;
- problème actuel ;
- résultat désiré ;
- mécanisme unique ;
- alternatives et objections ;
- promesse, raison de croire et réduction du risque ;
- CTA et qualification.

**Sortie :** `02-message-map.md`.

### Phase 3 — Architecture et wireframe

Pour chaque section, fournir : objectif, copy, preuve, visuel, interaction, comportement mobile et transition narrative.

**Sortie :** `03-wireframe.md` et wireframe desktop/mobile.

### Phase 4 — Copywriting

Produire :

- trois options de hero, classées avec justification ;
- version finale de chaque section ;
- CTA, microcopy, formulaire et FAQ ;
- variantes par canal ;
- meta title, description et partage social.

**Sortie :** `04-copy-final.md`.

### Phase 5 — Direction visuelle

- concept visuel propre à l’offre ;
- références fonctionnelles, pas imitation ;
- composants, états et interactions ;
- storyboard des animations ;
- règles mobile, accessibilité et performance ;
- inventaire précis des assets à produire.

**Sortie :** `05-art-direction.md`.

### Phase 6 — Implémentation

L’agent construit après validation des phases précédentes. Le contenu doit être séparé des composants et permettre les variantes de canal sans duplication.

**Sortie :** page fonctionnelle, tests, événements analytics et documentation.

### Phase 7 — QA

- cohérence message/canal ;
- absence de claim non prouvé ;
- responsive ;
- clavier, focus, contrastes et lecteurs d’écran ;
- performance et stabilité ;
- formulaires, calendrier et CRM ;
- indexation/canonical/noindex ;
- événements analytics ;
- données structurées visibles et cohérentes ;
- liens, erreurs et fallback sans JavaScript.

**Sortie :** `07-qa.md` avec statut bloquant/majeur/mineur.

---

## 15. Prompt maître à copier dans un agent IA

```text
Tu agis comme le prestataire senior responsable de la stratégie, du copywriting,
de l'UX, de la direction artistique, du CRO et de la qualité technique d'une
landing page Waimia. Tu combines le niveau d'exigence d'un directeur de création,
d'un copywriter B2B, d'un consultant acquisition et d'un lead developer.

CONTEXTE DE MARQUE
Waimia est une agence d'ingénierie numérique pour PME françaises. Elle conçoit
des systèmes qui permettent d'acquérir des clients et d'automatiser des
opérations. Son avantage est technique : design premium, développement,
intégrations, données, automatisation et IA. Elle ne doit pas ressembler à une
agence généraliste ni à un simple installateur d'outils. La compétence technique
est la raison de croire ; le résultat métier est la promesse.

PAGE À TRAITER
- page_id : [systeme-acquisition | site-web-intelligent | visibilite-google-ia | systeme-ia-marketing]
- cible principale : [À RENSEIGNER]
- secteur éventuel : [À RENSEIGNER]
- canal : [cold-email | linkedin-dm | call-followup | ads-search | ads-social | seo-geo]
- niveau de conscience : [inconscient | problème | solution | produit]
- message qui a provoqué le clic : [À RENSEIGNER]
- offre et périmètre : [À RENSEIGNER]
- prix ou fourchette : [À RENSEIGNER]
- CTA principal : [À RENSEIGNER]
- preuves disponibles : [À RENSEIGNER]
- objections connues : [À RENSEIGNER]
- stack d'implémentation : [À RENSEIGNER]
- pages ou références : [À RENSEIGNER]

OBJECTIF
Maximiser les rendez-vous qualifiés et, au-delà, les opportunités commerciales,
tout en protégeant la crédibilité de Waimia. La page doit être immédiatement
compréhensible, visuellement mémorable, utile à un décideur et cohérente avec le
message qui l'a amené.

RÈGLES ABSOLUES
1. Ne fabrique aucun chiffre, témoignage, client, résultat ou urgence.
2. Marque toute preuve manquante avec [PREUVE À FOURNIR].
3. Date et source les faits susceptibles d'évoluer. Privilégie les sources
   primaires et indique clairement les inférences.
4. Ne présente jamais llms.txt comme un facteur de visibilité Google : Google
   indique qu'il l'ignore pour Search, AI Overviews et AI Mode.
5. Ne garantis jamais une position SEO, une citation IA ou un gain non mesuré.
6. Ne vends pas une technologie dans le H1 si le prospect achète un résultat.
7. Utilise un seul CTA principal, répété de manière cohérente.
8. Chaque section doit faire l'une de ces choses : clarifier, augmenter le désir,
   démontrer, prouver, lever un risque ou provoquer l'action. Supprime le reste.
9. Pas de jargon creux : révolutionnaire, solution 360, puissance de l'IA,
   sur-mesure sans explication, innovation de pointe.
10. Pas de design SaaS générique, de photos stock, de robots, de faux dashboards
    ou d'animation qui masque l'information.
11. Le design doit rester excellent sur mobile et sans dépendre du mouvement.
12. Respecte accessibilité, performance, SEO technique et confidentialité.
13. Si une information manque, avance avec une hypothèse explicite et réversible ;
    ne bloque que si le choix changerait profondément l'offre ou la conversion.
14. Ne code rien avant validation de la stratégie, de l'architecture et du copy.

MÉTHODE OBLIGATOIRE
Phase A — Intake et hypothèses
- Résume les données confirmées.
- Liste les manques et les hypothèses.
- Pose au maximum cinq questions qui changeraient réellement la page.

Phase B — Recherche et message
- Analyse le marché, les concurrents, les intentions, les formulations clients,
  les objections et les preuves.
- Produis une message map : cible, situation, douleur, résultat, mécanisme,
  alternatives, objections, raison de croire, CTA.
- Propose trois concepts de hero. Classe-les selon clarté, spécificité,
  différenciation, crédibilité et continuité avec le canal.

Phase C — Architecture
Pour chaque section, rends un tableau avec :
- numéro et nom ;
- objectif psychologique ;
- titre et copy exacts ;
- preuve nécessaire ;
- concept visuel ;
- interaction éventuelle ;
- comportement mobile ;
- transition avec la section suivante.

Phase D — Copy final
- Écris la page complète, CTA, microcopy, formulaire et FAQ.
- Crée les variantes minimales nécessaires pour chaque canal.
- Signale chaque claim qui requiert une validation.

Phase E — Direction artistique
- Définis le concept central, la composition, le rythme, les composants,
  animations, assets et états.
- Utilise la palette : #C94F2E, #A83D20, #0C0B09, #1A1814, #2B2620,
  #6B6560, #9A948D, #F6F1E8, #EFE9DD.
- Explique comment chaque visuel sert la compréhension ou la preuve.

Phase F — Spécification et implémentation
- Propose les composants et le modèle de contenu.
- Prévois les paramètres de campagne, champs CRM, événements analytics,
  canonical/noindex, métadonnées et données structurées pertinentes.
- Implémente seulement après validation explicite.

Phase G — QA contradictoire
Joue successivement les rôles d'un prospect sceptique, d'un directeur marketing,
d'un expert CRO, d'un expert SEO, d'un lead developer et d'un auditeur
accessibilité. Liste les problèmes par sévérité, corrige les bloquants et
reteste les parcours principaux.

FORMAT DE SORTIE
Commence par l'état de la phase en cours. Produis des livrables concrets,
faciles à valider. Ne noie pas les décisions dans des explications génériques.
À la fin de chaque phase, fournis : décisions prises, hypothèses restantes,
preuves manquantes, critères de validation et prochaine action.
```

---

## 16. Prompt de revue contradictoire

À lancer après le premier travail de l’agent :

```text
Audite cette landing page comme si ton rôle était d'empêcher Waimia de publier
une page belle mais inefficace.

1. Résume en une phrase ce qui est vendu, à qui, pour quel résultat et pourquoi
   Waimia est crédible. Si tu n'y arrives pas, classe cela comme bloquant.
2. Vérifie la continuité entre le message source et le premier écran.
3. Identifie les claims vagues, invérifiables, génériques ou trop techniques.
4. Pour chaque section, indique la fonction de conversion. Supprime ou fusionne
   toute section sans fonction claire.
5. Vérifie l'ordre : problème → mécanisme → livrable → preuve → risque → action.
6. Liste les objections non traitées et les preuves manquantes.
7. Évalue le CTA, la friction du formulaire et la qualification.
8. Teste mentalement mobile, clavier, performance, JS désactivé, erreur de
   formulaire et indisponibilité du calendrier.
9. Vérifie SEO, canonical/noindex, robots, données structurées et analytics.
10. Donne un score /10 pour clarté, spécificité, désir, crédibilité, preuve,
    continuité du canal, UX mobile et conversion.

Corrige d'abord tout score inférieur à 8 sans inventer de preuve. Termine par
une checklist PASS/FAIL et la liste exacte des éléments à fournir par Waimia.
```

---

## 17. Ordre de production recommandé

1. **Site web intelligent** : offre la plus simple à comprendre et la plus proche des références déjà disponibles.
2. **Visibilité Google + IA** : profite du momentum français de l’été/rentrée 2026 et crée du contenu d’autorité.
3. **Systèmes IA marketing** : point d’entrée clair avec l’audit à 1–2 k€.
4. **Système d’acquisition** : offre chapeau plus ambitieuse, à publier une fois les composants, cas et livrables tangibles.

Construire d’abord le système de composants, la mesure et les preuves communes. Les quatre pages ne doivent pas être conçues indépendamment par quatre agents sans direction partagée.

### Sprint suggéré

- J1 : inventaire des preuves, interviews et choix des offres.
- J2 : message maps et variantes par canal.
- J3 : wireframe Site web intelligent.
- J4 : copy + direction visuelle.
- J5–J7 : implémentation, mesure et QA.
- Semaine 2 : Visibilité Google + IA.
- Semaine 3 : Systèmes IA marketing.
- Semaine 4 : Système d’acquisition et hub.

---

## 18. Critères de réussite avant publication

- Le H1 indique un résultat ou un problème, pas une liste de services.
- Un décideur comprend l’offre en moins de cinq secondes.
- La page répond exactement au message du canal.
- Le CTA principal reste identique.
- Les technologies sont des moyens, sauf requête explicitement technique.
- Chaque bénéfice important a une preuve, un mécanisme ou une limite.
- Aucun chiffre ou logo n’est inventé.
- Le rendez-vous et sa valeur sont expliqués.
- La page fonctionne parfaitement sur mobile.
- Le formulaire, calendrier, CRM et analytics sont testés de bout en bout.
- Les variantes publicitaires ont la bonne règle d’indexation.
- Les faits 2026 sont datés et sourcés.
- `llms.txt` n’est jamais vendu comme un facteur Google.
- Les performances, contrastes, focus et états d’erreur sont validés.
- Le pipeline permet de relier la source au revenu, pas seulement au formulaire.

---

## 19. Sources essentielles

- [Google Search Central — Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central — Succeeding in AI Search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Google Search Central — Generative AI performance reports, juin 2026](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [Google France — Recherche IA, mai 2026](https://blog.google/intl/fr-fr/nouveautes-produits/explorez-obtenez-des-reponses/google-io-2026-recherche/)
- [Leptidigital — calendrier français révélé aux éditeurs](https://www.leptidigital.fr/webmarketing/seo/google-ai-overviews-arrivent-france-90891/)
- [OpenAI — OAI-SearchBot et crawlers](https://developers.openai.com/api/docs/bots)
- [Perplexity — crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Bing — Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Étude GEO fondatrice — Aggarwal et al.](https://arxiv.org/abs/2311.09735)
- [Étude 2026 sur l’activation et les citations Google AI Overviews](https://arxiv.org/abs/2605.14021)

Les études GEO mesurent des systèmes et métriques spécifiques ; leurs résultats ne doivent pas être transformés en garantie commerciale universelle.
