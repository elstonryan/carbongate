import { formatEUR, formatNumber } from "@/lib/utils";
import { getFactor } from "./default-factors";
import type {
  CalculationStep,
  EUCalculationInput,
  EUCalculationResult,
} from "./types";

/**
 * Deterministic EU CBAM calculation engine.
 *
 * Mechanism (EU Regulation 2023/956):
 *   embedded_emissions = intensity (tCO2e/t) × volume (t)
 *   certificates_required = embedded_emissions  (1 certificate = 1 tCO2e)
 *   total_cost = certificates_required × ETS price
 *   quarterly_min_purchase = cumulative_emissions × 0.80
 *   sell_back_cap = certificates_held × (1/3)
 *
 * This is pure arithmetic — no LLM, no randomness. Same input → same output.
 */
export function calculateEU(input: EUCalculationInput): EUCalculationResult {
  const factor = getFactor(input.factorId);
  if (!factor) {
    throw new Error(`Unknown emission factor: ${input.factorId}`);
  }

  const useVerified = input.useVerified;
  const verifiedIntensity =
    input.verifiedIntensity && input.verifiedIntensity > 0
      ? input.verifiedIntensity
      : factor.typicalActualIntensity;

  const intensityUsed = useVerified ? verifiedIntensity : factor.defaultIntensity;
  const volume = Math.max(0, input.volumeTonnes);
  const etsPrice = input.etsPrice;

  // Core embedded emissions and certificate obligation.
  const embeddedEmissions = intensityUsed * volume;
  const certificatesRequired = embeddedEmissions; // 1 cert = 1 tCO2e
  const totalCost = certificatesRequired * etsPrice;

  // Quarterly minimum holding: 80% of cumulative embedded emissions.
  const quarterlyMinPurchase = embeddedEmissions * 0.8;
  const quarterlyMinCost = quarterlyMinPurchase * etsPrice;

  // Sell-back cap: max 1/3 of certificates held may be sold back.
  const sellBackCapCertificates = certificatesRequired / 3;

  // Savings comparison vs punitive defaults.
  const costAtDefault = factor.defaultIntensity * volume * etsPrice;
  const savingVsDefault = useVerified ? costAtDefault - totalCost : 0;
  const savingPercent =
    costAtDefault > 0 ? (savingVsDefault / costAtDefault) * 100 : 0;

  const steps: CalculationStep[] = [
    {
      label: "Embedded emissions",
      formula: "intensity (tCO₂e/t) × volume (t)",
      value: `${formatNumber(intensityUsed)} × ${formatNumber(volume)} = ${formatNumber(embeddedEmissions)} tCO₂e`,
    },
    {
      label: "Certificates required",
      formula: "1 CBAM certificate = 1 tCO₂e",
      value: `${formatNumber(certificatesRequired)} certificates`,
    },
    {
      label: "Total annual cost",
      formula: "certificates × EU ETS price",
      value: `${formatNumber(certificatesRequired)} × ${formatEUR(etsPrice)} = ${formatEUR(totalCost)}`,
    },
    {
      label: "Quarterly minimum (80% rule)",
      formula: "cumulative embedded emissions × 0.80",
      value: `${formatNumber(embeddedEmissions)} × 0.80 = ${formatNumber(quarterlyMinPurchase)} certificates`,
    },
    {
      label: "Sell-back cap (⅓ rule)",
      formula: "certificates held ÷ 3",
      value: `${formatNumber(certificatesRequired)} ÷ 3 = ${formatNumber(sellBackCapCertificates)} max sellable`,
    },
  ];

  if (useVerified) {
    steps.push({
      label: "Saving vs default values",
      formula: "cost at default − cost at verified",
      value: `${formatEUR(costAtDefault)} − ${formatEUR(totalCost)} = ${formatEUR(savingVsDefault)} (${formatNumber(savingPercent, 1)}%)`,
    });
  }

  return {
    regime: "EU",
    factorLabel: factor.label,
    cnCode: factor.cnCode,
    intensityUsed,
    intensitySource: useVerified ? "verified" : "default",
    volumeTonnes: volume,
    embeddedEmissions,
    certificatesRequired,
    etsPrice,
    totalCost,
    quarterlyMinPurchase,
    quarterlyMinCost,
    sellBackCapCertificates,
    costAtDefault,
    savingVsDefault,
    savingPercent,
    steps,
  };
}
