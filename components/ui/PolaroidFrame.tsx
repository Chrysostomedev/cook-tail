// components/ui/PolaroidFrame.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PolaroidFrameProps {
  children: React.ReactNode;
  caption?: string;
  rotation?: "left" | "right" | "none";
  className?: string;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  children,
  caption,
  rotation = "left",
  className,
}) => {
  const rotateClass =
    rotation === "left"
      ? "-rotate-2 hover:rotate-0"
      : rotation === "right"
      ? "rotate-2 hover:rotate-0"
      : "rotate-0";

  return (
    <div
      className={cn(
        "relative bg-white p-3 pb-5 rounded-sm border-2 border-[#0B1B33]",
        "shadow-[5px_5px_0px_0px_#0B1B33] transition-transform duration-200 ease-out",
        rotateClass,
        className
      )}
    >
      {/* Scotch adhésif Rétro en haut */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F4EBD9]/80 backdrop-blur-xs border border-amber-200/50 rotate-[-1deg] shadow-xs pointer-events-none z-10" />

      {/* Contenu image/media */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 border border-neutral-200">
        {children}
      </div>

      {/* Annotation manuscrite sous la photo */}
      {caption && (
        <p className="mt-3 text-center font-serif italic text-xs md:text-sm text-[#0B1B33] tracking-wide select-none">
          {caption}
        </p>
      )}
    </div>
  );
};