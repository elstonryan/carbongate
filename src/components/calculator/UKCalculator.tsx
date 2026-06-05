"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Sparkles, Factory, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { calculateUK } from "@/lib/calculator/uk-calculator";
import {
  DEFAULT_FACTORS,
  MOCK_PRICES,
  ORIGIN_COUNTRIES,
  getFactor,
} from "@/lib/calculator/default-factors";
import { formatGBP, formatNumber } from "@/lib/utils";

// UK-in-scope sectors only (no electricity)
const UK_FACTORS = DEFAULT_FACTORS.filter(
  (f) => f.sector !== "electricity"
);

const ACCOUNTING_PERIODS = [
  "Jan 2027 – Dec 2027",
  "Jan 2028 – Dec 2028",
  "Jan 2029 – Dec 2029",
];

export function UKCalculator() {
  const [factorId, setFactorId] = useState("steel-bf-bof");
  const [volume, setVolume] = useState(10000);
  const [origin, setOrigin] = useState<string>("India");
  const [period, setPeriod] = useState(ACCOUNTING_PERIODS[0]);
  const [overseasPrice, setOverseasPrice] = useState(0);

  const factor = getFactor(factorId);

  const result = useMemo(
    () =>
      calculateUK({
        factorId,
        volumeTonnes: volume,
        countryOfOrigin: origin,
        ukEtsPrice: MOCK_PRICES.ukEtsPrice,
        overseasCarbonPrice: overseasPrice,
        accountingPeriod: period,
      }),
    [factorId, volume, origin, period, overseasPrice]
  );

  const creditPercent =
    result.grossLevy > 0
      ? (result.overseasCredit / result.grossLevy) * 100
      : 0;

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
      {/* Inputs */}
      <Card className="flex flex-col p-5">
        <div className="mb-4 flex items-center gap-2">
          <Factory className="h-4 w-4 text-secondary" />
          <h3 className="text-sm font-semibold">Import details</h3>
          <span className="ml-auto rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-medium text-secondary">
            Live from 1 Jan 2027
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="uk-product">Product / production route</Label>
            <Select value={factorId} onValueChange={setFactorId}>
              <SelectTrigger id="uk-product">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UK_FACTORS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground/70">
              Electricity is out of scope for UK CBAM
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>CN code</Label>
              <div className="flex h-10 items-center rounded-md border border-border bg-white/[0.03] px-3 font-mono text-sm text-muted-foreground">
                {factor?.cnCode ?? "—"}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="uk-volume">Volume (tonnes)</Label>
              <Input
                id="uk-volume"
                type="number"
                min={0}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="uk-origin">Country of origin</Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger id="uk-origin">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORIGIN_COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="uk-period">
              <Calendar className="mr-1 inline h-3.5 w-3.5" />
              Accounting period
            </Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="uk-period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNTING_PERIODS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="uk-overseas">
              Overseas carbon price paid (£/tCO₂e)
            </Label>
            <Input
              id="uk-overseas"
              type="number"
              min={0}
              step={1}
              value={overseasPrice}
              onChange={(e) => setOverseasPrice(Number(e.target.value) || 0)}
            />
            <p className="text-[11px] text-muted-foreground/70">
              Credit for carbon pricing already paid in country of origin (e.g.
              domestic ETS / levy). Set to 0 if none.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white/[0.02] p-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Intensity used</span>
              <span className="font-mono text-foreground">
                {formatNumber(result.intensityUsed)} tCO₂e/t
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span>UK ETS reference price</span>
              <span className="font-mono text-foreground">
                {formatGBP(MOCK_PRICES.ukEtsPrice)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="flex min-h-0 flex-col overflow-hidden p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Estimated UK levy</h3>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Deterministic engine · not AI
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-thin">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-3">
            <ResultTile
              label="Gross levy"
              value={
                <AnimatedCounter
                  value={result.grossLevy}
                  decimals={0}
                  prefix="£"
                />
              }
              sub={`${formatNumber(result.embeddedEmissions, 0)} tCO₂e embedded`}
              color="secondary"
            />
            <ResultTile
              label="Net levy payable"
              value={
                <AnimatedCounter
                  value={result.netLevy}
                  decimals={0}
                  prefix="£"
                />
              }
              sub="after overseas carbon credit"
              color="primary"
              highlight
            />
            <ResultTile
              label="Overseas credit"
              value={
                <AnimatedCounter
                  value={result.overseasCredit}
                  decimals={0}
                  prefix="£"
                />
              }
              sub={`${formatNumber(creditPercent, 1)}% offset of gross`}
              color="accent"
            />
            <ResultTile
              label="Intensity used"
              value={
                <AnimatedCounter
                  value={result.intensityUsed}
                  decimals={2}
                />
              }
              sub="tCO₂e/t (default values)"
              color="muted"
            />
          </div>

          {/* Info banner: how UK differs from EU */}
          <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-secondary/20 bg-secondary/5 p-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-xs text-muted-foreground">
              The UK CBAM is a{" "}
              <span className="font-medium text-secondary">direct levy</span>{" "}
              — no tradable certificates. The overseas carbon price credit
              rewards exporters from countries with existing carbon pricing
              (e.g. Turkish ETS, Indian CCTS). Unlike EU CBAM, there is no
              electricity in scope and no quarterly holding obligation.
            </p>
          </div>

          {/* Entry threshold reminder */}
          <AnimatePresence>
            {volume > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex items-start gap-2.5 rounded-lg border border-warning/20 bg-warning/5 p-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-warning">
                      Entry threshold:
                    </span>{" "}
                    UK CBAM applies if you import more than £50,000 of CBAM
                    goods over any rolling 12-month period. Confirm this
                    applies to your import programme before filing.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Methodology */}
          <div className="mt-4 rounded-lg border border-border bg-white/[0.02] px-4">
            <Accordion type="single" collapsible defaultValue="method">
              <AccordionItem value="method" className="border-none">
                <AccordionTrigger>How this levy was calculated</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2.5 pb-1">
                    {result.steps.map((step) => (
                      <div
                        key={step.label}
                        className="rounded-md border border-border bg-white/[0.02] p-2.5"
                      >
                        <p className="text-xs font-medium text-foreground">
                          {step.label}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                          {step.formula}
                        </p>
                        <p className="mt-1 font-mono text-xs text-secondary">
                          {step.value}
                        </p>
                      </div>
                    ))}
                    <p className="pt-1 text-[10px] text-muted-foreground/70">
                      HMRC UK CBAM — live from 1 Jan 2027. Indicative only;
                      verify HMRC guidance for the specific CN code before
                      relying on this for a return.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ResultTile({
  label,
  value,
  sub,
  highlight,
  color = "primary",
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  highlight?: boolean;
  color?: "primary" | "secondary" | "accent" | "muted";
}) {
  const colorMap = {
    primary: "border-primary/20 bg-primary/[0.06]",
    secondary: "border-secondary/20 bg-secondary/[0.06]",
    accent: "border-accent/20 bg-accent/[0.06]",
    muted: "border-border bg-white/[0.02]",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? colorMap[color] : "border-border bg-white/[0.02]"
      }`}
    >
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}
