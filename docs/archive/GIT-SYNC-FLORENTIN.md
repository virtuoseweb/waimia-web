# Synchroniser ta branche `content` sans rien perdre — Florentin

But : récupérer les dernières mises à jour de `main` **sur ta branche**, **sans écraser** ton travail local, puis **pousser** ton travail sur GitHub.

Règle d'or : on **commit ton travail D'ABORD**, ensuite on synchronise. Comme ça rien ne peut être écrasé. On utilise `merge` (et pas `rebase`) : c'est plus sûr, pas de réécriture d'historique, pas de `--force`.

---

## 0. Vérifie où tu es

```bash
git branch --show-current     # doit afficher ta branche (ex: feat/contenu)
git status                    # liste tes fichiers modifiés
```

> Note le nom exact affiché par la 1ʳᵉ commande : c'est `<ta-branche>` dans la suite.

---

## 1. SÉCURISE ton travail local D'ABORD (rien ne sera perdu)

Si `git status` montre des fichiers modifiés **non commités** :

```bash
git add -A
git commit -m "wip: mon travail contenu en cours"
```

> Si tu préfères mettre de côté sans créer de commit : `git stash` (tu le récupéreras à l'étape 5 avec `git stash pop`).

---

## 2. Récupère les dernières infos du serveur (ne change encore rien chez toi)

```bash
git fetch origin
```

---

## 3. Mets à jour `main` en local

```bash
git checkout main
git pull --ff-only origin main
git checkout -                # revient sur ta branche
```

---

## 4. Intègre `main` DANS ta branche (merge = sûr, garde tout ton travail)

```bash
git merge main
```

- **Pas de conflit** → c'est fini, passe à l'étape 5.
- **Conflits** → Git liste les fichiers concernés. Ouvre-les, cherche les marques `<<<<<<<`, `=======`, `>>>>>>>`, garde les bonnes parties, supprime les marques, puis :

```bash
git add <fichier-résolu>      # pour chaque fichier corrigé
git commit                    # termine le merge (garde le message proposé)
```

---

## 5. (si tu as utilisé `git stash` à l'étape 1) Récupère ton travail mis de côté

```bash
git stash pop
```

---

## 6. Pousse ton travail sur GitHub

```bash
git push origin <ta-branche>  # ex: git push origin feat/contenu
```

---

## En cas de doute

- **Ne jamais** faire `git push --force` ni `git reset --hard` sur ta branche : ça peut effacer ton travail.
- Si un message parle de `rebase`, ignore-le et reste sur le `merge` ci-dessus.
- Si tu es bloqué sur un conflit, fais `git merge --abort` (revient à l'état d'avant le merge, ton travail commité est intact) et préviens.

> Les changements design system / hero arriveront sur `main` après validation visuelle (preview Vercel). Une fois sur `main`, refais ce flux (étapes 2→6) pour que ta branche en hérite.
