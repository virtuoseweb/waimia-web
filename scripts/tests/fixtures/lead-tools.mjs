/**
 * Fixtures des deux outils gratuits (diagnostic de maturité IA, calculateur ROI) : réponses
 * BRUTES, comme la page les envoie. Partagées par le test et le script de rendu des preuves.
 */
const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
const all = (v) => Object.fromEntries(ids.map((id) => [id, v]));

export const DIAG = {
  faible: { tool: 'diagnostic-maturite-ia', answers: all(0) },
  moyen: { tool: 'diagnostic-maturite-ia', answers: { q1: 2, q2: 1, q3: 2, q4: 1, q5: 2, q6: 2, q7: 1, q8: 2, q9: 2, q10: 1 } },
  fort: { tool: 'diagnostic-maturite-ia', answers: all(3) },
  // Niveau 2, point faible « Compétences » (seule dimension sans lien de ressource).
  competences: { tool: 'diagnostic-maturite-ia', answers: { ...all(1), q5: 0, q6: 0 } },
  // q2 = 0 et q1 = 0 : la plus faible est « Données » (égalités tranchées dans l'ordre).
  egalite: { tool: 'diagnostic-maturite-ia', answers: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 3, q6: 3, q7: 3, q8: 3, q9: 3, q10: 3 } },
};

export const ROI = {
  faible: { tool: 'calculateur-roi-ia', inputs: { heuresTaches: 4, semaines: 40, tauxHoraire: 30, partAuto: 15, coutMensuel: 200 } },
  moyen: { tool: 'calculateur-roi-ia', inputs: { heuresTaches: 20, semaines: 46, tauxHoraire: 50, partAuto: 50, coutMensuel: 0 } },
  fort: { tool: 'calculateur-roi-ia', inputs: { heuresTaches: 120, semaines: 47, tauxHoraire: 65, partAuto: 90, coutMensuel: 900 } },
  zero: { tool: 'calculateur-roi-ia', inputs: { heuresTaches: 0, semaines: 1, tauxHoraire: 0, partAuto: 0, coutMensuel: 0 } },
  maxima: { tool: 'calculateur-roi-ia', inputs: { heuresTaches: 2000, semaines: 52, tauxHoraire: 500, partAuto: 100, coutMensuel: 100000 } },
};

/** Adresse longue (200 caractères) pour éprouver la couverture. */
export const LONG_EMAIL = `${'prenom.nom.tres-long-'.repeat(8).slice(0, 180)}@exemple-entreprise.fr`.slice(0, 200);
