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
  const SAVE_PENDING_KEY = 'ds-save-pending';
  const SAVE_RELOADED_KEY = 'ds-save-reloaded';
  let hashSyncTimer = null;

  // Tokens modifiés (pour l'export ciblé)
  const dirty = new Map(); // token -> valeur courante

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

  // ── Application d'un override ──────────────────────────────────────────────
  function applyToken(token, value) {
    root.style.setProperty(token, value);
    dirty.set(token, value);
    markRowDirty(token, true);
    refreshExportCount();
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
  function resetTokens() {
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
      performSave(keyword);
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

  /** Applique un token comme un contrôle humain et retourne sa valeur calculée. */
  function setToken(name, value) {
    syncControls(name, value, null);
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
}

// Le ClientRouter (Base.astro) émet astro:page-load au 1er chargement ET après chaque
// View Transition. Le marqueur sur .studio empêche un double-bind si les deux chemins
// se déclenchent sur le même DOM.
document.addEventListener('astro:page-load', initStudio);
if (document.readyState !== 'loading') initStudio();
else document.addEventListener('DOMContentLoaded', initStudio);
