# CLAUDE.md — waimia-web (site `waimia.com`)

Repo **standalone** Astro 6 SSG → déployé sur **`waimia.com`** (Vercel projet `waimia-web`). Source de vérité prod.
Org GitHub : **`virtuoseweb`**. ⚠️ NE PAS toucher le repo `waimia-v2` (monorepo agrégateur).

## 🚀 Reprise de session — LIRE EN PREMIER
**`docs/README.md`** = index maître (START HERE) : carte des docs (réorganisés en dossiers thématiques) + board des chantiers + ordre de lecture selon la mission. Lu EN PREMIER par l'orchestrateur ET par un agent IA. **Sources de lecture** : ⭐ **`docs/strategy/10-architecture-finale-v7.md`** (ARCHITECTURE COURANTE + positionnement V8 §0bis ; SUPERSEDE l'archi 3-piliers) + **`docs/synthese-v1/SYNTHESE.md`** (synthèse 1-fichier de TOUTE la doc, navigation agent IA) + `docs/strategy/02-site-etat-final.md` (whitelist E-E-A-T + suppressions, archi superseded). *(Anciens `strategy/01` + `state/01` archivés 2026-07-12 → `docs/archive/`.)* **État de progression = `docs/state/00-BOARD.md`** (board généré, vue d'un coup d'œil ; cf protocole ci-dessous). *(L'ancien `docs/00-MASTER-PLAN.md` est périmé → `docs/archive/`.)*

### 🔄 Board de progression (sync auto — vérité réconciliée)
Un système maintient l'alignement **intention ↔ réalité ↔ task-list Claude**, pour qu'il soit impossible de croire « tout est fait » (ou l'inverse) sans preuve :
- **Source de vérité des tâches** = `docs/state/02-plan-execution-claude-code.md` (71 tâches P0→P4). Format de ligne : `- [x] **P0.2-D — titre** … <!-- sb commit=<sha7> gf1=<y|n> -->`. **Invariant** : case `[x]` ⟹ tag `sb` avec un commit qui existe dans git, sinon = désync.
- **Board généré** = `docs/state/00-BOARD.md` (100 % généré par `scripts/sync-board.mjs`, **NE PAS éditer à la main** : vue Phase/chantier/done-total/%/reste + section Désyncs).
- **Pont task-list Claude** = ids partagés `P<n>.<n>-<lettre>` + export `tasks/claude-board.json`. À l'ouverture d'un chantier → `TaskCreate` avec l'id du plan.
- **Protocole par livraison** : cocher `[x]` + tag `commit` dans `state/02` **dans le même tour que le commit** → le hook `board-sync.sh` (PostToolUse, sur `git commit`) régénère `00-BOARD.md` automatiquement. Régénérer à la main : `node scripts/sync-board.mjs --regen`.
- **Gate** : `npm run check:board` (ou `node scripts/check-board.mjs`) échoue si une case `[x]` cite un commit inexistant. Le board **ne re-coche jamais tout seul** : cocher reste une assertion adossée à une preuve GF-1.
État DS (réf, possiblement daté — croiser README/ORCH-STATE) : industrialisation DS en prod + vague dark. Catalogue ~151 types composables (5 touchpoints : schéma + demos + registry + manifest + composant). **Variante dark `ink` systématique** (directive `docs/directives/02-dark-variantes.md`) : champ `background` `.optional()` sur la majorité des sections + idiome `[data-bg='ink']` (modèle `BentoGrid`), boutons CTA gérés globalement (`global.css` `[data-bg='ink'] .btn-ghost/.btn-primary`), héros en cours de câblage (6 composants, vetos HeroHome + masthead /solutions). DS Studio (`/agence/ds-studio`) + persistance git couches A/C. **Suivi orchestration nocturne = `tasks/ORCH-STATE.md`**. **Blocker historique = registry adoption** (templates via `SectionsRenderer`). Anciens fragments → `docs/archive/`.

## ⚙️ Initialisation (cloud vs local) — via le plugin partagé `vw-guardrails`
- **Cloud** (claude.ai/code) : seuls **ce `CLAUDE.md`** + le **`.claude/` du repo** s'activent (le `~/.claude` global n'est PAS cloné — doc Anthropic : « only hooks committed to the repo run »). Le `.claude/settings.json` **déclare le marketplace `virtuoseweb` + le plugin `vw-guardrails@virtuoseweb`** → au démarrage de session cloud, Claude Code **installe le plugin** depuis `github.com/virtuoseweb/claude-config` (public) : hook SessionStart (recharge GF-1..GF-6, affiche `☁️ CLOUD`), agent `visual-proof-reviewer`, commande `/vw-guardrails:guardrails`.
- **Local** : `.claude/` repo (plugin) **+** `~/.claude` global (arsenal complet). Le hook plugin émet une ligne courte en local (le global couvre déjà les GF).
- Source unique des garde-fous portables = repo **`virtuoseweb/claude-config`** (mise à jour = push + bump version ; cloud récupère au prochain boot, local via `claude plugin update`).
- Fallback : si le réseau cloud bloque l'install du plugin, **ce `CLAUDE.md` reste lu** (garde-fous inline ci-dessous).
- Checklist de vérif d'init (les 2 surfaces) : `docs/archive/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md` §6.
- **Autonomie** : local = `bypassPermissions` déjà global (`~/.claude/settings.json`) ; cloud = autonome par design (sandbox isolée). Rien à taper. Détail : `docs/archive/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md` §7.

## Stack & commandes
- Astro 6 (`output: 'static'` + `@astrojs/vercel`), React islands, Tailwind 4, pnpm.
- Build : `npx -y pnpm@9.15.0 build` (attendu : `Complete!`). Typecheck : `npx -y pnpm@9.15.0 exec astro check` (attendu : 0 errors).
- Dev : `npx -y pnpm@9.15.0 dev`.

## Bibliothèque / Design System (W6) — composition, DS figé
Catalogue de sections composables. **5 touchpoints par type, TOUS synchronisés** (sinon build cassé) :
1. Schéma `src/schemas/sections.ts` (`z.object` + `discriminatedUnion` + union `SectionType`)
2. Demo `src/lib/section-demos.ts` (données bilingues fr/en)
3. Registry `src/lib/section-registry.ts` (import + entrée `SECTIONS`)
4. Composant `src/components/sections/*.astro`
5. Manifest `src/lib/library-manifest.ts` (`SECTION_USAGE`, dérive de `SECTIONS` → suit automatiquement)
**Co-location (#38, en cours)** : les sections migrent vers un module unique `src/sections/<type>/` (`schema.ts` + `demo.ts` + `meta.ts` + `Component.astro` + `index.ts`), les god-files devenant des points d'agrégation générés (`gen:section-aggregate`). 3 pilotes migrés (media-bento, hero-social-proof, eeat-panel) ; gate `check:section-modules`. Source de vérité : `docs/audits/02-section-colocation-38.md` + blueprint `tasks/wave-38-colocation-spec.md`.
Pages catalogue : `/agence/design-system`, `/preview/[type]`, `/components/[type]`, `/categories/[slug]`.
**Régime DS (clarif Simon 2026-06-13) : variables figées, catalogue ACTIF.** ❌ **0 nouvelle variable/token DS** ; ✅ nouvelles valeurs Tailwind / calculs / transparences sur variables existantes ; ✅ **créer de nouveaux composants/familles/variantes/déclinaisons de section dans le catalogue** (c'est l'objet du chantier de design de template, pas figé) — à condition que tout passe par le **DS Studio** (source de vérité DS), soit bâti avec les variables DS, et **propagé/sync au catalogue** (5 touchpoints, sinon build cassé). Préférer la composition si une section existante couvre ~80 %, mais la création n'est PAS bannie. 0 markup orphelin. 0 modif des templates/pages live sans tâche dédiée. *(Rule 28 globale « 0 nouvelle section » = scopée projet Amploi `astro-tina-site-v1` catalogue figé V1 — ne s'applique PAS ici.)*

### 🧭 Règle d'or ANTI-ORPHELIN (source de vérité = le composant, jamais le markup inline)
3 familles de blocs — ne pas les confondre :
- `src/components/sections/*.astro` (**123**, re-mesuré 2026-06-13 ; « ~68 » était périmé) = sections **cataloguées** (registry → design-system). **Éditer CE fichier propage partout** où il est importé (catalogue + templates + pages composables) : c'est la source de vérité de son markup/CSS.
- `src/components/ui/organisms/*.astro` (~21) = organisms bespoke composés à la main par les pages (ex. home `src/pages/index.astro`) — **hors catalogue** (les modifier propage aussi, mais ils n'apparaissent pas dans `/agence/design-system`).
- `src/components/templates/*.astro` (~18) = templates qui **importent** les composants ci-dessus.

Deux rendus de page : **composable** = frontmatter MDX `sections: [...]` → `<SectionsRenderer>` → `section-registry` (cf `src/pages/offres/[...slug].astro` `useComposable`) = **cible** ; **template legacy** (props) = backward-compat.

➡️ Pour TOUTE modif d'apparence/structure d'une section ou du header/footer : **éditer le composant** (`sections/`, `ui/organisms/`, `header/`, `footer/`) — **JAMAIS inliner du markup neuf dans une page ou un template** (= orphelin déconnecté du catalogue, dette garantie). Le header est global (`src/layouts/Base.astro` → `Header.astro`) : 1 édition → toutes les pages.
➡️ **Contenu textuel** = props / frontmatter MDX `src/content/**` / `src/data/*` → 0 impact design.
➡️ **Contenu GLOBAL vs INSTANCE** (directive Simon 2026-06-13) : la règle anti-orphelin ci-dessus rend le **markup** GLOBAL (éditer le composant propage partout). Pour le **contenu**, viser le même réflexe quand il est réutilisé cross-page : un cas, un avis, un bloc auteur, un prix affiché sur plusieurs surfaces (page service + landing `/lp/` + hub) doit vivre dans une **source unique** (collection Astro référencée par `*Id`/`*Slug`, ou store `src/data/*.ts` type `pain-points.ts`) → édite une fois, propage partout (**GLOBAL**). Le contenu propre à une page reste inline en frontmatter (**INSTANCE**). Tout nouveau composant porteur de contenu réutilisable se conçoit catalogue-ready avec les 2 états (réf optionnelle + override inline). ⚠️ Aujourd'hui le contenu de section est **INSTANCE-only** (props inline, 0 propagation) ; ne pas dupliquer un contenu partagé d'une page à l'autre (= dette de désync).
➡️ **Nouveau type de section** = tâche dédiée Simon (les 5 touchpoints ci-dessus synchronisés, ou module co-localisé `src/sections/<type>/` + `gen:section-aggregate`, sinon build cassé) — **hors scope contenu** d'un collaborateur.

## 🛑 Garde-fous NON négociables (fallback inline complet — GF-1..GF-6)
> Le plugin `vw-guardrails` recharge ces GF au boot (cloud + local). Ce bloc est le **filet de secours** si l'install du plugin échoue (réseau cloud) — il doit donc rester **autoporteur**.
- **GF-1 — preuve EMPIRIQUE** : jamais « validé/fini/parfait » sans preuve, dans le même turn. **Visuel** → Playwright screenshot above-fold + `getComputedStyle` (opacity ≠ 0, transform neutre) sur la preview/prod déployée (Lighthouse ne suffit JAMAIS). **Backend/API/DB** → appel réel + assertion sur la réponse (pas juste 200) + write→read DB vérifié + cas limite + flow E2E si full-stack. « ça build / 200 OK » ≠ « ça marche ». Reviewer : agent `visual-proof-reviewer`.
- **GF-2 — délégation** : ≤ 3 lignes de code applicatif écrites en direct ; au-delà → worker/sous-agent. Décomposer, ne pas tout faire en mono-bloc.
- **GF-3 — auto-évolution** : après une correction, capitaliser (rule/doc + validation) dans le même tour.
- **GF-4 — triangulation** : grep + source `fichier:ligne` avant toute affirmation négative (« X n'existe pas / ne marche pas »).
- **GF-5 — action directe** : si N actions parallélisables sans collision → agir, ne pas demander « lequel d'abord ». Validation conversationnelle seulement pour : paiement > 1 €, destructif, install non-demandée, envoi externe, sécurité.
- **GF-6 — officiel/doc d'abord + invoquer l'arsenal** : lire la doc + leviers supportés avant tout sur-mesure ; invoquer directement skills/commandes/agents/MCP (ne pas suggérer à l'humain de taper).
- **Prod** : `waimia.com` sert `main`. **Ne merger sur `main` qu'après GF-1 sur une preview Vercel.** Auto-merge GitHub = OFF.
- **Branches isolées** : 1 scope = 1 branche `feat/<scope>`, jamais `git add -A` global. Push :
  `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>`

## Orchestration multi-agents (cloud + local)
Branches isolées (`git worktree`), agent teams (debate/cross-layer), **workflows** pour le balayage à grande échelle (ex. GF-1 sur les 57 previews), `claude --bg` pour les missions longues supervisées. Détail + découpe suggérée : `docs/archive/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md`.

## Reste à faire (P1)
1. **Migration templates : SOLDÉE + doctrine template-as-data DÉPLOYÉE** (2026-07-18). Heros 17/18 (Solutions exclu par veto Simon) ; backlog « composable JSON » soldé (blog index, CaseStudyTemplate, manifesto, technologies, author). **Template = définition logicielle** : moteur `packages/ds-kernel/src/templates/` (defineTemplate/resolveTemplate) + définitions `src/lib/templates/` (case-study, sector, essay) ; **contenu 100 % JSON canonique** (`body_sections` editorial-prose html_fr/html_en ; 0 .mdx restant sous `src/content`, loaders `**/*.json` ; conversion via renderer `@astrojs/markdown-remark` pour parité heading-ids+smartypants). Fiches : `~/.claude/night-sessions/2026-07-16/decisions/0018` + `0020`. Runbook : `docs/audits/01-template-registry-migration.md`.
2. **GF-1 sweep** sur les previews (re-mesuré 2026-07-16 : **208** `/preview/<type>`, pas 58). Dernier sweep complet 2026-07-16 : 208/208 fonctionnels en local parité prod (script `gf1-sweep-previews` : texte visible, imgs, data-reveal, overflow-x, console). Secret `VERCEL_AUTOMATION_BYPASS_SECRET` requis pour le gate auto sur preview Vercel (sinon sweep local via `scripts/serve-dist.mjs`).
