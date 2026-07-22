"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA_Final() {
  return (
    <section className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]"
        >
          O Brasil inteiro esperando{' '}
          <span className="text-[var(--brand-blue)]">
            sua próxima história.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[var(--text-secondary)] mt-4 max-w-lg mx-auto"
        >
          Não é sobre o destino. É sobre quem você se torna no caminho.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[var(--brand-gold)] text-white shadow-[var(--shadow-btn-gold)] hover:bg-[var(--brand-gold-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Começar sua jornada
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-[var(--text-muted)] mt-6"
        >
          A gente te mostra o caminho. Você escolhe a aventura.
        </motion.p>
      </div>
    </section>
  );
}
