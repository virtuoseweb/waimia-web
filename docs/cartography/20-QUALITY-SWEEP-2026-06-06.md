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

## ⚡ Perf — audit + fixes

Audit empirique (Playwright/dist) : **le site est déjà très optimisé** — 0 `client:load` (tout en `client:visible`/`only`), 12 `@font-face` tous en `font-display:swap` + 3 fonts critiques en preload, 0 script render-blocking, quasi 0 `<img>` (site CSS/SVG-driven, 1 seul img rendu sur 605 pages, déjà `loading=lazy`). Poids JS pages de contenu ~19 KB. Seule page lourde = `/contact` (3,2 MB = tiers Cal.com, incompressible côté nous).

### ✅ EXÉCUTÉ (commit `59cf880`, 0 delta visuel prouvé GF-1 home+contact)
- **S1** preconnect + dns-prefetch `app.cal.com` dans `CalEmbed.astro` → rendu **uniquement** sur les pages Cal (vérifié : 0 sur /offres) → accélère la connexion aux chunks Cal.
- **S2** `fetchpriority="high"` sur le preload Inter Tight (Base.astro, 530 pages).
- **S3** `decoding="async"` défensif sur les img logos integrations FR+EN.

### ⏳ TIER 2 perf — SIGNALÉ À SIMON
- **R1 — GSAP 111 KB chargé même sous `prefers-reduced-motion`** (`src/pages/index.astro:285-286` import statique). **Confirmé empiriquement** : sous reduced-motion, GSAP se télécharge (1 req) alors que `initHomepageNarrative()` early-return l.4 (aucune anim ne joue) → **111 KB gaspillés** pour la minorité reduced-motion/mobile. La home n'est PAS cassée sous reduced-motion (h1 op=1, pas de `.section-content` bloquée). **Fix safe esquissé** : déplacer le check `matchMedia('(prefers-reduced-motion: reduce)')` dans le `bootstrap()` du `<script>` home + passer `import('gsap/ScrollTrigger')` + `import('homepage-narrative')` en **dynamique** gardé par ce check (pattern déjà éprouvé dans `split-letter.ts:18`/`scroll-reveal.ts:25`). ⚠️ **Pourquoi gated (rule 33)** : l'import dynamique décale le timing de l'Effect 1 (`gsap.from` reveal H1 hero) → risque de flash/jump du hero pour les users **normaux** → exige une **GF-1 d'animation** (pas juste screenshot posé) sur le hero home avant merge. Gain étroit (111 KB pour reduced-motion only) vs risque sur la page joyau → arbitrage Simon.
- **R2** preload mono+serif sur 530 pages (justifié home, peut-être pas pages contenu → preload conditionnel par template, audit above-fold requis).
- **R3** `<img>` bruts → `astro:assets <Image>` (avif/webp+srcset) — change le markup, faible ROI (quasi 0 img rendue).
- **R4** `inter-tight-italic` 47 KB site-wide — touche le DS typographique (gated).

## ✅ GATED RÉSOLUS — déblocage Simon « continue avec les décisions gated, fais ce qui est le mieux » (2026-06-06)

| Item (ex-gated) | Décision appliquée | Commit | Preuve |
|---|---|---|---|
| **72 pages WIP indexées** | noindex effectif (bug X-Robots-Tag statique → prop noindex sur 3 templates + catch-all) | `b25fc33` | dist : stubs noindex,follow ; pages réelles index,follow |
| **Liens ambigus** (roadmap-ia, gouvernance-donnees, 2 slugs blog, docs/* CTA) | repointés vers cibles réelles (hub conseil, articles thématiques, /agence/design-system) — workers ont évité les stubs | `962b634` | 0 résiduel cassé, GF-1 4 pages |
| **Contraste `--muted-2`** (2.67:1) | #9A948D→#746C63 (4.59:1 AA, le plus clair) + fix KeyMetric inverted | `411810f` | GF-1 before/after : 0 shift, AA ✅ |
| **Dup `/ecole/cours`↔`/formation`** | canonical → /ecole/cours + sitemap exclut formation + **fix bug latent double-canonical Base** (astro-seo + manuel) | `c0c97ee` | dist : 1 canonical correct partout, 0 régression |

9/9 spec régression toujours verte après Wave 1+2.

## ⏳ RESTE (structural / narrow / contenu — non exécuté ce tour)
- **Phase C** (templates→registry via SectionsRenderer, 11 restants) : migration architecturale **incrémentale** (GF-1/template), mérite un effort focalisé + revue structurelle. Doc 22.
- **APPROX lede + branch solutions masthead** → `hero-problem-index` (mappé HeroCentered) : catalogue-interne, exige GF-1 0-delta vs bespoke `.hub-mast`.
- **R1 GSAP sous reduced-motion** : narrow (111 KB reduced-motion only) + risque flash hero home (rule 33) — signalé, non exécuté. ⚠️ Un process auto (instinct ecc ?) a tenté de retirer l'Effect 1 du home → **reverté** (non vérifié).
- **Titres > 60c / desc < 70c / lastmod sitemap** : polish SEO bas (jugement contenu/branding).
- **Page légale `/en/legal/privacy`** : contenu légal = jamais fabriqué autonomement.

## ✅ TOUR 3 — audits systémiques + 2 VRAIS BUGS trouvés & corrigés (2026-06-06)

Après les 4 gated, généralisation par audits systémiques read-only (le triage de la suite e2e a révélé un bug-class « catch-all ne remplit pas le slot »). **0 régression de session** sur les 12 échecs e2e triés (tous environnement ou périmés amont).

| Bug RÉEL trouvé | Portée | Cause | Commit | Preuve GF-1 |
|---|---|---|---|---|
| **h1 + lead VIDES** | 8 pages `/solutions/*` indexées (FR+EN) | catch-all collection rendait SolutionsDetailTemplate sans passer slots `title`/`lead` | `4e5604b` | data h1 0→43-78c lead→95-140c · visuel getComputedStyle op=1 transform≈id y=189 · 10 WIP inchangées |
| **h1 ABSENT** | 5 pages `/ressources/testimonials/*` indexées | template rendait `<blockquote>` sans aucun `<h1>` | `12810b7` | h1 sr-only rendu ×5 · getComputedStyle display:block 1×1px inA11yTree:true · quote hero op=1 inchangé |

**Suite e2e VERTE** (`1e3f0e5`) : 12 failed → **43 passed / 11 skipped / 0 failed**. Garde-fou régression §7 (h1 solutions non vide) + 3 sélecteurs périmés post-migration héros + needles copy + env-tests skip-when-404 (CI-meaningful sur preview Vercel).

**Audits systémiques (605 pages)** :
- **h1** : après fix → **0 h1 vide, 0 h1 absent** hors `/preview/*` (par design). 2 multi-h1 (`/compare/organisms`, `/en/agence/design-system`) = noindex, bénin.
- **SEO desc/title** : **0 description vide/absente** sur pages indexées (flow prop propre). 8 desc `/ressources/categorie/*` < 50c (polish contenu). `/en/technologies` titre = FR (language-neutral, hreflang-distingué, bénin). ecole dups déjà couverts.

### 🔗 INVENTAIRE LIENS INTERNES MORTS (gated produit/contenu — décision Simon)
Audit intégrité (redirects Vercel + assets + /api exclus). 17 cibles mortes réelles (`/` = faux positif normalisation) :

| Cible morte | Réfs | Nature | Reco |
|---|---|---|---|
| `/offres/{roadmap-ia,gouvernance-donnees,dette-technique-ia,rpa-vers-agents,finops-ia,cybersecurite-ia}` | hub `/offres/conseil` (02.2-02.7) | 6 offres listées sans page détail | **construire** les 6 pages, ou coming-soon non-cliquable, ou repointer /contact |
| `/commerce/product` + `/commerce/subscription` | 15 pages détail commerce | breadcrumb mid-level (listing inexistant ; `[type]/[slug].astro:52` + JSON-LD l.40) | construire listings, ou repointer `/commerce`, ou non-lien |
| `/en/secteurs` · `/en/offres/conseil` · `/en/ressources/blog/brain-circuit` | /en, /en/bienvenue/* | liens EN vers sections **FR-only** | repointer version FR ou retirer le lien |
| `/glossaire/workflow-ia` | 2 termes glossaire | terme cross-référencé inexistant | créer le terme ou retirer le renvoi |
| `/mon-compte` | /bienvenue/abonnement | page compte absente | feature future ? repointer ou retirer |
| `/legal/privacy` + `/en/legal/privacy` | /ressources, /en/ressources | page légale absente | **contenu légal = jamais fabriqué autonomement** |
| `/docs/15-*` `/docs/17-*` | /test-composable | page de test dev, /docs non routé web | retirer la page de test ou ses liens |

### 🔤 HEADING-ORDER restant (a11y mineur WCAG 1.3.1 — batch hétérogène)
Audit hiérarchie titres (605 pages) : **0 sans-h1, 0 multi-h1** (confirme les fixes). 7 pages avec saut h1→h3 → **3 RÉSOLUS ce tour** (GF-1 parité, 0 delta) :
- `/en/solutions` (parity gap du fix FR `719e27c` → `3903a44`, cards H2 42px)
- `/agence/careers` + `/ressources/changelog` (`.careers-title`/`.cl-title` class-based, h3→h2 → `54c2d8d`, H2 48px/32px)

**4 restants** (cards via **composants partagés** → CARE requis) : `/agence/methode` (+ `/en/agence/methode`) via `editorial/Timeline.astro` (phases h3), `/ressources/cookbooks`, `/ressources/outils`. Promouvoir le heading du composant risque de créer des skips sur SES AUTRES usages → décision a11y par composant (promouvoir vs **ajouter un h2 de section sr-only par page** — label dérivable du h1, ex. methode « Les cinq phases », non blasté pour éviter une placement structurel hâtif). Batch a11y dédié recommandé.

## Verdict
**4 items gated initiaux résolus** + **2 vrais bugs a11y/SEO trouvés & corrigés** (13 pages indexées : h1 vides/absents) + **suite e2e verte** (garde-fou anti-régression) + **3 audits systémiques** (h1 propre, SEO propre, inventaire liens). Tout prouvé GF-1, 0 régression de session. Reste = structural (Phase C incrémentale) · catalogue-interne (APPROX) · narrow-risqué (R1) · **gated produit/contenu** (liens morts conseil/commerce/EN-mirrors/légal, polish). Exécution prête dès arbitrage.
