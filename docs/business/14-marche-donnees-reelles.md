# Étude de marché Waimia — données réelles et sourcées

**Complément empirique à `docs/business/02-etude-de-marche.md`**
*Version du 12 juin 2026. Ce document remplace, quand c'est possible, les estimations « hypothèse » de l'étude initiale (rédigée depuis un brief, sans recherche) par des données issues de sources primaires ou institutionnelles, datées et liées. Chaque chiffre est qualifié : **donnée réelle** (source citée) vs **estimation Waimia** (raisonnement explicite). Quand une donnée n'est pas trouvable publiquement, c'est dit — rien n'est inventé.*

---

## 0. Avertissement méthodologique

Trois niveaux de fiabilité sont distingués dans tout le document :

- **[RÉEL]** — chiffre publié par une source institutionnelle (INSEE, Bpifrance, France Num) ou une étude sectorielle identifiée, avec lien et date.
- **[ESTIMÉ]** — calcul ou fourchette construit par Waimia à partir de données réelles (le calcul est montré) ou d'un consensus de sources secondaires (cabinets, comparateurs). À traiter comme un ordre de grandeur.
- **[À VALIDER]** — donnée non trouvée en source fiable, ou qui ne peut être confirmée que par une enquête primaire (entretiens prospects). Signalée comme telle, jamais comblée par une invention.

Les TAM/SAM/SOM ci-dessous sont des **ordres de grandeur de cadrage**, pas des prévisions de revenus. Ils servent à dimensionner l'opportunité, pas à promettre un chiffre d'affaires.

---

## 1. Combien d'entreprises ? (le dénominateur réel)

### 1.1 France — tissu productif (INSEE Focus n°372, déc. 2025, données 2023)

Périmètre INSEE « secteurs principalement marchands, hors agriculture et finance » :

| Catégorie | Nombre d'entreprises | Fiabilité |
|---|---|---|
| Total (champ marchand) | ~4,2 millions | [RÉEL] |
| dont microentreprises | ~96 % du total (~4,0 M) | [RÉEL] |
| **PME (hors micro, < 250 salariés)** | **~174 600** | [RÉEL] |
| **ETI (250–4 999 salariés)** | **~7 442** | [RÉEL] |
| Grandes entreprises | ~330 | [RÉEL] |

Champ élargi (tous secteurs, agriculture/finance inclus) : **~5,2 millions d'entreprises**, ~16 M de salariés ETP (INSEE, 2023). En 2024, **1 111 200 entreprises créées** (+6 % vs 2023).

> Correction importante vs l'étude initiale et vs des chiffres encore cités ailleurs : le couple souvent répété « 159 000 PME / 6 300 ETI » correspond à des millésimes plus anciens (~2021). **Les données 2023 publiées fin 2025 donnent ~174 600 PME et ~7 442 ETI.** C'est le dénominateur à utiliser désormais.

### 1.2 Occitanie / Hérault / Montpellier

| Zone | Donnée | Valeur | Fiabilité |
|---|---|---|---|
| Occitanie | Créations d'entreprises 2023 | ~96 400 | [RÉEL] |
| Hérault | Immatriculations 2023 | ~24 000 | [RÉEL] |
| Hérault | Établissements actifs employeurs (≥1 salarié) | ~46 700 (≈430 000 salariés) | [RÉEL] |
| Montpellier | Établissements actifs employeurs (≥1 salarié) | ~12 100 (≈164 000 salariés) | [RÉEL] |
| Montpellier | Nouveaux établissements créés 2024 | ~8 450 | [RÉEL] |

> Note de prudence : les sources mêlent « entreprises », « unités légales » et « établissements », et certains agrégats locaux proviennent de ville-data.com (retraitement de bases INSEE/SIRENE), pas directement de l'INSEE. Les ordres de grandeur sont fiables ; les décimales ne le sont pas. **Pas de décompte public propre « PME/ETI » à la maille Montpellier** trouvé — il faudrait une extraction SIRENE filtrée par tranche d'effectifs pour l'obtenir précisément. [À VALIDER]

### 1.3 Taux d'équipement web — le marché n'est pas vierge

France Num — Baromètre 2024 (enquête sur 10 125 entreprises dont 6 425 PME, sept. 2024) :

- **~85 % des TPE/PME disposent d'une présence/visibilité en ligne** ; **~15 % n'ont toujours pas de site** (le jugent non pertinent). [RÉEL]
- Seulement **~26 % vendent en ligne**. [RÉEL]
- Plus de la moitié des entreprises déclarent qu'au moins 5 % de leur clientèle vient d'internet (+5 pts vs 2023). [RÉEL]

**Lecture pour Waimia :** le marché du *premier* site est résiduel (~15 %). Le gros de la valeur est en **refonte / modernisation / surcouche IA-GEO** sur un parc déjà équipé mais souvent obsolète. C'est cohérent avec le positionnement « brique IA + données + GEO » plutôt que « on vous fait un site ».

---

## 2. Taille du marché de la création de sites web (France)

Pas de statistique publique officielle isolant « création de sites web » : les chiffres ci-dessous viennent de **sources secondaires** (éditeurs de business plans, cabinets type Businesscoot/BusinessResearchInsights). À traiter comme ordres de grandeur convergents, pas comme vérité INSEE.

| Donnée | Valeur | Source | Fiabilité |
|---|---|---|---|
| CA annuel agences web FR | ~1,5–2 Md€ | modelesdebusinessplan.com (2024) | [ESTIMÉ] |
| Croissance secteur (5 ans) | +7 à +10 %/an | idem | [ESTIMÉ] |
| Marché « développement web » FR (périmètre large) | ~5 Md€ visés d'ici 2025 | modelesdebusinessplan.com | [ESTIMÉ] |
| Nombre de « sociétés web » recensées FR | ~85 600 | idem | [ESTIMÉ] |
| dont agences digitales spécialisées | ~9 000 | idem | [ESTIMÉ] |
| Concentration Île-de-France | ~40 % du CA cumulé | idem | [ESTIMÉ] |
| Structure | petites agences = 75–80 % des acteurs mais 20–35 % du CA | idem | [ESTIMÉ] |

**Lecture :** marché **vaste, fragmenté, faiblement concentré hors IDF** — favorable à un acteur régional différencié. La masse d'acteurs (75–80 % de petites structures) confirme une **concurrence atomisée** : la différenciation ne peut pas venir du « site » (commoditisé) mais de la couche IA/GEO/données.

### Pricing — fourchettes réelles (sources secondaires convergentes, 2025–2026)

| Prestataire | Site vitrine PME | Récurrent | Fiabilité |
|---|---|---|---|
| Freelance | 1 000–5 000 € (simple : 1 000–3 000 €) | variable | [ESTIMÉ] |
| Petite agence / no-code | 2 000–5 000 € | maintenance | [ESTIMÉ] |
| Agence web (qualité) | 2 500–8 000 € TTC | 50–500 €/mois | [ESTIMÉ] |
| Maintenance (toutes offres) | — | 50–500 €/mois | [ESTIMÉ] |
| Hébergement + domaine | — | 100–300 €/an | [ESTIMÉ] |

> Le **plancher Waimia à 2 000 € HT** (palier Essentiel de la grille canonique 2/4/7/10k + sur-mesure) se situe dans la **fourchette basse agence** et au-dessus du freelance d'entrée de gamme ; le **panier moyen pondéré (~4 000 € HT [HYP])** tombe en fourchette basse-médiane agence. Cohérent avec un positionnement « prix d'agence régionale, valeur supérieure (IA + GEO + données) ». Confirme l'analyse de `02-etude-de-marche.md` §5 — désormais adossée à des fourchettes sourcées plutôt qu'à un brief.

---

## 3. Adoption de l'IA par les PME françaises

C'est l'axe le mieux documenté — et le plus favorable à Waimia.

| Donnée | Valeur | Source | Date | Fiabilité |
|---|---|---|---|---|
| TPE-PME utilisant l'IA générative (fin 2024) | **31 %** | Bpifrance Le Lab | déc. 2024 | [RÉEL] |
| TPE-PME utilisant l'IA générative (fin 2025) | **55 %** | Bpifrance | fin 2025 | [RÉEL] |
| PME/ETI ayant « réellement » adopté l'IA (au-delà de l'outil gratuit) | ~1/3, dont moitié en solutions gratuites/prêtes à l'emploi | Bpifrance Le Lab | 2024 | [RÉEL] |
| Frein n°1 : manque d'expertise/compétences internes | **88 %** | Bpifrance Le Lab | 2024 | [RÉEL] |
| Autres freins majeurs | coût perçu, crainte fuite de données, difficulté à identifier les cas d'usage, résistance des salariés | Bpifrance | 2024 | [RÉEL] |

Méthodo Bpifrance Le Lab : enquête 15 oct.–16 déc. 2024, **1 209 dirigeants de PME** (TPE < 10 salariés exclues).

**Lecture pour Waimia — c'est le cœur de la thèse :**
- Adoption qui **double presque en un an** (31 % → 55 %) = vague réelle, pas spéculative. Le timing du positionnement est validé par la donnée.
- Mais l'adoption reste **superficielle** (outils gratuits, faible impact stratégique) → **espace pour un intermédiaire qui opérationnalise**.
- Le **frein n°1 à 88 % = manque de compétences internes** valide presque mot pour mot la proposition de valeur Waimia (« on apporte la compétence full-stack IA que la PME n'a pas en interne »). C'est la donnée la plus exploitable commercialement du dossier.
- Le plan public **« Osez l'IA »** (Bpifrance) crée un contexte d'incitation/financement favorable côté demande. [RÉEL]

---

## 4. Demande & tendance (Google Trends, recherche)

**Méthode visée :** comparer sur Google Trends FR (12 mois glissants) l'intérêt relatif pour « création site internet », « agence IA », « site web IA », « GEO ». Trends ne donne pas de volumes absolus mais un indice 0–100 d'intérêt relatif ; les volumes absolus nécessitent Google Keyword Planner (compte Ads actif).

**Ce qui a pu être établi / observé :**
- Google publie chaque année (« Year in Search ») les requêtes en forte accélération ; l'IA est un thème de croissance record en 2025 (sources secondaires). [ESTIMÉ]
- **Contrainte spécifique FR à connaître :** l'**AI Overview de Google n'est pas actif en France** (différend droits voisins / amende 250 M€ Autorité de la concurrence 2024). Le « AI Mode » conversationnel déployé ailleurs depuis oct. 2025 n'est pas non plus disponible en FR. [RÉEL]

> **Implication GEO majeure :** en France, la pression « search génératif » passe **moins par Google (AI Overview absent)** et **davantage par les assistants directs (ChatGPT, Perplexity, Claude)**. Le pari GEO de Waimia doit donc cibler en priorité la **citation dans les assistants**, pas (encore) l'optimisation AI Overview. C'est un ajustement de cap par rapport à un discours GEO « générique » calé sur le marché US.

- **Limite honnête :** les indices Google Trends chiffrés pour les requêtes exactes ci-dessus **n'ont pas pu être extraits** via recherche web (Trends nécessite l'interface/API). Les **fourchettes Keyword Planner ne sont pas accessibles** sans compte Ads. → **[À VALIDER]** : à produire en primaire (capture Trends FR + extraction Keyword Planner sur le compte Waimia) pour chiffrer la demande locale.

---

## 5. Dynamique GEO / search génératif

| Donnée | Valeur | Source | Date | Fiabilité |
|---|---|---|---|---|
| Part de marché ChatGPT (assistants IA) | ~64,5 % (était ~86,7 % début 2025) | First Page Sage / agrégats 2026 | 2026 | [ESTIMÉ] |
| Part des **referrals IA** captés par ChatGPT | ~78 % | seranking / agrégats | 2025 | [ESTIMÉ] |
| Perplexity (referrals IA) | ~15 % | idem | 2025 | [ESTIMÉ] |
| Gemini (referrals IA) | ~6 % | idem | 2025 | [ESTIMÉ] |
| Requêtes mensuelles Perplexity | ~780 M (mai 2025), +239 % en ~9 mois | getpanto / seoprofy | 2025 | [ESTIMÉ] |
| Visites referral générées par les plateformes IA | ~1,13 Md | seranking | 2025 | [ESTIMÉ] |
| Part de marché Google search | passée sous ~90 % (1ère fois) | seranking | 2025 | [ESTIMÉ] |

> Ces chiffres viennent de **trackers SEO/agrégateurs privés** (méthodologies hétérogènes, périmètre souvent mondial/US). Les écarts entre sources sont importants (ex. « 89 % » vs « 64,5 % » selon le périmètre : usage vs referrals vs visites). À traiter comme **tendance directionnelle robuste** (le search génératif monte vite, ChatGPT domine, croissance Perplexity forte), **pas comme chiffres précis transposables à la France**.

**Lecture pour Waimia :** la **direction** est solide et favorable (déport d'une partie de la découverte vers les assistants → enjeu de citation = GEO). La **fenêtre d'avance** invoquée dans `02-etude-de-marche.md` §7 est plausible. Mais : aucune de ces stats n'est **française** ni **PME** — la part réelle du trafic « assistant IA » dans l'acquisition d'une PME montpelliéraine reste **[À VALIDER]** (à mesurer sur waimia.com et les sites clients via logs/analytics = dogfooding, cohérent avec GF-1).

---

## 6. TAM / SAM / SOM recalculés (calcul montré)

> Méthode : **comptes d'entreprises réels (INSEE 2023) × panier moyen**. On distingue le panier « projet site IA » (one-shot, plancher de grille = palier Essentiel à 2 000 € HT) et on ignore volontairement le récurrent agents (non chiffrable en panier moyen fiable à ce stade). Tous les résultats sont des **ordres de grandeur de cadrage [ESTIMÉ]**, bâtis sur des dénominateurs [RÉEL].

### Hypothèses de panier
- Panier moyen projet Waimia retenu **pour le cadrage TAM/SAM/SOM** : **5 000 € HT** (médiane de cadrage prudente, au-dessus du panier moyen pondéré commercial ~4 000 € [HYP] et bien au-dessus du plancher de grille 2 000 €, sous le haut de gamme agence 8 000 €). [ESTIMÉ]

### TAM — France (cible PME + ETI)
- Dénominateur [RÉEL] : 174 600 PME + 7 442 ETI ≈ **182 000 entreprises**.
- TAM théorique « un projet chacune » = 182 000 × 5 000 € = **~910 M€**.
- *Lecture :* borne haute purement théorique (suppose que chaque PME/ETI achète un jour un projet de ce type). Cohérent avec le marché agences web FR observé (~1,5–2 Md€, périmètre plus large que le seul site). **À lire comme plafond, pas comme cible.**

### SAM — segment réellement adressable
- Restriction au **cœur de cible réaliste** : PME/ETI (a) sensibilisées à l'IA et (b) avec un besoin web/marketing actif. Proxy : la part qui adopte l'IA générative (~55 % fin 2025) **et** dont le site est obsolète/à refondre.
- Hypothèse Waimia : **~20 % du parc PME/ETI** est un SAM réaliste à horizon de la vague (croisement adoption IA × besoin de refonte). [ESTIMÉ]
- 182 000 × 20 % = **~36 400 entreprises** ; × 5 000 € = **~182 M€** de SAM.

### SAM régional — Occitanie / Hérault (ancrage)
- Pas de décompte PME/ETI propre à la maille locale [À VALIDER]. Proxy prudent : Hérault ~46 700 **établissements employeurs**. Tous ne sont pas des PME/ETI cibles — on applique un filtre sévère.
- Hypothèse : ~5 % de ce parc = cible IA/web réaliste = **~2 300 entreprises** ; × 5 000 € = **~11,5 M€** de SAM local. [ESTIMÉ]

### SOM — ce que Waimia peut réellement capter (solo, an 1–2)
- Contrainte = capacité de production solo (cf `02` §6 : bande passante = le vrai facteur limitant, pas la demande).
- Hypothèse capacité : **8 à 15 projets / an** la 1ère année (livraison + récurrent à opérer en parallèle).
- 12 projets × 5 000 € = **~60 k€** de CA projet/an, hors récurrent agents.
- *Lecture décisive :* le **SOM est plafonné par la production, pas par le marché**. Le marché (SAM ≥ 180 M€) est **non contraignant** ; le goulot est interne. Conclusion identique à `02-etude-de-marche.md` §8 — désormais chiffrée. La voie de déplafonnement = **socle forkable** (passage service → produit) et **partenariats agences** (persona C).

### Tableau de synthèse TAM/SAM/SOM

| Niveau | Périmètre | Entreprises | Panier | Valeur | Fiabilité dénominateur |
|---|---|---|---|---|---|
| TAM | France PME+ETI | ~182 000 | 5 000 € | ~910 M€ | [RÉEL] |
| SAM national | ~20 % (IA × refonte) | ~36 400 | 5 000 € | ~182 M€ | [ESTIMÉ sur base RÉEL] |
| SAM local | Hérault, filtre 5 % | ~2 300 | 5 000 € | ~11,5 M€ | [ESTIMÉ sur base RÉEL] |
| SOM an 1 | Capacité solo | ~12 projets | 5 000 € | ~60 k€/an | [ESTIMÉ] |

---

## 7. Ce qui est SOLIDE vs ce qui reste à valider

### Solide (données réelles, sourcées)
- **Dénombrement entreprises FR** : ~174 600 PME, ~7 442 ETI, ~4,2 M total marchand (INSEE 2023). Base TAM fiable.
- **Vague d'adoption IA** : 31 % → 55 % en un an (Bpifrance). Réelle, rapide, datée.
- **Frein n°1 = compétences internes (88 %)** : valide directement la proposition de valeur Waimia.
- **Parc déjà équipé en web (~85 %)** : confirme un marché de refonte/surcouche, pas de premier site.
- **Spécificité FR : AI Overview absent** : réoriente le GEO vers les assistants directs (ajustement de cap réel).
- **Pricing** : fourchettes convergentes plaçant le plancher de grille 2 000 € HT (Essentiel) en zone basse agence et le panier moyen pondéré ~4 000 € [HYP] en zone basse-médiane.

### À valider en primaire (entretiens / mesure interne)
- **Décompte PME/ETI propre à Montpellier/Hérault** : nécessite une extraction SIRENE filtrée par effectifs. [À VALIDER]
- **Demande chiffrée (Trends FR + Keyword Planner)** sur « création site internet », « agence IA », « GEO » : à capturer sur le compte Ads Waimia. [À VALIDER]
- **Part réelle du trafic assistants IA dans l'acquisition PME locale** : à mesurer sur waimia.com + sites clients (dogfooding, GF-1). [À VALIDER]
- **Disposition à payer réelle / élasticité au plancher 2 000 € (Essentiel) et au panier moyen ~4 000 €** : à confronter en entretiens prospects (le pricing secondaire ≠ DTP terrain). [À VALIDER]
- **Taille du marché web FR** : les ~1,5–2 Md€ viennent de sources secondaires non institutionnelles — à considérer comme ordre de grandeur, pas vérité. [À VALIDER]
- **Stats GEO** : aucune n'est française ni PME — directionnellement robustes, non transposables au chiffre près.

---

## 8. Sources

**INSEE — dénombrement des entreprises**
- [Le tissu productif français par catégorie d'entreprises en 2023 — INSEE Focus n°372](https://www.insee.fr/fr/statistiques/8675639) (déc. 2025)
- [PME (hors microentreprises) — Les entreprises en France | INSEE](https://www.insee.fr/fr/statistiques/7678534)
- [Catégories d'entreprises — Tableaux de l'économie française | INSEE](https://www.insee.fr/fr/statistiques/3303564)
- [Panorama de l'appareil productif en 2023 — INSEE Analyses n°115](https://www.insee.fr/fr/statistiques/8679855)

**INSEE / local — Occitanie, Hérault, Montpellier**
- [Démographie des entreprises — Hérault (34) | INSEE](https://www.insee.fr/fr/statistiques/7658710?geo=DEP-34)
- [Bilan économique 2023 Occitanie — créations d'entreprises | INSEE](https://www.insee.fr/fr/statistiques/7936094?sommaire=7936516)
- [Entreprises et économie de Montpellier — ville-data.com](https://ville-data.com/entreprise/Montpellier-34-34172) (retraitement SIRENE/INSEE)
- [Entreprises et économie de l'Hérault — ville-data.com](https://ville-data.com/entreprise/herault-34-34D)

**France Num — équipement numérique & présence web**
- [Baromètre France Num 2024 — perception et usages du numérique des TPE/PME](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2024-perception) (sept. 2024)
- [Baromètre France Num 2024 — rapport complet (PDF)](https://www.francenum.gouv.fr/files/2024-09/Barom%C3%A8tre%20France%20Num%202024%20-%20Rapport%20complet.pdf)
- [Baromètre France Num 2025 — numérique et IA dans les TPE/PME](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le)

**Bpifrance — adoption de l'IA**
- [31 % des TPE et PME utilisent l'IA générative — Bpifrance Le Lab](https://lelab.bpifrance.fr/Etudes/31-des-tpe-et-pme-utilisent-l-ia-generative)
- [L'IA dans les PME et ETI françaises : 6 chiffres à retenir — Bpifrance Le Lab](https://lelab.bpifrance.fr/les-entreprises-francaises-et-l-ia-l-aube-d-une-revolution-l-ia-dans-les-pme-et-eti-francaises-6-chiffres-a-retenir/)
- [55 % des TPE-PME utilisatrices d'IA générative fin 2025 — IT Social (relai Bpifrance)](https://itsocial.fr/contenus/actualites/intelligence-artificielle-actualites-contenus/bpifrance-constate-un-basculement-des-usages-avec-55-des-tpe-pme-utilisatrices-dia-generative-fin-2025/)
- [Plan « Osez l'IA » (Bpifrance) — France Num](https://www.francenum.gouv.fr/aides-financieres/guides-et-conseils-financiers/bpifrance-finance-et-accompagne-dans-le-cadre-du)

**Marché web & pricing (sources secondaires)**
- [Marché des agences web et digitales : les chiffres 2024 — modelesdebusinessplan.com](https://modelesdebusinessplan.com/blogs/infos/marche-agences-web-chiffres)
- [Le marché du développement de site web — France (06.2025) — Businesscoot](https://www.businesscoot.com/en/study/the-website-development-market-france)
- [Combien coûte un site internet en 2025 — Wise](https://wise.com/fr/blog/combien-coute-la-creation-dun-site-internet)
- [Prix d'un site internet pour une PME — le-site-francais.fr](https://le-site-francais.fr/prix-site-internet/site-internet-pme/)

**GEO / search génératif (trackers privés)**
- [Top Generative AI Chatbots by Market Share — First Page Sage (juin 2026)](https://firstpagesage.com/reports/top-generative-ai-chatbots/)
- [AI Traffic in 2025 : ChatGPT, Perplexity & top platforms — SE Ranking](https://seranking.com/blog/ai-traffic-research-study/)
- [Perplexity AI Statistics 2026 — getPanto](https://www.getpanto.ai/blog/perplexity-ai-statistics)
- [2025 AI Search Year in Review — Presence AI](https://presenceai.app/blog/2025-ai-search-year-in-review-complete-analysis)

**Contexte Google AI Overview en France**
- [Pourquoi le Mode IA de Google n'est pas disponible en France — WY-Créations](https://wy-creations.com/mode-ia-google-absent-france/)
- [Tout savoir sur l'IA Overview de Google — Natural Net](https://www.natural-net.fr/blog-agence-web/2025/10/13/tout-savoir-sur-l-ia-overview-de-google.html)
