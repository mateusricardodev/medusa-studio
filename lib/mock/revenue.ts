// Dados fictícios para demonstração — Medusa Studio

export interface MonthRevenue {
  month: string;
  barbearia: number;
  tatuagem: number;
  piercing: number;
  loja: number;
  total: number;
}

export const revenueByMonth: MonthRevenue[] = [
  { month: "Jan", barbearia: 8200, tatuagem: 3400, piercing: 960, loja: 1800, total: 14360 },
  { month: "Fev", barbearia: 7600, tatuagem: 4100, piercing: 800, loja: 2100, total: 14600 },
  { month: "Mar", barbearia: 9100, tatuagem: 3800, piercing: 1120, loja: 2400, total: 16420 },
  { month: "Abr", barbearia: 9800, tatuagem: 5200, piercing: 960, loja: 2700, total: 18660 },
  { month: "Mai", barbearia: 10200, tatuagem: 4900, piercing: 1280, loja: 3100, total: 19480 },
  { month: "Jun", barbearia: 11400, tatuagem: 5800, piercing: 1440, loja: 3600, total: 22240 },
];

export const dashboardMetrics = {
  monthRevenue: 22240,
  todayAppointments: 12,
  noShowRate: 8.3,
  newClientsThisMonth: 14,
  avgTicket: 72,
};
