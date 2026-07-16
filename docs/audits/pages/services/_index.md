---
route: /services
verdict: AMÉLIORER
title_actuel: "Solutions IA pour PME : acquisition, commercial et opérations · Waimia"
kw_cible: solutions IA PME
date: 2026-07-16
---

# /services (index / hub des 3 systèmes)

## 1. Identité
- Title servi : « Solutions IA pour PME : acquisition, commercial et opérations · Waimia » (kw-first correct).
- H1 servi : « Trois systèmes. Une seule base. » (narratif de marque, pas kw).
- Kw cible (`strategy/14` §1) : « solutions IA PME ». Intention : navigationnelle/exploratoire, tête de silo.
- Rôle : porte d'entrée du silo, distribue vers les 3 hubs système + 11 modules.
- Note `strategy/14` : « terne · réaligner (Deux offres = ancienne archi) + title kw ». Le réalignement a eu lieu (le title parle bien de 3 systèmes) → dette résiduelle levée.

## 2. Contenu
- Structure recomposée autour des 3 systèmes (acquisition, commercial, opérations) : cohérent avec la doctrine 3 étages (`strategy/10 §0bis.2`).
- Voix anti-théâtre respectée (constats concrets).
- Pas de FAQ sur l'index (acceptable pour un hub de navigation, mais un bloc « ce que couvre chaque système » extractible GEO serait un plus).

## 3. SEO on-page
- H1 non kw-first (« Trois systèmes. Une seule base. ») : ACCEPTABLE pour un hub de marque, le title porte le kw. Conforme doctrine V8.1 (pas de « système X » en title ciblé ; ici le title est bien « solutions IA PME »).
- Hiérarchie Hn correcte (H1 unique).

## 4. Maillage interne
- Point de distribution central : lie les 3 hubs + modules.
- Reçoit du trafic de nav global. RAS majeur.

## 5. Balisage
- Schema servi : BreadcrumbList + ItemList (5 ListItem) + Organization + WebSite + PostalAddress. Pas de FAQPage (normal, pas de FAQ). Correct pour un hub.
- Canonical : `https://waimia.com/services` ✅.

## 6. Conversion
- CTA cohérents vers /contact + audits. RAS.

## 7. Verdict + actions
Verdict : **AMÉLIORER** (léger, la page est saine, réalignée 3 systèmes).
1. `src/content/services` (index) : ajouter un court bloc extractible GEO listant en 1 phrase chacune des 3 briques système (format « définition ») pour capter « solutions IA PME » en réponse LLM. Pourquoi : l'index n'a aucun contenu citable.
2. Vérifier que le title ne réintroduit jamais « Deux offres » au prochain regen (dette `strategy/14` levée, ne pas régresser).
