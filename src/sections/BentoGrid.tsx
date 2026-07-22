"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, MapPin, Users, Bell } from 'lucide-react';

const cards = [
  {
    icon: Brain,
    title: 'Sua inteligência de viagem',
    desc: 'Conte o que você ama. A DIJA cria o roteiro perfeito em segundos.',
    color: 'from-[var(--brand-blue)] to-[var(--brand-blue-hover)]',
    bg: 'bg-[var(--brand-blue-light)]',
    border: 'border-[var(--brand-blue-border)]',
    href: '/dija-ai',
    cta: 'Criar roteiro personalizado',
    size: 'lg',
  },
  {
    icon: MapPin,
    title: 'Experiências que transformam',
    desc: 'Cada destino conta uma história. Cada história muda quem você é.',
    bg: 'bg-[var(--bg-secondary)]',
    border: 'border-[var(--border-default)]',
    href: '/experiencias',
    size: 'sm',
  },
  {
    icon: Users,
    title: 'Viajantes como você',
    desc: 'Descubra destinos através dos olhos de quem já esteve lá.',
    bg: 'bg-[var(--bg-secondary)]',
    border: 'border-[var(--border-default)]',
    href: '/comunidade',
    size: 'sm',
  },
  {
    icon: Bell,
    title: 'O momento certo, sempre',
    desc: 'Enquanto você planeja, a DIJA monitora a melhor época pra você ir.',
    bg: 'bg-[var(--bg-secondary)]',
    border: 'border-[var(--border-default)]',
    href: '/dija-ai',
    size: 'sm',
  },
];

export default function BentoGrid() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Tecnologia que revela o Brasil
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Enquanto outros procuram preço, você descobre o destino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[20px] border border-[var(--brand-blue-border)] bg-[var(--brand-blue-light)] p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue)] flex items-center justify-center flex-shrink-0">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                  {cards[0].title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md">
                  {cards[0].desc}
                </p>
              </div>
            </div>
            <div className="mt-auto">
              <Link
                href={cards[0].href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-hover)] transition-all"
              >
                {cards[0].cta}
              </Link>
            </div>
          </motion.div>

          {cards.slice(1).map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative overflow-hidden rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 md:p-8 flex flex-col justify-between min-h-[200px] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--brand-blue)] mb-4">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{card.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
