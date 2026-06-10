"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DIFERENCIAIS = [
  {
    label: "Ambiente",
    text: "Espaço pensado para o conforto — sem pressa, sem fila, sem barulho desnecessário. Cada detalhe foi escolhido para que você se sinta em casa.",
  },
  {
    label: "Equipe",
    text: "Barbeiros, tatuadores e piercers com portfólio verificado e anos de especialização. Aqui ninguém aprende no seu cabelo.",
  },
  {
    label: "Atendimento",
    text: "Agendamento online, lembretes automáticos e histórico de serviços. Rápido, sem papelada, sem ligação.",
  },
];

export default function Sobre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#141417] border-y border-[#2C2C33] py-24"
      aria-labelledby="sobre-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Esquerda — texto principal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-6">
              Quem somos
            </p>
            <h2
              id="sobre-heading"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none chrome-title mb-8"
            >
              MAIS QUE UMA<br />BARBEARIA
            </h2>
            <p className="text-[#8E8F97] text-base font-body font-light leading-relaxed mb-5">
              O Medusa Studio nasceu para reunir em um só lugar tudo que o homem moderno precisa: corte preciso, arte na pele e um estilo que vai além da cadeira.
            </p>
            <p className="text-[#5A5B63] text-sm font-body font-light leading-relaxed mb-10">
              Localizado no Jardim Motorama, em São José dos Campos, somos barbearia, estúdio de tatuagem, estúdio de piercing e loja de streetwear — tudo com o mesmo nível de cuidado e personalidade.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 border-t border-[#2C2C33] pt-8">
              {[
                { value: "6+", label: "anos de estúdio" },
                { value: "1.200+", label: "clientes ativos" },
                { value: "4.9★", label: "avaliação média" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-mono text-xl text-[#B8B9C0]">{value}</div>
                  <div className="text-[10px] tracking-widest uppercase text-[#5A5B63] mt-1 font-body">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Direita — diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:pt-16"
          >
            {DIFERENCIAIS.map(({ label, text }, i) => (
              <div
                key={label}
                className="flex gap-6 py-6 border-b border-[#2C2C33] last:border-b-0"
              >
                <span className="font-mono text-[10px] text-[#5A5B63] w-4 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#B8B9C0] font-body mb-2">
                    {label}
                  </div>
                  <p className="text-[#5A5B63] text-sm font-body font-light leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
