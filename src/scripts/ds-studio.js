// DS Studio · éditeur de tokens LIVE + carte d'impact (vanilla, 0 dépendance)
//
// Principe ACSS / Core Framework : on édite la VALEUR d'un token CSS, on appelle
// document.documentElement.style.setProperty('--x', v) et, comme tout le rendu de
// la galerie consomme var(--x), tout change instantanément dans le même document.
//
// Données injectées via <script type="application/json" id="ds-studio-data">
//   { consumers: { "--accent": { count: 184, files: [...] } } }
//
// Init sur astro:page-load (le ClientRouter de Base émet cet événement au 1er load ET
// après chaque View Transition) + fallback immédiat. Garde anti double-bind via un
// marqueur posé sur le conteneur .studio (remplacé à chaque navigation → ré-init propre).

function initStudio() {
  const root = document.documentElement;
  const container = document.querySelector('.studio');
  const dataEl = document.getElementById('ds-studio-data');
  if (!container || !dataEl) return; // pas sur la page studio
  if (container.dataset.studioInit === '1') return; // déjà branché sur ce DOM
  container.dataset.studioInit = '1';

  const DATA = JSON.parse(dataEl.textContent || '{}');
  const consumers = DATA.consumers || {};

  // Tokens modifiés (pour l'export ciblé)
  const dirty = new Map(); // token -> valeur courante

  // ── Application d'un override ──────────────────────────────────────────────
  function applyToken(token, value) {
    root.style.setProperty(token, value);
    dirty.set(token, value);
    markRowDirty(token, true);
    refreshExportCount();
  }

  function markRowDirty(token, on) {
    const row = container.querySelector(`[data-token-row="${token}"]`);
    if (row) row.classList.toggle('is-dirty', on);
  }

  // ── Synchronisation des contrôles d'un même token ──────────────────────────
  function syncControls(token, value, source) {
    container.querySelectorAll(`[data-token="${token}"]`).forEach((ctrl) => {
      if (ctrl === source) return;
      ctrl.value = value;
    });
  }

  // ── Branchement de tous les contrôles ──────────────────────────────────────
  container.querySelectorAll('[data-token]').forEach((ctrl) => {
    ctrl.addEventListener('input', () => {
      const token = ctrl.getAttribute('data-token');
      let value = ctrl.value;
      // Un range/number porte une unité voisine via data-unit
      const unit = ctrl.getAttribute('data-unit') || '';
      if (unit && (ctrl.type === 'range' || ctrl.type === 'number')) {
        value = value + unit;
      }
      syncControls(token, ctrl.value, ctrl);
      applyToken(token, value);
    });
  });

  // ── Sélection d'un token → carte d'impact ──────────────────────────────────
  const impactName = container.querySelector('#impact-token');
  const impactCount = container.querySelector('#impact-count');
  const impactList = container.querySelector('#impact-list');

  function showImpact(token) {
    const info = consumers[token] || { count: 0, files: [] };
    if (impactName) impactName.textContent = token;
    if (impactCount) impactCount.textContent = String(info.count);
    if (impactList) {
      impactList.replaceChildren();
      if (!info.files.length) {
        const li = document.createElement('li');
        li.className = 'studio-impact-empty';
        li.textContent = 'Aucun consommateur direct via var().';
        impactList.appendChild(li);
      } else {
        info.files.forEach((f) => {
          const li = document.createElement('li');
          li.textContent = f;
          impactList.appendChild(li);
        });
      }
    }
    container.querySelectorAll('[data-token-row]').forEach((r) =>
      r.classList.toggle('is-selected', r.getAttribute('data-token-row') === token),
    );
  }

  container.querySelectorAll('[data-token-row]').forEach((row) => {
    const token = row.getAttribute('data-token-row');
    row.addEventListener('click', () => showImpact(token));
  });

  // ── Recherche / filtre ─────────────────────────────────────────────────────
  const search = container.querySelector('#token-search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      const visibleGroups = new Set();
      container.querySelectorAll('[data-token-row]').forEach((row) => {
        const token = (row.getAttribute('data-token-row') || '').toLowerCase();
        const hit = !q || token.includes(q);
        row.hidden = !hit;
        if (hit) visibleGroups.add(row.getAttribute('data-group'));
      });
      container.querySelectorAll('[data-group-block]').forEach((block) => {
        const g = block.getAttribute('data-group-block');
        block.hidden = q ? !visibleGroups.has(g) : false;
      });
    });
  }

  // ── Reset ──────────────────────────────────────────────────────────────────
  const resetBtn = container.querySelector('#token-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      dirty.forEach((_v, token) => {
        root.style.removeProperty(token);
        markRowDirty(token, false);
        container.querySelectorAll(`[data-token="${token}"]`).forEach((ctrl) => {
          const def = ctrl.getAttribute('data-default');
          if (def !== null) ctrl.value = def;
        });
      });
      dirty.clear();
      refreshExportCount();
      toast('Tokens réinitialisés aux valeurs du fichier tokens.css');
    });
  }

  // ── Export ─────────────────────────────────────────────────────────────────
  const exportBtn = container.querySelector('#token-export');
  const exportCount = container.querySelector('#export-count');

  function refreshExportCount() {
    if (exportCount) exportCount.textContent = String(dirty.size);
  }

  function buildExport() {
    if (!dirty.size) return '/* Aucun token modifié */';
    const lines = [...dirty.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([t, v]) => `  ${t}: ${v};`);
    return `:root {\n${lines.join('\n')}\n}`;
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      const css = buildExport();
      const out = container.querySelector('#export-output');
      if (out) out.textContent = css;
      try {
        await navigator.clipboard.writeText(css);
        toast(dirty.size ? `${dirty.size} token(s) copiés dans le presse-papiers` : 'Rien à exporter');
      } catch {
        toast('Bloc CSS généré ci-dessous (copie manuelle)');
      }
    });
  }

  // ── Toast ────────────────────────────────────────────────────────────────────
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById('studio-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'studio-toast';
      el.className = 'studio-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove('is-on'), 2600);
  }

  refreshExportCount();
}

// Le ClientRouter (Base.astro) émet astro:page-load au 1er chargement ET après chaque
// View Transition. Le marqueur sur .studio empêche un double-bind si les deux chemins
// se déclenchent sur le même DOM.
document.addEventListener('astro:page-load', initStudio);
if (document.readyState !== 'loading') initStudio();
else document.addEventListener('DOMContentLoaded', initStudio);
