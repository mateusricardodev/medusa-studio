"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";

interface MedusaLogoProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function MedusaLogo({ size = 280, className = "", style }: MedusaLogoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0→1
    const y = (e.clientY - rect.top) / rect.height;   // 0→1
    // Mapeado de -1 a +1 relativo ao centro
    setTilt({ x: (y - 0.5) * -16, y: (x - 0.5) * 16, active: true });
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0, active: false });
  }

  const transform = `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.active ? 1.04 : 1})`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform,
        transition: tilt.active
          ? "transform 0.08s ease-out"
          : "transform 0.5s ease-out",
        ...style,
      }}
      className={className}
    >
      <Image
        src="/medusa-logo.png"
        alt="Medusa Studio"
        width={size}
        height={size}
        style={{ objectFit: "contain", display: "block" }}
        priority
      />
    </div>
  );
}
