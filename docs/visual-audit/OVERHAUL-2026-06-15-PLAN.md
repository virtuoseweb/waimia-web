# Refonte design awwwards — diagnostic consolidé + plan de vagues (2026-06-15)

> Source : 5 agents diagnostic Opus (chromium headless @1440×900 + @375×812, getComputedStyle,
> source `fichier:ligne`). Screenshots : `/tmp/waimia-audit/{home,piliers,services,hubs,editorial}/`.
> Branche de travail : `feat/design-overhaul` (part de `feat/hero-viewport-fit`). main/prod intouchés.

## État d'avancement (MAJ 2026-06-16)
- **W1 · Hubs & cards**, **W2 · Piliers**, **W3 · Home** : livrées (sessions antérieures).
- **W4 · Services & schema** : ✅ livrée — `main` `8dae6a6`. FAQPage JSON-LD câblé (1 FAQPage + 1 BreadcrumbList/page, 0 doublon), § Définition + faq généralisés (3 services), `audit-maturite-ia` migré legacy→MDX composable (238 l hardcode supprimées), WorkflowTable H2 79→51.84px, br MéthodeWaimia décollé. GF-1 chromium OK, 0 erreur console.
- **W5 · Global responsive & dette** : ✅ livrée — `main` `d1d0e48`. Mega-menu mobile masqué < 1180px, contact form ramené dans le fold, manifesto inline 24px→`var(--text-h3)`, CtaFinal dédupliqué (manifesto Acte V + methode `.meth-cta`). GF-1 OK.
- **Fix dérivé** : overflow-X mobile 23px sur les hubs (`HeroHubStats.astro`) → `minmax(0,1fr)` + `min-width:0` — `main` `e561b4c`. GF-1 @390 : /agence·/acquerir·/secteurs = 0px, desktop 4 col préservées.
- **Findings remontés non-bloquants** : (1) kicker eyebrow `11px` hardcodé (atome) → relève de P2.11 (hardcode→token) ; (2) CaseStudyTemplate FOUT `ui-serif` = fallback légitime `--font-display`, fix global à arbitrer séparément.
- **Reste gaté Simon** : push prod des 3 commits (`main` = `waimia.com` live).

## 7 thèmes transversaux (mesurés sur ≥2 zones)

1. **Médias vides / assets dormants** — 10 blocs `feature-split-media` avec placeholder hachuré (piliers+services), featured card cas conçue pour image mais 0 `heroImage`, hub secteurs 100% texte. PENDANT que dorment : `besoin-{acquerir,piloter,operer}.webp`, 9 SVG `sumie/*`, 6 `theme-*.webp`, 3 textures, `ConseilAuditDiagram`/`RevOpsFunnel`. → réinjecter.
2. **Monotonie chromatique** — home 9 paper/1 ink/0 accent ; operer section sans `background` (fallback) ; audit-maturite 0 ink ; hub secteurs mono-paper. → rythmer paper/ink/accent (le DS le gère déjà, `[data-bg='ink']`).
3. **Incohérence typo** — 2 échelles H1 (79px sans = produit/home/services/piliers/offres vs 115px serif = éditorial/hubs/contact/methode) ; H2 split Serif(hubs) vs Inter Tight(détails) + **FOUT `ui-serif`** dans CaseStudyTemplate ; `workflow-table` H2 79px (devrait 51px) ; `<br/>` collé « MéthodeWaimia » ; body 13px vs 15px (home) ; eyebrow 10/10.5/11/13px ad hoc. → tenir 1 règle (serif=éditorial, sans=produit/conversion) + corriger les ruptures intra-page.
4. **Composants doublons / orphelins** (le « trier/fusionner » de Simon) :
   - FAQ canonique = **`faq-two-column`** (mais 0 sur les 3 piliers, FAQ growth-system orpheline non rendue, audit aucune).
   - CTA canonique = **`CtaFinal`** (dupliqué inline : `.cas-cta` cas-clients, `.sectors-cta` secteurs, `.meth-cta` methode, manifesto Acte V).
   - Cards de cas = **3 langages** (hub featured/row, `CaseCardGrid` table, related grid inline) → unifier sur `CaseCardGrid` + `RelatedCardsBand`.
   - ~~`audit-maturite-ia` = template legacy hand-built (`DetailMenuTemplate`)~~ ✅ obsolète : `/offres/audit-maturite-ia` est déjà rendu en composable (`offres/[...slug].astro` → `SectionsRenderer`) ; le template `DetailMenuTemplate` était mort (0 route) et a été supprimé.
5. **Définition manquante** — bloc `§ Définition` (pattern `problem-statement` dropcap) présent sur **1 service/5** et **0 pilier/3**. → généraliser (composition MDX, 0 nouveau composant).
6. **SEO/GEO dead code** — `FAQPage` JSON-LD jamais émis (`buildSchemaForPage` sans appelant + sans `case 'services'`). Perte directe vs positionnement « citable par IA ».
7. **Responsive / conversion** — overflow-X mobile mega-menu (`Header.astro`, visible `/agence`) ; `/contact` H1 centré 115px mange le fold (form sous le fold) ; cookie banner recouvre la featured card ; titres secteurs tous « Site web et IA pour… » (répétition).

## Décisions canoniques (à appliquer partout)
- **FAQ** = `faq-two-column`. **CTA final** = `CtaFinal`. **Cards cas** = `CaseCardGrid` (+ `RelatedCardsBand` pour les related). **Définition** = `problem-statement` `kicker:"§ Définition"` + dropcap.
- **Échelle typo** = on garde le split **serif 115px (pages éditoriales/marque : agence, methode, manifesto, ressources, hubs, contact) / sans 79px (produit & conversion : home, services, piliers, offres, LP)**. `audit-maturite` = offre → passe en sans 79px. On corrige seulement les ruptures (FOUT ui-serif, H2 79px de workflow-table, br collé).
- **0 nouveau token / 0 nouveau type de section** (rule 60 + CLAUDE.md DS figé) : composition + bons `var(--token)` existants. Création seulement si gap de rôle prouvé.
- **2 points à valider Simon** (défauts retenus, alignés sur ses valeurs) : (A) métriques de service inventées (`×2,4 leads`…) → remplacées par des **capacités honnêtes** (cohérent doctrine anti-théâtre) ; (B) équilibrage des 3 piliers sur la home (liens Piloter/Opérer à parité d'Acquérir).

## Plan de vagues (file-sets disjoints → parallélisables en worktree isolé)

- **W1 · Hubs & cards** — `cas-clients/index.astro`, `secteurs/index.astro`, `CaseStudyTemplate.astro`, `CaseCardGrid.astro` : unifier CTA→`CtaFinal`, related→`RelatedCardsBand` (retirer orphelins), dédup texte amploi (`impact_fr` 2×), raccourcir titres secteurs, câbler `theme-*.webp`/SVG + cover featured, fix overlap cookie banner.
- **W2 · Piliers** — `acquerir/piloter/operer.astro` : câbler `besoin-*.webp` dans les `feature-split-media` vides, ajouter `faq-two-column` + bloc définition, fix `background` operer, intent tracking CTA partout, varier operer (1-2 splits → autre type).
- **W3 · Home** — `index.astro` (home) + `ServicesGrid` + `ArchitectureDiagram` + `MaturityPyramid` + `CtaBandSection` + `sitemap.ts` : body 13→15px, rythme ink/accent, liens 3 piliers à parité, métriques honnêtes, eyebrow unifié.
- **W4 · Services & schema** (round 2) — `services/[...slug]`+content, `offres/[...slug]`, migrer `audit-maturite-ia` en composable, câbler `FAQPage` JSON-LD, généraliser définition + FAQ, fix H2 workflow-table + br collé.
- **W5 · Global responsive & dette** (round 2) — `Header.astro` (overflow-X mega-menu), `contact.astro` (fold), `manifesto.astro` (hardcode inline→tokens), CTA inline methode/manifesto→`CtaFinal`.

GF-1 par page à chaque vague (screenshot above-fold + getComputedStyle + 0 erreur console). Commits par vague sur `feat/design-overhaul`. **0 push/cutover sans Simon.**
