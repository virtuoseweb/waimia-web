# 00 — Références canoniques (source unique — les autres docs CITENT, ne recopient pas)

> Anti-désync (DRY). Tout doc qui a besoin d'un de ces éléments **pointe ici** plutôt que de le
> recopier. Flag brand-review `state/04 §4`. Mettre à jour ICI uniquement.

## Positionnement (one-liner canonique)
« L'IA opérationnelle pour les PME/ETI qui veulent du concret sans payer 50 k€ de cabinet — livrée
et prouvée par un praticien, pas promise par un gourou. » Zone blanche entre **Limova** (agents
préfab 70-120 €/mois) et **ClaudIn** (consulting premium ex-McKinsey, grands comptes). Détail :
`marketing/01-positionnement-messaging §1`, `business/12-competitive-brief`.

## Offer ladder (canonique)
| Palier | Offre | Prix | Rôle |
|---|---|---|---|
| 0 | Audit quick win | **gratuit en froid / payant léger imputable en chaud** | porte d'entrée, qualif, preuve |
| 1 | Site web IA | **dès 3 000 € HT** (paliers : Essentiel 3 000 / Croissance 3 000-6 000 / Premium ~6 000-8 000) | produit d'appel, cash |
| 2 | Growth System IA | sur devis (~6 000-10 000 € HT, hyp.) | escalade acquisition/conversion |
| 3 | Agents à l'usage | facturation à l'usage (~300-800 €/mois, hyp.) | récurrent / MRR |
> Référence unique. `marketing/01 §5`, `business/06`, `business/08`, `business/11` citent ce tableau.

## Clients réels (référence E-E-A-T) — STATUT D'ACCORD À RENSEIGNER
> ⚠️ Risque légal `state/04 §5 L1` : **ne citer publiquement (decks, one-pager, site) qu'avec accord écrit.**
| Client | Type de mission | Accord écrit pour citation | Cas chiffré formalisé |
|---|---|---|---|
| Inbound Value | sous-traitance technique | [ ] à obtenir | [ ] |
| Amploi | — | [ ] à obtenir | [ ] |
| Balzeo | — | [ ] à obtenir | [ ] |
| Carnets de Montpellier | — (local) | [ ] à obtenir | [ ] |
| Desangles Peinture | — (local) | [ ] à obtenir | [ ] |
| Naturopathe (Montpellier) | — (local) | [ ] à obtenir | [ ] |
| Import-export | — | [ ] à obtenir | [ ] |
> Preuve vivante (toujours citable, c'est à Simon) : **waimia.com** + **virtuoseweb.fr** (sites IA-native).

## Faits chiffrés à manier avec prudence (brand-review `state/04 §1`)
- « Lighthouse 90-100 vs WordPress 30-60 », « plus rapide que 95 % », « 99 % ignorent le GEO » =
  **claims à étayer ou reformuler** (« souvent », « la plupart », + mesure datée en direct). Jamais
  un chiffre de brochure non sourcé sur un support écrit.
- « Citations IA en 3-6 mois » : toujours présenté comme **délai du marché**, jamais comme acquis.
- Agents facturés à l'usage = **module en chantier** : vendre « 1 mois offert », pas un MRR facturé opérable.

## Voix de marque — SIGNATURES DU MANIFESTE RÉEL (source : `src/pages/manifesto.astro`)
> Anchor canonique pour tout copy client + génération de contenu. Cadence **sèche, impérative,
> déclarative** (pas la prose dense des runbooks). Honnêteté chiffrée intégrée au texte.

**Phrases-signatures (réutiliser le vocabulaire, le ton) :**
- « **Construire du revenu, pas des démos.** » (Build revenue, not demos.)
- « des systèmes IA **livrés, mesurés, documentés**. »
- « **Pas de théâtre IA, pas de démos qui meurent en comité.** »
- « On **câble l'IA dans vos outils** marketing, sales et web : acquisition, contenu, CRM, site,
  analytics, marque. **Sans changer vos process.** »
- « **Stop répéter. Livrez.** » · « Field tested, slowly / terrain, lentement. »
- Chiffres toujours avec caveat : « ROI mesuré à 12 mois · **selon périmètre, stack et maturité d'équipe**. »
- CTA-type : « ◉ 45 minutes · **diagnostic en clair · aucune relance pénible** ».

**Promesse cœur (cadrage manifeste) :** orchestration — **câbler l'IA dans la stack existante sans
refonte des process** (marketing/sales/contenu/CRM/analytics/marque alignés). Le **site web IA** est
la **porte d'entrée tangible** du funnel, pas la promesse entière. (Cohérent `marketing/02` funnel 3-temps.)

**Règles de cadence (copy client) :** phrases courtes, verbes à l'impératif, zéro hype, zéro emoji,
un chiffre = une source ou un caveat. Si une phrase peut être coupée en deux phrases plus sèches, la couper.

**Marqueurs transverses observés (home, offres, solutions, secteurs, audit — à reproduire dans le copy) :**
- **Négation contrastive « X. Pas Y. » = la figure signature.** Ex. « Pas un site vitrine. Un site
  qui qualifie. » · « Construire du revenu, pas des démos. » · « On garde ce qui convertit, on coupe le reste. »
- **« Vous » + douleur précise et chiffrée** en ouverture : « Votre site existe depuis 5 ans. Vous ne
  savez pas combien il génère de leads. » Jamais « les entreprises » abstrait — toujours « vous ».
- **Concret/technique assumé** (les détails font la preuve) : « JSON-LD, sitemap, llms.txt, moins de
  5 cookies par page » · « branché sur votre repo. Vous lui parlez, il édite, vous validez. »
- **Fragments nominaux + séparateur « · »** pour la densité. Listes sèches plutôt que phrases molles.
- **Chiffres sobres, jamais ronflants**, toujours avec leur cadre (« sur 32 audits », « à 12 mois · selon périmètre »).
> Gabarit de bloc d'offre : *[douleur en « vous », chiffrée]* → *[X. Pas Y.]* → *[mécanisme concret]* → *[1 chiffre honnête]* → *[1 CTA sec]*.

## Identité (cohérence d'entité / GEO)
Nom : **Waimia**. Zone : **Montpellier / Occitanie**. Expertise : **site web IA-native, anthropic-first**.
Fondateur : **Simon Beros** (ex-VirtuoseWeb). À répéter à l'identique sur site + LinkedIn + Google
Business Profile + annuaires (`strategy/03 §2` GEO).
