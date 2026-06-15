# 03 · Système Case Study + Hubs sectoriels (conversion / GEO)

> Blueprint issu du workflow de recherche `wf_f3917a09` (11 agents, données marché réelles sourcées + benchmark conversion/GEO + modèle double-label). Données brutes complètes : `tasks/ws6q4ww3x.output` (workflow run). Chantier de référence : tâche Claude #18.
> Décidé avec Simon (2026-06-15). Source de vérité unique pour ce sujet (rule 59).

## 1. Architecture (3 couches de preuve)

1. **`case-card-grid`** sur les pages service (ex. `site-web-intelligent.mdx`) : 3 cartes cas. Déjà en prod.
2. **Pages cas** `/cas/<slug>` : collection `cases` (schéma RICHE déjà existant : `content.config.ts` l.106-217) rendue par `CaseStudyTemplate.astro`. **Rien à ajouter au schéma** sauf le discriminant double-label (voir §4). On PEUPLE + on ordonne le rendu conversion/GEO.
3. **Hubs secteur** `/secteurs/<slug>` : collection `secteurs` (vide aujourd'hui) + routes à créer, rendus composables (`SectionsRenderer`, catalogue existant, 0 markup orphelin).

## 2. Taxonomie secteur (6, réconciliée avec Simon)

Le workflow proposait 7 secteurs ; Simon a unifié « Conseil & droit » + « Médias & créateurs » en **Libéral & indépendant** (les données de recherche des 2 alimentent ce hub unifié), et a confirmé **Thérapeutes** en secteur distinct.

| # | Secteur | Slug | Cas réels | Couvre aussi |
|---|---|---|---|---|
| 1 | E-commerce | `e-commerce` | Balzeo, BackdoorBS | boutiques en ligne PME |
| 2 | Bâtiment & artisans | `batiment` | Desangles Peinture | TPE BTP, artisans |
| 3 | Startup & logiciel | `startup-logiciel` | Amploi (Vigiscope) | SaaS, éditeurs |
| 4 | Services B2B | `services-b2b` | sitewebastro, Airess/Sprinkler | PME services pro |
| 5 | Libéral & indépendant | `liberal-independant` | Les Carnets de Montpellier | avocat, médecin, expert-comptable, journaliste, ingénieur, blogger, consultant, auteur |
| 6 | Thérapeutes & bien-être | `therapeutes` | Naturopathe *(source à fournir)* | praticiens santé/bien-être |

Principe : **3 slots cas par hub, colonnes vides honnêtes** quand pas de cas (zéro fake). Le hub tient sur son contenu sectoriel SEO/GEO + données marché.

## 3. Blueprint hub secteur (sections du catalogue, 0 nouveau type)

`/secteurs/<slug>` (+ `/en/...`), index `/secteurs` (cards par vertical + douleur 1 phrase + « Vous ne voyez pas votre secteur ? » → /contact). Phasage `noindex` tant que le hub n'a ni cas réel ni >= 300 mots uniques + 1 data point sourcé.

Ordre des sections :
1. `hero-sector` : H1 searcher-shaped « [solution] pour [secteur] » + sous-titre persona + 1 stat marché phare front-loadée (GEO).
2. `pain-points` : 5-7 douleurs sectorielles (reliées aux ids `src/data/pain-points.ts`, propagation GLOBAL).
3. `metric-shift` ou `stats-bento` : **données marché** 3-5 stats sourcées, chaque chiffre avec sa source nommée + label **« Analyse · sources tierces »** (famille B du double-label).
4. **3 slots cas** (`case-card-grid`) alimentés depuis la collection `cases` filtrée par `facets.sector` (slots vides honnêtes).
5. Méthode / offre / FAQ sectorielle / CTA final (catalogue).

## 4. Blueprint template `/cas/<slug>` (schéma `cases` EXISTANT, conversion + GEO)

2 couches (validé par 93 % des SaaS en croissance) :

**Couche 1 : scannable / front-loaded** (le GEO extrait depuis le haut) :
- Masthead : `caseNum` + H1 = `title` (client en avant si non-NDA) + chip famille A « Cas client · Waimia ».
- Spec-bar : Client / Secteur / Durée / Stack (provenance first-party).
- TL;DR 4 lignes (qui / défi / action / résultat) avec le metric phare dès la 1re phrase → `contextStatement_*` + `impact_*`.
- Bandeau metrics (`d.metrics`) : règle des 3 chiffres min, valeurs concrètes (« 5h au lieu d'une semaine », pas « 90 % plus vite »).

**Couche 2 : narratif Challenge → Solution → Results** :
- `contextStats` (max 4) = baseline AVANT.
- `bottlenecks` = le Challenge (relié `facets.painPoints`).
- `phases` = la Solution, avec le POURQUOI de chaque action.
- `deliverableCards` = livrables ; `shifts` = avant/après chiffré ; `pullQuote` = verbatim client.
- Schema.org `CaseStudy`/`Article` pour citations IA.

## 5. Modèle double-label honnête (2 familles de preuve)

Distinction visuelle constante site-wide, sans nouveau token DS (réutilise styles `eyebrow`/`kicker` : `font-mono`, `--text-small`, `--accent-text`). Discriminant : champ `provenance: z.enum(['first-party','second-party'])` sur la collection `cases` (ou convention de copy). Chip cliquable → page `/sources-methodologie` qui définit chaque label.

- **Famille A : FIRST-PARTY (notre travail)** : étiquette « Cas client · Waimia » (EN « Client case · Waimia »). Chip PLEIN (fond `--accent`/`--ink`, texte `--paper`). S'applique à la collection `cases`. **Gate éditorial** (refus de publication sinon) : client nommé (ou anonymisation justifiée + `ndaProtected`), baseline chiffrée (`contextStats`), période datée, attribution « Waimia vs client », >= 1 limite admise, bloc « Comment nous l'avons mesuré ».
- **Famille B : SECOND-PARTY (analyse de sources tierces)** : étiquette « Analyse · sources tierces ». Chip OUTLINE (contour, pas plein). S'applique aux données marché des hubs + études reportées. Chaque chiffre cite sa source primaire.

## 6. Données marché clés (sourcées, réutilisables)

- **Transverse** : 61 % des TPE/PME FR ne suivent pas leurs perfs d'acquisition/fidélisation en ligne ; 66 % dépensent < 300 €/an pour le numérique (Afnic 2025).
- **GEO transverse** : le trafic référé par les IA convertit ~4,4× mieux que l'organique (Semrush 2025) ; cité dans une réponse IA → conversion 14,2 % vs 2,8 % en recherche classique.
- **E-commerce** : ~70 % paniers abandonnés (Baymard) ; IA marchande +10-25 % conversion, +15-30 % panier (McKinsey 2025) ; trafic e-commerce via IA +693 % en 2025 (Adobe).
- **Bâtiment** : appel issu d'une recherche Google → 25-45 % de devis signés (Clickzou 2026) ; 88 % consultent les avis avant de décider (Batiweb 2025).
- **Startup & logiciel** : 97 % des visiteurs SaaS partent sans formulaire ; l'identification niveau personne en récupère 30-40 % (Warmly 2026).
- **Services B2B** : 81 % des acheteurs B2B choisissent un fournisseur avant le 1er contact, 70 % du parcours en autonomie (6sense 2024).
- **Libéral & indépendant** : 59 % des justiciables se renseignent en ligne avant de consulter (CNB 2025) ; cabinets SEO/GBP optimisés = 8,3× plus de trafic, conversion 3,2-7,8 %. Médias : trafic organique Google -33 % (nov. 2024→2025), -43 % anticipé d'ici 3 ans (Reuters Institute 2026).
- **Thérapeutes** : praticien sur site propre optimisé + plateforme = 2,8× plus de demandes de nouveaux patients que plateforme seule (Clickzou 2026).

## 7. Plan d'exécution (séquence choisie : cases + template d'abord)

1. **Phase A : Cases + template** : ajouter `provenance` au schéma `cases` ; peupler les cas réels disponibles (Amploi via repo, Balzeo/Carnets/BackdoorBS/Desangles via re-fetch complet virtuoseweb.fr) avec les champs riches ; ordonner `CaseStudyTemplate` selon §4 + chip famille A + schema.org. GF-1 par page.
2. **Phase B : Hubs secteur** : collection `secteurs` + routes `/secteurs/<slug>` + index ; remplir avec §3 (données marché §6 en famille B) + slots cas filtrés par `facets.sector`. GF-1 par hub.
3. **Sources à fournir** : repo/URL **Naturopathe** (hub Thérapeutes) + URL/repo **Airess/Sprinkler** (Services B2B).

> Liens `/cas/<slug>` déjà posés dans le card-grid de `site-web-intelligent` : `les-carnets-de-montpellier`, `balzeo`, `amploi` (s'activeront dès le peuplement de la collection `cases`).
