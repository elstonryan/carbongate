import type { ChatSession } from "@/lib/types";

/**
 * 4 complete mock AI conversations modelling the non-hallucinating answer
 * pipeline: every claim is grounded in a citation, each answer carries a
 * confidence level and an "as of" date, and out-of-corpus questions are
 * REFUSED rather than guessed. This is the discipline the real engine enforces.
 */
export const CONVERSATIONS: ChatSession[] = [
  {
    id: "c1",
    title: "Quarterly obligations & the 80% rule",
    regime: "EU",
    updatedAt: "2026-06-05T08:40:00Z",
    messages: [
      {
        id: "c1m1",
        role: "user",
        content: "What are my quarterly obligations as an EU CBAM importer?",
      },
      {
        id: "c1m2",
        role: "assistant",
        content:
          "Under the EU CBAM, your principal quarterly obligation is the minimum certificate holding: at the end of each quarter you must hold CBAM certificates covering at least 80% of the cumulative embedded emissions of your imports through that quarter. This is a running, cumulative figure across all in-scope imports year-to-date — not a per-shipment test. Separately, you must already be registered as an Authorised CBAM Declarant before your first import, and the full surrender (100% of embedded emissions for the calendar year) is due annually by 31 May.",
        confidence: "high",
        asOfDate: "2026-05-20",
        keyPoints: [
          "Hold ≥80% of cumulative embedded emissions in certificates each quarter.",
          "The 80% test is cumulative year-to-date, not per shipment.",
          "Annual surrender of 100% is due by 31 May for the prior calendar year.",
        ],
        citations: [
          {
            ref: "Art. 22",
            docTitle: "EU Regulation 2023/956 — Establishing the CBAM",
            excerpt:
              "An authorised CBAM declarant shall ensure that the number of CBAM certificates on its account at the end of each quarter corresponds to at least 80% of the embedded emissions...",
            lastReviewed: "2026-05-20",
          },
          {
            ref: "Art. 4",
            docTitle: "EU Regulation 2023/956 — Establishing the CBAM",
            excerpt:
              "Goods shall be imported into the customs territory of the Union only by an authorised CBAM declarant.",
            lastReviewed: "2026-05-20",
          },
        ],
      },
      {
        id: "c1m3",
        role: "user",
        content: "And what happens if I hold too many certificates at year-end?",
      },
      {
        id: "c1m4",
        role: "assistant",
        content:
          "You can request to sell certificates back, but there is a hard cap: the Regulation limits re-purchase (sell-back) to a maximum of one third of the total certificates you held during the year. Anything held above that one-third limit cannot be sold back and becomes an unrecoverable cost. The practical consequence is to avoid over-buying — size purchases to your expected obligation plus a modest buffer, rather than buying a full year up front.",
        confidence: "high",
        asOfDate: "2026-05-25",
        keyPoints: [
          "Sell-back is capped at one third of certificates held during the year.",
          "Certificates above that cap are an unrecoverable cost.",
          "Avoid over-buying; size to expected obligation plus a small buffer.",
        ],
        citations: [
          {
            ref: "Art. 23",
            docTitle: "EU Regulation 2023/956 — Establishing the CBAM",
            excerpt:
              "On request... the Commission shall re-purchase the excess of CBAM certificates... The limit shall be one third of the total CBAM certificates purchased by the declarant during the previous year.",
            lastReviewed: "2026-05-25",
          },
          {
            ref: "Art. 23",
            docTitle: "CBAM Certificate Mechanics — Working Template",
            excerpt:
              "Sell-back cap: maximum one third of certificates held at year-end. Over-buying is unrecoverable.",
            lastReviewed: "2026-05-25",
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "Calculate EU certificate cost — steel",
    regime: "EU",
    updatedAt: "2026-06-04T15:10:00Z",
    messages: [
      {
        id: "c2m1",
        role: "user",
        content:
          "Calculate my EU certificate cost for 10,000 tonnes of BF-BOF steel using default values.",
      },
      {
        id: "c2m2",
        role: "assistant",
        content:
          "I've routed this to the deterministic calculation engine — I never compute carbon figures myself. Using the default BF-BOF steel intensity of 2.35 tCO₂e/t and the current EU ETS price of €65/t: embedded emissions = 2.35 × 10,000 = 23,500 tCO₂e, which equals 23,500 certificates. At €65/certificate that is €1,527,500 for the year. Your quarterly minimum holding (80%) would be 18,800 certificates. Note: BF-BOF defaults sit near the punitive 90th percentile — verified actuals (often ~2.0 tCO₂e/t for this route) could reduce this materially. Open the Calculator to model verified data and see the full methodology.",
        confidence: "high",
        asOfDate: "2026-06-04",
        keyPoints: [
          "Embedded emissions: 2.35 × 10,000 = 23,500 tCO₂e.",
          "Annual cost at €65/t: €1,527,500.",
          "Quarterly minimum holding (80%): 18,800 certificates.",
          "Verified actuals could lower this — defaults are deliberately punitive.",
        ],
        citations: [
          {
            ref: "Art. 21",
            docTitle: "EU ETS Price Methodology — How the Certificate Price Is Set",
            excerpt:
              "The price of CBAM certificates shall be calculated as the average of the closing prices of EU ETS allowances on the auction platform.",
            lastReviewed: "2026-05-08",
          },
          {
            ref: "Annex II",
            docTitle: "Steel Sector Guide — Embedded Emissions by Production Route",
            excerpt:
              "BF-BOF route default ~2.1–2.6 tCO₂e/t; defaults are set around the 90th percentile of intensity.",
            lastReviewed: "2026-05-22",
          },
        ],
      },
    ],
  },
  {
    id: "c3",
    title: "EU vs UK mechanism difference",
    regime: "ALL",
    updatedAt: "2026-06-03T12:00:00Z",
    messages: [
      {
        id: "c3m1",
        role: "user",
        content: "How does the UK CBAM differ from the EU CBAM?",
      },
      {
        id: "c3m2",
        role: "assistant",
        content:
          "The two regimes use fundamentally different mechanisms. The EU CBAM is a tradable-certificate scheme: you buy CBAM certificates priced at the weekly average EU ETS auction price, hold 80% each quarter, and surrender annually by 31 May. The UK CBAM (live from 1 January 2027) is instead a direct levy referencing the UK carbon price, with a credit for any overseas carbon price already paid — there are no certificates to trade. Scope also differs: the EU covers electricity, the UK does not. Entry thresholds differ too — the UK uses a GBP 50,000 rolling-12-month threshold of CBAM goods. Both currently cover steel, aluminium, cement, fertilizers and hydrogen.",
        confidence: "high",
        asOfDate: "2026-05-15",
        keyPoints: [
          "EU = tradable certificates; UK = direct levy (no certificates).",
          "UK credits overseas carbon price already paid; EU does not.",
          "EU covers electricity; UK does not.",
          "UK entry threshold: GBP 50,000 of CBAM goods over rolling 12 months.",
        ],
        citations: [
          {
            ref: "Art. 22",
            docTitle: "EU Regulation 2023/956 — Establishing the CBAM",
            excerpt:
              "Surrender of CBAM certificates equal to embedded emissions, annually by 31 May.",
            lastReviewed: "2026-05-20",
          },
          {
            ref: "HMRC §2",
            docTitle: "HMRC CBAM Guidance — UK Implementation",
            excerpt:
              "The UK CBAM is a levy on the embedded emissions in imported CBAM goods, referencing the UK carbon price, with credit for overseas carbon prices. Electricity is out of scope. Entry threshold GBP 50,000 over any 12-month period.",
            lastReviewed: "2026-05-15",
          },
        ],
      },
    ],
  },
  {
    id: "c4",
    title: "Out-of-scope question (refused)",
    regime: "EU",
    updatedAt: "2026-06-02T10:30:00Z",
    messages: [
      {
        id: "c4m1",
        role: "user",
        content:
          "What will the exact EU ETS price be on 31 December 2027, and what's the penalty rate under the proposed US Foreign Pollution Fee?",
      },
      {
        id: "c4m2",
        role: "assistant",
        content:
          "I can't answer either part reliably, so I won't guess. A future EU ETS price is a market forecast, not a fact in my regulatory corpus — I don't predict prices. And the US Foreign Pollution Fee is a legislative proposal with no enacted penalty mechanism, so there is no authoritative figure to cite. Guessing here would undermine the one thing this assistant is for. What I can do: give you the current EU ETS price and how it sets the certificate price, explain the EU shortfall penalty (3× the certificate price per tonne), or post your US question to the #policy community where analysts track the proposals. Would you like any of those?",
        confidence: "low",
        refused: true,
        asOfDate: "2026-06-02",
        keyPoints: [
          "Future ETS prices are forecasts, not corpus facts — not answered.",
          "The US Foreign Pollution Fee is a proposal with no enacted penalty — nothing authoritative to cite.",
          "Offered grounded alternatives instead of guessing.",
        ],
        citations: [],
      },
    ],
  },
];

/** Empty-state prompt suggestions shown before a conversation starts. */
export const PROMPT_SUGGESTIONS = [
  "What are my quarterly obligations as an EU importer?",
  "Calculate my EU certificate cost for steel imports",
  "How does the UK CBAM differ from the EU CBAM?",
  "What happens if I hold too many certificates at year-end?",
  "Which sectors are in scope for EU CBAM?",
  "How is the CBAM certificate price set?",
];
