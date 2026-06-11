"use client";

import { useId, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Industry, IndustryId } from "@/lib/industries";

/**
 * Bright daylight industrial worlds — one bespoke scene per CBAM sector,
 * hand-built in SVG in the same optimistic, vivid language as the home page.
 *
 * Engineering notes (these keep the motion glitch-free):
 * - Every scaled/rotated SVG element sets `transformBox` explicitly so the
 *   transform origin is what it looks like, in every browser.
 * - Glows are radial gradients, never feGaussianBlur — filters on animated
 *   nodes force constant re-rasterisation and drop frames.
 * - Grounds extend 250+ units below the viewBox and the layer SVGs are
 *   overflow-visible, so scroll parallax can lift the foreground without
 *   ever exposing a gap at the bottom edge.
 * - `preview` renders the full scene but only runs the cheap CSS/SMIL
 *   signature motion (turbines, furnace glow, current pulses) — framer
 *   particle loops stay off so six cards scroll at 60fps.
 */

interface ScenePalette {
  far: string;
  mid: string;
  near: string;
  glow: string;
  deep: string;
}

const PALETTES: Record<IndustryId, ScenePalette> = {
  steel: { far: "#dba883", mid: "#a85a2a", near: "#6e3a18", glow: "#ff7a26", deep: "#8a4820" },
  aluminium: { far: "#93ccd9", mid: "#3d8a9c", near: "#155c6e", glow: "#0fb6d4", deep: "#2a7486" },
  cement: { far: "#dcc18d", mid: "#b08a3e", near: "#73561f", glow: "#f59e0b", deep: "#947130" },
  fertilizers: { far: "#a4d490", mid: "#55964a", near: "#2c6328", glow: "#fb923c", deep: "#447c3a" },
  hydrogen: { far: "#b6acec", mid: "#7768cf", near: "#46389c", glow: "#6d28d9", deep: "#6253b8" },
  electricity: { far: "#a9b8dd", mid: "#4d5c94", near: "#222c54", glow: "#f0a800", deep: "#39466f" },
};

export function IndustryScene({
  industry,
  preview = false,
  scrim = "bottom",
}: {
  industry: Industry;
  preview?: boolean;
  /** where the white legibility fade sits: over the hero text zone */
  scrim?: "bottom" | "top";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const live = !preview && !reduce; // framer loops + parallax
  const css = !reduce; // cheap CSS/SMIL signature motion
  const pal = PALETTES[industry.id];

  /* ---- scroll parallax ---- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, live ? -40 : 0]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, live ? -100 : 0]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, live ? -180 : 0]);
  const skyShift = useTransform(scrollYProgress, [0, 1], [0, live ? 40 : 0]);

  /* ---- cursor parallax (heavily damped → buttery) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 34, damping: 22, mass: 0.9 });
  const smy = useSpring(my, { stiffness: 34, damping: 22, mass: 0.9 });
  const backX = useTransform(smx, [-1, 1], [5, -5]);
  const midX = useTransform(smx, [-1, 1], [12, -12]);
  const frontX = useTransform(smx, [-1, 1], [22, -22]);
  const backY = useTransform(smy, [-1, 1], [3, -3]);
  const midY = useTransform(smy, [-1, 1], [7, -7]);
  const frontY = useTransform(smy, [-1, 1], [12, -12]);

  /* ---- cursor sun-glint ---- */
  const lx = useMotionValue(60);
  const ly = useMotionValue(30);
  const slx = useSpring(lx, { stiffness: 44, damping: 22 });
  const sly = useSpring(ly, { stiffness: 44, damping: 22 });
  const glint = useMotionTemplate`radial-gradient(540px circle at ${slx}% ${sly}%, rgba(255,255,255,0.45), transparent 70%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!live) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 2 - 1);
    my.set(py * 2 - 1);
    lx.set(px * 100);
    ly.set(py * 100);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Sky */}
      <motion.div style={{ y: skyShift }} className={`absolute -inset-y-16 inset-x-0 day-${industry.id}`} />

      {/* Sun */}
      <div
        className="absolute left-[68%] top-[6%] h-72 w-72 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,250,235,0.55) 32%, transparent 68%)" }}
      />

      {/* Drifting clouds */}
      <Clouds live={live} dense={!preview} />

      {/* Cursor sun-glint */}
      {live && <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ background: glint }} />}

      {/* Depth layers */}
      <Layer y={yBack} x={backX} my={backY}>
        <SceneBack id={industry.id} pal={pal} css={css} live={live} />
      </Layer>
      <Layer y={yMid} x={midX} my={midY}>
        <SceneMid id={industry.id} pal={pal} css={css} live={live} />
      </Layer>
      <Layer y={yFront} x={frontX} my={frontY}>
        <SceneFront id={industry.id} pal={pal} css={css} live={live} dense={!preview} />
      </Layer>

      {/* Legibility scrims — airy white, like the home page */}
      {scrim === "bottom" ? (
        <>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-white/85 via-white/35 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-white via-white/72 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/45 to-transparent" />
        </>
      )}
    </div>
  );
}

/* ================= layer plumbing ================= */

function Layer({
  y,
  x,
  my,
  children,
}: {
  y: MotionValue<number>;
  x: MotionValue<number>;
  my: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div style={{ y }} className="absolute inset-0">
      <motion.svg
        style={{ x, y: my }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {children}
      </motion.svg>
    </motion.div>
  );
}

function Clouds({ live, dense }: { live: boolean; dense: boolean }) {
  const clouds = [
    { x: 140, y: 90, s: 1, drift: 40, dur: 44 },
    { x: 640, y: 150, s: 0.7, drift: -32, dur: 52 },
    { x: 1120, y: 70, s: 1.15, drift: 48, dur: 58 },
    { x: 920, y: 210, s: 0.55, drift: -26, dur: 48 },
  ].slice(0, dense ? 4 : 2);
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full">
      {clouds.map((c, i) => (
        <motion.g
          key={i}
          opacity={0.85}
          animate={live ? { x: [0, c.drift, 0] } : undefined}
          transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform={`translate(${c.x} ${c.y}) scale(${c.s})`} fill="#ffffff">
            <ellipse cx="0" cy="0" rx="70" ry="26" opacity="0.9" />
            <ellipse cx="48" cy="-12" rx="48" ry="22" opacity="0.85" />
            <ellipse cx="-52" cy="-6" rx="44" ry="18" opacity="0.8" />
            <ellipse cx="12" cy="-22" rx="38" ry="18" opacity="0.85" />
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

/* White steam plume — soft, slow, scales around its own centre */
function Steam({
  x,
  y,
  drift = 26,
  delay = 0,
  scale = 1,
  live,
}: {
  x: number;
  y: number;
  drift?: number;
  delay?: number;
  scale?: number;
  live: boolean;
}) {
  if (!live) return <ellipse cx={x} cy={y - 50} rx={26 * scale} ry={30 * scale} fill="#ffffff" opacity={0.5} />;
  return (
    <>
      {[0, 1, 2].map((k) => (
        <motion.ellipse
          key={k}
          cx={x}
          cy={y}
          rx={(20 + k * 6) * scale}
          ry={(24 + k * 7) * scale}
          fill="#ffffff"
          initial={{ opacity: 0 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          animate={{
            y: [0, (-150 - k * 36) * scale],
            x: [0, drift],
            opacity: [0, 0.55, 0],
            scale: [0.55, 1.55],
          }}
          transition={{ duration: 10 + k * 2.5, repeat: Infinity, delay: delay + k * 3.3, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

interface SceneProps {
  id: IndustryId;
  pal: ScenePalette;
  /** cheap CSS/SMIL signature motion — runs everywhere except reduced-motion */
  css: boolean;
  /** framer particle loops + drifts — full pages only */
  live: boolean;
  dense?: boolean;
}

/* soft radial glow — gradient, not a filter */
function GlowDefs({ uid, color }: { uid: string; color: string }) {
  return (
    <radialGradient id={`${uid}-glow`}>
      <stop offset="0%" stopColor={color} stopOpacity="0.85" />
      <stop offset="45%" stopColor={color} stopOpacity="0.4" />
      <stop offset="100%" stopColor={color} stopOpacity="0" />
    </radialGradient>
  );
}

/* ============================ FAR LAYER ============================ */

function SceneBack({ id, pal, live }: SceneProps) {
  switch (id) {
    case "steel":
      return (
        <g>
          <g fill={pal.far} opacity={0.75}>
            <rect x="-20" y="640" width="380" height="260" />
            <rect x="90" y="560" width="34" height="340" />
            <rect x="170" y="520" width="26" height="380" />
            <path d="M 360 900 L 360 660 L 470 620 L 580 660 L 580 900 Z" />
            <rect x="640" y="610" width="200" height="290" />
            <rect x="700" y="500" width="22" height="400" />
            <rect x="1240" y="630" width="220" height="270" />
            <rect x="1300" y="540" width="30" height="360" />
            <rect x="1390" y="500" width="24" height="400" />
          </g>
          <Steam x={183} y={520} live={live} />
          <Steam x={711} y={500} live={live} delay={3.4} />
          <Steam x={1402} y={500} live={live} delay={6.2} />
        </g>
      );
    case "aluminium":
      return (
        <g fill={pal.far} opacity={0.7}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M ${40 + i * 116} 700 L ${40 + i * 116} 640 L ${96 + i * 116} 612 L ${96 + i * 116} 700 Z`} />
          ))}
          <rect x="40" y="698" width="1392" height="202" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={`v${i}`} x={150 + i * 220} y={578} width={12} height={62} />
          ))}
          <path d="M 1180 700 A 110 110 0 0 1 1400 700 Z" opacity={0.85} />
        </g>
      );
    case "cement":
      return (
        <g>
          <g fill={pal.far} opacity={0.75}>
            <path d="M -20 900 L -20 700 L 180 700 L 230 740 L 420 740 L 470 780 L 700 780 L 700 900 Z" />
            <path d="M -20 700 L 60 660 L 160 660 L 200 700 Z" opacity={0.85} />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect key={i} x={1080 + i * 64} y={600} width={48} height={300} rx={22} />
            ))}
            <rect x="1060" y="760" width="360" height="140" />
            <rect x="980" y="540" width="20" height="360" />
          </g>
          <Steam x={990} y={540} live={live} />
        </g>
      );
    case "fertilizers":
      return (
        <g>
          <path
            d="M -20 730 Q 120 700 260 726 T 560 722 T 860 730 T 1180 720 T 1460 730 L 1460 900 L -20 900 Z"
            fill={pal.far}
            opacity={0.8}
          />
          <g fill={pal.far} opacity={0.9}>
            <rect x="150" y="640" width="40" height="100" rx="18" />
            <rect x="200" y="640" width="40" height="100" rx="18" />
            <path d="M 148 648 L 170 622 L 242 622 L 242 648 Z" />
          </g>
          <Birds live={live} />
        </g>
      );
    case "hydrogen":
      return (
        <g>
          <path d="M -20 900 L -20 760 Q 360 690 720 740 T 1460 720 L 1460 900 Z" fill={pal.far} opacity={0.7} />
          <Turbine x={220} y={720} s={1} pal={pal} slow />
          <Turbine x={520} y={700} s={0.78} pal={pal} />
          <Turbine x={1240} y={696} s={0.9} pal={pal} slow />
        </g>
      );
    case "electricity":
      return (
        <g>
          <g fill={pal.far} opacity={0.8}>
            <rect x="80" y="660" width="56" height="240" />
            <rect x="150" y="610" width="44" height="290" />
            <rect x="210" y="650" width="60" height="250" />
            <rect x="290" y="580" width="38" height="320" />
            <rect x="350" y="640" width="52" height="260" />
            <rect x="1030" y="630" width="50" height="270" />
            <rect x="1100" y="590" width="40" height="310" />
            <rect x="1160" y="650" width="64" height="250" />
            <rect x="1250" y="610" width="42" height="290" />
            <rect x="1320" y="660" width="58" height="240" />
          </g>
          <g fill="#ffffff" opacity={0.5}>
            <rect x="158" y="624" width="8" height="120" />
            <rect x="298" y="594" width="8" height="150" />
            <rect x="1108" y="604" width="8" height="140" />
            <rect x="1258" y="624" width="8" height="120" />
          </g>
          <Birds live={live} />
        </g>
      );
  }
}

/* ============================ MID LAYER ============================ */

function SceneMid({ id, pal, css, live }: SceneProps) {
  const uid = useId().replace(/[:]/g, "");
  switch (id) {
    case "steel":
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-bf`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={pal.deep} />
              <stop offset="55%" stopColor={pal.mid} />
              <stop offset="100%" stopColor={pal.far} />
            </linearGradient>
            <GlowDefs uid={uid} color={pal.glow} />
          </defs>

          {/* mill building */}
          <rect x="240" y="600" width="330" height="300" fill={pal.mid} />
          <path d="M 240 600 L 405 545 L 570 600 Z" fill={pal.deep} />
          <rect x="262" y="630" width="286" height="14" fill="#ffffff" opacity="0.45" rx="4" />

          {/* blast furnace tower */}
          <g fill={`url(#${uid}-bf)`}>
            <path d="M 880 900 L 880 760 L 855 700 L 855 560 L 880 520 L 880 470 L 960 470 L 960 520 L 985 560 L 985 700 L 960 760 L 960 900 Z" />
            <rect x="905" y="420" width="30" height="50" />
            <rect x="895" y="404" width="50" height="16" rx="4" />
          </g>
          <path d="M 960 480 Q 1050 490 1060 560 L 1060 640" stroke={pal.mid} strokeWidth="16" fill="none" />
          <rect x="1030" y="630" width="60" height="160" rx="26" fill={pal.mid} />
          {[1130, 1205, 1280].map((x, i) => (
            <g key={i} fill={i === 1 ? pal.deep : pal.mid}>
              <rect x={x} y={560} width={52} height={340} rx={6} />
              <path d={`M ${x} 572 A 26 30 0 0 1 ${x + 52} 572 L ${x + 52} 590 L ${x} 590 Z`} />
            </g>
          ))}
          <rect x="975" y="640" width="320" height="12" fill={pal.mid} />
          <path d="M 700 880 L 905 480" stroke={pal.mid} strokeWidth="14" fill="none" />
          <path d="M 720 880 L 925 480" stroke={pal.deep} strokeWidth="4" fill="none" opacity="0.7" />

          {/* cast house with breathing furnace doorway */}
          <rect x="760" y="760" width="160" height="140" fill={pal.deep} />
          <rect x="800" y="812" width="58" height="88" fill={pal.glow} opacity="0.9" className={css ? "animate-furnace" : undefined} />
          <ellipse cx="829" cy="896" rx="110" ry="30" fill={`url(#${uid}-glow)`} opacity="0.7" />

          <Steam x={920} y={404} live={live} delay={1.6} scale={1.2} />
        </g>
      );
    case "aluminium":
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-seam`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={pal.glow} stopOpacity="0" />
              <stop offset="50%" stopColor={pal.glow} stopOpacity="1" />
              <stop offset="100%" stopColor={pal.glow} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="120" y="540" width="1200" height="60" fill={pal.mid} />
          <rect x="120" y="544" width="1200" height="8" fill="#ffffff" opacity="0.35" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={`c${i}`} x={140 + i * 190} y={600} width={16} height={300} fill={pal.mid} />
          ))}
          <rect x="120" y="612" width="1200" height="10" fill={pal.deep} opacity="0.9" />
          <g fill={pal.deep}>
            <rect x="620" y="622" width="80" height="26" rx="4" />
            <rect x="654" y="648" width="10" height="60" />
            <rect x="640" y="706" width="38" height="18" rx="3" />
          </g>
          {/* electrolysis pots with breathing teal seams */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 170 + i * 145;
            return (
              <g key={i}>
                <rect x={x} y={720} width={110} height={120} rx={8} fill={pal.mid} />
                <rect x={x} y={724} width={110} height={6} fill="#ffffff" opacity="0.3" />
                {[0, 1, 2, 3].map((k) => (
                  <rect key={k} x={x + 14 + k * 24} y={690} width={10} height={34} fill={pal.deep} />
                ))}
                <rect x={x + 8} y={714} width={94} height={10} rx={3} fill={pal.deep} />
                {live ? (
                  <motion.rect
                    x={x + 6}
                    y={832}
                    width={98}
                    height={10}
                    rx={4}
                    fill={`url(#${uid}-seam)`}
                    animate={{ opacity: [0.35, 0.95, 0.35] }}
                    transition={{ duration: 4.2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                  />
                ) : (
                  <rect x={x + 6} y={832} width={98} height={10} rx={4} fill={`url(#${uid}-seam)`} opacity={0.6} />
                )}
              </g>
            );
          })}
        </g>
      );
    case "cement":
      return (
        <g>
          <defs>
            <GlowDefs uid={uid} color={pal.glow} />
          </defs>
          <g fill={pal.mid}>
            <rect x="1000" y="330" width="14" height="470" />
            <rect x="1106" y="330" width="14" height="470" />
            {[0, 1, 2, 3].map((k) => (
              <path key={k} d={`M ${1006} ${360 + k * 110} L ${1114} ${360 + k * 110} L ${1090} ${430 + k * 110} L ${1030} ${430 + k * 110} Z`} fill={k % 2 ? pal.deep : pal.mid} />
            ))}
            <rect x="1042" y="250" width="36" height="90" />
            <rect x="996" y="780" width="128" height="120" />
          </g>
          <Steam x={1060} y={250} live={live} />

          <g>
            <path d="M 540 760 L 1000 712 L 1000 678 L 540 726 Z" fill={pal.mid} />
            <path d="M 540 730 L 1000 682 L 1000 678 L 540 726 Z" fill="#ffffff" opacity="0.35" />
            {[640, 760, 880].map((x, i) => (
              <rect key={i} x={x} y={684} width={14} height={78} fill={pal.deep} transform={`rotate(-5.9 ${x} 720)`} />
            ))}
            {[620, 800, 960].map((x, i) => (
              <path key={i} d={`M ${x - 26} 900 L ${x} 740 L ${x + 26} 900 Z`} fill={pal.mid} />
            ))}
            <rect x="498" y="716" width="52" height="70" rx="8" fill={pal.deep} />
            <ellipse
              cx="524" cy="752" rx="40" ry="32"
              fill={`url(#${uid}-glow)`}
              className={css ? "animate-furnace" : undefined}
            />
          </g>

          {[180, 280, 380].map((x, i) => (
            <g key={i} fill={i === 1 ? pal.deep : pal.mid}>
              <rect x={x} y={560} width={76} height={340} rx={34} />
              <path d={`M ${x + 10} 560 L ${x + 38} 528 L ${x + 66} 560 Z`} />
              <rect x={x + 14} y={580} width={10} height={300} fill="#ffffff" opacity="0.25" rx={5} />
            </g>
          ))}
          <rect x="160" y="820" width="320" height="80" fill={pal.mid} />
        </g>
      );
    case "fertilizers":
      return (
        <g>
          <defs>
            <GlowDefs uid={uid} color={pal.glow} />
          </defs>
          <g fill={pal.mid}>
            <rect x="880" y="430" width="90" height="470" rx="12" />
            <rect x="866" y="412" width="118" height="26" rx="8" />
            <rect x="898" y="450" width="12" height="440" fill="#ffffff" opacity="0.3" rx={6} />
            <rect x="970" y="640" width="330" height="8" />
            <rect x="970" y="664" width="330" height="8" />
            {[1020, 1100, 1180, 1260].map((x, i) => (
              <rect key={i} x={x} y={648} width={8} height={252} />
            ))}
          </g>
          {[1120, 1268].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={760} r={62} fill={pal.mid} />
              <ellipse cx={x - 18} cy={736} rx={22} ry={11} fill="#ffffff" opacity={0.4} />
              {[-30, 0, 30].map((d, k) => (
                <rect key={k} x={x + d - 5} y={800} width={10} height={100} fill={pal.deep} />
              ))}
            </g>
          ))}
          {/* reformer flare stack — halo + flame, no filters */}
          <rect x="790" y="470" width="14" height="430" fill={pal.deep} />
          <ellipse cx="797" cy="445" rx="36" ry="42" fill={`url(#${uid}-glow)`} opacity="0.8" />
          <g
            className={css ? "animate-flare" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
          >
            <path d="M 789 470 Q 797 420 805 470 Q 812 442 797 408 Q 782 442 789 470 Z" fill={pal.glow} opacity="0.95" />
          </g>
        </g>
      );
    case "hydrogen":
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-band`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={pal.glow} stopOpacity="0" />
              <stop offset="50%" stopColor={pal.glow} stopOpacity="0.9" />
              <stop offset="100%" stopColor={pal.glow} stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill={pal.mid}>
            <rect x="220" y="600" width="430" height="300" rx="8" />
            <rect x="200" y="580" width="470" height="26" rx="10" />
          </g>
          <rect x="232" y="610" width="406" height="10" fill="#ffffff" opacity="0.35" rx={5} />
          {live ? (
            <motion.rect
              x="244" y="652" width="382" height="34" rx="8"
              fill={`url(#${uid}-band)`}
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <rect x="244" y="652" width="382" height="34" rx="8" fill={`url(#${uid}-band)`} opacity={0.55} />
          )}

          <circle cx="800" cy="740" r="84" fill={pal.mid} />
          <ellipse cx="770" cy="704" rx="28" ry="14" fill="#ffffff" opacity="0.45" />
          {[-40, 0, 40].map((d, k) => (
            <rect key={k} x={796 + d} y={800} width={10} height={100} fill={pal.deep} />
          ))}
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={940} y={690 + k * 56} width={330} height={40} rx={20} fill={pal.mid} />
              <rect x={952} y={696 + k * 56} width={306} height={8} rx={4} fill="#ffffff" opacity={0.4} />
              <circle cx={1270} cy={710 + k * 56} r={20} fill={pal.deep} />
            </g>
          ))}
          <path d="M 884 740 L 940 740" stroke={pal.mid} strokeWidth="10" />
        </g>
      );
    case "electricity": {
      const wire1 = "M 240 430 C 480 540, 720 540, 960 430";
      const wire2 = "M 960 430 C 1120 510, 1280 510, 1440 440";
      const wire3 = "M 240 470 C 480 590, 720 590, 960 470";
      return (
        <g>
          <defs>
            <GlowDefs uid={uid} color={pal.glow} />
            <path id={`${uid}-w1`} d={wire1} />
            <path id={`${uid}-w2`} d={wire2} />
            <path id={`${uid}-w3`} d={wire3} />
          </defs>
          <Pylon x={240} pal={pal} s={1.04} />
          <Pylon x={960} pal={pal} s={1.04} />
          <g stroke={pal.mid} strokeWidth="3.5" fill="none" opacity="0.9">
            <path d={wire1} />
            <path d={wire2} />
            <path d={wire3} />
            <path d="M 240 470 C 80 560, -40 560, -120 480" />
          </g>
          {/* travelling current pulses — SMIL, halo via gradient circle */}
          {css && (
            <>
              {[`${uid}-w1`, `${uid}-w2`, `${uid}-w3`].map((w, i) => (
                <g key={w}>
                  <circle r="12" fill={`url(#${uid}-glow)`}>
                    <animateMotion dur={`${3.2 + i * 0.8}s`} begin={`${i * 1.1}s`} repeatCount="indefinite">
                      <mpath href={`#${w}`} />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="#ffffff">
                    <animateMotion dur={`${3.2 + i * 0.8}s`} begin={`${i * 1.1}s`} repeatCount="indefinite">
                      <mpath href={`#${w}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
            </>
          )}
        </g>
      );
    }
  }
}

/* ========================== FRONT LAYER ========================== */

function SceneFront({ id, pal, css, live, dense = true }: SceneProps) {
  const uid = useId().replace(/[:]/g, "");
  const n = (full: number) => (dense ? full : Math.ceil(full * 0.4));
  switch (id) {
    case "steel":
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-melt`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff3d6" />
              <stop offset="45%" stopColor="#ffb36b" />
              <stop offset="100%" stopColor={pal.glow} />
            </linearGradient>
            <GlowDefs uid={uid} color={pal.glow} />
          </defs>

          <rect x="0" y="846" width="1440" height="300" fill={pal.near} />

          {/* torpedo ladle car */}
          <g fill={pal.near}>
            <path d="M 120 800 Q 120 756 180 748 L 360 748 Q 420 756 420 800 Q 420 836 360 842 L 180 842 Q 120 836 120 800 Z" />
            <rect x="252" y="722" width="38" height="30" rx="4" />
            {[160, 214, 326, 380].map((x, i) => (
              <circle key={i} cx={x} cy={856} r={13} />
            ))}
            <rect x="108" y="840" width="328" height="7" />
          </g>
          <ellipse cx="270" cy="760" rx="120" ry="10" fill="#ffffff" opacity="0.25" />
          <circle cx="271" cy="730" r="11" fill={pal.glow} opacity="0.85" className={css ? "animate-furnace" : undefined} />

          {/* molten pour — steady stream, breathing pool */}
          <rect x="826" y="700" width="7" height="150" fill={`url(#${uid}-melt)`} rx="3" />
          <ellipse cx="830" cy="852" rx="44" ry="12" fill="#ffd9a8" opacity="0.95" />
          <ellipse cx="830" cy="852" rx="80" ry="22" fill={`url(#${uid}-glow)`} className={css ? "animate-furnace" : undefined} />

          {/* gentle ember drift from the pour */}
          {live &&
            Array.from({ length: n(8) }).map((_, i) => {
              const dx = ((i % 4) - 1.5) * 46;
              return (
                <motion.circle
                  key={i}
                  cx={830}
                  cy={846}
                  r={2 + (i % 2)}
                  fill={i % 3 === 0 ? "#ffe9bd" : pal.glow}
                  initial={{ opacity: 0 }}
                  animate={{ y: [0, -120 - (i % 3) * 40], x: [0, dx], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 3.6 + (i % 3) * 0.7, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
                />
              );
            })}
        </g>
      );
    case "aluminium":
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-ingot`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eef9fd" />
              <stop offset="42%" stopColor="#9fcedd" />
              <stop offset="100%" stopColor="#4a8294" />
            </linearGradient>
            <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-stackclip`}>
              <rect x="1010" y="688" width="330" height="172" />
            </clipPath>
          </defs>

          <rect x="0" y="852" width="1440" height="300" fill={pal.near} />

          <g>
            {[0, 1, 2, 3].map((row) => {
              const count = 5 - row;
              const w = 60;
              return Array.from({ length: count }).map((_, k) => (
                <rect
                  key={`${row}-${k}`}
                  x={1030 + row * (w / 2) + k * (w + 4)}
                  y={816 - row * 44}
                  width={w}
                  height={40}
                  rx={6}
                  fill={`url(#${uid}-ingot)`}
                  stroke={pal.near}
                  strokeWidth="1.5"
                />
              ));
            })}
            {live && (
              <g clipPath={`url(#${uid}-stackclip)`}>
                <motion.rect
                  x="950" y="676" width="90" height="200"
                  fill={`url(#${uid}-sheen)`}
                  animate={{ x: [950, 1360] }}
                  transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                  transform="skewX(-16)"
                />
              </g>
            )}
          </g>

          <g fill={pal.near}>
            <rect x="0" y="772" width="560" height="16" rx="8" />
            <rect x="0" y="800" width="560" height="16" rx="8" />
            {[60, 220, 380].map((x, i) => (
              <rect key={i} x={x} y={760} width={22} height={100} rx={6} />
            ))}
          </g>
          <rect x="0" y="775" width="560" height="4" rx="2" fill="#ffffff" opacity="0.4" />
        </g>
      );
    case "cement":
      return (
        <g>
          <rect x="0" y="850" width="1440" height="300" fill={pal.near} />

          <g>
            <path d="M -40 870 L 560 600 L 575 626 L -25 896 Z" fill={pal.near} />
            {[80, 220, 360, 500].map((x, i) => (
              <rect key={i} x={x} y={870 - (x + 40) * 0.45} width={12} height={(x + 40) * 0.45 + 30} fill={pal.near} />
            ))}
            <path
              d="M -30 878 L 565 610"
              stroke={pal.glow}
              strokeWidth="3"
              strokeDasharray="10 14"
              fill="none"
              opacity="0.8"
              className={css ? "animate-dash-flow" : undefined}
            />
            <rect x="540" y="570" width="70" height="60" rx="6" fill={pal.near} />
          </g>

          <path d="M 980 920 Q 1120 770 1280 920 Z" fill={pal.near} />
          <path d="M 1180 920 Q 1300 800 1440 920 Z" fill={pal.mid} />
          <path d="M 1080 866 Q 1120 800 1196 838" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.3" />

          {live &&
            Array.from({ length: n(10) }).map((_, i) => (
              <motion.circle
                key={i}
                cx={120 + ((i * 137) % 1240)}
                cy={500 + ((i * 61) % 300)}
                r={2 + (i % 2)}
                fill="#ffffff"
                initial={{ opacity: 0 }}
                animate={{ x: [0, 44], y: [0, -20], opacity: [0, 0.6, 0] }}
                transition={{ duration: 11 + (i % 4), repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
              />
            ))}
        </g>
      );
    case "fertilizers":
      return (
        <g>
          <rect x="0" y="760" width="1440" height="340" fill={pal.near} />
          <g stroke={pal.glow} strokeWidth="2.5" fill="none" opacity="0.5">
            {Array.from({ length: 9 }).map((_, i) => {
              const xb = -200 + i * 230;
              return <path key={i} d={`M ${xb} 920 Q ${xb * 0.45 + 380} 800 ${690 + i * 8} 742`} />;
            })}
          </g>
          <path d="M -20 1100 L -20 900 Q 360 818 720 836 T 1460 826 L 1460 1100 Z" fill={pal.near} />
          <path d="M -20 900 Q 360 826 720 844 T 1460 834" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.25" />

          {live &&
            Array.from({ length: n(10) }).map((_, i) => (
              <motion.circle
                key={i}
                cx={60 + ((i * 151) % 1320)}
                cy={600 + ((i * 53) % 240)}
                r={2.2}
                fill="#fff7d6"
                initial={{ opacity: 0 }}
                animate={{ x: [0, 34, 10], y: [0, -42, -70], opacity: [0, 0.85, 0] }}
                transition={{ duration: 9 + (i % 4), repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              />
            ))}
        </g>
      );
    case "hydrogen":
      return (
        <g>
          <rect x="0" y="856" width="1440" height="300" fill={pal.near} />

          {live &&
            Array.from({ length: n(12) }).map((_, i) => {
              const x = 110 + ((i * 113) % 1240);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={880}
                  r={2.4 + (i % 3)}
                  fill="#ffffff"
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -420 - (i % 4) * 50],
                    x: [0, 14, -10, 6],
                    opacity: [0, 0.85, 0],
                  }}
                  transition={{ duration: 8 + (i % 4), repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                />
              );
            })}

          {/* H2 molecules drifting up — rotate around their own centre */}
          {live &&
            Array.from({ length: n(4) }).map((_, i) => {
              const x = 240 + i * 300;
              return (
                <motion.g
                  key={`m${i}`}
                  initial={{ opacity: 0 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ y: [0, -320], x: [0, i % 2 === 0 ? 44 : -36], opacity: [0, 0.9, 0], rotate: [0, 100] }}
                  transition={{ duration: 13 + i * 1.8, repeat: Infinity, delay: i * 2.6, ease: "linear" }}
                >
                  <line x1={x - 9} y1={700} x2={x + 9} y2={700} stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
                  <circle cx={x - 12} cy={700} r={6.5} fill={pal.glow} opacity="0.85" />
                  <circle cx={x + 12} cy={700} r={6.5} fill={pal.glow} opacity="0.85" />
                </motion.g>
              );
            })}
        </g>
      );
    case "electricity":
      return (
        <g>
          <defs>
            <GlowDefs uid={uid} color={pal.glow} />
          </defs>
          <rect x="0" y="852" width="1440" height="300" fill={pal.near} />

          <g fill={pal.near}>
            <rect x="1060" y="740" width="150" height="116" rx="6" />
            <rect x="1240" y="760" width="110" height="96" rx="6" />
            <rect x="1090" y="700" width="10" height="44" />
            <rect x="1160" y="700" width="10" height="44" />
            <rect x="1270" y="720" width="10" height="44" />
            {[1095, 1165, 1275].map((x, i) => (
              <g key={i}>
                {[0, 1, 2].map((k) => (
                  <ellipse key={k} cx={x} cy={682 - k * 9} rx={9} ry={4} />
                ))}
              </g>
            ))}
            <path d="M 1020 856 L 1400 856" stroke={pal.near} strokeWidth="5" />
            {[1030, 1090, 1150, 1210, 1270, 1330, 1390].map((x, i) => (
              <rect key={i} x={x} y={812} width={4} height={44} />
            ))}
          </g>
          <rect x="1072" y="748" width="126" height="8" rx="4" fill="#ffffff" opacity="0.35" />

          {/* soft breathing glints on the insulators */}
          {live &&
            [1095, 1275].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={668}
                r={9}
                fill={`url(#${uid}-glow)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, delay: i * 2.3, ease: "easeInOut" }}
              />
            ))}
        </g>
      );
  }
}

/* ---------- shared structures ---------- */

function Birds({ live }: { live: boolean }) {
  if (!live) return null;
  return (
    <g stroke="#41506b" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5">
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          initial={{ x: -80 - i * 60, y: 150 + i * 46, opacity: 0 }}
          animate={{ x: 1560, y: 110 + i * 40, opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 34 + i * 7, repeat: Infinity, delay: i * 9, ease: "linear" }}
        >
          <path d="M 0 0 Q 7 -7 14 0 M 14 0 Q 21 -7 28 0" />
        </motion.g>
      ))}
    </g>
  );
}

function Turbine({
  x,
  y,
  s,
  pal,
  slow,
}: {
  x: number;
  y: number;
  s: number;
  pal: ScenePalette;
  slow?: boolean;
}) {
  const hubY = y - 150 * s;
  return (
    <g>
      <path
        d={`M ${x - 7 * s} ${y} L ${x - 3 * s} ${hubY} L ${x + 3 * s} ${hubY} L ${x + 7 * s} ${y} Z`}
        fill="#ffffff"
        stroke={pal.far}
        strokeWidth="1.5"
      />
      {/* rotation origin pinned to the hub in user units */}
      <g
        className={slow ? "animate-turbine-slow" : "animate-turbine"}
        style={{ transformOrigin: `${x}px ${hubY}px`, transformBox: "view-box" }}
      >
        {[0, 120, 240].map((deg) => (
          <path
            key={deg}
            d={`M ${x} ${hubY} L ${x - 5 * s} ${hubY - 18 * s} L ${x} ${hubY - 86 * s} L ${x + 5 * s} ${hubY - 18 * s} Z`}
            fill="#ffffff"
            stroke={pal.far}
            strokeWidth="1.5"
            transform={`rotate(${deg} ${x} ${hubY})`}
          />
        ))}
      </g>
      <circle cx={x} cy={hubY} r={5 * s} fill={pal.glow} />
    </g>
  );
}

function Pylon({ x, pal, s = 1 }: { x: number; pal: ScenePalette; s?: number }) {
  return (
    <g stroke={pal.mid} fill="none" transform={`translate(${x} 0) scale(${s})`} strokeWidth={5}>
      <path d="M -64 900 L -14 400 M 64 900 L 14 400" />
      <path d="M -58 840 L 58 760 M 58 840 L -58 760 M -52 760 L 52 690 M 52 760 L -52 690 M -46 690 L 46 620 M 46 690 L -46 620 M -40 620 L 40 550 M 40 620 L -40 550" strokeWidth={2.5} opacity={0.8} />
      <path d="M -58 840 L 58 840 M -52 760 L 52 760 M -46 690 L 46 690 M -40 620 L 40 620" strokeWidth={3} />
      <path d="M -110 430 L 110 430 M -86 490 L 86 490 M -14 400 L 14 400 L 0 350 L -14 400" strokeWidth={5} />
      <path d="M -100 430 L -100 444 M 100 430 L 100 444 M -78 490 L -78 504 M 78 490 L 78 504" strokeWidth={3} />
    </g>
  );
}
