"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Users, Bell, ArrowRight } from 'lucide-react';

const BENEFITS = [
  {
    icon: Brain,
    title: 'Inteligencia artificial que cria roteiros sob medida',
    description: 'Roteiros personalizados com base no seu perfil, preferencias e orcamento.',
  },
  {
    icon: Users,
    title: 'Comunidade de viajantes que compartilham experiencias reais',
    description: 'Troque dicas, avaliacoes e descobertas com quem ja esteve la.',
  },
  {
    icon: Bell,
    title: 'Alertas inteligentes sobre os melhores momentos para visitar cada destino',
    description: 'Seja notificado quando a epoca ideal do seu destino dos sonhos estiver chegando.',
  },
];

export default function ClubSection() {
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
            Club DIJA
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Para quem quer ir alem do obvio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[var(--brand-blue)]" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/club"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-hover)] transition-all shadow-sm"
            >
              Descobrir o Clube
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
