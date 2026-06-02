// Ajuste chaque iframe de preview : remplit la largeur du conteneur (scale = w/1280)
// et fixe la hauteur du conteneur à la hauteur naturelle scalée du contenu (capée).
//
// Technique « relume » : l'iframe est rendue à la largeur de design (1280px) puis
// mise à l'échelle responsive pour occuper toute la largeur du conteneur. La hauteur
// du conteneur suit la hauteur naturelle scalée du contenu (mesurée same-origin),
// capée par data-max-height — fini les grands vides sous les sections courtes et
// fini le clip/gouttière sur écran large.
//
// Conteneurs ciblés : tout élément portant [data-preview-frame] avec une <iframe> à
// l'intérieur (pointant vers /preview/* servi par le même origin). Re-init à chaque
// navigation Astro View Transitions (astro:page-load fire au load initial ET sur nav).

const DESIGN_W = 1280;

function fit(wrap: HTMLElement): void {
  const iframe = wrap.querySelector('iframe') as HTMLIFrameElement | null;
  if (!iframe) return;
  const w = wrap.clientWidth;
  if (!w) return;
  const scale = w / DESIGN_W;
  const maxH = parseInt(wrap.dataset.maxHeight || '320', 10);
  iframe.style.width = DESIGN_W + 'px';
  iframe.style.transformOrigin = 'top left';
  iframe.style.transform = `scale(${scale})`;
  let contentH = 800;
  try {
    const d = iframe.contentWindow!.document;
    contentH = d.documentElement.scrollHeight || d.body.scrollHeight || 800;
  } catch {
    /* same-origin attendu ; fallback 800 */
  }
  iframe.style.height = contentH + 'px';
  wrap.style.height = Math.min(Math.round(contentH * scale), maxH) + 'px';
}

function initPreviewFrames(): void {
  const wraps = Array.from(document.querySelectorAll<HTMLElement>('[data-preview-frame]'));
  for (const wrap of wraps) {
    const iframe = wrap.querySelector('iframe') as HTMLIFrameElement | null;
    // Ignore les conteneurs sans iframe (rien à scaler).
    if (!iframe) continue;
    if (iframe.contentWindow?.document?.readyState === 'complete') fit(wrap);
    iframe.addEventListener('load', () => fit(wrap));
    const ro = new ResizeObserver(() => fit(wrap));
    ro.observe(wrap);
  }
}

// Astro View Transitions (ClientRouter) : ré-init à chaque navigation + au load initial.
// astro:page-load couvre le 1er chargement ET les navigations View Transitions.
document.addEventListener('astro:page-load', initPreviewFrames);
