"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TriangleAlert, Sparkles, Factory } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { calculateEU } from "@/lib/calculator/eu-calculator";
import {
  DEFAULT_FACTORS,
  MOCK_PRICES,
  ORIGIN_COUNTRIES,
  getFactor,
} from "@/lib/calculator/default-factors";
import { formatEUR, formatNumber } from "@/lib/utils";

export function EUCalculator() {
  const [factorId, setFactorId] = useState("steel-bf-bof");
  const [volume, setVolume] = useState(10000);
  const [origin, setOrigin] = useState<string>("India");
  const [useVerified, setUseVerified] = useState(false);

  const factor = getFactor(factorId);

  const result = useMemo(
    () =>
      calculateEU({
        factorId,
        volumeTonnes: volume,
        countryOfOrigin: origin,
        useVerified,
        etsPrice: MOCK_PRICES.euEtsPrice,
      }),
    [factorId, volume, origin, useVerified]
  );

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
      {/* Inputs */}
      <Card className="flex flex-col p-5">
        <div className="mb-4 flex items-center gap-2">
          <Factory className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Import details</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="eu-product">Product / production route</Label>
            <Select value={factorId} onValueChange={setFactorId}>
              <SelectTrigger id="eu-product">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_FACTORS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>CN code</Label>
              <div className="flex h-10 items-center rounded-md border border-border bg-white/[0.03] px-3 font-mono text-sm text-muted-foreground">
                {factor?.cnCode ?? "—"}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eu-volume">Volume (tonnes)</Label>
              <Input
                id="eu-volume"
                type="number"
                min={0}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="eu-origin">Country of origin</Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger id="eu-origin">
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

          <div className="flex items-center justify-between rounded-lg border border-border bg-white/[0.03] p-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                Use verified data
              </p>
              <p className="text-xs text-muted-foreground">
                Else punitive defaults apply
              </p>
            </div>
            <Switch checked={useVerified} onCheckedChange={setUseVerified} />
          </div>

          <div className="rounded-lg border border-border bg-white/[0.02] p-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Intensity used</span>
              <span className="font-mono text-foreground">
                {formatNumber(result.intensityUsed)} tCO₂e/t
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span>EU ETS price</span>
              <span className="font-mono text-foreground">
                {formatEUR(MOCK_PRICES.euEtsPrice)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="flex min-h-0 flex-col overflow-hidden p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Estimated obligation</h3>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Deterministic engine · not AI
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-thin">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-3">
            <ResultTile
              label="Certificates required"
              value={
                <AnimatedCounter
                  value={result.certificatesRequired}
                  decimals={0}
                />
              }
              sub={`${formatNumber(result.embeddedEmissions, 0)} tCO₂e embedded`}
              highlight
            />
            <ResultTile
              label="Annual cost"
              value={
                <AnimatedCounter
                  value={result.totalCost}
                  decimals={0}
                  prefix="€"
                />
              }
              sub={`at ${formatEUR(result.etsPrice)}/certificate`}
              highlight
            />
            <ResultTile
              label="Quarterly minimum (80%)"
              value={
                <AnimatedCounter
                  value={result.quarterlyMinPurchase}
                  decimals={0}
                />
              }
              sub={`${formatEUR(result.quarterlyMinCost)} to hold`}
            />
            <ResultTile
              label="Sell-back cap (⅓)"
              value={
                <AnimatedCounter
                  value={result.sellBackCapCertificates}
                  decimals={0}
                />
              }
              sub="max sellable certificates"
            />
          </div>

          {/* Sell-back warning */}
          <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-warning/20 bg-warning/5 p-3">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <p className="text-xs text-muted-foreground">
              You can sell back at most{" "}
              <span className="font-medium text-warning">
                {formatNumber(result.sellBackCapCertificates, 0)} certificates
              </span>{" "}
              (one third of holdings). Over-buying beyond your obligation is an
              unrecoverable cost — size purchases carefully.
            </p>
          </div>

          {/* Savings vs default */}
          <AnimatePresence>
            {useVerified && result.savingVsDefault > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    Verified data saves{" "}
                    <span className="font-semibold text-primary">
                      {formatEUR(result.savingVsDefault)}
                    </span>{" "}
                    vs defaults ({formatNumber(result.savingPercent, 1)}% lower).
                    This is the importer&apos;s hook for funding verification.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Methodology */}
          <div className="mt-4 rounded-lg border border-border bg-white/[0.02] px-4">
            <Accordion type="single" collapsible defaultValue="method">
              <AccordionItem value="method" className="border-none">
                <AccordionTrigger>How this number was calculated</AccordionTrigger>
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
                        <p className="mt-1 font-mono text-xs text-primary">
                          {step.value}
                        </p>
                      </div>
                    ))}
                    <p className="pt-1 text-[10px] text-muted-foreground/70">
                      Default factors are indicative (CBAM reference, v2026.1).
                      Source the EU-published value for the specific CN code and
                      origin before relying on this for a filing.
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
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-primary/20 bg-primary/[0.06]"
          : "border-border bg-white/[0.02]"
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
