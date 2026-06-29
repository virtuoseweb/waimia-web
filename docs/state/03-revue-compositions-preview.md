# Revue des compositions à trancher — habillage awwwards (branche `feat/swi-habillage-variants`)

> Pour Simon. Chaque page cible a reçu **plusieurs compositions** (même structure de sections, dosages d'habillage différents), rendues en **preview noindex** — la prod (`index.astro`, pages service live) n'est **pas** touchée. Tu tranches la variante par page ; ma **recommandation par défaut = C** (intermédiaire) partout. Pour appliquer un choix en prod, ce sera une tâche dédiée (faire consommer le JSON choisi par la page live / le template).
>
> **Voir en local** : `node scripts/serve-dist.mjs --port 4321 --root dist/client` après `npx -y pnpm@9.15.0 build`, puis ouvrir les URLs ci-dessous. Toutes GF-1'd (Playwright desktop 1440 + mobile 390 : H1/CTA opacity 1, reveals OK, 0 image cassée, 0 erreur console, 0 overflow).

## Légende des dosages
- **A — Sélectif / éditorial** : média parcimonieux, vide actif, 1 seule signature visuelle (le climax stats). Le plus « swiss / less is more ».
- **C — Intermédiaire (★ recommandé)** : équilibre média/typo, 1 climax + 1 signature narrative (sticky-scroll), respirations. Le meilleur compromis awwwards/clarté.
- **B — Riche / immersif** : duotone généreux, hero accent média, plusieurs moments signature. Le plus « waouh », plus chargé.

## Money pages (3 variantes chacune)
| Page | URLs preview | Ma reco |
|---|---|---|
| **Site Web Intelligent** (offre #1) | `/preview-swi/a` · `/preview-swi/b` · `/preview-swi/c` | **C** |
| **Intégrateur Claude** (offre #2) | `/preview-v/integrateur-claude/a` · `/b` · `/c` | **C** |

## Pages service secondaires (2 variantes : C reco + B riche)
| Page | URLs preview | Ma reco |
|---|---|---|
| Tunnel de qualification (landing-page-scoring) | `/preview-v/landing-page-scoring/c` · `/b` | **C** |
| Maintenance & growth | `/preview-v/maintenance-growth/c` · `/b` | **C** |
| Consultant IA Claude | `/preview-v/consultant-ia-claude/c` · `/b` | **C** |
| Agents IA | `/preview-v/agents-ia/c` · `/b` | **C** |
| Content marketing intelligent | `/preview-v/content-marketing-intelligent/c` · `/b` | **C** |

## Home (2 variantes — recomposition composable, `index.astro` live intacte)
| Page | URLs preview | Ma reco |
|---|---|---|
| **Accueil** (strat 11 : 2 offres, SWI dominant 70/30) | `/preview-v/home/c` · `/preview-v/home/b` | **C** |

## Décisions de cadrage prises en autonomie (fiches nuit `~/.claude/night-sessions/2026-06-29/decisions/`)
- **0001** : variantes stockées hors `src/content/services/` (anti-parasite du glob de collection) → `src/data/swi-variants/` puis `src/data/page-variants/<page>/`.
- **0002** : route preview **générique** `/preview-v/[service]/[v]` (scale) ; SWI garde sa route dédiée validée.
- **0003** : money pages = 3 variantes (où le choix compte le plus) ; pages secondaires = 2 variantes (C+B) pour limiter la charge de revue. La variante A « sélectif » est générable à la demande sur n'importe quelle page secondaire.

## Points à ton arbitrage (au-delà du choix de variante)
- **hover-reveal-words sur la home** : skippé en home/B par contrainte de parité structurelle (miroir 13 slots avec C). Si tu le veux sur l'accueil, il faut accepter un slot dédié supplémentaire (concept « site intelligent / SEO-GEO / MCP / gouvernance »).
- **Appliquer un choix en prod** : aujourd'hui ces compositions vivent en preview. Les passer en prod = tâche dédiée (faire consommer le JSON par la page/route live ou migrer la page vers le rendu composable). À cadrer quand tu auras tranché.
- **CI Vercel rouge** = facturation GitHub Actions (compte), pas le code — cf journal de nuit.

## Reste du mandat (hors compositions, chantiers suivants)
- Migration des **templates** → `SectionsRenderer` (8 templates, 0 migré ; runbook `docs/audits/01-template-registry-migration.md` ; touche le rendu live → GF-1 par page).
- Nettoyage final des anciennes pages + sitemap (purge prudente, strat 11 = noindex réversible).
