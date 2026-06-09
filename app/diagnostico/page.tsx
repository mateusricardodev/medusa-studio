import LossSimulator from "@/components/diagnostico/LossSimulator";
import TridentDivider from "@/components/ui/TridentDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnóstico de Perdas — Medusa Studio System",
  description: "Simule quanto seu estúdio perde por mês com no-shows, agendamento manual e falta de catálogo.",
};

export default function DiagnosticoPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      {/* Top strip — contexto do vendedor */}
      <div className="border-b border-[#2C2C33] bg-[#141417] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C8453B] animate-pulse" aria-hidden="true" />
          <p className="text-[10px] tracking-[0.25em] uppercase font-body text-[#5A5B63]">
            Ferramenta de diagnóstico — use no pitch com o cliente
          </p>
        </div>
      </div>

      <LossSimulator />

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <TridentDivider label="Medusa Studio System" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2C2C33]">
          {[
            {
              num: "01",
              title: "Agendamento online",
              desc: "O cliente agenda em segundos, sem precisar mandar mensagem. Confirmação automática por WhatsApp.",
            },
            {
              num: "02",
              title: "CRM integrado",
              desc: "Histórico completo de cada cliente: serviços, valores, frequência. Relate com quem você quer fidelizar.",
            },
            {
              num: "03",
              title: "Catálogo de produtos",
              desc: "Roupas e tênis com fotos, tamanhos e link direto para WhatsApp. Venda onde o cliente já está.",
            },
          ].map(({ num, title, desc }) => (
            <div key={num} className="bg-[#0B0B0D] p-8">
              <div className="text-[#2C2C33] font-display text-4xl mb-4 select-none" aria-hidden="true">
                {num}
              </div>
              <h3 className="font-display text-lg text-[#E6E6EA] mb-3">{title}</h3>
              <p className="font-body text-sm text-[#8E8F97] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
