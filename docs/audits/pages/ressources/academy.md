---
route: /ressources/academy
verdict: AMÉLIORER
title_actuel: "Diagnostic IA gratuit entreprise · scorecard personnalisé · Waimia Academy"
kw_cible: diagnostic IA gratuit entreprise (capture email)
date: 2026-07-16
---

# /ressources/academy (diagnostic IA email, lead magnet)

## 1. Identité
- Title : « Diagnostic IA gratuit entreprise · scorecard personnalisé · Waimia Academy ». Kw cible `strategy/14` §2 : « diagnostic IA gratuit entreprise (email) », note « garder (repositionné 2026-07-14) ».
- H1 servi : « Diagnostic IA gratuit, scorecard personnalisé. »
- Rôle : lead magnet email-gated. Le doublon historique « Academy = catalogue de cours » a bien été neutralisé (`src/content/ecole/courses/` ne contient qu'un `.gitkeep`, 0 cours) : la page est aujourd'hui un diagnostic-formulaire, pas un hub de formation.

## 2. Contenu
- **Vrai outil interactif** (contrairement aux pages `/ressources/outils/*`) : formulaire 6 questions notées 0-3 (données, outillage IA, conformité) → POST `/api/academy` → scorecard email (`src/pages/ressources/academy.astro:21-92`), honeypot + validation email côté client (`:142-209`). Fonctionnel.
- Dédoublonnage propre du cluster maturité : l'intro renvoie explicitement vers `/ressources/outils/score-maturite-ia` pour « un chiffre tout de suite, sans email » (`:20`) ; frontière academy (email, scorecard humain) vs score (instantané, sans email) claire.
- Voix conforme (« Relu par un humain, pas par un algorithme. Pas de rappel commercial. »).

## 3. SEO on-page
- Contenu SEO mince : hors formulaire, 1 seul paragraphe d'intro et 2 H2 servis (le reste = legends de questions). Pour une page indexée sur « diagnostic IA gratuit entreprise », ajouter un court bloc de contexte (que mesure le diagnostic, à qui il s'adresse) améliorerait la substance sans dénaturer le lead magnet.
- Chevauchement d'intention à surveiller : academy (« diagnostic IA gratuit ») ↔ `/ressources/diagnostics/*` (contenus) ↔ `/audit-ia-pme` (endpoint conversion). Academy garde sa spécificité (scorecard email auto) : à ne pas laisser dériver vers le même angle que `/audit-ia-pme`.

## 4. Maillage interne
- Sortants : `/ressources/outils/score-maturite-ia` (`:20`), `/contact` (skip form, `:90`). Entrants : peu depuis le corps des autres pages (score-maturite-ia y renvoie, `:88` de son MDX). N'est pas listé dans la grille du hub `/ressources` (cf `_index.md` action 3).

## 5. Balisage
- `BreadcrumbList` + `WebSite` + `Organization` uniquement. **Pas de schema métier** décrivant le diagnostic (ni `Quiz`, ni `WebApplication`, ni FAQ). Un balisage léger décrivant l'outil renforcerait la lisibilité GEO.

## 6. Conversion
- Raison d'être = capture email. Funnel intact (form → API → redirect scorecard). Pas de pricing (gratuit). CTA secondaire « réserver 45 min » vers `/contact` (`:90`). ✅

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. `src/pages/ressources/academy.astro` (slot body) : ajouter un court bloc de contexte SEO (2-3 phrases : ce que le scorecard mesure, à quel profil il s'adresse) avant le formulaire. Pourquoi : substance trop mince pour une page indexée.
2. Ajouter un JSON-LD léger décrivant le diagnostic (p.ex. `WebApplication`/`Quiz` ou une FAQ courte). Pourquoi : lisibilité moteur/GEO, aujourd'hui 0 schema métier.
3. Verrouiller la frontière avec `/audit-ia-pme` (academy = auto-scorecard email ; audit = mission humaine 5 j) dans le copy. Pourquoi : éviter la convergence d'intention entre les deux lead magnets.
