"use client";

import { motion } from "framer-motion";
import type { Industry } from "@/lib/industries";

/**
 * Cinematic, sector-specific animated backdrop. Pure CSS/SVG — no images —
 * so each industry has a distinct living world: molten heat, liquid chrome,
 * mineral dust, field green, plasma, live current.
 */
export function IndustryBackground({
  industry,
  intensity = 1,
}: {
  industry: Industry;
  intensity?: number;
}) {
  const { id, world, accent } = industry;

  return (
    <div className={`world-bg ${world}`} aria-hidden>
      {/* Engineering grid */}
      <div className="absolute inset-0 blueprint opacity-[0.5]" />

      {/* Sector motif layer */}
      <div className="absolute inset-0" style={{ opacity: intensity }}>
        {id === "steel" && <SteelMotif accent={accent} />}
        {id === "aluminium" && <ChromeMotif accent={accent} />}
        {id === "cement" && <DustMotif accent={accent} />}
        {id === "fertilizers" && <FieldMotif accent={accent} />}
        {id === "hydrogen" && <PlasmaMotif accent={accent} />}
        {id === "electricity" && <CurrentMotif accent={accent} />}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
    </div>
  );
}

/* ---- Steel: rising embers + heat haze ---- */
function SteelMotif({ accent }: { accent: string }) {
  return (
    <>
      <div
        className="animate-haze absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: `radial-gradient(60% 100% at 50% 100%, ${accent}55, transparent 70%)`,
        }}
      />
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${(i * 5.5 + 4) % 100}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
          }}
          animate={{ y: [-0, -260], opacity: [0, 0.9, 0], scale: [1, 0.3] }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* ---- Aluminium: slow conic chrome sweep ---- */
function ChromeMotif({ accent }: { accent: string }) {
  return (
    <>
      <div
        className="animate-spin-slow absolute -right-1/4 -top-1/4 h-[120%] w-[80%] rounded-full opacity-30 blur-2xl"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${accent}88, transparent, ${accent}55, transparent)`,
        }}
      />
      <div className="absolute inset-0 blueprint-fine opacity-30" />
    </>
  );
}

/* ---- Cement: drifting mineral dust ---- */
function DustMotif({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 4.7) % 100}%`,
            top: `${(i * 7.3) % 100}%`,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            background: `${accent}aa`,
          }}
          animate={{ x: [0, 30, 0], y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8 + (i % 6), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </>
  );
}

/* ---- Fertilizers: organic contour lines ---- */
function FieldMotif({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.path
          key={i}
          d={`M -50 ${80 + i * 60} Q 360 ${20 + i * 60} 760 ${90 + i * 60} T 1600 ${60 + i * 60}`}
          fill="none"
          stroke={accent}
          strokeWidth={1.2}
          animate={{ pathLength: [0, 1], opacity: [0, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

/* ---- Hydrogen: electric plasma orbits ---- */
function PlasmaMotif({ accent }: { accent: string }) {
  return (
    <>
      <div
        className="animate-spin-slow absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full opacity-40 blur-xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/3 h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
          animate={{
            x: [0, Math.cos((i / 14) * Math.PI * 2) * 160, 0],
            y: [0, Math.sin((i / 14) * Math.PI * 2) * 120, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </>
  );
}

/* ---- Electricity: voltage current lines ---- */
function CurrentMotif({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.path
          key={i}
          d={`M ${-50 + i * 20} 0 L ${120 + i * 200} 220 L ${60 + i * 200} 360 L ${200 + i * 220} 600`}
          fill="none"
          stroke={accent}
          strokeWidth={1.4}
          strokeLinejoin="round"
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </svg>
  );
}
