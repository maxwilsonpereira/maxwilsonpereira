/**
 * Scales modeled serum T vs a reference anthropometry (educational PK approximation).
 * Rationale: IM TU trials report lower average serum T at higher weight/BMI for the same dose;
 * distribution volume also tracks lean mass. This blends both vs a neutral reference male.
 */

/** Reference = middle adult male used when the old “100% body” slider meant “no tweak”. */
export const REFERENCE_ANTHRO = {
  heightCm: 176,
  weightKg: 84,
  bodyFatPct: 22,
};

export function computeBmi(weightKg, heightCm) {
  const h = heightCm / 100;
  if (h <= 0) return NaN;
  return weightKg / (h * h);
}

/** Lean body mass from estimated body fat % (simple two-compartment). */
export function leanBodyMassKg(weightKg, bodyFatPct) {
  return weightKg * (1 - bodyFatPct / 100);
}

/**
 * @param {{ heightCm: number, weightKg: number, bodyFatPct?: number | null }} a
 * @returns {{ factor: number, bmi: number, lbmKg: number, refBmi: number, refLbmKg: number, blend: { bmiRatio: number, lbmRatio: number } } | null}
 */
export function computeAnthroScaling(a) {
  const h = Number(a.heightCm);
  const w = Number(a.weightKg);
  const bf =
    a.bodyFatPct != null && a.bodyFatPct !== '' && !Number.isNaN(Number(a.bodyFatPct))
      ? Math.min(50, Math.max(4, Number(a.bodyFatPct)))
      : REFERENCE_ANTHRO.bodyFatPct;

  if (!Number.isFinite(h) || !Number.isFinite(w) || h < 120 || h > 230 || w < 40 || w > 220) {
    return null;
  }

  const ref = REFERENCE_ANTHRO;
  const refBmi = computeBmi(ref.weightKg, ref.heightCm);
  const refLbm = leanBodyMassKg(ref.weightKg, ref.bodyFatPct);

  const bmi = computeBmi(w, h);
  const lbm = leanBodyMassKg(w, bf);

  if (!Number.isFinite(bmi) || bmi < 12 || bmi > 70 || lbm < 25) return null;

  /** Higher BMI or higher LBM → larger Vd proxy → lower concentration: scale by ref/user. */
  let bmiRatio = refBmi / bmi;
  let lbmRatio = refLbm / Math.max(lbm, 1e-6);

  /** Damp extremes so a single outlier metric does not dominate. */
  bmiRatio = Math.min(1.28, Math.max(0.72, bmiRatio));
  lbmRatio = Math.min(1.28, Math.max(0.72, lbmRatio));

  /**
   * BMI vs lean mass blend. Lean mass (hence body fat % at fixed weight) must carry enough weight
   * or the curve barely moves when only fat % changes — BMI is unchanged in that case.
   */
  const wBmi = 0.38;
  let factor = wBmi * bmiRatio + (1 - wBmi) * lbmRatio;

  factor = Math.min(1.22, Math.max(0.78, factor));

  return {
    factor,
    bmi,
    lbmKg: lbm,
    bodyFatUsed: bf,
    refBmi,
    refLbmKg: refLbm,
    blend: { bmiRatio, lbmRatio },
  };
}
