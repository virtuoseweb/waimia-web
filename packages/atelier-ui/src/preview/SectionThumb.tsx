// Waimia · Atelier · SectionThumb : vignette d'apercu d'une section (React, prop-driven).
//
// Primitive visuelle des grilles de picker / galerie de presets (bricks B5, B9). Rend une
// iframe de la page statique /preview/<type> (ou /preview/<type>/<presetId>) MISE A L'ECHELLE
// et NON interactive : l'iframe porte `pointer-events: none`, un overlay bouton la recouvre et
// capte le clic. Chargement PARESSEUX delegue a la file `useThumbQueue` du conteneur parent :
// l'iframe expose `data-src` (jamais `src`) et le markup wrapper `[data-lazy-preview]` que la
// file promeut quand la carte approche le viewport (au plus 3 chargements simultanes).
//
// Frontiere paquet : 0 import depuis le `src/` de l'app hote. Tout est recu en PROPS ; les
// couleurs/espacements passent par les tokens DS (`var(--token)`), jamais de valeur en dur.

import { useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

/** Largeur de rendu « naturelle » de la page /preview dans l'iframe, avant mise a l'echelle.
 *  On rend la page a une largeur desktop puis on reduit par transform : le contenu garde ses
 *  proportions desktop dans la vignette. */
const BASE_RENDER_WIDTH = 1280;

export interface SectionThumbProps {
  /** URL de la page d'apercu a charger dans l'iframe (ex. `/preview/feature-grid`). */
  src: string;
  /** Libelle affiche sous la vignette + `aria-label` de l'overlay cliquable. */
  label: string;
  /** Largeur AFFICHEE de la vignette en px. Defaut : 280. */
  width?: number;
  /** Hauteur AFFICHEE de la zone d'apercu en px (hors libelle). Defaut : 200. */
  height?: number;
  /** Clic sur la vignette (overlay). */
  onClick?: () => void;
  /** Etat selectionne (bordure accent + coche). */
  selected?: boolean;
  /** Contenu additionnel rendu sous le libelle (ex. badges d'axes de la galerie de presets). */
  footer?: React.ReactNode;
}

export function SectionThumb({
  src,
  label,
  width = 280,
  height = 200,
  onClick,
  selected = false,
  footer,
}: SectionThumbProps): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const scale = width / BASE_RENDER_WIDTH;

  const frameStyle: CSSProperties = {
    width,
    height,
  };
  // L'iframe est rendue a la largeur desktop puis reduite ; sa hauteur « source » compense
  // l'echelle pour remplir la zone visible.
  const iframeStyle: CSSProperties = {
    width: BASE_RENDER_WIDTH,
    height: Math.round(height / scale),
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    pointerEvents: 'none',
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <figure className="wa-thumb" data-selected={selected || undefined}>
      <div
        className="wa-thumb__frame"
        style={frameStyle}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={selected}
        onClick={onClick}
        onKeyDown={handleKey}
      >
        {/* Squelette : visible tant que l'iframe n'a pas fini de charger. */}
        {!loaded && <div className="wa-thumb__skeleton" aria-hidden="true" />}

        {/* Wrapper attendu par useThumbQueue : l'iframe expose data-src, promu en src par la file. */}
        <span data-lazy-preview className="wa-thumb__scaler">
          <iframe
            data-src={src}
            title={label}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
            style={iframeStyle}
            onLoad={() => setLoaded(true)}
          />
        </span>

        {selected && (
          <span className="wa-thumb__check" aria-hidden="true">
            &#10003;
          </span>
        )}
      </div>

      <figcaption className="wa-thumb__label" title={label}>
        {label}
      </figcaption>
      {footer && <div className="wa-thumb__footer">{footer}</div>}

      <ThumbStyle />
    </figure>
  );
}

/** Feuille de style scopee (injectee une seule fois par la dedup navigateur sur l'id). */
function ThumbStyle(): React.ReactElement {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: THUMB_CSS }}
      data-wa-style="thumb"
    />
  );
}

const THUMB_CSS = `
.wa-thumb{margin:0;display:flex;flex-direction:column;gap:var(--space-2);}
.wa-thumb__frame{position:relative;overflow:hidden;border:1px solid var(--hairline);
  border-radius:var(--radius-card);background:var(--paper);cursor:pointer;
  transition:border-color .15s ease, box-shadow .15s ease, transform .15s ease;outline:none;}
.wa-thumb__frame:hover{border-color:var(--accent);transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(var(--ink-rgb),0.10);}
.wa-thumb__frame:focus-visible{border-color:var(--accent);
  box-shadow:0 0 0 3px rgba(var(--accent-rgb),0.35);}
.wa-thumb[data-selected] .wa-thumb__frame{border-color:var(--accent);
  box-shadow:0 0 0 2px var(--accent);}
.wa-thumb__scaler{display:block;}
.wa-thumb__scaler iframe{display:block;border:0;background:var(--paper);}
.wa-thumb__skeleton{position:absolute;inset:0;z-index:1;
  background:linear-gradient(100deg,var(--paper-2) 30%,var(--paper-3) 50%,var(--paper-2) 70%);
  background-size:200% 100%;animation:wa-thumb-shimmer 1.3s ease-in-out infinite;}
@keyframes wa-thumb-shimmer{from{background-position:180% 0;}to{background-position:-20% 0;}}
.wa-thumb__check{position:absolute;top:var(--space-2);right:var(--space-2);z-index:2;
  display:grid;place-items:center;width:22px;height:22px;border-radius:var(--radius-full);
  background:var(--accent);color:var(--accent-text);font-size:var(--text-small);line-height:1;}
.wa-thumb__label{font-size:var(--text-small);color:var(--ink);line-height:1.3;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.wa-thumb__footer{display:flex;flex-wrap:wrap;gap:var(--space-1);}
@media (prefers-reduced-motion: reduce){
  .wa-thumb__skeleton{animation:none;}
  .wa-thumb__frame:hover{transform:none;}
}
`;

export default SectionThumb;
