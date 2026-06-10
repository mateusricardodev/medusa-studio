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

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://wa.me/5512981084071?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Medusa%20Studio!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-8 px-4 bg-[#3FB68B] text-[#0B0B0D] text-[11px] tracking-widest uppercase font-body font-medium hover:bg-[#4fcf9f] transition-colors duration-200"
            aria-label="Falar no WhatsApp"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <Link
            href="/agendar"
            className="inline-flex items-center h-8 px-4 border border-[#2C2C33] text-[11px] tracking-widest uppercase font-body text-[#B8B9C0] hover:border-[#5A5B63] hover:text-[#ECEDF1] transition-all duration-200"
          >
            Agendar
          </Link>
        </div>

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
          <li>
            <a
              href="https://wa.me/5512981084071?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Medusa%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase font-body py-1 text-[#3FB68B]"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </details>
  );
}
