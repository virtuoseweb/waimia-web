/* DashboardSeoApp · île React du POC dashboard SEO (waimia.com/dashboard-seo).
 *
 * Rôle (phase 1) : lecture des pages suivies (mémoire git-based en .md, passée en props) +
 * analyse PageSpeed Insights v5 EN LIVE (fetch client, sans OAuth). Zéro serveur, zéro BDD :
 * la mémoire vit dans les .md de la collection `dashboard-seo`, elle s'édite par commit.
 *
 * Ce que fait CETTE île :
 *   - liste les pages suivies + rend leur mémoire markdown (read-only) ;
 *   - bouton « Analyser » par page → PageSpeed Insights v5 → 4 scores + top audits non-passés ;
 *   - bouton « Tout analyser » séquentiel ;
 *   - gère loading / erreur réseau / quota proprement (pas de crash) ;
 *   - « Se connecter avec Google » DÉSACTIVÉ (Search Console = phase 2, OAuth).
 *
 * Contraintes DS : 0 valeur en dur (tokens var(--*)), styles dans <style is:global> côté page
 * (un style hydraté provoque un mismatch SSR/client, cf pattern CatalogueExplorer).
 */
import { useState } from "react";
import { SITE } from "../../site.config";

// ─── Contrats ───
export interface TrackedPage {
  id: string;
  url: string; // chemin relatif, ex. '/' ou '/services/site-web-ia'
  label: string;
  priority: "haute" | "normale";
  addedAt: string; // ISO
  memory: string; // corps markdown brut du .md (la « BDD » git-based)
}

interface AuditItem {
  id: string;
  title: string;
  displayValue: string;
}
interface Scores {
  performance: number | null;
  accessibility: number | null;
  seo: number | null;
  bestPractices: number | null;
}
type Phase = "idle" | "loading" | "done" | "error";
interface Analysis {
  phase: Phase;
  scores?: Scores;
  audits?: AuditItem[];
  error?: string;
}

interface Props {
  pages: TrackedPage[];
  origin?: string;
}

const CATEGORY_LABELS: Record<keyof Scores, string> = {
  performance: "Performance",
  accessibility: "Accessibilité",
  seo: "SEO",
  bestPractices: "Bonnes pratiques",
};

const SCORE_ORDER: (keyof Scores)[] = [
  "performance",
  "accessibility",
  "bestPractices",
  "seo",
];

/** Bande de score → data-attribut (code couleur DS : bon/moyen/faible via tokens existants). */
function scoreBand(v: number | null): "na" | "good" | "mid" | "poor" {
  if (v === null || Number.isNaN(v)) return "na";
  if (v >= 90) return "good";
  if (v >= 50) return "mid";
  return "poor";
}

/** Rendu markdown minimal (lecture seule) : ## sous-titres, - puces, lignes = paragraphes.
 * Volontairement léger (0 dépendance) : la mémoire est un journal de notes daté. */
function renderMemory(md: string): React.ReactNode {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flushBullets = () => {
    if (bullets.length) {
      out.push(
        <ul className="dsq-mem-list" key={`ul-${out.length}`}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushBullets();
      continue;
    }
    if (line.startsWith("## ")) {
      flushBullets();
      out.push(
        <h4 className="dsq-mem-sub" key={`h-${out.length}`}>
          {line.slice(3).trim()}
        </h4>,
      );
    } else if (line.startsWith("- ")) {
      bullets.push(line.slice(2).trim());
    } else {
      flushBullets();
      out.push(
        <p className="dsq-mem-p" key={`p-${out.length}`}>
          {line.trim()}
        </p>,
      );
    }
  }
  flushBullets();
  return out;
}

/** Appel réel PageSpeed Insights v5 (public, sans clé au quota faible). */
async function runPageSpeed(fullUrl: string): Promise<{ scores: Scores; audits: AuditItem[] }> {
  const params = new URLSearchParams();
  params.set("url", fullUrl);
  ["PERFORMANCE", "ACCESSIBILITY", "SEO", "BEST_PRACTICES"].forEach((c) =>
    params.append("category", c),
  );
  params.set("strategy", "MOBILE");

  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
  );
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      data?.error?.message ??
      `Réponse ${res.status} de l'API PageSpeed (probable quota atteint sans clé API).`;
    throw new Error(msg);
  }
  const lr = data?.lighthouseResult;
  if (!lr) throw new Error("Réponse PageSpeed sans lighthouseResult (URL inaccessible ?).");

  const cats = lr.categories ?? {};
  const pct = (c: { score?: number | null } | undefined): number | null =>
    c && typeof c.score === "number" ? Math.round(c.score * 100) : null;
  const scores: Scores = {
    performance: pct(cats.performance),
    accessibility: pct(cats.accessibility),
    seo: pct(cats.seo),
    bestPractices: pct(cats["best-practices"]),
  };

  // Top audits non-passés (score < 1, applicables), triés du plus faible au plus fort.
  const auditsMap = lr.audits ?? {};
  const audits: AuditItem[] = Object.values<any>(auditsMap)
    .filter(
      (a) =>
        a &&
        typeof a.score === "number" &&
        a.score < 1 &&
        a.scoreDisplayMode !== "notApplicable" &&
        a.scoreDisplayMode !== "informative" &&
        a.scoreDisplayMode !== "manual",
    )
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((a) => ({
      id: a.id,
      title: a.title ?? a.id,
      displayValue: a.displayValue ?? "",
    }));

  return { scores, audits };
}

export default function DashboardSeoApp({ pages, origin = SITE.url }: Props) {
  const [state, setState] = useState<Record<string, Analysis>>({});
  const [batchRunning, setBatchRunning] = useState(false);

  const analyze = async (page: TrackedPage) => {
    setState((s) => ({ ...s, [page.id]: { phase: "loading" } }));
    try {
      const { scores, audits } = await runPageSpeed(`${origin}${page.url}`);
      setState((s) => ({ ...s, [page.id]: { phase: "done", scores, audits } }));
    } catch (err) {
      setState((s) => ({
        ...s,
        [page.id]: {
          phase: "error",
          error: err instanceof Error ? err.message : "Erreur inconnue.",
        },
      }));
    }
  };

  const analyzeAll = async () => {
    setBatchRunning(true);
    for (const page of pages) {
      // Séquentiel : PageSpeed est lent (15-40 s) et a un quota strict sans clé.
      await analyze(page);
    }
    setBatchRunning(false);
  };

  return (
    <div className="dsq">
      {/* ── Barre d'actions ── */}
      <div className="dsq-toolbar">
        <div className="dsq-toolbar-left">
          <button
            type="button"
            className="dsq-btn dsq-btn--primary"
            onClick={analyzeAll}
            disabled={batchRunning}
          >
            {batchRunning ? "Analyse en cours…" : "Tout analyser"}
          </button>
          <span className="dsq-hint">
            Analyse live via PageSpeed Insights (peut prendre 15 à 40 s par page).
          </span>
        </div>
        <div className="dsq-toolbar-right">
          <button
            type="button"
            className="dsq-btn dsq-btn--ghost"
            disabled
            title="Search Console : phase 2 (OAuth)"
          >
            Se connecter avec Google
          </button>
          <span className="dsq-badge">Phase 2</span>
        </div>
      </div>

      {/* ── Liste des pages suivies ── */}
      <ul className="dsq-pages">
        {pages.map((page) => {
          const a = state[page.id] ?? { phase: "idle" as Phase };
          return (
            <li className="dsq-page" key={page.id}>
              <header className="dsq-page-head">
                <div className="dsq-page-id">
                  <span className="dsq-page-label">{page.label}</span>
                  <a
                    className="dsq-page-url"
                    href={`${origin}${page.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {page.url}
                  </a>
                </div>
                <div className="dsq-page-actions">
                  <span
                    className="dsq-prio"
                    data-prio={page.priority}
                    title={`Priorité ${page.priority}`}
                  >
                    {page.priority}
                  </span>
                  <button
                    type="button"
                    className="dsq-btn dsq-btn--outline"
                    onClick={() => analyze(page)}
                    disabled={a.phase === "loading" || batchRunning}
                  >
                    {a.phase === "loading" ? "Analyse…" : "Analyser"}
                  </button>
                </div>
              </header>

              {/* Résultat de l'analyse */}
              <div className="dsq-result">
                {a.phase === "idle" && (
                  <p className="dsq-idle">Pas encore analysée. Lance « Analyser » pour mesurer les scores.</p>
                )}
                {a.phase === "loading" && (
                  <p className="dsq-loading" role="status">
                    Mesure en cours via PageSpeed Insights…
                  </p>
                )}
                {a.phase === "error" && (
                  <p className="dsq-error" role="alert">
                    Échec de l'analyse : {a.error}
                  </p>
                )}
                {a.phase === "done" && a.scores && (
                  <>
                    <div className="dsq-scores">
                      {SCORE_ORDER.map((k) => {
                        const v = a.scores![k];
                        return (
                          <div className="dsq-score" data-band={scoreBand(v)} key={k}>
                            <span className="dsq-score-val">{v === null ? "n/d" : v}</span>
                            <span className="dsq-score-cat">{CATEGORY_LABELS[k]}</span>
                          </div>
                        );
                      })}
                    </div>
                    {a.audits && a.audits.length > 0 ? (
                      <div className="dsq-audits">
                        <h4 className="dsq-audits-title">Points à améliorer (top {a.audits.length})</h4>
                        <ul className="dsq-audits-list">
                          {a.audits.map((au) => (
                            <li className="dsq-audit" key={au.id}>
                              <span className="dsq-audit-t">{au.title}</span>
                              {au.displayValue && (
                                <span className="dsq-audit-v">{au.displayValue}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="dsq-audits-empty">Aucun audit bloquant remonté.</p>
                    )}
                  </>
                )}
              </div>

              {/* Panneau mémoire git-based (read-only) */}
              <details className="dsq-mem">
                <summary className="dsq-mem-summary">
                  Mémoire de la page
                  <span className="dsq-mem-note">git-based : s'édite par commit</span>
                </summary>
                <div className="dsq-mem-body">{renderMemory(page.memory)}</div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
