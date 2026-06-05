import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, de-duplicating conflicting utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as EUR currency.
 */
export function formatEUR(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a number as GBP currency.
 */
export function formatGBP(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a plain number with thousands separators.
 */
export function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-IE", { maximumFractionDigits }).format(value);
}

/**
 * Compute whole days between now and a target ISO date (floored, min 0).
 */
export function daysUntil(targetISO: string): number {
  const now = new Date();
  const target = new Date(targetISO);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Build initials from a full name (max 2 chars).
 */
export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
