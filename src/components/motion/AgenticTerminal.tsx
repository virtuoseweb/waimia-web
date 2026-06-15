/* AgenticTerminal · IDE mockup avec écriture live du bloc de code
 * Fenêtre macOS (3 dots) + explorateur de fichiers + prompt + bloc de code
 * tapé caractère par caractère + message de succès + footer stats + badges.
 * Fidèle visuellement à la source virtuoseOS, 100 % tokens DS waimia.
 * Hydraté `client:visible` · data surchargeable via props.
 * Fond sombre : calque ProductReel.astro (background ink + texte paper). */
import { useEffect, useRef, useState } from 'react';

export type AgenticLineKind = 'cmd' | 'out' | 'ok' | 'comment';

export interface AgenticLine {
  kind: AgenticLineKind;
  text: string;
}

export interface AgenticFile {
  name: string;
  type: string;
}

export interface AgenticFooter {
  status: string;
  framework: string;
  memory: string;
}

export interface AgenticBadge {
  label: string;
}

export interface AgenticTerminalCopy {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  description?: string;
  filename: string;
  folders: readonly string[];
  files: readonly AgenticFile[];
  promptLabel: string;
  promptText: string;
  lines: readonly AgenticLine[];
  successMsg: string;
  footer: AgenticFooter;
  badges: readonly AgenticBadge[];
}

const DEFAULT_COPY: AgenticTerminalCopy = {
  badge: 'MOTEUR DE CONTENU AGENTIQUE',
  titlePart1: 'Votre contenu,',
  titleHighlight: 'produit en continu',
  description:
    'Un agent qui audite, brieffe et rédige. Une relecture humaine sur chaque livrable, avant publication.',
  filename: 'waimia-env · agent.ts',
  folders: ['audits', 'briefs'],
  files: [
    { name: 'audits/gsc-snapshot.md', type: 'MD' },
    { name: 'briefs/cocon-seo.md', type: 'MD' },
    { name: 'livrables/article-draft.ts', type: 'TS' },
  ],
  promptLabel: 'Votre objectif',
  promptText:
    'Augmenter le trafic organique sur le cocon « SEO local » sans sacrifier la qualité éditoriale.',
  lines: [
    { kind: 'comment', text: '# session agent · waimia' },
    { kind: 'cmd', text: 'waimia run audit --scope=contenu' },
    { kind: 'out', text: 'analyse de 128 pages, lecture GSC et GA…' },
    { kind: 'ok', text: 'ok 12 leviers prioritaires identifiés' },
    { kind: 'cmd', text: 'waimia draft brief --topic="cocon SEO local"' },
    { kind: 'out', text: 'rédaction du plan, sources citées, relecture humaine en file.' },
    { kind: 'ok', text: 'ok brief prêt · 1 relecteur assigné' },
  ],
  successMsg: 'Brief livré. Relecture humaine en cours…',
  footer: { status: 'Agent actif', framework: 'Astro + IA', memory: 'live' },
  badges: [{ label: 'Audit' }, { label: 'Rédaction' }, { label: 'Relecture' }],
};

interface Props {
  lang: 'fr' | 'en';
  copy?: Partial<AgenticTerminalCopy>;
}

/* Couleur de la ligne tapée selon son rôle (tokens waimia only). */
function lineColor(kind: AgenticLineKind): string {
  switch (kind) {
    case 'comment':
      return 'rgba(var(--paper-rgb), .42)';
    case 'cmd':
      return 'var(--paper)';
    case 'ok':
      return 'var(--accent-sur-sombre)';
    default:
      return 'rgba(var(--paper-rgb), .72)';
  }
}

/* Longueur totale de tous les caractères à taper · sert d'index global. */
function totalChars(lines: readonly AgenticLine[]): number {
  return lines.reduce((sum, l) => sum + l.text.length, 0);
}

export default function AgenticTerminal({ lang, copy }: Props) {
  void lang; // contenu déjà localisé en amont (schema bilingue → 1 langue résolue côté .astro)
  const data: AgenticTerminalCopy = { ...DEFAULT_COPY, ...copy };
  const lines = data.lines.length > 0 ? data.lines : DEFAULT_COPY.lines;

  // total: index global de frappe (0 → tous les caractères tapés)
  const total = totalChars(lines);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // ref stable vers les lignes pour que l'effet de frappe ne dépende JAMAIS
  // d'une valeur recréée à chaque render (sinon cleanup tue les timers → frappe gelée)
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    // Respect reduced-motion : tout le code statique, succès visible, pas de timer.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || total === 0) {
      setTyped(total);
      setDone(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;
    let started = false;

    const tick = () => {
      setTyped((prev) => {
        const next = prev + 1;
        if (next >= total) {
          setDone(true);
          return total;
        }
        // 30-40 ms/char · léger jitter pour un rendu organique
        timer = setTimeout(tick, 30 + Math.random() * 10);
        return next;
      });
    };

    const start = () => {
      if (started) return;
      started = true;
      timer = setTimeout(tick, 30);
    };

    // Démarrage robuste : si la section est déjà visible au montage (above-fold),
    // l'IntersectionObserver peut ne pas se déclencher → on vérifie le rect et on
    // démarre directement. Sinon, on observe l'entrée dans le viewport.
    const el = rootRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        start();
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              start();
              observer?.disconnect();
            }
          },
          { threshold: 0.15 },
        );
        observer.observe(el);
      }
    } else {
      // pas de ref (sécurité) → on tape quand même
      start();
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
    // deps vides : capture `total` au montage via closure ; lignes via linesRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reconstitue le texte révélé ligne par ligne à partir de l'index global `typed`.
  let remaining = typed;
  const rendered = lines.map((line, i) => {
    const take = Math.max(0, Math.min(line.text.length, remaining));
    remaining -= line.text.length;
    const isTyping = !done && take > 0 && take < line.text.length;
    const shown = line.text.slice(0, take);
    return { i, kind: line.kind, shown, isTyping, full: line.text.length, take };
  });
  // Curseur sur la dernière ligne en cours (ou la première non finie).
  const cursorIdx = done
    ? -1
    : rendered.findIndex((r) => r.take < r.full);

  return (
    <div
      ref={rootRef}
      style={{
        maxWidth: 'var(--wrap-tight)',
        margin: '0 auto',
        padding: '0 var(--space-6)',
      }}
    >
      {/* 1. HEADER · badge + titre + description */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
            letterSpacing: 'var(--tracking-mono)',
            textTransform: 'uppercase',
            color: 'var(--accent-sur-sombre)',
            border: '1px solid rgba(var(--accent-rgb), .42)',
            borderRadius: 'var(--radius-pill)',
            padding: 'var(--space-2) var(--space-4)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {data.badge}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            lineHeight: 'var(--leading-h2)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--paper)',
            margin: 0,
          }}
        >
          {data.titlePart1}{' '}
          <span style={{ color: 'var(--accent-sur-sombre)' }}>{data.titleHighlight}</span>
        </h2>
        {data.description && (
          <p
            style={{
              maxWidth: 'var(--wrap-prose)',
              margin: 'var(--space-4) auto 0',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(var(--paper-rgb), .72)',
            }}
          >
            {data.description}
          </p>
        )}
      </div>

      {/* 2. IDE MOCKUP */}
      <div
        style={{
          background: 'var(--ink-2)',
          border: '1px solid rgba(var(--paper-rgb), .12)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lift)',
        }}
      >
        {/* Window bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--ink-3)',
            borderBottom: '1px solid rgba(var(--paper-rgb), .12)',
          }}
        >
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {/* Exception tolérée (chrome OS décoratif) : 3 pastilles rouge/jaune/vert */}
            {['#ff5f56', '#ffbd2e', '#27ca40'].map((c) => (
              <span
                key={c}
                style={{
                  width: 'var(--space-3)',
                  height: 'var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  background: c,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-small)',
              color: 'rgba(var(--paper-rgb), .55)',
            }}
          >
            {data.filename}
          </span>
        </div>

        {/* IDE content · 2 colonnes (explorer + code) */}
        <div className="agentic-ide-content">
          {/* Explorer sidebar */}
          <div
            className="agentic-ide-explorer"
            style={{
              background: 'var(--ink-3)',
              borderRight: '1px solid rgba(var(--paper-rgb), .12)',
              padding: 'var(--space-4)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-small)',
                fontWeight: 'var(--fw-semibold)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-mono-tight)',
                color: 'rgba(var(--paper-rgb), .55)',
                marginBottom: 'var(--space-4)',
              }}
            >
              EXPLORER
            </div>
            {data.folders.map((folder) => (
              <div
                key={folder}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-1) var(--space-2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-small)',
                  color: 'rgba(var(--paper-rgb), .72)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span aria-hidden="true">📁</span>
                <span>{folder}</span>
              </div>
            ))}
            {data.files.map((file) => (
              <div
                key={file.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-1) var(--space-2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-small)',
                  color: 'rgba(var(--paper-rgb), .72)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span aria-hidden="true">📄</span>
                <span style={{ flex: 1 }}>{file.name}</span>
                <span
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--accent-sur-sombre)',
                    background: 'rgba(var(--accent-rgb), .12)',
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {file.type}
                </span>
              </div>
            ))}
          </div>

          {/* Code area */}
          <div
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            {/* Prompt box */}
            <div
              style={{
                background: 'rgba(var(--accent-rgb), .06)',
                border: '1px solid rgba(var(--accent-rgb), .3)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--fw-semibold)',
                  color: 'rgba(var(--paper-rgb), .55)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <span aria-hidden="true">👤</span>
                {data.promptLabel}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--paper)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                }}
              >
                {data.promptText}
              </p>
            </div>

            {/* Code block · écriture live */}
            <div
              style={{
                background: 'var(--ink-3)',
                border: '1px solid rgba(var(--paper-rgb), .12)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                overflowX: 'auto',
                maxWidth: '100%',
              }}
            >
              <pre
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-small)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  minHeight: 'var(--space-13)',
                }}
                aria-label={lines.map((l) => l.text).join('\n')}
              >
                {rendered.map((r) => (
                  <div
                    key={r.i}
                    style={{
                      color: lineColor(r.kind),
                      fontStyle: r.kind === 'comment' ? 'italic' : 'normal',
                    }}
                  >
                    {r.shown}
                    {r.i === cursorIdx && (
                      <span style={{ color: 'var(--accent-sur-sombre)' }}>▌</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>

            {/* Success message · n'apparaît qu'une fois la frappe finie */}
            {done && data.successMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'rgba(var(--accent-rgb), .12)',
                  border: '1px solid rgba(var(--accent-rgb), .3)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--accent-sur-sombre)',
                }}
              >
                <span style={{ fontWeight: 'var(--fw-semibold)' }} aria-hidden="true">
                  ✓
                </span>
                {data.successMsg}
              </div>
            )}
          </div>
        </div>

        {/* Footer stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--ink-3)',
            borderTop: '1px solid rgba(var(--paper-rgb), .12)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
            color: 'rgba(var(--paper-rgb), .55)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <span style={{ color: 'var(--accent-sur-sombre)' }} aria-hidden="true">
              ●
            </span>
            {data.footer.status}
          </span>
          <span style={{ opacity: 0.7 }}>{data.footer.framework}</span>
          <span style={{ opacity: 0.7 }}>{data.footer.memory}</span>
        </div>
      </div>

      {/* 3. Badges sous l'IDE */}
      {data.badges.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-6)',
          }}
        >
          {data.badges.map((badge) => (
            <span
              key={badge.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-small)',
                fontWeight: 'var(--fw-medium)',
                background: 'rgba(var(--paper-rgb), .06)',
                border: '1px solid rgba(var(--paper-rgb), .12)',
                color: 'rgba(var(--paper-rgb), .86)',
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Grid responsive : explorer caché ≤768px (calque source virtuoseOS) */}
      <style>{`
        .agentic-ide-content {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: var(--space-14);
        }
        @media (max-width: 768px) {
          .agentic-ide-content { grid-template-columns: 1fr; }
          .agentic-ide-explorer { display: none; }
        }
      `}</style>
    </div>
  );
}
