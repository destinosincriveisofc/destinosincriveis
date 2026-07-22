"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const depoimentos = [
  {
    nome: 'Juliana Costa',
    foto: '/images/testimonials/juliana.jpg',
    local: 'São Paulo, SP',
    texto: 'A DIJA me recomendou um roteiro por Minas Gerais que eu jamais teria descoberto sozinha. Cada parada foi uma surpresa. O Brasil é muito maior do que a gente imagina.',
    estrelas: 5,
  },
  {
    nome: 'Matheus Oliveira',
    foto: '/images/testimonials/matheus.jpg',
    local: 'Rio de Janeiro, RJ',
    texto: 'Usei a ferramenta de alertas da DIJA e consegui pegar passagens pra Alter do Chão num preço que eu nem sabia que existia. Mas o melhor foi o destino em si — o Caribe da Amazônia é real.',
    estrelas: 5,
  },
  {
    nome: 'Rodrigo Santos',
    foto: '/images/testimonials/rodrigo.jpg',
    local: 'Belo Horizonte, MG',
    texto: 'Sempre viajei na mochila, mas o nível de curadoria do Destinos Incríveis é outro patamar. As experiências são pensadas pra quem realmente quer viver o lugar, não só passar por ele.',
    estrelas: 5,
  },
];

export default function Depoimentos() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Quem já descobriu o Brasil com a gente
          </h2>
          <p className="text-[var(--text-muted)] mt-2 text-sm md:text-base">
            Relatos reais de viajantes como você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((dep, i) => (
            <motion.div
              key={dep.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[20px] p-6 bg-[var(--bg-secondary)] border border-[var(--border-default)]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: dep.estrelas }).map((_, j) => (
                  <Star key={j} size={14} className="text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 italic">
                &ldquo;{dep.texto}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] overflow-hidden flex-shrink-0">
                  <img
                    src={dep.foto}
                    alt={dep.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{dep.nome}</p>
                  <p className="text-xs text-[var(--text-muted)]">{dep.local}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
