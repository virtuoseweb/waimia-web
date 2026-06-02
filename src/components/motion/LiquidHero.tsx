/* LiquidHero · canvas blobs terracotta + parallax mouse + grain
 * Hydraté `client:visible` — pure animation, no children.
 * Source : virtuoseweb/waimia DirectionB.tsx · LiquidHero */
import { useEffect, useRef } from 'react';

interface Props {
  colors?: { bg?: string; blob?: string; highlight?: string };
}

const FALLBACK_COLORS = {
  bg: '#0C0B09',
  blob: '#C94F2E',
  highlight: '#F6F1E8',
};

function toRgba(color: string, alpha: number): string {
  const hex = color.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const value = hex[1];
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  const rgb = color.trim().match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) {
    return `rgba(${Number(rgb[1])},${Number(rgb[2])},${Number(rgb[3])},${alpha})`;
  }

  return toRgba(FALLBACK_COLORS.bg, alpha);
}

export default function LiquidHero({ colors }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const token = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
    const bg = colors?.bg ?? token('--ink', FALLBACK_COLORS.bg);
    const blob = colors?.blob ?? token('--accent', FALLBACK_COLORS.blob);
    const highlight = colors?.highlight ?? token('--paper', FALLBACK_COLORS.highlight);

    let w = 1, h = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;

    const resize = () => {
      const parent = canvas.parentElement;
      w = Math.max(1, parent ? parent.offsetWidth : window.innerWidth);
      h = Math.max(1, parent ? parent.offsetHeight : window.innerHeight);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    };
    window.addEventListener('mousemove', onMove);

    let t = 0, raf: number;
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const draw = () => {
      t += reduced ? 0 : 0.006;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const blobs = [
        { x: 0.25 + Math.sin(t * 0.7) * 0.12, y: 0.4 + Math.cos(t * 0.5) * 0.1, r: 0.55, c: toRgba(blob, 0.55) },
        { x: 0.75 + Math.cos(t * 0.6) * 0.1, y: 0.65 + Math.sin(t * 0.8) * 0.08, r: 0.48, c: toRgba(blob, 0.30) },
        { x: 0.5 + Math.sin(t * 0.4) * 0.18, y: 0.3 + Math.cos(t * 0.7) * 0.14, r: 0.4, c: toRgba(highlight, 0.10) },
        { x: mx, y: my, r: 0.28, c: toRgba(highlight, 0.16) },
      ];
      for (const b of blobs) {
        const cx = b.x * w;
        const cy = b.y * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.c);
        g.addColorStop(1, toRgba(bg, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      // Grain effect · fix flicker dérangeant signalé Simon (clignotement hero manifesto)
      // Avant : Math.random() < 0.5 + alpha 0.035 = grain dessiné 50% des frames = clignote
      // Après : Math.random() < 0.08 + alpha 0.018 + 30 dots = grain subtil sans clignotement
      if (!reduced && Math.random() < 0.08) {
        ctx.globalAlpha = 0.018;
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = highlight;
          ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
        }
        ctx.globalAlpha = 1;
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [colors?.bg, colors?.blob, colors?.highlight]);

  return (
    <div className="liquid-hero" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
