import { formatGBP, formatNumber } from "@/lib/utils";
import { getFactor } from "./default-factors";
import type {
  CalculationStep,
  UKCalculationInput,
  UKCalculationResult,
} from "./types";

/**
 * Deterministic UK CBAM calculation engine.
 *
 * Mechanism (UK CBAM — direct levy, live 1 Jan 2027):
 *   embedded_emissions = intensity (tCO2e/t) × volume (t)
 *   gross_levy = embedded_emissions × UK ETS reference price
 *   overseas_credit = embedded_emissions × overseas carbon price already paid
 *   net_levy = max(0, gross_levy − overseas_credit)
 *
 * UK uses a tax/levy model (no tradable certificates) and credits any overseas
 * carbon price already paid. Pure arithmetic — no LLM involvement.
 */
export function calculateUK(input: UKCalculationInput): UKCalculationResult {
  const factor = getFactor(input.factorId);
  if (!factor) {
    throw new Error(`Unknown emission factor: ${input.factorId}`);
  }

  const intensityUsed = factor.defaultIntensity;
  const volume = Math.max(0, input.volumeTonnes);
  const ukEtsPrice = input.ukEtsPrice;
  const overseasCarbonPrice = Math.max(0, input.overseasCarbonPrice);

  const embeddedEmissions = intensityUsed * volume;
  const grossLevy = embeddedEmissions * ukEtsPrice;
  const overseasCredit = embeddedEmissions * overseasCarbonPrice;
  const netLevy = Math.max(0, grossLevy - overseasCredit);

  const steps: CalculationStep[] = [
    {
      label: "Embedded emissions",
      formula: "intensity (tCO₂e/t) × volume (t)",
      value: `${formatNumber(intensityUsed)} × ${formatNumber(volume)} = ${formatNumber(embeddedEmissions)} tCO₂e`,
    },
    {
      label: "Gross UK levy",
      formula: "embedded emissions × UK ETS reference price",
      value: `${formatNumber(embeddedEmissions)} × ${formatGBP(ukEtsPrice)} = ${formatGBP(grossLevy)}`,
    },
    {
      label: "Overseas carbon price credit",
      formula: "embedded emissions × overseas price paid",
      value: `${formatNumber(embeddedEmissions)} × ${formatGBP(overseasCarbonPrice)} = ${formatGBP(overseasCredit)}`,
    },
    {
      label: "Net levy payable",
      formula: "max(0, gross levy − overseas credit)",
      value: `${formatGBP(grossLevy)} − ${formatGBP(overseasCredit)} = ${formatGBP(netLevy)}`,
    },
  ];

  return {
    regime: "UK",
    factorLabel: factor.label,
    cnCode: factor.cnCode,
    intensityUsed,
    volumeTonnes: volume,
    embeddedEmissions,
    ukEtsPrice,
    grossLevy,
    overseasCredit,
    netLevy,
    accountingPeriod: input.accountingPeriod,
    steps,
  };
}
