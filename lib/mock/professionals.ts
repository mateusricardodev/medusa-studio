// Dados fictícios para demonstração — Medusa Studio

export interface Professional {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  categories: ("barbearia" | "tatuagem" | "piercing")[]; // 🚀 Adicionado para o filtro funcionar
}

export const professionals: Professional[] = [
  {
    id: "kaique",
    name: "Kaique Mendes",
    role: "Barbeiro Sênior",
    specialties: ["Corte Clássico", "Barba", "Pigmentação"],
    rating: 4.9,
    reviewCount: 312,
    categories: ["barbearia"], // 🚀 Só aparece em Barbearia
  },
  {
    id: "rafael",
    name: "Rafael Siqueira",
    role: "Barbeiro & Tatuador",
    specialties: ["Corte", "Tatuagem Fine Line", "Blackwork"],
    rating: 4.8,
    reviewCount: 198,
    categories: ["barbearia", "tatuagem"], // 🚀 Aparece em Barbearia e Tatuagem
  },
  {
    id: "lucas",
    name: "Lucas Tavares",
    role: "Tatuador & Piercer",
    specialties: ["Realismo", "Piercing", "Geométrico"],
    rating: 4.9,
    reviewCount: 245,
    categories: ["tatuagem", "piercing"], // 🚀 Aparece em Tatuagem e Piercing
  },
];