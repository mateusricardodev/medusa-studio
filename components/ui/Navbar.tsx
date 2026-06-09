"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const links = [
  { href: "/", label: "Início" },
  { href: "/agendar", label: "Agendar" },
  { href: "/tatuagem", label: "Tatuagem" },
  { href: "/loja", label: "Loja" },
  { href: "/painel", label: "Painel" },
  { href: "/diagnostico", label: "Diagnóstico" },
];

function NavLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -20, y: (x - 0.5) * 20, active: true });
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0, active: false });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(300px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.active ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
      }}
    >
      <Image
        src="/medusa-logo.png"
        alt="Medusa Studio"
        width={32}
        height={32}
        className="rounded-sm object-contain"
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2C2C33] bg-[#0B0B0D]/90 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between" aria-label="Navegação principal">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Medusa Studio — início">
          <NavLogo />
          <span
            className="font-display text-sm tracking-[0.2em] uppercase"
            style={{
              background: "linear-gradient(180deg, #ECEDF1 0%, #B8B9C0 40%, #8A8B93 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Medusa Studio
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6" role="list">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs tracking-wider uppercase font-body transition-colors duration-200 ${
                    active ? "text-[#B8B9C0]" : "text-[#5A5B63] hover:text-[#8A8B93]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/agendar"
          className="hidden md:inline-flex items-center h-8 px-4 border border-[#2C2C33] text-[11px] tracking-widest uppercase font-body text-[#B8B9C0] hover:border-[#5A5B63] hover:text-[#ECEDF1] transition-all duration-200"
        >
          Agendar
        </Link>

        <MobileMenu pathname={pathname} />
      </nav>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="md:hidden group">
      <summary className="list-none cursor-pointer p-2 text-[#8A8B93] hover:text-[#B8B9C0] transition-colors" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute top-14 left-0 right-0 bg-[#141417] border-b border-[#2C2C33] py-4 px-6">
        <ul className="flex flex-col gap-4" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm tracking-wider uppercase font-body block py-1 transition-colors ${
                  pathname === href ? "text-[#B8B9C0]" : "text-[#5A5B63]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
