import {
  buildSeries,
  buildPerInjectionSeries,
  REFERENCE_RANGE,
  DEFAULT_PK,
} from '../pk-model.js';
import { computeAnthroScaling, REFERENCE_ANTHRO } from '../body-scaling.js';

const DEFAULT_DOSE_MG = DEFAULT_PK.referenceDoseMg;

const STORAGE_KEY = 'tu-tracker-v2';

/**
 * Parse `<input type="date">` value (YYYY-MM-DD) as a **calendar date in local time**.
 * `new Date("2024-06-15")` is UTC midnight and shifts the day in non-UTC zones — avoid that.
 */
function parseLocalDateString(s) {
  if (!s || !String(s).trim()) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s).trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  if (mo < 0 || mo > 11 || d < 1 || d > 31) return null;
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
}

/** @param {Date} d */
function formatLocalDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Accept typed text: YYYY-MM-DD, or DD/MM/YYYY, or DD-MM-YYYY */
function parseFlexibleDate(s) {
  const t = String(s).trim();
  if (!t) return null;
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (m) return parseLocalDateString(t);
  m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(t);
  if (m) {
    const d = Number(m[1]);
    const mo = Number(m[2]);
    const y = Number(m[3]);
    return parseLocalDateString(`${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return null;
}

function sortInjections(list) {
  return [...list].sort((a, b) => a.date.getTime() - b.date.getTime());
}

class TuApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="shell">
        <header class="hero">
          <div class="hero__text">
            <p class="eyebrow">Educational simulator</p>
            <h1>Testosterone undecanoate levels</h1>
            <p class="lede">
              Enter your last injections (up to 10). The model sums overlapping depot releases—each
              dose adds a long tail, so levels stack until earlier doses fade.
            </p>
          </div>
          <div class="hero__panel disclaimer">
            <strong>Not medical advice.</strong> This tool uses a simplified pharmacokinetic model for
            learning and visualization only. It cannot predict your real lab values. Decisions belong
            to you and your clinician.
          </div>
        </header>

        <section class="panel controls">
          <h2>Your therapy</h2>
          <div class="grid-2">
            <label class="field">
              <span>Endogenous testosterone (ng/dL)</span>
              <input type="number" id="endo" min="0" max="800" step="1" value="0" />
              <small>
                Natural T from your testes (LH-driven). Use <strong>0</strong> if you assume HPTA suppression on TRT.
                This is <strong>not</strong> leftover T from older injections—that is <strong>prior TRT carryover</strong> below.
              </small>
            </label>
            <div class="field field--anthro">
              <button
                type="button"
                class="bf-ref-btn bf-ref-btn--float"
                id="bfRefOpen"
                title="Visual guide for estimating body fat %"
              >
                Body fat reference
              </button>
              <p class="anthro-block-title">Your body (scales modeled levels)</p>
              <div class="anthro-grid">
                <label for="anthroHeight" class="anthro-lbl">Height (cm)</label>
                <label for="anthroWeight" class="anthro-lbl">Weight (kg)</label>
                <label for="anthroBf" class="anthro-lbl">Est. body fat (%)</label>
                <input type="number" id="anthroHeight" min="120" max="230" step="1" value="176" />
                <input type="number" id="anthroWeight" min="40" max="220" step="0.1" value="84" />
                <input
                  type="number"
                  id="anthroBf"
                  min="4"
                  max="50"
                  step="0.5"
                  value="22"
                />
              </div>
              <p class="anthro-readout" id="anthroReadout" aria-live="polite"></p>
              <small class="body-expl">
                This replaces the old <strong>body-size % slider</strong>: same idea (heavier/larger build → lower modeled
                levels for the same dose), but driven by your numbers. The readout shows the scale factor vs our reference
                build (<strong>${REFERENCE_ANTHRO.heightCm} cm</strong> / <strong>${REFERENCE_ANTHRO.weightKg} kg</strong> /
                <strong>${REFERENCE_ANTHRO.bodyFatPct}%</strong> fat). We blend <strong>BMI</strong> and
                <strong>lean mass</strong> (from estimated fat %); leave fat blank to assume
                <strong>${REFERENCE_ANTHRO.bodyFatPct}%</strong>. <strong>Prior TRT carryover</strong> is a flat offset on the chart, so a
                high value can make composition changes look subtle. Approximate only—labs beat the calculator.
              </small>
            </div>
          </div>
          <label class="field field--full">
            <span>Prior TRT carryover (ng/dL)</span>
            <input type="number" id="carryover" min="0" max="2500" step="10" value="500" />
            <small>
              The chart only models injections in the table. If you have been on TRT for a long time, your serum T on the
              <strong>first date</strong> in the table is usually <strong>not zero</strong>—older depots still release testosterone even when
              endogenous production is shut off. Add a rough background level here so the curve matches “already on TRT”
              reality. It is applied as a flat offset (approximation of unlisted earlier shots).
            </small>
          </label>
          <div class="grid-2">
            <label class="field">
              <span>Chart horizon after last injection (days)</span>
              <input type="number" id="horizon" min="14" max="120" value="120" />
            </label>
            <label class="field">
              <span>Show per-injection curves</span>
              <select id="breakdown">
                <option value="off">Total only</option>
                <option value="on">Show each dose</option>
              </select>
            </label>
          </div>
        </section>

        <section class="panel injections-panel">
          <div class="injections-head">
            <h2>Injections (max 10)</h2>
            <button type="button" class="btn secondary" id="addRow">Add row</button>
            <button type="button" class="btn ghost" id="loadDemo">Load example</button>
          </div>
          <div class="schedule-panel">
            <p class="schedule-title">Quick fill: regular schedule</p>
            <p class="muted small schedule-hint" id="schedHint">
              Choose how dates are filled, then pick the anchor date. Calendar dates use your local time zone (no off-by-one day).
            </p>
            <div class="schedule-grid schedule-grid--top">
              <label class="field">
                <span>Schedule mode</span>
                <select id="schedMode">
                  <option value="forward">Forward: anchor = earliest shot → +interval</option>
                  <option value="backward" selected>Backward: anchor = most recent shot → older rows</option>
                </select>
              </label>
            </div>
            <div class="schedule-grid">
              <label class="field">
                <span id="schedDateLabel">Anchor date</span>
                <input type="date" id="schedStart" />
              </label>
              <label class="field">
                <span>Then every (days)</span>
                <input type="number" id="schedInterval" min="1" max="365" value="25" step="1" />
              </label>
              <label class="field">
                <span>Dose each shot (mg)</span>
                <input type="number" id="schedDose" min="250" max="1500" step="50" value="1000" />
                <small>1000 mg = one full 1000 mg/4 mL vial (common pharmacy pack).</small>
              </label>
              <div class="field schedule-actions">
                <span class="field-spacer">&nbsp;</span>
                <button type="button" class="btn primary" id="fillSchedule">Fill 10 rows</button>
              </div>
            </div>
          </div>
          <p class="muted small table-hint">
            Or enter each row manually. You can type a date as <kbd>YYYY-MM-DD</kbd> or <kbd>DD/MM/YYYY</kbd> in the text field.
          </p>
          <div class="table-wrap">
            <table class="inj-table" id="injTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Dose (mg) <span class="th-sub">default 1000 = 1× vial</span></th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="injBody"></tbody>
            </table>
          </div>
          <div class="actions">
            <button type="button" class="btn primary" id="compute">Update chart</button>
            <button type="button" class="btn secondary" id="save">Save locally</button>
            <button type="button" class="btn ghost" id="export">Export CSV</button>
          </div>
        </section>

        <section class="panel chart-panel">
          <div class="chart-head">
            <h2>Estimated total testosterone</h2>
            <p class="muted" id="summary"></p>
          </div>
          <div class="chart-wrap" id="chartWrap"></div>
          <p class="muted small">
            Shaded band: common adult male total T reference (~${REFERENCE_RANGE.low}–${REFERENCE_RANGE.high} ng/dL). Labs and symptoms vary.
          </p>
        </section>

        <footer class="footer">
          <p>
            Model: one-compartment with first-order absorption (Bateman), linear dose scaling vs a
            <strong>1000 mg</strong> reference (common <strong>1000 mg / 4 mL</strong> TU vial); superposition of injections.
            Based on label PK summaries (e.g. median T<sub>max</sub> ~7 d after IM TU) and typical interval curves—not a substitute for measured PK data.
            Body scaling uses your height, weight, and estimated body fat (BMI + lean mass vs a reference build).
          </p>
          <p class="refs">
            References: TU PK literature (J Androl, JCEM); some regions use 750 mg/3 mL (e.g. US Aveed) instead of 1000 mg/4 mL—adjust dose per your product.
          </p>
        </footer>

        <div class="bf-modal" id="bfModal" role="dialog" aria-modal="true" aria-labelledby="bfModalTitle" hidden>
          <div class="bf-modal__backdrop" id="bfModalBackdrop"></div>
          <div class="bf-modal__panel">
            <div class="bf-modal__head">
              <h2 id="bfModalTitle">Male body fat — visual reference</h2>
              <button type="button" class="btn bf-modal__close" id="bfModalClose" aria-label="Close">×</button>
            </div>
            <div class="bf-modal__body">
              <img
                class="bf-modal__img"
                src="assets/body-fat-reference-men.jpg"
                alt="Reference chart: male torso examples from about 5–9% body fat through 40% and higher, in eight panels with percentage ranges labeled."
                loading="lazy"
                decoding="async"
              />
              <p class="bf-modal__hint muted small">
                Compare your build to pick a percentage for <strong>Est. body fat (%)</strong>. Ranges are approximate.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.rows = [];
    this.injBody = this.querySelector('#injBody');
    this.chartWrap = this.querySelector('#chartWrap');

    this.querySelector('#addRow').addEventListener('click', () => this.addInjectionRow());
    this.querySelector('#loadDemo').addEventListener('click', () => this.loadDemo());
    this.querySelector('#fillSchedule').addEventListener('click', () => this.fillSchedule());
    this.querySelector('#compute').addEventListener('click', () => this.renderChart());
    this.querySelector('#save').addEventListener('click', () => this.save());
    this.querySelector('#export').addEventListener('click', () => this.exportCsv());

    const carryoverEl = this.querySelector('#carryover');
    carryoverEl.addEventListener('input', () => this.renderChart());
    carryoverEl.addEventListener('change', () => this.renderChart());

    const anthroHandler = () => {
      this.updateAnthroReadout();
      this.renderChart();
    };
    for (const id of ['anthroHeight', 'anthroWeight', 'anthroBf']) {
      const el = this.querySelector(`#${id}`);
      el.addEventListener('input', anthroHandler);
      el.addEventListener('change', anthroHandler);
    }

    this.querySelector('#bfRefOpen').addEventListener('click', () => this.openBfModal());
    this.querySelector('#bfModalClose').addEventListener('click', () => this.closeBfModal());
    this.querySelector('#bfModalBackdrop').addEventListener('click', () => this.closeBfModal());
    this._bfModalEsc = (e) => {
      if (e.key === 'Escape') this.closeBfModal();
    };

    this.querySelector('#schedMode').addEventListener('change', () => this.updateScheduleLabels());

    this.loadFromStorage();
    this.updateScheduleLabels();
    const schedStart = this.querySelector('#schedStart');
    if (schedStart && !schedStart.value) {
      schedStart.value = formatLocalDateString(new Date());
    }
    if (this.rows.length === 0) {
      this.addInjectionRow();
      this.addInjectionRow();
      this.addInjectionRow();
    }
    this.updateAnthroReadout();
    this.renderChart();
  }

  openBfModal() {
    const modal = this.querySelector('#bfModal');
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('bf-modal-open');
    document.addEventListener('keydown', this._bfModalEsc);
    this.querySelector('#bfModalClose')?.focus();
  }

  closeBfModal() {
    const modal = this.querySelector('#bfModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('bf-modal-open');
    document.removeEventListener('keydown', this._bfModalEsc);
    this.querySelector('#bfRefOpen')?.focus();
  }

  updateAnthroReadout() {
    const el = this.querySelector('#anthroReadout');
    if (!el) return;
    const bfRaw = this.querySelector('#anthroBf').value.trim();
    const a = computeAnthroScaling({
      heightCm: Number(this.querySelector('#anthroHeight').value),
      weightKg: Number(this.querySelector('#anthroWeight').value),
      bodyFatPct: bfRaw === '' ? null : Number(bfRaw),
    });
    if (!a) {
      el.textContent = 'Enter height (120–230 cm) and weight (40–220 kg).';
      return;
    }
    el.textContent = `BMI ${a.bmi.toFixed(1)} · lean mass ~${a.lbmKg.toFixed(0)} kg (${a.bodyFatUsed}% fat) · model scale ${a.factor.toFixed(2)}× vs reference (${REFERENCE_ANTHRO.heightCm} cm / ${REFERENCE_ANTHRO.weightKg} kg / ${REFERENCE_ANTHRO.bodyFatPct}% fat).`;
  }

  updateScheduleLabels() {
    const schedMode = this.querySelector('#schedMode');
    const schedDateLabel = this.querySelector('#schedDateLabel');
    const schedHint = this.querySelector('#schedHint');
    if (!schedMode || !schedDateLabel || !schedHint) return;
    const back = schedMode.value === 'backward';
    schedDateLabel.textContent = back ? 'Most recent injection date' : 'Earliest injection (first of the 10)';
    schedHint.textContent = back
      ? 'The last row in the table matches this date; rows above go back in time by the interval.'
      : 'The first row is this date; each next row adds one interval (forward in time).';
  }

  addInjectionRow(dateStr = '', doseMg = DEFAULT_DOSE_MG) {
    if (this.rows.length >= 10) return;
    const tr = document.createElement('tr');
    const safe = String(dateStr ?? '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
    tr.innerHTML = `
      <td class="inj-date-cell">
        <input
          type="text"
          class="inj-date"
          spellcheck="false"
          autocomplete="off"
          inputmode="numeric"
          placeholder="YYYY-MM-DD or 15/06/2024"
          value="${safe}"
        />
      </td>
      <td><input type="number" class="inj-dose" min="250" max="1500" step="50" value="${doseMg}" title="Default 1000 mg = one 1000 mg/4 mL vial (typical pharmacy presentation)" /></td>
      <td><button type="button" class="btn icon remove" title="Remove">×</button></td>
    `;
    const dateInput = tr.querySelector('.inj-date');
    tr.querySelector('.remove').addEventListener('click', () => {
      tr.remove();
      this.syncRowsFromDom();
      this.renderChart();
    });
    dateInput.addEventListener('blur', () => {
      const p = parseFlexibleDate(dateInput.value);
      if (p) dateInput.value = formatLocalDateString(p);
    });
    tr.querySelectorAll('input').forEach((el) => {
      el.addEventListener('input', () => this.renderChart());
      el.addEventListener('change', () => this.renderChart());
    });
    this.injBody.appendChild(tr);
    this.syncRowsFromDom();
  }

  fillSchedule() {
    const startStr = this.querySelector('#schedStart').value;
    const interval = Math.max(1, Math.min(365, Number(this.querySelector('#schedInterval').value) || 25));
    const dose = Number(this.querySelector('#schedDose').value) || DEFAULT_DOSE_MG;
    const backward = this.querySelector('#schedMode').value === 'backward';
    const anchor = parseLocalDateString(startStr);
    if (!anchor) {
      this.flash('Pick an anchor date in the calendar.');
      return;
    }
    this.injBody.innerHTML = '';
    this.rows = [];
    const base = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
    for (let i = 0; i < 10; i++) {
      const d = new Date(base);
      if (backward) {
        d.setDate(d.getDate() - (9 - i) * interval);
      } else {
        d.setDate(d.getDate() + i * interval);
      }
      this.addInjectionRow(formatLocalDateString(d), dose);
    }
    this.renderChart();
    this.flash('Filled 10 rows from your schedule.');
  }

  syncRowsFromDom() {
    this.rows = [...this.injBody.querySelectorAll('tr')].map((tr) => ({
      dateInput: tr.querySelector('.inj-date'),
      doseInput: tr.querySelector('.inj-dose'),
    }));
  }

  getInjections() {
    this.syncRowsFromDom();
    const out = [];
    for (const r of this.rows) {
      const raw = (r.dateInput.value || '').trim();
      const d = parseFlexibleDate(raw);
      const dose = Number(r.doseInput.value) || DEFAULT_DOSE_MG;
      if (d) out.push({ date: d, doseMg: dose });
    }
    return sortInjections(out);
  }

  getPkOptions() {
    const endo = Number(this.querySelector('#endo').value) || 0;
    const carry = Math.max(0, Number(this.querySelector('#carryover').value) || 0);
    const bfRaw = this.querySelector('#anthroBf').value.trim();
    const anthro = computeAnthroScaling({
      heightCm: Number(this.querySelector('#anthroHeight').value),
      weightKg: Number(this.querySelector('#anthroWeight').value),
      bodyFatPct: bfRaw === '' ? null : Number(bfRaw),
    });
    const factor = anthro?.factor ?? 1;
    return {
      endogenousNgDl: endo,
      priorTrtCarryoverNgDl: carry,
      /** Applied inside pk-model buildSeries / exogenous sums (not via peakNgDlAtReferenceDose). */
      bodyScaleFactor: factor,
      pk: { ...DEFAULT_PK },
    };
  }

  loadDemo() {
    this.injBody.innerHTML = '';
    this.rows = [];
    const today = new Date();
    const daysAgo = (n) => {
      const x = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      x.setDate(x.getDate() - n);
      return formatLocalDateString(x);
    };
    this.addInjectionRow(daysAgo(0), DEFAULT_DOSE_MG);
    this.addInjectionRow(daysAgo(20), DEFAULT_DOSE_MG);
    this.addInjectionRow(daysAgo(40), DEFAULT_DOSE_MG);
    this.querySelector('#endo').value = '0';
    this.querySelector('#carryover').value = '500';
    this.querySelector('#anthroHeight').value = String(REFERENCE_ANTHRO.heightCm);
    this.querySelector('#anthroWeight').value = String(REFERENCE_ANTHRO.weightKg);
    this.querySelector('#anthroBf').value = String(REFERENCE_ANTHRO.bodyFatPct);
    this.querySelector('#horizon').value = '120';
    this.updateAnthroReadout();
    this.renderChart();
  }

  save() {
    const data = {
      injections: this.getInjections().map((i) => ({
        dateString: formatLocalDateString(i.date),
        doseMg: i.doseMg,
      })),
      endo: this.querySelector('#endo').value,
      anthroHeight: this.querySelector('#anthroHeight').value,
      anthroWeight: this.querySelector('#anthroWeight').value,
      anthroBf: this.querySelector('#anthroBf').value,
      horizon: this.querySelector('#horizon').value,
      breakdown: this.querySelector('#breakdown').value,
      schedMode: this.querySelector('#schedMode').value,
      schedInterval: this.querySelector('#schedInterval').value,
      schedDose: this.querySelector('#schedDose').value,
      schedStart: this.querySelector('#schedStart').value,
      carryover: this.querySelector('#carryover').value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.flash('Saved in this browser.');
  }

  loadFromStorage() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) raw = localStorage.getItem('tu-tracker-v1');
      if (!raw) return;
      const data = JSON.parse(raw);
      this.injBody.innerHTML = '';
      this.rows = [];
      const list = data.injections || [];
      for (const i of list.slice(0, 10)) {
        let ds = '';
        if (i.dateString && typeof i.dateString === 'string') {
          ds = i.dateString;
        } else if (i.date) {
          const parsed = new Date(i.date);
          if (!Number.isNaN(parsed.getTime())) ds = formatLocalDateString(parsed);
        }
        this.addInjectionRow(ds, i.doseMg ?? DEFAULT_DOSE_MG);
      }
      if (data.endo != null) this.querySelector('#endo').value = data.endo;
      if (data.anthroHeight != null) this.querySelector('#anthroHeight').value = data.anthroHeight;
      if (data.anthroWeight != null) this.querySelector('#anthroWeight').value = data.anthroWeight;
      if (data.anthroBf != null) this.querySelector('#anthroBf').value = data.anthroBf;
      if (data.horizon != null) this.querySelector('#horizon').value = data.horizon;
      if (data.breakdown != null) this.querySelector('#breakdown').value = data.breakdown;
      if (data.schedMode != null) this.querySelector('#schedMode').value = data.schedMode;
      if (data.schedInterval != null) this.querySelector('#schedInterval').value = data.schedInterval;
      if (data.schedDose != null) this.querySelector('#schedDose').value = data.schedDose;
      if (data.schedStart != null) this.querySelector('#schedStart').value = data.schedStart;
      if (data.carryover != null) this.querySelector('#carryover').value = data.carryover;
      this.updateScheduleLabels();
      this.updateAnthroReadout();
    } catch {
      /* ignore */
    }
  }

  flash(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    this.querySelector('.shell').appendChild(el);
    requestAnimationFrame(() => el.classList.add('toast--show'));
    setTimeout(() => {
      el.classList.remove('toast--show');
      setTimeout(() => el.remove(), 300);
    }, 2200);
  }

  exportCsv() {
    const injections = this.getInjections();
    if (injections.length === 0) {
      this.flash('Add at least one dated injection.');
      return;
    }
    const horizon = Number(this.querySelector('#horizon').value) || 120;
    const last = injections[injections.length - 1].date.getTime();
    const start = injections[0].date.getTime();
    const end = last + horizon * 86400 * 1000;
    const opts = this.getPkOptions();
    const series = buildSeries(injections, start, end, 1, opts);
    const lines = [
      'day_offset,date_iso,total_ng_dl,exogenous_listed_ng_dl,endogenous_ng_dl,prior_trt_carryover_ng_dl',
    ];
    for (const p of series) {
      const iso = new Date(p.t).toISOString();
      const c = p.priorTrtCarryover ?? 0;
      lines.push(
        `${p.dayOffset.toFixed(2)},${iso},${p.total.toFixed(1)},${p.exogenous.toFixed(1)},${p.endogenous.toFixed(1)},${c.toFixed(1)}`
      );
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'testosterone-undecanoate-estimate.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    this.flash('CSV downloaded.');
  }

  renderChart() {
    const injections = this.getInjections();
    const horizon = Number(this.querySelector('#horizon').value) || 120;
    const summary = this.querySelector('#summary');
    const breakdown = this.querySelector('#breakdown').value === 'on';

    if (injections.length === 0) {
      summary.textContent = 'Add injection dates to see a curve.';
      this.chartWrap.innerHTML = '<div class="empty-chart">No data yet.</div>';
      return;
    }

    const start = injections[0].date.getTime();
    const last = injections[injections.length - 1].date.getTime();
    const end = last + horizon * 86400 * 1000;
    const opts = this.getPkOptions();
    const series = buildSeries(injections, start, end, 0.5, opts);
    const perInj = breakdown ? buildPerInjectionSeries(injections, start, end, 0.5, opts) : [];

    const first = injections[0].date;
    const lastD = injections[injections.length - 1].date;
    const co = opts.priorTrtCarryoverNgDl ?? 0;
    const coNote = co > 0 ? ` · prior TRT carryover +${Math.round(co)} ng/dL` : '';
    summary.textContent = `Window: ${first.toLocaleDateString()} → ${new Date(end).toLocaleDateString()} · ${injections.length} injection(s)${coNote}`;

    this.chartWrap.innerHTML = '';
    const svg = this.buildSvg(series, perInj, breakdown);
    this.chartWrap.appendChild(svg);
  }

  buildSvg(series, perInj, breakdown) {
    const W = 900;
    const H = 380;
    const pad = { l: 56, r: 24, t: 24, b: 48 };
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;

    /** Fixed ng/dL cap so uniform scaling (e.g. body-size factor) changes curve height; if data exceed this, axis grows. */
    const CHART_Y_AXIS_CAP = 1500;
    let maxObserved = 0;
    for (const p of series) maxObserved = Math.max(maxObserved, p.total);
    let maxY = Math.max(CHART_Y_AXIS_CAP, maxObserved * 1.08);
    const minY = 0;

    const x0 = series[0].dayOffset;
    const x1 = series[series.length - 1].dayOffset;
    const sx = (d) => pad.l + ((d - x0) / (x1 - x0 || 1)) * innerW;
    const sy = (v) => pad.t + innerH - ((v - minY) / (maxY - minY || 1)) * innerH;

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'tu-chart');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Estimated serum total testosterone over time');

    const defs = document.createElementNS(ns, 'defs');
    const grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', 'lineGrad');
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0');
    grad.setAttribute('y2', '1');
    const g0 = document.createElementNS(ns, 'stop');
    g0.setAttribute('offset', '0%');
    g0.setAttribute('stop-color', '#7dd3c0');
    const g1 = document.createElementNS(ns, 'stop');
    g1.setAttribute('offset', '100%');
    g1.setAttribute('stop-color', 'rgba(125, 211, 192, 0.12)');
    grad.append(g0, g1);
    defs.appendChild(grad);
    svg.appendChild(defs);

    // Reference band
    const band = document.createElementNS(ns, 'rect');
    band.setAttribute('x', pad.l);
    band.setAttribute('y', sy(REFERENCE_RANGE.high));
    band.setAttribute('width', innerW);
    band.setAttribute('height', sy(REFERENCE_RANGE.low) - sy(REFERENCE_RANGE.high));
    band.setAttribute('class', 'chart-ref');
    svg.appendChild(band);

    // Grid
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const val = minY + (i / yTicks) * (maxY - minY);
      const ly = sy(val);
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', pad.l);
      line.setAttribute('x2', pad.l + innerW);
      line.setAttribute('y1', ly);
      line.setAttribute('y2', ly);
      line.setAttribute('class', 'chart-grid');
      svg.appendChild(line);
      const lbl = document.createElementNS(ns, 'text');
      lbl.setAttribute('x', pad.l - 8);
      lbl.setAttribute('y', ly + 4);
      lbl.setAttribute('text-anchor', 'end');
      lbl.setAttribute('class', 'chart-axis-text');
      lbl.textContent = Math.round(val);
      svg.appendChild(lbl);
    }

    const palette = ['#7dd3c0', '#a78bfa', '#fbbf24', '#f472b6', '#60a5fa', '#c4b5fd', '#fb923c', '#4ade80', '#e879f9', '#94a3b8'];

    if (breakdown && perInj.length) {
      perInj.forEach((curve, i) => {
        const pts = curve.points.map((p) => `${sx(p.dayOffset)},${sy(p.value)}`).join(' ');
        const pl = document.createElementNS(ns, 'polyline');
        pl.setAttribute('fill', 'none');
        pl.setAttribute('stroke', palette[i % palette.length]);
        pl.setAttribute('stroke-width', '1.5');
        pl.setAttribute('opacity', '0.85');
        pl.setAttribute('points', pts);
        pl.setAttribute('stroke-dasharray', '6 4');
        svg.appendChild(pl);
      });
    }

    const pathD = series
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.dayOffset)} ${sy(p.total)}`)
      .join(' ');
    const xLast = sx(series[series.length - 1].dayOffset);
    const xFirst = sx(series[0].dayOffset);
    const y0 = sy(0);
    const areaD = `${pathD} L ${xLast} ${y0} L ${xFirst} ${y0} Z`;

    const area = document.createElementNS(ns, 'path');
    area.setAttribute('d', areaD);
    area.setAttribute('class', 'chart-area');
    area.setAttribute('fill', 'url(#lineGrad)');
    svg.appendChild(area);

    const line = document.createElementNS(ns, 'path');
    line.setAttribute('d', pathD);
    line.setAttribute('fill', 'none');
    line.setAttribute('class', 'chart-line');
    line.setAttribute('stroke', '#7dd3c0');
    line.setAttribute('stroke-width', '2.5');
    svg.appendChild(line);

    const xLabel = document.createElementNS(ns, 'text');
    xLabel.setAttribute('x', pad.l + innerW / 2);
    xLabel.setAttribute('y', H - 12);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('class', 'chart-axis-title');
    xLabel.textContent = 'Days from first listed injection';
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS(ns, 'text');
    yLabel.setAttribute('x', 18);
    yLabel.setAttribute('y', pad.t + innerH / 2);
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('transform', `rotate(-90 18 ${pad.t + innerH / 2})`);
    yLabel.setAttribute('class', 'chart-axis-title');
    yLabel.textContent = 'Serum total T (ng/dL)';
    svg.appendChild(yLabel);

    return svg;
  }
}

customElements.define('tu-app', TuApp);
