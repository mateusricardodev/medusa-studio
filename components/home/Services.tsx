"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import TridentDivider from "@/components/ui/TridentDivider";

const services = [
  {
    number: "01",
    name: "Barbearia",
    description:
      "Corte clássico, degradê, navalha, barba e hot towel shave. Cadeira de barbeiro como ritual, não como serviço.",
    detail: "A partir de R$ 55",
    href: "/agendar",
    cta: "Agendar",
    accent: "Corte · Barba · Pigmentação",
  },
  {
    number: "02",
    name: "Tatuagem",
    description:
      "Fine line, blackwork, realismo. Cada trabalho pensado antes de ser executado — sem compromisso com quantidade.",
    detail: "A partir de R$ 180",
    href: "/tatuagem",
    cta: "Pedir orçamento",
    accent: "Fine Line · Blackwork · Realismo",
  },
  {
    number: "03",
    name: "Piercing",
    description:
      "Perfuração precisa com material cirúrgico certificado. Joias em aço, titânio ou ouro 18k.",
    detail: "A partir de R$ 80",
    href: "/agendar",
    cta: "Agendar",
    accent: "Helix · Septo · Daith · Industrial",
  },
  {
    number: "04",
    name: "Roupas & Tênis",
    description:
      "Peças exclusivas do estúdio. Camisetas, moletons, tênis em collab — disponíveis em quantidade limitada.",
    detail: "A partir de R$ 79",
    href: "/loja",
    cta: "Ver catálogo",
    accent: "Camisetas · Moletons · Tênis",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0B0B0D] py-24 px-6" ref={ref} aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
            O que fazemos
          </p>
          <h2
            id="services-heading"
            className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none chrome-title"
          >
            Serviços
          </h2>
        </motion.div>

        {/* Grid uniforme — 4 colunas iguais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2C2C33]">
          {services.map((s, i) => (
            <motion.article
              key={s.number}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="bg-[#141417] p-8 flex flex-col relative overflow-hidden group"
            >
              {/* Número decorativo */}
              <div
                className="absolute top-6 right-6 text-[56px] font-display leading-none text-[#1E1E24] select-none"
                aria-hidden="true"
              >
                {s.number}
              </div>

              <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-4">
                {s.accent}
              </span>

              <h3 className="font-display text-2xl mb-3 text-[#E6E6EA] leading-tight">
                {s.name}
              </h3>

              <p className="text-[#8E8F97] font-body text-sm leading-relaxed mb-6 flex-1">
                {s.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-mono text-[#B8B9C0] text-sm">{s.detail}</span>
                <Link
                  href={s.href}
                  className="text-xs tracking-widest uppercase font-body text-[#5A5B63] hover:text-[#B8B9C0] transition-colors border-b border-[#2C2C33] hover:border-[#5A5B63] pb-0.5"
                >
                  {s.cta} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <TridentDivider />
        </div>
      </div>
    </section>
  );
}
