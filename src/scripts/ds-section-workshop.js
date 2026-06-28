// DS Studio · Atelier de section (vanilla, 0 dépendance)
//
// Principe : on personnalise UNE section du catalogue et la preview réagit EN DIRECT
// SANS RECHARGEMENT. On ne touche JAMAIS l'attribut `src` de l'iframe d'atelier après
// le 1er chargement d'un type : toutes les modifications se font en manipulant le DOM
// de l'iframe via `iframe.contentDocument`.
//
//   - background → set `data-bg` sur l'élément racine <section> dans l'iframe.
//     Tous les composants ink-ready réagissent via leur règle `.x[data-bg='ink'] { … }`.
//   - variant (enum *variant*) → classe `is-variant-<value>` ajoutée sur la racine
//     (utilitaire générique, en plus de l'éventuelle classe portée par le composant).
//   - champs texte (titre / kicker / lede) → remplacement de `textContent` sur une
//     cible générique trouvée dans la section (1er h1/h2, [class*=kicker], 1er <p>).
//
// Le mapping des champs par type est injecté par le frontmatter Astro via
// <script type="application/json" id="ds-workshop-data">.
//
// Init alignée sur ds-studio.js (astro:page-load + fallback), garde anti double-bind.

function initSectionWorkshop() {
  const container = document.querySelector('.studio');
  const root = document.getElementById('ds-workshop');
  const dataEl = document.getElementById('ds-workshop-data');
  if (!container || !root || !dataEl) return; // pas la page studio / panneau absent
  if (root.dataset.workshopInit === '1') return; // déjà branché sur ce DOM
  root.dataset.workshopInit = '1';

  const DATA = safeParse(dataEl.textContent) || {};
  const FIELDS = DATA.fields || {}; // { type: { background: ['paper',…], variants: {field:[…]}, texts: [{field,role,value}] } }
  const SCHEMES = DATA.schemes || []; // [{id,label}] · 16 schémas couleur globaux

  const frame = root.querySelector('#workshop-preview');
  const typeLabel = root.querySelector('#workshop-current-type');
  const bgGroup = root.querySelector('#workshop-bg-group');
  const variantsHost = root.querySelector('#workshop-variants');
  const presetsHost = root.querySelector('#workshop-presets');
  const schemesHost = root.querySelector('#workshop-schemes');
  const textsHost = root.querySelector('#workshop-texts');
  const emptyHint = root.querySelector('#workshop-empty');
  const exportBtn = root.querySelector('#workshop-export');
  const openPreview = root.querySelector('#workshop-open-preview');
  const resetBtn = root.querySelector('#workshop-reset');

  // État courant de l'atelier (le type actif + les overrides appliqués).
  let activeType = '';
  let frameLoads = 0; // compteur de (re)chargements de l'iframe : preuve de non-reload
  const overrides = { background: null, variants: {}, texts: {}, preset: null, scheme: null };

  // Le compteur de loads est aussi exposé dans la fenêtre de l'iframe pour la preuve GF-1.
  if (frame) {
    frame.addEventListener('load', () => {
      frameLoads += 1;
      try {
        frame.contentWindow.__workshopLoads = frameLoads;
      } catch {
        /* cross-origin impossible ici (même origine), ignoré par prudence */
      }
      // À chaque (re)chargement réel du type, on ré-applique les overrides courants
      // (utile au tout 1er load d'un type) puis on hérite aussi des tokens LIVE.
      applyAllOverrides();
    });
  }

  function safeParse(txt) {
    try {
      return JSON.parse(txt || '{}');
    } catch {
      return null;
    }
  }

  // ── Accès à la racine de section dans l'iframe ─────────────────────────────
  function sectionRoot() {
    const doc = frame && frame.contentDocument;
    if (!doc || !doc.body) return null;
    return doc.body.querySelector('section') || doc.body.firstElementChild || null;
  }

  // ── Application des overrides (background + variants + textes) ──────────────
  function applyBackground() {
    const el = sectionRoot();
    if (!el) return;
    if (overrides.background) el.setAttribute('data-bg', overrides.background);
    else el.removeAttribute('data-bg');
  }

  function applyVariants() {
    const el = sectionRoot();
    if (!el) return;
    // Retire toute classe utilitaire is-variant-* posée précédemment, puis ré-applique.
    [...el.classList].forEach((c) => {
      if (c.indexOf('is-variant-') === 0) el.classList.remove(c);
    });
    Object.values(overrides.variants).forEach((value) => {
      if (value) el.classList.add(`is-variant-${value}`);
    });
  }

  // Trouve l'élément DOM cible d'un champ texte par son rôle (title|kicker|lede).
  function textTarget(role) {
    const el = sectionRoot();
    if (!el) return null;
    if (role === 'title') return el.querySelector('h1, h2');
    if (role === 'kicker') {
      return (
        el.querySelector('[class*="kicker" i], [class*="eyebrow" i], [class*="spec" i]') || null
      );
    }
    if (role === 'lede') {
      return (
        el.querySelector('[class*="lede" i], [class*="lead" i], [class*="intro" i], [class*="context" i], [class*="subtitle" i]') ||
        el.querySelector('p') ||
        null
      );
    }
    return null;
  }

  function applyTexts() {
    Object.entries(overrides.texts).forEach(([role, value]) => {
      const target = textTarget(role);
      if (target && value != null) target.textContent = value; // no-op sûr si introuvable
    });
  }

  function applyAllOverrides() {
    applyBackground();
    applyVariants();
    applyTexts();
  }

  // ── Construction du panneau pour un type donné ─────────────────────────────
  function fieldsFor(type) {
    return FIELDS[type] || { background: [], variants: {}, texts: [] };
  }

  function buildBackground(type) {
    if (!bgGroup) return;
    bgGroup.replaceChildren();
    const opts = fieldsFor(type).background || [];
    const wrap = bgGroup.closest('[data-workshop-bg-wrap]');
    if (!opts.length) {
      if (wrap) wrap.hidden = true;
      return;
    }
    if (wrap) wrap.hidden = false;
    // Bouton « défaut » (retire data-bg) + un bouton par valeur de l'enum.
    makeBgButton('défaut', null);
    opts.forEach((value) => makeBgButton(value, value));
  }

  function makeBgButton(label, value) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'studio-btn workshop-bg-btn';
    btn.textContent = label;
    btn.dataset.bgValue = value == null ? '' : value;
    btn.setAttribute('aria-pressed', String(overrides.background === value));
    btn.addEventListener('click', () => {
      overrides.background = value;
      applyBackground();
      syncBgButtons();
    });
    bgGroup.appendChild(btn);
  }

  function syncBgButtons() {
    if (!bgGroup) return;
    bgGroup.querySelectorAll('.workshop-bg-btn').forEach((b) => {
      const v = b.dataset.bgValue || null;
      const on = v === overrides.background;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function buildVariants(type) {
    if (!variantsHost) return;
    variantsHost.replaceChildren();
    const variants = fieldsFor(type).variants || {};
    const entries = Object.entries(variants);
    variantsHost.hidden = entries.length === 0;
    entries.forEach(([field, values]) => {
      const block = document.createElement('div');
      block.className = 'workshop-field';

      const label = document.createElement('span');
      label.className = 'workshop-field-label';
      label.textContent = field;
      block.appendChild(label);

      const row = document.createElement('div');
      row.className = 'workshop-btn-row';
      values.forEach((value) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'studio-btn workshop-variant-btn';
        btn.textContent = value;
        btn.dataset.variantField = field;
        btn.dataset.variantValue = value;
        btn.addEventListener('click', () => {
          // Toggle : recliquer la valeur active la retire.
          overrides.variants[field] = overrides.variants[field] === value ? null : value;
          applyVariants();
          syncVariantButtons();
        });
        row.appendChild(btn);
      });
      block.appendChild(row);
      variantsHost.appendChild(block);
    });
    syncVariantButtons();
  }

  function syncVariantButtons() {
    if (!variantsHost) return;
    variantsHost.querySelectorAll('.workshop-variant-btn').forEach((b) => {
      const on = overrides.variants[b.dataset.variantField] === b.dataset.variantValue;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function buildPresets(type) {
    if (!presetsHost) return;
    presetsHost.replaceChildren();
    const list = (fieldsFor(type).presets) || [];
    const wrap = presetsHost.closest('[data-workshop-presets-wrap]');
    if (!list.length) {
      if (wrap) wrap.hidden = true;
      return;
    }
    if (wrap) wrap.hidden = false;
    list.forEach((preset) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'studio-btn workshop-preset-btn';
      btn.textContent = preset.label;
      btn.dataset.presetId = preset.id;
      btn.addEventListener('click', () => {
        setPreset(preset.id);
        syncPresetButtons();
      });
      presetsHost.appendChild(btn);
    });
    syncPresetButtons();
  }

  function syncPresetButtons() {
    if (!presetsHost) return;
    presetsHost.querySelectorAll('.workshop-preset-btn').forEach((b) => {
      const on = b.dataset.presetId === overrides.preset;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  // Surfaces DS fermées, du plus long au plus court (évite les faux matchs sur préfixes courts).
  const SURFACES = ['paper-2', 'paper-3', 'ink-2', 'ink-3', 'paper', 'ink', 'accent'];

  // Extrait la surface de base d'un id de schéma (ex. 'mono-paper' -> 'paper',
  // 'duo-paper-ink' -> 'paper', 'trio-ink' -> 'ink').
  function parseSchemeBase(id) {
    const rest = String(id).replace(/^(mono|duo|trio)-/, '');
    return SURFACES.find((s) => rest === s || rest.startsWith(s + '-')) || null;
  }

  function buildSchemes() {
    if (!schemesHost) return;
    schemesHost.replaceChildren();
    // Bouton defaut (retire le scheme).
    const defBtn = document.createElement('button');
    defBtn.type = 'button';
    defBtn.className = 'studio-btn workshop-scheme-btn';
    defBtn.textContent = 'défaut';
    defBtn.dataset.schemeId = '';
    defBtn.addEventListener('click', () => {
      setScheme(null);
      syncSchemeButtons();
    });
    schemesHost.appendChild(defBtn);
    SCHEMES.forEach((scheme) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'studio-btn workshop-scheme-btn';
      btn.textContent = scheme.label;
      btn.dataset.schemeId = scheme.id;
      btn.addEventListener('click', () => {
        setScheme(scheme.id);
        syncSchemeButtons();
      });
      schemesHost.appendChild(btn);
    });
    syncSchemeButtons();
  }

  function syncSchemeButtons() {
    if (!schemesHost) return;
    schemesHost.querySelectorAll('.workshop-scheme-btn').forEach((b) => {
      const v = b.dataset.schemeId || null;
      const on = v === overrides.scheme;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  // Preset = reload volontaire de la route preset (re-render complet : props structurelles).
  // C'est le seul reload volontaire avec le changement de type.
  function setPreset(id) {
    if (!frame || !activeType || !id) return;
    overrides.preset = id;
    const nextSrc = `/preview/${activeType}/${id}`;
    if (frame.getAttribute('src') !== nextSrc) frame.setAttribute('src', nextSrc);
    // applyAllOverrides() sera ré-appelé au 'load' (listener existant) -> background/variant/texte conservés.
  }

  // Colorscheme = DOM-patch du background (axe universel, no-reload).
  function setScheme(id) {
    overrides.scheme = id || null;
    const base = id ? parseSchemeBase(id) : null;
    overrides.background = base;
    applyBackground();
    syncBgButtons();
  }

  function buildTexts(type) {
    if (!textsHost) return;
    textsHost.replaceChildren();
    const texts = fieldsFor(type).texts || [];
    textsHost.hidden = texts.length === 0;
    texts.forEach(({ field, role, value }) => {
      const block = document.createElement('label');
      block.className = 'workshop-field workshop-text-field';

      const label = document.createElement('span');
      label.className = 'workshop-field-label';
      label.textContent = `${field} · ${role}`;
      block.appendChild(label);

      const input =
        value && value.length > 64
          ? document.createElement('textarea')
          : document.createElement('input');
      if (input.tagName === 'INPUT') input.type = 'text';
      else input.rows = 2;
      input.className = 'studio-text-input studio-text-input--wide';
      input.value = stripTags(value || '');
      input.dataset.textRole = role;
      input.addEventListener('input', () => {
        overrides.texts[role] = input.value;
        const target = textTarget(role);
        if (target) target.textContent = input.value;
      });
      block.appendChild(input);
      textsHost.appendChild(block);
    });
  }

  // Retire les balises (les titres utilisent parfois <i>…</i> via set:html).
  function stripTags(s) {
    return String(s).replace(/<[^>]*>/g, '');
  }

  // ── Chargement d'un type dans l'atelier (RELOAD volontaire du type seulement) ─
  function loadType(type) {
    if (!frame || !type) return;
    activeType = type;
    // Reset des overrides à chaque changement de type.
    overrides.background = null;
    overrides.variants = {};
    overrides.texts = {};
    overrides.preset = null;
    overrides.scheme = null;
    if (typeLabel) typeLabel.textContent = type;
    if (openPreview) openPreview.setAttribute('href', `/preview/${type}`);

    buildBackground(type);
    buildVariants(type);
    buildTexts(type);
    buildPresets(type);
    buildSchemes();
    syncBgButtons();

    const f = fieldsFor(type);
    const hasControls =
      (f.background && f.background.length) ||
      Object.keys(f.variants || {}).length ||
      (f.texts && f.texts.length) ||
      (f.presets && f.presets.length) ||
      SCHEMES.length;
    if (emptyHint) emptyHint.hidden = Boolean(hasControls);

    // Changement de TYPE = nouveau src (chargement volontaire). Les éditions de props
    // qui suivent ne toucheront PLUS jamais src (preuve de non-reload).
    const nextSrc = `/preview/${type}`;
    if (frame.getAttribute('src') !== nextSrc) frame.setAttribute('src', nextSrc);
    else applyAllOverrides(); // déjà chargé : ré-applique sans recharger
  }

  // ── Export de la config personnalisée ──────────────────────────────────────
  function buildConfig() {
    const config = { type: activeType };
    if (overrides.background) config.background = overrides.background;
    if (overrides.preset) config.preset = overrides.preset;
    if (overrides.scheme) config.scheme = overrides.scheme;
    Object.entries(overrides.variants).forEach(([field, value]) => {
      if (value) config[field] = value;
    });
    Object.entries(overrides.texts).forEach(([role, value]) => {
      // Retrouve le nom de champ réel (ex. h2_fr) associé au rôle pour CE type.
      const def = (fieldsFor(activeType).texts || []).find((t) => t.role === role);
      if (def && value != null && value !== '') config[def.field] = value;
    });
    return config;
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      if (!activeType) {
        workshopToast('Sélectionne d\'abord un type dans le catalogue');
        return;
      }
      const json = JSON.stringify(buildConfig(), null, 2);
      try {
        await navigator.clipboard.writeText(json);
        workshopToast('Config JSON copiée dans le presse-papiers');
      } catch {
        workshopToast('Presse-papiers indisponible (config affichée ci-dessous)');
      }
      const out = root.querySelector('#workshop-export-out');
      if (out) out.textContent = json;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!activeType) return;
      loadType(activeType); // re-charge le type proprement (reset overrides)
      const out = root.querySelector('#workshop-export-out');
      if (out) out.textContent = '';
      workshopToast('Atelier réinitialisé');
    });
  }

  // Réutilise le toast global du studio s'il existe, sinon en crée un.
  let workshopToastTimer = null;
  function workshopToast(msg) {
    let el = document.getElementById('studio-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'studio-toast';
      el.className = 'studio-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(workshopToastTimer);
    workshopToastTimer = window.setTimeout(() => el.classList.remove('is-on'), 2600);
  }

  // ── Branchement sur le listing catalogue existant ──────────────────────────
  // Les boutons [data-catalog-type] pilotent déjà l'iframe #catalog-preview de
  // l'inspecteur. On les écoute AUSSI pour charger l'atelier (sans interférer).
  container.querySelectorAll('[data-catalog-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-catalog-type');
      loadType(type);
      const workshop = document.getElementById('ds-workshop');
      if (workshop) workshop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // API d'inspection (preuve GF-1 + tests).
  window.dsWorkshop = {
    load: loadType,
    setBackground: (v) => {
      overrides.background = v;
      applyBackground();
      syncBgButtons();
      return getComputedBackground();
    },
    setText: (role, value) => {
      overrides.texts[role] = value;
      const target = textTarget(role);
      if (target) target.textContent = value;
      return target ? target.textContent : null;
    },
    setPreset,
    setScheme,
    config: buildConfig,
    loads: () => frameLoads,
    state: () => ({ activeType, overrides: JSON.parse(JSON.stringify(overrides)) }),
    sectionRoot,
    computedBackground: getComputedBackground,
  };

  function getComputedBackground() {
    const el = sectionRoot();
    if (!el || !frame.contentWindow) return null;
    return frame.contentWindow.getComputedStyle(el).backgroundColor;
  }

  // Charge le type par défaut affiché par le catalogue (sans dépendre d'un clic).
  const initial = typeLabel ? typeLabel.dataset.defaultType : '';
  if (initial) loadType(initial);
}

document.addEventListener('astro:page-load', initSectionWorkshop);
if (document.readyState !== 'loading') initSectionWorkshop();
else document.addEventListener('DOMContentLoaded', initSectionWorkshop);
