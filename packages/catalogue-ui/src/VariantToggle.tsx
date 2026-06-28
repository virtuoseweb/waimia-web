// Waimia · Library · contrôles de la fiche /library/[type] (U4, §11.3 / §12.2.A docs/design-system/03).
//
// Deux toggles SSG-safe au-dessus de l'aperçu iframe :
//   1. « Animation »  : bascule la src de l'iframe entre /preview/[type] (reveals figés,
//      neutralisés) et /preview/[type]/animated (reveals rejoués au scroll). Switch
//      purement client-side sur l'attribut src, donc compatible build statique.
//   2. « Fond sombre » : applique l'idiome data-bg='ink' (modèle BentoGrid + global.css)
//      sur les <section> et le <body> du document de l'iframe (même origin, cf
//      src/scripts/preview-frame.ts qui lit déjà iframe.contentWindow.document). Le CSS
//      dark scopé (.x[data-bg='ink']) est toujours présent dans le bundle de la preview,
//      flipper l'attribut l'active sans nouvelle route ni query param serveur.
//
// 0 nouveau token DS, 0 valeur en dur (tokens canoniques --hairline/--paper/--ink/--accent/
// --font-mono/--text-small/--space-*/--dur-*), boutons accessibles (aria-pressed).
// Rend lui-même l'iframe à l'intérieur du conteneur [data-preview-frame] (preview-frame.ts
// la met à l'échelle).

import { useCallback, useEffect, useRef, useState } from 'react';

interface VariantToggleProps {
  /** section.type : sert à composer les deux src de preview. */
  type: string;
  /** Titre accessible de l'iframe. */
  title: string;
}

const PAPER_BG = 'paper';
const INK_BG = 'ink';

export default function VariantToggle({ type, title }: VariantToggleProps) {
  const [animated, setAnimated] = useState(false);
  const [dark, setDark] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const staticSrc = `/preview/${type}`;
  const animatedSrc = `/preview/${type}/animated`;
  const src = animated ? animatedSrc : staticSrc;

  // Applique (ou retire) data-bg='ink' dans le document de l'iframe.
  const applyDark = useCallback((isDark: boolean) => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentWindow?.document;
    if (!doc) return;
    const bg = isDark ? INK_BG : PAPER_BG;
    doc.documentElement.setAttribute('data-bg', bg);
    if (doc.body) doc.body.setAttribute('data-bg', bg);
    // Cible chaque section racine (porteuse du CSS scopé .x[data-bg='ink']).
    doc.querySelectorAll('body > section, body > [class*="sec-"]').forEach((el) => {
      el.setAttribute('data-bg', bg);
    });
  }, []);

  // Ré-applique le fond à chaque (re)chargement de l'iframe et à chaque changement d'état.
  const handleLoad = useCallback(() => applyDark(dark), [applyDark, dark]);
  useEffect(() => {
    applyDark(dark);
  }, [applyDark, dark, src]);

  return (
    <div className="vt">
      <div className="vt-controls" role="group" aria-label={`Réglages de l'aperçu ${type}`}>
        <button
          type="button"
          className="vt-btn"
          aria-pressed={animated}
          onClick={() => setAnimated((v) => !v)}
        >
          {animated ? 'Animation : activée' : 'Voir l’animation'}
        </button>
        <button
          type="button"
          className="vt-btn"
          aria-pressed={dark}
          onClick={() => setDark((v) => !v)}
        >
          {dark ? 'Fond sombre : activé' : 'Fond sombre'}
        </button>
      </div>

      <div className="vt-preview" data-preview-frame data-max-height="620">
        <iframe
          ref={iframeRef}
          key={src}
          src={src}
          title={title}
          loading="lazy"
          onLoad={handleLoad}
        ></iframe>
      </div>

      <style>{`
        .vt {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .vt-controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .vt-btn {
          display: inline-flex;
          align-items: center;
          padding: 7px var(--space-3);
          border: 1px solid var(--hairline-strong);
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-mono);
          font-size: var(--text-small);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color var(--dur-fast, 0.18s) ease, color var(--dur-fast, 0.18s) ease, background var(--dur-fast, 0.18s) ease;
        }
        .vt-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .vt-btn[aria-pressed=true] {
          border-color: var(--accent-text);
          background: var(--paper-2);
          color: var(--accent-text);
        }
        .vt-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .vt-preview {
          position: relative;
          min-height: 280px;
          overflow: hidden;
          border: 1px solid var(--hairline);
          background: var(--paper);
        }
        .vt-preview iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 1280px;
          border: 0;
          transform-origin: top left;
        }
      `}</style>
    </div>
  );
}
