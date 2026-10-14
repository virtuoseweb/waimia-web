---
name: optimiser-une-page-seo
description: Optimiser une page waimia-web pour une requête cible : intention, title, description, H1 V8.1, définition en tête, maillage interne, sans fait inventé, avec preuve après build.
---

# Optimiser une page SEO

Partir d'une requête mesurée, pas d'une intuition.

## Procédure

1. Requête cible : `docs/seo/keywords.json`, puis `docs/seo/data/<semaine>/summary.json` (semaine la plus récente, `latest.json`). Noter position, impressions, clics de la page.
2. Intention : informationnelle, transactionnelle, comparative. Lire la page actuelle en entier avant de la toucher.
3. `title` visible ≤ 60 caractères ; `description` ≤ 160 (plafond de schéma 175, `packages/ds-kernel/src/schemas/sections.ts`). Requête en tête, sans bourrage.
4. H1 selon la double couche V8.1 : intitulé recherché en H1, positionnement systèmes business ensuite (`docs/strategy/10-architecture-finale-v7.md` §0bis).
5. Page informationnelle : définition de 40 à 60 mots en tête, directe, extractible.
6. Maillage : `src/lib/internal-mesh.ts` ; `category` = premier thème ; garde `node scripts/check-silos.mjs`. Étendre les maps, jamais de lien en dur orphelin.
7. FAQ : seulement des questions réellement posées, jamais en masse.
8. Aucun fait, chiffre, client, avis ou adresse inventé ; chaque fait local vérifié à sa source. Pas de tiret cadratin (`node scripts/check-no-emdash.mjs`), jargon contrôlé (`check-jargon.mjs`).
9. Contenu JSON sous `src/content/`, prose en `html_fr`/`html_en`. Contenu réutilisé par ID, pas de copie.
10. Attente réaliste : un `title` seul ne bouge rien au-delà de la position 20 ; ne pas le promettre.

## Preuve

Après build (parent) : `check:seo`, `check:head`, `check:jsonld`, `check:internal-mesh`, `check:silos`, puis lecture du HTML dans `dist/` (title, description, H1, `"@type"`). Suivi à 2 à 4 semaines dans `docs/seo/data`.
