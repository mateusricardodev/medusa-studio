import TattooForm from "@/components/tatuagem/TattooForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamento de Tatuagem — Medusa Studio",
  description: "Solicite seu orçamento de tatuagem com briefing completo. Fine line, blackwork, realismo.",
};

export default function TatuagemPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
          Sem "manda no WhatsApp" — briefing direto
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none chrome-title mb-4">
          Orçamento
        </h1>
        <p className="text-[#8E8F97] font-body text-sm mb-12">
          Preencha o briefing abaixo. Retornaremos via WhatsApp com orçamento e disponibilidade.
        </p>
        <TattooForm />
      </div>
    </div>
  );
}
