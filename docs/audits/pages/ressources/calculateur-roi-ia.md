---
route: /ressources/outils/calculateur-roi-ia
verdict: AMÉLIORER
title_actuel: "Calculateur ROI IA · Outils Waimia"
kw_cible: calculateur ROI IA
date: 2026-07-16
---

# /ressources/outils/calculateur-roi-ia

## 1. Identité
- Title : « Calculateur ROI IA · Outils Waimia ». Kw cible `strategy/14` §2 : « calculateur ROI IA », note « title qualifié (pas « · Outils Waimia ») », P3.
- H1 servi : « Calculateur ROI IA ».
- Rôle : outil d'auto-évaluation ROI (lead magnet no-email). Sa raison d'être = **l'interactivité**.

## 2. Contenu
- **Défaut critique. L'outil n'existe pas dans le rendu.** Le MDX définit bien les `inputs` (heures/sem, coût horaire, gain d'automatisation), l'`output` (`economieAnnuelle = heuresTaches * tauxHoraire * gainAutomation * 52`) et un `apiSlug` (`src/content/outils/calculateur-roi-ia.mdx:9-49`). Mais le template `src/pages/ressources/outils/[...slug].astro` utilise `EssayTemplate` et ne rend que `<Content />`, soit **uniquement la prose** « Comment utiliser ce calculateur / Limites » (`[...slug].astro:44-48`). Aucun widget interactif : le HTML servi ne contient que les 2 inputs du footer newsletter, pas les champs du calculateur. Le schéma `inputs/outputs/formula` est **défini mais jamais rendu**.
- Résultat : la page décrit un calculateur qui n'est pas là. « Le calculateur estime l'économie annuelle » (`:59`) est une promesse creuse → contraire à la voix anti-théâtre et anti-fabrication.

## 3. SEO on-page
- Title générique « · Outils Waimia » à requalifier (`strategy/14`). Contenu = 2 courts paragraphes → très mince pour une page indexée.

## 4. Maillage interne
- `relatedPages: []` (`:50`) → aucun lien sortant curé. Devrait pointer une money page ROI/automatisation (`services/automatisations`, `services/systemes-operationnels-ia`).

## 5. Balisage
- `Article` + `BreadcrumbList` + `WebPage` + `Person` + `ImageObject` (via EssayTemplate). Balisé comme un **article**, pas comme un outil : pas de `WebApplication`/`SoftwareApplication`. Cohérent avec le fait qu'il n'y a, de fait, aucun outil rendu.

## 6. Conversion
- **Funnel cassé** : la raison d'être (calculer → CTA) est absente. Le visiteur lit une description sans pouvoir calculer, puis tombe sur le CTA générique. Pas de pricing (gratuit).

## 7. Verdict + actions
Verdict : **AMÉLIORER** (défaut fonctionnel majeur).
1. Rendre le calculateur réellement interactif : câbler un composant qui consomme `inputs`/`outputs`/`formula` du MDX (île/script), OU router la page vers un template outil dédié au lieu d'`EssayTemplate`. Pourquoi : sans widget, la page ment sur son contenu et le funnel est mort (raison d'être de la page).
2. Requalifier le title (retirer « · Outils Waimia », p.ex. « Calculateur ROI IA gratuit pour PME »). Pourquoi : `strategy/14` §2.
3. Renseigner `relatedPages` vers `services/automatisations` / `systemes-operationnels-ia`. Pourquoi : faire converger l'outil vers une money page.
4. Après correction, ajouter un JSON-LD `WebApplication`. Pourquoi : décrire un vrai outil (aujourd'hui balisé comme simple article).
