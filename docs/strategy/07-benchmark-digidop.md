# 07 — Benchmark DigiDop vs Waimia : conclusions SEO/GEO + prospection

> Analyse comparative d'un concurrent « même filon » (DigiDop, agence Webflow, autorité forte) face à
> Waimia (cabinet d'orchestration IA, domaine neuf). Réalisée 2026-06-15 en appliquant le **protocole
> Chain-of-Thought** de l'audit fourni (Étapes 1-4) sur le site RÉEL de DigiDop (crawl `web_fetch` +
> sitemap + recherche sourcée). Source d'entrée : `uploads/Analyse Structure Site Web SEO.md`.
> **Verdict central en §3. Ce qui change pour nous en §6. Roadmap en §7.**

---

## 1. Ce qui a été exécuté (protocole CoT du document)

- **Étape 1 — Macro-archi** : résolution domaine + i18n + sitemap. `digidop.com/sitemap.xml` = **1 412 URLs** (miroir fr/en → ~706/langue). Piliers nav : Services (hub + 6 enfants), Industries (2), Cas clients, Ressources.
- **Étape 2 — Traçage des silos** : DFS par pilier, relations parent→enfant. Confirmé : 6 pages service réelles (`webdesign`, `agence-webflow`, `migration`, `maintenance`, `strategie`, `ai-automation`) ; le 7ᵉ item nav « SEO & GEO » pointe **hors site** vers `vydera.com` (marque sœur dédiée GEO).
- **Étape 3 — Sémantique intra-page (DOM/Hn)** : H1 unique → H2 sections → H3 sous-services/étapes process ; les liens vers les enfants sont **encapsulés sous des H3** dans le hub (mapping sémantique = silo).
- **Étape 4 — AEO** : meta title (≈ H1 + année « 2026 »), meta-description avec preuve + CTA (« +150 clients satisfaits et des résultats garantis ! »), canonical auto-référencé, hreflang fr/en. *(Limite : `web_fetch` ne restitue pas les `<script ld+json>` → schema.org non confirmé exactement ; tout le reste est vérifié sur le HTML rendu.)*

**Répartition réelle du sitemap DigiDop :** blog ~523/langue (**~74 %**), cas clients 78, outils gratuits 45, équipe 10, **services 6**, industries 2. → le moteur, c'est le **contenu de masse**, pas les pages service.

---

## 2. Les patterns DigiDop (ce qui est réellement bien fait)

1. **Template de page service unique et répétable** (peuplé via CMS) :
   `Hero + badges autorité → [bloc problème] → bandeau logos → grille services (H3) → 3 cas clients avec 1 metric chiffrée → process numéroté 4-5 étapes → témoignages → certifications/autorité → services croisés → FAQ riche → CTA`. Squelette quasi identique sur les 6 pages.
2. **La FAQ = arme SEO/GEO + page de vente.** La FAQ de `/agence-webflow` (8 Q) contient le **pricing détaillé** (Starter 5-10k€, Growth 10-50k€, budget moyen 20-25k€), les **délais** (6-8 / 8-12 / 12-20 sem), le **process migration en 5 étapes**, la **sécurité/RGPD en bullets**. Long-form structuré = format idéal de citation par les LLM.
3. **Preuve chiffrée systématique** : 1 cas = 1 metric forte (Beedeez **+69 % de citation IA**, 123-IM **x70 trafic SEO**, Ramify +43 % conv, Bsport 30 M€). Réflexe « 1 section = 1 chiffre ».
4. **Transparence pricing** publique (page `/tarifs` : Starter/Growth/Signature ; page maintenance : TJM ~800 $, pack 10h, équipe dédiée). Qualifie les leads, rassure.
5. **GEO/AEO = pari assumé** : service « SEO/GEO/AEO » explicite, webinar « Rendre votre marque visible sur les LLMs », e-books, et surtout une **marque entière spinnée sur le GEO (Vydera)**.
6. **Cohérence d'entité forte** : LinkedIn, X, Behance, Dribbble, Awwwards, YouTube, Substack (+1 200 abonnés) — maillage dense + naming cohérent.

**Leurs faiblesses exploitables :**
- **La page `ai-automation` est superficielle** (notre terrain exact) : cas d'usage listés en 1 ligne, **0 méthodologie agent détaillée, 0 archi, 0 garantie**. L'IA est traitée comme **service annexe d'une agence Webflow**, pas comme expertise centrale. Ils citent pourtant Claude, OpenAI, **MCP**, n8n — mais en surface.
- **OG image générique réutilisée** sur toutes les pages (`open-graph.jpg` identique) → AEO/partage sous-optimisé.
- **Chiffres incohérents** entre pages (+100/+150 projets, +50/+70 migrations, +130/+150 clients), résidus EN non traduits sur `/strategie`.
- **CTA monolithique** (« Contacter un expert » / « Demande de devis » partout) → **pas de conversion progressive / lead magnet par étape**, alors qu'ils ont les ressources gratuites pour le faire.
- **Verrou Webflow** : techno fermée, non IA-friendly (ce que nous n'avons pas).

---

## 3. VERDICT CENTRAL — peuvent-ils se permettre cette stratégie ? Et nous ?

**Oui, DigiDop peut — parce que leur ampleur est un EFFET de leur autorité, pas une cause.** Trois faits le prouvent :

- **Ancienneté (mesurée RDAP)** : `digidop.fr` créé **2021-02-03**. Ils ont migré `.fr → .com` en **janvier 2025** (301). Leur `.com` « jeune » porte en réalité **~4 ans d'autorité accumulée** — ce n'est PAS un site parti de zéro. *(Piège : ne pas prendre leur `.com` récent comme preuve qu'on peut aller vite à froid.)*
- **Signaux d'autorité** : Webflow **Professional Partner of the Year 2023** (1ʳᵉ agence FR, sur 1 800+ partenaires) + Global Leader 2024, Awwwards, CSS Design Awards, GSAP, +150 clients depuis 2021, earned media qui les lie depuis des domaines forts.
- **Mécanique** : budget de crawl alloué dynamiquement (Google, mai 2025) + topical authority déjà gagnée → ils peuvent faire indexer 1 400 URLs ; un domaine neuf à 1 400 URLs **disperse** son crawl sur du contenu que Google n'a aucune raison de prioriser.

**Nous (Waimia) NE pouvons PAS, et ne devons surtout pas, répliquer cette ampleur.** La recherche 2025-2026 converge (sources en §8) :
- **Un seul sujet d'abord** : « build comprehensive authority before expanding ; spreading across topics = insufficient depth to achieve authority in any area ».
- **Profondeur > largeur** : 20 % des pages = 80 % du trafic ; des practitioners rankent avec **~90 pages** bien faites. Publier large dès le lancement = **dilution active** du peu de crawl/confiance.
- **Délai** : topical authority = **3-6 mois** (8-16 semaines avant les premiers signaux pour un domaine neuf). Personne n'accélère ça sans autorité préexistante.

> **Conclusion tranchée :** copier la silhouette de DigiDop (5 piliers, ~6 pages service, blog-usine de 500 articles, 1 400 URLs) avec notre autorité zéro = **reproduire un arbre adulte avec des brindilles : ça ne tient pas.** On copie leur **exigence** (qualité par page, discipline sémantique, preuve chiffrée, FAQ-AEO, cohérence d'entité, transparence prix) et on **refuse leur ampleur**.

---

## 4. Comparatif DigiDop ↔ Waimia

| Dimension | DigiDop | Waimia (cible V1) | Verdict |
|---|---|---|---|
| **Catégorie** | Agence **Webflow** (premium, primée) | **Cabinet d'orchestration IA** (porte d'entrée site intelligent) | Notre angle évite la commodité « web agency » ✅ |
| **Autorité** | ~4 ans (.fr) + awards + 150 clients | **zéro** (domaine neuf) | Gating direct → on concentre |
| **Architecture** | 5 piliers, 6 pages service, 2 industries, blog 500+ | **1 silo développé (Acquérir)** + 2 piliers vitrine gelés | On ne disperse pas ✅ |
| **Volume URLs** | 1 412 | **~26 au lancement** | Concentration assumée |
| **Pages service** | 6 (template unique) | 3 (`/services/*` + `/lp/*`), template 13 sections (`state/07`) | Même discipline, échelle réduite ✅ |
| **Pricing** | 5-10k / 10-50k / sur-mesure (moy. 20-25k€) | **2 / 4 / 7 / 10k + sur-mesure** | On est **accessible PME** (leur angle mort) ✅ |
| **Terrain IA/agents** | `ai-automation` **superficielle** (annexe Webflow) | **expertise centrale** (Anthropic-first, MCP, agents en prod) | **Notre avantage de profondeur** 🎯 |
| **GEO/AEO** | Fort (Vydera, webinars, FAQ riches, +69 % cit. IA) | Pari central, mais à construire | Concurrent crédible → se différencier par la profondeur + l'entité |
| **Stack** | Webflow (fermé, verrou) | Astro/git-based (ouvert, IA-friendly, dupliquable) | Différenciateur produit ✅ |
| **Conversion** | CTA monolithique, **0 lead magnet progressif** | Audit/diagnostic gratuit + quizz scoring | **Notre avantage** ✅ |
| **Preuve sociale** | 150 cas, awards | 7 vrais cas (à formaliser) | Asymétrie réelle → jouer la preuve « par l'usage » (waimia.com, virtuoseweb.fr) + cas réels |

---

## 5. Ce qu'on COPIE (micro-discipline) vs ce qu'on REFUSE (macro-ampleur)

**À COPIER (gratuit, ne dépend pas de l'autorité) :**
- Le **template de page service** rigoureux (on l'a déjà : `state/07`, 13 sections). ✅
- La **FAQ riche par page = arme AEO** : 6-8 Q&A longues, chiffrées, avec pricing/délais/objections → schema `FAQPage`. **À renforcer sur chaque page service + piliers.**
- Le **mapping sémantique Hn → silo** : H1 unique, liens vers enfants encapsulés sous H3 logiques (graphe de connaissances propre).
- La **preuve chiffrée systématique** (1 section = 1 chiffre), même avec peu de cas (metrics internes, cas réels, « par l'usage »).
- La **transparence pricing** (on l'a). La **cohérence d'entité** (LinkedIn société + dirigeant, Crunchbase, naming partout).

**À REFUSER (interdit sans le socle d'autorité) :**
- Le **blog-usine** (500 articles) → nous : cluster resserré in-silo, chaque article gagne sa place.
- Les **5 piliers + industries en parallèle** → nous : 1 silo Acquérir développé, le reste gelé.
- Les **1 400 URLs** → nous : ~26, profondeur > nombre.
- L'**i18n fr/en** au lancement → nous : FR monolingue (EN archivé).

---

## 6. Est-ce que ça change nos conclusions ? (la vraie question)

**Globalement : ça les CONFIRME fortement** (concentration sur 1 silo, ADR-003, pricing accessible, positionnement cabinet IA = tous validés). **Mais 5 raffinements/ajouts nouveaux émergent**, à intégrer :

1. **🆕 GEO d'ENTITÉ = le levier prioritaire à autorité zéro (nouveau poids).** La recherche montre que les citations LLM dépendent **moins** de l'autorité de domaine que de : cohérence d'entité (3× citation lift avec 4 profils alignés), Schema `Organization` + `sameAs` (emprunte l'autorité de LinkedIn/Crunchbase), **mentions tierces** (1er prédicteur de citation ChatGPT), **Reddit (46,7 % des citations Perplexity)**. → **Action : page entité « À propos » non-ambiguë + `sameAs` + saturation LinkedIn/Crunchbase + présence Reddit FR.** C'est notre **fenêtre** la plus rapide (AI Overview Google inactif FR → assistants directs). *À ajouter dans `strategy/03 §7` GEO.*
2. **🆕 La page agents/IA est le point faible de DigiDop → notre attaque frontale.** Leur `ai-automation` est en surface. Nous devons faire de `/services/*` (et du contenu) une démonstration de **profondeur** : méthodologie agent, archi, MCP/Claude, garanties, vrais workflows. C'est exactement notre positionnement « ingénieurs qui construisent les agents ». → **Renforce** le copy de profondeur, pas une nouvelle page.
3. **🆕 FAQ-AEO systématique** : en faire un **standard sur chaque page** (pas juste les services), chiffrée et schématisée. Cheap, puissant, indépendant de l'autorité.
4. **🆕 Per-page OG + meta discipline** : DigiDop rate l'OG par page (image générique). Easy win pour nous : OG + meta-description (preuve + CTA) **uniques par page**.
5. **🆕 Garder notre avantage conversion** : lead magnet progressif (audit/diagnostic gratuit adossé « Osez l'IA » + quizz scoring) que DigiDop n'a pas. → **ne pas l'abandonner**, c'est un différenciateur réel.

**Ce qui NE change PAS** : l'architecture ADR-003, le silo unique, le mapping 206→26, la grille pricing, le positionnement cabinet IA, 0 redirection. Le benchmark les **renforce**.

---

## 7. Stratégie court / moyen / long terme

**COURT TERME (0-3 mois) — concentrer + entité + cash :**
- Construire **le silo Acquérir uniquement** : hub `/acquerir` + 3 pages `/services/*` (template 13 sections + FAQ-AEO riche chiffrée) + `/agence-web-montpellier` (local). ~26 URLs propres, 0 thin.
- **GEO d'entité dès J1** (le quick win le plus rapide) : page À propos non-ambiguë + Schema `Organization`/`sameAs` (LinkedIn société + Simon + Crunchbase) + cohérence naming partout + LinkedIn actif + 1-2 fils Reddit FR utiles.
- **Cash** (cf `business/11`) : audit/diagnostic gratuit adossé aux aides « Osez l'IA » + réseau + outbound local. Le 1er euro ne dépend pas du SEO.
- 2-3 **cas réels** formalisés (1 section = 1 chiffre), preuve « par l'usage » (waimia.com / virtuoseweb.fr).

**MOYEN TERME (3-9 mois) — profondeur + premières citations :**
- **Cluster d'articles in-silo** (4-8, qualité > volume) : « Agent IA vs automatisation », « Site intelligent vs Wix/Lovable », « Diagnostic IA + Osez l'IA », « Combien coûte un projet IA (ROI 159 %) », « Être cité par ChatGPT/Perplexity ». Maillage vertical strict.
- **Mesurer** (Search Console + citations ChatGPT/Perplexity/Claude). Élargir **seulement** si le silo « prend » (impressions/positions stables).
- Densifier la profondeur agents/orchestration (là où DigiDop est faible) : démos, méthodologie, MCP.
- Premières **mentions/earned media** (annuaires, presse locale Montpellier, communautés).

**LONG TERME (9-24 mois) — élargir quand l'autorité le permet :**
- **Seulement après signaux verts** : ouvrir un 2ᵉ silo (ex. `/operer` automatisation/agents, ou `/piloter`) en silo développé = **nouvel ADR** (jamais une dérive silencieuse), exactement comme DigiDop a élargi avec le temps.
- Envisager le **GEO comme surface dédiée** (DigiDop a spinné Vydera) : un hub/contenu GEO fort si la demande se confirme.
- Récurrence (agents à l'usage / MRR), petit collectif, productisation (boilerplate forkable).
- EN éventuel pour le **thought-leadership global** (articles d'expertise only), pas le funnel local.

---

## 8. Sources

**Crawl DigiDop (2026-06-15)** : [/fr/services](https://www.digidop.com/fr/services), [/fr/services/agence-webflow](https://www.digidop.com/fr/services/agence-webflow), [/fr/services/ai-automation](https://www.digidop.com/fr/services/ai-automation), [/fr/services/migration](https://www.digidop.com/fr/services/migration), [/fr/services/maintenance](https://www.digidop.com/fr/services/maintenance), [/fr/services/strategie](https://www.digidop.com/fr/services/strategie), [/fr/tarifs](https://www.digidop.com/fr/tarifs), [sitemap.xml](https://www.digidop.com/sitemap.xml).
**Autorité / .fr→.com** : [Partner of the Year 2023](https://www.digidop.com/blog/digidop-webflow-awards-professional-partner-of-the-year-2023), [digidop.fr is now .com](https://www.digidop.com/blog/digidop-fr-is-now-digidop-com), RDAP AFNIC/Verisign.
**Thèse autorité/concentration** : [Nico Digital — Topical Authority 2026](https://www.nicodigital.com/digital-marketing/topical-authority-2026-content-silos-that-rank-and-get-cited-by-ai/), [Conductor — SEO new website](https://www.conductor.com/academy/seo-requirements-new-website/), [crawl budget 2025](https://business.anzolomed.com/crawl-budget-optimization-in-2025-master-googles-dynamic-crawling-system-for-better-rankings/).
**GEO domaine neuf** : [Rankability — brand mentions Perplexity](https://www.rankability.com/blog/how-to-track-brand-mentions-in-perplexity/), [W3era — LLM SEO](https://www.w3era.com/blog/seo/llm-seo-chatgpt-gemini-perplexity/), [digital-m — AI Overviews France](https://digital-m.fr/horizon-geo/google-ai-overviews-en-europe-le-deploiement-avance-la-france-attend-encore/).
