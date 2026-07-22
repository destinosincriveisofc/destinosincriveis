"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const GUIDES = [
  {
    title: 'Roteiro completo pela Costa Verde',
    subtitle: 'RJ/SP',
    description: 'Descubra as praias mais preservadas entre Rio e Sao Paulo, com paradas em parques estaduais e vilas cairacas.',
    image: 'https://images.unsplash.com/photo-1530731141654-59610f3b4814?q=80&w=600&auto=format&fit=crop',
    category: 'Roteiros',
  },
  {
    title: 'Onde comer em Salvador',
    subtitle: 'Guia Gastronomico',
    description: 'Do acaraje da Cidade Alta aos restaurantes do Rio Vermelho, um passeio pelos sabores da capital baiana.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    category: 'Gastronomia',
  },
  {
    title: 'Dicas para viajar de trem pelo Brasil',
    subtitle: 'Sobre Trilhos',
    description: 'Conheca as rotas ferroviarias ativas no pais, da Serra do Mar ao Pantanal, em viagens tranquilas e panoramicas.',
    image: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=600&auto=format&fit=crop',
    category: 'Dicas',
  },
];

export default function GuidesSection() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Guias que inspiram
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Conteudos criados por viajantes para viajantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map((guide, idx) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] overflow-hidden group hover:border-[var(--brand-blue)]/30 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-blue-light)] text-[var(--brand-blue)]">
                    {guide.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-2">
                    <BookOpen size={16} className="text-[var(--brand-blue)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                        {guide.title}
                      </h3>
                      <span className="text-xs text-[var(--text-muted)] font-medium">
                        {guide.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mt-3 leading-relaxed flex-1">
                    {guide.description}
                  </p>
                  <Link
                    href="/guias"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)] transition-colors"
                  >
                    Ler guia
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
