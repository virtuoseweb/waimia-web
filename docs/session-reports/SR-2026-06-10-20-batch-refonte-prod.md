# SR-2026-06-10-20 · Batch refonte R0+R1+R2(P1)+R3 + Tina mergé en PROD, GF-1 prod PASS

> Assemblage orchestrateur : 5 merges sans conflit sur main, gates complets verts, UN push (`d9e5d0a..982e360`) + 1 push correctif (`746b642`). Prod `waimia.com` vérifiée empiriquement.

## 1. Contenu du batch (6 commits de merge + docs)

| Branche | Apport | SR |
|---|---|---|
| `feat/refonte-r0-quickwins` | -1 214 LoC dette (collections/templates morts, DropCap tokenisé byte-safe) | SR-16 |
| `feat/refonte-r3-navigation` | Mega menus 5→4 entrées, Solutions par besoin, Agence + Manifeste & Démos | SR-17 |
| `feat/refonte-r12-cases` | 3 cas pavés → composables premium, cards hub réalignées, 4/4 composable | SR-18 |
| `feat/refonte-r1-blog-fusion` | fieldNotes+veilleIA → blog, 1 contenu = 1 URL, RSS 17 items propres | SR-19 |
| `feat/tina-no-react-pilote` | Édition visuelle TinaCMS 8 offres, visiteur byte-identique (GF-1 preview PASS) | SR-14 |

Gates sur le main mergé (relancés intégralement) : `astro check` **0 errors / 0 warnings** · build Complete! · touchpoints · no-emdash · form-endpoints 5/5 · media-query-var : tous PASS.

## 2. GF-1 prod (waimia.com, Playwright + sondes HTTP, ~18:50-19:05)

- Nav : 4 triggers exacts `solutions/cas/ressources/agence`, panel Solutions **opacity 1** ouvert (screenshot `prod-panel-solutions.png`), kickers ACQUÉRIR/PILOTER/OPÉRER + footers, h1 home + CTA opacity 1 transform neutre, 0 erreur console.
- /cas/caserne : h1 opacity 1, **11 sections**, timeline « Trajectoire » rendue, prose max **64 mots/paragraphe** (avant : pavés ~1 200 mots), 0 erreur console.
- Blog fusionné : field-note détail 200 + h1 opacity 1 + bloc code rendu ; `/ressources/blog/composable-adoption` **404** ; `migrated-*` **301** vers l'URL canonique ; RSS global **17 items, 0 lien migrated**.

## 3. Incident détecté et résolu au GF-1 prod (leçon capitalisée)

Le panel Cas du menu affichait les **anciennes** headlines (« −38 % triage », « 1 200 h/an ») : R3 avait dérivé ses labels des anciennes cards pendant que R12 réécrivait les récits en parallèle. **Collision sémantique sans collision de fichiers** : merge propre, gates verts, prod incohérente. Fix `746b642` (6 lignes, worker mécanique, sources = frontmatters mergés). Leçon → rule 45 §Collision-sémantique + `tasks/lessons.md` : quand une vague réécrit un contenu, attribuer explicitement ses surfaces dérivées (menus/cards/featured/RSS) et tester la cohérence inter-surfaces au GF-1 post-merge.

## 4. Suite immédiate

Vague R4 « DS familles » déjà lancée (worker Fable 5, worktree `r4ds`, branché sur le main mergé) : rythme vertical `--section-*` en crans fixes, tokenisation littéraux, renames radius/shadow, Kicker canonique, prop `background`, gate de rythme.
