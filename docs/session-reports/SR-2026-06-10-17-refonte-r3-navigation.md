# SR-2026-06-10-17 · Refonte R3 : mega menus 4 entrées (vague R3 de docs/37)

> Worker Task subagent Opus (worktree `.worktrees/r3nav`), branche **`feat/refonte-r3-navigation`** commit `72f0a79`. Contre-vérifié orchestrateur (rule 09) : gates relancés PASS, pages EN vérifiées dans dist, screenshots inspectés.

## 1. Résultat

Navigation cible de docs/37 §2.2 livrée : **Solutions · Cas clients · Ressources · L'Agence + CTA** (5→4 sections, « Offres » fusionné dans Solutions).

- **Panel Solutions** : 3 colonnes par besoin prospect (ACQUÉRIR / PILOTER / OPÉRER), offres et solutions mélangées par intention, footers de colonne « Toutes les offres → /offres » et « Votre secteur → /secteurs », featured Plateau (+€2,4M pipeline).
- **Panel Cas** : 4 cas vedettes avec résultat chiffré en label (Plateau/Halcyon/Northbound/Caserne), footer « Voir tous les cas », featured livre blanc AI Act (choisi plutôt que re-citer Plateau, déjà featured de Solutions).
- **Panel Agence** : nouvelle colonne « MANIFESTE & DÉMOS » (Manifesto, Console, Atlas, demande explicite de la mission), Design System conservé en footer de colonne, colonne Contact supprimée (doublonnait le CTA header). 3 colonnes + featured Paris·Genève.
- **Ressources : intouché** (contrainte absolue respectée, vérifié sur le diff).
- **Header.astro** : helper `lh()` qui localise les hrefs sauf pour les vraies pages FR-only (sinon liens `/en/*` en 404) ; rendu de `col.footer` qui n'existait pas avant ; `aria-current` étendu via `matchPrefixes` (ex. `/offres/*` allume « Solutions »).
- **Fix i18n** : `/offres/conseil` retiré de `FR_ONLY_STATIC` (la page `/en/offres/conseil` existe en 200, l'entrée faussait hreflang + localisation nav).
- Footer : colonne Agence enrichie (Manifesto/Console/Atlas), `PRIMARY_NAV` aligné 4 entrées.

## 2. Preuves GF-1 (Playwright sur dist servi :4403, contre-vérifiées)

- 4 triggers + CTA « Réserver un audit » ; panels FR Solutions/Cas/Agence ouverts opacity 1 (screenshots).
- EN : tous les liens bilingues en `/en/*` ; les 3 exceptions (`/offres/site-web-ia`, `/offres/revops`, `/secteurs`) = pages réellement absentes en EN (vérifié dans dist par l'orchestrateur : ABSENT ; les localiser produirait des 404, le maintien FR est le bon choix).
- `/en/offres/conseil` EXISTE dans dist (le fix i18n est justifié, vérifié indépendamment).
- Mobile 390×844 : 4 sections numérotées. h1 home FR+EN opacity 1, 0 erreur console.
- Gates : `astro check` 0 errors · build Complete! · no-emdash PASS · touchpoints PASS (relancés par l'orchestrateur).

## 3. Arbitrages (options écartées)

| Décision | Alternative écartée |
|---|---|
| Featured Cas = livre blanc AI Act | Témoignage Plateau (aurait triplé Plateau, déjà featured Solutions) |
| Colonne dédiée « Manifeste & Démos » | Noyer Manifesto/Console dans la colonne équipe (moins lisible) |
| Pages FR-only gardées sur chemin FR (3 liens) | Localisation forcée `/en/*` = 404 ; création des pages EN = hors scope nav |
| Liens `?secteur=` retirés du panel Cas | Filtres query en menu = faible valeur, le hub /cas filtre déjà |

## 4. Liens retirés du menu, accessibilité conservée

Offres (hub via footers de colonne + footer site) · Hero Lab + DS Studio (via /agence/design-system) · Espace client (via /archive) · Newsletter (panel Ressources + footer).
