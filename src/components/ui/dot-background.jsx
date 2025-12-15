import React from "react";
import { cn } from "@/lib/utils";

export default function DotBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Grid – FULL PAGE */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "bg-size-[24px_24px]",
          "bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]"
        )}
      />

      {/* Top glow – fades naturally, DOES NOT cut grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "[background:radial-gradient(800px_circle_at_top_center,rgba(79,70,229,0.25),transparent_65%)]"
        )}
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
