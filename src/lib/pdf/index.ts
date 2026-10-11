// Rapports PDF des outils gratuits. Point d'entrée serveur : le résultat est TOUJOURS
// recalculé depuis les réponses brutes (src/lib/lead-tools) avant d'arriver ici.
import type { LeadToolResult } from '../lead-tools';
import { renderDiagnosticPdf, DIAGNOSTIC_PDF_FILENAME } from './diagnostic';
import { renderRoiPdf, ROI_PDF_FILENAME } from './roi';
import type { ReportContext } from './kit';

export { renderDiagnosticPdf, renderRoiPdf };
export type { ReportContext };

export async function renderLeadToolPdf(res: LeadToolResult, ctx: ReportContext): Promise<{ bytes: Uint8Array; filename: string }> {
  if (res.tool === 'diagnostic-maturite-ia') {
    return { bytes: await renderDiagnosticPdf(res, ctx), filename: DIAGNOSTIC_PDF_FILENAME };
  }
  return { bytes: await renderRoiPdf(res, ctx), filename: ROI_PDF_FILENAME };
}
