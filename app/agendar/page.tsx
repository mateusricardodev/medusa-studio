import AgendarFlow from "@/components/agendar/AgendarFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar — Medusa Studio",
  description: "Agende seu horário online. Barbearia, tatuagem e piercing.",
};

export default function AgendarPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
          Disponibilidade em tempo real
        </p>
        <h1
          className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none chrome-title mb-12"
        >
          Agendar
        </h1>
        <AgendarFlow />
      </div>
    </div>
  );
}
