/* ConfigPanel · React island · pilote le registre des apps internes (apps.config.ts).
 *
 * Deux régimes, une seule UI honnête :
 *   - EN DEV : fetch GET /api/ds/apps (middleware ds-save-dev) pour l'état runtime réel
 *     (enabled configuré + active servi). Propose le toggle via PATCH { keyword, id, enabled }.
 *     Bandeau explicite : le toggle prend effet au REDÉMARRAGE d'astro dev (la config des apps
 *     n'est évaluée qu'au boot). Aucune écriture prod : l'endpoint n'existe qu'en dev.
 *   - EN BUILD/PROD : l'endpoint est absent (output static) → le fetch échoue → on retombe sur
 *     l'état BUILDÉ passé en props (lecture seule) avec la mention « édition disponible en dev
 *     uniquement ». Zéro faux affordance.
 *
 * L'état buildé (`initialApps`) est calculé côté serveur par la page via listAppsState() : il
 * reflète ce qui a été figé au build. C'est la source de vérité en prod, le fallback en dev.
 *
 * 0 nouveau token DS (rule 60) : styles portés par la page hôte (config.astro), classes cfg-*.
 * 0 U+2014 (rule 58). */
import { useEffect, useState, useCallback } from "react";

/** Miroir de AppState (src/apps.config.ts) : état effectif d'une app interne. */
export interface AppState {
  id: string;
  /** État CONFIGURÉ (défaut + override apps-state.json). Effet réel au redémarrage. */
  enabled: boolean;
  /** État ACTIF réellement servi (figé au boot d'astro dev). */
  active: boolean;
  /** Vrai = vraie intégration extraite (injecte sa route). */
  extracted: boolean;
  /** Vrai = façade déclarative (code encore dans l'app hôte). */
  facade: boolean;
  route?: string;
}

interface Props {
  /** État buildé côté serveur (listAppsState()) : source de vérité prod, fallback dev. */
  initialApps: AppState[];
  /** Libellés lisibles par id (dérivés côté page). Fallback = id brut. */
  labels: Record<string, string>;
  /** Mot-clé de sauvegarde (miroir DS Studio) attendu par PATCH /api/ds/apps. */
  saveKeyword: string;
}

type Mode = "loading" | "live" | "readonly";

const label = (labels: Record<string, string>, id: string): string => labels[id] ?? id;

export default function ConfigPanel({ initialApps, labels, saveKeyword }: Props) {
  const [apps, setApps] = useState<AppState[]>(initialApps);
  const [mode, setMode] = useState<Mode>("loading");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Au montage : tenter l'état runtime (dev). Échec (prod/static) → lecture seule sur l'état buildé.
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/ds/apps", { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { ok?: boolean; apps?: AppState[] };
      if (!data || data.ok !== true || !Array.isArray(data.apps)) throw new Error("réponse inattendue");
      setApps(data.apps);
      setMode("live");
    } catch {
      // Endpoint absent (build prod) ou dev non joignable : on garde l'état buildé, lecture seule.
      setApps(initialApps);
      setMode("readonly");
    }
  }, [initialApps]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (app: AppState) => {
      setError(null);
      setNotice(null);
      setPendingId(app.id);
      const next = !app.enabled;
      try {
        const res = await fetch("/api/ds/apps", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ keyword: saveKeyword, id: app.id, enabled: next }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; note?: string };
        if (!res.ok || data.ok !== true) {
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        setNotice(
          `${label(labels, app.id)} ${next ? "activée" : "désactivée"}. ${data.note || "Effet au redémarrage d'astro dev."}`,
        );
        await refresh();
      } catch (e) {
        setError(`Échec du toggle : ${(e as Error).message}`);
      } finally {
        setPendingId(null);
      }
    },
    [labels, refresh, saveKeyword],
  );

  const isLive = mode === "live";

  return (
    <div className="cfg-panel">
      <div className="cfg-statusbar" data-mode={mode}>
        {mode === "loading" && <span className="cfg-badge">Lecture de l'état…</span>}
        {mode === "live" && (
          <span className="cfg-badge cfg-badge--live">DEV · état runtime éditable</span>
        )}
        {mode === "readonly" && (
          <span className="cfg-badge cfg-badge--ro">Lecture seule · édition disponible en dev uniquement</span>
        )}
      </div>

      {isLive && (
        <p className="cfg-hint" role="note">
          Un toggle réécrit <code>src/data/apps-state.json</code> mais ne prend effet qu'au
          <strong> redémarrage d'astro dev</strong> : la config des apps n'est évaluée qu'au boot.
        </p>
      )}

      {notice && (
        <p className="cfg-feedback cfg-feedback--ok" role="status" aria-live="polite">
          {notice}
        </p>
      )}
      {error && (
        <p className="cfg-feedback cfg-feedback--err" role="alert">
          {error}
        </p>
      )}

      <div className="cfg-table-wrap">
        <table className="cfg-table">
          <thead>
            <tr>
              <th scope="col">App</th>
              <th scope="col">Statut</th>
              <th scope="col">Route</th>
              <th scope="col">Configuré</th>
              <th scope="col">Servi</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => {
              const diverges = app.enabled !== app.active;
              return (
                <tr key={app.id}>
                  <th scope="row" className="cfg-app">
                    <span className="cfg-app-name">{label(labels, app.id)}</span>
                    <span className="cfg-app-id">{app.id}</span>
                  </th>
                  <td>
                    <span className="cfg-tag" data-kind={app.extracted ? "extracted" : "facade"}>
                      {app.extracted ? "Extraite" : "Façade"}
                    </span>
                  </td>
                  <td>
                    {app.route ? (
                      <a className="cfg-route" href={app.route}>
                        {app.route}
                      </a>
                    ) : (
                      <span className="cfg-route cfg-route--none">aucune</span>
                    )}
                  </td>
                  <td>
                    <span className="cfg-state" data-on={app.enabled ? "true" : "false"}>
                      {app.enabled ? "activée" : "désactivée"}
                    </span>
                  </td>
                  <td>
                    <span className="cfg-state" data-on={app.active ? "true" : "false"}>
                      {app.active ? "oui" : "non"}
                    </span>
                    {diverges && (
                      <span className="cfg-diverge" title="Toggle en attente de redémarrage">
                        redémarrage requis
                      </span>
                    )}
                  </td>
                  <td>
                    {isLive ? (
                      <button
                        type="button"
                        className="cfg-toggle"
                        aria-pressed={app.enabled}
                        disabled={pendingId === app.id}
                        onClick={() => void toggle(app)}
                      >
                        {pendingId === app.id
                          ? "…"
                          : app.enabled
                            ? "Désactiver"
                            : "Activer"}
                      </button>
                    ) : (
                      <span className="cfg-toggle cfg-toggle--disabled" aria-disabled="true">
                        dev uniquement
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
