// Calcul du diagnostic de maturité IA · fonction PURE (sans zod, sans DOM), importée par la
// page (script de MaturityDiagnostic), par l'API (recalcul serveur), le PDF et les e-mails.
// Barème, niveaux et libellés : src/data/diagnostic-maturite-ia.ts (source unique, rien en dur).
import { dimensions, levels, MAX_SCORE, type DiagDimension, type DiagLevel } from '../../data/diagnostic-maturite-ia';

export const DIAGNOSTIC_TOOL = 'diagnostic-maturite-ia' as const;

/** Réponses brutes : id de question → indice de l'option choisie (0 à 3). */
export type DiagnosticAnswers = Record<string, number>;

export interface DiagnosticQuestionResult {
  id: string;
  /** Numéro affiché (1 à 10, dans l'ordre du questionnaire). */
  n: number;
  text: string;
  value: number;
  answer: string;
}

export interface DiagnosticDimensionResult {
  key: DiagDimension['key'];
  name: string;
  why: string;
  advice: string;
  link: DiagDimension['link'] | null;
  score: number;
  max: number;
  questions: DiagnosticQuestionResult[];
}

export interface DiagnosticResult {
  tool: typeof DIAGNOSTIC_TOOL;
  answers: DiagnosticAnswers;
  total: number;
  max: number;
  level: DiagLevel;
  levels: DiagLevel[];
  dims: DiagnosticDimensionResult[];
  /** Dimension la plus faible (première en cas d'égalité, du socle vers le pilotage). */
  weak: DiagnosticDimensionResult;
}

/** Ids des questions, dans l'ordre du questionnaire. */
export const DIAGNOSTIC_QUESTION_IDS: string[] = dimensions.flatMap((d) => d.questions.map((q) => q.id));

/** Valeur maximale d'une réponse (indice de la dernière option). */
export const DIAGNOSTIC_OPTION_MAX: number = Math.max(...dimensions.flatMap((d) => d.questions.map((q) => q.options.length - 1)));

/**
 * Calcule le résultat depuis les réponses brutes. Lève une erreur si une réponse manque ou
 * sort du barème : l'appelant valide d'abord (schéma serveur, formulaire complet côté client).
 */
export function computeDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  let total = 0;
  let n = 0;
  const dims: DiagnosticDimensionResult[] = dimensions.map((d) => {
    const questions = d.questions.map((q) => {
      n += 1;
      const value = answers[q.id];
      const opt = q.options.find((o) => o.value === value);
      if (!Number.isInteger(value) || !opt) throw new Error(`diagnostic : réponse invalide pour ${q.id}`);
      return { id: q.id, n, text: q.text, value, answer: opt.label };
    });
    const score = questions.reduce((acc, q) => acc + q.value, 0);
    const max = d.questions.reduce((acc, q) => acc + Math.max(...q.options.map((o) => o.value)), 0);
    total += score;
    return { key: d.key, name: d.name, why: d.why, advice: d.advice, link: d.link ?? null, score, max, questions };
  });
  const level = levels.find((l) => total >= l.min && total <= l.max);
  if (!level) throw new Error(`diagnostic : aucun niveau pour le score ${total}`);
  // Même règle qu'à l'écran depuis l'origine : tri stable, premier minimum dans l'ordre des dimensions.
  const weak = dims.slice().sort((x, y) => x.score - y.score)[0];
  const clean: DiagnosticAnswers = {};
  for (const id of DIAGNOSTIC_QUESTION_IDS) clean[id] = answers[id];
  return { tool: DIAGNOSTIC_TOOL, answers: clean, total, max: MAX_SCORE, level, levels, dims, weak };
}
