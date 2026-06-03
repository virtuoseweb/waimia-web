# 🚀 Guide de démarrage — Collaborateur waimia-web

Bienvenue ! Ce repo est **le site en production `waimia.com`** (Astro 6 + React 19 + Tailwind 4, déployé sur Vercel). Ce guide te permet de démarrer proprement en ~20 min et de travailler **avec Claude Code** dans les meilleures conditions.

> **Ta branche de travail : `feat/contenu`** (déjà créée). Ton périmètre : le **menu**, le **contenu des sections** et des **pages**.
> **Règle d'or : tu ne merges JAMAIS sur `main` toi-même.** Tu pousses ta branche, tu ouvres une Pull Request, et **Simon valide et merge**. (Détail § Workflow.)

---

## 1. Accès & prérequis

1. **Accepter l'invitation GitHub** : tu as reçu une invitation à collaborer sur `virtuoseweb/waimia-web` (email + notification GitHub). Clique « Accept ». Tu as le rôle **Write** : tu peux cloner, créer des branches, pousser, ouvrir des PR.
2. **Compte Claude** : Claude Code nécessite un abonnement **Claude Pro/Max** *ou* une clé API Anthropic. Prépare l'un des deux avant l'étape 3.

### Outils à installer (CLI)

| Outil | Version | Installation |
| --- | --- | --- |
| **Git** | récente | `brew install git` (macOS) / `apt install git` (Linux) |
| **GitHub CLI** (`gh`) | récente | `brew install gh` puis `gh auth login` (choisir HTTPS) |
| **Node.js** | **22.12.0** (épinglé `.nvmrc`) | via [nvm](https://github.com/nvm-sh/nvm) : `nvm install 22.12.0 && nvm use` |
| **pnpm** | **9.15.0** (épinglé) | `corepack enable && corepack prepare pnpm@9.15.0 --activate` |
| **Claude Code** | dernière | `npm install -g @anthropic-ai/claude-code` |

---

## 2. Cloner le projet et démarrer en local

```bash
gh repo clone virtuoseweb/waimia-web      # ou : git clone https://github.com/virtuoseweb/waimia-web.git
cd waimia-web

git checkout feat/contenu                 # ⚠️ ta branche de travail (PAS main)
nvm use                                   # Node 22.12.0
corepack enable                           # active pnpm 9.15.0

pnpm install                              # dépendances
cp .env.example .env                      # variables locales (voir note ci-dessous)
pnpm dev                                  # → http://localhost:4321
```

> **Note `.env`** : les vraies clés API (Resend, Upstash, Cal.com) vivent dans Vercel, **pas dans le repo**. Pour éditer du **contenu / des sections / le menu**, tu n'en as **pas besoin** : le rendu des pages fonctionne sans. (Seuls les formulaires/envois d'emails nécessitent les clés réelles.)

---

## 3. Configurer Claude Code (le repo est déjà pré-équipé ✅)

Le dépôt embarque sa propre config Claude — **tu n'as quasiment rien à configurer**. Au **premier lancement de `claude` dans le dossier**, Claude Code charge automatiquement :

### a) Les serveurs MCP (`.mcp.json` du repo)

| MCP | Rôle pour ton travail |
| --- | --- |
| **playwright** | Claude **ouvre une vraie page** pour vérifier visuellement le rendu (screenshots, vérifs DOM). Indispensable pour valider que tes changements de contenu/sections s'affichent correctement. |
| **context7** | Documentation **à jour** d'Astro / Tailwind / des libs — évite les réponses périmées de Claude. |

➡️ Au 1ᵉʳ lancement, Claude te demandera d'**autoriser ces serveurs MCP** : accepte-les. (playwright télécharge un navigateur la première fois ; si besoin : `npx playwright install chromium`.)

### b) Le plugin garde-fous `vw-guardrails` (`.claude/settings.json` du repo)

Le repo déclare le marketplace `virtuoseweb/claude-config` et active le plugin **`vw-guardrails`** : il s'installe tout seul au démarrage et apporte les **garde-fous qualité GF-1…GF-6** + un agent reviewer (`visual-proof-reviewer`) + la commande `/vw-guardrails:guardrails`. Le plus important pour toi :

- **GF-1 — preuve avant de dire « fini »** : ne jamais affirmer qu'un changement visuel est OK sans **screenshot de la preview/du localhost** (Claude le fait via playwright).
- **GF-5 — branches isolées** : 1 sujet = 1 branche, jamais de `git add -A` global.

### c) Lancement

```bash
claude          # depuis la racine du repo
```

La première fois, Claude te demandera de te connecter (compte Claude Pro/Max ou clé API). Il lira aussi automatiquement le **`CLAUDE.md`** du repo (règles projet) et le **`README.md`**.

> **CLI dont Claude se sert pour toi** : `git`, `gh`, `pnpm`, `node`. Tous installés à l'étape 1. Tu n'as **pas** besoin du CLI Vercel : les previews se génèrent automatiquement (§ Workflow).

---

## 4. Où se trouve quoi (ton périmètre)

| Tu veux modifier… | Va dans… |
| --- | --- |
| **Le menu / la navigation** | `src/components/header/` |
| **Le contenu d'une section** | `src/components/sections/*.astro` (1 fichier par type de section) |
| **Une page** (FR) | `src/pages/…` (ex. `agence/`, `offres/`, `solutions/`, `secteurs/`, `ressources/`, `ecole/`) |
| **Une page** (EN) | `src/pages/en/…` |
| **Contenu éditorial** (articles blog, cas, glossaire…) | `src/content/` (fichiers MDX) |
| **Le pied de page** | `src/components/footer/` |

### ⚠️ Design System « figé »

Le DS est **verrouillé** : on **compose / réédite l'existant**, on **ne crée pas** de nouveau type de section ni de nouveau token CSS sans tâche dédiée validée par Simon. Si tu touches à un **type de section**, sache qu'il est synchronisé sur **4 fichiers** (sinon le build casse) : `src/schemas/sections.ts`, `src/lib/section-demos.ts`, `src/lib/section-registry.ts`, `src/components/sections/*.astro`. Pour du **contenu** (textes, libellés, items de menu), tu édites simplement les fichiers concernés.

---

## 5. Workflow de travail (⚠️ ne jamais merger sur main)

```bash
# 1. Toujours partir de ta branche à jour
git checkout feat/contenu
git pull

# 2. (recommandé) une sous-branche par sujet
git checkout -b feat/contenu-menu        # ex. travail sur le menu

# 3. Travailler (avec Claude), puis vérifier AVANT de pousser
pnpm build                                # DOIT terminer sans erreur (obligatoire)
# pnpm check → ~40 erreurs PRÉEXISTANTES connues : à ignorer si ton diff n'y touche pas
# pnpm lint  → stub non implémenté : ne pas s'y fier

# 4. Commit (style conventionnel) + push
git add <fichiers-de-ton-sujet>           # jamais "git add -A" global
git commit -m "feat(menu): reformule les libellés de navigation"
git push -u origin feat/contenu-menu
```

> Si `git push` demande un mot de passe / échoue sur l'auth, utilise le helper `gh` :
> `git -c credential.helper= -c credential.helper='!gh auth git-credential' push -u origin <ta-branche>`

### Voir ton travail sur une URL Vercel (preview)

Dès que tu pousses une branche, **Vercel build automatiquement une preview** (un build de prod complet, **isolé de waimia.com**) :

```
https://waimia-web-git-<ta-branche>-simonberos-projects.vercel.app
```

Ex. pour `feat/contenu` → `https://waimia-web-git-feat-contenu-simonberos-projects.vercel.app`. Si tu ouvres une **Pull Request**, Vercel poste aussi le lien de preview en commentaire de la PR.

### Mise en production = via Simon uniquement

```bash
# Ouvre une PR de ta branche vers main (ne la merge PAS)
gh pr create --base main --head feat/contenu-menu \
  --title "Contenu : menu" \
  --body "Changements de contenu sur le menu. Preview ci-dessus. A valider."
```

➡️ **Tu n'appuies jamais sur « Merge ».** Simon relit la preview, valide, et **merge lui-même** sur `main`. C'est seulement à ce moment que `waimia.com` est mis à jour.

---

## 6. Utiliser Claude efficacement (exemples)

Lance `claude` dans le dossier, puis décris ce que tu veux en langage naturel. Exemples adaptés à ton périmètre :

- « Dans le menu de navigation (`src/components/header/`), renomme l'entrée *Offres* en *Solutions* et montre-moi le rendu sur localhost. »
- « Change le titre et le sous-titre de la section hero de la page d'accueil, puis vérifie avec un screenshot que le texte s'affiche bien. »
- « Ajoute un nouvel article de blog dans `src/content/` à partir de ce texte : … »
- « Relis mon changement et prouve-moi via une capture de la preview que rien n'est cassé (GF-1). »

Bonnes pratiques :
- Demande **toujours** à Claude de **vérifier visuellement** (il a playwright) avant de dire que c'est bon.
- Garde **un sujet par branche / PR** — c'est plus simple à relire et à mettre en prod.
- En cas de doute sur une API Astro/Tailwind, Claude utilisera **context7** pour la doc à jour.

---

## 7. Récapitulatif express

1. Accepter l'invitation GitHub → cloner → `git checkout feat/contenu`.
2. `nvm use` · `corepack enable` · `pnpm install` · `pnpm dev` (localhost:4321).
3. `claude` dans le dossier → autoriser les MCP (playwright, context7) → plugin garde-fous auto.
4. Travailler (sous-branche par sujet) → `pnpm build` OK → commit ciblé → push.
5. Preview auto sur `waimia-web-git-<branche>-…vercel.app` → ouvrir une PR → **Simon valide et merge**.

Des questions ? Demande à Simon. Bon travail 🙌
