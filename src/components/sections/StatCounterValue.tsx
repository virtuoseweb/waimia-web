/* StatCounterValue · île React MINIMALE pour stat-counter.
 *
 * Rôle : animer un count-up vers la valeur finale au moment où l'élément entre dans le
 * viewport (client:visible). La valeur FINALE est rendue côté serveur comme contenu initial
 * de l'état → visible sans JS, indexable, et déjà présente dans les previews statiques
 * (pas de scroll → pas de IntersectionObserver → on garde la valeur finale).
 *
 * Respecte prefers-reduced-motion : si l'utilisateur préfère moins de mouvement, on n'anime
 * pas, on affiche directement la valeur finale. Coût bundle négligeable (React partagé).
 */
import { useEffect, useRef, useState } from "react";

interface Props {
  /** Valeur finale affichée (ex. '99.9', '120', '4.8'). La partie numérique est animée. */
  value: string;
  prefix?: string;
  suffix?: string;
  /** Active l'animation (défaut true). */
  animate?: boolean;
}

/** Sépare la partie numérique animable du reste (gère décimales et séparateurs). */
function parseNumeric(raw: string): { target: number; decimals: number } | null {
  const match = raw.replace(/\s/g, "").match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const normalized = match[0].replace(",", ".");
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  const target = parseFloat(normalized);
  if (Number.isNaN(target)) return null;
  return { target, decimals };
}

function format(value: number, decimals: number): string {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

export default function StatCounterValue({ value, prefix, suffix, animate = true }: Props) {
  // État initial = valeur finale (SSR) → visible sans hydratation / sans scroll.
  const [display, setDisplay] = useState<string>(value);
  const ref = useRef<HTMLSpanElement>(null);
  // Garde-fou : l'animation ne doit se déclencher qu'UNE fois pour ce composant.
  // (évite le thrash StrictMode / re-render qui reset le compteur en boucle).
  const doneRef = useRef(false);

  // Effet à dépendances PRIMITIVES uniquement → ne se ré-exécute pas à chaque render.
  useEffect(() => {
    if (doneRef.current) return;
    const parsed = parseNumeric(value);
    if (!animate || !parsed) {
      doneRef.current = true;
      setDisplay(value); // pas d'anim → valeur finale directe
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      doneRef.current = true;
      setDisplay(value); // reduced-motion → valeur finale, pas d'animation
      return;
    }

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const { target, decimals } = parsed;
    const duration = 1400;

    const run = () => {
      doneRef.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(format(target * eased, decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value); // termine EXACTEMENT sur la valeur source (format d'origine)
      };
      raf = requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      setDisplay(format(0, decimals));
      run();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !raf) {
          setDisplay(format(0, decimals)); // démarre à 0 juste avant l'anim
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, value]);

  return (
    <span ref={ref} className="stat-counter__num">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
