---
route: /secteurs
verdict: VALIDER
title_actuel: "Secteurs · IA opérationnelle par métier · Waimia"
kw_cible: "secteurs IA par métier"
date: 2026-07-16
---

# Audit · /secteurs (hub sectoriel)

## 1. Identité
- Route `/secteurs`, rendue par `src/pages/secteurs/index.astro` (bespoke, hors registry composable, mais organisms catalogués : HeroCentered + CaseSpotlight + CtaFinal).
- Title actuel : « Secteurs · IA opérationnelle par métier · Waimia » (`index.astro:98`). Description sourcée sur les métiers (`index.astro:99-101`).
- H1 rendu : « Votre secteur, votre terrain. » (`index.astro:91`). Kicker « § Secteurs · la preuve par votre métier ».
- kw cible : « secteurs IA par métier » (strategy/14 §3, ligne 106, verdict « garder »). Intention : navigation + capture de l'intention « [métier] + site/IA ». Rôle : index de silo, pont vers les 12 hubs sectoriels.

## 2. Contenu
- Le hub est court et honnête : grille de 12 cartes (kicker = ICP, titre = label court dérivé, 1 douleur), une bande éditoriale `case-spotlight` (« On part de votre terrain, jamais d'un template ») et un CTA final. Voix conforme, anti-théâtre, 0 chiffre inventé (choix explicite `index.astro:63-66`).
- Aucun doublon de contenu : le hub ne réécrit pas les pages enfants, il les liste. Bon.
- Faiblesse : le hub ne porte aucune preuve chiffrée ni aucun cas nommé (le spotlight est un message de méthode, pas un cas). Pour un index qui vise « secteurs IA par métier », c'est acceptable mais mince.

## 3. SEO on-page
- H1 « Votre secteur, votre terrain » n'est pas kw-first : il ne contient ni « secteur » au pluriel indexable ni le métier. Doctrine V8.1 respectée sur le fond (pas de « système X »), mais le H1 est marketing plutôt que requête. Le title porte le kw (« IA opérationnelle par métier »), donc l'essentiel est capté côté `<title>`.
- 1 seul H1, hiérarchie propre (cartes en `<h2>`). Pas de cannibalisation avec les enfants (labels courts distincts des H1 longs des pages).

## 4. Maillage
- Sortant : 12 liens vers `/secteurs/<slug>` (grille) + `/contact` (spotlight + CTA + « Vous ne voyez pas votre secteur »). Solide vers le bas.
- Manque : aucun lien remontant vers les hubs services ni vers `/cas-clients` depuis le hub secteurs (le CaseSpotlight pointe `/contact`, pas un cas). Un pont `/secteurs → /cas-clients` renforcerait la preuve.
- Entrant : à vérifier globalement (header/footer). Le hub doit être atteignable depuis la nav principale.

## 5. Balisage
- Pas de JSON-LD `CollectionPage`/`ItemList` sur le hub (les pages enfants portent Article + FAQPage, pas le hub). Une `ItemList` des 12 secteurs serait le type adapté pour un index et aiderait le GEO.
- Canonical + OG hérités de `Base.astro`. index-on-quality : le hub reste indexé (strategy/14 §3).

## 6. Conversion
- CTA cohérent : « Parler de votre projet → » vers `/contact` (`index.astro:51`). Pas de pricing sur le hub (normal). Le CTA n'utilise pas Cal `simonberos/audit` mais `/contact`, cohérent avec le reste du silo secteurs (les pages enfants pointent aussi `/contact`).

## 7. Verdict + actions
**VALIDER** (hub propre, rôle clair, indexé à raison). Améliorations mineures, non bloquantes :
1. Ajouter un JSON-LD `ItemList` des 12 secteurs dans `index.astro` (via `Base` prop `jsonLd`) pour aider l'indexation de l'index et le GEO.
2. Ajouter un pont sortant vers `/cas-clients` (ou faire pointer le `cta_href` du `case-spotlight` vers `/cas-clients` au lieu de `/contact`) : le spotlight parle de preuve, il doit mener à la preuve.
3. Optionnel : rapprocher le H1 de la requête (« Votre secteur » → garder l'esprit mais le title porte déjà le kw, priorité basse).
4. Si le silo est réduit (cf recommandation d'ensemble, rapport de synthèse), retirer la carte du secteur supprimé/fusionné : la grille se régénère seule depuis `getCollection('secteurs')` filtré `visible`, donc passer `visible:false` sur le MDX suffit.
