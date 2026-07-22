"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import TravelGlobe from '@/components/TravelGlobe';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border border-[var(--brand-blue)]/20 self-start"
          >
            <Users size={14} />
            +3.400 viajantes explorando o Brasil
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05]"
          >
            Descubra o Brasil{' '}
            <span className="text-[var(--brand-blue)]">
              que poucos conhecem.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-lg"
          >
            Experiências únicas, roteiros inteligentes e uma comunidade inteira explorando o Brasil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <Link
              href="/explorar"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-[var(--brand-gold)] text-white shadow-[var(--shadow-btn-gold)] hover:bg-[var(--brand-gold-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explorar o Brasil
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/club"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/10 hover:bg-[var(--brand-gold)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Star size={16} />
              Club DIJA — R$ 9,90/mês
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-x-8 gap-y-2 mt-8 pt-6 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-green)]" />
              27 estados
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)]" />
              5 biomas
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />
              Milhares de experiências
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="relative z-10 w-full flex justify-center">
            <TravelGlobe />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
