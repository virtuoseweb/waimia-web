// Waimia · Atelier · BuilderApp (#39, brick B6) : Context React du coeur editeur.
//
// Point d'accroche UNIQUE pour les bricks voisines : le picker (B5) et l'inspecteur (B7) lisent
// l'etat et declenchent les actions via `useBuilder()`, sans connaitre le reducer ni recevoir de
// props. `<BuilderApp>` (BuilderApp.tsx) monte le Provider ; tout composant descendant peut donc
// consommer le meme document. `useBuilderOptional()` sert aux composants qui peuvent aussi vivre
// hors builder (retourne null au lieu de lever).
//
// 0 token DS, 0 valeur en dur, 0 tiret cadratin U+2014.

import { createContext, useContext } from 'react';
import type { BuilderContextValue } from './types';

/** Context du builder. `null` par defaut : consommer hors Provider est une erreur de cablage. */
export const BuilderContext = createContext<BuilderContextValue | null>(null);

/** Accede au Context du builder ; leve si utilise hors de `<BuilderApp>` (cablage manquant). */
export function useBuilder(): BuilderContextValue {
  const value = useContext(BuilderContext);
  if (!value) {
    throw new Error('useBuilder() doit etre utilise a l\'interieur de <BuilderApp>.');
  }
  return value;
}

/** Variante tolerante : retourne null hors Provider (composants montables des deux cotes). */
export function useBuilderOptional(): BuilderContextValue | null {
  return useContext(BuilderContext);
}
