"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Industry } from "@/lib/industries";

/**
 * Bespoke, layered industrial "scene" per sector — built in SVG so it stays
 * crisp, on-palette and dependency-free. Three depth layers parallax at
 * different rates as the hero scrolls, with sector-specific animated elements
 * (smoke, sparks, rotating kilns, current). Tuned for the EC-institutional
 * light theme: navy silhouettes, a soft sky wash, and a restrained sector glow.
 */
export function IndustryScene({ industry }: { industry: Industry }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax depths (disabled when reduced-motion is requested)
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -210]);
  const skyOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  const accent = industry.accent;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Sky wash */}
      <motion.div
        style={{ opacity: skyOpacity }}
        className={`absolute inset-0 ${industry.world}`}
      />
      <div className="absolute inset-0 blueprint opacity-40" />

      {/* Soft sector glow */}
      <div
        className="absolute -top-24 right-[8%] h-[34rem] w-[34rem] rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${accent}22, transparent 70%)` }}
      />

      {/* Layer: far structures */}
      <motion.svg
        style={{ y: yBack }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <SceneBack industry={industry} />
      </motion.svg>

      {/* Layer: mid structures */}
      <motion.svg
        style={{ y: yMid }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <SceneMid industry={industry} />
      </motion.svg>

      {/* Layer: foreground */}
      <motion.svg
        style={{ y: yFront }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <SceneFront industry={industry} />
      </motion.svg>

      {/* Legibility fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/80" />
    </div>
  );
}

/* Institutional palette */
const NAVY = "#13284b";
const NAVY_2 = "#1f3a64";
const BLUE = "#004494";

/* ============================ FAR LAYER ============================ */
function SceneBack({ industry }: { industry: Industry }) {
  const a = industry.accent;
  switch (industry.id) {
    case "steel":
      return (
        <g opacity={0.16} fill={NAVY}>
          <rect x="120" y="430" width="60" height="470" />
          <rect x="210" y="370" width="44" height="530" />
          <rect x="980" y="410" width="70" height="490" />
          <rect x="1100" y="350" width="40" height="550" />
          <Smoke x={150} y={430} accent={a} />
          <Smoke x={1000} y={410} accent={a} delay={1.2} />
        </g>
      );
    case "aluminium":
      return (
        <g opacity={0.15} fill={NAVY}>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={120 + i * 180} y={460} width={120} height={440} rx={4} />
          ))}
        </g>
      );
    case "cement":
      return (
        <g opacity={0.16} fill={NAVY}>
          <rect x="160" y="380" width="90" height="520" />
          <rect x="280" y="340" width="90" height="560" />
          <rect x="1040" y="420" width="120" height="480" />
          <Smoke x={205} y={380} accent={a} />
        </g>
      );
    case "fertilizers":
      return (
        <g opacity={0.15} fill={NAVY}>
          <rect x="150" y="430" width="46" height="470" />
          <rect x="210" y="400" width="46" height="500" />
          <rect x="1060" y="440" width="120" height="460" rx={60} />
          <Smoke x={173} y={430} accent={a} />
        </g>
      );
    case "hydrogen":
      return (
        <g opacity={0.15} fill={NAVY}>
          <circle cx="240" cy="640" r="120" />
          <circle cx="1180" cy="660" r="100" />
          <rect x="600" y="470" width="240" height="430" rx={10} />
        </g>
      );
    case "electricity":
      return (
        <g opacity={0.14} stroke={NAVY} strokeWidth={3} fill="none">
          <Pylon x={180} scale={0.8} />
          <Pylon x={1180} scale={0.8} />
          <path d="M 220 470 C 500 540, 900 540, 1180 470" opacity={0.5} />
          <path d="M 220 510 C 500 590, 900 590, 1180 510" opacity={0.5} />
        </g>
      );
    default:
      return null;
  }
}

/* ============================ MID LAYER ============================ */
function SceneMid({ industry }: { industry: Industry }) {
  const a = industry.accent;
  switch (industry.id) {
    case "steel":
      return (
        <g>
          <g opacity={0.26} fill={NAVY_2}>
            <path d="M 420 900 L 420 520 L 470 480 L 560 480 L 610 520 L 610 900 Z" />
            <rect x="700" y="430" width="80" height="470" />
            <rect x="800" y="500" width="40" height="400" />
          </g>
          {/* molten base glow */}
          <motion.ellipse
            cx="515" cy="850" rx="170" ry="46" fill={a} opacity={0.18}
            animate={{ opacity: [0.12, 0.26, 0.12] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </g>
      );
    case "aluminium":
      return (
        <g opacity={0.24} fill={NAVY_2}>
          <rect x="300" y="560" width="840" height="60" rx={6} />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={320 + i * 95} y={520} width={56} height={100} rx={4} />
          ))}
        </g>
      );
    case "cement":
      return (
        <g>
          {/* rotary kiln (rotating slightly) */}
          <motion.g
            style={{ transformOrigin: "720px 600px" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            opacity={0.22}
            fill={NAVY_2}
          >
            <rect x="520" y="585" width="400" height="34" rx={17} />
          </motion.g>
          <g opacity={0.24} fill={NAVY_2}>
            <rect x="900" y="470" width="70" height="430" rx={6} />
            <rect x="990" y="500" width="70" height="400" rx={6} />
          </g>
        </g>
      );
    case "fertilizers":
      return (
        <g opacity={0.24} fill={NAVY_2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={520 + i * 70} y={500} width={46} height={400} rx={23} />
          ))}
        </g>
      );
    case "hydrogen":
      return (
        <g>
          <g opacity={0.24} fill={NAVY_2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={460 + i * 90} y={520} width={60} height={380} rx={6} />
            ))}
          </g>
          {/* electrolysis bubbles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={490 + i * 90}
              r={6}
              fill={a}
              opacity={0.5}
              animate={{ cy: [880, 540], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </g>
      );
    case "electricity":
      return (
        <g stroke={NAVY_2} strokeWidth={4} fill="none" opacity={0.3}>
          <Pylon x={520} scale={1} />
          <Pylon x={900} scale={1} />
          <path d="M 545 410 C 700 470, 745 470, 880 410" />
          <path d="M 545 450 C 700 520, 745 520, 880 450" />
          {/* current pulse */}
          <motion.circle
            r={5} fill={a} stroke="none"
            animate={{ cx: [545, 880], cy: [410, 410] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      );
    default:
      return null;
  }
}

/* ========================== FRONT LAYER ========================== */
function SceneFront({ industry }: { industry: Industry }) {
  const a = industry.accent;
  switch (industry.id) {
    case "steel":
      return (
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={360 + (i * 47) % 360}
              r={2 + (i % 3)}
              fill={a}
              animate={{ cy: [870, 600], opacity: [0, 0.9, 0] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
            />
          ))}
          <rect x="0" y="884" width="1440" height="16" fill={NAVY} opacity={0.3} />
        </g>
      );
    case "cement":
      return (
        <g>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={(i * 95) % 1440}
              cy={500 + (i * 37) % 320}
              r={2 + (i % 3)}
              fill={a}
              opacity={0.4}
              animate={{ x: [0, 26, 0], y: [0, -16, 0], opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </g>
      );
    case "fertilizers":
      return (
        <g stroke={a} strokeWidth={2} fill="none" opacity={0.35}>
          {Array.from({ length: 5 }).map((_, i) => (
            <path key={i} d={`M -40 ${720 + i * 38} Q 360 ${690 + i * 38} 760 ${720 + i * 38} T 1500 ${710 + i * 38}`} />
          ))}
        </g>
      );
    case "hydrogen":
      return (
        <g>
          <motion.g
            style={{ transformOrigin: "720px 300px" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const ang = (i / 8) * Math.PI * 2;
              return (
                <circle key={i} cx={720 + Math.cos(ang) * 160} cy={300 + Math.sin(ang) * 90} r={4} fill={a} opacity={0.5} />
              );
            })}
          </motion.g>
        </g>
      );
    case "aluminium":
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.rect
              key={i}
              x={320 + i * 95}
              y={520}
              width={56}
              height={6}
              fill={a}
              opacity={0.5}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </g>
      );
    case "electricity":
      return (
        <g stroke={a} strokeWidth={2} fill="none" opacity={0.4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${100 + i * 360} 200 L ${180 + i * 360} 360 L ${120 + i * 360} 440 L ${220 + i * 360} 640`}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}

/* ---------- shared primitives ---------- */
function Smoke({ x, y, accent, delay = 0 }: { x: number; y: number; accent: string; delay?: number }) {
  return (
    <motion.ellipse
      cx={x}
      cy={y}
      rx={26}
      ry={34}
      fill={accent}
      animate={{ cy: [y, y - 160], opacity: [0, 0.18, 0], scale: [0.6, 1.6] }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

function Pylon({ x, scale = 1 }: { x: number; scale?: number }) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`}>
      <path d="M -50 700 L 0 380 L 50 700" />
      <path d="M -34 580 L 34 580" />
      <path d="M -44 660 L 44 660" />
      <path d="M -70 410 L 70 410" />
      <path d="M -56 470 L 56 470" />
      <path d="M 0 380 L 0 700" />
    </g>
  );
}
