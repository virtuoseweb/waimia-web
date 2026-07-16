---
route: /blog
verdict: AMÉLIORER
title_actuel: "Notes & essais · Waimia"
kw_cible: "blog IA PME / notes automatisation B2B (hub éditorial, intent info)"
date: 2026-07-16
---

# /blog : index Notes & essais

## 1. Identité
- Route `src/pages/blog/index.astro`, rendu via `UtilityTemplate` variant `list` + section cataloguée `ArticleGrid`.
- Title/desc : « Notes & essais · Waimia » / « Pas de pensum SEO. Notes courtes, cas concrets, recettes pratiques. Un essai mensuel, jamais de promotion. » (index.astro:82-83).
- H1 : « Notes lentes du terrain. » (index.astro:87-89). Kicker « § Notes & essais · monthly ».
- Intention : hub éditorial informationnel, point d'entrée des 7 billets. Rôle silo : distribuer l'autorité vers les 5 piliers money par le maillage des billets (aujourd'hui non fait, cf point 4).
- Strategy 14 §2 (ligne 89) : « /blog + 7 billets … garder ». Le verdict d'ensemble est « garder » ; l'index lui-même est correct mais sous-exploité.

## 2. Contenu
- Substance de l'index : une grille de cartes générée depuis la collection `blog` triée par `publishedAt` (index.astro:16-19, 51-71). Pas de texte d'intro éditorial au-delà du hero (H1 + lede). Voix conforme anti-théâtre (« Pas de pensum SEO »).
- **Seulement 6 cartes affichées, pas 7.** L'index ne liste QUE les entrées de la collection `blog` (index.astro:16). `brain-circuit` est une page `.astro` hardcodée hors collection → **absente de la grille ET du RSS** (cf rapport `brain-circuit.md`). Le hub prétend « toutes les notes » mais en cache une.
- Profondeur : 6 billets suffisent pour un lancement, mais un hub à 6 items sans catégorisation ni fil éditorial reste maigre pour un pilier de silo. Recommandation cadence en synthèse (bas de page).

## 3. SEO on-page
- H1 « Notes lentes du terrain » = marque/éditorial, 0 kw. Acceptable pour un hub de blog (l'intent est navigationnel/brand), mais le title pourrait porter un kw d'entrée (« blog IA & automatisation PME »).
- Hiérarchie Hn : H1 hero + cartes (H3 par carte via ArticleGrid). Correct.
- Pas de duplication inter-pages détectée.

## 4. Maillage interne
- **Entrant** : lié depuis le footer/nav global, la newsletter (`WelcomeNewsletter.ts`), `/bienvenue/newsletter`, `sitemap.ts`. OK.
- **Sortant** : 6 cartes → 6 billets. **Aucun lien vers les pages money** depuis le hub (pas de bloc « ces notes soutiennent nos offres X/Y »). Un hub de blog performant pointe aussi vers les piliers commerciaux.
- **Pas de section `related-links` cataloguée** sur l'index (cf `internal-mesh.ts`). Le maillage blog→services est absent au niveau hub.
- **7e billet manquant dans la grille** : `brain-circuit` orphelin (cf point 2).

## 5. Balisage
- JSON-LD servi (curl :4501) : `CollectionPage` + `ItemList` (6 `ListItem`) + `Organization` + `WebSite`. Correct et cohérent GEO.
- `ItemList` ne compte que 6 items (brain-circuit exclu). À corriger une fois brain-circuit migré en collection.
- OG/canonical : hérités de `Base` via `UtilityTemplate`. RAS.

## 6. Conversion
- Pas de CTA de conversion sur le hub (normal pour un index éditorial). Le lede oriente vers l'abonnement newsletter implicite (« Une newsletter mensuelle »), mais aucun lien d'inscription visible depuis le hero. Opportunité : CTA newsletter explicite (le silo éditorial nourrit la capture email, cf `/ressources/academy`).

## 7. Verdict + actions
**AMÉLIORER.** Hub sain mais amputé d'un billet et sans maillage vers le money.

1. **Réintégrer `brain-circuit` dans la grille** : migrer `src/pages/blog/brain-circuit.astro` vers une entrée de collection `src/content/blog/brain-circuit.mdx` (cf `brain-circuit.md`). Effet : la grille passe à 7 cartes, `ItemList` à 7, et le billet entre dans le RSS.
2. **Ajouter un CTA newsletter** dans le hero de l'index (`slot="lede"` ou bande sous la grille) pointant vers l'inscription (`/ressources/academy` ou endpoint newsletter), le silo éditorial devant capturer l'email.
3. **Ajouter une bande de maillage hub→money** sous la grille (section cataloguée `related-links` via `internal-mesh.ts`) : « Ces notes soutiennent » → `/services/automatisation-n8n`, `/services/crm-scoring-routing`, `/services/seo-geo-contenu`, `/services/agents-ia`. Ancres descriptives.
4. **Qualifier le title** : « Blog IA & automatisation PME · Notes & essais · Waimia » (kw d'entrée sans casser le ton).
5. **Cadence éditoriale** (cf synthèse dossier) : viser 1 essai/mois + 1 note terrain courte, chaque nouvelle publication attribuée à une money page cible dès le frontmatter (cf action mesh globale).
