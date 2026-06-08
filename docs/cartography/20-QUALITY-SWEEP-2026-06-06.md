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

## ✅ TOUR 4 — audit exhaustif a11y + SEO meta (2026-06-07, prouvé GF-1/build)

### Socle a11y — IMPECCABLE sur les 351 pages INDEXÉES
Audit grep `dist/client` (noindex exclus) :
- **0** `<img>` sans `alt` (WCAG 1.1.1) · **0** `target="_blank"` sans `rel=noopener` (tabnabbing) · **0** racine `<html>` sans `lang` (WCAG 3.1.1)
- **1 h1 par page** (les multi-h1 résiduels sont tous sur des pages **noindex internes** : design-system FR/EN, compare/organisms)
- **Heading-order (script `_audit-headings.mjs`, logique axe-core) : 0 skip de niveau, 0 page dont le 1er heading ≠ h1, 0 page sans heading** → les « 4 restants » du Tour 3 (methode/cookbooks/outils) sont **tous résolus** (commits `1f3cf57` etc.). Dimension heading-order **100 % close**.
- **Noms accessibles (snapshot a11y Playwright sur 6 pages interactives, WCAG 4.1.2/3.3.2) : 0 vrai bug** — les 36 « issues » sont des **patterns intentionnels corrects** (`a.img lift aria-hidden=true tabindex=-1` = liens image décoratifs anti-duplication lecteur d'écran ; `input[name=website] aria-hidden=true tabindex=-1` = honeypot anti-spam). Champs réels du form `/contact` : tous labellisés.
- **JSON-LD (`_audit-jsonld.mjs`, 343 pages / 1166 blocs) : 0 invalide, 0 sans `@type`** — répartition saine (Organization/WebSite/BreadcrumbList globaux + Article/Service/Offer/Product/Course/FAQPage/ContactPage par template). Rich snippets sains.

### SEO meta (script `_audit-seo-meta.mjs`) — title/desc/canonical 0 manquant
**✅ Fixés ce tour (prouvés build) :**
- `304a24f` test(e2e) : durcit 2 tests hover flaky (`freezeMotion` neutralise reveals/transitions) + regex `rgba?` tolérante → suite **43 passed / 0 failed**.
- `a69b1c0` fix(seo) : **duplicate content** des 2 vestiges `ressources/blog/migrated-*` (contenu identique aux URLs canoniques `veille-ia/`+`field-notes/`, canonical auto-référent) → `seo.noindex:true` (levier natif `[...slug].astro:12`) + **redirect 301** vers l'URL canonique. Preuve : 0 page générée, hors sitemap, 2 routes 301 dans `.vercel/output/config.json`.
- `f6aa3d5` fix(seo) : `/categories/` (14) + `/compare/` (1) ajoutés au filtre sitemap (même famille catalogue DS interne que `/preview/`+`/components/`) → **noindex∩sitemap 94→79**, sitemap 909→894, vraies pages intactes ; meta desc testimonials `substring(140→90)` → 5 descriptions >165c (jusqu'à 204c) ramenées <154c.

**⏳ Documenté / gated (non touché ce tour) :**
- **79 stubs catch-all noindex∩sitemap** (`offres/*`, `solutions/*`, `technologies/*` détail FR+EN) : stubs placeholder **intentionnels** (`src/pages/[...slug].astro` getStaticPaths l.31-51, `noindex` by design en attendant le vrai contenu). Défaut = présence sitemap. **Préfixes partagés avec des hubs INDEXÉS** (`/offres`, `/solutions`…) → le filtre par-URL ne peut pas les distinguer sans risque. Solution propre = **post-build sitemap filter sur `<meta robots noindex>`** OU extraire la liste stub-routes en module partagé (catch-all + sitemap). Décision Simon (le statut noindex relève aussi du contenu : ces pages doivent-elles rester non-indexées ou recevoir du vrai contenu indexable ?).
- **9 descriptions >165c rédigées** (`cas/caserne`, `commerce/product/*`, `commerce/subscription/*`, `technologies/virtuoseos`, `personas/cmo-mid-market`) : léger dépassement → **copy éditorial** (gated).
- **8 descriptions <50c** (`ressources/categorie/*`) : trop courtes pour le SEO → **copy éditorial** (gated).
- **Faux positifs vérifiés (GF-4, non-bugs)** : `ecole/cours/*`≡`ecole/formation/*` (canonical formation→cours **déjà** en place + retiré du sitemap, alias volontaire) · title `/en/technologies` ≡ FR (language-neutral : noms propres + « open-source », rien à traduire).

### 🚨 CONVERSION EXTERNE CASSÉE (GATED — FORT IMPACT BUSINESS, signalé Simon 2026-06-07)
Audit liens externes (HEAD réels) → la chaîne de conversion pointe vers des services tiers non branchés. **Pages INDEXÉES** (`index,follow` + sitemap) → exposées clients/Google. Non auto-fixable (identifiants paiement/RDV réels inconnus de Claude — inventer une URL serait pire).
- **3 CTA RDV finaux MORTS (404)** : `cal.com/waimia/{activation-ia, application-ia-pme, revops-diagnostic}` sur `offres/*/tunnel/4` (dernière étape du tunnel = bouton « réserver » final). Cause : compte cal.com `waimia` inexistant (seul `cal.com/simonberos/audit` → 200 ; les slugs `activation-ia`/`application-ia-pme`/`revops-diagnostic` n'existent sous AUCUN compte). Source : `src/content/tunnels/{activation-ia,application-ia-pme,revops}-4.mdx`. **Décision Simon** : créer les events cal.com OU repointer vers un event existant (`cal.com/simonberos/audit`) OU vers `/contact`.
- **9 pages commerce/product + subscriptions : paiement Stripe PLACEHOLDER** : `buy.stripe.com/test_*` (→ 403, pas de vraies payment links) + `billing.stripe.com/p/login/<slug-inventé>`. Boutons « acheter » non-fonctionnels sur pages indexées. **Décision Simon** : brancher les vrais Stripe Payment Links OU passer ces pages en `noindex` tant que la vente n'est pas ouverte.

### 🔗 Liens externes morts (audit HEAD, GATED — handle/source réels inconnus de Claude)
5 liens externes « contenu/source » uniques testés → 4 morts (non auto-fixables sans deviner) :
- `github.com/simonberos` → **404** dans `src/content/authors/simon-beros.mdx` (`social.github`, l.88). Tous les autres socials de Simon utilisent le handle `simonberos` (linkedin/x), mais le compte GitHub n'existe pas. Comptes réels : `github.com/virtuoseweb` + `github.com/waimia` (200, cités dans le JSON-LD `sameAs`). **Décision Simon** : créer/corriger le handle perso, repointer vers l'org `virtuoseweb`, ou retirer la ligne.
- `hubspot.com/state-of-sales` (404) + `insee.fr/fr/statistiques/7735308` (404) : **sources citées mortes** dans des articles → remplacement éditorial (nouvelle URL de source) = décision Simon.
- `mckinsey.com/.../the-state-of-ai` → **000** (pas de réponse même UA navigateur) : **non concluant** (McKinsey peut bloquer les requêtes automatisées au niveau réseau) — à vérifier manuellement.
- ✅ Sain : `hbr.org/2011/the-short-life-of-online-sales-leads` (200).

### 🧱 Phase C (migration templates→registry) — BLOQUÉE sur arbitrage (sourcé `docs/22`)
13/18 templates migrés. Les **4 restants n'ont AUCUN chemin autonome** : `Solutions` = ⛔ décision Simon « non migré » (HeroSector infidèle) ; `TrustLegal`/`Welcome`/`ListIndex` = **aucun composant catalogué dédié** → créer un composant (interdit rule 28 / DS figé) OU accepter une régression (interdit GF-1). Arbitrage Simon requis (créer les composants hors-scope, ou laisser ces 3 templates en legacy).

## Verdict
**4 items gated initiaux résolus** + **2 vrais bugs a11y/SEO Tour 3** (13 pages : h1 vides/absents) + **Tour 4 : socle a11y 100 % clean sur 351 pages indexées** (img/lang/h1/heading-order) + **3 fixes SEO Tour 4** (duplicate content migrated, sitemap catalogue, desc testimonials) + **suite e2e verte durcie**. Tout prouvé GF-1/build, **0 régression de session**. **🚨 PRIORITÉ SIMON** : conversion externe cassée sur pages indexées (3 CTA RDV cal.com morts en fin de tunnel + 9 paiements Stripe placeholder) — fort impact revenus, gated (identifiants réels requis). Autre reste = structural (Phase C) · catalogue-interne (APPROX) · narrow-risqué (R1) · **gated produit/contenu** (79 stubs noindex∩sitemap = arbitrage indexation, liens morts conseil/commerce/EN-mirrors/légal, copy descriptions, polish). Exécution prête dès arbitrage.

---

## Tour 5 — Exécution du mandat exécutif (2026-06-08)

> **Mandat Simon (verbatim)** : « Réponds toi-même à toutes les questions en tant qu'ingénieur/CTO/CEO et directeur marketing et chef opérationnel et définis les tâches pour la suite puis orchestre et mets en action les agents pour les tâches restantes en autonomie. » + clarification Cal : « cal.waimia.com (`waimia-cal`) = fork open-source self-host DIY **non utilisé** ; on utilise **Cal.com SaaS** (calLink `simon-beros-eg1hc4/30min`). »
>
> Les items « gated » des Tours précédents sont débloqués : Claude tranche en CTO/CMO + orchestre (1 worker Sonnet sur la rédaction, micro-fixes directs). 4 commits, tout prouvé GF-1/build, 0 régression.

| # | Décision (CTO/CMO) | Implémentation | Preuve empirique | Commit |
|---|---|---|---|---|
| Conversion | 3 CTA RDV morts → vrai Cal.com SaaS `cal.com/simon-beros-eg1hc4/30min` (lien fourni Simon) | `tunnels/{revops,activation-ia,application-ia-pme}-4.mdx` | curl 200 + `href` dans HTML buildé | `91f4ca9` |
| SEO commerce | 15 pages `/commerce/*` (CTA Stripe placeholder 403) → **noindex défensif** + hors sitemap (réversible quand checkout réel branché) | `commerce/[type]/[slug].astro` + `astro.config` | GF-1 : `robots=noindex,follow` + page rend (h1+prix+CTA visibles) ; `/commerce/`=0 au sitemap | `76b35f5` |
| SEO stubs | 79 stubs catch-all noindex∩sitemap → exclus via module **data-driven** (`sitemap-noindex-exclude.ts`, dérivé empiriquement HTML∩sitemap) | `astro.config` filter + module | sitemap **404→325** ; 79 stubs à 0 ; vraies pages (`offres/claude-cowork`, `solutions/finance`, `technologies/claude-models`, `ressources/blog`) préservées (test décisif `A\B`=13 vraies pages protégées) | `76b35f5` |
| SEO desc | descriptions hors-norme → 120–155c brand voice (cmo 177→148, virtuoseos 175→144/147, caserne 169→154/151, 8 catégories `taxonomies.ts` <50c→120–150c) | worker Sonnet + vérif | astro check 0 err ; GF-1 lede categorie rendu visible | `0bb8446` |
| Liens | INSEE 7735308→7678534, HubSpot `/state-of-sales`→`blog.hubspot.com/sales/hubspot-sales-strategy-report`, github `simonberos`→`virtuoseweb` | `blog/automatiser-relances-*` + `authors/simon-beros` | curl 200 ×3 | `0f184e1` |
| **Phase C** (#7) | **DÉCISION : garder les 4 templates en legacy** — `Solutions` (Simon « non migré ») + `TrustLegal`/`Welcome`/`ListIndex` (aucun composant catalogué dédié → créer = violation rule 28 DS figé ; régresser = violation GF-1). **Dette acceptée**, pas de chemin sans violation. | aucune modif (statu quo assumé) | — | — |

### Dettes résiduelles signalées à Simon (décisions de fond, hors « fix technique »)
1. ✅ **RÉSOLU (2026-06-08, décision Simon + capture Cal partagée)** — Compte Cal.com unifié. Diagnostic : 2 comptes Cal **distincts** live (matrice HTTP) → `simonberos` (username propre, events `audit` GRATUIT + `30min` **€80 payant** + `rdv1h` €120 + `15min` €40) et `simon-beros-eg1hc4` (auto-généré, **seulement** `30min`, pas d'`audit` → 404). Simon a choisi **`simonberos` canonique** (capture `app.cal.com/event-types`). Affinage CTO sur la capture : `simonberos/30min` = event **payant €80** (prestation conseil), inadapté à un CTA top-funnel → tout le site unifié sur **`simonberos/audit`** (gratuit, « discutons de votre projet »), déjà l'event de `/contact`. 3 tunnels `simon-beros-eg1hc4/30min` → `simonberos/audit`. GF-1 local PASS ×3 (`href`=audit + CTA visible opacity 1). Reste possible (optionnel) : poser `PUBLIC_CAL_USERNAME=simonberos`/`_EVENT_TYPE=audit` dans les env Vercel (vides) pour verrouiller le défaut au-delà du code.
2. **Stat « 78 % » attribuée à l'INSEE** (note `^1` de `blog/automatiser-relances-*`, l.72) **non vérifiable** : l'INSEE n'enquête pas « le pipeline commercial comme frein à la croissance ». Le lien est réparé (page INSEE PME réelle) mais l'**attribution de la stat** reste douteuse → requalifier en observation terrain Waimia (décision éditoriale de fond, non inventée).
3. **Stripe** : brancher les vrais Payment Links pour **ré-indexer** les 15 pages commerce (retirer le `noindex` défensif).
4. **McKinsey** `the-state-of-ai` → `000` (probable blocage anti-bot réseau, non concluant) : à vérifier manuellement.
