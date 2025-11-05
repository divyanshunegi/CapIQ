"use client";
import React from "react";

export default function SectionBackdrop({ color = "rgba(255,255,255,0.06)" }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        maskImage:
          "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.6) 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.6) 90%, transparent)",
      }}
    >
      {/* Subtle grid lines */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          color,
        }}
      />
    </div>
  );
}


