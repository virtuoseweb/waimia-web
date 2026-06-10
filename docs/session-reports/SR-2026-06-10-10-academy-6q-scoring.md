# SR-2026-06-10-10 · Academy : copy ET scoring alignés sur la réalité du quiz (6 questions, max 18)

> Task #33 du backlog. Worker Sonnet worktree isolé, commit `7bcb057`, merge `2397efc`, **GF-1 prod PASS (visuel + fonctionnel)**.

## 1. Le problème était plus grave que le copy

Le backlog disait « copy : 12 questions annoncées vs 6 réelles ». L'investigation a révélé une **triple incohérence fonctionnelle** :
- Le quiz de `/ressources/academy` a **6 questions à échelle 0-3** (max réel 18).
- L'API `/api/academy` scorait **12 questions clampées 0-2** (max 24) → toute réponse « 3 » était écrasée à 2.
- Conséquences : catégories calibrées sur /24 inatteignables (mature ≥17 impossible avec 6×2=12 max effectif) et `isHot = score < 12` déclenché pour quasi tous les répondants (faux leads chauds).

## 2. Options et choix

- (a) Étendre le quiz à 12 questions : création de contenu + l'échelle 0-3 du form resterait incohérente avec le clamp 0-2.
- (b) **Aligner sur la réalité : 6 questions, échelle 0-3, max 18, seuils rescalés proportionnellement** ← choisi (le moins risqué, recommandé par le handoff ; passer à 12 questions reste possible plus tard comme évolution produit).

Rescale : categorize `<7` discovery / `<13` building / sinon mature ; `isHot < 9` ; affichages `/18` partout (subjects, AcademyResults, InternalLeadAlert — ce dernier détecté hors brief par le worker, corrigé par l'orchestrateur, 3 lignes).

## 3. Preuves

- **Logique** : 10/10 assertions (payload tout-3 → 18/mature/hot=false ; tout-1 → 6/discovery/hot=true ; bornes 6/7/12/13 ; clamp 5→3 et -1→0 ; q7 ignorée).
- **Gates** : astro check 0 err · build Complete! · check-no-emdash PASS.
- **Visuel prod** : « 6 questions » above-fold, h1 op1/transform neutre, 0 err console.
- **Fonctionnel PROD (POST réels)** : payload max+q7-bruit → `{"ok":true,"score":18,"category":"mature"}` ; payload tout-1 → `{"ok":true,"score":6,"category":"discovery"}`. (2 emails de test envoyés sur l'inbox interne, prénom `TEST-GF1-nuit`.)

## 4. Reste signalé

`src/pages/ressources/cookbooks/index.astro:16` mentionne « 12 questions » dans un contexte cookbook CRO sans rapport avec le diagnostic : laissé tel quel (contenu éditorial distinct).
