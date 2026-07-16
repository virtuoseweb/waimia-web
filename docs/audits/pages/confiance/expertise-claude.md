---
route: /expertise-claude
verdict: VALIDER
title_actuel: "Expertise Claude (Anthropic) · Waimia"
kw_cible: "expertise Claude / autorité Claude (pilier E-E-A-T, PAS le kw commercial)"
date: 2026-07-16
---

# /expertise-claude · expertise-claude.astro

## 1. Identité

- Fichier : `src/pages/expertise-claude.astro` (262 lignes, 100 % composable, 7 sections cataloguées, `:18-248`).
- Title : `Expertise Claude (Anthropic) · Waimia` (`:253`). Indexée (`index, follow`), pilier `docs/strategy/14 §2/§4`.
- kw cible : « expertise Claude » (autorité/GEO). Intention informationnelle « qui maîtrise Claude ».
- Rôle : **pilier d'autorité E-E-A-T du cluster Claude**. Distincte, par design, des money pages `/services/integration-claude` (kw commercial « intégration Claude entreprise ») et `/services/consultant-ia-claude`.

## 2. Contenu

- Contenu véridique et substantiel : position anthropic-first argumentée (`:38-55`), capacités réelles (`:57-111`), table des modèles à jour (Haiku 4.5, Sonnet 4.6, Opus 4.8, Code, `:125-150`), flux d'intégration MCP (`:153-200`), FAQ (`:203-231`).
- Voix conforme, zéro chiffre inventé (revendiqué `:9`, confirmé : aucune métrique fabriquée).
- **Anti-cannibalisation respectée** : le title/H1 restent « expertise » (autorité), pas « intégration Claude entreprise » (réservé à la money page). Bonne discipline de cluster.

## 3. SEO on-page

- H1 « Notre expertise Claude » (`:26`) : conforme doctrine, cible l'autorité pas le commercial.
- Hiérarchie propre via registry. Table des versions modèles = contenu frais citable.

## 4. Maillage interne

- Entrant : ~19 références (fort : manifesto, technologies, partenaires, services). Bien maillée.
- Sortant : CTA final → `/contact` + `/agence` (`:243-246`). Pourrait ajouter un lien descriptif explicite vers `/services/integration-claude` (« passer de l'expertise au déploiement ») pour irriguer la money page du cluster (le maillage autorité → commercial est le levier §2 de la stratégie).

## 5. Balisage

- **`FAQPage` JSON-LD présent** (vérifié HTML servi `"@type":"FAQPage"`, injecté par la section `faq-accordion`) : excellent pour GEO/AIO.
- Manque : aucun `author`/`Person` (Simon) sur une page d'autorité. Ajouter la byline auteur renforcerait le signal E-E-A-T (l'autorité Claude portée par une personne nommée).

## 6. Conversion

- CTA final ink « Parler architecture » → `/contact` (`:243-244`). Conforme.

## 7. Verdict + actions

**VALIDER.** Page d'autorité modèle : composable, FAQ+FAQPage schema, contenu frais et véridique, frontière kw propre vs les money pages Claude. Référence du cluster.

1. Ajouter un lien sortant descriptif vers `/services/integration-claude` (autorité → déploiement) pour activer le maillage pilier du cluster Claude.
2. Optionnel E-E-A-T : associer la page à l'auteur (byline / `author` Person Simon Beros) puisque c'est une prise de position d'expert.
3. Aucune correction bloquante.
