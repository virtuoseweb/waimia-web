# Session handoff · 2026-06-11 ~02:00 · ÉCRIT POUR LA PROCHAINE SESSION (Opus 4.8 + workers Sonnet 4.6/Opus 4.8)

> Contexte : Simon bascule l'orchestrateur de Fable 5 vers **Opus 4.8** (coût). Workers : **Opus 4.8 dès qu'il y a réflexion** (design, arbitrage, fidélité, GF-1 à interpréter), **Sonnet 4.6 pour le mécanique borné spec'd** (< 800 LoC, old→new exacts). Moratoire Codex toujours actif (0 `codex exec` sans signal Simon).

## 1. État prod (vérifié empiriquement)

- **main = `d156eb5` poussé, live 02:02** (+ home recomposée V-F2, SR-35) sur waimia.com. Contenu des 2 derniers batches (tous GF-1 prod PASS, SRs 30-34 dans docs/session-reports/) :
  - Mega menu Solutions hiérarchisé (maquette Simon : 3 titres alignés top=120, badges « Offre phare » sur Growth System IA + Site web IA, image cas Plateau en 4e colonne).
  - V-F1 collections : 25 → 19 (pages/knowledgeBase/brandVoice archivées docs/archive/content/, guarantees → src/data/guarantees.ts, 605 pages, /archive + /agence/hero-lab en 301).
  - **Catalogue 113 types / 18 catégories** (+7 : terminal-table, editorial-write-feed, manifesto-statement, manifesto-act, asymmetric-services, terminal-mockup, terminal-metrics-strip).
  - DS Studio : volet `#catalogue` (browser data-driven), barre DsLocalNav sur 4 pages, aperçu live-token.
  - Images : 13/16 webp câblées (covers cas, besoins sur offres piliers, thèmes inset sur solutions).
- Gates : astro check 0 errors + build Complete! + 8 gates PASS sur `3c7fd3d` (noms exacts : check-touchpoints, check-no-emdash, check-section-rhythm, check-content-refs, check-token-purity, check-form-endpoints, check-media-query-var, check-token-lock ; +check-static-quality).

## 2. EN COURS au moment du handoff

- PLUS AUCUN worker en course : home-recomp a LIVRÉ (mergé `d156eb5`, GF-1 prod PASS 02:04, SR-35). Worktrees nettoyés.

## 3. PROCHAINES TÂCHES (ordre recommandé)

1. ~~Recomposition home~~ LIVRÉE (SR-35). Reste l’arbitrage compression ~8 900 px vs cible 8 300 (retirer CtaBand 90px + resserrer FAQ si souhaité).
2. **V-TYPO transverse** (docs/41-DIRECTIVE-TYPO-CONTRASTE.md) : serif = emphase d'un mot seulement, masse en Instrument Sans (global.css h1/h2/h3 lignes ~62-129 = cœur de bascule), gras > italique, fonds contrastés par blocs. Inventaire des violations molecules : /tmp/wmission/catgap/REPORT.md (EditorialWriteRow, AsymmetricServiceRow, EditorialCaseCard, ManifestoAccent, TerminalMockup hex hardcodé #17140F). Worker Opus 4.8 (décisions cas par cas) + preuves paired computed avant/après par template.
3. **V-F3 landing site-web-ia parfaite** (docs/40 §4) : 8 slots composable, exposée dans le footer, qualité Awwwards. + **tunnel 4 steps étalon** (docs/40 §4.2, offre_label_map hardcodée de tunnel/[step].astro à résorber).
4. **Étiquettes catalogue usage site|library** (docs/40 §3) : badge + filtre /agence/design-system + gate, dérivé de library-manifest (les 7 nouveaux types ont consumers `[]` = library).
5. **R7b hub par besoin + secteurs** (docs/40 §2) : /cas/<slug> canonique, secteurs = listings facettés, 301 /solutions/fintech→/secteurs/fintech, fix caseRef finance-compta. Ensuite câbler theme-industrie.webp (bloqué par template secteurs legacy).
6. **Restes R6** : extinction OffresDetail/TechDetail/SolutionsDetail + ConversionFunnel composable (détail SR-27 §3 + docs/40 §7).
7. **Micro-fixes backlog** : alt vide sur media-block en tête des cas (l'alt manifest est sur la card hub seulement) ; copy design-system citant ServiceDetail/ListIndex supprimés ; sitemap.ts:484 lien /archive ; carte hero-lab dans design-system.astro (FR:175/EN:119) ; « T3 2026 » wrap MastheadRow.astro:32 ; claims roi_metrics solutions non sourcées (trancher en vague contenu) ; routes EN secteurs (décision Simon).
8. **Vague visuelle docs/39** (alternance fonds, trous CTA, mobile) : largement absorbée par les vagues ci-dessus, réconcilier ce qui reste.

## 4. Leçons opérationnelles de cette session (NE PAS ré-apprendre)

- **Git multi-worktree orchestrateur** : TOUJOURS `git -C <chemin-absolu>`, JAMAIS `cd && git ...` (un cd non persisté a fait merger le batch sur la branche d'un worker ; détection = reflog main muet + « Already up to date » suspect).
- **Briefs workers** : STATE.md première action ; AUCUNE commande git (y compris par chemin/`-C`) ; AUCUNE re-délégation ; fichiers nommés ; **port serve-dist dédié par worker** (4331+, vérifier que c'est SON dist) ; **chromium isolé, pas le Playwright MCP partagé** (une page worker a été re-naviguée par un autre worker) ; U+2014 interdit ; directive typo docs/41 dans tout brief touchant l'UI.
- À chaque retour de worker écrivain : `git -C <repo> log --graph -3` de main AVANT tout (vecteur n°3 rule 45), contre-vérif rule 09 (gates relancés + screenshots inspectés), commit branche par l'orchestrateur.
- Batcher les pushes (Vercel Hobby) ; poll deploy par sonde curl discriminante (ex. une URL nouvelle → 200, ou une supprimée → 301) ; GF-1 prod ensuite.
- Interdits permanents : Codex (moratoire), MailerLite (token invalide, attendre nouveau token Simon), masthead /solutions (veto structure), `.env.openai` jamais committé, prod = waimia.com SANS slash final.

## 5. Références

docs/00-MASTER-PLAN.md (canonique) · docs/37 (refonte, statuts) · docs/39 (vague visuelle) · docs/40 (VISION FINALE : arbo, collections, landing, tunnel, étiquettes) · docs/41 (typo) · docs/38 (images, 3 textures non câblées) · docs/visual-audit/* (preuves + audits) · SRs 27-34 docs/session-reports/.
