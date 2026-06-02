# CLAUDE.md — waimia-web (site `waimia.com`)

Repo **standalone** Astro 6 SSG → déployé sur **`waimia.com`** (Vercel projet `waimia-web`). Source de vérité prod.
Org GitHub : **`virtuoseweb`**. ⚠️ NE PAS toucher le repo `waimia-v2` (monorepo agrégateur).

## 🚀 Reprise de session — LIRE EN PREMIER
**`docs/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md`** = état courant + plan + reste à faire (dont **§6 = init hooks cloud vs local**).
Point d'arrêt : branche `feat/library-heroes-enrich`, bibliothèque à **57 types** (build vert, GF-1 ✅).

## ⚙️ Initialisation (cloud vs local) — via le plugin partagé `vw-guardrails`
- **Cloud** (claude.ai/code) : seuls **ce `CLAUDE.md`** + le **`.claude/` du repo** s'activent (le `~/.claude` global n'est PAS cloné — doc Anthropic : « only hooks committed to the repo run »). Le `.claude/settings.json` **déclare le marketplace `virtuoseweb` + le plugin `vw-guardrails@virtuoseweb`** → au démarrage de session cloud, Claude Code **installe le plugin** depuis `github.com/virtuoseweb/claude-config` (public) : hook SessionStart (recharge GF-1..GF-6, affiche `☁️ CLOUD`), agent `visual-proof-reviewer`, commande `/vw-guardrails:guardrails`.
- **Local** : `.claude/` repo (plugin) **+** `~/.claude` global (arsenal complet). Le hook plugin émet une ligne courte en local (le global couvre déjà les GF).
- Source unique des garde-fous portables = repo **`virtuoseweb/claude-config`** (mise à jour = push + bump version ; cloud récupère au prochain boot, local via `claude plugin update`).
- Fallback : si le réseau cloud bloque l'install du plugin, **ce `CLAUDE.md` reste lu** (garde-fous inline ci-dessous).
- Checklist de vérif d'init (les 2 surfaces) : `docs/20` §6.
- **Autonomie** : local = `bypassPermissions` déjà global (`~/.claude/settings.json`) ; cloud = autonome par design (sandbox isolée). Rien à taper. Détail : `docs/20` §7.

## Stack & commandes
- Astro 6 (`output: 'static'` + `@astrojs/vercel`), React islands, Tailwind 4, pnpm.
- Build : `npx -y pnpm@9.15.0 build` (attendu : `Complete!`). Typecheck : `npx -y pnpm@9.15.0 exec astro check` (attendu : 0 errors).
- Dev : `npx -y pnpm@9.15.0 dev`.

## Bibliothèque / Design System (W6) — composition, DS figé
Catalogue de sections composables. **4 touchpoints par type, TOUS synchronisés** (sinon build cassé) :
1. Schéma `src/schemas/sections.ts` (`z.object` + `discriminatedUnion` + union `SectionType`)
2. Demo `src/lib/section-demos.ts` (données bilingues fr/en)
3. Registry `src/lib/section-registry.ts` (import + entrée `SECTIONS`)
4. Composant `src/components/sections/*.astro`
Pages catalogue : `/agence/design-system`, `/preview/[type]`, `/components/[type]`, `/categories/[slug]`.
**DS figé** : on catalogue/compose l'existant, **0 nouveau token CSS**, 0 modif des templates/pages live sans tâche dédiée.

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
Branches isolées (`git worktree`), agent teams (debate/cross-layer), **workflows** pour le balayage à grande échelle (ex. GF-1 sur les 57 previews), `claude --bg` pour les missions longues supervisées. Détail + découpe suggérée : `docs/20`.

## Reste à faire (P1)
1. **Migration templates** → faire consommer le registry par `src/components/templates/*` (GF-1 par page).
2. **GF-1 sweep** sur preview Vercel (les 57 `/preview/<type>`).
