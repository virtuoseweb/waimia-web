// Validation d'un numéro de téléphone saisi dans un formulaire (contact).
// Volontairement permissive sur le format (espaces, points, tirets, parenthèses, « + » initial) :
// on exige seulement 9 à 15 chiffres (numéro français à 10 chiffres, international jusqu'à 15,
// norme E.164). La normalisation fine se fait à la lecture, pas à la saisie.
const ALLOWED = /^\+?[\d\s().-]+$/;

export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!ALLOWED.test(v)) return false;
  const digits = v.replace(/\D/g, '').length;
  return digits >= 9 && digits <= 15;
}
