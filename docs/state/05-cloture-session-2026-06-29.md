# Clôture de session — 2026-06-29 (topo complet pour reprise fraîche)

> Point d'état réconcilié (commits + journal nuit + decisions + audit empirique) à la clôture de la session du 2026-06-29. Source de vérité pour démarrer une **nouvelle session fraîche**. Branche : `feat/swi-habillage-variants`. Complète `docs/state/04-build-strat11-gap.md` (gap build) et `docs/state/03` (compositions preview).

## 1. Ce qui a été FAIT cette session (commits, tous GF-1 prouvés)
| Commit | Livrable | Preuve |
|---|---|---|
| `3be611c8` | Home variante A (sélectif) + corrections GF-4 docs/state/03 | preview GF-1 |
| `ce1ace90` | 5 landing pages /lp prioritaires (strat §32) | build + GF-1 |
| `c743c034` | 6 secteurs canoniques (conseil/comptabilité/agence/industrie/formation/esn) | résout 6 liens nav morts |
| `d100b1d6` | Ressources C1 : diagnostics claude-pme + referent-ia + outil score-maturite-ia | build |
| `bbc7e70f` | Routes ressources (comparatifs/guides/démonstrations/implantations) | build exit 0 |
| `4b146993` | Fix studio : boutons atelier visibles (`:global aria-pressed`) | GF-1 Playwright (bg=--accent) |
| `18ac5b54` puis `9f589b09` | **Correction nav : colonne « Solutions » → `/services`** (hub créé) au lieu de `/offres` | GF-1 sweep 16/16 |
| `0a5a6d60` | **11 contenus ressources** composables (comparatifs 4 / guides 2 / démonstrations 3 / implantations 2), copy awwwards bilingue | sweep Playwright 16/16 PASS |
| `20662bd7` | **Suppression complète `/offres`** (Phase 2) : pages+collection retirées, audit-maturite-ia migré → `/audit-maturite-ia` (indexée), growth-system-ia → 301, 11 redirects 301, ~40 refs repointées | build exit 0, 0 `/offres` user-facing dans dist |
| (en cours) | Pricing **Maintenance & Growth** (régie) + enrichissement **landing SWI** (GA4/Search Console/HubSpot) | workers Opus, GF-1 à suivre |

Décisions tracées : `~/.claude/night-sessions/2026-06-29/decisions/` (0030 commits sœurs, 0031 services-vs-offres + Option A Simon).

## 2. État RÉEL des surfaces (audit empirique 2026-06-29)
- **Menu (mega-menu.ts)** : ✅ correct v7. Solutions→`/services`, Cas clients→`/cas-clients`, Ressources, Agence. `matchPrefixes` nettoyé (plus de /offres ni 3-piliers).
- **Footer (FOOTER_COLS)** : ✅ propre. 13 liens tous valides (agence, services, audits, diagnostics, contact). 0 lien mort.
- **Contact** : ✅ `/contact` (form → `/api/contact`, prerender). [À re-tester E2E : soumission réelle → Resend/MailerLite, cf memory forms-architecture.]
- **Hub `/services`** : ✅ créé (hub Solutions v7, 2 offres, 5 sections catalogue). Indexé.
- **Hubs ressources** : ✅ /ressources/comparatifs, /guides, /demonstrations, /implantations (noindex, index-on-quality).
- **sitemap.xml** : ✅ propre (0 /offres, 0 /acquerir).
- **/audit-maturite-ia** : ✅ page bespoke indexée (migrée d'offres→audits).

## 3. CE QUI RESTE À FAIRE (priorisé pour la session fraîche)
### P0 — Habillage variantes EN PROD (le gros morceau, non commencé)
Les variantes A/C/B des money pages + home + 5 services secondaires sont **conçues et GF-1'd en PREVIEW** (`/preview-v/*`, `src/data/page-variants/*`), mais **PAS appliquées aux pages live**. Reco par défaut = **variante C** partout (cf docs/state/03). Appliquer = faire consommer le JSON variante par la page/route live OU migrer la page vers le rendu composable. Pages concernées : home (`src/pages/index.astro` bespoke), 6 pages service, etc. **C'est le chantier n°1 pour « pages habillées en prod ».** Chiffrer page par page ; commencer par la home (1re impression prospection).
### P1 — Nettoyage 3-piliers (#16 / S11-D)
Pages `/acquerir`, `/operer`, `/piloter` existent encore (noindex, hors nav). Stale sous v7. Restent référencées dans `MM_SOLUTIONS_NEW` (sitemap.ts → `/plan-du-site`) + ~7 pages. À supprimer + 301 + repointer (mapping vers /services + ancres). Pas bloquant (non-404), mais à solder.
### P1 — Métadonnée générée stale
`src/data/ds-section-manifest.json` garde des `consumers` pointant des fichiers supprimés (`src/content/offres/conseil.mdx` jamais existé, `src/pages/offres/index.astro`). Corriger le générateur `scripts/gen-section-manifest.mjs` (détection consumers). Non user-facing.
### P1 — Gates CI référençant offres (flaggé par worker Phase 2)
Scripts à mettre à jour avant `npm run check:*` : `check-content-refs.mjs` (collectSlugs('offres')), `check-schema.mjs`, `test-page-document.mjs`, `gen-page-schemas.mjs`, `check-static-quality.mjs` (allowlist /offres). `npm run build` lui n'en dépend pas (vert).
### P2 — Reste catalogue/strat
Cf `docs/state/04-build-strat11-gap.md` (S11-E habillage awwwards des nouveaux page-types) + `docs/state/02` (à reframer sous v7, ADR-003 3-piliers superseded).

## 4. Modèle de prix Maintenance & Growth (décisions Simon, en cours d'application)
- **Base maintenance web** : 100 €/mois TOUT INCLUS (gestion Vercel + quelques modifs + MAJ/sécurité + hébergement o2switch.fr + nom de domaine/DNS).
- **Régie growth** : base 100 €/h, 3 forfaits dégressifs : Starter 5h/490€, Growth 10h/950€ (phare), Scale 20h/1800€ — couvre formation/consulting/SEO/GEO/CRO/design/dev/ads/IA/automation + outbound Lemlist/Instantly/Apollo/Pharow/Twilio.
- **Landing SWI** : pitch SEO/GEO + Google Analytics 4 + Search Console + CRM HubSpot.

## 5. Invariants (rappel)
Prod (`main`) intacte : tout vit sur `feat/swi-habillage-variants` jusqu'au GO Simon. GF-1 empirique avant « fait ». 0 nouvelle variable DS. 0 U+2014. CTA réservation = `/contact` (cal simonberos/audit). Catalogue 5 touchpoints synchronisés.
