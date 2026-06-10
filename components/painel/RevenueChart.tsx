"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthRevenue } from "@/lib/mock/revenue";

interface Props {
  data: MonthRevenue[];
}

function formatK(value: number) {
  return `R$${(value / 1000).toFixed(0)}k`;
}

const BAR_SERIES = [
  { key: "barbearia", label: "Barbearia", color: "#B8B9C0" },
  { key: "tatuagem",  label: "Tatuagem",  color: "#3FB68B" },
  { key: "piercing",  label: "Piercing",  color: "#8A8B93" },
  { key: "loja",      label: "Loja",      color: "#ECEDF1" },
] as const;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F0F12] border border-[#2C2C33] px-4 py-3 text-xs font-body min-w-[160px]">
      <div className="text-[9px] tracking-[0.25em] uppercase text-[#5A5B63] font-body mb-3">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-6 mb-1">
          <span className="text-[#8E8F97]">{p.name}</span>
          <span className="font-mono tabular-nums" style={{ color: p.color }}>
            R$ {p.value.toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex gap-5 justify-end pt-4">
    {payload?.map((entry: any) => (
      <div key={entry.value} className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: entry.color }} />
        <span className="text-[10px] text-[#5A5B63] font-body uppercase tracking-wider">
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -16, bottom: 0 }} barSize={7} barGap={2} barCategoryGap="30%">
        <CartesianGrid vertical={false} stroke="#1E1E24" strokeDasharray="0" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#5A5B63", fontSize: 10, fontFamily: "var(--font-archivo)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatK}
          tick={{ fill: "#5A5B63", fontSize: 10, fontFamily: "var(--font-jetbrains)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#141417" }} />
        <Legend content={<CustomLegend />} />
        {BAR_SERIES.map(({ key, label, color }) => (
          <Bar key={key} dataKey={key} name={label} fill={color} radius={[2, 2, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
