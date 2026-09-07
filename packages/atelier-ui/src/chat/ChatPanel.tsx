// @waimia/atelier-ui · chat · ChatPanel : panneau chat-IA in-app du builder (Φ3), PUR props-driven.
//
// Surface « chat type Lovable » (docs/specs/05 msg 1/5) : conversation a gauche, le canvas/preview
// du builder se met a jour a droite quand l'IA compose une page. Ce composant ne fait AUCUN fetch et
// n'importe AUCUN store app : il recoit messages/usage/phase et emet onSend/onInput/onClose. L'hote
// (BuilderHost) branche la boucle agentique /api/ds/chat et applique le PageDocument au canvas.
//
// Style scope injecte une fois (classes wa-chat*), 100 % var(--token) DS (rule 60), 0 valeur en dur
// hormis 1px hairline structurel + 2px focus outline (exceptions sanctionnees). 0 tiret cadratin.

import React, { useEffect, useRef } from 'react';
import type { ChatMessage, ChatPhase, ChatUsage } from './types';

const STYLE_ID = 'wa-chat-styles';

export interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  onInput: (value: string) => void;
  onSend: () => void;
  phase: ChatPhase;
  error?: string;
  usage?: ChatUsage;
  /** false = provider LLM non configure (pas de cle) : envoi desactive + aide affichee. */
  configured?: boolean;
  onClose?: () => void;
}

function useChatStyles(): void {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

export function ChatPanel(props: ChatPanelProps): React.ReactElement {
  useChatStyles();
  const { messages, input, onInput, onSend, phase, error, usage, configured = true, onClose } = props;
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le dernier message a chaque changement (conversation qui grandit).
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, phase]);

  const overLimit = !!usage && usage.used >= usage.limit;
  const sendDisabled = phase === 'thinking' || input.trim().length === 0 || !configured || overLimit;

  const submit = (): void => {
    if (sendDisabled) return;
    onSend();
  };

  return (
    <aside className="wa-chat" aria-label="Assistant IA du builder">
      <header className="wa-chat__head">
        <div className="wa-chat__title">
          <span className="wa-chat__kicker">Assistant IA</span>
          <span className="wa-chat__sub">Composez une page en langage naturel</span>
        </div>
        <div className="wa-chat__head-right">
          {usage && (
            <span
              className={`wa-chat__usage${overLimit ? ' is-over' : ''}`}
              title={
                usage.durable === false
                  ? 'Compteur best-effort (memoire) : le plafond durable requiert Upstash.'
                  : 'Plafond quotidien de messages.'
              }
              data-testid="chat-usage"
            >
              {usage.used}/{usage.limit} aujourd'hui
            </span>
          )}
          {onClose && (
            <button type="button" className="wa-chat__close" onClick={onClose} aria-label="Fermer l'assistant">
              ×
            </button>
          )}
        </div>
      </header>

      <div className="wa-chat__list" ref={listRef} data-testid="chat-messages">
        {messages.length === 0 && (
          <div className="wa-chat__empty">
            <p className="wa-chat__empty-title">Decrivez la page a composer.</p>
            <p className="wa-chat__empty-hint">
              Ex. « Compose une page service avec un hero, une preuve sociale et un CTA final. »
              L'assistant pioche dans le catalogue Waimia et met a jour l'apercu.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`wa-chat__msg wa-chat__msg--${m.role}`}>
            <span className="wa-chat__role">{m.role === 'user' ? 'Vous' : 'Assistant'}</span>
            <div className="wa-chat__bubble">
              {m.text.split('\n').map((line, i) => (
                <p key={i} className="wa-chat__line">
                  {line}
                </p>
              ))}
              {m.toolTrace && m.toolTrace.length > 0 && (
                <ul className="wa-chat__tools" aria-label="Tools appeles">
                  {m.toolTrace.map((t, i) => (
                    <li key={i} className={`wa-chat__tool${t.ok ? '' : ' is-err'}`}>
                      <span aria-hidden="true">{t.ok ? '✓' : '×'}</span> {t.name}
                    </li>
                  ))}
                </ul>
              )}
              {m.applied && <p className="wa-chat__applied">Page appliquee au canvas.</p>}
            </div>
          </div>
        ))}
        {phase === 'thinking' && (
          <div className="wa-chat__msg wa-chat__msg--assistant">
            <span className="wa-chat__role">Assistant</span>
            <div className="wa-chat__bubble wa-chat__bubble--thinking" data-testid="chat-thinking">
              L'assistant compose…
            </div>
          </div>
        )}
      </div>

      {!configured && (
        <p className="wa-chat__notice" role="status" data-testid="chat-unconfigured">
          Aucune cle LLM configuree. Ajoutez une cle (Anthropic ou OpenAI) en environnement pour activer
          l'assistant. La composition manuelle reste disponible.
        </p>
      )}
      {overLimit && configured && (
        <p className="wa-chat__notice is-warn" role="status">
          Plafond quotidien atteint ({usage?.limit}/jour). Reessayez demain ou composez a la main.
        </p>
      )}
      {phase === 'error' && error && (
        <p className="wa-chat__notice is-err" role="alert" data-testid="chat-error">
          {error}
        </p>
      )}

      <div className="wa-chat__composer">
        <textarea
          className="wa-chat__input"
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={configured ? 'Decrivez la page a composer…' : 'Assistant indisponible (cle LLM manquante)'}
          rows={2}
          spellCheck={false}
          disabled={!configured || phase === 'thinking'}
          aria-label="Message a l'assistant"
          data-testid="chat-input"
        />
        <button
          type="button"
          className="wa-chat__send"
          onClick={submit}
          disabled={sendDisabled}
          data-testid="chat-send"
        >
          {phase === 'thinking' ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>
    </aside>
  );
}

const CSS = `
.wa-chat { display: flex; flex-direction: column; height: 100%; min-height: 0;
  background: var(--paper); color: var(--ink); font-family: var(--font-sans); }
.wa-chat * { box-sizing: border-box; }
.wa-chat__head { display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--space-3); padding: var(--space-4); border-bottom: 1px solid var(--hairline);
  background: var(--paper-2); }
.wa-chat__title { display: flex; flex-direction: column; gap: var(--space-1); min-width: 0; }
.wa-chat__kicker { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--accent-text); }
.wa-chat__sub { font-family: var(--font-sans); font-size: var(--text-small); color: var(--ink-2); }
.wa-chat__head-right { display: flex; align-items: center; gap: var(--space-2); flex: none; }
.wa-chat__usage { font-family: var(--font-mono); font-size: var(--text-micro); color: var(--muted);
  padding: var(--space-1) var(--space-2); border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm); white-space: nowrap; }
.wa-chat__usage.is-over { color: var(--accent-text); border-color: var(--accent-text); }
.wa-chat__close { flex: none; width: 1.75rem; height: 1.75rem; border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm); background: var(--paper); color: var(--ink-2);
  font-size: var(--text-body); line-height: 1; cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease); }
.wa-chat__close:hover { border-color: var(--accent-text); color: var(--accent-text); }
.wa-chat__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.wa-chat__list { flex: 1; min-height: 0; overflow-y: auto; padding: var(--space-4);
  display: flex; flex-direction: column; gap: var(--space-4); }
.wa-chat__empty { display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-4); border: 1px dashed var(--hairline-strong); border-radius: var(--radius-md);
  background: var(--paper-2); }
.wa-chat__empty-title { margin: 0; font-family: var(--font-sans); font-size: var(--text-body);
  font-weight: var(--fw-semibold); color: var(--ink); }
.wa-chat__empty-hint { margin: 0; font-family: var(--font-sans); font-size: var(--text-small);
  line-height: 1.5; color: var(--ink-2); }
.wa-chat__msg { display: flex; flex-direction: column; gap: var(--space-1); }
.wa-chat__msg--user { align-items: flex-end; }
.wa-chat__role { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--muted); }
.wa-chat__bubble { max-width: 92%; padding: var(--space-3); border: 1px solid var(--hairline);
  border-radius: var(--radius-md); background: var(--paper-2); font-size: var(--text-small);
  line-height: 1.55; color: var(--ink); }
.wa-chat__msg--user .wa-chat__bubble { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.wa-chat__bubble--thinking { color: var(--ink-2); font-style: italic; }
.wa-chat__line { margin: 0 0 var(--space-1); }
.wa-chat__line:last-child { margin-bottom: 0; }
.wa-chat__tools { margin: var(--space-2) 0 0; padding: 0; list-style: none; display: flex;
  flex-wrap: wrap; gap: var(--space-2); }
.wa-chat__tool { font-family: var(--font-mono); font-size: var(--text-micro); color: var(--muted);
  padding: 2px var(--space-2); border: 1px solid var(--hairline); border-radius: var(--radius-sm); }
.wa-chat__tool.is-err { color: var(--accent-text); border-color: var(--accent-text); }
.wa-chat__applied { margin: var(--space-2) 0 0; font-family: var(--font-mono); font-size: var(--text-micro);
  color: var(--complementary); }
.wa-chat__notice { margin: 0; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--hairline);
  font-family: var(--font-mono); font-size: var(--text-micro); line-height: 1.5; color: var(--ink-2);
  background: var(--paper-2); }
.wa-chat__notice.is-err { color: var(--accent-text); }
.wa-chat__notice.is-warn { color: var(--accent-text); }
.wa-chat__composer { display: flex; gap: var(--space-2); padding: var(--space-3);
  border-top: 1px solid var(--hairline); background: var(--paper); }
.wa-chat__input { flex: 1; min-width: 0; padding: var(--space-2) var(--space-3);
  border: 1px solid var(--hairline-strong); border-radius: var(--radius-sm); background: var(--paper);
  color: var(--ink); font-family: var(--font-sans); font-size: var(--text-small); line-height: 1.5;
  resize: vertical; }
.wa-chat__input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.wa-chat__input:disabled { background: var(--paper-2); color: var(--muted); cursor: not-allowed; }
.wa-chat__send { flex: none; align-self: stretch; padding: var(--space-2) var(--space-4);
  border: 1px solid var(--ink); border-radius: var(--radius-sm); background: var(--ink);
  color: var(--paper); font-family: var(--font-mono); font-size: var(--text-small);
  letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer;
  transition: opacity var(--dur-fast) var(--ease); }
.wa-chat__send:hover:not(:disabled) { opacity: 0.88; }
.wa-chat__send:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.wa-chat__send:disabled { opacity: 0.5; cursor: not-allowed; }
`;
