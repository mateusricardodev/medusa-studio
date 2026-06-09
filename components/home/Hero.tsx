"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MedusaLogo from "@/components/ui/MedusaLogo";

const VARIANTS = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  },
};

export default function Hero() {
  return (
    <section
      className="grain-overlay relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0D]"
      aria-label="Hero — Medusa Studio"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(44,44,51,0.6) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Vertical hairline editorial rule */}
      <div
        className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[#2C2C33] hidden lg:block opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — wordmark & copy */}
          <motion.div variants={VARIANTS.container} initial="hidden" animate="show">
            {/* Eyebrow */}
            <motion.p
              variants={VARIANTS.item}
              className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-8"
            >
              Jardim Motorama — São José dos Campos
            </motion.p>

            {/* Wordmark */}
            <motion.h1
              variants={VARIANTS.item}
              className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-none tracking-tight mb-6"
            >
              <span className="chrome-title block">MEDUSA</span>
              <span
                className="block text-[0.45em] tracking-[0.5em] uppercase mt-2"
                style={{
                  background: "linear-gradient(180deg, #8A8B93 0%, #5A5B63 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                STUDIO
              </span>
            </motion.h1>

            {/* Hairline rule */}
            <motion.div
              variants={VARIANTS.item}
              className="w-16 h-px bg-[#2C2C33] mb-6"
              aria-hidden="true"
            />

            {/* Slogan */}
            <motion.p
              variants={VARIANTS.item}
              className="text-[#8E8F97] text-lg font-body font-light leading-relaxed mb-10 max-w-md"
            >
              Onde o estilo encontra a arte.
              <br />
              <span className="text-[#5A5B63] text-sm">Barbearia · Tatuagem · Piercing · Loja</span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={VARIANTS.item} className="flex items-center gap-4 flex-wrap">
              <Link
                href="/agendar"
                className="inline-flex items-center h-12 px-8 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ECEDF1]"
              >
                Agendar agora
              </Link>
              <Link
                href="/diagnostico"
                className="inline-flex items-center h-12 px-8 border border-[#2C2C33] text-[#8A8B93] text-sm tracking-widest uppercase font-body hover:border-[#5A5B63] hover:text-[#B8B9C0] transition-all duration-200"
              >
                Ver diagnóstico
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={VARIANTS.item}
              className="mt-12 flex items-center gap-8 border-t border-[#2C2C33] pt-8"
            >
              {[
                { value: "6+", label: "anos de estúdio" },
                { value: "1.200+", label: "clientes ativos" },
                { value: "4.9", label: "avaliação média" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-mono text-xl text-[#B8B9C0]">{value}</div>
                  <div className="text-[10px] tracking-widest uppercase text-[#5A5B63] mt-1 font-body">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute inset-0 blur-3xl opacity-20 rounded-full"
                style={{ background: "radial-gradient(circle, #B8B9C0 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <MedusaLogo size={280} className="relative z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#5A5B63] font-body">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#5A5B63] to-transparent" />
      </motion.div>
    </section>
  );
}
