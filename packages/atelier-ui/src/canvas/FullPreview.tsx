// Waimia · Atelier · canvas (#39, brick B6) : apercu de la PAGE COMPLETE (toggle « Aperçu page »).
//
// Une seule iframe qui rend le document COMPLET (toutes les sections dans l'ordre), via la meme
// route chrome-less et le meme pilote `useLiveFrame` (GET nominal / POST de repli, concurrence
// bornee). C'est la vue « rendu final » du builder, opposee a la vue par blocs.
//
// 0 token DS, 0 valeur en dur (classes bld-* de la page hote), 0 tiret cadratin U+2014.

import { useMemo, useRef } from 'react';
import type { BuilderMeta, SectionInstance } from '@waimia/builder/types';
import { buildDoc } from './preview-doc';
import { useLiveFrame } from './useLiveFrame';

export interface FullPreviewProps {
  meta: BuilderMeta;
  sections: SectionInstance[];
  renderPath: string;
}

export function FullPreview({ meta, sections, renderPath }: FullPreviewProps) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const docJson = useMemo(
    () => JSON.stringify(buildDoc(meta, sections)),
    [meta, sections],
  );
  useLiveFrame(frameRef, docJson, renderPath);

  return (
    <div className="bld-fullpreview">
      <iframe
        ref={frameRef}
        className="bld-fullpreview-frame"
        title="Aperçu de la page complete"
        loading="lazy"
      />
    </div>
  );
}
