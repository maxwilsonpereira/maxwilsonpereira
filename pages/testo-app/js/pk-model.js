/**
 * Educational model: testosterone undecanoate (IM) — linear dose scaling + superposition.
 * Calibrated to literature/label: Cmax median ~7 days after injection; long terminal decline.
 * NOT medical advice — see disclaimer in app.
 */

/** @param {number} ka - absorption rate constant (1/d) */
/** @param {number} ke - elimination rate constant (1/d) */
export function batemanContribution(tDays, ka, ke) {
  if (tDays <= 0) return 0;
  if (Math.abs(ka - ke) < 1e-9) {
    return tDays * Math.exp(-ke * tDays) * ka;
  }
  const scale = ka / (ka - ke);
  return scale * (Math.exp(-ke * tDays) - Math.exp(-ka * tDays));
}

/** Peak time of Bateman function (days) */
export function batemanPeakTime(ka, ke) {
  if (Math.abs(ka - ke) < 1e-9) return 1 / ke;
  return Math.log(ka / ke) / (ka - ke);
}

/**
 * Reference dose = 1000 mg (common pharmacy presentation: 1000 mg / 4 mL TU oil for IM use).
 * Shape calibrated to literature (Cmax ~first week; long depot tail). Linear scaling vs this dose.
 */
export const DEFAULT_PK = {
  ka: 0.38,
  ke: 0.052,
  /** mg — one “full vial” reference for scaling (1000 mg / 4 mL) */
  referenceDoseMg: 1000,
  /**
   * ng/dL peak contribution from ONE reference dose (1000 mg), hypogonadal baseline 0.
   * Chosen so behavior matches prior 750 mg calibration: 520 × (1000/750).
   * Anthropometric scaling is applied via opts.bodyScaleFactor in buildSeries (not by mutating peak here).
   */
  peakNgDlAtReferenceDose: (520 * 1000) / 750,
};

/**
 * @param {number} tDays - days since this injection
 * @param {number} doseMg
 * @param {{ ka?: number, ke?: number, referenceDoseMg?: number, peakNgDlAtReferenceDose?: number, amplitude750?: number }} pk
 * @returns {number} ng/dL from this injection alone
 */
export function singleDoseContribution(tDays, doseMg, pk = DEFAULT_PK) {
  const merged = { ...DEFAULT_PK, ...pk };
  const { ka, ke } = merged;
  const refDose = merged.referenceDoseMg ?? 1000;
  let peak = merged.peakNgDlAtReferenceDose;
  if (peak == null && merged.amplitude750 != null) {
    peak = merged.amplitude750 * (refDose / 750);
  }
  if (peak == null) peak = DEFAULT_PK.peakNgDlAtReferenceDose;
  const raw = batemanContribution(tDays, ka, ke);
  const tPeak = batemanPeakTime(ka, ke);
  const peakRaw = batemanContribution(tPeak, ka, ke);
  const norm = peakRaw > 0 ? raw / peakRaw : 0;
  const doseScale = doseMg / refDose;
  return norm * peak * doseScale;
}

/**
 * Optional weight/BMI adjustment (inverse correlation per Aveed PI — higher weight → lower levels).
 * @param {number} factor - multiply peak (e.g. 0.85–1.15)
 */
export function applyBodyFactor(peakNgDlAtReferenceDose, factor) {
  return peakNgDlAtReferenceDose * factor;
}

/** Anthropometric scale from UI (height/weight/fat); always applied to exogenous contribution. */
function bodyScaleFromOpts(opts) {
  const s = opts?.bodyScaleFactor;
  if (s == null || Number.isNaN(Number(s))) return 1;
  return Number(s);
}

/**
 * Exogenous T from listed injections only (no carryover).
 * @param {{ date: Date, doseMg: number }[]} injections
 * @param {number} tMs
 * @param {{ pk?: object }} opts
 */
export function exogenousFromListedInjections(injections, tMs, opts = {}) {
  const pk = { ...DEFAULT_PK, ...opts.pk };
  const scale = bodyScaleFromOpts(opts);
  let exog = 0;
  for (const inj of injections) {
    const t0 = inj.date instanceof Date ? inj.date.getTime() : new Date(inj.date).getTime();
    const dtDays = (tMs - t0) / (86400 * 1000);
    exog += singleDoseContribution(dtDays, inj.doseMg ?? DEFAULT_PK.referenceDoseMg, pk) * scale;
  }
  return exog;
}

/**
 * Sum total testosterone from injections + endogenous baseline + optional prior-TRT carryover.
 * @param {{ priorTrtCarryoverNgDl?: number, endogenousNgDl?: number, pk?: object }} opts
 *   priorTrtCarryoverNgDl — rough background from depots **before** your first listed injection (unmodeled history).
 */
export function totalTestosteroneAt(injections, tMs, opts = {}) {
  const exog = exogenousFromListedInjections(injections, tMs, opts);
  const endo = opts.endogenousNgDl ?? 0;
  const carry = opts.priorTrtCarryoverNgDl ?? 0;
  return exog + endo + carry;
}

/**
 * Build series for chart: [{ dayOffset, total, exogenous, endogenous }]
 * dayOffset is days from rangeStartMs.
 */
export function buildSeries(injections, rangeStartMs, rangeEndMs, stepDays = 0.5, opts = {}) {
  const series = [];
  const stepMs = stepDays * 86400 * 1000;
  const endo = opts.endogenousNgDl ?? 0;
  const carry = opts.priorTrtCarryoverNgDl ?? 0;
  const pk = { ...DEFAULT_PK, ...opts.pk };
  const scale = bodyScaleFromOpts(opts);

  for (let t = rangeStartMs; t <= rangeEndMs; t += stepMs) {
    let exog = 0;
    for (const inj of injections) {
      const t0 = inj.date instanceof Date ? inj.date.getTime() : new Date(inj.date).getTime();
      const dtDays = (t - t0) / (86400 * 1000);
      exog += singleDoseContribution(dtDays, inj.doseMg ?? DEFAULT_PK.referenceDoseMg, pk) * scale;
    }
    const dayOffset = (t - rangeStartMs) / (86400 * 1000);
    series.push({
      t,
      dayOffset,
      total: exog + endo + carry,
      exogenous: exog,
      endogenous: endo,
      priorTrtCarryover: carry,
    });
  }
  return series;
}

/**
 * Per-injection curves for stacked/line breakdown (same time grid as buildSeries).
 */
export function buildPerInjectionSeries(injections, rangeStartMs, rangeEndMs, stepDays, opts = {}) {
  const stepMs = stepDays * 86400 * 1000;
  const pk = { ...DEFAULT_PK, ...opts.pk };
  const scale = bodyScaleFromOpts(opts);
  const grid = [];
  for (let t = rangeStartMs; t <= rangeEndMs; t += stepMs) {
    grid.push(t);
  }
  return injections.map((inj, idx) => {
    const t0 = inj.date instanceof Date ? inj.date.getTime() : new Date(inj.date).getTime();
    const points = grid.map((t) => {
      const dtDays = (t - t0) / (86400 * 1000);
      const v = singleDoseContribution(dtDays, inj.doseMg ?? DEFAULT_PK.referenceDoseMg, pk) * scale;
      return { t, dayOffset: (t - rangeStartMs) / (86400 * 1000), value: v };
    });
    return { inj, idx, points };
  });
}

export const REFERENCE_RANGE = { low: 300, high: 1000 };
