# SR-2026-06-10-25 · Audit vague visuelle : plan Awwwards mesuré en prod

> Agent **Fable 5 lecture seule** (prod live waimia.com, 14 pages, 1440×900 + 390×844). Livrable : **`docs/39-PLAN-VAGUE-VISUELLE.md`** (201 lignes, copié depuis /tmp pour pérennité) + 14 screenshots fold + 3 JSON de mesures + script `measure.cjs` dans `/tmp/wmission/audit-visuel/`.

## 1. Verdict d'ensemble

Le site est techniquement irréprochable (0 erreur console, 0 scroll horizontal) et possède déjà 3 pages de niveau référence : **hero home desktop** (fold 95 %, double CTA + microcopy), **/manifesto** (7 bascules ink/paper/terracotta) et **/secteurs/finance-compta** (meilleure alternance du site). La vague visuelle consiste surtout à **propager ce que les 3 meilleures pages font déjà** vers les 7 offres clonées, les 4 cas et les pages utility. Tout le plan est réalisable **par composition** : 0 nouveau token, 0 nouveau composant, masthead /solutions intouché (veto Simon).

## 2. Top 10 P1 (impact fort / effort faible) — détail sourcé dans docs/39

1. Kickers dupliqués dans les heros (14+ pages) : fix dans le composant catalogué, propage partout.
2. « Cinq missions » pour 4 cas listés (`ressources/index.astro:187`).
3. Fuite EN « 10 wk » sur page FR (`plateau.mdx:10`).
4. /ecole : « 0 PARCOURS · 0 ATELIER » affiché + kicker sous le header sticky.
5. Home mobile : CTA hero hors fold (y=957/844).
6. Cas clients : 72 % de scroll sans CTA + cta-final en paper (les offres l'ont en ink).
7. **7 offres sur 9 = séquences strictement identiques** (preuve curl) → 3 archétypes via sections existantes.
8. Home : 9 800 px sans CTA + 10/12 sections paper.
9. /cas hub : fold 63 %, moitié droite vide → stats agrégées via preset `HeroHubStats` existant.
10. /ressources : fold 50 %, bande morte 220 px → cran `--section-tight`.

## 3. Mesures par axe

- **Above-fold** : 5 pages < 70 % (plateau 56, ressources 50, cas 63, offres hub 69, about 69) ; academy-hub confirmé 70 % en prod.
- **Alternance fonds** : 6 pages monotones ; **paper-3 = 0 usage sur tout l'échantillon** (la prop `background` de R4 est posée mais inexploitée).
- **Conversion** : 3 trous majeurs (home 9 800 px, plateau 6 300/7 700 px, finance mobile 8 800 px).
- **Mobile** : 3 régressions, 0 scroll horizontal, tables OK.

## 4. Exécution

La vague s'exécute **après les merges R5b + R7a + R2-P2** (collision sections/templates) avec en plus : harmonisation chiffres copy et wiring des images gpt-image-2 (pipeline en cours, voir SR-26 à venir). Découpe multi-workers selon docs/39.
