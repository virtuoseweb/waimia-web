# Build site complet strat 11 — gap réel ↔ cible + work queue phasée

> Source de vérité de l'**état de construction** du site vs **strat 11** (`docs/strategy/11 strat complète.md`, doc canonique V7-FOLD). Créé 2026-06-29 après mandat élargi Simon (« recréer proprement chaque page avec la bonne structure de section + copy + design awwwards ; nettoyer stubs + liens morts ; il manque les landing »). Complète `docs/state/03` (compositions service/home déjà livrées) et supersede l'angle « plan ADR-003 » de `docs/state/02` (3-piliers superseded par v7).

## Gap réel ↔ cible (recon GF-4 2026-06-29)
| Domaine | Réel | Cible strat 11 | Statut |
|---|---|---|---|
| services | 7 + template-ref | 6 + content-marketing | ✅ OK |
| cas-usages | 5 (mêmes que strat §3) | 5 | ✅ OK |
| audits | 2 | 2 | ✅ OK |
| home + 6 service (preview) | 3+2 variantes awwwards | — | ✅ livré (#84/#81-83, docs/state/03) |
| **lp (landing)** | 4 (1 prioritaire) | 6 prioritaires §32 | ❌ **5 manquantes** → **S11-A en cours** |
| **secteurs** | batiment/e-commerce/liberal/services-b2b/startup/therapeutes | conseil/comptabilité/agence/industrie/formation/esn (§4/§17/§29) | ⚠️ **divergence totale** → 6 liens nav morts → S11-B |
| **diagnostics** | 2 (maturite-ia, swi) | 4 (+claude-pme, +referent-ia) | ❌ 2 manquants → S11-C |
| **comparatifs** | 0 | 4 (§5 col4) | ❌ vide → S11-C |
| **demonstrations** | 0 | 3 (§20) | ❌ vide → S11-C |
| **outils** | 1 | +2 (calculateur-roi, score-maturite) | ❌ → S11-C |
| **guides** | 0 | 2 (claude-pme, checklist) | ❌ → S11-C |
| **implantations** | 0 | montpellier/bordeaux/index (§24) | ❌ → S11-C |
| **pages stale 3-piliers** | /acquerir /operer /piloter (958 l) | strat §29 « ne pas recréer » | 🗑️ → S11-D |
| **/offres/** | 2 + routes | v7 = /services | ⚠️ arbitrer → S11-D |
| **liens nav morts** | ~20 (secteurs 6, etudes-de-cas→cas-clients, comparatifs, guides, implantations, 2 diag) | 0 | ❌ → résolus par S11-B/C/D |

## Work queue phasée (tâches natives #13-16)
- **S11-A — Landing pages (5)** *(en cours, Workflow `build-landings-strat11`)* : audit-ia-pme, audit-site-web-intelligent, integrateur-claude, diagnostic-maturite-ia, diagnostic-site-web-intelligent. Structure lp §32 (7 types section lp), noindex+canonical, copy awwwards bilingue. Build central + GF-1 sweep après.
- **S11-B — Secteurs (6 canoniques)** : conseil/comptabilité/agence/industrie/formation/esn per §17. Résout 6 liens nav morts. ⚖️ **Décision Simon** : sort des 6 secteurs divergents existants (verticales additionnelles OU redirect 301). Ne PAS supprimer sans son arbitrage (destructif).
- **S11-C — Collections vides** : comparatifs 4, démonstrations 3, diagnostics +2, outils +1, guides 2, implantations 3. Per templates §20/§21/§24. Résout le reste des liens nav morts.
  - **C1 (route existante, mirror facile, EN COURS Workflow `build-diag-outils`)** : diagnostics claude-pme + referent-ia (route `/ressources/diagnostics/[...slug]` OK), outils score-maturite-ia (route OK). calculateur-roi-ia existe déjà.
  - **C2 (route MANQUANTE → chunk lourd)** : comparatifs (4 + hub), guides (2), demonstrations (3), implantations (3) n'ont PAS de route `.astro` → créer la route (mirror `ressources/diagnostics/[...slug].astro`) + hub index + contenu.
  - ⚠️ **Insight** : toutes les collections ressources = **rendu composable** → le contenu DOIT porter un tableau `sections:` de sections catalogue valides (la route throw sinon, anti-orphelin). Donc remplir = composer des sections (travail awwwards), pas juste du frontmatter. Embarquer les bornes Zod dans chaque brief (leçon : description 40-180, sections schema-valides).
- **S11-D — Nettoyage** : retirer/rediriger 3-piliers (/acquerir,/operer,/piloter) + arbitrer /offres + corriger /etudes-de-cas→/cas-clients + sweep liens morts + 301 pour URL indexées supprimées.
- **S11-E (à créer)** : passe habillage awwwards + variantes sur les page-types nouvellement construits (méthode docs/directives/03-awwwards + dosages A/C/B comme service/home).

## Invariants (GF + DS + strat)
- 0 markup orphelin : éditer le composant catalogué, jamais inliner (CLAUDE.md règle d'or anti-orphelin). Contenu = JSON collection / frontmatter.
- 0 nouvelle variable DS (figé) ; création de composants/variantes catalogue OK via DS Studio + 5 touchpoints.
- 0 U+2014 dans le copy (rule 58, gate check-no-emdash). CTA réservation = audit/diagnostic gratuit.
- GF-1 empirique (Playwright desktop+mobile, getComputedStyle, reveals, 0 image cassée, 0 overflow) avant tout « livré ». Prod (`main`) intacte : tout vit en preview/branche jusqu'au GO Simon.
- Indexation strat §25 : services/audits/secteurs/cas-usages/études/démonstrations/ressources/articles/locales/implantations = index ; lp/* = noindex+canonical+hors sitemap.

---
## Addendum 2026-06-29 (clôture) — S11-B/C FAITS, /offres supprimé, pricing livré
- **S11-A** ✅ 5 landings (ce1ace90). **S11-B** ✅ 6 secteurs (c743c034). **S11-C** ✅ : C1 diagnostics+outil (d100b1d6) + C2 11 contenus comparatifs/guides/démonstrations/implantations (0a5a6d60, sweep 16/16).
- **Correction nav majeure (directive Simon)** : colonne « Solutions » → `/services` (hub créé, 9f589b09), **`/offres` SUPPRIMÉ** (20662bd7, Phase 2, Option A : audit-maturite-ia→/audit-maturite-ia indexée, growth-system-ia→301, 11 redirects).
- **Pricing** : Maintenance & Growth (régie 100€/h + base 100€/mois, 4 forfaits) + landing SWI (GA4/Search Console/HubSpot) — livrés.
- **Reste prioritaire** = `docs/state/05-cloture-session-2026-06-29.md` §3 : **P0 habillage variantes EN PROD** (non commencé), P1 solde 3-piliers + gates CI offres. S11-D (#16) : /offres fait, 3-piliers restant.
