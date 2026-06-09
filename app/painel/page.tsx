import Dashboard from "@/components/painel/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel — Medusa Studio",
  description: "Painel de controle do estúdio. Agenda, CRM e faturamento.",
};

export default function PainelPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      <div className="border-b border-[#2C2C33] bg-[#141417] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3FB68B] animate-pulse" aria-hidden="true" />
          <p className="text-[10px] tracking-[0.25em] uppercase font-body text-[#5A5B63]">
            Painel administrativo — dados de demonstração
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
          Visão geral
        </p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none chrome-title mb-10">
          Painel
        </h1>
        <Dashboard />
      </div>
    </div>
  );
}
