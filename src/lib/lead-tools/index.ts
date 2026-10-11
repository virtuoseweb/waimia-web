// Contrat de données des deux outils gratuits (diagnostic de maturité IA, calculateur ROI).
// Module PUR (aucune dépendance serveur) : la page l'importe pour calculer, l'API pour
// recalculer depuis les réponses brutes, le PDF et les e-mails pour restituer.
// Validation stricte (zod) : ./schema.ts, côté serveur uniquement.
import { computeDiagnostic, DIAGNOSTIC_TOOL, type DiagnosticAnswers, type DiagnosticResult } from './diagnostic';
import { computeRoi, ROI_TOOL, type RoiInputs, type RoiResult } from './roi';

export * from './diagnostic';
export * from './roi';
export { evalFormula, formatToolValue } from './formula';

export type LeadToolId = typeof DIAGNOSTIC_TOOL | typeof ROI_TOOL;

/** Ce que la page envoie à /api/lead-magnet (champ `result`) : réponses BRUTES, jamais un score. */
export type LeadToolPayload =
  | { tool: typeof DIAGNOSTIC_TOOL; answers: DiagnosticAnswers }
  | { tool: typeof ROI_TOOL; inputs: RoiInputs };

export type LeadToolResult = DiagnosticResult | RoiResult;

export function computeLeadTool(payload: LeadToolPayload): LeadToolResult {
  return payload.tool === DIAGNOSTIC_TOOL ? computeDiagnostic(payload.answers) : computeRoi(payload.inputs);
}

/** Libellé court de l'outil (objet d'e-mail, alerte interne). */
export const LEAD_TOOL_LABEL: Record<LeadToolId, string> = {
  [DIAGNOSTIC_TOOL]: 'diagnostic maturité IA',
  [ROI_TOOL]: 'calculateur ROI IA',
};
