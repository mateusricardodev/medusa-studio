// Dados fictícios para demonstração — Medusa Studio

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Rodrigo A.",
    rating: 5,
    text: "Melhor barbearia de SJC. O Kaique tem um domínio absurdo na navalha. Saí com o acabamento mais limpo da vida.",
    service: "Corte + Barba",
    date: "Mai 2025",
  },
  {
    id: "r2",
    name: "Thiago M.",
    rating: 5,
    text: "Fiz uma fine line com o Rafael e ficou exatamente o que eu pedi. O espaço é outro nível — escuro, bem montado, sem aquele barulho de bagunça.",
    service: "Tatuagem Fine Line",
    date: "Abr 2025",
  },
  {
    id: "r3",
    name: "Felipe S.",
    rating: 5,
    text: "Hot towel shave puro ritual. Nunca tinha feito, agora não consigo parar. O ambiente já coloca no mood certo antes de sentar na cadeira.",
    service: "Barba & Hot Towel",
    date: "Mai 2025",
  },
  {
    id: "r4",
    name: "Gustavo P.",
    rating: 5,
    text: "Comprei um tênis e uma camiseta. Qualidade diferenciada — nada de China barata. E o atendimento foi tão bom quanto o do corte.",
    service: "Loja",
    date: "Jun 2025",
  },
];
