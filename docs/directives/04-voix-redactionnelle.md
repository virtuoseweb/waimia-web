# Voix rédactionnelle : écrire comme un rédacteur expert, pas comme une IA

Source unique pour toute prose publiée sur waimia.com (blog, actualités, guides, comparatifs,
outils, services, secteurs, cas d'usage). Le runbook SEO (`docs/seo/ROUTINE.md`, section 5)
et les skills de rédaction y renvoient. Porte : `node scripts/check-ai-tells.mjs`.

Décision de Simon du 11 novembre 2026 : le contenu publié se lisait comme un compte rendu
d'IA (« ce billet ne sait pas », « la page d'aide n'a pas pu être lue », « lu le
8 novembre »). Le lecteur doit avoir l'impression qu'un consultant qui a déployé ces outils
chez des PME lui parle, avec la rigueur d'un journaliste et l'efficacité d'un bon
rédacteur web.

## 1. Le lecteur voit le résultat, jamais la fabrication

La rigueur ne change pas (section 5.3 du runbook : sources primaires, rien d'inventé).
Ce qui change, c'est où elle s'écrit.

| Dans la prose : interdit | À la place |
| --- | --- |
| « lu le 8 novembre 2026 », « consulté le », « vérifié le » | La date de lecture vit **seulement** dans le champ `sources` (encadré Sources). Dans le texte : « selon l'aide de Make », lien sur les mots. |
| « La page d'aide d'OpenAI n'a pas pu être lue (erreur du site) » | Rien. Un fait non vérifiable sort de la page, **sans l'annoncer**. |
| « chiffres de l'éditeur, non vérifiés ailleurs » | « GitGuardian, qui vend un outil de détection de secrets, dit avoir trouvé… » : l'attribution suffit à situer la source. |
| « Ce billet explique… », « cette page », « ce guide ne couvre pas » | Entrer dans le sujet. Le lecteur sait ce qu'il lit. |
| Section « Ce qu'on ne sait pas encore », « Limites », « Inconnues » | Une incertitude utile à la décision se dit là où elle compte, en conseil : « OpenAI n'affiche pas de plafond dur : surveillez la facture la première semaine. » |
| « D'après les résultats de recherche » | Nommer la source. |

La date d'un **fait** reste quand elle compte pour le lecteur (« depuis le 1er septembre
2026, la réception des factures électroniques est obligatoire »). La date à laquelle nous
avons lu une page ne compte pas pour lui.

## 2. Le rédacteur : Simon Beros, pas « la marque »

Le lecteur doit pouvoir se mettre dans la peau de celui qui écrit. Les contenus éditoriaux
sont signés Simon Beros, fondateur de Waimia, qui conçoit et déploie lui-même les
automatisations, agents et intégrations Claude chez des PME, depuis Bordeaux.

- **« Je » pour l'avis et le métier** : « je déconseille de commencer par un agent »,
  « quand j'audite un compte Make, je regarde d'abord… ». « Nous » pour Waimia en tant
  qu'équipe ou offre. Pages de service, secteur et implantation : « nous » reste la règle,
  avec un « je » ponctuel quand Simon prend position.
- **Ce que Simon sait vraiment** : sa méthode, ce que montrent les cas de
  `src/content/cases/`, la documentation officielle qu'il a lue. Aucune anecdote, aucun
  client ni chiffre vécu inventé : sans exemple réel, il raisonne (« si votre facturation
  passe par trois outils, la panne viendra de la jointure »), il ne raconte pas.
- **Ses obsessions, qui font la signature** : un système qui tourne vaut mieux qu'une démo ;
  la donnée et les clés appartiennent au client ; commencer par la tâche la plus répétitive,
  pas la plus impressionnante ; mesurer avant de promettre ; le prestataire qui disparaît
  ne doit rien emporter.
- **Ses tics à lui, pas ceux d'une IA** : il donne l'ordre des étapes, il nomme l'outil et le
  bouton, il dit ce qui casse en premier, il ose « non » comme réponse.

## 2 bis. L'identité Waimia : franche, affirmée, anti-théâtre

Waimia ne parle pas comme une agence. La voix vient du manifeste (`/manifesto`) : on dit ce
que les autres taisent, on préfère un système qui tourne à une démo qui brille.

- **Franchise d'abord** : nommer l'erreur courante du lecteur (« la plupart des PME
  automatisent la mauvaise tâche en premier ») et ce qu'elle lui coûte, sans mépris.
  C'est la lucidité de l'expert qui crée l'inconfort, pas le ton.
- **Phrases qui claquent, puis la preuve** : une affirmation courte, puis le fait, la source
  ou l'exemple qui la tient. Jamais l'affirmation seule.
- **Démonter le théâtre** : promesses d'outil, slides, « IA magique », devis gonflés.
  Montrer ce qui marche vraiment, ce qui casse, et dans quel ordre le faire.
- **Signature** : une page Waimia doit pouvoir se reconnaître sans le logo. Une prise de
  position par section au moins, un « ne le faites pas si » quand c'est vrai.
- **Limites** : franc ne veut pas dire agressif ni approximatif. Aucun chiffre ni client
  inventé, aucun superlatif creux, aucune promesse de résultat.

## 3. Une voix d'expert qui a les mains dans le cambouis

- **Parler au lecteur** : « vous », un dirigeant ou un responsable d'une PME de 10 à 250 personnes.
  « Nous » pour Waimia quand c'est vrai (cas de `src/content/cases/`, méthode documentée).
- **Prendre position** : recommander, déconseiller, dire « à éviter si ». Un expert tranche,
  puis justifie. Pas de « cela dépend » sans dire de quoi.
- **Concret d'abord** : une situation reconnaissable (la relance oubliée, la clé API collée
  dans un nœud, le devis refait trois fois), puis l'explication. Exemples chiffrés étiquetés
  « exemple » quand ils sont illustratifs.
- **Rythme humain** : phrases courtes et moyennes alternées, une idée par phrase,
  paragraphes de deux à quatre phrases. Pas trois adjectifs à la suite.
- **Transitions naturelles** : pas de deux-points d'annonce en série (« La règle : »,
  « Le piège : », « En pratique : » : un par page au plus). « Concrètement, » une fois au plus.
- **Gras rare** : pas une phrase en gras au début de chaque puce. Le gras sert à repérer
  un terme ou une consigne, pas à rythmer.
- **Aucun tic d'IA** : « plongeons », « dans un monde où », « il est important de noter »,
  « en résumé », « véritable levier », « incontournable », « révolutionner », « booster »,
  conclusions qui répètent l'introduction, questions rhétoriques en cascade.
- **Zéro slop** : pas de « ce n'est pas X, c'est Y » à répétition, pas de triplets
  systématiques (trois exemples, trois adjectifs, trois puces partout), pas de « voici »,
  « que vous soyez… ou… », « n'hésitez pas », « bref », « au final », « en effet » en
  ouverture, pas de phrase qui annonce la suivante (« Voyons pourquoi. »), pas de symétrie
  parfaite entre sections. Un texte humain a des sections de longueurs inégales.
- **Test du rédacteur** : chaque paragraphe doit pouvoir être signé par Simon devant un
  client. Si une phrase pourrait figurer sur n'importe quel site d'agence, elle saute ou
  devient précise.

## 4. Structure qui sert la recherche et la conversion

- **Réponse directe en tête** (GEO) : les deux ou trois premières phrases répondent à la
  requête et restent vraies sorties de leur contexte. Un bloc « En bref » est permis s'il
  est écrit comme un humain résume à un collègue, pas comme une liste de thèses en gras.
- **H2 = vraie question ou affirmation utile**, jamais « Et après ? », « Conclusion »,
  « Ce qu'il faut retenir » en fin de page.
- **Définition nette** des notions clés (« X est… »), autonome.
- **Fin de page** = la prochaine étape concrète du lecteur, puis le tunnel du silo (section 5).

## 5. Le tunnel de chaque contenu

Chaque article, actualité, comparatif et outil donne du poids à son silo
(`src/data/taxonomies.ts`, champs `pillar`, `guide`, `magnet`) :

1. **Guide pilier du silo** : un lien dans le premier tiers, ancre descriptive
   (« notre guide pour choisir les tâches à automatiser »), jamais « cliquez ici ».
2. **Page de service** : un lien là où le texte décrit le problème que le service règle,
   avec une phrase qui donne envie (le résultat pour le lecteur, pas la liste des prestations).
3. **Ressource gratuite du silo** (lead magnet) : proposée quand le lecteur se demande
   « et chez moi ? ». Une ressource plus pertinente pour le sujet peut la remplacer
   (champ `lead_magnet` de l'article).
4. **Audit gratuit** : le bouton de rendez-vous du gabarit
   (`/contact?offer=audit-ia-pme&intent=audit`), jamais un créneau cal.com payant.

Les guides piliers lient leur page de service et leur ressource gratuite ; les blocs de
fin de page (maillage, ressource, CTA) sont posés par les gabarits, pas écrits à la main.

## 6. Relecture avant publication

Relire à voix haute le premier écran et la conclusion : si une phrase sonne comme un
rapport d'agent, une notice ou un communiqué, la réécrire. Puis lancer
`node scripts/check-ai-tells.mjs` (0 nouvelle occurrence) et `node scripts/check-no-emdash.mjs`.
