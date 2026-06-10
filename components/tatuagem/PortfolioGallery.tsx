"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PORTFOLIO = [
  { src: "/portfolio/tattoo-1.png", style: "Anime · Colorido", alt: "Tatuagem Dragon Ball — Goku e Piccolo, estilo anime colorido" },
  { src: "/portfolio/tattoo-2.png", style: "Realismo · Colorido", alt: "Tatuagem lobo com flores — realismo colorido" },
  { src: "/portfolio/tattoo-3.png", style: "Realismo · Aquarela", alt: "Tatuagem tigre — realismo com fundo aquarela" },
  { src: "/portfolio/tattoo-4.png", style: "Blackwork · Realismo", alt: "Tatuagem leão com coroa e relógio — blackwork realismo" },
  { src: "/portfolio/tattoo-5.png", style: "Blackwork · Fineline", alt: "Tatuagem relógio com rosa — blackwork fineline" },
];

export default function PortfolioGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <span className="block w-px h-3 bg-[#5A5B63] shrink-0" aria-hidden="true" />
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body">
          Trabalhos do estúdio
        </span>
      </div>

      {/* Grid masonry em 2 colunas */}
      <div className="columns-2 gap-2 space-y-2">
        {PORTFOLIO.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="break-inside-avoid w-full relative group overflow-hidden block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B8B9C0]"
            aria-label={`Ver ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={500}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 20vw"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#B8B9C0] font-body">
                {item.style}
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[9px] tracking-widest uppercase text-[#5A5B63] font-body mt-4 text-center">
        Clique para ampliar
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0B0D]/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PORTFOLIO[lightbox].src}
                alt={PORTFOLIO[lightbox].alt}
                width={800}
                height={1000}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#5A5B63] font-body">
                  {PORTFOLIO[lightbox].style}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLightbox((l) => (l! > 0 ? l! - 1 : PORTFOLIO.length - 1))}
                    className="text-[#5A5B63] hover:text-[#B8B9C0] transition-colors text-sm font-body"
                    aria-label="Anterior"
                  >
                    ← anterior
                  </button>
                  <button
                    onClick={() => setLightbox((l) => (l! < PORTFOLIO.length - 1 ? l! + 1 : 0))}
                    className="text-[#5A5B63] hover:text-[#B8B9C0] transition-colors text-sm font-body"
                    aria-label="Próximo"
                  >
                    próximo →
                  </button>
                  <button
                    onClick={() => setLightbox(null)}
                    className="text-[#5A5B63] hover:text-[#B8B9C0] transition-colors text-sm font-body ml-4"
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
