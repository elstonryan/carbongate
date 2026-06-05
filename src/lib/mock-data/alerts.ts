import type { RegAlert } from "@/lib/types";

/**
 * 15 mock regulatory alerts (regime-tagged, urgency-graded). Reflects the
 * detect→review→publish discipline: every alert carries a date and a source.
 */
export const ALERTS: RegAlert[] = [
  {
    id: "a1",
    regime: "EU",
    type: "deadline_reminder",
    urgency: "critical",
    title: "31 May annual surrender deadline approaching",
    summary:
      "Authorised CBAM Declarants must surrender certificates equal to 2025 embedded emissions by 31 May 2026.",
    detail:
      "The annual surrender for the prior calendar year falls due on 31 May. Ensure your certificate holding matches total verified embedded emissions for the period. Shortfalls are penalised at 3× the certificate price per tonne, with potential criminal liability. Retain supporting documentation for 5 years.",
    date: "2026-06-05T07:00:00Z",
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2023/956",
  },
  {
    id: "a2",
    regime: "EU",
    type: "price_update",
    urgency: "high",
    title: "EU ETS price rises to €65.40/tCO₂e",
    summary:
      "The weekly average EU ETS auction clearing price — which sets the CBAM certificate price — moved up 2.4% this week.",
    detail:
      "CBAM certificate cost tracks the weekly average EU ETS allowance auction clearing price. At €65.40/t, a 10,000 t steel import at default BF-BOF intensity (~2.35 tCO₂e/t) carries roughly €1.54m in certificates. Given the one-third sell-back cap, avoid over-buying into price spikes.",
    date: "2026-06-04T16:30:00Z",
    sourceUrl: "https://www.sendeco2.com/uk/co2-price",
  },
  {
    id: "a3",
    regime: "UK",
    type: "regulatory_change",
    urgency: "high",
    title: "UK CBAM — HMRC publishes updated implementation guidance",
    summary:
      "Fresh HMRC guidance ahead of the 1 January 2027 UK CBAM go-live clarifies the levy mechanism and overseas-credit evidencing.",
    detail:
      "The UK CBAM is a direct levy referencing the UK carbon price, with credit for any overseas carbon price already paid. Electricity remains out of scope. The GBP 50,000 rolling-12-month entry threshold is confirmed. This update is staged for expert review before publication into the answer corpus.",
    date: "2026-06-03T11:15:00Z",
    sourceUrl: "https://www.gov.uk/guidance/uk-carbon-border-adjustment-mechanism",
  },
  {
    id: "a4",
    regime: "EU",
    type: "new_guidance",
    urgency: "medium",
    title: "Commission FAQ updated — precursor goods for fertilizers",
    summary:
      "New FAQ entries clarify how to track ammonia feedstock embedded emissions in urea production.",
    detail:
      "The updated Commission FAQ provides worked guidance on precursor-goods accounting for fertilizers, including N₂O from nitric acid and the upstream ammonia feedstock. Affected exporters should review their MRV boundaries. Pending expert review before corpus publication.",
    date: "2026-06-02T09:45:00Z",
    sourceUrl: "https://cbam.ec.europa.eu",
  },
  {
    id: "a5",
    regime: "EU",
    type: "deadline_reminder",
    urgency: "high",
    title: "Q2 2026 — 80% cumulative holding obligation",
    summary:
      "By the end of Q2, your certificate holding must cover at least 80% of cumulative embedded emissions through the quarter.",
    detail:
      "The quarterly minimum holding is 80% of cumulative embedded emissions. Use a running cumulative total across all in-scope imports year-to-date. Falling below the threshold can trigger compliance action even before the annual surrender.",
    date: "2026-06-01T08:00:00Z",
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2023/956",
  },
  {
    id: "a6",
    regime: "EU",
    type: "regulatory_change",
    urgency: "medium",
    title: "Omnibus simplification — mass-based de minimis still at proposal stage",
    summary:
      "A proposed ~50 t/yr mass-based exemption has not yet been confirmed in the Official Journal.",
    detail:
      "The EUR 150/consignment de minimis is established. A mass-based ~50 t/yr exemption was proposed under the Omnibus simplification package but should be treated as proposed until the consolidated text appears on EUR-Lex. Do not rely on it for compliance planning yet.",
    date: "2026-05-30T14:20:00Z",
    sourceUrl: "https://eur-lex.europa.eu",
  },
  {
    id: "a7",
    regime: "EU",
    type: "price_update",
    urgency: "medium",
    title: "EU ETS weekly average holds in the €60–66 band",
    summary:
      "Certificate-price-setting EU ETS auctions remained range-bound this week.",
    detail:
      "The weekly average EU ETS clearing price stayed within €60–66/t. Historically the price has ranged roughly €50–70 and has exceeded €100, so importers should stress-test budgets against higher scenarios.",
    date: "2026-05-29T16:00:00Z",
    sourceUrl: "https://www.sendeco2.com/uk/co2-price",
  },
  {
    id: "a8",
    regime: "UK",
    type: "deadline_reminder",
    urgency: "medium",
    title: "UK CBAM go-live: 1 January 2027 — 7 months out",
    summary:
      "Importers exceeding the GBP 50,000 rolling-12-month threshold should begin readiness now.",
    detail:
      "With UK CBAM live from 1 January 2027, importers should map in-scope CBAM goods, confirm whether they cross the GBP 50,000 rolling-12-month threshold, and assess overseas-carbon-price credits available against the UK levy.",
    date: "2026-05-28T10:00:00Z",
    sourceUrl: "https://www.gov.uk/guidance/uk-carbon-border-adjustment-mechanism",
  },
  {
    id: "a9",
    regime: "EU",
    type: "new_guidance",
    urgency: "low",
    title: "Updated steel sector guide published to library",
    summary:
      "Refreshed guidance on BF-BOF, DRI-EAF and scrap-EAF emissions boundaries is now live.",
    detail:
      "The steel sector guide has been reviewed and republished with clearer default-vs-verified ranges per production route. Scrap-EAF continues to show the largest verification saving (40–60%). Last reviewed 22 May 2026.",
    date: "2026-05-27T13:30:00Z",
    sourceUrl: "https://cbam.ec.europa.eu",
  },
  {
    id: "a10",
    regime: "EU",
    type: "regulatory_change",
    urgency: "high",
    title: "Definitive-period methodology — verified-actuals conditions clarified",
    summary:
      "Regulation 2024/1787 detail on when verified actual values may replace defaults has been re-read by our experts.",
    detail:
      "Guidance on the conditions for using verified actual emissions instead of default values has been clarified. Exporters need installation-level data and an EN ISO 14065 / EMAS accredited verifier's annual sign-off. Without it, punitive defaults (~90th percentile) apply.",
    date: "2026-05-26T09:00:00Z",
    sourceUrl: "https://eur-lex.europa.eu",
  },
  {
    id: "a11",
    regime: "US",
    type: "regulatory_change",
    urgency: "low",
    title: "US — Foreign Pollution Fee bill reintroduced (monitoring only)",
    summary:
      "A new draft carbon-border bill has been reintroduced; no financial mechanism is live.",
    detail:
      "US proposals (PROVE IT Act, Foreign Pollution Fee, Clean Competition Act) remain at the legislative-proposal stage with no live financial obligation. CarbonGate tracks these on a monitoring tier; nothing here changes current compliance requirements.",
    date: "2026-05-24T15:00:00Z",
    sourceUrl: "https://www.congress.gov",
  },
  {
    id: "a12",
    regime: "EU",
    type: "price_update",
    urgency: "medium",
    title: "Aluminium importers — indirect emissions sensitivity to ETS",
    summary:
      "With primary aluminium intensity ~16–18 tCO₂e/t, certificate cost is highly ETS-sensitive.",
    detail:
      "Because primary aluminium carries a high embedded intensity dominated by indirect electricity emissions, even small ETS price moves shift certificate cost materially. Evidence a genuinely low-carbon power supply to reduce verified indirect intensity.",
    date: "2026-05-22T11:00:00Z",
    sourceUrl: "https://www.sendeco2.com/uk/co2-price",
  },
  {
    id: "a13",
    regime: "EU",
    type: "deadline_reminder",
    urgency: "low",
    title: "Documentation retention — keep CBAM records for 5 years",
    summary:
      "A reminder that supporting documentation must be retained for five years.",
    detail:
      "All CBAM supporting documentation — emissions data, verification statements, certificate transactions — must be retained for 5 years. Build this into your records-management policy now to avoid gaps at audit.",
    date: "2026-05-20T08:30:00Z",
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2023/956",
  },
  {
    id: "a14",
    regime: "UK",
    type: "new_guidance",
    urgency: "low",
    title: "UK — overseas carbon price credit examples added",
    summary:
      "Worked examples illustrate how an overseas carbon price reduces the UK levy.",
    detail:
      "New examples show the UK levy calculation: gross levy (embedded emissions × UK ETS reference price) minus a credit for overseas carbon price already paid. Exporters from jurisdictions with a real ETS benefit most. Staged for review.",
    date: "2026-05-18T12:00:00Z",
    sourceUrl: "https://www.gov.uk/government/publications/uk-cbam",
  },
  {
    id: "a15",
    regime: "EU",
    type: "regulatory_change",
    urgency: "medium",
    title: "CN-code scope reminder — classification drives obligation",
    summary:
      "Re-confirming in-scope CN codes after minor TARIC updates.",
    detail:
      "The CN code determines whether goods are in scope and which rules apply. Validate codes against TARIC before import — misclassification cascades through the entire obligation. In-scope families include 72xx/73xx (steel), 76xx (aluminium), 2523 (cement), 28xx/31xx (fertilizers), 2804 10 (hydrogen) and 2716 (electricity).",
    date: "2026-05-16T10:30:00Z",
    sourceUrl: "https://ec.europa.eu/taxation_customs/dds2/taric",
  },
];
