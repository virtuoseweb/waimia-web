# Audit Semrush et concurrence · 13 octobre 2026

Sources : dossier Semrush du 9 octobre (audit du site, 4 domaines concurrents), `audit seo 5 octobre maj.md`, `waimia strat claude.md`.

## 1. Audit technique waimia.com (santé 94 %, IA 95 %, 164 pages)

| Constat Semrush | Cause réelle | Action | État |
| --- | --- | --- | --- |
| 35 conflits hreflang + 33 pages à un seul lien | 183 fichiers liaient `/contact?offer=…&intent=…` : une URL crawlable par variante | CTA en fragment `/contact#offer=…`, page lisant le fragment puis la query | Livré `73ad74ee` |
| 54 liens externes en nofollow | `rel="nofollow"` sur les sources citées (organismes, éditeurs) | Retiré sur les citations ; conservé sur les liens vers sites clients | Livré |
| 11 données structurées invalides | `relatedLink` sur `Article` (propriété inexistante) | Retiré | Livré |
| 7 outils sans `aggregateRating`/`review` | Aucun avis réel publié | Non corrigé : on ne fabrique pas d'avis | Refusé, volontaire |
| Adresse manquante Paris/Lyon | Aucun bureau dans ces villes | Non corrigé : l'adresse serait fausse (gate `check-jsonld`) | Refusé, volontaire |
| 4 pages à paragraphes longs | Prose dense | 12 paragraphes scindés (3 pages) ; FAQ de `/tarifs` non traitée | Livré partiel |
| 3 pages H1 = title | Même champ `title_fr` | Non traité (avertissement) | Ouvert |
| 62 pages en faible ratio texte/HTML (9 à 10 %) | 60 Ko de style et script par page, balisage lourd | Non traité : pas un facteur de classement mesuré | Ouvert |
| 10 pages Core Web Vitals, 6 « à améliorer » (LCP 2,6 à 3,0 s) | CSS bloquant, CSS inutilisé, preconnect | Chantier perf à part | Ouvert |
| 336 domaines référents, autorité 2 | 99 % de spam (Singapour, Moldavie) | Désaveu à envisager ; liens crédibles à obtenir | Ouvert |

## 2. Titres retravaillés d'après les requêtes

- `/services/referencement-ia` : « Agence GEO : référencement IA pour être cité » (« agence geo » 2 900 recherches, KD 27).
- `/ressources/guides/claude-fonctionnalites-pme` : « Claude Pro, Max, Team : offres, prix et usages en PME » (« claude pro » 3 600, « claude max » 1 600).

## 3. Concurrence

**Sources.** Positions kayro_ai [KP], kayro.ai_fr [K], Overview ia4ops [IP], ia4ops.com_fr [I], Positions lucasfonseque « (1) » [LP], lucasfonseque.fr_fr [L], Competitors lucasfonseque [LC], Positions noiise [NP], noiise.com-organic.Positions [N], noiise.com_fr [N2], formation-ia_formation-chatgpt_bulk [F], Overview waimia [W]. Totaux des PDF ; [K], [I], [L], [N2] sont des extraits. Waimia : 0 visite, 2 mots-clés [W].

**Pièges.** Overview et Positions sans « (1) » de lucasfonseque.fr : base US, ignorés. Pages lues sur `origin/main` et le sitemap en ligne (158 URL) ; le `ls` local est périmé.

#### 3.31 Concurrents

**kayro.ai** : 502 visites, 167 mots-clés, 195 de marque [KP]. « agence automatisation ia » (590, KD 48), position 1 : 29 % du trafic ; accueil 39 %, /agence-n8n 3 % [KP]. Douze pages villes : 74 visites sur 310 [K] ; Strasbourg (29), absente chez Waimia, vit d'AI Overview sur « agence llm strasbourg » (KD 2) [K].

**ia4ops.com** : 65 visites, 135 mots-clés, 773 domaines référents dont 86 % d'ancres de spam [IP]. « agence ia bordeaux » (3, 70) : 10 visites [I]. Liens crédibles : francenum.gouv.fr, annuaire French Tech Bordeaux [IP]. Son article « choisir un organisme de formation IA » est 72e sur « formation ia bordeaux » [I] ; aucun article Waimia ne cible Bordeaux.

**lucasfonseque.fr** : 2,9 K visites, 1,5 K mots-clés [LP]. 1 843 de 2 972 visites sur 25 URL /claude… (prix, Max, essai, étudiant) ; 1 641 via AI Overview : 54 mots-clés, dont 46 en position 1 (les 8 autres en position 2, 3 ou 6) [L]. Waimia a /ressources/guides/claude-fonctionnalites-pme, au titre sans « Pro » ni « Max ».

**noiise.com** : 27,7 K visites, 15 K mots-clés [NP] ; /ressources 31 %, /agences/ville 23 % [N]. Zéro requête n8n, Claude ou « agence automatisation » sur 14 986 lignes [N], donc concurrent sur le GEO seulement. Local pack : 2 799 visites via 7 URL de fiches Google Business à UTM [N2] ; la fiche Bordeaux de Waimia reste au plan (audit du 5 octobre).

#### 3.32 Les 25 requêtes à plus forte opportunité

Tri par volume ÷ KD. « n.c. » : absent des extraits. Action par défaut : renforcer. Ligne 5 hors offre, à trancher ; les 24 autres pages existent.

| # | Requête | Vol | KD | Concurrent (position) | Page Waimia : action |
|---|---|---|---|---|---|
| 1 | claude skills | 3 600 | 22 | Lucas 45 | /ressources/guides/claude-skills |
| 2 | agence geo | 2 900 | 27 | noiise 4 | /services/referencement-ia : retitrer « Agence GEO » |
| 3 | claude pro | 3 600 | 35 | Lucas 7 | /ressources/guides/claude-fonctionnalites-pme : retitrer ; intention grand public |
| 4 | claude max | 1 600 | 20 | Lucas 1, AI Overview | même page |
| 5 | agence no code (+ bordeaux 260, KD 15) | 1 600 | 21 | ia4ops 36, Kayro Lille 14 | /services/automatisations : rattacher ou non (décision de Simon, aucune page à créer sans accord) |
| 6 | claude vs chatgpt | 1 600 | 24 | Lucas 11 | /ressources/comparatifs/claude-vs-chatgpt-pme |
| 7 | formation make | 720 | 12 | n.c. [F] | /formations/make |
| 8 | formation n8n | 1 000 | 23 | n.c. [F] | /formations/n8n |
| 9 | agent ia 24/7 pour pme | 260 | 6 | ia4ops 64 | /services/agents-ia : ajouter un H2 |
| 10 | agence chatbot | 320 | 8 | Kayro 6 | /services/agent-support-client |
| 11 | formation automatisation | 480 | 14 | n.c. [F] | /formations/automatisation |
| 12 | agence automatisation | 720 | 22 | Kayro 9 | /services/systemes-operationnels-ia |
| 13 | n8n c'est quoi | 590 | 19 | Kayro 57 | /blog/n8n-c-est-quoi |
| 14 | agence n8n | 390 | 13 | Kayro 9, ia4ops 53 | /services/automatisation-n8n |
| 15 | agence automatisation make | 390 | 15 | Kayro 5 | /services/automatisation-make |
| 16 | formation claude code | 260 | 10 | n.c. [F] | /formations/claude-code |
| 17 | agence ia lyon | 480 | 19 | Kayro 16, ia4ops 53 | /implantations/lyon : contenu local |
| 18 | automatisation des processus métiers | 590 | 36 | Kayro 31 | /services/automatisations |
| 19 | formation ia bordeaux | 210 | 13 | ia4ops 72 | /formations et /implantations/bordeaux : bloc formation |
| 20 | agence automatisation ia | 590 | 48 | Kayro 1 | /services/systemes-operationnels-ia (ligne 12) |
| 21 | agence ia toulouse | 210 | 18 | Kayro 2, ia4ops 16 | /implantations/toulouse : contenu local |
| 22 | chatbot rh | 320 | 28 | ia4ops 41 | /cas-usages/rh : ajouter une section |
| 23 | accompagnement ia | 170 | 19 | Kayro 2 | /services/consultant-ia-claude : terme dans le title |
| 24 | automatisation service client | 260 | 31 | Kayro 21, ia4ops 43 | /cas-usages/support-sav |
| 25 | agence ia paris | 260 | 31 | ia4ops 14, Kayro 19 | /implantations/paris : contenu local |

Ligne 20 : 590/KD 48 dans [K], 480/KD 31 dans `waimia strat claude.md` ; export gardé.

### 3.3 Cinq enseignements

1. **Le manque est le signal, pas la page.** 24 requêtes sur 25 ont leur page ; Waimia a 0 visite. Le sitemap en ligne passe de 88 URL (5 octobre) à 158 (13 octobre), contre la recommandation « moins de pages, plus denses » du 4 octobre.
2. **Bordeaux est une vitrine.** ia4ops, 773 domaines référents, tire 10 visites de « agence ia bordeaux » (70 recherches). Prendre ses liens crédibles : France Num, French Tech Bordeaux.
3. **Le Claude « prix et abonnements » fait 62 % du trafic de Lucas** (KD 20 à 35), surtout grand public. Waimia a le contenu, pas les mots : retitrer sans quitter l'angle PME. Lucas n'est que 45e sur « claude skills » (3 600, KD 22).
4. **La formation est le terrain le moins disputé de ces exports** : formation n8n, Make, automatisation et Claude Code sont absents des extraits (2 460 recherches, KD 10 à 23) [F]. ia4ops (/formation-n8n, 28 sur « formation n8n cpf ») et Lucas (29 sur « formation ia claude ») ont une page, classée loin [I][L]. Limite : les extraits couvrent une partie des mots-clés ; formation-claudecode.com (49 visites) figure chez Lucas [LC].
5. **« agence geo » est la seule requête GEO chiffrée** : noiise y est 4e (127 visites) ; le titre Waimia « Référencement IA (GEO) » n'a pas ces mots. C'est une page de service, pas le silo blog gelé.
