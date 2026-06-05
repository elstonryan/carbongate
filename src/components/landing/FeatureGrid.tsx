"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Calculator,
  ShieldCheck,
  BookOpen,
  Bell,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "Non-hallucinating AI",
    body: "Answers grounded in a curated, citable corpus. 13-step pipeline with confidence gating, faithfulness checks and citation integrity. It refuses to guess.",
    color: "#10b981",
  },
  {
    icon: Calculator,
    title: "Deterministic calculator",
    body: "Every carbon figure comes from a tested engine — never an LLM. EU certificates, UK levy, default-vs-verified, with methodology shown.",
    color: "#3b82f6",
  },
  {
    icon: ShieldCheck,
    title: "Verified community",
    body: "A gated network of importers, exporters, verifiers, consultants and brokers. More verified pros means more value — the flywheel.",
    color: "#8b5cf6",
  },
  {
    icon: BookOpen,
    title: "Regulation library",
    body: "Primary-source documents, sector guides and templates — each carrying an 'as of' date and citations back to the regulation.",
    color: "#10b981",
  },
  {
    icon: Bell,
    title: "Live regulatory alerts",
    body: "Detect-review-publish monitoring on EUR-Lex, GOV.UK/HMRC and price feeds. Nothing reaches the corpus without expert review.",
    color: "#f59e0b",
  },
  {
    icon: Users,
    title: "Expert directory",
    body: "Accredited verifiers, consultants, customs brokers and law firms — filtered by regime, sector and accreditation.",
    color: "#3b82f6",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function FeatureGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.title}
            variants={card}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur-xl transition-colors hover:border-white/15"
          >
            <div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundColor: `${f.color}30` }}
            />
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${f.color}1f`, color: f.color }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {f.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {f.body}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
