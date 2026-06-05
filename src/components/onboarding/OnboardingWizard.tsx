"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Globe2,
  User,
  Upload,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  BarChart2,
  Truck,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEPS = [
  { id: 1, label: "Role", icon: User },
  { id: 2, label: "Regimes", icon: Globe2 },
  { id: 3, label: "Company", icon: Building2 },
  { id: 4, label: "Documents", icon: Upload },
  { id: 5, label: "Review", icon: CheckCircle2 },
];

const ROLES = [
  {
    id: "importer",
    label: "EU/UK Importer",
    desc: "I import CBAM goods into the EU or UK",
    icon: Truck,
    color: "primary",
  },
  {
    id: "exporter",
    label: "Non-EU Exporter",
    desc: "I export goods to the EU/UK market",
    icon: Globe2,
    color: "secondary",
  },
  {
    id: "verifier",
    label: "Accredited Verifier",
    desc: "I verify embedded emissions for CBAM",
    icon: ShieldCheck,
    color: "warning",
  },
  {
    id: "consultant",
    label: "Consultant / Advisor",
    desc: "I advise clients on CBAM compliance",
    icon: Briefcase,
    color: "accent",
  },
  {
    id: "broker",
    label: "Customs Broker",
    desc: "I handle customs & carbon border procedures",
    icon: FileCheck,
    color: "primary",
  },
  {
    id: "analyst",
    label: "ESG / Bank Analyst",
    desc: "I assess CBAM risk for lending or investment",
    icon: BarChart2,
    color: "secondary",
  },
];

const REGIMES = [
  { id: "EU", label: "EU CBAM", desc: "In force — definitive period from 1 Jan 2026", color: "primary" },
  { id: "UK", label: "UK CBAM", desc: "Live from 1 Jan 2027 — start readiness now", color: "secondary" },
  { id: "US", label: "USA (monitor)", desc: "Proposed — tracking PROVE IT Act / FPF Act", color: "warning" },
  { id: "IN", label: "India (exporter)", desc: "Key exporter market — affects deductions", color: "accent" },
  { id: "CA", label: "Canada (watch)", desc: "BCA under study", color: "muted" },
  { id: "AU", label: "Australia (watch)", desc: "Carbon Leakage Review ongoing", color: "muted" },
];

const COLOR_MAP: Record<string, string> = {
  primary: "border-primary/30 bg-primary/[0.06] text-primary",
  secondary: "border-secondary/30 bg-secondary/[0.06] text-secondary",
  warning: "border-warning/30 bg-warning/[0.06] text-warning",
  accent: "border-accent/30 bg-accent/[0.06] text-accent",
  muted: "border-border bg-white/[0.03] text-muted-foreground",
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir * 40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir * -40,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

interface FormState {
  role: string;
  regimes: string[];
  company: string;
  country: string;
  vatEori: string;
  docsUploaded: boolean;
}

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>({
    role: "",
    regimes: [],
    company: "",
    country: "",
    vatEori: "",
    docsUploaded: false,
  });

  function go(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  function toggleRegime(id: string) {
    setForm((f) => ({
      ...f,
      regimes: f.regimes.includes(id)
        ? f.regimes.filter((r) => r !== id)
        : [...f.regimes, id],
    }));
  }

  const canNext =
    (step === 1 && !!form.role) ||
    (step === 2 && form.regimes.length > 0) ||
    (step === 3 && !!form.company && !!form.country) ||
    step === 4 ||
    step === 5;

  return (
    <div className="flex h-full flex-col">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => done && go(s.id)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all",
                  done
                    ? "border-primary bg-primary text-background cursor-pointer"
                    : active
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-white/[0.03] text-muted-foreground"
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </button>
              <span
                className={cn(
                  "hidden text-xs sm:inline",
                  active ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 sm:w-12",
                    done ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full"
          >
            {step === 1 && (
              <div>
                <h2 className="mb-1 text-lg font-bold">What is your role?</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  This determines your regime access, forums, and features.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    const selected = form.role === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm((f) => ({ ...f, role: role.id }))}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                          selected
                            ? `${COLOR_MAP[role.color]} ring-1 ring-current/20`
                            : "border-border bg-white/[0.02] hover:border-white/15"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                            selected ? "border-current bg-current/10" : "border-border bg-white/5"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{role.label}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {role.desc}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-1 text-lg font-bold">Which regimes are you exposed to?</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Select all that apply. Your AI queries, forums and calculations
                  will be scoped to your selection.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {REGIMES.map((regime) => {
                    const selected = form.regimes.includes(regime.id);
                    return (
                      <motion.button
                        key={regime.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleRegime(regime.id)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                          selected
                            ? `${COLOR_MAP[regime.color]} ring-1 ring-current/20`
                            : "border-border bg-white/[0.02] hover:border-white/15"
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                            selected ? "border-current bg-current/20" : "border-border"
                          )}
                        >
                          {selected && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                        <div>
                          <p className="font-semibold">{regime.label}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {regime.desc}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-md">
                <h2 className="mb-1 text-lg font-bold">Company details</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Used for verification and company-level CBAM profiling.
                </p>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Company name</Label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Acme Steel Ltd"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Country of registration</Label>
                    <Input
                      value={form.country}
                      onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                      placeholder="Ireland"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>VAT / EORI number</Label>
                    <Input
                      value={form.vatEori}
                      onChange={(e) => setForm((f) => ({ ...f, vatEori: e.target.value }))}
                      placeholder="IE1234567A"
                    />
                    <p className="text-[11px] text-muted-foreground/60">
                      Required for EU CBAM declarant status verification
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="max-w-md">
                <h2 className="mb-1 text-lg font-bold">Upload verification documents</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Documents are stored securely (GDPR-compliant, EU-region). A reviewer
                  will check within 72 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setForm((f) => ({ ...f, docsUploaded: true }))}
                  className={cn(
                    "flex w-full flex-col items-center rounded-xl border-2 border-dashed p-10 text-center transition-all",
                    form.docsUploaded
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-white/[0.03]"
                  )}
                >
                  <Upload
                    className={cn(
                      "mb-3 h-10 w-10",
                      form.docsUploaded ? "text-primary" : "text-muted-foreground/40"
                    )}
                  />
                  {form.docsUploaded ? (
                    <>
                      <p className="font-medium text-primary">Documents uploaded</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Click to replace or add more
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-muted-foreground">
                        Click to upload or drag & drop
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/60">
                        Company registration · VAT certificate · Role evidence · PDF or JPG
                      </p>
                    </>
                  )}
                </motion.button>
                {form.docsUploaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground"
                  >
                    Documents are reviewed within 72 hours. GDPR-compliant
                    storage, EU-region, 5-year retention then deleted.
                  </motion.div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="max-w-md">
                <h2 className="mb-1 text-lg font-bold">Review your application</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Check everything is correct. We&apos;ll review within 72 hours and
                  email you at confirmation.
                </p>
                <div className="space-y-3 rounded-xl border border-border bg-white/[0.02] p-4">
                  {[
                    { label: "Role", value: ROLES.find((r) => r.id === form.role)?.label ?? "—" },
                    { label: "Regimes", value: form.regimes.join(", ") || "—" },
                    { label: "Company", value: form.company || "—" },
                    { label: "Country", value: form.country || "—" },
                    { label: "VAT / EORI", value: form.vatEori || "—" },
                    { label: "Documents", value: form.docsUploaded ? "Uploaded" : "Not uploaded" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={onComplete} className="mt-5 w-full" size="lg">
                  Submit application
                </Button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground/60">
                  No payment required at this stage — platform is in private beta
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < 5 && (
        <div className="mt-6 flex shrink-0 items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => go(step - 1)}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={() => go(step + 1)}
            disabled={!canNext}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
