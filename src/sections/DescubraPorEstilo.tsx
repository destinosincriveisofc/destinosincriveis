"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Praias', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', slug: 'praias' },
  { name: 'Natureza', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop', slug: 'natureza' },
  { name: 'Aventura', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=600&auto=format&fit=crop', slug: 'aventura' },
  { name: 'Gastronomia', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop', slug: 'gastronomia' },
  { name: 'Cultura', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=600&auto=format&fit=crop', slug: 'cultura' },
  { name: 'Romântico', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop', slug: 'romantico' },
];

export default function DescubraPorEstilo() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Do seu jeito, no seu tempo
            </h2>
            <p className="text-[var(--text-muted)] mt-2 text-sm md:text-base">
              Escolha o estilo que combina com você e descubra o Brasil por um novo olhar.
            </p>
          </div>
          <Link
            href="/explorar"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)] transition-colors whitespace-nowrap"
          >
            Ver todos os destinos
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/explorar?categoria=${cat.slug}`}
                className="group block relative overflow-hidden rounded-[16px] aspect-[3/4] bg-[var(--bg-surface)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-sm font-bold text-white">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
