# 18 · Absorber le SEO de VirtuoseWeb sans dégrader la position de Waimia

Complète `17-fusion-virtuoseweb.md`. Consigne de Simon du 23 novembre 2026 : absorber les
intentions de recherche de VirtuoseWeb sans faire tomber la position moyenne de Waimia (autour de 30)
vers 60.

## Ce que les exports disent

Sources : exports Search Console, 3 mois, `waimia.com` du 10 novembre et `virtuoseweb.fr` du 23 novembre.

| | Impressions | Position moyenne (pondérée par les impressions) |
| --- | --- | --- |
| Waimia, 174 pages | 12 404 | 32,3 |
| VirtuoseWeb, 145 pages | 134 954 | 72,5 |
| Les deux réunis, sans tri | 147 358 | 69,1 |

Reprendre l'empreinte de VirtuoseWeb telle quelle ferait donc passer Waimia de 32 à 69. Le piège n'est
pas la redirection (une 301 ne transporte pas une position de 75), c'est la création de pages
qui se classent là où VirtuoseWeb se classait.

Répartition de VirtuoseWeb : 52 pages en position 25 ou mieux (2 447 impressions, 31 clics),
20 pages entre 25 et 50 (2 998 impressions, 0 clic), 73 pages au-delà de 50 (129 509 impressions,
47 clics). Les requêtes de Rennes (109 requêtes, 11 102 impressions) et de Montpellier (73 requêtes,
7 204) sont presque toutes entre les positions 68 et 90, avec 0 clic sur les plus demandées
(« agence web Rennes » : 1 443 impressions, position 81).

## Règle

Une page n'est créée ou renforcée que si trois conditions tiennent :

1. l'intention est distincte, et les 10 premiers résultats (hors annuaires) contiennent des pages de
   même nature que la nôtre ;
2. le contenu est unique et au moins aussi complet que le SERP (longueur, H2, FAQ, tableau) ;
3. une position 30 ou mieux est plausible. Sinon, 301 vers la page la plus proche, sans nouvelle page.

Conséquence : aucune page « agence web <ville> » ni « ville × service » n'est reprise. Les 145 URL de
VirtuoseWeb sont redirigées (`17-redirections-virtuoseweb.json`, générée depuis `Pages.csv`).
Rennes et Nice : décision de création suspendue. Créer Nice avec le profil de VirtuoseWeb
(15 600 impressions, position ~70) ferait passer la moyenne de Waimia à environ 53.
À reprendre avec une mesure (voir garde-fou).

## Intentions étudiées (SERP lus le 23 novembre 2026)

Méthode : Google bloque la lecture automatisée (contrôle anti-robot, non contourné). Les 10 premiers
résultats viennent de DuckDuckGo dans le navigateur intégré, publicités et annuaires écartés ; titre, meta,
H1, H2, longueur et JSON-LD de chaque page sont extraits. Les positions Google réelles peuvent différer.

| Intention | Nature du SERP | Décision | Page Waimia |
| --- | --- | --- | --- |
| agence automatisation IA | pages de service, 1 000 à 4 300 mots, 8 à 14 H2, Service et FAQPage | page déjà dédiée ; 301 de VirtuoseWeb vers elle ; `automatisations` ciblée sur « automatisation IA pour PME » pour éviter la cannibalisation | `/services/systemes-operationnels-ia` et `/services/automatisations` |
| agence SEO pour PME | pages de service, 900 à 3 600 mots, 6 à 13 H2 | renforcer | `/services/seo-geo-contenu` |
| automatisation IA entreprise | guides et comparatifs d'outils, 1 600 à 5 800 mots | renforcer un contenu existant | guide ou article d'automatisation |
| refonte site internet | 100 % guides, 1 500 à 4 000 mots | renforcer | `/ressources/guides/refonte-site-internet` |
| cloud souverain IA (OVH, Scaleway, Outscale) | comparatifs de 1 300 à 3 200 mots ; VirtuoseWeb en position 7,6 | reprendre, faits revérifiés | `/blog/cloud-souverain-francais-scaleway-ovhcloud-outscale-ia` |
| hébergement Vercel pour une entreprise | comparatifs OVH, o2switch, Vercel | section dans la maintenance | `/services/maintenance-growth#hebergement-vercel` |
| création de site internet PME | 100 % guides, 2 700 mots en médiane | à décider : guide à écrire | aucune |
| marketing digital PME | guides dominés par Bpifrance et Canva | ne pas viser | 301 vers `/services/systeme-acquisition` |
| agence e-commerce | annuaires et agences spécialisées | ne pas viser | 301 vers `/services/shopify` |
| agence web <ville>, régions | pages locales en position 62 à 90 | ne pas viser | 301 |

## Garde-fou

Chaque lundi, relever la position moyenne pondérée et les impressions par tranche (≤ 20, 21 à 50, > 50)
avec `scripts/seo-routine/gsc-performance.mjs`. Seuil : si la position moyenne pondérée dépasse 40 sur 28 jours,
ou si une page nouvelle cumule plus de 500 impressions au-delà de la position 50 pendant 28 jours, elle est
repliée (301 ou fusion), pas laissée en place.

## Suite

- Étape 3 (autre dépôt, autre projet Vercel) : appliquer `17-redirections-virtuoseweb.json` en 301 à un seul saut,
  puis le changement d'adresse dans Search Console.
- Les pages sources de VirtuoseWeb supprimées le 19 novembre (cloud souverain, Vercel, Gemma 4, agent
  on-premise) sont dans l'historique git de l'ancien dépôt, commit `7a15505^`.
