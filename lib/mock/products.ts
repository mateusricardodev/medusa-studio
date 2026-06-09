// Dados fictícios para demonstração — Medusa Studio

export interface Product {
  id: string;
  name: string;
  category: "camiseta" | "moletom" | "tenis" | "boné" | "acessorio";
  price: number;
  sizes: string[];
  color: string;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "camiseta-medusa-01",
    name: "Camiseta Medusa Brushed",
    category: "camiseta",
    price: 119,
    sizes: ["P", "M", "G", "GG"],
    color: "Preto",
    description: "100% algodão premium. Estampa serigrafada do glifo Medusa em cromado.",
    badge: "Mais vendida",
  },
  {
    id: "camiseta-tridente-02",
    name: "Camiseta Tridente ψ",
    category: "camiseta",
    price: 109,
    sizes: ["P", "M", "G", "GG", "XGG"],
    color: "Carvão",
    description: "Malha fria. Estampa minimalista do tridente em silk prata.",
  },
  {
    id: "moletom-serpente-01",
    name: "Moletom Serpente",
    category: "moletom",
    price: 229,
    sizes: ["P", "M", "G", "GG"],
    color: "Preto",
    description: "Fleece pesado. Bordado de serpente no peito, sem capuz.",
    badge: "Edição Limitada",
  },
  {
    id: "moletom-hood-02",
    name: "Hoodie Medusa Studio",
    category: "moletom",
    price: 259,
    sizes: ["P", "M", "G", "GG"],
    color: "Carvão",
    description: "Capuz duplo. Silk grande nas costas com a Medusa full.",
  },
  {
    id: "tenis-air-chrome-01",
    name: "Tênis Chrome Low",
    category: "tenis",
    price: 389,
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    color: "Preto/Prata",
    description: "Palmilha foam. Solado vulcanizado. Collab exclusiva Medusa.",
    badge: "Exclusivo",
  },
  {
    id: "tenis-runner-02",
    name: "Tênis Runner Dark",
    category: "tenis",
    price: 349,
    sizes: ["38", "39", "40", "41", "42", "43"],
    color: "All Black",
    description: "Cabedal em mesh respirável. Drop 8mm.",
  },
  {
    id: "bone-snapback-01",
    name: "Boné Snapback ψ",
    category: "boné",
    price: 89,
    sizes: ["Único"],
    color: "Preto",
    description: "Estruturado. Bordado do tridente na frente, Medusa na aba.",
  },
  {
    id: "camiseta-navalha-03",
    name: "Camiseta Navalha",
    category: "camiseta",
    price: 99,
    sizes: ["P", "M", "G", "GG"],
    color: "Cinza Escuro",
    description: "Ilustração técnica de navalha de barbeiro em linework.",
  },
  {
    id: "moletom-zip-03",
    name: "Zip Hoodie Medusa",
    category: "moletom",
    price: 289,
    sizes: ["P", "M", "G", "GG"],
    color: "Preto",
    description: "Zíper YKK. Bolsos funcionais. Bordado lateral discreto.",
    badge: "Novo",
  },
  {
    id: "camiseta-serpente-04",
    name: "Camiseta Serpentes",
    category: "camiseta",
    price: 119,
    sizes: ["P", "M", "G", "GG"],
    color: "Preto",
    description: "Estampa all-over de serpentes em silk matte.",
  },
  {
    id: "tenis-high-01",
    name: "Tênis High Serpente",
    category: "tenis",
    price: 419,
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Branco/Preto",
    description: "Cano alto. Detalhes em couro sintético. Collab studio.",
    badge: "Exclusivo",
  },
  {
    id: "bone-dad-02",
    name: "Dad Hat Medusa",
    category: "boné",
    price: 79,
    sizes: ["Único"],
    color: "Carvão",
    description: "Desestruturado. Bordado vintage da cabeça da Medusa.",
  },
];
