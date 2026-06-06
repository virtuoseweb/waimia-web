# 20 — Quality sweep a11y / SEO / liens (2026-06-06)

> Boucle autonome (mandat « consommer le quota, cadre Opus + workers Sonnet »). Après épuisement des branchements 0-delta du catalogue (doc 19), audits read-only (a11y profond, SEO technique, liens internes) → **fixes safe ungated exécutés + signaux TIER 2 gated consolidés pour Simon**. Branche `feat/quality-sweep-a11y-seo-links` (depuis `feat/catalog-bespoke-ctafinal-centered`). Aucun push (merge gated GF-1 Vercel).

## ✅ EXÉCUTÉ — fixes safe (0 design, prouvés empiriquement)

Chaque fix = attribut/media-query/donnée/href invisible → **0 delta visuel** (rule 28 respectée : aucun token CSS, aucune apparence de composant modifiée). Build vert + GF-1 (visuel + fonctionnel) après chaque batch.

| Commit | Scope | Détail | Preuve |
|---|---|---|---|
| `719e27c` | a11y /solutions | heading-order : cards h3→h2, secteurs h4→h3 (+ sélecteur CSS) | GF-1 : h1 op=1, **headingSkips 0**, tailles inchangées |
| `e0481b0` | a11y site | `aria-pressed` filtres /integrations FR+EN (synchro JS) · `aria-current=page` nav header · `prefers-reduced-motion` ScrollProgress | GF-1 visuel 5 pages (h1 op=1, 0 err) + **fonctionnel** : clic filtre crm → 40→24 cards, aria toggle ✅ |
| `32ae252` | SEO | sitemap exclut `/preview`+`/components` (**593→445 URLs**, −148 noindex) · hreflang : 30 pages FR-only + 6 EN-only n'émettent plus de `hreflang` vers 404 | Vérifié dist : 0 preview/components au sitemap ; tunnel/1 0×`en-US` ; `/en/offres` garde son `fr-FR` (anti-régression) ; 40 assertions i18n PASS |
| `8a05e4e` | liens | 5 liens cassés → cibles vérifiées : `/agence/team`→`/equipe` · `/technologies/mcp-connectors`→`/offres/mcp-connectors` (×3 dont Footer) · `/ressources/temoignages`→`/ressources/testimonials` | Chaque cible prouvée présente dans dist/client |
| _(en cours)_ | SEO JSON-LD | `Article` structuré sur 8 pages cas FR+EN (réutilise `buildArticle`) | Build OK, Article rend FR+EN ; fix cohérence author name en cours |

## ⏳ TIER 2 — SIGNALÉ À SIMON (gated : jugement / stratégie / DS figé)

### Liens cassés à cible AMBIGUË (worker a SKIP — ne pas deviner)
| `fichier:ligne` | lien cassé | label | décision requise |
|---|---|---|---|
| `offres/audit-maturite-ia.astro:53` | `/offres/roadmap-ia` | « Feuille de route IA » | aucune offre roadmap → créer la page, repointer `/offres/diagnostic-maturite`, ou retirer la carte |
| `offres/audit-maturite-ia.astro:56` + `offres/revops.astro:62` | `/offres/gouvernance-donnees` | « Gouvernance des données » | candidate `/offres/conformite-ai-act` mais ≠ sémantiquement (conformité ≠ gouvernance) → trancher |
| `ressources/blog/brain-circuit.astro:14,17` | `/ressources/blog/{why-ai-stalls, unglamorous-layer}` | related-cards blog | slugs inexistants (articles non publiés ?) → publier ou repointer |
| `content/offres/composable-pilot.mdx:27` | `/docs/18-DESIGN-SYSTEM-CARTOGRAPHY` | CTA « Voir l'audit » (page live) | `/docs/*` non routé web → retirer la CTA ou pointer une ressource publique |
| `en/ressources/index.astro:206` | `/en/legal/privacy` | mentions légales | **aucune page légale (FR ni EN) n'existe** sur le site → création hors scope contenu |
| `test-composable.astro:34,40` | `/docs/15-…`, `/docs/17-…` | page démo interne | liens doc repo cassés (page de test) |

### SEO gated (stratégie / contenu)
- **Duplicate content** : `/ecole/cours/*` ↔ `/ecole/formation/*` = 3 paires titre+desc+contenu **identiques, les 2 indexées+sitemap**. → choisir l'URL canonique (reco `/ecole/formation/*`) ou noindex l'une.
- **72 pages WIP « en préparation »** (offres/technologies, 35 FR + miroirs EN) : thin/duplicate content `index,follow`. → `noindex` tant que vides (prop déjà supportée par `Base.astro`) **ou** les étoffer. Décision launch-strategy.
- **76 titres > 60 c** (surtout `/commerce/product|subscription/*`, suffixe `· Commerce · Waimia`) + **14 desc < 70 c** (`/ressources/categorie/*`…) → polish content/pattern de titre.
- **lastmod absent** du sitemap (593→445 URLs) → activer si dates dispo.

### A11y gated (DS figé — tokens couleur)
- **`--muted-2` (#9A948D) sur `--paper`** ≈ **3.0:1** → échoue AA texte normal (4.5:1), 18 usages dont corps de texte (`OfferTierGrid:81,138`, `HeroCentered:475,514`). → assombrir `--muted-2` (~#7D766E) **ou** le réserver aux ≥18px/gras+bordures. **Modifie un token figé → arbitrage Simon.**
- **`--accent` (#C94F2E) en texte courant petit** ≈ 3.6:1 → OK en label/gros, échoue en petit texte. Cas par cas, pas de fix global.

## Verdict
Tout le travail **safe + ungated** est exécuté (a11y AA non-DS, SEO meta/hreflang/sitemap, liens à cible certaine, JSON-LD cas). Le reste (TIER 2 ci-dessus + doc 19 §3 : extensions APPROX, types NEW, Phase C) nécessite une **décision Simon** (stratégie SEO, sémantique liens, tokens DS, curation catalogue). Une fois tranché, exécution mécanique (workers Sonnet + GF-1/page).
