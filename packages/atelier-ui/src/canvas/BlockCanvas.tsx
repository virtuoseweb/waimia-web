// Waimia · Atelier · canvas (#39, brick B6) : le CANVAS PAR BLOCS (vue centrale du nouvel editeur).
//
// Lit l'etat du document via le Context (`useBuilder`) et rend une pile de cartes-blocs (BlockCard),
// chacune avec sa vignette live. Entre chaque bloc (et aux extremites), une barre d'INSERTION
// permet d'ajouter une section a l'index exact (add(type, atIndex)). Reordonnancement : glisser
// natif HTML5 (poignee sur la carte) + fleches monter/descendre (fallback accessible). Un depot
// sur une carte deplace le bloc glisse vers cet index.
//
// Ce composant est agnostique du picker (B5) et de l'inspecteur (B7) : il ne fait QUE la
// composition/ordonnancement. La barre d'insertion utilise un selecteur MINIMAL (liste de types)
// en attendant le picker riche B5. Structure DOM : une <ul> ne contenant QUE des <li> (cartes +
// barres d'insertion), pour un markup valide (0 warning d'hydratation).
//
// 0 token DS invente, 0 valeur en dur (classes bld-* de la page hote), 0 tiret cadratin U+2014.

import { useRef } from 'react';
import { useBuilder } from '../app/context';
import { BlockCard } from './BlockCard';

/** Barre d'insertion (selecteur minimal de type) inseree a un index precis du document. `<li>`. */
function InsertBar({ atIndex, label }: { atIndex: number; label: string }) {
  const { items, add } = useBuilder();
  return (
    <li className="bld-insert" role="group" aria-label={label}>
      <span className="bld-insert-line" aria-hidden="true" />
      <select
        className="bld-select bld-insert-select"
        value=""
        aria-label={label}
        onChange={(e) => {
          const type = e.target.value;
          if (type) add(type, atIndex);
          e.target.value = '';
        }}
      >
        <option value="">+ inserer une section ici</option>
        {items.map((it) => (
          <option key={it.type} value={it.type}>
            {it.type}
          </option>
        ))}
      </select>
      <span className="bld-insert-line" aria-hidden="true" />
    </li>
  );
}

export function BlockCanvas() {
  const {
    meta,
    sections,
    selectedUid,
    renderPath,
    select,
    move,
    duplicate,
    remove,
  } = useBuilder();

  // Index source du glisser en cours (partage par toutes les cartes de cette instance).
  const dragFrom = useRef<number | null>(null);

  const handleDrop = (toIndex: number) => {
    const from = dragFrom.current;
    dragFrom.current = null;
    if (from === null || from === toIndex) return;
    move(from, toIndex);
  };

  if (sections.length === 0) {
    return (
      <div className="bld-canvas-stack">
        <div className="bld-empty bld-empty--canvas">
          Document vide. Ajoutez une section depuis le catalogue a gauche, ou via « inserer une
          section » ci-dessous.
        </div>
        <ul className="bld-blocks">
          <InsertBar atIndex={0} label="Inserer la premiere section" />
        </ul>
      </div>
    );
  }

  return (
    <div className="bld-canvas-stack">
      <ul className="bld-blocks">
        <InsertBar atIndex={0} label="Inserer une section en tete" />
        {sections.flatMap((s, idx) => [
          <BlockCard
            key={s.uid}
            uid={s.uid}
            data={s.data}
            index={idx}
            total={sections.length}
            meta={meta}
            selected={s.uid === selectedUid}
            renderPath={renderPath}
            onSelect={select}
            onMove={move}
            onDuplicate={duplicate}
            onRemove={remove}
            onDragStart={(i) => {
              dragFrom.current = i;
            }}
            onDropOn={handleDrop}
          />,
          <InsertBar
            key={`ins-${s.uid}`}
            atIndex={idx + 1}
            label={`Inserer une section apres le bloc ${idx + 1}`}
          />,
        ])}
      </ul>
    </div>
  );
}
