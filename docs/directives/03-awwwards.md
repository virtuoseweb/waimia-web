# 44 · Directive finale Awwwards (Simon, 2026-06-11 10:40)

> Références visuelles committées : `docs/visual-audit/references/ref-finance-compta.png` (page secteur cible) et `ref-offre-deploiement.png` (page offre cible). Ces 2 maquettes SONT la direction design : s'y conformer.

## Demandes (verbatim condensé)

1. **Bibliothèque trop pauvre** : ce qui a été fait pour les héros (variantes, dark) doit l'être pour CHAQUE catégorie ; pas assez de variantes par type.
2. **Espacements + alignements cohérents sur chaque template** ; recomposer les mises en page (templates) comme la home l'a été.
3. **Copywriting** à améliorer page par page ; contenu ajouté si besoin ; images ajoutées.
4. **Typo** : encore trop de h2/h3 en Instrument Serif sur des PHRASES ENTIÈRES. Serif = QUELQUES MOTS d'emphase max (docs/41, jamais exécuté en transverse).
5. **Sections manquantes** : caractéristiques, optimisation GEO/SEO, conversion, réassurance (testimonials, certifications, récompenses), variation comme la home.
6. **Images** : habiller davantage, stylisées AU BON ENDROIT dans des blocs de section composés, pas « en mode brut » (le media-block pleine largeur actuel des cas est l'anti-exemple).

## Patterns des maquettes à cataloguer/répliquer

ref-finance-compta (secteur) : hero 2 col (fait) · « Pourquoi ça bloque » 3 colonnes numérotées 01/02/03 · « Workflows clés » table éditoriale (agent / modèle / impact chiffré accent) · « L'impact chiffré » bandeau 4 métriques massives · « Un cas concret » carte INK avec image + métriques latérales + citation barre accent · « Où en êtes-vous ? » auto-diagnostic 5 stades (cards cliquables, stade actif accent) · « Stack » grid 2 rangées (modèles + infra avec tags) · CTA ink « Votre équipe finance, augmentée ».
ref-offre-deploiement (offre) : hero INK · proof-bar 3 métriques (12% / 87% / 2,4h) · « Méthode Waimia » 4 phases numérotées · « Livrables » grid 6 cards avec tag méta · témoignage chiffré + 4 métriques · « Stack » chips · « Aller plus loin » 3 services liés · CTA ink « Prêt à déployer ? » · **bandeau confiance footer : Partenaire Anthropic · Claude Certified Architect · expert IA · AI Act ready · RGPD · ISO 27001** (réassurance).

## Exécution (vagues, coordination ORCH-STATE)

W1 typo-serif transverse (docs/41, global.css + composants, paired computed) · W2 gap-analysis maquettes vs catalogue → types manquants (diagnostic-stages, case-spotlight-ink, trust-band certifications, testimonial-metrics, deliverables-grid…) + variantes par catégorie · W3 recomposition templates secteurs/offres sur le modèle des maquettes (copywriting + images habillées) · W4 images en blocs stylisés (remplacer les media-blocks bruts) · puis variantes systématiques par catégorie, GF-1 prod à chaque batch.

---

## Addendum 2026-06-20 · Direction raffinée + méthode de composition (Simon, verbatim condensé)

### A. Cible de qualité (non négociable une fois tous les chantiers au vert)
Niveau **awwwards** : registre d'une agence créative de création de site, pas d'un thème. Mais **côté classique-moderne d'un cabinet de conseil qui inspire confiance** : pas de gadget. Inspirations : **Linear, Stripe, Anthropic, OpenAI, Apple**. Langage visuel : **minimalisme + éditorial tech + swiss** (grille, hiérarchie typographique forte, blanc maîtrisé) + **animations/effets subtils** qui cassent la monotonie éditoriale → site **narratif/immersif qui donne envie de scroller**, où l'effet **sert le contenu** (jamais décoratif gratuit).

### B. Méthode de composition OBLIGATOIRE (correction Simon · anti-réductionnisme)
**Interdit** : la règle uniforme appliquée sans réflexion (« tout est à gauche donc on aligne tout à gauche », « tout centré ») = réducteur et irréfléchi. **Interdit aussi** : focaliser l'analyse sur le hero et survoler le reste.
**Obligatoire** : passer **chaque section au crible**, pour elle-même ET dans la page, sur 4 axes :
1. **Philosophie** : que fait cette section (accroche / preuve / respiration / différenciation / climax / réassurance) ?
2. **Chronologie** : où arrive-t-elle dans le parcours de lecture (ouverture, montée, plateau, bascule, clôture) ?
3. **Rythme** : alterne-t-elle avec ses voisines (densité, fond ink/paper, pleine largeur vs colonnes, statique vs animé) ou crée-t-elle une monotonie / un doublon de traitement ?
4. **Hiérarchie** : alignement (gauche/centré), poids typo, place du CTA → décidés **par le rôle de la section**, harmonisés à l'échelle de la page, pas par recette globale.
Le livrable de cette méthode = une **doctrine de composition par section** (table : section · rôle · traitement visuel · alignement · animation) avant toute exécution.

### C. Enrichir SANS enterrer (catalogue à deux étages)
Tout travail de design **enrichit** le catalogue, il **n'enterre jamais** les socles solides déjà livrés. On garde **deux étages** par famille :
- **Standard / classique** : la section sobre et fiable (déjà en prod) — reste disponible.
- **Créative / immersive** : une ou plusieurs **variantes travaillées** (déclinaisons) ajoutées via le DS (4 touchpoints + DS Studio, variables figées). On **compose** la page en piochant l'étage adapté au rôle du slot (créatif aux climax, classique aux respirations).

### D. Animations / effets = chantier réel, pas encore livré
Les effets type **Container Expansion** (une section démarre en carte/conteneur encadré, puis au scroll s'agrandit, marges qui se réduisent, bordures/radius qui s'effacent jusqu'à occuper le viewport — pour sections immersives, études, cas, blocs narratifs) **existent techniquement mais sont aujourd'hui trop subtils / non câblés** sur le flagship → ils relèvent du chantier design, ce n'est pas un bug. Système d'animation à concevoir comme **primitives réutilisables** (scroll-driven reveal, expansion, parallax léger), respect `prefers-reduced-motion`, jamais one-off. Skills à mobiliser : front-end-design, ui-ux-pro-max, et les plugins d'animation (motion-framer, animejs, scroll-reveal, locomotive-scroll, lightweight-3d-effects).

### E. Contraintes de conversion + SEO/GEO
Page **impactante mais pas trop longue** : astuces UI/UX (progressive disclosure, ancrage, condensation visuelle) pour réduire la longueur perçue **sans amputer** la matière nécessaire à la conversion ni au SEO/GEO (contenu indexable préservé, `direct-answer` et FAQ conservés).

### F. Séquencement proposé (à valider avec Simon)
1. **Illustrations** (manifeste 11 §5.5, 28 visuels, top 8) : habiller d'abord — c'est le manque visuel n°1 et un prérequis pour juger la composition.
2. **Doctrine de composition section-par-section** (méthode B) sur le flagship + DA/motion language (réf Linear/Stripe/Anthropic).
3. **Variantes créatives** ajoutées au catalogue (étage créatif, méthode C) + recomposition du flagship.
4. **Polish awwwards** : rythme global, micro-interactions, Container Expansion aux bons slots, GF-1 section-par-section.

### G. Signal de composition repéré 2026-06-20 (flagship `integrateur-claude`)
Sur les 19 slots : `versus-competitors` **2×** (slots 4 et 12) et `related-cards-band` **2×** (slots 11 et 15). À trancher dans la doctrine B : répétition intentionnelle (deux angles de différenciation distincts) ou monotonie à dédoublonner / différencier de traitement.
