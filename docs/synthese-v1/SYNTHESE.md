# 🧭 SYNTHÈSE V1 : source de vérité de navigation Waimia

> **Rôle de ce fichier.** Synthèse unique de TOUS les documents de `docs/` : une carte de
> lecture qui dit quel canonique lire selon la mission, plus une fiche condensée par document
> (rôle, statut, où pointe la vérité). Pensé pour qu'un agent IA (ou un humain) comprenne le
> projet Waimia (site, SPA, systèmes business, app forkable, dashboard) sans ouvrir 100 fichiers.
> **Lire en 2e position, juste après `docs/README.md`.**
>
> **Date : 2026-07-12.** Positionnement V8 acté, home live validée telle quelle, itération E en cours.
>
> **Règle de maintenance (rule 59, source de vérité unique).** Toute évolution de `docs/` se
> reporte ici. **Les fiches ci-dessous POINTENT vers les canoniques, elles ne les remplacent
> pas** : la vérité de fond vit dans le doc canonique nommé, cette synthèse n'est qu'un index
> raisonné. En cas de divergence, le canonique fait foi ; corriger alors CE fichier, pas créer
> un doc parallèle. Ne jamais recopier ici un chiffre/compteur : renvoyer au canonique
> (`docs/README.md` §compteurs).

---

## Carte de lecture express (les canoniques à lire selon la mission)

| Ta mission | Lis d'abord (ACTIF-CANONIQUE) |
|---|---|
| **Positionnement / récit de marque** | `strategy/10-architecture-finale-v7.md` **§0bis** (V8, 2026-07-12) + `README.md` §positionnement |
| **Architecture / URLs / indexation** | `strategy/10-architecture-finale-v7.md` (V7, index-on-quality) + `strategy/11 strat complète.md` (nav, méga-menus, templates, V7-FOLD) |
| **Tâches / avancement** | `state/00-BOARD.md` (généré, **gelé sous V7**) + `state/02-plan-execution-claude-code.md` (ids, gelé) ; quoi-faire courant = plan V7 + `state/05-cloture-session-2026-07-12.md` |
| **Design System (vision / stratégie)** | `design-system/01-contrat.md` + `design-system/03-library-strategy.md` |
| **DS : audit + backlog industrialisation** | `design-system/07-health-audit.md` |
| **DS : palette / repaintabilité** | `design-system/brand-contract.md` |
| **Migration templates → registry** | `audits/01-template-registry-migration.md` |
| **Colocalisation sections (#38)** | `audits/02-section-colocation-38.md` |
| **Cohérence tokens** | `audits/06-token-coherence.md` (ex-`audits/02-token-coherence`) |
| **Frontières packages (monorepo #40)** | `audits/04-packages-monorepo-40.md` |
| **Builder (vision + archi, exécution différée)** | `specs/05-builder-vision-reference.md` + `specs/06-builder-architecture.md` |
| **Vision dashboard / app forkable** | `strategy/13-vision-dashboard-systeme-forkable.md` |
| **CMS / format de page (FIGÉ)** | `strategy/12-cms-content-format-decision.md` (Tina abandonné, Keystatic + builder + PageDocument JSON) |
| **Marché / concurrence / données réelles** | `business/14-marche-donnees-reelles.md` + `business/12-competitive-brief.md` + `strategy/07-benchmark-digidop.md` |
| **Méthode SEO/GEO/AIO (intemporelle)** | `strategy/04-geo-aio-methode.md` + `strategy/03-recherche-seo-geo.md` |
| **Système case study + hubs secteurs** | `strategy/03-case-study-sector-system.md` |

---

## Chaîne de positionnement (anti-confusion)

Trois formulations successives coexistent dans le corpus. Toujours lire à travers la plus récente.

1. **« Cabinet d'orchestration IA / conseil transformation IA anthropic-first »** : docs de juin
   (`strategy/00`, `06`, `business/00`, tout `marketing/`). **PÉRIMÉ** comme récit de marque.
2. **« Studio IA » (build-forward, PAS cabinet)** : RECONCILIATION 2026-06-15, 7 décisions tranchées
   (`state/RECONCILIATION-REPORT.md`). Étape intermédiaire.
3. **« Ingénierie de systèmes business » (V8, 2026-07-12, CANONIQUE)** : `strategy/10 §0bis`.
   Studio (pas cabinet/ESN/agence marketing) qui conçoit, construit et opère les systèmes qui font
   tourner une PME. 3 étages (marque / familles par fonction / portes SEO 1 page = 1 requête).
   « Système X », « site web intelligent », « intégrateur Claude » = copy de marque, **jamais**
   des titles/H1 SEO. Différenciation = « on adapte la solution au besoin » (Claude/GPT/Mistral,
   sur-mesure OU no-code) ≠ anthropic-first ; Claude = simple lanceur SEO/GEO.

**Conséquence de lecture** : les docs `marketing/` et `business/` gardent un wording antérieur
(« cabinet », « anthropic-first », H1 « site web intelligent »). Leur **substance** (funnel, canaux,
éditorial, offer ladder, pricing, personas, concurrence) reste valable ; leur **framing de marque**
est à lire à travers V8. Ne pas les jeter, les ré-aligner.

---

## Fiches par dossier

Convention : **Statut** = ACTIF-CANONIQUE (source de vérité) · ACTIF · HISTORIQUE (daté, référence) ·
PÉRIMÉ/SUPERSEDED · ARCHIVÉ (déplacé dans `docs/archive/`).

### `docs/strategy/` (SEO / site / positionnement)

- **`00-synthese-lancement.md`** : point d'entrée « lancement V1 » de juin (menu, positionnement « cabinet », pricing, SEO). Positionnement + archi 3-piliers superseded ; le pricing 2/4/7/10k survit. **ARCHIVÉ → `docs/archive/`**.
- **`01-silo-site-web-ia.md`** : plan « Cheval de Troie SEO », silo unique « Site web IA », méthode keyword gratuite. Archi silo unique superseded par `10` ; le « pourquoi » stratégique + méthode keyword restent utiles. **ARCHIVÉ → `docs/archive/`**.
- **`02-site-etat-final.md`** : spec whitelist E-E-A-T + suppressions fictif/thin. ACTIF (partiel) : canonique pour véridicité/suppressions ; archi/URLs superseded par `10`. **GARDER**.
- **`03-case-study-sector-system.md`** : blueprint système Case Study + hubs sectoriels (3 couches de preuve, double-label first/second-party, données marché sourcées). **ACTIF-CANONIQUE**. ⚠️ taxonomie 6 secteurs (e-commerce/batiment/startup-logiciel/services-b2b/liberal-independant/therapeutes) DIVERGE de `strategy/11` v8 (conflit ouvert, cf §Conflits).
- **`03-recherche-seo-geo.md`** : recherche SEO/GEO sans outil payant (keyword + concurrents + GEO d'entité). **ACTIF** (méthode + données GEO valides) ; positionnement « cabinet » superseded.
- **`04-geo-aio-methode.md`** : méthode technique GEO/AIO (6 piliers : SSR minimal, Hn stricts, JSON-LD, llms.txt, FAQ-AEO, autorité). **ACTIF-CANONIQUE** (intemporel).
- **`05-stack-decision.md`** : verdict stack Astro 6 vs TanStack (2026-05-17). On garde Astro 6 (FIGÉ). **ACTIF-CANONIQUE**.
- **`06-doctrine-positionnement-architecture-seo.md`** : doctrine positionnement + archi (2026-06-13). Archi 3-piliers superseded ; positionnement doublement superseded (studio, puis systèmes business). Rationale anti-dilution survit dans `10 §1`. **ARCHIVÉ → `docs/archive/`**.
- **`07-benchmark-digidop.md`** : benchmark concurrent Digidop + marque sœur Vydera (axe terrain/web-agency). On copie l'exigence, on refuse l'ampleur (blog-usine). **ACTIF-CANONIQUE**.
- **`08-ia-templates-pages-v1.md`** : architecture d'information V1 (composition de sections par page). Blueprints de composition réutilisables, mais bâti sur l'archi 3-piliers = superseded. **ARCHIVÉ → `docs/archive/`**.
- **`09-blueprint-contenu-v1.md`** : état réel du contenu page par page (2026-06-15) + décisions Simon verrouillées + valeurs entité/GEO (email `@waimia.fr`, France Num réel, sameAs, cal.com/simonberos/audit, +2 cas Desangles/Isabelle Diaz). **ACTIF** (inputs Simon + valeurs entité canoniques).
- **`10-architecture-finale-v7.md`** : **SOURCE DE VÉRITÉ archi cible V7** (2 offres, nav 4 méga-menus, index-on-quality) + **§0bis positionnement V8** (systèmes business, retitrages site-web-ia / integration-claude, pricing 3 niveaux). Supersede l'archi 3-piliers. **ACTIF-CANONIQUE** (doc pivot).
- **`11 strat complète.md`** : spec exhaustive nav/méga-menus/6 services/templates/maillage/indexation (V7-FOLD). 2 offres, nav Solutions/Cas clients/Ressources/Agence, §14 « services satellites » superseded. **ACTIF-CANONIQUE** (à lire avec l'affinage V8 de `10 §0bis`).
- **`12-cms-content-format-decision.md`** : décision CMS FIGÉE (2026-06-28). Tina hors scope ; PageDocument JSON git-based + Keystatic (coque) + builder maison (sections) + MCP (surface IA). **ACTIF-CANONIQUE**.
- **`13-vision-dashboard-systeme-forkable.md`** : **vision produit** (directive Simon 2026-07-12) : app/système forkable clonable par client (site + builder + DS Studio + CMS + apps IA) ; méga dashboard admin (app dédiée, déploiement sous-URL puis sous-domaine) ; extensions + préconfigurations = packaging commercial (gammes light/moyen/haut) ; modularité multi-outils (le client choisit CRM/ERP/automation/IA, 0 captivité). **VISION CONSIGNÉE, chantier NON ouvert** (attendre fin du brief builder). **ACTIF-CANONIQUE** du sujet.

### `docs/state/` (avancement, chantiers, journaux)

- **`00-BOARD.md`** : board de progression GÉNÉRÉ par `scripts/sync-board.mjs` (ne pas éditer). 40/85 done, **adossé au backlog `state/02` GELÉ sous V7** → le % n'est PAS l'avancement V7/V8 réel. **ACTIF** (généré).
- **`01-chantiers.md`** : audit d'état projet (2026-06-11), largement résolu en night-session + pivots V7/V8. **ARCHIVÉ → `docs/archive/`**.
- **`02-plan-execution-claude-code.md`** : backlog maître P0→P4 (71 tâches), lu au boot. **GELÉ / superseded par V7-FOLD** ; reste la source des ids partagés du board + méthode par tâche. **GARDER** (gelé).
- **`03-critique-ameliorations.md`** : revue adversariale cash-first (délai jusqu'au 1er euro = verrou ; forkabilité = seule douve). **ACTIF** (conseil stratégique intemporel).
- **`03-revue-compositions-preview.md`** : revue variantes d'habillage awwwards (A/C★/B) à trancher (branche `feat/swi-habillage-variants`). **HISTORIQUE** ; application prod = tâche ouverte (#18).
- **`04-brand-review.md`** : audit voix de marque du corpus commercial (claims chiffrés à étayer, redondance DRY, risques légaux). **ACTIF** (applicable au copy prospect).
- **`04-build-strat11-gap.md`** : gap réel↔cible vs strat 11 + work queue S11-A→E (2026-06-29, clôture partielle). **HISTORIQUE / partiel** ; secteurs strat 11 ≠ `strategy/03`.
- **`05-cloture-session-2026-06-29.md`** : journal de session (home variante A, 5 landings, 6 secteurs, suppression `/offres`). **HISTORIQUE** (superseded pour reprise).
- **`05-cloture-session-2026-06-30.md`** : journal (SWI définition fix, honeypot 5 endpoints, doc builder §13). **HISTORIQUE** (superseded pour reprise).
- **`05-cloture-session-2026-07-12.md`** : clôture la plus récente. `/tarifs` DA, SWI hero KPIs retiré, skills waimia-web-patterns + design-lab, maquette `/lab/home-d` REJETÉE. **VERDICT Simon gate B : home LIVE validée telle quelle** ; itération E à venir (raccourcir/hiérarchiser/dédoublonner). **ACTIF** (état de reprise courant).
- **`05-design-refonte.md`** : chantier DESIGN / refonte DS (méga-chantier #14, phases A→E). Corrige « design figé » : refactor multi-passes, passe finale Claude Design. **ACTIF** (détail P2).
- **`06-mapping-migration-3-piliers.md`** : mapping fichier-par-fichier 9 offres + 20 solutions → 3 piliers (2026-06-13). SUPERSEDED (archi 3-piliers). **ARCHIVÉ → `docs/archive/`**.
- **`07-template-page-service.md`** : séquence canonique template service 13 sections (page réf `/offres/template-service-ref`). Séquence reste une DA de référence ; contexte 3-piliers superseded ; version V7 = 16 slots (`state/12`). **ACTIF** (partiel).
- **`08-plan-refonte-site-web-intelligent-v6.md`** : plan refonte `/services/site-web-intelligent` (DA de référence Paper↔Ink + décisions D1-D7). Archi/redirects superseded ; séquence + régime DS + décisions restent utiles. **GARDER**.
- **`09-plan-harmonisation-ds-page-site-web-intelligent.md`** : plan harmonisation DS + recomposition page (phases A→E). Taxonomie 4 niveaux (Catégorie/Famille/Variante/Déclinaison). **ACTIF** (Phase A faite, B avancée).
- **`10-audit-catalogue-interaction-v7.md`** : audit read-only catalogue + langage d'interaction (156 sections, 15 familles ; 4 effets : Progressive Reveal ✅, Sticky Editorial 🟡, Container Expansion / Scroll Morph ❌ à créer). **ACTIF-CANONIQUE** (carte réutiliser/créer).
- **`11-asset-illustrations-manifest.md`** : manifeste des assets (Registre A line-art DS vs Registre B rétro importé ; garder A, générer le manquant en line-art). **ACTIF-CANONIQUE**.
- **`12-design-direction-service-template.md`** : direction design template service §16 (scroll = récit 6 chapitres ; primitives CSS + bridges chorégraphiques ; blueprint flagship `/services/integrateur-claude`). Garde-fou : 3 workers parallèles MAX (RAM). **ACTIF**.
- **`PROCHAIN-CHANTIER.md`** : instruction chantier consolidation doc, auto-déclaré PÉRIMÉ (fait). **ARCHIVÉ → `docs/archive/`**.
- **`RECONCILIATION-REPORT.md`** : réconciliation intention↔git (2026-06-13) + **ADDENDUM 2026-06-15 = 7 décisions canoniques** (studio IA, offre cœur, pricing 2/4/7/10k, cas fictifs supprimés, cartographie 2 axes, compteurs figés). **ACTIF-CANONIQUE** (registre des décisions ; décision « studio IA » affinée depuis par V8).
- **`RESUME-CLAUDE-CODE.md`** : instruction one-shot de merge des docs Cowork (exécutée). SUPERSEDED. **ARCHIVÉ → `docs/archive/`**.
- **`night-sessions/2026-06-12.md`** : rapport de nuit autonome (assainissement E-E-A-T, ~1900 lignes de fabrication retirées, source des faux chiffres = `src/data/proof-points.ts`). **HISTORIQUE** (journal à conserver).

### `docs/architecture/` (standards, intégrations, référence technique)

- **`01-standards-patterns.md`** : charte coding standards Astro/React/CSS/TS/SEO (moins de JS d'abord, slots canoniques, tokens only, budgets perf, a11y AA). **ACTIF**.
- **`02-content-models.md`** : frontmatters/schemas Zod par modèle. Collections `offres`/`solutions`/`technologies` + pyramide tier 1-4 = ancien modèle (V7 = services/lp/secteurs/cases). **HISTORIQUE** (référence conventions ; routes/tiers superseded).
- **`03-integrations.md`** : intégrations Resend/Cal/OpenAI/Anthropic + config static. ⚠️ valeurs périmées : EMAIL_FROM réel = `waimia@virtuoseweb.fr`, Cal canonique = `simonberos/audit` (cf memory). **HISTORIQUE** (principe valide, valeurs à corriger).
- **`04-deployment-checklist.md`** : checklist ops externe (Vercel env, Resend DNS, Cal, smoke tests). **HISTORIQUE** (en partie consommée ; slug Cal `45min` périmé).
- **`05-url-redirects.md`** : pattern 301/308 sur renames (redirects dans `astro.config.mjs`). **ACTIF** (intemporel).
- **`06-tina-astro.md`** : référence technique TinaCMS × Astro sans React (bridge vanilla-JS). Rigoureux mais **Tina abandonné** (`strategy/12`). **ARCHIVÉ → `docs/archive/`**.
- **`07-images-pipeline.md`** : pipeline images génératives (`gpt-image-2`) + media repo-based WebP. Pipeline valide ; inventaire lot 1 réfère des cas fictifs supprimés + config Tina périmée. **HISTORIQUE** (pipeline actif).
- **`08-architecture.md`** : vue stack + arbo cible v1. Chemin `waimia-site/site/`, CMS Tina, routes offres/solutions/technologies = périmés ; stack de fond (Astro/React/Tailwind/Vercel) vraie. **HISTORIQUE** (référence stack).
- **`09-cms-autonome.md`** : plan « CMS éditorial autonome v2 » (pages auteur, taxonomies, routines Claude, Schema.org), 2026-05-10. Collection authors existe ; arbo `/equipe`/ressources + Tina largement pré-V7. **ARCHIVÉ → `docs/archive/`**.

### `docs/design-system/` (contrat DS, catalogue, industrialisation)

- **`01-contrat.md`** : contrat opérationnel figé du DS (8 axes, tokens only, RGAA/WCAG AA, budgets perf, typo figée). Compteurs internes datés mais principes en vigueur. **ACTIF-CANONIQUE**.
- **`02-catalogue.md`** : catalogue machine-readable généré (`gen-section-manifest.mjs`, ne pas éditer). En-tête « 151 » périmé (canonique = README docs). **ACTIF** (régénérer).
- **`03-library-strategy.md`** : stratégie maître d'industrialisation catalogue (taxonomie 4 niveaux, volume par presets, Tailwind `@theme inline`, atelier `/library/*`, 16 catégories). **ACTIF-CANONIQUE** (vision industrialisation, rule 59).
- **`04-agent-ds.md`** : manifeste capacités agent DS Studio (API `window.dsStudio`, gates, sélecteurs stables). Compteur manifest « 87 » périmé ; URL `/agence/ds-studio` → `/library/studio`. **ACTIF**.
- **`05-design-os-da.md`** : « Design Operating System V2 » = master prompt DA (Editorial Tech × Swiss × Premium Minimalism). Toujours depuis l'identité existante. **ACTIF**.
- **`06-motion.md`** : système motion (1 effet d'entrée/section, reduced-motion, familles reveals). NB : IO à ré-init sur `astro:page-load` (View Transitions). **ACTIF**.
- **`07-health-audit.md`** : audit de santé DS + backlog priorisé A-G + tables fichier:ligne→token. Blocage n°1 = adoption registry (0/13 templates via `SectionsRenderer`). **ACTIF-CANONIQUE** (rule 59).
- **`08-harvest-virtuoseos-catalogue.md`** : manifest de récolte des composants distinctifs de virtuoseOS → catalogue waimia (adaptés tokens). **ACTIF** (backlog vivant).
- **`brand-contract.md`** : contrat de repaintabilité (14 slots couleur overridables vs structurel figé ; preuve empirique swap = repeint tout). **ACTIF-CANONIQUE** (source palette).

### `docs/directives/` (directives design en vigueur)

- **`01-typo-contraste.md`** : Instrument Serif = emphase uniquement, la masse en Instrument Sans ; vague V-TYPO ; `<em class="u-serif-accent">`. **ACTIF**.
- **`02-dark-variantes.md`** : dark systématique (champ `background` incluant `ink`, idiome `[data-bg='ink']`), alignement discipliné, patterns B2B-SaaS standards. **ACTIF**.
- **`03-awwwards.md`** : directive qualité awwwards + méthode de composition par section (4 axes : philosophie/chronologie/rythme/hiérarchie ; cible Linear/Stripe/Anthropic/Apple). **ACTIF**.

### `docs/specs/` (specs de chantiers dédiés)

- **`01-ecosystem-partners.md`** : spec logos unifiés (CSS `mask-image` + `currentColor`, theme-aware) + méga-menu + hub technologies. Technique réutilisable ; hub technologies pré-V7. **HISTORIQUE** (technique valide).
- **`02-adr-architecture-site.md`** : ADR-002, archi « 1 silo + 3 piliers vitrine » (2026-06-12). SUPERSEDED par `strategy/10`. **ARCHIVÉ → `docs/archive/`** (conservé pour E-E-A-T du raisonnement ADR).
- **`03-adr-ouverture-silo-acquerir.md`** : ADR-003, ouverture silo Acquérir en pages de service. Auto-déclaré SUPERSEDED 2026-06-18. **ARCHIVÉ → `docs/archive/`**.
- **`04-tunnel-conversion-phase-c-copy-minee.md`** : copy minée des 4 MDX ex-tunnel `site-web-ia` (réserve rédactionnelle Phase C ; chiffres = exemples fictifs, PAS des claims). **ACTIF** (matière préservée).
- **`05-builder-vision-reference.md`** : brief de vision du builder (hybride Relume + Webflow/Wix/Bricks + chat Lovable branché MCP). **Exécution volontairement différée** (priorité = finaliser le site). **ACTIF** (source de vérité vision builder).
- **`06-builder-architecture.md`** : artefact de planification builder (scope/contrat/vision/infra/tests ; persistance Git-as-DB, features = plugins standalone, création de composants custom). Exécution différée. **ACTIF**.

### `docs/audits/` (audits de référence, rule 59)

- **`01-template-registry-migration.md`** : runbook migration templates → composants catalogués (`SectionsRenderer`/registry), 9 étapes, GF-1 avant/après, pilote `ServiceDetailTemplate`→`HeroServiceDetail`. **ACTIF-CANONIQUE** (chantier P1 en cours).
- **`02-section-colocation-38.md`** : source de vérité format module co-localisé `src/sections/<type>/` (5 fichiers), gate `check:section-modules`, 3 pilotes migrés. **ACTIF-CANONIQUE** (#38).
- **`03-audit-consolide-2026-06-15.md`** : synthèse sévère de 5 audits (avant cutover V7). 3 fractures : home/nav/footer non migrés, contenu INSTANCE-dupliqué au lieu de GLOBAL, ~73 littéraux hardcodés. **HISTORIQUE** (référence état ; certains P0 traités depuis).
- **`04-packages-monorepo-40.md`** : blueprint frontières packages monorepo (#40). NB : clôturé sur 4 packages (ds-tokens/ds-kernel/catalogue-ui/builder), T6 @waimia/sections consciemment NON extrait (cf memory). **ACTIF-CANONIQUE** (largement exécuté).
- **`05-media-inventory.md`** (ex-`audit/01-MEDIA-INVENTORY-AUDIT-2026-06-20.md`, **renommé + dossier `audit/` supprimé**) : audit read-only des champs image (30 pages, 16 collections ; quasi 0 image sauf `services/integrateur-claude`). **HISTORIQUE** (inventaire de départ habillage image).
- **`06-token-coherence.md`** (ex-`audits/02-token-coherence.md`, **renommé pour résoudre la collision de numéro `02`**) : audit cohérence tokens (3 vocabulaires couleur coexistent ; #3 « shadcn » fantôme à éradiquer ; méthode « réutilisé souvent ≠ correct »). **ACTIF-CANONIQUE** (rule 59).

### `docs/business/` (business plan, vente, développement commercial)

Décrochage transverse : one-liner + H1 antérieurs à V8 (« cabinet », « site web intelligent ») ; substance LIVE, framing à re-synchroniser sur `strategy/10 §0bis`.

- **`README.md`** : index du dossier. **ACTIF** mais historiquement incomplet (ne listait que 01-08 ; complété par ce chantier avec 00 + 09-15).
- **`00-references.md`** : références canoniques business DRY (offer ladder, keywords 2 couches, ROI médian PME 159 %). **ACTIF** ; one-liner/H1/libellés d'offres à resync V8.
- **`01-business-plan.md`** : business plan (résumé exécutif, marché, modèle, finances, risques ; zone blanche Limova↔ClaudIn ; clients réels). **ACTIF** (wording pré-V8).
- **`02-etude-de-marche.md`** : étude de marché (segments/personas, tendances, pricing ; renvoie aux données réelles `14`). **ACTIF**.
- **`03-plan-prospection.md`** : plan outbound (ICP/BANT, ciblage en vagues, workflow Vibe Prospecting, RGPD, KPIs). **ACTIF** (source de vérité ciblage).
- **`04-plan-communication.md`** : plan comm 360° (T1 = 2 canaux : LinkedIn + article ; reste différé). **ACTIF** (wording pré-V8).
- **`05-sales-enablement.md`** : kit de vente (SPIN, objections, battlecards Limova/ClaudIn/agence/WordPress/freelance, scripts). **ACTIF**.
- **`06-fiches-offres.md`** : fiche par offre (audit, site IA, growth, agents) : inclus/bénéfices/prix/objections/qualif/upsell. **ACTIF** (libellé « site web intelligent » pré-V8).
- **`07-pitch-rdv.md`** : trame RDV (découverte/démo/closing) + one-pager + checklist. « On vend l'audit, pas le site ». **ACTIF**.
- **`08-quick-wins-revenue.md`** : quick wins + plan CA (90j / 6 mois / 12-24 mois) ; panier moyen pondéré ~4 000 € HT [HYP]. **ACTIF** (hypothèses à recalibrer).
- **`09-leadsourcing-scoring.md`** : spec outil lead sourcing Firecrawl + scoring maison (P3) ; industrialise enrichir→prioriser→exporter de `03`. **ACTIF** (à construire).
- **`10-presentations-offres-core.md`** : 3 decks autoportants (Audit / Site Web IA / Growth System IA), slide par slide. **ACTIF** (matériel de présentation).
- **`11-cash-first-90-jours.md`** : plan cash 90j (Piste A Cash now vs Piste B Asset ; verrou = rendre le site honnête avant prospection). **ACTIF**.
- **`12-competitive-brief.md`** : brief concurrentiel axe positionnement-prix (zone blanche Limova↔ClaudIn, battlecards). **ACTIF** (source de vérité concurrentielle prix).
- **`13-modele-financier.md`** : modèle financier (unit economics, régime fiscal réel = EI au réel BNC 2035, variable qui casse tout = temps de prod non mesuré). **ACTIF** (hypothèses à valider comptable).
- **`14-marche-donnees-reelles.md`** : données marché sourcées [RÉEL]/[ESTIMÉ]/[À VALIDER] (INSEE ~174 600 PME + ~7 442 ETI, adoption IA 31→55 %, ~85 % ont déjà un site, AI Overview inactif FR). **ACTIF-CANONIQUE** (chiffres marché).
- **`15-validation-client.md`** : kit customer discovery (The Mom Test) ; le vrai verrou = stratégie sous-instrumentée. **ACTIF** (non exécuté).

### `docs/marketing/` (positionnement, GTM, contenu, canaux, produit)

Décrochage transverse : les 6 docs datent du 2026-06-14 et ancrent « cabinet d'orchestration IA anthropic-first » (superseded V8). Squelette funnel/canaux/éditorial/produit valable ; framing de marque à ré-aligner. Bandeau d'avertissement ajouté en tête de chaque fichier par ce chantier.

- **`01-positionnement-messaging.md`** : socle de marque (positionnement, ICP/personas, value prop, 4 pillars, offer ladder + pricing, voix). Framing « anthropic-first » superseded ; offer ladder/pricing/personas encore valides. **HISTORIQUE** (ré-aligner framing).
- **`02-go-to-market.md`** : funnel & GTM (« cheval de Troie » 3 temps ; funnel AWARENESS→EXPANSION ; plan 90j). **HISTORIQUE** (mécanique intacte, framing superseded).
- **`03-content-editorial.md`** : source de vérité contenu (4 piliers, 7 règles de ton, calendrier 90j, pipeline automation skills, KPIs/GSC). Le plus opérationnel. **ACTIF**.
- **`04-acquisition-canaux.md`** : playbook des 7 canaux (réseau→outbound→LinkedIn en priorité cash T1 ; matrice impact×effort ; outils MCP nommés). **ACTIF** (quasi indépendant du framing).
- **`05-boilerplate-produit.md`** : vision produit (waimia-web = 1ʳᵉ implémentation d'un boilerplate forkable ; modules activables ; agents = Claude Code/Cowork sur le repo forké). Cohérent avec `strategy/13`. **ACTIF**.
- **`README.md`** : index du dossier marketing (table des docs + ordre de lecture + dépendances). **ACTIF**.

### `docs/session-reports/` (56 rapports d'orchestration nocturne, 2026-06-10/11)

**Trace historique à conserver telle quelle, jamais à éditer.** Valeur = le « pourquoi » de chaque
arbitrage (méthode d'orchestration de référence). ⚠️ Ces rapports pointent massivement vers
`docs/00-MASTER-PLAN.md` comme « master plan canonique » : ce fichier est **archivé**
(`docs/archive/00-MASTER-PLAN.md`), pointeurs à ignorer (source réelle = `docs/README.md` → `strategy/10`).

- **Fondations & régressions prod (SR-01→SR-14)** : registry adoption (pilote offres → Ecole hub 106 types), régressions critiques résolues (SR-03 responsive `@media(var())`, SR-05 forms `/api/*` cassés depuis f3ac27d, SR-06 MailerLite dormant), DS Studio v2 (SR-11), pilote Tina No-React (SR-14).
- **Refonte systémique R0-R7 (SR-15→SR-29)** : plan directeur `archive/37`, purge collections/templates morts, méga-menus 5→4, familles Hero 17→9 / grilles 16→6, couche data pain-points+proof-points, extinction templates (65 stubs purgés), assainissement facts, pipeline images.
- **Vague visuelle Awwwards & finition (SR-30→SR-55)** : hiérarchie méga-menu, recomposition home, emphase serif, motion, densité cas, purge U+2014 + gate no-emdash (SR-49), i18n hubs, offres en ink ; score critique monté à 4,5/5 (it.12) ; **SR-55 = handoff autoporteur fin de session « orchestrateur B »**.
- **`README.md`** : convention de nommage SR + index (source de vérité des décisions d'arbitrage).

### `docs/visual-audit/` (mémoire visuelle GF-1, 55 éléments, ~98 Mo)

Poste disque le plus lourd du repo docs. **Reco purge DIFFÉRÉE** : le README du dossier interdit la
suppression en masse avant l'assainissement SEO (`strategy/02`) car c'est la trace de l'état d'origine.

- **Racine** : `README.md` (protocole `_current/`), `AUDIT-SECTIONS-SERVICE.md` (audit fondateur template service), `OVERHAUL-2026-06-15-PLAN.md`, `coverage-report.md` + `.json`.
- **Canoniques à GARDER** : `_current/` (état courant), `_merge-gf1/`, `_prod-gf1/` (preuves GF-1), `references/` (maquettes DA ref-offre-deploiement / ref-finance-compta).
- **~48 dossiers de campagne datés à ARCHIVER/PURGER après assainissement** (traces GF-1 régénérables) : les 5 plus lourds = `offres-polish` (10M), `images-wiring` (9.8M), `qa-audit` (8M/117 fichiers), `tpl-recomp` (6.4M), `service-sections-audit` (5.9M/126 fichiers) ; plus `references` typo/dark-*/gen-*/sol-*/home/align-audit/ds-studio/etc. Gain estimé ~85-90 Mo.

### `docs/archive/` (54 éléments, déjà archivé, non canonique)

Anciens master-plans, cartographies DS, audits de refonte pré-exécution. Aucun n'est source de vérité.
Notables encore référencés : `00-MASTER-PLAN.md` (périmé, cité par les SR), `20-SESSION-NEXT-CLOUD-ORCHESTRATION.md`
(checklist init cloud, citée par CLAUDE.md), `37-REFONTE-SYSTEMIQUE.md` (plan R0-R7, cité par SR-15),
`39-PLAN-VAGUE-VISUELLE.md` (cité par SR-25), `47-DS-STUDIO-BUILDER-SPEC.md` (amont builder), `50-SILO-RUNBOOK-EXECUTION.md`,
`DS-COHERENCE-STANDARD.md` (encore cité en memory). Sous-dossiers : `audit-refonte/` (5 audits fondateurs),
`cartography/` (21 fichiers cartographie DS 2026-06-05/06), `content/` (contenus archivés). Plus les docs
déplacés ici par le pivot V8/nettoyage 2026-07-12 (cf statuts « ARCHIVÉ » des fiches ci-dessus).

### `tasks/` (racine du repo)

- **`SESSION-HANDOFF-CURRENT.md`** : auto-snapshot (`session-snapshot.sh`), frais 2026-07-12 10:45 (branche, dernier commit, 0 worker actif, procédure de reprise). **À JOUR**.
- **`claude-board.json`** : export board task-list Claude (pont ids `P<n>.<n>-<lettre>` ↔ plan), frais 2026-07-12 10:31. **À JOUR**.
- Aucun `ORCH-STATE.md` / `RESUME-NEXT.md` périmé à la racine (le CLAUDE.md les évoque mais ils vivent ailleurs / ont été nettoyés).

---

## Conflits factuels ouverts

À trancher / réconcilier (ne pas propager l'un ou l'autre sans vérifier lequel fait foi).

1. **Taxonomie secteurs divergente.** `strategy/03-case-study-sector-system.md` liste 6 secteurs
   (e-commerce / batiment / startup-logiciel / services-b2b / liberal-independant / therapeutes) ;
   `strategy/11 strat complète.md` v8 en liste d'autres (conseil / comptabilité / agence / industrie /
   formation / esn). Aussi signalé par `state/04-build-strat11-gap`. Arbitrage Simon requis.
2. **Compteur board 40/85 gelé sous V7.** `state/00-BOARD.md` (généré) reflète le backlog `state/02`
   GELÉ (3-piliers superseded). Le % (47 %) n'est PAS l'avancement réel V7-FOLD/V8. Ne pas le citer
   comme vérité d'avancement.
3. **Compteurs DS périmés dans plusieurs docs.** Divers docs citent 58/67/87/114/121/123/147/151/153
   types, 77 sections, 18 templates, 115/121 tokens. **Canoniques (README docs, figés 2026-06-15)** :
   **156 types registry / 128 sections / 13 templates / tokens.css 278 lignes**. Toujours renvoyer au
   README, jamais recopier un compteur interne daté.
4. **Pointeurs `docs/00-MASTER-PLAN.md` cassés.** Les session-reports et l'archive citent ce fichier
   comme « master plan canonique ». Il est archivé (`docs/archive/00-MASTER-PLAN.md`). Toute reprise
   suit `docs/README.md` → `strategy/10` + `state/00-BOARD`, pas ces pointeurs.
5. **Valeurs intégrations périmées** (`architecture/03`/`04`) : EMAIL_FROM réel = `waimia@virtuoseweb.fr`
   (pas `bonjour@waimia.fr`), Cal canonique = `simonberos/audit` (pas `waimia/45min`). La memory projet
   (`forms-email-resend-delivery`, `cal-booking-canonical`) fait foi.

---

## Dette doc restante

Ce qui reste à faire pour aligner intégralement `docs/`.

- **Régénérer les compteurs** internes datés dans `design-system/02` (« 151 »), `04-agent-ds` (« 87 »),
  `directives/02` (« 147 ») via `node scripts/gen-section-manifest.mjs`, puis recroiser le README.
- **Purge `visual-audit/`** (~85-90 Mo récupérables) : DIFFÉRÉE jusqu'à l'assainissement SEO
  (le README du dossier l'interdit avant). Ensuite : régénérer `_current/` pour les ~28 pages
  survivantes, basculer les ~48 campagnes datées dans `_archive/` et purger les .png/.jpeg lourds.
- **Resync wording `business/` + `marketing/`** sur le positionnement V8 (`strategy/10 §0bis`) :
  one-liner, H1, libellés d'offres (« site web intelligent » → « site web IA », « intégrateur Claude »
  → « Intégration Claude »), suppression du framing « anthropic-first » comme identité de marque.
  Addendum daté par doc, substance conservée.
- **Réconcilier la taxonomie secteurs** (conflit n°1) : trancher `strategy/03` vs `strategy/11` v8,
  mettre à jour le doc perdant avec un pointeur vers le canonique.
- **Corriger les valeurs intégrations** (conflit n°5) dans `architecture/03`/`04`.
- **Reframe V7/V8 du backlog `state/02`** (gelé) : les tâches P1/P2/légal restent valides sur le fond
  mais doivent être réinterprétées sous V7-FOLD/V8 avant exécution.
