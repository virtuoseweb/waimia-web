# 19 — Vérification empirique complète + package de décisions gated (2026-06-06)

> Produit en boucle autonome (mandat Simon « consommer le quota, cadre Opus + workers Sonnet »). Travail effectué = **uniquement du safe** (vérification + a11y non-DS) ; le travail substantiel restant est **gated rule 28** → ce doc le tee-up pour décision Simon.

## 1. ✅ MILESTONE — Site + catalogue empiriquement vérifiés propres

Méthode : Playwright sur le build statique (serve-dist port 4330, parité prod). Reveals forcés (`animation:none + opacity:1`), getComputedStyle, capture erreurs console + scan mojibake (regex stricte `Ã…/â€…`).

| Sweep | Couverture | Résultat |
|---|---|---|
| **Live FR+EN** | 26 pages clés (hub, listing, detail, atlas, home, manifesto, solutions…) | **26/26 propres** — H1 op=1 partout, tailles correctes (hub 141px · listing standard 86px · atlas 83px), 0 mojibake réel, 0 erreur JS |
| **Catalogue previews** | **74/74** `/preview/<type>` | **70/74 parfaites** + 4 (hero-author, hero-landing, media-block, related-cards-band) rendent OK (op=1, contenu, 0 mojibake) — seul flag = prefetch-404 de **liens démo** vers pages illustratives inexistantes (ClientRouter), **0 impact prod** |
| **a11y bases** | 16 pages | lang ✓ · img alt ✓ · button name ✓ · 1 h1/page ✓ · landmarks main+nav ✓. « Liens/input sans nom » = **faux positifs** (`aria-hidden="true"` décoratifs méga-menu + honeypot anti-spam `name=website`, correctement masqués) |

**Conclusion** : 0 régression, 0 mojibake, 0 hero `opacity:0`. **Le prérequis GF-1 de merge `main` est satisfait** (parité prod locale ; un sweep preview Vercel reste à faire avec `VERCEL_AUTOMATION_BYPASS_SECRET` avant le merge réel).

### Correctif a11y appliqué (safe, 0 delta visuel)
- `/solutions` : sauts de niveau de titre (h1→h3, h2→h4) corrigés → cards problèmes `.hub-sol-title` h3→**h2**, cards secteurs h4→**h3** (+ sélecteur CSS `.hub-sector-card h4`→`h3`). CSS class-based → **0 delta visuel** (tailles inchangées). Seule page avec un saut réel ; toutes les autres déjà clean.

## 2. ✅ Branchements 0-delta — ÉPUISÉS (audit-confirmé)

Audit read-only des candidats FAITHFUL restants du doc 17 (equipe, comparer/[slug], offres, solutions, comparer/integrations) :
- **DÉJÀ-BRANCHÉ** : equipe (masthead `hero-hub-masthead` + grille `team-card-grid`), offres (masthead + `tier-pyramid-svg` + `offer-tier-grid` ×3 + `cta-final`), comparer/integrations (mastheads listing). 
- **Correction doc 17** : `services-grid` sur offres = **erreur d'audit** (la page utilise `offer-tier-grid`, pas services-grid).
- **0 nouveau candidat 0-delta** : tout le reste est APPROX / NEW / KEEP-BESPOKE (cf §3). **Phase B a réellement épuisé les 0-delta.**

## 3. ⏳ PACKAGE DE DÉCISIONS GATED (rule 28 — arbitrage Simon requis)

Le doc 16 (gate) + doc 17 (mapping) bloquent la suite sur ta curation. Voici les décisions **prêtes à trancher**, avec recommandation. Rien n'est fait sans ton feu vert (DS figé).

### 3A. Extensions APPROX (sur types EXISTANTS — backward-compatible)
| # | Page · section | Type cible | Extension requise | Reco |
|---|---|---|---|---|
| 1 | `solutions/index` `.hub-mast` | `hero-problem-index` | SVG geo + padding + h1 **identiques** déjà ; seul écart = `lede_fr/en` requis par le schéma alors que la page n'en a pas → **rendre `lede` optionnel** | ✅ **FAIRE** (extension minimale, 0 risque, débloque le branchement de la masthead solutions) |
| 2 | `offres/index` manifesto (l.259) | `manifesto-block` | structure `blockquote+p`→`p` unique + font-size + token `--paper-2`→`--paper` = **restyle visuel** | ⚠️ **veto probable** : non 0-delta (change le rendu offres). Garder bespoke OU accepter le restyle d'unification |
| 3 | `technologies` `use-case-index` | `use-case-index` | +champ optionnel `italic-sub` | à trancher (cf B8 : le h2 monumental reste le vrai blocker → plutôt KEEP-BESPOKE) |

### 3B. Types NEW (rule 28 — création = tâche dédiée, 4 touchpoints)
| Type | Page | Justification | Priorité reco |
|---|---|---|---|
| `sector-card-grid` | secteurs, solutions hub-solutions (5-col) | grille cards `pains` field, 0 équivalent | HIGH si tu veux cataloguer secteurs/solutions |
| `persona-attributes-grid` | personas/[slug] | grille 2×2 + dark footer | **déjà créé** (Phase A/B) — vérifier adoption |
| `glossary-term-card` | glossaire | card définition unique | MEDIUM |
| `product-card-commerce` | commerce | card ecommerce | LOW (trafic mineur) |

### 3C. KEEP-BESPOKE confirmés (signature légitime — no-touch)
atlas (AtlasConnections motion) · console (ProductReel sticky) · manifesto (actes) · home (HeroSector etc.) · solutions `.hub-sectors` (inversion d'encre hover) · comparer/[slug] + comparer/index (grouped) + integrations (filtre JS) · cas `.cas-grid`/`.cas-cta` · technologies content-bands (h2 monumentaux).

## 4. Décisions à prendre (pour débloquer Tier 2)
1. **APPROX #1 (solutions lede optionnel)** : feu vert ? (reco oui, c'est safe)
2. **APPROX #2/#3 (offres manifesto, tech italic-sub)** : restyle accepté ou KEEP-BESPOKE ?
3. **Types NEW** : lesquels créer ? (priorités HIGH→LOW)
4. **Phase C (templates→SectionsRenderer)** : à ne lancer qu'**après** §3 tranché (sinon migration en aveugle).

→ Une fois §4 tranché, l'exécution est mécanique (workers Sonnet + GF-1 par page, comme Phase B).
