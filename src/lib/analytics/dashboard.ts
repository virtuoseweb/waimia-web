/**
 * Tableau de bord /api/stats : authentification Basic à temps constant et rendu HTML échappé.
 * Logique pure (testée sous node). Ce n'est pas une page du site : CSS minimal inline.
 */
import { timingSafeEqual, createHash } from "node:crypto";
import type { Report } from "./store";

export const DASHBOARD_USER = "waimia";

function digest(s: string): Buffer {
  return createHash("sha256").update(s).digest();
}

/** Vrai si l'en-tête Basic porte `waimia` et le mot de passe attendu. Faux si le mot de passe n'est pas configuré. */
export function basicAuthOk(header: string | null | undefined, password: string | undefined): boolean {
  if (!password || !header?.startsWith("Basic ")) return false;
  let decoded = "";
  try {
    decoded = Buffer.from(header.slice(6).trim(), "base64").toString("utf8");
  } catch {
    return false;
  }
  const i = decoded.indexOf(":");
  if (i < 0) return false;
  // Empreintes de même longueur : timingSafeEqual sans fuite sur la longueur.
  const userOk = timingSafeEqual(digest(decoded.slice(0, i)), digest(DASHBOARD_USER));
  const passOk = timingSafeEqual(digest(decoded.slice(i + 1)), digest(password));
  return userOk && passOk;
}

export function parseDays(value: string | null): 7 | 30 | 90 {
  return value === "7" ? 7 : value === "90" ? 90 : 30;
}

export function esc(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

const SOURCE_LABELS: Record<string, string> = {
  ia: "assistants IA",
  google: "Google",
  bing: "Bing",
  social: "réseaux sociaux",
  direct: "direct",
  interne: "interne",
  autre: "autre",
};

const pct = (a: number, b: number) => (b > 0 ? `${((a / b) * 100).toFixed(1).replace(".", ",")} %` : "n/d");

function table(head: string[], rows: (string | number)[][]): string {
  if (!rows.length) return "<p>Aucune donnée sur la période.</p>";
  return `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="n"' : ""}>${esc(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

export function renderDashboard(report: Report, opts: { days: number; env: string }): string {
  const { days, env } = opts;
  const top = (rows: Report["pages"], n = 20) => rows.slice(0, n);
  const byVisits = [...report.pages].filter((p) => p.visites > 0).sort((a, b) => b.visites - a.visites);
  const total = report.daily.reduce((s, d) => s + d.visites, 0);
  const sections = [
    ["Visites par jour", table(["Jour", "Visites"], report.daily.map((d) => [d.day, d.visites]))],
    [
      "Visites par source",
      table(["Source", "Visites", "Part"], report.sources.map((s) => [SOURCE_LABELS[s.source] ?? s.source, s.visites, pct(s.visites, total)])),
    ],
    ["Pages les plus vues", table(["Page", "Visites"], top(byVisits).map((p) => [p.path, p.visites]))],
    [
      "Entrées depuis Google, par page",
      table(["Page", "Depuis Google"], top([...report.pages].filter((p) => p.google > 0).sort((a, b) => b.google - a.google)).map((p) => [p.path, p.google])),
    ],
    [
      "Entrées depuis les assistants IA, par page",
      table(["Page", "Depuis une IA"], top([...report.pages].filter((p) => p.ia > 0).sort((a, b) => b.ia - a.ia)).map((p) => [p.path, p.ia])),
    ],
    ["Leads par type", table(["Type", "Leads"], report.leadTypes.map((l) => [l.type, l.n]))],
    [
      "Leads par page d'origine",
      table(["Page", "Leads"], top([...report.pages].filter((p) => p.leads > 0).sort((a, b) => b.leads - a.leads)).map((p) => [p.path, p.leads])),
    ],
    [
      "Clics vers le rendez-vous, par page",
      table(["Page", "Clics RDV"], top([...report.pages].filter((p) => p.rdv > 0).sort((a, b) => b.rdv - a.rdv)).map((p) => [p.path, p.rdv])),
    ],
    [
      "Taux lead / visites, par page",
      table(
        ["Page", "Visites", "Leads", "Taux"],
        top([...report.pages].filter((p) => p.visites > 0 && p.leads > 0).sort((a, b) => b.leads / b.visites - a.leads / a.visites)).map((p) => [
          p.path,
          p.visites,
          p.leads,
          pct(p.leads, p.visites),
        ]),
      ),
    ],
  ];
  const nav = ([7, 30, 90] as const)
    .map((d) => `<a href="?jours=${d}&amp;env=${esc(env)}"${d === days ? ' aria-current="page"' : ""}>${d} j</a>`)
    .join(" ");
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Mesure d'audience</title>
<style>
body{font:15px/1.5 system-ui,sans-serif;margin:0 auto;max-width:880px;padding:16px;color:#1a1a1a;background:#fff}
h1{font-size:22px}h2{font-size:17px;margin:28px 0 8px}
nav a{margin-right:12px}nav a[aria-current]{font-weight:700;text-decoration:none}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:4px 8px;border-bottom:1px solid #ddd;word-break:break-word}
td.n,th:not(:first-child){text-align:right;white-space:nowrap}
@media (prefers-color-scheme:dark){body{background:#161616;color:#eee}th,td{border-color:#333}a{color:#8ab4f8}}
</style></head><body>
<h1>Mesure d'audience · ${esc(env)} · ${days} derniers jours</h1>
<nav>${nav}</nav>
<p>${total} visites. Sans cookie, sans IP, sans identifiant. Données conservées 13 mois.</p>
${sections.map(([t, html]) => `<h2>${esc(t)}</h2>${html}`).join("\n")}
</body></html>`;
}
