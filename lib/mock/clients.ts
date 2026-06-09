// Dados fictícios para demonstração — Medusa Studio

export interface Client {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  visitsThisYear: number;
  totalSpent: number;
  tag: "vip" | "regular" | "novo" | "inativo";
}

export const clients: Client[] = [
  { id: "c01", name: "Rodrigo Almeida", phone: "(12) 99234-5678", lastVisit: "06/06/2025", visitsThisYear: 18, totalSpent: 1440, tag: "vip" },
  { id: "c02", name: "Thiago Moraes", phone: "(12) 98876-1234", lastVisit: "04/06/2025", visitsThisYear: 12, totalSpent: 960, tag: "vip" },
  { id: "c03", name: "Felipe Santos", phone: "(12) 97654-9012", lastVisit: "03/06/2025", visitsThisYear: 8, totalSpent: 640, tag: "regular" },
  { id: "c04", name: "Gustavo Pereira", phone: "(12) 99123-3456", lastVisit: "01/06/2025", visitsThisYear: 6, totalSpent: 480, tag: "regular" },
  { id: "c05", name: "Lucas Carvalho", phone: "(12) 98765-2345", lastVisit: "07/06/2025", visitsThisYear: 3, totalSpent: 240, tag: "novo" },
  { id: "c06", name: "Diego Ferreira", phone: "(12) 97432-8765", lastVisit: "22/04/2025", visitsThisYear: 2, totalSpent: 160, tag: "inativo" },
  { id: "c07", name: "André Costa", phone: "(12) 99876-5432", lastVisit: "05/06/2025", visitsThisYear: 14, totalSpent: 1120, tag: "vip" },
  { id: "c08", name: "Matheus Lima", phone: "(12) 98543-6789", lastVisit: "02/06/2025", visitsThisYear: 5, totalSpent: 400, tag: "regular" },
  { id: "c09", name: "Bruno Oliveira", phone: "(12) 97890-4321", lastVisit: "06/06/2025", visitsThisYear: 9, totalSpent: 720, tag: "regular" },
  { id: "c10", name: "Victor Nascimento", phone: "(12) 99012-7654", lastVisit: "30/05/2025", visitsThisYear: 1, totalSpent: 80, tag: "novo" },
  { id: "c11", name: "Caio Souza", phone: "(12) 98234-1098", lastVisit: "15/03/2025", visitsThisYear: 1, totalSpent: 55, tag: "inativo" },
  { id: "c12", name: "Ricardo Gomes", phone: "(12) 97567-3210", lastVisit: "04/06/2025", visitsThisYear: 11, totalSpent: 880, tag: "vip" },
];
