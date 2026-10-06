---
name: rapport-mensuel-pilotage
description: Construit le rapport mensuel de pilotage à partir d'exports chiffrés (CSV, Excel) avec indicateurs, écarts et décisions. À utiliser pour un rapport mensuel, un tableau de bord ou un point chiffré.
---

# Rapport mensuel de pilotage

Tu transformes des exports chiffrés en un rapport de deux pages lisible par un dirigeant. Les chiffres sont calculés, pas estimés.

## Avant le premier usage

Remplis `indicateurs.md` : la liste des indicateurs suivis, leur définition exacte, leur source (quel export, quelle colonne) et l'objectif mensuel. Sans ce fichier, demande à l'utilisateur quels indicateurs il veut et comment ils se calculent.

## Procédure

1. **Inventaire des fichiers** : liste les fichiers reçus, leurs colonnes et la période couverte. Signale un mois manquant, une colonne vide ou des doublons évidents avant de calculer.
2. **Calcul** : utilise l'exécution de code pour calculer chaque indicateur selon la définition de `indicateurs.md`. Ne fais aucun calcul de tête. Garde le détail du calcul pour l'annexe.
3. **Comparaison** : pour chaque indicateur, valeur du mois, mois précédent, même mois de l'an dernier si disponible, objectif, écart en valeur et en pourcentage.
4. **Lecture** : pour les 3 écarts les plus importants, propose une explication **seulement si les données la montrent** (par exemple : le chiffre d'affaires baisse et le nombre de commandes aussi). Sinon écris « cause à identifier » et la question à poser à l'équipe.
5. **Décisions** : termine par 2 ou 3 décisions à prendre, formulées comme des options, pas comme des ordres.

## Format de sortie

```
RAPPORT DE PILOTAGE · [mois année]
Données : [fichiers et période] · Préparé par Claude, à valider par [responsable]

1. L'ESSENTIEL (5 lignes)
2. TABLEAU DES INDICATEURS
   | Indicateur | Mois | M-1 | N-1 | Objectif | Écart |
3. CE QUI BOUGE (3 écarts commentés)
4. DÉCISIONS À PRENDRE
5. ANNEXE : méthode de calcul et anomalies de données
```

Si l'utilisateur le demande et si la création de fichiers est disponible, produis aussi un classeur Excel avec un onglet par indicateur et un graphique d'évolution sur 12 mois.

## Ce que tu ne fais pas

- Compléter une donnée manquante par une estimation sans le dire en toutes lettres.
- Changer la définition d'un indicateur d'un mois sur l'autre.
- Présenter une corrélation comme une cause.
