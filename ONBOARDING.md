# 🚀 Guide collaborateur — waimia-web (Claude Code / Sonnet)

Tu vas travailler sur **`waimia.com`** (site Astro 6) avec **Claude Code en Sonnet** (Claude Pro). Ce guide est court et ciblé : on configure ton poste (Phase A), puis on travaille (Phase B).

> 🎯 **Ta branche : `feat/contenu`.** Périmètre : **menu, contenu des sections, pages.**
> 🔒 **Tu ne merges JAMAIS sur `main`.** Tu pousses, tu ouvres une PR, **Simon valide et met en prod.**

---

# PHASE A — Configurer ton poste (tu pars de zéro)

## A.1 — Installer les outils

| Outil | Version | Commande |
| --- | --- | --- |
| Node.js | **22.12.0** | via [nvm](https://github.com/nvm-sh/nvm) : `nvm install 22.12.0 && nvm use` |
| pnpm | **9.15.0** | `corepack enable && corepack prepare pnpm@9.15.0 --activate` |
| GitHub CLI | récente | `brew install gh && gh auth login` (choisir **HTTPS**) |
| Claude Code | dernière | `npm install -g @anthropic-ai/claude-code@latest` |

➕ **Compte Claude Pro** (accès Sonnet). Le plan Pro a des **limites d'usage par tranche de ~5 h** → voir A.5 pour rester productif.

## A.2 — Récupérer le projet

```bash
gh repo clone virtuoseweb/waimia-web
cd waimia-web
git checkout feat/contenu      # ta branche (jamais main)
nvm use                        # Node 22.12.0
corepack enable                # pnpm 9.15.0
pnpm install
cp .env.example .env           # clés API PAS nécessaires pour le contenu
pnpm dev                       # → http://localhost:4321
```

## A.3 — Lancer Claude Code : tu ne configures RIEN, tout est déjà dans le repo ✅

Le repo embarque **toute** sa config Claude — **tu ne crées et ne modifies aucun fichier**. Ces 3 fichiers sont versionnés et arrivent avec le clone :

| Fichier (versionné) | Ce qu'il fait pour toi |
| --- | --- |
| **`CLAUDE.md`** | Le **contrat principal** : les garde-fous qualité (GF-1…GF-6) + les règles du projet (Design System figé, prod). Claude le lit **automatiquement** au démarrage. |
| **`.claude/settings.json`** | Déclare le marketplace `virtuoseweb` + active le plugin garde-fous **`vw-guardrails`** (agents de relecture + commande). |
| **`.mcp.json`** | 2 outils MCP : **playwright** (Claude ouvre une vraie page → screenshots de vérif) + **context7** (doc Astro/Tailwind à jour). |

### Au **premier** `claude` dans le dossier, tu acceptes 3 demandes (par sécurité, c'est normal) :

```bash
claude        # depuis le dossier waimia-web
```

1. **« Trust the files in this folder ? »** → **Yes** (autorise le repo à charger sa config).
2. **Proposition d'installer le marketplace `virtuoseweb` + le plugin `vw-guardrails`** → **accepte**. Le plugin s'installe depuis `github.com/virtuoseweb/claude-config` (public).
3. **Autoriser les serveurs MCP `playwright` et `context7`** → **accepte**.

✅ Après ça, Claude a : les garde-fous (via `CLAUDE.md`), 3 agents de relecture + la commande `/vw-guardrails:guardrails` (via le plugin), playwright + context7 (via MCP).

### Si le plugin ne s'installe pas tout seul (fallback manuel, 2 commandes) :

```bash
# dans claude, ou en CLI :
claude plugin marketplace add virtuoseweb/claude-config
claude plugin install vw-guardrails@virtuoseweb
```

Puis `/reload-plugins` (ou relance `claude`). Vérifie avec `/help` que `/vw-guardrails:guardrails` apparaît.

## A.4 — Pourquoi cette config ne « remplit » pas ton contexte (rassurant pour Sonnet)

- Le plugin n'ajoute que **~650 tokens** à chaque session (**0,35 %** de ta fenêtre) — ce sont les **descriptions** des 3 agents. Le contenu lourd d'un agent n'est chargé **que si tu l'invoques**.
- Les **hooks ne coûtent rien** en contexte (ils tournent côté outil, pas dans le modèle) et **rien n'est réinjecté à chaque message** → le **cache de Claude reste stable**, tes prompts restent rapides et économes.
- Le plugin **n'embarque aucun serveur MCP** → installer/recharger le plugin n'invalide pas ton cache.

👉 En clair : tu as **toute** la méthode (GF + agents + playwright/context7) pour un coût quasi nul. Le « petit poids » = config bien rangée, pas config incomplète.

## A.5 — Bien travailler avec Sonnet (fenêtre + quota réduits) ⭐

1. **Une tâche = une session courte.** Fais **`/clear`** en changeant de sujet → contexte propre + quota économisé.
2. **Pointe le bon fichier**, ne demande pas « analyse tout le site » (charger 40 fichiers = quota brûlé).
3. **Doc = context7**, pas de lecture massive.
4. **N'utilise pas les “agent teams”** (multi-agents) : c'est très coûteux en quota Pro et inutile pour du contenu.

---

# PHASE B — Ton travail sur waimia

## B.1 — Les 4 règles (rien de plus)

1. **Preuve avant « c'est bon ».** Demande **toujours** un screenshot (Claude a playwright) qui montre que ton changement s'affiche et ne casse rien (GF-1).
2. **1 sujet = 1 sous-branche → PR → Simon merge.** Tu ne pousses jamais sur `main`, tu n'appuies jamais sur « Merge ».
3. **Design System figé : on COMPOSE, on ne crée pas.** Pas de nouveau type de section ni de token CSS (ça casse le build). Le **contenu** (textes, libellés, items de menu) → tu édites librement.
4. **`pnpm build` doit passer avant de pousser.** (`pnpm check` a ~40 erreurs préexistantes connues → à ignorer si ton diff n'y touche pas ; `pnpm lint` n'est pas branché.)

## B.2 — Où éditer quoi

| Tu veux modifier… | Va dans… |
| --- | --- |
| **Le menu / la navigation** | `src/components/header/` |
| **Le contenu d'une section** | `src/components/sections/*.astro` |
| **Une page** (FR) | `src/pages/…` (`agence/`, `offres/`, `solutions/`, `secteurs/`, `ressources/`, `ecole/`) |
| **Une page** (EN) | `src/pages/en/…` |
| **Articles / contenu éditorial** | `src/content/` (MDX) |
| **Le pied de page** | `src/components/footer/` |

## B.3 — Workflow (à chaque sujet)

```bash
git checkout feat/contenu && git pull
git checkout -b feat/contenu-menu     # une sous-branche par sujet

# … tu travailles avec Claude …

pnpm build                            # DOIT réussir
git add <tes-fichiers>                # jamais "git add -A"
git commit -m "feat(menu): reformule les libellés"
git push -u origin feat/contenu-menu

gh pr create --base main --head feat/contenu-menu \
  --title "Contenu : menu" --body "Aperçu Vercel ci-dessous. À valider."
# ⚠️ NE PAS merger — Simon relit l'aperçu et met en prod.
```

> Si `git push` échoue sur l'authentification :
> `git -c credential.helper='!gh auth git-credential' push -u origin <ta-branche>`

> Chaque push génère un **aperçu Vercel** (lien posté sur la PR). Simon te donnera l'URL d'aperçu à consulter.

## B.4 — Exemples de prompts efficaces

- « Dans `src/components/header/`, renomme l'entrée *Offres* en *Solutions*, puis montre-moi un screenshot du menu. »
- « Change le titre de la section hero de la page d'accueil par “…”, et vérifie le rendu sur localhost. »
- « Ajoute un article de blog dans `src/content/` à partir de ce texte : … »
- « Avant que je pousse : lance `pnpm build` + un screenshot qui prouve que rien n'est cassé. »

---

## Récap (30 secondes)

1. Installer Node 22.12 · pnpm 9.15 · gh · Claude Code → cloner → `git checkout feat/contenu`.
2. `pnpm install` · `pnpm dev` · `claude` → accepter **3 demandes** (trust dossier · install plugin · MCP). Rien d'autre à configurer.
3. Sonnet : sessions **courtes et ciblées**, `/clear` entre sujets, pas de « agent teams ».
4. 4 règles : **preuve visuelle · 1 sous-branche/sujet + PR · DS figé · build OK**.
5. Pousser → PR → **Simon valide et met en prod**. Bon travail 🙌
