# Contribuer à waimia-web

Merci de contribuer au site **waimia.com**. Ce dépôt sert directement la production : ce guide garantit que chaque changement arrive en ligne proprement et sans régression.

## Prérequis

- Node épinglé par [`.nvmrc`](.nvmrc) (`nvm use`) et pnpm `9.15.0` (`corepack enable && corepack prepare pnpm@9.15.0 --activate`).
- Installer les dépendances : `pnpm install`.
- Copier les variables d'env : `cp .env.example .env` puis remplir (voir le README).

## Modèle de branches

- **`main`** = production. Auto-déployée sur `waimia.com` par Vercel à chaque push. **Ne jamais pousser ni committer directement sur `main`.**
- Travailler sur une branche dédiée, **un scope = une branche** :
  - `feat/<scope>` — nouvelle fonctionnalité
  - `fix/<scope>` — correction de bug
  - `docs/<scope>` — documentation seule
  - `chore/<scope>` — outillage / maintenance
  - `refactor/<scope>` — refactor sans changement de comportement
- Créer la branche depuis `main` à jour :

  ```bash
  git fetch origin
  git checkout -b feat/mon-scope origin/main
  ```

- Éviter `git add -A` : n'ajouter que les fichiers de votre scope.

## Convention de commits

Le dépôt suit les [Conventional Commits](https://www.conventionalcommits.org/) (cf. historique : `feat(...)`, `fix(...)`, `docs(...)`, `chore(...)`, `refactor(...)`, `perf(...)`, `seo(...)`).

Format :

```
<type>(<scope>): <résumé impératif, court>
```

Exemples réels du dépôt :

```
feat(seo): llms.txt + pages markdown auto-générées
fix(nav): lien Newsletter cassé → ancre /ressources/#newsletter
docs(tracker): consolidation Bloc B
chore(vercel): installCommand standalone
```

## Process de Pull Request

1. Ouvrir la PR en **draft** tant que le travail est en cours.
2. Garder la PR focalisée sur un seul scope ; décrire le quoi et le pourquoi dans la description.
3. Passer la PR « ready for review » une fois les checks verts et la preuve fournie (voir ci-dessous).
4. Faire relire (review) avant merge.
5. **Merge uniquement quand** : checks CI verts + review approuvée. Le merge déclenche le déploiement production via Vercel — ne merger qu'après vérification sur le déploiement de preview.

## Exigence de preuve avant « fini »

Une tâche n'est **pas terminée** sur affirmation. Avant de marquer une PR prête / un changement « fini », fournir la preuve :

1. **Build OK** — `pnpm build` se termine sans erreur (exit 0).
2. **Types OK** — `pnpm check` (astro check) sans nouvelle erreur introduite par votre changement.

   > Le dépôt a des erreurs `astro check` pré-existantes connues. Votre PR ne doit pas en **ajouter** ; corriger les anciennes est hors périmètre sauf tâche dédiée.
3. **Vérification visuelle** — pour tout changement de rendu (composant, section, page, style, animation), vérifier la **page concernée** sur le déploiement de preview (screenshot above-the-fold ; s'assurer que les éléments clés sont visibles — pas de `opacity: 0` résiduel). Un build vert ne prouve pas que le rendu est correct.

## Sécurité & secrets

- **Ne jamais committer de secret.** `.env` est gitignored ; seul [`.env.example`](.env.example) (valeurs factices) est versionné.
- Les clés de production vivent dans le dashboard Vercel du projet `waimia-web`, pas dans le code.
- En cas de doute sur une donnée sensible, ne pas la committer et demander.

## Checklist avant de demander une review

- [ ] Branche créée depuis `main` à jour, scope unique.
- [ ] Commits en Conventional Commits.
- [ ] `pnpm build` exit 0.
- [ ] `pnpm check` sans nouvelle erreur.
- [ ] Vérification visuelle de la page touchée (si rendu modifié).
- [ ] Aucun secret committé.
