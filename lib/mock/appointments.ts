// Dados fictícios para demonstração — Medusa Studio

export type AppointmentStatus = "confirmado" | "concluido" | "aguardando" | "no-show";

export interface Appointment {
  id: string;
  time: string;
  client: string;
  service: string;
  professional: string;
  status: AppointmentStatus;
  value: number;
}

export const todayAppointments: Appointment[] = [
  { id: "a01", time: "08:00", client: "Lucas Carvalho", service: "Corte Clássico", professional: "Kaique Mendes", status: "concluido", value: 55 },
  { id: "a02", time: "08:45", client: "Bruno Oliveira", service: "Corte + Barba", professional: "Kaique Mendes", status: "concluido", value: 80 },
  { id: "a03", time: "09:30", client: "Ricardo Gomes", service: "Tatuagem Fine Line", professional: "Rafael Siqueira", status: "concluido", value: 180 },
  { id: "a04", time: "10:15", client: "Felipe Santos", service: "Barba & Hot Towel", professional: "Kaique Mendes", status: "concluido", value: 45 },
  { id: "a05", time: "11:00", client: "André Costa", service: "Corte Clássico", professional: "Rafael Siqueira", status: "concluido", value: 55 },
  { id: "a06", time: "11:45", client: "Matheus Lima", service: "Piercing Helix", professional: "Lucas Tavares", status: "no-show", value: 80 },
  { id: "a07", time: "13:00", client: "Rodrigo Almeida", service: "Corte + Barba", professional: "Kaique Mendes", status: "confirmado", value: 80 },
  { id: "a08", time: "13:45", client: "Thiago Moraes", service: "Pigmentação Capilar", professional: "Rafael Siqueira", status: "confirmado", value: 90 },
  { id: "a09", time: "14:30", client: "Diego Ferreira", service: "Tatuagem Média", professional: "Lucas Tavares", status: "confirmado", value: 350 },
  { id: "a10", time: "15:15", client: "Gustavo Pereira", service: "Corte Clássico", professional: "Kaique Mendes", status: "aguardando", value: 55 },
  { id: "a11", time: "16:00", client: "Caio Souza", service: "Barba & Hot Towel", professional: "Rafael Siqueira", status: "aguardando", value: 45 },
  { id: "a12", time: "16:45", client: "Victor Nascimento", service: "Piercing Septo", professional: "Lucas Tavares", status: "aguardando", value: 100 },
];
