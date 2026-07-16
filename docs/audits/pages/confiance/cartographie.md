---
route: /agence/cartographie
verdict: VALIDER
title_actuel: "Cartographie (audit) · Waimia"
kw_cible: "aucun (outil interne, noindex)"
date: 2026-07-16
---

# /agence/cartographie · agence/cartographie.astro

## 1. Identité

- Fichier : `src/pages/agence/cartographie.astro` (446 lignes, data-driven pur, `:62-199`).
- Title : `Cartographie (audit) · Waimia`. Description : « Audit interne : toutes les pages réelles... outil de décision garder / supprimer » (`:201-205`).
- kw cible : **aucun**. Outil **interne** noindex (`:209`, vérifié HTML servi `noindex, follow`).
- Rôle : outil de décision interne (inventaire des routes réelles par statut SEO). Cousin de `/agence/ds-studio` et `/plan-du-site`, orienté SEO plutôt que nav.

## 2. Contenu

- **Substance réelle, PAS une page squelette** : la page lit `getCollection` (slugs réels), `NOINDEX_SITEMAP_PATHS`, le registry DS (`:62-194`), calcule les incohérences frontmatter↔sitemap à la volée (`:73-93`). C'est un vrai tableau de bord d'audit, pas un placeholder.
- Utile à l'équipe (détecte les mismatch noindex/sitemap), sans aucune valeur éditoriale publique.

## 3. SEO on-page

- H1 « Cartographie du site » (`:215`). noindex correct : cette page ne doit jamais ranker (dupe structurelle de sitemap.xml + expose l'inventaire interne).
- Cohérence : elle est bien hors sitemap (noindex,follow).

## 4. Maillage interne

- Entrant : ~4 références. À vérifier qu'aucun lien PUBLIC (nav/footer visibles) ne pointe dessus : un outil interne ne devrait être atteignable que par URL directe, pas listé en navigation grand public.
- Sortant : liens vers chaque route auditée (normal pour un outil d'audit, tous internes).

## 5. Balisage

- Aucun schema (correct pour un outil interne noindex).

## 6. Conversion

- Aucun CTA de conversion (normal, outil interne).

## 7. Verdict + actions

**VALIDER** en tant qu'outil interne. Correctement noindex, substantiel, à jour, non-squelette. Zéro rôle SEO public, ce qui est voulu.

1. Vérifier qu'aucun lien de navigation PUBLIC (header/footer visible visiteur) ne pointe vers `/agence/cartographie` (grep `rg -l "/agence/cartographie" src/components/header src/components/footer src/data/mega-menu.ts`). Si oui, le retirer : outil interne accessible par URL directe seulement.
2. Optionnel : ajouter `/agence/cartographie` au `Disallow` `robots.txt` (comme `/library`, `/agence/ds-studio`) pour l'aligner sur les autres outils internes.
3. Aucune action éditoriale : la page fait son travail.
