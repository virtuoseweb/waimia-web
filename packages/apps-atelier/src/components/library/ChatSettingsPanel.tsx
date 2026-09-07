/* ChatSettingsPanel · React island · ecran Reglages : mode de connexion au runtime LLM du chat.
 *
 * Choisit AU RUNTIME (dans le navigateur, pas au deploiement) :
 *   - le fournisseur actif du chat-IA : Anthropic ou OpenAI ;
 *   - une cle API personnelle OPTIONNELLE (bring-your-own-key) qui, si renseignee, prend le pas sur
 *     la cle serveur (ANTHROPIC_API_KEY / OPENAI_API_KEY d'env) pour CETTE session navigateur.
 *
 * Securite (contrainte stricte) : la cle vit UNIQUEMENT dans localStorage (jamais cote serveur,
 * jamais loggee, jamais dans l'URL). Elle part en EN-TETE (X-Chat-Api-Key) a chaque requete
 * /api/ds/chat, via le module partage byok.ts (SOURCE unique lue par le host du chat, BuilderHost).
 * Le champ est masque (type=password) par defaut, avec un bouton afficher/masquer. Champ vide =>
 * la cle serveur reprend la main (0 regression sur le flux existant).
 *
 * Hors scope (cf docs/audits/09 §7) : aucun mode "abonnement Codex" (~/.codex/auth.json), aucun
 * profil multi-utilisateur persiste. C'est une preference de session navigateur, pas un compte.
 *
 * 0 nouveau token DS (rule 60) : classes cfg-chat-* portees par la page hote (config/index.astro),
 * 100 % var(--token) existants. 0 tiret cadratin U+2014 (rule 58). UI en francais.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadByok,
  saveByok,
  clearByokKey,
  byokHeaders,
  type ByokProvider,
} from "@waimia/atelier-ui/chat/byok.ts";

/** Etat renvoye par GET /api/ds/chat (config + source de la cle vue par le serveur). */
interface ChatStatus {
  configured: boolean;
  provider: string;
  model: string;
  source?: "env" | "byok";
}

type TestState =
  | { phase: "idle" }
  | { phase: "testing" }
  | { phase: "ok"; status: ChatStatus }
  | { phase: "err"; message: string };

const PROVIDERS: Array<{ id: ByokProvider; label: string; keyHint: string }> = [
  { id: "anthropic", label: "Anthropic (Claude)", keyHint: "sk-ant-..." },
  { id: "openai", label: "OpenAI (GPT)", keyHint: "sk-..." },
];

/** GET /api/ds/chat avec des en-tetes donnes (sans consommer de quota). null si endpoint absent. */
async function fetchStatus(headers: Record<string, string>): Promise<ChatStatus | null> {
  try {
    const res = await fetch("/api/ds/chat", { headers });
    if (!res.ok) return null;
    const data = (await res.json()) as { ok?: boolean } & Partial<ChatStatus>;
    if (!data || data.ok !== true) return null;
    return {
      configured: Boolean(data.configured),
      provider: typeof data.provider === "string" ? data.provider : "",
      model: typeof data.model === "string" ? data.model : "",
      source: data.source === "byok" ? "byok" : "env",
    };
  } catch {
    // Endpoint indisponible (build statique / hors ligne) : pas d'etat serveur, pas de crash.
    return null;
  }
}

export default function ChatSettingsPanel() {
  const initial = useMemo(() => loadByok(), []);
  const [provider, setProvider] = useState<ByokProvider>(initial.provider ?? "anthropic");
  const [apiKey, setApiKey] = useState<string>(initial.apiKey);
  const [reveal, setReveal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [test, setTest] = useState<TestState>({ phase: "idle" });
  // Etat de la cle SERVEUR (GET sans en-tete BYOK) : contexte honnete (BYOK requis ou non).
  const [server, setServer] = useState<ChatStatus | null>(null);

  const hasKey = apiKey.trim().length > 0;
  const active = PROVIDERS.find((p) => p.id === provider) ?? PROVIDERS[0];

  // Au montage : lit l'etat SERVEUR (sans en-tete) pour afficher si une cle serveur existe deja.
  useEffect(() => {
    let alive = true;
    void fetchStatus({}).then((s) => {
      if (alive) setServer(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  const onSave = useCallback(() => {
    saveByok(provider, apiKey);
    setSaved(true);
    setTest({ phase: "idle" });
  }, [provider, apiKey]);

  const onClear = useCallback(() => {
    clearByokKey();
    setApiKey("");
    // On garde le fournisseur choisi ; seule la cle est effacee (la cle serveur reprend la main).
    saveByok(provider, "");
    setSaved(true);
    setTest({ phase: "idle" });
  }, [provider]);

  // Verifie que le serveur recoit bien les reglages COURANTS (en-tetes construits depuis le champ,
  // pas depuis localStorage) : confirme que le provider/la presence de cle sont pris en compte.
  // Ne valide PAS la cle aupres du fournisseur (ca se fait au 1er message, pour ne pas bruler de quota).
  const onTest = useCallback(async () => {
    setTest({ phase: "testing" });
    const headers = byokHeaders({ provider, apiKey });
    const status = await fetchStatus(headers);
    if (!status) {
      setTest({
        phase: "err",
        message: "Endpoint /api/ds/chat injoignable (build statique ou hors ligne).",
      });
      return;
    }
    setTest({ phase: "ok", status });
  }, [provider, apiKey]);

  const onProviderChange = useCallback((next: ByokProvider) => {
    setProvider(next);
    setSaved(false);
    setTest({ phase: "idle" });
  }, []);

  const onKeyChange = useCallback((next: string) => {
    setApiKey(next);
    setSaved(false);
    setTest({ phase: "idle" });
  }, []);

  return (
    <div className="cfg-chat">
      <p className="cfg-chat__server" role="note">
        {server === null && "Etat du serveur indisponible (endpoint injoignable)."}
        {server !== null && server.configured && (
          <>
            Cle serveur configuree : <strong>{server.provider}</strong>
            {server.model ? ` · ${server.model}` : ""}. Le chat fonctionne sans cle personnelle.
          </>
        )}
        {server !== null && !server.configured && (
          <>Aucune cle serveur configuree : renseigne une cle ci-dessous pour activer l'assistant.</>
        )}
      </p>

      <fieldset className="cfg-chat__fieldset">
        <legend className="cfg-chat__legend">Fournisseur actif</legend>
        <div className="cfg-chat__radios" role="radiogroup" aria-label="Fournisseur LLM du chat">
          {PROVIDERS.map((p) => (
            <label
              key={p.id}
              className="cfg-chat__radio"
              data-checked={provider === p.id ? "true" : undefined}
            >
              <input
                type="radio"
                name="cfg-chat-provider"
                value={p.id}
                checked={provider === p.id}
                onChange={() => onProviderChange(p.id)}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cfg-chat__field">
        <label className="cfg-chat__label" htmlFor="cfg-chat-key">
          Ta cle API {active.label} (optionnelle)
        </label>
        <div className="cfg-chat__key-row">
          <input
            id="cfg-chat-key"
            className="cfg-chat__input"
            type={reveal ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onKeyChange(e.target.value)}
            placeholder={active.keyHint}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="cfg-chat-note"
          />
          <button
            type="button"
            className="cfg-chat__reveal"
            aria-pressed={reveal}
            onClick={() => setReveal((v) => !v)}
          >
            {reveal ? "Masquer" : "Afficher"}
          </button>
        </div>
        <p id="cfg-chat-note" className="cfg-chat__note">
          Ta cle reste dans ton navigateur, jamais envoyee ailleurs qu'a ce serveur pour cette
          requete. Laisse vide pour utiliser la cle du serveur.
        </p>
      </div>

      <div className="cfg-chat__actions">
        <button type="button" className="cfg-chat__btn cfg-chat__btn--primary" onClick={onSave}>
          Enregistrer
        </button>
        <button
          type="button"
          className="cfg-chat__btn"
          onClick={() => void onTest()}
          disabled={test.phase === "testing"}
        >
          {test.phase === "testing" ? "Verification..." : "Verifier la connexion"}
        </button>
        <button
          type="button"
          className="cfg-chat__btn"
          onClick={onClear}
          disabled={!hasKey}
        >
          Effacer ma cle
        </button>
      </div>

      {saved && (
        <p className="cfg-feedback cfg-feedback--ok" role="status" aria-live="polite">
          Preference enregistree ({hasKey ? "cle personnelle active" : "cle serveur"}).
        </p>
      )}
      {test.phase === "ok" && (
        <p className="cfg-feedback cfg-feedback--ok" role="status" aria-live="polite">
          {test.status.configured
            ? `Connexion prete · fournisseur ${test.status.provider}${test.status.model ? ` · ${test.status.model}` : ""} (source : ${test.status.source === "byok" ? "ta cle" : "serveur"}). La validite de la cle est verifiee au premier message.`
            : "Aucune cle active (ni personnelle ni serveur) : l'assistant reste indisponible."}
        </p>
      )}
      {test.phase === "err" && (
        <p className="cfg-feedback cfg-feedback--err" role="alert">
          {test.message}
        </p>
      )}
    </div>
  );
}
