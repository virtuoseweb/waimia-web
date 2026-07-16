---
route: /
verdict: AMÉLIORER
title_actuel: "Waimia · Studio IA & intégration IA pour PME · Site web intelligent · Montpellier"
kw_cible: "studio IA PME · intégration IA Montpellier"
date: 2026-07-16
---

# / (home) · index.astro

## 1. Identité

- Route : `/` (`src/pages/index.astro`).
- Title : `Waimia · Studio IA & intégration IA pour PME · Site web intelligent · Montpellier` (`src/pages/index.astro:256`).
- Description servie : « Studio IA pour PME : conseil, intégration et mise en production de l'IA (site web intelligent, acquisition, CRM, pilotage). Diagnostic gratuit dès 2 000 € HT. »
- kw cible (carte `docs/strategy/14`, ligne `/`) : `studio IA PME · intégration IA Montpellier`. Note carte = « garder · activer le tab Système commercial (résidu bientôt désync) », prio P1.
- Intention : navigationnelle + découverte de l'offre (top of funnel). Rôle dans le silo : porte d'entrée marque (étage 1), doit distribuer vers les hubs systèmes et les money pages.

## 2. Contenu

- H1 servi : « Le studio qui fait tourner votre PME à l'IA. ». La signature canonique doctrine (`docs/strategy/10 §0bis.1`) est « Le studio qui construit les *systèmes* qui font tourner votre PME. ». Le H1 live a supprimé « les systèmes » et ajouté « à l'IA ». C'est une variante acceptable (H1 = signature marque étage 1) mais elle perd le mot « système » qui porte tout le récit double couche (§0bis.5).
- Voix : conforme anti-théâtre (« Stop le théâtre. Orchestrer. », « Là où l'argent fuit en interne. », `src/pages/index.astro` H2). Bon niveau, cash, orienté pertes.
- **Résidu d'architecture périmée** : H2 « Les deux offres forment une *boucle* : lire, mesurer, réinjecter. » (`src/pages/index.astro:236`). Le « deux offres » est le vocabulaire de l'ancienne archi 2-piliers (acquérir/opérer). La doctrine V8.1 courante parle de **deux systèmes** (acquisition & conversion / opérationnels & IA), `docs/strategy/10 §0bis.5`. `docs/strategy/14:26` flague la même formule « Deux offres = ancienne archi » sur le hub `/services` : la home porte le même résidu.
- Le tab « Système commercial » est présent et actif (`src/pages/index.astro:300` label, `:391` eyebrow), plus de mention « bientôt » (grep `bientôt` = 0 sur le HTML servi). Le point P1 « résidu bientôt désync » de la carte kw est donc **résolu**.
- E-E-A-T : bloc auteur « Simon Beros » (H2), témoignages (« Ce que disent les équipes qui ont mis leur système au travail »), stade de maturité 5 niveaux, cas réels liés. Solide.

## 3. SEO on-page

- **Title porte « Site web intelligent »**, ce que `docs/strategy/10 §0bis.4` liste explicitement en interdit : « ❌ site web intelligent comme title/H1 ciblé SEO » (concept de marque, 0 demande de recherche). À retirer du `<title>`.
- Le title empile 4 syntagmes (« Studio IA & intégration IA pour PME · Site web intelligent · Montpellier ») : long, dilue le signal. Le kw cible `studio IA PME · intégration IA Montpellier` est bien présent, mais noyé.
- Hiérarchie Hn : 1 H1, H2 nombreux et descriptifs, cohérents. RAS structurel.
- « site web intelligent » apparaît 22 fois dans le corps servi : usage massif d'un concept propriétaire non recherché. Acceptable en copy de marque tant que le vocabulaire recherché (création site web IA, intégration IA, agents IA) est présent par ailleurs (il l'est, via la rangée services et les liens).

## 4. Maillage interne

- Maillage sortant **excellent** : liens body + nav/footer globaux vers toutes les money pages (`/services/site-web-ia` ×5, `/services/systeme-acquisition` ×7, `/services/integration-claude` ×9, `/services/prospection-automatisee` ×4, `/services/seo-geo-contenu` ×5…), les 5 cas clients réels, les 5 cas-usages, ressources, secteurs, blog, équipe. Distribution de PageRank interne forte et cohérente avec les piliers.
- **Pas de section `related-links` cataloguée** en bas de page (grep `related-links` = 0 sur le HTML servi). Sur la home c'est acceptable (la page EST un hub de distribution), donc non bloquant.

## 5. Balisage

- JSON-LD servi : `Organization` + `WebSite` + `BreadcrumbList` + `FAQPage` (6 Q/R). Bon socle. Note : la home n'a pas de `@type` métier propre (normal pour une home).
- OG : `og:title` = title complet, `og:type` website, `og:url` canonique, `og:image` = carte dynamique. **Anomalie transverse** : `og:image` porte `kicker=§ Waimia` (URL-décodé de `%C2%A7%20Waimia`), hardcodé `src/layouts/Base.astro:80` (`const ogKicker = ... '§ Waimia'`). Le `§` est le glyphe eyebrow du site (motif volontaire, ex. `:391`), mais sur une carte de partage social « § Waimia » lu par un tiers est cryptique. À arbitrer (cf actions).
- Canonical correct (`https://waimia.com/`), robots `index, follow`. RAS.

## 6. Conversion

- CTA primaire : diagnostic/audit gratuit présent (`/audit-ia-pme` ×3, `/audit-site-web-intelligent` ×3, `/contact` ×10). Conforme doctrine (1 CTA primaire = audit gratuit).
- Pricing home = point d'entrée uniquement : « démarre à 2 000 € HT et monte selon votre maturité, avec un sur-mesure au-delà. Le détail formule par formule vit sur les pages du système marketing et du système complet. » Conforme `docs/strategy/10 §0bis.3` (« home = points d'entrée seulement »). Aucune grille complète inlined. Bon.
- Nombreux liens `/tarifs#formules` (≈20, rangée services) : cohérent, dirige vers la grille détaillée.

## 7. Verdict + actions

**AMÉLIORER.** Page structurellement forte (mesh, E-E-A-T, conversion, pricing 3 niveaux respecté), mais 2 dettes de positionnement dans le balisage/copy.

1. **`src/pages/index.astro:256`** : retirer « Site web intelligent » du `<title>` (interdit doctrine §0bis.4). Cible proposée : `Studio IA & intégration IA pour PME à Montpellier · Waimia` (kw cible propre, ≤ 60-65 car. visés). Répercuter sur `og:title`.
2. **`src/pages/index.astro:236`** : réécrire le H2 « Les deux offres forment une boucle… » qui porte l'ancienne archi 2-offres. Aligner sur le récit double système (acquisition & conversion / opérationnels & IA), `docs/strategy/10 §0bis.5`. Vérifier le sous-titre associé et la copy du diptyque pour la même dérive « deux offres ».
3. **`src/pages/index.astro` (HeroHome)** : envisager de réinjecter « système(s) » dans le H1 pour coller à la signature canonique et au vocabulaire marque qui relie tout (§0bis.5). Optionnel (variante actuelle défendable), à trancher par Simon.
4. **Transverse `src/layouts/Base.astro:80`** : arbitrer le kicker OG `§ Waimia` (affecte TOUTES les pages). Option A : garder (motif de marque assumé). Option B : remplacer par `Waimia` nu ou `waimia.com`. Décision produit, pas un bug fonctionnel.

Aucune cannibalisation détectée (la home ne cible pas un kw commercial exact-match, elle distribue).
