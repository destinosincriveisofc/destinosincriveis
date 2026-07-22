"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Thermometer, Calendar, Brain, Users } from 'lucide-react';

const destaques = [
  {
    nome: 'Lençóis Maranhenses, MA',
    melhorEpoca: 'Junho - Agosto',
    temperatura: '28°C',
    compatibilidade: 96,
    viajantes: 18,
    imagem: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600&auto=format&fit=crop',
    mensagem: 'É agora que os Lençóis estão no auge das lagoas cheias.',
  },
  {
    nome: 'Jalapão, TO',
    melhorEpoca: 'Maio - Setembro',
    temperatura: '32°C',
    compatibilidade: 94,
    viajantes: 12,
    imagem: 'https://images.unsplash.com/photo-1463130456064-07386d8376e1?q=80&w=600&auto=format&fit=crop',
    mensagem: 'O Jalapão está seco e perfeito para explorar fervedouros.',
  },
  {
    nome: 'Alter do Chão, PA',
    melhorEpoca: 'Agosto - Dezembro',
    temperatura: '30°C',
    compatibilidade: 91,
    viajantes: 8,
    imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
    mensagem: 'As praias fluviais estão no ponto mais bonito do ano.',
  },
];

export default function BrasilAgora() {
  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            O Brasil neste exato momento
          </h2>
          <p className="text-[var(--text-muted)] mt-2 text-sm md:text-base">
            Dados ao vivo sobre os melhores destinos brasileiros agora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {destaques.map((dest, i) => (
            <motion.div
              key={dest.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[20px] overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={dest.imagem} alt={dest.nome} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-base font-bold text-white">{dest.nome}</h3>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                  &ldquo;{dest.mensagem}&rdquo;
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Thermometer size={12} className="text-[var(--brand-blue)]" />
                    <span>{dest.temperatura}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Calendar size={12} className="text-[var(--brand-blue)]" />
                    <span>{dest.melhorEpoca}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Brain size={12} className="text-[var(--brand-blue)]" />
                    <span>DIJA: {dest.compatibilidade}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Users size={12} className="text-[var(--brand-blue)]" />
                    <span>{dest.viajantes} agora</span>
                  </div>
                </div>
                <Link
                  href={`/destinos?q=${encodeURIComponent(dest.nome.split(',')[0])}`}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold text-[var(--brand-blue)] border border-[var(--brand-blue-border)] hover:bg-[var(--brand-blue-light)] transition-all mt-2"
                >
                  Explorar destino
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
