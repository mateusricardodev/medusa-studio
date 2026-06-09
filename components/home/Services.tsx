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
    size: "large",
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
    size: "medium",
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
    size: "medium",
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
    size: "small",
    accent: "Camisetas · Moletons · Tênis",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0B0B0D] py-24 px-6" ref={ref} aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
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

        {/* Editorial grid — assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#2C2C33]">
          {/* 01 — Barbearia: large, col-span 7 */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-[#0B0B0D] p-8 lg:p-12 group relative overflow-hidden"
          >
            <div className="absolute top-8 right-8 text-[72px] font-display leading-none text-[#141417] select-none" aria-hidden="true">
              01
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-4">
              {services[0].accent}
            </span>
            <h3 className="font-display text-3xl lg:text-4xl mb-4 text-[#E6E6EA]">{services[0].name}</h3>
            <p className="text-[#8E8F97] font-body leading-relaxed max-w-md mb-6">{services[0].description}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#B8B9C0] text-sm">{services[0].detail}</span>
              <Link
                href={services[0].href}
                className="text-xs tracking-widest uppercase font-body text-[#5A5B63] hover:text-[#B8B9C0] transition-colors border-b border-[#2C2C33] hover:border-[#5A5B63] pb-0.5"
              >
                {services[0].cta} →
              </Link>
            </div>
          </motion.article>

          {/* 02 — Tatuagem: col-span 5 */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 bg-[#141417] p-8 group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 text-[56px] font-display leading-none text-[#1A1A1F] select-none" aria-hidden="true">
              02
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-4">
              {services[1].accent}
            </span>
            <h3 className="font-display text-2xl mb-3 text-[#E6E6EA]">{services[1].name}</h3>
            <p className="text-[#8E8F97] font-body text-sm leading-relaxed mb-6">{services[1].description}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#B8B9C0] text-sm">{services[1].detail}</span>
              <Link
                href={services[1].href}
                className="text-xs tracking-widest uppercase font-body text-[#5A5B63] hover:text-[#B8B9C0] transition-colors"
              >
                {services[1].cta} →
              </Link>
            </div>
          </motion.article>

          {/* 03 — Piercing: col-span 5 */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 bg-[#141417] p-8 group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 text-[56px] font-display leading-none text-[#1A1A1F] select-none" aria-hidden="true">
              03
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-4">
              {services[2].accent}
            </span>
            <h3 className="font-display text-2xl mb-3 text-[#E6E6EA]">{services[2].name}</h3>
            <p className="text-[#8E8F97] font-body text-sm leading-relaxed mb-6">{services[2].description}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#B8B9C0] text-sm">{services[2].detail}</span>
              <Link
                href={services[2].href}
                className="text-xs tracking-widest uppercase font-body text-[#5A5B63] hover:text-[#B8B9C0] transition-colors"
              >
                {services[2].cta} →
              </Link>
            </div>
          </motion.article>

          {/* 04 — Loja: col-span 7 */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7 bg-[#0B0B0D] p-8 lg:p-12 group relative overflow-hidden border-t border-[#2C2C33] lg:border-t-0"
          >
            <div className="absolute top-8 right-8 text-[72px] font-display leading-none text-[#141417] select-none" aria-hidden="true">
              04
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-4">
              {services[3].accent}
            </span>
            <h3 className="font-display text-3xl lg:text-4xl mb-4 text-[#E6E6EA]">{services[3].name}</h3>
            <p className="text-[#8E8F97] font-body leading-relaxed max-w-md mb-6">{services[3].description}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#B8B9C0] text-sm">{services[3].detail}</span>
              <Link
                href={services[3].href}
                className="text-xs tracking-widest uppercase font-body text-[#5A5B63] hover:text-[#B8B9C0] transition-colors border-b border-[#2C2C33] hover:border-[#5A5B63] pb-0.5"
              >
                {services[3].cta} →
              </Link>
            </div>
          </motion.article>
        </div>

        <div className="mt-16">
          <TridentDivider />
        </div>
      </div>
    </section>
  );
}
