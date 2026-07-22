"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const DESTINATIONS = [
  {
    name: 'Lencois Maranhenses',
    state: 'MA',
    description: 'Um deserto de aguas cristalinas',
    image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Chapada dos Veadeiros',
    state: 'GO',
    description: 'Natureza e misticismo no Cerrado',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Fernando de Noronha',
    state: 'PE',
    description: 'Praias entre as mais belas do mundo',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Serra do Cipo',
    state: 'MG',
    description: 'Trekking entre cachoeiras e canyons',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Jalapao',
    state: 'TO',
    description: 'Aventura no maior conjunto de dunas do Brasil',
    image: 'https://images.unsplash.com/photo-1463130456064-07386d8376e1?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Vale do Pati',
    state: 'BA',
    description: 'A trilha mais bonita do Brasil',
    image: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=800&auto=format&fit=crop',
  },
];

export default function FeaturedDestinations() {
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
            Destinos em destaque
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Lugares extraordinarios esperam por voce em cada canto do Brasil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <div className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] overflow-hidden group hover:border-[var(--brand-blue)]/30 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[var(--text-primary)]">
                    {dest.state}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <MapPin size={16} className="text-[var(--brand-blue)] flex-shrink-0" />
                    {dest.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-2 leading-relaxed">
                    {dest.description}
                  </p>
                  <Link
                    href={`/destinos/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)] transition-colors"
                  >
                    Descobrir
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
