"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
      {/* Foto da fachada — lateral direita, tela toda, absolutamente posicionada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
        aria-hidden="true"
      >
        <Image
          src="/fachada.webp"
          alt="Fachada do Medusa Studio — Jardim Motorama, São José dos Campos"
          fill
          className="object-cover object-center"
          priority
        />
        {/* fade esquerda — funde com o conteúdo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0B0B0D 0%, transparent 35%)" }}
        />
        {/* fade inferior */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0B0B0D 0%, transparent 25%)" }}
        />
        {/* caption */}
        <div className="absolute bottom-6 right-6 text-[9px] tracking-[0.25em] uppercase text-[#5A5B63] font-body">
          Jardim Motorama · SJC
        </div>
      </motion.div>

      {/* Subtle radial glow sobre o texto */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(44,44,51,0.55) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Coluna esquerda — conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="lg:w-1/2">
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
          </motion.div>
        </div>
      </div>

    </section>
  );
}
