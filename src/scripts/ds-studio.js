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
  // env injecté au build par studio.astro (import.meta.env.DEV) : source FIABLE,
  // pas d'heuristique hostname. En prod le middleware /api/ds/save n'existe pas
  // (site output:static) → on désactive la sauvegarde et on court-circuite tout fetch.
  const isDev = DATA.env === 'dev';
  const consumers = DATA.consumers || {};
  const tokenSections = DATA.tokenSections || {};
  const demoPresets = DATA.demoPresets || {};
  // Presets de theme PERSISTES via git (src/data/ds-presets.json, ecrits en dev par
  // POST /api/ds/preset). Source de verite de la LISTE (apply-only). Les demos restent
  // des themes rapides compile-time. Plus de localStorage (persistance = git).
  const persistedPresets = Array.isArray(DATA.presets) ? DATA.presets : [];
  const originals = new Map(Object.entries(DATA.originals || {}));
  const SAVE_PENDING_KEY = 'ds-save-pending';
  const SAVE_RELOADED_KEY = 'ds-save-reloaded';
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
  const saveHint = container.querySelector('#studio-save-hint');
  let countdownTimer = null;
  let reloadTimer = null;

  // PROD : la persistance git n'existe pas (output:static). On verrouille l'UI de
  // sauvegarde dès l'init (bouton désactivé + champ mot-clé désactivé + aide visible).
  if (!isDev) {
    if (saveBtn) saveBtn.disabled = true;
    if (keywordInput) keywordInput.disabled = true;
    if (saveHint) saveHint.hidden = false;
  }

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
    if (!isDev) {
      // PROD : aucun endpoint /api/ds/save → 0 fetch émis (évite le faux
      // « Réseau indisponible »). Message clair, pas d'appel réseau.
      setSaveState('error');
      toast('Enregistrement disponible en mode développement uniquement');
      return { ok: false, error: 'prod' };
    }
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

  // Ré-applique les overrides après une navigation View-Transition interne à l'iframe
  // (l'event `load` ne se déclenche pas sur un swap Astro client-side).
  const swapBoundDocs = new WeakSet();
  function attachSwapReapply(frame) {
    try {
      // Astro dispatche astro:after-swap sur le DOCUMENT de l'iframe (pas le window) ;
      // le document persiste à travers les View Transitions → un seul listener suffit.
      const doc = frame.contentDocument;
      if (!doc || swapBoundDocs.has(doc)) return; // anti-doublon par identité de référence
      swapBoundDocs.add(doc);
      doc.addEventListener('astro:after-swap', applyOverridesToPreview);
    } catch {
      // cross-origin défensif : pas d'accès → on ignore silencieusement
    }
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
  if (previewFrame) previewFrame.addEventListener('load', () => { applyOverridesToPreview(); attachSwapReapply(previewFrame); });

  // ── Catalogue : aperçu du type sélectionné (hérite des overrides LIVE) ─────
  const catalogCurrent = container.querySelector('#catalog-current');
  const catalogOpenFiche = container.querySelector('#catalog-open-fiche');
  const catalogOpenPreview = container.querySelector('#catalog-open-preview');

  function loadCatalogType(type) {
    if (!catalogFrame || !type) return;
    // Ne recharge l'iframe QUE si le type change réellement (même garde que loadPreview,
    // l.657). Re-sélectionner le type déjà chargé — ce qui arrive naturellement après
    // « Appliquer » un preset, via l'inspecteur ou la palette ⌘K — ne doit PAS déclencher
    // un rechargement complet : il jetterait puis re-jouerait les overrides live sur le
    // `load` (flash inutile). Les overrides d'un preset sont poussés en direct par
    // applyOverridesToPreview() ; l'apply n'a donc jamais besoin d'un reload. Cf P2.8-b.
    // Un vrai changement de type reste une navigation (page /preview/<type> distincte).
    const route = `/preview/${type}`;
    if (catalogFrame.getAttribute('src') !== route) catalogFrame.setAttribute('src', route);
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
    catalogFrame.addEventListener('load', () => { applyOverridesToPreview(); attachSwapReapply(catalogFrame); });
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

  // Applique les tokens d'un preset (snapshot) comme des overrides LIVE.
  function applyPresetTokens(tokens) {
    if (!tokens || typeof tokens !== 'object') return null;
    Object.entries(tokens).forEach(([token, value]) => applyToken(token, String(value)));
    return tokens;
  }

  // Table nom -> tokens : démos (compile-time) + persistés (git). Apply-only.
  function allNamedPresets() {
    const out = {};
    Object.entries(demoPresets).forEach(([name, tokens]) => { out[name] = tokens; });
    persistedPresets.forEach((p) => {
      if (p && typeof p.name === 'string' && p.tokens && typeof p.tokens === 'object') out[p.name] = p.tokens;
    });
    return out;
  }

  function listPresets() {
    return { demos: demoPresets, saved: persistedPresets };
  }

  function applyPreset(name) {
    return applyPresetTokens(allNamedPresets()[name]);
  }

  function renderPresets() {
    if (!presetList) return;
    presetList.replaceChildren();
    const rows = [];
    Object.keys(demoPresets).sort().forEach((name) => rows.push({ name, kind: 'demo' }));
    [...persistedPresets]
      .filter((p) => p && typeof p.name === 'string')
      .sort((a, b) => String(a.slug).localeCompare(String(b.slug)))
      .forEach((p) => rows.push({ name: p.name, kind: 'saved', savedAt: p.savedAt }));

    rows.forEach(({ name, kind }) => {
      const row = document.createElement('div');
      row.className = 'studio-preset-row';
      if (kind === 'demo') row.classList.add('is-demo');

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

      actions.append(apply);
      row.append(label, actions);
      presetList.appendChild(row);
    });
  }

  // SAVE = persistance git-based DEV-ONLY : POST /api/ds/preset (commit + push + rebuild
  // preview, puis reload). Réutilise le même overlay « cuisson » que la sauvegarde de
  // tokens et le même champ mot-clé (keywordInput). En prod : message, 0 fetch.
  async function performPresetSave(name, keyword) {
    const presetLabel = String(name || '').trim();
    if (!isDev) {
      setSaveState('error');
      toast('Enregistrement disponible en mode développement uniquement');
      return { ok: false, error: 'prod' };
    }
    if (!presetLabel) {
      toast('Donne un nom au thème');
      if (presetName) presetName.focus();
      return { ok: false, error: 'nom' };
    }
    if (!dirty.size) {
      setSaveState('error');
      toast('Aucun changement : modifie au moins un token avant de sauvegarder un thème');
      return { ok: false, error: 'aucun changement' };
    }

    setSaveState('saving');
    try {
      const resp = await fetch('/api/ds/preset', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: presetLabel, tokens: buildTokensPayload(), keyword }),
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
    }
  }

  if (presetSave) {
    presetSave.addEventListener('click', () => {
      const name = presetName ? presetName.value.trim() : '';
      const keyword = keywordInput ? keywordInput.value.trim() : '';
      if (!name) {
        toast('Donne un nom au thème');
        if (presetName) presetName.focus();
        return;
      }
      if (isDev && dirty.size && !keyword) {
        toast('Saisis le mot-clé de sauvegarde');
        if (keywordInput) keywordInput.focus();
        return;
      }
      performPresetSave(name, keyword);
    });
  }

  // ── Thèmes : export / import JSON (démos + persistés, apply-only) ───────────
  const presetExport = container.querySelector('#preset-export');
  const presetImport = container.querySelector('#preset-import');
  const presetImportFile = container.querySelector('#preset-import-file');
  const presetSeed = container.querySelector('#preset-seed');

  if (presetExport) {
    presetExport.addEventListener('click', async () => {
      const presets = allNamedPresets();
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
          const entries = Object.entries(parsed).filter(
            ([, tokensObj]) => tokensObj && typeof tokensObj === 'object' && !Array.isArray(tokensObj),
          );
          if (!entries.length) throw new Error('vide');
          // Import = APPLIQUE le 1er thème du fichier en LIVE (persistance = « Sauver »).
          const [firstName, firstTokens] = entries[0];
          applyPresetTokens(firstTokens);
          toast(`Thème « ${firstName} » appliqué · « Sauver » pour le persister`);
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
      renderPresets();
      toast('Thèmes de démo listés ci-dessous · clique « Appliquer »');
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

  // ── Palette de recherche universelle (Cmd/Ctrl+K) ──────────────────────────
  // Recherche transverse instantanée dans 2 corpus déjà présents dans le DOM
  // (sources autoritaires, pas de reconstruction) :
  //   • tokens   → [data-token-row] (chaque ligne porte data-group) → action :
  //               sélection + scroll de la ligne (réutilise showImpact()).
  //   • sections → [data-catalog-type] (catalogue complet) → action :
  //               loadCatalogType(type) (charge le type dans l'atelier).
  const palette = document.getElementById('studio-palette');
  const paletteInput = palette ? palette.querySelector('#studio-palette-input') : null;
  const paletteResults = palette ? palette.querySelector('#studio-palette-results') : null;
  const paletteEmpty = palette ? palette.querySelector('#studio-palette-empty') : null;

  // Index construit une fois depuis le DOM rendu (full token list + full catalogue).
  function buildPaletteIndex() {
    const items = [];
    container.querySelectorAll('[data-token-row]').forEach((row) => {
      const token = row.getAttribute('data-token-row') || '';
      if (!token) return;
      items.push({
        kind: 'token',
        label: token,
        group: row.getAttribute('data-group') || '',
        run: () => activateToken(token),
      });
    });
    const seenTypes = new Set();
    container.querySelectorAll('[data-catalog-type]').forEach((btn) => {
      const type = btn.getAttribute('data-catalog-type') || '';
      if (!type || seenTypes.has(type)) return;
      seenTypes.add(type);
      items.push({
        kind: 'section',
        label: type,
        group: '',
        run: () => activateSection(type),
      });
    });
    return items;
  }

  function activateToken(token) {
    // Une recherche dans le panneau peut masquer la ligne : on neutralise le filtre.
    if (search && search.value) {
      search.value = '';
      search.dispatchEvent(new Event('input', { bubbles: true }));
    }
    showImpact(token);
    const row = container.querySelector(`[data-token-row="${token}"]`);
    if (row) {
      row.hidden = false;
      const block = row.closest('[data-group-block]');
      if (block) block.hidden = false;
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function activateSection(type) {
    loadCatalogType(type);
    const workshopSection = container.querySelector('#ds-workshop');
    const catalogSection = container.querySelector('#catalogue');
    const target = workshopSection || catalogSection;
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const KIND_LABEL = { token: 'Token', section: 'Section' };
  let paletteItems = [];
  let paletteMatches = [];
  let paletteActive = 0;

  function scorePaletteItem(item, q) {
    const label = item.label.toLowerCase();
    if (!q) return 0;
    const idx = label.indexOf(q);
    if (idx < 0) return -1;
    // Préfixe exact priorisé, puis position du match, puis brièveté du label.
    return (idx === 0 ? 0 : 100) + idx + label.length / 1000;
  }

  function renderPaletteResults() {
    if (!paletteResults) return;
    paletteResults.replaceChildren();
    if (!paletteMatches.length) {
      if (paletteEmpty) paletteEmpty.hidden = false;
      return;
    }
    if (paletteEmpty) paletteEmpty.hidden = true;
    paletteMatches.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = 'studio-palette-item';
      li.setAttribute('role', 'option');
      li.id = `studio-palette-opt-${i}`;
      li.setAttribute('aria-selected', String(i === paletteActive));
      if (i === paletteActive) li.classList.add('is-active');

      const kind = document.createElement('span');
      kind.className = 'studio-palette-kind';
      kind.textContent = KIND_LABEL[item.kind] || item.kind;

      const label = document.createElement('span');
      label.className = 'studio-palette-label';
      label.textContent = item.label;

      li.append(kind, label);
      if (item.group) {
        const meta = document.createElement('span');
        meta.className = 'studio-palette-meta';
        meta.textContent = item.group;
        li.append(meta);
      }

      li.addEventListener('mousemove', () => {
        if (paletteActive === i) return;
        paletteActive = i;
        syncPaletteActive();
      });
      li.addEventListener('click', () => runPaletteItem(i));
      paletteResults.appendChild(li);
    });
    syncPaletteActive();
  }

  function syncPaletteActive() {
    if (!paletteResults) return;
    [...paletteResults.children].forEach((li, i) => {
      const on = i === paletteActive;
      li.classList.toggle('is-active', on);
      li.setAttribute('aria-selected', String(on));
      if (on) li.scrollIntoView({ block: 'nearest' });
    });
    if (paletteInput) {
      const cur = paletteMatches[paletteActive];
      paletteInput.setAttribute('aria-activedescendant', cur ? `studio-palette-opt-${paletteActive}` : '');
    }
  }

  function filterPalette() {
    const q = (paletteInput ? paletteInput.value : '').trim().toLowerCase();
    paletteMatches = paletteItems
      .map((item) => ({ item, s: scorePaletteItem(item, q) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => a.s - b.s)
      .slice(0, 50)
      .map((r) => r.item);
    paletteActive = 0;
    renderPaletteResults();
  }

  function runPaletteItem(i) {
    const item = paletteMatches[i];
    if (!item) return;
    closePalette();
    item.run();
  }

  let paletteLastFocus = null;
  function openPalette() {
    if (!palette) return;
    paletteItems = buildPaletteIndex();
    paletteLastFocus = document.activeElement;
    palette.hidden = false;
    palette.classList.add('is-on');
    if (paletteInput) {
      paletteInput.value = '';
      filterPalette();
      paletteInput.focus();
    }
  }

  function closePalette() {
    if (!palette || palette.hidden) return;
    palette.classList.remove('is-on');
    palette.hidden = true;
    if (paletteLastFocus instanceof HTMLElement) {
      try { paletteLastFocus.focus(); } catch { /* élément retiré : ignore */ }
    }
    paletteLastFocus = null;
  }

  if (paletteInput) paletteInput.addEventListener('input', filterPalette);
  if (palette) {
    palette.addEventListener('click', (event) => {
      if (event.target === palette) closePalette();
    });
    palette.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePalette();
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (paletteMatches.length) {
          paletteActive = (paletteActive + 1) % paletteMatches.length;
          syncPaletteActive();
        }
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (paletteMatches.length) {
          paletteActive = (paletteActive - 1 + paletteMatches.length) % paletteMatches.length;
          syncPaletteActive();
        }
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        runPaletteItem(paletteActive);
      }
    });
  }

  // Handler clavier GLOBAL dédié : SÉPARÉ de window.__dsStudioKeydownHandler
  // (undo/redo) et de window.__dsStudioBaselineKeyHandler (baseline) → 0 collision.
  // Idempotent : on retire l'ancien avant de rebrancher (re-init View Transition).
  if (window.__dsStudioPaletteKeydownHandler) {
    document.removeEventListener('keydown', window.__dsStudioPaletteKeydownHandler);
  }
  window.__dsStudioPaletteKeydownHandler = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (palette && palette.hidden) openPalette();
      else closePalette();
    }
  };
  document.addEventListener('keydown', window.__dsStudioPaletteKeydownHandler);

  // ── Inspecteur d'élément du preview (façon « inspect » Webflow/Figma) ───────
  // Clic sur un élément de l'iframe → on résout par VALEUR (le nom du token est
  // perdu après résolution de var() par le navigateur) les tokens DS pilotes, via
  // un index inverse valeur→[tokens] construit depuis getComputedStyle(frameRoot).
  const inspectBtn = container.querySelector('#preview-inspect');
  const inspectResult = container.querySelector('#inspect-result');
  let inspectMode = false;
  let inspectOverlay = null;          // <div> de surbrillance injecté dans l'iframe
  let inspectOutlineColor = '';        // couleur d'outil lue une fois depuis --accent-text
  let inspectReverseIndex = null;      // Map valeurNormalisée → [tokens]
  let inspectIndexDirtyAt = -1;        // taille de `dirty` à la construction de l'index

  // Normalise une couleur (#rgb, #rrggbb, #rrggbbaa, rgb(), rgba()) → "r,g,b" ou "r,g,b,a".
  function canonColor(str) {
    const s = String(str || '').trim().toLowerCase();
    if (!s || s === 'transparent') return null;
    let m = s.match(/^#([\da-f]{3,8})$/);
    if (m) {
      let hex = m[1];
      if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
      else if (hex.length === 4) hex = hex.split('').map((c) => c + c).join('');
      if (hex.length !== 6 && hex.length !== 8) return null;
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (hex.length === 8) {
        const a = Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 1000) / 1000;
        return a >= 1 ? `${r},${g},${b}` : `${r},${g},${b},${a}`;
      }
      return `${r},${g},${b}`;
    }
    m = s.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      const parts = m[1].split(/[,\s/]+/).filter(Boolean);
      if (parts.length < 3) return null;
      const r = parseInt(parts[0], 10);
      const g = parseInt(parts[1], 10);
      const b = parseInt(parts[2], 10);
      if ([r, g, b].some((n) => Number.isNaN(n))) return null;
      const a = parts[3] != null ? Math.round(parseFloat(parts[3]) * 1000) / 1000 : 1;
      return a >= 1 ? `${r},${g},${b}` : `${r},${g},${b},${a}`;
    }
    return null;
  }

  // Normalise une longueur en px (getComputedStyle résout clamp()/rem en px) au 0.5 près.
  function canonLength(str) {
    const m = String(str || '').trim().match(/^(-?[\d.]+)px$/);
    if (!m) return null;
    const px = Math.round(parseFloat(m[1]) * 2) / 2;
    return Number.isNaN(px) ? null : `${px}px`;
  }

  // Normalise une famille de police : 1re famille, sans quotes, lowercase.
  function canonFont(str) {
    const first = String(str || '').split(',')[0] || '';
    const cleaned = first.trim().replace(/^["']|["']$/g, '').toLowerCase();
    return cleaned || null;
  }

  // Une valeur est NON informative (ne doit jamais lister de token) si :
  //   longueur nulle (0px après canonLength), couleur totalement transparente
  //   (alpha = 0 ou mot-clé transparent), ou mot-clé none / chaîne vide.
  function isDegenerateValue(str, kind) {
    const s = String(str || '').trim().toLowerCase();
    if (!s || s === 'none') return true;
    if (kind === 'length') {
      const l = canonLength(s);
      return !l || parseFloat(l) === 0;
    }
    if (kind === 'color') {
      if (s === 'transparent') return true;
      const c = canonColor(s); // "r,g,b" ou "r,g,b,a" ; alpha présent => < 1
      if (c) {
        const parts = c.split(',');
        if (parts.length === 4 && parseFloat(parts[3]) === 0) return true;
      }
    }
    return false;
  }

  // Renvoie toutes les formes normalisées plausibles d'une valeur (couleur OU longueur OU police).
  function normalizeValue(str) {
    const out = [];
    const c = canonColor(str);
    if (c) out.push('c:' + c);
    const l = canonLength(str);
    if (l) out.push('l:' + l);
    const f = canonFont(str);
    if (f) out.push('f:' + f);
    return out;
  }

  // (Re)construit l'index inverse valeur→[tokens] depuis les valeurs RÉSOLUES dans l'iframe.
  function buildInspectIndex() {
    const frameRoot = previewFrame?.contentDocument?.documentElement;
    const idx = new Map();
    if (!frameRoot) return idx;
    const styles = getComputedStyle(frameRoot);
    originals.forEach((_v, token) => {
      const resolved = styles.getPropertyValue(token).trim();
      if (!resolved) return;
      normalizeValue(resolved).forEach((key) => {
        if (!idx.has(key)) idx.set(key, []);
        const arr = idx.get(key);
        if (!arr.includes(token)) arr.push(token);
      });
    });
    return idx;
  }

  function getInspectIndex() {
    if (!inspectReverseIndex || inspectIndexDirtyAt !== dirty.size) {
      inspectReverseIndex = buildInspectIndex();
      inspectIndexDirtyAt = dirty.size;
    }
    return inspectReverseIndex;
  }

  // Propriétés examinées, dans l'ordre de pertinence, avec un type et un libellé FR court.
  const INSPECT_PROPS = [
    { prop: 'color', label: 'Texte', kind: 'color' },
    { prop: 'background-color', label: 'Fond', kind: 'color' },
    { prop: 'border-top-color', label: 'Bordure', kind: 'color', widthProp: 'border-top-width' },
    { prop: 'border-right-color', label: 'Bordure', kind: 'color', widthProp: 'border-right-width' },
    { prop: 'border-bottom-color', label: 'Bordure', kind: 'color', widthProp: 'border-bottom-width' },
    { prop: 'border-left-color', label: 'Bordure', kind: 'color', widthProp: 'border-left-width' },
    { prop: 'border-top-left-radius', label: 'Rayon', kind: 'length' },
    { prop: 'font-family', label: 'Police', kind: 'font' },
    { prop: 'font-size', label: 'Taille', kind: 'length' },
    { prop: 'gap', label: 'Espacement', kind: 'length' },
    { prop: 'column-gap', label: 'Espacement', kind: 'length' },
    { prop: 'padding-top', label: 'Espacement', kind: 'length' },
    { prop: 'padding-left', label: 'Espacement', kind: 'length' },
    { prop: 'box-shadow', label: 'Ombre', kind: 'color' },
  ];

  // Cœur : pour un élément, renvoie [{property, value, tokens:[...]}] dédupliqué.
  function inspectElement(el) {
    if (!el || el.nodeType !== 1) return [];
    const idx = getInspectIndex();
    const cs = getComputedStyle(el);
    const results = [];
    const seenValues = new Set(); // anti-doublon par label+valeur normalisée
    INSPECT_PROPS.forEach(({ prop, label, kind, widthProp }) => {
      const raw = cs.getPropertyValue(prop).trim();
      if (!raw) return;
      // Couleur de bordure = bruit si la bordure n'a aucune épaisseur visible.
      if (widthProp) {
        const w = canonLength(cs.getPropertyValue(widthProp).trim());
        if (!w || parseFloat(w) === 0) return;
      }
      // Valeur non informative (0px, transparent / alpha 0, none) → aucun token.
      if (isDegenerateValue(raw, kind)) return;
      let keys;
      if (kind === 'color') keys = canonColor(raw) ? ['c:' + canonColor(raw)] : [];
      else if (kind === 'length') keys = canonLength(raw) ? ['l:' + canonLength(raw)] : [];
      else keys = canonFont(raw) ? ['f:' + canonFont(raw)] : [];
      const tokens = [];
      keys.forEach((k) => (idx.get(k) || []).forEach((t) => { if (!tokens.includes(t)) tokens.push(t); }));
      if (!tokens.length) return;
      const dedupKey = label + '|' + keys.join('|');
      if (seenValues.has(dedupKey)) return;
      seenValues.add(dedupKey);
      results.push({ property: label, value: raw, tokens });
    });
    return results;
  }

  // Affiche le panneau de résultats sous la toolbar (ou un message si aucun token).
  function renderInspectResult(candidates) {
    if (!inspectResult) return;
    inspectResult.replaceChildren();
    inspectResult.hidden = false;
    if (!candidates.length) {
      const p = document.createElement('p');
      p.className = 'studio-inspect-empty';
      p.textContent = 'Aucun token DS ne pilote directement cet élément.';
      inspectResult.appendChild(p);
      return;
    }
    candidates.forEach((cand) => {
      const row = document.createElement('div');
      row.className = 'studio-inspect-row';

      const prop = document.createElement('span');
      prop.className = 'studio-inspect-prop';
      prop.textContent = cand.property;
      row.appendChild(prop);

      const canon = canonColor(cand.value);
      if (canon) {
        const swatch = document.createElement('span');
        swatch.className = 'studio-inspect-swatch';
        swatch.style.background = cand.value;
        row.appendChild(swatch);
      }

      const val = document.createElement('span');
      val.className = 'studio-inspect-val';
      val.textContent = cand.value;
      row.appendChild(val);

      cand.tokens.forEach((token) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'studio-btn studio-inspect-token';
        btn.textContent = token;
        btn.addEventListener('click', () => revealToken(token));
        row.appendChild(btn);
      });

      inspectResult.appendChild(row);
    });
  }

  // Sélectionne la ligne token (carte d'impact), la fait défiler et la flashe.
  function revealToken(token) {
    showImpact(token);
    const row = container.querySelector(`[data-token-row="${token}"]`);
    if (!row) return;
    row.hidden = false;
    const block = row.closest('[data-group-block]');
    if (block) block.hidden = false;
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row.classList.remove('is-inspect-flash');
    void row.offsetWidth; // reflow → relance l'animation si re-cliqué
    row.classList.add('is-inspect-flash');
  }

  // Overlay de surbrillance (un seul, réutilisé) positionné via getBoundingClientRect.
  function ensureInspectOverlay(doc) {
    if (inspectOverlay && inspectOverlay.ownerDocument === doc) return inspectOverlay;
    inspectOverlay = doc.createElement('div');
    inspectOverlay.setAttribute('aria-hidden', 'true');
    Object.assign(inspectOverlay.style, {
      position: 'fixed', pointerEvents: 'none', zIndex: '2147483647',
      border: `2px solid ${inspectOutlineColor || '#000'}`, borderRadius: '2px',
      boxSizing: 'border-box', display: 'none', top: '0', left: '0',
    });
    doc.body.appendChild(inspectOverlay);
    return inspectOverlay;
  }

  function positionOverlay(el) {
    const doc = el.ownerDocument;
    const overlay = ensureInspectOverlay(doc);
    const r = el.getBoundingClientRect();
    overlay.style.display = 'block';
    overlay.style.top = `${r.top}px`;
    overlay.style.left = `${r.left}px`;
    overlay.style.width = `${r.width}px`;
    overlay.style.height = `${r.height}px`;
  }

  // Handlers nommés (réattachables / détachables proprement à chaque (ré)attache).
  function onInspectMove(event) {
    const el = event.target;
    if (el && el.nodeType === 1 && el !== inspectOverlay) positionOverlay(el);
  }
  function onInspectClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const candidates = inspectElement(event.target);
    renderInspectResult(candidates);
    setInspectMode(false); // sortie après un clic (plus ergonomique)
  }
  function onInspectKey(event) {
    if (event.key === 'Escape' && inspectMode) {
      event.preventDefault();
      setInspectMode(false);
    }
  }

  // Attache/détache les listeners sur le DOCUMENT courant de l'iframe.
  function attachInspectListeners() {
    const doc = previewFrame?.contentDocument;
    if (!doc || !doc.body) return;
    inspectReverseIndex = null; // doc neuf → l'index sera rebâti au clic
    doc.body.style.cursor = 'crosshair';
    doc.addEventListener('mousemove', onInspectMove);
    doc.addEventListener('click', onInspectClick, true);
    doc.addEventListener('keydown', onInspectKey);
  }
  function detachInspectListeners() {
    const doc = previewFrame?.contentDocument;
    if (doc) {
      doc.removeEventListener('mousemove', onInspectMove);
      doc.removeEventListener('click', onInspectClick, true);
      doc.removeEventListener('keydown', onInspectKey);
      if (doc.body) doc.body.style.cursor = '';
    }
    if (inspectOverlay) {
      inspectOverlay.remove();
      inspectOverlay = null;
    }
  }

  function setInspectMode(on) {
    inspectMode = !!on;
    if (inspectBtn) {
      inspectBtn.classList.toggle('is-active', inspectMode);
      inspectBtn.setAttribute('aria-pressed', String(inspectMode));
    }
    if (inspectMode) {
      if (!inspectOutlineColor) inspectOutlineColor = getComputedStyle(root).getPropertyValue('--accent-text').trim();
      attachInspectListeners();
    } else {
      detachInspectListeners();
    }
  }

  if (inspectBtn) {
    inspectBtn.addEventListener('click', () => setInspectMode(!inspectMode));
  }
  // Escape côté document parent (le focus peut être hors iframe).
  if (window.__dsStudioInspectKeyHandler) {
    document.removeEventListener('keydown', window.__dsStudioInspectKeyHandler);
  }
  window.__dsStudioInspectKeyHandler = (event) => {
    if (event.key === 'Escape' && inspectMode) setInspectMode(false);
  };
  document.addEventListener('keydown', window.__dsStudioInspectKeyHandler);
  // Reload de l'iframe : le contentDocument est neuf → ré-attache si le mode était actif.
  if (previewFrame) {
    previewFrame.addEventListener('load', () => { if (inspectMode) attachInspectListeners(); });
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
      save: (name) => performPresetSave(name, keywordInput ? keywordInput.value.trim() : ''),
      apply: applyPreset,
    },
    inspect: (token) => tokenSections[token] || [],
    inspectElement,
    setInspectMode,
    selectToken: showImpact,
    palette: { open: openPalette, close: closePalette },
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
