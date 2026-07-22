"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Bell, Users, MapPin, BookOpen, Star, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    icon: Brain,
    title: 'DIJA AI ilimitada',
    description: 'Copiloto de viagens com roteiros personalizados em segundos.',
  },
  {
    icon: Bell,
    title: 'Alertas VIP',
    description: 'Notificado sobre a melhor epoca para cada destino.',
  },
  {
    icon: Users,
    title: 'Comunidade exclusiva',
    description: 'Fórum fechado com viajantes que compartilham dicas reais.',
  },
  {
    icon: MapPin,
    title: 'Roteiros personalizados',
    description: 'Roteiros dia a dia com recomendacoes de hospedagem.',
  },
  {
    icon: BookOpen,
    title: 'Guias premium',
    description: 'Revista editorial com guias completos e mapas exclusivos.',
  },
  {
    icon: Star,
    title: 'Beneficios futuros',
    description: 'Novas funcionalidades toda semana para membros.',
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            O que voce recebe por R$ 9,90
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Tudo que voce precisa para viajar melhor, pagando menos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-2xl p-5 hover:border-[var(--brand-blue)]/30 transition-all hover-lift"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{benefit.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/club"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold-hover)] transition-all shadow-[var(--shadow-btn-gold)] hover:scale-105 active:scale-95"
          >
            <Sparkles size={18} />
            Quero ser membro por R$ 9,90
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-3">Cancela quando quiser. Sem fidelidade.</p>
        </motion.div>
      </div>
    </section>
  );
}
