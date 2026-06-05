/**
 * Shared types for the deterministic CBAM calculation engine.
 * The LLM NEVER performs this maths — it only formats the structured result.
 */

export type Regime = "EU" | "UK" | "US" | "IN";

export type SectorId =
  | "steel"
  | "aluminium"
  | "cement"
  | "fertilizer"
  | "hydrogen"
  | "electricity";

export type SteelRoute = "bf-bof" | "dri-eaf" | "scrap-eaf";

export interface EmissionFactor {
  /** Stable identifier used in dropdowns and lookups. */
  id: string;
  sector: SectorId;
  /** Human-readable production route / product variant. */
  label: string;
  /** Representative CN code(s) for this product family. */
  cnCode: string;
  /** Default embedded emissions intensity (tCO2e per tonne of product). */
  defaultIntensity: number;
  /** Typical verified actual intensity (illustrative, for the savings hook). */
  typicalActualIntensity: number;
  /** Whether indirect (electricity) emissions are included in the default. */
  includesIndirect: boolean;
}

export interface EUCalculationInput {
  factorId: string;
  /** Import volume in tonnes for the period. */
  volumeTonnes: number;
  countryOfOrigin: string;
  /** Use verified actual intensity instead of punitive default. */
  useVerified: boolean;
  /** Optional overridden intensity (tCO2e/t) when verified data supplied. */
  verifiedIntensity?: number;
  /** EU ETS certificate price (EUR per tCO2e). */
  etsPrice: number;
}

export interface EUCalculationResult {
  regime: "EU";
  factorLabel: string;
  cnCode: string;
  intensityUsed: number;
  intensitySource: "default" | "verified";
  volumeTonnes: number;
  embeddedEmissions: number;
  certificatesRequired: number;
  etsPrice: number;
  totalCost: number;
  quarterlyMinPurchase: number;
  quarterlyMinCost: number;
  sellBackCapCertificates: number;
  /** Cost if defaults were used (for the savings comparison). */
  costAtDefault: number;
  /** Absolute saving vs default when verified data is used. */
  savingVsDefault: number;
  savingPercent: number;
  steps: CalculationStep[];
}

export interface UKCalculationInput {
  factorId: string;
  volumeTonnes: number;
  countryOfOrigin: string;
  /** UK ETS reference price (GBP per tCO2e). */
  ukEtsPrice: number;
  /** Overseas carbon price already paid (GBP per tCO2e) — creditable. */
  overseasCarbonPrice: number;
  accountingPeriod: string;
}

export interface UKCalculationResult {
  regime: "UK";
  factorLabel: string;
  cnCode: string;
  intensityUsed: number;
  volumeTonnes: number;
  embeddedEmissions: number;
  ukEtsPrice: number;
  grossLevy: number;
  overseasCredit: number;
  netLevy: number;
  accountingPeriod: string;
  steps: CalculationStep[];
}

/** A single transparent step in the methodology, shown to the user. */
export interface CalculationStep {
  label: string;
  formula: string;
  value: string;
}
