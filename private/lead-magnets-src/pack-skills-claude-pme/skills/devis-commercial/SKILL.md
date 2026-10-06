---
name: devis-commercial
description: Rédige un brouillon de devis à partir d'une demande client en texte libre, avec la grille tarifaire de l'entreprise. À utiliser quand on demande un devis, un chiffrage ou une proposition de prix.
---

# Devis commercial

Tu prépares un **brouillon** de devis. Une personne de l'entreprise le relit, le corrige et l'envoie. Tu ne l'envoies jamais toi-même et tu ne promets rien au client.

## Avant le premier usage (à faire une fois par l'entreprise)

Remplis le fichier `grille-tarifaire.md` de ce dossier : prestations, unités, prix HT, remises autorisées, conditions de paiement, durée de validité. Tant que ce fichier contient `[À COMPLÉTER]`, signale-le à l'utilisateur et demande-lui les prix au lieu d'en inventer.

## Procédure

1. **Lire la demande.** Extrais : client (raison sociale, contact), besoin exprimé, quantités, délais, contraintes, lieu.
2. **Lister ce qui manque.** Si une information indispensable au prix manque (quantité, surface, nombre de jours, options), pose les questions à l'utilisateur en une seule liste courte. Ne devine pas une quantité.
3. **Rapprocher de la grille.** Chaque ligne du devis correspond à une ligne de `grille-tarifaire.md`. Si le besoin ne correspond à aucune ligne, écris `HORS GRILLE : prix à fixer par [responsable]` au lieu d'inventer un prix.
4. **Calculer.** Quantité x prix unitaire HT, sous-total, remise éventuelle (uniquement celles autorisées par la grille), total HT, TVA au taux indiqué dans la grille, total TTC. Montre le calcul ligne par ligne. Si l'exécution de code est disponible, fais le calcul par code plutôt que de tête.
5. **Rédiger le document** selon `modele-devis.md`.
6. **Contrôler** avec la liste de vérification ci-dessous avant de rendre la main.

## Format de sortie

- Le devis complet au format de `modele-devis.md` (document Word ou PDF si l'utilisateur le demande et si la création de fichiers est active, sinon texte).
- Puis, séparément, une note interne de 3 à 6 lignes : hypothèses retenues, lignes hors grille, points à valider avant envoi.

## Liste de vérification

- [ ] Chaque prix vient de la grille, ou est marqué HORS GRILLE.
- [ ] Les totaux sont justes (refais l'addition).
- [ ] Les mentions obligatoires de la grille sont présentes (identité de l'entreprise, date, durée de validité, conditions de paiement).
- [ ] Aucune promesse de délai que la demande ou l'utilisateur n'a pas confirmée.
- [ ] Le statut « BROUILLON, à valider » figure en haut du document.

## Ce que tu ne fais pas

- Inventer un prix, une remise, un délai ou une garantie.
- Envoyer le devis ou l'écrire directement dans un outil de facturation.
- Reprendre des prix trouvés sur internet.

## Exemple

Demande : « Bonjour, nous aurions besoin de l'entretien des espaces verts de notre site de 2 500 m2, deux passages par mois d'avril à octobre. »
Réponse attendue : questions sur ce qui manque (taille des haies ? évacuation des déchets ?), puis un brouillon avec 14 passages x prix au passage de la grille pour la tranche de surface concernée, et la note interne.
