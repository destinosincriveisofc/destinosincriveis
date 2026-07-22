"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Calendar, Map, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Compass,
    title: 'Por estilo de viagem',
    description: 'Aventura, Praia, Cultura, Natureza',
    slug: 'estilo',
  },
  {
    icon: Calendar,
    title: 'Por epoca do ano',
    description: 'Melhores destinos por mes',
    slug: 'epoca',
  },
  {
    icon: Map,
    title: 'Por regiao',
    description: 'Norte, Nordeste, Centro-Oeste, Sudeste, Sul',
    slug: 'regiao',
  },
];

export default function ExploreSection() {
  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Por onde comecar?
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Responda algumas perguntas e descubra o destino ideal para voce.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href="/explorar">
                  <div className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8 hover:border-[var(--brand-blue)]/30 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center mb-5 group-hover:bg-[var(--brand-blue)] group-hover:text-white transition-all">
                      <Icon size={22} className="text-[var(--brand-blue)] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {cat.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--brand-blue)] group-hover:text-[var(--brand-blue-hover)] transition-colors">
                      Explorar
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
