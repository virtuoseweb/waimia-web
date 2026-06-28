// Waimia · Vague C2-A · Contrat de slots (G1)
//
// Module typé qui expose le contrat de contenu de chaque section, DÉRIVÉ DU ZOD
// (`src/schemas/sections.ts`) par `scripts/derive-section-slots.mjs` → la donnée de
// build commitée `section-slots.generated.json`.
//
// But IA-opérable : un agent peut lire, pour un `SectionType` donné, la liste des
// champs (slots), savoir lesquels sont du CONTENU (à remplir) vs de la PRÉSENTATION
// (axes de rendu), leur type, s'ils sont requis, bilingues, et la forme des items
// pour les tableaux/objets.
//
// Régénérer : `npx tsx scripts/derive-section-slots.mjs`.

import type { SectionType } from '../schemas/sections';
import slotsData from './section-slots.generated.json';

/** Nature d'un slot : contenu éditorial à remplir, ou axe de rendu. */
export type SlotKind = 'content' | 'presentation';

/** Type logique d'un slot, normalisé depuis le schéma Zod. */
export type SlotType =
  | 'text'
  | 'richtext'
  | 'image'
  | 'url'
  | 'enum'
  | 'array'
  | 'bool'
  | 'number'
  | 'object';

/**
 * Forme d'un item (pour les slots `array` d'objets ou les slots `object`). Sous-
 * ensemble d'un SectionSlot : pas de `kind` (la nature est portée par le slot parent).
 */
export interface SlotItemField {
  field: string;
  type: SlotType;
  required: boolean;
  bilingual?: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  itemShape?: SlotItemField[];
}

/** Un slot de section : un champ du contrat de contenu/présentation. */
export interface SectionSlot {
  /** Nom logique du champ (paire `_fr`/`_en` représentée sans suffixe si bilingual). */
  field: string;
  /** Contenu éditorial vs axe de rendu. */
  kind: SlotKind;
  /** Type logique du champ. */
  type: SlotType;
  /** Champ obligatoire dans le schéma (non `.optional()`/`.default()`). */
  required: boolean;
  /** Vrai si le champ existe en paire `_fr`/`_en`. */
  bilingual?: boolean;
  /** Valeurs autorisées pour un slot `enum`. */
  enumValues?: string[];
  /** Borne minimale d'un slot `array`. */
  min?: number;
  /** Borne maximale d'un slot `array`. */
  max?: number;
  /** Forme des items pour `array` d'objets ou `object`. */
  itemShape?: SlotItemField[];
}

interface SectionSlotEntry {
  slots: SectionSlot[];
}

const SLOTS = slotsData as unknown as Record<string, SectionSlotEntry>;

/**
 * Contrat de slots d'un type de section. Retourne `[]` si le type est inconnu
 * (best-effort : le .json couvre tous les types du registry, mais on reste sûr).
 */
export function getSlots(type: SectionType): SectionSlot[] {
  return SLOTS[type]?.slots ?? [];
}

/** Slots de CONTENU uniquement (champs à remplir), pour un type donné. */
export function getContentSlots(type: SectionType): SectionSlot[] {
  return getSlots(type).filter((s) => s.kind === 'content');
}

/** Slots de PRÉSENTATION uniquement (axes de rendu), pour un type donné. */
export function getPresentationSlots(type: SectionType): SectionSlot[] {
  return getSlots(type).filter((s) => s.kind === 'presentation');
}

/** Tous les types couverts par le contrat de slots. */
export function listSlotTypes(): string[] {
  return Object.keys(SLOTS);
}
