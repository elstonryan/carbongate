import type { RegDocument } from "@/lib/types";

/**
 * 15 mock regulatory documents for the library. Citations reference real
 * instruments (EU Reg 2023/956 etc.). "Last reviewed" dates are illustrative.
 */
export const DOCUMENTS: RegDocument[] = [
  {
    id: "d1",
    title: "EU Regulation 2023/956 — Establishing the CBAM",
    regime: "EU",
    docType: "regulation",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen", "electricity"],
    lastReviewed: "2026-05-20",
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2023/956",
    summary:
      "The establishing regulation: legal basis, scope, the Authorised CBAM Declarant obligation, certificate surrender, and the definitive-period framework that went live for financial obligations on 1 January 2026.",
    keyPoints: [
      "Importers must register as Authorised CBAM Declarants before first import.",
      "Annual surrender of certificates equal to embedded emissions in imports.",
      "Certificate price = weekly average EU ETS auction clearing price.",
      "Covers iron & steel, aluminium, cement, fertilizers, hydrogen and electricity.",
    ],
    citations: [
      { ref: "Art. 4", text: "Obligation to be an authorised CBAM declarant." },
      { ref: "Art. 22", text: "Surrender of CBAM certificates by 31 May each year." },
    ],
    status: "live",
  },
  {
    id: "d2",
    title: "EU Implementing Regulation 2023/1773 — Transitional Reporting",
    regime: "EU",
    docType: "regulation",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen", "electricity"],
    lastReviewed: "2026-04-18",
    sourceUrl: "https://eur-lex.europa.eu/eli/reg_impl/2023/1773",
    summary:
      "Sets the transitional-period reporting rules and data formats — the quarterly report structure and the methodology for determining embedded emissions during the run-up to the definitive period.",
    keyPoints: [
      "Defines quarterly CBAM report content and submission mechanics.",
      "Specifies data needed to determine direct and indirect embedded emissions.",
      "Allows use of default values where actual data is unavailable.",
    ],
    citations: [
      { ref: "Annex III", text: "Methods for determining embedded emissions." },
      { ref: "Annex I", text: "Information to be reported in the CBAM report." },
    ],
    status: "live",
  },
  {
    id: "d3",
    title: "EU Regulation 2024/1787 — Definitive Period Methodology",
    regime: "EU",
    docType: "regulation",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-05-02",
    sourceUrl: "https://eur-lex.europa.eu",
    summary:
      "Definitive-period methodology and calculation rules, including the treatment of precursor goods and verified actual emissions versus default values.",
    keyPoints: [
      "Embedded emissions methodology for the definitive (financial) period.",
      "Treatment of precursor goods and their upstream embedded emissions.",
      "Conditions under which verified actual values replace defaults.",
    ],
    citations: [
      { ref: "Art. 7", text: "Calculation of embedded emissions of goods." },
    ],
    status: "live",
  },
  {
    id: "d4",
    title: "HMRC CBAM Guidance — UK Implementation",
    regime: "UK",
    docType: "guidance",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-05-15",
    sourceUrl: "https://www.gov.uk/guidance/uk-carbon-border-adjustment-mechanism",
    summary:
      "HMRC guidance on the UK CBAM, which goes live 1 January 2027. A direct levy referencing the UK carbon price with credit for any overseas carbon price already paid. Electricity is out of scope.",
    keyPoints: [
      "UK CBAM is a direct levy, not a tradable-certificate scheme.",
      "Entry threshold: GBP 50,000 of CBAM goods over any rolling 12 months.",
      "Credit available for overseas carbon price already paid.",
      "Scope excludes electricity (unlike the EU).",
    ],
    citations: [
      { ref: "HMRC §2", text: "Scope and entry threshold for UK CBAM." },
      { ref: "HMRC §5", text: "Credit for overseas carbon prices." },
    ],
    status: "live",
  },
  {
    id: "d5",
    title: "Steel Sector Guide — Embedded Emissions by Production Route",
    regime: "EU",
    docType: "sector-guide",
    sectors: ["steel"],
    lastReviewed: "2026-05-22",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Practical guide to steel embedded emissions across BF-BOF, DRI-EAF and scrap-EAF routes, including where the default-vs-verified saving is largest.",
    keyPoints: [
      "BF-BOF default ~2.1–2.6 tCO2e/t; scrap-EAF ~0.9–1.4.",
      "Scrap content is the single biggest lever on intensity.",
      "DRI-EAF and scrap-EAF routes include indirect electricity emissions.",
    ],
    citations: [
      { ref: "Annex II", text: "Sector-specific calculation boundaries for steel." },
    ],
    status: "live",
  },
  {
    id: "d6",
    title: "Aluminium Sector Guide — Direct + Indirect Emissions",
    regime: "EU",
    docType: "sector-guide",
    sectors: ["aluminium"],
    lastReviewed: "2026-05-10",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Guide to aluminium embedded emissions where the grid emission factor for electricity dominates the total. Primary aluminium default ~16–18 tCO2e/t.",
    keyPoints: [
      "Both direct and indirect (electricity) emissions are in scope.",
      "Primary aluminium default ~16–18 tCO2e/t; semi-finished lower.",
      "A genuinely low-carbon power supply materially reduces verified intensity.",
    ],
    citations: [
      { ref: "Annex II", text: "Indirect emissions inclusion for aluminium." },
    ],
    status: "live",
  },
  {
    id: "d7",
    title: "CBAM Certificate Mechanics — Working Template",
    regime: "EU",
    docType: "template",
    sectors: ["steel", "aluminium", "cement", "fertilizer"],
    lastReviewed: "2026-05-25",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "A working template covering certificate purchase, the 80% quarterly holding rule, and the one-third sell-back cap — built to avoid the over-buying trap.",
    keyPoints: [
      "Quarterly minimum holding: 80% of cumulative embedded emissions.",
      "Sell-back cap: max one third of certificates held at year-end.",
      "Annual surrender by 31 May for the prior calendar year.",
    ],
    citations: [
      { ref: "Art. 22", text: "Annual surrender obligation." },
      { ref: "Art. 23", text: "Limits on re-purchase of certificates." },
    ],
    status: "live",
  },
  {
    id: "d8",
    title: "Quarterly Declaration Template",
    regime: "EU",
    docType: "template",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-05-18",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Structured worksheet for preparing the quarterly CBAM declaration, including a running cumulative-emissions total to evidence the 80% holding check.",
    keyPoints: [
      "Tracks cumulative embedded emissions through each quarter.",
      "Flags the 80% minimum holding obligation automatically.",
      "Maps imports to CN codes and sectors.",
    ],
    citations: [
      { ref: "Annex I", text: "Quarterly report data fields." },
    ],
    status: "live",
  },
  {
    id: "d9",
    title: "Cement Sector Guide — Calcination Emissions",
    regime: "EU",
    docType: "sector-guide",
    sectors: ["cement"],
    lastReviewed: "2026-04-28",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Cement guide where process (calcination) emissions dominate the embedded total. Clinker is the key intensity driver (typically ~0.7–1.0 tCO2e/t).",
    keyPoints: [
      "Calcination process emissions are the dominant component.",
      "Clinker ratio drives the finished-product intensity.",
      "CN code 2523 is the in-scope classification.",
    ],
    citations: [
      { ref: "Annex II", text: "Process-emissions methodology for cement." },
    ],
    status: "live",
  },
  {
    id: "d10",
    title: "Fertilizers Sector Guide — N2O and Precursor Tracking",
    regime: "EU",
    docType: "sector-guide",
    sectors: ["fertilizer"],
    lastReviewed: "2026-05-05",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Fertilizer guide covering N2O emissions from nitric acid production and the requirement to track ammonia feedstock as a precursor good.",
    keyPoints: [
      "N2O from nitric acid production is a major emissions source.",
      "Ammonia feedstock must be tracked as a precursor good.",
      "Urea default ~2.0–2.8 tCO2e/t.",
    ],
    citations: [
      { ref: "Art. 7", text: "Inclusion of precursor embedded emissions." },
    ],
    status: "live",
  },
  {
    id: "d11",
    title: "Verification & Accreditation FAQ",
    regime: "EU",
    docType: "faq",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-05-12",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "FAQ on third-party verification: who can verify, the annual cycle, and what happens without verification (default values apply, which are punitive).",
    keyPoints: [
      "Verifiers must be accredited under EN ISO 14065 or EMAS.",
      "Verification is annual, covering the previous calendar year.",
      "Without verification, importers must use default values.",
    ],
    citations: [
      { ref: "Art. 8", text: "Verification of embedded emissions." },
    ],
    status: "live",
  },
  {
    id: "d12",
    title: "UK CBAM — Accounting Periods & Levy Mechanics (Staged)",
    regime: "UK",
    docType: "guidance",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-06-01",
    sourceUrl: "https://www.gov.uk/government/publications/uk-cbam",
    summary:
      "Staged guidance on UK CBAM accounting periods and how the levy references the UK carbon price. Currently staged pending final HMRC confirmation — not yet published to the live answer corpus.",
    keyPoints: [
      "Levy = embedded emissions × UK ETS reference price − overseas credit.",
      "Runs on accounting periods rather than a fixed 31 May annual date.",
      "Definitive ruleset still being finalised ahead of 1 Jan 2027.",
    ],
    citations: [
      { ref: "HMRC draft §3", text: "Accounting period definition (draft)." },
    ],
    status: "staged",
  },
  {
    id: "d13",
    title: "EU ETS Price Methodology — How the Certificate Price Is Set",
    regime: "EU",
    docType: "guidance",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen", "electricity"],
    lastReviewed: "2026-05-08",
    sourceUrl: "https://eur-lex.europa.eu",
    summary:
      "Explains that the CBAM certificate price equals the weekly average EU ETS allowance auction clearing price, and how that flows into the annual cost.",
    keyPoints: [
      "Certificate price = weekly average EU ETS auction clearing price.",
      "Has ranged roughly EUR 50–70 and has exceeded EUR 100.",
      "Price volatility plus the sell-back cap shapes purchasing strategy.",
    ],
    citations: [
      { ref: "Art. 21", text: "Determination of the CBAM certificate price." },
    ],
    status: "live",
  },
  {
    id: "d14",
    title: "Hydrogen Sector Guide — Production-Route Emissions",
    regime: "EU",
    docType: "sector-guide",
    sectors: ["hydrogen"],
    lastReviewed: "2026-04-30",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "Hydrogen guide covering direct emissions from the production process, with grey (SMR) hydrogen carrying materially higher intensity than low-carbon routes.",
    keyPoints: [
      "Direct process emissions are the focus for hydrogen.",
      "CN code 2804 10 is the in-scope classification.",
      "Production route is the dominant intensity driver.",
    ],
    citations: [
      { ref: "Annex II", text: "Hydrogen calculation boundary." },
    ],
    status: "live",
  },
  {
    id: "d15",
    title: "Importer Onboarding Checklist — From Registration to First Surrender",
    regime: "EU",
    docType: "template",
    sectors: ["steel", "aluminium", "cement", "fertilizer", "hydrogen"],
    lastReviewed: "2026-05-28",
    sourceUrl: "https://cbam.ec.europa.eu",
    summary:
      "A step-by-step checklist taking a new importer from Authorised CBAM Declarant registration through quarterly purchasing to the 31 May annual surrender.",
    keyPoints: [
      "Register as Authorised CBAM Declarant with the NCA first.",
      "Buy certificates and maintain the 80% quarterly holding.",
      "Surrender by 31 May; retain documentation for 5 years.",
    ],
    citations: [
      { ref: "Art. 4", text: "Authorised declarant requirement." },
      { ref: "Art. 22", text: "Annual surrender deadline." },
    ],
    status: "live",
  },
];
