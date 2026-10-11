// Calcul du calculateur de temps récupérable (ROI) · fonction PURE, importable côté client.
// Hypothèses (bornes, libellés, unités) et formules : src/content/outils/calculateur-roi-ia.json
// (source unique). Les formules sont ÉVALUÉES depuis le JSON, jamais réécrites ici.
import tool from '../../content/outils/calculateur-roi-ia.json';
import { evalFormula, formatToolValue } from './formula';

export const ROI_TOOL = 'calculateur-roi-ia' as const;

export interface RoiInputDef {
  key: string;
  label: string;
  type: string;
  unit: string;
  min: number;
  max: number;
  defaultValue: number;
}
export interface RoiOutputDef {
  key: string;
  label: string;
  unit: string;
  format: string;
  formula: string;
}

export const ROI_INPUTS: RoiInputDef[] = tool.inputs.map((i) => ({
  key: i.key,
  label: i.label_fr,
  type: i.type,
  unit: i.unit ?? '',
  min: i.min,
  max: i.max,
  defaultValue: i.defaultValue,
}));

export const ROI_OUTPUTS: RoiOutputDef[] = tool.outputs.map((o) => ({
  key: o.key,
  label: o.label_fr,
  unit: o.unit ?? '',
  format: o.format,
  formula: o.formula,
}));

/** Hypothèses brutes : clé d'entrée → valeur numérique. */
export type RoiInputs = Record<string, number>;

export interface RoiLine {
  key: string;
  label: string;
  unit: string;
  value: number;
  /** Valeur mise en forme (fr-FR), unité comprise. */
  text: string;
}

export interface RoiScenario {
  label: string;
  partAuto: number;
  outputs: Record<string, number>;
}

export interface RoiResult {
  tool: typeof ROI_TOOL;
  inputs: RoiInputs;
  inputLines: RoiLine[];
  outputLines: RoiLine[];
  /** Valeurs calculées par clé de sortie (heuresAn, valeurAn, plafond). */
  values: Record<string, number>;
  /** Sensibilité à la part automatisable : −20 points, base, +20 points (bornés 0 à 100). */
  scenarios: RoiScenario[];
}

/** Clé de l'hypothèse la plus incertaine, variée dans les scénarios de sensibilité. */
export const ROI_SENSITIVITY_KEY = 'partAuto';
export const ROI_SENSITIVITY_STEP = 20;

function inputText(def: RoiInputDef, v: number): string {
  return formatToolValue(v, Number.isInteger(v) ? 'integer' : 'decimal2', def.unit, 'fr');
}

function evalOutputs(inputs: RoiInputs): Record<string, number> {
  const out: Record<string, number> = {};
  for (const o of ROI_OUTPUTS) out[o.key] = evalFormula(o.formula, inputs);
  return out;
}

/** Vérifie les bornes du JSON. Renvoie la liste des clés fautives (vide = valide). */
export function roiInputErrors(inputs: Record<string, unknown>): string[] {
  const bad: string[] = [];
  for (const def of ROI_INPUTS) {
    const v = inputs[def.key];
    if (typeof v !== 'number' || !Number.isFinite(v) || v < def.min || v > def.max) bad.push(def.key);
  }
  return bad;
}

export function computeRoi(raw: RoiInputs): RoiResult {
  const bad = roiInputErrors(raw);
  if (bad.length) throw new Error(`calculateur : hypothèses hors bornes (${bad.join(', ')})`);
  const inputs: RoiInputs = {};
  for (const def of ROI_INPUTS) inputs[def.key] = raw[def.key];
  const values = evalOutputs(inputs);
  const inputLines = ROI_INPUTS.map((def) => ({ key: def.key, label: def.label, unit: def.unit, value: inputs[def.key], text: inputText(def, inputs[def.key]) }));
  const outputLines = ROI_OUTPUTS.map((o) => ({ key: o.key, label: o.label, unit: o.unit, value: values[o.key], text: formatToolValue(values[o.key], o.format, o.format === 'currency-eur' ? '' : o.unit, 'fr') }));

  const sens = ROI_INPUTS.find((d) => d.key === ROI_SENSITIVITY_KEY);
  const scenarios: RoiScenario[] = [];
  if (sens) {
    const base = inputs[sens.key];
    const variants: [string, number][] = [
      ['Prudent', base - ROI_SENSITIVITY_STEP],
      ['Vos hypothèses', base],
      ['Favorable', base + ROI_SENSITIVITY_STEP],
    ];
    for (const [label, v] of variants) {
      const p = Math.min(sens.max, Math.max(sens.min, v));
      scenarios.push({ label, partAuto: p, outputs: evalOutputs({ ...inputs, [sens.key]: p }) });
    }
  }
  return { tool: ROI_TOOL, inputs, inputLines, outputLines, values, scenarios };
}
