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
