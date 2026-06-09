// Dados fictícios para demonstração — Medusa Studio

export interface Professional {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

export const professionals: Professional[] = [
  {
    id: "kaique",
    name: "Kaique Mendes",
    role: "Barbeiro Sênior",
    specialties: ["Corte Clássico", "Barba", "Pigmentação"],
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "rafael",
    name: "Rafael Siqueira",
    role: "Barbeiro & Tatuador",
    specialties: ["Corte", "Tatuagem Fine Line", "Blackwork"],
    rating: 4.8,
    reviewCount: 198,
  },
  {
    id: "lucas",
    name: "Lucas Tavares",
    role: "Tatuador & Piercer",
    specialties: ["Realismo", "Piercing", "Geométrico"],
    rating: 4.9,
    reviewCount: 245,
  },
];
