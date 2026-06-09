"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ── Parâmetros ajustáveis e seus valores iniciais plausíveis para barbearia ──
const RECOVERY_RATES = {
  noShow: 0.70,       // confirmação automática reduz 70% dos no-shows
  manualTime: 0.80,   // sistema reduz 80% do tempo manual de agendamento
  productSales: 0.90, // catálogo captura 90% das vendas perdidas
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

const SLIDER_CONFIG: {
  key: keyof Params;
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint: string;
}[] = [
  { key: "avgTicket", label: "Ticket médio por atendimento", min: 30, max: 300, step: 5, prefix: "R$", hint: "Valor médio cobrado por serviço" },
  { key: "dailyAppointments", label: "Atendimentos por dia", min: 4, max: 40, step: 1, suffix: "cliente/dia", hint: "Capacidade média do estúdio" },
  { key: "workDaysPerWeek", label: "Dias trabalhados por semana", min: 3, max: 7, step: 1, suffix: "dias/sem", hint: "Dias de operação por semana" },
  { key: "noShowsPerWeek", label: "Faltas (no-shows) por semana", min: 0, max: 30, step: 1, suffix: "faltas/sem", hint: "Agendamentos que não comparecem" },
  { key: "manualHoursPerDay", label: "Horas/dia em agendamento manual", min: 0, max: 8, step: 0.5, suffix: "h/dia", hint: "Tempo gasto respondendo WhatsApp para agendar" },
  { key: "lostProductSalesPerMonth", label: "Vendas de roupa/tênis perdidas/mês", min: 0, max: 100, step: 1, suffix: "unidades", hint: "Vendas perdidas por não ter catálogo" },
  { key: "productTicket", label: "Ticket médio do produto", min: 30, max: 500, step: 10, prefix: "R$", hint: "Preço médio de roupas e tênis" },
  { key: "teamHourlyCost", label: "Custo da hora da equipe", min: 10, max: 80, step: 5, prefix: "R$", hint: "Custo por hora do profissional/atendente" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(frame);
      else prevRef.current = end;
    }

    requestAnimationFrame(frame);
  }, [value]);

  return (
    <span className={className}>
      {formatCurrency(displayed)}
    </span>
  );
}

export default function LossSimulator() {
  const [params, setParams] = useState<Params>(INITIAL);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  function update(key: keyof Params, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  // ── Cálculos de perda ──────────────────────────────────────────────────────
  // Perda com no-shows = faltas/sem × 4.33 × ticket médio
  const noShowLossMonth = params.noShowsPerWeek * 4.33 * params.avgTicket;

  // Custo de tempo manual = horas/dia × dias/sem × 4.33 × custo/hora
  const manualTimeCostMonth = params.manualHoursPerDay * params.workDaysPerWeek * 4.33 * params.teamHourlyCost;

  // Vendas de produto perdidas/mês = unidades × ticket
  const productLossMonth = params.lostProductSalesPerMonth * params.productTicket;

  const totalLossMonth = noShowLossMonth + manualTimeCostMonth + productLossMonth;
  const totalLossYear = totalLossMonth * 12;

  // ── Cálculos de recuperação (estimativas) ─────────────────────────────────
  const noShowRecovery = noShowLossMonth * RECOVERY_RATES.noShow;
  const manualTimeRecovery = manualTimeCostMonth * RECOVERY_RATES.manualTime;
  const productRecovery = productLossMonth * RECOVERY_RATES.productSales;
  const totalRecoveryMonth = noShowRecovery + manualTimeRecovery + productRecovery;
  const totalRecoveryYear = totalRecoveryMonth * 12;

  const waMessage = encodeURIComponent(
    `Olá! Vi o diagnóstico da Medusa Studio e quero saber mais sobre o Medusa Studio System. Minha estimativa de perda mensal é de ${formatCurrency(totalLossMonth)}.`
  );

  return (
    <div ref={ref} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
            Estimativa de impacto financeiro
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] leading-none chrome-title mb-4">
            Diagnóstico
          </h1>
          <p className="text-[#8E8F97] font-body max-w-xl leading-relaxed">
            Ajuste os valores abaixo com os dados reais do seu estúdio. Os resultados são{" "}
            <strong className="text-[#B8B9C0] font-medium">estimativas indicativas</strong> — não garantias.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0">
          {/* ── Left: inputs (col-span 2) ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-2 lg:pr-12 lg:border-r border-[#2C2C33]"
          >
            <div className="flex flex-col gap-8">
              {SLIDER_CONFIG.map(({ key, label, min, max, step, prefix, suffix, hint }, i) => (
                <div key={key}>
                  <div className="flex justify-between items-baseline mb-1">
                    <label
                      htmlFor={`slider-${key}`}
                      className="text-xs font-body text-[#8E8F97] tracking-wide"
                    >
                      {label}
                    </label>
                    <span className="font-mono text-sm text-[#B8B9C0] ml-4 tabular-nums">
                      {prefix}{params[key]}{suffix ? ` ${suffix}` : ""}
                    </span>
                  </div>
                  <input
                    id={`slider-${key}`}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={params[key]}
                    onChange={(e) => update(key, parseFloat(e.target.value))}
                    aria-label={`${label}: ${prefix ?? ""}${params[key]}${suffix ?? ""}`}
                    className="w-full"
                  />
                  <p className="text-[10px] text-[#5A5B63] font-body mt-1">{hint}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: results (col-span 3, sticky) ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3 lg:pl-12"
          >
            <div className="lg:sticky lg:top-24 flex flex-col gap-8">
              {/* Breakdown cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#2C2C33]">
                <LossCard
                  label="Perda com no-shows"
                  value={noShowLossMonth}
                  period="/mês"
                  formula="faltas/sem × 4.33 × ticket"
                />
                <LossCard
                  label="Custo do tempo manual"
                  value={manualTimeCostMonth}
                  period="/mês"
                  formula="h/dia × dias/sem × 4.33 × custo/h"
                />
                <LossCard
                  label="Vendas de produto perdidas"
                  value={productLossMonth}
                  period="/mês"
                  formula="unidades × ticket do produto"
                />
              </div>

              {/* Total loss */}
              <div className="bg-[#141417] border border-[#2C2C33] p-8">
                <div className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-2">
                  Estimativa de perda total
                </div>
                <div className="flex items-end gap-4 mb-2">
                  <AnimatedNumber
                    value={totalLossMonth}
                    className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-none font-semibold"
                    // color set via style below
                  />
                  <span className="font-body text-[#5A5B63] text-sm mb-2">/mês</span>
                </div>
                <div
                  className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-none font-semibold"
                  style={{ color: "var(--loss)" }}
                >
                  <AnimatedNumber value={totalLossYear} />
                  <span className="font-body text-[#5A5B63] text-sm ml-2">/ano</span>
                </div>
                <p className="text-[10px] text-[#5A5B63] font-body mt-3">
                  * Estimativa baseada nos parâmetros acima. Não constitui garantia de resultado.
                </p>
              </div>

              {/* Recovery section */}
              <div className="bg-[#141417] border border-[#2C2C33] p-8">
                <div className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-6">
                  Com o Medusa Studio System — estimativa de recuperação
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <RecoveryLine
                    label="Confirmação automática de agendamentos"
                    detail={`−${Math.round(RECOVERY_RATES.noShow * 100)}% de no-shows`}
                    value={noShowRecovery}
                  />
                  <RecoveryLine
                    label="Agendamento online (sem WhatsApp manual)"
                    detail={`−${Math.round(RECOVERY_RATES.manualTime * 100)}% do tempo manual`}
                    value={manualTimeRecovery}
                  />
                  <RecoveryLine
                    label="Catálogo digital de produtos"
                    detail={`+${Math.round(RECOVERY_RATES.productSales * 100)}% das vendas capturadas`}
                    value={productRecovery}
                  />
                </div>

                <div className="border-t border-[#2C2C33] pt-6">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-2">
                    Recuperação estimada
                  </div>
                  <div
                    className="font-mono text-[clamp(1.8rem,4vw,3rem)] leading-none font-semibold"
                    style={{ color: "var(--gain)" }}
                  >
                    <AnimatedNumber value={totalRecoveryYear} />
                    <span className="font-body text-[#5A5B63] text-sm ml-2">/ano</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/5512991234567?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between h-14 px-8 border border-[#2C2C33] text-[#8A8B93] hover:border-[#5A5B63] hover:text-[#B8B9C0] transition-all duration-200 group"
              >
                <span className="text-xs tracking-widest uppercase font-body">
                  Quero o sistema
                </span>
                <span className="text-[#5A5B63] group-hover:text-[#B8B9C0] transition-colors font-mono text-sm">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LossCard({
  label,
  value,
  period,
  formula,
}: {
  label: string;
  value: number;
  period: string;
  formula: string;
}) {
  return (
    <div className="bg-[#141417] p-5">
      <div className="text-[10px] tracking-wider uppercase text-[#5A5B63] font-body mb-3 leading-tight">
        {label}
      </div>
      <div className="font-mono text-xl text-[#C8453B] tabular-nums">
        {formatCurrency(value)}
        <span className="text-[#5A5B63] text-xs ml-1 font-body">{period}</span>
      </div>
      <div className="text-[9px] text-[#5A5B63] font-mono mt-2 opacity-60">{formula}</div>
    </div>
  );
}

function RecoveryLine({
  label,
  detail,
  value,
}: {
  label: string;
  detail: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-body text-[#8E8F97] truncate">{label}</div>
        <div className="text-[10px] text-[#5A5B63] font-body mt-0.5">{detail}</div>
      </div>
      <div className="font-mono text-sm tabular-nums shrink-0" style={{ color: "var(--gain)" }}>
        +{formatCurrency(value)}
      </div>
    </div>
  );
}
