// Dados fictícios para demonstração — Medusa Studio

export interface Service {
  id: string;
  name: string;
  description: string;
  priceFrom: number;
  duration: number; // minutos
  category: "barbearia" | "tatuagem" | "piercing" | "loja";
}

export const services: Service[] = [
  {
    id: "corte-classico",
    name: "Corte Clássico",
    description: "Corte masculino com acabamento navalha e finalização.",
    priceFrom: 55,
    duration: 45,
    category: "barbearia",
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description: "Combo completo: corte, modelagem de barba e toalha quente.",
    priceFrom: 80,
    duration: 70,
    category: "barbearia",
  },
  {
    id: "barba-hot-towel",
    name: "Barba & Hot Towel",
    description: "Modelagem de barba com toalha quente, óleo e acabamento navalha.",
    priceFrom: 45,
    duration: 40,
    category: "barbearia",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação Capilar",
    description: "Tratamento para disfarçar falhas e uniformizar a cor.",
    priceFrom: 90,
    duration: 60,
    category: "barbearia",
  },
  {
    id: "tatuagem-pequena",
    name: "Tatuagem Pequena",
    description: "Até 5 cm. Fine line, blackwork ou geométrico.",
    priceFrom: 180,
    duration: 90,
    category: "tatuagem",
  },
  {
    id: "tatuagem-media",
    name: "Tatuagem Média",
    description: "5–15 cm. Realismo, blackwork, lettering.",
    priceFrom: 350,
    duration: 180,
    category: "tatuagem",
  },
  {
    id: "piercing-helix",
    name: "Piercing Helix",
    description: "Perfuração em cartilagem com joia em aço cirúrgico ou ouro 18k.",
    priceFrom: 80,
    duration: 20,
    category: "piercing",
  },
  {
    id: "piercing-septo",
    name: "Piercing Septo",
    description: "Perfuração no septo nasal. Joia inclusa.",
    priceFrom: 100,
    duration: 20,
    category: "piercing",
  },
];
