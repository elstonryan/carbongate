import type { EmissionFactor, SectorId } from "./types";

/**
 * Default emission factor tables (versioned).
 *
 * Values are INDICATIVE ranges drawn from the CBAM regulation reference; the
 * midpoint of each published range is used as the default intensity. Always
 * source the current EU-published default value for the specific CN code and
 * country of origin before relying on these in a real filing.
 *
 * Source: knowledge/cbam-regulation-reference.md (default values table).
 */
export const DEFAULT_FACTORS_VERSION = "2026.1";

export const DEFAULT_FACTORS: EmissionFactor[] = [
  // ----- Iron & Steel -----
  {
    id: "steel-bf-bof",
    sector: "steel",
    label: "Steel — BF-BOF route",
    cnCode: "7208 / 7219",
    defaultIntensity: 2.35, // midpoint of ~2.1–2.6
    typicalActualIntensity: 2.0,
    includesIndirect: false,
  },
  {
    id: "steel-dri-eaf",
    sector: "steel",
    label: "Steel — DRI-EAF route",
    cnCode: "7207 / 7214",
    defaultIntensity: 2.05, // midpoint of ~1.8–2.3
    typicalActualIntensity: 1.3,
    includesIndirect: true,
  },
  {
    id: "steel-scrap-eaf",
    sector: "steel",
    label: "Steel — scrap-EAF route",
    cnCode: "7213 / 7216",
    defaultIntensity: 1.15, // midpoint of ~0.9–1.4
    typicalActualIntensity: 0.6,
    includesIndirect: true,
  },
  // ----- Aluminium -----
  {
    id: "aluminium-primary",
    sector: "aluminium",
    label: "Aluminium — primary (unwrought)",
    cnCode: "7601",
    defaultIntensity: 17.0, // midpoint of ~16–18
    typicalActualIntensity: 13.5,
    includesIndirect: true,
  },
  {
    id: "aluminium-semi",
    sector: "aluminium",
    label: "Aluminium — semi-finished (bars, profiles)",
    cnCode: "7604 / 7606",
    defaultIntensity: 8.6,
    typicalActualIntensity: 6.8,
    includesIndirect: true,
  },
  // ----- Cement -----
  {
    id: "cement-clinker",
    sector: "cement",
    label: "Cement — clinker",
    cnCode: "2523",
    defaultIntensity: 0.87, // typical ~0.7–1.0
    typicalActualIntensity: 0.78,
    includesIndirect: true,
  },
  // ----- Fertilizers -----
  {
    id: "fertilizer-urea",
    sector: "fertilizer",
    label: "Fertilizer — urea",
    cnCode: "3102 10",
    defaultIntensity: 2.4, // midpoint of ~2.0–2.8
    typicalActualIntensity: 1.85,
    includesIndirect: true,
  },
  {
    id: "fertilizer-ammonia",
    sector: "fertilizer",
    label: "Fertilizer — ammonia (precursor)",
    cnCode: "2814",
    defaultIntensity: 2.6,
    typicalActualIntensity: 2.0,
    includesIndirect: true,
  },
  // ----- Hydrogen -----
  {
    id: "hydrogen-grey",
    sector: "hydrogen",
    label: "Hydrogen — SMR (grey)",
    cnCode: "2804 10",
    defaultIntensity: 10.0,
    typicalActualIntensity: 8.5,
    includesIndirect: false,
  },
  // ----- Electricity -----
  {
    id: "electricity-grid",
    sector: "electricity",
    label: "Electricity — grid import",
    cnCode: "2716",
    defaultIntensity: 0.45, // tCO2e/MWh equivalent unit
    typicalActualIntensity: 0.35,
    includesIndirect: false,
  },
];

export const SECTOR_LABELS: Record<SectorId, string> = {
  steel: "Iron & Steel",
  aluminium: "Aluminium",
  cement: "Cement",
  fertilizer: "Fertilizers",
  hydrogen: "Hydrogen",
  electricity: "Electricity",
};

/** Mock live prices (would come from a cached price feed in production). */
export const MOCK_PRICES = {
  euEtsPrice: 65, // EUR / tCO2e
  ukEtsPrice: 45, // GBP / tCO2e
} as const;

/** Countries of origin offered in the calculator dropdowns. */
export const ORIGIN_COUNTRIES = [
  "India",
  "China",
  "Turkey",
  "South Korea",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Brazil",
  "Russia",
  "Other",
] as const;

export function getFactor(id: string): EmissionFactor | undefined {
  return DEFAULT_FACTORS.find((f) => f.id === id);
}
