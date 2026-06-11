"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/mock/services";
import { professionals } from "@/lib/mock/professionals";
import { getSlots } from "@/lib/mock/slots";

type Category = "barbearia" | "tatuagem" | "piercing";
type Step = "categoria" | "servico" | "profissional" | "data" | "horario" | "dados" | "confirmado";

interface Booking {
  serviceId: string;
  professionalId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
}

const STEPS: Step[] = ["categoria", "servico", "profissional", "data", "horario", "dados", "confirmado"];
const PROGRESS_STEPS = STEPS.filter((s) => s !== "confirmado");

const STEP_LABELS: Record<Step, string> = {
  categoria: "Categoria",
  servico: "Serviço",
  profissional: "Profissional",
  data: "Data",
  horario: "Horário",
  dados: "Dados",
  confirmado: "Confirmado",
};

const CATEGORIES: { id: Category; label: string; sub: string; description: string }[] = [
  {
    id: "barbearia",
    label: "Barbearia",
    sub: "Corte · Barba · Pigmentação",
    description: "Cortes masculinos, modelagem de barba, hot towel shave e tratamentos capilares.",
  },
  {
    id: "tatuagem",
    label: "Tatuagem",
    sub: "Fine Line · Blackwork · Realismo",
    description: "Do pequeno ao grande. Cada trabalho pensado antes de ser executado.",
  },
  {
    id: "piercing",
    label: "Piercing",
    sub: "Helix · Septo · Daith · Industrial",
    description: "Perfuração precisa com material cirúrgico certificado. Joias inclusas.",
  },
];

function formatDateBR(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function buildWAMessage(b: Booking, serviceName: string, professionalName: string) {
  return encodeURIComponent(
    `Olá! Quero confirmar meu agendamento na Medusa Studio:\n\n` +
    `📋 Serviço: ${serviceName}\n` +
    `💈 Profissional: ${professionalName}\n` +
    `📅 Data: ${formatDateBR(b.date)}\n` +
    `⏰ Horário: ${b.time}\n` +
    `👤 Nome: ${b.name}\n` +
    `📱 Telefone: ${b.phone}`
  );
}

const slideVariants = {
  enter: { opacity: 0 as number, x: 24 as number },
  center: { opacity: 1 as number, x: 0 as number, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0 as number, x: -24 as number, transition: { duration: 0.2, ease: "easeIn" as const } },
};

export default function AgendarFlow() {
  const [step, setStep] = useState<Step>("categoria");
  const [category, setCategory] = useState<Category | null>(null);
  const [booking, setBooking] = useState<Partial<Booking>>({});

  const currentIndex = STEPS.indexOf(step);

  function goTo(s: Step) { setStep(s); }

  const categoryServices = services.filter((s) => s.category === category);
  const selectedService = categoryServices.find((s) => s.id === booking.serviceId);
  
  // 🚀 Lógica atualizada: Filtra os profissionais verificando se a categoria selecionada está inclusa na lista deles
  const filteredProfessionals = professionals.filter((p) => 
    p.categories?.includes(category as any)
  );

  const selectedProfessional = professionals.find((p) => p.id === booking.professionalId);
  const slots = booking.professionalId && booking.date
    ? getSlots(booking.professionalId, booking.date)
    : [];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      {/* Barra de progresso */}
      {step !== "confirmado" && (
        <div className="mb-10">
          <div className="flex items-center gap-0 mb-4">
            {PROGRESS_STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors ${
                    currentIndex > i
                      ? "border-[#B8B9C0] bg-[#B8B9C0] text-[#0B0B0D]"
                      : currentIndex === i
                      ? "border-[#B8B9C0] text-[#B8B9C0]"
                      : "border-[#2C2C33] text-[#5A5B63]"
                  }`}
                >
                  {currentIndex > i ? "✓" : i + 1}
                </div>
                {i < PROGRESS_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px transition-colors ${
                      currentIndex > i ? "bg-[#B8B9C0]" : "bg-[#2C2C33]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] tracking-widest uppercase text-[#5A5B63] font-body">
            {PROGRESS_STEPS.map((s) => (
              <span key={s}>{STEP_LABELS[s]}</span>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >

          {/* ── Etapa 1: Categoria ── */}
          {step === "categoria" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-2">O que você quer fazer?</h2>
              <p className="text-xs text-[#5A5B63] font-body mb-6">Escolha a categoria para ver os serviços disponíveis.</p>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      setBooking({});
                      goTo("servico");
                    }}
                    className={`flex items-center justify-between px-5 py-5 border text-left transition-all group ${
                      category === cat.id
                        ? "border-[#B8B9C0] bg-[#1A1A1F]"
                        : "border-[#2C2C33] bg-[#141417] hover:border-[#5A5B63]"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-body font-semibold text-base text-[#E6E6EA] mb-1">{cat.label}</div>
                      <div className="font-body text-xs text-[#5A5B63]">{cat.description}</div>
                    </div>
                    <div className="ml-6 text-right shrink-0">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#5A5B63] font-body">{cat.sub}</div>
                      <div className="text-[#5A5B63] group-hover:text-[#B8B9C0] transition-colors text-sm mt-1">→</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Etapa 2: Serviço ── */}
          {step === "servico" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-2">Qual serviço?</h2>
              <p className="text-xs text-[#5A5B63] font-body mb-6 capitalize">
                {CATEGORIES.find((c) => c.id === category)?.label} — {categoryServices.length} serviços disponíveis
              </p>
              <div className="flex flex-col gap-2">
                {categoryServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setBooking({ ...booking, serviceId: s.id }); goTo("profissional"); }}
                    className={`flex items-center justify-between px-5 py-4 border text-left transition-all ${
                      booking.serviceId === s.id
                        ? "border-[#B8B9C0] bg-[#1A1A1F]"
                        : "border-[#2C2C33] bg-[#141417] hover:border-[#5A5B63]"
                    }`}
                  >
                    <div>
                      <div className="font-body text-sm text-[#E6E6EA]">{s.name}</div>
                      <div className="font-body text-xs text-[#5A5B63] mt-0.5">{s.description}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="font-mono text-sm text-[#B8B9C0]">R$ {s.priceFrom}+</div>
                      <div className="text-[10px] text-[#5A5B63] font-body">{s.duration} min</div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => goTo("categoria")} className="mt-6 text-xs text-[#5A5B63] font-body hover:text-[#8A8B93] transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── Etapa 3: Profissional ── */}
          {step === "profissional" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-6">Com quem?</h2>
              <div className="flex flex-col gap-3">
                {/* 🚀 Renderiza apenas os profissionais filtrados pela categoria escolhida */}
                {filteredProfessionals.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setBooking({ ...booking, professionalId: p.id }); goTo("data"); }}
                    className={`flex items-start gap-4 px-5 py-4 border text-left transition-all ${
                      booking.professionalId === p.id
                        ? "border-[#B8B9C0] bg-[#1A1A1F]"
                        : "border-[#2C2C33] bg-[#141417] hover:border-[#5A5B63]"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-[#2C2C33] flex items-center justify-center shrink-0 font-display text-sm text-[#B8B9C0]"
                      aria-hidden="true"
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-body font-medium text-sm text-[#E6E6EA]">{p.name}</div>
                      <div className="text-xs text-[#5A5B63] font-body">{p.role}</div>
                      <div className="text-[10px] text-[#5A5B63] font-body mt-1">
                        {p.specialties.join(" · ")}
                      </div>
                    </div>
                    <div className="font-mono text-sm text-[#B8B9C0] shrink-0">
                      ★ {p.rating}
                      <div className="text-[9px] text-[#5A5B63] font-body text-right">({p.reviewCount})</div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => goTo("servico")} className="mt-6 text-xs text-[#5A5B63] font-body hover:text-[#8A8B93] transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── Etapa 4: Data ── */}
          {step === "data" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-6">Quando?</h2>
              <input
                type="date"
                min={minDate}
                value={booking.date ?? ""}
                onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors mb-6"
                aria-label="Selecionar data"
              />
              <button
                onClick={() => goTo("horario")}
                disabled={!booking.date}
                className="w-full h-12 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Ver horários disponíveis
              </button>
              <button onClick={() => goTo("profissional")} className="mt-4 text-xs text-[#5A5B63] font-body hover:text-[#8A8B93] transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── Etapa 5: Horário ── */}
          {step === "horario" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-2">
                Horários — {formatDateBR(booking.date ?? "")}
              </h2>
              <p className="text-xs text-[#5A5B63] font-body mb-6">Slots disponíveis para {selectedProfessional?.name}</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6">
                {slots.map(({ time, available }) => (
                  <button
                    key={time}
                    disabled={!available}
                    onClick={() => { setBooking({ ...booking, time }); goTo("dados"); }}
                    className={`px-3 py-2 text-sm font-mono border transition-all ${
                      !available
                        ? "border-[#1A1A1F] text-[#2C2C33] cursor-not-allowed bg-[#141417]"
                        : booking.time === time
                        ? "border-[#B8B9C0] bg-[#B8B9C0] text-[#0B0B0D]"
                        : "border-[#2C2C33] text-[#E6E6EA] hover:border-[#5A5B63] bg-[#141417]"
                    }`}
                    aria-label={available ? `Horário ${time}` : `${time} — indisponível`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button onClick={() => goTo("data")} className="text-xs text-[#5A5B63] font-body hover:text-[#8A8B93] transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── Etapa 6: Dados do cliente ── */}
          {step === "dados" && (
            <div>
              <h2 className="font-display text-xl text-[#E6E6EA] mb-6">Seus dados</h2>
              <div className="flex flex-col gap-4 mb-6">
                <Field
                  label="Nome completo"
                  id="nome"
                  value={booking.name ?? ""}
                  onChange={(v) => setBooking({ ...booking, name: v })}
                  placeholder="Rafael Souza"
                />
                <Field
                  label="Telefone (WhatsApp)"
                  id="telefone"
                  value={booking.phone ?? ""}
                  onChange={(v) => setBooking({ ...booking, phone: v })}
                  placeholder="(12) 99999-0000"
                  type="tel"
                />
                <Field
                  label="E-mail"
                  id="email"
                  value={booking.email ?? ""}
                  onChange={(v) => setBooking({ ...booking, email: v })}
                  placeholder="rafael@email.com"
                  type="email"
                />
              </div>

              <div className="bg-[#141417] border border-[#2C2C33] p-5 mb-6 text-sm font-body">
                <div className="text-[10px] tracking-widest uppercase text-[#5A5B63] mb-3">Resumo</div>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-[#5A5B63]">Categoria</span>
                  <span className="text-[#B8B9C0] capitalize">{CATEGORIES.find((c) => c.id === category)?.label}</span>
                  <span className="text-[#5A5B63]">Serviço</span>
                  <span className="text-[#B8B9C0]">{selectedService?.name}</span>
                  <span className="text-[#5A5B63]">Profissional</span>
                  <span className="text-[#B8B9C0]">{selectedProfessional?.name}</span>
                  <span className="text-[#5A5B63]">Data</span>
                  <span className="text-[#B8B9C0] font-mono">{formatDateBR(booking.date ?? "")}</span>
                  <span className="text-[#5A5B63]">Horário</span>
                  <span className="text-[#B8B9C0] font-mono">{booking.time}</span>
                </div>
              </div>

              <button
                onClick={() => goTo("confirmado")}
                disabled={!booking.name || !booking.phone || !booking.email}
                className="w-full h-12 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirmar agendamento
              </button>
              <button onClick={() => goTo("horario")} className="mt-4 text-xs text-[#5A5B63] font-body hover:text-[#8A8B93] transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── Confirmação ── */}
          {step === "confirmado" && (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full border border-[#3FB68B] flex items-center justify-center mx-auto mb-6"
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-[#E6E6EA] mb-3">Agendamento confirmado</h2>
              <p className="font-body text-[#8E8F97] mb-2">
                Você receberá a confirmação por{" "}
                <strong className="text-[#B8B9C0]">WhatsApp</strong> e{" "}
                <strong className="text-[#B8B9C0]">e-mail</strong>.
              </p>
              <p className="text-xs text-[#5A5B63] font-body mb-8">
                {selectedService?.name} · {selectedProfessional?.name} · {formatDateBR(booking.date ?? "")} às {booking.time}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/5512981084071?text=${buildWAMessage(booking as Booking, selectedService?.name ?? "", selectedProfessional?.name ?? "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors"
                >
                  Abrir no WhatsApp
                </a>
                <button
                  onClick={() => { setBooking({}); setCategory(null); setStep("categoria"); }}
                  className="h-12 px-8 border border-[#2C2C33] text-[#8A8B93] text-sm tracking-widest uppercase font-body hover:border-[#5A5B63] transition-all"
                >
                  Novo agendamento
                </button>
              </div>
              <div className="mt-6 border border-[#2C2C33] inline-flex items-center gap-2 px-4 py-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A5B63" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[10px] tracking-widest uppercase text-[#5A5B63] font-body">
                  Adicionar ao calendário
                </span>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Field({
  label, id, value, onChange, placeholder, type = "text",
}: {
  label: string; id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] tracking-widest uppercase text-[#5A5B63] font-body block mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors placeholder:text-[#5A5B63]"
        autoComplete="off"
      />
    </div>
  );
}