"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TridentDivider from "@/components/ui/TridentDivider";

const hours = [
  { day: "Segunda — Sexta", time: "09:00 – 20:00" },
  { day: "Sábado", time: "08:00 – 18:00" },
  { day: "Domingo", time: "Fechado" },
];

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#0B0B0D] py-24 px-6" ref={ref} aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto">
        <TridentDivider className="mb-16" label="Onde nos encontrar" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Address & Hours */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              id="location-heading"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none chrome-title mb-8"
            >
              Localização
            </h2>

            <div className="mb-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-2">
                Endereço
              </div>
              <address className="not-italic font-body text-[#E6E6EA]">
                Rua das Serpentes, 142 — Jardim Motorama
                <br />
                <span className="text-[#8E8F97]">São José dos Campos — SP</span>
              </address>
            </div>

            <div className="mb-10">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#5A5B63] font-body mb-4">
                Horário de funcionamento
              </div>
              <div className="flex flex-col gap-3">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center border-b border-[#2C2C33] pb-3">
                    <span className="font-body text-sm text-[#8E8F97]">{day}</span>
                    <span
                      className="font-mono text-sm"
                      style={{ color: time === "Fechado" ? "#5A5B63" : "#B8B9C0" }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/5512991234567?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Medusa%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-12 px-8 bg-[#B8B9C0] text-[#0B0B0D] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#ECEDF1] transition-colors"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative h-72 lg:h-96 bg-[#141417] border border-[#2C2C33] flex items-center justify-center overflow-hidden"
          >
            <div className="text-center z-10 pointer-events-none">
              <div
                className="font-display text-sm tracking-[0.3em] uppercase mb-2"
                style={{
                  background: "linear-gradient(180deg, #8A8B93 0%, #5A5B63 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Jardim Motorama
              </div>
              <div className="text-[#5A5B63] text-xs font-body tracking-wider">
                São José dos Campos — SP
              </div>
            </div>
            {/* Grid lines para efeito de mapa abstrato */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2C2C33" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* pseudo-ruas */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#3a3a42" strokeWidth="1" />
              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#3a3a42" strokeWidth="1" />
              <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#3a3a42" strokeWidth="0.8" />
              <circle cx="50%" cy="50%" r="6" fill="#C8453B" opacity="0.8" />
              <circle cx="50%" cy="50%" r="12" fill="none" stroke="#C8453B" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
