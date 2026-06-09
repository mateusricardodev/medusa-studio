"use client";

import { todayAppointments, type AppointmentStatus } from "@/lib/mock/appointments";
import { clients } from "@/lib/mock/clients";
import { revenueByMonth, dashboardMetrics } from "@/lib/mock/revenue";
import RevenueChart from "./RevenueChart";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

const STATUS_STYLE: Record<AppointmentStatus, { label: string; color: string }> = {
  confirmado: { label: "Confirmado", color: "#B8B9C0" },
  concluido: { label: "Concluído", color: "#3FB68B" },
  aguardando: { label: "Aguardando", color: "#8A8B93" },
  "no-show": { label: "No-show", color: "#C8453B" },
};

const TAG_STYLE: Record<string, string> = {
  vip: "#B8B9C0",
  regular: "#5A5B63",
  novo: "#3FB68B",
  inativo: "#C8453B",
};

export default function Dashboard() {
  const todayRevenue = todayAppointments
    .filter((a) => a.status === "concluido")
    .reduce((acc, a) => acc + a.value, 0);

  return (
    <div className="flex flex-col gap-10">
      {/* ── KPI Cards ───────────────────────────────────────────────────────── */}
      <section aria-label="Métricas principais">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2C2C33]">
          <KPICard
            label="Faturamento do mês"
            value={formatCurrency(dashboardMetrics.monthRevenue)}
            sub="Jun 2025"
            accent="chrome"
          />
          <KPICard
            label="Agendamentos hoje"
            value={String(dashboardMetrics.todayAppointments)}
            sub={`R$ ${todayRevenue} faturado`}
            accent="chrome"
          />
          <KPICard
            label="Taxa de no-show"
            value={`${dashboardMetrics.noShowRate}%`}
            sub="Mês atual"
            accent="loss"
          />
          <KPICard
            label="Novos clientes"
            value={String(dashboardMetrics.newClientsThisMonth)}
            sub="Este mês"
            accent="gain"
          />
        </div>
      </section>

      {/* ── Revenue Chart + Schedule ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-[#2C2C33]">
        {/* Chart — col 3 */}
        <section className="lg:col-span-3 bg-[#141417] p-6" aria-labelledby="chart-heading">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-6" id="chart-heading">
            Faturamento — últimos 6 meses
          </div>
          <RevenueChart data={revenueByMonth} />
        </section>

        {/* Today's schedule — col 2 */}
        <section className="lg:col-span-2 bg-[#141417] p-6" aria-labelledby="schedule-heading">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-6" id="schedule-heading">
            Agenda de hoje
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-80">
            {todayAppointments.map((apt) => {
              const s = STATUS_STYLE[apt.status];
              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-3 px-3 py-2.5 border border-[#2C2C33] text-xs font-body"
                >
                  <span className="font-mono text-[#B8B9C0] w-10 shrink-0">{apt.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#E6E6EA] truncate">{apt.client}</div>
                    <div className="text-[#5A5B63] truncate text-[10px]">{apt.service}</div>
                  </div>
                  <span
                    className="text-[9px] tracking-wider uppercase shrink-0"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── CRM Table ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="crm-heading">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-4" id="crm-heading">
          Clientes — CRM
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-[#2C2C33]">
                {["Cliente", "Telefone", "Última visita", "Visitas/ano", "Total gasto", "Tag"].map((h) => (
                  <th
                    key={h}
                    className="text-[9px] tracking-[0.25em] uppercase text-[#5A5B63] text-left py-3 px-4 font-body"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-[#2C2C33] hover:bg-[#141417] transition-colors">
                  <td className="py-3 px-4 text-[#E6E6EA]">{c.name}</td>
                  <td className="py-3 px-4 text-[#8E8F97] font-mono text-xs">{c.phone}</td>
                  <td className="py-3 px-4 text-[#8E8F97] font-mono text-xs">{c.lastVisit}</td>
                  <td className="py-3 px-4 text-[#B8B9C0] font-mono text-center">{c.visitsThisYear}×</td>
                  <td className="py-3 px-4 text-[#B8B9C0] font-mono">{formatCurrency(c.totalSpent)}</td>
                  <td className="py-3 px-4">
                    <span
                      className="text-[9px] tracking-widest uppercase border px-2 py-0.5 font-body"
                      style={{ color: TAG_STYLE[c.tag] ?? "#5A5B63", borderColor: TAG_STYLE[c.tag] ?? "#2C2C33" }}
                    >
                      {c.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function KPICard({
  label, value, sub, accent,
}: {
  label: string; value: string; sub: string; accent: "chrome" | "loss" | "gain";
}) {
  const colorMap = {
    chrome: "#B8B9C0",
    loss: "#C8453B",
    gain: "#3FB68B",
  };
  return (
    <div className="bg-[#141417] p-6">
      <div className="text-[9px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-2">{label}</div>
      <div
        className="font-mono text-2xl leading-none mb-1"
        style={{ color: colorMap[accent] }}
      >
        {value}
      </div>
      <div className="text-[10px] text-[#5A5B63] font-body">{sub}</div>
    </div>
  );
}
