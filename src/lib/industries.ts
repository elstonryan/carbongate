/**
 * Industry intelligence — the data behind the immersive sector pages.
 *
 * Figures are INDICATIVE and illustrative for this demo build, drawn from the
 * platform's knowledge base and well-established public ranges. Production
 * shares and intensities move over time — always verify against primary
 * sources (worldsteel, IAI, EU default-value tables, etc.) before relying on
 * them. This mirrors the product's own discipline: no number without a caveat.
 */

export type IndustryId =
  | "steel"
  | "aluminium"
  | "cement"
  | "fertilizers"
  | "hydrogen"
  | "electricity";

export interface Producer {
  country: string;
  share: number; // % of world output (indicative)
}
export interface ProductionRoute {
  name: string;
  intensity: number; // tCO2e/t (default, indicative)
  note: string;
}
export interface EmissionSource {
  label: string;
  pct: number;
}
export interface IndustryStat {
  label: string;
  value: string;
  sub?: string;
}
export interface IndustryTrend {
  tag: "Policy" | "Market" | "Technology" | "Trade";
  title: string;
  body: string;
  date: string;
}

export interface Industry {
  id: IndustryId;
  name: string;
  tagline: string;
  /** matches the .world-<id> css class */
  world: string;
  icon: string; // lucide name
  accent: string; // hex
  cn: string;
  inEU: boolean;
  inUK: boolean;
  defaultIntensity: { low: number; high: number; unit: string };
  verifiedTypical: { low: number; high: number };
  blurb: string;
  whatItIs: string;
  whyItMatters: string;
  keyStats: IndustryStat[];
  producers: Producer[];
  routes: ProductionRoute[];
  emissionSources: EmissionSource[];
  norms: string[];
  trends: IndustryTrend[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "steel",
    name: "Iron & Steel",
    tagline: "The backbone of industry — and CBAM's largest sector by volume.",
    world: "world-steel",
    icon: "Factory",
    accent: "#ff5a1f",
    cn: "CN 72–73",
    inEU: true,
    inUK: true,
    defaultIntensity: { low: 2.1, high: 2.6, unit: "tCO₂e / t" },
    verifiedTypical: { low: 1.0, high: 2.2 },
    blurb:
      "Steel is the single biggest CBAM exposure for most EU importers. The production route — and the data behind it — decides whether you pay near the punitive default or far below it.",
    whatItIs:
      "Iron and steel covers everything from crude iron and semi-finished slabs to finished coil, bar, tube and structural sections. Embedded emissions hinge almost entirely on the production route and the energy mix behind it.",
    whyItMatters:
      "Because volumes are huge and intensities are high, a single steel import programme can carry six- or seven-figure annual CBAM exposure. The gap between default and verified values is the largest of any sector — which makes accurate data the highest-value lever an importer has.",
    keyStats: [
      { label: "World crude steel", value: "~1.9 Gt", sub: "produced per year (indicative)" },
      { label: "Share of global CO₂", value: "~7–9%", sub: "from iron & steel making" },
      { label: "Default vs verified gap", value: "up to ~55%", sub: "for cleaner routes" },
      { label: "CBAM rank", value: "#1", sub: "by EU import value in scope" },
    ],
    producers: [
      { country: "China", share: 54 },
      { country: "India", share: 7 },
      { country: "Japan", share: 4 },
      { country: "United States", share: 4 },
      { country: "Russia", share: 4 },
      { country: "Rest of world", share: 27 },
    ],
    routes: [
      { name: "BF-BOF (blast furnace)", intensity: 2.35, note: "Coal-based, highest intensity" },
      { name: "DRI-EAF (gas)", intensity: 2.05, note: "Lower, route-dependent" },
      { name: "Scrap-EAF", intensity: 1.15, note: "Cleanest mainstream route" },
    ],
    emissionSources: [
      { label: "Coke & coal (reduction)", pct: 62 },
      { label: "Process & flux", pct: 18 },
      { label: "Electricity (indirect)", pct: 14 },
      { label: "Other fuels", pct: 6 },
    ],
    norms: [
      "Installation-level monitoring (MRV) per production route, not company averages.",
      "Annual third-party verification under EN ISO 14065 to replace default values.",
      "Track precursor emissions (iron, pellets) through to the finished CN code.",
      "Separate scrap share explicitly — it is the biggest legitimate lever on intensity.",
    ],
    trends: [
      {
        tag: "Technology",
        title: "Hydrogen-DRI scales up",
        body: "Green-hydrogen direct reduction is moving from pilots to first commercial plants in the EU and Middle East, promising sub-0.5 tCO₂e/t steel.",
        date: "2026-05",
      },
      {
        tag: "Trade",
        title: "Verified actuals reshape EU sourcing",
        body: "EU buyers increasingly favour mills that can prove low verified intensities, as default values bite on the definitive period.",
        date: "2026-04",
      },
      {
        tag: "Policy",
        title: "Scrap definitions under review",
        body: "How scrap share is documented and credited is a live methodology discussion at Commission level.",
        date: "2026-03",
      },
    ],
  },
  {
    id: "aluminium",
    name: "Aluminium",
    tagline: "Electricity is the story — primary smelting lives or dies on its grid.",
    world: "world-aluminium",
    icon: "Layers",
    accent: "#38e1d6",
    cn: "CN 76",
    inEU: true,
    inUK: true,
    defaultIntensity: { low: 16, high: 18, unit: "tCO₂e / t" },
    verifiedTypical: { low: 4, high: 15 },
    blurb:
      "Primary aluminium is one of the most electricity-intensive materials on earth. Indirect (electricity) emissions dominate, so the grid behind the smelter is everything.",
    whatItIs:
      "Aluminium spans primary (unwrought) metal from electrolytic smelting and semi-finished products (bars, profiles, sheet). The Hall-Héroult smelting process consumes vast amounts of electricity.",
    whyItMatters:
      "Per tonne, aluminium carries the highest headline intensity of the CBAM sectors. Because most of it is indirect electricity, a smelter on hydro power can be a fraction of one on coal — verified grid data is decisive.",
    keyStats: [
      { label: "World primary output", value: "~70 Mt", sub: "per year (indicative)" },
      { label: "Electricity share", value: "~60–70%", sub: "of embedded emissions" },
      { label: "Hydro-powered smelters", value: "as low as ~4t", sub: "tCO₂e/t vs ~18 default" },
      { label: "Energy per tonne", value: "~14 MWh", sub: "for primary smelting" },
    ],
    producers: [
      { country: "China", share: 59 },
      { country: "India", share: 6 },
      { country: "Russia", share: 5 },
      { country: "Canada", share: 4 },
      { country: "UAE", share: 4 },
      { country: "Rest of world", share: 22 },
    ],
    routes: [
      { name: "Primary (coal grid)", intensity: 17, note: "Highest — coal electricity" },
      { name: "Primary (hydro grid)", intensity: 8.6, note: "Far lower indirect burden" },
      { name: "Recycled / secondary", intensity: 0.6, note: "~95% less energy than primary" },
    ],
    emissionSources: [
      { label: "Electricity (smelting)", pct: 64 },
      { label: "Anode (process CO₂)", pct: 16 },
      { label: "Alumina refining", pct: 14 },
      { label: "Other", pct: 6 },
    ],
    norms: [
      "Report the actual grid emission factor powering the smelter — not a national average.",
      "Separate primary vs recycled content; secondary aluminium is dramatically cleaner.",
      "Capture perfluorocarbon (PFC) anode-effect emissions in the MRV.",
      "Carry alumina (precursor) emissions through to the finished product.",
    ],
    trends: [
      {
        tag: "Market",
        title: "'Green aluminium' premium widens",
        body: "Low-carbon, hydro-backed metal commands a growing premium as EU buyers price in CBAM exposure.",
        date: "2026-05",
      },
      {
        tag: "Technology",
        title: "Inert anodes near commercialisation",
        body: "Anode technology that eliminates direct process CO₂ is advancing toward first commercial volumes.",
        date: "2026-04",
      },
      {
        tag: "Trade",
        title: "Origin-grid disclosure rises",
        body: "Smelters increasingly publish grid factors to defend lower verified intensities to EU customers.",
        date: "2026-02",
      },
    ],
  },
  {
    id: "cement",
    name: "Cement",
    tagline: "Unavoidable chemistry — calcination is the emission you can't fuel-switch away.",
    world: "world-cement",
    icon: "Building2",
    accent: "#f0a93b",
    cn: "CN 2523",
    inEU: true,
    inUK: true,
    defaultIntensity: { low: 0.6, high: 0.9, unit: "tCO₂e / t" },
    verifiedTypical: { low: 0.5, high: 0.8 },
    blurb:
      "Roughly two-thirds of cement's footprint is process CO₂ from turning limestone into clinker — chemistry, not combustion. That makes clinker ratio the master lever.",
    whatItIs:
      "Cement is produced by heating limestone to make clinker, then grinding it with additives. The calcination reaction releases CO₂ intrinsically, on top of the fuel burned to heat the kiln.",
    whyItMatters:
      "Because the process emission is chemical, you cannot simply switch fuels to escape it — you reduce it by lowering the clinker-to-cement ratio and capturing carbon. CBAM tracks this at installation level, and clinker is the hotspot.",
    keyStats: [
      { label: "World cement", value: "~4.1 Gt", sub: "per year (indicative)" },
      { label: "Share of global CO₂", value: "~7–8%", sub: "from cement & clinker" },
      { label: "Process (calcination)", value: "~60%", sub: "of cement emissions" },
      { label: "Trade intensity", value: "Low", sub: "heavy, mostly regional" },
    ],
    producers: [
      { country: "China", share: 51 },
      { country: "India", share: 9 },
      { country: "Vietnam", share: 3 },
      { country: "United States", share: 2 },
      { country: "Turkey", share: 2 },
      { country: "Rest of world", share: 33 },
    ],
    routes: [
      { name: "Ordinary Portland clinker", intensity: 0.87, note: "High clinker ratio" },
      { name: "Blended cement", intensity: 0.62, note: "Lower clinker, SCMs added" },
      { name: "With CCS (emerging)", intensity: 0.25, note: "Capture on the kiln stack" },
    ],
    emissionSources: [
      { label: "Calcination (process)", pct: 60 },
      { label: "Kiln fuel", pct: 30 },
      { label: "Electricity", pct: 7 },
      { label: "Transport", pct: 3 },
    ],
    norms: [
      "Report clinker-to-cement ratio explicitly — it is the dominant intensity driver.",
      "Account for process (calcination) CO₂ separately from fuel combustion.",
      "Credit supplementary cementitious materials (slag, fly ash, pozzolans).",
      "Installation-level kiln data, verified annually, to move off defaults.",
    ],
    trends: [
      {
        tag: "Technology",
        title: "Kiln carbon capture pilots multiply",
        body: "Cement is a prime CCS candidate because the process CO₂ is concentrated and unavoidable; EU pilots are scaling.",
        date: "2026-05",
      },
      {
        tag: "Policy",
        title: "Clinker-substitute standards evolve",
        body: "Standards permitting higher SCM blends are advancing, directly lowering embedded intensity.",
        date: "2026-03",
      },
      {
        tag: "Market",
        title: "Regional trade shields some flows",
        body: "Cement's weight keeps trade regional, concentrating CBAM exposure on nearer exporters.",
        date: "2026-02",
      },
    ],
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    tagline: "Ammonia and nitric acid — where N₂O and feedstock carbon decide the number.",
    world: "world-fertilizers",
    icon: "Sprout",
    accent: "#4ade80",
    cn: "CN 28 / 31",
    inEU: true,
    inUK: true,
    defaultIntensity: { low: 2.0, high: 2.8, unit: "tCO₂e / t" },
    verifiedTypical: { low: 1.5, high: 2.2 },
    blurb:
      "Fertilizer emissions trace back to ammonia (its hydrogen feedstock) and nitric-acid N₂O. Abatement technology on the acid plant can swing the result sharply.",
    whatItIs:
      "The sector covers nitrogen fertilizers (urea, ammonium nitrate, UAN) and their precursors — ammonia and nitric acid. Ammonia synthesis needs hydrogen, today mostly from natural gas; nitric acid production emits N₂O, a potent greenhouse gas.",
    whyItMatters:
      "Two big levers dominate: how the hydrogen for ammonia is made, and whether the nitric-acid plant has N₂O abatement. CBAM carries precursor (ammonia) emissions into the finished fertilizer, so upstream data matters.",
    keyStats: [
      { label: "World ammonia", value: "~185 Mt", sub: "per year (indicative)" },
      { label: "N₂O potency", value: "~265×", sub: "CO₂ over 100 years" },
      { label: "Hydrogen feedstock", value: "~90%", sub: "from natural gas today" },
      { label: "Abatement swing", value: "Large", sub: "N₂O catalysts cut sharply" },
    ],
    producers: [
      { country: "China", share: 28 },
      { country: "India", share: 12 },
      { country: "Russia", share: 9 },
      { country: "United States", share: 9 },
      { country: "Middle East", share: 11 },
      { country: "Rest of world", share: 31 },
    ],
    routes: [
      { name: "Urea (gas-based NH₃)", intensity: 2.4, note: "Grey hydrogen feedstock" },
      { name: "Ammonium nitrate", intensity: 2.6, note: "N₂O-dependent" },
      { name: "Green-ammonia route", intensity: 0.8, note: "Electrolytic hydrogen" },
    ],
    emissionSources: [
      { label: "Ammonia feedstock (H₂)", pct: 55 },
      { label: "N₂O (nitric acid)", pct: 28 },
      { label: "Energy", pct: 12 },
      { label: "Other", pct: 5 },
    ],
    norms: [
      "Carry ammonia precursor emissions through to the finished fertilizer CN code.",
      "Document N₂O abatement on nitric-acid plants — a decisive, verifiable lever.",
      "Distinguish grey vs low-carbon hydrogen feedstock for ammonia.",
      "Verified plant-level data to escape punitive default values.",
    ],
    trends: [
      {
        tag: "Technology",
        title: "Green ammonia projects accelerate",
        body: "Electrolytic-hydrogen ammonia is a flagship decarbonisation route, with major projects under construction.",
        date: "2026-05",
      },
      {
        tag: "Policy",
        title: "N₂O abatement expectations rise",
        body: "Secondary/tertiary N₂O catalysts are becoming the de-facto baseline for credible low intensities.",
        date: "2026-04",
      },
      {
        tag: "Trade",
        title: "Gas prices drive sourcing shifts",
        body: "Volatile gas costs continue to reshape where ammonia and urea are economically produced.",
        date: "2026-02",
      },
    ],
  },
  {
    id: "hydrogen",
    name: "Hydrogen",
    tagline: "Grey, blue or green — the production path is the entire footprint.",
    world: "world-hydrogen",
    icon: "FlaskConical",
    accent: "#a78bfa",
    cn: "CN 2804",
    inEU: true,
    inUK: true,
    defaultIntensity: { low: 8, high: 10, unit: "tCO₂e / t" },
    verifiedTypical: { low: 0.5, high: 9 },
    blurb:
      "Hydrogen has almost no intrinsic footprint — it's all about how it's made. Grey (gas) versus green (electrolysis) spans nearly the whole emissions range.",
    whatItIs:
      "Hydrogen is produced mainly by steam methane reforming of natural gas (grey), optionally with carbon capture (blue), or by electrolysis of water powered by electricity (green). It is both a CBAM good and a precursor to ammonia and low-carbon steel.",
    whyItMatters:
      "As a feedstock for fertilizers and emerging clean steel, hydrogen's intensity ripples downstream. Under CBAM, proving a green or blue route — with verified power or capture data — is what separates a low number from the default.",
    keyStats: [
      { label: "World H₂ demand", value: "~95 Mt", sub: "per year (indicative)" },
      { label: "Grey share today", value: "~95%", sub: "fossil-based production" },
      { label: "Green vs grey", value: "~0.5 vs ~10", sub: "tCO₂e/t (route-dependent)" },
      { label: "Role", value: "Feedstock", sub: "to steel & fertilizers" },
    ],
    producers: [
      { country: "China", share: 33 },
      { country: "United States", share: 14 },
      { country: "Middle East", share: 12 },
      { country: "India", share: 9 },
      { country: "Europe", share: 8 },
      { country: "Rest of world", share: 24 },
    ],
    routes: [
      { name: "Grey (SMR, no capture)", intensity: 10, note: "Fossil gas, highest" },
      { name: "Blue (SMR + CCS)", intensity: 3.5, note: "Capture-dependent" },
      { name: "Green (electrolysis)", intensity: 0.5, note: "Renewable-powered" },
    ],
    emissionSources: [
      { label: "Natural gas reforming", pct: 70 },
      { label: "Process energy", pct: 18 },
      { label: "Electricity", pct: 9 },
      { label: "Other", pct: 3 },
    ],
    norms: [
      "Declare the production route (grey/blue/green) with verifiable evidence.",
      "For green hydrogen, prove the power source and its emission factor.",
      "For blue hydrogen, document capture rate and permanence.",
      "Propagate hydrogen intensity into downstream ammonia and steel claims.",
    ],
    trends: [
      {
        tag: "Policy",
        title: "Low-carbon hydrogen definitions firm up",
        body: "Thresholds for what counts as 'low-carbon' or 'renewable' hydrogen are converging across the EU and UK.",
        date: "2026-05",
      },
      {
        tag: "Technology",
        title: "Electrolyser costs keep falling",
        body: "Scaling manufacturing continues to bring down the cost of green-hydrogen capacity.",
        date: "2026-04",
      },
      {
        tag: "Market",
        title: "Offtake contracts mature",
        body: "Long-term green-hydrogen offtake deals are emerging around steel and ammonia hubs.",
        date: "2026-03",
      },
    ],
  },
  {
    id: "electricity",
    name: "Electricity",
    tagline: "Priced on the grid factor of the exporting country — EU CBAM only.",
    world: "world-electricity",
    icon: "Zap",
    accent: "#facc15",
    cn: "CN 2716",
    inEU: true,
    inUK: false,
    defaultIntensity: { low: 0.3, high: 0.9, unit: "tCO₂e / MWh" },
    verifiedTypical: { low: 0.0, high: 0.5 },
    blurb:
      "Imported electricity is charged on the carbon intensity of the exporting country's grid. It is in scope for EU CBAM but not the UK — a key cross-regime difference.",
    whatItIs:
      "Cross-border electricity imports are assessed on the emission factor of the source grid (or default values where actuals aren't available). Intensity ranges from near-zero (hydro/nuclear/renewables) to high (coal-dominated grids).",
    whyItMatters:
      "Electricity is the clearest example of why regime scope matters: it's a CBAM good in the EU but excluded in the UK. For interconnected markets, the source grid's mix can swing the obligation from negligible to significant.",
    keyStats: [
      { label: "EU scope", value: "Included", sub: "CN 2716" },
      { label: "UK scope", value: "Excluded", sub: "not a UK CBAM good" },
      { label: "Grid range", value: "~0 – 0.9", sub: "tCO₂e/MWh by country" },
      { label: "Basis", value: "Source grid", sub: "factor or default" },
    ],
    producers: [
      { country: "Hydro/nuclear grids", share: 30 },
      { country: "Gas-heavy grids", share: 28 },
      { country: "Coal-heavy grids", share: 25 },
      { country: "Mixed/renewable", share: 17 },
    ],
    routes: [
      { name: "Coal-dominated grid", intensity: 0.85, note: "Highest intensity import" },
      { name: "Gas-dominated grid", intensity: 0.45, note: "Mid-range" },
      { name: "Hydro / nuclear grid", intensity: 0.05, note: "Near-zero" },
    ],
    emissionSources: [
      { label: "Fossil generation", pct: 78 },
      { label: "Grid losses", pct: 12 },
      { label: "Other", pct: 10 },
    ],
    norms: [
      "Use the exporting country's actual grid emission factor where evidenced.",
      "Recognise EU-only scope — electricity is not a UK CBAM good.",
      "Account for interconnector flows and origin transparently.",
      "Default values apply where source-grid actuals can't be substantiated.",
    ],
    trends: [
      {
        tag: "Policy",
        title: "EU-only scope stays a key difference",
        body: "Electricity remains in EU CBAM but out of UK CBAM — a structural cross-regime distinction to watch.",
        date: "2026-05",
      },
      {
        tag: "Market",
        title: "Interconnector flows under scrutiny",
        body: "How imported power's origin and intensity are evidenced is an evolving area for border carbon pricing.",
        date: "2026-03",
      },
      {
        tag: "Technology",
        title: "Renewables reshape grid factors",
        body: "Rapid renewable build-out is steadily lowering several exporting grids' emission factors.",
        date: "2026-02",
      },
    ],
  },
];

export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
