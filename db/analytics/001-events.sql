-- Mesure d'audience maison de waimia.com (Neon, UE). Référence : exécuter à la main, une fois,
-- sur chaque branche de la base (production, preview). Jamais lancé par le site.
-- Aucune IP, aucun user-agent, aucun identifiant : voir src/lib/analytics/event.ts.
CREATE TABLE IF NOT EXISTS events (
  id bigserial PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  env text NOT NULL,              -- production | preview
  kind text NOT NULL,             -- pageview | click | lead
  name text,                      -- rdv_click | contact | devis | lead-magnet | newsletter
  path text NOT NULL,             -- chemin de la page, sans query ni hash
  referrer_host text,             -- nom d'hôte du référent seulement
  source text,                    -- google | bing | ia | social | direct | interne | autre
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device text,                    -- mobile | tablette | ordinateur
  detail text                     -- slug d'aimant ou offre (leads)
);
CREATE INDEX IF NOT EXISTS events_kind_ts_idx ON events (kind, ts);
