import ProductGrid from "@/components/loja/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loja — Medusa Studio",
  description: "Roupas e tênis exclusivos do Medusa Studio. Camisetas, moletons e collabs limitadas.",
};

export default function LojaPage() {
  return (
    <div className="pt-14 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
          Exclusivo do estúdio
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none chrome-title mb-4">
          Loja
        </h1>
        <p className="text-[#8E8F97] font-body text-sm mb-12">
          Peças em quantidade limitada. Clique para comprar via WhatsApp.
        </p>
        <ProductGrid />
      </div>
    </div>
  );
}
