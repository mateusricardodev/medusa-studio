import TattooForm from "@/components/tatuagem/TattooForm";
import PortfolioGallery from "@/components/tatuagem/PortfolioGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamento de Tatuagem — Medusa Studio",
  description: "Solicite seu orçamento de tatuagem com briefing completo. Fine line, blackwork, realismo.",
};

export default function TatuagemPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
            Sem "manda no WhatsApp" — briefing direto
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none chrome-title">
            Orçamento de Tatuagem
          </h1>
        </div>

        {/* Layout: galeria esquerda + formulário direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Galeria — sticky no desktop */}
          <div className="lg:sticky lg:top-20">
            <PortfolioGallery />
          </div>

          {/* Formulário */}
          <div>
            <p className="text-[#8E8F97] font-body text-sm mb-8">
              Preencha o briefing abaixo. Retornaremos via WhatsApp com orçamento e disponibilidade em até 24h.
            </p>
            <TattooForm />
          </div>
        </div>
      </div>
    </div>
  );
}
