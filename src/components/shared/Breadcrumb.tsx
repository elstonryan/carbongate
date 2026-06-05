"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * Animated breadcrumb trail. Each crumb fades+slides in on mount.
 */
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-1.5"
        >
          {i > 0 && (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          )}
          <span
            className={
              i === items.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            }
          >
            {item}
          </span>
        </motion.span>
      ))}
    </nav>
  );
}
