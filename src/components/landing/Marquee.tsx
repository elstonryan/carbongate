"use client";

import { INDUSTRIES, REGIMES } from "@/lib/landing-data";
import { ICONS } from "@/components/landing/icon-map";

/**
 * Two opposing marquee rows — industries on top, regimes below. Continuous
 * motion is what makes the page feel alive rather than static.
 */
export function Marquee() {
  const industryRow = [...INDUSTRIES, ...INDUSTRIES];
  const regimeRow = [...REGIMES, ...REGIMES];

  return (
    <div className="space-y-3 py-2">
      {/* Industries → */}
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-3">
          {industryRow.map((ind, i) => {
            const Icon = ICONS[ind.icon];
            return (
              <span
                key={`${ind.id}-${i}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: ind.tint, color: ind.hex }}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                </span>
                {ind.name}
                <span className="text-xs font-normal text-slate-400">{ind.cn}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Regimes ← */}
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee-rev gap-3">
          {regimeRow.map((r, i) => (
            <span
              key={`${r.code}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-white"
                style={{ backgroundColor: r.hex }}
              >
                {r.code}
              </span>
              {r.label}
              <span className="text-xs font-normal text-slate-400">{r.status}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
