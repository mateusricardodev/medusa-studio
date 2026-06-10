"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products, type Product } from "@/lib/mock/products";

const CATEGORIES = [
  { key: "todos", label: "Todos" },
  { key: "camiseta", label: "Camisetas" },
  { key: "moletom", label: "Moletons" },
  { key: "tenis", label: "Tênis" },
  { key: "boné", label: "Bonés" },
];

const PRICE_RANGES = [
  { key: "todos", label: "Todos os preços", min: 0, max: Infinity },
  { key: "ate100", label: "Até R$ 100", min: 0, max: 100 },
  { key: "100a250", label: "R$ 100–250", min: 100, max: 250 },
  { key: "acima250", label: "Acima de R$ 250", min: 250, max: Infinity },
];

const SORT_OPTIONS = [
  { key: "default", label: "Relevância" },
  { key: "price-asc", label: "Menor preço" },
  { key: "price-desc", label: "Maior preço" },
];

function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function ProductPlaceholder({ category }: { category: Product["category"] }) {
  const colors: Record<string, string> = {
    camiseta: "#1A1A1F",
    moletom: "#141417",
    tenis: "#1A1A1F",
    "boné": "#141417",
    acessorio: "#1A1A1F",
  };

  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="280" height="280" fill={colors[category] ?? "#141417"} />
      {category === "camiseta" && (
        <path d="M90 80 L70 120 L90 125 L90 200 L190 200 L190 125 L210 120 L190 80 L160 95 C155 60 125 60 120 95 Z" stroke="#2C2C33" strokeWidth="1.2" fill="none" />
      )}
      {category === "moletom" && (
        <>
          <path d="M85 90 L65 130 L85 135 L85 205 L195 205 L195 135 L215 130 L195 90 L170 105 C165 68 115 68 110 105 Z" stroke="#2C2C33" strokeWidth="1.2" fill="none" />
          <path d="M110 105 Q140 115 170 105 Q165 80 140 78 Q115 80 110 105 Z" stroke="#2C2C33" strokeWidth="1" fill="none" />
        </>
      )}
      {category === "tenis" && (
        <>
          <ellipse cx="140" cy="180" rx="80" ry="20" stroke="#2C2C33" strokeWidth="1" fill="none" />
          <path d="M70 180 Q80 130 130 120 Q160 115 200 140 L210 180 Z" stroke="#2C2C33" strokeWidth="1.2" fill="none" />
          <path d="M100 140 Q130 125 160 130" stroke="#2C2C33" strokeWidth="0.8" fill="none" />
        </>
      )}
      {category === "boné" && (
        <>
          <path d="M90 140 Q90 90 140 85 Q190 90 190 140 Z" stroke="#2C2C33" strokeWidth="1.2" fill="none" />
          <path d="M80 142 L200 142 L210 150 L70 150 Z" stroke="#2C2C33" strokeWidth="1" fill="none" />
        </>
      )}
      <text x="140" y="150" textAnchor="middle" fontSize="40" fill="#2C2C33" opacity="0.5" fontFamily="serif">ψ</text>
    </svg>
  );
}

function ProductImage({ product }: { product: Product }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    );
  }
  return <ProductPlaceholder category={product.category} />;
}

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [activePriceRange, setActivePriceRange] = useState("todos");
  const [activeSort, setActiveSort] = useState("default");
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});

  const priceRange = PRICE_RANGES.find((r) => r.key === activePriceRange)!;

  let filtered = (activeCategory === "todos" ? products : products.filter((p) => p.category === activeCategory))
    .filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

  if (activeSort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  function buildWAMessage(p: Product) {
    const size = selectedSize[p.id] ?? "—";
    return encodeURIComponent(
      `Olá! Tenho interesse no produto da Medusa Studio:\n\n` +
      `👕 Produto: ${p.name}\n` +
      `💰 Preço: R$ ${formatPrice(p.price)}\n` +
      `📏 Tamanho: ${size}\n\n` +
      `Gostaria de mais informações sobre disponibilidade!`
    );
  }

  return (
    <div>
      {/* Filtro por categoria */}
      <div className="flex gap-2 mb-4 flex-wrap" role="group" aria-label="Filtrar por categoria">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 text-xs tracking-widest uppercase font-body border transition-all ${
              activeCategory === key
                ? "border-[#B8B9C0] text-[#B8B9C0]"
                : "border-[#2C2C33] text-[#5A5B63] hover:border-[#5A5B63] hover:text-[#8A8B93]"
            }`}
            aria-pressed={activeCategory === key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filtro por preço + ordenação */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-5 border-b border-[#2C2C33]">
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrar por preço">
          {PRICE_RANGES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActivePriceRange(key)}
              className={`px-3 py-1.5 text-[10px] tracking-widest uppercase font-body border transition-all ${
                activePriceRange === key
                  ? "border-[#B8B9C0] text-[#B8B9C0]"
                  : "border-[#2C2C33] text-[#5A5B63] hover:border-[#5A5B63] hover:text-[#8A8B93]"
              }`}
              aria-pressed={activePriceRange === key}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-[#0B0B0D] border border-[#2C2C33] text-[#5A5B63] text-[10px] tracking-widest uppercase font-body px-3 py-1.5 focus:outline-none focus:border-[#B8B9C0] focus:text-[#B8B9C0] transition-all cursor-pointer appearance-none"
          >
            {SORT_OPTIONS.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[#5A5B63] text-xs font-body tracking-wide text-center py-20">
          Nenhum produto encontrado para os filtros selecionados.
        </p>
      ) : (
        <>
          <p className="text-[#5A5B63] text-[10px] font-body tracking-widest uppercase mb-4">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#2C2C33]">
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-[#0B0B0D] flex flex-col"
              >
                {/* Imagem */}
                <div className="aspect-square relative overflow-hidden bg-[#141417]">
                  <ProductImage product={product} />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#2C2C33] text-[#B8B9C0] text-[9px] tracking-widest uppercase px-2 py-1 font-body">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h2 className="font-body font-medium text-sm text-[#E6E6EA] leading-tight">{product.name}</h2>
                    <p className="text-[10px] text-[#5A5B63] font-body mt-1 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Seletor de tamanho */}
                  {product.sizes.length > 1 && (
                    <div>
                      <p className="text-[9px] tracking-widest uppercase text-[#5A5B63] font-body mb-1">Tamanho</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize((s) => ({ ...s, [product.id]: size }))}
                            className={`text-[10px] font-mono px-2 py-0.5 border transition-all ${
                              selectedSize[product.id] === size
                                ? "border-[#B8B9C0] text-[#B8B9C0]"
                                : "border-[#2C2C33] text-[#5A5B63] hover:border-[#5A5B63]"
                            }`}
                            aria-label={`Tamanho ${size}`}
                            aria-pressed={selectedSize[product.id] === size}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="font-mono text-base text-[#B8B9C0] mb-3">R$ {formatPrice(product.price)}</div>
                    <a
                      href={`https://wa.me/5512991234567?text=${buildWAMessage(product)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-9 border border-[#2C2C33] text-[#5A5B63] text-[10px] tracking-widest uppercase font-body hover:border-[#5A5B63] hover:text-[#B8B9C0] transition-all"
                    >
                      Tenho interesse
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
