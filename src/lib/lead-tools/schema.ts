// Validation stricte du champ `result` de POST /api/lead-magnet (serveur uniquement : zod ne
// doit pas partir dans le bundle client). Ids de questions, barème et bornes dérivés des
// sources (src/data/diagnostic-maturite-ia.ts, src/content/outils/calculateur-roi-ia.json).
import { z } from 'zod';
import { dimensions } from '../../data/diagnostic-maturite-ia';
import { DIAGNOSTIC_TOOL } from './diagnostic';
import { ROI_INPUTS, ROI_TOOL } from './roi';

const answersShape: Record<string, z.ZodNumber> = {};
for (const d of dimensions) {
  for (const q of d.questions) {
    const values = q.options.map((o) => o.value);
    answersShape[q.id] = z.number().int().min(Math.min(...values)).max(Math.max(...values));
  }
}

const inputsShape: Record<string, z.ZodNumber> = {};
for (const def of ROI_INPUTS) {
  inputsShape[def.key] = z.number().min(def.min).max(def.max);
}

export const LeadToolPayloadSchema = z.discriminatedUnion('tool', [
  z.object({ tool: z.literal(DIAGNOSTIC_TOOL), answers: z.object(answersShape).strict() }).strict(),
  z.object({ tool: z.literal(ROI_TOOL), inputs: z.object(inputsShape).strict() }).strict(),
]);
