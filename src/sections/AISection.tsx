"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    title: 'Roteiros personalizados',
    description: 'Baseados no seu perfil, orcamento e estilo de viagem.',
  },
  {
    title: 'Recomendacoes inteligentes',
    description: 'Destinos que combinam com voce, suas preferencias e desejos.',
  },
  {
    title: 'Alertas de epoca ideal',
    description: 'O melhor momento para visitar cada lugar, com base em clima e eventos.',
  },
];

export default function AISection() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center mb-6">
              <BrainCircuit size={24} className="text-[var(--brand-blue)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              DIJA AI - Sua copiloto de viagens
            </h2>
            <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base max-w-lg">
              Conte o que voce ama e receba um roteiro completo em segundos.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={14} className="text-[var(--brand-blue)]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/dija-ai"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-hover)] transition-all shadow-sm"
              >
                Conversar com a DIJA AI
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-blue)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  DI
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl rounded-tl-none bg-[var(--brand-blue-light)] border border-[var(--border-default)] p-4">
                    <p className="text-sm text-[var(--text-primary)]">
                      Ola! Quer descobrir o destino perfeito para sua proxima viagem?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 max-w-[80%]">
                  <div className="rounded-2xl rounded-tr-none bg-[var(--bg-surface)] border border-[var(--border-default)] p-4">
                    <p className="text-sm text-[var(--text-primary)]">
                      Quero uma praia paradisiaca em janeiro, com opcoes de ecoturismo e boa gastronomia.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--text-muted)]/20 flex items-center justify-center text-[var(--text-muted)] text-xs font-bold flex-shrink-0">
                  V
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-blue)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  DI
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl rounded-tl-none bg-[var(--brand-blue-light)] border border-[var(--border-default)] p-4">
                    <p className="text-sm text-[var(--text-primary)]">
                      Que tal Fernando de Noronha ou a Costa dos Corais em Alagoas? Ambos combinam com seu perfil.
                    </p>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)]">
                      Ver roteiro
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)]">
                      Quero saber mais
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[var(--text-muted)] text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)] animate-pulse" />
                DIJA AI esta digitando...
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
