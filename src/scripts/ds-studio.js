import { renderContrast } from './ds-studio-contrast.js';

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
  const tokenSections = DATA.tokenSections || {};
  const demoPresets = DATA.demoPresets || {};
  const originals = new Map(Object.entries(DATA.originals || {}));
  const SAVE_PENDING_KEY = 'ds-save-pending';
  const SAVE_RELOADED_KEY = 'ds-save-reloaded';
  const PRESETS_KEY = 'ds-studio-presets';
  let hashSyncTimer = null;

  // Tokens modifiés (pour l'export ciblé)
  const dirty = new Map(); // token -> valeur courante
  const undoStack = [];
  const redoStack = [];
  const undoBtn = container.querySelector('#token-undo');
  const redoBtn = container.querySelector('#token-redo');
  const contrastList = container.querySelector('#contrast-list');
  const previewFrame = container.querySelector('#page-preview');
  const catalogFrame = container.querySelector('#catalog-preview');

  function setSaveState(state) {
    document.body.setAttribute('data-save-state', state);
  }

  function scheduleHashSync() {
    clearTimeout(hashSyncTimer);
    hashSyncTimer = window.setTimeout(() => {
      const base = location.pathname + location.search;
      if (!dirty.size) {
        history.replaceState(null, '', base);
        return;
      }
      const hash = [...dirty.entries()]
        .map(([token, value]) => `${token}=${encodeURIComponent(value)}`)
        .join('&');
      history.replaceState(null, '', `${base}#${hash}`);
    }, 300);
  }

  function currentValue(token) {
    return dirty.get(token) ?? originals.get(token) ?? getComputedStyle(root).getPropertyValue(token).trim();
  }

  function refreshHistoryButtons() {
    if (undoBtn) undoBtn.disabled = undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = redoStack.length === 0;
  }

  function refreshDerivedSurfaces() {
    renderContrast(root, contrastList);
    applyOverridesToPreview();
    renderCompare();
  }

  // ── Application d'un override ──────────────────────────────────────────────
  function applyToken(token, value, options = {}) {
    const { record = true, sync = true } = options;
    const oldValue = currentValue(token);
    if (record && oldValue !== value) {
      undoStack.push({ token, oldValue, newValue: value });
      redoStack.length = 0;
    }

    const original = originals.get(token);
    if (value === original) {
      root.style.removeProperty(token);
      dirty.delete(token);
    } else {
      root.style.setProperty(token, value);
      dirty.set(token, value);
    }
    if (sync) syncControls(token, value, null);
    markRowDirty(token, dirty.has(token));
    refreshExportCount();
    refreshHistoryButtons();
    refreshDerivedSurfaces();
    scheduleHashSync();
  }

  function markRowDirty(token, on) {
    const row = container.querySelector(`[data-token-row="${token}"]`);
    if (row) row.classList.toggle('is-dirty', on);
  }

  // ── Synchronisation des contrôles d'un même token ──────────────────────────
  function syncControls(token, value, source) {
    container.querySelectorAll(`[data-token="${token}"]`).forEach((ctrl) => {
      if (ctrl === source) return;
      const unit = ctrl.getAttribute('data-unit') || '';
      ctrl.value = unit && String(value).endsWith(unit) ? String(value).slice(0, -unit.length) : value;
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
      applyToken(token, value, { sync: false });
    });
  });

  // ── Sélection d'un token → carte d'impact ──────────────────────────────────
  const impactName = container.querySelector('#impact-token');
  const impactCount = container.querySelector('#impact-count');
  const impactList = container.querySelector('#impact-list');
  const inspectorToken = container.querySelector('#inspector-token');
  const inspectorCount = container.querySelector('#inspector-count');
  const inspectorList = container.querySelector('#inspector-sections');

  // ── Inspecteur : sections cataloguées consommant le token (manifest) ───────
  function showInspector(token) {
    const sections = tokenSections[token] || [];
    if (inspectorToken) inspectorToken.textContent = token;
    if (inspectorCount) inspectorCount.textContent = String(sections.length);
    if (!inspectorList) return;
    inspectorList.replaceChildren();
    sections.forEach((type) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'studio-inspector-btn';
      btn.dataset.inspectorType = type;
      btn.textContent = type;
      btn.addEventListener('click', () => {
        loadCatalogType(type);
        const catalogSection = container.querySelector('#catalogue');
        if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(btn);
      inspectorList.appendChild(li);
    });
  }

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
    showInspector(token);
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
  function resetTokens() {
    [...dirty.keys()].forEach((token) => {
      root.style.removeProperty(token);
      markRowDirty(token, false);
      syncControls(token, originals.get(token) || '', null);
    });
    dirty.clear();
    undoStack.length = 0;
    redoStack.length = 0;
    refreshExportCount();
    refreshHistoryButtons();
    refreshDerivedSurfaces();
    scheduleHashSync();
    setSaveState('idle');
    toast('Tokens réinitialisés aux valeurs du fichier tokens.css');
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetTokens);
  }

  // ── Export ─────────────────────────────────────────────────────────────────
  const exportBtn = container.querySelector('#token-export');
  const exportCount = container.querySelector('#export-count');

  function refreshExportCount() {
    if (exportCount) exportCount.textContent = String(dirty.size);
  }

  function undo() {
    const entry = undoStack.pop();
    if (!entry) return null;
    applyToken(entry.token, entry.oldValue, { record: false });
    redoStack.push(entry);
    refreshHistoryButtons();
    return { token: entry.token, value: entry.oldValue };
  }

  function redo() {
    const entry = redoStack.pop();
    if (!entry) return null;
    applyToken(entry.token, entry.newValue, { record: false });
    undoStack.push(entry);
    refreshHistoryButtons();
    return { token: entry.token, value: entry.newValue };
  }

  if (undoBtn) undoBtn.addEventListener('click', undo);
  if (redoBtn) redoBtn.addEventListener('click', redo);

  if (window.__dsStudioKeydownHandler) {
    document.removeEventListener('keydown', window.__dsStudioKeydownHandler);
  }
  window.__dsStudioKeydownHandler = (event) => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'z') return;
    const target = event.target;
    const isTextInput = target instanceof HTMLTextAreaElement
      || (target instanceof HTMLInputElement && ['text', 'search', 'password', 'email', 'url', 'number'].includes(target.type))
      || (target instanceof HTMLElement && target.isContentEditable);
    if (isTextInput) return;
    event.preventDefault();
    if (event.shiftKey) redo();
    else undo();
  };
  document.addEventListener('keydown', window.__dsStudioKeydownHandler);

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

  // ── Enregistrer (déployer) : persistance git-based DEV-ONLY ────────────────
  // POST /api/ds/save (middleware actif uniquement sous `astro dev`). On envoie
  // UNIQUEMENT les tokens modifiés (Map `dirty`) + le mot-clé de sauvegarde. Au
  // succès : overlay "cuisson" + compte à rebours FIXE de fixedDelaySeconds, puis
  // location.reload(). Pas de polling Vercel : délai fixe (setTimeout + interval).
  const saveBtn = container.querySelector('#token-save');
  const keywordInput = container.querySelector('[data-save-keyword]');
  let countdownTimer = null;
  let reloadTimer = null;

  function buildTokensPayload() {
    const out = {};
    dirty.forEach((v, t) => {
      out[t] = v;
    });
    return out;
  }

  // Overlay plein écran (cuisson / succès en attente de reload, ou erreur).
  function ensureOverlay() {
    let el = document.getElementById('studio-overlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'studio-overlay';
      el.className = 'studio-overlay';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    return el;
  }

  function clearOverlayTimers() {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    if (reloadTimer) {
      clearTimeout(reloadTimer);
      reloadTimer = null;
    }
  }

  function showCookingOverlay(seconds, branch, commit, onComplete) {
    const total = Number(seconds) > 0 ? Math.floor(Number(seconds)) : 180;
    const el = ensureOverlay();
    el.classList.remove('studio-overlay--error');
    el.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'studio-overlay-card';

    const steam = document.createElement('div');
    steam.className = 'studio-steam';
    steam.setAttribute('aria-hidden', 'true');
    steam.append(
      Object.assign(document.createElement('span'), { className: 'studio-steam-puff' }),
      Object.assign(document.createElement('span'), { className: 'studio-steam-puff' }),
      Object.assign(document.createElement('span'), { className: 'studio-steam-puff' }),
    );

    const title = document.createElement('p');
    title.className = 'studio-overlay-title';
    title.textContent = 'Déploiement en cours · ~3 min';

    const sub = document.createElement('p');
    sub.className = 'studio-overlay-sub';
    sub.textContent = `Commit ${commit || '...'} sur ${branch || 'la branche courante'}. La preview se reconstruit, puis la page se recharge.`;

    const count = document.createElement('p');
    count.className = 'studio-overlay-count';
    count.id = 'studio-overlay-count';

    card.append(steam, title, sub, count);
    el.append(card);
    el.classList.add('is-on');

    let remaining = total;
    const render = () => {
      const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
      const ss = String(remaining % 60).padStart(2, '0');
      count.textContent = `${mm}:${ss}`;
    };
    render();

    clearOverlayTimers();
    countdownTimer = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = 0;
        render();
        clearInterval(countdownTimer);
        countdownTimer = null;
        return;
      }
      render();
    }, 1000);

    reloadTimer = window.setTimeout(() => {
      if (onComplete) onComplete();
      else window.location.reload();
    }, total * 1000);
  }

  function showErrorOverlay(message) {
    clearOverlayTimers();
    const el = ensureOverlay();
    el.classList.add('studio-overlay--error');
    el.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'studio-overlay-card';

    const title = document.createElement('p');
    title.className = 'studio-overlay-title';
    title.textContent = 'Échec de la sauvegarde';

    const sub = document.createElement('p');
    sub.className = 'studio-overlay-sub';
    sub.textContent = message || 'Une erreur est survenue.';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'studio-btn studio-overlay-close';
    close.textContent = 'Fermer';
    close.addEventListener('click', () => {
      el.classList.remove('is-on');
      el.innerHTML = '';
    });

    card.append(title, sub, close);
    el.append(card);
    el.classList.add('is-on');
  }

  function rememberPendingSave(data) {
    const pending = {
      savedAt: Date.now(),
      branch: data.branch,
      commit: data.commit,
      count: data.count,
      fixedDelaySeconds: data.fixedDelaySeconds,
    };
    sessionStorage.setItem(SAVE_PENDING_KEY, JSON.stringify(pending));
    sessionStorage.removeItem(SAVE_RELOADED_KEY);
    return pending;
  }

  function finishPendingSave(savedAt) {
    if (sessionStorage.getItem(SAVE_RELOADED_KEY) === String(savedAt)) return;
    sessionStorage.setItem(SAVE_RELOADED_KEY, String(savedAt));
    sessionStorage.removeItem(SAVE_PENDING_KEY);
    window.location.reload();
  }

  async function performSave(keyword) {
    if (!dirty.size) {
      setSaveState('error');
      toast('Aucun changement : modifie au moins un token avant d\'enregistrer');
      return { ok: false, error: 'aucun changement' };
    }

    setSaveState('saving');
    if (saveBtn) {
      saveBtn.disabled = true;
    }
    const prevLabel = saveBtn ? saveBtn.textContent : '';
    if (saveBtn) {
      saveBtn.textContent = 'Envoi...';
    }

    try {
      const resp = await fetch('/api/ds/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tokens: buildTokensPayload(), keyword }),
      });
      let data = {};
      try {
        data = await resp.json();
      } catch {
        data = {};
      }
      if (resp.ok && data.ok) {
        const pending = rememberPendingSave(data);
        setSaveState('done');
        showCookingOverlay(
          data.fixedDelaySeconds,
          data.branch,
          data.commit,
          () => finishPendingSave(pending.savedAt),
        );
        return data;
      }

      const error = data.error || `Erreur ${resp.status}`;
      const map = {
        keyword: 'Mot-clé de sauvegarde incorrect.',
        'refus push main': 'Refus : on ne pousse jamais automatiquement sur main (prod).',
      };
      setSaveState('error');
      showErrorOverlay(map[error] || error);
      return { ok: false, error };
    } catch {
      const error = 'Réseau indisponible (le serveur de dev tourne-t-il ?).';
      setSaveState('error');
      showErrorOverlay(error);
      return { ok: false, error };
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = prevLabel;
      }
    }
  }

  const diffModal = document.getElementById('save-diff-modal');
  const diffList = document.getElementById('save-diff-list');
  const diffConfirm = document.getElementById('save-diff-confirm');
  const diffCancel = document.getElementById('save-diff-cancel');

  function closeDiffModal() {
    if (diffModal) diffModal.hidden = true;
  }

  function openDiffModal() {
    if (!diffModal || !diffList) return;
    diffList.replaceChildren();
    [...dirty.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([token, value]) => {
      const row = document.createElement('div');
      row.className = 'studio-diff-row';
      row.dataset.diffToken = token;

      if (/^#[\da-f]{3,8}$/i.test(value)) {
        const swatch = document.createElement('span');
        swatch.className = 'studio-diff-swatch';
        swatch.style.background = value;
        row.appendChild(swatch);
      }

      const text = document.createElement('span');
      text.textContent = `${token} · ${originals.get(token) || ''} → ${value}`;
      row.appendChild(text);
      diffList.appendChild(row);
    });
    diffModal.hidden = false;
    if (diffConfirm) diffConfirm.focus();
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const keyword = keywordInput ? keywordInput.value.trim() : '';
      if (!dirty.size) {
        performSave(keyword);
        return;
      }
      if (!keyword) {
        toast('Saisis le mot-clé de sauvegarde');
        if (keywordInput) keywordInput.focus();
        return;
      }
      openDiffModal();
    });
  }

  if (diffCancel) diffCancel.addEventListener('click', closeDiffModal);
  if (diffModal) {
    diffModal.addEventListener('click', (event) => {
      if (event.target === diffModal) closeDiffModal();
    });
  }
  if (diffConfirm) {
    diffConfirm.addEventListener('click', () => {
      const keyword = keywordInput ? keywordInput.value.trim() : '';
      closeDiffModal();
      performSave(keyword);
    });
  }

  // ── Viewport de la galerie ─────────────────────────────────────────────────
  const gallery = container.querySelector('.studio-gallery');
  const viewportButtons = [...container.querySelectorAll('[data-viewport]')];

  function setViewport(viewport) {
    if (gallery) gallery.setAttribute('data-active-viewport', viewport);
    viewportButtons.forEach((button) => {
      const active = button.getAttribute('data-viewport') === viewport;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  viewportButtons.forEach((button) => {
    button.addEventListener('click', () => setViewport(button.getAttribute('data-viewport') || 'desktop'));
  });
  setViewport('desktop');

  // ── Preview pleine page ────────────────────────────────────────────────────
  const previewPanel = container.querySelector('#preview-panel');
  const previewRoute = container.querySelector('#preview-route');
  const previewRefresh = container.querySelector('#preview-refresh');

  function applyOverridesToPreview() {
    [previewFrame, catalogFrame].forEach((frame) => {
      const frameRoot = frame?.contentDocument?.documentElement;
      if (!frameRoot) return;
      originals.forEach((_value, token) => frameRoot.style.removeProperty(token));
      if (baselineHeld) return; // mode comparaison : on montre la baseline
      dirty.forEach((value, token) => frameRoot.style.setProperty(token, value));
    });
  }

  function loadPreview(force = false) {
    if (!previewFrame || !previewRoute) return;
    const route = previewRoute.value;
    if (force || previewFrame.getAttribute('src') !== route) previewFrame.setAttribute('src', route);
  }

  if (previewPanel) {
    previewPanel.addEventListener('toggle', () => {
      if (previewPanel.open && !previewFrame?.getAttribute('src')) loadPreview();
    });
  }
  if (previewRoute) previewRoute.addEventListener('change', () => loadPreview(true));
  if (previewRefresh) previewRefresh.addEventListener('click', () => loadPreview(true));
  if (previewFrame) previewFrame.addEventListener('load', applyOverridesToPreview);

  // ── Catalogue : aperçu du type sélectionné (hérite des overrides LIVE) ─────
  const catalogCurrent = container.querySelector('#catalog-current');
  const catalogOpenFiche = container.querySelector('#catalog-open-fiche');
  const catalogOpenPreview = container.querySelector('#catalog-open-preview');

  function loadCatalogType(type) {
    if (!catalogFrame || !type) return;
    catalogFrame.setAttribute('src', `/preview/${type}`);
    if (catalogCurrent) catalogCurrent.textContent = type;
    if (catalogOpenFiche) catalogOpenFiche.setAttribute('href', `/components/${type}`);
    if (catalogOpenPreview) catalogOpenPreview.setAttribute('href', `/preview/${type}`);
    container.querySelectorAll('[data-catalog-type]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-catalog-type') === type);
    });
  }

  container.querySelectorAll('[data-catalog-type]').forEach((btn) => {
    btn.addEventListener('click', () => loadCatalogType(btn.getAttribute('data-catalog-type')));
  });
  if (catalogFrame) {
    catalogFrame.addEventListener('load', applyOverridesToPreview);
    const initialType = catalogCurrent ? catalogCurrent.textContent.trim() : '';
    if (initialType) {
      container.querySelectorAll('[data-catalog-type]').forEach((btn) => {
        btn.classList.toggle('is-active', btn.getAttribute('data-catalog-type') === initialType);
      });
    }
  }

  // ── Presets nommés ─────────────────────────────────────────────────────────
  const presetName = container.querySelector('#preset-name');
  const presetSave = container.querySelector('#preset-save');
  const presetList = container.querySelector('#preset-list');

  function readPresets() {
    try {
      const value = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function writePresets(value) {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(value));
    renderPresets();
  }

  function listPresets() {
    return readPresets();
  }

  function savePreset(name) {
    const trimmed = String(name || '').trim();
    if (!trimmed) return null;
    const presets = readPresets();
    presets[trimmed] = buildTokensPayload();
    writePresets(presets);
    return presets[trimmed];
  }

  function applyPreset(name) {
    const preset = readPresets()[name];
    if (!preset || typeof preset !== 'object') return null;
    Object.entries(preset).forEach(([token, value]) => applyToken(token, String(value)));
    return preset;
  }

  function removePreset(name) {
    const presets = readPresets();
    if (!(name in presets)) return false;
    delete presets[name];
    writePresets(presets);
    return true;
  }

  function renderPresets() {
    if (!presetList) return;
    presetList.replaceChildren();
    Object.keys(readPresets()).sort().forEach((name) => {
      const row = document.createElement('div');
      row.className = 'studio-preset-row';
      if (name in demoPresets) row.classList.add('is-demo');

      const label = document.createElement('span');
      label.className = 'studio-preset-row-name';
      label.textContent = name;

      const actions = document.createElement('span');
      actions.className = 'studio-actions';

      const apply = document.createElement('button');
      apply.type = 'button';
      apply.className = 'studio-btn';
      apply.textContent = 'Appliquer';
      apply.addEventListener('click', () => applyPreset(name));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'studio-btn';
      remove.textContent = 'Supprimer';
      remove.addEventListener('click', () => removePreset(name));

      actions.append(apply, remove);
      row.append(label, actions);
      presetList.appendChild(row);
    });
  }

  if (presetSave) {
    presetSave.addEventListener('click', () => {
      const name = presetName ? presetName.value.trim() : '';
      if (!name) {
        toast('Donne un nom au thème');
        if (presetName) presetName.focus();
        return;
      }
      savePreset(name);
      toast(`Thème « ${name} » sauvegardé`);
    });
  }

  // ── Thèmes : export / import JSON + seed des thèmes de démo ─────────────────
  const presetExport = container.querySelector('#preset-export');
  const presetImport = container.querySelector('#preset-import');
  const presetImportFile = container.querySelector('#preset-import-file');
  const presetSeed = container.querySelector('#preset-seed');

  function seedDemoPresets(force = false) {
    const presets = readPresets();
    let added = 0;
    Object.entries(demoPresets).forEach(([name, tokensObj]) => {
      if (force || !(name in presets)) {
        presets[name] = { ...tokensObj };
        added += 1;
      }
    });
    if (added) writePresets(presets);
    return added;
  }

  if (presetExport) {
    presetExport.addEventListener('click', async () => {
      const presets = readPresets();
      if (!Object.keys(presets).length) {
        toast('Aucun thème à exporter');
        return;
      }
      const json = JSON.stringify(presets, null, 2);
      try {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'waimia-ds-themes.json';
        a.click();
        URL.revokeObjectURL(url);
        toast(`${Object.keys(presets).length} thème(s) exporté(s)`);
      } catch {
        toast('Export indisponible');
      }
    });
  }

  if (presetImport && presetImportFile) {
    presetImport.addEventListener('click', () => presetImportFile.click());
    presetImportFile.addEventListener('change', () => {
      const file = presetImportFile.files && presetImportFile.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || '{}'));
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('format');
          const presets = readPresets();
          let merged = 0;
          Object.entries(parsed).forEach(([name, tokensObj]) => {
            if (tokensObj && typeof tokensObj === 'object' && !Array.isArray(tokensObj)) {
              presets[String(name)] = tokensObj;
              merged += 1;
            }
          });
          writePresets(presets);
          toast(`${merged} thème(s) importé(s)`);
        } catch {
          toast('Fichier JSON invalide');
        } finally {
          presetImportFile.value = '';
        }
      };
      reader.readAsText(file);
    });
  }

  if (presetSeed) {
    presetSeed.addEventListener('click', () => {
      const added = seedDemoPresets(true);
      toast(added ? `${added} thème(s) de démo chargé(s)` : 'Thèmes de démo déjà présents');
    });
  }

  // ── Comparateur avant / après ──────────────────────────────────────────────
  const compareCount = container.querySelector('#compare-count');
  const compareDiff = container.querySelector('#compare-diff');
  const compareBaseline = container.querySelector('#compare-baseline');
  let baselineHeld = false;

  function renderCompare() {
    if (compareCount) compareCount.textContent = String(dirty.size);
    if (!compareDiff) return;
    compareDiff.replaceChildren();
    [...dirty.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([token, value]) => {
      const old = originals.get(token) ?? '';
      const row = document.createElement('div');
      row.className = 'studio-compare-row';

      const name = document.createElement('span');
      name.className = 'studio-compare-row-token';
      name.textContent = token;

      const vals = document.createElement('span');
      vals.className = 'studio-compare-row-vals';
      if (/^#[\da-f]{3,8}$/i.test(old)) {
        const sw = document.createElement('span');
        sw.className = 'studio-compare-swatch';
        sw.style.background = old;
        vals.appendChild(sw);
      }
      const oldEl = document.createElement('span');
      oldEl.className = 'studio-compare-old';
      oldEl.textContent = old;
      const arrow = document.createElement('span');
      arrow.className = 'studio-compare-arrow';
      arrow.textContent = '→';
      const newEl = document.createElement('span');
      newEl.className = 'studio-compare-new';
      newEl.textContent = value;
      vals.append(oldEl, arrow, newEl);
      if (/^#[\da-f]{3,8}$/i.test(value)) {
        const sw = document.createElement('span');
        sw.className = 'studio-compare-swatch';
        sw.style.background = value;
        vals.appendChild(sw);
      }

      row.append(name, vals);
      compareDiff.appendChild(row);
    });
  }

  function holdBaseline(on) {
    baselineHeld = on;
    if (compareBaseline) compareBaseline.setAttribute('aria-pressed', String(on));
    if (on) {
      dirty.forEach((_v, token) => root.style.removeProperty(token));
    } else {
      dirty.forEach((v, token) => root.style.setProperty(token, v));
    }
    applyOverridesToPreview();
  }

  if (compareBaseline) {
    const press = () => { if (dirty.size) holdBaseline(true); };
    const release = () => { if (baselineHeld) holdBaseline(false); };
    compareBaseline.addEventListener('mousedown', press);
    compareBaseline.addEventListener('mouseup', release);
    compareBaseline.addEventListener('mouseleave', release);
    compareBaseline.addEventListener('touchstart', (e) => { e.preventDefault(); press(); }, { passive: false });
    compareBaseline.addEventListener('touchend', release);
  }

  if (window.__dsStudioBaselineKeyHandler) {
    document.removeEventListener('keydown', window.__dsStudioBaselineKeyHandler);
    document.removeEventListener('keyup', window.__dsStudioBaselineKeyHandlerUp);
  }
  window.__dsStudioBaselineKeyHandler = (event) => {
    if (event.key.toLowerCase() !== 'b' || event.repeat) return;
    const t = event.target;
    const typing = t instanceof HTMLTextAreaElement || t instanceof HTMLInputElement || (t instanceof HTMLElement && t.isContentEditable);
    if (typing) return;
    if (dirty.size && !baselineHeld) holdBaseline(true);
  };
  window.__dsStudioBaselineKeyHandlerUp = (event) => {
    if (event.key.toLowerCase() !== 'b') return;
    if (baselineHeld) holdBaseline(false);
  };
  document.addEventListener('keydown', window.__dsStudioBaselineKeyHandler);
  document.addEventListener('keyup', window.__dsStudioBaselineKeyHandlerUp);

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

  /** Applique un token comme un contrôle humain et retourne sa valeur calculée. */
  function setToken(name, value) {
    applyToken(name, value);
    return {
      name,
      value,
      computed: getComputedStyle(root).getPropertyValue(name).trim(),
    };
  }

  /** Retourne la valeur calculée actuelle d'un token. */
  function getToken(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  /** Liste les tokens modifiés depuis l'initialisation du Studio. */
  function listModified() {
    return [...dirty.entries()].map(([name, value]) => ({ name, value }));
  }

  /** Réinitialise les tokens avec le même flux que le bouton Reset. */
  function reset() {
    if (resetBtn) resetBtn.click();
    else resetTokens();
    return { ok: true };
  }

  /** Retourne l'export CSS sans accéder au presse-papiers. */
  function exportTokens() {
    const css = buildExport();
    const out = container.querySelector('#export-output');
    if (out) out.textContent = css;
    return css;
  }

  /** Sauvegarde les tokens modifiés et retourne toujours la réponse structurée. */
  function save(keyword) {
    return performSave(keyword);
  }

  window.dsStudio = {
    setToken,
    getToken,
    listModified,
    reset,
    export: exportTokens,
    save,
    undo,
    redo,
    presets: {
      list: listPresets,
      save: savePreset,
      apply: applyPreset,
      remove: removePreset,
      seedDemos: seedDemoPresets,
    },
    inspect: (token) => tokenSections[token] || [],
    selectToken: showImpact,
    compare: { hold: holdBaseline, diff: () => [...dirty.entries()].map(([name, value]) => ({ name, value, old: originals.get(name) ?? '' })) },
  };

  setSaveState('idle');
  if (new URLSearchParams(location.search).get('clean') === '1') {
    document.body.classList.add('ds-clean');
  } else {
    document.body.classList.remove('ds-clean');
  }

  try {
    const rawPending = sessionStorage.getItem(SAVE_PENDING_KEY);
    if (rawPending) {
      const pending = JSON.parse(rawPending);
      const total = Number(pending.fixedDelaySeconds);
      const elapsedMs = Date.now() - Number(pending.savedAt);
      const alreadyReloaded = sessionStorage.getItem(SAVE_RELOADED_KEY) === String(pending.savedAt);
      if (!Number.isFinite(total) || !Number.isFinite(elapsedMs) || elapsedMs >= total * 1000) {
        sessionStorage.removeItem(SAVE_PENDING_KEY);
        sessionStorage.removeItem(SAVE_RELOADED_KEY);
      } else if (!alreadyReloaded) {
        const elapsed = Math.floor(elapsedMs / 1000);
        const remaining = total - elapsed;
        setSaveState('done');
        showCookingOverlay(
          remaining,
          pending.branch,
          pending.commit || '',
          () => finishPendingSave(pending.savedAt),
        );
      } else {
        sessionStorage.removeItem(SAVE_PENDING_KEY);
        sessionStorage.removeItem(SAVE_RELOADED_KEY);
      }
    } else {
      sessionStorage.removeItem(SAVE_RELOADED_KEY);
    }
  } catch {
    sessionStorage.removeItem(SAVE_PENDING_KEY);
    sessionStorage.removeItem(SAVE_RELOADED_KEY);
  }

  if (location.hash.length > 1) {
    location.hash.slice(1).split('&').forEach((pair) => {
      const separator = pair.indexOf('=');
      if (separator <= 0) return;
      const name = pair.slice(0, separator);
      if (!name.startsWith('--')) return;
      try {
        setToken(name, decodeURIComponent(pair.slice(separator + 1)));
      } catch {
        // Paire malformée ignorée.
      }
    });
  }

  // Seed des thèmes de démo au tout 1er chargement (si aucun thème perso encore).
  if (!Object.keys(readPresets()).length) seedDemoPresets(false);

  refreshExportCount();
  refreshHistoryButtons();
  renderPresets();
  refreshDerivedSurfaces();
}

// Le ClientRouter (Base.astro) émet astro:page-load au 1er chargement ET après chaque
// View Transition. Le marqueur sur .studio empêche un double-bind si les deux chemins
// se déclenchent sur le même DOM.
document.addEventListener('astro:page-load', initStudio);
if (document.readyState !== 'loading') initStudio();
else document.addEventListener('DOMContentLoaded', initStudio);
