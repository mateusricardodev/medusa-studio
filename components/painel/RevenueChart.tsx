"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthRevenue } from "@/lib/mock/revenue";

interface Props {
  data: MonthRevenue[];
}

function formatK(value: number) {
  return `R$ ${(value / 1000).toFixed(1)}k`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1A1F] border border-[#2C2C33] px-4 py-3 text-xs font-body">
      <div className="text-[#B8B9C0] font-semibold mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4" style={{ color: p.color }}>
          <span className="text-[#8E8F97]">{p.name}</span>
          <span className="font-mono">R$ {p.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }} barSize={8} barGap={2}>
        <CartesianGrid vertical={false} stroke="#2C2C33" strokeDasharray="0" />
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
        <Bar dataKey="barbearia" name="Barbearia" fill="#5A5B63" radius={[2, 2, 0, 0]} />
        <Bar dataKey="tatuagem" name="Tatuagem" fill="#8A8B93" radius={[2, 2, 0, 0]} />
        <Bar dataKey="piercing" name="Piercing" fill="#B8B9C0" radius={[2, 2, 0, 0]} />
        <Bar dataKey="loja" name="Loja" fill="#ECEDF1" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
