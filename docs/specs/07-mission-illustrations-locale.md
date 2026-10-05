# 07 · Mission locale : générer les illustrations Waimia (GPT) et remplacer les visuels génériques

> À lancer dans une session **Claude Code locale** (ou cloud avec `api.openai.com` autorisé +
> `OPENAI_API_KEY`), sur le repo `virtuoseweb/waimia-web`. Le skill
> `.claude/skills/waimia-illustration/SKILL.md` contient la méthode complète ; ce document
> est le brief de mission à coller tel quel.

## Prompt à coller

```text
Mission : illustrations Waimia. Lis .claude/skills/waimia-illustration/SKILL.md et applique-le.
Branche : feat/illustrations-gen (depuis main). Clé GPT : OPENAI_API_KEY ou .env.openai
(ou délègue l'exécution de scripts/illustrations/generate.mjs à `codex exec` si la clé n'est
que dans Codex).

1. Vérifie l'accès : node scripts/illustrations/generate.mjs test-acces "a tiny figure
   standing in front of a huge simple door" --palette duotone --no-ink --attempts 1,
   ouvre le WebP, puis supprime le fichier test.
2. Génère le lot 1 (tableau ci-dessous) : duotone ou tritone selon la colonne, variantes
   paper + ink. Contrôle visuel de CHAQUE fichier (Read). Enregistre avec
   add-illustration.mjs (alt FR/EN honnêtes, 3 à 6 tags).
3. Remplace les illustrations surutilisées : dans src/content/services/**, les
   media_src super-girl-ink / band-showing-tv-ink / fruits-ink / car-on-the-road-paper
   sont répétés sur ~18 pages. Pour chaque page, remplace par l'illustration du lot 1 dont
   les tags collent au texte du bloc (une même illustration au plus 3 fois sur le site,
   jamais 2 fois sur une page). Mets à jour media_alt_fr / media_alt_en.
4. Guide /ressources/guides/claude-pme : remplace les 11 illustrations réutilisées des
   blocs « cas d'usage » et « prérequis » par les illustrations dédiées du lot 1
   (lignes marquées « guide »).
5. Valide : astro check (0 errors), build (Complete!), capture Playwright de 3 pages
   modifiées + le guide. Commit (WebP + src/data/illustrations.json + JSON modifiés),
   push, PR draft. Ne commite jamais .illustrations-tmp/ ni la clé.
```

## Lot 1 : sujets proposés

| slug | palette | page(s) cible | sujet (EN, à passer à generate.mjs) | tags |
|---|---|---|---|---|
| `redaction-premier-jet` | duotone | guide (cas 01) | A small office worker sits at a desk while a giant fountain pen writes long flowing lines across a huge blank sheet that unrolls toward the horizon. Dark desk and figure, light paper. | redaction,contenu,ia,assistant |
| `synthese-entonnoir` | duotone | guide (cas 02) | A tall pile of documents pours into a large funnel; three small clean cards come out at the bottom into the hand of a figure in a suit. Dark funnel, light pages. | synthese,documents,reunion,decision |
| `support-guichet` | tritone | guide (cas 03), services support | A tiny figure at a vintage service counter hands a card to a customer; behind the counter a large flat sky-blue window. Blue = the window. | support,relation-client,sav,assistance |
| `extraction-tamis` | duotone | guide (cas 04), cas-usages finance | A figure shakes a giant sieve over messy paper scraps; neat rectangular blocks fall into orderly rows below. | extraction,donnees,factures,comptabilite |
| `mcp-prises` | tritone | guide (cas 05), guide MCP | A huge wall of vintage switchboard sockets; a small operator plugs long cables linking separate machines. The cables are sky blue, everything else terracotta. | mcp,integration,outils,automatisation |
| `donnees-pile-unique` | duotone | guide (prérequis 01), centraliser-donnees | Paper sheets blowing across a vast empty plain converge into one tall neat stack, a tiny figure stacking the last sheet. | donnees,centralisation,organisation |
| `securite-cloture` | duotone | guide (prérequis 02) | A small team works inside a wide circle drawn by a low fence with an open gate, a large calm field around. | securite,confidentialite,cadre,gouvernance |
| `formation-tableau` | duotone | guide (prérequis 04), formations | A teacher figure points at a giant blank board while a row of small figures in suits takes notes. | formation,equipe,atelier,adoption |
| `mesure-balance` | tritone | guide (prérequis 05), calculateur ROI | A huge vintage scale: hours as hourglasses on one side, a single sky-blue clock face on the other, a figure reading the needle. | roi,mesure,temps,gain |
| `gouvernance-chef-orchestre` | duotone | guide (prérequis 06) | A conductor figure on a small podium in front of rows of desks arranged in perfect lines, each with a tiny worker. | gouvernance,pilotage,organisation,methode |
| `crm-fil-rouge` | duotone | services CRM, systeme-commercial | A single thread runs from a mailbox through a row of doors to a handshake, small figures following it. | crm,pipeline,suivi,commercial |
| `relance-boomerang` | tritone | relance-devis, sequences-de-suivi | A figure throws a large paper boomerang shaped like an envelope across a sky-blue sky; it curves back toward a waiting hand. | relance,suivi,email,devis |
| `seo-phare` | tritone | seo-geo-contenu, referencement-ia | A lighthouse on a cliff, its beam (sky blue) sweeping over a dark sea where tiny boats turn toward it. | seo,visibilite,geo,referencement |
| `site-chantier` | duotone | site-web-ia/* | Builders in suits assemble a giant flat browser window frame like scaffolding, one placing the last pane. | site,web,construction,refonte |
| `pub-porte-voix` | duotone | publicite-en-ligne | A tiny figure speaks into a giant vintage megaphone; concentric arcs ripple across a crowd. | publicite,acquisition,audience,campagne |
| `prospection-pecheur` | tritone | prospection-automatisee | A fisherman on a small boat casts a long line into sky-blue water full of tiny envelopes. | prospection,leads,cold-email,b2b |

## Critères d'acceptation

- [ ] 16 illustrations × 2 variantes, toutes `palette-check` ✓ et contrôlées visuellement.
- [ ] `src/data/illustrations.json` à jour (alt FR/EN, tags, palette).
- [ ] Plus aucune illustration présente > 3 fois sur le site, jamais 2 fois sur une page.
- [ ] `astro check` 0 errors, `build` Complete!, captures Playwright jointes à la PR.
