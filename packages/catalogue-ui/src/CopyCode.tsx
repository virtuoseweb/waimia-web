// Waimia · Library — bloc « copier le code » pour les pages détail de section.
// React client island (client:visible). 0 nouveau token : réutilise les tokens
// canoniques (--ink, --paper-2, --hairline, --font-mono).

import { useState, useCallback, useRef } from 'react';

interface CopyCodeProps {
  /** Code source à afficher et à copier. */
  code: string;
  /** Intitulé optionnel affiché au-dessus du bloc. */
  label?: string;
}

export default function CopyCode({ code, label }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard refusée (contexte non sécurisé) — pas de feedback positif
      setCopied(false);
    }
  }, [code]);

  return (
    <div className="copycode">
      {label ? <p className="copycode-label">{label}</p> : null}
      <div className="copycode-shell">
        <button
          type="button"
          className="copycode-btn"
          aria-label="Copier le code"
          onClick={handleCopy}
        >
          {copied ? 'Copié ✓' : 'Copier'}
        </button>
        <pre className="copycode-pre">
          <code>{code}</code>
        </pre>
      </div>
      <style>{`
        .copycode {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .copycode-label {
          margin: 0;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .copycode-shell {
          position: relative;
          border: 1px solid var(--hairline);
          background: var(--paper-2);
        }
        .copycode-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 1;
          padding: 7px 12px;
          border: 1px solid var(--hairline-strong);
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease;
        }
        .copycode-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .copycode-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .copycode-pre {
          margin: 0;
          padding: 20px;
          padding-right: 96px;
          overflow-x: auto;
          color: var(--ink);
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.6;
          tab-size: 2;
        }
        .copycode-pre code {
          font-family: inherit;
          white-space: pre;
        }
      `}</style>
    </div>
  );
}
