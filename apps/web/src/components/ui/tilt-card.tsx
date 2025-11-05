"use client";
import React, { useCallback, useRef } from "react";

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  maxRotateDeg?: number; // e.g., 8
  shine?: boolean;
};

export default function TiltCard({
  className,
  children,
  maxRotateDeg = 8,
  shine = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      const rx = (-py * maxRotateDeg).toFixed(2);
      const ry = (px * maxRotateDeg).toFixed(2);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (shine) {
        const gX = (x / rect.width) * 100;
        const gY = (y / rect.height) * 100;
        el.style.setProperty("--shine-x", `${gX}%`);
        el.style.setProperty("--shine-y", `${gY}%`);
      }
    },
    [maxRotateDeg, shine]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <div
      ref={ref}
      className={
        "transition-transform duration-300 will-change-transform relative " +
        (className || "")
      }
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      // Disable effect on touch devices
      onTouchStart={handleLeave}
    >
      {shine && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(400px circle at var(--shine-x,50%) var(--shine-y,50%), rgba(255,255,255,0.15), transparent 60%)",
          }}
        />
      )}
      {children}
    </div>
  );
}


