// Dados fictícios para demonstração — Medusa Studio

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function getSlots(professionalId: string, date: string): TimeSlot[] {
  // Simula slots com base em um hash do profissional + data para parecer real
  const seed = (professionalId + date).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const times = [
    "08:00", "08:45", "09:30", "10:15", "11:00", "11:45",
    "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15",
  ];
  return times.map((time, i) => ({
    time,
    available: (seed + i * 7) % 3 !== 0, // ~33% ocupado
  }));
}
