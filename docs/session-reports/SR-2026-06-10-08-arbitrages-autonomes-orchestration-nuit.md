# SR-2026-06-10-08 · Arbitrages autonomes (tasks #14, #27, #18, #4-A-ter, #19) + plan d'orchestration nuit

> Mandat Simon (verbatim, 06-10 soir) : « me demande pas de trancher fait une reco que tu peux vérifier et faire fonctionner [...] tu tranches et dans le rapport tu diras les différents choix que tu as dû faire, les différentes options qu'on avait et ce que tu as choisi ». Ce SR est ce rapport pour les décisions non-exécutoires ; chaque mission exécutée a son propre SR.

## 1. Task #14 · Arbitrages DS restants — TRANCHÉS

### 1a. Sort de `/agence/design-system` vs `/agence/ds-studio`
- **Options** : (a) rediriger design-system → ds-studio ; (b) réduire design-system à un index mince ; (c) garder les deux.
- **Choix : (c) garder les deux, 0 changement.** Preuves à l'appui : les deux pages sont déjà conçues comme complémentaires et cross-linkées (`design-system.astro:171` → carte featured vers ds-studio ; `ds-studio.astro:12` « NE REMPLACE PAS /agence/design-system (catalogue documentaire) » + lien :153). design-system = doc/catalogue auto-alimenté par `section-registry` (drift faible) ; ds-studio = bac à sable d'édition. Rediriger détruirait la surface documentaire (SEO + référence agent AGENT-DS). Rule 28 : ne pas dégrader.

### 1b. Delta ~32px Offres/Tech (compacité hero post-migration)
- **Options** : (a) maintenir la standardisation shippée ; (b) restaurer le row-gap legacy via prop.
- **Choix : (a) maintenir.** Déjà en prod avec GF-1 PASS et screenshots propres (docs/22 leçon 4). Veto Simon toujours possible → restauration en 1 prop `gap` (chemin documenté docs/22).

### 1c. Les 3 vt=0 — résolus de fait
ListIndex migré (06-09), TrustLegal migré (06-09, GF-1 fait ce soir, SR-07), Welcome migré cette nuit (SR-09). Solutions = veto Simon inchangé (aucun contact).

## 2. Task #27 · Points reportés DetailMenu/ConversionFunnel/LeadMagnet — CLOS

- **Caveat mobile ConversionFunnel 768-800px** (breakpoint composant 768 vs legacy 800) : testé empiriquement sur `/offres/site-web-ia` @768/784/800/375px → **0 overflow, h1 opacity 1 partout**, screenshot 784px propre (nav burger, h1 balancé, grille 2 col OK). **Clos sans action** : l'écart de parité dans la fenêtre de 32px ne dégrade rien (rule 28 : rien n'est dégradé, pas de prop à ajouter).
- **Test e2e incohérent /solutions/fintech (docs/22 caveat)** : déjà corrigé en Wave 1.4 (`templates.spec.ts:384` asserte désormais `h1.hero-detail__title`).
- **Reste ouvert (hors autonomie)** : validation ÉDITORIALE des contenus EN ajoutés par les migrations (docs/22 caveat 1) — décision de contenu marketing pour Simon, flaggée, non bloquante.

## 3. Task #18 · DS Studio mode COMPOSE — DÉLÉGUÉ À TINA (won't build standalone)

- **Options** : (a) construire un picker/réordonnanceur de sections qui écrit le frontmatter `sections:[]` ; (b) considérer que Tina (Phase 3) couvre ce besoin nativement (édition de blocks).
- **Choix : (b).** Le master plan Wave 2.3 le pressentait (« Réévaluer vs Tina — probablement délégué à Tina »). Construire un composer maison serait un doublon jetable à l'arrivée de Tina (#20), dont le schéma `sections[]` mirroré est exactement cette surface. Économie : ~500 LoC évitées. Task #18 fermée par décision ; le besoin est porté par la task #20.

## 4. Task #4 (Phase A ter) · Extensions APPROX — cadrée sur APPROX #1 seule

Source : `docs/cartography/19` §3A (3 candidates).
- **APPROX #1** (hero-problem-index : `lede` optionnel → débloque la masthead de solutions/index) : **FAIRE** (additive, 0 risque, reco du doc déjà « oui c'est safe »). Exécution séquencée APRÈS le merge du worker tunnel (collision `schemas/sections.ts`).
- **APPROX #2** (offres manifesto : restyle non-0-delta) : **KEEP-BESPOKE** (le doc 19 lui-même prédisait « veto probable » ; rule 28).
- **APPROX #3** (tech italic-sub) : **KEEP-BESPOKE** (le h2 monumental reste le vrai blocker, reco doc 19 suivie).

## 5. Task #19 · Hygiène DS — décisions prises, exécution en vague dédiée

Critère retenu : **un token n'est créé que pour une récurrence ≥3** ; le décoratif one-off reste local + commenté. Audit partiellement périmé (le bug `--accent-offre`/#f59e0b cité §3b n'existe plus, 0 hit grep) → la vague commence par un re-scan.
- **Lot E (tokens)** : créer `--radius-base: 6px` (×5) · cran 10px (×5) · `--dur-trim: 220ms` (×8) · `--text-body-base: 16px` (×22) · mini-palette pédago `--level-beginner`/`--level-advanced`/`--state-error`. Box-shadows : tolérés (variantes éditoriales). Regénérer token-lock.
- **Chantier D (classes)** : fusion des resets reveal (`opacity:1;transform:none` fragmenté en 5 groupes) vers `.is-revealed` unique + suppression des redéfinitions scoped de `.wrap-wide`/`.wrap`/`.sr-only` (globales). `start-1..8` (no-op) : **déprécier d'abord**, supprimer après sweep usage 0 (consigne handoff).
- **Chantier F (naming)** : PAS de rename de masse (1434 classes mono-usage = risque élevé, valeur faible vs Tina). À la place : règle « préfixe-composant, pas de nom <4 chars » appliquée au code NEUF + documentée. Les renames `.k`/`.t` attendront un besoin réel du builder.

## 6. Plan d'orchestration de la nuit (modes choisis, rule 57)

| Mission | Mode | Pourquoi |
|---|---|---|
| Welcome / Tunnel / Academy | Task subagents Sonnet, worktrees isolés `.worktrees/*` | focused < 200 LoC/brief spec'd, retour summary |
| DS Studio v2 (#16) | **Codex** `codex exec` effort high (worktree ds-studio) | mission longue ~600+ LoC, compteur séparé, Codex dispo (probe OK 22:xx) |
| Sweep 104 previews | script harnais existant (gf1-cloud-sweep) en background | fan-out déjà industrialisé, pas besoin de workflow multi-agents |
| Hygiène #19 | vague workers après le batch push #1 | dépend d'une base mergée propre |
| Tina #20 | branche dédiée + plan + workers (chantier le plus long, fin de nuit) | gros chantier, docs/36 §5 |
| Agent teams | NON utilisés ce soir | aucune mission ne nécessite debate/comm inter-agents ; coût > gain (rule 45) |

Discipline deploy : tout est batché localement (gates astro check + build + no-emdash + touchpoints), **UN push sur main** par batch = 1 build Vercel (Hobby), GF-1 prod après READY. Workers : 0 git, 0 re-délégation, fichiers nommés. MailerLite : intouché (token invalide, attente Simon).
