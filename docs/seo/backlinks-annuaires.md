# Backlinks et citations : annuaires où inscrire Waimia

Recherche et vérification du 21/10/2026. Aucune inscription, aucun formulaire envoyé, aucun compte créé.
Autorité actuelle de waimia.com : très faible (score 2), 0 backlink utile. Un seul lien externe relevé dans Search Console (`journal.md`, entrée du 5 octobre).

## Méthode

26 cibles retenues (P1 à P3) et 11 écartées avec leur motif, soit 37 cibles examinées.

Chaque affirmation sur une cible porte une classe de preuve, pour ne pas confondre ce qui est mesuré et ce qui est annoncé :

- **[M] mesuré** : HTML ou en-têtes lus le 21/10/2026 avec `curl`.
- **[O] officiel** : page de la plateforme elle-même, lue via Exa ou WebFetch quand l'accès direct répond 403.
- **[T] tiers** : blog, forum ou comparateur. Indicatif, à reconfirmer sur le site avant de payer.
- **[NV] non vérifié** : aucune source lue, ou accès bloqué.

Définitions utilisées :

- « Suivi » signifie un lien sans attribut `rel`, sur une page sans `noindex` ni `X-Robots-Tag`.
- « Autorité » : aucun export Semrush ou Ahrefs n'a été lu pour ces domaines. Sauf mention contraire, l'autorité est donc « non mesurée ».
- Effort : estimation en minutes, hors délai de validation par la plateforme.
- Priorité : P1 = valeur de lien ou de citation élevée pour un effort faible, à faire d'abord. P2 = utile mais plus long ou lien nul ou nofollow. P3 = faible pertinence, payant, ou non vérifié.

Les noms d'agences ou de clients ne sont jamais inventés : les références citables sont dans `src/content/cases/`.

## Quatre constats qui changent le plan

1. **Un lien institutionnel existe déjà, vers le mauvais domaine.** La fiche Activateur France Num `https://www.francenum.gouv.fr/activateurs/beros-simon` (mise à jour le 17/10/2026 [M]) pointe vers `https://virtuoseweb.fr/` et ne cite jamais waimia.com. Ses liens n'ont pas d'attribut `rel`, la page porte `meta robots index, follow` et ne renvoie pas de `X-Robots-Tag` [M]. `virtuoseweb.fr` répond HTTP 200 sans redirection [M] : c'est un site distinct en production. Le choix de l'URL cible revient à Simon.
2. **Le registre ne correspond pas exactement à l'identité de la fiche.** Selon societe.com (miroir Sirene, `annuaire-entreprises` bloqué par Incapsula), l'unité légale s'affiche sous « MONSIEUR SIMON BEROS » (dirigeant « Indépendant »), le seul établissement ouvert est le siège à Montpellier depuis le 01/12/2025 (APE 6202A), et il n'existe aucun établissement à Bordeaux [T, 21/10/2026]. PagesJaunes exige la conformité de la raison sociale et de l'adresse avec Sirene, sinon un justificatif (Kbis ou D1) [O]. Voir « Écarts avec le registre » plus bas.
3. **Les liens suivis gratuits sont rares.** Ceux qui donnent du jus (La Fabrique du Net, Sortlist) le réservent à leur offre payante [O]. Clutch est nofollow partout [O], les profils créateurs n8n aussi [M]. Seuls France Num et l'annuaire French Tech Bordeaux sont constatés suivis [M]. Les autres cibles apportent surtout des citations NAP et de la crédibilité, pas du jus.
4. **Prix à ne pas mal lire.** La Fabrique du Net Premium coûte 139 € HT/mois (CGU, article 3.9 [O], et article du 07/10/2026 [O]) : le « 1 139 €/mois » de la page tarifs est le numéro de liste « 1 » collé au prix. Sortlist+ à 129 €/mois vient de la page `.com` ; la page française n'affiche pas de prix [O].

## Fiche à copier

À reprendre à l'identique sur chaque annuaire.

| Champ | Valeur |
| --- | --- |
| Nom commercial | Waimia |
| Raison sociale | VirtuoseWeb |
| Fondateur | Simon Beros |
| SIREN | 890426307 |
| TVA intracommunautaire | FR07890426307 |
| SIRET (siège actif au registre) | 89042630700041 [T : societe.com, 21/10/2026, à confirmer sur l'avis de situation Sirene] |
| Date de création | 15/10/2020 (`src/site.config.ts`, inscription Sirene) |
| Adresse d'activité | Avenue de la République, 33200 Bordeaux. Aucun numéro de rue : ne pas en inventer. Si le formulaire le permet, masquer l'adresse ou indiquer une zone desservie |
| Téléphone | +33 6 20 61 56 93 |
| E-mail | bonjour@waimia.com |
| Site | https://waimia.com |
| LinkedIn | https://www.linkedin.com/company/waimia |
| Fiche Google | https://share.google/nmlHLC5wQak9TWRPl (existante, `src/site.config.ts`) |
| Catégories à viser | Agence d'intelligence artificielle ; Conseil en systèmes et logiciels informatiques (APE 6202A) ; Développement logiciel ; Référencement naturel |

**Description courte (137 caractères)**

> Agence IA pour PME à Bordeaux : automatisation (n8n, Make), agents IA, intégration de Claude, SEO/GEO, sites web et logiciels sur mesure.

**Description longue (environ 500 caractères)**

> Waimia est une agence IA qui aide les PME à automatiser leurs processus et à intégrer l'intelligence artificielle dans leurs outils. Elle conçoit des automatisations avec n8n et Make, des agents IA, des intégrations de Claude, du référencement SEO et GEO (visibilité dans les moteurs de réponse IA), ainsi que des sites web et des logiciels sur mesure. Fondée par Simon Beros, active à Bordeaux et en Nouvelle-Aquitaine, Waimia propose un audit gratuit pour cadrer le besoin avant tout devis. Activateur France Num.

**Mentions autorisées et interdites** (règle `docs/seo/ROUTINE.md`, section 5.3)

- Autorisée : « Activateur France Num » (fiche lue le 21/10/2026 [M]).
- Interdites : « partenaire Anthropic », « Claude certified », « certifié », « n°1 », « leader », toute offre no code, tout chiffre de résultat, tout client ou avis sans accord écrit du client.
- Prix : uniquement ceux de `src/data/pricing.ts` ; sinon « sur devis après audit gratuit ».

### Écarts avec le registre

À trancher par Simon avant PagesJaunes, Apple Business, Europages et Clutch Verified, qui comparent la fiche au registre ou demandent une pièce :

- Dénomination : le registre lu affiche l'entreprise sous le nom de la personne, pas sous « VirtuoseWeb » ni « Waimia » (extrait lu, non exhaustif).
- Siège : Montpellier au registre. L'adresse d'activité bordelaise n'est pas un établissement déclaré, et elle n'a pas de numéro.
- Conséquence : PagesJaunes demandera probablement un justificatif pour Bordeaux [O : règle générale, sans cas confirmé pour Waimia]. Bing vérifie par téléphone, e-mail ou courrier [T] ; la règle des autres plateformes n'a pas été lue.
- Décision attendue : soit renseigner Bordeaux avec un justificatif d'activité, soit utiliser la zone desservie sans adresse précise, soit attendre une pièce (Kbis ou RNE) qui montre Bordeaux. Aucune adresse montpelliéraine précise ne figure dans ce document.

## Tableau priorisé

| N° | Cible et URL d'inscription | Catégorie | Coût | Type de lien | Autorité | Pièces requises | Pertinence pour Waimia | Prio | Effort |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **France Num, fiche Activateur** (mise à jour de l'existante) `https://www.francenum.gouv.fr/activateurs/beros-simon` | Institutionnel | Gratuit | Suivi [M], mais vers virtuoseweb.fr aujourd'hui | Domaine .gouv.fr, non mesurée | Accès au compte Activateur. Procédure de modification non lue [NV] | Très haute : seul lien institutionnel déjà obtenu | P1 | 15 min |
| 2 | **Bing Places** `https://www.bing.com/forbusiness` | Citation locale | Gratuit | Non vérifié | Non mesurée | Compte Microsoft, import de la fiche Google, vérification par téléphone, e-mail ou courrier [T] | Moyenne : citation NAP reprise de Google | P1 | 15 min |
| 3 | **French Tech Bordeaux, annuaire et adhésion** `https://www.frenchtechbordeaux.com/adhesion` (annuaire : `https://annuaire.frenchtechbordeaux.com/organisations`) | Écosystème Bordeaux | 150 €/an, catégorie Startup (moins de 20 salariés et moins de 1 M€) [O]. Profil gratuit non confirmé : le profil se crée avant le paiement | Suivi constaté sur 3 fiches (boxeaty, 1-loud-technology, 10h11) [M] | Non mesurée. 2 723 organisations listées [O] | « Toute personnalité morale » [O] : éligibilité d'une entreprise individuelle à confirmer | Haute : ancrage Bordeaux, tag « Intelligence Artificielle » dans l'annuaire | P1 | 30 min + paiement |
| 4 | **La Fabrique du Net** `https://www.lafabriquedunet.fr/agences/tarifs` (URL de création non lue : accès direct 403) | Annuaire d'agences | Présence 0 € ; Partenaire Premium 139 € HT/mois [O] | Gratuit : aucun lien déclaré ; Premium : lien hypertexte [O] | Non mesurée | Entreprise enregistrée, validation avec refus possible, avis clients [O] | Haute : pages « Automatisation IA en France » et « Intelligence artificielle à Bordeaux » existantes [T] | P1 | 45 min |
| 5 | **Sortlist** `https://www.sortlist.fr/claim/agency` | Annuaire d'agences | Gratuit ; Sortlist+ 129 €/mois (page .com) [O] | Gratuit : pas de lien ; backlink réservé à Sortlist+ [O] | Non mesurée | Profil, services (« Intelligence artificielle » listée), réalisations, avis. Indépendants acceptés si indiqué [O] | Haute : service IA accepté, marché France ciblé | P1 | 40 min |
| 6 | **PagesJaunes** `https://www.pagesjaunes.fr/plusdeservices/gerer-ma-fiche-pagesjaunes` | Citation locale | Gratuit (« Référencement non prioritaire »). L'option prioritaire est un essai d'un mois puis payant : ne pas la choisir [O] | Champ « site internet » dans la fiche gratuite [T] ; attribut non vérifié (accès 403) | Non mesurée | SIRET actif ; raison sociale et adresse conformes à Sirene, sinon Kbis ou D1 ; code vocal depuis une ligne enregistrée [O] | Haute pour la citation locale. **Conditionnel à la décision d'adresse** | P1 | 20 min + 24 à 72 h |
| 7 | **Clutch** `https://clutch.co/get-listed` | Annuaire B2B | Basic gratuit ; Verified 42 $/mois facturé à l'année, soit 499 $/an [O] | Nofollow sur tous les profils [O] ; en Basic, pas de lien depuis les pages d'annuaire [O] | Non mesurée | Service B2B et site actif [O]. Avis clients pour le classement. Verified : extrait d'immatriculation [O] | Moyenne : crédibilité et citation, pas de jus | P1 | 30 min + collecte d'avis |
| 8 | **Europages** `https://www.europages.fr` (bouton fournisseur ; URL profonde non lue) | Annuaire B2B | Gratuit ; offres payantes sur devis [O] | Hyperlien vers le site prévu aux CGU [O], attribut non vérifié | Non mesurée | Compte, représentant habilité, 18 ans minimum [O] | Moyenne : B2B européen, 26 langues | P1 | 25 min |
| 9 | **Apple Business (Connect)** `https://business.apple.com/` | Citation locale | Gratuit | Site web facultatif dans la fiche [O], attribut non vérifié | Non mesurée | Compte Apple, vérification de l'organisation. Fiche « lieu » seulement pour un lieu visitable sans rendez-vous [T, forum Apple 2025] ; une marque sans lieu est possible [O, Apple 10/2024] | Moyenne : présence dans Apple Plans, marque possible sans adresse | P1 | 20 min |
| 10 | **impli.fr** `https://impli.fr/contact` | Média IA pour PME et réseau d'experts | Aucune condition lue [NV] | Non vérifié | Non mesurée | Réalisations IA documentées. Pas de formulaire d'inscription : candidature par message | Haute : cible PME et IA, déjà citée au `journal.md` | P1 | 20 min |
| 11 | **GoodFirms** `https://www.goodfirms.co/get-listed` | Annuaire B2B | Gratuit ; PRO 49 $/mois (588 $/an) [O] | Nofollow [T, ScrollLaunch 18/10/2026] | DR 87 [T] ; 86 annoncé par la plateforme [O] | 4 étapes de vérification, 2 à 3 appels de références clients, 23 % d'acceptation, 5 à 10 jours ouvrés [O] | Moyenne | P2 | 1 à 2 h + références clients |
| 12 | **Make, programme Solution Partner** `https://www.make.com/solution-partners` (annuaire : `https://www.make.com/en/partners-directory`) | Écosystème automatisation | Gratuit [O] | Profil avec formulaire de contact ; aucun lien vers le site vu dans la liste [O] | Non mesurée | Au moins 1 expert, formation partenaire obligatoire, expérience client, onboarding jusqu'à 2 mois [O] | Haute en crédibilité (cœur d'offre), lien nul constaté | P2 | 3 h + formation |
| 13 | **Vercel, Solution Partner** `https://vercel.com/partners` (bouton « Apply now ») | Écosystème technique | Coût non indiqué [NV] | Non vérifié : la liste de 116 partenaires n'affiche pas d'URL d'agence [O] | Non mesurée | Candidature en 3 étapes (apply, qualify, onboard). Critères non lus [NV] | Moyenne : le site est hébergé sur Vercel | P2 | 20 min |
| 14 | **Crunchbase** `https://www.crunchbase.com` (« Create New Organization ») | Profil d'entité | Gratuit [T] | Nofollow [T, blogs] | Non mesurée | Compte Google ou LinkedIn, nom et description | Moyenne : fiche d'entité citable | P2 | 20 min |
| 15 | **ADI Nouvelle-Aquitaine, annuaire des adhérents** `https://www.adi-na.fr/annuaire-des-adherents-adi` (adhésion : `https://adhesion.adi-na.fr/fr/`) | Écosystème Nouvelle-Aquitaine | Cotisation non affichée [O] | Non vérifié (annuaire chargé dynamiquement) | Non mesurée | Formulaire d'adhésion | Haute : réseau régional d'environ 650 décideurs [O] | P2 | 30 min + devis |
| 16 | **n8n Creator Hub** `https://n8n.io/creators/` | Écosystème n8n | Gratuit | Nofollow [M] : `rel="ugc nofollow"` sur 3 profils créateurs | n8n.io, non mesurée | Compte créateur, modèle soumis, revue environ 1 semaine, badge « vérifié » après 3 modèles approuvés [O] | Haute en crédibilité n8n, lien nofollow | P2 | 2 à 4 h par modèle (estimation) |
| 17 | **Malt** `https://www.malt.fr/c/freelancers` | Plateforme de freelances | Inscription gratuite ; commission 5 % HT (10 % HT puis 5 % après 6 mois sur certains projets) [O] | Non vérifié | Non mesurée | Statut légal (auto-entrepreneur ou société), charte à signer [O] | Moyenne : plateforme d'indépendants, lien non vérifié | P2 | 45 min |
| 18 | **Cylex** `https://www.cylex-locale.fr/` | Citation locale | Gratuit ; Premium 11,90 €/mois HT [O] | Non vérifié (accès 403) | Non mesurée | Compte utilisateur, horaires pour apparaître sur TrouverOuvert [O] | Faible à moyenne : annuaire de masse financé par la publicité | P3 | 20 min |
| 19 | **Yelp** `https://biz.yelp.com/claim` | Citation locale | Gratuit [O] | Non vérifié | Non mesurée | Nom, ville, code postal, catégorie ; modération puis revendication [O] | Faible : peu de recherches B2B de conseil | P3 | 20 min |
| 20 | **Kompass** `https://mc.kompass.com/registerNewCompany/identity/` | Annuaire B2B | Gratuit (« FREE Web Presence ») ; offres payantes insistantes (Booster Click) [O] | Non vérifié | Non mesurée | Formulaire d'identité de l'entreprise | Faible à moyenne | P3 | 25 min |
| 21 | **DesignRush** `https://www.designrush.com/` (bouton « Get listed ») | Annuaire d'agences | Gratuit ; sponsoring sur devis [O] | Non vérifié. Des agences rapportent qu'on leur demande un lien retour vers DesignRush [T] : ne pas en poser | Non mesurée | Services, localisation, taille d'équipe, clients notables | Faible : audience surtout anglophone | P3 | 30 min |
| 22 | **Codeur** `https://www.codeur.com/subscriptions` | Plateforme de projets | Compte gratuit ; abonnement Agence 109,90 € HT/mois pour répondre aux projets [O] | Non vérifié | Non mesurée | Profil, portfolio, abonnement | Faible : payant, clientèle de petits projets | P3 | 30 min |
| 23 | **French Tech Méditerranée** `https://www.lafrenchtechmed.com/adherer/` | Écosystème Montpellier | Non lu [NV] | Non vérifié | Non mesurée | Formulaire d'adhésion ; cible « startup, scale-up ou entreprise innovante » [O] | Faible : n'a de sens que si le siège montpelliérain est assumé | P3 | 30 min |
| 24 | **Digital 113** `https://www.digital113.fr/devenir-adherent` | Écosystème Occitanie | 550 € HT/an pour 1 à 10 salariés [O] | Non vérifié (annuaire `/adherents`) | Non mesurée | Contact avec l'objet « Rejoindre Digital 113 » [O] | Faible à moyenne : hors zone d'activité déclarée | P3 | 30 min + paiement |
| 25 | **Les Pépites Tech** `https://lespepitestech.com/node/add/pepite-tech` | Annuaire de startups (tiers) | Non indiqué [NV] | Lien sortant avec paramètre `utm_source` [O], attribut non vérifié | Non mesurée | Fiche startup | Faible : Waimia est une agence, pas une startup | P3 | 15 min |
| 26 | **CCI Bordeaux Gironde** `https://www.bordeauxgironde.cci.fr/` | Écosystème Bordeaux | Non vérifié | Non vérifié | Non mesurée | Aucun annuaire d'inscription trouvé ; accès direct 403, donc « non vérifié », pas « inexistant » | À vérifier par un appel avant de planifier | P3 | 15 min (appel) |

### Cibles écartées

| Cible | Motif | Preuve |
| --- | --- | --- |
| Hoodspot | `hoodspot.fr` redirige vers `annuaire.petitesaffiches.fr`, dont l'accueil affiche des listes « marabout » : ferme à liens | [M] 21/10/2026 |
| agences-web.fr | Page commerciale de l'agence Periwinkle, pas un annuaire | [O] |
| Waze | Pas d'inscription d'entreprise gratuite : édition de carte bénévole ou Waze Ads | [O] |
| desirely.co | Outil pour agences OnlyFans, sans rapport (le résumé d'un moteur le présentait à tort comme un annuaire d'agences web) | [O] |
| Claude Partner Network | Palier d'entrée : 10 professionnels certifiés, 2 clients en production, 1 témoignage public [T]. La mention « partenaire Anthropic » reste interdite par `ROUTINE.md` | [T] |
| n8n Expert Partners | Pilote fermé, cible UK, Irlande, Europe du Nord, Amérique du Nord, au moins 3 clients n8n actifs, liste d'attente [O] | [O] |
| Technowest | Incubateur pour porteurs de projet, pas un annuaire d'agences | [O] |
| comparateur-ia.com | Programme d'agences à sélection, les agences « paient pour figurer » ; tarifs non publiés | [O] |
| Semrush Agency Partners | Abonnement Semrush payant plus deux examens ; gain de lien non démontré | [T] |
| Label « experts numériques » (DGE) | Appel à projets clos le 11/07/2025, destiné à un opérateur de label, pas à une agence | [O] |
| Hub France IA | Aucun tarif ni annuaire de membres trouvé | [NV] |

### Déjà en place ou passifs

- Fiche Google (`sameAs` de `src/site.config.ts`) et page LinkedIn : existantes, ne pas recréer.
- societe.com, annuaire-entreprises, Pappers, Infogreffe : fiches automatiques issues du registre. Rien à inscrire ; contrôler que les données publiques restent cohérentes avec la fiche à copier.

## Ordre d'exécution recommandé

À faire seulement sur autorisation explicite de Simon (compte, formulaire ou paiement).

**Décisions préalables, une fois**

1. Quelle URL sur la fiche France Num : `waimia.com` ou rester sur `virtuoseweb.fr` ?
2. Adresse : Bordeaux avec justificatif, zone desservie sans adresse, ou attente d'une pièce (voir « Écarts avec le registre ») ?
3. Payer 150 €/an à French Tech Bordeaux, après confirmation qu'une entreprise individuelle peut adhérer ?
4. Quels clients de `src/content/cases/` acceptent de laisser un avis ou d'être cités (Clutch, Sortlist et La Fabrique du Net en dépendent) ?

**Séquence**

1. Contrôler la fiche Google : même NAP que la fiche à copier, car Bing l'importe telle quelle.
2. France Num : mettre à jour l'URL (n° 1).
3. Bing Places (n° 2), par import de la fiche Google.
4. French Tech Bordeaux (n° 3), après décisions 3 et 4.
5. La Fabrique du Net, Sortlist et Clutch (n° 4, 5, 7) dans la même session, avec les mêmes textes et les mêmes références.
6. impli.fr (n° 10), message de candidature. Europages (n° 8). Apple Business (n° 9), en marque seule si la décision d'adresse n'est pas prise.
7. PagesJaunes (n° 6), uniquement après la décision d'adresse.
8. Puis P2 (n° 11 à 17), en commençant par Make (n° 12) et n8n (n° 16) si Simon veut du poids dans l'écosystème automatisation, par ADI (n° 15) pour le régional.
9. P3 seulement si les P1 n'ont pas apporté de domaines référents mesurables après un mois.

Temps estimé pour les 10 cibles P1 : environ 4 h 30, hors collecte d'avis, paiement et délais de validation (24 h à 10 jours selon la plateforme).

## Limites

- Accès bloqués en direct (403 ou Incapsula) : PagesJaunes, Sortlist, La Fabrique du Net, Malt, Clutch, GoodFirms, DesignRush, Cylex, Kompass, CCI. Leurs pages ont été lues via Exa ou WebFetch (texte, sans attributs `rel`) ou via des sources tierces.
- Types de lien : mesurés sur 3 cibles seulement (France Num, French Tech Bordeaux, n8n) ; Clutch est déclaré par sa page d'aide. Les autres sont déclarés, tiers ou non vérifiés. Vérifier l'attribut `rel` sur une fiche vivante après création.
- Autorité : non mesurée. Prochaine étape utile : lire l'autorité des domaines retenus dans Semrush avant de payer quoi que ce soit.
- Les URL de création de compte de plusieurs plateformes n'ont pas été ouvertes (aucune inscription ne devait être faite). Les prix datent du 21/10/2026 et changent.
- Les données d'identité du registre proviennent de societe.com, miroir de Sirene ; l'avis de situation Sirene officiel n'a pas été lu.
