"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const RECOVERY_RATES = {
  noShow: 0.70,
  manualTime: 0.80,
  productSales: 0.90,
};

interface Params {
  avgTicket: number;
  dailyAppointments: number;
  workDaysPerWeek: number;
  noShowsPerWeek: number;
  manualHoursPerDay: number;
  lostProductSalesPerMonth: number;
  productTicket: number;
  teamHourlyCost: number;
}

const INITIAL: Params = {
  avgTicket: 60,
  dailyAppointments: 12,
  workDaysPerWeek: 6,
  noShowsPerWeek: 8,
  manualHoursPerDay: 2,
  lostProductSalesPerMonth: 20,
  productTicket: 90,
  teamHourlyCost: 20,
};

const SLIDER_GROUPS: {
  title: string;
  sliders: {
    key: keyof Params;
    label: string;
    min: number;
    max: number;
    step: number;
    fmt: (v: number) => string;
  }[];
}[] = [
  {
    title: "Seu estúdio",
    sliders: [
      { key: "avgTicket", label: "Ticket médio por serviço", min: 30, max: 300, step: 5, fmt: (v) => `R$ ${v}` },
      { key: "dailyAppointments", label: "Atendimentos por dia", min: 4, max: 40, step: 1, fmt: (v) => `${v}/dia` },
      { key: "workDaysPerWeek", label: "Dias trabalhados por semana", min: 3, max: 7, step: 1, fmt: (v) => `${v} dias` },
      { key: "teamHourlyCost", label: "Custo da hora da equipe", min: 10, max: 80, step: 5, fmt: (v) => `R$ ${v}/h` },
    ],
  },
  {
    title: "Suas perdas",
    sliders: [
      { key: "noShowsPerWeek", label: "Faltas (no-shows) por semana", min: 0, max: 30, step: 1, fmt: (v) => `${v}/sem` },
      { key: "manualHoursPerDay", label: "Horas/dia no WhatsApp manual", min: 0, max: 8, step: 0.5, fmt: (v) => `${v}h/dia` },
      { key: "lostProductSalesPerMonth", label: "Vendas de produto perdidas/mês", min: 0, max: 100, step: 1, fmt: (v) => `${v} unid.` },
      { key: "productTicket", label: "Ticket médio do produto", min: 30, max: 500, step: 10, fmt: (v) => `R$ ${v}` },
    ],
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function AnimatedNumber({
  value,
  className,
  style,
}: {
  value: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (t < 1) requestAnimationFrame(frame);
      else prevRef.current = end;
    }

    requestAnimationFrame(frame);
  }, [value]);

  return (
    <span className={className} style={style}>
      {formatCurrency(displayed)}
    </span>
  );
}

function SliderRow({
  id,
  label,
  min,
  max,
  step,
  value,
  fmt,
  onChange,
  index,
  inView,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  fmt: (v: number) => string;
  onChange: (v: number) => void;
  index: number;
  inView: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
    >
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor={id} className="text-[11px] font-body text-[#8E8F97] leading-none">
          {label}
        </label>
        <span className="font-mono text-[13px] text-[#E6E6EA] tabular-nums">{fmt(value)}</span>
      </div>
      <div className="relative h-px bg-[#2C2C33] mt-3 mb-1">
        <div
          className="absolute top-0 left-0 h-px bg-[#5A5B63] transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-3"
          aria-label={`${label}: ${fmt(value)}`}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B8B9C0] border border-[#0B0B0D] pointer-events-none transition-all duration-150"
          style={{ left: `calc(${pct}% - 5px)` }}
        />
      </div>
    </motion.div>
  );
}

export default function LossSimulator() {
  const [params, setParams] = useState<Params>(INITIAL);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  function update(key: keyof Params, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  const noShowLossMonth = params.noShowsPerWeek * 4.33 * params.avgTicket;
  const manualTimeCostMonth =
    params.manualHoursPerDay * params.workDaysPerWeek * 4.33 * params.teamHourlyCost;
  const productLossMonth = params.lostProductSalesPerMonth * params.productTicket;
  const totalLossMonth = noShowLossMonth + manualTimeCostMonth + productLossMonth;
  const totalLossYear = totalLossMonth * 12;

  const noShowRecovery = noShowLossMonth * RECOVERY_RATES.noShow;
  const manualTimeRecovery = manualTimeCostMonth * RECOVERY_RATES.manualTime;
  const productRecovery = productLossMonth * RECOVERY_RATES.productSales;
  const totalRecoveryMonth = noShowRecovery + manualTimeRecovery + productRecovery;
  const totalRecoveryYear = totalRecoveryMonth * 12;

  const losses = [
    {
      label: "No-shows",
      sub: "faltas não confirmadas",
      value: noShowLossMonth,
      recovery: noShowRecovery,
      rate: RECOVERY_RATES.noShow,
    },
    {
      label: "Tempo manual",
      sub: "WhatsApp para agendar",
      value: manualTimeCostMonth,
      recovery: manualTimeRecovery,
      rate: RECOVERY_RATES.manualTime,
    },
    {
      label: "Produtos",
      sub: "sem catálogo digital",
      value: productLossMonth,
      recovery: productRecovery,
      rate: RECOVERY_RATES.productSales,
    },
  ];

  const waMessage = encodeURIComponent(
    `Olá! Fiz o diagnóstico da Medusa Studio e minha perda estimada é de ${formatCurrency(totalLossMonth)}/mês. Quero saber mais sobre o sistema.`
  );

  return (
    <div ref={ref} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
            Estimativa de impacto financeiro
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] leading-none chrome-title mb-4">
            Diagnóstico
          </h1>
          <p className="text-[#8E8F97] font-body max-w-xl leading-relaxed text-sm">
            Ajuste os valores com a realidade do seu estúdio. Os resultados são{" "}
            <strong className="text-[#B8B9C0] font-medium">estimativas indicativas</strong> — não garantias.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* ── Inputs ── */}
          <div className="lg:col-span-2 lg:pr-14 lg:border-r border-[#2C2C33] mb-14 lg:mb-0">
            <div className="flex flex-col gap-12">
              {SLIDER_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-[#5A5B63] font-body pb-3 mb-6 border-b border-[#2C2C33]">
                    {group.title}
                  </p>
                  <div className="flex flex-col gap-7">
                    {group.sliders.map(({ key, label, min, max, step, fmt }, i) => (
                      <SliderRow
                        key={key}
                        id={`slider-${key}`}
                        label={label}
                        min={min}
                        max={max}
                        step={step}
                        value={params[key]}
                        fmt={fmt}
                        onChange={(v) => update(key, v)}
                        index={i}
                        inView={inView}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Results ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 lg:pl-14"
          >
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              {/* Hero: total loss */}
              <div className="border border-[#2C2C33] p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#5A5B63] font-body mb-5">
                  Perda estimada por mês
                </p>
                <AnimatedNumber
                  value={totalLossMonth}
                  className="font-mono font-semibold tabular-nums block"
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                    lineHeight: 1,
                    color: "#C8453B",
                  }}
                />
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[#5A5B63] text-xs font-body">ou</span>
                  <AnimatedNumber
                    value={totalLossYear}
                    className="font-mono text-lg font-medium tabular-nums text-[#C8453B]"
                  />
                  <span className="text-[#5A5B63] text-xs font-body">por ano</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="border border-[#2C2C33]">
                <div className="px-6 py-4 border-b border-[#2C2C33]">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-[#5A5B63] font-body">
                    De onde vêm as perdas
                  </p>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  {losses.map(({ label, sub, value, rate }) => {
                    const pct = totalLossMonth > 0 ? (value / totalLossMonth) * 100 : 0;
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-body text-[#E6E6EA]">{label}</span>
                            <span className="text-[10px] font-body text-[#5A5B63] ml-2">{sub}</span>
                          </div>
                          <span className="font-mono text-sm text-[#C8453B] tabular-nums shrink-0 ml-4">
                            {formatCurrency(value)}
                          </span>
                        </div>
                        <div className="relative h-px bg-[#2C2C33]">
                          <motion.div
                            className="absolute top-0 left-0 h-px bg-[#C8453B]"
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        </div>
                        <div className="mt-1.5 flex justify-between">
                          <span className="text-[10px] text-[#5A5B63] font-body">
                            {Math.round(pct)}% do total
                          </span>
                          <span className="text-[10px] font-body" style={{ color: "#3FB68B" }}>
                            {Math.round(rate * 100)}% recuperável
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recovery */}
              <div className="border p-6" style={{ borderColor: "rgba(63,182,139,0.2)", background: "rgba(63,182,139,0.04)" }}>
                <p
                  className="text-[9px] tracking-[0.4em] uppercase font-body mb-5"
                  style={{ color: "#3FB68B" }}
                >
                  Com o sistema — recuperação estimada
                </p>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    {
                      label: "Confirmação automática",
                      detail: `−${Math.round(RECOVERY_RATES.noShow * 100)}% de no-shows`,
                      value: noShowRecovery,
                    },
                    {
                      label: "Agendamento online",
                      detail: `−${Math.round(RECOVERY_RATES.manualTime * 100)}% do tempo manual`,
                      value: manualTimeRecovery,
                    },
                    {
                      label: "Catálogo digital",
                      detail: `+${Math.round(RECOVERY_RATES.productSales * 100)}% das vendas capturadas`,
                      value: productRecovery,
                    },
                  ].map(({ label, detail, value }) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-body text-[#8E8F97]">{label}</div>
                        <div className="text-[10px] text-[#5A5B63] font-body">{detail}</div>
                      </div>
                      <div
                        className="font-mono text-sm tabular-nums shrink-0"
                        style={{ color: "#3FB68B" }}
                      >
                        +{formatCurrency(value)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-5" style={{ borderColor: "rgba(63,182,139,0.15)" }}>
                  <div className="flex items-end gap-3">
                    <AnimatedNumber
                      value={totalRecoveryYear}
                      className="font-mono font-semibold tabular-nums"
                      style={{
                        fontSize: "clamp(1.6rem,4vw,2.4rem)",
                        lineHeight: 1,
                        color: "#3FB68B",
                      }}
                    />
                    <span className="text-[#5A5B63] text-xs font-body mb-1">/ano de volta</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/5512991234567?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between h-14 px-8 border border-[#2C2C33] text-[#5A5B63] hover:border-[#B8B9C0] hover:text-[#B8B9C0] transition-all duration-200 group"
              >
                <span className="text-[10px] tracking-widest uppercase font-body">
                  Quero o sistema
                </span>
                <span className="font-mono text-sm transition-colors group-hover:text-[#B8B9C0]">
                  →
                </span>
              </a>

              <p className="text-[10px] text-[#5A5B63] font-body text-center">
                * Estimativas com base nos parâmetros acima. Não constituem garantia de resultado.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
