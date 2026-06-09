"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = ["Fine Line", "Blackwork", "Realismo", "Geométrico", "Old School", "Minimalista", "Lettering", "Aquarela"];
const BODY_PARTS = ["Braço", "Antebraço", "Peito", "Costas", "Perna", "Panturrilha", "Pescoço", "Tornozelo", "Mão", "Pé", "Costela", "Outro"];
const BUDGET_RANGES = ["Até R$ 200", "R$ 200 – R$ 400", "R$ 400 – R$ 700", "R$ 700 – R$ 1.000", "R$ 1.000 – R$ 2.000", "Acima de R$ 2.000"];

interface FormData {
  style: string;
  size: string;
  bodyPart: string;
  description: string;
  budget: string;
  name: string;
  phone: string;
  referencePreview: string | null;
}

const INITIAL: FormData = {
  style: "",
  size: "",
  bodyPart: "",
  description: "",
  budget: "",
  name: "",
  phone: "",
  referencePreview: null,
};

export default function TattooForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("referencePreview", ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function buildWAMessage() {
    return encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento de tatuagem na Medusa Studio:\n\n` +
      `🎨 Estilo: ${form.style}\n` +
      `📏 Tamanho aproximado: ${form.size} cm\n` +
      `📍 Local do corpo: ${form.bodyPart}\n` +
      `💡 Ideia: ${form.description}\n` +
      `💰 Faixa de orçamento: ${form.budget}\n` +
      `👤 Nome: ${form.name}\n` +
      `📱 Telefone: ${form.phone}`
    );
  }

  const isValid = form.style && form.size && form.bodyPart && form.description && form.budget && form.name && form.phone;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full border border-[#3FB68B] flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-[#E6E6EA] mb-3">Briefing enviado</h2>
        <p className="font-body text-[#8E8F97] mb-8 max-w-sm mx-auto">
          Retornaremos via <strong className="text-[#B8B9C0]">WhatsApp</strong> com orçamento e disponibilidade em até 24h.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/5512991234567?text=${buildWAMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors"
          >
            Abrir no WhatsApp
          </a>
          <button
            onClick={() => { setForm(INITIAL); setSubmitted(false); }}
            className="h-12 px-8 border border-[#2C2C33] text-[#8A8B93] text-sm tracking-widest uppercase font-body hover:border-[#5A5B63] transition-all"
          >
            Novo orçamento
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (isValid) setSubmitted(true); }}
      className="flex flex-col gap-8"
    >
      {/* Estilo */}
      <fieldset>
        <legend className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-3">
          Estilo da tatuagem *
        </legend>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("style", s)}
              className={`px-4 py-2 text-xs font-body border transition-all ${
                form.style === s
                  ? "border-[#B8B9C0] text-[#B8B9C0] bg-[#1A1A1F]"
                  : "border-[#2C2C33] text-[#5A5B63] hover:border-[#5A5B63]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Tamanho + Local */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="size" className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-2">
            Tamanho aproximado (cm) *
          </label>
          <input
            id="size"
            type="number"
            min="1"
            max="100"
            value={form.size}
            onChange={(e) => set("size", e.target.value)}
            placeholder="ex: 10"
            className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-mono text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors placeholder:text-[#5A5B63]"
          />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-2">
            Local do corpo *
          </p>
          <select
            value={form.bodyPart}
            onChange={(e) => set("bodyPart", e.target.value)}
            className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors appearance-none cursor-pointer"
            aria-label="Local do corpo"
          >
            <option value="">Selecionar</option>
            {BODY_PARTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="description" className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-2">
          Descrição da ideia *
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Descreva o que você tem em mente — referências, símbolos, frases, composição..."
          rows={4}
          className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors resize-none placeholder:text-[#5A5B63]"
        />
      </div>

      {/* Imagem de referência */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-2">
          Imagem de referência (opcional)
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Enviar imagem de referência"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full h-24 border border-dashed border-[#2C2C33] text-[#5A5B63] font-body text-sm hover:border-[#5A5B63] transition-colors flex items-center justify-center gap-2"
        >
          {form.referencePreview ? (
            <img
              src={form.referencePreview}
              alt="Referência enviada"
              className="h-full object-contain"
            />
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Selecionar imagem
            </>
          )}
        </button>
        <p className="text-[9px] text-[#5A5B63] font-body mt-1">Preview local — nenhum arquivo é enviado ao servidor.</p>
      </div>

      {/* Orçamento */}
      <fieldset>
        <legend className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-3">
          Faixa de orçamento *
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUDGET_RANGES.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set("budget", b)}
              className={`px-3 py-2 text-xs font-mono border transition-all ${
                form.budget === b
                  ? "border-[#B8B9C0] text-[#B8B9C0] bg-[#1A1A1F]"
                  : "border-[#2C2C33] text-[#5A5B63] hover:border-[#5A5B63]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Dados pessoais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name-tattoo" className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-2">
            Nome *
          </label>
          <input
            id="name-tattoo"
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors placeholder:text-[#5A5B63]"
          />
        </div>
        <div>
          <label htmlFor="phone-tattoo" className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body block mb-2">
            WhatsApp *
          </label>
          <input
            id="phone-tattoo"
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="(12) 99999-0000"
            className="w-full bg-[#141417] border border-[#2C2C33] text-[#E6E6EA] font-body text-sm px-4 py-3 focus:border-[#B8B9C0] outline-none transition-colors placeholder:text-[#5A5B63]"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full h-12 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Enviar briefing
      </button>
    </form>
  );
}
