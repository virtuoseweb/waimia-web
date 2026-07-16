---
route: /cas-usages/generer-plus-de-leads
verdict: AMÉLIORER
title_actuel: "Générer plus de leads · transformer son site en machine à qualifier"
kw_cible: "générer plus de leads / transformer son site en machine à leads"
date: 2026-07-16
---

# /cas-usages/generer-plus-de-leads — AMÉLIORER

Source : `src/content/cas-usages/generer-plus-de-leads.json` · rendu composable (`[...slug].astro`). `category: acquisition`.

## 1. Identité
- Title `:title_fr` : « Générer plus de leads · transformer son site en machine à qualifier ». kw-first outcome, bon.
- Description : « …Montpellier. » (suffixe local partagé par les 5, cf §2 near-dup).
- Intention : problème/exploration (« mon site ne convertit pas »). Rôle : porte d'entrée problème du silo acquisition, route vers le système.

## 2. Contenu
- **Angle réellement problème-first** (bien différencié du service) : hero lede « Votre site reçoit des visites mais le téléphone ne sonne pas… le vrai sujet n'est pas d'attirer plus, c'est de capter et qualifier » ; zigzags « Là où les leads fuient » / « Une chaîne de conversion sans fuite » ; comparison-duo « Du trafic perdu au lead qualifié ». Voix anti-théâtre respectée.
- **Near-duplicate de gabarit (les 5 cas-usages)** : squelette identique (`hero-split-media` → 2× `feature-zigzag` → `bento-grid` → `comparison-duo` → `author-byline` → `related-cards-band` → `faq-accordion` → `footer-cta-band`), même `publishedAt`/`updatedAt` (2026-06-26), même suffixe « Montpellier. » en description, 7 FAQ chacune. Le contenu diffère (angles distincts), mais la structure et les métadonnées sont clonées : Google peut lire un template dupliqué.

## 3. SEO on-page
- H1 kw-first (vérifié HTML : « Générer plus de leads. »). Conforme doctrine (pas de « système X »).
- **Cannibalisation à surveiller** vs `/services/systeme-acquisition` (kw map `strategy/14:27` = « générer des leads B2B qualifiés ») et `/services/landing-pages-tunnels`, `/services/crm-scoring-routing`. Le kw « générer des leads » est partagé. Mitigation en place (intent différent + mesh, cf §4), mais l'overlap SERP est réel : à monitorer en GSC.

## 4. Maillage interne
- **Mesh services verrouillé (bon)** : la section `related-links` (helper `meshForCasUsage`, `internal-mesh.ts:363`) rend « Voir le système → » vers `/services/systeme-acquisition`, `/services/landing-pages-tunnels`, `/services/crm-scoring-routing` (vérifié HTML servi). Problème → solution explicite. C'est l'architecture voulue (`strategy/14:105`).
- Un lien blog entrant existe (`cabler-son-crm-en-10-jours.mdx:68` → ce cas-usage). Bien.

## 5. Balisage
- **Bug : FAQPage dupliqué.** HTML servi = **2 blocs `"@type":"FAQPage"` / 14 Question / 14 Answer** pour 7 FAQ réelles. Cause : le router émet `buildFAQPage(data.faq)` (`[...slug].astro:56`) ET le composant `FaqAccordion.astro:9` génère son propre FAQPage. Double déclaration sur les 5 cas-usages → risque d'être ignoré/pénalisé par Google. Sinon `Article` + `BreadcrumbList` OK, canonical vérifié.

## 6. Conversion
- CTA contextuel : `/contact?intent=leads` présent (vérifié HTML) + `footer-cta-band`. Cohérent et tracé. Bon.

## 7. Verdict + actions
**AMÉLIORER.**
1. **Dédupliquer le FAQPage** (bug commun aux 5) : émettre le JSON-LD FAQPage à UN seul endroit. Soit désactiver l'auto-émission de `FaqAccordion.astro` quand le router fournit déjà `faqLd`, soit retirer `buildFAQPage` du router. Fichiers : `src/pages/cas-usages/[...slug].astro:56` + `src/components/sections/FaqAccordion.astro:9`.
2. Différencier les métadonnées du gabarit partagé : varier `publishedAt`/`updatedAt` réels et retirer le suffixe mécanique « Montpellier. » identique sur les 5 descriptions (ou le contextualiser).
3. Surveiller la cannibalisation GSC vs `/services/systeme-acquisition` ; garder ce cas strictement en angle problème (ne pas glisser vers du discours de vente service).
