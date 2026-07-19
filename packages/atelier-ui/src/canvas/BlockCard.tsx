// Waimia · Atelier · canvas (#39, brick B6) : une CARTE de bloc du canvas par blocs.
//
// Un bloc = une vignette LIVE de sa section (iframe rendue via la route chrome-less) + une barre
// d'outils (selectionner, monter/descendre, dupliquer, supprimer) + poignee de glisser-deposer
// (reordonnancement natif HTML5). La carte est memoisee : editer UNE section ne re-rend QUE sa
// vignette (les autres cartes gardent leur ref d'instance -> React.memo les saute).
//
// 0 token DS invente, 0 valeur en dur (styles via classes bld-* de la page hote), 0 U+2014.

import { memo, useMemo, useRef } from 'react';
import type { BuilderMeta, SectionInstance } from '@waimia/builder/types';
import { buildSectionDoc } from './preview-doc';
import { useLiveFrame } from './useLiveFrame';

export interface BlockCardProps {
  /** cle locale stable de la section (pour les callbacks d'action). */
  uid: string;
  /** instance de section a rendre dans la vignette. */
  data: SectionInstance;
  /** index dans la liste (affichage + bornes des fleches). */
  index: number;
  /** nombre total de blocs (desactive la fleche « descendre » sur le dernier). */
  total: number;
  /** meta du document (langue / collection / slug) : entre dans le doc mono-section. */
  meta: BuilderMeta;
  /** bloc actuellement selectionne ? */
  selected: boolean;
  /** route de rendu chrome-less. */
  renderPath: string;
  onSelect: (uid: string) => void;
  onMove: (from: number, to: number) => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
  /** enregistre l'instance courante comme VERSION reutilisable (ouvre la mini-modale d'hote). */
  onSaveVersion: (data: SectionInstance) => void;
  /** duplique cette section comme NOUVEAU TYPE de catalogue (ouvre la modale d'hote). */
  onDuplicateType: (data: SectionInstance) => void;
  /** debut de glisser (memorise l'index source). */
  onDragStart: (index: number) => void;
  /** depot sur cette carte (reordonne vers cet index). */
  onDropOn: (index: number) => void;
}

function BlockCardImpl({
  uid,
  data,
  index,
  total,
  meta,
  selected,
  renderPath,
  onSelect,
  onMove,
  onDuplicate,
  onRemove,
  onSaveVersion,
  onDuplicateType,
  onDragStart,
  onDropOn,
}: BlockCardProps) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  // JSON stable du doc mono-section : ne change que si la section (ou la meta) change -> l'iframe
  // ne se recharge pas inutilement. useMemo evite de re-serialiser a chaque rendu du parent.
  const docJson = useMemo(
    () => JSON.stringify(buildSectionDoc(meta, data)),
    [meta, data],
  );
  useLiveFrame(frameRef, docJson, renderPath);

  const type = data.type;

  return (
    <li
      className={`bld-block bld-card${selected ? ' is-selected' : ''}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        // Certains navigateurs exigent un payload pour armer le drag.
        e.dataTransfer.setData('text/plain', String(index));
        onDragStart(index);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDropOn(index);
      }}
      aria-label={`Bloc ${index + 1} : ${type}`}
    >
      {/* En-tete : poignee + index + type + outils */}
      <div className="bld-card-head">
        <span className="bld-card-drag" aria-hidden="true" title="Glisser pour reordonner">
          ⠿
        </span>
        <span className="bld-card-index">{index + 1}</span>
        <button
          type="button"
          className="bld-card-type"
          onClick={() => onSelect(uid)}
          aria-pressed={selected}
          title={`Selectionner la section ${type}`}
        >
          {type}
        </button>
        <div className="bld-card-tools">
          <button
            type="button"
            className="bld-card-tool"
            onClick={() => onMove(index, index - 1)}
            disabled={index === 0}
            aria-label={`Monter la section ${type}`}
            title="Monter"
          >
            ↑
          </button>
          <button
            type="button"
            className="bld-card-tool"
            onClick={() => onMove(index, index + 1)}
            disabled={index === total - 1}
            aria-label={`Descendre la section ${type}`}
            title="Descendre"
          >
            ↓
          </button>
          <button
            type="button"
            className="bld-card-tool"
            onClick={() => onDuplicate(index)}
            aria-label={`Dupliquer la section ${type}`}
            title="Dupliquer"
          >
            ⧉
          </button>
          <button
            type="button"
            className="bld-card-tool"
            onClick={() => onSaveVersion(data)}
            aria-label={`Enregistrer la section ${type} comme version`}
            title="Enregistrer comme version"
          >
            ⭳
          </button>
          <button
            type="button"
            className="bld-card-tool"
            onClick={() => onDuplicateType(data)}
            aria-label={`Dupliquer la section ${type} comme nouveau type`}
            title="Dupliquer comme nouveau type"
          >
            ⊕
          </button>
          <button
            type="button"
            className="bld-card-tool bld-card-tool--danger"
            onClick={() => onRemove(index)}
            aria-label={`Supprimer la section ${type}`}
            title="Supprimer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Vignette live : rendu reel de la section dans une iframe (route chrome-less) */}
      <div className="bld-card-thumb">
        <iframe
          ref={frameRef}
          className="bld-card-frame"
          title={`Aperçu de la section ${type}`}
          loading="lazy"
          tabIndex={-1}
        />
        {/* Voile transparent : capte le clic pour selectionner sans interagir avec l'iframe. */}
        <button
          type="button"
          className="bld-card-thumb-select"
          onClick={() => onSelect(uid)}
          aria-label={`Selectionner la section ${type}`}
        />
      </div>
    </li>
  );
}

/**
 * Memoisation : la carte ne se re-rend que si ses props changent reellement. Comme le reducer
 * conserve la reference d'instance des sections NON editees, seule la carte editee (nouvelle ref
 * `data`) se re-rend -> sa vignette seule se recharge.
 */
export const BlockCard = memo(BlockCardImpl);
