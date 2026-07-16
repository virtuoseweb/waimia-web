# Synthèse · audit page-par-page (#50) — 2026-07-16

> 115/115 pages auditées (11 silos, hors library/preview/lab). Détail par page : [INDEX.md](INDEX.md).
> Verdicts : **20 VALIDER · 82 AMÉLIORER · 4 FUSIONNER · 9 SUPPRIMER**.

## 1. Décisions à arbitrer (Simon)

> **ARBITRÉ 2026-07-16 (Simon : « feu vert pour tout + correction bug et décision tu suis tes reco »)** : les 6 décisions A1-A6 sont approuvées selon les recos ci-dessous. Exécution : workers w-restructure (#60, A1-A6), w-content-fixes (#61, §2.9/2.10/2.12/2.14), w-services-dedup (#62, §2.13) + vague transverse #56-#59 déjà en vol. Reste en attente : nav bloat §2.11 (tâche #63, cadrage séparé).

| # | Décision | Pages | Reco |
|---|---|---|---|
| A1 | Effondrer le silo `/lp/` (9 pages noindex, squelette identique, jumelle canonique indexée pour chacune, 4 sur des slugs de services dépréciés) | 8 SUPPRIMER + 1 FUSIONNER (`lp/diagnostic-maturite-ia` : re-pointer la home vers `/ressources/diagnostics/maturite-ia` puis 301) | OUI, sauf campagne Ads active à vérifier avant (re-pointer l'annonce d'abord) |
| A2 | `/agence/about` → replier dans `/agence` (301, migrer « Faits clés » + « 4 livrables ») | 1 FUSIONNER | OUI |
| A3 | `/partenaires` → `/technologies` (301 + retrait du mega-menu `mega-menu.ts:852`) | 1 FUSIONNER | OUI |
| A4 | `/secteurs/services-b2b` → fusionner (recouvrement avec conseil/esn, cf rapport) | 1 FUSIONNER | OUI |
| A5 | `/services/template-service-ref` → sortir du routing (gabarit interne exposé) | 1 SUPPRIMER | OUI |
| A6 | `/lp/exemple-industrialisation` (client fictif « Atelier Lumière ») | déplacer sous /demonstrations ou supprimer | Supprimer |

## 2. Bugs transverses (tâches dédiées, par priorité)

1. **FAQPage JSON-LD dupliqué** : `FaqAccordion.astro:9` émet son propre bloc ET les templates appellent `buildFAQPage` → 2 blocs FAQPage par page (Q&A doublées ×2). Touche guides, 4 diagnostics, 4 comparatifs, cas-usages, pages audit-*. Fix unique dans le composant ou les templates.
2. **Outils morts** : `calculateur-roi-ia` et `score-maturite-ia` définissent `inputs/outputs/formula` en frontmatter mais `ressources/outils/[...slug].astro` (EssayTemplate) ne rend que la prose : rien ne calcule alors que les pages promettent un résultat immédiat, et c'est le point d'arrivée du funnel maturité (academy + diagnostic y renvoient). Widget à câbler.
3. **FAQ blog inertes** : `faq_fr` de 2 billets (11 Q&A) ni rendues ni en JSON-LD (`blog/[...slug].astro` ne passe pas `faq_*`, EssayTemplate sans rendu FAQ). Levier GEO n°1 inerte sur le blog.
4. **Maillage blog→money absent** : 4 billets/7 sans lien inline vers leur money page ; le pillar (5 600 mots) a 0 lien interne. Gabarit à répliquer = `cabler-son-crm-en-10-jours`.
5. **E-E-A-T cassé sur la fiche auteur** : 3 « publications » de `/equipe/simon-beros` pointent vers des 404.
6. **Home** : promesse quiz « 10 questions / résultat immédiat » pointant vers la LP statique (`index.astro:178`) ; résidu « deux offres » (`index.astro:236`).
7. **Frontmatter mort blog** : `relatedSolutions`/`relatedOffres` (collections disparues), `relatedPosts` vides, pas d'`updatedAt`.
8. **brain-circuit hardcodé hors collection** : absent du hub blog et du RSS alors que lié depuis les emails.
9. **Claims GA4** présentés comme actifs (`/technologies`, politique de confidentialité) alors que GA4 est reporté.
10. **Doctrine title** : « Site Web Intelligent » (marque, 0 demande) dans les titles des pages locales ; H1 non kw-first résiduels (webflow, maintenance-growth, hubs cas).
11. **Nav** : mega-menu → `/partenaires` (noindex voué au 301) ; nav bloat services (~83 liens/page) ; liens morts `/lab/home-d.astro:82,93` ; référence stale `page-recipes.json:38`.
12. **Cannibalisations à verrouiller** : geo-vs-seo ↔ seo-geo-contenu/referencement-ia ; SWI-vs-wordpress ↔ site-web-ia/wordpress ; clusters maturité (diagnostic+outil+academy, canonical à poser) et Claude (guide+diagnostic+integration-claude) à cadrer.
13. **Dédup copy services** : cold-email-b2b↔prospection (47 phrases), automatisation-n8n (37).
14. **JSON-LD prix** : priceRange à normaliser ; « 99€/h » relevé dans un JSON-LD vs 100 €/h canonique.

## 3. Pages modèles (référence pour les réécritures)

- Service : `site-web-ia`, `seo-geo-contenu`, `integration-claude` (VALIDER).
- Cas client : `balzeo`, `les-carnets-de-montpellier`.
- Billet : `cabler-son-crm-en-10-jours` (voix + maillage).
- Comparatif GEO : `claude-code-vs-cursor`, `claude-vs-chatgpt-pme`.
- Confiance : `methode`, `expertise-claude`, `sources-methodologie`.

## 4. Cadence éditoriale (boucle contenu waimia-seo)

Prochains billets à faire naître avec money page cible en frontmatter + 2-3 liens inline (gabarit cabler-son-crm) : prospection-automatisee (cold email/délivrabilité), integration-claude (déploiement Claude PME), site-web-ia, landing-pages-tunnels.
