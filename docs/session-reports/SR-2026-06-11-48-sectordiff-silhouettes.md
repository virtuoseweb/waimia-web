# SR-2026-06-11-48 · C1' it.6 : silhouettes uniques par secteur (finance / services-b2b)

> Critique it.4-6 : finance-compta et services-b2b perçus jumeaux. Diagnostic subagent (read-only) : les 2 pages utilisaient EXACTEMENT le même set de 4 blocs recompo {impact, case, feature, diagnostic}, seule une permutation d'ordre les distinguait. Industrie marchait grâce à une silhouette différente (method + shift, sans diagnostic).

## Fix (worker sectordiff, mergé `dfeda6d`, commit `2201e5f`)

Pure composition de données dans `RECIPES` (`src/pages/secteurs/[...slug].astro`, SEUL fichier touché, 0 template/schéma/MDX) :
- **finance-compta « la clôture qui rétrécit »** : `[impact, feature, shift, diagnostic]`. Nouveau bloc metric-shift ink (réconciliation 2j→20min, mémo CODIR 5h→15min, audit CAC 3sem→8j), diag lede « paliers de clôture ». Le case sort de la recompo (reste via CaseCardGrid).
- **services-b2b « les 90 jours »** : `[method, feature, case, impact]`. Nouvelle method-timeline S1→J+90 (audit CRM, templates, pilote 5 proposals, prod, pipeline 24/7). Diagnostic-stages retiré (le clone le plus visible).
- **industrie** : intact. Plus aucune paire ne partage le même set de blocs.

## Incident worker capitalisé (lessons.md)

Les 3 premiers Edits du worker sont tombés dans le repo PRINCIPAL (chemins absolus sans préfixe `.worktrees/`) malgré le brief « cwd worktree only ». Auto-détecté (dist non conforme), restauré par backup+cp, **vérifié clean par l'orchestrateur** (git diff vide, le commit parallèle intermédiaire `8fc3221` ne touchait pas ce fichier). Parade ajoutée aux briefs : tout chemin doit contenir `.worktrees/<slug>`.

## Preuves (orchestrateur, rule 09)

- Post-merge : astro check 0 errors + build Complete! + 7 gates PASS (gate rhythm en version `8fc3221` de la session parallèle).
- GF-1 local 6/6 (3 pages × desktop 1440 + mobile 390, scroll lent) : h1 opacity 1 transform neutre, 0 reveal caché, sondes silhouettes OK (finance a « Réconciliation bancaire »+« paliers de clôture » sans fuite method ; services a « Audit et connexion CRM »+« Pipeline actif 24/7 » sans « Quatre stades » ; 0 fuite croisée).
- Critique visuelle orchestrateur sur les 3 fullpage : silhouettes confirmées distinctes (finance ouvre ink chiffres ×2 ; services ouvre clair frise, ink tardif ; industrie case ink central).

## Deploy

Prod toujours gelée (quota Vercel Hobby 100/jour, SR-47). Ce travail part dans le deploy consolidé au reset (~16h 2026-06-12), GF-1 prod à ce moment-là.
