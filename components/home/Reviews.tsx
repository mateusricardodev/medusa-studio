"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { reviews } from "@/lib/mock/reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Avaliação: ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill={i < rating ? "#B8B9C0" : "#2C2C33"}
          aria-hidden="true"
        >
          <polygon points="5,1 6.2,3.8 9,4.1 7,6 7.6,9 5,7.5 2.4,9 3,6 1,4.1 3.8,3.8" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#141417] py-24 px-6" ref={ref} aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#5A5B63] font-body mb-3">
            Quem passou pelo estúdio
          </p>
          <h2
            id="reviews-heading"
            className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none chrome-title"
          >
            Avaliações
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#2C2C33]">
          {reviews.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#141417] p-6 flex flex-col gap-4"
            >
              <StarRating rating={review.rating} />
              <blockquote className="text-[#8E8F97] font-body text-sm leading-relaxed flex-1">
                "{review.text}"
              </blockquote>
              <div className="border-t border-[#2C2C33] pt-4">
                <div className="font-body font-medium text-sm text-[#B8B9C0]">{review.name}</div>
                <div className="text-[10px] tracking-wider uppercase text-[#5A5B63] font-body mt-1">
                  {review.service} · {review.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
