# SR-2026-06-11-45 · Vague it.4 : bugs de finition B1+B2 + manifeste scroll-pinné

> Issue de la critique itération 4 (~4,6/5 : chantiers it.3 livrés, « /ressources excellent », mais 2 bugs de finition HAUT + le cran motion à franchir). 2 workers Opus, base 6dffe60, mergés `1aa3d8d`, GF-1 prod PASS.

## B1 · Entités HTML double-encodées (visibles à l'écran)

Causes-racines (triangulées orchestrateur, fixées à la bonne couche par le worker) :
- Entités littérales (`&rsquo;`, `&nbsp;`) dans des champs rendus via interpolation `{...}` qui ré-échappe le `&` : agence ×3, demos ×5, registry ×2, 10 `description_fr` tunnels → caractères réels (apostrophe typographique U+2019, insécable U+00A0). Corps markdown intacts.
- Dek d'article : `Astro.slots.render('lede')` sur-échappait, puis `HeroCentered.astro:263` rendait via `{...}` (asymétrie : le h1 au-dessus était déjà `set:html`) → lede passé en `set:html`. Corrige blogs FR+EN, outils, veille d'un coup.
- Preuve : grep dist 0 double-encodage site-wide ; prod : 0 entité sur dek + /agence.

## B2 · Pain-points secteurs (placeholder + compteur faux)

- Schéma `pains_fr/en` → objets `{title, body}` (content.config), route secteurs câblée sur la prop `pains` du template (le slot ne portait que des `<h3>`, le template dupliquait alors titre→body), 3 MDX enrichis 4 pains × descriptions métier FR+EN, lede « Trois frictions » → « Les frictions » aux 2 fallbacks.
- Preuve prod : 4 `timeline-body` à descriptions réelles par secteur, lede corrigé. (La sonde `dupTitleDesc` du harness orchestrateur était un artefact de sélecteur, réfutée par le DOM réel.)

## C3' · Manifeste /agence scroll-pinné (le cran motion)

Track 280vh + section sticky : la révélation des 45 mots occupe toute la plage pendant que la section reste fixe, puis libération naturelle. Champ `pinned` opt-in (sections.ts), seul /agence l'active (FR+EN) ; mobile ≤768 et reduced-motion = statique ; hauteur réservée CSS (0 layout shift).
- Preuve prod (sondes Playwright) : secTop=0 constant pendant lit 5→33/45, libération à 75 % de plage (secTop −355, 45/45), reduced-motion `static`, mobile `static`.

## Intégration (orchestrateur, rule 09)

- Conflit de merge UNIQUEMENT sur les artefacts dérivés (ds-section-manifest.json + DS-SECTION-CATALOG.md régénérés des 2 côtés) → résolution canonique : régénération depuis la source mergée (`gen-section-manifest` : 150 types, 4007 refs), gate usage-manifest PASS. `agence/index.astro` partagé par les 2 workers (hunks l.49 vs l.77) auto-mergé proprement.
- astro check `- 0 errors` + build `Complete!` + 7 gates PASS post-merge. Le champ zod `pinned .default(false)` (piège connu) validé par l'astro check combiné.
- GF-1 local puis prod : sondes identiques toutes vertes. Push `6dffe60..1aa3d8d`, poll marqueur « Les frictions récurrentes » (vérifié 0 avant).

## Queue

C1' finance/services-b2b encore proches (FAIBLE) · photos équipe /agence (asset Simon) · migration site-web-ia → MDX · extinction templates 11/18.
