# 00 — MASTER PLAN Waimia (source de vérité unique)

> **Plan canonique unique.** Remplace et archive les anciens fragments (`12-`, `14-`, `16-`, `20-DESIGN-SYSTEM-CATALOGUE-PLAN`, `20-SESSION-NEXT`, `23-INDUSTRIALISATION-VISION`, `24-HANDOFF`, `35-MASTER-PLAN-SITE-READY`, `SESSION-HANDOFF-*`) déplacés dans `docs/archive/`.
> Lu EN PREMIER par l'orchestrateur Claude Code ET par un agent IA. Tous les statuts sont vérifiables (git + task list + gates).
> Pointeurs : Vision business = mémoire projet `vision-produit-roadmap-saas`. Audit technique = `docs/DS-HEALTH-AUDIT.md`. Contrat agent = `docs/AGENT-DS.md`. Runbook migration = `docs/22-TEMPLATE-REGISTRY-MIGRATION.md`. Référence Tina = `docs/36-TINA-ASTRO-VISUAL-EDITING-REFERENCE.md`.

## 0. Comment consommer ce plan (orchestrateur + agent)

- **Source de vérité du PROGRÈS** = (a) les commits git (preuve empirique), (b) la **task list Claude Code** (`#N`, vérité opérationnelle live), (c) les **gates** (`scripts/check-*.mjs`). Le plan donne les AXES et une découpe précise ; il ne remplace pas la task list.
- **Statuts** : `[x]` fait (commit cité) · `[~]` en cours · `[ ]` pending · `[?]` arbitrage Simon requis.
- **Non figé** : pour chaque gros morceau (wave), on **re-raisonne les sous-tâches exactes au moment de l'exécution** (le code évolue, les commits futurs informent). Ce plan donne tous les axes + une idée précise, pas un script gelé.
- **Règle d'or** : rien n'est `[x]` sans **preuve GF-1 empirique** (visuel : Playwright screenshot + getComputedStyle ; backend : appel réel + write->read). Gates : `check-token-purity`, `check-token-lock`, `check-touchpoints`, `check-no-emdash`, `check-static-quality`.
- **Format consommable par un agent** : chaque wave a un `id`, un `statut`, des `sous-tâches`, des `dépend_de`, un `livrable`, une `preuve`. Un agent (ou Claude Code) lit ce fichier + la task list + `git log` pour savoir quoi faire ensuite.

## 1. Vision (north star)

Site final waimia.com + système d'industrialisation = **propriété actuelle** (focus). Deux surfaces d'édition complémentaires : **DESIGN** (tokens + sections) via DS Studio + persistance git maison (couche C) ; **CONTENU** (textes/images/champs/composition) via TinaCMS (phase tardive). Pré-requis commun = **adoption registry**. Ensuite : socle prêt pour prospection (content marketing automatisé), fork réutilisable par client, puis gamme produit SaaS (light vitrine / moyen e-commerce / haut intégrations). Détail : mémoire projet `vision-produit-roadmap-saas`.

## 2. État vérifié (2026-06-10)

- Prod `waimia.com` = `origin/main` (`d2b52f0`, 10 juin) — **industrialisation DS mergée** (22 commits fast-forward depuis `feat/hero-right-align`, GF-1 PASS home + offre + solutions sur build parité-prod, deploy prod `dpl_332bCFhsSxcNik8LYepbVqFQzaxk`).
- Catalogue : **87 types** composables (89 littéraux schéma), 4 touchpoints chacun, gates verts. Site : 112 pages, 206 contenus.
- DS Studio (`/agence/ds-studio`) : éditeur tokens live (162 contrôles) + galerie + carte d'impact + doublons. **Surface agent** livrée (`window.dsStudio`, `data-action`, `data-save-state`, deep-link, `?clean=1`, doc `AGENT-DS.md`) — commit `d2b52f0`, GF-1 PASS.
- Persistance : couche A (CLI `ds:apply`) `[x]` · couche C (bouton Enregistrer dev-only, commit+push+overlay) `[x]` commit `199f367`, GF-1 backend PASS.
- **Registry adoption : pilote OffresDetail validé** (8/8 offres composables via `sections:[]` + GF-1 6/6, branche `feat/registry-pilote-offres` 2026-06-10). Reste les 17 autres templates à brancher sur `<SectionsRenderer>`. = blocker #1, Phase 1 (Wave 1.1 `[x]`, Waves 1.2-1.4 à faire).
- Maturité (audit) : ~60 % humain / ~20 % agent. Goulot = adoption registry, pas l'hygiène CSS.

## 3. Les axes

| Axe | Description | Phase(s) |
|---|---|---|
| A | Site final waimia.com (produit livrable, prod) | 0, transverse |
| B | Industrialisation DS (tokens + catalogue 87 + DS Studio) | 0 (fait à ~90 %) |
| C | Persistance (couches A `[x]` / C `[x]` / C' SaaS) | 0, 6 |
| D | **Registry adoption** (composition data-driven) ← blocker | 1 |
| E | DS Studio v2 (UX humain + surface agent) | 2 |
| F | Tina (contenu + édition visuelle) | 3 |
| G | Hygiène / consolidation (fiabilité builder) | 4 |
| H | Socle prospection (content marketing auto) | 5 |
| I | Gamme produit SaaS (light / moyen / haut) | 6 |

## 4. PHASES & WAVES (plan exécutable)

### Phase 0 — Socle technique d'industrialisation (~90 %, EN COURS)
- **Wave 0.1 — Fondation DS** `[x]` : tokens.css + lock + gates + catalogue 87 types + codegen drift-guard. Tasks #7 #10 #11. Preuve : gates verts.
- **Wave 0.2 — DS Studio + persistance** `[x]` : éditeur live + galerie + couche A + couche C (`199f367`) + surface agent v2 (`d2b52f0`) + manifest 87 (`ds-section-manifest.json`) + `AGENT-DS.md`. Tasks #12 #15.
- **Wave 0.3 — Merge prod** `[x]` : 22 commits mergés fast-forward sur `main` (`d2b52f0`), push origin OK. Task #13. Preuve : (a) build exit 0 + serve-dist parité-prod, (b) GF-1 PASS home + offre growth-system-ia (HeroOfferDetail 506 l) + solutions acquisition-ia (H1+CTA opacity 1, transform neutre, accent `#c94f2e`, 0 erreur console, screenshot above-fold), (c) `git merge --ff-only` + push, (d) deploy prod `dpl_332bCFhsSxcNik8LYepbVqFQzaxk` (vérif waimia.com après READY).

### Phase 1 — Registry adoption (LE blocker, débloque composition + Tina)
Objectif : les 18 templates rendent leur body via `<SectionsRenderer sections={frontmatter.sections}>` (data-driven), rétro-compatible. Approche **frontmatter `sections:[]`** (décidé Simon). Runbook + classement difficulté : `docs/22` + audit §4b.
- **Wave 1.1 — Pilote OffresDetail** `[x]` (2026-06-10, branche `feat/registry-pilote-offres`, NON mergé) : pilote pivoté de TrustLegal (corps prose legal via slot = pas une séquence de sections, mauvais candidat) vers la **collection OffresDetail** (toggle `useComposable` + schéma déjà câblés). **8/8 offres composables** via `sections:[]` (6 sections : hero-offer-detail, problem-statement+dropcap, method-timeline, deliverables-grid, stat-block split-quote, cta-final). Catalogue enrichi de 2 variantes data-driven (`problem-statement.dropcap` réutilise `DropCap` ; `stat-block` layout `split-quote` réutilise `PullQuote`) = décision hybride Simon. Corps MDX vides -> 0 perte de contenu, parité structurelle 6=6. GF-1 6/6 PASS (build dist + serve parité + Playwright : h1 opacity 1 + transform neutre, hero CTA visible, 13/13 data-reveal, 0 stuck, dropcap § + proof split-quote rendus). Commits `1a21fe0` (enrichissement) + `a4154a0` (6 offres). Apprentissage capitalisé : `docs/DS-COHERENCE-STANDARD.md` (réutilisation tokens/classes/composants, 0 bespoke dupliqué) + transcription fidèle constantes hardcodées du template legacy. Task #17.
- **Wave 1.2 — Templates moyens** `[ ]` : DetailMenu, EcoleHub, Hub, ServiceDetail, TunnelStep, LeadMagnet (body inline modéré). 1 worker/template, GF-1 parité chacun.
- **Wave 1.3 — Templates durs + nouveaux types** `[ ]` : CaseStudy, Essay (type `EssayBody` à créer), CourseDetail, ConversionFunnel, AuthorPage, Technologies (3-4 nouveaux types positionnement/capabilities/models), Solutions (3 types friction/workflows/ROI + arbitrage hero), OffresDetail (déjà partiel). Chaque nouveau type = 4 touchpoints.
- **Wave 1.4 — Orphelins pages/hubs** `[ ]` : ~51 pages inline (ressources/index, manifesto, console, technologies/index, secteurs/index, solutions/index, landing site-web-ia). Décomposer en sections registry. + organisms candidats catalogue : AtlasGrid, PersonaSwitcher, BookSession.

### Phase 2 — DS Studio v2 complet (humain + agent parfait)
- **Wave 2.1 — Surface agent** `[x]` : `window.dsStudio`, sélecteurs, deep-link, clean, survie overlay, `AGENT-DS.md`. Task #15, commit `d2b52f0`.
- **Wave 2.2 — UX humain** `[ ]` : diff avant save, undo/redo + dirty, checker contraste WCAG live, édition par échelle (ratio), switcher viewport responsive, **preview pleine page** (template réel en iframe), presets/thèmes nommés (base multi-tenant), harmonies. Task #16.
- **Wave 2.3 — Mode Compose** `[?]` : piocher/réordonner sections -> écrit frontmatter `sections:[]`. **Réévaluer vs Tina** (Tina édite déjà des blocks -> probablement délégué à Tina). Task #18. Bloqué par Phase 1.

### Phase 3 — Tina (contenu + édition visuelle) — phase tardive
- **Wave 3.1 — Branchement** `[ ]` : réutiliser patterns Amploi (`@tinacms/astro` + visual editing + auth TinaCloud + Tina Cloud images). Après Phase 1 (sinon Tina ne pilote rien de réel) + champs définis. Task #20. Réf `docs/36`.
- **Wave 3.2 — UX des champs** `[ ]` : personnaliser schema/affichage des champs Tina (corriger les problèmes UX vus dans Amploi), à définir ensemble. Config une fois par template.

### Phase 4 — Hygiène / consolidation (fiabilité builder, arbitrage DS)
- **Wave 4.1 — Hardcoded lot A** `[x]` : 21 tokenisables directs (#EFEBE2 x9 + accent-offre corrigés). Vérifié 0 restant.
- **Wave 4.2 — Hardcoded lot E** `[?]` : 120 hits 'token à créer' (trous échelle radius/durées/font, couleurs sémantiques pédago). Décision DS : créer crans vs accepter one-off. Task #19.
- **Wave 4.3 — Consolidation classes (D) + naming (F)** `[?]` : 1480 classes scoped, fusion doublons reveal, promotion `.wrap`/`.btn`/`.sumie`, naming grep-able (interdire `.k`/`.t`/`.wm`). Task #19.

### Phase 5 — Socle prospection (content marketing automatisé)
- **Wave 5.1** `[ ]` : routines Claude Code + API LinkedIn / Canva / X / Facebook / Instagram / Reddit + newsletter + scripts vidéos + slides, unifiés. Active prospection + inbound. Démarre dès que le site final est en prod (Phase 0+1 suffisants).

### Phase 6 — Gamme produit SaaS (commercialisable)
- **Wave 6.1 — Light (vitrine)** `[ ]` : fork parfait réutilisable + couche C' hébergée (token serveur, multi-tenant) + presets. Vendable par vidéo. Objectif 100/100/100/100.
- **Wave 6.2 — Moyen (e-commerce)** `[ ]` : Stripe + nouvelles sections catalogue e-commerce. Vendable par vidéo.
- **Wave 6.3 — Haut de gamme (intégrations)** `[ ]` : HubSpot, Google IndexNow + Search Console (agent SEO/GEO continu), API Meta + Google Analytics (automation IA), emailing tiers ; routes SSR sur pages dédiées + agent IA (Claude Code / Codex). Vendu en service sur mesure (clés API + formation).

## 5. Backlog détaillé (référence)

- **Arbitrages Simon en attente** (task #14) : Solutions (HeroSector infidèle, hero non migré) · 3 types vt=0 (TrustLegal/Welcome/ListIndex : cataloguer ou bespoke) · sort de `design-system` vs `ds-studio` (redirect/index mince) · delta ~32px Offres/Tech (accepter standardisation ou veto).
- **Classement migration 18 templates** (audit §4b) : facile (TrustLegal, ListIndex, Utility, Welcome) -> moyen (DetailMenu, EcoleHub, Hub, ServiceDetail, TunnelStep, LeadMagnet) -> dur (CaseStudy, Essay, CourseDetail) -> très dur (ConversionFunnel, AuthorPage, Technologies, Solutions, OffresDetail).
- **Détail hardcoded / consolidation** : `docs/DS-HEALTH-AUDIT.md` §3 (tables fichier:ligne -> token) + §5.

## 6. Index des docs canoniques (gardés)

- `docs/00-MASTER-PLAN.md` (CE fichier) — plan unique.
- `docs/DS-HEALTH-AUDIT.md` — audit santé (hardcoded, migration, consolidation, format manifest).
- `docs/AGENT-DS.md` — contrat agent (leviers tokens/sections/vérif + exemple Playwright).
- `docs/DS-SECTION-CATALOG.md` + `src/data/ds-section-manifest.json` — manifest par-section (87).
- `docs/22-TEMPLATE-REGISTRY-MIGRATION.md` — runbook migration registry.
- `docs/36-TINA-ASTRO-VISUAL-EDITING-REFERENCE.md` — référence Tina (Phase 3).
- `docs/24-BRAND-CONTRACT.md`, `docs/23-DS-TOKEN-COHERENCE-AUDIT.md`, `docs/24-A2-CATALOG-TAXONOMY.md` — références DS.
- Mémoire projet `vision-produit-roadmap-saas` — vision business.
- Archivés (superseded) : `docs/archive/` (anciens master-plans, trackers, handoffs).
